import React, { useEffect, useState } from 'react';
import { X, Briefcase, MapPin, Clock, ArrowUpRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { sendFormToOfficialEmail } from '../utils/sendEmail';

export default function CareerModal({ isOpen, onClose }) {
  const { t, isRtl } = useThemeLanguage();
  const [selectedJob, setSelectedJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');

  const positions = isRtl ? [
    {
      id: 'senior-motion',
      title: 'كبير مصممي الرسوم المتحركة وثلاثية الأبعاد',
      department: 'الإنتاج والسينما',
      location: 'عن بعد / هجين (القاهرة / دبي)',
      type: 'دوام كامل',
      description: 'قيادة التصميم البصري وأصول CGI ثلاثية الأبعاد للعلامات التجارية الفاخرة وحملات السيارات.'
    },
    {
      id: 'fullstack-engineer',
      title: 'كبير مهندسي الواجهات والتجارب التفاعلية',
      department: 'هندسة البرمجيات',
      location: 'عن بعد / لندن',
      type: 'دوام كامل',
      description: 'تطوير تجارب الويب التفاعلية ثلاثية الأبعاد WebGL، ومنصات React/Next.js عالية الأداء.'
    },
    {
      id: 'media-buyer',
      title: 'مسؤول أول شراء المساحات الإعلانية والأداء',
      department: 'النمو والبيانات',
      location: 'عن بعد',
      type: 'دوام كامل',
      description: 'إدارة ميزانيات إعلانية ضخمة عبر منصات Meta، وGoogle، وTikTok مع تحقيق أعلى عائد استثماري ROAS.'
    },
    {
      id: 'creative-director',
      title: 'مدير إبداعي مشارك',
      department: 'الهوية والإشراف الفني',
      location: 'هجين (القاهرة / نيويورك)',
      type: 'دوام كامل',
      description: 'الإشراف على حملات العلامات التجارية الفاخرة متعددة القنوات، والإخراج الفني، والرواية البصرية.'
    }
  ] : [
    {
      id: 'senior-motion',
      title: 'Senior 3D / Motion Designer',
      department: 'PRODUCTION & CINEMA',
      location: 'Remote / Hybrid (NYC / Dubai)',
      type: 'Full-Time',
      description: 'Lead visual design and 3D CGI commercial assets for global automotive and luxury brands.'
    },
    {
      id: 'fullstack-engineer',
      title: 'Senior Creative Technologist / Frontend',
      department: 'SOFTWARE ENGINEERING',
      location: 'Remote / London',
      type: 'Full-Time',
      description: 'Architect WebGL 3D web experiences, React/Next.js interactive portfolios, and digital agency platforms.'
    },
    {
      id: 'media-buyer',
      title: 'Performance Media Buying Lead',
      department: 'GROWTH & DATA',
      location: 'Remote',
      type: 'Full-Time',
      description: 'Manage $10M+ annual programmatic, Meta, TikTok, and Google advertising budgets with high ROAS.'
    },
    {
      id: 'creative-director',
      title: 'Associate Creative Director',
      department: 'BRAND & ART DIRECTION',
      location: 'Hybrid (NYC / Tokyo)',
      type: 'Full-Time',
      description: 'Oversee multi-channel luxury brand campaigns, editorial direction, and visual storytelling.'
    }
  ];

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

  const handleApply = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendFormToOfficialEmail({
        formType: 'Career Modal Application',
        jobTitle: selectedJob ? selectedJob.title : 'General Career Role',
        jobDepartment: selectedJob ? selectedJob.department : '',
        name: applicantName,
        email: applicantEmail,
        portfolioUrl: portfolioLink,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setApplied(true);
    }
  };

  const handleReset = () => {
    setApplied(false);
    setSelectedJob(null);
    setApplicantName('');
    setApplicantEmail('');
    setPortfolioLink('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh] text-neutral-900 dark:text-white transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-brand-red">
                {isRtl ? 'انضم لديفوتيكس ميديا' : 'JOIN DEVOTIX MEDIA'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display mt-0.5">
              {isRtl ? 'الوظائف والفرص المتاحة' : 'CAREERS & OPPORTUNITIES'}
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
          {applied ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-brand-red/20 text-brand-red flex items-center justify-center mb-4 border border-brand-red/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display">
                {isRtl ? 'تم تقديم الطلب بنجاح' : 'APPLICATION SUBMITTED'}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
                {isRtl
                  ? 'شكراً لتقديمك للانضمام إلى فريق ديفوتيكس. سيراجع فريق الاستقطاب ملفك وسنتواصل معك قريباً.'
                  : 'Thank you for applying to join the Devotix team. Our talent acquisition leads will review your portfolio and reach out shortly.'}
              </p>
              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 bg-brand-red hover:bg-brand-redHover text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
              >
                {isRtl ? 'تم' : 'Done'}
              </button>
            </div>
          ) : selectedJob ? (
            /* Application Form for Selected Job */
            <div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-brand-red font-semibold uppercase mb-4 flex items-center gap-1 cursor-pointer"
              >
                <span>{isRtl ? '→ العودة لجميع الوظائف' : '← Back to all roles'}</span>
              </button>
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 mb-6">
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-red">
                  {selectedJob.department}
                </span>
                <h4 className="text-lg font-black text-neutral-900 dark:text-white uppercase font-display mt-0.5">
                  {selectedJob.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{selectedJob.description}</p>
              </div>

              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    {isRtl ? 'الاسم بالكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder={isRtl ? 'مصطفى المصلحي' : 'Alex Morgan'}
                    className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white text-xs placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    {isRtl ? 'البريد الإلكتروني *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white text-xs placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    {isRtl ? 'رابط البورتفوليو / بيهانس / سابقة الأعمال *' : 'Portfolio / GitHub / Reel URL *'}
                  </label>
                  <input
                    type="url"
                    required
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    placeholder="https://behance.net/alex"
                    className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white text-xs placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-brand-red"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-brand-red hover:bg-brand-redHover disabled:opacity-75 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{isRtl ? 'جاري الإرسال إلى devotixm@gmail.com...' : 'Sending to devotixm@gmail.com...'}</span>
                    </>
                  ) : (
                    <span>{isRtl ? 'إرسال طلب التقديم' : 'SUBMIT APPLICATION'}</span>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Open Positions List */
            <div className="space-y-3.5">
              <div className="mb-4">
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                  {isRtl
                    ? 'نبحث دائماً عن صناع أفلام استثنائيين، وفنانين ثلاثيي الأبعاد، ومصممي علامات، ومهندسي برمجيات يبتكرون بلا حدود.'
                    : 'We are always seeking world-class creatives, cinematic directors, 3D artists, and software engineers who push boundaries.'}
                </p>
              </div>

              {positions.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="group p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 hover:border-brand-red/50 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-brand-red">
                      {job.department}
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-neutral-900 dark:text-white uppercase font-display group-hover:text-brand-red transition-colors">
                      {job.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-500" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-500" />
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <button className="self-start sm:self-center px-3.5 py-1.5 bg-neutral-200 dark:bg-neutral-800 group-hover:bg-brand-red group-hover:text-white text-neutral-700 dark:text-neutral-300 text-[10px] font-bold uppercase rounded transition-colors flex items-center gap-1 cursor-pointer">
                    <span>{isRtl ? 'التقديم' : 'APPLY'}</span>
                    <ArrowUpRight className="w-3 h-3 rtl:rotate-[-90deg]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
