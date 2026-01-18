import React from 'react';
import { Locale } from '../types';
import { SITE_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, locale, setLocale }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <a href={`#/${locale}`} className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">F</div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">{SITE_NAME}</span>
          </a>
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
             <a href={`#/${locale}/guides/cancun-car-rental-hub`} className="hover:text-blue-600 transition-colors">
               {locale === 'en' ? 'Rental Guide' : 'Guía de Renta'}
             </a>
             <a href={`#/${locale}/guides/rent-a-car-cancun-airport-pickup-guide`} className="hover:text-blue-600 transition-colors">
               {locale === 'en' ? 'Airport CUN' : 'Aeropuerto CUN'}
             </a>
             <a href={`#/${locale}/guides/cancun-driving-laws-safety-guide`} className="hover:text-blue-600 transition-colors">
               {locale === 'en' ? 'Driving Rules' : 'Reglas de Tránsito'}
             </a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
              className="text-sm font-semibold px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
              aria-label={locale === 'en' ? 'Switch to Spanish language' : 'Cambiar a idioma inglés'}
            >
              {locale === 'en' ? 'Ver en Español 🇲🇽' : 'View in English 🇺🇸'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white text-xl font-bold mb-6">{SITE_NAME}</h3>
              <p className="text-sm leading-relaxed max-w-sm">
                {locale === 'en' 
                  ? 'The most trusted independent resource for car rental comparison and driving advice in Cancun and the Riviera Maya.' 
                  : 'El recurso independiente más confiable para la comparación de renta de autos y consejos de manejo en Cancún y la Riviera Maya.'}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Navigation</h4>
              <ul className="text-sm space-y-4">
                <li><a href={`#/${locale}/about`} className="hover:text-white transition-colors">About Us</a></li>
                <li><a href={`#/${locale}/guides/cancun-car-rental-comparison-review`} className="hover:text-white transition-colors">Best Companies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Legal</h4>
              <ul className="text-sm space-y-4">
                <li><a href={`#/${locale}/privacy-policy`} className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href={`#/${locale}/disclosure`} className="hover:text-white transition-colors">Affiliate Disclosure</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">© {new Date().getFullYear()} {SITE_NAME}. No official affiliation with DiscoverCars. Independent travel architect.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;