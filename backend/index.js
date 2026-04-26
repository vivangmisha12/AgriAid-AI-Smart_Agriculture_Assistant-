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
  origin: ["https://mellow-smakager-a976e5.netlify.app", "http://localhost:5173", "http://localhost:3000"],
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

// 2. Disease Detection Route (Using OpenRouter Vision)
app.post("/api/detect", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    // A. Image ko base64 mein badalna
    const imagePath = req.file.path;
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const imageType = req.file.mimetype;

    // B. OpenRouter Vision ko photo bhejna
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", 
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this image for agricultural content. 
                RULE 1: If the image is completely unrelated to agriculture (e.g., cars, cityscapes, electronics), reply ONLY with "This image is not related to agriculture." in ${req.body.lang || 'Hindi'} (using pure Devanagari script for Hindi).
                RULE 2: If it shows a farm, field, plant, pest, soil, or agri-tool, provide a detailed analysis in ${req.body.lang || 'Hindi'} using only pure native script (no Hinglish).

                Please structure your response clearly in ${req.body.lang || 'Hindi'} as follows:
                - **Identification**: Name of what is detected.
                - **About**: A detailed explanation of the disease/pest/object.
                - **Home Remedies (Organic)**: 3-4 natural ways to manage this.
                - **Chemical Remedies**: Commercial names of pesticides or fertilizers if needed.
                Keep the information practical and comprehensive for a farmer.`
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

    // C. Cleanup (Photo delete kar dena)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    if (!response.ok || !data.choices) {
      console.error("❌ OpenRouter Vision Error:", data);
      return res.status(500).json({ error: "AI service issue." });
    }

    const aiResult = data.choices[0].message.content;

    res.json({
      disease: "Detected by AI Vision",
      remedy: aiResult,
    });

  } catch (err) {
    console.error("❌ Detection Error:", err);
    res.status(500).json({ error: "Server issue during detection." });
  }
});