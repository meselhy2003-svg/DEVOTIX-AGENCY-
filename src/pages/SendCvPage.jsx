import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronDown, RefreshCw, Sparkles, Link2, ExternalLink } from 'lucide-react';
import Footer from '../components/Footer';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { sendFormToOfficialEmail } from '../utils/sendEmail';
import { DEVOTIX_JOB_POSITIONS, EXPERIENCE_YEARS_OPTIONS } from '../services/googleSheetService';

export default function SendCvPage({
  onBackToCareer,
  onBack,
  onOpenPolicy
}) {
  const { t, isRtl } = useThemeLanguage();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onBackToCareer) {
      onBackToCareer();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '#career';
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Form State - Matches Google Form exactly
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [otherPosition, setOtherPosition] = useState('');
  const [hasExperience, setHasExperience] = useState('نعم');
  const [yearsOfExperience, setYearsOfExperience] = useState('اكثر من سنه ونص');
  const [cvUrl, setCvUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobPosition) {
      alert(isRtl ? 'يرجى اختيار الوظيفة المراد التقديم عليها' : 'Please select the position you are applying for');
      return;
    }
    if (!cvUrl.trim()) {
      alert(isRtl ? 'يرجى إدخال رابط السيرة الذاتية (Google Drive)' : 'Please enter your CV link (Google Drive / Portfolio)');
      return;
    }

    setIsSubmitting(true);

    try {
      const finalPosition = jobPosition === 'أخرى (Other)'
        ? (otherPosition ? `أخرى: ${otherPosition}` : 'أخرى (Other)')
        : jobPosition;

      // Submit to Official Email, CMS Dashboard Inbox, and Google Sheet automatically
      await sendFormToOfficialEmail({
        formType: 'نموذج التقديم على وظائف – Devotix Media',
        category: 'job',
        fullName,
        email,
        phone,
        city,
        jobPosition: finalPosition,
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
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white font-sans selection:bg-brand-red selection:text-white pt-16 flex flex-col justify-between transition-colors duration-300">
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs sm:text-sm font-semibold text-black dark:text-white hover:text-brand-red dark:hover:text-brand-red transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-black dark:text-white group-hover:text-brand-red dark:group-hover:text-brand-red rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
            <span>{t('nav.backToPrevious', 'Back to previous page')}</span>
          </button>
        </div>

        {/* 2. Page Header & Intro - Exact Google Form Heading */}
        <div className="space-y-3 pb-8 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-red block">
              DEVOTIX MEDIA CAREERS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display leading-[1.05]">
            {isRtl ? 'نموذج التقديم على وظائف – Devotix Media' : 'Job Application Form – Devotix Media'}
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed max-w-2xl">
            {isRtl
              ? 'شكرًا لاهتمامك بالانضمام إلى فريق Devotix Media! يرجى تعبئة النموذج بدقة، وسيتم التواصل معك في حال مطابقة خبراتك لمتطلبات الوظيفة.'
              : 'Thank you for your interest in joining the Devotix Media team! Please fill out the form carefully, and our recruitment team will reach out if your profile matches the role.'}
          </p>

          <span className="text-[10.5px] font-bold text-neutral-400 dark:text-neutral-500 block pt-1">
            * {isRtl ? 'تشير إلى أنّ السؤال مطلوب' : 'Indicates required question'}
          </span>
        </div>

        {isSubmitted ? (
          <div className="py-20 text-center space-y-4 max-w-lg mx-auto">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display">
              {isRtl ? 'تم استلام طلب التقديم بنجاح!' : 'Application Submitted Successfully!'}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
              {isRtl
                ? 'تم حفظ بياناتك وإرسال السيرة الذاتية لفريق التوظيف في ديفوتيكس ومزامنتها مع شيت المتابعة. سنتواصل معك هاتفياً أو عبر واتساب قريباً.'
                : 'Your application has been received and routed to Devotix recruitment. We will contact you via Phone or WhatsApp shortly.'}
            </p>
            <div className="pt-4">
              <button
                onClick={onBackToCareer}
                className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-brand-red dark:hover:bg-brand-red dark:hover:text-white transition-colors cursor-pointer"
              >
                {isRtl ? 'العودة لصفحة الوظائف' : 'Back to Careers'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column: Personal Info */}
              <div className="space-y-5">
                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    {isRtl ? 'الاسم بالكامل' : 'Full Name'} <span className="text-brand-red">*</span>
                  </label>
                  <p className="text-[9.5px] text-neutral-400 font-medium -mt-1">First and last name</p>
                  <input
                    type="text"
                    required
                    placeholder={isRtl ? 'أحمد هشام' : 'Ahmed Hesham'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 focus:border-brand-red text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none transition-colors"
                  />
                </div>

                {/* 2. Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    {isRtl ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 focus:border-brand-red text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none transition-colors"
                  />
                </div>

                {/* 3. Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    {isRtl ? 'رقم الهاتف' : 'Phone Number'} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+20 100 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 focus:border-brand-red text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none transition-colors"
                  />
                </div>

                {/* 4. City / Location */}
                <div className="space-y-1.5">
                  <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    {isRtl ? 'المدينة / مكان الإقامة' : 'City / Location'} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isRtl ? 'القاهرة / الإسماعيلية / الرياض' : 'Cairo, Egypt'}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 focus:border-brand-red text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Right Column: Role & Experience */}
              <div className="space-y-5">
                {/* 5. Job Position (Exact 14 positions from Google Form) */}
                <div className="space-y-1.5">
                  <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    {isRtl ? 'الوظيفة المراد التقديم عليها' : 'Position Applied For'} <span className="text-brand-red">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                      className="w-full appearance-none px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 focus:border-brand-red text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none cursor-pointer pr-8 rtl:pr-3.5 rtl:pl-8 font-medium"
                    >
                      <option value="" disabled className="dark:bg-neutral-900">
                        {isRtl ? '-- اختر الوظيفة من القائمة --' : '-- Select a Position --'}
                      </option>
                      {DEVOTIX_JOB_POSITIONS.map((pos) => (
                        <option key={pos} value={pos} className="dark:bg-neutral-900 text-neutral-900 dark:text-white">
                          {pos}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-2.5 rtl:right-auto rtl:left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                  </div>

                  {/* If "أخرى (Other)" is selected */}
                  {jobPosition === 'أخرى (Other)' && (
                    <input
                      type="text"
                      required
                      placeholder={isRtl ? 'اكتب اسم المسمى الوظيفي هنا...' : 'Specify job title...'}
                      value={otherPosition}
                      onChange={(e) => setOtherPosition(e.target.value)}
                      className="w-full mt-2 px-3.5 py-2 rounded-lg bg-white dark:bg-black/60 border border-brand-red text-xs text-neutral-900 dark:text-white focus:outline-none"
                    />
                  )}
                </div>

                {/* 6. Experience Question (Yes / No) */}
                <div className="space-y-2">
                  <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                    {isRtl ? 'هل لديك خبرة سابقة في المجال؟' : 'Do you have previous work experience?'} <span className="text-brand-red">*</span>
                  </label>
                  <div className="flex items-center gap-6 pt-0.5">
                    {['نعم', 'لا'].map((opt) => (
                      <label
                        key={opt}
                        onClick={() => setHasExperience(opt)}
                        className="inline-flex items-center gap-2 cursor-pointer select-none"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                            hasExperience === opt ? 'border-brand-red' : 'border-neutral-400 dark:border-neutral-600'
                          }`}
                        >
                          {hasExperience === opt && <div className="w-2 h-2 rounded-full bg-brand-red" />}
                        </div>
                        <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 7. Years of Experience (Exact 3 choices from Google Form) */}
                {hasExperience === 'نعم' && (
                  <div className="space-y-2 animate-fadeIn">
                    <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                      {isRtl ? 'كام عدد سنين خبرتك في المجال' : 'Years of Experience'} <span className="text-brand-red">*</span>
                    </label>
                    <div className="space-y-1.5">
                      {EXPERIENCE_YEARS_OPTIONS.map((opt) => (
                        <label
                          key={opt}
                          onClick={() => setYearsOfExperience(opt)}
                          className="flex items-center gap-2.5 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-brand-red/50 cursor-pointer bg-neutral-50/50 dark:bg-neutral-900/40"
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              yearsOfExperience === opt ? 'border-brand-red' : 'border-neutral-400 dark:border-neutral-600'
                            }`}
                          >
                            {yearsOfExperience === opt && <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />}
                          </div>
                          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 8. CV URL (Google Drive / Portfolio) */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                  {isRtl ? 'رابط السيرة الذاتية (Google Drive / Portfolio)' : 'CV Link (Google Drive / Portfolio)'} <span className="text-brand-red">*</span>
                </label>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full w-fit">
                  Google Drive • OneDrive • Notion • Behance
                </span>
              </div>

              <div className="relative">
                <input
                  type="url"
                  required
                  value={cvUrl}
                  onChange={(e) => setCvUrl(e.target.value)}
                  placeholder={isRtl ? 'https://drive.google.com/file/d/... أو رابط البورتفوليو' : 'https://drive.google.com/... or portfolio URL'}
                  className="w-full px-3.5 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700 focus:border-brand-red text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none transition-all pl-10 rtl:pl-3.5 rtl:pr-10 font-medium"
                />
                <Link2 className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-100/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 text-[10.5px] text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
                <span className="text-brand-red font-black text-xs">💡</span>
                <p className="leading-relaxed">
                  {isRtl
                    ? 'ارفع ملف السيرة الذاتية (CV) على Google Drive وضع الرابط هنا، وتأكد من ضبط مشاركة الرابط على: (أي شخص لديه الرابط - Anyone with the link).'
                    : 'Upload your CV to Google Drive and paste the link here. Make sure link sharing is set to "Anyone with the link".'}
                </p>
              </div>
            </div>

            {/* 9. Submit Button */}
            <div className="pt-4 flex flex-col items-center justify-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-12 py-3.5 bg-brand-red hover:bg-brand-redHover disabled:opacity-75 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl shadow-brand-red/30 flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>
                      {isRtl ? 'جاري الإرسال والمزامنة مع جوجل شيت...' : 'Submitting & Syncing to Google Sheets...'}
                    </span>
                  </>
                ) : (
                  <>
                    <span>{isRtl ? 'إرسال طلب التقديم' : 'Submit Application'}</span>
                    <ArrowUpRight className="w-4 h-4 rtl:rotate-[-90deg]" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium text-center">
                {isRtl
                  ? '🔒 يتم حفظ وتشفير بياناتك ومزامنتها مباشرة مع شيت المتابعة وإشعار مسؤولي التوظيف.'
                  : '🔒 Your data is securely delivered to recruiters and synced to the tracking spreadsheet.'}
              </p>
            </div>
          </form>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenPolicy={onOpenPolicy} />
    </div>
  );
}
