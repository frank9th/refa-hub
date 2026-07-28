# REFA Event Hub — Master Architecture Blueprint & Event Management System Blueprint

> **The Ultimate Event Command Center Blueprint**  
> A comprehensive architectural guide, design system specification, and implementation blueprint for replicating and scaling the **REFA Event Command Center Model** across any competition, league, conference, or multi-phase event.

---

## 1. Architectural Vision & Paradigm

The **REFA Event Hub Model** is designed around a single core principle: **Unified Event Command**. Instead of fragmenting event management across static spreadsheets, separate messaging groups, standalone drive links, and manual trackers, the Event Hub integrates:

1. **Role-Based Command Center**: Secure pass-key login with role-specific visibility (Executives, Operations, Media Crews, Guests).
2. **Global Real-Time Task Execution Engine**: Live Cloud Firestore task synchronization across all devices and team members.
3. **Dynamic Event Timeline & Countdown**: Auto-calculated countdowns and phase-aware dashboard cards based on live system clocks.
4. **Zero-Data Local Media Transfer Hub**: Instant local Wi-Fi / SMB server for transferring multi-gigabyte 4K camera footage without internet data consumption.
5. **Global Content Scheduling Calendar**: Real-time cross-platform social media post planner and queue.
6. **Automated Document & Account Generators**: Instant creation of official sponsorship letters and voter credentials.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 REFA EVENT HUB ARCHITECTURE                             │
├──────────────────────────────────────┬─────────────────────────────────────────────────┤
│         FRONTEND LAYER               │                 DATA & BACKEND LAYER            │
│  - Vanilla JS SPA (Module Architecture)│  - Google Cloud Firestore (Real-Time DB)        │
│  - Glassmorphic UI & Role Passkeys   │  - Express.js Local Network Drop Server         │
│  - Real-Time Firestore Listeners     │  - Firebase Auth & Security Rules Engine        │
│  - Responsive CSS Grid / Flexbox     │  - Offline IndexedDB Local Persistence          │
└──────────────────────────────────────┴─────────────────────────────────────────────────┘
```

---

## 2. Design System & Visual Language (UI/UX)

The UI/UX is built to evoke a **premium, broadcast-quality experience** that wows stakeholders, sponsors, and team members upon launch.

### A. Color Palette Tokens
| Token Name | Hex Code | Visual Purpose |
|---|---|---|
| `--navy` | `#08172E` | Primary Navigation & Header Backdrop |
| `--navy-mid` | `#0D2145` | Card Headers & Highlight Sections |
| `--navy-light` | `#152D5A` | Interactive Hover States |
| `--gold` | `#D4AF37` | Accent Color, Season Badges, Active States |
| `--gold-light` | `#F0D060` | Hover Accent & Progress Bars |
| `--ivory` | `#F7F4EE` | Main Application Background |
| `--white` | `#FFFFFF` | Content Card Backgrounds |
| `--success` | `#22C55E` | Completed Status & Real-time Live Badges |
| `--warn` | `#F59E0B` | In-Progress & Scheduled Warnings |
| `--danger` | `#EF4444` | High-Priority Alerts & Delete Actions |

### B. Typography Hierarchy
- **Primary Body Font**: `Inter, sans-serif` (Clean, legible, modern UI typeface).
- **Display Header Font**: `Playfair Display, serif` (Used for page titles, luxury event headers, and team titles).
- **Secondary Display Fonts**: `Bebas Neue` (Championship badges & scores) and `Great Vibes` (Signatures & certificates).

### C. Glassmorphism & Translucent Lock Screen
The authentication overlay uses a **translucent frosted-glass backdrop** allowing the underlying event layout to be subtly visible while locked:
```css
#auth-lock-overlay {
  position: fixed !important;
  top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
  width: 100vw !important; height: 100vh !important;
  background: rgba(15, 23, 42, 0.65) !important;
  backdrop-filter: blur(6px) !important;
  -webkit-backdrop-filter: blur(6px) !important;
  z-index: 999999 !important;
}
```

---

## 3. Role-Based Access Control (RBAC) & Security Blueprint

