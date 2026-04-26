# 🌾 AgriAid AI – Smart Farming Assistant

**AgriAid AI** is a comprehensive agricultural platform designed to empower farmers with cutting-edge artificial intelligence. From detecting crop diseases to providing expert guidance in local languages, AgriAid AI acts as a digital companion for modern agriculture.

---

## 🚀 Key Features

### 🔍 AI Disease Detection
Identify crop issues instantly by uploading a photo.
- **Visual Analysis**: Uses advanced Computer Vision (GPT-4o-mini) to scan leaf images.
- **Comprehensive Reports**: Provides identification, detailed descriptions, organic home remedies, and chemical treatment options.
- **Multilingual Support**: Get diagnoses in **Hindi**, **English**, or **Bhojpuri**.
- **Pro Tips**: Includes a guide for high-quality scanning (lighting, focus, etc.).

### 🤖 Agri-Expert Chatbot
An intelligent assistant specialized strictly in agriculture.
- **Specialized Knowledge**: Answers queries about sowing, irrigation, fertilizers, and pest control.
- **Local Language Focus**: Full support for Hindi and Bhojpuri using pure Devanagari script.
- **Safety First**: Refuses non-agricultural questions to ensure focused guidance.

### 🌦️ Real-time Weather Alerts
Stay ahead of the weather with localized alerts designed specifically for farming activities.

### 📚 Knowledge Base & Expert Tips
- **Crop Library**: In-depth information on major crops like Tomato, Potato, Rice, and Wheat.
- **Specialist Guidance**: Expert-curated tips for soil health and yield optimization.

### 🔒 Secure Authentication
Robust login and signup system to save your farm profile and consultation history.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks
- **Icons**: React Icons (Fa, Md)
- **Components**: Custom UI components with a premium aesthetic.

### Backend
- **Environment**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **AI Integration**: [OpenRouter API](https://openrouter.ai/)
  - **Vision**: `openai/gpt-4o-mini`
  - **Chat**: `meta-llama/llama-3.1-8b-instruct`
- **File Handling**: Multer (for image processing)

---

## 📸 Disease Detection Functionality: How it Works

The Disease Detection feature leverages **Neural Engine** scanning to bridge the gap between farmers and plant pathologists:

1. **Upload**: The farmer takes a photo of an affected leaf or crop part and uploads it via the web interface.
2. **Processing**: The image is securely transmitted to the backend, where it is processed into a base64 format.
3. **AI Vision Analysis**: The image is analyzed by a Vision-Language Model. It specifically checks for:
   - Signs of fungal, bacterial, or viral infections.
   - Nutrient deficiencies or pest infestations.
   - Non-agricultural content (and politely refuses if unrelated).
4. **Actionable Output**: The system returns a structured response including:
   - **Diagnosis**: The exact name of the disease or issue.
   - **Remedies**: A combination of organic (natural) and chemical solutions.
5. **Expert Advisory**: Users are encouraged to cross-verify high-value crop reports with field experts.

---

## 🏗️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- OpenRouter API Key

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   OPENROUTER_KEY=your_openrouter_api_key
   ```
4. `npm start`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
