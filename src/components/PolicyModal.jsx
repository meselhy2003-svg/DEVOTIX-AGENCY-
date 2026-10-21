import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export default function PolicyModal({ type, onClose }) {
  const { isRtl } = useThemeLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [type, onClose]);

  if (!type) return null;

  const isPrivacy = type === 'privacy';
  const title = isPrivacy
    ? (isRtl ? 'سياسة الخصوصية' : 'Privacy Policy')
    : (isRtl ? 'شروط الخدمة' : 'Terms of Service');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <ShieldCheck className="w-5 h-5 text-brand-red" />
            <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-display">
              {title}
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
        <div className="overflow-y-auto p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed rtl:leading-[1.85]">
          {isRtl ? (
            isPrivacy ? (
              <>
                <p>
                  <strong>تاريخ السريان:</strong> {new Date().getFullYear()}
                </p>
                <p>
                  في <strong>ديفوتيكس ميديا</strong>، نقدر ثقتكم بنا كوكالة إعلامية وإبداعية رائدة. توضح هذه السياسة كيفية تعاملنا مع البيانات المجمعة عبر موقعنا، واستشارات العلامات التجارية، وخدمات الإنتاج الرقمي.
                </p>
                <h4 className="text-base font-bold text-white uppercase pt-2">1. جمع المعلومات</h4>
                <p>
                  نحن نجمع فقط المعلومات المقدمة طواعية من خلال نماذج الاستفسار (مثل الاسم، البريد الإلكتروني، تفاصيل الشركة، وموجز المشروع) لتسهيل التواصل المهني وتقديم عروض الأسعار.
                </p>
                <h4 className="text-base font-bold text-white uppercase pt-2">2. السرية وحماية الملكية الفكرية</h4>
                <p>
                  جميع المفاهيم الإبداعية، وأصول العلامات التجارية، والبيانات الاستراتيجية المشتركة مع ديفوتيكس ميديا محمية بموجب معايير عدم الإفصاح ولن يتم بيعها أو تأجيرها أو توزيعها لأي أطراف ثالثة.
                </p>
                <h4 className="text-base font-bold text-white uppercase pt-2">3. الأمان التقني</h4>
                <p>
                  نطبق أعلى بروتوكولات التشفير والنقل الآمن لحماية جميع مراسلات العملاء وبيانات المشاريع.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>تاريخ السريان:</strong> {new Date().getFullYear()}
                </p>
                <p>
                  من خلال التعاقد مع <strong>ديفوتيكس ميديا</strong> واستخدام خدماتنا الرقمية، فإنك توافق على الامتثال لشروط التعامل المهنية الخاصة بنا.
                </p>
                <h4 className="text-base font-bold text-white uppercase pt-2">1. ملكية المخرجات الإبداعية</h4>
                <p>
                  تصبح جميع الأفلام الإعلانية وأنظمة الهوية والبرمجيات المطورة بموجب العقود ملكية حصرية للعميل عند الاعتماد النهائي وتسوية الحسابات.
                </p>
                <h4 className="text-base font-bold text-white uppercase pt-2">2. نطاق الإنتاج والتعديلات</h4>
                <p>
                  تخضع الجداول الزمنية ومراحل المراجعة الإبداعية لاتفاقية بيان العمل (SOW) المعتمدة قبل بدء الإنتاج.
                </p>
                <h4 className="text-base font-bold text-white uppercase pt-2">3. حدود المسؤولية</h4>
                <p>
                  تقدم ديفوتيكس ميديا خدمات الإنتاج الإبداعي والرقمي وفقاً لأعلى معايير الجودة والاحترافية الصناعية.
                </p>
              </>
            )
          ) : (
            isPrivacy ? (
              <>
                <p>
                  <strong>Effective Date:</strong> {new Date().getFullYear()}
                </p>
                <p>
                  At <strong>Devotix Media</strong>, we value the trust you place in our creative media agency. This Privacy Policy details how we handle information collected through our website, brand consultations, and digital production services.
                </p>
                <h4 className="text-base font-bold text-white uppercase pt-2">1. Information Collection</h4>
                <p>
                  We only collect information voluntarily submitted through our inquiry forms (such as name, email address, company details, and project briefs) to facilitate business communications and proposal deliveries.
                </p>
                <h4 className="text-base font-bold text-white uppercase pt-2">2. Confidentiality & IP Protection</h4>
                <p>
                  All creative concepts, client brand assets, and strategic data shared with Devotix Media are protected under non-disclosure standards and will never be sold, leased, or distributed to third parties.
                </p>
                <h4 className="text-base font-bold text-white uppercase pt-2">3. Security</h4>
                <p>
                  We implement industry-grade encryption and secure transmission protocols to safeguard all client correspondence and project data.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Effective Date:</strong> {new Date().getFullYear()}
                </p>
                <p>
                  By engaging with <strong>Devotix Media</strong> and utilizing our digital agency services, you agree to comply with our standard terms of engagement.
                </p>
                <h4 className="text-base font-bold text-white uppercase pt-2">1. Creative Ownership & Deliverables</h4>
                <p>
                  All completed commercial films, branding systems, codebases, and digital assets developed under contract become the exclusive property of the client upon final project sign-off and balance settlement.
                </p>
                <h4 className="text-base font-bold text-white uppercase pt-2">2. Production Scope & Revisions</h4>
                <p>
                  Project timelines, milestone deliverables, and creative revision rounds are governed by individual client Statement of Work (SOW) agreements agreed upon prior to production initiation.
                </p>
                <h4 className="text-base font-bold text-white uppercase pt-2">3. Limitation of Liability</h4>
                <p>
                  Devotix Media delivers high-end creative and digital production services with professional industry diligence.
                </p>
              </>
            )
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-brand-red hover:bg-brand-redHover text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
          >
            {isRtl ? 'فهمت ذلك' : 'I Understand'}
          </button>
        </div>
      </div>
    </div>
  );
}
