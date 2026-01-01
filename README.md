# Real-Time Chat App

A full-stack real-time chat application with authentication, online status tracking, image messages, and a modern UI built with React, Vite, Tailwind CSS, Zustand, Express, MongoDB, and Socket.io.

## Live Demo

👉 https://chat-app-mern-da7k.onrender.com/

## 

- User signup/login with secure password hashing (JWT-based auth via HTTP-only cookies)
- Welcome email on successful signup
- Update profile with Cloudinary-hosted profile picture
- Real-time one-to-one messaging using Socket.io
- Send text and image messages (images uploaded to Cloudinary)
- Online users indicator powered by WebSockets
- Chats/Contacts tabs to quickly switch between active chats and all users
- Optimistic UI updates for sending messages
- Sound notifications for new incoming messages
- Mobile-responsive layout with a glassmorphism-style UI
- Production-ready backend that can serve the built frontend

## Tech Stack

**Frontend**
- React (with React Router)
- Vite
- Tailwind CSS + DaisyUI
- Zustand for state management
- Axios for API requests
- Socket.io Client for real-time updates
- React Hot Toast for notifications

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- JSON Web Tokens (JWT)
- Bcrypt for password hashing
- Cloudinary for image storage
- Nodemailer for emails
- Arcjet for security/abuse protection

## Project Structure

```bash
Chat-App/
  backend/
    src/
      controller/       # auth & message controllers
      emails/           # welcome email handler & template
      lib/              # DB, env, socket.io, cloudinary, utils, arcjet
      middleware/       # auth & socket auth middleware, arcjet
      models/           # Mongoose models (User, Message)
      routes/           # auth & message routes
      index.js          # Express + Socket.io server entry

  frontend/
    src/
      pages/            # Login, Signup, Chat
      components/       # Chat UI components
      store/            # Zustand stores (auth, chat)
      lib/axios.js      # Axios instance
      main.jsx, App.jsx
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- MongoDB instance (local or hosted, e.g. MongoDB Atlas)
- Cloudinary account (for image uploads)
- SMTP credentials (for sending welcome emails)

### 1. Clone the repository

```bash
git clone https://github.com/amanrahangdale24/Chat-App.git
cd Chat-App
```

### 2. Install dependencies

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### 3. Environment variables

Create a `.env` file inside the `backend` directory with the following variables:

## Running the App in Development

Open two terminals from the project root.

### Backend

```bash
cd backend
npm run dev
```

This starts the Express + Socket.io server (default: `http://localhost:4044`).

### Frontend

```bash
cd frontend
npm run dev
```

By default, Vite runs on `http://localhost:5173`.

Make sure `CLIENT_URL` in the backend `.env` matches the frontend dev URL so that CORS and cookies work correctly.

## Building for Production

### 1. Build frontend

```bash
cd frontend
npm run build
```

This generates a production build in `frontend/dist`.

### 2. Serve frontend from backend

The backend is already configured in `backend/src/index.js` to serve the frontend build in production:

- It serves static files from `../frontend/dist`
- It falls back to `index.html` for any non-API route

Set `NODE_ENV=production` in the backend `.env` and ensure the frontend is built, then run:

```bash
cd backend
npm start
```

Now your entire app (API + frontend) is available from the backend server URL.

## Available Scripts

### Backend (`backend/package.json`)

- `npm run dev` – Start backend with Nodemon
- `npm start` – Start backend with Node.js

### Frontend (`frontend/package.json`)

- `npm run dev` – Start Vite dev server
- `npm run build` – Build frontend for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

## API Overview

Base URL (dev): `http://localhost:4044/api`

**Auth Routes** (`/api/auth`)
- `POST /signup` – Create a new user and log them in (sets JWT cookie, sends welcome email)
- `POST /login` – Log in existing user
- `POST /logout` – Log out (clears JWT cookie)
- `PUT /update-profile` – Update profile picture (uploads to Cloudinary)
- `GET /check` – Check if user is authenticated and return user data

**Message Routes** (`/api/message`)
- `GET /contacts` – Get list of all other users (contacts)
- `GET /chats` – Get users the logged-in user has chatted with
- `GET /:id` – Get messages between logged-in user and user `:id`
- `POST /send/:id` – Send text/image message to user `:id`

All protected routes expect a valid JWT stored in an HTTP-only cookie.

## Real-Time Events (Socket.io)

- Client connects with credentials (cookies) and is authenticated via a custom middleware
- Server keeps a `userSocketMap` to track online users
- `getOnlineUsers` event broadcasts currently online user IDs
- `newMessage` event is emitted to the receiver when a new message is sent

The frontend listens to `newMessage` and updates the chat in real-time (with optional notification sound).

## Screens / UX

- **Login / Signup** – Basic auth forms with validation and toasts
- **Chat Page**
  - Left sidebar: profile header, tabs (Chats / Contacts), list of chats or all users
  - Right panel: active conversation, messages list, message input with optional image upload
  - Placeholder components when no chat is selected or no history exists

## Contributing

Feel free to fork this repo and open a pull request if you’d like to add features or fix bugs. Suggestions and issues are welcome.

## License

This project is open-sourced for learning and portfolio use. Add a formal license here if you plan to distribute or use it in production.
