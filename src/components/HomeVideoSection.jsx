import React, { useState } from 'react';
import { Play, Volume2, Sparkles, Film, ArrowUpRight } from 'lucide-react';

export default function HomeVideoSection({ onPlayVideo }) {
  const [isHovered, setIsHovered] = useState(false);

  const showreelVideo = {
    id: 'devotix-showreel-2026',
    title: "DEVOTIX MEDIA 2026 DIRECTOR'S SHOWREEL",
    category: 'CINEMA PRODUCTION • 3D VFX • BRAND COMMERCIALS',
    duration: '01:30',
    resolution: '4K CINEMA',
    youtubeId: '7xkk1GqBHi4',
    url: 'https://youtu.be/7xkk1GqBHi4',
    image: 'https://img.youtube.com/vi/7xkk1GqBHi4/maxresdefault.jpg',
    description: 'An executive director cut highlighting our latest cinematic commercial campaigns, brand identities, and high-energy visual productions.'
  };

  const handlePlay = () => {
    if (onPlayVideo) {
      onPlayVideo(showreelVideo);
    }
  };

  return (
    <section
      id="showreel"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-[#09090b] text-white py-16 sm:py-20 border-y border-neutral-800/80 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 my-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-brand-red font-display">
                AGENCY SHOWREEL • 2026
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-display leading-[1.05]">
              WE BRING VISIONS
              <br />
              TO LIFE.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-md leading-relaxed">
            Experience our 2026 director's cut showreel featuring cinematic commercial productions, 3D VFX simulations, and award-winning visual campaigns.
          </p>
        </div>

        {/* Cinematic Video Card */}
        <div
          onClick={handlePlay}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer transition-all duration-500 hover:border-brand-red/60"
        >
          {/* Main Video Poster / Screen */}
          <div className="relative aspect-[16/9] max-h-[500px] w-full overflow-hidden bg-black">
            <img
              src={showreelVideo.image}
              alt={showreelVideo.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
            />

            {/* Gradient Dark Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

            {/* Pulsing Central Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex items-center justify-center">
                {/* Outer Ripple Rings */}
                <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-brand-red/25 animate-ping" />
                <div className="absolute w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-brand-red/40" />

                {/* Core Play Pill */}
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-brand-red hover:bg-brand-redHover text-white flex items-center justify-center shadow-xl shadow-red-600/40 transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                </div>
              </div>
            </div>

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-white border border-white/10">
                4K ULTRA HD
              </span>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-brand-red/90 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                  WATCH FILM (02:45)
                </span>
              </div>
            </div>

            {/* Bottom Title Bar Inside Image */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                  COMMERCIAL REEL
                </span>
                <h3 className="text-base sm:text-2xl font-black uppercase tracking-tight text-white font-display">
                  DEVOTIX MEDIA SHOWREEL
                </h3>
              </div>

              <div className="hidden sm:flex items-center space-x-1 text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <span>CLICK TO PLAY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Bottom Details Footer Row on Card */}
          <div className="p-4 sm:p-5 bg-[#0e0e11] border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-neutral-400 font-medium">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-semibold uppercase tracking-wider text-neutral-300">
              <span>• 3D CGI</span>
              <span>• CINEMA PRODUCTION</span>
              <span>• COMMERCIAL FILMS</span>
              <span>• SOUND DESIGN</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlay();
              }}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-red hover:text-white transition-colors uppercase cursor-pointer"
            >
              <span>Play Fullscreen</span>
              <Play className="w-3 h-3 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
