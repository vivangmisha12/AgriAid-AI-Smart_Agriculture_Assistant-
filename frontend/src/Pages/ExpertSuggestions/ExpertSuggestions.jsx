import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Lightbulb,
  Sprout,
  Droplets,
  Bug,
  TrendingUp,
  Calendar,
  Leaf,
  Sun,
  MessageSquare,
  Search,
  Share2,
  Languages,
  ArrowRight
} from "lucide-react";
import "./ExpertSuggestions.css";

export default function ExpertSuggestions() {
  const [selectedCrop, setSelectedCrop] = useState("rice");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const crops = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "corn", label: "Corn" },
    { value: "sugarcane", label: "Sugarcane" },
    { value: "cotton", label: "Cotton" },
    { value: "vegetables", label: "Vegetables" },
  ];

  const suggestions = [
    {
      id: 1,
      title: "Optimal Planting Depth",
      category: "Planting",
      description: "Plant rice seeds at 2-3 cm depth for optimal germination. Deeper planting can delay emergence and reduce stand.",
      difficulty: "Easy",
      season: "Kharif",
      icon: Sprout
    },
    {
      id: 2,
      title: "Water Management Strategy",
      category: "Irrigation",
      description: "Maintain 5-10 cm water level during vegetative stage. Drain fields 10 days before harvest to improve grain quality.",
      difficulty: "Medium",
      season: "All",
      icon: Droplets
    },
    {
      id: 3,
      title: "Integrated Pest Management",
      category: "Pest Control",
      description: "Use pheromone traps to monitor and control stem borer populations. Apply neem-based pesticides for organic control.",
      difficulty: "Advanced",
      season: "All",
      icon: Bug
    },
    {
      id: 4,
      title: "Fertilizer Application Schedule",
      category: "Nutrition",
      description: "Apply nitrogen in 3 splits: 50% at planting, 25% at tillering, and 25% at panicle initiation for maximum efficiency.",
      difficulty: "Medium",
      season: "All",
      icon: TrendingUp
    },
    {
      id: 5,
      title: "Crop Rotation Benefits",
      category: "Sustainability",
      description: "Rotate rice with legumes to improve soil nitrogen and break pest cycles. Increase yield by 15-20%.",
      difficulty: "Easy",
      season: "All",
      icon: Calendar
    },
    {
      id: 6,
      title: "Disease Prevention Tactics",
      category: "Disease Management",
      description: "Use certified disease-free seeds. Maintain proper spacing (15x20 cm) for better air circulation to prevent fungal diseases.",
      difficulty: "Easy",
      season: "All",
      icon: Leaf
    },
    {
      id: 7,
      title: "Weed Control Methods",
      category: "Weed Management",
      description: "Apply pre-emergence herbicide within 3 days of planting. Follow up with manual weeding at 30 and 45 days.",
      difficulty: "Medium",
      season: "All",
      icon: Sprout
    },
    {
      id: 8,
      title: "Heat Stress Management",
      category: "Climate",
      description: "During high temperatures (>35°C), increase irrigation frequency and apply mulch to reduce soil temperature.",
      difficulty: "Medium",
      season: "Summer",
      icon: Sun
    },
  ];

  const expertTips = [
    {
      expert: "Dr. Rajesh Kumar",
      role: "Agronomist",
      tip: "Always test your soil before planting season. Knowing NPK levels helps optimize fertilizer use and saves costs.",
      avatar: "RK"
    },
    {
      expert: "Priya Sharma",
      role: "Organic Farming Expert",
      tip: "Incorporate green manure crops during off-season. It naturally enriches soil and reduces chemical fertilizer dependency.",
      avatar: "PS"
    },
    {
      expert: "Dr. Anil Verma",
      role: "Plant Pathologist",
      tip: "Early morning inspection of crops is crucial. Most diseases show symptoms better in morning light and humidity.",
      avatar: "AV"
    },
  ];

  const quickGuides = [
    {
      title: "Seed Selection and Quality Guide",
      description: "Official government guide on choosing certified seeds and varieties.",
      duration: "5 min read",
      category: "Basics",
      link: "https://data.vikaspedia.in/short/lc?k=Zxgr0286rs9XvTxyC4NKug"
    },
    {
      title: "Soil Health Portal and Card ",
      description: "Check your soil health card status and get expert recommendations.",
      duration: "8 min read",
      category: "Soil",
      link: "https://data.vikaspedia.in/short/lc?k=684UzG430CefhHsURRTSXQ"
    },
    {
      title: "Organic Farming Guide",
      description: "Comprehensive step-by-step guide to Jaivik Kheti from Vikaspedia.",
      duration: "10 min read",
      category: "Organic",
      link: "https://data.vikaspedia.in/short/lc?k=VfZnMGEEWJjSlT1QcMkOcg"
    },
    {
      title: "Pradhan Mantri KISAN Samman Nidhi ",
      description: "Know about government benefits and financial assistance schemes.",
      duration: "12 min read",
      category: "Schemes",
      link: "https://data.vikaspedia.in/short/lc?k=8LMdDF3rc83dZQdGiWwvKA"
    },
  ];

  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesSeason = selectedSeason === "all" || suggestion.season === selectedSeason || suggestion.season === "All";
    const matchesSearch = suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeason && matchesSearch;
  });

  const handleShare = async (tip) => {
    const shareText = "Check out this farming tip from AgriAid AI: ";
    const text = `${shareText}\n\n*${tip.title}*\n${tip.description}\n\nShared via AgriAid AI`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: tip.title,
          text: text,
          url: window.location.href
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen hero-gradient py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 animate-fade-in-up">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-gray-900 flex items-center gap-4 mb-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl shadow-sm border border-green-50">
                <Lightbulb className="w-6 h-6 text-green-600" />
              </div>
              Expert Farming Suggestions
            </h1>
            <p className="text-gray-600 max-w-xl font-medium">
              Get personalized farming tips and best practices from agricultural experts
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button className="rounded-full bg-green-600 hover:bg-green-700 shadow-md">
              Ask an Expert
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8 animate-fade-in-up animate-delay-100">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for tips, crops, or techniques..."
              className="w-full pl-10 pr-4 py-4 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all shadow-sm text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="suggestions" className="space-y-8">
          <TabsList className="flex items-center justify-center gap-4 bg-transparent w-full border-none h-auto p-0">
            <TabsTrigger
              value="suggestions"
              className="px-8 py-3 rounded-full text-sm font-bold transition-all data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-white text-gray-600 border border-gray-100 hover:bg-green-50 shadow-sm"
            >
              Suggestions
            </TabsTrigger>
            <TabsTrigger
              value="experts"
              className="px-8 py-3 rounded-full text-sm font-bold transition-all data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-white text-gray-600 border border-gray-100 hover:bg-green-50 shadow-sm"
            >
              Expert Tips
            </TabsTrigger>
            <TabsTrigger
              value="guides"
              className="px-8 py-3 rounded-full text-sm font-bold transition-all data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-white text-gray-600 border border-gray-100 hover:bg-green-50 shadow-sm"
            >
              Quick Guides
            </TabsTrigger>
          </TabsList>

          {/* Suggestions Tab */}
          <TabsContent value="suggestions" className="space-y-6 animate-fade-in-up animate-delay-200">
            <div className="flex flex-col md:flex-row items-end justify-between mb-2 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Personalized Suggestions</h3>
                <p className="text-gray-500">AI-powered recommendations based on your crop profile</p>
              </div>
              <Button 
                variant="link" 
                className="text-green-600 font-bold p-0"
                onClick={() => window.open("https://icar.org.in/content/package-practices", "_blank")}
              >
                View All Suggestions
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="glass-card hover-scale overflow-hidden border-none group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-colors">
                            <suggestion.icon className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-bold text-gray-800 mb-2">{suggestion.title}</CardTitle>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" className="bg-white/50 text-green-700 hover:bg-white/80">
                                {suggestion.category}
                              </Badge>
                              <Badge className={`border-none ${getDifficultyColor(suggestion.difficulty)}`}>
                                {suggestion.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-green-600 rounded-full"
                          onClick={() => handleShare(suggestion)}
                        >
                          <Share2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed mb-4">{suggestion.description}</p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100/50">
                        {suggestion.season !== "All" && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 text-green-500" />
                            Best for {suggestion.season}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white/30 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-500">No suggestions found for your search</h3>
                  <Button variant="link" onClick={() => setSearchQuery("")} className="text-green-600">
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Expert Tips Tab */}
          <TabsContent value="experts" className="space-y-6 animate-fade-in-up animate-delay-200">
            <div className="grid gap-6">
              {expertTips.map((expert, index) => (
                <Card key={index} className="glass-card border-none hover-scale group">
                  <CardContent className="pt-8">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-green-200">
                        {expert.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="mb-4 flex items-center gap-2">
                          <h3 className="text-xl font-bold text-gray-800">{expert.expert}</h3>
                          <Badge className="bg-green-100 text-green-700 border-none text-[10px] py-0.5 px-2 rounded-full">VERIFIED</Badge>
                        </div>
                        <div className="relative bg-white/40 p-5 rounded-2xl border border-white/50 shadow-inner">
                          <p className="text-gray-700 italic text-lg leading-relaxed">"{expert.tip}"</p>
                          <MessageSquare className="absolute -top-3 -right-3 w-8 h-8 text-green-100 fill-green-100 group-hover:text-green-200 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-10 text-center text-white shadow-xl shadow-green-100 mt-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Have a Specific Question?</h3>
                <p className="text-green-100 mb-8 max-w-lg mx-auto text-lg">
                  Connect with our agricultural experts for personalized advice
                </p>
                <Button className="bg-white text-green-700 hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-bold shadow-lg h-auto">
                  Ask an Expert
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Quick Guides Tab */}
          <TabsContent value="guides" className="space-y-12 animate-fade-in-up animate-delay-200">
            <div className="flex flex-col md:flex-row items-end justify-between mb-2 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Quick Resource Guides</h3>
                <p className="text-gray-500">Step-by-step official manuals for farmers</p>
              </div>
              <Button
                variant="link"
                className="text-green-600 font-bold p-0"
                onClick={() => window.open("https://agriculture.vikaspedia.in/viewcontent/agriculture?lgn=en", "_blank")}
              >
                View Full Guide
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickGuides.map((guide, index) => (
                <Card
                  key={index}
                  className="glass-card border-none hover-scale cursor-pointer group flex flex-col"
                  onClick={() => window.open(guide.link, "_blank")}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-green-100 text-green-700 border-none">{guide.category}</Badge>
                      <span className="text-xs font-medium text-gray-400">{guide.duration}</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2">
                      {guide.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <p className="text-gray-500 text-sm mb-6 line-clamp-3">{guide.description}</p>
                    <div className="flex items-center text-xs font-bold text-green-600 group-hover:translate-x-1 transition-transform">
                      Read Official Guide <ArrowRight className="ml-1 w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="glass-card rounded-3xl p-8 border-none">
              <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Video Tutorials</h3>
                  <p className="text-gray-500">Visual guides for common farming practices</p>
                </div>
                <Button
                  variant="link"
                  className="text-green-600 font-bold p-0"
                  onClick={() => window.open("https://www.youtube.com/@DDKisan", "_blank")}
                >
                  View All Videos
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Mushroom Farming Guide", duration: "12:30", id: "cUaRrO62VVg", category: "High Profit" },
                  { title: "Jaivik Kheti (Organic)", duration: "08:15", id: "i-LyJnjMA2Q", category: "Soil Health" },
                  { title: "Modern Irrigation", duration: "15:45", id: "bw6zfN21ivE", category: "Water Save" }
                ].map((video, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank")}
                  >
                    <div className="aspect-video rounded-2xl bg-slate-100 relative overflow-hidden flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all border border-slate-200">
                      {/* Thumbnail Image */}
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                      <div className="relative z-10 w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/40">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1 shadow-sm"></div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md font-bold">
                        {video.duration}
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-600/90 text-white border-none text-[10px]">{video.category}</Badge>
                      </div>
                    </div>
                    <h4 className="text-gray-800 font-bold group-hover:text-green-600 transition-colors line-clamp-1">{video.title}</h4>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-bold">DD Kisan Official</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
