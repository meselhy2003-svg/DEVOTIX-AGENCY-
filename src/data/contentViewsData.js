// Centralized Content Views & Virality Data Store
export const DEFAULT_CONTENT_VIEWS_DATA = [
  {
    id: 'view-reel-1',
    youtubeId: 'X7y6WTEykGw',
    url: 'https://youtube.com/shorts/X7y6WTEykGw',
    title: 'Tameez Aluminum | Dynamic Industrial Showcase',
    titleAr: 'مصنع تميز للألمنيوم | إنتاج متطور وصناعة دقيقة',
    client: 'TAMEEZ ALUMINUM',
    platform: 'tiktok',
    platformLabel: 'TikTok Viral',
    platformLabelAr: 'تيك توك فيروسي',
    views: '2.4M',
    viewsNumber: 2400000,
    likes: '148K',
    shares: '22.5K',
    duration: '00:50',
    image: 'https://img.youtube.com/vi/X7y6WTEykGw/hqdefault.jpg',
    category: 'reels',
    isVertical: true,
    tag: 'Trending #1',
    tagAr: 'الأكثر تداولاً #1'
  },
  {
    id: 'view-reel-2',
    youtubeId: 'TA-q_k0g6_8',
    url: 'https://youtube.com/shorts/TA-q_k0g6_8',
    title: 'Tameez Steel | Sawaed Al Riyadh Industrial Force',
    titleAr: 'مصنع تميز للحديد | سواعد الرياض – قوة وعزم وإنتاج',
    client: 'TAMEEZ STEEL FACTORY',
    platform: 'instagram',
    platformLabel: 'Instagram Reel',
    platformLabelAr: 'إنستغرام ريل',
    views: '1.8M',
    viewsNumber: 1800000,
    likes: '112K',
    shares: '18.4K',
    duration: '00:45',
    image: 'https://img.youtube.com/vi/TA-q_k0g6_8/hqdefault.jpg',
    category: 'reels',
    isVertical: true,
    tag: 'High Engagement',
    tagAr: 'تفاعل فائق'
  },
  {
    id: 'view-reel-3',
    youtubeId: 'mUfk_v38C6U',
    url: 'https://youtube.com/shorts/mUfk_v38C6U',
    title: 'Al-Tamimi Supply & Logistics Operation Reel',
    titleAr: 'جولة توريد وتوزيع الحديد لمشروع أسواق التميمي',
    client: 'TAMEEZ LOGISTICS',
    platform: 'youtube',
    platformLabel: 'YouTube Shorts',
    platformLabelAr: 'يوتيوب شورتس',
    views: '980K',
    viewsNumber: 980000,
    likes: '74K',
    shares: '9.2K',
    duration: '00:40',
    image: 'https://img.youtube.com/vi/mUfk_v38C6U/hqdefault.jpg',
    category: 'shorts',
    isVertical: true,
    tag: 'Viral Reach',
    tagAr: 'انتشار سريع'
  },
  {
    id: 'view-reel-4',
    youtubeId: 'c1u5w9uGzR8',
    url: 'https://youtube.com/shorts/c1u5w9uGzR8',
    title: 'Precision Metalwork & Engineering Masterclass',
    titleAr: 'دقة تشكيل المعادن والتصنيع الهندسي الفاخر',
    client: 'TAMEEZ STEEL FACTORY',
    platform: 'tiktok',
    platformLabel: 'TikTok Viral',
    platformLabelAr: 'تيك توك فيروسي',
    views: '3.1M',
    viewsNumber: 3100000,
    likes: '195K',
    shares: '34.1K',
    duration: '00:35',
    image: 'https://img.youtube.com/vi/c1u5w9uGzR8/hqdefault.jpg',
    category: 'reels',
    isVertical: true,
    tag: 'Top Performer',
    tagAr: 'الأعلى مشاهدة'
  },
  {
    id: 'view-reel-5',
    youtubeId: 'L-m_f4nLq1s',
    url: 'https://youtube.com/shorts/L-m_f4nLq1s',
    title: 'Advanced Factory Workflow & Automation Motion',
    titleAr: 'خطوط الإنتاج والأتمتة المتطورة بحركة سينمائية',
    client: 'DEVOTIX CREATIVE LAB',
    platform: 'instagram',
    platformLabel: 'Instagram Reel',
    platformLabelAr: 'إنستغرام ريل',
    views: '1.4M',
    viewsNumber: 1400000,
    likes: '89K',
    shares: '12.8K',
    duration: '00:42',
    image: 'https://img.youtube.com/vi/L-m_f4nLq1s/hqdefault.jpg',
    category: 'ads',
    isVertical: true,
    tag: 'High Conversion',
    tagAr: 'تحويل قياسي'
  },
  {
    id: 'view-reel-6',
    youtubeId: '4B8tV6_XU6s',
    url: 'https://youtube.com/shorts/4B8tV6_XU6s',
    title: 'Cinematic Visual Identity & Motion Teaser',
    titleAr: 'إعلان تشويقي سينمائي لهوية براند راقية',
    client: 'DEVOTIX PRODUCTION',
    platform: 'youtube',
    platformLabel: 'YouTube Shorts',
    platformLabelAr: 'يوتيوب شورتس',
    views: '860K',
    viewsNumber: 860000,
    likes: '62K',
    shares: '8.1K',
    duration: '00:48',
    image: 'https://img.youtube.com/vi/4B8tV6_XU6s/hqdefault.jpg',
    category: 'shorts',
    isVertical: true,
    tag: 'Cinematic Flow',
    tagAr: 'أسلوب سينمائي'
  }
];

const STORAGE_KEY = 'devotix_content_views_data';

export function getContentViewsData() {
  if (typeof window === 'undefined') return DEFAULT_CONTENT_VIEWS_DATA;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse content views from localStorage:', e);
  }
  return DEFAULT_CONTENT_VIEWS_DATA;
}

export function saveContentViewsData(items, syncCloud = true) {
  if (typeof window === 'undefined') return;
  try {
    if (!Array.isArray(items) || items.length === 0) {
      console.warn('saveContentViewsData: ignored empty or invalid array');
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('devotix_content_views_updated', { detail: items }));
    if (syncCloud) {
      import('../services/cmsSync').then(({ pushKeyToCloud, CMS_KEYS }) => {
        pushKeyToCloud(CMS_KEYS.CONTENT_VIEWS, items);
      }).catch(() => {});
    }
  } catch (e) {
    console.error('Failed to save content views to localStorage:', e);
  }
}

export function resetContentViewsData() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('devotix_content_views_updated', { detail: DEFAULT_CONTENT_VIEWS_DATA }));
  } catch (e) {
    console.error('Failed to reset content views in localStorage:', e);
  }
}
