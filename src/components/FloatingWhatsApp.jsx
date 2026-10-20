import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { getSocialLinks } from '../data/socialLinks';

export default function FloatingWhatsApp() {
  const { isRtl, t } = useThemeLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileWhatsAppOpen, setIsMobileWhatsAppOpen] = useState(false);
  const [socials, setSocials] = useState(getSocialLinks);

  const desktopDropdownRef = useRef(null);
  const mobilePopupRef = useRef(null);

  // Sync social links from storage or cloud
  useEffect(() => {
    const handleUpdate = () => {
      setSocials(getSocialLinks());
    };
    window.addEventListener('devotix_social_links_updated', handleUpdate);
    return () => window.removeEventListener('devotix_social_links_updated', handleUpdate);
  }, []);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (mobilePopupRef.current && !mobilePopupRef.current.contains(e.target)) {
        setIsMobileWhatsAppOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsMobileWhatsAppOpen(false);
      }
    };

    if (isOpen || isMobileWhatsAppOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isMobileWhatsAppOpen]);

  const egyptPhone = socials.whatsappEgypt || '+20 101 018 5181';
  const saudiPhone = socials.whatsappSaudi || '+966 55 866 1845';

  const egyptUrl = egyptPhone.startsWith('http')
    ? egyptPhone
    : `https://wa.me/${egyptPhone.replace(/\D/g, '') || '201010185181'}?text=` +
      encodeURIComponent(
        isRtl
          ? 'مرحباً ديفوتيكس، أود الاستفسار عن خدماتكم الإبداعية في مصر.'
          : 'Hello Devotix, I would like to inquire about your creative services in Egypt.'
      );

  const saudiUrl = saudiPhone.startsWith('http')
    ? saudiPhone
    : `https://wa.me/${saudiPhone.replace(/\D/g, '') || '966558661845'}?text=` +
      encodeURIComponent(
        isRtl
          ? 'مرحباً ديفوتيكس، أود الاستفسار عن خدماتكم الإبداعية في السعودية.'
          : 'Hello Devotix, I would like to inquire about your creative services in Saudi Arabia.'
      );

  const branches = [
    {
      id: 'egypt',
      country: isRtl ? 'فرع مصر' : 'Egypt Studio',
      flag: '🇪🇬',
      location: isRtl ? 'القاهرة / التجمع الخامس' : 'Cairo / New Cairo',
      phoneDisplay: egyptPhone.startsWith('http') ? '+20 101 018 5181' : egyptPhone,
      link: egyptUrl,
    },
    {
      id: 'saudi',
      country: isRtl ? 'فرع السعودية' : 'Saudi Arabia Branch',
      flag: '🇸🇦',
      location: isRtl ? 'الرياض / المملكة' : 'Riyadh / KSA',
      phoneDisplay: saudiPhone.startsWith('http') ? '+966 55 866 1845' : saudiPhone,
      link: saudiUrl,
    },
  ];

  // Mobile Floating Social Media Bar (Exact CanGrow Layout: Facebook, Instagram, TikTok, WhatsApp, LinkedIn)
  const mobileSocialList = [
    {
      key: 'facebook',
      name: 'Facebook',
      bgClass: 'bg-[#1877F2]',
      href: socials.facebook || 'https://facebook.com/devotixmedia',
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      key: 'instagram',
      name: 'Instagram',
      bgClass: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      href: socials.instagram || 'https://instagram.com/devotixmedia',
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      key: 'tiktok',
      name: 'TikTok',
      bgClass: 'bg-black border border-white/10',
      href: socials.tiktok || 'https://tiktok.com/@devotixmedia',
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
    {
      key: 'whatsapp',
      name: 'WhatsApp',
      bgClass: 'bg-[#25D366]',
      isWhatsAppTrigger: true,
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M12.031 0C5.394 0 0 5.393 0 12.031c0 2.12.553 4.184 1.603 6.007L.068 24l6.156-1.615a12.022 12.022 0 005.807 1.493h.005c6.636 0 12.029-5.394 12.029-12.031C24.065 5.393 18.672 0 12.031 0zm-.005 21.84a9.85 9.85 0 01-5.024-1.381l-.36-.214-3.733.979.996-3.64-.235-.374a9.845 9.845 0 01-1.507-5.18c0-5.437 4.423-9.86 9.864-9.86 2.635 0 5.111 1.026 6.974 2.89a9.805 9.805 0 012.886 6.97c0 5.438-4.423 9.86-9.861 9.86zm5.405-7.377c-.296-.149-1.753-.865-2.024-.964-.272-.1-.47-.149-.668.149-.198.297-.768.964-.94 1.162-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.753-.717 2.001-1.41.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        </svg>
      ),
    },
    {
      key: 'linkedin',
      name: 'LinkedIn',
      bgClass: 'bg-[#0A66C2]',
      href: socials.linkedin || 'https://linkedin.com/company/devotixmedia',
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. MOBILE VIEW: Vertical Sticky Social Sidebar (Exact CanGrow Design)     */}
      {/* ========================================================================= */}
      <div className="md:hidden fixed right-0.5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-1.5 select-none pointer-events-auto">
        {/* WhatsApp Mobile Popup Card */}
        {isMobileWhatsAppOpen && (
          <div
            ref={mobilePopupRef}
            className="absolute right-12 top-1/2 -translate-y-1/2 w-72 max-w-[calc(100vw-54px)] bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-scaleUp text-neutral-900 dark:text-white z-50"
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center p-1 border border-white/20">
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M12.031 0C5.394 0 0 5.393 0 12.031c0 2.12.553 4.184 1.603 6.007L.068 24l6.156-1.615a12.022 12.022 0 005.807 1.493h.005c6.636 0 12.029-5.394 12.029-12.031C24.065 5.393 18.672 0 12.031 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase font-display">
                    {isRtl ? 'تواصل عبر واتساب' : 'WhatsApp Chat'}
                  </h4>
                  <p className="text-[9px] text-emerald-200 font-medium">
                    {isRtl ? 'متاحين للرد السريع ⚡' : 'Quick reply ⚡'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileWhatsAppOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Branch Options */}
            <div className="p-2.5 space-y-2 bg-neutral-50 dark:bg-neutral-900/60">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block px-1">
                {isRtl ? 'اختر الدولة / الفرع:' : 'Select Branch:'}
              </span>
              {branches.map((b) => (
                <a
                  key={b.id}
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileWhatsAppOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-neutral-200 dark:border-neutral-800 transition-all group"
                >
                  <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                    <span className="text-xl">{b.flag}</span>
                    <div>
                      <h5 className="text-xs font-bold text-neutral-900 dark:text-white font-display">
                        {b.country}
                      </h5>
                      <p className="text-[9.5px] text-neutral-500 dark:text-neutral-400 font-mono">
                        {b.phoneDisplay}
                      </p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <ArrowUpRight className="w-3 h-3 rtl:rotate-[-90deg]" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Vertical Icon List */}
        {mobileSocialList.map((item) => {
          if (item.isWhatsAppTrigger) {
            return (
              <button
                key={item.key}
                onClick={() => setIsMobileWhatsAppOpen(!isMobileWhatsAppOpen)}
                className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${item.bgClass} shadow-md shadow-black/25 text-white active:scale-90 hover:scale-105 transition-all duration-200 cursor-pointer touch-manipulation`}
                aria-label="WhatsApp Contact Options"
              >
                {item.icon}
                {/* Active indicator dot */}
                <span className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-emerald-300 border border-white" />
              </button>
            );
          }

          return (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${item.bgClass} shadow-md shadow-black/25 text-white active:scale-90 hover:scale-105 transition-all duration-200 cursor-pointer touch-manipulation`}
              aria-label={item.name}
            >
              {item.icon}
            </a>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP VIEW: Classic Bottom-Corner Floating WhatsApp (Desktop only)  */}
      {/* ========================================================================= */}
      <div
        ref={desktopDropdownRef}
        className={`hidden md:block fixed bottom-6 ${
          isRtl ? 'right-8' : 'left-8'
        } z-50 select-none transition-all duration-300`}
      >
        {/* WhatsApp Branches Popup Card */}
        {isOpen && (
          <div
            className={`absolute bottom-16 ${
              isRtl ? 'right-0' : 'left-0'
            } w-80 sm:w-88 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-scaleUp text-neutral-900 dark:text-white mb-2`}
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-1.5 border border-white/20">
                  <img
                    src="/assets/contact/WhatsApp.png"
                    alt="WhatsApp Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <MessageCircle className="w-5 h-5 text-white hidden" />
                  <span
                    className={`absolute bottom-0 ${
                      isRtl ? 'left-0' : 'right-0'
                    } w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#075E54]`}
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black tracking-tight uppercase font-display">
                    {isRtl ? 'تواصل معنا عبر واتساب' : 'Chat via WhatsApp'}
                  </h4>
                  <p className="text-[10px] text-emerald-200 font-medium">
                    {isRtl ? 'متاحين للرد السريع ⚡' : 'Typically replies in minutes ⚡'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body: Choose Branch */}
            <div className="p-4 space-y-2.5 bg-neutral-50 dark:bg-neutral-900/50">
              <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-1">
                {isRtl ? 'اختر الدولة / الفرع المطلوب:' : 'Select Country / Branch:'}
              </span>

              {branches.map((branch) => (
                <a
                  key={branch.id}
                  href={branch.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-200 group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-2xl flex-shrink-0" role="img" aria-label={branch.country}>
                      {branch.flag}
                    </span>
                    <div>
                      <h5 className="text-xs sm:text-sm font-black text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-display">
                        {branch.country}
                      </h5>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
                        {branch.location} •{' '}
                        <span className="font-mono text-neutral-400 dark:text-neutral-500">
                          {branch.phoneDisplay}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-[-90deg]" />
                  </div>
                </a>
              ))}
            </div>

            {/* Footer note */}
            <div className="px-4 py-2.5 bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800/80 text-center">
              <p className="text-[9px] text-neutral-500 dark:text-neutral-400 font-medium">
                {isRtl
                  ? 'ديفوتيكس ميديا • شريكك الإبداعي في مصر والسعودية'
                  : 'Devotix Media • Egypt & Saudi Arabia'}
              </p>
            </div>
          </div>
        )}

        {/* Floating WhatsApp Action Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/20 touch-manipulation"
          aria-label="Open WhatsApp Chat with Egypt or Saudi Arabia branch"
        >
          {/* Pulsing Outer Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

          {/* WhatsApp Icon */}
          <div className="relative z-10 w-8 h-8 flex items-center justify-center">
            <img
              src="/assets/contact/WhatsApp.png"
              alt="WhatsApp"
              className="w-full h-full object-contain filter drop-shadow group-hover:rotate-6 transition-transform"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
              }}
            />
            <MessageCircle className="w-7 h-7 text-white hidden fill-white" />
          </div>

          {/* Online Green Indicator Dot */}
          <span
            className={`absolute top-0 ${
              isRtl ? 'left-0' : 'right-0'
            } w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-black`}
          />

          {/* Floating Tooltip Label */}
          {!isOpen && (
            <span
              className={`absolute ${
                isRtl ? 'right-16' : 'left-16'
              } whitespace-nowrap px-2.5 py-1 rounded-md bg-neutral-950/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md hidden sm:block`}
            >
              {isRtl ? 'تواصل عبر واتساب (مصر / السعودية)' : 'WhatsApp (Egypt / KSA)'}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
