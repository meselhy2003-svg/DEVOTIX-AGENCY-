import React from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Play } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function Hero({ onOpenPortfolio, onOpenContact, onScrollToWork, onPlayVideo }) {
  const { isRtl, isDark, t } = useThemeLanguage();

  const handlePlayShowreel = () => {
    if (onPlayVideo) {
      onPlayVideo({
        id: 'devotix-hero-showreel',
        title: t('hero.reelModalTitle', 'DEVOTIX SHOWREEL 2026'),
        category: 'COMMERCIAL PRODUCTION • REEL',
        duration: '00:30',
        image: '/assets/production/featured-car.png',
        videoSrc: '/assets/hero/who_.mp4',
        videoUrl: '/assets/hero/who_.mp4',
        isVertical: true,
        description: t('hero.tagline', 'Experience our 2026 director showreel featuring cinematic commercial productions and 3D VFX simulations.')
      });
    }
  };


  return (
    <section
      id="home"
      className="snap-section min-h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 section-alt-a overflow-hidden pt-14 pb-8 select-none"
    >
      {/* Studio background image & subtle transparent gradient overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/landing/hero-bg.png"
          alt="Creative Studio Background"
          className="w-full h-full object-cover object-center opacity-45 sm:opacity-50 dark:opacity-60 filter contrast-110"
        />
        {/* Transparent gradient texture overlay from assets */}
        <img
          src="/assets/landing/gradient.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15 dark:opacity-25 mix-blend-screen pointer-events-none"
        />
        {/* Balanced, non-intrusive gradient for text contrast and seamless bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/80 dark:from-black/50 dark:via-black/30 dark:to-black pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl w-full mx-auto my-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 px-2 sm:px-4">
        {/* Text Column (Beside video on desktop) */}
        <div className="flex-1 text-center lg:text-start flex flex-col items-center lg:items-start max-w-2xl">
          {/* Prominent Sleek Headline */}
          {isRtl ? (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.4] sm:leading-[1.35] md:leading-[1.3] text-black dark:text-white font-display">
              خلّي براندك
              <br />
              <span className="bg-[linear-gradient(90deg,#000000_5%,#1F2937_30%,#4B5563_65%,#6B7280_100%)] dark:bg-[linear-gradient(90deg,#FFFFFF_5%,#E4E4E7_30%,#71717A_65%,#3F3F46_100%)] bg-clip-text text-transparent inline-block drop-shadow-sm">
                مستحيل
                <br />
                يتجاهلوه.
              </span>
            </h1>
          ) : (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.06] text-black dark:text-white font-display">
              MAKE YOUR BRAND
              <br />
              <span className="bg-[linear-gradient(90deg,#000000_5%,#1F2937_30%,#4B5563_65%,#6B7280_100%)] dark:bg-[linear-gradient(90deg,#FFFFFF_5%,#E4E4E7_30%,#71717A_65%,#3F3F46_100%)] bg-clip-text text-transparent inline-block drop-shadow-sm">
                IMPOSSIBLE TO
                <br />
                IGNORE.
              </span>
            </h1>
          )}

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 max-w-xl text-xs sm:text-sm md:text-base text-neutral-700 dark:text-neutral-300 font-medium tracking-wide uppercase leading-relaxed rtl:leading-[1.85] text-center lg:text-start">
            {t('hero.tagline', 'WE ARE A FULL-SERVICE CREATIVE MEDIA AGENCY DRIVEN BY DATA, CRAFTED WITH PASSION, AND COMMITTED TO MAKING BRANDS UNFORGETTABLE.')}
          </p>

          {/* Two Call-to-Action Buttons */}
          <div className="mt-6 sm:mt-7 flex flex-row items-center gap-3.5 w-auto justify-center lg:justify-start">
            <button
              onClick={onScrollToWork}
              className="px-6 py-2.5 sm:px-7 sm:py-3 bg-brand-red hover:bg-brand-redHover text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md transition-all duration-300 transform hover:scale-105 shadow-md shadow-red-600/30 flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer"
            >
              <span>{t('hero.exploreWork', 'EXPLORE OUR PROJECTS')}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>

            <button
              onClick={onOpenContact}
              className="px-6 py-2.5 sm:px-7 sm:py-3 bg-white/60 dark:bg-transparent hover:bg-white dark:hover:bg-white/10 text-neutral-900 dark:text-white border border-neutral-300 dark:border-white/40 hover:border-neutral-900 dark:hover:border-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2 rtl:space-x-reverse group cursor-pointer shadow-sm dark:shadow-none"
            >
              <span>{t('nav.letsTalk', "LET'S TALK")}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-900 dark:text-white group-hover:scale-110 transition-transform rtl:rotate-[-90deg]" />
            </button>
          </div>
        </div>

        {/* Video Column (Beside text on desktop) */}
        <div className="shrink-0 flex flex-col items-center justify-center mt-6 lg:mt-0">
          <div
            onClick={handlePlayShowreel}
            className="relative w-full max-w-[215px] sm:max-w-[230px] lg:max-w-[240px] xl:max-w-[260px] aspect-[9/16] rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-800 hover:border-brand-red/80 shadow-[0_15px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer group transition-all duration-300 transform hover:scale-105"
          >
            <video
              src="/assets/hero/who_.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              ref={(el) => {
                if (el) {
                  el.defaultMuted = true;
                  el.muted = true;
                  el.play().catch(() => { });
                }
              }}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            {/* Central Pulsing Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg shadow-red-600/50 group-hover:scale-110 transition-transform">
                <Play className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
              </div>
            </div>

            {/* Top/Bottom Badges */}
            <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 pointer-events-none">
              <span className="px-2.5 py-0.5 bg-black/70 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-white border border-white/10">
                REEL
              </span>
            </div>
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-white">
                {t('hero.watchReel', 'WATCH REEL')}
              </span>
              <span className="text-[9.5px] font-mono text-neutral-300">
                1:00
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scroll Down Indicator */}
      <button
        onClick={onScrollToWork}
        className="relative z-20 flex flex-col items-center group cursor-pointer opacity-70 hover:opacity-100 transition-opacity mt-auto mb-2"
        aria-label="Scroll to work"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 font-bold mb-0.5 group-hover:text-brand-red transition-colors">
          {isRtl ? 'تمرير' : 'SCROLL'}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-brand-red animate-bounce" />
      </button>
    </section>
  );
}
