import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import SocialIconsGroup from './SocialIconsGroup';

export default function Footer({ onOpenPolicy }) {
  const { isRtl, isDark, t } = useThemeLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="footer" className="w-full section-alt-b py-10 sm:py-14 border-t border-neutral-200/80 dark:border-white/10 select-none scroll-snap-align-end" style={{ scrollSnapAlign: 'end' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Left / Right (in RTL): Agency Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left rtl:sm:text-right">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center space-x-2 rtl:space-x-reverse group focus:outline-none"
            >
              <img
                src="/assets/footer/footer-logo.png"
                alt="Devotix Media Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
              <div className="hidden items-center space-x-2 rtl:space-x-reverse">
                <span className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-black text-base">
                  D
                </span>
                <span className="font-extrabold tracking-wider text-xl text-neutral-900 dark:text-white font-display">
                  DEVOTIX MEDIA
                </span>
              </div>
            </a>
            <div className="sm:border-l rtl:sm:border-l-0 rtl:sm:border-r sm:border-neutral-300 dark:sm:border-white/10 sm:pl-4 rtl:sm:pl-0 rtl:sm:pr-4 flex flex-col justify-center">
              <span className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                DEVOTIX MEDIA
              </span>
              <span className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                © {new Date().getFullYear()} {t('footer.copyright', 'ALL RIGHTS RESERVED. DEVOTIX MEDIA AGENCY.')}
              </span>
            </div>
          </div>

          {/* Center: Legal Links (Privacy Policy, Terms of Service) */}
          <div className="flex items-center space-x-6 sm:space-x-8 rtl:space-x-reverse">
            <button
              onClick={() => onOpenPolicy && onOpenPolicy('privacy')}
              className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-600 dark:text-neutral-400 hover:text-brand-red transition-colors focus:outline-none cursor-pointer"
            >
              {t('footer.privacyPolicy', 'Privacy Policy')}
            </button>
            <button
              onClick={() => onOpenPolicy && onOpenPolicy('terms')}
              className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-600 dark:text-neutral-400 hover:text-brand-red transition-colors focus:outline-none cursor-pointer"
            >
              {t('footer.termsOfService', 'Terms of Service')}
            </button>
            <a
              href="#admin"
              className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-400 dark:text-neutral-500 hover:text-brand-red transition-colors focus:outline-none cursor-pointer"
            >
              {isRtl ? 'لوحة التحكم' : 'Admin Portal'}
            </a>
          </div>

          {/* Right / Left (in RTL): Social Media Icons & Scroll to Top */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <SocialIconsGroup size="md" />

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-black dark:bg-[#181822] text-white hover:bg-brand-red flex items-center justify-center transition-all duration-300 shadow-sm border border-transparent dark:border-white/10 ml-2 rtl:ml-0 rtl:mr-2 group cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
