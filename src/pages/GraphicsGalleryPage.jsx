import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Maximize2, Layers, Sparkles } from 'lucide-react';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import { getGraphicsData } from '../data/graphicsData';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function GraphicsGalleryPage({
  onBackToHome,
  onBack,
  onSelectGraphic,
  onOpenPolicy,
  initialCategory = 'all',
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
  const [graphicsList, setGraphicsList] = useState(getGraphicsData);
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const handleUpdate = (e) => {
      setGraphicsList(e.detail || getGraphicsData());
    };
    window.addEventListener('devotix_graphics_updated', handleUpdate);
    return () => window.removeEventListener('devotix_graphics_updated', handleUpdate);
  }, []);

  const categories = [
    { id: 'all', label: isRtl ? 'كافة التصاميم' : 'ALL ARTWORKS' },
    { id: 'social', label: isRtl ? 'تصاميم السوشيال ميديا' : 'SOCIAL MEDIA DESIGNS' },
    { id: 'branding', label: isRtl ? 'الهوية البصرية' : 'BRANDING & IDENTITY' },
    { id: 'packaging', label: isRtl ? 'التغليف والمنتجات' : 'PACKAGING & COATINGS' },
    { id: 'logo', label: isRtl ? 'تصميم الشعارات' : 'LOGO DESIGN' },
    { id: 'interface', label: isRtl ? 'واجهات رقمية UI/UX' : 'DIGITAL INTERFACES' },
  ];

  const filteredGraphics = activeCategory === 'all'
    ? graphicsList
    : graphicsList.filter((item) => item.categoryFilter === activeCategory);

  const handleCardClick = (graphic) => {
    if (onSelectGraphic) {
      onSelectGraphic(graphic);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white font-sans selection:bg-brand-red selection:text-white pt-16 flex flex-col justify-between select-none transition-colors duration-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        {/* Top Back Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-neutral-200 dark:border-neutral-900">
          <BackButton onClick={handleBack} />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all'
                ? graphicsList.length
                : graphicsList.filter((item) => item.categoryFilter === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-red text-white shadow-md shadow-red-600/30 scale-105'
                      : 'bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-300 dark:border-neutral-800'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`mx-1 text-[8px] font-mono opacity-80 ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Title & Overview Header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-brand-red font-display">
              {isRtl ? 'التصميم الجرافيكي والتوجيه الفني' : 'GRAPHIC DESIGN & ART DIRECTION'}
            </span>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
              {filteredGraphics.length} {isRtl ? 'أعمال فنية' : 'ARTWORKS'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950 dark:text-white font-display leading-[1.05]">
            {t('pages.graphicsGallery.title', 'BRAND IDENTITIES, COVERS & DIGITAL ARTWORKS')}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium max-w-3xl leading-relaxed">
            {t('pages.graphicsGallery.subtitle', 'Explore our archive of visual identity systems, packaging guidelines, digital catalog interfaces, and bespoke brand typography. Click on any artwork to view the complete single graphic at full resolution.')}
          </p>
        </div>

        {/* Graphics Responsive Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          {filteredGraphics.map((graphic) => (
            <div
              key={graphic.id}
              onClick={() => handleCardClick(graphic)}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/90 hover:border-brand-red/70 transition-all duration-500 cursor-pointer shadow-md dark:shadow-xl flex flex-col justify-between hover:shadow-red-950/20"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={graphic.thumb}
                  alt={graphic.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[8.5px] font-bold uppercase tracking-wider text-neutral-200">
                    {graphic.tag}
                  </span>

                  <div className="w-7 h-7 rounded-full bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Card Metadata */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white dark:bg-[#0d0d10]">
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-brand-red block mb-1">
                    {graphic.category}
                  </span>
                  <h3 className="text-sm font-black uppercase tracking-tight text-neutral-950 dark:text-white font-display group-hover:text-brand-red transition-colors line-clamp-2">
                    {graphic.title}
                  </h3>
                  <p className="text-[10px] text-neutral-600 dark:text-neutral-400 font-medium mt-1.5 line-clamp-2 leading-relaxed">
                    {graphic.description}
                  </p>
                </div>

                {/* Action Footer */}
                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                  <span>{graphic.client}</span>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse text-brand-red">
                    <span>{t('graphic.viewArtwork', 'VIEW FULL ARTWORK')}</span>
                    <ArrowUpRight className="w-3 h-3 rtl:rotate-[-90deg]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home Button */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-500 font-medium">
            {isRtl
              ? `عرض جميع الأعمال البصرية البالغ عددها ${filteredGraphics.length} في أرشيف ديفوتيكس ميديا.`
              : `Showing all ${filteredGraphics.length} visual design deliverables in Devotix Media archive.`}
          </div>

          <BackButton onClick={handleBack} />
        </div>
      </main>

      {/* Standalone Footer */}
      <Footer onOpenPolicy={onOpenPolicy} />
    </div>
  );
}
