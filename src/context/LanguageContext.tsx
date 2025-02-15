'use client'

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Import your existing translation files
import enTranslations from '@/data/locales/en/translations.json';
import frTranslations from '@/data/locales/fr/translations.json';

type TranslationType = typeof enTranslations;

interface LanguageContextType {
  language: string;
  translations: TranslationType;
  changeLanguage: (lang: string) => void;
}

const getTranslations = (lang: string): TranslationType => {
  switch (lang.toUpperCase()) {
    case 'FR':
      return frTranslations;
    default:
      return enTranslations;
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('EN');
  const [translations, setTranslations] = useState<TranslationType>(enTranslations);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'EN';
    setLanguage(storedLanguage);
    setTranslations(getTranslations(storedLanguage));
  }, []);

  const changeLanguage = (lang: string) => {
    const newLang = lang.toUpperCase();
    setLanguage(newLang);
    setTranslations(getTranslations(newLang));
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang.toLowerCase();
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};