import React, { useState, useEffect } from 'react';
import TitleAccent from './TitleAccent';
import { Play, X, Film, ArrowUpRight, Maximize2 } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { getProductionGalleries } from '../data/productionData';

export default function Production({ onPlayVideo }) {
  const { isRtl, t } = useThemeLanguage();
  const [galleries, setGalleries] = useState(getProductionGalleries);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [activeInlineVideoId, setActiveInlineVideoId] = useState(null);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) {
        setGalleries(e.detail);
      } else {
        setGalleries(getProductionGalleries());
      }
    };
    window.addEventListener('devotix_production_updated', handleUpdate);
    return () => window.removeEventListener('devotix_production_updated', handleUpdate);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedGallery(null);
        setActiveInlineVideoId(null);
      }
    };
    if (selectedGallery) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedGallery]);

  const cover1 = galleries[0] || {}; // REELS
  const cover2 = galleries[1] || {}; // PROMOS
  const cover3 = galleries[2] || {}; // EDITS VIDEOS
  const cover4 = galleries[3] || {}; // IDEAS & ADS

  const handleOpenGallery = (gallery) => {
    setSelectedGallery(gallery);
    setActiveInlineVideoId(null);
  };

  const handleVideoClick = (video) => {
    if (onPlayVideo) {
      onPlayVideo(video);
    }
  };

  const handleInlineIframeToggle = (videoId, e) => {
    e.stopPropagation();
    setActiveInlineVideoId((prev) => (prev === videoId ? null : videoId));
  };

  return (
    <section
      id="production"
      className="snap-section relative flex flex-col justify-center section-alt-b px-3.5 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-14 select-none overflow-hidden"
    >
      {/* Ambient cinema backlight glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-red/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-red-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 pb-3 border-b border-neutral-300/80 dark:border-white/10">
          <TitleAccent type="production" />
          <p className="mt-2 text-xs sm:text-sm md:text-[14.5px] text-neutral-600 dark:text-neutral-400 font-medium uppercase tracking-wider leading-relaxed">
            {isRtl
              ? 'أفلام سينمائية ترويجية، ريلز وشورتس، مونتاج احترافي، وأفكار إعلانية متكاملة.'
              : 'Promos, vertical reels, post-production editing, and creative advertising campaigns.'}
          </p>
        </div>

        {/* 3-Column Production Covers Layout (2x2 Grid on Mobile | 3-Column on Desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-2.5 sm:gap-4 lg:gap-5 items-stretch">
          {/* Cover 1: REELS (Left Tall Vertical Card on Desktop / Top-Left Card on Mobile) */}
          <div
            onClick={() => handleOpenGallery(cover1)}
            className="md:col-span-4 group relative rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-white/10 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-xl hover:-translate-y-0.5 flex flex-col h-[180px] sm:h-[220px] md:h-[450px]"
          >
            <img
              src={cover1.coverImage}
              alt={cover1.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

            {/* Gallery Badge Top Right */}
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 rtl:right-auto rtl:left-2 rtl:sm:left-3 z-10">
              <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                <Film className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white" />
                <span>{isRtl ? 'ريلز 9:16' : 'REELS 9:16'}</span>
                <ArrowUpRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white rtl:rotate-[-90deg]" />
              </div>
            </div>

            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-brand-red text-white flex items-center justify-center shadow-xl shadow-red-600/40 transition-all duration-300 transform group-hover:scale-110">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
              </div>
            </div>

            {/* Cover Metadata Bottom */}
            <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 z-10">
              <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                {isRtl ? cover1.categoryAr : cover1.category}
              </span>
              <h4 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-tight text-white font-display line-clamp-1">
                {isRtl ? cover1.titleAr : cover1.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                <span>{cover1.videos.length} {isRtl ? 'فيديوهات ريلز' : 'REELS'}</span>
                <span className="hidden xs:inline">• {isRtl ? 'انقر للمشاهدة' : 'Click to View'}</span>
              </p>
            </div>
          </div>

          {/* Center Column: PROMOS (Top) & EDITS VIDEOS (Bottom) */}
          <div className="contents md:flex md:col-span-4 md:flex-col md:gap-3 sm:md:gap-4 lg:md:gap-5 md:justify-between md:h-[450px]">
            {/* Cover 2: PROMOS */}
            <div
              onClick={() => handleOpenGallery(cover2)}
              className="group relative rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/80 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-lg flex flex-col h-[180px] sm:h-[220px] md:h-auto md:flex-1 min-h-0"
            >
              <img
                src={cover2.coverImage}
                alt={cover2.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Gallery Badge Top Right */}
              <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 rtl:right-auto rtl:left-2 rtl:sm:left-2.5 z-10">
                <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                  <Film className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  <span>{isRtl ? 'برومو' : 'PROMOS'}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 rtl:rotate-[-90deg]" />
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg shadow-red-600/40 transition-all duration-300 transform group-hover:scale-110">
                  <Play className="w-4 h-4 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
                </div>
              </div>

              {/* Cover Metadata Bottom */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                  {isRtl ? cover2.categoryAr : cover2.category}
                </span>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-display line-clamp-1">
                  {isRtl ? cover2.titleAr : cover2.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>{cover2.videos.length} {isRtl ? 'أفلام برومو' : 'FILMS'}</span>
                  <span className="hidden xs:inline">• {isRtl ? 'انقر للمشاهدة' : 'Click to View'}</span>
                </p>
              </div>
            </div>

            {/* Cover 3: EDITS VIDEOS */}
            <div
              onClick={() => handleOpenGallery(cover3)}
              className="group relative rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/80 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-lg flex flex-col h-[180px] sm:h-[220px] md:h-auto md:flex-1 min-h-0"
            >
              <img
                src={cover3.coverImage}
                alt={cover3.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Gallery Badge Top Right */}
              <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 rtl:right-auto rtl:left-2 rtl:sm:left-2.5 z-10">
                <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                  <Film className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  <span>{isRtl ? 'مونتاج' : 'EDITS'}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 rtl:rotate-[-90deg]" />
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg shadow-red-600/40 transition-all duration-300 transform group-hover:scale-110">
                  <Play className="w-4 h-4 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
                </div>
              </div>

              {/* Cover Metadata Bottom */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                  {isRtl ? cover3.categoryAr : cover3.category}
                </span>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-display line-clamp-1">
                  {isRtl ? cover3.titleAr : cover3.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>{cover3.videos.length} {isRtl ? 'أعمال مونتاج' : 'EDITS'}</span>
                  <span className="hidden xs:inline">• {isRtl ? 'انقر للمشاهدة' : 'Click to View'}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Cover 4: IDEAS & ADS (Right Tall Vertical Card on Desktop / Bottom-Right Card on Mobile) */}
          <div
            onClick={() => handleOpenGallery(cover4)}
            className="md:col-span-4 group relative rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/80 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-xl flex flex-col h-[180px] sm:h-[220px] md:h-[450px]"
          >
            <img
              src={cover4.coverImage}
              alt={cover4.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

            {/* Gallery Badge Top Right */}
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 rtl:right-auto rtl:left-2 rtl:sm:left-3 z-10">
              <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                <Film className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white" />
                <span>{isRtl ? 'أفكار وإعلانات' : 'IDEAS & ADS'}</span>
                <ArrowUpRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white rtl:rotate-[-90deg]" />
              </div>
            </div>

            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-brand-red text-white flex items-center justify-center shadow-xl shadow-red-600/40 transition-all duration-300 transform group-hover:scale-110">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
              </div>
            </div>

            {/* Cover Metadata Bottom */}
            <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 z-10">
              <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                {isRtl ? cover4.categoryAr : cover4.category}
              </span>
              <h4 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-tight text-white font-display line-clamp-1">
                {isRtl ? cover4.titleAr : cover4.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                <span>{cover4.videos.length} {isRtl ? 'حملات إعلانية' : 'ADS'}</span>
                <span className="hidden xs:inline">• {isRtl ? 'انقر للمشاهدة' : 'Click to View'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Gallery Modal: Opens when any of the 4 covers is clicked */}
      {selectedGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 bg-black/90 backdrop-blur-xl animate-fadeIn">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => {
              setSelectedGallery(null);
              setActiveInlineVideoId(null);
            }}
          />

          {/* Modal Content Window */}
          <div className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-neutral-900 dark:text-white">
            {/* Gallery Modal Header */}
            <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0c0c0e] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-brand-red font-display">
                    {isRtl ? selectedGallery.categoryAr : selectedGallery.category}
                  </span>
                  <span className="text-neutral-400 dark:text-neutral-500">•</span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {selectedGallery.videos.length} {isRtl ? 'أعمال معروضة' : 'PRODUCTIONS'}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display">
                  {isRtl ? selectedGallery.titleAr : selectedGallery.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium mt-1 max-w-2xl hidden sm:block">
                  {isRtl ? selectedGallery.descriptionAr : selectedGallery.description}
                </p>
              </div>

              {/* Gallery Switcher Tabs & Close Button */}
              <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse flex-shrink-0">
                {/* Quick Gallery Switcher Pills */}
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse p-1 bg-neutral-100 dark:bg-black/60 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-x-auto max-w-full">
                  {PRODUCTION_GALLERIES.map((gal) => (
                    <button
                      key={gal.id}
                      onClick={() => {
                        setSelectedGallery(gal);
                        setActiveInlineVideoId(null);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                        selectedGallery.id === gal.id
                          ? 'bg-brand-red text-white shadow-sm'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-900'
                      }`}
                    >
                      {isRtl ? gal.titleAr : gal.title}
                    </button>
                  ))}
                </div>

                {/* Close Modal Button */}
                <button
                  onClick={() => {
                    setSelectedGallery(null);
                    setActiveInlineVideoId(null);
                  }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-brand-red text-neutral-600 dark:text-neutral-400 hover:text-white border border-neutral-200 dark:border-neutral-800 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close Gallery"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Gallery Videos Professional Grid */}
            <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-140px)] bg-neutral-50 dark:bg-neutral-950">
              {/* Responsive layout: 9:16 vertical grid for Reels, 16:9 for Promos/Edits/Ads */}
              <div
                className={`grid gap-4 sm:gap-5 ${
                  selectedGallery.isVertical
                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                }`}
              >
                {selectedGallery.videos.map((video) => {
                  const isInlineActive = activeInlineVideoId === video.id;
                  return (
                    <div
                      key={video.id}
                      className="group relative rounded-xl overflow-hidden bg-white dark:bg-[#0d0d10] border border-neutral-200 dark:border-neutral-800/90 hover:border-brand-red/60 transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl"
                    >
                      {/* Video Player Display Container (iFrame or Thumbnail) */}
                      <div
                        className={`relative w-full overflow-hidden bg-black ${
                          video.isVertical ? 'aspect-[9/16]' : 'aspect-video'
                        }`}
                      >
                        {isInlineActive ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                            title={isRtl && video.titleAr ? video.titleAr : video.title}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : (
                          <div
                            onClick={() => handleVideoClick(video)}
                            className="relative w-full h-full cursor-pointer group/thumb"
                          >
                            <img
                              src={video.image}
                              alt={video.title}
                              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/thumb:scale-105 filter brightness-90 group-hover/thumb:brightness-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                            {/* Center Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-11 h-11 rounded-full bg-brand-red text-white flex items-center justify-center shadow-xl shadow-red-600/40 transition-transform duration-300 transform group-hover/thumb:scale-110">
                                <Play className="w-4 h-4 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
                              </div>
                            </div>

                            {/* Top Badges */}
                            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                              <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[8px] font-extrabold uppercase tracking-widest text-white border border-white/10">
                                {video.isVertical ? 'REEL 9:16' : '4K CINEMA'}
                              </span>
                              <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[8px] font-mono font-bold uppercase tracking-wider text-neutral-300 border border-white/10">
                                {video.duration}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Video Card Content */}
                      <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1 bg-white dark:bg-[#0e0e12]">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[8px] font-bold uppercase tracking-widest text-brand-red truncate">
                              {video.client}
                            </span>
                          </div>
                          <h4 className="text-xs font-black uppercase tracking-tight text-neutral-900 dark:text-white group-hover:text-brand-red transition-colors font-display line-clamp-1">
                            {isRtl && video.titleAr ? video.titleAr : video.title}
                          </h4>
                          {video.description && (
                            <p className="text-[9.5px] text-neutral-600 dark:text-neutral-400 font-medium mt-1 line-clamp-2 leading-relaxed">
                              {video.description}
                            </p>
                          )}
                        </div>

                        {/* Card Interactive Actions (Play iFrame or Fullscreen Cinema) */}
                        <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-[8.5px] font-bold uppercase tracking-wider">
                          <button
                            type="button"
                            onClick={() => handleVideoClick(video)}
                            className="flex items-center space-x-1 rtl:space-x-reverse text-neutral-600 dark:text-neutral-400 hover:text-brand-red dark:hover:text-white transition-colors cursor-pointer"
                          >
                            <Maximize2 className="w-2.5 h-2.5 text-brand-red" />
                            <span>{isRtl ? 'سينما' : 'POPUP'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleInlineIframeToggle(video.id, e)}
                            className="flex items-center space-x-1 rtl:space-x-reverse text-brand-red hover:underline font-extrabold cursor-pointer"
                          >
                            <span>{isInlineActive ? (isRtl ? 'إغلاق الفيديو' : 'CLOSE IFRAME') : (isRtl ? 'تشغيل iFrame' : 'PLAY IFRAME')}</span>
                            <ArrowUpRight className="w-3 h-3 rtl:rotate-[-90deg]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Gallery Modal Footer */}
            <div className="px-6 py-3 bg-neutral-50 dark:bg-[#0a0a0c] border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
              <span className="text-[10px] uppercase tracking-wider font-semibold">
                {isRtl ? 'إنتاج وحدة السينما والإعلانات في وكالة ديفوتيكس ميديا' : 'Produced by Devotix Media Commercial Video & Film Unit'}
              </span>
              <button
                onClick={() => {
                  setSelectedGallery(null);
                  setActiveInlineVideoId(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-900 hover:bg-brand-red text-neutral-900 dark:text-white hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {t('modals.close', 'Close Gallery')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
