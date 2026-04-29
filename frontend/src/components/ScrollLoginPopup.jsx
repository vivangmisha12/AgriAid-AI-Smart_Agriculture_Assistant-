import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, LogIn, UserPlus } from 'lucide-react';
import { Button } from './ui/Button';

const ScrollLoginPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const location = useLocation();

  // Pages where login is strictly mandatory (No Close Button)
  const mandatoryRoutes = ["/disease-detection", "/weather", "/suggestions", "/knowledge-base"];
  // Pages where popup shows immediately but can be closed (Home)
  const protectedRoutes = ["/", ...mandatoryRoutes];
  
  const isProtected = protectedRoutes.includes(location.pathname);
  const isMandatory = mandatoryRoutes.includes(location.pathname);
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

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
    if (user || isAuthPage) {
      setIsOpen(false);
      setIsVisible(false);
      return;
    }

    // If it's the home page and user already closed it, don't show
    if (location.pathname === "/" && sessionStorage.getItem("loginPopupClosed")) {
      return;
    }

    if (isProtected) {
      // Show immediately
      setIsOpen(true);
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [user, location.pathname, isProtected, isAuthPage]);

  const handleClose = () => {
    if (isMandatory) return; // Prevent closing on mandatory pages
    setIsVisible(false);
    sessionStorage.setItem("loginPopupClosed", "true");
    setTimeout(() => setIsOpen(false), 500);
  };

  if (!isOpen || user || isAuthPage) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop with blur */}
      <div 
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-[6px] transition-all duration-1000 ${isMandatory ? 'cursor-default' : 'cursor-pointer'}`} 
        onClick={isMandatory ? null : handleClose}
      />
      
      {/* Modal Container */}
      <div 
        className={`relative bg-white rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.3)] w-full max-w-md overflow-hidden transform transition-all duration-500 ease-out border border-slate-100 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
      >
        {/* Decorative Top Bar */}
        <div className="h-2.5 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600" />
        
        {!isMandatory && (
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-100 transition-all duration-300 group"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:rotate-90 transition-all" />
          </button>
        )}

        <div className="p-10 text-center">
          {/* Logo Section */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-green-100 rounded-3xl rotate-6 animate-pulse" />
            <div className="absolute inset-0 bg-white rounded-3xl shadow-sm border border-green-50 flex items-center justify-center -rotate-3">
              <img 
                src="/agriaid_logo.jpg" 
                alt="AgriAid Logo" 
                className="w-14 h-14 object-contain rounded-xl"
              />
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
            {location.pathname === "/" ? "Welcome to AgriAid AI! 👋" : "Registration Required! 🔒"}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-10">
            {location.pathname === "/" 
              ? "Join our community of smart farmers to access AI tools and expert advice." 
              : "This premium tool is only for registered farmers. Please log in to continue."}
          </p>

          <div className="space-y-4">
            <Link to="/login" onClick={isProtected ? null : handleClose}>
              <Button className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-xl shadow-green-100 group transition-all active:scale-95">
                <LogIn className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                Login to Continue
              </Button>
            </Link>
            
            <div className="flex items-center gap-4 py-4">
              <div className="flex-grow h-[1px] bg-slate-100" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">New to AgriAid?</span>
              <div className="flex-grow h-[1px] bg-slate-100" />
            </div>

            <Link to="/signup" onClick={isProtected ? null : handleClose}>
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
            AgriAid is better when you're logged in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollLoginPopup;
