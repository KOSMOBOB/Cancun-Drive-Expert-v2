
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ContentBlock from './components/ContentBlock';
import AffiliateWidget from './components/AffiliateWidget';
import ReviewsBlock from './components/ReviewsBlock';
import HeroImage from './components/HeroImage';
import CancunPulse from './components/CancunPulse';
import { Locale } from './types';
import { INTERNAL_LINKS } from './constants';

const App: React.FC = () => {
  // Инициализируем путь сразу из URL, чтобы избежать 404 при первой загрузке
  const getInitialPath = () => {
    let hash = window.location.hash.replace('#', '');
    if (!hash || hash === '/') return '/en';
    if (!hash.startsWith('/')) hash = '/' + hash;
    return hash.replace(/\/$/, ''); // Убираем завершающий слеш
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath());
  const [locale, setLocale] = useState<Locale>(getInitialPath().startsWith('/es') ? 'es' : 'en');

  useEffect(() => {
    const handleHashChange = () => {
      const path = getInitialPath();
      setCurrentPath(path);
      setLocale(path.startsWith('/es') ? 'es' : 'en');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string) => {
    // Гарантируем, что путь начинается с / и не имеет двойных слешей
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    window.location.hash = cleanPath;
  };

  const switchLocale = (newLocale: Locale) => {
    let newPath = currentPath;
    if (newLocale === 'es' && currentPath.startsWith('/en')) {
      newPath = currentPath.replace('/en', '/es');
    } else if (newLocale === 'en' && currentPath.startsWith('/es')) {
      newPath = currentPath.replace('/es', '/en');
    } else {
      newPath = `/${newLocale}`;
    }
    navigateTo(newPath);
  };

  const RelatedLinks = ({ currentLocale }: { currentLocale: Locale }) => (
    <div className="mt-16 pt-8 border-t border-slate-200">
      <h3 className="text-xl font-bold mb-6">{currentLocale === 'en' ? 'Keep Planning Your Trip' : 'Continúa Planeando tu Viaje'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {INTERNAL_LINKS[currentLocale].map((link, idx) => (
          <button 
            key={idx}
            onClick={() => navigateTo(link.path)}
            className="text-left p-5 rounded-2xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all group shadow-sm bg-white"
          >
            <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 block mb-1">{link.name}</span>
            <span className="text-xs text-slate-400">{currentLocale === 'en' ? 'Local advice →' : 'Consejo local →'}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    const p = currentPath;

    // --- HOME / MAIN GUIDE ---
    if (p === '/en' || p === '/en/car-rental-cancun') {
      return (
        <ContentBlock title="Cancun Car Rental: Safe & Fair Bookings 2025" locale="en">
          <CancunPulse locale="en" />
          <p className="lead text-xl text-slate-700 mb-8 font-medium">Planning a trip to the Mexican Caribbean? Renting a car is the single best decision for freedom, but navigating the "insurance trap" is your first challenge.</p>
          <AffiliateWidget locale="en" />
          <ReviewsBlock locale="en" />
          <RelatedLinks currentLocale="en" />
        </ContentBlock>
      );
    }

    if (p === '/es' || p === '/es/alquiler-autos-cancun') {
      return (
        <ContentBlock title="Renta de Autos en Cancún: Guía Maestra para Evitar Estafas" locale="es">
          <CancunPulse locale="es" />
          <p className="lead text-xl text-slate-700 mb-8 font-medium">Rentar un vehículo en Quintana Roo te da acceso a cenotes и playas que los tours no visitan. Aprende a hacerlo de forma segura и evita cargos ocultos.</p>
          <AffiliateWidget locale="es" />
          <RelatedLinks currentLocale="es" />
        </ContentBlock>
      );
    }

    // --- AIRPORT ---
    if (p.includes('airport') || p.includes('aeropuerto')) {
      return (
        <ContentBlock title={locale === 'en' ? "Cancun Airport (CUN) Survival Guide" : "Guía Aeropuerto Cancún (CUN)"} locale={locale}>
          <CancunPulse locale={locale} />
          <p className="mb-6">{locale === 'en' ? 'The airport can be chaotic. Here is how to navigate Terminal 2, 3, and 4 to find your rental company.' : 'El aeropuerto puede ser caótico. Aquí te decimos cómo navegar las Terminales 2, 3 и 4.'}</p>
          <AffiliateWidget locale={locale} />
          <RelatedLinks currentLocale={locale} />
        </ContentBlock>
      );
    }

    // --- SAFETY / DRIVING TIPS ---
    if (p.includes('driving-in-cancun') || p.includes('conducir-en-cancun') || p.includes('rules')) {
      return (
        <ContentBlock title={locale === 'en' ? "Safety & Driving Rules" : "Seguridad и Reglas de Tránsito"} locale={locale}>
          <CancunPulse locale={locale} />
          <p className="mb-6">{locale === 'en' ? 'From "Topes" to traffic police, here is everything you need to know about driving safely in Mexico.' : 'Desde los "Topes" hasta la policía de tránsito, aquí está todo lo que necesitas saber.'}</p>
          <AffiliateWidget locale={locale} />
          <RelatedLinks currentLocale={locale} />
        </ContentBlock>
      );
    }

    // --- TULUM / GAS STATIONS ---
    if (p.includes('tulum') || p.includes('gasolineras') || p.includes('scams')) {
      return (
        <ContentBlock title={locale === 'en' ? "Tulum Drive & Gas Station Safety" : "Ruta a Tulum и Seguridad en Gasolineras"} locale={locale}>
          <CancunPulse locale={locale} />
          <p className="mb-6">{locale === 'en' ? 'The drive to Tulum is straightforward but requires knowing about gas station etiquette to avoid scams.' : 'El viaje a Tulum es sencillo pero requiere conocer el protocolo en las gasolineras.'}</p>
          <AffiliateWidget locale={locale} />
          <RelatedLinks currentLocale={locale} />
        </ContentBlock>
      );
    }

    // --- BEST COMPANIES ---
    if (p.includes('best-car-rental') || p.includes('mejor-alquiler-autos')) {
      return (
        <ContentBlock title={locale === 'en' ? "Best Car Rental Companies 2025" : "Mejores Rentadoras de Autos 2025"} locale={locale}>
          <CancunPulse locale={locale} />
          <AffiliateWidget locale={locale} />
          <RelatedLinks currentLocale={locale} />
        </ContentBlock>
      );
    }

    // --- LEGAL / ABOUT ---
    if (p.includes('privacy-policy')) {
      return <ContentBlock title="Privacy Policy" locale={locale}><p>Your privacy is important to us. We do not collect personal data directly on this informational site.</p></ContentBlock>;
    }
    if (p.includes('disclosure')) {
      return <ContentBlock title="Affiliate Disclosure" locale={locale}><p>We earn a small commission if you book through our links, which supports our independent travel advice.</p></ContentBlock>;
    }
    if (p.includes('about')) {
      return <ContentBlock title="About Us" locale={locale}><p>We are a team of local experts dedicated to making your Mexican road trip safe and affordable.</p></ContentBlock>;
    }

    // Default 404
    return (
      <div className="text-center py-32 px-4 max-w-2xl mx-auto">
        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">404</h2>
        <p className="text-slate-500 mb-10">{locale === 'en' ? "Page not found." : "Página не encontrada."}</p>
        <button onClick={() => navigateTo(`/${locale}`)} className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold shadow-xl hover:bg-blue-700">
          {locale === 'en' ? 'Back Home' : 'Inicio'}
        </button>
      </div>
    );
  };

  const isHomePage = currentPath === '/en' || currentPath === '/es' || currentPath === '/en/car-rental-cancun' || currentPath === '/es/alquiler-autos-cancun';

  return (
    <Layout locale={locale} setLocale={switchLocale}>
      <div className="bg-white">
        {isHomePage && (
          <section className="relative overflow-hidden bg-slate-950 pt-20 pb-24 text-white">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative z-10 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  2025 Live Travel Guide
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                  {locale === 'en' ? 'Drive Cancun With Confidence.' : 'Conduce por Cancún Con Confianza.'}
                </h2>
                <div className="flex flex-col sm:flex-row gap-5">
                  <button onClick={() => navigateTo(`/${locale}/car-rental-cancun`)} className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-center hover:bg-blue-500 transition-all">
                    {locale === 'en' ? 'Explore Guide' : 'Ver Guía'}
                  </button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <HeroImage />
              </div>
            </div>
          </section>
        )}
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
