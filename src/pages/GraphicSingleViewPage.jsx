import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles, Layers, Download } from 'lucide-react';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import { GRAPHICS_DATA } from '../data/graphicsData';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function GraphicSingleViewPage({
  graphic,
  onBackToGallery,
  onBack,
  onSelectGraphic,
  onOpenPolicy,
}) {
  const { isRtl, isDark, t } = useThemeLanguage();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onBackToGallery) {
      onBackToGallery();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '#graphics-gallery';
    }
  };
  const currentGraphic = graphic || GRAPHICS_DATA[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentGraphic]);

  // Find index for next / previous navigation
  const currentIndex = GRAPHICS_DATA.findIndex((g) => g.id === currentGraphic.id);
  const prevGraphic = currentIndex > 0 ? GRAPHICS_DATA[currentIndex - 1] : GRAPHICS_DATA[GRAPHICS_DATA.length - 1];
  const nextGraphic = currentIndex < GRAPHICS_DATA.length - 1 ? GRAPHICS_DATA[currentIndex + 1] : GRAPHICS_DATA[0];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white font-sans selection:bg-brand-red selection:text-white pt-16 flex flex-col justify-between select-none transition-colors duration-200">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Navigation & Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-900">
          <BackButton onClick={handleBack} />

          {/* Previous / Next Switcher */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={() => onSelectGraphic && onSelectGraphic(prevGraphic)}
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 rtl:space-x-reverse transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3 h-3 rtl:rotate-180" />
              <span className="hidden sm:inline">{t('graphic.prevGraphic', 'Previous')}</span>
            </button>

            <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 px-1">
              0{currentIndex + 1} / 0{GRAPHICS_DATA.length}
            </span>

            <button
              onClick={() => onSelectGraphic && onSelectGraphic(nextGraphic)}
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 rtl:space-x-reverse transition-all cursor-pointer shadow-2xs"
            >
              <span className="hidden sm:inline">{t('graphic.nextGraphic', 'Next')}</span>
              <ArrowRight className="w-3 h-3 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Artwork Overview Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-brand-red font-display">
              {currentGraphic.category}
            </span>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {currentGraphic.client}
            </span>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <span className="text-[10px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400">
              {currentGraphic.year || '2026'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-neutral-950 dark:text-white font-display leading-[1.1]">
            {currentGraphic.title}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium max-w-3xl leading-relaxed">
            {currentGraphic.details || currentGraphic.description}
          </p>
        </div>

        {/* FULL-WIDTH SINGLE ARTWORK (Original Aspect Ratio, Uncropped, Natural Vertical Page Scrolling) */}
        <div className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/80 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl mb-12">
          {/* Top Artwork Bar */}
          <div className="px-4 py-2.5 bg-neutral-100 dark:bg-[#0a0a0d] border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-300 font-mono">
                {t('graphic.fullViewBadge', 'FULL ARTWORK VIEW • SCROLL VERTICALLY')}
              </span>
            </div>

            <a
              href={currentGraphic.image}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 rtl:space-x-reverse text-brand-red hover:underline font-bold uppercase transition-colors"
            >
              <span>{t('graphic.openRaw', 'Open Raw File')}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* SINGLE IMAGE: Full width, natural height, zero cropping, full original aspect ratio */}
          <div className="w-full bg-neutral-950">
            <img
              src={currentGraphic.image}
              alt={currentGraphic.title}
              className="w-full h-auto block"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxWidth: '100%',
              }}
            />
          </div>

          {/* Bottom End of Artwork Marker */}
          <div className="px-5 py-3 bg-neutral-100 dark:bg-[#0a0a0d] border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-600 dark:text-neutral-500 font-mono uppercase">
            <span>{t('graphic.endOfArtwork', 'END OF ARTWORK')} • {currentGraphic.title}</span>
            <span className="text-neutral-500 dark:text-neutral-400">{t('graphic.archiveBadge', 'DEVOTIX MEDIA DESIGN ARCHIVE')}</span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBackToGallery}
            className="w-full sm:w-auto px-6 py-3 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white text-xs font-black uppercase tracking-wider rounded-lg border border-neutral-300 dark:border-neutral-800 flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{t('graphic.backToGallery', 'Back to Graphics Gallery')}</span>
          </button>

          <button
            onClick={() => onSelectGraphic && onSelectGraphic(nextGraphic)}
            className="w-full sm:w-auto px-7 py-3 bg-brand-red hover:bg-brand-redHover text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all cursor-pointer transform hover:scale-105"
          >
            <span>{isRtl ? `العمل التالي: ${nextGraphic.title}` : `Next Artwork: ${nextGraphic.title}`}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>
      </main>

      {/* Standalone Footer */}
      <Footer onOpenPolicy={onOpenPolicy} />
    </div>
  );
}
