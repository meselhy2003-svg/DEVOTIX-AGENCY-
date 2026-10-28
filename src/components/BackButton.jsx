import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function BackButton({ onClick, className = "" }) {
  const { isRtl, t } = useThemeLanguage();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '#home';
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black hover:bg-neutral-900 text-white border border-neutral-700/80 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group hover:scale-105 active:scale-95 text-xs sm:text-sm font-bold tracking-wide select-none ${className}`}
      aria-label="Back"
    >
      <ArrowLeft className="w-4 h-4 text-white group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform rtl:rotate-180" />
      <span>{t('nav.back', 'Back')}</span>
    </button>
  );
}
