
import React from 'react';
import { Locale } from '../types';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: { en: string; es: string };
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Sarah J.",
    rating: 5,
    date: "Feb 2025",
    text: {
      en: "Best decision to rent a car. We used the comparison tool and found a local agency with TPL included. Driving to Tulum was a breeze!",
      es: "La mejor decisión rentar un auto. Usamos la herramienta de comparación и encontramos una agencia local con TPL incluido. ¡Manejar a Tulum fue genial!"
    },
    verified: true
  },
  {
    id: 2,
    author: "Marcello R.",
    rating: 4,
    date: "Jan 2025",
    text: {
      en: "Watch out for the 'Topes' (speed bumps). The rental was smooth, picked up right at CUN airport shuttle area.",
      es: "Cuidado con los 'Topes'. La renta fue fluida, nos recogieron justo en el área de transporte del aeropuerto CUN."
    },
    verified: true
  },
  {
    id: 3,
    author: "Elena M.",
    rating: 5,
    date: "Dec 2024",
    text: {
      en: "Don't believe the $1/day ads on other sites. Use this comparison tool to see the REAL price with insurance. Saved me $200 in hidden fees.",
      es: "No crean en los anuncios de $1/día en otros sitios. Usen esta herramienta para ver el precio REAL con seguro. Me ahorró $200 en cargos ocultos."
    },
    verified: true
  }
];

const ReviewsBlock: React.FC<{ locale: Locale }> = ({ locale }) => {
  return (
    <div className="my-16 bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-4">
          {locale === 'en' ? 'What Travelers Say' : 'Lo que dicen los viajeros'}
        </h2>
        <p className="text-slate-500">
          {locale === 'en' ? 'Verified experiences from Cancun car renters' : 'Experiencias verificadas de rentas en Cancún'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-slate-600 text-sm italic mb-6 leading-relaxed">
                "{review.text[locale]}"
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-50 pt-4">
              <div>
                <span className="block text-sm font-bold text-slate-900">{review.author}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">{review.date}</span>
              </div>
              {review.verified && (
                <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-bold">VERIFIED</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsBlock;
