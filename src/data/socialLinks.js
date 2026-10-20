// Centralized Social Media Links configuration for Devotix Media
// Synchronized with localStorage so changes from Admin Dashboard update live across the entire site

export const DEFAULT_SOCIAL_LINKS = {
  facebook: 'https://facebook.com/devotixmedia',
  instagram: 'https://instagram.com/devotixmedia',
  tiktok: 'https://tiktok.com/@devotixmedia',
  whatsapp: 'https://wa.me/201010185181',
  whatsappEgypt: 'https://wa.me/201010185181',
  whatsappSaudi: 'https://wa.me/966558661845',
  linkedin: 'https://linkedin.com/company/devotixmedia',
  youtube: 'https://youtube.com/@devotixmedia',
  email: 'devotixm@gmail.com',
  projectRequestEmail: 'devotixm@gmail.com',
  jobApplicationEmail: 'devotixm@gmail.com',
  googleSheetWebhookUrl: 'https://script.google.com/macros/s/AKfycbz26eaXrouwITyCHDkIAQo8N9HatHyTX0w3IJ_11DJFZqebcrDdmN8UgAJW2sMuiBLZTw/exec',
  googleSheetViewUrl: '',
};

export const SOCIAL_PLATFORMS_META = [
  {
    key: 'instagram',
    name: 'Instagram',
    handle: '@devotixmedia',
    iconPath: '/assets/contact/Instagram.png',
    color: '#E1306C'
  },
  {
    key: 'tiktok',
    name: 'TikTok',
    handle: '@devotixmedia',
    iconPath: '/assets/contact/TikTok.png',
    color: '#000000'
  },
  {
    key: 'facebook',
    name: 'Facebook',
    handle: '@devotixmedia',
    iconPath: '/assets/contact/Facebook.png',
    color: '#1877F2'
  },
  {
    key: 'linkedin',
    name: 'LinkedIn',
    handle: '@devotixmedia',
    iconPath: '/assets/contact/LinkedIn.png',
    color: '#0A66C2'
  },
  {
    key: 'twitter',
    name: 'X (Twitter)',
    handle: '@devotixmedia',
    iconPath: null,
    color: '#000000'
  },
  {
    key: 'youtube',
    name: 'YouTube',
    handle: '@devotixmedia',
    iconPath: null,
    color: '#FF0000'
  },
  {
    key: 'whatsapp',
    name: 'WhatsApp',
    handle: '+20 101 018 5181',
    iconPath: '/assets/contact/WhatsApp.png',
    color: '#25D366'
  },
  {
    key: 'telegram',
    name: 'Telegram',
    handle: '@devotix',
    iconPath: '/assets/contact/Telegram.png',
    color: '#229ED9'
  },
  {
    key: 'snapchat',
    name: 'Snapchat',
    handle: '@devotixmedia',
    iconPath: '/assets/contact/Snapchat.png',
    color: '#FFFC00'
  }
];

export function getSocialLinks() {
  try {
    const saved = localStorage.getItem('devotix_social_links');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_SOCIAL_LINKS, ...parsed };
    }
  } catch (e) {
    // fallback
  }
  return DEFAULT_SOCIAL_LINKS;
}

export function saveSocialLinks(newLinks, syncCloud = true) {
  try {
    localStorage.setItem('devotix_social_links', JSON.stringify(newLinks));
    window.dispatchEvent(new Event('devotix_social_links_updated'));
    if (syncCloud) {
      import('../services/cmsSync').then(({ pushKeyToCloud, CMS_KEYS }) => {
        pushKeyToCloud(CMS_KEYS.SOCIAL, newLinks);
      }).catch(() => {});
    }
  } catch (e) {
    // ignore
  }
}

export function resetSocialLinks() {
  try {
    localStorage.removeItem('devotix_social_links');
    window.dispatchEvent(new Event('devotix_social_links_updated'));
  } catch (e) {
    // ignore
  }
}

