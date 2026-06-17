# SD-Arcade 🕹️

**SD-Arcade** is a production-ready, browser-based retro gaming platform with seamless P2P Multiplayer. Users can create accounts, upload their legally owned ROMs, and instantly play their games directly in the browser with high-performance WebRTC multiplayer, native gamepad support, and deeply customizable virtual controls.

> **Important**: All ROMs are securely stored **locally** on your device using IndexedDB. The backend only tracks user accounts, game metadata, save states, and handles WebSocket signaling for P2P multiplayer. We do not host or distribute any copyrighted game files.

## 🚀 Features
- **True P2P Multiplayer**: Invite friends to play via WebRTC peer-to-peer connections! Ultra-low latency gameplay without funneling emulator frames through a central server. Socket.io is used purely for session signaling.
- **Local ROM Storage**: Upload `.nes`, `.sfc`, `.md`, and `.gba` ROMs directly into your browser's IndexedDB.
- **Advanced Virtual Controller**:
  - Fully customizable on-screen control layouts (drag-and-drop repositioning, scale, and opacity).
  - Remappable keyboard controls.
  - Multi-touch macro stacking (press multiple virtual buttons with one thumb).
  - Dynamic Floating Mobile D-Pad that spawns wherever you touch the screen.
- **Native Gamepad Support**: Plug-and-play support for physical Xbox, PlayStation, and Bluetooth controllers via the HTML5 Gamepad API. Physical inputs work independently of your custom keyboard mapping.
- **Cross-Device Sync**: Your library metadata and playtime sync across all devices via MongoDB.
- **Premium Glassmorphism UI**: Modern aesthetic with dark themes, responsive neon branding, and dynamic animations.

---

## 🛠️ Current Technology Stack
### Frontend
- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v4, Framer Motion
- **State Management**: Redux Toolkit
- **Storage**: IndexedDB (for ROMs)
- **Emulation**: Nostalgist.js (EmulatorJS Core)
- **Networking**: WebRTC (RTCPeerConnection) for P2P Gaming

### Backend
- **Framework**: Node.js, Express.js
- **Database**: MongoDB Atlas, Mongoose
- **Authentication**: JWT (HttpOnly Cookies)
- **Networking**: Socket.IO (for WebRTC Signaling & Lobbies)

---

## 📥 Installation & Local Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- A MongoDB Database (Local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/sd-arcade.git
cd sd-arcade
```

### 2. Install dependencies
We use a monorepo setup. You can install all dependencies from the root directory using the setup script:
```bash
npm run install-all
```
*(Alternatively, manually run `npm install` inside both the `/frontend` and `/backend` directories).*

### 3. Environment Variables
You need to configure the backend environment variables before starting the server.
Create a `.env` file inside the `/backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/sd-arcade
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```
*Note: Make sure your MongoDB instance is running locally, or replace the URI with your MongoDB Atlas connection string.*

Create a `.env.local` inside the `/frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 4. Run Locally

#### Option A: Run Both Simultaneously (Root Directory)
```bash
npm run dev
```
This command uses `concurrently` to start:
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5000`

#### Option B: Run Separately
If you prefer running them in separate terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

---

## 🔒 Production Deployment Guide

You can deploy the Frontend and Backend as two separate services, or bundle them together into a single unified service.

### Option A: Unified Full-Stack Deployment (Render)
You can deploy both the frontend and backend together as a single Web Service on platforms like **Render**.
1. Set the **Root Directory** to the root of the repo (leave empty).
2. **Build Command**: 
   ```bash
    npm run build
   ```
3. **Start Command**: 
   ```bash
   npm start
   ```
   *(Note: You will need a simple `package.json` in the root with `"start": "cd backend && npm start"` and ensure the backend serves the frontend static build, or use a custom script).*
4. Set your production **Environment Variables**:
   - `MONGODB_URI`: Your MongoDB Atlas URI.
   - `JWT_SECRET`: A strong random string.
   - `NODE_ENV`: `production`

### Option B: Separate Services (Recommended for Vercel/Netlify)

#### 1. Backend Deployment (e.g., Render, Railway)
1. Set the Root Directory to `/backend`.
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. Set your production Environment Variables:
   - `PORT`: (Usually provided by the host)
   - `MONGODB_URI`: Your MongoDB Atlas URI.
   - `JWT_SECRET`: A strong random string.
   - `FRONTEND_URL`: The production URL of your frontend (e.g., `https://sd-arcade.vercel.app`) to allow CORS.
   - `NODE_ENV`: `production`

#### 2. Frontend Deployment (e.g., Vercel, Netlify)
1. Set the Root Directory to `/frontend`.
2. Build Command: `npm run build`
3. Output Directory: `.next`
4. Set your production Environment Variables:
   - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://sd-arcade-backend.onrender.com`).
   - `NEXT_PUBLIC_SOCKET_URL`: The URL of your deployed backend.

### Important Production Notes
- **WebRTC STUN/TURN**: The platform uses public Google STUN servers for WebRTC. If players are on strict NATs (cellular data, corporate networks), a TURN server (like Twilio or Coturn) may need to be implemented for guaranteed P2P connections.
- **Cookies**: The HttpOnly JWT authentication cookie requires a secure context (HTTPS) to be passed across domains in production. Ensure your backend sets `secure: true` and `sameSite: 'none'` on cookies when `NODE_ENV === 'production'`.

---

## ⚖️ Legal Disclaimer
Upload only ROMs you legally own. SD-Arcade does not provide copyrighted game files. The platform is designed solely as a local personal library manager and browser-based player.
