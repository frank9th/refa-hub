import { 
    getFirestore, collection, doc, getDoc, setDoc, onSnapshot, query, orderBy, limit, addDoc, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// js/channel-hub.js — Channel Hub frontend logic
// Uses Firebase Modular SDK

let db          = null;
let eventId     = null;
let channelData = null;
let targetContestants = null;  // pulled from Firestore event doc
let topVotes    = 1;

function resolveActiveEventId() {
  const urlParams = new URLSearchParams(window.location.search);
  const queryEvent = urlParams.get('event');
  if (queryEvent) return queryEvent;

  const pathParts = window.location.pathname.split('/').filter(Boolean);
  if (pathParts.length >= 2 && (pathParts[0] === 'command-hub' || pathParts[0] === 'event' || pathParts[0] === 'events')) {
    const candidate = pathParts[1];
    if (candidate && !['register', 'portal', 'judges', 'leaderboard', 'channel'].includes(candidate)) {
      return candidate;
    }
  }
  return null;
}

/* ═══════════════════════════════════════════════════
   BOOT — wait for firebase-ready from firebase-init.js
═══════════════════════════════════════════════════ */
async function initHub() {
    db = window.REFA_FIREBASE.db; // Get modular db instance

    // Derive active event ID
    eventId = resolveActiveEventId()
        || (window.REFA_EVENTS?.getActiveEvent()?.id)
        ;

    const hEvent = document.getElementById('headerEventName');
    if (hEvent) hEvent.textContent = eventId;

    // Load event doc to get dynamic target and event name
    try {
        const evSnap = await getDoc(doc(db, 'events', eventId));
        if (evSnap.exists()) {
            const evData = evSnap.data();
            targetContestants = evData?.details?.targetContestants || null;
            
            // Auto-fill wizard name
            const wName = document.getElementById('wizName');
            if (wName) wName.value = evData?.details?.name || evData?.title || eventId;
            
            const wSlug = document.getElementById('wizSlug');
            if (wSlug) wSlug.value = eventId;

            // Apply theme if available
            if (evData?.theme && window.REFA_EVENTS?.applyTheme) {
                window.REFA_EVENTS.applyTheme(evData.theme);
            }
            updateTargetUI();
        }
    } catch (e) { console.error('Event load:', e); }

    // Step 1: check if Showtime config exists
    const configSnap = await getDoc(doc(db, 'rafa_config', 'showtime'));
    let cfgData = {
        apiUrl: 'https://showtime-app-puoebusfva-ew.a.run.app',
        apiKey: 'default-insecure-task-token-please-change-in-env'
    };
    if (configSnap.exists() && configSnap.data()?.apiUrl) {
        cfgData = { ...cfgData, ...configSnap.data() };
    } else {
        try {
            await setDoc(doc(db, 'rafa_config', 'showtime'), cfgData, { merge: true });
        } catch (err) {
            console.warn('Could not auto-save config:', err);
        }
    }
    fillSettingsInputs(cfgData);
    startListeners(); // startListeners handles channel config detection internally
}

if (window.REFA_FIREBASE) {
    initHub();
} else {
    window.addEventListener('firebase-ready', initHub);
}

/* ── Tab nav ───────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetEl = document.getElementById(btn.dataset.target);
        if (targetEl) targetEl.classList.add('active');
    });
});

/* ── Screen management ─────────────────────────── */
function showScreen(id) {
    ['screenSettings','screenWizard'].forEach(s => {
        const el = document.getElementById(s);
        if (el) el.classList.toggle('hidden', s !== id);
    });
}
function hideScreens() {
    ['screenSettings','screenWizard'].forEach(s => {
        const el = document.getElementById(s);
        if (el) el.classList.add('hidden');
    });
}

/* ── Step 1: Save API config ───────────────────── */
const cfgFormEl = document.getElementById('configForm');
if (cfgFormEl) {
    cfgFormEl.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = document.getElementById('btnSaveCfg');
        if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }

        const apiUrl = document.getElementById('cfgUrl')?.value.trim() || 'https://showtime-app-puoebusfva-ew.a.run.app';
        const apiKey = document.getElementById('cfgKey')?.value.trim() || 'default-insecure-task-token-please-change-in-env';

        await setDoc(doc(db, 'rafa_config', 'showtime'), { apiUrl, apiKey }, { merge: true });
        fillSettingsInputs({ apiUrl, apiKey });

        if (btn) { btn.disabled = false; btn.textContent = 'Save & Continue →'; }
        checkChannelExists();
    });
}

