import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "@/components/ui/use-toast";
import { en } from "@/locales/en";
import { tr } from "@/locales/tr";

type Language = "en" | "tr";
type Translations = Record<string, string>;

interface LanguageContextProps {
  language: Language;
  translations: Translations;
  changeLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const defaultLanguage: Language = "en";

const LanguageContext = createContext<LanguageContextProps>({
  language: defaultLanguage,
  translations: {},
  changeLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || defaultLanguage;
  });

  const [translations, setTranslations] = useState<Translations>(
    language === "en" ? en : tr
  );

  useEffect(() => {
    setTranslations(language === "en" ? en : tr);
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    toast({
      title: newLanguage === "en" ? "Language Changed" : "Dil Değiştirildi",
      description:
        newLanguage === "en"
          ? "Successfully switched to English"
          : "Başarıyla Türkçe diline geçildi",
      duration: 3000,
    });
  };

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, translations, changeLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
