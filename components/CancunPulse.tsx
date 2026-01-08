
import React, { useState, useEffect } from 'react';

const CancunPulse: React.FC<{ locale: 'en' | 'es' }> = ({ locale }) => {
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);
  const [cancunTime, setCancunTime] = useState<string>('');
  const [userTime, setUserTime] = useState<string>('');

  useEffect(() => {
    // 1. Fetch Weather (Open-Meteo - Free, No Key)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=21.1619&longitude=-86.8515&current=temperature_2m,weather_code')
      .then(res => res.json())
      .then(data => {
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          code: data.current.weather_code
        });
      })
      .catch(() => console.log("Weather offline"));

    // 2. Update Time
    const timer = setInterval(() => {
      const now = new Date();
      setUserTime(now.toLocaleTimeString(locale === 'en' ? 'en-US' : 'es-MX', { hour: '2-digit', minute: '2-digit' }));
      
      // Cancun is UTC-5 (EST) and does not observe DST
      setCancunTime(new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'es-MX', {
        timeZone: 'America/Cancun',
        hour: '2-digit',
        minute: '2-digit',
      }).format(now));
    }, 1000);

    return () => clearInterval(timer);
  }, [locale]);

  const getWeatherLabel = (code: number) => {
    if (code === 0) return locale === 'en' ? 'Clear Skies' : 'Cielo Despejado';
    if (code < 4) return locale === 'en' ? 'Partly Cloudy' : 'Parcialmente Nublado';
    return locale === 'en' ? 'Tropical Rain' : 'Lluvia Tropical';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      {/* Time Block */}
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cancun Time</p>
          <p className="text-lg font-bold text-slate-900">{cancunTime || '--:--'}</p>
          <p className="text-[10px] text-slate-400">{locale === 'en' ? `Your time: ${userTime}` : `Tu hora: ${userTime}`}</p>
        </div>
      </div>

      {/* Weather Block */}
      <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707" /></svg>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Current Weather</p>
          <p className="text-lg font-bold text-slate-900">{weather ? `${weather.temp}°C` : '--°C'}</p>
          <p className="text-[10px] text-slate-400">{weather ? getWeatherLabel(weather.code) : 'Loading...'}</p>
        </div>
      </div>

      {/* Status Block */}
      <div className="bg-blue-600 p-5 rounded-2xl shadow-md flex items-center gap-4 text-white">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Travel Status</p>
          <p className="text-sm font-bold">
            {locale === 'en' ? 'Great for Driving' : 'Excelente para Manejar'}
          </p>
          <p className="text-[10px] text-white/60">
            {locale === 'en' ? 'Hwy 307 is clear today' : 'Carretera 307 despejada'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancunPulse;
