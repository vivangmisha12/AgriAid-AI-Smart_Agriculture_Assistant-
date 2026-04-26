import React, { useState, useEffect } from "react";

export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Allow time for fade-out animation
    }, 2000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-1000 bg-gradient-to-br from-green-50 via-white to-emerald-50 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-1000">
        {/* Logo Container */}
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-green-100 animate-bounce-subtle">
          <img
            src="/agriaid_logo.jpg"
            alt="AgriAid Logo"
            className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-2xl"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-sm bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent pb-4">
            AgriAid
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-bold tracking-[0.3em] uppercase opacity-80 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
            Smart Farming Assistant
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-1.5 bg-slate-100 rounded-full mt-8 overflow-hidden border border-slate-200">
          <div className="h-full bg-green-500 rounded-full animate-progress-bar" />
        </div>
      </div>

      <style>{`
        @keyframes progress-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress-bar {
          animation: progress-bar 2s linear forwards;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