function fillSettingsInputs(data) {
    const apiInput = document.getElementById('settingApiUrl');
    const keyInput = document.getElementById('settingApiKey');
    if (apiInput) apiInput.value = data.apiUrl || 'https://showtime-app-puoebusfva-ew.a.run.app';
    if (keyInput) keyInput.value = data.apiKey || 'default-insecure-task-token-please-change-in-env';
}

/* ── Step 2: Check or create channel ──────────── */
// NOTE: channel existence is detected inside startListeners() via onSnapshot.
// This function is kept only for a one-time programmatic check (e.g. after channel creation).
async function checkChannelExists() {
    if (!db || !eventId) return;
    const channelRef = doc(db, 'events', eventId, 'showtime_channel', 'config');
    try {
        const snap = await getDoc(channelRef);
        if (snap.exists() && snap.data()?.webhookSecret) {
            channelData = snap.data();
            hideScreens();
            renderChannelInfo(channelData);
            renderWebhookHealth(channelData.lastWebhookAt);
            fetchLiveShowtimeData();
        } else {
            showScreen('screenWizard');
            renderWebhookHealth(null);
            const wName = document.getElementById('wizName');
            if (wName && !wName.value) wName.value = eventId;
            const wSlug = document.getElementById('wizSlug');
            if (wSlug && !wSlug.value) wSlug.value = eventId;
        }
    } catch(e) {
        console.warn('Channel check error:', e);
    }
}

/* ── Channel creation form ─────────────────────── */
const createChanForm = document.getElementById('createChannelForm');
if (createChanForm) {
    createChanForm.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = document.getElementById('btnCreateChannel');
        if (btn) { btn.disabled = true; btn.textContent = '⌛ Connecting…'; }

        const secret  = (typeof crypto.randomUUID === 'function') 
            ? crypto.randomUUID() 
            : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });

        const wizName = document.getElementById('wizName')?.value?.trim() || eventId;
        const wizSlug = document.getElementById('wizSlug')?.value?.trim() || eventId;

        const payload = {
            name:           wizName,
            season:         document.getElementById('wizSeason')?.value || '2026',
            slug:           wizSlug,
            description:    document.getElementById('wizDesc')?.value || `${eventId} Channel`,
            rafa_event_id:  eventId,
            webhook_url:    `${window.location.origin}/api/showtime-webhook`,
            webhook_secret: secret,
        };

        try {
            const apiUrl = document.getElementById('settingApiUrl')?.value.trim() || 'https://showtime-app-puoebusfva-ew.a.run.app';
            const apiKey = document.getElementById('settingApiKey')?.value.trim() || 'default-insecure-task-token-please-change-in-env';

            const makeRequest = (action, body) => fetch('/api/showtime-proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, payload: body, apiUrl, apiKey }),
            });

            // ── Pre-flight: check if a channel already exists on Showtime ──────────
            // This prevents creating a duplicate if the channel exists under a
            // different name/slug than what REFA's eventId would suggest.
            let existingChannel = null;
            try {
                const findRes = await makeRequest('findChannel', {
                    rafa_event_id: eventId,
                    slug: wizSlug,
                    name: wizName,
                });
                if (findRes.ok) {
                    const findJson = await findRes.json();
                    if (findJson.found && findJson.data) {
                        existingChannel = findJson.data;
                        console.log(`[Channel Hub] Found existing Showtime channel: ${existingChannel.name} (id: ${existingChannel.id})`);
                    }
                }
            } catch (findErr) {
                console.warn('[Channel Hub] Pre-flight lookup failed (non-fatal):', findErr.message);
            }

            // ── If found, reuse it; otherwise, create ─────────────────────────────
            let json;
            if (existingChannel) {
                // Patch the webhook details on the existing channel so it points to this REFA instance
                try {
                    await makeRequest('updateChannel', {
                        pk: existingChannel.id,
                        data: {
                            webhook_url: payload.webhook_url,
                            webhook_secret: secret,
                            rafa_event_id: eventId,
                        }
                    });
                } catch (_) {}
                json = existingChannel;
            } else {
                const res = await makeRequest('createChannel', payload);
                json = await res.json();
                if (!res.ok) throw new Error(JSON.stringify(json));
            }

            const newChannelId = json.channel_id || json.id || null;

            await setDoc(doc(db, 'events', eventId, 'showtime_channel', 'config'), { 
                webhookSecret: secret, 
                connectedAt: serverTimestamp(),
                channel_id: newChannelId,
                name: json.name || payload.name,
                slug: json.slug || payload.slug,
                rafa_event_id: eventId,
            }, { merge: true });

        } catch (err) {
            console.warn('Channel creation warning:', err.message);
            hideScreens();
        }
    });
}