The hub enforces **Role-Based Pass Keys** with database-driven **Maximum Usage Limits (`maxUses`)**.

### A. Pass-Key Matrix Definition

| Role ID | Default Pass Key | Max Uses | Title | Visible Sections & Permissions |
|---|---|---|---|---|
| `admin` | `REFA-ADMIN-2026` | 5 | Executive Admin | **Full Access**: All 14 tools, Financials, Pitch Deck, Letter & Account Generators, Team Manager, Media Drop, Tasks. |
| `media` | `REFA-MEDIA-2026` | 15 | Media & Studio Lead | **Media & Content**: Dashboard, Tasks, Media Vault, Studio Templates, Content Scheduler (Hides Pitch Deck & Financial Generators). |
| `ops` | `REFA-TEAM-2026` | 30 | Operations & Mentor | **Ops & Tasks**: Dashboard, Tasks, Voting Engine, Team Manager, Event Schedule (Hides Pitch Deck & Generators). |
| `viewer` | `REFA-GUEST-2026` | 100 | Guest Visitor | **Public Read-Only**: Dashboard & Event Timeline (Hides all management & financial tools). |

### B. Access Control Execution Flow
```mermaid
graph TD
  A[User Launches App / Opens Link] --> B{Active Session in Storage?}
  B -- Yes --> C[Load User Role & Allowed Pages]
  B -- No --> D[Display Translucent Lock Overlay]
  D --> E[User Enters Name & Pass Key]
  E --> F[Query Firestore 'passkeys/{key}']
  F -- Key Not Found / Deactivated --> G[Show Error: 'Invalid Key']
  F -- Key Found --> H{currentUses >= maxUses?}
  H -- Yes --> I[Show Error: 'Usage Limit Reached']
  H -- No --> J[Increment currentUses in DB & Log Session]
  J --> K[Store Session & Hide Lock Screen]
  C --> L[Filter Navigation & Enforce Page Guards]
```

---

## 4. Global Database & Real-Time Data Architecture

The global state is hosted on **Google Cloud Firestore** with real-time `onSnapshot` subscriptions and offline **IndexedDB persistence**.

### A. Core Firestore Document Schemas

#### 1. `tasks` Collection
- **Document Key**: `taskId` (e.g. `ps1`, `au1`, `s1a`)
```json
{
  "id": "ps1",
  "phaseId": "preseason",
  "text": "Finalise Season 2 branding",
  "detail": "Logo, colours, fonts, season name and theme locked",
  "tag": "ops",
  "completed": false,
  "completedBy": "Pastor David",
  "updatedAt": "2026-07-29T00:00:00Z"
}
```

#### 2. `teams` Collection
- **Document Key**: `teamId` (e.g. `team-1`, `team-2`)
```json
{
  "id": "team-1",
  "num": 1,
  "name": "Eagles of Zion",
  "color": "#1A3A8F",
  "mentor": "Pastor David",
  "memberCount": 10,
  "createdAt": "2026-07-29T00:00:00Z"
}
```

#### 3. `content_schedule` Collection
- **Document Key**: `itemId` (e.g. `post-101`)
```json
{
  "id": "post-101",
  "title": "Screening Day Teaser Reel",
  "platform": "Instagram Reels",
  "scheduledDate": "2026-08-01",
  "scheduledTime": "18:00",
  "assignee": "Media Team",
  "status": "Scheduled",
  "notes": "Feature lobby atmosphere and parent arrival clips.",
  "createdAt": "2026-07-29T00:00:00Z"
}
```

#### 4. `passkeys` Collection
- **Document Key**: `passkey` (e.g. `REFA-ADMIN-2026`)
```json
{
  "key": "REFA-ADMIN-2026",
  "role": "admin",
  "title": "Executive Admin",
  "maxUses": 5,
  "currentUses": 1,
  "active": true,
  "allowedPages": ["dashboard", "tasks", "strategy", "voting", "sponsors", "letters", "accounts", "media", "studio"]
}
```

