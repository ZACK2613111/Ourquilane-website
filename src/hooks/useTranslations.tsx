// hooks/useTranslation.ts
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export interface Translations {
  [key: string]: string;
}

export const useTranslation = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<Translations | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const data = await import(`../data/locales/${language}/translations.json`);
        setTranslations(data);
      } catch (error) {
        console.error("Error loading translations:", error);
        setTranslations({});
      }
    };

    loadTranslations();
  }, [language]);

  const t = (key: string) => translations?.[key] || key;

  return { t };
};
