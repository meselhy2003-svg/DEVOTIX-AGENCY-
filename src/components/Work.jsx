import React from 'react';
import TitleAccent from './TitleAccent';
import { ArrowUpRight } from 'lucide-react';
import { SOFTWARE_PROJECTS } from '../data/projectsData';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function Work({ onSelectProject, onRequestSimilarWork }) {
  const { isRtl, isDark, t } = useThemeLanguage();

  const openLiveLink = (project, e) => {
    if (e) e.stopPropagation();
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  const project1 = SOFTWARE_PROJECTS[0];
  const otherProjects = SOFTWARE_PROJECTS.slice(1, 3);

  return (
    <section id="work" className="snap-section relative flex flex-col justify-center px-3.5 sm:px-6 lg:px-8 section-alt-a pt-14 pb-12 sm:pt-18 sm:pb-16 select-none">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header: Title & Description */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 sm:pb-6 border-b border-neutral-200/80 dark:border-white/10">
          <div>
            <TitleAccent type="work" />
          </div>
          <div className="sm:max-w-md">
            <p className="text-xs sm:text-sm md:text-[14.5px] text-neutral-600 dark:text-neutral-400 font-medium uppercase tracking-wider leading-relaxed rtl:leading-[1.85]">
              {t('work.subtitle', 'Custom software engineering, bespoke web platforms, and digital product architecture built for market leaders.')}
            </p>
          </div>
        </div>

        {/* Portfolio Projects Grid (Main Banner + 2-Col Grid on Mobile | 7-Col + 5-Col on Desktop) */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-8 items-stretch">
          {/* Main Featured Project: CAR HUB (Full-width on Mobile, Large 7-Col Card on Desktop) */}
          <div
            onClick={(e) => openLiveLink(project1, e)}
            className="col-span-2 lg:col-span-7 group cursor-pointer flex flex-col"
          >
            <div className="relative overflow-hidden rounded-xl bg-white dark:bg-[#111116] border border-neutral-200/90 dark:border-white/10 transition-all duration-300 group-hover:border-brand-red/50 group-hover:shadow-2xl group-hover:shadow-red-950/20 flex-1 flex flex-col shadow-sm">
              {/* Cover Image */}
              <div className="relative w-full aspect-[16/10] max-h-[220px] sm:max-h-[280px] lg:max-h-[340px] overflow-hidden bg-neutral-900">
                <img
                  src={project1.image}
                  alt={project1.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Corner Logo Badge for CAR HUB (White Container) */}
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 rtl:left-auto rtl:right-2.5 rtl:sm:right-4 z-10 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white shadow-lg border border-white/20 flex items-center gap-1.5 sm:gap-2 max-w-[140px] sm:max-w-[160px]">
                  <img
                    src={project1.logo}
                    alt={`${project1.title} logo`}
                    className="h-5 sm:h-7 w-auto object-contain"
                  />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-black font-display">
                    {project1.title}
                  </span>
                </div>

                {/* Floating View Project Button */}
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 rtl:right-auto rtl:left-2.5 rtl:sm:left-4 z-10">
                  <button
                    onClick={(e) => openLiveLink(project1, e)}
                    className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-brand-red hover:bg-brand-redHover text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-md sm:rounded-lg shadow-lg shadow-red-600/30 flex items-center space-x-1.5 rtl:space-x-reverse transition-all transform group-hover:scale-105"
                  >
                    <span>{isRtl ? 'عرض الموقع' : 'LIVE DEMO'}</span>
                    <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 rtl:rotate-[-90deg]" />
                  </button>
                </div>
              </div>

              {/* Metadata area */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white dark:bg-[#111116]">
                <div>
                  <h3 className="text-base sm:text-xl lg:text-2xl font-black tracking-tight uppercase group-hover:text-brand-red transition-colors flex items-center gap-2 font-display text-neutral-900 dark:text-white">
                    {project1.title}
                    <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-red rtl:rotate-[-90deg]" />
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-semibold tracking-wider uppercase mt-1 sm:mt-1.5">
                    {project1.category}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 sm:mt-2.5 line-clamp-2 leading-relaxed font-medium">
                    {project1.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 mt-3.5 sm:mt-4 flex-wrap">
                  {project1.tags.map((tag) => (
                    <span key={tag} className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded bg-neutral-100 dark:bg-[#181822] text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Cards (2-Col Grid on Mobile | 5-Col Stacked on Desktop) */}
          <div className="col-span-2 lg:col-span-5 grid grid-cols-2 lg:flex lg:flex-col gap-2.5 sm:gap-4 lg:gap-6">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                onClick={(e) => openLiveLink(project, e)}
                className="col-span-1 group cursor-pointer flex flex-col flex-1"
              >
                <div className="relative overflow-hidden rounded-xl bg-white dark:bg-[#111116] border border-neutral-200/90 dark:border-white/10 transition-all duration-300 group-hover:border-brand-red/50 group-hover:shadow-2xl group-hover:shadow-red-950/20 shadow-sm flex-1 flex flex-col">
                  {/* Cover Image */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[140px] sm:max-h-[190px] overflow-hidden bg-neutral-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Logo badge (White Container) */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 rtl:left-auto rtl:right-2 rtl:sm:right-3 z-10 p-1 sm:p-2 rounded-lg bg-white shadow-md border border-white/20 flex items-center gap-1 sm:gap-1.5">
                      <img
                        src={project.logo}
                        alt={`${project.title} logo`}
                        className="h-4 sm:h-6 w-auto object-contain"
                      />
                      <span className="text-[9px] sm:text-[10.5px] font-black uppercase tracking-wider text-black font-display">
                        {project.title}
                      </span>
                    </div>

                    {/* View Project Button */}
                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 rtl:right-auto rtl:left-2 rtl:sm:left-3 z-10">
                      <button
                        onClick={(e) => openLiveLink(project, e)}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-brand-red hover:bg-brand-redHover text-white text-[10px] sm:text-xs font-extrabold uppercase tracking-wider rounded-md shadow-md shadow-red-600/30 flex items-center space-x-1 rtl:space-x-reverse transition-all transform group-hover:scale-105"
                      >
                        <span>{isRtl ? 'عرض الموقع' : 'LIVE DEMO'}</span>
                        <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 rtl:rotate-[-90deg]" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-3 sm:p-4 bg-white dark:bg-[#111116] flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-sm sm:text-base lg:text-lg font-black tracking-tight uppercase group-hover:text-brand-red transition-colors flex items-center gap-1 font-display text-neutral-900 dark:text-white line-clamp-1">
                          {project.title}
                          <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-red rtl:rotate-[-90deg]" />
                        </h3>
                      </div>
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-semibold tracking-wider uppercase mt-0.5 line-clamp-1">
                        {project.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-[#181822] text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