/* ── Connection Error UI Helpers ─────────────────────── */
function setConnectionError(errorText, statusCode) {
    const pill = document.querySelector('.status-pill');
    const dot = document.querySelector('.status-dot');
    const text = document.getElementById('topWhText');
    const banner = document.getElementById('connectionErrorBanner');

    if (pill) {
        pill.style.background = 'rgba(244, 63, 94, 0.15)';
        pill.style.color = '#f43f5e';
        pill.style.borderColor = 'rgba(244, 63, 94, 0.3)';
    }
    if (dot) {
        dot.style.background = '#f43f5e';
        dot.style.boxShadow = '0 0 8px #f43f5e';
    }

    let statusLabel = 'Connection Failed';
    if (statusCode === 401) {
        statusLabel = '401 Unauthorized (Invalid API Key)';
    } else if (statusCode === 400) {
        statusLabel = '400 Bad Request';
    } else if (statusCode) {
        statusLabel = `Error ${statusCode}`;
    }

    if (text) {
        text.textContent = `🔴 ${statusLabel}`;
    }

    if (banner) {
        banner.style.display = 'block';
        const cleanMsg = String(errorText).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        banner.innerHTML = `
            <div style="background: rgba(244, 63, 94, 0.12); border: 1px solid rgba(244, 63, 94, 0.3); color: #fecdd3; padding: 14px 20px; border-radius: 14px; display: flex; align-items: center; justify-content: space-between; gap: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 20px;">⚠️</span>
                    <div>
                        <strong style="color: #fff; display: block; font-size: 13px; font-weight: 700; margin-bottom: 2px;">Showtime API Connection Error (${statusCode || 'Failed'})</strong>
                        <span style="font-size: 12px; color: #fca5a5;">${cleanMsg}</span>
                    </div>
                </div>
                <button onclick="const el = document.getElementById('settingApiKey'); if(el){el.focus(); el.scrollIntoView({behavior:'smooth'});}" class="btn btn-sm" style="background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2); white-space: nowrap;">
                    ⚙️ Check API Settings
                </button>
            </div>
        `;
    }
}

function clearConnectionError() {
    const pill = document.querySelector('.status-pill');
    const dot = document.querySelector('.status-dot');
    const text = document.getElementById('topWhText');
    const banner = document.getElementById('connectionErrorBanner');

    if (pill) {
        pill.style.background = 'rgba(16, 185, 129, 0.1)';
        pill.style.color = '#34d399';
        pill.style.borderColor = 'rgba(16, 185, 129, 0.25)';
    }
    if (dot) {
        dot.style.background = '#34d399';
        dot.style.boxShadow = '0 0 8px #34d399';
    }
    if (text) {
        text.textContent = '🟢 Connected to Showtime API';
    }
    if (banner) {
        banner.style.display = 'none';
        banner.innerHTML = '';
    }
}

/* ── Sidebar settings form ─────────────────────── */
const settingsFormEl = document.getElementById('settingsForm');
if (settingsFormEl) {
    settingsFormEl.addEventListener('submit', async e => {
        e.preventDefault();
        const apiUrl = document.getElementById('settingApiUrl')?.value.trim() || 'https://showtime-app-puoebusfva-ew.a.run.app';
        const apiKey = document.getElementById('settingApiKey')?.value.trim() || 'default-insecure-task-token-please-change-in-env';
        await setDoc(doc(db, 'rafa_config', 'showtime'), { apiUrl, apiKey }, { merge: true });
        const msg = document.getElementById('settingsMsg');
        if (msg) {
            msg.style.display = 'block';
            setTimeout(() => msg.style.display = 'none', 3000);
        }
        fetchLiveShowtimeData();
    });
}

