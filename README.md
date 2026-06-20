# PassManager

A secure, modern, and full-stack password management application built with the MERN stack.

## Features
- **JWT Authentication**: Robust JSON Web Token-based authorization for protected routes.
- **Secure Password Hashing**: Utilizes `bcrypt` to strictly hash passwords before writing them to the database.
- **Direct Password Reset System**: An anti-enumeration, secure password reset flow entirely built into the application interface.
- **Responsive UI**: A sleek, glassmorphic React interface enhanced with Tailwind CSS.

## Tech Stack
- **Frontend**: React, React Router, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Security**: JWT, Bcrypt, Express Rate Limit

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/lalitverse/PassManager.git
cd PassManager
```

### 2. Install Dependencies
Install dependencies for both the frontend and the backend.
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### 3. Setup Environment Variables
Create `.env` files in both the root directory and the `/backend` directory based on the `.env.example` templates.

**Root `.env` (Frontend):**
```env
VITE_API_URL=http://localhost:5000/auth
```

**Backend `.env`:**
```env
MONGO_URI=mongodb://localhost:27017/ciphervault
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
```

### 4. Run the Backend
Ensure MongoDB is running locally or provide a MongoDB Atlas URI.
```bash
cd backend
npm run dev
# Note: if nodemon isn't installed, use 'node server.js'
```

### 5. Run the Frontend
In a separate terminal, start the Vite development server.
```bash
# From the root directory
npm run dev
```

## API Endpoints

The backend exposes the following authentication endpoints:

- `POST /auth/register` - Register a new user (Name, Email, Password).
- `POST /auth/login` - Authenticate and receive a JWT.
- `POST /auth/forgot-password` - Request a password reset. Rate-limited and protected against user enumeration.
- `POST /auth/reset-password` - Directly submit a new password to reset the account.

## Deployment Notes
- When deploying the frontend to a provider like Vercel or Netlify, ensure you set `VITE_API_URL` to your production backend URL.
- When deploying the backend (Render, Heroku, etc.), strictly enforce strong `JWT_SECRET` keys and configure your MongoDB database safely.
- Run `npm run build` on the frontend before deployment to generate optimized static files.
