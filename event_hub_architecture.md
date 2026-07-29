# REFA Event Hub — Master Architecture Blueprint & Event Management System Blueprint

> **The Ultimate Multi-Event Command Center & AI Strategist Blueprint**  
> A comprehensive architectural guide, design system specification, and implementation blueprint for scaling the **REFA Event Command Center Model** across multiple concurrent competitions, leagues, and events.

---

## 1. Architectural Vision & Paradigm

The **REFA Event Hub Model** has evolved from a single-event dashboard into a **Multi-Event Platform** powered by Artificial Intelligence. It is designed to act as a unified command center, integrating:

1. **AI Event Strategist**: An integrated Google Gemini AI engine that auto-generates comprehensive event strategies, phases, tasks, and financial projections based on a simple brief.
2. **Global Event Manager & URL Routing**: Run multiple completely isolated events simultaneously. The active event is loaded dynamically via URL parameter (e.g., `?event=youth-quiz-2027`).
3. **Role-Based Command Center**: Secure pass-key login with role-specific visibility (Executives, Operations, Media Crews, Guests).
4. **Global Real-Time Task Execution Engine**: Live Cloud Firestore task synchronization across all devices and team members, scoped perfectly to the active event.
5. **Dynamic Theme Engine**: 6 built-in premium visual themes that instantly re-skin the entire app based on the active event's brand.
6. **Zero-Data Local Media Transfer Hub**: Instant local Wi-Fi / SMB server for transferring multi-gigabyte 4K camera footage without internet data consumption.
7. **Automated Document & Graphics Studio**: Instant creation of official sponsorship letters and dynamic social media graphics hooked to the active event's theme and data.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 REFA EVENT HUB ARCHITECTURE                            │
├──────────────────────────────────────┬─────────────────────────────────────────────────┤
│         FRONTEND LAYER               │                 DATA & BACKEND LAYER            │
│  - Vanilla JS SPA (Module Architecture)│  - Google Cloud Firestore (Real-Time DB)        │
│  - Multi-Event URL Router (`?event=`)│  - Vercel Serverless Functions (`/api/`)        │
│  - Dynamic CSS Theme Engine          │  - Google Gemini AI (`@google/genai`)           │
│  - Real-Time Firestore Listeners     │  - Firebase Auth & Security Rules Engine        │
│  - Glassmorphic UI & Role Passkeys   │  - Express.js Local Network Drop Server         │
└──────────────────────────────────────┴─────────────────────────────────────────────────┘
```

---

## 2. Multi-Event Architecture & Data Isolation

The biggest paradigm shift in the Hub is **Data Isolation**. Data is no longer mashed together globally; it is strictly scoped to specific Event IDs.

### A. The Core Firestore Event Schema

The root of all event data is the `events` collection.
- **Document Key**: `eventId` (e.g., `refa-season-3`, `youth-quiz-2027`)

```json
{
  "id": "refa-season-3",
  "name": "REFA Season 3",
  "tagline": "Words That Last",
  "theme": "royal-gold",
  "aiGenerated": true,
  "config": {
    "startDate": "2026-08-01",
    "targetContestants": 10
  },
  "financials": {
    "revenueStreams": [ { "source": "Voting", "unitPrice": 100 } ]
  }
}
```

### B. Nested Sub-Collections

All execution data lives *underneath* the specific event document. This means creating a new event gives you a clean slate without deleting past data.

1. **Tasks**: `events/{eventId}/tasks`
2. **Teams**: `events/{eventId}/teams`
3. **Content Schedule**: `events/{eventId}/content_schedule`
4. **Votes/Transactions**: `events/{eventId}/votes`

---

## 3. The AI Event Strategist Engine

To rapidly spin up new events, the Hub features an integrated AI Strategist powered by Google Gemini via Vercel Serverless Functions.

### A. The 2-Stage Generation Flow
To conserve tokens and allow for human review, the AI operates in two stages:
1. **Preview Stage (`/api/preview-strategy.js`)**: Generates a lightweight snapshot (Phase list, Top-line revenue, Budget estimates) for the user to review.
2. **Full Generation Stage (`/api/generate-event-strategy.js`)**: Once approved, generates the heavy payload containing 50+ granular tasks, daily content schedules, and detailed risk mitigation.
3. **Refinement Loop (`/api/refine-strategy.js`)**: Allows the user to chat with the AI to tweak the strategy surgically before deployment.

### B. Deployment
When an AI strategy is deployed, it writes the shell config to the `events/{eventId}` document, and fans out the generated tasks into the `events/{eventId}/tasks` subcollection.

---

## 4. Design System & Dynamic Theme Engine

The UI/UX is built to evoke a **premium, broadcast-quality experience**. To support multiple events, hardcoded colors have been replaced by a **Dynamic Theme Engine**.

### A. The Theme Dictionary (`events.js`)
6 Premium Themes are built-in:
1. **Royal Gold**: `#D4AF37` / `#08172E`
2. **Crimson Glory**: `#E63946` / `#450a0a`
3. **Emerald Grace**: `#10B981` / `#064e3b`
4. **Midnight Steel**: `#38BDF8` / `#0f172a`
5. **Sunset Fire**: `#F97316` / `#431407`
6. **Violet Kingdom**: `#8B5CF6` / `#2e1065`

