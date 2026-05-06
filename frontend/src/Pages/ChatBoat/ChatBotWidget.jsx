import React, { useState, useEffect, useRef } from "react";
import { Send, ChevronDown, Lock } from "lucide-react";
import API_URL from "../../api";

export default function Chatbot() {
  // -------------------- STATES --------------------
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
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

  // -------------------- CHECK AUTHENTICATION --------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);


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

  // -------------------- OPEN CHAT HANDLER --------------------
  const handleOpenChat = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setIsOpen(true);
  };

  // -------------------- CLOSE LOGIN MODAL --------------------
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  // -------------------- NAVIGATE TO LOGIN --------------------
  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  // -------------------- NAVIGATE TO SIGNUP --------------------
  const handleSignupRedirect = () => {
    window.location.href = "/signup";
  };

  // -------------------- AI RESPONSE FUNCTION --------------------
  const getAIResponse = async (msg, lang = "hi") => {
    try{
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ message: msg, lang}),
      });
      
      if (response.status === 401) {
        alert("⚠️ सत्र समाप्त हुआ | Session expired, please login again");
        window.location.href = "/login";
        return "Please login again.";
      }
      
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
          onClick={handleOpenChat}
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

      {/* ================== LOGIN REQUIRED MODAL ================== */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 p-8 text-center relative">
            {/* Close Button - Top Right */}
            <button
              onClick={closeLoginModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light transition"
            >
              ✕
            </button>

            {/* Logo/Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Registration Required!</h2>

            {/* Lock Icon */}
            <div className="text-4xl mb-4">🔒</div>

            {/* Message */}
            <p className="text-gray-600 mb-8 text-lg">
              This premium tool is only for registered farmers. Please log in to continue.
            </p>

            {/* Login Button */}
            <button
              onClick={handleLoginRedirect}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg mb-6 transition flex items-center justify-center gap-2"
            >
              → Login to Continue
            </button>

            {/* Divider */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 font-semibold mb-4">NEW TO AGRIAID?</p>
            </div>

            {/* Signup Link */}
            <button
              onClick={handleSignupRedirect}
              className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-3 px-4 rounded-lg mb-6 transition flex items-center justify-center gap-2"
            >
              👤 Create Account
            </button>

            {/* Footer Text */}
            <p className="text-sm text-gray-500 italic">
              AgriAid is better when you're logged in.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
// "http://localhost:5000/api/chat",