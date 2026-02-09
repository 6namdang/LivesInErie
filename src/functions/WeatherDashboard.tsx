import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Interfaces ---
interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  uv_index: number;
}

interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
}

interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
}

interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}

export const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [unit, setUnit] = useState<'fahrenheit' | 'celsius'>('fahrenheit');

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=42.1292&longitude=-80.0851&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=${unit}&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&forecast_days=10`
      );
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  }, [unit]);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 1800000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const chartData = useMemo(() => {
    if (!weatherData) return [];
    return weatherData.hourly.time.slice(0, 24).map((time, i) => ({
      time: new Date(time).toLocaleTimeString([], { hour: 'numeric' }),
      temp: Math.round(weatherData.hourly.temperature_2m[i]),
    }));
  }, [weatherData]);

  const getWeatherIcon = (code: number, isDay: boolean = true) => {
    if (code === 0 || code === 1) return isDay ? '☀️' : '🌙';
    if (code === 2 || code === 3) return '⛅';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    return '☁️';
  };

  if (loading && !weatherData) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center text-white animate-pulse">
        Updating Feed...
      </div>
    );
  }

  const { current, daily } = weatherData!;
  const isDaytime = currentTime >= new Date(daily.sunrise[0]) && currentTime <= new Date(daily.sunset[0]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419] p-4 md:p-8 font-sans text-white">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header with Unit Toggle and Refresh */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-light">Erie, PA</h1>
            <p className="text-gray-400 text-sm">Real-time update: {currentTime.toLocaleTimeString()}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex">
              <button 
                onClick={() => setUnit('fahrenheit')}
                className={`px-4 py-1.5 rounded-lg text-sm transition-all ${unit === 'fahrenheit' ? 'bg-blue-600 shadow-lg' : 'hover:bg-white/5'}`}
              >°F</button>
              <button 
                onClick={() => setUnit('celsius')}
                className={`px-4 py-1.5 rounded-lg text-sm transition-all ${unit === 'celsius' ? 'bg-blue-600 shadow-lg' : 'hover:bg-white/5'}`}
              >°C</button>
            </div>
            <button 
              onClick={fetchWeather}
              disabled={loading}
              className="p-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 active:scale-95 transition-all disabled:opacity-50"
              title="Refresh Data"
            >
              <span className={loading ? 'animate-spin inline-block' : ''}>🔄</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Hero Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#2a2a3e]/80 to-[#1f1f30]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col justify-between min-h-[400px]">
            <div>
              <p className="text-gray-400 uppercase tracking-widest text-xs mb-2">Currently</p>
              <div className="flex items-center gap-6">
                <span className="text-8xl">{getWeatherIcon(current.weather_code, isDaytime)}</span>
                <div>
                  <h2 className="text-7xl font-thin tracking-tighter">
                    {Math.round(current.temperature_2m)}°
                  </h2>
                  <p className="text-blue-400 text-sm font-medium animate-pulse">● LIVE</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xl font-medium mb-1">Feels like {Math.round(current.apparent_temperature)}°</p>
              <p className="text-gray-400">Low {Math.round(daily.temperature_2m_min[0])}° • High {Math.round(daily.temperature_2m_max[0])}°</p>
            </div>
          </div>

          {/* Highlights (View Only) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <HighlightCard label="Wind Speed" value={`${current.wind_speed_10m} mph`} icon="💨" />
            <HighlightCard label="Humidity" value={`${current.relative_humidity_2m}%`} icon="💧" />
            <HighlightCard label="UV Index" value={current.uv_index.toFixed(1)} icon="☀️" />
            <HighlightCard label="Sunrise" value={new Date(daily.sunrise[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} icon="🌅" />
          </div>

          {/* Temperature Chart (Live Trend) */}
          <div className="lg:col-span-12 bg-white/5 rounded-3xl p-8 border border-white/10">
            <h3 className="text-lg font-light mb-6 text-gray-400">24-Hour Temperature Trend</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{backgroundColor: '#1a1a2e', border: 'none', borderRadius: '12px', fontSize: '12px'}} />
                  <Area type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} fill="url(#colorTemp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 10-Day Forecast (View Only) */}
          <div className="lg:col-span-12 overflow-x-auto pb-4">
            <div className="flex gap-4">
              {daily.time.map((date, i) => (
                <div key={i} className="min-w-[120px] bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                  <p className="text-gray-400 text-xs font-medium uppercase mb-2">
                    {i === 0 ? 'Today' : new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <span className="text-3xl block mb-2">{getWeatherIcon(daily.weather_code[i])}</span>
                  <p className="text-xl font-light">{Math.round(daily.temperature_2m_max[i])}°</p>
                  <p className="text-gray-500 text-sm">{Math.round(daily.temperature_2m_min[i])}°</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const HighlightCard = ({ label, value, icon }: { label: string, value: string, icon: string }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
    <span className="text-2xl mb-2 block">{icon}</span>
    <p className="text-gray-400 text-xs uppercase mb-1">{label}</p>
    <p className="text-2xl font-light">{value}</p>
  </div>
);

export default WeatherDashboard;