### B. CSS Variables Application
When an event loads, the app dynamically injects these colors into root CSS variables:
```javascript
document.documentElement.style.setProperty('--brand-primary', theme.colors.primary);
document.documentElement.style.setProperty('--brand-accent', theme.colors.accent);
```
All components, buttons, and graphics studio templates inherit these variables instantly.

---

## 5. Role-Based Access Control (RBAC)

The hub enforces **Role-Based Pass Keys** with database-driven **Maximum Usage Limits (`maxUses`)**.

| Role ID | Default Pass Key | Max Uses | Title | Visible Sections & Permissions |
|---|---|---|---|---|
| `admin` | `REFA-ADMIN-2026` | 5 | Executive Admin | **Full Access**: All 14 tools, Financials, Pitch Deck, Letter & Account Generators, Team Manager, Media Drop, Tasks. |
| `media` | `REFA-MEDIA-2026` | 15 | Media & Studio Lead | **Media & Content**: Dashboard, Tasks, Media Vault, Studio Templates, Content Scheduler (Hides Pitch Deck & Financial Generators). |
| `ops` | `REFA-TEAM-2026` | 30 | Operations & Mentor | **Ops & Tasks**: Dashboard, Tasks, Voting Engine, Team Manager, Event Schedule (Hides Pitch Deck & Generators). |
| `viewer` | `REFA-GUEST-2026` | 100 | Guest Visitor | **Public Read-Only**: Dashboard & Event Timeline (Hides all management & financial tools). |

---

## 6. Local Network Zero-Data Media Drop Hub

For live physical events, venue internet is often unreliable. The event hub includes a **Local Node.js Media Drop Server**:

- **Zero Internet Data**: Operates over local venue Wi-Fi / Hotspot.
- **Auto Endpoint Detection**: Detects host IP addresses (`http://<HOST-IP>:3000`).
- **Direct Network Share (SMB)**: Mounts `\\<HOST-IP>\uploads` directly in Windows File Explorer or Mac Finder (`smb://<HOST-IP>/uploads`).

---

## 7. Step-by-Step Blueprint: Expanding & Contributing

To contribute to or deploy this Hub model for a new competition:

### Step 1: Clone & Install Dependencies
```bash
git clone https://github.com/frank9th/refa-hub.git my-event-hub
cd my-event-hub
npm install
```

### Step 2: Configure Environment Variables
Create a `.env.local` file at the root for Vercel/AI functions:
```
GEMINI_API_KEY=AQ...your_actual_key_here
```

### Step 3: Configure Firebase Project
1. Create a project in [Firebase Console](https://console.firebase.google.com).
2. Register a Web App and update `firebaseConfig` in `js/firebase-init.js`.

### Step 4: Seed Database Defaults
Run the provided automated seed scripts to establish initial passkeys and global defaults:
```bash
node scripts/seed-passkeys.js
```

### Step 5: Start Development Environment
Because of the Vercel Serverless Functions (`/api/*`), you **must** use the Vercel CLI for local development:
```bash
npx vercel dev
```
Navigate to `http://localhost:3000/events.html` to access the Global Event Manager.

---

## 8. Summary Blueprint Checklist for Contributors

- [x] **Always Use CSS Variables**: When adding new UI components, never hardcode colors. Use `var(--brand-primary)` and `var(--brand-accent)`.
- [x] **Event-Scoped Queries**: When reading/writing to Firestore, ensure you are writing to `events/${activeEventId}/...` rather than global collections.
- [x] **Vercel Dev**: Always use `npx vercel dev` to test the AI serverless functions locally.
- [x] **Role Access Control**: Protect navigation & section guards based on authenticated pass-key role.
