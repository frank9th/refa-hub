// /api/showtime-webhook.js
import { ai, extractJsonFromText } from './ai-config.js'; // Might not be needed, just for consistency
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';
dotenv.config();

// Ensure Firebase Admin is initialized
if (!getApps().length) {
    let creds;
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } else {
        // Fallback for local testing if needed, though Vercel should use the env var
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
        initializeApp(); // Default
    }
}

const db = getFirestore();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { event, chanel_id, rafa_event_id, data } = req.body;
        const secretHeader = req.headers['x-webhook-secret'];

        if (!rafa_event_id) {
            return res.status(400).json({ error: 'Missing rafa_event_id' });
        }

        const eventId = rafa_event_id;
        const configRef = db.collection('events').doc(eventId).collection('showtime_channel').doc('config');

        // Fast path: verify secret from env var — avoids 1 Firestore read per webhook event
        const envSecret = process.env.SHOWTIME_WEBHOOK_SECRET || process.env.SHOWTIME_SIGNING_SECRET;
        if (envSecret) {
            if (secretHeader !== envSecret) {
                return res.status(401).json({ error: 'Unauthorized webhook' });
            }
            // Still update lastWebhookAt without reading the doc first
            await configRef.update({ lastWebhookAt: FieldValue.serverTimestamp() });
        } else {
            // Fallback: verify against the stored secret in Firestore
            const configSnap = await configRef.get();
            if (!configSnap.exists) {
                return res.status(404).json({ error: 'Channel config not found in Rafa' });
            }
            const config = configSnap.data();
            if (config.webhookSecret !== secretHeader) {
                return res.status(401).json({ error: 'Unauthorized webhook' });
            }
            await configRef.update({ lastWebhookAt: FieldValue.serverTimestamp() });
        }

        // Log Activity
        const logActivity = async (desc) => {
            await db.collection('events').doc(eventId).collection('showtime_activity').add({
                event: event,
                description: desc,
                timestamp: FieldValue.serverTimestamp()
            });
        };

        // Handle Events
        switch (event) {
            case 'channel.created':
                await configRef.set({ ...config, ...data }, { merge: true });
                await logActivity(`Channel created: ${data.name || chanel_id}`);
                break;
            case 'channel.updated':
                await configRef.set(data, { merge: true });
                await logActivity(`Channel updated`);
                break;
            case 'member.registered':
                if (data.code) {
                    await db.collection('events').doc(eventId).collection('showtime_members').doc(data.code).set(data, { merge: true });
                    // Increment summary
                    const ordersRef = db.collection('events').doc(eventId).collection('showtime_orders').doc('summary');
                    await ordersRef.set({
                        totalOrders: FieldValue.increment(1),
                        lastUpdated: FieldValue.serverTimestamp()
                    }, { merge: true });
                    await logActivity(`New member registered: ${data.profile?.username || data.code} (#${data.code})`);
                }
                break;
            case 'member.status_changed':
                if (data.code) {
                    await db.collection('events').doc(eventId).collection('showtime_members').doc(data.code).set({ active: data.active }, { merge: true });
                    await logActivity(`Member #${data.code} status changed to ${data.active ? 'Active' : 'Pending'}`);
                }
                break;
            case 'member.deleted':
                if (data.code) {
                    await db.collection('events').doc(eventId).collection('showtime_members').doc(data.code).delete();
                    await logActivity(`Member #${data.code} deleted`);
                }
                break;
            case 'vote.cast':
                if (data.contestant_code) {
                    await db.collection('events').doc(eventId).collection('showtime_members').doc(data.contestant_code).set({ votes: data.votes }, { merge: true });
                    await db.collection('events').doc(eventId).collection('showtime_leaderboard').doc(data.contestant_code).set({ votes: data.votes }, { merge: true });
                    await logActivity(`Vote cast for contestant #${data.contestant_code} (Total: ${data.votes})`);
                }
                break;
            case 'nominee.vote_cast':
                if (data.nominee_id) {
                    await db.collection('events').doc(eventId).collection('showtime_nominees').doc(String(data.nominee_id)).set({ votes: data.votes }, { merge: true });
                    await logActivity(`Vote cast for nominee #${data.nominee_id} (Total: ${data.votes})`);
                }
                break;
            case 'wallet.updated':
                await configRef.set({ wallet: data.wallet }, { merge: true });
                await logActivity(`Wallet updated: new balance ${data.wallet}`);
                break;
            case 'ticket.created':
                if (data.id) {
                    await db.collection('events').doc(eventId).collection('showtime_tickets').doc(String(data.id)).set(data, { merge: true });
                    await logActivity(`Ticket created: ${data.lable || data.id}`);
                }
                break;
            case 'ticket.deleted':
                if (data.ticket_id) {
                    await db.collection('events').doc(eventId).collection('showtime_tickets').doc(String(data.ticket_id)).delete();
                    await logActivity(`Ticket deleted: ${data.ticket_id}`);
                }
                break;
            default:
                console.log(`Unhandled webhook event: ${event}`);
                break;
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: error.message });
    }
}
