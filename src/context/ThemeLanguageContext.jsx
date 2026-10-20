import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations';

const ThemeLanguageContext = createContext(null);

export function ThemeLanguageProvider({ children }) {
  // 1. Theme State (defaults to 'light')
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('devotix_theme');
      return savedTheme === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // 2. Language State (defaults to 'en')
  const [language, setLanguage] = useState(() => {
    try {
      const savedLang = localStorage.getItem('devotix_lang');
      return savedLang === 'ar' ? 'ar' : 'en';
    } catch {
      return 'en';
    }
  });

  const isRtl = language === 'ar';

  // Synchronize Theme with DOM
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      if (body) {
        body.classList.remove('dark');
        body.classList.add('light');
      }
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      if (body) {
        body.classList.remove('light');
        body.classList.add('dark');
      }
    }
    try {
      localStorage.setItem('devotix_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Synchronize Language and RTL with DOM
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    try {
      localStorage.setItem('devotix_lang', language);
    } catch {
      // ignore
    }
  }, [language, isRtl]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  // Translation helper function
  const t = (path, fallback = '') => {
    const keys = path.split('.');
    let current = translations[language];

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if missing in target language
        let enCurrent = translations['en'];
        for (const enKey of keys) {
          if (enCurrent && enCurrent[enKey] !== undefined) {
            enCurrent = enCurrent[enKey];
          } else {
            return fallback || path;
          }
        }
        return enCurrent;
      }
    }
    return current;
  };

  return (
    <ThemeLanguageContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        language,
        isRtl,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
}

export function useThemeLanguage() {
  const context = useContext(ThemeLanguageContext);
  if (!context) {
    throw new Error('useThemeLanguage must be used within a ThemeLanguageProvider');
  }
  return context;
}
