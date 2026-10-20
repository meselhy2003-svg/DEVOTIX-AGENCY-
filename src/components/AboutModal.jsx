import React, { useEffect } from 'react';
import { X, Award, Globe2, Target, Sparkles } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function AboutModal({ isOpen, onClose, onOpenContact }) {
  const { t, isRtl } = useThemeLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh] transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand-red">
                {isRtl ? 'فلسفة الوكالة الإبداعية' : 'AGENCY PHILOSOPHY'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display mt-0.5">
              {t('pages.about.title')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-brand-red hover:text-white text-neutral-600 dark:text-neutral-400 flex items-center justify-center transition-colors border border-neutral-200 dark:border-neutral-800 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display">
              {isRtl
                ? 'نصنع الحضور الرقمي الاستثنائي للعلامات التجارية الطموحة.'
                : 'WE ENGINEER DIGITAL VISIBILITY FOR VISIONARY BRANDS.'}
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
              {isRtl
                ? 'تأسست ديفوتيكس ميديا على مبدأ جوهري: التسويق العادي غير مرئي. ندمج بين الإنتاج السينمائي فائق الدقة، وهندسة البرمجيات المتطورة، والحملات الإعلانية الموجهة، وأنظمة الهوية الراقية لضمان تفوق عملائنا في أسواقهم.'
                : 'Devotix Media was founded on a singular conviction: ordinary marketing is invisible. We combine cinema-grade filmmaking, cutting-edge software engineering, performance media buying, and elite brand identity systems to ensure our clients dominate their markets.'}
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80">
              <Sparkles className="w-5 h-5 text-brand-red mb-2" />
              <h5 className="text-xs font-bold uppercase text-neutral-900 dark:text-white tracking-wider">
                {isRtl ? 'إتقان لا يهدأ' : 'Relentless Craft'}
              </h5>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                {isRtl
                  ? 'من التصوير السينمائي بدقة 4K إلى منصات الويب السلسة، التميز هو خط البداية لدينا.'
                  : 'From Arri 4K cinematography to custom WebGL 60fps code, excellence is our baseline.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80">
              <Target className="w-5 h-5 text-brand-red mb-2" />
              <h5 className="text-xs font-bold uppercase text-neutral-900 dark:text-white tracking-wider">
                {isRtl ? 'دقة البيانات والنتائج' : 'Data Precision'}
              </h5>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                {isRtl
                  ? 'كل حملة إبداعية تعتمد على استراتيجيات تحويل مدروسة وتحليلات أداء دقيقة.'
                  : 'Every creative campaign is paired with high-converting paid acquisition and analytical rigor.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80">
              <Globe2 className="w-5 h-5 text-brand-red mb-2" />
              <h5 className="text-xs font-bold uppercase text-neutral-900 dark:text-white tracking-wider">
                {isRtl ? 'حضور عالمي وإقليمي' : 'Global Reach'}
              </h5>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                {isRtl
                  ? 'نعمل عبر القاهرة، ودبي، ونيويورك، ولندن لخدمة وتوسيع نطاق العلامات التجارية.'
                  : 'Operating across Cairo, Dubai, New York, and London for international brand deployments.'}
              </p>
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left rtl:sm:text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white block">
                {isRtl ? 'هل أنت مستعد للارتقاء بحضور علامتك التجارية؟' : 'Ready to elevate your brand presence?'}
              </span>
              <span className="text-[11px] text-neutral-600 dark:text-neutral-400">
                {isRtl ? 'تحدث مباشرة مع فريقنا الإبداعي والتقني.' : 'Book a direct discovery call with our executive creative team.'}
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-6 py-2.5 bg-brand-red hover:bg-brand-redHover text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-md shadow-red-600/30 whitespace-nowrap cursor-pointer"
            >
              {t('nav.letsTalk')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
