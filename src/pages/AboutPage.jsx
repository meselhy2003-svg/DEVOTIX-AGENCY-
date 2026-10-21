import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function AboutPage({ onBackToHome, onBack, onOpenContact, onOpenPolicy }) {
  const { isRtl, isDark, t } = useThemeLanguage();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onBackToHome) {
      onBackToHome();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '#home';
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const metrics = isRtl
    ? [
        { number: '+150', label: 'براند وشريك نجاح' },
        { number: '+300', label: 'مشروع اتنفذوا بنجاح' },
        { number: '+45', label: 'مبدع ومحترف في الفريق' },
        { number: '+12', label: 'سوق محلي وإقليمي' },
        { number: '+10', label: 'سنين خبرة في السوق' },
      ]
    : [
        { number: '150+', label: 'CLIENTS' },
        { number: '300+', label: 'PROJECTS' },
        { number: '45+', label: 'SPECIALISTS' },
        { number: '12+', label: 'MARKETS' },
        { number: '10+', label: 'YEARS' },
      ];

  return (
    <div className="bg-white dark:bg-black text-neutral-900 dark:text-white font-sans selection:bg-brand-red selection:text-white select-none transition-colors duration-300">
      {/* 1. Main Story Section (Full Screen View) */}
      <section id="about-story" className="snap-section min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-neutral-900 dark:text-white pt-16 pb-6">
        <div className="max-w-6xl mx-auto w-full my-auto py-2">
          {/* Back Button */}
          <div className="mb-3 sm:mb-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-sm font-semibold text-black dark:text-white hover:text-brand-red dark:hover:text-brand-red transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-black dark:text-white group-hover:text-brand-red dark:group-hover:text-brand-red group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              <span>{t('nav.backToPrevious', 'Back to previous page')}</span>
            </button>
          </div>

          {/* Massive Headline */}
          {isRtl ? (
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-black tracking-tight text-neutral-900 dark:text-white font-display leading-[1.05] mb-5 sm:mb-7">
              بنبني براندات،
              <br />
              بنصنع
              <br />
              تجارب ملهمة،
              <br />
              وبنوصّل البيزنس بتاعك
              <br />
              لقمة
              <br />
              النجاح.
            </h1>
          ) : (
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display leading-[1.02] mb-5 sm:mb-7">
              WE BUILD BRANDS,
              <br />
              CREATE
              <br />
              EXPERIENCES AND
              <br />
              MOVE BUSINESS
              <br />
              FORWARD.
            </h1>
          )}

          {/* Two-Column Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
            {/* Left Column: Studio Image */}
            <div className="md:col-span-7">
              <div className="relative w-full aspect-[4/3] max-h-[260px] sm:max-h-[300px] rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-md bg-neutral-100 dark:bg-neutral-900">
                <img
                  src="/assets/about/studio-office.png"
                  alt="Devotix Media Creative Studio & Office"
                  draggable="false"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110"
                />
              </div>
            </div>

            {/* Right Column: Narrative Text */}
            <div className="md:col-span-5 space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed pt-1">
              {isRtl ? (
                <>
                  <p>
                    ديفوتيكس ميديا وكالة إبداعية متكاملة مصممة عشان تواكب العصر الرقمي السريع. بنربط بين التصميم البصري المبهر، التكنولوجيا والبرمجة القوية، واستراتيجيات الميديا اللي بتكبّر مبيعاتك وأرباحك.
                  </p>
                  <p>
                    فلسفتنا قايمة على إن الشكل الحلو لوحده مش كفاية؛ لازم التصميم يقترن بذكاء بيعي وتنفيذي. إحنا مش بس بنعمل إعلانات، إحنا بنصنع حلول رقمية تفرض وجودها وتحقق أرقام ونتائج حقيقية ملموسة.
                  </p>
                  <p>
                    سواء كنت براند جديد بيبدأ رحلته أو شركة كبيرة عاوزة تجدد شبابها وتسيطر على السوق، فريقنا جاهز يحول أفكارك لواقع مبهر وناجح.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Devotix Media is a multidisciplinary creative partner built for the modern landscape. We bridge the gap between high-end editorial design, robust technological infrastructure, and strategic business growth.
                  </p>
                  <p>
                    Our approach is rooted in the belief that aesthetic brilliance must be matched by functional intelligence. We don't just design for screens; we engineer solutions that command attention and drive measurable results.
                  </p>
                  <p>
                    From nascent startups finding their voice to established enterprises seeking reinvention, we assemble bespoke teams of specialists to tackle complex challenges with clarity and purpose.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Metrics Banner Section */}
      <section id="about-metrics" className="min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white pt-16 pb-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto w-full my-auto py-8">
          <div className="mb-6 text-center sm:text-left rtl:sm:text-right">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-red block mb-1">
              {isRtl ? 'أثرنا في أرقام' : 'OUR GLOBAL IMPACT'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display">
              {isRtl ? 'تميز يمكن قياسه' : 'MEASURABLE EXCELLENCE'}
            </h2>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-4 text-left rtl:text-right p-6 sm:p-8 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            {metrics.map((m) => (
              <div key={m.label}>
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-red font-display block leading-none">
                  {m.number}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block mt-2">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Footer */}
      <Footer onOpenPolicy={onOpenPolicy} />
    </div>
  );
}
