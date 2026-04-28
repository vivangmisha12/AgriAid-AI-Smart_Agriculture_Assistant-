import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Checkbox } from "../../components/ui/Checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Sprout, User, Mail, Phone, MapPin, Lock } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    farmSize: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post( `${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        farmSize: formData.farmSize,
        password: formData.password,
      });

      toast.success(res.data.message || "Registered Successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong 😔");
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF9F1] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-100/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-2xl relative z-10">
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
          <p className="mt-2 text-slate-500 font-medium italic">Empowering Farmers with AI-Driven Excellence</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-slate-900">Create Account</h2>
            <p className="text-slate-500 mt-2">Join our community and start optimizing your crops today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">Full Name</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-500 transition-colors" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="pl-12 h-12 rounded-xl border-slate-200 focus:border-green-500 focus:ring-green-500/10 bg-slate-50/30 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-500 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="pl-12 h-12 rounded-xl border-slate-200 focus:border-green-500 focus:ring-green-500/10 bg-slate-50/30 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-bold text-slate-700 ml-1">Phone Number</Label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-500 transition-colors" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="pl-12 h-12 rounded-xl border-slate-200 focus:border-green-500 focus:ring-green-500/10 bg-slate-50/30 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location and Farm Size */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-bold text-slate-700 ml-1">Location</Label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-500 transition-colors" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., Punjab, Ludhiana"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    className="pl-12 h-12 rounded-xl border-slate-200 focus:border-green-500 focus:ring-green-500/10 bg-slate-50/30 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmSize" className="text-sm font-bold text-slate-700 ml-1">Farm Size</Label>
                <Select
                  value={formData.farmSize}
                  onValueChange={(value) => updateField("farmSize", value)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:ring-green-500/10 bg-slate-50/30">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-2xl bg-white z-[100]">
                    <SelectItem value="small" className="cursor-pointer hover:bg-green-50 transition-colors">Small (&lt; 2 acres)</SelectItem>
                    <SelectItem value="medium" className="cursor-pointer hover:bg-green-50 transition-colors">Medium (2-10 acres)</SelectItem>
                    <SelectItem value="large" className="cursor-pointer hover:bg-green-50 transition-colors">Large (&gt; 10 acres)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Password Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-bold text-slate-700 ml-1">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-500 transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min 8 characters"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    className="pl-12 h-12 rounded-xl border-slate-200 focus:border-green-500 focus:ring-green-500/10 bg-slate-50/30 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-bold text-slate-700 ml-1">Confirm</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-500 transition-colors" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    className="pl-12 h-12 rounded-xl border-slate-200 focus:border-green-500 focus:ring-green-500/10 bg-slate-50/30 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3 ml-1 pt-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => updateField("agreeToTerms", checked)}
                className="mt-1 rounded-md border-slate-300 text-green-600 focus:ring-green-500/20"
                required
              />
              <label htmlFor="terms" className="text-sm text-slate-600 font-medium leading-relaxed cursor-pointer select-none">
                I agree to the <a href="#" className="text-green-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 font-bold hover:underline">Privacy Policy</a>
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-xl shadow-lg shadow-green-100 transition-all active:scale-[0.98] mt-4"
              disabled={!formData.agreeToTerms}
            >
              Get Started Now
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 font-bold hover:text-green-700 hover:underline ml-1">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-slate-400 font-medium">
          &copy; 2024 AgriAid - Agriculture Empowerment through AI
        </p>
      </div>
    </div>
  );
}
// "http://localhost:5000/api/auth/signup",