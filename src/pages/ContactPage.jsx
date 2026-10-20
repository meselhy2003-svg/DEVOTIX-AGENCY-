import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Phone,
  Clock,
  Sparkles,
  RefreshCw,
  Send
} from 'lucide-react';
import Footer from '../components/Footer';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { getSocialLinks } from '../data/socialLinks';
import { sendFormToOfficialEmail } from '../utils/sendEmail';
import {
  SERVICES_HEARD_FROM_OPTIONS,
  SERVICES_COUNTRY_OPTIONS,
  SERVICES_NEEDED_OPTIONS,
  SERVICES_SOCIAL_PAGES_OPTIONS
} from '../services/googleSheetService';

export default function ContactPage({ onBackToHome, onOpenPolicy, initialService }) {
  const { isRtl, isDark, t } = useThemeLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Form State - Matches Services Google Form exactly
  const [fullName, setFullName] = useState('');
  const [profession, setProfession] = useState('');
  const [heardFrom, setHeardFrom] = useState('الانستجرام');
  const [otherHeardFrom, setOtherHeardFrom] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [country, setCountry] = useState('EGYPT');
  const [otherCountry, setOtherCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState(initialService || 'احتاج الى ادارة سوشيال ميديا');
  const [otherService, setOtherService] = useState('');
  const [hasSocialPages, setHasSocialPages] = useState('نعم');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setServiceNeeded(initialService);
    }
  }, [initialService]);

  const [links, setLinks] = useState(getSocialLinks());

  useEffect(() => {
    const handleUpdate = () => setLinks(getSocialLinks());
    window.addEventListener('devotix_social_links_updated', handleUpdate);
    return () => window.removeEventListener('devotix_social_links_updated', handleUpdate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalHeardFrom = heardFrom === 'أخرى'
      ? (otherHeardFrom ? `أخرى: ${otherHeardFrom}` : 'أخرى')
      : heardFrom;

    const finalCountry = country === 'أخرى'
      ? (otherCountry ? `أخرى: ${otherCountry}` : 'أخرى')
      : country;

    const finalService = serviceNeeded === 'أخرى'
      ? (otherService ? `أخرى: ${otherService}` : 'أخرى')
      : serviceNeeded;

    try {
      await sendFormToOfficialEmail({
        category: 'services',
        formType: 'نموذج طلب الخدمات – Devotix Media',
        fullName,
        name: fullName,
        profession,
        heardFrom: finalHeardFrom,
        businessType,
        country: finalCountry,
        phone,
        email,
        serviceNeeded: finalService,
        service: finalService,
        hasSocialPages,
      });
    } catch (err) {
      console.error('Services submission error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const socialLinks = [
    { name: 'WhatsApp', handle: '+20 101 018 5181', icon: '/assets/contact/WhatsApp.png', href: links.whatsapp },
    { name: 'Telegram', handle: '@devotix', icon: '/assets/contact/Telegram.png', href: links.telegram },
    { name: 'Instagram', handle: '@devotixmedia', icon: '/assets/contact/Instagram.png', href: links.instagram },
    { name: 'Facebook', handle: '@devotixmedia', icon: '/assets/contact/Facebook.png', href: links.facebook },
    { name: 'TikTok', handle: '@devotixmedia', icon: '/assets/contact/TikTok.png', href: links.tiktok },
    { name: 'Snapchat', handle: '@devotixmedia', icon: '/assets/contact/Snapchat.png', href: links.snapchat },
    { name: 'LinkedIn', handle: '@devotixmedia', icon: '/assets/contact/LinkedIn.png', href: links.linkedin },
    { name: 'X', handle: '@devotixmedia', icon: null, href: links.twitter },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white font-sans selection:bg-brand-red selection:text-white pt-14 lg:pt-16 flex flex-col justify-between select-none transition-colors duration-200">
      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-10 sm:space-y-12 flex-1">
        {/* ========================================================================= */}
        {/* 1. HERO TITLE & PROJECT FORM SECTION (Compact Scale, Exact Format) */}
        {/* ========================================================================= */}
        <div id="contact-form" className="space-y-4">
          {/* Top Bar with Back Link */}
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center space-x-1 rtl:space-x-reverse text-[10.5px] font-bold text-neutral-600 dark:text-neutral-400 hover:text-brand-red transition-colors uppercase cursor-pointer group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              <span>{t('nav.backToHome', 'Back to Home')}</span>
            </button>
          </div>

          {/* Hero Title Row: Eyebrow + Headline on Left, Capabilities List on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end pb-1">
            {/* Left: Eyebrow + Headline */}
            <div className="md:col-span-8 space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block">
                DEVOTIX MEDIA / CONTACT
              </span>
              {isRtl ? (
                <h1 className="text-2xl sm:text-3xl md:text-[34px] font-black uppercase tracking-tight text-neutral-950 dark:text-white font-display leading-[1.1]">
                  تعال نبني سوا
                  <br />
                  شغل حقيقي
                  <br />
                  الناس كلها
                  <br />
                  تتكلم عنه.
                </h1>
              ) : (
                <h1 className="text-2xl sm:text-3xl md:text-[34px] font-black uppercase tracking-tight text-neutral-950 dark:text-white font-display leading-[1.04]">
                  LET'S BUILD
                  <br />
                  SOMETHING
                  <br />
                  WORTH TALKING
                  <br />
                  ABOUT.
                </h1>
              )}
            </div>

            {/* Right: Vertical List of Capabilities */}
            <div className="md:col-span-4 flex justify-start md:justify-end rtl:md:justify-start pb-1">
              <div className="space-y-0.5 text-left rtl:text-right md:text-right rtl:md:text-left text-[10.5px] font-medium text-neutral-500 dark:text-neutral-400">
                <p>{isRtl ? 'استراتيجية وميديا باينج' : 'Strategy & Media'}</p>
                <p>{isRtl ? 'تصميم وهوية بصرية' : 'Branding & Creative'}</p>
                <p>{isRtl ? 'برمجة وتطوير ويب' : 'Software & Web'}</p>
                <p>{isRtl ? 'تصوير وإنتاج سينمائي' : 'Cinema & Production'}</p>
              </div>
            </div>
          </div>

          {/* Pure White / Dark Project Form Card Container */}
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 sm:p-6 md:p-7 shadow-sm border border-neutral-200/60 dark:border-neutral-800 transition-colors">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-3 max-w-md mx-auto">
                <CheckCircle2 className="w-10 h-10 text-brand-red mx-auto animate-bounce" />
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-950 dark:text-white font-display">
                  {isRtl ? 'تم استلام استفسار مشروعك بنجاح' : 'PROJECT INQUIRY RECEIVED'}
                </h2>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                  {isRtl
                    ? 'شكراً لتواصلك مع وكالة ديفوتيكس ميديا. يراجع فريقنا الاستراتيجي طلبك وسنتواصل معك خلال 24 ساعة.'
                    : 'Thank you for reaching out to Devotix Media. Our strategy team is reviewing your project brief and will contact you within 24 hours.'}
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-black text-[11px] font-extrabold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                  >
                    {isRtl ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 pt-1">
                {/* 1. الاسم & 2. بتشتغل في إيه وايه تخصصك؟ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left rtl:text-right">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                      {isRtl ? 'الاسم' : 'Name'} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isRtl ? 'أحمد محمد' : 'Your name'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#edf0f3] dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 border-0 focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                    />
                  </div>

                  <div className="space-y-1.5 text-left rtl:text-right">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                      {isRtl ? 'بتشتغل في إيه وايه تخصصك؟' : 'What is your job & speciality?'} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isRtl ? 'مثال: رائد أعمال / مدير تسويق / صاحب متجر' : 'e.g. Founder, Marketing Director, Brand Owner'}
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#edf0f3] dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 border-0 focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                    />
                  </div>
                </div>

                {/* 3. عرفتنا منين ؟ */}
                <div className="space-y-2 text-left rtl:text-right">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    {isRtl ? 'عرفتنا منين ؟' : 'How did you hear about us?'} <span className="text-brand-red">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {SERVICES_HEARD_FROM_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setHeardFrom(opt)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          heardFrom === opt
                            ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                            : 'bg-[#edf0f3] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {heardFrom === 'أخرى' && (
                    <input
                      type="text"
                      required
                      placeholder={isRtl ? 'اذكر المصدر هنا...' : 'Specify how you found us...'}
                      value={otherHeardFrom}
                      onChange={(e) => setOtherHeardFrom(e.target.value)}
                      className="w-full mt-2 px-3.5 py-2 rounded-lg bg-white dark:bg-black/60 border border-brand-red text-xs text-neutral-900 dark:text-white focus:outline-none"
                    />
                  )}
                </div>

                {/* 4. نوع البيزنس؟ & 5. الدوله */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left rtl:text-right">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                      {isRtl ? 'نوع البيزنس؟' : 'Business Type?'}
                    </label>
                    <input
                      type="text"
                      placeholder={isRtl ? 'مثال: ملابس، مطاعم، عيادات، عقارات...' : 'e.g. Fashion, F&B, Real Estate, E-commerce'}
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#edf0f3] dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 border-0 focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                    />
                  </div>

                  <div className="space-y-1.5 text-left rtl:text-right">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                      {isRtl ? 'الدوله' : 'Country'} <span className="text-brand-red">*</span>
                    </label>
                    <div className="flex gap-2">
                      {SERVICES_COUNTRY_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setCountry(opt)}
                          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            country === opt
                              ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                              : 'bg-[#edf0f3] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {country === 'أخرى' && (
                      <input
                        type="text"
                        required
                        placeholder={isRtl ? 'اكتب اسم الدولة هنا...' : 'Enter country name...'}
                        value={otherCountry}
                        onChange={(e) => setOtherCountry(e.target.value)}
                        className="w-full mt-2 px-3.5 py-2 rounded-lg bg-white dark:bg-black/60 border border-brand-red text-xs text-neutral-900 dark:text-white focus:outline-none"
                      />
                    )}
                  </div>
                </div>

                {/* 6. رقم تليفونك & 7. البريد الاكترني */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left rtl:text-right">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                      {isRtl ? 'رقم تليفونك' : 'Phone Number'} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+20 100 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#edf0f3] dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 border-0 focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                    />
                  </div>

                  <div className="space-y-1.5 text-left rtl:text-right">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                      {isRtl ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#edf0f3] dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 border-0 focus:outline-none focus:ring-1 focus:ring-brand-red transition-all"
                    />
                  </div>
                </div>

                {/* 8. ما الخدمه الذي تحتاجه */}
                <div className="space-y-2 text-left rtl:text-right">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    {isRtl ? 'ما الخدمه الذي تحتاجه' : 'What service do you need?'} <span className="text-brand-red">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                    {SERVICES_NEEDED_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setServiceNeeded(opt)}
                        className={`p-3 rounded-lg text-xs font-semibold text-start flex items-center gap-2.5 transition-all cursor-pointer ${
                          serviceNeeded === opt
                            ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                            : 'bg-[#edf0f3] dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                            serviceNeeded === opt ? 'border-white' : 'border-neutral-400'
                          }`}
                        >
                          {serviceNeeded === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    ))}
                  </div>
                  {serviceNeeded === 'أخرى' && (
                    <input
                      type="text"
                      required
                      placeholder={isRtl ? 'اكتب تفاصيل الخدمة المطلوبة هنا...' : 'Specify the service you need...'}
                      value={otherService}
                      onChange={(e) => setOtherService(e.target.value)}
                      className="w-full mt-2 px-3.5 py-2 rounded-lg bg-white dark:bg-black/60 border border-brand-red text-xs text-neutral-900 dark:text-white focus:outline-none"
                    />
                  )}
                </div>

                {/* 9. هل لديك صفحات حالياً للبزنس على السوشيال ميديا؟ */}
                <div className="space-y-2 text-left rtl:text-right pt-1">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    {isRtl ? 'هل لديك صفحات حالياً للبزنس على السوشيال ميديا؟' : 'Do you currently have social media pages for your business?'} <span className="text-brand-red">*</span>
                  </label>
                  <div className="flex gap-4 pt-0.5">
                    {SERVICES_SOCIAL_PAGES_OPTIONS.map((opt) => (
                      <label
                        key={opt}
                        onClick={() => setHasSocialPages(opt)}
                        className="inline-flex items-center gap-2 cursor-pointer select-none"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                            hasSocialPages === opt ? 'border-brand-red' : 'border-neutral-400 dark:border-neutral-600'
                          }`}
                        >
                          {hasSocialPages === opt && <div className="w-2 h-2 rounded-full bg-brand-red" />}
                        </div>
                        <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-brand-red hover:bg-brand-redHover disabled:opacity-75 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 shadow-lg shadow-brand-red/25 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{isRtl ? 'جاري الإرسال والمزامنة مع جوجل شيت...' : 'Sending & Syncing to Google Sheets...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isRtl ? 'إرسال طلب الخدمة' : 'Submit Service Request'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. PROCESS SECTION ("What happens next?" - Compact Scale) */}
        {/* ========================================================================= */}
        <div id="contact-process" className="space-y-6 text-center pt-2">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-950 dark:text-white font-display">
              {isRtl ? 'ماذا يحدث بعد ذلك؟' : 'What happens next?'}
            </h2>
            <div className="w-10 h-0.5 bg-brand-red rounded-full mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left rtl:text-right">
            {/* Step 01 */}
            <div className="bg-white dark:bg-neutral-900 p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2 relative transition-colors">
              <span className="inline-block px-2 py-0.5 rounded bg-[#f3f4f6] dark:bg-neutral-800 text-[9px] font-black text-neutral-700 dark:text-neutral-300 font-display">
                01
              </span>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-brand-red font-display">
                {isRtl ? 'المراجعة الأولية' : 'Initial Review'}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                {isRtl
                  ? 'نراجع طلبك بعناية لمطابقة الموارد والخبرات الفنية وتحديد الجدوى والحلول المناسبة.'
                  : 'We review your request to align resources and expertise. Our project strategists assess the complexity and feasibility of your vision.'}
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-white dark:bg-neutral-900 p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2 relative transition-colors">
              <span className="inline-block px-2 py-0.5 rounded bg-[#f3f4f6] dark:bg-neutral-800 text-[9px] font-black text-neutral-700 dark:text-neutral-300 font-display">
                02
              </span>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-brand-red font-display">
                {isRtl ? 'التواصل المباشر' : 'First Contact'}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                {isRtl
                  ? 'يتواصل معك مستشار متخصص خلال 24-48 ساعة لتنسيق جلسة استشارية وعرض منهجية العمل.'
                  : 'A specialized advisor will reach out to you within 24-48 hours to schedule a call and introduce our methodology.'}
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-white dark:bg-neutral-900 p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2 relative transition-colors">
              <span className="inline-block px-2 py-0.5 rounded bg-[#f3f4f6] dark:bg-neutral-800 text-[9px] font-black text-neutral-700 dark:text-neutral-300 font-display">
                03
              </span>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-brand-red font-display">
                {isRtl ? 'جلسة التخطيط المفصل' : 'Detailed Briefing'}
              </h3>
              <p className="text-[10.5px] sm:text-[11px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                {isRtl
                  ? 'نعقد جلسة تعمق لمناقشة تفاصيل مشروعك ورسم خارطة الطريق وضمان توافق كل عنصر مع أهدافك.'
                  : 'We hold a deep-dive session to discuss your project in detail and map out the trajectory, ensuring every pixel aligns with your goals.'}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. DIRECT CONTACT & SOCIALS SECTION (Compact Scale) */}
        {/* ========================================================================= */}
        <div id="contact-direct" className="space-y-6 text-center pt-2">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-950 dark:text-white font-display">
              {isRtl ? 'اتصل بنا مباشرة' : 'Contact Us'}
            </h2>
            <div className="w-10 h-0.5 bg-brand-red rounded-full mx-auto mt-1.5 mb-1.5" />
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {isRtl ? 'نحن هنا لدعمك وتلبية متطلباتك في أي وقت.' : "We're here to support you anytime."}
            </p>
          </div>

          {/* Intro Agency Mission Card */}
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 sm:p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm text-center transition-colors">
            <p className="text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed max-w-xl mx-auto">
              {isRtl ? (
                <>في <span className="font-bold text-neutral-950 dark:text-white">DEV<span className="text-brand-red">O</span>TIX</span>، لا نطلق مجرد حملات — بل نبني علامات تجارية وتجارب وحلولاً رقمية تجعل أعمالك أكثر حضوراً وتأثيراً وجاهزية للنمو.</>
              ) : (
                <>At <span className="font-bold text-neutral-950 dark:text-white">DEV<span className="text-brand-red">O</span>TIX</span>, we don't just create campaigns — we build brands, experiences, and digital solutions that make businesses more visible, more impactful, and ready to grow.</>
              )}
            </p>
          </div>

          {/* 2 Solid Red Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Left Card: Phone */}
            <div className="bg-brand-red text-white p-4 rounded-xl flex items-center justify-center space-x-3 rtl:space-x-reverse shadow-md">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div className="text-left rtl:text-right">
                <span className="text-[8.5px] font-bold uppercase tracking-widest text-white/80 block">
                  {isRtl ? 'اتصل بنا' : 'CALL US'}
                </span>
                <span className="text-sm sm:text-base font-black tracking-tight font-display block" dir="ltr">
                  +20 100 000 0000
                </span>
              </div>
            </div>

            {/* Right Card: 24/7 Availability */}
            <div className="bg-brand-red text-white p-4 rounded-xl flex items-center justify-center space-x-3 rtl:space-x-reverse shadow-md">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div className="text-left rtl:text-right">
                <span className="text-[8.5px] font-bold uppercase tracking-widest text-white/80 block">
                  {isRtl ? 'التوفر' : 'AVAILABILITY'}
                </span>
                <span className="text-sm sm:text-base font-black tracking-tight font-display block">
                  {isRtl ? 'دعم مستمر 24/7' : '24/7 Support'}
                </span>
              </div>
            </div>
          </div>

          {/* Connect With Us Card */}
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 sm:p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 transition-colors">
            <div className="text-center">
              <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-neutral-950 dark:text-white font-display">
                {isRtl ? 'قنوات التواصل الاجتماعي' : 'Connect With Us'}
              </h3>
              <div className="w-7 h-0.5 bg-brand-red rounded-full mx-auto mt-1" />
            </div>

            {/* 4x2 Social Media Grid with compact refined scale */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2.5 rtl:space-x-reverse p-2 rounded-lg border border-neutral-100 dark:border-neutral-800 bg-[#fbfbfb] dark:bg-neutral-800/70 hover:bg-neutral-100/80 dark:hover:bg-neutral-800 hover:border-brand-red/30 transition-all group text-left rtl:text-right"
                >
                  <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-md bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-700 shadow-2xs">
                    {s.icon ? (
                      <img src={s.icon} alt={s.name} className="w-4.5 h-4.5 object-contain" />
                    ) : (
                      <span className="text-xs font-black text-neutral-900 dark:text-white font-display">𝕏</span>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 block leading-tight">
                      {s.name}
                    </span>
                    <span className="text-[10.5px] sm:text-[11px] font-extrabold text-neutral-900 dark:text-white group-hover:text-brand-red transition-colors block leading-tight truncate mt-0.5">
                      {s.handle}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium text-center pt-1">
            {isRtl ? 'يسعدنا تواصلك معنا في أي وقت. نحن دائماً في خدمتك.' : 'Feel free to reach out to us anytime. We are here to help you.'}
          </p>
        </div>
      </main>

      {/* Standalone Footer */}
      <Footer onOpenPolicy={onOpenPolicy} />
    </div>
  );
}
