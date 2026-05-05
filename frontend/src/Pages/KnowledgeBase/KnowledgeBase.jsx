import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/Button";
import { Label } from "../../components/ui/Label";
import { toast } from "react-hot-toast";
import API_URL from "../../api";
import {
  BookOpen,
  Search,
  TrendingUp,
  Clock,
  User,
  MessageCircle,
  ThumbsUp,
  Eye,
  FileText,
  Video,
  HelpCircle,
  ArrowRight,
  LayoutGrid,
  Droplets,
  Sprout
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import "./KnowledgeBase.css";

export default function KnowledgeBase() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [customArticles, setCustomArticles] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [articleForm, setArticleForm] = useState({
    title: "",
    category: "Technology",
    author: "Admin",
    readTime: "5 min",
    excerpt: "",
    tags: "",
    imageUrl: "",
    url: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingArticleId, setEditingArticleId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("📦 User from localStorage:", parsedUser);
      setUser(parsedUser);
    }

    const handleAuthChange = () => {
      const updatedUser = localStorage.getItem("user");
      const parsedUser = updatedUser ? JSON.parse(updatedUser) : null;
      console.log("🔄 User updated via event:", parsedUser);
      setUser(parsedUser);
    };

    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("userChanged", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("userChanged", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch(`${API_URL}/api/articles`);
        const data = await response.json();

        if (response.ok) {
          setCustomArticles(Array.isArray(data.articles) ? data.articles : []);
        }
      } catch (error) {
        console.error("Failed to load custom articles:", error);
      }
    };

    loadArticles();
  }, []);

  const defaultArticles = [
    // Innovation / Technology
    {
      id: 1,
      title: "IFFCO Nano Urea: The Future of Efficient Fertilization",
      category: "Technology",
      author: "Krishi Jagran",
      date: "Feb 10, 2026",
      readTime: "10 min",
      views: 5200,
      likes: 450,
      excerpt: "Nano Urea is revolutionizing Indian agriculture by reducing traditional urea requirement by 50%. Learn how to apply it and its benefits for crop yield and soil health.",
      tags: ["IFFCO", "NanoTech", "Fertilizer"],
      image: "/img_1.avif",
      url: "https://krishijagran.com/agripedia/iffco-nano-urea-the-only-nano-fertilizer-approved-by-govt-of-india-know-its-uses-benefits/"
    },
    {
      id: 2,
      title: "Kisan Drones: How to Apply for Government Subsidy",
      category: "Technology",
      author: "AgriTech Today",
      date: "Jan 25, 2026",
      readTime: "15 min",
      views: 3800,
      likes: 312,
      excerpt: "Government subsidies are making drones accessible for small farmers. Discover the eligibility, required documents, and the full application process.",
      tags: ["Drones", "AgriTech", "Subsidy"],
      image: "/img_2.webp",
      url: "https://krishijagran.com/agriculture-world/government-offers-100-subsidy-for-purchase-of-drones/"
    },

    // Organic Farming
    {
      id: 3,
      title: "Shree Anna: Benefits of Millets and Why India is Celebrating",
      category: "Organic Farming",
      author: "ICAR Expert",
      date: "Jan 12, 2026",
      readTime: "12 min",
      views: 6500,
      likes: 890,
      excerpt: "From Bajra to Ragi, millets are making a global comeback. Learn the climate-resilient practices for millet cultivation and their high nutritional value.",
      tags: ["Millets", "ShreeAnna", "ICAR"],
      image: "/img_3.jpg",
      url: "https://krishijagran.com/featured/shree-anna-millets-to-bring-prosperity-to-farmers-and-people/"
    },
    {
      id: 101,
      title: "Vermicompost Preparation: A Step-by-Step Guide",
      category: "Organic Farming",
      author: "Priya Sharma",
      date: "Feb 01, 2026",
      readTime: "8 min",
      excerpt: "Learn how to turn farm waste into 'Black Gold' using earthworms. Perfect for small scale organic farmers.",
      tags: ["Organic", "Compost", "WasteManagement"],
      image: "/ag5.png",
      url: "https://krishijagran.com/news/how-to-make-vermicompost/"
    },

    // Pest Management
    {
      id: 201,
      title: "Pheromone Traps: Smart Pest Monitoring",
      category: "Pest Management",
      author: "AgriScientist",
      date: "Jan 15, 2026",
      readTime: "9 min",
      excerpt: "Track and trap pests like Stem Borer without spraying chemicals.",
      tags: ["Traps", "IPM", "Pest"],
      image: "/agariaid_img1.jpg"
    },
    { id: 202, title: "Identifying Common Rice Pests", category: "Pest Management", author: "CropDoc", readTime: "11 min", excerpt: "Visual guide to BPH, Stem Borer, and Leaf Folder.", tags: ["Rice", "Pests"] },

    // Water Management
    {
      id: 301,
      title: "Cost-Effective Drip Irrigation Setup",
      category: "Water Management",
      author: "WaterWise",
      date: "Feb 12, 2026",
      readTime: "16 min",
      excerpt: "Save 70% water while increasing yield for small orchards.",
      tags: ["Irrigation", "Savings", "Drip"],
      image: "/agariaid_img2.jpg"
    },

    // Soil Health
    {
      id: 4,
      title: "Mulching Techniques and Their Benefits in Agriculture",
      category: "Soil Health",
      author: "Priya Sharma",
      date: "Dec 05, 2025",
      readTime: "7 min",
      views: 2900,
      likes: 198,
      excerpt: "Plastic vs. Organic mulching—which one should you choose? A detailed comparison on cost-effectiveness and impact on soil microbial life.",
      tags: ["Mulching", "Organic", "WaterSaving"],
      image: "/img_4.webp",
      url: "https://krishijagran.com/featured/shree-anna-millets-to-bring-prosperity-to-farmers-and-people/"
    },
    {
      id: 401,
      title: "Understanding Soil pH for Beginners",
      category: "Soil Health",
      author: "SoilScientist",
      date: "Jan 30, 2026",
      readTime: "10 min",
      excerpt: "How acidity or alkalinity affects nutrient absorption.",
      tags: ["pH", "Basics", "Soil"],
      image: "/agariaid_img3.jpg"
    },

    // Climate
    {
      id: 501,
      title: "Predicting Monsoons: Tech for Farmers",
      category: "Climate",
      author: "WeatherWatch",
      date: "Feb 08, 2026",
      readTime: "11 min",
      excerpt: "Using satellite data and apps to plan your sowing season.",
      tags: ["Monsoon", "Weather", "App"],
      image: "/agariaid_img4.jpg"
    },
    { id: 502, title: "Protecting Crops from Heatwaves", category: "Climate", author: "Summertime", readTime: "9 min", excerpt: "Immediate steps to save thirsty plants during extreme heat.", tags: ["Heatwave", "Summer"] },
  ];

  const allArticles = [...customArticles, ...defaultArticles].map(art => ({
    ...art,
    displayImage: art.imageUrl || art.image || "/agriaid_logo.jpg"
  }));
  const isAdmin = user?.role === "admin" || user?.email === "admin@gmail.com";

  console.log("👤 Current user object:", user);
  console.log("✅ isAdmin check:", isAdmin, "| user?.role:", user?.role);

  const handleArticleFormChange = (field, value) => {
    setArticleForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAdminUpload = async (event) => {
    event.preventDefault();

    if (!isAdmin) {
      toast.error("Only admin can upload articles.");
      return;
    }

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", articleForm.title);
      formData.append("category", articleForm.category);
      formData.append("author", articleForm.author);
      formData.append("readTime", articleForm.readTime);
      formData.append("excerpt", articleForm.excerpt);
      formData.append("url", articleForm.url);

      const tags = typeof articleForm.tags === 'string'
        ? articleForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : articleForm.tags;

      formData.append("tags", JSON.stringify(tags));

      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        formData.append("imageUrl", articleForm.imageUrl);
      }

      const url = editingArticleId
        ? `${API_URL}/api/articles/${editingArticleId}`
        : `${API_URL}/api/articles`;

      const method = editingArticleId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Note: Don't set Content-Type, fetch will set it for FormData
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Article save failed");
      }

      if (editingArticleId) {
        setCustomArticles((prev) =>
          prev.map((art) => art._id === editingArticleId ? data.article : art)
        );
        toast.success("Article updated successfully!");
      } else {
        setCustomArticles((prev) => [data.article, ...prev]);
        toast.success("Article uploaded successfully!");
      }

      setArticleForm({
        title: "",
        category: "Technology",
        author: "Admin",
        readTime: "5 min",
        excerpt: "",
        tags: "",
        imageUrl: "",
        url: "",
      });
      setImageFile(null);
      setEditingArticleId(null);
      setShowUploadForm(false);
    } catch (error) {
      toast.error(error.message || "Save failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (article, e) => {
    e.stopPropagation();
    setEditingArticleId(article._id);
    setArticleForm({
      title: article.title,
      category: article.category,
      author: article.author,
      readTime: article.readTime,
      excerpt: article.excerpt,
      tags: Array.isArray(article.tags) ? article.tags.join(", ") : article.tags,
      imageUrl: article.imageUrl,
      url: article.url,
    });
    setImageFile(null);
    setShowUploadForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/articles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCustomArticles((prev) => prev.filter((art) => (art._id || art.id) !== id));
        toast.success("Article deleted successfully!");
      } else {
        const data = await response.json();
        throw new Error(data.message || "Delete failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleArticleClick = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.info("Coming soon! Full guide in progress.");
    }
  };

  const faqs = [
    {
      question: "How often should I test my soil?",
      answer: "Soil testing should be done at least once a year, preferably before the planting season. For intensive farming, testing twice a year is recommended.",
      category: "Soil"
    },
    {
      question: "What is the best time for pesticide application?",
      answer: "Early morning or late evening is ideal as temperatures are cooler and winds are calmer. Avoid spraying during rain or when rain is expected within 24 hours.",
      category: "Pest Control"
    },
    {
      question: "How can I improve water retention in sandy soil?",
      answer: "Add organic matter like compost, use mulch, and consider mixing in clay or bentonite. Drip irrigation is more efficient than flood irrigation for sandy soils.",
      category: "Soil"
    },
    {
      question: "What are the benefits of crop rotation?",
      answer: "Crop rotation improves soil fertility, breaks pest and disease cycles, reduces weed pressure, and can increase overall farm productivity by 15-20%.",
      category: "Crop Management"
    },
  ];

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to delete ALL articles from the database? This cannot be undone.")) return;
    
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/articles/clear-all`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCustomArticles([]);
        toast.success("All database articles cleared!");
      } else {
        toast.error("Failed to clear articles.");
      }
    } catch (error) {
      console.error("Clear all failed:", error);
      toast.error("Error clearing articles.");
    }
  };

  const filteredArticles = (() => {
    // 1. First filter by search query
    const searched = allArticles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });

    // 2. If a specific category is selected, filter by that category
    if (selectedCategory !== "All Articles") {
      return searched.filter(a => a.category === selectedCategory);
    }

    // 3. For "All Articles", show everything that matches the search
    return searched;
  })();

  const categories = [
    { name: "All Articles", count: allArticles.length, icon: LayoutGrid },
    { name: "Technology", count: allArticles.filter(a => a.category === "Technology").length, icon: TrendingUp },
    { name: "Organic Farming", count: allArticles.filter(a => a.category === "Organic Farming").length, icon: BookOpen },
    { name: "Pest Management", count: allArticles.filter(a => a.category === "Pest Management").length, icon: FileText },
    { name: "Water Management", count: allArticles.filter(a => a.category === "Water Management").length, icon: Droplets },
    { name: "Soil Health", count: allArticles.filter(a => a.category === "Soil Health").length, icon: Sprout },
    { name: "Climate", count: allArticles.filter(a => a.category === "Climate").length, icon: Clock },
  ];

  const trendingTopics = [
    "Organic Certification",
    "Drip Irrigation",
    "Integrated Pest Management",
    "Soil Testing",
    "Climate Adaptation",
    "Crop Insurance"
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen kb-hero-gradient py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {isAdmin && (
          <div className="mb-8 flex justify-between items-center bg-white/40 p-4 rounded-3xl border border-green-100 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-gray-800">Admin Mode Active</p>
                <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="destructive"
                className="rounded-full px-6 py-3 font-bold shadow-lg"
                onClick={handleClearAll}
              >
                Clear All DB Articles
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 shadow-lg shadow-green-100 font-bold"
                onClick={() => setShowUploadForm((prev) => !prev)}
              >
                {showUploadForm ? "Close Form" : "Upload Articles"}
              </Button>
            </div>
          </div>
        )}

        {isAdmin && showUploadForm && (
          <Card className="kb-glass-card border-none mb-10 overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-black text-gray-900">
                {editingArticleId ? "Edit Article" : "Upload Knowledge Base Article"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {editingArticleId ? "Update the article details below." : "Paste the Cloudinary image URL, article link, and details here."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminUpload} className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Article title"
                  value={articleForm.title}
                  onChange={(event) => handleArticleFormChange("title", event.target.value)}
                  required
                />
                <Input
                  placeholder="Author name"
                  value={articleForm.author}
                  onChange={(event) => handleArticleFormChange("author", event.target.value)}
                  required
                />
                <Input
                  placeholder="Category"
                  value={articleForm.category}
                  onChange={(event) => handleArticleFormChange("category", event.target.value)}
                  required
                />
                <Input
                  placeholder="Read time e.g. 8 min"
                  value={articleForm.readTime}
                  onChange={(event) => handleArticleFormChange("readTime", event.target.value)}
                  required
                />
                <div className="md:col-span-2">
                  <textarea
                    value={articleForm.excerpt}
                    onChange={(event) => handleArticleFormChange("excerpt", event.target.value)}
                    placeholder="Short article summary"
                    className="w-full min-h-28 rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                    required
                  />
                </div>
                <Input
                  placeholder="Tags separated by commas"
                  value={articleForm.tags}
                  onChange={(event) => handleArticleFormChange("tags", event.target.value)}
                  required
                />
                <Input
                  placeholder="Article URL"
                  value={articleForm.url}
                  onChange={(event) => handleArticleFormChange("url", event.target.value)}
                  required
                />
                <div className="md:col-span-2">
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-bold text-gray-700 ml-1">Article Image</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="article-image-upload"
                        />
                        <label
                          htmlFor="article-image-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-green-50 hover:border-green-300 transition-all group"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="p-3 bg-green-100 rounded-xl mb-2 group-hover:scale-110 transition-transform">
                              <Video className="w-6 h-6 text-green-600" />
                            </div>
                            <p className="text-xs font-bold text-gray-500">
                              {imageFile ? imageFile.name : "Click to upload article image"}
                            </p>
                          </div>
                        </label>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Input
                          placeholder="OR paste Image URL"
                          value={articleForm.imageUrl}
                          onChange={(event) => handleArticleFormChange("imageUrl", event.target.value)}
                        />
                        {(imageFile || articleForm.imageUrl) && (
                          <div className="h-20 w-full rounded-xl overflow-hidden border border-gray-100">
                            <img
                              src={imageFile ? URL.createObjectURL(imageFile) : articleForm.imageUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end gap-3">
                  {editingArticleId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingArticleId(null);
                        setShowUploadForm(false);
                        setArticleForm({
                          title: "", category: "Technology", author: "Admin", readTime: "5 min",
                          excerpt: "", tags: "", imageUrl: "", url: "",
                        });
                      }}
                      className="rounded-full px-8 py-3 font-bold"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 font-bold shadow-lg shadow-green-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : (editingArticleId ? "Update Article" : "Save Article")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 animate-kb-fade-in">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-gray-900 flex items-center gap-4 mb-2 justify-center md:justify-start">
              <div className="bg-white p-2 rounded-xl shadow-md border border-green-50 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              Knowledge Base
            </h1>
            <p className="text-gray-600 max-w-xl font-medium">
              Comprehensive guides, articles, and resources to help you succeed in farming
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto max-w-lg relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-green-600 transition-colors" />
            <input
              type="text"
              placeholder="Search articles, guides, FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-24 py-4 rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-md outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition-all text-gray-800"
            />
            <Button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2 text-xs font-bold h-auto shadow-md"
              onClick={() => toast.success(`Searching for "${searchQuery}"...`)}
            >
              Search
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 animate-kb-fade-in delay-100">
            {/* Categories */}
            <Card className="kb-glass-card border-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-purple-600" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left group ${selectedCategory === category.name
                        ? "bg-green-600 text-white shadow-lg shadow-green-100"
                        : "hover:bg-green-50 text-gray-700"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform ${selectedCategory === category.name ? "bg-white/20" : "bg-white"
                          }`}>
                          <category.icon className={`w-4 h-4 ${selectedCategory === category.name ? "text-white" : "text-green-600"
                            }`} />
                        </div>
                        <span className={`text-sm font-semibold ${selectedCategory === category.name ? "text-white" : "text-gray-700"
                          }`}>{category.name}</span>
                      </div>
                      <Badge className={`${selectedCategory === category.name
                        ? "bg-white/20 text-white"
                        : "bg-green-100 text-green-700"
                        } border-none px-2 py-0`}>
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="kb-glass-card border-none">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Trending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="outline"
                      className="px-3 py-1 rounded-full cursor-pointer border-green-100 text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="articles" className="space-y-8">
              <TabsList className="flex items-center justify-start gap-3 bg-transparent h-auto p-0 border-none">
                {["articles", "faqs"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-white border border-gray-100 shadow-sm"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Articles Tab */}
              <TabsContent value="articles" className="animate-kb-fade-in delay-200">
                {filteredArticles.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {filteredArticles.map((article) => (
                      <Card
                        key={article.id}
                        className="kb-glass-card border-none overflow-hidden group cursor-pointer flex flex-col h-full"
                        onClick={() => handleArticleClick(article.url)}
                      >
                        {article.displayImage && (
                          <div className="w-full h-56 overflow-hidden relative">
                            <ImageWithFallback
                              src={article.displayImage}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            
                            {isAdmin && (article._id || article.id) && (
                              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button
                                  size="sm"
                                  className="bg-white/90 hover:bg-white text-blue-600 rounded-xl shadow-lg backdrop-blur-sm border-none h-9 px-4 font-bold"
                                  onClick={(e) => handleEditClick(article, e)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-red-500/90 hover:bg-red-500 text-white rounded-xl shadow-lg backdrop-blur-sm border-none h-9 px-4 font-bold"
                                  onClick={(e) => handleDeleteClick(article._id || article.id, e)}
                                >
                                  Delete
                                </Button>
                              </div>
                            )}

                            <div className="absolute top-4 left-4">
                              <Badge className="bg-white/90 backdrop-blur-md text-green-700 border-none font-bold px-3 py-1 shadow-sm">
                                {article.category}
                              </Badge>
                            </div>
                          </div>
                        )}
                        <CardContent className="p-6 flex-1 flex flex-col">
                          <div className="flex gap-2 mb-3">
                            {article.tags.map((tag) => (
                              <span key={tag} className="text-[10px] font-black text-green-400 uppercase tracking-widest">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <h3 className="text-xl font-black text-gray-800 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                            {article.excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                            <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                              <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center">
                                <User className="w-3 h-3 text-green-600" />
                              </div>
                              {article.author}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white/40 rounded-3xl backdrop-blur-sm border-2 border-dashed border-green-100">
                    <Search className="w-12 h-12 text-green-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No articles found</h3>
                    <p className="text-gray-500">Try adjusting your search or category filter</p>
                  </div>
                )}
              </TabsContent>

              {/* FAQs Tab */}
              <TabsContent value="faqs" className="space-y-4 animate-kb-fade-in delay-200">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <Card key={index} className="kb-glass-card border-none hover-scale group">
                      <CardHeader className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-green-100 p-3 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-all">
                            <HelpCircle className="w-6 h-6 text-green-600 group-hover:text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <CardTitle className="text-xl font-bold text-gray-800">{faq.question}</CardTitle>
                              <Badge variant="outline" className="border-green-100 text-green-600 bg-green-50">{faq.category}</Badge>
                            </div>
                            <CardDescription className="text-gray-600 text-base leading-relaxed mt-4">
                              {faq.answer}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white/40 rounded-3xl backdrop-blur-sm border-2 border-dashed border-green-100">
                    <Search className="w-12 h-12 text-green-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No FAQs found</h3>
                    <p className="text-gray-500">Try searching for something else</p>
                  </div>
                )}

                <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 border-none shadow-xl shadow-blue-100 rounded-3xl mt-12 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                  <CardContent className="pt-10 pb-10 text-center relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-3">Can't find your answer?</h3>
                    <p className="text-blue-100 mb-8 max-w-lg mx-auto">
                      Ask our community or submit a question to our experts for personalized help.
                    </p>
                    <Button className="bg-white text-blue-700 hover:bg-blue-50 rounded-full px-8 py-6 text-lg font-bold shadow-lg h-auto">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Ask a Question
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
