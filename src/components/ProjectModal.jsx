import React, { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function ProjectModal({ project, onClose, onOpenContact, onNavigateSoftwareEngineering }) {
  const { t, isRtl } = useThemeLanguage();

  if (!project) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleRequestSimilar = () => {
    onClose();
    if (onNavigateSoftwareEngineering) {
      onNavigateSoftwareEngineering(project);
    } else {
      window.location.hash = '#software-engineering';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl animate-scaleUp text-neutral-900 dark:text-white transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800/80 bg-neutral-50 dark:bg-black/40">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-red">
              {isRtl ? 'استعراض المشروع' : 'PROJECT SHOWCASE'}
            </span>
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Visual */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Description & Details Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Col: Overview */}
            <div className="md:col-span-7 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                {isRtl ? 'نظرة عامة' : 'OVERVIEW'}
              </span>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                {project.description ||
                  'Comprehensive digital architecture and creative execution engineered to transform digital identity and drive measurable business performance.'}
              </p>
            </div>

            {/* Right Col: Project Specs & Action */}
            <div className="md:col-span-5 space-y-4 bg-neutral-50 dark:bg-neutral-900/50 p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800/80">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                  {isRtl ? 'التصنيف' : 'CATEGORY'}
                </span>
                <span className="text-xs font-bold uppercase text-neutral-900 dark:text-white mt-0.5 block">
                  {project.category}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                  {isRtl ? 'المخرجات' : 'DELIVERABLES'}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {project.tags?.map((t) => (
                    <span key={t} className="text-[9.5px] font-semibold uppercase px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleRequestSimilar}
                  className="w-full py-2.5 bg-brand-red hover:bg-brand-redHover text-white text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 flex items-center justify-center space-x-1.5 rtl:space-x-reverse cursor-pointer shadow-md shadow-red-600/30 transform hover:scale-[1.02]"
                >
                  <span>{t('work.requestSimilar')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-[-90deg]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
