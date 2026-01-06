
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const HeroImage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CACHE_KEY = 'cancun_hero_image_cache';
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (cachedData) {
      setImageUrl(cachedData);
      setLoading(false);
      return;
    }

    const generateImage = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: 'A professional, high-end travel commercial photograph. A happy traveler couple in their 30s smiling at the camera, holding silver car keys. In the background, a white SUV is parked under lush green palm trees. Turquoise Caribbean sea and white sand in the distance. 4k resolution, cinematic lighting, warm tropical vibe.',
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9"
            }
          },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64 = `data:image/png;base64,${part.inlineData.data}`;
            setImageUrl(base64);
            localStorage.setItem(CACHE_KEY, base64);
            break;
          }
        }
      } catch (error) {
        console.error("Error generating hero image:", error);
      } finally {
        setLoading(false);
      }
    };

    generateImage();
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl bg-slate-800">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <span className="text-slate-400 text-sm font-medium">Optimizing Caribbean Views...</span>
          </div>
        </div>
      ) : imageUrl ? (
        <img 
          src={imageUrl} 
          alt="Happy travelers with rental car in Cancun" 
          className="w-full h-full object-cover animate-in fade-in duration-700"
          loading="eager"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-500">
          Cancun Travel Experience
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
    </div>
  );
};

export default HeroImage;
