
import React, { useEffect } from 'react';
import { AFFILIATE_DISCLOSURE_EN, AFFILIATE_DISCLOSURE_ES } from '../constants';
import { Locale } from '../types';

interface ContentBlockProps {
  children: React.ReactNode;
  title: string;
  locale: Locale;
  schema?: object;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ children, title, locale, schema }) => {
  useEffect(() => {
    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [schema]);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Mandatory Affiliate Disclosure - Top placement for hard compliance */}
      <div className="mb-10 p-5 bg-blue-50/50 border-l-4 border-blue-600 rounded-r-lg">
        <p className="italic text-slate-700 text-sm leading-relaxed">
          <span className="font-bold uppercase text-[10px] block mb-1 tracking-widest text-blue-800">Affiliate Disclosure</span>
          {locale === 'en' ? AFFILIATE_DISCLOSURE_EN : AFFILIATE_DISCLOSURE_ES}
        </p>
      </div>

      <header className="mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          {title}
        </h1>
        <div className="flex flex-wrap items-center text-slate-500 text-sm gap-y-2 gap-x-6 py-4 border-y border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200" />
            <span className="font-medium text-slate-700">Cancun Expert Team</span>
          </div>
          <time dateTime={new Date().toISOString()}>
            Updated: {new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'es-MX', { month: 'long', year: 'numeric' })}
          </time>
          <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Independent Advice</span>
        </div>
      </header>

      <div className="prose prose-slate prose-lg max-w-none 
        prose-headings:text-slate-900 prose-headings:font-bold 
        prose-p:text-slate-600 prose-p:leading-relaxed
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-slate-900">
        {children}
      </div>
    </article>
  );
};

export default ContentBlock;