async function fetchLiveShowtimeData() {
    try {
        const apiUrl = document.getElementById('settingApiUrl')?.value?.trim() || 'https://showtime-app-puoebusfva-ew.a.run.app';
        const apiKey = document.getElementById('settingApiKey')?.value?.trim() || 'default-insecure-task-token-please-change-in-env';
        
        const activeChanId = channelData?.channel_id || channelData?.id || (new URLSearchParams(window.location.search)).get('channel');
        
        if (!activeChanId) {
            console.warn(`No active channel ID found for event ${eventId}.`);
            return;
        }

        const fetchProxy = async (action, extraPayload = {}) => {
            const res = await fetch('/api/showtime-proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, payload: { pk: activeChanId, ...extraPayload }, apiUrl, apiKey })
            });

            let resData = null;
            try {
                resData = await res.json();
            } catch(e) {}

            if (!res.ok) {
                let errorMsg = 'Failed to connect to Showtime API';
                if (res.status === 401) {
                    errorMsg = '401 Unauthorized: Invalid API key or access token rejected by Showtime API. Please update your API Key in Settings.';
                } else if (res.status === 400) {
                    const detail = typeof resData?.error === 'string' ? resData.error : (resData?.error?.detail || JSON.stringify(resData?.error || 'Bad Request'));
                    errorMsg = `400 Bad Request: ${detail}`;
                } else if (resData && resData.error) {
                    errorMsg = `Error ${res.status}: ${typeof resData.error === 'string' ? resData.error : JSON.stringify(resData.error)}`;
                } else {
                    errorMsg = `HTTP ${res.status}: API request failed`;
                }
                setConnectionError(errorMsg, res.status);
                throw new Error(errorMsg);
            }

            clearConnectionError();
            return resData;
        };

        // 1. Fetch Channel Info
        const chanData = await fetchProxy('getChannel');
        if (chanData && chanData.name) {
            renderChannelInfo(chanData);
            await setDoc(doc(db, 'events', eventId, 'showtime_channel', 'config'), {
                name: chanData.name,
                slug: chanData.slug || chanData.name,
                wallet: chanData.wallet || 0,
                acc_name: chanData.acc_name || null,
                acc_number: chanData.acc_number || null,
                bank: chanData.bank || null,
                lastSyncAt: new Date().toISOString()
            }, { merge: true }).catch(e => console.warn('Failed to sync channel data to firestore', e));
        }

        // 2. Fetch Contestants
        const contestants = await fetchProxy('fetchContestants') || [];
        if (Array.isArray(contestants) && contestants.length > 0) {
            const cachedMap = {};
            if (Array.isArray(window.allContestantsCache)) {
                window.allContestantsCache.forEach(c => { cachedMap[c.code] = c; });
            }

            for (const c of contestants) {
                const code = String(c.code || c.mobile_code || '100');
                const cName = c.profile?.username || c.name || c.username || `Contestant ${code}`;
                const cPhone = c.profile?.phone || c.phone || 'Not Provided';

                const mObj = {
                    id: c.id,
                    code: code,
                    name: cName,
                    username: cName,
                    phone: cPhone,
                    votes: c.votes || 0,
                    active: true
                };

                const cached = cachedMap[code];
                const hasChanged = !cached
                    || cached.name !== mObj.name
                    || cached.phone !== mObj.phone
                    || cached.votes !== mObj.votes
                    || cached.active !== mObj.active;

                if (hasChanged) {
                    setDoc(doc(db, 'events', eventId, 'showtime_members', code), mObj, { merge: true }).catch(() => {});
                    setDoc(doc(db, 'Contest', String(activeChanId), 'Contestants', code), mObj, { merge: true }).catch(() => {});
                }
            }
        }

        // 3. Fetch Tickets
        const tickets = await fetchProxy('fetchTickets') || [];
        if (Array.isArray(tickets) && tickets.length > 0) {
            if (!window._ticketSyncCache) window._ticketSyncCache = {};
            for (const t of tickets) {
                const tId = String(t.id || t.code || Math.random().toString(36).substring(7));
                const tObj = {
                    id: tId,
                    name: t.name || t.type || `Ticket ${tId}`,
                    price: t.price || t.amount || 0,
                    sold: t.sold || 0,
                    status: t.active === false ? 'inactive' : 'active'
                };
                const cacheKey = JSON.stringify(tObj);
                if (window._ticketSyncCache[tId] !== cacheKey) {
                    window._ticketSyncCache[tId] = cacheKey;
                    setDoc(doc(db, 'events', eventId, 'showtime_tickets', tId), tObj, { merge: true }).catch(() => {});
                }
            }
        }

    } catch (err) {
        console.warn('[Channel Hub] Live API fetch note:', err.message);
    }
}

