import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, LogIn, UserPlus } from 'lucide-react';
import { Button } from './ui/Button';

const ScrollLoginPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    // Listen for auth changes
    const handleAuthChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userChanged", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("userChanged", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const hasClosed = sessionStorage.getItem("loginPopupClosed");
    
    // If user is already logged in or has closed the popup in this session, don't do anything
    if (user || hasClosed) {
      setIsOpen(false);
      setIsVisible(false);
      return;
    }

    let timer;
    const handleScroll = () => {
      // Once user scrolls, wait 5 seconds then show popup
      timer = setTimeout(() => {
        setIsOpen(true);
        // Small delay to trigger entry animation
        setTimeout(() => setIsVisible(true), 50);
      }, 5000);
      
      // We only want to trigger the 5s timer once per session
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timer) clearTimeout(timer);
    };
  }, [user]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("loginPopupClosed", "true");
    // Wait for exit animation before unmounting
    setTimeout(() => setIsOpen(false), 500);
  };

  if (!isOpen || user) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" 
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div 
        className={`relative bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-full max-w-md overflow-hidden transform transition-all duration-500 ease-out ${
          isVisible ? 'scale-100 translate-y-0 rotate-0' : 'scale-90 translate-y-12 rotate-2'
        }`}
      >
        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600" />
        
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-100 transition-all duration-300 group"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:rotate-90 transition-all" />
        </button>

        <div className="p-10 text-center">
          {/* Logo Section */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-green-100 rounded-3xl rotate-6 animate-pulse" />
            <div className="absolute inset-0 bg-white rounded-3xl shadow-sm border border-green-50 flex items-center justify-center -rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/agriaid_logo.jpg" 
                alt="AgriAid Logo" 
                className="w-14 h-14 object-contain rounded-xl"
              />
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
            Elevate Your Farming! 🌾
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-10">
            Log in to unlock <span className="font-bold text-green-600">AI-powered</span> diagnoses and expert crop suggestions tailored for you.
          </p>

          <div className="space-y-4">
            <Link to="/login" onClick={handleClose}>
              <Button className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-xl shadow-green-100 group transition-all active:scale-95">
                <LogIn className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                Login Now
              </Button>
            </Link>
            
            <div className="flex items-center gap-4 py-4">
              <div className="flex-grow h-[1px] bg-slate-100" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">New to AgriAid?</span>
              <div className="flex-grow h-[1px] bg-slate-100" />
            </div>

            <Link to="/signup" onClick={handleClose}>
              <Button 
                variant="outline" 
                className="w-full h-14 border-2 border-slate-100 hover:border-green-100 hover:bg-green-50 text-slate-700 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                <UserPlus className="w-5 h-5 text-green-600" />
                Create Account
              </Button>
            </Link>
          </div>
          
          <p className="mt-8 text-xs text-slate-400 font-medium italic">
            Don't miss out on premium features!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollLoginPopup;
