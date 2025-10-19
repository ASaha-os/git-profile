# 🌟 GitProfile AI

> 🔍 **Discover Your GitHub Identity** — Analyze, assess, and enhance your open-source journey with AI-powered insights.

[![Vercel Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://gitprofile.vercel.app)
[![Made with React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev)
[![Powered by Vite](https://img.shields.io/badge/Built%20With-Vite-purple?logo=vite)](https://vitejs.dev)
[![Auth0](https://img.shields.io/badge/Auth-Auth0-orange?logo=auth0)](https://auth0.com)
[![GitHub API](https://img.shields.io/badge/Data-GitHub%20API-lightgrey?logo=github)](https://docs.github.com/en/rest)

---

## ✨ Features

| 🚀 Feature | 🧩 Description |
|-------------|----------------|
| 🔐 **Auth0 Login with GitHub** | Securely sign in with your GitHub account |
| 📊 **AI-Powered Insights** | Analyze repositories, commits, and languages |
| 🧠 **Skill Assessment** | Discover your top programming languages and expertise level |
| 💡 **Smart Recommendations** | Get project suggestions and open-source contribution ideas |
| 🌍 **Open Source Guidance** | Learn how to start contributing effectively |
| ⚙️ **Built with TypeScript + React + Vite** | Fast, type-safe, and modern stack |

---

## 🧰 Tech Stack

| Layer | Tools |
|-------|-------|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS |
| **Auth** | Auth0 (GitHub OAuth) |
| **API** | GitHub REST API |
| **AI (Upcoming)** | Gemini API (for summarization & recommendations) |
| **Deployment** | Vercel |

---

## 🔧 Local Development Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ASaha-os/git-profile.git
cd git-profile
```

### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory:

```bash
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_GITHUB_API_URL=https://api.github.com
```

💡 *Tip:* You can obtain your Auth0 credentials from the [Auth0 dashboard](https://auth0.com/).

---

### 4️⃣ Run the Development Server
```bash
npm run dev
```

Vite will start your app on:  
👉 **http://localhost:5173**

---

## 🌐 Deployment

This project is deployed on **Vercel** 🚀  

You can deploy your own instance easily:
```bash
vercel deploy
```

Or connect your GitHub repo to [Vercel Dashboard](https://vercel.com) for **automatic deployments** on every push.

---

## 🧭 Project Structure

```
git-profile/
│
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/           # App pages & routes
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions (GitHub API, Auth, etc.)
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point (Vite)
│
├── vite.config.ts       # Vite configuration
├── package.json
└── README.md
```

---

## 🧩 API Integration

### 🔒 Authentication
- **Auth0 + GitHub OAuth**
- Secure login flow with token-based authentication.

### 🧮 GitHub API
- Fetches:
  - Repositories
  - Commits
  - Languages used
  - Contribution stats

### 🤖 Gemini AI *(Upcoming)*
- Summarizes GitHub activity.
- Suggests open-source projects to contribute to.
- Offers personalized insights using AI.

---

## 💬 Contribution Guide

Want to contribute? Awesome! 🤝  
Contributions are always welcome.

1. Fork the repo  
2. Create a new branch:
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "✨ Add awesome feature"
   ```
4. Push and open a Pull Request 🚀

---

## 🧑‍💻 Author

👋 Developed by **[Aritra Saha](https://github.com/ASaha-os)**  
> A passionate open-source contributor & MLH hacker ❤️

---

## 🌈 Acknowledgements

- [Auth0](https://auth0.com/) for authentication
- [GitHub API](https://docs.github.com/en/rest) for developer data
- [Vercel](https://vercel.com/) for hosting
- [MLH Open Source Hackfest](https://mlh.io/) for inspiration

---

## 🪄 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and share! 💫

---

### ⭐ If you like this project, give it a star on GitHub and share it with your fellow hackers!
