# SD-Arcade 🕹️

**SD-Arcade** is a production-ready, browser-based retro gaming platform. Users can create accounts, upload their legally owned ROMs, and instantly play their games directly in the browser via EmulatorJS. 

> **Important**: All ROMs are securely stored **locally** on your device using IndexedDB. The backend only tracks user accounts, game metadata (title, play time), and save state architecture. We do not host or distribute any copyrighted game files.

## 🚀 Features
- **Local ROM Storage**: Upload `.nes`, `.sfc`, and `.gba` ROMs directly into your browser's IndexedDB.
- **Cross-Device Sync**: Your library metadata and playtime sync across all devices via MongoDB.
- **In-Browser Emulation**: Seamless integration with EmulatorJS.
- **Premium Glassmorphism UI**: Modern aesthetic with dark themes, neon glow, and dynamic animations.
- **Mobile Optimized**: Automatically detects mobile orientation and provides portrait/landscape optimization.
- **Multiplayer Architecture Ready**: Placholders have been prepared for Socket.io network play.

---

## 🛠️ Technology Stack
- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS v4, Redux Toolkit, Framer Motion, IndexedDB
- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT (HttpOnly Cookies), Socket.IO
- **Emulation**: EmulatorJS

---

## 📥 Installation Guide

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

*(Alternatively, you can manually run `npm install` inside both the `/frontend` and `/backend` directories).*

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

---

## 💻 How to Run Locally

You can spin up both the frontend and backend simultaneously from the root directory!

### Option A: Run Both Simultaneously (Recommended)
```bash
npm run dev
```
This command uses `concurrently` to start:
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5000`

### Option B: Run Separately
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

Simply open `http://localhost:3000` in your browser to start playing!

---

## 🔒 Production Guide

When you are ready to deploy:

1. **Backend Deployment (e.g., Render, Railway, Heroku)**:
   - Ensure you update the `.env` variables with production values (secure `JWT_SECRET`, actual `FRONTEND_URL`, and MongoDB Atlas URI).
   - The backend runs using `npm start` (which executes `node server.js`).
   
2. **Frontend Deployment (e.g., Vercel, Netlify)**:
   - Provide the backend API URL to the frontend. By default, it looks for `NEXT_PUBLIC_API_URL` environment variable.
   - Build the frontend using `npm run build` and start it using `npm start`.

3. **Cookies & CORS**:
   - Make sure `FRONTEND_URL` in the backend matches the deployed frontend exactly to allow CORS.
   - The HttpOnly JWT cookie requires secure context (HTTPS) in production.

---

## ⚖️ Legal Disclaimer
Upload only ROMs you legally own. SD-Arcade does not provide copyrighted game files. The platform is designed solely as a local personal library manager and browser-based player.
