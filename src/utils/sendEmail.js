/**
 * Universal Form Submitter for Devotix Media
 * Intelligently routes submissions to the configured recipient email:
 * - Project Requests ("طلب مشروع" / Contact Form / Contact Modal) -> projectRequestEmail
 * - Job Applications ("التقديم على وظيفة" / Job Apply / Send CV) -> jobApplicationEmail
 * Every submission is also archived locally into the CMS Dashboard Leads Inbox.
 */
import { saveStoredLead } from '../data/leadsInbox';
import { getSocialLinks } from '../data/socialLinks';
import { sendToGoogleSheet } from '../services/googleSheetService';

export const OFFICIAL_DEVOTIX_EMAIL = 'devotixm@gmail.com';

/**
 * Resolves the target recipient email according to the form type
 * @param {string} formType
 * @param {string} category
 * @returns {string}
 */
export function getFormRecipientEmail(formType = '', category = null) {
  try {
    const socials = getSocialLinks();
    const lower = (formType || '').toLowerCase();

    // Check if this is a job application / CV submission
    const isJob =
      category === 'job' ||
      category === 'career' ||
      lower.includes('job') ||
      lower.includes('cv') ||
      lower.includes('career') ||
      lower.includes('وظيفة') ||
      lower.includes('توظيف');

    if (isJob) {
      return (socials.jobApplicationEmail || socials.email || OFFICIAL_DEVOTIX_EMAIL).trim();
    }

    // Default: Project Requests & General Inquiries
    return (socials.projectRequestEmail || socials.email || OFFICIAL_DEVOTIX_EMAIL).trim();
  } catch (e) {
    return OFFICIAL_DEVOTIX_EMAIL;
  }
}

/**
 * Submit form data to the designated recipient email and local dashboard inbox
 * @param {Object} data - Key/value fields of the form submission
 * @returns {Promise<{success: boolean, recipient: string, note?: string}>}
 */
export async function sendFormToOfficialEmail(data) {
  const recipientEmail = getFormRecipientEmail(data.formType, data.category);

  // 1. Immediately archive in local Dashboard Inbox
  try {
    saveStoredLead({
      name: data.fullName || data.name || 'Anonymous',
      email: data.email || '',
      phone: data.phone || data.whatsapp || '',
      service: data.serviceNeeded || data.service || data.services?.join(', ') || data.jobTitle || 'خدمات / مشروع',
      message: data.profession
        ? `التخصص: ${data.profession} | عرفتنا من: ${data.heardFrom || ''} | صفحات حالية: ${data.hasSocialPages || ''} | نوع البيزنس: ${data.businessType || ''}`
        : (data.message || data.businessDescription || data.portfolioUrl || ''),
      type: data.formType || 'Contact / Services Form',
      country: data.country || '',
      budget: data.businessType || data.budget || '',
      recipientEmail,
    });
  } catch (err) {
    console.warn('Could not archive lead to local inbox:', err);
  }

  // 1.5 Sync to connected Google Sheet (Both Jobs and Services)
  try {
    sendToGoogleSheet(data);
  } catch (sheetErr) {
    console.warn('Google Sheet sync caught error:', sheetErr);
  }

  // 2. Prepare payload for email dispatch
  const payload = {
    _subject: data._subject || `[Devotix] ${data.formType || 'New Form Submission'}: ${data.fullName || data.name || 'Visitor'}`,
    _replyto: data.email || undefined,
    _template: 'table',
    _captcha: 'false',
    Official_Recipient: recipientEmail,
    Target_Form: data.formType || 'Website Form',
    Submission_Date: new Date().toLocaleString(),
    ...data,
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true, recipient: recipientEmail };
    } else {
      // Non-200 response still archived locally
      return { success: true, note: 'Saved locally in CMS', recipient: recipientEmail };
    }
  } catch (networkError) {
    // Offline or network error: submission was already safely saved to CMS dashboard
    console.warn('Network delivery attempted, submission preserved locally:', networkError);
    return { success: true, note: 'Saved locally in CMS', recipient: recipientEmail };
  }
}
