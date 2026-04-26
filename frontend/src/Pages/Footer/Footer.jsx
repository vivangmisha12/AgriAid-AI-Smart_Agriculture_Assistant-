import { FaLeaf, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-400 mt-auto border-t border-slate-800">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Logo */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-xl shadow-md border border-slate-100">
                <img src="/agriaid_logo.jpg" alt="AgriAid Logo" className="w-10 h-10 object-contain rounded-lg" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">AgriAid</span>
            </div>
            <p className="text-sm leading-relaxed font-medium">
              Empowering farmers with cutting-edge AI technology for better crop health and smarter decisions.
            </p>
            <div className="flex gap-4">
              {[FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Solutions</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link to="/disease-detection" className="hover:text-green-500 transition-colors flex items-center gap-2">
                  Disease Detection
                </Link>
              </li>
              <li>
                <Link to="/weather" className="hover:text-green-500 transition-colors flex items-center gap-2">
                  Weather Alerts
                </Link>
              </li>
              <li>
                <Link to="/suggestions" className="hover:text-green-500 transition-colors flex items-center gap-2">
                  Expert Advice
                </Link>
              </li>
              <li>
                <Link to="/knowledge-base" className="hover:text-green-500 transition-colors flex items-center gap-2">
                  Agri Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-green-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Contact Us</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-green-500">
                  <FaEnvelope size={14} />
                </div>
                support@agriaid.com
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-green-500">
                  <FaPhoneAlt size={14} />
                </div>
                +91 9569881374
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-green-500">
                  <FaMapMarkerAlt size={14} />
                </div>
                Lucknow, Uttar Pradesh
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-widest uppercase">
          <p className="text-slate-500">&copy; 2025 AgriAid Intelligence. All rights reserved.</p>
          <p className="text-slate-600">Built for farmers, with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
