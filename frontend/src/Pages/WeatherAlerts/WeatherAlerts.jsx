import React, { useState, useEffect } from "react";
import { FaCloudRain, FaWind, FaMapMarkerAlt, FaSearch, FaExclamationTriangle, FaCheckCircle, FaThermometerHalf, FaSun, FaCloudSun, FaTint } from 'react-icons/fa';
import { MdOutlineTimer, MdInfoOutline } from 'react-icons/md';
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/Button";

export default function WeatherAlerts() {
  const [location, setLocation] = useState("Delhi, India");
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "82d592ed404519d25c56eae13af2a8c3";

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();

      setWeatherData({
        location: `${data.name}, ${data.sys.country}`,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        rain: data.rain ? data.rain["1h"] || 0 : 0,
        icon: data.weather[0].icon,
        main: data.weather[0].main
      });
      fetchForecast(city);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      const daily = data.list.filter((_, index) => index % 8 === 0).map(item => ({
        day: new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
        temp: Math.round(item.main.temp),
        condition: item.weather[0].description,
        icon: item.weather[0].icon
      }));
      setForecast(daily);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchWeather(location); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim());
      setSearchInput("");
    }
  };

  const getAdvice = () => {
    if (!weatherData) return "Checking conditions...";
    const main = weatherData.main.toLowerCase();
    if (main.includes("rain")) return "Rain is expected today. Avoid irrigation and keep your harvested crops in a sheltered area.";
    if (weatherData.temp > 35) return "It's very sunny today! Avoid field work during peak afternoon hours and ensure proper moisture for your crops.";
    return "The weather is clear. It's a great day for applying fertilizers or starting your harvest.";
  };

  return (
    <div className="min-h-screen pb-12 pt-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Integrated Title & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-800 flex items-center gap-3">
              <FaCloudSun className="text-blue-500" /> Weather Insights
            </h1>
            <p className="text-slate-500 font-medium mt-1">Real-time climate updates for your village</p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3 w-full md:max-w-md">
            <div className="relative flex-1 group">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 transition-transform group-focus-within:scale-110" />
              <Input
                type="text"
                placeholder="Search village or city..."
                className="pl-12 h-12 rounded-2xl border-slate-200 focus:ring-2 focus:ring-green-100 transition-all bg-white shadow-sm"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Button type="submit" className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center gap-2">
              <FaSearch />
            </Button>
          </form>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-bold animate-pulse">Fetching sky updates...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-100 p-6 rounded-3xl text-center">
            <FaExclamationTriangle size={48} className="mx-auto text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-red-800">Oops! {error}</h3>
            <p className="text-red-600">Please check the location name and try again.</p>
          </div>
        ) : weatherData && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Top Insight Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden relative">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1 rounded-full font-bold mb-4">
                    Today's Farming Tip
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-medium text-slate-600 mb-4 leading-tight">
                    {getAdvice()}
                  </h2>
                  <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 font-medium">
                    <FaMapMarkerAlt /> {weatherData.location}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-[2rem] text-white text-center min-w-[200px] shadow-2xl shadow-blue-200">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                    alt="weather icon"
                    className="w-24 h-24 mx-auto -mt-4"
                  />
                  <div className="text-5xl font-black mb-1">{weatherData.temp}°C</div>
                  <div className="text-sm font-bold opacity-80 uppercase tracking-widest">{weatherData.condition}</div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <FaTint />, label: "Humidity", value: `${weatherData.humidity}%`, color: "text-blue-500", bg: "bg-blue-50" },
                { icon: <FaWind />, label: "Wind", value: `${weatherData.wind} km/h`, color: "text-indigo-500", bg: "bg-indigo-50" },
                { icon: <FaCloudRain />, label: "Rain (1h)", value: `${weatherData.rain} mm`, color: "text-cyan-500", bg: "bg-cyan-50" },
                { icon: <FaThermometerHalf />, label: "Feels Like", value: `${weatherData.temp}°C`, color: "text-orange-500", bg: "bg-orange-50" },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                  <div className={`${item.bg} ${item.color} p-4 rounded-2xl text-2xl`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                    <p className="text-xl font-black text-slate-700">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Forecast Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                <MdOutlineTimer className="text-green-600" /> Weekly Forecast
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {forecast.map((day, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 text-center hover:border-green-300 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1">
                    <p className="text-slate-400 font-bold mb-4">{day.day}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                      alt="forecast icon"
                      className="w-16 h-16 mx-auto group-hover:scale-110 transition-transform"
                    />
                    <p className="text-3xl font-black text-slate-700 my-2">{day.temp}°C</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter truncate px-2">{day.condition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <FaExclamationTriangle /> Severe Alerts
                  </h4>
                  <p className="text-sm opacity-90 mb-4">No major threats expected in the next 48 hours, but keep an eye on weather updates.</p>
                  <Button variant="outline" className="bg-white/20 border-white/40 text-white hover:bg-white/30 rounded-xl">
                    View Live Radar
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> Farm Readiness
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Sowing (Buwai) conditions: <span className="text-green-600 font-bold ml-auto">Optimal</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      Soil Moisture: <span className="text-blue-600 font-bold ml-auto">Moderate</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-6 flex items-center gap-1">
                  <MdInfoOutline /> Updated just now via OpenWeather
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
