import React from 'react';
import { Send, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function FloatingContactButton({ onNavigateContact, currentPage = 'home' }) {
  const { isRtl, t } = useThemeLanguage();

  const handleClick = () => {
    if (onNavigateContact) {
      onNavigateContact();
    } else {
      window.location.hash = '#contact';
    }
  };

  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 ${isRtl ? 'left-3 sm:left-8' : 'right-3 sm:right-8'} z-[80] select-none transition-all duration-300`}
    >
      <button
        onClick={handleClick}
        className="group relative flex items-center gap-1 sm:gap-2.5 px-2.5 py-1.5 sm:px-5 sm:py-3 rounded-full bg-brand-red hover:bg-brand-redHover text-white shadow-xl shadow-red-600/40 hover:shadow-red-600/70 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border sm:border-2 border-white/25 overflow-hidden touch-manipulation"
        aria-label="Navigate to Contact Form"
      >
        {/* Ambient background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

        {/* Pulsing Outer Glow */}
        <span className="absolute -inset-1 rounded-full bg-brand-red opacity-30 animate-ping pointer-events-none" />

        {/* Action Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <Send className="w-3 h-3 sm:w-4 sm:h-4 text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform rtl:group-hover:-translate-x-0.5" />
        </div>

        {/* Contact Text Label */}
        <span className="relative z-10 font-black text-[9.5px] sm:text-xs tracking-wide uppercase font-display whitespace-nowrap">
          {isRtl ? 'اطلب مشروعك' : "START PROJECT"}
        </span>

        {/* Arrow Accent */}
        <div className="relative z-10 w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:rotate-45">
          <ArrowUpRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white rtl:rotate-[-90deg]" />
        </div>
      </button>
    </div>
  );
}
