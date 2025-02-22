# 📝 Task Management Application

A **Task Management Application** that allows users to **add, edit, delete, and reorder tasks** with a drag-and-drop interface. Tasks are categorized into **To-Do, In Progress, and Done**, and changes are instantly saved to a database for persistence.

## 🚀 Features

- 🔐 **Authentication**: Users must sign in with **Google** (via Firebase Authentication).
- ✅ **Task Management**:
  - Add, edit, delete, and reorder tasks.
  - Drag-and-drop functionality to move tasks between categories.
- 📡 **Real-time Sync**:
  - Instant updates using **MongoDB Change Streams / WebSockets**.
- 💾 **Database & Persistence**:
  - All tasks are stored in **MongoDB** via an **Express.js API**.
- 🎨 **Modern UI**:
  - Built with **Vite + React**, featuring a **clean, responsive design**.
- 📱 **Fully Responsive**:
  - Optimized for **both desktop and mobile** users.

## 📸 Screenshots

![Login Page](https://i.ibb.co.com/tgnFHKq/Screenshot-2025-02-22-171908.png)
![Sign Up Page](https://i.ibb.co.com/tMn4tGtp/Screenshot-2025-02-22-172114.png)
![View All Tasks](https://i.ibb.co.com/qL8wthq0/Screenshot-2025-02-22-172217.png)
![Add Tasks](https://i.ibb.co.com/27tjqM4x/Screenshot-2025-02-22-172233.png)

---

## 📂 Table of Contents

- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🎬 Demo

🔗 **Live Demo**: [Task Management App](https://tasks-king.netlify.app)

---

## 🛠 Tech Stack

**Frontend:**

- Vite.js + React
- Tailwind CSS + DaisyUI
- Firebase Authentication
- **Drag & Drop**: `react-beautiful-dnd` / `@hello-pangea/dnd`
- **State Management**: `@tanstack/react-query`

.

### 🎨 Frontend Setup

1. **Navigate to the client directory**:
   ```sh
   cd ../client
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Create a `.env.local` file** and add your Firebase credentials:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_apiKey=your-api-key
   VITE_authDomain=your-auth-domain
   VITE_projectId=your-project-id
   VITE_storageBucket=your-storage-bucket
   VITE_messagingSenderId=your-messaging-sender-id
   VITE_appId=your-app-id
   ```
4. **Run the frontend**:
   ```sh
   npm run dev
   ```
   Your app should now be running at `http://localhost:5173`.

---

## ⚙️ Configuration

### 🔑 Firebase Authentication Setup

1. Go to **[Firebase Console](https://console.firebase.google.com/)**.
2. Create a new project and enable **Google Authentication**.
3. Get the API credentials and add them to `.env.local` in the frontend.



## 👥 Contributors

- **Your Name** - _Yeamin Madbor_

---

## 📜 License

This project is licensed under the **MIT License**.

---
