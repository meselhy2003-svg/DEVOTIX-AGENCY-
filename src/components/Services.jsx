import React from 'react';
import TitleAccent from './TitleAccent';
import { Sparkles, Layers, Video, Code2, BarChart3, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function Services({ onSelectService }) {
  const { isRtl, isDark, t } = useThemeLanguage();

  const services = isRtl
    ? [
      {
        id: 'social-media-management',
        formValue: 'احتاج الى ادارة سوشيال ميديا',
        title: 'إدارة سوشيال ميديا',
        icon: Sparkles,
        image: '/assets/services/content-creation.png',
        description: 'إدارة متكاملة لصفحات السوشيال ميديا، أفكار وسكريبتات ريلز ومحتوى فيروسي يشد الناس وينتشر بسرعة.',
        tag: 'سوشيال ميديا',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-2 min-h-[155px] sm:min-h-[180px] lg:min-h-[280px]',
      },
      {
        id: 'media-buying',
        formValue: 'احتاج اعمل حملات اعلانيه علي المنصات',
        title: 'حملات إعلانية على المنصات',
        icon: TrendingUp,
        image: '/assets/services/media-buying.png',
        description: 'حملات إعلانية مبنية على الداتا على ميتا، تيك توك، وجوجل عشان تحقق أعلى مبيعات وأفضل ROAS.',
        tag: 'إعلانات ممولة ROAS',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
      {
        id: 'web-mobile-apps',
        formValue: 'احتاج اعمل ويب سايت وابلكيشن موبيل',
        title: 'ويب سايت وابلكيشن موبيل',
        icon: Code2,
        image: '/assets/services/software-engineering.png',
        description: 'برمجة وتصميم مواقع ويب سريعة وتطبيقات موبايل تفاعلية ومتاجر إلكترونية مهيأة لزيادة المبيعات.',
        tag: 'ويب & موبايل',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-2 min-h-[155px] sm:min-h-[180px] lg:min-h-[280px]',
      },
      {
        id: 'monthly-business-plan',
        formValue: 'احتاج عمل بلان شهري لي البيزنس الخاص بي',
        title: 'بلان شهري للبيزنس والتسويق',
        icon: BarChart3,
        image: '/assets/services/accounting-management.png',
        description: 'إعداد خطة شهرية واستراتيجية شاملة للبيزنس، دراسة السوق والمنافسين، وتحديد الميزانيات والأهداف.',
        tag: 'بلان شهري',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
      {
        id: 'video-production',
        formValue: 'الإنتاج السينمائي وصناعة الفيديو',
        title: 'الإنتاج السينمائي وصناعة الفيديو',
        icon: Video,
        image: '/assets/services/video-photography.png',
        description: 'تصوير إعلانات سينمائية بدقة 4K وفيديوهات ترويجية وإشراف فني كامل للمنتجات والبراندات.',
        tag: 'سينما 4K',
        gridClass: 'col-span-1 lg:col-span-6 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
      {
        id: 'branding',
        formValue: 'الهوية البصرية والبراندينج',
        title: 'الهوية البصرية والبراندينج',
        icon: Layers,
        image: '/assets/services/branding.png',
        description: 'بناء هوية بصرية متكاملة من الصفر، لوجوهات مميزة، وتايبوجرافي وتصاميم سوشيال ميديا تفرّقك في السوق.',
        tag: 'هوية بصرية',
        gridClass: 'col-span-1 lg:col-span-6 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
    ]
    : [
      {
        id: 'social-media-management',
        formValue: 'احتاج الى ادارة سوشيال ميديا',
        title: 'Social Media Management',
        icon: Sparkles,
        image: '/assets/services/content-creation.png',
        description: 'End-to-end social media handling, viral reel scripts, and community growth.',
        tag: 'VIRAL & SOCIAL',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-2 min-h-[155px] sm:min-h-[180px] lg:min-h-[280px]',
      },
      {
        id: 'media-buying',
        formValue: 'احتاج اعمل حملات اعلانيه علي المنصات',
        title: 'Paid Ad Campaigns',
        icon: TrendingUp,
        image: '/assets/services/media-buying.png',
        description: 'Data-driven paid media campaigns across Meta, TikTok, and Google for maximum ROAS.',
        tag: 'PAID ADS',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
      {
        id: 'web-mobile-apps',
        formValue: 'احتاج اعمل ويب سايت وابلكيشن موبيل',
        title: 'Websites & Mobile Apps',
        icon: Code2,
        image: '/assets/services/software-engineering.png',
        description: 'High-speed websites, interactive mobile apps, and high-converting digital platforms.',
        tag: 'WEB & MOBILE',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-2 min-h-[155px] sm:min-h-[180px] lg:min-h-[280px]',
      },
      {
        id: 'monthly-business-plan',
        formValue: 'احتاج عمل بلان شهري لي البيزنس الخاص بي',
        title: 'Monthly Business Plan',
        icon: BarChart3,
        image: '/assets/services/accounting-management.png',
        description: 'Tailored monthly marketing roadmaps, competitor audits, budget planning, and KPIs.',
        tag: 'BUSINESS STRATEGY',
        gridClass: 'col-span-1 lg:col-span-4 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
      {
        id: 'video-production',
        formValue: 'الإنتاج السينمائي وصناعة الفيديو',
        title: 'Cinema Video Production',
        icon: Video,
        image: '/assets/services/video-photography.png',
        description: 'Cinema-grade 4K commercial production, dynamic brand documentaries, and filming.',
        tag: 'CINEMA 4K',
        gridClass: 'col-span-1 lg:col-span-6 lg:row-span-1 min-h-[155px] sm:min-h-[180px] lg:min-h-[135px]',
      },
      {
        id: 'branding',
        formValue: 'الهوية البصرية والبراندينج',
        title: 'Brand Identity & Design',
        icon: Layers,
        image: '/assets/services/branding.png',
        description: 'Complete visual identity systems, typography, distinctive packaging, and art direction.',
        tag: 'BRANDING',
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
