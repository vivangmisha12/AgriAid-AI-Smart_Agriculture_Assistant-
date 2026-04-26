import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/Button";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userChanged", handleStorageChange); // Match event from Login.jsx
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userChanged", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/disease-detection", label: "Disease Detection" },
    { path: "/weather", label: "Weather Alerts" },
    { path: "/suggestions", label: "Expert Tips" },
    { path: "/knowledge-base", label: "Knowledge Base" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 🌱 Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3 group transition-all duration-300">
            <div className="bg-white p-1 rounded-xl shadow-md border border-green-100 group-hover:scale-110 group-hover:shadow-lg group-hover:border-green-300 transition-all duration-300">
              <img
                src="/agriaid_logo.jpg"
                alt="AgriAid Logo"
                className="w-10 h-10 object-contain rounded-lg"
              />
            </div>
            <span className="text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-emerald-600 transition-all duration-300 pb-1">
              AgriAid
            </span>
          </Link>

          {/* 🧭 Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 text-sm font-bold transition-all duration-300 group ${
                  isActive(link.path)
                    ? "text-green-600"
                    : "text-slate-500 hover:text-green-600 hover:-translate-y-0.5"
                }`}
              >
                {link.label}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-green-500 transition-all duration-300 ${
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* 👤 User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 focus:outline-none">
                    <Avatar className="cursor-pointer hover:ring-2 hover:ring-green-500 transition-all">
                      <AvatarFallback className="bg-green-600 text-white font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white shadow-xl rounded-xl border-slate-100">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/help")} className="cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-slate-600 font-bold hover:bg-slate-50">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-100 px-6 rounded-xl font-bold">
                    Join Now
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* 📱 Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-slate-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* 📱 Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                    isActive(link.path)
                      ? "bg-green-50 text-green-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <div className="mt-2 pt-4 border-t space-y-2">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <Avatar>
                      <AvatarFallback className="bg-green-600 text-white font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 h-12 rounded-xl font-bold"
                    onClick={() => { navigate("/profile"); setMobileMenuOpen(false); }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 h-12 rounded-xl font-bold text-red-600 hover:text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-2 px-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-12 rounded-xl font-bold">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
