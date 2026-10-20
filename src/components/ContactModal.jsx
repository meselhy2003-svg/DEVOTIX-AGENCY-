import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { sendFormToOfficialEmail } from '../utils/sendEmail';
import {
  SERVICES_HEARD_FROM_OPTIONS,
  SERVICES_COUNTRY_OPTIONS,
  SERVICES_NEEDED_OPTIONS,
  SERVICES_SOCIAL_PAGES_OPTIONS
} from '../services/googleSheetService';

export default function ContactModal({ isOpen, onClose }) {
  const { t, isRtl } = useThemeLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    heardFrom: 'الانستجرام',
    otherHeardFrom: '',
    businessType: '',
    country: 'EGYPT',
    otherCountry: '',
    phone: '',
    email: '',
    serviceNeeded: 'احتاج الى ادارة سوشيال ميديا',
    otherService: '',
    hasSocialPages: 'نعم',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalHeardFrom = formData.heardFrom === 'أخرى'
      ? (formData.otherHeardFrom ? `أخرى: ${formData.otherHeardFrom}` : 'أخرى')
      : formData.heardFrom;

    const finalCountry = formData.country === 'أخرى'
      ? (formData.otherCountry ? `أخرى: ${formData.otherCountry}` : 'أخرى')
      : formData.country;

    const finalService = formData.serviceNeeded === 'أخرى'
      ? (formData.otherService ? `أخرى: ${formData.otherService}` : 'أخرى')
      : formData.serviceNeeded;

    try {
      await sendFormToOfficialEmail({
        category: 'services',
        formType: 'نموذج طلب الخدمات (Modal) – Devotix Media',
        fullName: formData.name,
        name: formData.name,
        profession: formData.profession,
        heardFrom: finalHeardFrom,
        businessType: formData.businessType,
        country: finalCountry,
        phone: formData.phone,
        email: formData.email,
        serviceNeeded: finalService,
        service: finalService,
        hasSocialPages: formData.hasSocialPages,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      profession: '',
      heardFrom: 'الانستجرام',
      otherHeardFrom: '',
      businessType: '',
      country: 'EGYPT',
      otherCountry: '',
      phone: '',
      email: '',
      serviceNeeded: 'احتاج الى ادارة سوشيال ميديا',
      otherService: '',
      hasSocialPages: 'نعم',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl transition-colors max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 flex-shrink-0">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-brand-red">
                {isRtl ? 'طلب خدمة جديدة' : 'SERVICES REQUEST'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display mt-0.5">
              {isRtl ? 'تعال نبني شغلك باحترافية' : "LET'S TALK BUSINESS"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-brand-red text-neutral-600 dark:text-neutral-400 hover:text-white flex items-center justify-center transition-colors border border-neutral-200 dark:border-neutral-800 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-10 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-brand-red/20 text-brand-red flex items-center justify-center mb-3 border border-brand-red/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display">
                {isRtl ? 'تم استلام طلبك بنجاح' : 'REQUEST RECEIVED'}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md font-medium leading-relaxed">
                {isRtl
                  ? 'شكراً لتواصلك مع ديفوتيكس ميديا! تم تسجيل طلبك في شيت المتابعة وسيتواصل معك فريقنا خلال ساعات.'
                  : 'Your service request has been logged and synced. Our team will contact you shortly.'}
              </p>
              <button
                onClick={handleReset}
                className="mt-6 px-8 py-2.5 bg-brand-red hover:bg-brand-redHover text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                {isRtl ? 'إغلاق' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* 1. Name & 2. Profession */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    {isRtl ? 'الاسم' : 'Name'} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isRtl ? 'أحمد محمد' : 'Your name'}
                    className="w-full px-3.5 py-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-xs focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    {isRtl ? 'بتشتغل في إيه وايه تخصصك؟' : 'Your job & speciality?'} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    placeholder={isRtl ? 'مثال: رائد أعمال / صاحب متجر' : 'e.g. Founder, Store Owner'}
                    className="w-full px-3.5 py-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-xs focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
              </div>

              {/* 3. عرفتنا منين ؟ */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  {isRtl ? 'عرفتنا منين ؟' : 'How did you hear about us?'} <span className="text-brand-red">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES_HEARD_FROM_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setFormData({ ...formData, heardFrom: opt })}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                        formData.heardFrom === opt
                          ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                          : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {formData.heardFrom === 'أخرى' && (
                  <input
                    type="text"
                    required
                    placeholder={isRtl ? 'اذكر المصدر هنا...' : 'Specify how you found us...'}
                    value={formData.otherHeardFrom}
                    onChange={(e) => setFormData({ ...formData, otherHeardFrom: e.target.value })}
                    className="w-full mt-2 px-3 py-1.5 rounded-lg bg-white dark:bg-black/60 border border-brand-red text-xs text-neutral-900 dark:text-white focus:outline-none"
                  />
                )}
              </div>

              {/* 4. نوع البيزنس؟ & 5. الدوله */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    {isRtl ? 'نوع البيزنس؟' : 'Business Type?'}
                  </label>
                  <input
                    type="text"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    placeholder={isRtl ? 'مثال: ملابس، مطاعم، عيادات' : 'e.g. Retail, Food, Medical'}
                    className="w-full px-3.5 py-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-xs focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    {isRtl ? 'الدوله' : 'Country'} <span className="text-brand-red">*</span>
                  </label>
                  <div className="flex gap-2">
                    {SERVICES_COUNTRY_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, country: opt })}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                          formData.country === opt
                            ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                            : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {formData.country === 'أخرى' && (
                    <input
                      type="text"
                      required
                      placeholder={isRtl ? 'اكتب اسم الدولة...' : 'Enter country name...'}
                      value={formData.otherCountry}
                      onChange={(e) => setFormData({ ...formData, otherCountry: e.target.value })}
                      className="w-full mt-2 px-3 py-1.5 rounded-lg bg-white dark:bg-black/60 border border-brand-red text-xs text-neutral-900 dark:text-white focus:outline-none"
                    />
                  )}
                </div>
              </div>

              {/* 6. Phone & 7. Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    {isRtl ? 'رقم تليفونك' : 'Phone Number'} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+20 100 000 0000"
                    className="w-full px-3.5 py-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-xs focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    {isRtl ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-xs focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
              </div>

              {/* 8. Service Needed */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  {isRtl ? 'ما الخدمه الذي تحتاجه' : 'What service do you need?'} <span className="text-brand-red">*</span>
                </label>
                <div className="space-y-1.5">
                  {SERVICES_NEEDED_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setFormData({ ...formData, serviceNeeded: opt })}
                      className={`w-full p-2.5 rounded-lg text-xs font-semibold text-start flex items-center gap-2.5 transition-all cursor-pointer ${
                        formData.serviceNeeded === opt
                          ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                          : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                          formData.serviceNeeded === opt ? 'border-white' : 'border-neutral-400'
                        }`}
                      >
                        {formData.serviceNeeded === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="leading-snug text-[11.5px]">{opt}</span>
                    </button>
                  ))}
                </div>
                {formData.serviceNeeded === 'أخرى' && (
                  <input
                    type="text"
                    required
                    placeholder={isRtl ? 'اكتب تفاصيل الخدمة...' : 'Specify the service you need...'}
                    value={formData.otherService}
                    onChange={(e) => setFormData({ ...formData, otherService: e.target.value })}
                    className="w-full mt-2 px-3.5 py-2 rounded-lg bg-white dark:bg-black/60 border border-brand-red text-xs text-neutral-900 dark:text-white focus:outline-none"
                  />
                )}
              </div>

              {/* 9. Has Social Pages */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  {isRtl ? 'هل لديك صفحات حالياً للبزنس على السوشيال ميديا؟' : 'Existing social media pages?'} <span className="text-brand-red">*</span>
                </label>
                <div className="flex gap-6 pt-0.5">
                  {SERVICES_SOCIAL_PAGES_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      onClick={() => setFormData({ ...formData, hasSocialPages: opt })}
                      className="inline-flex items-center gap-2 cursor-pointer select-none"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          formData.hasSocialPages === opt ? 'border-brand-red' : 'border-neutral-400 dark:border-neutral-600'
                        }`}
                      >
                        {formData.hasSocialPages === opt && <div className="w-2 h-2 rounded-full bg-brand-red" />}
                      </div>
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-brand-red hover:bg-brand-redHover disabled:opacity-75 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 shadow-lg shadow-brand-red/25 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{isRtl ? 'جاري الإرسال والمزامنة...' : 'Submitting...'}</span>
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
    </div>
  );
}
