import React, { useState, useEffect, useRef } from "react";
import { Send, ChevronDown } from "lucide-react";

export default function Chatbot() {
  // -------------------- STATES --------------------
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      text: "नमस्ते! मैं AgriAid AI हूँ। खेती से जुड़ा कोई भी सवाल पूछिए — मैं मदद करूँगा।",
      sender: "bot",
      timestamp: new Date(),
      language: "hi",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("hi"); // hi/en/bho/pa
  const messagesEndRef = useRef(null);


  // PLACEHOLDERS
  const placeholders = {
    hi: "अपनी समस्या यहाँ लिखें...",
    en: "Type your farming question...",
    bho: "अपना सवाल लिखीं...",
  };

  // AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // -------------------- AI RESPONSE FUNCTION --------------------
  const getAIResponse = async (msg, lang = "hi") => {
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msg, lang}),
      });
      
      const data = await response.json();
      return data.reply || "Server error — please try again.";
    } catch (error) {
      console.error("Frontend Error:", error);
      return "Network issue — try again.";
    }
  };

  // -------------------- SEND FUNCTION --------------------
  const send = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
      language,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await getAIResponse(userMsg.text, language);

      const botMsg = {
        id: Date.now() + 1,
        text: reply,
        sender: "bot",
        timestamp: new Date(),
        language,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: "Error in generating response.",
          sender: "bot",
          timestamp: new Date(),
          language,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // -------------------- UI --------------------
  return (
    <div>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-xl hover:bg-green-700 transition"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[450px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden border border-green-600">
          <div className="bg-green-600 text-white p-3 flex justify-between items-center">
            <h2 className="font-bold text-lg">AgriAid AI</h2>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded px-2 py-1 text-sm bg-green-100 text-green-800 border border-green-300"
            >
              <option value="hi">हिंदी</option>
              <option value="en">English</option>
              <option value="bho">भोजपुरी</option>
            </select>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/90 hover:text-white p-1 rounded"
            >
              <ChevronDown />
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-green-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[75%] whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white ml-auto"
                    : "bg-white text-gray-800 shadow"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="bg-white p-2 rounded-lg text-gray-600 w-20">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t flex items-center gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder={placeholders[language]}
              className="flex-1 border border-green-400 rounded-lg p-2 outline-none"
            />

            <button
              onClick={send}
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
// "http://localhost:5000/api/chat",