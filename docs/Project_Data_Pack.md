# Project Data Pack — AgriAid AI

## 1. Project Title

- AgriAid AI – Smart Farming Assistant

## 2. Project Description

- A web-based agricultural assistant that provides farmers with AI-powered tools: image-based disease detection, a language-aware chatbot for farming advice, and a knowledge base of articles and guides. Users can register and sign in, upload crop images for automated analysis, ask the chatbot questions in supported languages, and browse curated farming resources. The backend handles image upload, multi-model vision analysis via an external AI API, and chat completions; the frontend is a React/Vite SPA with pages for disease detection, knowledge base, weather alerts, and user authentication.

## 3. Core Features

- User registration and login with JWT authentication.
- Image upload and disease detection endpoint (multipart image upload).
- Multi-model AI vision fallback loop for detection.
- Language-aware Agri chatbot (Hindi / English / Bhojpuri support).
- Knowledge Base UI with searchable articles and FAQs.
- Disease Detection UI with image preview, upload, and result display.
- Persistent user session storage (localStorage/sessionStorage usage on frontend).
- Basic UI components: Header, Footer, Chat widget, Splash screen, and Toast notifications.
- Client-side form validation (password match check on signup).
- File upload handling on backend via `multer`.

## 4. Technology Stack (Detected)

- Frontend:
  - React (Vite), React Router, Tailwind CSS, React Hooks, React Icons, lucide-react, axios, react-hot-toast, sonner
- Backend:
  - Node.js, Express, Mongoose (MongoDB), Multer, bcryptjs, jsonwebtoken, node-fetch, dotenv, cors
- Database:
  - MongoDB (Mongoose schemas present)
- APIs / AI Services:
  - OpenRouter API endpoints (`https://openrouter.ai/api/v1/chat/completions`) for vision and chat
- Deployment:
  - Not found in project (no Dockerfile, CI/CD, or hosting configs detected)

## 5. System Workflow (Step-by-step)

- User → opens SPA → selects feature (e.g., Disease Detection).
- User → upload image → frontend creates FormData with image + language.
- Frontend → POST `/api/detect` (multipart/form-data).
- Backend → `multer` saves file, converts image to base64, iterates `VISION_MODELS`, calls external AI vision API, receives analysis.
- Backend → returns JSON `{ disease, remedy }` (or error) and removes temporary file.
- Frontend → displays results (Markdown) in `DiseaseDetection` page.
- Chat flow: frontend widget POSTs `{ message, lang }` to `/api/chat`; backend builds language-aware prompt and forwards to OpenRouter; returns `reply`.
- Auth: frontend POSTs to `/api/auth/signup` and `/api/auth/login`; backend creates users or returns JWT on login.

## 6. Modules Identified

- Authentication:
  - `backend/controllers/authController.js` (registerUser, loginUser)
  - `backend/routes/authRoutes.js` (POST `/signup`, POST `/login`)
  - Frontend pages: `Signup.jsx`, `Login.jsx`
- Disease Detection:
  - Backend route: POST `/api/detect` (in `backend/index.js`)
  - Frontend page: `DiseaseDetection.jsx`
  - Vision model fallback loop (`VISION_MODELS` in `backend/index.js`)
  - Local model artifacts present in `backend/model/`
- Chatbot:
  - Backend: `/api/chat` (chat logic in `backend/index.js` and `backend/routes/chat.js`)
  - Frontend: `ChatBotWidget.jsx`
- Dashboard:
  - Not found in project
- Other modules:
  - Knowledge Base: `KnowledgeBase.jsx`
  - Weather Alerts: `WeatherAlerts.jsx`
  - Expert Suggestions: `ExpertSuggestions.jsx`

## 7. API / Backend Analysis

- Routes detected:
  - `GET /` — status message
  - `POST /api/detect` — image detection (multipart)
  - `POST /api/chat` — chat completions
  - `POST /api/auth/signup` — user registration
  - `POST /api/auth/login` — user login
- Controllers:
  - `registerUser`, `loginUser` in `backend/controllers/authController.js`
  - Detection and chat logic implemented inline in `backend/index.js`
- Request/response flow:
  - Auth endpoints accept JSON and return messages, created user, or JWT.
  - `/api/detect` expects `image` and `lang`; returns `{ disease, remedy }`.
  - `/api/chat` expects `{ message, lang }`; returns `{ reply }`.

## 8. Database Structure

- Collections / Tables:
  - `users` collection (Mongoose model present)
- Fields (from `backend/models/User.js`):
  - `name` (String, required)
  - `email` (String, required, unique)
  - `phone` (String)
  - `location` (String)
  - `farmSize` (String)
  - `password` (String, required — hashed)
  - `timestamps` enabled (`createdAt`, `updatedAt`)
- Other collections: Not found in project

## 9. AI / Model Integration

- Type:
  - External API integration with OpenRouter (chat and vision)
  - Local model artifacts exist in `backend/model/` (`agriaid_disease_model.h5`, `class_indices.json`, `model.json`) but code uses external vision models
