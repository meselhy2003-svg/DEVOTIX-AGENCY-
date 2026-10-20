import React, { useState, useEffect } from 'react';
import TitleAccent from './TitleAccent';
import { ArrowUpRight, Layers, Clock } from 'lucide-react';
import { getPhotographyGalleries } from '../data/photographyData';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import CloudImg from './CloudImg';
import { cldCover } from '../utils/cloudinaryUrl';

export default function Photography({ onSelectGallery }) {
  const { isRtl, isDark, t } = useThemeLanguage();
  const [galleries, setGalleries] = useState(getPhotographyGalleries);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) {
        setGalleries(e.detail);
      } else {
        setGalleries(getPhotographyGalleries());
      }
    };
    window.addEventListener('devotix_photography_updated', handleUpdate);
    return () => window.removeEventListener('devotix_photography_updated', handleUpdate);
  }, []);

  const cover1 = galleries[0] || {};
  const cover2 = galleries[1] || {};
  const cover3 = galleries[2] || {};

  const cover1Image = cover1.photos?.[0]?.image || cover1.coverImage;
  const cover2Image = cover2.photos?.[0]?.image || cover2.coverImage;
  const cover3Image = cover3.photos?.[0]?.image || cover3.coverImage;

  const handleCoverClick = (gallery) => {
    if (onSelectGallery) {
      onSelectGallery(gallery);
    }
  };


  return (
    <section
      id="photography"
      className="snap-section relative flex flex-col justify-center section-alt-a px-3.5 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-14 select-none"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 pb-3 border-b border-neutral-200/80 dark:border-white/10">
          <TitleAccent type="photography" />
          <p className="mt-2 text-xs sm:text-sm md:text-[14.5px] text-neutral-600 dark:text-neutral-400 font-medium uppercase tracking-wider leading-relaxed">
            {t('photography.subtitle', 'Editorial, commercial, product, and architectural photography.')}
          </p>
        </div>

        {/* 2-Column Home Layout: Large Card + 2-Column Grid on Mobile | Large Left + 2 Stacked on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-2.5 sm:gap-4 lg:gap-5 items-stretch">
          {/* Cover 1: LARGE LEFT CARD on Desktop / Full-width Top Banner on Mobile */}
          <div
            onClick={() => handleCoverClick(cover1)}
            className="col-span-2 md:col-span-6 group relative rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-[#111116] border border-neutral-200/90 dark:border-white/10 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-xl hover:-translate-y-0.5 flex flex-col h-[200px] sm:h-[260px] md:h-[450px]"
          >
            <CloudImg
              src={cldCover(cover1Image)}
              alt={cover1.title}
              className="absolute inset-0 w-full h-full"
              imgClass="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

            {/* Gallery Badge Top Right */}
            <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 rtl:right-auto rtl:left-2.5 rtl:sm:left-3.5 z-10">
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                <Layers className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white" />
                <span>{t('photography.viewGallery', 'VIEW GALLERY')}</span>
                <ArrowUpRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white rtl:rotate-[-90deg]" />
              </div>
            </div>

            {/* Photo Metadata Bottom */}
            <div className="absolute bottom-2.5 sm:bottom-3.5 left-3 sm:left-4 right-3 sm:right-4 z-10">
              <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                {cover1.category}
              </span>
              <h4 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-tight text-white font-display line-clamp-1">
                {cover1.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                <span>{cover1.photos.length} {t('photography.photoCount', 'Photos')}</span>
                <span className="hidden xs:inline">• {t('photography.clickToOpen', 'Click to View Full Gallery')}</span>
              </p>
            </div>
          </div>

          {/* Right Column: 2 Stacked Cards on Desktop / 2-Column Side-by-Side on Mobile */}
          <div className="contents md:flex md:col-span-6 md:flex-col md:gap-3 sm:md:gap-4 lg:md:gap-5 md:justify-between md:h-[450px]">
            {/* Cover 2: Right Card 1 (Top Horizontal on Desktop / Left Card on Mobile) */}
            <div
              onClick={() => handleCoverClick(cover2)}
              className="col-span-1 group relative rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-[#111116] border border-neutral-200/90 dark:border-white/10 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-lg hover:-translate-y-0.5 flex flex-col h-[160px] sm:h-[180px] md:h-auto md:flex-1 min-h-0"
            >
              <CloudImg
                src={cldCover(cover2Image)}
                alt={cover2.title}
                className="absolute inset-0 w-full h-full"
                imgClass="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* COMING SOON overlay for mock galleries */}
              {cover2.isMock && (
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 shadow-lg">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-amber-400">Coming Soon</span>
                  </div>
                </div>
              )}

              {/* Gallery Badge Top Right */}
              <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 rtl:right-auto rtl:left-2 rtl:sm:left-2.5 z-10">
                <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                  <Layers className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  <span className="hidden xs:inline">{t('photography.viewGallery', 'VIEW GALLERY')}</span>
                  <span className="xs:hidden">{isRtl ? 'معرض' : 'VIEW'}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 rtl:rotate-[-90deg]" />
                </div>
              </div>

              {/* Photo Metadata Bottom */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                  {cover2.category}
                </span>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-display line-clamp-1">
                  {cover2.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>{cover2.isMock ? '— Images coming soon —' : `${cover2.photos.length} ${t('photography.photoCount', 'Photos')}`}</span>
                </p>
              </div>
            </div>

            {/* Cover 3: Right Card 2 (Bottom Horizontal on Desktop / Right Card on Mobile) */}
            <div
              onClick={() => handleCoverClick(cover3)}
              className="col-span-1 group relative rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-[#111116] border border-neutral-200/90 dark:border-white/10 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-lg hover:-translate-y-0.5 flex flex-col h-[160px] sm:h-[180px] md:h-auto md:flex-1 min-h-0"
            >
              <CloudImg
                src={cldCover(cover3Image)}
                alt={cover3.title}
                className="absolute inset-0 w-full h-full"
                imgClass="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* COMING SOON overlay for mock galleries */}
              {cover3.isMock && (
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 shadow-lg">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-amber-400">Coming Soon</span>
                  </div>
                </div>
              )}

              {/* Gallery Badge Top Right */}
              <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 rtl:right-auto rtl:left-2 rtl:sm:left-2.5 z-10">
                <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                  <Layers className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  <span className="hidden xs:inline">{t('photography.viewGallery', 'VIEW GALLERY')}</span>
                  <span className="xs:hidden">{isRtl ? 'معرض' : 'VIEW'}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 rtl:rotate-[-90deg]" />
                </div>
              </div>

              {/* Photo Metadata Bottom */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                  {cover3.category}
                </span>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-display line-clamp-1">
                  {cover3.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>{cover3.isMock ? '— Images coming soon —' : `${cover3.photos.length} ${t('photography.photoCount', 'Photos')}`}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
