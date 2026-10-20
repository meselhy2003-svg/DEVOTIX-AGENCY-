import React, { useState, useEffect } from 'react';
import TitleAccent from './TitleAccent';
import { Eye, TrendingUp, Play, Heart, Share2, Flame, Sparkles } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { getContentViewsData } from '../data/contentViewsData';

export default function ContentViewsSection({ onPlayVideo }) {
  const { isRtl, isDark, t } = useThemeLanguage();
  const [items, setItems] = useState(getContentViewsData);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) {
        setItems(e.detail);
      } else {
        setItems(getContentViewsData());
      }
    };
    window.addEventListener('devotix_content_views_updated', handleUpdate);
    return () => window.removeEventListener('devotix_content_views_updated', handleUpdate);
  }, []);

  const filters = [
    { id: 'all', label: isRtl ? 'جميع المنصات' : 'All Platforms' },
    { id: 'reels', label: isRtl ? 'إنستغرام ريلز' : 'Instagram Reels' },
    { id: 'tiktok', label: isRtl ? 'تيك توك' : 'TikTok' },
    { id: 'shorts', label: isRtl ? 'يوتيوب شورتس' : 'YouTube Shorts' },
  ];

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'reels') return item.platform === 'instagram';
    if (activeFilter === 'tiktok') return item.platform === 'tiktok';
    if (activeFilter === 'shorts') return item.platform === 'youtube';
    return true;
  });

  return (
    <section
      id="content-views"
      className="relative w-full py-16 sm:py-24 bg-white dark:bg-[#070709] transition-colors duration-300 border-t border-neutral-200/80 dark:border-white/5 overflow-hidden select-none"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-red/5 dark:bg-brand-red/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs sm:text-sm font-bold tracking-wider uppercase mb-4 animate-pulse">
            <Flame className="w-4 h-4 text-brand-red" />
            <span>{isRtl ? 'أرقام مشاهدات حية وتأثير استثنائي' : 'VIRAL REACH & AUDIENCE IMPACT'}</span>
          </div>

          <TitleAccent
            title={isRtl ? 'فيوهات الكونتنت والانتشار الفيروسي' : 'CONTENT VIEWS & VIRAL REACH'}
            subtitle={
              isRtl
                ? 'نصنع محتوى لا يُشاهد فقط، بل ينتشر ويحقق ملايين المشاهدات العضوية لعملائنا في مختلف المجالات.'
                : 'We produce content engineered to capture attention, maximize watch time, and amass millions of organic views.'
            }
            align="center"
          />
        </div>

        {/* 1. High-Impact Stats Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-12 sm:mb-16">
          {/* Stat 1 */}
          <div className="relative group p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-[#0e0e13] border border-neutral-200/80 dark:border-white/10 hover:border-brand-red/40 dark:hover:border-brand-red/50 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-3">
              <Eye className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-display">
              +48.6M
            </div>
            <p className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-1">
              {isRtl ? 'إجمالي المشاهدات المحققة' : 'Total Video Views'}
            </p>
          </div>

          {/* Stat 2 */}
          <div className="relative group p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-[#0e0e13] border border-neutral-200/80 dark:border-white/10 hover:border-brand-red/40 dark:hover:border-brand-red/50 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-display">
              +14.2M
            </div>
            <p className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-1">
              {isRtl ? 'إجمالي التفاعلات والإعجابات' : 'Total Engagements & Likes'}
            </p>
          </div>

          {/* Stat 3 */}
          <div className="relative group p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-[#0e0e13] border border-neutral-200/80 dark:border-white/10 hover:border-brand-red/40 dark:hover:border-brand-red/50 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-display">
              +92.5M
            </div>
            <p className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-1">
              {isRtl ? 'إجمالي الوصول والظهور' : 'Total Impressions & Reach'}
            </p>
          </div>

          {/* Stat 4 */}
          <div className="relative group p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-[#0e0e13] border border-neutral-200/80 dark:border-white/10 hover:border-brand-red/40 dark:hover:border-brand-red/50 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-display">
              +340%
            </div>
            <p className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-1">
              {isRtl ? 'متوسط نمو حسابات العملاء' : 'Avg. Client Growth Rate'}
            </p>
          </div>
        </div>

        {/* 2. Platform Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/25 scale-105'
                  : 'bg-neutral-100 dark:bg-[#14141b] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#1c1c25] border border-neutral-200/80 dark:border-white/5'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* 3. Interactive Reels & Videos Showcase Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onPlayVideo && onPlayVideo(item)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-[#0f0f14] border border-neutral-200/80 dark:border-white/10 hover:border-brand-red/60 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer flex flex-col hover:-translate-y-1.5"
            >
              {/* Thumbnail Container (Reels Aspect 9:16) */}
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={isRtl ? item.titleAr : item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

                {/* Top Badge: Views Counter */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 z-10">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white shadow-lg">
                    <Eye className="w-3.5 h-3.5 text-brand-red animate-pulse" />
                    <span className="text-[11px] sm:text-xs font-black tracking-wide">{item.views}</span>
                  </div>

                  <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-brand-red text-white uppercase tracking-wider shadow">
                    {isRtl ? item.tagAr : item.tag}
                  </span>
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-brand-red/90 text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-brand-red transition-all duration-300">
                    <Play className="w-5 h-5 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Video Meta inside Thumbnail */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 space-y-1.5 text-white">
                  <span className="text-[10px] uppercase font-bold text-neutral-300 tracking-wider line-clamp-1">
                    {item.client}
                  </span>
                  <h4 className="text-xs sm:text-[13px] font-bold leading-snug line-clamp-2 text-white group-hover:text-brand-red transition-colors">
                    {isRtl ? item.titleAr : item.title}
                  </h4>

                  {/* Likes & Shares Strip */}
                  <div className="flex items-center justify-between pt-1 text-[10.5px] font-medium text-neutral-300 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-3 h-3 text-neutral-300" />
                      {item.shares}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
