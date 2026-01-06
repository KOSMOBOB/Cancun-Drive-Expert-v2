
import React from 'react';
import { Locale } from '../types';

interface AffiliateWidgetProps {
  locale: Locale;
}

const AffiliateWidget: React.FC<AffiliateWidgetProps> = ({ locale }) => {
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

      {/* 
        MOCK WIDGET: In production, the actual DiscoverCars/Travelpayouts iframe script goes here.
        Note: Per instructions, we do not modify the code, just provide the container and labels.
      */}
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg aspect-[16/9] flex flex-col items-center justify-center text-slate-400 text-center p-8">
        <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="font-medium text-slate-600">
          [DiscoverCars Official Comparison Widget (Iframe) Loaded Here]
        </p>
        <p className="text-xs mt-2 max-w-sm">
          Integrating Travelpayouts script ID: discovercars_search_form
        </p>
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
