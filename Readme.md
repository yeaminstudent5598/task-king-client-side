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

🔗 **Live Demo**: [Task Management App](https://task-mannagement.web.app)

---

## 🛠 Tech Stack

**Frontend:**

- Vite.js + React
- Tailwind CSS + DaisyUI
- Firebase Authentication
- **Drag & Drop**: `react-beautiful-dnd` / `@hello-pangea/dnd`
- **State Management**: `@tanstack/react-query`

**Backend:**

- Node.js + Express.js
- MongoDB (via `mongodb` package)
- **Real-time Sync**: WebSockets / Change Streams

---

## 📥 Installation

### 🔧 Prerequisites

- Install **Node.js** (>=16)
- Install **MongoDB** (if running locally)
- Install **Git**

### 🔹 Clone the Repository

```sh
git https://github.com/ashraful2871/Task-Management.git
cd Task-Management
```

### 📌 Backend Setup

1. **Navigate to the server directory**:
   ```sh
   cd server
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Create a `.env` file** and add your MongoDB credentials:
   ```env
   USER_DB=your-mongo-db-name
   USER_PASS=your-mongo-db-password
   ```
4. **Start the backend server**:
   ```sh
   npm start
   ```
   The API should now be running on `http://localhost:5000`.

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

### 🗄 MongoDB Setup

- If using **MongoDB Atlas**, create a database and obtain the connection URI.
- If running locally, ensure **MongoDB is installed and running**.

---

## 🎯 Usage

1. **Sign in with Google** to access the app.
2. **Create tasks** under "To-Do".
3. **Drag tasks** between categories.
4. **Edit or delete tasks**.
5. **Reorder tasks** within categories.

---

## 🔌 API Endpoints

| Method     | Endpoint     | Description                                        |
| ---------- | ------------ | -------------------------------------------------- |
| **POST**   | `/tasks`     | Add a new task                                     |
| **GET**    | `/tasks`     | Retrieve all tasks for the logged-in user          |
| **PUT**    | `/tasks/:id` | Update task details (title, description, category) |
| **DELETE** | `/tasks/:id` | Delete a task                                      |

---

## 🚀 Deployment

### 🎯 Deploy Backend (Vercel)

1. Install **Vercel CLI**:
   ```sh
   npm install -g vercel
   ```
2. Deploy backend:
   ```sh
   vercel --prod
   ```

### 🎯 Deploy Frontend (Vercel)

1. Deploy frontend:
   ```sh
   vercel --prod
   ```

Your app should now be live 🎉.

---

## ❓ Troubleshooting

- **MongoDB not connecting?**

  - Check `.env` and verify credentials.
  - Ensure MongoDB is running (`mongod`).

- **Firebase authentication issues?**

  - Verify API keys and Firebase settings.

- **Vite issues?**
  - Try clearing cache:
    ```sh
    rm -rf node_modules package-lock.json
    npm install
    ```

---

I've added a warning in the `README.md` to ensure **`.env` files are not pushed to GitHub** and included a proper `.gitignore` setup. Here’s the updated section:

---

## ⚠️ Important: Protect Your Credentials

🚨 **DO NOT** push `.env` files containing sensitive API keys or database credentials to GitHub.  
Make sure you have a **`.gitignore`** file in place to prevent accidental exposure.

### ✅ Ensure `.gitignore` Includes:

```plaintext
# Ignore environment variables
.env
.env.local
.env.production
.env.development

# Ignore node_modules
node_modules/
```

### 🚀 How to Secure Your API Keys?

1. **Add `.env` files to `.gitignore`** (already included above).
2. **Use environment variables on deployment platforms** (e.g., Vercel, Firebase, etc.).
3. **NEVER hardcode API keys** in your codebase.

🔐 **Keeping your credentials safe is crucial!** If you've accidentally pushed a `.env` file, **immediately revoke your API keys and regenerate them.**

---

## 👥 Contributors

- **Your Name** - _Yeamin Madbor_

---

## 📜 License

This project is licensed under the **MIT License**.

---
