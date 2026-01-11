// metadata.ts - SEO мета-данные для каждой страницы

export const pageMetadata: Record<string, { title: string; description: string }> = {
  // Главные страницы
  '/en': {
    title: 'Free Guide Mexico | Cancun Car Rental Guides',
    description: 'Expert guides for car rental in Cancun. Compare prices, avoid hidden fees, and get the best deals at CUN Airport.'
  },
  '/es': {
    title: 'Free Guide Mexico | Guías de Renta de Autos Cancún',
    description: 'Guías expertas para rentar auto en Cancún. Compara precios, evita cargos ocultos y obtén las mejores ofertas en el aeropuerto.'
  },
  
  // Car Rental pages
  '/en/car-rental-cancun': {
    title: 'Cancun Car Rental Guide | Best Prices & Tips',
    description: 'Complete guide to renting a car in Cancun. Find the best deals, avoid scams, and learn insider tips for safe driving.'
  },
  '/es/alquiler-autos-cancun': {
    title: 'Guía Alquiler Autos Cancún | Mejores Precios',
    description: 'Guía completa para rentar auto en Cancún. Encuentra las mejores ofertas, evita estafas y aprende consejos de seguridad.'
  },
  
  // Guide: Car Rental Hub
  '/en/guides/cancun-car-rental-hub': {
    title: 'Cancun Car Rental Hub | Complete Resource Center',
    description: 'Your central hub for Cancun car rental information. Compare companies, read reviews, and find the best rental options.'
  },
  '/es/guias/guia-central-renta-autos-cancun': {
    title: 'Guía Central Renta Autos Cancún | Centro Recursos',
    description: 'Tu centro de información para rentar autos en Cancún. Compara empresas, lee reseñas y encuentra las mejores opciones.'
  },
  
  // Guide: Comparison Review
  '/en/guides/cancun-car-rental-comparison-review': {
    title: 'Cancun Car Rental Comparison & Review 2026',
    description: 'Detailed comparison of car rental companies in Cancun. Honest reviews, price analysis, and recommendations.'
  },
  '/es/guias/comparativa-renta-autos-cancun-resena': {
    title: 'Comparativa Renta Autos Cancún y Reseñas 2026',
    description: 'Comparación detallada de empresas de renta de autos en Cancún. Reseñas honestas, análisis de precios y recomendaciones.'
  },
  
  // Guide: Driving Laws
  '/en/guides/cancun-driving-laws-safety-guide': {
    title: 'Cancun Driving Laws & Safety Guide 2026',
    description: 'Essential guide to driving laws and safety in Cancun. Speed limits, traffic rules, police stops, and safety tips.'
  },
  '/es/guias/guia-leyes-transito-seguridad-cancun': {
    title: 'Leyes de Tránsito y Seguridad Cancún 2026',
    description: 'Guía esencial sobre leyes de tránsito y seguridad en Cancún. Límites de velocidad, reglas, retenes y consejos.'
  },
  
  // Guide: Cancun to Tulum
  '/en/guides/driving-cancun-to-tulum-safety-guide': {
    title: 'Driving Cancun to Tulum: Complete Safety Guide',
    description: 'Is it safe to drive from Cancun to Tulum? Route guide, safety tips, road conditions, and what to expect.'
  },
  '/es/guias/es-seguro-manejar-cancun-tulum': {
    title: '¿Es Seguro Manejar de Cancún a Tulum? Guía 2026',
    description: 'Guía completa de seguridad para manejar de Cancún a Tulum. Ruta, consejos, condiciones del camino y qué esperar.'
  },
  
  // Guide: Airport Pickup
  '/en/guides/rent-a-car-cancun-airport-pickup-guide': {
    title: 'Cancun Airport Car Rental Pickup Guide 2026',
    description: 'Step-by-step guide to picking up your rental car at Cancun Airport. Terminal info, shuttle details, and tips.'
  },
  '/es/guias/guia-renta-autos-aeropuerto-cancun-pickup': {
    title: 'Guía Pickup Renta Autos Aeropuerto Cancún 2026',
    description: 'Guía paso a paso para recoger tu auto rentado en el Aeropuerto de Cancún. Info de terminales, shuttles y consejos.'
  },
  
  // Legal pages
  '/en/privacy-policy': {
    title: 'Privacy Policy | Free Guide Mexico',
    description: 'Privacy policy for Free Guide Mexico. How we collect, use, and protect your personal information.'
  },
  '/es/privacy-policy': {
    title: 'Política de Privacidad | Free Guide Mexico',
    description: 'Política de privacidad de Free Guide Mexico. Cómo recopilamos, usamos y protegemos tu información personal.'
  },
  '/en/disclosure': {
    title: 'Affiliate Disclosure | Free Guide Mexico',
    description: 'Disclosure about affiliate relationships and how we earn commissions on Free Guide Mexico.'
  },
  '/es/disclosure': {
    title: 'Divulgación de Afiliados | Free Guide Mexico',
    description: 'Divulgación sobre relaciones de afiliados y cómo ganamos comisiones en Free Guide Mexico.'
  },
  '/en/about': {
    title: 'About Us | Free Guide Mexico',
    description: 'Learn about Free Guide Mexico, our mission to help travelers with honest car rental guides in Cancun.'
  },
  '/es/about': {
    title: 'Acerca de Nosotros | Free Guide Mexico',
    description: 'Conoce Free Guide Mexico, nuestra misión de ayudar a viajeros con guías honestas de renta de autos en Cancún.'
  }
};

// Функция для получения метаданные по пути
export function getMetadata(path: string): { title: string; description: string } {
  // Удаляем хэш если есть
  const cleanPath = path.replace('#', '');
  
  // Получаем метаданные или возвращаем дефолтные
  return pageMetadata[cleanPath] || {
    title: 'Free Guide Mexico | Cancun Travel Guides',
    description: 'Expert travel guides for Cancun and Riviera Maya. Car rental tips, driving guides, and local insights.'
  };
}