#### 5. `media_uploads` Collection
- **Document Key**: Cleaned filename string
```json
{
  "id": "1722214400-hero.jpg",
  "name": "1722214400-hero.jpg",
  "uploader": "Media Lead",
  "size": "2.05 MB",
  "bytes": 2048500,
  "category": "image",
  "updatedAt": "2026-07-29T00:00:00Z"
}
```

---

## 5. Local Network Zero-Data Media Drop Hub

For live physical events, venue internet is often unreliable or slow for uploading massive 4K raw video files. The event hub includes a **Local Node.js Media Drop Server**:

### Key Features:
- **Zero Internet Data**: Operates over local venue Wi-Fi / Hotspot.
- **Auto Endpoint Detection**: Detects host IP addresses (`http://<HOST-IP>:3000`) and displays them live on the UI.
- **Direct Network Share (SMB)**: Mounts `\\<HOST-IP>\uploads` directly in Windows File Explorer or Mac Finder (`smb://<HOST-IP>/uploads`).
- **Global Index Sync**: When a file is dropped locally, `recordMediaUploadInDb()` indexes the file in Firestore so online remote team members are instantly aware of new media drops.

---

## 6. Dynamic Event Clock & Countdown Engine

The hub eliminates hardcoded static dates on dashboard cards by computing phase progress dynamically from the system clock:

```js
function getDynamicCurrentPhaseData() {
  const now = new Date();
  const formattedToday = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Define Key Event Milestone Dates
  const auditionDate = new Date(2026, 7, 1);   // Aug 1
  const stage1Date   = new Date(2026, 7, 9);   // Aug 9
  const stage2Date   = new Date(2026, 7, 16);  // Aug 16
  const finalDate    = new Date(2026, 8, 6);   // Sep 6

  function getDaysUntil(targetDate) {
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    return Math.ceil((targetMidnight - todayMidnight) / (1000 * 60 * 60 * 24));
  }

  const daysToAudition = getDaysUntil(auditionDate);
  
  if (daysToAudition > 0) {
    return {
      date: `${formattedToday} — PRE-EVENT URGENCY`,
      title: `Pre-Event Setup — Event is ${daysToAudition} Days Away`,
      desc: `Target date is August 1. ${daysToAudition} days remaining to finalize venue, registrations, and tech testing.`
    };
  }
  // Additional dynamic phase branches...
}
```

---

## 7. Step-by-Step Blueprint: Replicating for a New Event

To deploy this exact Event Hub model for a new competition, conference, or tournament:

### Step 1: Clone Repository & Update Configurations
```bash
git clone https://github.com/frank9th/refa-hub.git my-event-hub
cd my-event-hub
npm install
```

### Step 2: Configure Firebase Project
1. Create a new project in [Firebase Console](https://console.firebase.google.com).
2. Enable **Cloud Firestore** in Native Mode.
3. Register a Web App and update `firebaseConfig` in `js/firebase-init.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "SENDER_ID",
     appId: "APP_ID"
   };
   ```

### Step 3: Seed Database Defaults
Run the provided automated seed scripts:
```bash
node scripts/seed-tasks.js
node scripts/seed-passkeys.js
node scripts/seed-global-defaults.js
```

### Step 4: Deploy & Launch
- **Local Server**: Run `npm start` or double-click `start.bat` / `start.command`.
- **Global Deployment**: Run `npx firebase-tools deploy` to host on Firebase Hosting with zero cost.

---

## 8. Summary Blueprint Checklist for Designers & Developers

- [x] **Glassmorphic UI Tokenization**: Ensure all colors, fonts, and card styles use CSS variables.
- [x] **Translucent Lock Screen**: Enforce position fixed `z-index: 999999` with backdrop blur.
- [x] **Role Access Control**: Protect navigation & section guards based on authenticated pass-key role.
- [x] **Database Limit Enforcement**: Track `currentUses` vs `maxUses` on pass keys in Firestore.
- [x] **Real-Time Data Streaming**: Use Firestore `onSnapshot` for tasks, teams, content schedule, and media assets.
- [x] **Zero-Data Local Media Drop**: Host Express.js upload server for heavy 4K media files.
- [x] **Dynamic Event Clock**: Compute event milestone countdowns live from browser time.