window.killConnection = async function() {
    if (!confirm('Are you sure you want to disconnect this workspace from Quinsty? You will need to re-sync a channel.')) return;
    try {
        const { deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
        await deleteDoc(doc(db, 'events', eventId, 'showtime_channel', 'config'));
        window.location.reload();
    } catch(err) {
        alert('Error disconnecting: ' + err.message);
    }
};

/* ═══════════════════════════════════════════════════
   FIRESTORE REAL-TIME LISTENERS
═══════════════════════════════════════════════════ */
function startListeners() {
    targetContestants = targetContestants || 80;
    updateTargetUI();

    // 1. Single listener for Channel Config — detects channel presence and drives UI state
    onSnapshot(doc(db, 'events', eventId, 'showtime_channel', 'config'), snap => {
        if (snap.exists() && snap.data()?.webhookSecret) {
            channelData = snap.data();
            hideScreens();
            renderChannelInfo(channelData);
            renderWebhookHealth(channelData.lastWebhookAt);
            // Only call fetchLiveShowtimeData if this is the first time channel is detected
            if (!window._channelBootComplete) {
                window._channelBootComplete = true;
                fetchLiveShowtimeData();
            }
        } else {
            window._channelBootComplete = false;
            showScreen('screenWizard');
            renderWebhookHealth(null);
            const wName = document.getElementById('wizName');
            if (wName && !wName.value) wName.value = eventId;
            const wSlug = document.getElementById('wizSlug');
            if (wSlug && !wSlug.value) wSlug.value = eventId;
        }
    });

    // 2. Members listener
    onSnapshot(collection(db, 'events', eventId, 'showtime_members'), snap => {
        const items = [];
        snap.forEach(d => items.push({ id: d.id, ...d.data() }));
        if (items.length > 0) {
            items.sort((a, b) => parseInt(a.code || 0) - parseInt(b.code || 0));
            window.allContestantsCache = items;
            renderMembers(items);
            renderLeaderboardFromMembers(items);
        }
    });

    // 3. Tickets listener
    onSnapshot(collection(db, 'events', eventId, 'showtime_tickets'), snap => {
        const items = [];
        snap.forEach(d => items.push({ id: d.id, ...d.data() }));
        renderTickets(items);
    });

    // 4. Leaderboard listener
    onSnapshot(query(collection(db, 'events', eventId, 'showtime_leaderboard'), orderBy('votes', 'desc')), snap => {
        if (snap.size > 0) {
            const items = [];
            snap.forEach(d => items.push({ code: d.id, ...d.data() }));
            renderLeaderboard(items);
        }
    });

    // 5. Activity feed listener
    onSnapshot(query(collection(db, 'events', eventId, 'showtime_activity'), orderBy('timestamp', 'desc'), limit(50)), snap => {
        const items = [];
        snap.forEach(d => items.push(d.data()));
        renderActivity(items);
    });

    // 6. Notices listener
    onSnapshot(query(collection(db, 'events', eventId, 'showtime_notices'), orderBy('sentAt', 'desc')), snap => {
        const items = [];
        snap.forEach(d => items.push(d.data()));
        renderNotices(items);
    });
}

function renderLeaderboardFromMembers(members) {
    const sorted = [...members].sort((a, b) => (b.votes || 0) - (a.votes || 0));
    renderLeaderboard(sorted);
}

/* ═══════════════════════════════════════════════════
   RENDERERS
═══════════════════════════════════════════════════ */

function updateTargetUI() {
    const t = targetContestants || 80;
    const display = t.toLocaleString();
    setTxt('kpiTarget', display);
    setTxt('ringTarget', display);
    const regCount = parseInt(document.getElementById('kpiReg')?.textContent.replace(/,/g,'')) || 0;
    updateProgress(regCount);
}

function updateProgress(count) {
    const t = targetContestants || 80;
    const rem = Math.max(0, t - count);
    setTxt('kpiRemaining', rem.toLocaleString());
    const pct  = Math.min(100, Math.round((count / t) * 100));
    const circ = 314.2;
    const ring = document.getElementById('progressRing');
    if (ring) ring.style.strokeDashoffset = circ - (pct / 100) * circ;
    setTxt('ringPct', pct + '%');
}

function renderChannelInfo(data) {
    if (!data) return;
    const name = data.name || eventId || '—';
    const slug = data.slug || eventId || '';
    const chanId = data.channel_id || data.id || '';
    
    setTxt('sbChannelName', name);
    setTxt('sbChannelSlug', chanId ? `Channel ID #${chanId} · @${slug}` : `@${slug}`);
    setTxt('sbWallet', '₦' + Number(data.wallet || 0).toLocaleString());
    
    const base = (document.getElementById('settingApiUrl')?.value || 'https://showtime-app-puoebusfva-ew.a.run.app').replace(/\/$/, '');
    const link = document.getElementById('sbLiveLink');
    if (link && chanId && slug) {
        link.href = `${base}/vote/${chanId}/${slug}/`;
    }
}

function renderWebhookHealth(ts) {
    ['sbWhCard','topWhPill'].forEach(id => setClass(id, 'ok'));
    setTxt('sbWhStatus', 'Active');
    setTxt('sbWhTime',   'Connected to Showtime API');
    setTxt('topWhText',  '● Live · Showtime API Connected');
}

function renderMembers(members) {
    const n = members.length;
    setTxt('cntMembers', n);
    setTxt('kpiReg',     n.toLocaleString());
    setTxt('ringReg',    n.toLocaleString());
    updateProgress(n);

    const tb = document.getElementById('membersTbody');
    if (!tb) return;
    
    if (!n) {
        tb.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--muted)">No members registered yet.</td></tr>`;
        return;
    }

    tb.innerHTML = members.map(m => {
        const ok     = m.active !== false;
        const badge  = ok ? `<span class="badge badge-ok">Active</span>` : `<span class="badge badge-warn">Pending</span>`;
        const code   = m.code || m.mobile_code || '—';
        const name   = m.profile?.username || m.name || m.username || '—';
        const phone  = m.profile?.phone || m.phone || 'Not Provided';
        const votes  = m.votes || 0;
        
        return `<tr class="hub-member-row" data-code="${String(code).toLowerCase()}" data-name="${String(name).toLowerCase()}" data-phone="${String(phone).toLowerCase()}">
            <td><span class="cpill">#${code}</span></td>
            <td><strong style="color:var(--txt);">${name}</strong></td>
            <td style="color:var(--muted);font-family:monospace;font-size:.85rem">${phone}</td>
            <td style="font-weight:600;color:var(--gold-lt)">${votes.toLocaleString()}</td>
            <td>${badge}</td>
            <td>
              <button class="btn btn-sm btn-ghost" onclick="window.copyCode('${code}')">Copy Code</button>
            </td>
        </tr>`;
    }).join('');
}

