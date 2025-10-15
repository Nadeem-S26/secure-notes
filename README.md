# 🔒 Secure Notes App

A full-stack encrypted note-taking application with tag-based filtering, user authentication, and modern UI.

**Live Demo:** (https://secure-notes-umber.vercel.app)

**TRY OUT USING:** 
**User-mail:** test1@gmail.com 
**password:** test1@123

---

## 📋 Problem Statement

Many note-taking applications lack proper security and organization features. Users need:
- Secure storage with encryption for sensitive information
- Easy organization through tags and categoriess
- Privacy control over their personal data

**Solution:** This app provides AES-256 encrypted note storage, JWT authentication, tag-based filtering, and a professional full-screen interface with dark/light theme support.

---

## 🛠️ Tech Stack
- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express, MongoDB Atlas
- Deployment: Vercel (Frontend), Render (Backend)

---

## 🚀 Steps to Run the Project

### Prerequisites
- Node.js (v14+)
- npm
- MongoDB Atlas account

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/secure-notes-app.git
cd secure-notes-app
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-super-secret-jwt-key-32-chars-minimum
ENCRYPTION_KEY=run_command_below_to_generate
PORT=5000
```

Generate encryption key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Start backend:
```bash
npm start
# Server runs on http://localhost:5000
```

### 3. Setup Frontend
Open new terminal:
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

### 4. Access Application
Open browser: `http://localhost:3000`

Register new account and start creating notes!

---

## 📸 Screenshots

### Login Page
<img width="1858" height="914" alt="image" src="https://github.com/user-attachments/assets/6e399da1-5a4d-49f3-a2c4-7dac87ed42cd" />

### Dashboard 
<img width="1822" height="934" alt="image" src="https://github.com/user-attachments/assets/51c8cd66-6a21-4a98-b0a6-0ba55a71a2fe" />

### Create Note Modal
<img width="1853" height="886" alt="image" src="https://github.com/user-attachments/assets/1a77ba42-b9fb-40e1-8831-c17e6c58e3fa" />

---

## 🌐 Deployment Link

**Live Application:** (https://secure-notes-umber.vercel.app)

**API Endpoint:** (https://secure-notes-backend-pblm.onrender.com)

