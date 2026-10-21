import React, { useEffect, useState } from 'react';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import Footer from '../components/Footer';
import { getPhotographyGalleries } from '../data/photographyData';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import CloudImg from '../components/CloudImg';
import { cldGrid } from '../utils/cloudinaryUrl';

export default function PhotographyGalleryPage({
  gallery,
  onBackToHome,
  onBack,
  onOpenLightbox,
  onOpenPolicy
}) {
  const { isRtl, isDark, t } = useThemeLanguage();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onBackToHome) {
      onBackToHome();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '#home';
    }
  };
  const [galleriesList, setGalleriesList] = useState(getPhotographyGalleries);
  const [currentGallery, setCurrentGallery] = useState(() => {
    const list = getPhotographyGalleries();
    return (gallery && list.find(g => g.id === gallery.id)) || list[0];
  });

  useEffect(() => {
    const handleUpdate = (e) => {
      const updated = e.detail || getPhotographyGalleries();
      setGalleriesList(updated);
      setCurrentGallery(prev => (prev ? updated.find(g => g.id === prev.id) || updated[0] : updated[0]));
    };
    window.addEventListener('devotix_photography_updated', handleUpdate);
    return () => window.removeEventListener('devotix_photography_updated', handleUpdate);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentGallery?.id]);

  useEffect(() => {
    if (gallery) {
      const list = getPhotographyGalleries();
      setCurrentGallery(list.find(g => g.id === gallery.id) || gallery);
    }
  }, [gallery]);

  const handlePhotoClick = (index) => {
    if (onOpenLightbox) {
      onOpenLightbox(currentGallery.photos, index);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white font-sans selection:bg-brand-red selection:text-white pt-16 flex flex-col justify-between select-none transition-colors duration-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        {/* Top Back Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-neutral-200 dark:border-neutral-900">
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-2 rtl:space-x-reverse text-xs sm:text-sm font-semibold text-black dark:text-white hover:text-brand-red dark:hover:text-brand-red transition-colors cursor-pointer group w-fit"
          >
            <div className="w-8 h-8 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red text-black dark:text-white group-hover:text-white transition-all shadow-2xs">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5 transition-transform rtl:rotate-180" />
            </div>
            <span>{isRtl ? 'العودة للصفحة السابقة' : 'Back to previous page'}</span>
          </button>

          {/* Quick Switch Between Other Photography Galleries */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mr-1 rtl:mr-0 rtl:ml-1 hidden md:inline-block">
              {isRtl ? 'تبديل المعرض:' : 'Switch Gallery:'}
            </span>
            {galleriesList.map((gal) => (
              <button
                key={gal.id}
                onClick={() => setCurrentGallery(gal)}
                className={`px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  currentGallery.id === gal.id
                    ? 'bg-brand-red text-white shadow-md shadow-red-600/30'
                    : 'bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-300 dark:border-neutral-800'
                }`}
              >
                {gal.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Title & Overview Header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-brand-red font-display">
              {currentGallery.category}
            </span>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
              {currentGallery.photos.length} {t('photography.photoCount', 'PHOTOGRAPHS')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950 dark:text-white font-display leading-[1.05]">
            {currentGallery.title}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium max-w-3xl leading-relaxed">
            {currentGallery.description}
          </p>
        </div>

        {/* Full-Page Responsive Photo Grid (3 Columns x Vertical Scroll - Clean Photos without Text Overlays) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {currentGallery.photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => handlePhotoClick(index)}
              className="group relative h-[320px] sm:h-[360px] md:h-[400px] lg:h-[430px] rounded-2xl overflow-hidden bg-neutral-900 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/90 hover:border-brand-red/70 transition-all duration-500 cursor-pointer shadow-md hover:shadow-2xl flex flex-col justify-end"
            >
              {/* High-Resolution Clean Photo with blur-up */}
              <CloudImg
                src={cldGrid(photo.image)}
                alt={photo.title || 'Devotix Photography'}
                className="absolute inset-0 w-full h-full"
                imgClass="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                loading="lazy"
              />

              {/* Subtle hover overlay with floating expand button */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-xl">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home Button at bottom of grid */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-500 font-medium">
            {isRtl
              ? `عرض جميع الصور البالغ عددها ${currentGallery.photos.length} في ${currentGallery.title}.`
              : `Showing all ${currentGallery.photos.length} curated high-resolution photographs in ${currentGallery.title}.`}
          </div>

          <button
            onClick={handleBack}
            className="px-6 py-2.5 bg-brand-red hover:bg-brand-redHover text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-red-600/30 flex items-center space-x-2 rtl:space-x-reverse transition-all cursor-pointer transform hover:scale-105"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{t('nav.backToPrevious', 'Back to previous page')}</span>
          </button>
        </div>
      </main>

      {/* Standalone Footer */}
      <Footer onOpenPolicy={onOpenPolicy} />
    </div>
  );
}
