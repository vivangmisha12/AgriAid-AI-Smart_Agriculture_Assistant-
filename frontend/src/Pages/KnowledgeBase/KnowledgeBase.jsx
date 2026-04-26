import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/Button";
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
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
    {
      id: 1,
      title: "IFFCO Nano Urea: The Future of Efficient Fertilization",
      category: "Innovation",
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
      category: "Crop Management",
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
  ];

  const handleArticleClick = (url) => {
    if (url) window.open(url, '_blank');
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
    { name: "Organic Farming", count: 45, icon: BookOpen },
    { name: "Pest Management", count: 32, icon: BookOpen },
    { name: "Water Management", count: 28, icon: BookOpen },
    { name: "Soil Health", count: 38, icon: BookOpen },
    { name: "Climate", count: 22, icon: BookOpen },
  ];

  const trendingTopics = [
    "Organic Certification",
    "Drip Irrigation",
    "Integrated Pest Management",
    "Soil Testing",
    "Climate Adaptation",
    "Crop Insurance"
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen kb-hero-gradient py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 animate-kb-fade-in">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-gray-900 flex items-center gap-4 mb-2 justify-center md:justify-start">
              <div className="bg-white p-2 rounded-xl shadow-md border border-purple-50 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              Knowledge Base
            </h1>
            <p className="text-gray-600 max-w-xl font-medium">
              Comprehensive guides, articles, and resources to help you succeed in farming
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto max-w-md relative search-glow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles, guides, FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-md outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all"
            />
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
                      className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-purple-50 rounded-xl transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                          <category.icon className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{category.name}</span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700 border-none px-2 py-0">
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
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Trending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="outline"
                      className="px-3 py-1 rounded-full cursor-pointer border-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all shadow-sm"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-none shadow-xl shadow-purple-100 rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-xl font-bold text-white">Quick Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                {[
                  { icon: FileText, text: "Download PDFs" },
                  { icon: MessageCircle, text: "Community Forum" }
                ].map((link, i) => (
                  <Button key={i} variant="ghost" className="w-full justify-start text-purple-50 hover:text-white hover:bg-white/10 rounded-xl py-6 border border-white/10">
                    <link.icon className="w-5 h-5 mr-3" />
                    <span className="font-bold">{link.text}</span>
                  </Button>
                ))}
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
                    className="px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-white border border-gray-100 shadow-sm"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Articles Tab */}
              <TabsContent value="articles" className="grid md:grid-cols-2 gap-8 animate-kb-fade-in delay-200">
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
                          <Badge className="bg-white/90 backdrop-blur-md text-purple-700 border-none font-bold px-3 py-1 shadow-sm">
                            {article.category}
                          </Badge>
                        </div>
                      </div>
                    )}
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex gap-2 mb-3">
                        {article.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-black text-purple-400 uppercase tracking-widest">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-xl font-black text-gray-800 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                          <div className="w-6 h-6 bg-purple-50 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-purple-600" />
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
              </TabsContent>

              {/* FAQs Tab */}
              <TabsContent value="faqs" className="space-y-4 animate-kb-fade-in delay-200">
                {faqs.map((faq, index) => (
                  <Card key={index} className="kb-glass-card border-none hover-scale group">
                    <CardHeader className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-100 p-3 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-all">
                          <HelpCircle className="w-6 h-6 text-purple-600 group-hover:text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <CardTitle className="text-xl font-bold text-gray-800">{faq.question}</CardTitle>
                            <Badge variant="outline" className="border-purple-100 text-purple-600 bg-purple-50">{faq.category}</Badge>
                          </div>
                          <CardDescription className="text-gray-600 text-base leading-relaxed mt-4">
                            {faq.answer}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}

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
