import React, { useState, useEffect } from 'react';
import { X, Play, Maximize2, Film, Sparkles, Check } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function MoreVideosModal({ isOpen, onClose, onPlayVideo, allVideos, initialCategory = 'all' }) {
  const { isRtl, t } = useThemeLanguage();
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', labelEn: 'ALL PRODUCTIONS', labelAr: 'جميع الأعمال' },
    { id: 'automotive', labelEn: 'AUTOMOTIVE & CGI', labelAr: 'السيارات والـ 3D' },
    { id: 'tech', labelEn: 'TECH & HARDWARE', labelAr: 'التقنية والأجهزة' },
    { id: 'fashion', labelEn: 'FASHION & EDITORIAL', labelAr: 'الموضة والإخراج' },
    { id: 'food', labelEn: 'FOOD & BEVERAGE', labelAr: 'الأطعمة والمشروبات' },
  ];

  const safeVideos = Array.isArray(allVideos) ? allVideos : [];
  const filteredVideos = activeCategory === 'all'
    ? safeVideos
    : safeVideos.filter((v) => v?.group === activeCategory);

  return (
    <div className="more-videos-backdrop animate-fadeIn" onClick={onClose}>
      <div
        className="more-videos-dialog animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-neutral-800 bg-[#0a0a0a] flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-8 h-8 rounded-lg bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-red font-display">
                  {isRtl ? 'أرشيف الإنتاج السينمائي' : 'DEVOTIX CINEMA VAULT'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white font-display">
                {isRtl ? 'جميع الأفلام والإعلانات السينمائية' : 'ALL COMMERCIAL & CINEMA FILMS'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-brand-red text-neutral-400 hover:text-white border border-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Tabs Bar */}
        <div className="more-videos-tabs-bar">
          <div className="more-videos-tabs-wrapper">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`category-tab-btn ${isActive ? 'active' : 'inactive'}`}
                >
                  {isRtl ? cat.labelAr : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Video Grid Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#050505]">
          <div className="video-grid">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="video-card"
                onClick={() => {
                  onPlayVideo(video);
                }}
              >
                <div className="video-aspect-container">
                  {video.videoSrc ? (
                    <video
                      poster={video.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      ref={(el) => {
                        if (el) {
                          el.defaultMuted = true;
                          el.muted = true;
                          el.play().catch(() => {});
                        }
                      }}
                      onLoadedData={(e) => {
                        e.currentTarget.muted = true;
                        e.currentTarget.play().catch(() => {});
                      }}
                      onCanPlay={(e) => {
                        e.currentTarget.muted = true;
                        e.currentTarget.play().catch(() => {});
                      }}
                      className="w-full h-full object-cover"
                    >
                      <source src={video.videoSrc} type={video.videoSrc.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                      {video.videoSrc.endsWith('.mov') && (
                        <source src="/assets/production/video1.mp4" type="video/mp4" />
                      )}
                    </video>
                  ) : (
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="video-gradient-overlay" />

                  {/* Top Tag Badge */}
                  <div className="video-tag-badge">
                    {video.tag || '4K CINEMA'}
                  </div>

                  {/* Expand Icon Top Right */}
                  <div className="video-expand-icon">
                    <div className="video-expand-icon-btn">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="video-card-info">
                    <div>
                      <span className="video-card-category">
                        {isRtl ? video.categoryAr || video.category : video.category}
                      </span>
                      <h4 className="video-card-title">
                        {isRtl ? video.titleAr || video.title : video.title}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-1.5 rtl:space-x-reverse bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-[10px] font-mono text-neutral-300">
                      <Play className="w-2.5 h-2.5 fill-brand-red text-brand-red" />
                      <span>{video.duration || '02:30'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#0a0a0a] border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-400">
          <span className="text-[10px] uppercase tracking-wider font-semibold">
            {isRtl ? 'وحدة الإنتاج السينمائي والمؤثرات البصرية في ديفوتيكس ميديا' : 'Devotix Media Cinema & Visual Production Unit'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-900 hover:bg-brand-red text-neutral-300 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border border-neutral-800"
          >
            {isRtl ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
