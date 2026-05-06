import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
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
  .then(async () => {
    console.log("✅ MongoDB Connected Successfully!");

    const adminEmail = "admin@gmail.com";
    const adminPassword = "123123";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.findOneAndUpdate(
      { email: adminEmail },
      {
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log("✅ Default admin user ready: admin@gmail.com / 123123");
  })
  .catch((err) => console.error("❌ Connection Error:", err));

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

// ✨ Chatbot Route — PROTECTED (Login Required)
app.post("/api/chat", protect, async (req, res) => {
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
  "google/gemma-4-31b-it:free",       // Newest Gemma 4
  "google/gemma-4-26b-a4b-it:free",   // Gemma 4 MoE
  "google/gemma-3-27b-it:free",       // Gemma 3 27B
  "google/gemma-3-12b-it:free",       // Gemma 3 12B
  "nvidia/nemotron-3-nano-omni:free", // Nemotron 3 Omni
  "nvidia/nemotron-nano-12b-v2-vl:free", // Nemotron Nano VL
];

// Language-aware prompt builder
function buildVisionPrompt(lang) {
  const isHindi = lang === 'Hindi' || lang === 'hi';

  if (isHindi) {
    return `You are an expert agricultural scientist (Kishi Vigyanik). Carefully analyze this image.

OBJECTIVE:
- If the image is related to agriculture (crops, plants, leaves, soil, farm, pests, insects, agricultural tools, irrigation, etc.), provide a detailed analysis.
- If the image is NOT related to agriculture (e.g., cars, electronics, people only, buildings, generic objects), reply ONLY: "यह छवि कृषि से संबंधित नहीं है।"

STEP 1 — Analysis (Think in English for scientific accuracy):
- Category: (Crop/Soil/Pest/Farm/General)
- Identify: Crop type, soil texture, specific pest, or farm condition.
- Issue: If any disease, pest, nutrient deficiency, or soil problem is visible.
- Remedies: Practical solutions (Organic and Chemical).

STEP 2 — Output in PURE Hindi (Devanagari script only):
Format your response exactly like this:

## 🌿 पहचान और विश्लेषण
**श्रेणी:** (फसल / मिट्टी / कीट / खेत / अन्य)
**नाम/प्रकार:** (जैसे: गेहूं की फसल, काली मिट्टी, तना छेदक कीट, आदि)
**स्थिति:** (स्वस्थ / मध्यम समस्या / गंभीर समस्या)

## 🔍 मुख्य विवरण
(3-4 bullet points in Hindi describing what is visible in the image, like symptoms, soil condition, or pest type)

## 🌱 समाधान (जैविक/घरेलू)
(3-4 practical organic or home-based remedies/suggestions)

## ⚗️ रासायनिक समाधान (यदि आवश्यक हो)
(2-3 specific chemical treatments or fertilizers with names and dosage)

## ⚠️ विशेष सलाह
(1-2 important precautions or future advice for the farmer)

IMPORTANT: Use ONLY Hindi (Devanagari script). No English letters or Hinglish. Be extremely accurate and helpful for a farmer.`;
  } else {
    // English
    return `You are an expert agricultural scientist. Carefully analyze this image.

OBJECTIVE:
- If the image is related to agriculture (crops, plants, leaves, soil, farm, pests, insects, agricultural tools, irrigation, etc.), provide a detailed analysis.
- If the image is NOT related to agriculture (e.g., cars, electronics, people only, buildings, generic objects), reply ONLY: "This image is not related to agriculture."

STEP 1 — Analysis:
- Category: (Crop/Soil/Pest/Farm/General)
- Identify: Exact crop species, soil type, pest name, or farm layout.
- Issue: Detect diseases, infestations, nutrient deficiencies, or structural issues.
- Remedies: Suggest practical solutions.

STEP 2 — Output:
Format your response exactly like this:

## 🌿 Identification & Analysis
**Category:** (Crop / Soil / Pest / Farm / General)
**Name/Type:** (e.g., Tomato Leaf, Clay Soil, Aphids, etc.)
**Condition:** (Healthy / Mild Issue / Severe Issue)

## 🔍 Observations
(3-4 bullet points describing exact visible symptoms, soil characteristics, or pest markers)

## 🌱 Organic / Home Remedies
(3-4 practical organic treatments or management practices)

## ⚗️ Chemical Treatments (If applicable)
(2-3 chemical solutions or fertilizers with product names and dosage)

## ⚠️ Expert Advice
(1-2 important precautions or future prevention tips)

Be scientific, specific, and practical for real-world farming.`;
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