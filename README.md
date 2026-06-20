# PassManager

A secure, modern, and completely client-side password management application built with React and Vite.

## Features
- **Frontend-Only Architecture**: Zero backend dependencies. The application runs entirely within your browser.
- **Local Data Persistence**: All user credentials, vaults, and settings are stored securely in your browser's `localStorage`.
- **Offline Capable**: Since there is no server, your data never leaves your device and the app works without network requests.
- **Responsive UI**: A sleek, glassmorphic React interface enhanced with Tailwind CSS and custom theming.
- **Built-in Security Features**: Password strength generation, vault auditing, and local account mock authentication.

## Tech Stack
- **Frontend Framework**: React
- **Routing**: React Router
- **Styling**: Tailwind CSS, Vanilla CSS
- **Build Tool**: Vite
- **Storage**: Browser `localStorage`

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/lalitverse/PassManager.git
cd PassManager
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open `http://localhost:5173` to view the application in your browser.

## Deployment

PassManager is completely static and can be deployed instantly to services like Vercel, Netlify, Render (Static Site), or GitHub Pages without any environment variables.

1. Connect your repository to your deployment provider.
2. Set the build command to:
   ```bash
   npm run build
   ```
3. Set the publish directory to:
   ```
   dist
   ```

Because all data logic is handled client-side via `localStorage`, no external database or backend server is required.
