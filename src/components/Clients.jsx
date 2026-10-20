import React from 'react';
import TitleAccent from './TitleAccent';

// Brand logos sourced from "OUR CLIENT section/BRANDS LOGO"
const BRAND_LOGOS = [
  { id: '1', name: 'Al Ahram', logo: '/assets/clients/client-1.png' },
  { id: '2', name: 'CM', logo: '/assets/clients/client-2.png' },
  { id: '3', name: 'Brand Partner', logo: '/assets/clients/client-3.png' },
  { id: '4', name: 'Zeyara', logo: '/assets/clients/client-4.png' },
  { id: '5', name: 'Beirut', logo: '/assets/clients/client-5.png' },
  { id: '6', name: 'AS Electric', logo: '/assets/clients/client-6.png' },
  { id: '7', name: 'Devotix Client', logo: '/assets/clients/client-7.png' },
  { id: '8', name: 'Mila', logo: '/assets/clients/client-8.jpg' },
  { id: '9', name: 'Ogino', logo: '/assets/clients/client-9.png' },
  { id: '10', name: 'Brand Profile', logo: '/assets/clients/client-10.png' },
  { id: '11', name: 'Shark Yacht', logo: '/assets/clients/client-11.jpg' },
  { id: '12', name: 'Al Tamayuz', logo: '/assets/clients/client-12.jpg' },
  { id: '13', name: 'Kart', logo: '/assets/clients/client-13.png' },
  { id: '14', name: 'Mshaltat Al Moallem', logo: '/assets/clients/client-14.jpg' },
];

// Line 1: First set of brand logos (Items 1-7), duplicated for seamless loop
const ROW_1_LOGOS = BRAND_LOGOS.slice(0, 7);
const LINE_1_ITEMS = [...ROW_1_LOGOS, ...ROW_1_LOGOS, ...ROW_1_LOGOS, ...ROW_1_LOGOS];

// Line 2: Second set of brand logos (Items 8-14), duplicated for seamless loop
const ROW_2_LOGOS = BRAND_LOGOS.slice(7, 14);
const LINE_2_ITEMS = [...ROW_2_LOGOS, ...ROW_2_LOGOS, ...ROW_2_LOGOS, ...ROW_2_LOGOS];

export default function Clients() {
  return (
    <section id="clients" className="snap-section relative flex flex-col justify-center section-alt-a overflow-hidden border-y border-neutral-200/80 dark:border-white/10 px-3.5 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-14 select-none">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 flex flex-col items-center justify-center">
          <TitleAccent type="clients" />
        </div>

        {/* Container for Client Marquee (Two Lines - Always LTR for perfect mathematical marquee symmetry) */}
        <div
          dir="ltr"
          className="relative rounded-2xl bg-white dark:bg-[#111116] border border-neutral-200/80 dark:border-white/10 p-6 sm:p-8 lg:p-10 overflow-hidden shadow-sm dark:shadow-2xl"
        >
          {/* Gradient edge masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-white dark:from-[#111116] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-white dark:from-[#111116] to-transparent z-10 pointer-events-none" />

          {/* Marquee Line 1 (Scrolls Left) */}
          <div className="flex overflow-hidden py-3 select-none marquee-container w-full">
            <div className="animate-marquee flex items-center gap-10 sm:gap-16 md:gap-20 flex-shrink-0 will-change-transform">
              {LINE_1_ITEMS.map((client, idx) => (
                <div
                  key={`line1-${client.id}-${idx}`}
                  className="flex items-center justify-center min-w-[140px] sm:min-w-[180px] md:min-w-[210px] h-20 sm:h-24 md:h-28 flex-shrink-0 cursor-pointer group transition-all duration-300"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-16 sm:max-h-20 md:max-h-24 max-w-[130px] sm:max-w-[170px] md:max-w-[190px] object-contain rounded-lg opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter drop-shadow-md"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'block';
                      }
                    }}
                  />
                  <span className="hidden text-xs sm:text-sm font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Line 2 (Scrolls Right / Reverse) */}
          <div className="flex overflow-hidden py-3 mt-6 sm:mt-8 select-none border-t border-neutral-200/80 dark:border-white/10 marquee-container w-full">
            <div className="animate-marquee-reverse flex items-center gap-10 sm:gap-16 md:gap-20 flex-shrink-0 will-change-transform">
              {LINE_2_ITEMS.map((client, idx) => (
                <div
                  key={`line2-${client.id}-${idx}`}
                  className="flex items-center justify-center min-w-[140px] sm:min-w-[180px] md:min-w-[210px] h-20 sm:h-24 md:h-28 flex-shrink-0 cursor-pointer group transition-all duration-300"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-16 sm:max-h-20 md:max-h-24 max-w-[130px] sm:max-w-[170px] md:max-w-[190px] object-contain rounded-lg opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter drop-shadow-md"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'block';
                      }
                    }}
                  />
                  <span className="hidden text-xs sm:text-sm font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
