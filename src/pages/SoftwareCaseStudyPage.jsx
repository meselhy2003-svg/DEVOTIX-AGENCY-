import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';
import { SOFTWARE_PROJECTS } from '../data/projectsData';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function SoftwareCaseStudyPage({
  project,
  onBack,
  onBackToHome,
  onBackToPortfolio,
  onOpenContact,
  onOpenPolicy,
  initialStatus = 'COMPLETED'
}) {
  const { t, isRtl } = useThemeLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project]);

  // Use passed project or default to first project (Car Hub)
  const activeProject = project || SOFTWARE_PROJECTS[0];

  // Dynamic status state
  const [status, setStatus] = useState(activeProject.status || initialStatus);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onBackToHome) {
      onBackToHome('work');
    } else if (onBackToPortfolio) {
      onBackToPortfolio();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '#work';
    }
  };

  const handleRequestSimilarWork = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      window.location.hash = '#contact';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white font-sans selection:bg-brand-red selection:text-white pt-16 flex flex-col justify-between transition-colors duration-300">
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-14 flex-1">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs sm:text-sm font-semibold text-black dark:text-white hover:text-brand-red dark:hover:text-brand-red transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-black dark:text-white group-hover:text-brand-red dark:group-hover:text-brand-red rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
            <span>{t('nav.backToPrevious', 'Back to previous page')}</span>
          </button>

          <button
            onClick={handleRequestSimilarWork}
            className="px-4 py-2 bg-brand-red hover:bg-brand-redHover text-white text-xs font-extrabold uppercase tracking-wider rounded shadow-md shadow-red-600/20 inline-flex items-center space-x-1.5 rtl:space-x-reverse transition-all transform hover:scale-105"
          >
            <span>{t('pages.softwareCaseStudy.requestSimilar')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-[-90deg]" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 1. PROJECT TITLE & LOGO HEADER SECTION */}
        {/* ========================================================================= */}
        <div className="border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-red pl-5 rtl:pl-0 rtl:pr-5 sm:pl-7 sm:rtl:pr-7 py-1 space-y-3">
          {/* Top Row: STATUS Label + Badge */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="text-[11px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {t('pages.softwareCaseStudy.status')}
            </span>
            <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#10B981] text-white shadow-xs">
              {status}
            </span>
            <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest hidden sm:inline">
              | {activeProject.category}
            </span>
          </div>

          {/* Headline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display leading-[1.03]">
              {activeProject.title}
            </h1>
            {activeProject.logo && (
              <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center max-w-[180px] self-start sm:self-auto shadow-sm">
                <img
                  src={activeProject.logo}
                  alt={`${activeProject.title} Logo`}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            )}
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-medium max-w-2xl leading-relaxed">
            {activeProject.subtitle || activeProject.description}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. IMAGE GALLERY SECTION (Cover Image & Folder Screenshots) */}
        {/* ========================================================================= */}
        <div className="space-y-4 sm:space-y-6">
          {/* Main Cover Image Display */}
          <div className="w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md aspect-[16/9]">
            <img
              src={activeProject.image}
              alt={`${activeProject.title} Cover Image`}
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-102"
            />
          </div>

          {/* 2-Column Grid with Shot & Logo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {activeProject.shot && (
              <div className="rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm aspect-[16/10]">
                <img
                  src={activeProject.shot}
                  alt={`${activeProject.title} Screenshot`}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}

            <div className="rounded-xl overflow-hidden bg-neutral-950 p-6 border border-neutral-800 flex flex-col justify-between text-white space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-red block mb-1">
                  {t('pages.softwareCaseStudy.deliverables')}
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight font-display">
                  {activeProject.title} {t('pages.softwareCaseStudy.softwareSystem')}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex flex-wrap gap-2">
                {activeProject.tags?.map((tag) => (
                  <span key={tag} className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-neutral-900 text-neutral-300 border border-neutral-700">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={handleRequestSimilarWork}
                className="w-full py-3 bg-brand-red hover:bg-brand-redHover text-white text-xs font-extrabold uppercase tracking-wider rounded shadow-md shadow-red-600/30 flex items-center justify-center space-x-1.5 rtl:space-x-reverse transition-all"
              >
                <span>{t('pages.softwareCaseStudy.requestSimilar')}</span>
                <ArrowUpRight className="w-4 h-4 rtl:rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. PROJECT DETAILS & TEXT SECTION */}
        {/* ========================================================================= */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 sm:pt-12 space-y-8 sm:space-y-10">
          {/* Row 1: DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 items-start">
            <div className="sm:col-span-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-display block">
                {t('pages.softwareCaseStudy.details')}
              </span>
            </div>
            <div className="sm:col-span-9">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                {activeProject.details || activeProject.description}
              </p>
            </div>
          </div>

          {/* Row 2: PROBLEM */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 items-start">
            <div className="sm:col-span-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-display block">
                {t('pages.softwareCaseStudy.problem')}
              </span>
            </div>
            <div className="sm:col-span-9">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                {activeProject.problem}
              </p>
            </div>
          </div>

          {/* Row 3: OUR SOLUTION */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 items-start">
            <div className="sm:col-span-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-display block">
                {t('pages.softwareCaseStudy.solution')}
              </span>
            </div>
            <div className="sm:col-span-9">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                {activeProject.solution}
              </p>
            </div>
          </div>

          {/* Row 4: ACTION & LINKS */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-center pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="sm:col-span-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-display block">
                {t('pages.softwareCaseStudy.getStarted')}
              </span>
            </div>
            <div className="sm:col-span-9 flex flex-wrap items-center gap-3">
              <button
                onClick={handleRequestSimilarWork}
                className="inline-flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 bg-brand-red hover:bg-brand-redHover text-white text-xs font-extrabold uppercase tracking-wider rounded transition-all duration-200 shadow-md shadow-red-600/20 group cursor-pointer"
              >
                <span>{t('pages.softwareCaseStudy.requestSimilar')}</span>
                <ArrowUpRight className="w-4 h-4 rtl:rotate-[-90deg] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 rtl:space-x-reverse px-5 py-3 bg-black dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white text-xs font-extrabold uppercase tracking-wider rounded transition-all duration-200 shadow-md group"
                >
                  <span>{t('pages.softwareCaseStudy.visitProject')}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Standalone White Footer */}
      <Footer onOpenPolicy={onOpenPolicy} />
    </div>
  );
}
