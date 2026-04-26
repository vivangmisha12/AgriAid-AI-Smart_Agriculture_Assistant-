import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
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

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
      },
      body: JSON.stringify({    
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
            { role: "system", content: prompt },
            { role: "user", content: message },
        ],
        }),
    });
    const data = await response.json(); 
    const output = data?.choices?.[0]?.message?.content || "मुझे अभी उस सवाल का सटीक उत्तर नहीं मिला, कृपया थोड़ा और विवरण दें।";
     return res.json({ reply: output });
  }
    catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: "कुछ तकनीकी समस्या हुई — कृपया बाद में पुन: प्रयास करें।" });
  }
    });
    export default router;
