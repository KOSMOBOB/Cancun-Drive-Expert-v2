
import React from 'react';

const HeroImage: React.FC = () => {
  // Используем высококачественное тематическое фото, которое не требует генерации при каждом входе
  // Если пользователь уже сгенерировал "идеальное" фото, оно подтянется из кэша
  const cachedImage = localStorage.getItem('cancun_hero_image_cache');
  const fallbackImage = "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl bg-slate-800">
      <img 
        src={cachedImage || fallbackImage} 
        alt="Cancun Car Rental Experience" 
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">
          Verified Local Insight
        </span>
      </div>
    </div>
  );
};

export default HeroImage;
