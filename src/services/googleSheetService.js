/**
 * Google Sheet Synchronization Service for Devotix Job Applications
 * Connects directly to Google Sheets via Google Apps Script Web App Webhook.
 */
import { getSocialLinks } from '../data/socialLinks';

export const DEVOTIX_JOB_POSITIONS = [
  'مونتير (Montage)',
  'مصمم جرافيك (Graphic Designer)',
  'متخصص سوشيال ميديا (Social Media Specialist)',
  'موديريتور (Moderator)',
  'Account Manager',
  'Content Creator',
  'Photographer',
  'Sales',
  'محاسب',
  'HR',
  'PR',
  'Assistance',
  'web Developer',
  'Digital Marketing strategis',
];

export const EXPERIENCE_YEARS_OPTIONS = [
  'اقل من سنه',
  'اكثر من سنه ونص',
  'فوق السنتين',
];

// Services / Project Form Options
export const SERVICES_HEARD_FROM_OPTIONS = [
  'الانستجرام',
  'التيك توك',
  'حد رشحنا ليك',
  'اعلان',
  'أخرى',
];

export const SERVICES_COUNTRY_OPTIONS = [
  'EGYPT',
  'Saudi Arabia',
  'أخرى',
];

export const SERVICES_NEEDED_OPTIONS = [
  'احتاج الى ادارة سوشيال ميديا',
  'احتاج اعمل ويب سايت وابلكيشن موبيل',
  'احتاج اعمل حملات اعلانيه علي المنصات',
  'احتاج عمل بلان شهري لي البيزنس الخاص بي',
  'الإنتاج السينمائي وصناعة الفيديو',
  'الهوية البصرية والبراندينج',
  'أخرى',
];

export const SERVICES_SOCIAL_PAGES_OPTIONS = [
  'نعم',
  'لا',
];

/**
 * Get current Google Sheets Webhook URL configured in Admin Dashboard
 */
export function getGoogleSheetWebhookUrl() {
  try {
    const socials = getSocialLinks();
    const lsUrl = typeof window !== 'undefined' ? localStorage.getItem('devotix_google_sheet_webhook') : '';
    return (socials.googleSheetWebhookUrl || lsUrl || '').trim();
  } catch (e) {
    return '';
  }
}

/**
 * Save Google Sheets Webhook URL
 */
export function saveGoogleSheetWebhookUrl(url) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('devotix_google_sheet_webhook', (url || '').trim());
}

/**
 * Send submission row to Google Sheet (Automatically routes Job or Services submission)
 * @param {Object} data
 * @returns {Promise<{success: boolean, error?: string, skipped?: boolean}>}
 */
export async function sendToGoogleSheet(data) {
  const webhookUrl = getGoogleSheetWebhookUrl();
  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    return { skipped: true, reason: 'no_webhook_url' };
  }

  const isService =
    data.category === 'services' ||
    data.category === 'project' ||
    data.formType === 'services' ||
    Boolean(data.serviceNeeded) ||
    Boolean(data.profession);

  let payload;
  if (isService) {
    payload = {
      formType: 'services',
      timestamp: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
      fullName: data.fullName || data.name || '',
      profession: data.profession || data.businessDescription || '',
      heardFrom: data.heardFrom || '',
      businessType: data.businessType || '',
      country: data.country || '',
      phone: data.phone || data.whatsapp || '',
      email: data.email || '',
      serviceNeeded: data.serviceNeeded || data.service || '',
      hasSocialPages: data.hasSocialPages || '',
      source: data.formTitle || 'Devotix Website Services Form',
    };
  } else {
    payload = {
      formType: 'job',
      timestamp: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
      fullName: data.fullName || data.name || '',
      email: data.email || '',
      phone: data.phone || data.whatsapp || '',
      city: data.city || '',
      jobPosition: data.jobPosition || data.jobTitle || data.discipline || '',
      hasExperience: data.hasExperience === 'YES' || data.hasExperience === 'نعم' ? 'نعم' : 'لا',
      yearsOfExperience: data.yearsOfExperience || data.yearsExperience || 'بدون خبرة',
      resumeUrl: data.resumeUrl || data.fileName || '',
      source: 'Devotix Website Job Form',
    };
  }

  try {
    // Mode no-cors with text/plain is mandatory for Google Apps Script Web App endpoints from browser
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return { success: true };
  } catch (err) {
    console.warn('[Google Sheet] Submission error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Ready-to-use Google Apps Script Code Template (Supports both Jobs & Services tabs automatically)
 * Paste this in Google Sheets: Extensions (التوسيعات) > Apps Script > Save & Deploy as Web App
 */
export const GOOGLE_APPS_SCRIPT_CODE = `function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var isService = data.formType === 'services' || Boolean(data.serviceNeeded) || Boolean(data.profession);
    var targetSheetName = isService ? "طلبات الخدمات" : "طلبات التوظيف";
    var sheet = ss.getSheetByName(targetSheetName);

    if (!sheet) {
      var allSheets = ss.getSheets();
      if (allSheets.length === 1 && allSheets[0].getLastRow() === 0) {
        allSheets[0].setName(targetSheetName);
        sheet = allSheets[0];
      } else {
        sheet = ss.insertSheet(targetSheetName);
      }
    }

    // إعداد العناوين تلقائياً إذا كان الشيت جديداً
    if (sheet.getLastRow() === 0) {
      if (isService) {
        sheet.appendRow([
          "التاريخ والوقت",
          "الاسم",
          "بتشتغل في إيه وايه تخصصك؟",
          "عرفتنا منين ؟",
          "نوع البيزنس؟",
          "الدوله",
          "رقم الهاتف",
          "البريد الإلكتروني",
          "الخدمة المطلوبة",
          "صفحات سوشيال ميديا حالية؟",
          "المصدر"
        ]);
        sheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#1A73E8").setFontColor("#FFFFFF");
      } else {
        sheet.appendRow([
          "التاريخ والوقت",
          "الاسم بالكامل",
          "البريد الإلكتروني",
          "رقم الهاتف",
          "المدينة / مكان الإقامة",
          "الوظيفة المراد التقديم عليها",
          "هل توجد خبرة سابقة؟",
          "عدد سنين الخبرة",
          "رابط السيرة الذاتية (CV)",
          "المصدر"
        ]);
        sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#EA4335").setFontColor("#FFFFFF");
      }
      sheet.setFrozenRows(1);
    }

    if (isService) {
      sheet.appendRow([
        data.timestamp || new Date().toLocaleString('ar-EG'),
        data.fullName || data.name || "",
        data.profession || "",
        data.heardFrom || "",
        data.businessType || "",
        data.country || "",
        data.phone || "",
        data.email || "",
        data.serviceNeeded || "",
        data.hasSocialPages || "",
        data.source || "Devotix Services Form"
      ]);
    } else {
      sheet.appendRow([
        data.timestamp || new Date().toLocaleString('ar-EG'),
        data.fullName || data.name || "",
        data.email || "",
        data.phone || "",
        data.city || "",
        data.jobPosition || "",
        data.hasExperience || "",
        data.yearsOfExperience || "",
        data.resumeUrl || "",
        data.source || "Devotix Website"
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", type: isService ? "services" : "job" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
