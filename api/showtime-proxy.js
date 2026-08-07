// /api/showtime-proxy.js
require('dotenv').config();
const { initializeApp, getApps, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Ensure Firebase Admin is initialized
if (!getApps().length) {
    let creds;
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } else {
        const fs = require('fs');
        const path = require('path');
        const svcPath = path.resolve(process.cwd(), 'firebase_sdk.json');
        if (fs.existsSync(svcPath)) {
            creds = JSON.parse(fs.readFileSync(svcPath, 'utf8'));
        }
    }
    
    if (creds) {
        initializeApp({
            credential: cert(creds),
            projectId: creds.project_id
        });
    } else {
        initializeApp(); 
    }
}

const db = getFirestore();

// Module-level config cache — avoids a Firestore read on every proxy call.
// Vercel keeps functions warm between requests, so this persists between calls.
let _configCache = null;
let _configCacheTs = 0;
const CONFIG_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getShowtimeConfig() {
    const now = Date.now();
    if (_configCache && (now - _configCacheTs) < CONFIG_CACHE_TTL) {
        return _configCache;
    }
    // Check environment variables first (higher priority for deployment/security)
    if (process.env.SHOWTIME_API_URL) {
        _configCache = {
            apiUrl: process.env.SHOWTIME_API_URL,
            apiKey: process.env.SHOWTIME_API_KEY || '',
            signingSecret: process.env.SHOWTIME_SIGNING_SECRET || process.env.SHOWTIME_WEBHOOK_SECRET || '',
        };
        _configCacheTs = now;
        return _configCache;
    }
    const configSnap = await db.collection('rafa_config').doc('showtime').get();
    if (!configSnap.exists) return null;
    _configCache = configSnap.data();
    _configCacheTs = now;
    return _configCache;
}

/**
 * Shared fetch helper with 8-second timeout and structured error classification.
 * Throws a classified Error on network/timeout failures so the outer handler
 * can return a consistent JSON error body to the client.
 */
async function proxyFetch(url, options, baseUrl) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);

        const contentType = res.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await res.json();
        } else {
            data = { text: await res.text() };
        }

        return { ok: res.ok, status: res.status, data };

    } catch (err) {
        clearTimeout(timeoutId);

        const isTimeout = err.name === 'AbortError'
            || (err.cause && err.cause.code === 'UND_ERR_CONNECT_TIMEOUT')
            || (err.message && err.message.includes('Connect Timeout'));

        const isNetworkError = !isTimeout && (
            (err.cause && ['ECONNREFUSED', 'ENOTFOUND', 'ECONNRESET'].includes(err.cause.code))
            || err.name === 'TypeError'
        );

        let friendlyMessage;
        if (isTimeout) {
            friendlyMessage = `Connection to Showtime API timed out after 8 seconds. The remote server at ${baseUrl} may be down or unreachable. Check the API URL in Settings.`;
        } else if (isNetworkError) {
            const code = err.cause?.code || 'NETWORK_ERROR';
            friendlyMessage = `Could not reach Showtime API (${code}). The server at ${baseUrl} is unreachable. Check your network and the API URL in Settings.`;
        } else {
            friendlyMessage = err.message || 'Unexpected proxy error';
        }

        const classified = new Error(friendlyMessage);
        classified.statusCode = isTimeout ? 503 : 502;
        classified.code = err.cause?.code || err.name;
        throw classified;
    }
}

module.exports = async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { action, payload } = req.body;

        // Use cached config — avoids Firestore read on every call
        const config = await getShowtimeConfig();
        if (!config) {
            return res.status(500).json({ error: 'Showtime config not found in Rafa config' });
        }
        const baseUrl = config.apiUrl ? config.apiUrl.replace(/\/$/, '') : '';
        const apiKey = config.apiKey;

        if (!baseUrl || !apiKey) {
            return res.status(500).json({ error: 'Showtime URL or API key is missing' });
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Api-Key ${apiKey}`
        };

        let url;
        let options;

        switch (action) {
            case 'createChannel':
                url = `${baseUrl}/api/v/chanel/create/`;
                options = { method: 'POST', headers, body: JSON.stringify(payload) };
                break;
            case 'updateMember':
                url = `${baseUrl}/api/v/chanel/${payload.pk}/contestant/update/`;
                options = { method: 'PUT', headers, body: JSON.stringify(payload.data) };
                break;
            case 'updateChannel':
                url = `${baseUrl}/api/v/chanel/${payload.pk}/update/`;
                options = { method: 'PUT', headers, body: JSON.stringify(payload.data || payload) };
                break;
            case 'addMember':
                url = `${baseUrl}/api/v/chanel/${payload.pk}/add_contestant/`;
                options = { method: 'POST', headers, body: JSON.stringify(payload.data || payload) };
                break;
            case 'fetchContestants':
                url = `${baseUrl}/api/v/chanel/${payload.pk}/contestant/`;
                options = { method: 'GET', headers };
                break;
            case 'fetchTickets':
                url = `${baseUrl}/api/v/chanel/${payload.pk}/ticket/`;
                options = { method: 'GET', headers };
                break;
            case 'getChannel':
                url = `${baseUrl}/api/v/chanel/${payload.pk}/`;
                options = { method: 'GET', headers };
                break;
            case 'verifyHandoff':
                url = `${baseUrl}/api/v/handoff/verify/`;
                options = { method: 'POST', headers, body: JSON.stringify(payload) };
                break;
            case 'findChannel': {
                const params = new URLSearchParams();
                if (payload.rafa_event_id) params.append('rafa_event_id', payload.rafa_event_id);
                if (payload.slug) params.append('slug', payload.slug);
                if (payload.name) params.append('name', payload.name);
                url = `${baseUrl}/api/v/chanel/find/?${params.toString()}`;
                options = { method: 'GET', headers };
                break;
            }
            case 'testConnection':
                url = `${baseUrl}/api/v/chanel/${payload?.pk || 3}/`;
                options = { method: 'GET', headers };
                break;
            default:
                return res.status(400).json({ error: `Unknown action: ${action}` });
        }

        const { ok, status, data } = await proxyFetch(url, options, baseUrl);

        if (!ok) {
            return res.status(status).json({ error: data });
        }

        return res.status(200).json(data);

    } catch (err) {
        console.error('[Showtime Proxy] Error:', err.message, err.code || '');
        return res.status(err.statusCode || 500).json({ error: err.message, code: err.code });
    }
}
