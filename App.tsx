
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ContentBlock from './components/ContentBlock';
import AffiliateWidget from './components/AffiliateWidget';
import ReviewsBlock from './components/ReviewsBlock';
import HeroImage from './components/HeroImage';
import { Locale } from './types';
import { INTERNAL_LINKS } from './constants';

const App: React.FC = () => {
  const [locale, setLocale] = useState<Locale>('en');
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash.replace('#', '');
      if (!hash) hash = '/en';
      if (!hash.startsWith('/')) hash = '/' + hash;
      
      setCurrentPath(hash);
      if (hash.startsWith('/es')) setLocale('es');
      else setLocale('en');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = path.startsWith('/') ? path : `/${path}`;
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

    // --- EN: CAR RENTAL CANCUN (MAIN) ---
    if (p === '/en' || p === '/en/car-rental-cancun') {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is it safe to rent a car in Cancun?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, renting a car in Cancun is safe and the best way to explore the Riviera Maya. Just be aware of local driving laws and mandatory insurance requirements."
            }
          },
          {
            "@type": "Question",
            "name": "What insurance is mandatory in Mexico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Third Party Liability (TPL) is legally mandatory in Mexico. Most low-cost websites hide this fee until you arrive at the counter."
            }
          }
        ]
      };

      return (
        <ContentBlock title="Cancun Car Rental: The Expert Guide to Safe & Fair Bookings" locale="en" schema={faqSchema}>
          <p className="lead text-xl text-slate-700 mb-8 font-medium">Planning a trip to the Mexican Caribbean? Renting a car is the single best decision for freedom, but navigating the "insurance trap" is your first challenge.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Why Most Tourists Overpay</h2>
          <p>Many booking sites list cars for $5/day. In Mexico, this is impossible. The legally mandatory <strong>Third Party Liability (TPL)</strong> usually costs $15-$25 per day. If it's not in your quote, you'll pay it at the terminal. Our comparison tool below highlights providers that offer transparent pricing.</p>
          
          <AffiliateWidget locale="en" />
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Driving Tips for 2025</h2>
          <ul className="list-disc pl-6 space-y-4 mb-8">
            <li><strong>Gas Stations:</strong> Always ensure the pump starts at $0.00.</li>
            <li><strong>Speed Limits:</strong> Expressed in KM/H. On Highway 307, it's usually 80-100 km/h.</li>
            <li><strong>Police:</strong> If pulled over, stay polite. Ask for a written ticket to be paid at the station.</li>
          </ul>

          <ReviewsBlock locale="en" />
          <RelatedLinks currentLocale="en" />
        </ContentBlock>
      );
    }

    // --- ES: ALQUILER AUTOS CANCUN (MAIN) ---
    if (p === '/es' || p === '/es/alquiler-autos-cancun') {
      return (
        <ContentBlock title="Renta de Autos en Cancún: Guía Maestra para Evitar Estafas" locale="es">
          <p className="lead text-xl text-slate-700 mb-8 font-medium">Rentar un vehículo en Quintana Roo te da acceso a cenotes y playas que los tours no visitan. Aquí te explicamos cómo hacerlo de forma segura.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">El Seguro Obligatorio (TPL)</h2>
          <p>En México, el seguro de Daños a Terceros es obligatorio por ley. No te dejes engañar por precios de $1 USD por día; esos precios no incluyen el seguro mínimo y te lo cobrarán al llegar. Compara precios reales aquí:</p>
          
          <AffiliateWidget locale="es" />
          
          <div className="bg-blue-50 p-8 rounded-3xl my-10">
            <h3 className="text-xl font-bold mb-4">Consejo de Oro:</h3>
            <p>Reserva con al menos 14 días de antelación para asegurar las mejores tarifas y disponibilidad de SUVs, ideales para las carreteras de la Riviera Maya.</p>
          </div>

          <RelatedLinks currentLocale="es" />
        </ContentBlock>
      );
    }

    // --- EN: AIRPORT GUIDE ---
    if (p === '/en/car-rental-cancun-airport') {
      return (
        <ContentBlock title="Cancun Airport (CUN) Car Rental Survival Guide" locale="en">
          <p className="lead text-xl text-slate-700 mb-8">Landing at CUN is chaotic. Between timeshare sellers and pirate taxis, finding your rental shuttle can be a nightmare. Here is the step-by-step process.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Terminal Layouts</h2>
          <p>Rentals are located in Terminal 2 and 3. Most major agencies offer free shuttles to their off-site lots (only 5 mins away). Do not accept rides from anyone not holding a sign with your rental agency's official logo.</p>
          <AffiliateWidget locale="en" />
          <RelatedLinks currentLocale="en" />
        </ContentBlock>
      );
    }

    // --- ES: AEROPUERTO GUIDE ---
    if (p === '/es/alquiler-autos-aeropuerto-cancun') {
      return (
        <ContentBlock title="Guía de Renta de Autos en el Aeropuerto de Cancún (CUN)" locale="es">
          <p className="lead text-xl text-slate-700 mb-8">Evita el caos al aterrizar. Sigue estos pasos para encontrar tu transporte de renta sin caer en trampas de vendedores.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">¿Cómo llegar al lote de autos?</h2>
          <p>La mayoría de las agencias tienen sus lotes a 5 minutos del aeropuerto. Toma el transporte gratuito (shuttle) oficial. Ignora a los promotores de tiempos compartidos que intentarán ofrecerte "descuentos" en la renta.</p>
          <AffiliateWidget locale="es" />
          <RelatedLinks currentLocale="es" />
        </ContentBlock>
      );
    }

    // --- EN: TULUM GUIDE ---
    if (p === '/en/guides/safe-to-drive-cancun-to-tulum') {
      return (
        <ContentBlock title="Is it Safe to Drive from Cancun to Tulum? (2025 Expert Report)" locale="en">
          <p className="lead text-xl text-slate-700 mb-8">The drive to Tulum is one of the most beautiful in Mexico, but construction and checkpoints require your attention.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Current Road Conditions</h2>
          <p>Highway 307 is mostly flat and well-paved. Watch out for 'Topes' (speed bumps) near Puerto Morelos and Playa del Carmen. They are often unpainted and can be very harsh on your rental car.</p>
          <AffiliateWidget locale="en" />
          <RelatedLinks currentLocale="en" />
        </ContentBlock>
      );
    }

    // --- ES: GAS STATION GUIDE ---
    if (p === '/es/guias/estafas-gasolineras-mexico') {
      return (
        <ContentBlock title="Manual: Cómo evitar estafas en las gasolineras de México" locale="es">
          <p className="lead text-xl text-slate-700 mb-8">No permitas que un descuido en la gasolinera arruine tu presupuesto. Estas son las 3 estafas más comunes.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. La bomba no está en cero</h2>
          <p>Asegúrate de ver el $0.00 en la pantalla antes de que comiencen a surtir combustible. Es tu derecho como consumidor.</p>
          <AffiliateWidget locale="es" />
          <RelatedLinks currentLocale="es" />
        </ContentBlock>
      );
    }

    // --- EN: DRIVING RULES ---
    if (p === '/en/guides/driving-in-cancun') {
      return (
        <ContentBlock title="Essential Driving Rules in Cancun & Riviera Maya" locale="en">
          <p className="lead text-xl text-slate-700 mb-8">Rules in Mexico might differ from what you are used to. Here is how to stay legal and avoid fines.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Traffic Lights and Intersections</h2>
          <p>A flashing green light means it's about to turn yellow. Do not speed up! Red means stop, but right turns on red are generally permitted unless marked otherwise.</p>
          <AffiliateWidget locale="en" />
          <RelatedLinks currentLocale="en" />
        </ContentBlock>
      );
    }

    // --- ES: DRIVING RULES ---
    if (p === '/es/guias/conducir-en-cancun') {
      return (
        <ContentBlock title="Reglas de Tránsito y Seguridad en Cancún" locale="es">
          <p className="lead text-xl text-slate-700 mb-8">Conoce las señales locales и reglamentos para evitar multas innecesarias durante tu estancia.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Uso de Alcohol y Celular</h2>
          <p>La tolerancia al alcohol es cero. El uso del celular mientras manejas está estrictamente prohibido y es una de las razones principales por las que la policía detiene a turistas.</p>
          <AffiliateWidget locale="es" />
          <RelatedLinks currentLocale="es" />
        </ContentBlock>
      );
    }

    // --- BEST COMPANIES GUIDE (Fixing 404) ---
    if (p.includes('best-car-rental-cancun') || p.includes('mejor-alquiler-autos-cancun')) {
        return (
          <ContentBlock 
            title={locale === 'en' ? "Top-Rated Car Rental Companies in Cancun for 2025" : "Mejores Empresas de Renta de Autos en Cancún 2025"} 
            locale={locale}
          >
            <p className="lead text-xl text-slate-700 mb-8">{locale === 'en' ? "Not all agencies are created equal. We've filtered the best based on transparency and service." : "No todas las agencias son iguales. Hemos filtrado las mejores basadas en transparencia y servicio."}</p>
            <div className="space-y-6 mb-10">
                <div className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
                    <h4 className="font-bold text-lg">Enterprise / National</h4>
                    <p className="text-sm text-slate-500">{locale === 'en' ? "Global standard service, located near T2." : "Servicio estándar global, ubicado cerca de la T2."}</p>
                </div>
                <div className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
                    <h4 className="font-bold text-lg">City Car Rental</h4>
                    <p className="text-sm text-slate-500">{locale === 'en' ? "Highly rated local agency with inclusive pricing." : "Agencia local altamente calificada con precios inclusivos."}</p>
                </div>
            </div>
            <AffiliateWidget locale={locale} />
            <RelatedLinks currentLocale={locale} />
          </ContentBlock>
        );
    }

    // --- OTHER LEGAL PAGES ---
    if (p.includes('about') || p.includes('disclosure') || p.includes('privacy')) {
        return (
            <ContentBlock title={locale === 'en' ? "Site Information" : "Información del Sitio"} locale={locale}>
                <p>{locale === 'en' ? "We provide independent expert advice for travelers to Mexico." : "Brindamos asesoría experta independiente para viajeros a México."}</p>
            </ContentBlock>
        );
    }

    // Default 404
    return (
      <div className="text-center py-32 px-4 max-w-2xl mx-auto">
        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">Oops! 404</h2>
        <p className="mb-10 text-slate-500">The expert guide you're looking for might have moved. Let's get you back on the road.</p>
        <button onClick={() => navigateTo(`/${locale}/car-rental-cancun`)} className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all">
          {locale === 'en' ? 'Back to Main Guide' : 'Volver a la Guía Principal'}
        </button>
      </div>
    );
  };

  return (
    <Layout locale={locale} setLocale={switchLocale}>
      <div className="bg-white">
        {(currentPath === '/en' || currentPath === '/es') && (
          <section className="relative overflow-hidden bg-slate-950 pt-20 pb-24 text-white">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative z-10 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  2025 Local Authority Site
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                  {locale === 'en' ? 'Drive Cancun With Zero Stress.' : 'Conduce por Cancún Sin Estrés.'}
                </h2>
                <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-lg">
                  {locale === 'en' 
                    ? "Real advice on car rentals, insurance laws, and local roads. No corporate fluff, just the facts you need to save money."
                    : "Consejos reales sobre renta de autos, leyes de seguros и caminos locales. Sin adornos corporativos, solo los hechos."}
                </p>
                <div className="flex flex-col sm:flex-row gap-5">
                  <button onClick={() => navigateTo(`/${locale}/car-rental-cancun`)} className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-center shadow-2xl shadow-blue-600/20 hover:bg-blue-500 transition-all">
                    {locale === 'en' ? 'Explore Full Guide' : 'Ver Guía Completa'}
                  </button>
                  <button onClick={() => navigateTo(`/${locale}/guides/driving-in-cancun`)} className="bg-white/5 text-white px-10 py-5 rounded-2xl font-bold text-center border border-white/10 hover:bg-white/10 transition-all">
                    {locale === 'en' ? 'Safety Checklist' : 'Lista de Seguridad'}
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
