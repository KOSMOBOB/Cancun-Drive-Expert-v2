import React, { useEffect, useRef } from 'react';
import { Locale } from '../types';

interface AffiliateWidgetProps {
  locale: Locale;
}

const AffiliateWidget: React.FC<AffiliateWidgetProps> = ({ locale }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only proceed if we have a container reference
    if (!containerRef.current) return;

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://tp.media/content?campaign_id=222&promo_id=8813&shmarker=272338.FGM&trs=487797';
    script.charset = 'utf-8';
    script.async = true;

    // Add to the specific container
    containerRef.current.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the script and its potential content
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="my-12 p-6 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {locale === 'en' ? 'Price Comparison Tool' : 'Herramienta de Comparación de Precios'}
          </h3>
          <p className="text-sm text-slate-500">
            {locale === 'en' 
              ? 'Compare 500+ car rental suppliers in Cancun' 
              : 'Compara más de 500 proveedores de renta de autos en Cancún'}
          </p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
          {locale === 'en' ? 'Official Partner Provider' : 'Proveedor Socio Oficial'}
        </span>
      </div>

      <div ref={containerRef} className="aspect-[16/9] w-full">
        {/* Widget will be loaded here */}
      </div>

      <p className="mt-4 text-[10px] text-slate-400 text-center leading-tight">
        {locale === 'en' 
          ? 'Disclaimer: We compare various rental providers to find the best market rates. Bookings are subject to provider terms and conditions.' 
          : 'Descargo de responsabilidad: Comparamos varios proveedores de renta para encontrar las mejores tarifas del mercado. Las reservas están sujetas a los términos del proveedor.'}
      </p>
    </div>
  );
};

export default AffiliateWidget;