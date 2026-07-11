# 💬 Talkie — Real-time Chat Application

A full-stack real-time chat application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO** for instant messaging.

---

## ✨ Features

- **Real-time Messaging** — Instant message delivery using Socket.IO
- **User Authentication** — Secure sign-up, sign-in, and sign-out with JWT & HTTP-only cookies
- **Media Sharing** — Send images and videos in chat (stored via Cloudinary)
- **Profile Management** — Update your name, email, and avatar
- **Online Status** — See who's online in real-time
- **Responsive Design** — Works on desktop and mobile with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer      | Technology                                                     |
|------------|----------------------------------------------------------------|
| Frontend   | React 19, Redux Toolkit, React Router, Tailwind CSS v4, Vite  |
| Backend    | Node.js, Express 5, Socket.IO                                 |
| Database   | MongoDB with Mongoose                                         |
| Auth       | JSON Web Tokens (JWT), bcryptjs                                |
| Media      | Cloudinary (image/video uploads)                               |
| Real-time  | Socket.IO (WebSocket)                                          |

---

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── config/             # Environment configuration
│   ├── controllers/        # Route handlers (user, message)
│   ├── database/           # MongoDB connection
│   ├── middlewares/        # Auth & error handling middleware
│   ├── models/             # Mongoose schemas (User, Message)
│   ├── routes/             # Express routes
│   ├── utils/              # JWT helper, Socket.IO setup
│   ├── temp/               # Temporary file uploads
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   └── package.json
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Home, Login, Register, Profile)
│   │   ├── store/          # Redux store & slices
│   │   ├── lib/            # Axios & Socket.IO client setup
│   │   ├── App.jsx         # Root component with routing
│   │   └── main.jsx        # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .dist/                  # Production build output (git-ignored)
├── .gitignore
├── package.json            # Root scripts for build & deploy
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Cloudinary** account ([sign up free](https://cloudinary.com/users/register_free))

### 1. Clone the Repository

```bash
git clone https://github.com/akshay-25-dev/Chat_App.git
cd Chat_App
```

### 2. Install Dependencies

```bash
# Install all dependencies (backend + frontend)
npm run install:all
```

### 3. Configure Environment Variables

```bash
# Copy the example env file
cp backend/.env.example backend/config/config.env
```

Then edit `backend/config/config.env` with your actual values:

```env
MONGO_URI=mongodb://127.0.0.1:27017
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Run in Development Mode

Open **two terminals**:

```bash
# Terminal 1 — Backend (runs on port 3000)
cd backend
npm run dev

# Terminal 2 — Frontend (runs on port 5173)
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Endpoints

### Auth Routes (`/api/v1/user`)

| Method | Endpoint           | Description         | Auth Required |
|--------|--------------------|---------------------|:-------------:|
| POST   | `/sign-up`         | Register new user   | ❌            |
| POST   | `/sign-in`         | Login user          | ❌            |
| GET    | `/sign-out`        | Logout user         | ✅            |
| GET    | `/me`              | Get current user    | ✅            |
| PUT    | `/update-profile`  | Update user profile | ✅            |

### Message Routes (`/api/v1/message`)

| Method | Endpoint       | Description              | Auth Required |
|--------|----------------|--------------------------|:-------------:|
| GET    | `/users`       | Get all users for sidebar| ✅            |
| GET    | `/:id`         | Get messages with a user | ✅            |
| POST   | `/send/:id`    | Send a message           | ✅            |

### WebSocket Events

| Event            | Direction      | Description                        |
|------------------|----------------|------------------------------------|
| `connection`     | Client → Server| Establish socket connection        |
| `getOnlineUsers` | Server → Client| Broadcasts list of online user IDs |
| `newMessage`     | Server → Client| Delivers new message to receiver   |
| `disconnect`     | Client → Server| User disconnects                   |

---

## 🏗️ Build for Production

```bash
# From the project root
npm run build
```

This will:
1. Install all dependencies
2. Build the React frontend into the `.dist/` folder
3. The backend will serve these static files in production mode

### Run in Production

```bash
# Set NODE_ENV to production in your config.env
NODE_ENV=production

# Start the server
npm start
```

The app will be available at `http://localhost:3000`.

---

## 🌐 Deployment

For production, the best approach is to split hosting to support real-time WebSocket traffic.

### Option A: Split Deployment (Recommended)
- **Frontend**: Deploy on **Vercel** (optimised for static React assets).
- **Backend**: Deploy on **Render** (provides persistent server for WebSocket/Socket.IO connections).

#### 1. Backend Setup on Render
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Configure the following:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. In the Render dashboard under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: *Your MongoDB Atlas connection string* (make sure to whitelist `0.0.0.0/0` in your Atlas dashboard)
   - `FRONTEND_URL`: `https://your-app.vercel.app` (Your Vercel URL, without trailing slash)
   - `JWT_SECRET_KEY`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

#### 2. Frontend Setup on Vercel
1. Create a new **Project** on [Vercel](https://vercel.com).
2. Connect your GitHub repository.
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Output Directory**: `dist`
4. Click **Deploy**. Vercel will automatically configure rewrite rules using the included `vercel.json` to handle client-side routing on reload.

---

### Option B: Monolithic Deployment (Single Server)
If you want to host both frontend and backend on a single service (e.g. Render, Railway):

1. Configure Vite to output to the shared directory: update the build `outDir` in `frontend/vite.config.js` to point to `../.dist`.
2. Deploy the root folder to **Render** or **Railway**.
3. Render/Railway will build the frontend and start the Node.js server. The backend will automatically serve the static files in production when `NODE_ENV=production`.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- [Socket.IO](https://socket.io/) for real-time communication
- [Cloudinary](https://cloudinary.com/) for media storage
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
