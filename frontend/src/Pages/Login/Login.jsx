import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Checkbox } from "../../components/ui/Checkbox";
import { Sprout, Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });

      toast.success(res.data.message || "Login Successful!");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (!rememberMe) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
      }

      window.dispatchEvent(new Event("userChanged"));
      navigate("/");

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF9F1] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block group">
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-green-100 inline-block group-hover:scale-105 transition-transform duration-300">
              <img
                src="/agriaid_logo.jpg"
                alt="AgriAid Logo"
                className="w-16 h-16 object-contain rounded-xl"
              />
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 group-hover:text-green-600 transition-colors">
              AgriAid
            </h1>
          </Link>
          <p className="mt-2 text-slate-500 font-medium">Welcome back to your farming assistant</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Sign In</h2>
            <p className="text-slate-500 text-sm mt-1">Access your personalized dashboard and AI tools</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-500 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="farmer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-slate-200 focus:border-green-500 focus:ring-green-500/10 bg-slate-50/30 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-sm font-bold text-slate-700">Password</Label>
                <Link to="/forgot-password" className="text-xs font-bold text-green-600 hover:text-green-700 hover:underline transition-all">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-500 transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-slate-200 focus:border-green-500 focus:ring-green-500/10 bg-slate-50/30 transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 ml-1">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked)}
                className="rounded-md border-slate-300 text-green-600 focus:ring-green-500/20"
              />
              <label htmlFor="remember" className="text-sm font-medium text-slate-600 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-100 transition-all active:scale-[0.98] mt-2"
            >
              Log In
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 font-medium">
              New here?{" "}
              <Link to="/signup" className="text-green-600 font-bold hover:text-green-700 hover:underline ml-1">
                Create a free account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-10 text-center text-xs text-slate-400 font-medium">
          Protected by AgriAid Secure Guard &bull; &copy; 2024 AgriAid
        </p>
      </div>
    </div>
  );
}


// "http://localhost:5000/api/auth/login"