function renderLeaderboard(lb) {
    const total = lb.reduce((s, m) => s + (m.votes || 0), 0);
    setTxt('kpiVotes', total.toLocaleString());
    topVotes = lb[0]?.votes || 1;

    const rows = items => items.map((m, i) => {
        const rc  = i === 0 ? 'r1' : i === 1 ? 'r2' : i === 2 ? 'r3' : 'rn';
        const rkl = i === 0 ? '👑' : i + 1;
        const bar = Math.max(4, Math.round(((m.votes || 0) / topVotes) * 100));
        return `<div class="lb-row">
            <div class="lb-rank ${rc}">${rkl}</div>
            <div class="lb-info">
                <div class="lb-name">Contestant</div>
                <div class="lb-code"><span class="cpill">#${m.code}</span></div>
            </div>
            <div class="lb-bar-wrap"><div class="lb-bar" style="width:${bar}%"></div></div>
            <div class="lb-votes">${(m.votes||0).toLocaleString()}</div>
        </div>`;
    }).join('');

    const empty = `<div class="empty"><div class="empty-icon">🗳️</div>No votes yet.</div>`;
    setHTML('fullLb',      lb.length ? rows(lb)         : empty);
    setHTML('overviewLb',  lb.length ? rows(lb.slice(0,3)) : empty);
}

