import { useStore } from '@nanostores/react';
import { currentLang, t } from '../store/i18n';
import { useState, useEffect } from 'react';

export default function About() {
  const lang = useStore(currentLang);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const displayLang = isMounted ? lang : 'es';
  const translations = t[displayLang].about;

  return (
    <div className="bg-brand-light dark:bg-brand-dark min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-dark dark:text-white mb-6">
            {translations.title}
          </h1>
          <p className="text-brand-gold text-lg font-medium tracking-widest uppercase">
            {translations.subtitle}
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert mx-auto text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-16">
          <p className="mb-6">{translations.p1}</p>
          <p className="mb-6">{translations.p2}</p>
          <p>{translations.p3}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="font-serif text-xl text-brand-dark dark:text-white mb-4">{translations.v1_title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{translations.v1_desc}</p>
          </div>
          <div className="text-center p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="font-serif text-xl text-brand-dark dark:text-white mb-4">{translations.v2_title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{translations.v2_desc}</p>
          </div>
          <div className="text-center p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="font-serif text-xl text-brand-dark dark:text-white mb-4">{translations.v3_title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{translations.v3_desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
