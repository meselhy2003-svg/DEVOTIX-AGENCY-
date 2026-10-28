import React, { useState, useEffect } from 'react';
import TitleAccent from './TitleAccent';
import { ArrowUpRight, Layers } from 'lucide-react';
import { getGraphicsData, GRAPHICS_DATA } from '../data/graphicsData';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function Graphic({ onNavigateGallery, onSelectGraphic }) {
  const { isRtl, isDark, t } = useThemeLanguage();
  const [graphics, setGraphics] = useState(getGraphicsData);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (Array.isArray(e.detail) && e.detail.length > 0) {
        setGraphics(e.detail);
      } else {
        setGraphics(getGraphicsData());
      }
    };
    window.addEventListener('devotix_graphics_updated', handleUpdate);
    return () => window.removeEventListener('devotix_graphics_updated', handleUpdate);
  }, []);

  const safeGraphics = (Array.isArray(graphics) && graphics.length > 0) ? graphics : GRAPHICS_DATA;
  const cover1 = safeGraphics.find(g => g.id === 'egycolor-brand-cover') || safeGraphics[0] || {};
  const coverSocial = safeGraphics.find(g => g.categoryFilter === 'social') || safeGraphics[1] || {};
  const cover2 = safeGraphics.find(g => g.id === 'meltix-burger-cover') || safeGraphics[2] || {};
  const cover3 = safeGraphics.find(g => g.id === 'carhub-ui-showcase') || safeGraphics[3] || {};

  const handleCoverClick = (graphic, category = 'all') => {
    if (onNavigateGallery) {
      onNavigateGallery(category);
    } else if (onSelectGraphic) {
      onSelectGraphic(graphic);
    }
  };

  return (
    <section
      id="graphic"
      className="snap-section relative flex flex-col justify-center section-alt-b px-3.5 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-14 select-none"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 pb-3 border-b border-neutral-200/80 dark:border-white/10">
          <TitleAccent type="graphic" />
          <p className="mt-2 rtl:mt-3.5 text-xs sm:text-sm md:text-[14.5px] text-neutral-600 dark:text-neutral-400 font-medium uppercase tracking-wider leading-relaxed rtl:leading-[1.85]">
            {t('graphic.subtitle', 'Brand identity, digital art direction, packaging, and UI/UX design.')}
          </p>
        </div>

        {/* 4-Card Balanced Layout: 2 on Left (Split First Section with Social Media), 2 on Right */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-2.5 sm:gap-4 lg:gap-5 items-stretch">
          {/* Left Column: 2 Stacked Cards (Brand Identity & Packaging + Social Media Designs) */}
          <div className="contents md:flex md:col-span-6 md:flex-col md:gap-3 sm:md:gap-4 lg:md:gap-5 md:justify-between md:h-[450px]">
            {/* Card 1: Brand & Industrial Packaging Cover (Top Left) */}
            <div
              onClick={() => handleCoverClick(cover1, 'packaging')}
              className="col-span-1 group relative rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-[#111116] border border-neutral-200/90 dark:border-white/10 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-lg hover:-translate-y-0.5 flex flex-col h-[160px] sm:h-[180px] md:h-auto md:flex-1 min-h-0"
            >
              <img
                src={cover1.thumb || cover1.image}
                alt={cover1.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Gallery Badge Top Right */}
              <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 rtl:right-auto rtl:left-2 rtl:sm:left-2.5 z-10">
                <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                  <Layers className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  <span className="hidden xs:inline">{t('graphic.viewGallery', 'VIEW GALLERY')}</span>
                  <span className="xs:hidden">{isRtl ? 'معرض' : 'VIEW'}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 rtl:rotate-[-90deg]" />
                </div>
              </div>

              {/* Metadata Bottom */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                  {cover1.category}
                </span>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-display line-clamp-1">
                  {cover1.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>{cover1.client}</span>
                </p>
              </div>
            </div>

            {/* Card 2: NEW SOCIAL MEDIA DESIGNS (Bottom Left - Split Section) */}
            <div
              onClick={() => handleCoverClick(coverSocial, 'social')}
              className="col-span-1 group relative rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-[#111116] border border-neutral-200/90 dark:border-white/10 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-lg hover:-translate-y-0.5 flex flex-col h-[160px] sm:h-[180px] md:h-auto md:flex-1 min-h-0"
            >
              <img
                src={coverSocial.thumb || coverSocial.image}
                alt={coverSocial.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Special Tag Top Left */}
              <div className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5 rtl:left-auto rtl:right-2 rtl:sm:right-2.5 z-10">
                <span className="px-2 py-0.5 rounded-full bg-brand-red text-white text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider shadow">
                  {isRtl ? '🔥 سوشيال ميديا' : '🔥 SOCIAL ADS'}
                </span>
              </div>

              {/* Gallery Badge Top Right */}
              <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 rtl:right-auto rtl:left-2 rtl:sm:left-2.5 z-10">
                <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                  <Layers className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  <span className="hidden xs:inline">{isRtl ? 'تصاميم السوشيال' : 'VIEW SOCIAL'}</span>
                  <span className="xs:hidden">{isRtl ? 'سوشيال' : 'SOCIAL'}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 rtl:rotate-[-90deg]" />
                </div>
              </div>

              {/* Metadata Bottom */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                  {isRtl ? 'تصاميم وإعلانات السوشيال ميديا' : 'SOCIAL MEDIA DESIGNS'}
                </span>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-display line-clamp-1">
                  {isRtl ? 'حملات وبوستات السوشيال ميديا' : 'HIGH-CONVERTING SOCIAL ADS'}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>{coverSocial.client || 'Devotix Social Media Campaigns'}</span>
                  <span className="hidden xs:inline">• {isRtl ? 'اضغط للمشاهدة' : 'Click to View'}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Stacked Cards on Desktop / 2-Column Side-by-Side on Mobile */}
          <div className="contents md:flex md:col-span-6 md:flex-col md:gap-3 sm:md:gap-4 lg:md:gap-5 md:justify-between md:h-[450px]">
            {/* Cover 2: Right Card 1 (Top Horizontal on Desktop / Left Card on Mobile) */}
            <div
              onClick={() => handleCoverClick(cover2, 'branding')}
              className="col-span-1 group relative rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-[#111116] border border-neutral-200/90 dark:border-white/10 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-lg hover:-translate-y-0.5 flex flex-col h-[160px] sm:h-[180px] md:h-auto md:flex-1 min-h-0"
            >
              <img
                src={cover2.thumb || cover2.image}
                alt={cover2.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Gallery Badge Top Right */}
              <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 rtl:right-auto rtl:left-2 rtl:sm:left-2.5 z-10">
                <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                  <Layers className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  <span className="hidden xs:inline">{t('graphic.viewGallery', 'VIEW GALLERY')}</span>
                  <span className="xs:hidden">{isRtl ? 'معرض' : 'VIEW'}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 rtl:rotate-[-90deg]" />
                </div>
              </div>

              {/* Metadata Bottom */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                  {cover2.category}
                </span>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-display line-clamp-1">
                  {cover2.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>{cover2.client}</span>
                </p>
              </div>
            </div>

            {/* Cover 3: Right Card 2 (Bottom Horizontal on Desktop / Right Card on Mobile) */}
            <div
              onClick={() => handleCoverClick(cover3, 'interface')}
              className="col-span-1 group relative rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-[#111116] border border-neutral-200/90 dark:border-white/10 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-lg hover:-translate-y-0.5 flex flex-col h-[160px] sm:h-[180px] md:h-auto md:flex-1 min-h-0"
            >
              <img
                src={cover3.thumb || cover3.image}
                alt={cover3.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Gallery Badge Top Right */}
              <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 rtl:right-auto rtl:left-2 rtl:sm:left-2.5 z-10">
                <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                  <Layers className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  <span className="hidden xs:inline">{t('graphic.viewGallery', 'VIEW GALLERY')}</span>
                  <span className="xs:hidden">{isRtl ? 'معرض' : 'VIEW'}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 rtl:rotate-[-90deg]" />
                </div>
              </div>

              {/* Metadata Bottom */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                  {cover3.category}
                </span>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-display line-clamp-1">
                  {cover3.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>{cover3.client}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
