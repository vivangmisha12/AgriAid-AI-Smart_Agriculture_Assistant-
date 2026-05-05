import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import {
  FaFingerprint, FaCloudSun, FaLightbulb, FaBook, FaShieldAlt,
  FaUsers, FaCheckCircle, FaArrowRight, FaRocket, FaCogs
} from 'react-icons/fa';
import { MdOutlineScreenSearchDesktop } from 'react-icons/md';
import { Carousel } from "../../components/Carousel";

// Custom hook for Intersection Observer
const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return isIntersecting;
};

// Custom CSS for animations
const customStyles = `
  .slide-in-left { transform: translateX(-50px); opacity: 0; transition: transform 0.8s ease-out, opacity 0.8s ease-out; }
  .slide-in-right { transform: translateX(50px); opacity: 0; transition: transform 0.8s ease-out, opacity 0.8s ease-out; }
  .slide-in-visible { transform: translateX(0); opacity: 1; }
  .fade-in-up { transform: translateY(30px); opacity: 0; transition: transform 0.8s ease-out, opacity 0.8s ease-out; }
  .fade-in-visible { transform: translateY(0); opacity: 1; }
  .hover-premium { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .hover-premium:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
`;

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const features = [
    { icon: MdOutlineScreenSearchDesktop, title: "Crop Health Scan", description: "Upload photos and get instant AI-powered diagnosis with organic treatment plans.", link: "/disease-detection", color: "bg-green-100 text-green-600" },
    { icon: FaCloudSun, title: "Weather Insights", description: "Real-time climate updates and early warnings for storms to protect your harvest.", link: "/weather", color: "bg-blue-100 text-blue-600" },
    { icon: FaLightbulb, title: "Expert Support", description: "Get personalized farming tips and modern best practices from agri-scientists.", link: "/suggestions", color: "bg-orange-100 text-orange-600" },
    { icon: FaBook, title: "Agri Library", description: "Access comprehensive guides on modern farming and sustainable techniques.", link: "/knowledge-base", color: "bg-indigo-100 text-indigo-600" },
  ];

  const sliderImages = [
    { url: "/agariaid_img4.jpg", title: "Smart Farming for Better Yield" },
    { url: "/agariaid_img2.jpg", title: "Protect Your Crops with AI" },
    { url: "/agariaid_img3.jpg", title: "Expert Advice Anytime" },
    { url: "/agariaid_img1.jpg", title: "Join Our Farming Community" }
  ];

  const benefits = [
    "100% Free for all Indian Farmers",
    "Multi-language support (Hindi/English)",
    "AI-powered precision diagnostics",
    "Verified chemical & organic remedies",
    "Real-time local weather tracking",
    "24/7 Digital Assistant availability",
  ];

  // Refs for all sections
  const heroLeftRef = useRef(null);
  const heroRightRef = useRef(null);
  const featuresHeaderRef = useRef(null);
  const howItWorksHeaderRef = useRef(null);
  const benefitsLeftRef = useRef(null);
  const benefitsRightRef = useRef(null);
  const ctaRef = useRef(null);

  // Intersection states
  const isHeroLeftVisible = useIntersectionObserver(heroLeftRef);
  const isHeroRightVisible = useIntersectionObserver(heroRightRef);
  const isFeaturesHeaderVisible = useIntersectionObserver(featuresHeaderRef);
  const isHowItWorksHeaderVisible = useIntersectionObserver(howItWorksHeaderRef);
  const isBenefitsLeftVisible = useIntersectionObserver(benefitsLeftRef);
  const isBenefitsRightVisible = useIntersectionObserver(benefitsRightRef);
  const isCtaVisible = useIntersectionObserver(ctaRef);

  return (
    <div className="min-h-screen bg-[#FCF9F1] overflow-x-hidden">
      <style>{customStyles}</style>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={heroLeftRef} className={`slide-in-left ${isHeroLeftVisible ? 'slide-in-visible' : ''}`}>

              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1.5 rounded-full font-bold mb-6">
                Smart Farming Assistant
              </Badge>
              <h1 className="text-5xl md:text-6xl font-black text-slate-800 mb-6 leading-[1.1]">
                Empowering <span className="text-green-600">Farming</span> with Intelligence
              </h1>
              <p className="text-lg text-slate-500 mb-10 max-w-xl font-medium leading-relaxed">
                Join AgriAid to get instant crop diagnostics, hyper-local weather alerts, and expert advice—all designed to help you grow more with less.
              </p>
              <div className="flex flex-wrap gap-4">
                {!user ? (
                  <>
                    <Link to="/signup">
                      <Button className="bg-green-600 hover:bg-green-700 text-white px-10 py-7 rounded-[1.2rem] shadow-xl shadow-green-100 hover-premium text-lg font-bold">
                        Get Started Free <FaArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to="/disease-detection">
                      <Button variant="outline" className="border-2 border-slate-200 text-slate-700 hover:bg-white px-10 py-7 rounded-[1.2rem] shadow-sm hover-premium text-lg font-bold bg-white">
                        Scan Crop
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/disease-detection">
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-10 py-7 rounded-[1.2rem] shadow-xl shadow-green-100 hover-premium text-lg font-bold">
                      Smart Disease Detection <FaArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div ref={heroRightRef} className={`slide-in-right ${isHeroRightVisible ? 'slide-in-visible' : ''} relative`}>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white">
                <Carousel images={sliderImages} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={featuresHeaderRef} className={`text-center mb-16 fade-in-up ${isFeaturesHeaderVisible ? 'fade-in-visible' : ''}`}>
            <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Our Core Services</h2>
            <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} to={feature.link} className="block group">
                  <Card className="h-full border-none shadow-xl shadow-slate-100 rounded-[2rem] hover-premium transition-all p-4">
                    <CardHeader className="pb-4">
                      <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon size={24} />
                      </div>
                      <CardTitle className="text-xl font-black text-slate-800">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-500 font-medium leading-relaxed">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white/50 backdrop-blur-md border-y border-slate-100 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div ref={howItWorksHeaderRef} className={`text-center mb-24 fade-in-up ${isHowItWorksHeaderVisible ? 'fade-in-visible' : ''}`}>
            <Badge className="bg-green-100 text-green-700 border-none px-4 py-1.5 rounded-full font-bold mb-4 uppercase tracking-wider text-[10px]">
              How it works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">Simple 3-Step Process</h2>
            <p className="text-slate-500 font-medium text-lg">Getting started with AgriAid is easier than ever</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
            {/* Connection Lines (Desktop Only) */}
            <div className="hidden md:block absolute top-1/3 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-green-200 -z-10"></div>
            
            {[
              { 
                step: "01", 
                icon: <FaRocket />, 
                title: "Register Free", 
                desc: "Create your farmer profile in under 60 seconds and join our community.",
                color: "text-green-600 bg-green-50"
              },
              { 
                step: "02", 
                icon: <MdOutlineScreenSearchDesktop />, 
                title: "Choose Service", 
                desc: "Upload a crop photo for diagnosis or check local weather and expert tips.",
                color: "text-blue-600 bg-blue-50"
              },
              { 
                step: "03", 
                icon: <FaCheckCircle />, 
                title: "Grow Smart", 
                desc: "Implement AI-powered recommendations and track your crop's healthy growth.",
                color: "text-orange-600 bg-orange-50"
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                {/* Step Number Badge */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-7xl font-black text-slate-100/80 -z-10 group-hover:text-green-100 transition-colors">
                  {item.step}
                </div>
                
                <div className="bg-white rounded-[2.5rem] p-8 text-center shadow-xl shadow-slate-100 border border-slate-100 hover-premium transition-all relative">
                  <div className={`w-20 h-20 rounded-3xl ${item.color} flex items-center justify-center mx-auto mb-8 text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-4">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  
                  {/* Bottom Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-200 rounded-full group-hover:w-8 group-hover:bg-green-500 transition-all"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div ref={benefitsLeftRef} className={`slide-in-left ${isBenefitsLeftVisible ? 'slide-in-visible' : ''}`}>
              <h2 className="text-4xl font-black text-slate-800 mb-10 leading-tight">Why Smart Farmers <br /> Choose <span className="text-green-600">AgriAid</span>?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={benefit} className="flex items-start gap-4 p-4 bg-white/40 rounded-2xl border border-slate-100 hover:bg-white transition-colors">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-sm font-bold text-slate-600">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div ref={benefitsRightRef} className={`slide-in-right ${isBenefitsRightVisible ? 'slide-in-visible' : ''}`}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: FaShieldAlt, color: "bg-white text-green-600", title: "10K+", desc: "Safe Farms" },
                  { icon: FaUsers, color: "bg-white text-blue-600", title: "50K+", desc: "Members" },
                  { icon: MdOutlineScreenSearchDesktop, color: "bg-white text-orange-600", title: "100K+", desc: "Scans Done" },
                  { icon: FaBook, color: "bg-white text-indigo-600", title: "500+", desc: "Agri Guides" },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={index} className="border-none shadow-xl shadow-slate-100 rounded-[2rem] p-6 text-center hover-premium">
                      <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center mx-auto mb-4 text-2xl shadow-sm`}>
                        <Icon />
                      </div>
                      <CardTitle className="text-3xl font-black text-slate-800">{stat.title}</CardTitle>
                      <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.desc}</CardDescription>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-24 px-4">
          <div ref={ctaRef} className={`container mx-auto max-w-5xl bg-gradient-to-br from-green-600 to-green-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-green-200 fade-in-up ${isCtaVisible ? 'fade-in-visible' : ''}`}>
            <div className="absolute top-0 right-0 p-20 opacity-10">
              <FaRocket size={300} className="rotate-12" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Start Your Digital Journey</h2>
              <p className="text-xl text-green-50 mb-10 max-w-2xl mx-auto font-medium opacity-90">
                Join the fastest growing farming community in India and protect your crops today.
              </p>
              <Link to="/signup">
                <Button size="lg" className="bg-white text-green-700 hover:bg-slate-50 px-12 py-8 rounded-2xl shadow-2xl text-xl font-black hover-premium">
                  Register for Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="pb-12 text-center text-slate-300 font-bold text-xs tracking-[0.2em] uppercase">
        AgriAid Intelligence v3.0
      </div>
    </div>
  );
}

// Helper Badge component since it's used in the code
const Badge = ({ children, className }) => (
  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${className}`}>
    {children}
  </span>
);
