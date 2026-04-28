import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
import authRoutes from "./routes/authRoutes.js";
import multer from "multer";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// app.use((req, res, next) =>{
//   res.header("Access-Control-Allow-Origin", "https://mellow-smakager-a976e5.netlify.app");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   
//   if
//   (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ Connection Error:", err));

// Auth Routes
app.use("/api/auth", authRoutes);

// Chatbot Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, lang } = req.body;

    if (!message || !lang) {
      return res.status(400).json({ error: "Message and language required" });
    }

    const langMap = {
      hi: "Hindi (using Devanagari script only)",
      en: "English",
      bho: "Bhojpuri (using Devanagari script only)",
    };

    const selectedLang = langMap[lang] || "Hindi (using Devanagari script only)";

    const systemPrompt = `
You are AgriAid AI, a professional farming expert.

LANGUAGE RULES:
1. User's Selected Language: ${selectedLang}.
2. STRICT RULE: You MUST reply ONLY in ${selectedLang}.
3. SCRIPT RULE: If Hindi or Bhojpuri is selected, you MUST use Devanagari script (देवनागरी लिपि) for EVERY SINGLE WORD.
4. NO ENGLISH LETTERS: Do not use English alphabets (Hinglish) at all for non-English responses.
5. NO MIXING: Do not use English words mixed with Hindi. Use proper Hindi/Bhojpuri terms.

STRICT FOCUS RULE:
- You are an EXCLUSIVE Agricultural Expert.
- ONLY answer questions related to farming, crops, soil, pests, irrigation, fertilizers, gardening, and agri-tools.
- For ANY non-agricultural question, you MUST politely refuse in the user's selected language (${selectedLang}).
- Refusal Guidance:
  - English: "I am sorry, I am only designed to answer agriculture-related questions. Please ask something about farming."
  - Hindi: "क्षमा करें, मैं केवल कृषि और खेती-किसानी से संबंधित प्रश्नों के उत्तर देने के लिए डिज़ाइन किया गया हूँ। कृपया खेती से जुड़ा कोई सवाल पूछें।"
  - Bhojpuri: "माफ़ करीं, हम खाली खेती-किसानी से जुड़ल सवालन के जवाब देवे खातिर बनल बानी। कृपया खेती से जुड़ल कुछ पूछीं।"

STRICT SAFETY RULES:
- Do NOT provide fake/real-time mandi rates, weather, crop prices, or specific scheme monetary amounts.
- If asked for live market rates -> Reply ONLY in ${selectedLang} stating you cannot provide live rates and suggest checking Agmarknet or local mandis.

PRACTICAL KNOWLEDGE RULES:
- Provide clear, actionable farming advice.
- Focus on: Sowing, Irrigation, Fertilizers, Pest Control, Disease Management, and Harvesting.
- Keep responses structured and easy to read.
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.choices) {
      console.error("❌ OpenRouter Error:", data);
      return res.status(500).json({
        error: "AI service error — try again later.",
      });
    }

    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error("❌ Backend Error:", err);
    res.status(500).json({ error: "Server issue — try again." });
  }
});

// Default Route
app.get("/", (req, res) => {
  res.send("🌾 AgriAid AI Server Running Perfectly!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// 1. Multer Setup (Photo handle karne ke liye)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Free vision models — fallback order mein (1 fail → 2 pe, 2 fail → 3 pe)
// IDs verified from OpenRouter live API on 2026-04-27
const VISION_MODELS = [
  "google/gemma-3-27b-it:free",       // Best quality — Google Gemma 3 27B
  "google/gemma-3-12b-it:free",       // Backup — Google Gemma 3 12B
  "nvidia/nemotron-nano-12b-v2-vl:free", // Second backup — NVIDIA Nemotron 12B
];

// Language-aware prompt builder
function buildVisionPrompt(lang) {
  const isHindi = lang === 'Hindi' || lang === 'hi';

  if (isHindi) {
    // Strategy: Model ko English mein sochne do (accuracy better hoti hai),
    // lekin output Hindi mein dene do — isse 60-70%+ accuracy milti hai
    return `You are an expert agricultural scientist. Carefully analyze this plant/crop image.

STEP 1 — Internal Analysis (think in English for accuracy):
- Identify the exact crop/plant species visible
- Look for: leaf discoloration, spots, wilting, lesions, fungal growth, pest damage, nutrient deficiency signs
- Determine: disease name (scientific + common), severity (mild/moderate/severe), cause (fungal/bacterial/viral/pest/deficiency)

