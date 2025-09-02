# 🚀 Task Management System

A full-stack task management application with role-based access control, built using the MERN stack and Firebase Authentication.


## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Role-Based Access Control](#role-based-access-control)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)


## ✨ Features

- **Secure Authentication**: Firebase Authentication with JWT tokens
- **Role-Based Access Control**: User and Admin roles with different permissions
- **Task Management**: Create, read, update, and delete tasks
- **User Management**: Admin panel for managing users and roles
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Real-time Updates**: Live task status updates
- **Task Assignment**: Assign tasks to specific users (Admin only)
- **Dashboard Analytics**: Task statistics and overview

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Firebase Admin SDK** - Authentication
- **JWT** - Token-based authentication

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase SDK** - Client-side authentication
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Context API** - State management

## 🏗️ Project Structure

```
task-management-system/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── firebase.js          # Firebase Admin SDK setup
│   ├── middleware/
│   │   └── auth.js              # Authentication & authorization
│   ├── models/
│   │   ├── User.js              # User schema with roles
│   │   └── Task.js              # Task schema with relationships
│   ├── routes/
│   │   ├── users.js             # User management endpoints
│   │   └── tasks.js             # Task CRUD endpoints
│   ├── server.js                # Express server setup
│   ├── package.json             # Backend dependencies
│   └── .env                     # Backend environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── Navbar.js
│   │   │   └── TaskModal.js
│   │   ├── config/
│   │   │   ├── api.js           # Axios configuration
│   │   │   └── firebase.js      # Firebase client config
│   │   ├── contexts/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Tasks.js
│   │   │   └── Users.js
│   │   ├── App.js               # Main application
│   │   └── index.js             # React entry point
│   ├── public/
│   │   └── index.html
│   ├── package.json             # Frontend dependencies
│   └── .env                     # Frontend environment variables
│
└── README.md
```

## 🔐 Role-Based Access Control

### 👤 User Role Permissions

- ✅ Register and login to the system
- ✅ Create new tasks
- ✅ View tasks they created or are assigned to
- ✅ Edit tasks they created or are assigned to
- ✅ Delete only tasks they created
- ✅ Update their own profile information
- ❌ Cannot access user management
- ❌ Cannot view other users tasks
- ❌ Cannot assign tasks to other users

### 👑 Admin Role Permissions

- ✅ All User role permissions
- ✅ View all tasks in the system
- ✅ Edit any task regardless of creator
- ✅ Delete any task in the system
- ✅ Access user management panel
- ✅ View all registered users
- ✅ Change user roles (User ↔ Admin)
- ✅ Assign tasks to any user

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Firebase Project** (for authentication)
- **Git**

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pradnya26mane/task-manager.git
   cd task-management-system
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Configuration

### Backend Configuration

1. **Create `.env` file in the `backend` directory:**
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/taskmanagement
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanagement
   
   # Firebase Configuration
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   ```

2. **Firebase Admin SDK Setup:**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate a new private key
   - Use the credentials in your `.env` file

### Frontend Configuration

1. **Create `.env` file in the `frontend` directory:**
   ```env
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
   REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   
   # API Configuration
   REACT_APP_API_URL=http://localhost:5000/api
   ```

2. **Firebase Web App Configuration:**
   - Go to Firebase Console → Project Settings → General
   - Add a web app and copy the configuration



## ✅ Simplified Admin Setup Section:
### Clear Step-by-Step Process:

-Register user through web app first
-Run the command: node admin-setup.js <mail-address>
-Log out and back in to activate privileges

### Command Usage Examples:

General syntax shown
Specific example with admin@gmail.com

### Essential Notes:

User must register first
Re-login required
Security reminders

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

### Production Mode

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```

## 📡 API Endpoints

### Authentication Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Task Management Endpoints
- `GET /api/tasks` - Get tasks (filtered by role)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Admin Endpoints
- `GET /api/users` - Get all users (Admin only)
- `PUT /api/users/:id/role` - Update user role (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
