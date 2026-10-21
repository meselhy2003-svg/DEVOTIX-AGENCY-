import React, { useState, useEffect } from 'react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function RightSlideBar({ currentPage = 'home' }) {
  const { isRtl, isDark, t } = useThemeLanguage();
  const [activeSection, setActiveSection] = useState('');
  const [scrollPercent, setScrollPercent] = useState(0);

  const pageSections = {
    home: [
      { id: 'home', label: t('slideBar.home', 'Home') },
      { id: 'services', label: t('slideBar.services', 'Services') },
      { id: 'work', label: t('slideBar.work', 'Our Work') },
      { id: 'production', label: t('slideBar.production', 'Production') },
      { id: 'content-views', label: t('slideBar.contentViews', 'Views') },
      { id: 'photography', label: t('slideBar.photography', 'Photography') },
      { id: 'graphic', label: t('slideBar.graphic', 'Graphic') },
      { id: 'clients', label: t('slideBar.clients', 'Clients') },
    ],
    'project-view': [
      { id: 'view-title', label: 'Overview' },
      { id: 'view-video', label: 'Video Film' },
      { id: 'view-photo', label: 'Gallery' },
      { id: 'view-backstage', label: 'Backstage' },
      { id: 'view-details', label: 'Details' },
    ],
    about: [
      { id: 'about-story', label: t('pages.about.storyTitle', 'Our Story') },
      { id: 'about-metrics', label: 'Impact & Values' },
    ],
    career: [
      { id: 'career-hero', label: t('pages.career.title', 'Join Team') },
      { id: 'career-roles', label: t('pages.career.openRoles', 'Open Roles') },
    ],
    contact: [
      { id: 'contact-form', label: t('pages.contact.title', 'Project Form') },
      { id: 'contact-direct', label: t('pages.contact.directContact', 'Direct Contact') },
    ],
  };

  const sections = pageSections[currentPage] || [];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max((window.scrollY / totalHeight) * 100, 0), 100);
        setScrollPercent(progress);
      }

      if (sections.length > 0) {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i].id);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(sections[i].id);
            return;
          }
        }
        setActiveSection(sections[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, sections]);

  if (sections.length <= 1) return null;

  const scrollToId = (id) => {
    const element = document.getElementById(id);
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
    <aside
      aria-label="Page Slide Navigation"
      className="fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none"
    >
      {/* Background Track Line */}
      <div className={`relative flex flex-col items-center py-2 px-1.5 rounded-full ${
        isDark ? 'bg-black/40 border-white/10' : 'bg-white/80 border-neutral-300'
      } backdrop-blur-md border shadow-lg`}>
        {/* Continuous Progress Fill Line */}
        <div className={`absolute top-4 bottom-4 w-[2px] ${isDark ? 'bg-white/15' : 'bg-neutral-300'} rounded-full`} />
        <div
          className="absolute top-4 w-[2px] bg-brand-red rounded-full transition-all duration-150"
          style={{ height: `calc(${scrollPercent}% * 0.85)` }}
        />

        {/* Section Dots */}
        <div className="relative z-10 flex flex-col items-center space-y-4 my-2">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToId(sec.id)}
                className="group relative flex items-center justify-center p-1 focus:outline-none cursor-pointer"
                aria-label={`Slide to ${sec.label}`}
              >
                {/* Outer Indicator Ring */}
                <div
                  className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? 'border-brand-red bg-brand-red/20 scale-125'
                      : isDark
                        ? 'border-white/30 hover:border-white/70 bg-transparent'
                        : 'border-neutral-400 hover:border-neutral-700 bg-transparent'
                  }`}
                >
                  {/* Center Dot */}
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-red scale-110'
                        : isDark
                          ? 'bg-white/50 group-hover:bg-white'
                          : 'bg-neutral-500 group-hover:bg-neutral-800'
                    }`}
                  />
                </div>

                {/* Floating Tooltip on Hover */}
                <div
                  className="absolute left-6 group-hover:translate-x-1 px-2.5 py-1 rounded bg-black/90 text-white border border-white/15 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 shadow-xl backdrop-blur-sm"
                >
                  {sec.label}
                  <div
                    className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-black/90 rotate-45 border-l border-b border-white/15"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
