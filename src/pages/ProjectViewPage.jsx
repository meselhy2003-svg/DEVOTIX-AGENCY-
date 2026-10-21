import React, { useEffect } from 'react';
import { ArrowLeft, Play, ExternalLink, Maximize2 } from 'lucide-react';
import Footer from '../components/Footer';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import CloudImg from '../components/CloudImg';
import { cldGrid } from '../utils/cloudinaryUrl';

export default function ProjectViewPage({ project, onBackToPortfolio, onBack, onPlayVideo, onOpenLightbox, onOpenPolicy }) {
  const { t, isRtl } = useThemeLanguage();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onBackToPortfolio) {
      onBackToPortfolio();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '#home';
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const photos = [
    {
      id: 1,
      title: 'FINE GASTRONOMY',
      category: 'CULINARY PRODUCTION',
      image: '/assets/project-view/photo-1.png',
      location: 'PARIS, FRANCE'
    },
    {
      id: 2,
      title: 'NOCTURNE LOUNGE',
      category: 'ARCHITECTURAL CINEMA',
      image: '/assets/project-view/photo-2.png',
      location: 'TOKYO, JAPAN'
    },
    {
      id: 3,
      title: 'AVANT-GARDE',
      category: 'HIGH FASHION EDITORIAL',
      image: '/assets/project-view/photo-3.png',
      location: 'MILAN, ITALY'
    },
    {
      id: 4,
      title: 'CHRONO MASTER',
      category: 'LUXURY PRODUCT',
      image: '/assets/project-view/photo-4.png',
      location: 'GENEVA, SWITZERLAND'
    }
  ];

  const backstagePhotos = [
    {
      id: 5,
      title: 'CAMERA RIGGING & LIGHTING',
      category: 'BEHIND THE SCENES',
      image: '/assets/project-view/photo-1.png',
      location: 'STUDIO A'
    },
    {
      id: 6,
      title: 'SET DIRECTION & BLOCKING',
      category: 'BEHIND THE SCENES',
      image: '/assets/project-view/photo-2.png',
      location: 'LOCATION B'
    },
    {
      id: 7,
      title: 'WARDROBE & STYLING PREP',
      category: 'BEHIND THE SCENES',
      image: '/assets/project-view/photo-3.png',
      location: 'STAGE C'
    },
    {
      id: 8,
      title: 'MACRO LENS CALIBRATION',
      category: 'BEHIND THE SCENES',
      image: '/assets/project-view/photo-4.png',
      location: 'OPTICS LAB'
    }
  ];

  const videos = [
    {
      id: 'lumina-video-1',
      title: 'LUMINA CORE: NEURAL ANALYTICS DASHBOARD',
      category: 'DATA VISUALIZATION & ARCHITECTURE',
      duration: '02:15',
      image: '/assets/project-view/video-chart.png'
    },
    {
      id: 'lumina-video-2',
      title: 'GLOBAL FREIGHT LOGISTICS AI ROUTING',
      category: 'ENTERPRISE PRODUCTION FILM',
      duration: '01:45',
      image: '/assets/project-view/video-containers.png'
    }
  ];

  const projectData = project || {
    title: 'Lumina Core: Next-Gen Analytics',
    status: 'COMPLETED',
    subtitle: 'A smart analytics system designed to optimize logistics operations using predictive intelligence.',
    description: 'A complete architectural overhaul for a Fortune 500 logistics firm. We implemented a custom neural engine that reduced operational overhead by 42% through predictive routing.',
    solution: 'A complete architectural overhaul for a Fortune 500 logistics firm. We implemented a custom neural engine that reduced operational overhead by 42% through predictive routing.',
    link: 'https://luminacore.analytics.devotix.io'
  };

  return (
    <div className="bg-white dark:bg-black text-neutral-900 dark:text-white font-sans selection:bg-brand-red selection:text-white transition-colors duration-300">
      {/* 1. Project Title Section (Fits Full Screen View) */}
      <section id="view-title" className="snap-section min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-neutral-900 dark:text-white pt-16 pb-6">
        <div className="max-w-5xl mx-auto w-full my-auto">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs sm:text-sm font-semibold text-black dark:text-white hover:text-brand-red dark:hover:text-brand-red transition-colors mb-6 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-black dark:text-white group-hover:text-brand-red dark:group-hover:text-brand-red rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
            <span>{t('nav.backToPrevious', 'Back to previous page')}</span>
          </button>

          {/* Left Red Vertical Accent Line */}
          <div className="border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-red pl-5 rtl:pl-0 rtl:pr-5 sm:pl-7 sm:rtl:pr-7 py-2">
            {/* Status Row */}
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                {t('pages.projectView.status')}
              </span>
              <span className="bg-emerald-500 text-white font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                {t('pages.projectView.completed')}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white font-display leading-[1.05]">
              {projectData.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-medium max-w-2xl leading-relaxed">
              {projectData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Video Section (Fits Full Screen View) */}
      <section id="view-video" className="snap-section min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-neutral-900 dark:text-white pt-16 pb-6">
        <div className="max-w-5xl mx-auto w-full my-auto">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-3">
            {t('pages.projectView.video')}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => onPlayVideo && onPlayVideo(vid)}
                className="group relative aspect-[16/10] max-h-[270px] sm:max-h-[310px] rounded-lg overflow-hidden bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-md cursor-pointer"
              >
                <img
                  src={vid.image}
                  alt={vid.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                {/* Center Circular White Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl transition-all duration-300 transform group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white play-pulse">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Photography Section (Fits Full Screen View) */}
      <section id="view-photo" className="snap-section min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-neutral-900 dark:text-white pt-16 pb-6">
        <div className="max-w-5xl mx-auto w-full my-auto">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-3">
            {t('pages.projectView.photography')}
          </span>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {photos.map((photo, index) => (
              <div
                key={`photo-${photo.id}`}
                onClick={() => onOpenLightbox && onOpenLightbox(photos, index)}
                className="group relative aspect-square max-h-[190px] sm:max-h-[240px] rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer shadow-sm transition-all hover:shadow-md"
              >
                <CloudImg
                  src={cldGrid(photo.image)}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full"
                  imgClass="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Backstage Section (Fits Full Screen View) */}
      <section id="view-backstage" className="snap-section min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-neutral-900 dark:text-white pt-16 pb-6">
        <div className="max-w-5xl mx-auto w-full my-auto">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-3">
            {t('pages.projectView.backstage')}
          </span>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {backstagePhotos.map((photo, index) => (
              <div
                key={`backstage-${photo.id}`}
                onClick={() => onOpenLightbox && onOpenLightbox(backstagePhotos, index)}
                className="group relative aspect-square max-h-[190px] sm:max-h-[240px] rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer shadow-sm transition-all hover:shadow-md"
              >
                <CloudImg
                  src={cldGrid(photo.image)}
                  alt={`Backstage ${photo.title}`}
                  className="absolute inset-0 w-full h-full"
                  imgClass="w-full h-full object-cover object-center filter contrast-105 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Project Details & Text Section + Footer (Fits Full Screen View) */}
      <section id="view-details" className="snap-section min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-neutral-900 dark:text-white pt-16 pb-0 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full my-auto py-6">
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 sm:pt-8 space-y-5 sm:space-y-6">
            {/* Row 1: Description */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-start">
              <div className="sm:col-span-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-neutral-700 dark:text-neutral-300 block">
                  {t('pages.projectView.description')}
                </span>
              </div>
              <div className="sm:col-span-9">
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                  {projectData.description}
                </p>
              </div>
            </div>

            {/* Row 2: Our Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-start">
              <div className="sm:col-span-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-neutral-700 dark:text-neutral-300 block">
                  {t('pages.projectView.solution')}
                </span>
              </div>
              <div className="sm:col-span-9">
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                  {projectData.solution}
                </p>
              </div>
            </div>

            {/* Row 3: Link */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-start">
              <div className="sm:col-span-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-neutral-700 dark:text-neutral-300 block">
                  {t('pages.projectView.link')}
                </span>
              </div>
              <div className="sm:col-span-9">
                <a
                  href={projectData.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs sm:text-sm font-bold text-brand-red hover:underline"
                >
                  <span>{projectData.link || 'https://luminacore.analytics.devotix.io'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Consistent White Footer */}
        <Footer onOpenPolicy={onOpenPolicy} />
      </section>
    </div>
  );
}
