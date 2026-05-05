# 🌾 AgriAid AI – Smart Farming Assistant

**AgriAid AI** is a comprehensive agricultural platform designed to empower farmers with cutting-edge artificial intelligence. From detecting crop diseases to providing expert guidance in local languages, AgriAid AI acts as a digital companion for modern agriculture.

---

## 🚀 Key Features

### 🔍 AI Disease Detection
Identify crop issues instantly by uploading a photo.
- **Visual Analysis**: Uses advanced Computer Vision (GPT-4o-mini) to scan leaf images.
- **Comprehensive Reports**: Provides identification, detailed descriptions, organic home remedies, and chemical treatment options.
- **Multilingual Support**: Get diagnoses in **Hindi**, **English**, or **Bhojpuri**.

### 🤖 Agri-Expert Chatbot
An intelligent assistant specialized strictly in agriculture.
- **Specialized Knowledge**: Answers queries about sowing, irrigation, fertilizers, and pest control.
- **Local Language Focus**: Full support for Hindi and Bhojpuri using pure Devanagari script.
- **Safety First**: Refuses non-agricultural questions to ensure focused guidance.

### 📚 Knowledge Base (Admin Managed)
A dynamic library of articles managed directly via the platform.
- **Admin Dashboard**: Authorized admins (admin@gmail.com) can **Create, Edit, and Delete** articles in real-time.
- **Direct Image Upload**: Integrated with **Cloudinary** for seamless image management—no more manual URL copying.
- **Category Filtering**: Organized into Technology, Organic Farming, Pest Management, Water Management, Soil Health, and Climate.

### 🌦️ Real-time Weather Alerts
Stay ahead of the weather with localized alerts designed specifically for farming activities.

### 🔒 Secure Authentication
Robust login and signup system with role-based access control (RBAC) to protect administrative features.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Radix UI based custom components.

### Backend
- **Environment**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Media Storage**: [Cloudinary](https://cloudinary.com/) (for article images)
- **AI Integration**: [OpenRouter API](https://openrouter.ai/)
- **Authentication**: JWT & BcryptJS

---

## 🏗️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- OpenRouter API Key
- Cloudinary Account (for the Knowledge Base)

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   OPENROUTER_KEY=your_openrouter_api_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. `npm start` (The server will automatically create a default admin: `admin@gmail.com` / `123123`)

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. `npm run dev`

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
