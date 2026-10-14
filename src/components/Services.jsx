import React from 'react';
import TitleAccent from './TitleAccent';
import { Sparkles, Layers, Video, Code2, BarChart3, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function Services({ onSelectService }) {
  const { isRtl, isDark, t } = useThemeLanguage();

  const services = isRtl
    ? [
      {
        id: 'content-creation',
        title: 'صناعة المحتوى الإبداعي',
        icon: Sparkles,
        image: '/assets/services/content-creation.png',
        description: 'أفكار وسكريبتات ريلز ومحتوى فيروسي يشد الناس وينتشر بسرعة على السوشيال ميديا.',
        tag: 'محتوى فيروسي',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-2 min-h-[155px] sm:min-h-[180px] lg:min-h-[280px]',
      },
      {
        id: 'media-buying',
        title: 'إعلانات ممولة وميديا باينج',
        icon: TrendingUp,
        image: '/assets/services/media-buying.png',
        description: 'حملات إعلانية مبنية على الداتا على ميتا، تيك توك، وجوجل عشان تحقق أعلى مبيعات وأفضل ROAS.',
        tag: 'إعلانات الأداء ROAS',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
      {
        id: 'video-photography',
        title: 'الإنتاج السينمائي والتصوير',
        icon: Video,
        image: '/assets/services/video-photography.png',
        description: 'تصوير إعلانات سينمائية بدقة 4K وتصوير فوتوغرافي بريميوم للمنتجات والمطاعم.',
        tag: 'سينما 4K',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-2 min-h-[155px] sm:min-h-[180px] lg:min-h-[280px]',
      },
      {
        id: 'branding',
        title: 'الهوية البصرية والبراندينج',
        icon: Layers,
        image: '/assets/services/branding.png',
        description: 'بناء هوية بصرية متكاملة من الصفر، لوجوهات مميزة، وتايبوجرافي يفرّقك في السوق.',
        tag: 'هوية بصرية',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
      {
        id: 'software-engineering',
        title: 'تطوير المواقع وتطبيقات الويب',
        icon: Code2,
        image: '/assets/services/software-engineering.png',
        description: 'برمجة مواقع وتطبيقات تفاعلية سريعة وتجارب 3D مبهرة مخصصة للشركات الكبيرة.',
        tag: 'برمجة متقدمة',
        gridClass: 'col-span-1 lg:col-span-6 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
      {
        id: 'accounting-management',
        title: 'الاستشارات والتحليل المالي',
        icon: BarChart3,
        image: '/assets/services/accounting-management.png',
        description: 'إدارة وتدقيق ميزانيات الإعلانات، تقارير مالية دقيقة، واستراتيجيات لتعظيم الربحية.',
        tag: 'إدارة مالية',
        gridClass: 'col-span-1 lg:col-span-6 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
    ]
    : [
      {
        id: 'content-creation',
        title: 'Content Creation',
        icon: Sparkles,
        image: '/assets/services/content-creation.png',
        description: 'Short-form & long-form viral digital storytelling.',
        tag: 'VIRAL & SOCIAL',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-2 min-h-[155px] sm:min-h-[180px] lg:min-h-[280px]',
      },
      {
        id: 'media-buying',
        title: 'Media Buying',
        icon: TrendingUp,
        image: '/assets/services/media-buying.png',
        description: 'Data-driven paid media campaigns across Meta, Google & TikTok.',
        tag: 'PAID ADS',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
      {
        id: 'video-photography',
        title: 'Video Production & Photography',
        icon: Video,
        image: '/assets/services/video-photography.png',
        description: 'Cinema-grade commercial production & studio photography.',
        tag: 'CINEMA 4K',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-2 min-h-[155px] sm:min-h-[180px] lg:min-h-[280px]',
      },
      {
        id: 'branding',
        title: 'Branding',
        icon: Layers,
        image: '/assets/services/branding.png',
        description: 'Brand identity systems, typography & art direction.',
        tag: 'IDENTITY',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
      {
        id: 'software-engineering',
        title: 'Software Engineering',
        icon: Code2,
        image: '/assets/services/software-engineering.png',
        description: 'Bespoke web applications, 3D interactive & digital platforms.',
        tag: 'FULL STACK',
        gridClass: 'col-span-1 lg:col-span-6 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
      {
        id: 'accounting-management',
        title: 'Accounting Management',
        icon: BarChart3,
        image: '/assets/services/accounting-management.png',
        description: 'Financial forecasting, media spend audits & growth strategy.',
        tag: 'FINANCIAL OPS',
        gridClass: 'col-span-1 lg:col-span-6 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
    ];

  return (
    <section id="services" className="snap-section relative flex flex-col justify-center section-alt-b px-3.5 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-14 select-none">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <TitleAccent type="services" />
          <p className="mt-2 text-xs sm:text-sm md:text-[14.5px] text-neutral-600 dark:text-neutral-400 font-medium uppercase tracking-wider leading-relaxed">
            {t('services.subtitle', 'Strategy, production, and data to scale modern brands.')}
          </p>
        </div>

        {/* Bento Box Grid (3x2 on mobile, 12-col bento on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-4.5 items-stretch">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                onClick={() => onSelectService && onSelectService(service)}
                className={`relative group rounded-xl overflow-hidden bg-neutral-900 dark:bg-[#0c0c10] border border-neutral-200/80 dark:border-white/10 transition-all duration-300 hover:border-brand-red/50 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex flex-col justify-end p-3.5 sm:p-4.5 lg:p-5 ${service.gridClass}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out opacity-60 group-hover:opacity-75"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 group-hover:via-black/50 transition-colors duration-300" />
                </div>

                {/* Top Badge & Icon */}
                <div className="relative z-10 mb-auto flex items-center justify-between w-full">
                  <span className="text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/60 border border-white/10 backdrop-blur-md text-neutral-200 group-hover:border-white/30 group-hover:text-white transition-colors">
                    {service.tag}
                  </span>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/30 transition-all">
                    <ArrowUpRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform rtl:rotate-[-90deg]" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 mt-3">
                  <h3 className="text-sm sm:text-base lg:text-lg font-black uppercase tracking-tight text-white transition-colors font-display line-clamp-1 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-normal max-w-xs group-hover:text-white transition-colors line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