- Input processing:
  - Images are read into buffer, converted to base64, included as `image_url` data URI in OpenRouter requests; prompts are language-aware via `buildVisionPrompt(lang)`.
  - Chat input is wrapped in a strict system prompt enforcing language and agricultural-only responses and sent to OpenRouter.
- Output:
  - Textual diagnosis and remedy strings returned from AI and displayed to users.

## 10. UI Screens Identified

- Home (`/`) — `Home.jsx`
- Disease Detection (`/disease-detection`) — `DiseaseDetection.jsx`
- Weather Alerts (`/weather`) — `WeatherAlerts.jsx`
- Expert Suggestions (`/suggestions`) — `ExpertSuggestions.jsx`
- Knowledge Base (`/knowledge-base`) — `KnowledgeBase.jsx`
- Login (`/login`) — `Login.jsx`
- Signup (`/signup`) — `Signup.jsx`
- Persistent elements: `Header.jsx`, `Footer.jsx`, `ChatBotWidget.jsx`, `SplashScreen.jsx`

## 11. Tools Used

- `vite`, `react`, `tailwindcss` (frontend)
- `node`, `express`, `mongoose`, `nodemon` (backend)
- `axios`, `bcryptjs`, `jsonwebtoken`, `multer`, `node-fetch`
- `dotenv` for environment variables

## 12. Testing

- Not found in project (no test files or test scripts detected)

## 13. Deployment Details

- Not found in project (no Dockerfile, CI/CD, or hosting configs); README includes local setup instructions

## 14. Limitations

- Relies on external OpenRouter API; if unavailable, detection/chat will fail.
- No persistence for detection results or consultation history.
- No tests, CI/CD, or deployment configs.
- Minimal input validation and no rate-limiting visible.

## 15. Possible Future Improvements

- Persist detection results and consultation history for dashboards and analytics.
- Add unit/integration tests for backend endpoints and key frontend components.
- Provide deployment configuration (Dockerfile, CI pipeline, environment examples).
- Implement rate limiting, retry/backoff, and better error reporting for external AI calls.
- Add image validation/resizing and client-side upload progress handling.

---

## 16. System Design

### 16.1 Data Flow Diagram (DFD) — Level 0 (Context Diagram)

```
┌─────────────────┐
│   User/Farmer   │
└────────┬────────┘
         │
    ┌────┴──────────────────┬──────────────────┬──────────────┐
    │                       │                  │              │
    v                       v                  v              v
┌──────────────┐    ┌──────────────┐   ┌──────────────┐  ┌──────────────┐
│ Login/Signup │    │   Upload     │   │   Chatbot    │  │Knowledge Base│
│              │    │   Image      │   │   Query      │  │    Browse    │
└──────────────┘    └──────────────┘   └──────────────┘  └──────────────┘
    │                       │                  │              │
    └───────────┬───────────┴──────────────────┴──────────────┘
                │
        ┌───────v────────────────────┐
        │   React Frontend (SPA)      │
        │  (Vite, React Router, Axios)│
        └───────────┬────────────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
    v               v               v
┌──────────┐   ┌──────────┐   ┌──────────────┐
│/api/auth │   │/api/detect│  │/api/chat     │
│/signup   │   │(multipart)│  │(JSON)        │
│/login    │   │           │  │              │
└────┬─────┘   └─────┬─────┘  └──────┬───────┘
     │               │              │
     └───────────────┼──────────────┘
                     │
        ┌────────────v──────────────┐
        │   Express Backend         │
        │  (Node.js)                │
        └────────────┬──────────────┘
                     │
        ┌────────────┼──────────────┐
        │            │              │
        v            v              v
    ┌──────┐   ┌──────────┐  ┌──────────────────┐
    │MongoDB│   │Multer    │  │OpenRouter API    │
    │(Users)│   │(File Upload)   │(Vision & Chat)   │
    └──────┘   └──────────┘  └──────────────────┘
```

### 16.2 Data Flow Diagram (DFD) — Level 1 (Detailed Process)

**Process 1.0: Authentication Flow**
```
User Input → Frontend Validation → Axios POST → Backend Auth Controller
→ Mongoose Query (Users Collection) → JWT Generation → Response to Frontend
→ localStorage/sessionStorage → Redirect to Dashboard
```

**Process 2.0: Disease Detection Flow**
```
User Upload Image → Frontend (FormData + lang) → Axios POST /api/detect
→ Multer File Save → Base64 Conversion → Vision Model Loop (OpenRouter)
→ AI Analysis (vision prompt + image) → Remedy Extraction → Response
→ Frontend Markdown Render → Display Results
```

**Process 3.0: Chatbot Flow**
```
User Message + Language → Frontend Widget → Axios POST /api/chat
→ Backend Prompt Building (language-aware) → OpenRouter LLM Call
→ Agricultural-only Enforcement → Reply Extraction → Response to Frontend
→ Real-time Chat Display
```