STEP 2 — Output in Hindi (Devanagari script only, no English letters):
If the image is NOT related to agriculture (car, person, building, etc.) — reply ONLY: "यह छवि कृषि से संबंधित नहीं है।"

If agricultural content is detected — respond in this EXACT format in pure Hindi:

## 🌿 पहचान
**फसल/पौधा:** (crop name in Hindi)
**रोग/समस्या का नाम:** (disease name in Hindi — also write scientific name in brackets)
**गंभीरता:** (हल्की / मध्यम / गंभीर)
**कारण:** (फंगस / बैक्टीरिया / वायरस / कीट / पोषण की कमी)

## 🔍 लक्षण और विवरण
(3-4 bullet points in Hindi describing exact visible symptoms)

## 🌱 घरेलू/जैविक उपाय
(3-4 practical organic remedies in Hindi with quantities)

## ⚗️ रासायनिक उपाय
(2-3 chemical treatments with commercial product names and dosage)

## ⚠️ सावधानी
(1-2 important precautions for the farmer)

IMPORTANT: Use ONLY Devanagari script. No English words. Be specific and accurate.`;
  } else {
    // English
    return `You are an expert agricultural scientist. Carefully analyze this plant/crop image.

STEP 1 — Analysis:
- Identify the exact crop/plant species visible
- Look for: leaf discoloration, spots, wilting, lesions, fungal growth, pest damage, nutrient deficiency signs
- Determine: disease name (scientific + common), severity, cause

STEP 2 — Output:
If the image is NOT related to agriculture (car, person, building, etc.) — reply ONLY: "This image is not related to agriculture."

If agricultural content is detected — respond in this EXACT format:

## 🌿 Identification
**Crop/Plant:** (name)
**Disease/Issue:** (common name + scientific name)
**Severity:** (Mild / Moderate / Severe)
**Cause:** (Fungal / Bacterial / Viral / Pest / Nutrient Deficiency)

## 🔍 Symptoms & Description
(3-4 bullet points describing exact visible symptoms)

## 🌱 Organic / Home Remedies
(3-4 practical organic remedies with quantities)

## ⚗️ Chemical Remedies
(2-3 chemical treatments with commercial product names and dosage)

## ⚠️ Precautions
(1-2 important precautions for the farmer)

Be specific, accurate, and practical for a real farmer.`;
  }
}

// Helper: ek model se call karna
async function callVisionModel(model, base64Image, imageType, lang) {
  const prompt = buildVisionPrompt(lang);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${imageType};base64,${base64Image}`
              }
            }
          ]
        }
      ],
    }),
  });

  const data = await response.json();
  return { response, data };
}

// 2. Disease Detection Route (Multi-Model Fallback)
app.post("/api/detect", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    // A. Image ko base64 mein badalna
    const imagePath = req.file.path;
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");
    const imageType = req.file.mimetype;
    const lang = req.body.lang || "Hindi";

    // C. Cleanup helper
    const cleanup = () => {
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    };

    // B. Multi-model fallback loop
    let lastError = null;
    for (const model of VISION_MODELS) {
      try {
        console.log(`🔄 Trying vision model: ${model}`);
        const { response, data } = await callVisionModel(model, base64Image, imageType, lang);

        if (response.ok && data.choices && data.choices[0]?.message?.content) {
          cleanup();
          console.log(`✅ Success with model: ${model}`);
          return res.json({
            disease: "Detected by AI Vision",
            remedy: data.choices[0].message.content,
          });
        }

        // Model ne response diya lekin valid nahi
        lastError = data?.error?.message || `Model ${model} failed`;
        console.warn(`⚠️ Model ${model} failed:`, lastError);

      } catch (modelErr) {
        lastError = modelErr.message;
        console.warn(`⚠️ Model ${model} threw error:`, modelErr.message);
      }
    }

    // Sab models fail ho gaye
    cleanup();
    console.error("❌ All vision models failed. Last error:", lastError);
    return res.status(500).json({ error: "All AI models are currently unavailable. Please try again later." });

  } catch (err) {
    console.error("❌ Detection Error:", err);
    res.status(500).json({ error: "Server issue during detection." });
  }
});