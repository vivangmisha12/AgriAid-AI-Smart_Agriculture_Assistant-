import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// GREETING PATTERNS & RESPONSES
const GREETING_PATTERNS = {
  hi: /^(hi|hey|hello|hii|heyyy|heyy|hello there|hey there|greetings)\s*!*$/i,
  namaste: /^(नमस्ते|नमस्कार|सलाम|आदाब|नमः|हाय|हेलो)\s*!*$/i,
  bhojpuri: /^(नमस्कार|हाय|हेलो|केमन|केहे आवs)\s*!*$/i,
  punjabi: /^(sat sri akal|hello|haan|hi|hey)\s*!*$/i,
};

const GREETING_RESPONSES = {
  hi: [
    "नमस्ते! मैं AgriAid AI हूँ। आपकी खेती से जुड़ी कोई समस्या हो तो बताइए। 🌾",
    "अरे! स्वागत है। मैं आपकी कृषि में मदद करने के लिए यहाँ हूँ। किस चीज़ में सहायता चाहिए? 🚜",
    "नमस्ते भाई! खेती के बारे में कोई सवाल पूछिए। 👨‍🌾",
  ],
  en: [
    "Hello! I'm AgriAid AI. How can I help with your farming today? 🌾",
    "Hi there! I'm here to assist with all your agricultural needs. What can I help with? 🚜",
    "Greetings! Feel free to ask any farming-related questions. 👨‍🌾",
  ],
  bho: [
    "नमस्कार! मई AgriAid AI हऊँ। खेती के बारे मे कवन सवाल पूछीहीं? 🌾",
    "हाय भैया! मई तोहार खेती मे मदद करे के लिए यहाँ हऊँ। 🚜",
  ],
  pa: [
    "sat sri akal! Main AgriAid AI haan. Kheti bare koi sawaal pocho. 🌾",
    "Haan! Main tuhade farming vich madad karan lyi ready haan. 🚜",
  ],
};

// Function: Check करे कि message greeting है या नहीं
const isGreeting = (message) => {
  const trimmedMsg = message.trim();
  
  for (const [lang, pattern] of Object.entries(GREETING_PATTERNS)) {
    if (pattern.test(trimmedMsg)) {
      return lang;
    }
  }
  return null;
};

// Function: Random greeting response दे
const getGreetingResponse = (greetingType, lang = "hi") => {
  const responses = GREETING_RESPONSES[lang] || GREETING_RESPONSES["hi"];
  return responses[Math.floor(Math.random() * responses.length)];
};

// FALLBACK MODELS - अगर एक fail हो तो दूसरा try करे
const FALLBACK_MODELS = [
  "meta-llama/llama-3.1-8b-instruct",     // Primary
  "mistralai/mistral-7b-instruct",        // Fallback 1
  "openchat/openchat-3.5",                 // Fallback 2
  "gpt-3.5-turbo",                         // Fallback 3
];

// Function: OpenRouter API को call करे
const callOpenRouter = async (model, prompt, message, apiKey) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({    
        model: model,
        messages: [
            { role: "system", content: prompt },
            { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });
    
    const data = await response.json();
    
    // Check for API errors
    if (data.error) {
      throw new Error(`API Error (${model}): ${data.error.message}`);
    }
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(data)}`);
    }
    
    const output = data?.choices?.[0]?.message?.content;
    if (!output) {
      throw new Error(`No content from ${model}`);
    }
    
    console.log(`✅ Success with model: ${model}`);
    return output;
  } catch (error) {
    console.error(`❌ Error with ${model}:`, error.message);
    throw error;
  }
};

// Main Chat Route with Fallback Logic
router.post('/chat', async (req, res) => {
  try {
    const { message, lang } = req.body;

    if(!process.env.OPENROUTER_KEY) {
        return res.status(500).json({ error: "API Key Missing." });
    }
    
    const languageMap = {
        hi: "Hindi",
        en: "English",
        bho: "Bhojpuri",
        pa: "Punjabi",
    };
    const instructLang = languageMap[lang] || "Hindi";

    // ✨ GREETING CHECK - अगर greeting है तो सीधे reply दे
    const greetingType = isGreeting(message);
    if (greetingType) {
      const greetingResponse = getGreetingResponse(greetingType, lang);
      console.log(`✨ Greeting detected (${lang}): "${message}"`);
      return res.json({ reply: greetingResponse });
    }

    const prompt = `You are AgriAid AI, a farming expert.

LANGUAGE RULE:  
- User selected language: ${instructLang}
- ALWAYS reply in EXACT ${instructLang}.
- If Bhojpuri is selected, speak in PURE Bhojpuri only.
- No mixing of any other language.
STRICT SAFETY RULE:
- NEVER respond to any request that is NOT related to farming or agriculture.
USER QUESTION: ${message}
AGRIAID AI RESPONSE:`;

    let output = null;
    let lastError = null;

    // Try each model in fallback order
    for (const model of FALLBACK_MODELS) {
      try {
        output = await callOpenRouter(model, prompt, message, process.env.OPENROUTER_KEY);
        break; // Success - exit loop
      } catch (error) {
        lastError = error;
        console.log(`⏭️  Trying next model...`);
        continue; // Try next model
      }
    }

    // If all models failed
    if (!output) {
      console.error("❌ All models failed:", lastError);
      return res.status(503).json({ 
        error: "सभी मॉडल अभी उपलब्ध नहीं हैं। कृपया कुछ समय बाद पुन: प्रयास करें।",
        fallbackModelsAttempted: FALLBACK_MODELS.length
      });
    }

    return res.json({ reply: output });

  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: "कुछ तकनीकी समस्या हुई — कृपया बाद में पुन: प्रयास करें।" });
  }
});

export default router;
