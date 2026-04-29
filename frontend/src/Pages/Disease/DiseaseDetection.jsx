import React, { useState } from 'react';
import axios from 'axios';
import { FaLeaf, FaCamera, FaUpload, FaSpinner, FaExclamationCircle, FaSun, FaSearch, FaHandPaper, FaVectorSquare, FaCheckCircle } from 'react-icons/fa';
import { MdInfoOutline, MdHistory } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import API_URL from "../../api";

const DiseaseDetection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [lang, setLang] = useState('Hindi');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
            setError(null);
        }
    };

    const handleDetect = async () => {
        if (!selectedImage) return;
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('lang', lang);

        try {
            const response = await axios.post(`${API_URL}/api/detect`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResult(response.data);
        } catch (err) {
            setError("AI model could not process the image. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-12 pt-8 bg-[#fffdf5]">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Integrated Title & Toggle */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 flex items-center gap-4">
                            <div className="bg-white p-2 rounded-xl shadow-md border border-slate-100 flex items-center justify-center">
                                <FaLeaf className="text-green-600 w-8 h-8" />
                            </div>
                            Disease Detection
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">Check for Disease in your crop</p>
                    </div>

                    <div className="flex bg-slate-200/50 p-1.5 rounded-2xl backdrop-blur-sm">
                        <button
                            onClick={() => setLang('Hindi')}
                            className={`px-8 py-2.5 rounded-xl font-bold transition-all ${lang === 'Hindi' ? 'bg-white text-green-700 shadow-lg' : 'text-slate-500'}`}
                        >हिन्दी</button>
                        <button
                            onClick={() => setLang('English')}
                            className={`px-8 py-2.5 rounded-xl font-bold transition-all ${lang === 'English' ? 'bg-white text-green-700 shadow-lg' : 'text-slate-500'}`}
                        >English</button>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Analysis Area */}
                    <div className="flex-1 space-y-8">
                        {/* Upload Card */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 p-8">
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] p-10 bg-slate-50/50 hover:bg-green-50/30 transition-all group relative overflow-hidden">
                                {preview ? (
                                    <div className="relative w-full max-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                        <img src={preview} alt="Preview" className="w-full object-cover" />
                                        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-green-50">
                                            <FaCamera size={32} className="text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-700 mb-2">Identify Any Crop Issue</h3>
                                        <p className="text-slate-400 font-medium">Take a clear photo of the leaf or affected area</p>
                                    </div>
                                )}

                                <div className="flex flex-wrap justify-center gap-4 mt-8 w-full relative z-10">
                                    <label className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold cursor-pointer flex items-center gap-3 hover:bg-slate-900 transition-all shadow-xl shadow-slate-200 hover:-translate-y-1">
                                        <FaUpload size={20} /> {preview ? "Change Image" : "Select Photo"}
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </label>

                                    {preview && !loading && (
                                        <Button
                                            onClick={handleDetect}
                                            className="bg-green-600 text-white px-12 py-7 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-xl shadow-green-100 hover:-translate-y-1 text-lg"
                                        >
                                            Detect & Analyse
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {loading && (
                                <div className="mt-12 flex flex-col items-center text-slate-700 p-12 bg-slate-50/50 rounded-[2rem] border border-slate-100 animate-pulse">
                                    <FaSpinner className="animate-spin mb-6 text-green-600" size={56} />
                                    <h4 className="text-xl font-black mb-2 text-slate-800">Processing Biology...</h4>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Scanning markers via Neural Engine</p>
                                </div>
                            )}

                            {result && (
                                <div className="mt-12 space-y-6 animate-in zoom-in-95 duration-500">
                                    <div className="flex items-center gap-4 px-2">
                                        <Badge className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-lg shadow-green-100">
                                            Diagnosis Ready
                                        </Badge>
                                        <div className="h-px flex-1 bg-slate-100" />
                                    </div>

                                    <div className="bg-white p-10 border border-slate-100 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                                        <div className="text-slate-800 leading-relaxed result-markdown prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-p:text-slate-600 prose-p:font-medium prose-strong:text-green-700 prose-li:text-slate-600">
                                            <ReactMarkdown>{result.remedy}</ReactMarkdown>
                                        </div>

                                        <div className="mt-12 p-6 bg-orange-50/50 border border-orange-100 rounded-3xl flex items-start gap-4">
                                            <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
                                                <FaExclamationCircle size={24} />
                                            </div>
                                            <div>
                                                <p className="font-black text-orange-900 text-sm mb-1 uppercase tracking-wider">Expert Advisory</p>
                                                <p className="text-xs text-orange-700 font-medium leading-relaxed">AI results are visual indicators. For high-value crops, please cross-verify with a field expert before applying chemical treatments.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="mt-8 p-8 bg-red-50 text-red-700 rounded-[2rem] flex flex-col items-center gap-4 border border-red-100 text-center">
                                    <FaExclamationCircle size={48} className="text-red-400" />
                                    <p className="font-black text-xl">{error}</p>
                                    <Button variant="outline" onClick={() => setError(null)} className="rounded-xl border-red-200 text-red-600 hover:bg-red-100">Try Again</Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:w-80 space-y-6">
                        {/* Guide Card */}
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200 p-8 border border-slate-100">
                            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                <FaCamera className="text-green-600" /> Pro Scanning
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    { icon: <FaSun />, text: "Direct Sunlight", color: "text-orange-500", bg: "bg-orange-50" },
                                    { icon: <FaSearch />, text: "Center Focus", color: "text-blue-500", bg: "bg-blue-50" },
                                    { icon: <FaHandPaper />, text: "No Blurry Photos", color: "text-red-500", bg: "bg-red-50" },
                                    { icon: <FaVectorSquare />, text: "Single Leaf View", color: "text-indigo-500", bg: "bg-indigo-50" }
                                ].map((tip, i) => (
                                    <li key={i} className="flex items-center gap-4 group">
                                        <div className={`${tip.bg} ${tip.color} p-3 rounded-2xl text-xl transition-transform group-hover:scale-110`}>
                                            {tip.icon}
                                        </div>
                                        <span className="text-sm font-bold text-slate-600">{tip.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Supported Crops Card */}
                        <div className="bg-slate-900 rounded-[2rem] shadow-xl p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <MdInfoOutline className="text-green-400" size={24} /> Crops Base
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Tomato", "Potato", "Rice", "Wheat", "Apple", "Corn", "Cotton"].map((crop, i) => (
                                        <span key={i} className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/5 backdrop-blur-md">
                                            {crop}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* History/Help Card */}
                        <div className="bg-green-600 rounded-[2rem] shadow-xl p-8 text-white group hover:bg-green-700 transition-colors cursor-pointer">
                            <h4 className="text-lg font-black mb-2 flex items-center gap-2">
                                <MdHistory /> Consultation
                            </h4>
                            <p className="text-sm opacity-80 font-medium leading-relaxed mb-6">Need an expert to review this report manually?</p>
                            <Button className="w-full bg-white text-green-700 font-black rounded-xl hover:bg-slate-50 border-none">
                                Request Review
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DiseaseDetection;
