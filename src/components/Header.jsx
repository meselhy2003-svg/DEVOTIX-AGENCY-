import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon, Globe } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import SocialIconsGroup from './SocialIconsGroup';

export default function Header({
  onOpenContact,
  onOpenCareer,
  onOpenAbout,
  onNavigateSoftwareEngineering,
  onNavigateAbout,
  onNavigateCareer,
  onNavigateContact,
  onNavigateHome,
  currentPage = 'home'
}) {
  const { theme, isDark, toggleTheme, language, isRtl, toggleLanguage, t } = useThemeLanguage();

  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { key: 'home', name: t('nav.home', 'HOME'), href: '#home', type: 'anchor' },
    { key: 'clients', name: t('nav.clients', 'CLIENTS'), href: '#clients', type: 'anchor' },
    { key: 'services', name: t('nav.services', 'SERVICES'), href: '#services', type: 'anchor' },
    { key: 'career', name: t('nav.joinUs', 'JOIN US'), href: '#career', type: 'career' },
    { key: 'about', name: t('nav.aboutUs', 'ABOUT US'), href: '#about', type: 'about' },
    { key: 'contact', name: t('nav.contactUs', 'CONTACT US'), href: '#contact', type: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }

      if (currentPage === 'home') {
        const sections = ['home', 'services', 'work', 'production', 'content-views', 'photography', 'graphic', 'clients'];
        const scrollPosition = window.scrollY + 160;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (link.type === 'about') {
      if (currentPage === 'about') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (onNavigateAbout) {
        onNavigateAbout();
      } else {
        onOpenAbout && onOpenAbout();
      }
      return;
    }

    if (link.type === 'career') {
      if (currentPage === 'career') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (onNavigateCareer) {
        onNavigateCareer();
      } else {
        onOpenCareer && onOpenCareer();
      }
      return;
    }

    if (link.type === 'contact') {
      if (currentPage === 'contact') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (onNavigateContact) {
        onNavigateContact();
      } else {
        onOpenContact && onOpenContact();
      }
      return;
    }

    // Anchor link
    const targetId = link.href.replace('#', '');
    if (currentPage !== 'home') {
      onNavigateHome && onNavigateHome(targetId);
      return;
    }

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

  const handleCtaClick = () => {
    if (onNavigateContact) {
      onNavigateContact();
    } else if (onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-brand-red z-[60] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isDark
            ? 'bg-black/90 text-white border-b border-neutral-800/80 backdrop-blur-md'
            : 'bg-white/95 text-neutral-900 border-b border-neutral-200 backdrop-blur-md shadow-xs'
        } ${isScrolled ? 'py-2 shadow-md' : 'py-2.5 sm:py-3'}`}
      >
        <div className="w-full max-w-[98%] 2xl:max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 flex items-center justify-between gap-2">
          {/* Left: Agency Logo & Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, { href: '#home', type: 'anchor' })}
            className="flex items-center space-x-2 rtl:space-x-reverse group focus:outline-none flex-shrink-0 cursor-pointer"
          >
            <img
              src="/assets/landing/logo.png"
              alt="Devotix Media Logo"
              className="h-6 sm:h-7 lg:h-7.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.src = '/favicon.png';
              }}
            />
            <span className="font-extrabold tracking-wider text-sm sm:text-base text-neutral-900 dark:text-white font-display uppercase whitespace-nowrap">
              DEVOTIX MEDIA
            </span>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-5 2xl:space-x-6 rtl:space-x-reverse flex-nowrap overflow-hidden">
            {navLinks.map((link) => {
              const targetSection = link.href.replace('#', '');
              const isActive = currentPage === 'about'
                ? link.type === 'about'
                : (currentPage === 'career' || currentPage === 'job-apply' || currentPage === 'send-cv')
                  ? link.type === 'career'
                  : currentPage === 'contact'
                    ? link.type === 'contact'
                    : link.type === 'anchor' && activeSection === targetSection;

              return (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-[12px] xl:text-[13px] 2xl:text-[13.5px] font-bold tracking-wider transition-colors duration-150 uppercase relative py-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-brand-red'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-brand-red dark:hover:text-brand-red'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Controls (Language + Theme) & "LET'S TALK" CTA Button */}
          <div className="hidden sm:flex items-center space-x-2.5 xl:space-x-3.5 rtl:space-x-reverse flex-shrink-0">
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
              className="px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-brand-red bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 rtl:space-x-reverse transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-brand-red" />
              <span className={language === 'en' ? 'text-brand-red font-black' : 'text-neutral-600 dark:text-neutral-400'}>EN</span>
              <span className="text-neutral-400 dark:text-neutral-600 text-[10px]">/</span>
              <span className={language === 'ar' ? 'text-brand-red font-black font-arabic' : 'text-neutral-600 dark:text-neutral-400'}>عربي</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={isDark ? t('nav.themeLight', 'Switch to Light Mode') : t('nav.themeDark', 'Switch to Dark Mode')}
              className="p-2 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-brand-red bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* CTA Button */}
            <button
              onClick={handleCtaClick}
              className="bg-brand-red hover:bg-brand-redHover text-white text-xs sm:text-[13px] font-bold uppercase tracking-wider px-3.5 py-1.5 lg:px-4 lg:py-2 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow hover:shadow-red-500/30 flex items-center space-x-1.5 rtl:space-x-reverse cursor-pointer"
            >
              <span>{t('nav.letsTalk', "LET'S TALK")}</span>
              <ArrowUpRight className="w-3 h-3 rtl:rotate-[-90deg]" />
            </button>
          </div>

          {/* Mobile / Tablet Controls & Menu Button */}
          <div className="flex lg:hidden items-center space-x-2 rtl:space-x-reverse">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs font-bold uppercase cursor-pointer"
            >
              {language === 'en' ? 'عربي' : 'EN'}
            </button>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-900 dark:text-white p-2 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / Compact Tablet Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 px-6 pt-4 pb-6 space-y-2 animate-fadeIn max-h-[80vh] overflow-y-auto shadow-xl">
            {navLinks.map((link) => {
              const targetSection = link.href.replace('#', '');
              const isActive = currentPage === 'about'
                ? link.type === 'about'
                : (currentPage === 'career' || currentPage === 'job-apply' || currentPage === 'send-cv')
                  ? link.type === 'career'
                  : currentPage === 'contact'
                    ? link.type === 'contact'
                    : link.type === 'anchor' && activeSection === targetSection;

              return (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`block text-sm sm:text-base font-bold uppercase py-2 transition-colors ${
                    isActive ? 'text-brand-red' : 'text-neutral-800 dark:text-neutral-200 hover:text-brand-red'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCtaClick();
                }}
                className="w-full bg-brand-red hover:bg-brand-redHover text-white font-bold text-sm uppercase py-3 rounded-full tracking-wider transition-colors shadow text-center flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <span>{t('nav.letsTalk', "LET'S TALK")}</span>
                <ArrowUpRight className="w-4 h-4 rtl:rotate-[-90deg]" />
              </button>

              <div className="pt-3 flex items-center justify-center">
                <SocialIconsGroup size="sm" />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