### 16.3 Entity-Relationship (ER) Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                         USERS                                │
├──────────────────────────────────────────────────────────────┤
│ _id (ObjectId) [PK]                                          │
│ name (String)                                                │
│ email (String) [UNIQUE]                                      │
│ phone (String)                                               │
│ location (String)                                            │
│ farmSize (String)                                            │
│ password (String - hashed)                                   │
│ createdAt (Timestamp)                                        │
│ updatedAt (Timestamp)                                        │
└──────────────────────────────────────────────────────────────┘
              ↑                    ↑
              │                    │
         (1:Many)             (1:Many)
              │                    │
              │                    │
       ┌──────────────────┐  ┌──────────────────────┐
       │  DETECTIONS      │  │  CHAT_SESSIONS       │
       ├──────────────────┤  ├──────────────────────┤
       │ _id (ObjectId)   │  │ _id (ObjectId)       │
       │ userId [FK]      │  │ userId [FK]          │
       │ imagePath        │  │ language             │
       │ disease          │  │ messages (Array)     │
       │ remedy           │  │ timestamp            │
       │ detectionDate    │  │ createdAt            │
       │ language         │  │ updatedAt            │
       └──────────────────┘  └──────────────────────┘

Note: DETECTIONS and CHAT_SESSIONS are proposed for future implementation
Currently only USERS collection exists in the project.
```

### 16.4 Database Schema (MongoDB)

#### Collection: `users`

**Schema Definition:**
```javascript
{
  _id: ObjectId,                    // MongoDB auto-generated unique ID
  name: String,                     // User's full name (required)
  email: String,                    // User email (required, unique)
  phone: String,                    // Contact phone number
  location: String,                 // Farm location / state / district
  farmSize: String,                 // Size category: "small" | "medium" | "large"
  password: String,                 // Hashed with bcryptjs (10 rounds)
  createdAt: ISODate,               // Auto-created timestamp
  updatedAt: ISODate                // Auto-updated timestamp
}
```

**Example Document:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Rajesh Kumar",
  "email": "rajesh.farmer@example.com",
  "phone": "+91-9876543210",
  "location": "Punjab, Ludhiana",
  "farmSize": "medium",
  "password": "$2a$10$...hashed_password_string...",
  "createdAt": ISODate("2026-01-15T10:30:00.000Z"),
  "updatedAt": ISODate("2026-02-20T14:45:00.000Z")
}
```

**Indexes:**
- `email` (unique index for fast login lookups)
- Default `_id` (primary key)

#### Collection: `detections` (Proposed for Future)

```javascript
{
  _id: ObjectId,
  userId: ObjectId,                 // Reference to users._id
  imagePath: String,                // Path to uploaded image
  disease: String,                  // Detected disease/condition
  remedy: String,                   // AI-generated remedy
  confidence: Number,               // 0-1 confidence score (if available)
  language: String,                 // Language of analysis: "hi" | "en" | "bho"
  detectionDate: ISODate,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### Collection: `chat_sessions` (Proposed for Future)

```javascript
{
  _id: ObjectId,
  userId: ObjectId,                 // Reference to users._id
  language: String,                 // Language: "hi" | "en" | "bho" | "pa"
  messages: [
    {
      role: String,                 // "user" | "bot"
      content: String,              // Message text
      timestamp: ISODate
    }
  ],
  sessionStarted: ISODate,
  sessionEnded: ISODate,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### Collection: `articles` (Proposed for Knowledge Base Persistence)

```javascript
{
  _id: ObjectId,
  title: String,
  category: String,                 // "Organic Farming", "Pest Management", etc.
  author: String,
  excerpt: String,
  content: String,
  tags: [String],
  imageUrl: String,
  externalLink: String,
  readTime: String,
  views: Number,
  likes: Number,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### 16.5 Relationship Summary

| Collection      | Relationship        | Cardinality | Foreign Key    | Notes                           |
|-----------------|---------------------|-------------|----------------|---------------------------------|
| users           | Primary             | —           | _id            | Central user entity             |
| detections      | Child of users      | 1:Many      | userId         | One user, many detections       |
| chat_sessions   | Child of users      | 1:Many      | userId         | One user, many chat sessions    |
| articles        | Independent         | —           | —              | No direct user relationship     |

### 16.6 API Data Flow Summary

| Endpoint             | Request Format | Database Operation      | Response                    |
|----------------------|----------------|-------------------------|------------------------------|
| POST /api/auth/signup| JSON (user)    | INSERT users            | User object + message       |
| POST /api/auth/login | JSON (email/pwd)| READ users (findOne)   | JWT token + user object     |
| POST /api/detect     | multipart/form | INSERT detections (future)| disease + remedy           |
| POST /api/chat       | JSON (message) | INSERT chat_sessions (future)| reply text             |
| GET /knowledge-base  | Query params   | READ articles (future)  | Array of article objects    |

### 16.7 Security Considerations in Schema Design

- **Password Storage**: All passwords hashed using `bcryptjs` with 10-round salt before storage (never plain text).
- **Email Uniqueness**: Enforced at database level to prevent duplicate accounts.
- **User ID Reference**: Foreign keys use `ObjectId` to ensure referential integrity.
- **Timestamp Auditing**: `createdAt` and `updatedAt` enable audit trails for data changes.
- **Session Tokens**: JWT tokens (not stored in DB) provide stateless authentication.

---

Generated from repository: AgriAid-AI-main
