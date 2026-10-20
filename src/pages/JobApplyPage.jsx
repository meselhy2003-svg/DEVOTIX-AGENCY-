import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronDown, RefreshCw, Link2 } from 'lucide-react';
import Footer from '../components/Footer';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { sendFormToOfficialEmail } from '../utils/sendEmail';
import { EXPERIENCE_YEARS_OPTIONS } from '../services/googleSheetService';

export default function JobApplyPage({
  role = null,
  onBackToCareer,
  onOpenPolicy
}) {
  const { isRtl, isDark, t } = useThemeLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const defaultRole = {
    title: isRtl ? 'سينيور جرافيك ديزاينر (Senior Graphic Designer)' : 'SENIOR GRAPHIC DESIGNER',
    department: isRtl ? 'فريق الديزاين والإبداع' : 'CREATIVE',
    location: isRtl ? 'مصر / هجين' : 'ISMAILIA, EGYPT',
    type: isRtl ? 'دوام كامل' : 'FULL-TIME',
    level: isRtl ? 'سينيور (خبرة متقدمة)' : 'SENIOR LEVEL',
    description: isRtl
      ? 'بندور على سينيور جرافيك ديزاينر شاطر ينضم لفريقنا ويقود الأفكار البصرية للبراندات والحملات الإعلانية والسوشيال ميديا.'
      : 'We are looking for a Senior Graphic Designer to join our creative team and develop strong visual concepts across brands, campaigns, digital platforms and social media.'
  };

  const currentRole = role || defaultRole;

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [hasExperience, setHasExperience] = useState('نعم');
  const [yearsOfExperience, setYearsOfExperience] = useState('اكثر من سنه ونص');
  const [cvUrl, setCvUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cvUrl.trim()) {
      alert(isRtl ? 'يرجى إدخال رابط السيرة الذاتية (Google Drive)' : 'Please enter your CV link (Google Drive / Portfolio)');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Official Email, CMS Dashboard Inbox, and Google Sheet automatically
      await sendFormToOfficialEmail({
        formType: 'نموذج التقديم على وظائف – Devotix Media',
        category: 'job',
        jobTitle: currentRole.title,
        jobDepartment: currentRole.department,
        fullName,
        email,
        phone,
        city,
        jobPosition: currentRole.title,
        hasExperience,
        yearsOfExperience: hasExperience === 'نعم' ? yearsOfExperience : 'بدون خبرة',
        resumeUrl: cvUrl.trim(),
        fileName: 'Google Drive / Portfolio Link',
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Job application submission error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-black text-neutral-900 dark:text-white font-sans selection:bg-brand-red selection:text-white pt-14 lg:pt-16 select-none transition-colors duration-200">
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1 flex flex-col justify-center">
        {/* Back Link */}
        <div className="mb-3">
          <button
            onClick={onBackToCareer}
            className="inline-flex items-center space-x-1 rtl:space-x-reverse text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-brand-red transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            <span>{t('nav.back', 'Back')}</span>
          </button>
        </div>

        {/* 2. Job Title & Meta Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-neutral-200 dark:border-neutral-800 mb-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950 dark:text-white font-display leading-[1.02]">
            {currentRole.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase flex-shrink-0">
            <span>• {currentRole.department || 'CREATIVE'}</span>
            <span>• {currentRole.location || 'ISMAILIA, EGYPT'}</span>
            <span>• {currentRole.type || 'FULL-TIME'}</span>
            <span>• {currentRole.level || 'SENIOR LEVEL'}</span>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-16 text-center space-y-4 max-w-lg mx-auto my-auto">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 dark:text-white font-display">
              {isRtl ? 'تم استلام طلب التقديم بنجاح' : 'APPLICATION RECEIVED'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
              {isRtl ? (
                <>شكراً لتقدمك لوظيفة <span className="font-bold text-neutral-950 dark:text-white">{currentRole.title}</span>. تم حفظ ومزامنة بياناتك مع شيت التوظيف وسيتم التواصل معك قريباً.</>
              ) : (
                <>Thank you for applying for <span className="font-bold text-neutral-950 dark:text-white">{currentRole.title}</span>. Your details are synced to our tracking spreadsheet and recruitment team.</>
              )}
            </p>
            <div className="pt-3">
              <button
                onClick={onBackToCareer}
                className="px-6 py-2.5 bg-neutral-900 dark:bg-neutral-100 hover:bg-brand-red dark:hover:bg-brand-red text-white dark:text-black dark:hover:text-white text-xs font-extrabold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                {isRtl ? 'العودة لصفحة الوظائف' : 'Back to Careers'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start">
              {/* Left Column: About Role */}
              <div className="md:col-span-4 space-y-3 text-left rtl:text-right">
                <h3 className="text-[10.5px] font-extrabold uppercase tracking-widest text-neutral-900 dark:text-white font-display">
                  {isRtl ? 'عن الوظيفة والمسؤوليات' : 'ABOUT THE ROLE'}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                  {currentRole.description}
                </p>
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-300 space-y-1">
                  <span className="font-bold block text-brand-red">{isRtl ? '💡 نصيحة للتقديم:' : '💡 Pro Tip:'}</span>
                  <p>{isRtl ? 'تأكد من كتابة رقم الهاتف والمدينة بدقة وتحميل أحدث نسخة من سيرتك الذاتية (CV).' : 'Ensure your contact info and city are accurate and upload your latest updated CV.'}</p>
                </div>
              </div>

              {/* Middle Column: Personal Information Form */}
              <div className="md:col-span-4 space-y-4 text-left rtl:text-right">
                {/* 1. Full Name */}
                <div className="space-y-1">
                  <label className="block text-[9.5px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    {isRtl ? 'الاسم بالكامل' : 'FULL NAME'} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isRtl ? 'أحمد هشام' : 'Ahmed Hesham'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pb-1.5 bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-700 focus:border-brand-red text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* 2. Email Address */}
                <div className="space-y-1">
                  <label className="block text-[9.5px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    {isRtl ? 'البريد الإلكتروني' : 'EMAIL ADDRESS'} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pb-1.5 bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-700 focus:border-brand-red text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* 3. Phone Number */}
                <div className="space-y-1">
                  <label className="block text-[9.5px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    {isRtl ? 'رقم الهاتف' : 'PHONE NUMBER'} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+20 100 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pb-1.5 bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-700 focus:border-brand-red text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* 4. City / Location */}
                <div className="space-y-1">
                  <label className="block text-[9.5px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    {isRtl ? 'المدينة / مكان الإقامة' : 'CITY / LOCATION'} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isRtl ? 'القاهرة / الإسماعيلية' : 'Cairo, Egypt'}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pb-1.5 bg-transparent border-0 border-b border-neutral-300 dark:border-neutral-700 focus:border-brand-red text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Right Column: Experience & CV Upload */}
              <div className="md:col-span-4 space-y-4 text-left rtl:text-right">
                {/* 5. Experience Question */}
                <div className="space-y-1.5">
                  <label className="block text-[9.5px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    {isRtl ? 'هل لديك خبرة سابقة في المجال؟' : 'DO YOU HAVE PREVIOUS WORK EXPERIENCE?'} <span className="text-brand-red">*</span>
                  </label>
                  <div className="flex items-center space-x-6 rtl:space-x-reverse pt-0.5">
                    {['نعم', 'لا'].map((opt) => (
                      <label
                        key={opt}
                        onClick={() => setHasExperience(opt)}
                        className="inline-flex items-center space-x-2 rtl:space-x-reverse cursor-pointer"
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                            hasExperience === opt ? 'border-brand-red' : 'border-neutral-400 dark:border-neutral-600'
                          }`}
                        >
                          {hasExperience === opt && <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 6. Years of Experience */}
                {hasExperience === 'نعم' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <label className="block text-[9.5px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      {isRtl ? 'كام عدد سنين خبرتك في المجال' : 'YEARS OF EXPERIENCE'} <span className="text-brand-red">*</span>
                    </label>
                    <div className="relative pb-1.5 border-b border-neutral-300 dark:border-neutral-700">
                      <select
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        className="w-full appearance-none bg-transparent text-xs text-neutral-900 dark:text-white focus:outline-none cursor-pointer pr-6 rtl:pr-0 rtl:pl-6 font-medium"
                      >
                        {EXPERIENCE_YEARS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="dark:bg-neutral-900 text-neutral-900 dark:text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 absolute right-0 rtl:right-auto rtl:left-0 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                    </div>
                  </div>
                )}

                {/* 7. CV URL (Google Drive / Portfolio) */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-[9.5px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      {isRtl ? 'رابط السيرة الذاتية (Google Drive)' : 'RESUME LINK (GOOGLE DRIVE)'} <span className="text-brand-red">*</span>
                    </label>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Google Drive
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="url"
                      required
                      value={cvUrl}
                      onChange={(e) => setCvUrl(e.target.value)}
                      placeholder={isRtl ? 'https://drive.google.com/file/d/...' : 'https://drive.google.com/...'}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:border-brand-red text-xs text-neutral-900 dark:text-white focus:outline-none transition-colors pl-8 rtl:pl-3 rtl:pr-8 font-medium"
                    />
                    <Link2 className="w-3.5 h-3.5 absolute left-2.5 rtl:left-auto rtl:right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                  </div>

                  <p className="text-[8.5px] text-neutral-400 leading-tight">
                    {isRtl
                      ? 'ارفع الملف على Google Drive وتأكد أن المشاركة مضبوطة على: (أي شخص لديه الرابط).'
                      : 'Make sure your Google Drive sharing is set to "Anyone with the link".'}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-brand-red hover:bg-brand-redHover disabled:opacity-75 text-white text-xs font-black uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-1.5 rtl:space-x-reverse cursor-pointer shadow-lg shadow-brand-red/20"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>
                      {isRtl ? 'جاري الإرسال والمزامنة...' : 'Submitting & Syncing...'}
                    </span>
                  </>
                ) : (
                  <>
                    <span>{isRtl ? 'إرسال طلب التقديم' : 'Submit Application'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-[-90deg]" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer onOpenPolicy={onOpenPolicy} />
    </div>
  );
}
