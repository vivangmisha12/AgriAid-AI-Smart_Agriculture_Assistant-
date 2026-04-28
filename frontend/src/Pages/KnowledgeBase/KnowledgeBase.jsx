import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/Button";
import { toast } from "react-hot-toast";
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
  LayoutGrid
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import "./KnowledgeBase.css";

export default function KnowledgeBase() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
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
      image: "img_1.avif",
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
      image: "/public/img_2.webp",
      url: "https://krishijagran.com/agriculture-world/government-offers-100-subsidy-for-purchase-of-drones/"
    },
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
      image: "/public/img_3.jpg",
      url: "https://krishijagran.com/featured/shree-anna-millets-to-bring-prosperity-to-farmers-and-people/"
    },
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
      image: "/public/img_4.webp",
      url: "https://krishijagran.com/featured/shree-anna-millets-to-bring-prosperity-to-farmers-and-people/"
    },

    // Organic Farming (10 Articles)
    {
      id: 101,
      title: "Vermicompost Preparation: A Step-by-Step Guide",
      category: "Organic Farming",
      author: "Priya Sharma",
      date: "Feb 01, 2026",
      readTime: "8 min",
      excerpt: "Learn how to turn farm waste into 'Black Gold' using earthworms. Perfect for small scale organic farmers.",
      tags: ["Organic", "Compost", "WasteManagement"],
      image: "/assets/ag5.png",
      url: "https://krishijagran.com/news/how-to-make-vermicompost/"
    },
    {
      id: 102,
      title: "Natural Pest Control: The Power of Neem Oil",
      category: "Organic Farming",
      author: "Dr. Anil Verma",
      date: "Feb 05, 2026",
      readTime: "6 min",
      excerpt: "Neem oil is a versatile organic pesticide. Discover the correct mixing ratios for different crops.",
      tags: ["Neem", "PestControl", "Natural"],
      image: "/assets/ag6.png",
      url: "https://krishijagran.com/blog/zytonic-neem-a-natural-and-sustainable-solution-for-pest-control-in-crops/"
    },
    {
      id: 103,
      title: "Green Manuring: Enriching Soil Naturally",
      category: "Organic Farming",
      author: "Rajesh Kumar",
      date: "Jan 20, 2026",
      readTime: "12 min",
      excerpt: "Using crops like Dhaincha to restore soil nitrogen without chemical fertilizers.",
      tags: ["GreenManure", "SoilHealth", "Organic"],
      image: "src/assets/ag7.png",
      url: "https://krishijagran.com/agriculture-world/earthworms-can-enrich-soil-far-more-quickly-than-previously-imagined/"
    },
    { id: 104, title: "Bio-Fertilizers vs Chemical: Why Organic Wins", category: "Organic Farming", author: "Dr. S. Singh", readTime: "15 min", excerpt: "A detailed scientific comparison of long-term soil productivity.", tags: ["Science", "Organic"] },
    { id: 105, title: "Traditional Indian Farming Wisdom", category: "Organic Farming", author: "Vedic Agri", readTime: "20 min", excerpt: "Reviving ancient techniques for modern sustainable yields.", tags: ["History", "Tradition"] },
    { id: 106, title: "Seed Treatment with Beejamrit", category: "Organic Farming", author: "ZBNF Expert", readTime: "5 min", excerpt: "Protect your seeds from soil-borne diseases naturally.", tags: ["Seeds", "ZBNF"] },
    { id: 107, title: "Kitchen Gardening for Beginners", category: "Organic Farming", author: "HomeGrow", readTime: "10 min", excerpt: "Grow organic vegetables in your backyard with minimal cost.", tags: ["Gardening", "Beginner"] },
    { id: 108, title: "Organic Certification Process in India", category: "Organic Farming", author: "NPOP", readTime: "25 min", excerpt: "Step-by-step guide to getting your farm certified for export.", tags: ["Legal", "Export"] },
    { id: 109, title: "Companion Planting: Natural Synergy", category: "Organic Farming", author: "EcoFarmer", readTime: "8 min", excerpt: "Which crops to grow together to repel pests naturally.", tags: ["Synergy", "Nature"] },
    { id: 110, title: "The Role of Microbes in Organic Soil", category: "Organic Farming", author: "BioLab", readTime: "14 min", excerpt: "Understanding the invisible workforce in your fields.", tags: ["Microbes", "Soil"] },

    // Pest Management (10 Articles)
    {
      id: 201,
      title: "Pheromone Traps: Smart Pest Monitoring",
      category: "Pest Management",
      author: "AgriScientist",
      date: "Jan 15, 2026",
      readTime: "9 min",
      excerpt: "Track and trap pests like Stem Borer without spraying chemicals.",
      tags: ["Traps", "IPM", "Pest"],
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800"
    },
    { id: 202, title: "Identifying Common Rice Pests", category: "Pest Management", author: "CropDoc", readTime: "11 min", excerpt: "Visual guide to BPH, Stem Borer, and Leaf Folder.", tags: ["Rice", "Pests"] },
    { id: 203, title: "Integrated Pest Management (IPM) Basics", category: "Pest Management", author: "GovtAgri", readTime: "18 min", excerpt: "Combining biological, mechanical, and chemical methods.", tags: ["IPM", "Guide"] },
    { id: 204, title: "Biological Control: Ladybugs and Lacewings", category: "Pest Management", author: "NatureGuard", readTime: "7 min", excerpt: "How beneficial insects protect your crops.", tags: ["Insects", "Nature"] },
    { id: 205, title: "Safe Pesticide Application Rules", category: "Pest Management", author: "SafetyFirst", readTime: "10 min", excerpt: "Dos and don'ts for handling toxic chemicals.", tags: ["Safety", "Chemicals"] },
    { id: 206, title: "Fungal Disease Control in Wheat", category: "Pest Management", author: "WheatWatch", readTime: "13 min", excerpt: "Managing Rust and Smut diseases effectively.", tags: ["Wheat", "Disease"] },
    { id: 207, title: "Understanding Insect Life Cycles", category: "Pest Management", author: "BioStudy", readTime: "15 min", excerpt: "Why timing is crucial for effective pest control.", tags: ["Education", "Insects"] },
    { id: 208, title: "Trap Crops: Distracting the Enemy", category: "Pest Management", author: "BorderGuard", readTime: "6 min", excerpt: "Using marigold and other crops to protect your main harvest.", tags: ["Strategy", "Plants"] },
    { id: 209, title: "Light Traps for Nocturnal Pests", category: "Pest Management", author: "NightWatch", readTime: "8 min", excerpt: "Simple tech to reduce moth populations at night.", tags: ["Tech", "Moths"] },
    { id: 210, title: "Managing Locust Swarms", category: "Pest Management", author: "GlobalAlert", readTime: "20 min", excerpt: "Coordinated efforts to fight the devastating desert locust.", tags: ["Locust", "Emergency"] },

    // Water Management (10 Articles)
    {
      id: 301,
      title: "Cost-Effective Drip Irrigation Setup",
      category: "Water Management",
      author: "WaterWise",
      date: "Feb 12, 2026",
      readTime: "16 min",
      excerpt: "Save 70% water while increasing yield for small orchards.",
      tags: ["Irrigation", "Savings", "Drip"],
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=800"
    },
    { id: 302, title: "Rainwater Harvesting on the Farm", category: "Water Management", author: "EcoEngineer", readTime: "22 min", excerpt: "Building farm ponds and recharge wells.", tags: ["Rainwater", "Storage"] },
    { id: 303, title: "Sprinkler vs Drip: Which is better?", category: "Water Management", author: "AgriCompare", readTime: "10 min", excerpt: "Selecting the right irrigation method for your terrain.", tags: ["Tech", "Comparison"] },
    { id: 304, title: "Mulching for Moisture Retention", category: "Water Management", author: "SoilExpert", readTime: "7 min", excerpt: "Reducing evaporation loss by 40%.", tags: ["Mulch", "Evaporation"] },
    { id: 305, title: "Soil Moisture Testing Tools", category: "Water Management", author: "DigitalFarmer", readTime: "12 min", excerpt: "Low-cost sensors to know when to water.", tags: ["IoT", "Sensors"] },
    { id: 306, title: "Watering Schedules for Vegetables", category: "Water Management", author: "VeggiePro", readTime: "5 min", excerpt: "Morning vs Evening: Best times for different plants.", tags: ["Schedules", "Veg"] },
    { id: 307, title: "Drought Resistant Crop Varieties", category: "Water Management", author: "ClimateRes", readTime: "15 min", excerpt: "Seeds that survive with minimal irrigation.", tags: ["Seeds", "Drought"] },
    { id: 308, title: "Watershed Management Basics", category: "Water Management", author: "CommAgri", readTime: "18 min", excerpt: "Community efforts to save water for everyone.", tags: ["Community", "Watershed"] },
    { id: 309, title: "Laser Land Leveling Benefits", category: "Water Management", author: "ModernFarmer", readTime: "9 min", excerpt: "Ensuring uniform water distribution across the field.", tags: ["Tech", "Leveling"] },
    { id: 310, title: "Cleaning Irrigation Canals", category: "Water Management", author: "Maintenance", readTime: "6 min", excerpt: "Reducing water loss due to seepage and weeds.", tags: ["Canals", "Seepage"] },

    // Soil Health (10 Articles)
    {
      id: 401,
      title: "Understanding Soil pH for Beginners",
      category: "Soil Health",
      author: "SoilScientist",
      date: "Jan 30, 2026",
      readTime: "10 min",
      excerpt: "How acidity or alkalinity affects nutrient absorption.",
      tags: ["pH", "Basics", "Soil"],
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800"
    },
    { id: 402, title: "NPK Balance: The Core of Fertilization", category: "Soil Health", author: "ChemFree", readTime: "14 min", excerpt: "Reading soil test reports and applying right nutrients.", tags: ["Nutrients", "Fertility"] },
    { id: 403, title: "The Role of Earthworms in Soil", category: "Soil Health", author: "NatureLover", readTime: "8 min", excerpt: "Natural tillers that improve soil structure.", tags: ["Earthworms", "Nature"] },
    { id: 404, title: "Soil Erosion Control Techniques", category: "Soil Health", author: "LandCare", readTime: "20 min", excerpt: "Preventing topsoil loss during heavy rains.", tags: ["Erosion", "Prevention"] },
    { id: 405, title: "Cover Crops: Protecting the Ground", category: "Soil Health", author: "EcoAgri", readTime: "11 min", excerpt: "Growing crops specifically to feed and protect the soil.", tags: ["CoverCrops", "Health"] },
    { id: 406, title: "Managing Soil Salinity", category: "Soil Health", author: "SalineFix", readTime: "15 min", excerpt: "Reclaiming land affected by salt accumulation.", tags: ["Salinity", "Reclamation"] },
    { id: 407, title: "Importance of Soil Organic Carbon", category: "Soil Health", author: "CarbonLab", readTime: "13 min", excerpt: "The hidden metric that determines long-term fertility.", tags: ["Carbon", "Organic"] },
    { id: 408, title: "Micronutrients: Small but Mighty", category: "Soil Health", author: "ZincWatch", readTime: "9 min", excerpt: "Why Boron, Zinc, and Iron are essential for yield.", tags: ["Micronutrients", "Yield"] },
    { id: 409, title: "Deep Plowing Pros and Cons", category: "Soil Health", author: "TillageInfo", readTime: "7 min", excerpt: "When to break the hardpan and when to avoid it.", tags: ["Tillage", "Hardpan"] },
    { id: 410, title: "Visiting a Soil Testing Lab", category: "Soil Health", author: "GuideDoc", readTime: "6 min", excerpt: "What happens to your soil sample inside the lab.", tags: ["Testing", "Lab"] },

    // Climate (10 Articles)
    {
      id: 501,
      title: "Predicting Monsoons: Tech for Farmers",
      category: "Climate",
      author: "WeatherWatch",
      date: "Feb 08, 2026",
      readTime: "11 min",
      excerpt: "Using satellite data and apps to plan your sowing season.",
      tags: ["Monsoon", "Weather", "App"],
      image: "https://images.unsplash.com/photo-1530908295418-a12e326966ba?auto=format&fit=crop&q=80&w=800"
    },
    { id: 502, title: "Protecting Crops from Heatwaves", category: "Climate", author: "Summertime", readTime: "9 min", excerpt: "Immediate steps to save thirsty plants during extreme heat.", tags: ["Heatwave", "Summer"] },
    { id: 503, title: "Frost Management in Winter Crops", category: "Climate", author: "ColdGuard", readTime: "10 min", excerpt: "Using irrigation and smoke to prevent frost damage.", tags: ["Winter", "Frost"] },
    { id: 504, title: "Climate-Resilient Rice Varieties", category: "Climate", author: "RiceRes", readTime: "14 min", excerpt: "Seeds that survive floods and drought alike.", tags: ["Rice", "Resilience"] },
    { id: 505, title: "Greenhouse Farming Benefits", category: "Climate", author: "GlassGrow", readTime: "18 min", excerpt: "Controlling the environment for high-value exotic crops.", tags: ["Greenhouse", "Tech"] },
    { id: 506, title: "Adapting to Changing Rainfall Patterns", category: "Climate", author: "RainSense", readTime: "15 min", excerpt: "Shifting sowing dates to match current climate shifts.", tags: ["Rainfall", "Adaptation"] },
    { id: 507, title: "Carbon Footprint of Your Farm", category: "Climate", author: "EcoSmart", readTime: "12 min", excerpt: "Reducing methane and nitrous oxide emissions.", tags: ["Carbon", "Emission"] },
    { id: 508, title: "Renewable Energy in Agriculture", category: "Climate", author: "SolarAgri", readTime: "20 min", excerpt: "Using solar pumps and wind energy to power farms.", tags: ["Solar", "Energy"] },
    { id: 509, title: "Predicting Pest Outbreaks using Climate Data", category: "Climate", author: "BioAI", readTime: "16 min", excerpt: "How humidity and temp determine pest pressure.", tags: ["AI", "PestForecast"] },
    { id: 510, title: "Global Warming Impacts on Wheat Yield", category: "Climate", author: "AgriFuture", readTime: "22 min", excerpt: "The long-term threat to our food security and how to fight it.", tags: ["Wheat", "GlobalWarming"] },
  ];

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

  const categories = [
    { name: "All Articles", count: articles.length, icon: BookOpen },
    { name: "Organic Farming", count: articles.filter(a => a.category === "Organic Farming").length, icon: BookOpen },
    { name: "Pest Management", count: articles.filter(a => a.category === "Pest Management").length, icon: BookOpen },
    { name: "Water Management", count: articles.filter(a => a.category === "Water Management").length, icon: BookOpen },
    { name: "Soil Health", count: articles.filter(a => a.category === "Soil Health").length, icon: BookOpen },
    { name: "Climate", count: articles.filter(a => a.category === "Climate").length, icon: BookOpen },
  ];

  const trendingTopics = [
    "Organic Certification",
    "Drip Irrigation",
    "Integrated Pest Management",
    "Soil Testing",
    "Climate Adaptation",
    "Crop Insurance"
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All Articles" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen kb-hero-gradient py-12">
      <div className="container mx-auto px-4 max-w-7xl">
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
                        {article.image && (
                          <div className="w-full h-56 overflow-hidden relative">
                            <ImageWithFallback
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
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
