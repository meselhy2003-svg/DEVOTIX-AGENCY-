import React from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

/**
 * Renders uppercase text with specific letters highlighted in Devotix red (#FF1E27)
 * matching the design mockup in both English and Arabic.
 */
export default function TitleAccent({ type, className = "" }) {
  const { isRtl } = useThemeLanguage();

  if (isRtl) {
    switch (type) {
      case 'work':
        return (
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight leading-tight font-display ${className}`}>
            مشاريع <span className="text-brand-red">ه</span>ندسة
            <br />
            <span className="text-brand-red">ا</span>لبرمجيات.
          </h2>
        );

      case 'clients':
        return (
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${className}`}>
            <span className="text-brand-red">ع</span>ملاؤ<span className="text-brand-red">ن</span>ا
          </h2>
        );

      case 'services':
        return (
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-center ${className}`}>
            <span className="text-brand-red">خ</span>دما<span className="text-brand-red">ت</span>نا
          </h2>
        );

      case 'production':
        return (
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-center font-display ${className}`}>
            الإنتاج <span className="text-brand-red">ا</span>لمرئي
          </h2>
        );

      case 'graphic':
        return (
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-center font-display ${className}`}>
            التصميم <span className="text-brand-red">ا</span>لجرافيكي
          </h2>
        );

      case 'photography':
        return (
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-center ${className}`}>
            التصوير <span className="text-brand-red">ا</span>لفوتوغرافي
          </h2>
        );

      default:
        return null;
    }
  }

  // English default
  switch (type) {
    case 'work':
      return (
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black tracking-tight uppercase leading-tight font-display ${className}`}>
          SOFTWARE <span className="text-brand-red">E</span>NGINEERING
          <br />
          <span className="text-brand-red">P</span>ROJECTS.
        </h2>
      );

    case 'clients':
      return (
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase ${className}`}>
          OU<span className="text-brand-red">R</span> CLI<span className="text-brand-red">E</span>NT
        </h2>
      );

    case 'services':
      return (
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase text-center ${className}`}>
          OU<span className="text-brand-red">R</span> S<span className="text-brand-red">E</span>RVIC<span className="text-brand-red">E</span>
        </h2>
      );

    case 'production':
      return (
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase text-center font-display ${className}`}>
          VID<span className="text-brand-red">E</span>OS
        </h2>
      );

    case 'graphic':
      return (
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase text-center font-display ${className}`}>
          G<span className="text-brand-red">R</span>APHIC
        </h2>
      );

    case 'photography':
      return (
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase text-center ${className}`}>
          OU<span className="text-brand-red">R</span> PH<span className="text-brand-red">O</span>T<span className="text-brand-red">O</span>G<span className="text-brand-red">R</span>APHY
        </h2>
      );

    default:
      return null;
  }
}