function renderTickets(tickets) {
    setTxt('kpiTickets', tickets.length);
    const tb = document.getElementById('ticketsTbody');
    if (!tickets.length) {
        tb.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--muted)">No tickets yet.</td></tr>`;
        return;
    }
    tb.innerHTML = tickets.map(t => `<tr>
        <td><span class="cpill">${t.id}</span></td>
        <td style="font-weight:500">${t.lable || t.label || '—'}</td>
        <td style="color:var(--gold-lt);font-weight:600">₦${Number(t.amount||0).toLocaleString()}</td>
        <td>${t.is_membership ? '<span class="badge badge-ok">Membership</span>' : '<span class="badge badge-warn">Standard</span>'}</td>
    </tr>`).join('');
}

function renderActivity(items) {
    const build = arr => arr.map(a => {
        const e   = a.event || '';
        const cls = e.includes('member') ? 'member' : e.includes('vote') ? 'vote' : e.includes('wallet') ? 'wallet' : e.includes('ticket') ? 'ticket' : 'other';
        const t   = a.timestamp?.toDate ? a.timestamp.toDate().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : '—';
        return `<div class="feed-item"><div class="fdot ${cls}"></div><div class="feed-body"><div class="feed-desc">${a.description||e}</div><div class="feed-time">${t}</div></div></div>`;
    }).join('');

    const empty = `<div class="empty"><div class="empty-icon">📭</div>No events yet.</div>`;
    const html  = items.length ? build(items) : empty;
    setHTML('fullFeed', html);
    setHTML('miniFeed', items.length ? build(items.slice(0,5)) : empty);
}

function renderNotices(notices) {
    if (!notices.length) {
        setHTML('noticesList', `<div class="empty"><div class="empty-icon">📭</div>No notices yet.</div>`);
        return;
    }
    setHTML('noticesList', notices.map(n => {
        const d = n.sentAt?.toDate ? n.sentAt.toDate().toLocaleString() : '';
        return `<div class="notice-item"><div class="notice-title">${n.title}</div><div class="notice-body">${n.body}</div><div class="notice-meta">${d}</div></div>`;
    }).join(''));
}

/* ═══════════════════════════════════════════════════
   ACTIONS
═══════════════════════════════════════════════════ */
window.toggleMember = async (code, active) => {
    if (!channelData?.id) return;
    try {
        const apiUrl = document.getElementById('settingApiUrl').value.trim();
        const apiKey = document.getElementById('settingApiKey').value.trim();
        const res = await fetch('/api/showtime-proxy', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'updateMember', payload: { pk: channelData.id, data: { code, active } }, apiUrl, apiKey }),
        });
        if (!res.ok) throw new Error('API error');
    } catch (err) { alert(err.message); }
};

document.getElementById('noticeForm').addEventListener('submit', async e => {
    e.preventDefault();
    await addDoc(collection(db, 'events', eventId, 'showtime_notices'), {
        title:  document.getElementById('noticeTitle').value,
        body:   document.getElementById('noticeBody').value,
        sentAt: serverTimestamp(),
        sentBy: 'Admin',
    });
    document.getElementById('noticeTitle').value = '';
    document.getElementById('noticeBody').value  = '';
});

window.copyCode = (code) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(code);
    }
    alert(`Contestant Code #${code} copied!`);
};

window.filterHubMembers = () => {
    const input = document.getElementById('searchMemberInput');
    if (!input) return;
    const query = input.value.trim().toLowerCase();
    const rows = document.querySelectorAll('.hub-member-row');
    rows.forEach(row => {
        const code = row.getAttribute('data-code') || '';
        const name = row.getAttribute('data-name') || '';
        const phone = row.getAttribute('data-phone') || '';
        if (!query || code.includes(query) || name.includes(query) || phone.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
};

/* ═══════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════ */
function setTxt(id, val)  { const el = document.getElementById(id); if (el) el.textContent = val; }
function setHTML(id, val) { const el = document.getElementById(id); if (el) el.innerHTML    = val; }
function setClass(id, cls){
    const el = document.getElementById(id);
    if (!el) return;
    el.className = el.className.replace(/\b(ok|idle|off)\b/g, '').trim() + ' ' + cls;
}
