# OneCart 🛍️

**OneCart** is a production-ready, full-stack E-Commerce platform built using the **MERN stack** (MongoDB, Express, React, Node.js). This project features a dual-panel system (User & Admin), integrated voice navigation via the Web Speech API, and secure Razorpay payment flows.

- **Live Demo**: [OneCart Live](https://onrender.com)
- **GitHub Repository**: [AI-Powered E-Commerce Website](https://github.com)

---

## 🚀 Key Features

### 👤 User Panel
* **Voice Navigation**: Powered by the **Web Speech API** for hands-free browsing and commands.
* **Real-time Cart Sync**: Seamlessly syncs product items across sessions.
* **Secure Checkout**: Integrated **Razorpay Payment Gateway** with a complete verification flow.
* **Flexible Authentication**: Supports both **Google OAuth** and standard **Email/Password** logins.

### ⚙️ Admin Panel
* **Product Management**: Add, update, and delete inventory products dynamically.
* **Order Tracking**: Comprehensive dashboard to monitor real-time order status updates.
* **User Management**: Admin control over user profiles, permissions, and roles.

---

## 🛠️ Tech Stack & Architecture

* **Frontend**: React.js, Context API (State Management), Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JSON Web Tokens (JWT) stored securely via **HTTP-only Cookies**
* **Security & Deployment**: CORS configured for production, custom Auth Middleware, Protected Routes
* **Hosting**: Deployed as 3 microservices on **Render**

---

## 🔧 Installation & Setup

Follow these steps to run OneCart locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com.git
cd AI-Powered-E-Commerce-Website
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and set up your environmental variables:
```bash
cd backend
npm install
```
Create a `.env` file in the root of your backend folder and configure the following parameters:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
GOOGLE_CLIENT_ID=your_google_client_id
CORS_ORIGIN=http://localhost:3000
```
Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```
Create a `.env` file in the root of your frontend folder:
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```
Start the local development server:
```bash
npm start
```

---

## 💡 Engineering Challenges Solved
* **Advanced Authentication Security**: Implemented strict route protection using custom Express middleware alongside JWT verification enclosed within secure HTTP-only cookies to prevent XSS attacks.
* **Asynchronous Integrity**: Handled complex multi-stage payment operations safely (Place Order → Verify Signature → Save Transaction) avoiding race conditions.
* **Production Configurations**: Solved restrictive production CORS errors and optimized deployment assets to efficiently operate within Render's free tier environments.

---

## 🤝 Connect With Me
* **Developer**: Devesh Tiwari
* **Role**: Aspiring MERN Stack / Full Stack Developer
* **Availability**: Open to Remote Internships 🌍

Feel free to explore the repository, open an issue, or drop a star ⭐ if you find this project useful!
