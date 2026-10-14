import React, { useState, useEffect } from 'react';
import TitleAccent from './TitleAccent';
import { Play, X, Film, ArrowUpRight, Maximize2 } from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

// 4 Distinct Video Galleries matching the requested sections:
// Reals, Proms, Edits Videos, Idas & ADS
const PRODUCTION_GALLERIES = [
  {
    id: 'reals',
    coverId: 'cover-1',
    title: 'REELS',
    titleAr: 'ريلز وشورتس',
    category: 'VERTICAL REELS • 9:16',
    categoryAr: 'فيديوهات ريلز عمودية • 9:16',
    tag: 'GALLERY 1 • 9 REELS',
    coverImage: 'https://img.youtube.com/vi/X7y6WTEykGw/hqdefault.jpg',
    description: 'Dynamic vertical videos, YouTube Shorts, and high-converting social media reels.',
    descriptionAr: 'فيديوهات عمودية سريعة وشورتس مخصصة لمنصات التواصل الاجتماعي بتصوير سينمائي جذاب.',
    isVertical: true,
    videos: [
      {
        id: 'reel-1',
        youtubeId: 'X7y6WTEykGw',
        url: 'https://youtube.com/shorts/X7y6WTEykGw',
        title: 'Tameez Aluminum Factory | Advanced Manufacturing',
        titleAr: 'مصنع تميز للألمنيوم | صناعة وإنتاج الألمنيوم المتقدم',
        client: 'TAMEEZ ALUMINUM',
        category: 'FACTORY REEL • 9:16',
        duration: '00:50',
        image: 'https://img.youtube.com/vi/X7y6WTEykGw/hqdefault.jpg',
        isVertical: true,
        description: 'Fast-paced vertical reel showing cutting-edge aluminum cutting, extrusion, and assembly operations.',
      },
      {
        id: 'reel-2',
        youtubeId: 'TA-q_k0g6_8',
        url: 'https://youtube.com/shorts/TA-q_k0g6_8',
        title: 'Tameez Steel | Sawaed Al Riyadh – Strength & Excellence',
        titleAr: 'مصنع تميز للحديد | سواعد الرياض – قوة وجودة وتميز',
        client: 'TAMEEZ STEEL FACTORY',
        category: 'INDUSTRIAL SHORT',
        duration: '00:45',
        image: 'https://img.youtube.com/vi/TA-q_k0g6_8/hqdefault.jpg',
        isVertical: true,
        description: 'High-energy vertical short capturing heavy steel fabrication, welding sparks, and skilled craftsmanship.',
      },
      {
        id: 'reel-3',
        youtubeId: 'mUfk_v38C6U',
        url: 'https://youtube.com/shorts/mUfk_v38C6U',
        title: 'Tameez Steel | Steel Manufacturing at Al-Tamimi Market',
        titleAr: 'مصنع تميز للحديد | جولة في تصنيع وتوريد الحديد',
        client: 'TAMEEZ STEEL FACTORY',
        category: 'LOGISTICS SHORT',
        duration: '00:40',
        image: 'https://img.youtube.com/vi/mUfk_v38C6U/hqdefault.jpg',
        isVertical: true,
        description: 'Behind-the-scenes vertical showcase of structural steel distribution and on-site engineering.',
      },
      {
        id: 'reel-4',
        youtubeId: 'Iem_JFdBt10',
        url: 'https://youtube.com/shorts/Iem_JFdBt10',
        title: 'Butterfly Shrimp | Al Shaeery',
        titleAr: 'جمبري باترفلاي المقرمش | أسماك الشعيري',
        client: 'AL SHAEERY SEAFOOD',
        category: 'FOOD REEL • 9:16',
        duration: '00:30',
        image: 'https://img.youtube.com/vi/Iem_JFdBt10/hqdefault.jpg',
        isVertical: true,
        description: 'Sizzling vertical food reel focusing on crispy golden butterfly shrimp dipping action.',
      },
      {
        id: 'reel-5',
        youtubeId: '-sUvX3XFF2g',
        url: 'https://youtube.com/shorts/-sUvX3XFF2g',
        title: 'Spicy Seafood Harissa | Al Shaeery 🔥',
        titleAr: 'هريسة سي فود حارة ومشبعة | أسماك الشعيري 🔥',
        client: 'AL SHAEERY SEAFOOD',
        category: 'HOT GOURMET SHORT',
        duration: '00:35',
        image: 'https://img.youtube.com/vi/-sUvX3XFF2g/hqdefault.jpg',
        isVertical: true,
        description: 'Vibrant vertical reel capturing spicy bubbling seafood harissa straight from the flame.',
      },
      {
        id: 'reel-6',
        youtubeId: 'eN2vBWxqXsU',
        url: 'https://youtube.com/shorts/eN2vBWxqXsU',
        title: 'Grilled & Seasoned Shrimp | Al Shaeery 🦐',
        titleAr: 'جمبري مشوي ومتبل بالخلطة السرية | أسماك الشعيري 🦐',
        client: 'AL SHAEERY SEAFOOD',
        category: 'CULINARY REEL',
        duration: '00:30',
        image: 'https://img.youtube.com/vi/eN2vBWxqXsU/hqdefault.jpg',
        isVertical: true,
        description: 'Succulent seasoned grilled shrimp skewers sizzling with lemon dressing.',
      },
      {
        id: 'reel-7',
        youtubeId: 'Wj__2-dxsjg',
        url: 'https://youtube.com/shorts/Wj__2-dxsjg',
        title: 'Al Shaeery — A Taste of the Sea 🦞',
        titleAr: 'أسماك الشعيري — طعم البحر الحقيقي 🦞',
        client: 'AL SHAEERY SEAFOOD',
        category: 'RESTAURANT HIGHLIGHT',
        duration: '00:45',
        image: 'https://img.youtube.com/vi/Wj__2-dxsjg/hqdefault.jpg',
        isVertical: true,
        description: 'Dynamic overview of fresh daily catch selection, customer dining, and signature seafood platters.',
      },
      {
        id: 'reel-8',
        youtubeId: 'Qi8-eAoEdKc',
        url: 'https://youtube.com/shorts/Qi8-eAoEdKc',
        title: 'MILA — Moments Worth Experiencing',
        titleAr: 'ميلا — لحظات تستحق أن تعاش وتتكرر',
        client: 'MILA',
        category: 'LIFESTYLE SHORT',
        duration: '00:30',
        image: 'https://img.youtube.com/vi/Qi8-eAoEdKc/hqdefault.jpg',
        isVertical: true,
        description: 'Vibe check short showing cozy seating, chilled drinks, and memorable social gatherings.',
      },
      {
        id: 'reel-9',
        youtubeId: 'A4PPzU8uksg',
        url: 'https://youtube.com/shorts/A4PPzU8uksg',
        title: 'MILA — Where the Day Begins ☀️',
        titleAr: 'ميلا — حيث تبدأ صباحاتك بأجمل إطلالة ☀️',
        client: 'MILA',
        category: 'MORNING REEL',
        duration: '00:35',
        image: 'https://img.youtube.com/vi/A4PPzU8uksg/hqdefault.jpg',
        isVertical: true,
        description: 'Golden morning light, freshly brewed espresso, and serene start of day ambiance.',
      },
    ],
  },
  {
    id: 'proms',
    coverId: 'cover-2',
    title: 'PROMOS',
    titleAr: 'إعلانات ترويجية وبرومو',
    category: 'COMMERCIAL CINEMA • 16:9 4K',
    categoryAr: 'إنتاج سينمائي • 4K',
    tag: 'GALLERY 2 • 8 FILMS',
    coverImage: 'https://img.youtube.com/vi/7xkk1GqBHi4/maxresdefault.jpg',
    description: 'Cinema-grade commercial productions, industrial films, and luxury brand showcases.',
    descriptionAr: 'تصوير إعلانات سينمائية عالية الجودة للشركات والمصانع والمطاعم الفاخرة.',
    isVertical: false,
    videos: [
      {
        id: 'promo-1',
        youtubeId: '7xkk1GqBHi4',
        url: 'https://youtu.be/7xkk1GqBHi4',
        title: 'Tameez Steel Factory | Excellence in Steel Manufacturing',
        titleAr: 'مصنع تميز للحديد | قمة التميز في صناعة وتوريد الحديد',
        client: 'TAMEEZ STEEL FACTORY',
        category: 'INDUSTRIAL COMMERCIAL',
        duration: '01:30',
        image: 'https://img.youtube.com/vi/7xkk1GqBHi4/maxresdefault.jpg',
        isVertical: false,
        description: 'Cinematic commercial highlighting advanced steel manufacturing and production standards at Tameez Steel Factory.',
      },
      {
        id: 'promo-2',
        youtubeId: 'of_fy33UpmM',
        url: 'https://youtu.be/of_fy33UpmM',
        title: 'Tameez Steel Factory | Quality Steel Manufacturing',
        titleAr: 'مصنع تميز للحديد | جودة التصنيع والإنتاج المتقن',
        client: 'TAMEEZ STEEL FACTORY',
        category: 'PRODUCTION SHOWCASE',
        duration: '01:15',
        image: 'https://img.youtube.com/vi/of_fy33UpmM/maxresdefault.jpg',
        isVertical: false,
        description: 'Comprehensive industrial film showcasing precision machinery, fabrication capabilities, and quality assurance.',
      },
      {
        id: 'promo-3',
        youtubeId: 'j8Qj8WpHbYg',
        url: 'https://youtu.be/j8Qj8WpHbYg',
        title: 'Seafood Pasta with Red Sauce | Al Shaeery',
        titleAr: 'باستا سي فود بالصلصة الحمراء | أسماك الشعيري',
        client: 'AL SHAEERY SEAFOOD',
        category: 'CULINARY CINEMA',
        duration: '01:00',
        image: 'https://img.youtube.com/vi/j8Qj8WpHbYg/maxresdefault.jpg',
        isVertical: false,
        description: 'Sensory macro food cinematography featuring rich seafood pasta, sizzling textures, and vibrant gourmet plating.',
      },
      {
        id: 'promo-4',
        youtubeId: '4s32Y_X5yT8',
        url: 'https://youtu.be/4s32Y_X5yT8',
        title: 'Perfectly Grilled Salmon | Al Shaeery',
        titleAr: 'سلمون مشوي على أصوله | أسماك الشعيري',
        client: 'AL SHAEERY SEAFOOD',
        category: 'GOURMET COMMERCIAL',
        duration: '01:10',
        image: 'https://img.youtube.com/vi/4s32Y_X5yT8/maxresdefault.jpg',
        isVertical: false,
        description: 'Close-up grill cinematography capturing golden salmon sear, aromatic herbs, and fresh oceanic ingredients.',
      },
      {
        id: 'promo-5',
        youtubeId: 'v0fG2V3AV8I',
        url: 'https://youtu.be/v0fG2V3AV8I',
        title: 'Creamy Shrimp Pasta | Al Shaeery 🍤',
        titleAr: 'باستا بالجمبري والوايت صوص | أسماك الشعيري 🍤',
        client: 'AL SHAEERY SEAFOOD',
        category: 'CULINARY CINEMA',
        duration: '01:05',
        image: 'https://img.youtube.com/vi/v0fG2V3AV8I/maxresdefault.jpg',
        isVertical: false,
        description: 'Delicate sauce swirls and succulent shrimp captured with cinematic lighting and mouth-watering slow motion.',
      },
      {
        id: 'promo-6',
        youtubeId: '1BpeGDK-Ots',
        url: 'https://youtu.be/1BpeGDK-Ots',
        title: 'A Fresh Moment at MILA 🧊🌴',
        titleAr: 'لحظات منعشة وأجواء ساحرة في ميلا 🧊🌴',
        client: 'MILA',
        category: 'LIFESTYLE & HOSPITALITY',
        duration: '01:20',
        image: 'https://img.youtube.com/vi/1BpeGDK-Ots/maxresdefault.jpg',
        isVertical: false,
        description: 'Vibrant summer vibes, refreshing signature beverages, and luxury lounge atmosphere visual commercial.',
      },
      {
        id: 'promo-7',
        youtubeId: '6tvHbZz_DUw',
        url: 'https://youtu.be/6tvHbZz_DUw',
        title: 'When Day Turns Into Night — MILA 🌙',
        titleAr: 'عندما يتحول النهار إلى ليل ساحر — ميلا 🌙',
        client: 'MILA',
        category: 'ATMOSPHERE CINEMA',
        duration: '01:15',
        image: 'https://img.youtube.com/vi/6tvHbZz_DUw/maxresdefault.jpg',
        isVertical: false,
        description: 'Atmospheric visual storytelling capturing the sunset-to-night ambiance, warm neon lighting, and serene music.',
      },
      {
        id: 'promo-8',
        youtubeId: 'nVX6Fhzyw5s',
        url: 'https://youtu.be/nVX6Fhzyw5s',
        title: 'MILA — Your Day, Your Escape ☀️🌴',
        titleAr: 'ميلا — وجهتك المثالية للاسترخاء وقضاء أجمل الأوقات ☀️🌴',
        client: 'MILA',
        category: 'BRAND CAMPAIGN',
        duration: '01:25',
        image: 'https://img.youtube.com/vi/nVX6Fhzyw5s/maxresdefault.jpg',
        isVertical: false,
        description: 'Complete brand narrative celebrating hospitality, luxury seating, and exquisite guest experiences.',
      },
    ],
  },
  {
    id: 'edits-videos',
    coverId: 'cover-3',
    title: 'EDITS VIDEOS',
    titleAr: 'مونتاج وتحرير الفيديو',
    category: 'POST-PRODUCTION & VFX',
    categoryAr: 'مونتاج وما بعد الإنتاج',
    tag: 'GALLERY 3 • 4 FILMS',
    coverImage: 'https://img.youtube.com/vi/6tvHbZz_DUw/maxresdefault.jpg',
    description: 'Advanced video editing, color grading, sound design, VFX motion graphics, and post-production reels.',
    descriptionAr: 'خدمات المونتاج الاحترافي، تصحيح الألوان السينمائي، تصميم الصوتيات، ومؤثرات الموشن جرافيكس.',
    isVertical: false,
    videos: [
      {
        id: 'edit-1',
        youtubeId: '6tvHbZz_DUw',
        url: 'https://youtu.be/6tvHbZz_DUw',
        title: 'Cinematic Sunset Transition & Color Grade',
        titleAr: 'مونتاج الانتقال السينمائي وتصحيح الألوان',
        client: 'DEVOTIX POST-LAB',
        category: 'COLOR GRADING & PACING',
        duration: '01:15',
        image: 'https://img.youtube.com/vi/6tvHbZz_DUw/maxresdefault.jpg',
        isVertical: false,
        description: 'High-end color grade curve shifting from golden hour daylight to deep midnight blue tones with matching atmospheric acoustics.',
      },
      {
        id: 'edit-2',
        youtubeId: 'v0fG2V3AV8I',
        url: 'https://youtu.be/v0fG2V3AV8I',
        title: 'Culinary Speed-Ramping & Sensory Sound Edit',
        titleAr: 'مونتاج تسريع وتبطيء حركي مع هندسة صوتية',
        client: 'DEVOTIX AUDIO LAB',
        category: 'SPEED RAMPING & SOUND',
        duration: '01:05',
        image: 'https://img.youtube.com/vi/v0fG2V3AV8I/maxresdefault.jpg',
        isVertical: false,
        description: 'Precision rhythmic audio synchronization, dynamic flame speed ramps, and crisp gourmet foley audio design.',
      },
      {
        id: 'edit-3',
        youtubeId: 'of_fy33UpmM',
        url: 'https://youtu.be/of_fy33UpmM',
        title: 'Industrial Heavy Metal Montage & Sound Design',
        titleAr: 'مونتاج خطوط الإنتاج الثقيلة وتصميم الصوت الصناعي',
        client: 'DEVOTIX INDUSTRIAL',
        category: 'DYNAMIC INDUSTRIAL EDIT',
        duration: '01:15',
        image: 'https://img.youtube.com/vi/of_fy33UpmM/maxresdefault.jpg',
        isVertical: false,
        description: 'High-impact rhythmic cutting on factory machine beats, precision hydraulic sound layering, and cinematic anamorphic grade.',
      },
      {
        id: 'edit-4',
        youtubeId: 'TA-q_k0g6_8',
        url: 'https://youtube.com/shorts/TA-q_k0g6_8',
        title: 'Welding Sparks Motion VFX & Speed Ramping',
        titleAr: 'مؤثرات بصرية وسرعات حركية لشعلات اللحام',
        client: 'DEVOTIX MOTION LAB',
        category: 'VFX & SPEED EDIT',
        duration: '00:45',
        image: 'https://img.youtube.com/vi/TA-q_k0g6_8/hqdefault.jpg',
        isVertical: true,
        description: 'Speed-ramped vertical sequence tracking welding sparks with customized optical flare passes and bass drop impacts.',
      },
    ],
  },
  {
    id: 'idas-ads',
    coverId: 'cover-4',
    title: 'IDEAS & ADS',
    titleAr: 'أفكار وإعلانات تجارية',
    category: 'CREATIVE CONCEPTS & ADS',
    categoryAr: 'أفكار وحملات إعلانية',
    tag: 'GALLERY 4 • 4 CAMPAIGNS',
    coverImage: 'https://img.youtube.com/vi/nVX6Fhzyw5s/maxresdefault.jpg',
    description: 'Creative advertising campaigns, commercial packages, storytelling concepts, and client deals.',
    descriptionAr: 'ابتكار أفكار الحملات الإعلانية، مفاهيم السرد القصصي، وباقات الإعلانات التجارية المتكاملة.',
    isVertical: false,
    videos: [
      {
        id: 'ad-1',
        youtubeId: 'nVX6Fhzyw5s',
        url: 'https://youtu.be/nVX6Fhzyw5s',
        title: 'Luxury Lifestyle Social Media Campaign',
        titleAr: 'حملة إعلانية لمنصات التواصل – قطاع الضيافة الفاخرة',
        client: 'MILA LOUNGE',
        category: 'COMMERCIAL CAMPAIGN',
        duration: '01:25',
        image: 'https://img.youtube.com/vi/nVX6Fhzyw5s/maxresdefault.jpg',
        isVertical: false,
        description: 'A comprehensive lifestyle visual campaign designed for multi-channel digital release and influencer conversion.',
      },
      {
        id: 'ad-2',
        youtubeId: '7xkk1GqBHi4',
        url: 'https://youtu.be/7xkk1GqBHi4',
        title: 'Factory Brand Campaign & Corporate Authority',
        titleAr: 'إعلان تعزيز المكانة السوقية للقطاع الصناعي',
        client: 'TAMEEZ STEEL',
        category: 'B2B CORPORATE AD',
        duration: '01:30',
        image: 'https://img.youtube.com/vi/7xkk1GqBHi4/maxresdefault.jpg',
        isVertical: false,
        description: 'High-level commercial pitch positioning industrial manufacturing leaders as Tier-1 nationwide suppliers.',
      },
      {
        id: 'ad-3',
        youtubeId: 'j8Qj8WpHbYg',
        url: 'https://youtu.be/j8Qj8WpHbYg',
        title: 'Gourmet Culinary Seasonal Ad Concept',
        titleAr: 'فكرة حملة ترويجية موسمية لمطاعم المأكولات البحرية',
        client: 'AL SHAEERY SEAFOOD',
        category: 'SEASONAL RESTAURANT AD',
        duration: '01:00',
        image: 'https://img.youtube.com/vi/j8Qj8WpHbYg/maxresdefault.jpg',
        isVertical: false,
        description: 'Seasonal promotion concept leveraging close-up gastronomic reveals and limited-time offer callouts.',
      },
      {
        id: 'ad-4',
        youtubeId: 'X7y6WTEykGw',
        url: 'https://youtube.com/shorts/X7y6WTEykGw',
        title: 'Aluminum Innovation Teaser Pitch',
        titleAr: 'إعلان تشويقي للابتكار في صناعات الألمنيوم',
        client: 'TAMEEZ ALUMINUM',
        category: 'PRODUCT TEASER AD',
        duration: '00:50',
        image: 'https://img.youtube.com/vi/X7y6WTEykGw/hqdefault.jpg',
        isVertical: true,
        description: 'Snappy social-first advertising teaser showcasing rapid fabrication delivery and engineering precision.',
      },
    ],
  },
];

export default function Production({ onPlayVideo }) {
  const { isRtl, t } = useThemeLanguage();
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [activeInlineVideoId, setActiveInlineVideoId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedGallery(null);
        setActiveInlineVideoId(null);
      }
    };
    if (selectedGallery) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedGallery]);

  const cover1 = PRODUCTION_GALLERIES[0]; // REELS
  const cover2 = PRODUCTION_GALLERIES[1]; // PROMOS
  const cover3 = PRODUCTION_GALLERIES[2]; // EDITS VIDEOS
  const cover4 = PRODUCTION_GALLERIES[3]; // IDEAS & ADS

  const handleOpenGallery = (gallery) => {
    setSelectedGallery(gallery);
    setActiveInlineVideoId(null);
  };

  const handleVideoClick = (video) => {
    if (onPlayVideo) {
      onPlayVideo(video);
    }
  };

  const handleInlineIframeToggle = (videoId, e) => {
    e.stopPropagation();
    setActiveInlineVideoId((prev) => (prev === videoId ? null : videoId));
  };

  return (
    <section
      id="production"
      className="snap-section relative flex flex-col justify-center section-alt-b px-3.5 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-14 select-none overflow-hidden"
    >
      {/* Ambient cinema backlight glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-red/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-red-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 pb-3 border-b border-neutral-300/80 dark:border-white/10">
          <TitleAccent type="production" />
          <p className="mt-2 text-xs sm:text-sm md:text-[14.5px] text-neutral-600 dark:text-neutral-400 font-medium uppercase tracking-wider leading-relaxed">
            {isRtl
              ? 'أفلام سينمائية ترويجية، ريلز وشورتس، مونتاج احترافي، وأفكار إعلانية متكاملة.'
              : 'Promos, vertical reels, post-production editing, and creative advertising campaigns.'}
          </p>
        </div>

        {/* 3-Column Production Covers Layout (2x2 Grid on Mobile | 3-Column on Desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-2.5 sm:gap-4 lg:gap-5 items-stretch">
          {/* Cover 1: REELS (Left Tall Vertical Card on Desktop / Top-Left Card on Mobile) */}
          <div
            onClick={() => handleOpenGallery(cover1)}
            className="md:col-span-4 group relative rounded-lg sm:rounded-xl overflow-hidden bg-neutral-950 border border-neutral-200/80 dark:border-white/10 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-xl hover:-translate-y-0.5 flex flex-col h-[180px] sm:h-[220px] md:h-[450px]"
          >
            <img
              src={cover1.coverImage}
              alt={cover1.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

            {/* Gallery Badge Top Right */}
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 rtl:right-auto rtl:left-2 rtl:sm:left-3 z-10">
              <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                <Film className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white" />
                <span>{isRtl ? 'ريلز 9:16' : 'REELS 9:16'}</span>
                <ArrowUpRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white rtl:rotate-[-90deg]" />
              </div>
            </div>

            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-brand-red text-white flex items-center justify-center shadow-xl shadow-red-600/40 transition-all duration-300 transform group-hover:scale-110">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
              </div>
            </div>

            {/* Cover Metadata Bottom */}
            <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 z-10">
              <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                {isRtl ? cover1.categoryAr : cover1.category}
              </span>
              <h4 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-tight text-white font-display line-clamp-1">
                {isRtl ? cover1.titleAr : cover1.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                <span>{cover1.videos.length} {isRtl ? 'فيديوهات ريلز' : 'REELS'}</span>
                <span className="hidden xs:inline">• {isRtl ? 'انقر للمشاهدة' : 'Click to View'}</span>
              </p>
            </div>
          </div>

          {/* Center Column: PROMOS (Top) & EDITS VIDEOS (Bottom) */}
          <div className="contents md:flex md:col-span-4 md:flex-col md:gap-3 sm:md:gap-4 lg:md:gap-5 md:justify-between md:h-[450px]">
            {/* Cover 2: PROMOS */}
            <div
              onClick={() => handleOpenGallery(cover2)}
              className="group relative rounded-lg sm:rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800/80 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-lg flex flex-col h-[180px] sm:h-[220px] md:h-auto md:flex-1 min-h-0"
            >
              <img
                src={cover2.coverImage}
                alt={cover2.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Gallery Badge Top Right */}
              <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 rtl:right-auto rtl:left-2 rtl:sm:left-2.5 z-10">
                <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                  <Film className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  <span>{isRtl ? 'برومو' : 'PROMOS'}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 rtl:rotate-[-90deg]" />
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg shadow-red-600/40 transition-all duration-300 transform group-hover:scale-110">
                  <Play className="w-4 h-4 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
                </div>
              </div>

              {/* Cover Metadata Bottom */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                  {isRtl ? cover2.categoryAr : cover2.category}
                </span>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-display line-clamp-1">
                  {isRtl ? cover2.titleAr : cover2.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>{cover2.videos.length} {isRtl ? 'أفلام برومو' : 'FILMS'}</span>
                  <span className="hidden xs:inline">• {isRtl ? 'انقر للمشاهدة' : 'Click to View'}</span>
                </p>
              </div>
            </div>

            {/* Cover 3: EDITS VIDEOS */}
            <div
              onClick={() => handleOpenGallery(cover3)}
              className="group relative rounded-lg sm:rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800/80 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-lg flex flex-col h-[180px] sm:h-[220px] md:h-auto md:flex-1 min-h-0"
            >
              <img
                src={cover3.coverImage}
                alt={cover3.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Gallery Badge Top Right */}
              <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 rtl:right-auto rtl:left-2 rtl:sm:left-2.5 z-10">
                <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                  <Film className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  <span>{isRtl ? 'مونتاج' : 'EDITS'}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 rtl:rotate-[-90deg]" />
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg shadow-red-600/40 transition-all duration-300 transform group-hover:scale-110">
                  <Play className="w-4 h-4 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
                </div>
              </div>

              {/* Cover Metadata Bottom */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                  {isRtl ? cover3.categoryAr : cover3.category}
                </span>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-display line-clamp-1">
                  {isRtl ? cover3.titleAr : cover3.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>{cover3.videos.length} {isRtl ? 'أعمال مونتاج' : 'EDITS'}</span>
                  <span className="hidden xs:inline">• {isRtl ? 'انقر للمشاهدة' : 'Click to View'}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Cover 4: IDEAS & ADS (Right Tall Vertical Card on Desktop / Bottom-Right Card on Mobile) */}
          <div
            onClick={() => handleOpenGallery(cover4)}
            className="md:col-span-4 group relative rounded-lg sm:rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800/80 cursor-pointer transition-all duration-300 hover:border-brand-red/60 hover:shadow-xl flex flex-col h-[180px] sm:h-[220px] md:h-[450px]"
          >
            <img
              src={cover4.coverImage}
              alt={cover4.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

            {/* Gallery Badge Top Right */}
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 rtl:right-auto rtl:left-2 rtl:sm:left-3 z-10">
              <div className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow">
                <Film className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white" />
                <span>{isRtl ? 'أفكار وإعلانات' : 'IDEAS & ADS'}</span>
                <ArrowUpRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white rtl:rotate-[-90deg]" />
              </div>
            </div>

            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-brand-red text-white flex items-center justify-center shadow-xl shadow-red-600/40 transition-all duration-300 transform group-hover:scale-110">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
              </div>
            </div>

            {/* Cover Metadata Bottom */}
            <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 z-10">
              <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest text-brand-red block mb-0.5">
                {isRtl ? cover4.categoryAr : cover4.category}
              </span>
              <h4 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-tight text-white font-display line-clamp-1">
                {isRtl ? cover4.titleAr : cover4.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-300 font-medium mt-0.5 flex items-center gap-1 group-hover:text-white transition-colors">
                <span>{cover4.videos.length} {isRtl ? 'حملات إعلانية' : 'ADS'}</span>
                <span className="hidden xs:inline">• {isRtl ? 'انقر للمشاهدة' : 'Click to View'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Gallery Modal: Opens when any of the 4 covers is clicked */}
      {selectedGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 bg-black/90 backdrop-blur-xl animate-fadeIn">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => {
              setSelectedGallery(null);
              setActiveInlineVideoId(null);
            }}
          />

          {/* Modal Content Window */}
          <div className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-white">
            {/* Gallery Modal Header */}
            <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-neutral-800 bg-[#0c0c0e] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-brand-red font-display">
                    {isRtl ? selectedGallery.categoryAr : selectedGallery.category}
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    {selectedGallery.videos.length} {isRtl ? 'أعمال معروضة' : 'PRODUCTIONS'}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white font-display">
                  {isRtl ? selectedGallery.titleAr : selectedGallery.title}
                </h3>
                <p className="text-xs text-neutral-400 font-medium mt-1 max-w-2xl hidden sm:block">
                  {isRtl ? selectedGallery.descriptionAr : selectedGallery.description}
                </p>
              </div>

              {/* Gallery Switcher Tabs & Close Button */}
              <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse flex-shrink-0">
                {/* Quick Gallery Switcher Pills */}
                <div className="flex items-center space-x-1.5 rtl:space-x-reverse p-1 bg-black/60 rounded-xl border border-neutral-800 overflow-x-auto max-w-full">
                  {PRODUCTION_GALLERIES.map((gal) => (
                    <button
                      key={gal.id}
                      onClick={() => {
                        setSelectedGallery(gal);
                        setActiveInlineVideoId(null);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                        selectedGallery.id === gal.id
                          ? 'bg-brand-red text-white shadow-sm'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      {isRtl ? gal.titleAr : gal.title}
                    </button>
                  ))}
                </div>

                {/* Close Modal Button */}
                <button
                  onClick={() => {
                    setSelectedGallery(null);
                    setActiveInlineVideoId(null);
                  }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900 hover:bg-brand-red text-neutral-400 hover:text-white border border-neutral-800 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close Gallery"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Gallery Videos Professional Grid */}
            <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-140px)] bg-neutral-950">
              {/* Responsive layout: 9:16 vertical grid for Reels, 16:9 for Promos/Edits/Ads */}
              <div
                className={`grid gap-4 sm:gap-5 ${
                  selectedGallery.isVertical
                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                }`}
              >
                {selectedGallery.videos.map((video) => {
                  const isInlineActive = activeInlineVideoId === video.id;
                  return (
                    <div
                      key={video.id}
                      className="group relative rounded-xl overflow-hidden bg-[#0d0d10] border border-neutral-800/90 hover:border-brand-red/60 transition-all duration-300 flex flex-col shadow-md hover:shadow-red-950/20"
                    >
                      {/* Video Player Display Container (iFrame or Thumbnail) */}
                      <div
                        className={`relative w-full overflow-hidden bg-black ${
                          video.isVertical ? 'aspect-[9/16]' : 'aspect-video'
                        }`}
                      >
                        {isInlineActive ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                            title={isRtl && video.titleAr ? video.titleAr : video.title}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : (
                          <div
                            onClick={() => handleVideoClick(video)}
                            className="relative w-full h-full cursor-pointer group/thumb"
                          >
                            <img
                              src={video.image}
                              alt={video.title}
                              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/thumb:scale-105 filter brightness-90 group-hover/thumb:brightness-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                            {/* Center Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-11 h-11 rounded-full bg-brand-red text-white flex items-center justify-center shadow-xl shadow-red-600/40 transition-transform duration-300 transform group-hover/thumb:scale-110">
                                <Play className="w-4 h-4 fill-white translate-x-0.5 rtl:-translate-x-0.5" />
                              </div>
                            </div>

                            {/* Top Badges */}
                            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                              <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[8px] font-extrabold uppercase tracking-widest text-white border border-white/10">
                                {video.isVertical ? 'REEL 9:16' : '4K CINEMA'}
                              </span>
                              <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[8px] font-mono font-bold uppercase tracking-wider text-neutral-300 border border-white/10">
                                {video.duration}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Video Card Content */}
                      <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1 bg-[#0e0e12]">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[8px] font-bold uppercase tracking-widest text-brand-red truncate">
                              {video.client}
                            </span>
                          </div>
                          <h4 className="text-xs font-black uppercase tracking-tight text-white group-hover:text-brand-red transition-colors font-display line-clamp-1">
                            {isRtl && video.titleAr ? video.titleAr : video.title}
                          </h4>
                          {video.description && (
                            <p className="text-[9.5px] text-neutral-400 font-medium mt-1 line-clamp-2 leading-relaxed">
                              {video.description}
                            </p>
                          )}
                        </div>

                        {/* Card Interactive Actions (Play iFrame or Fullscreen Cinema) */}
                        <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between text-[8.5px] font-bold uppercase tracking-wider">
                          <button
                            type="button"
                            onClick={() => handleVideoClick(video)}
                            className="flex items-center space-x-1 rtl:space-x-reverse text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <Maximize2 className="w-2.5 h-2.5 text-brand-red" />
                            <span>{isRtl ? 'سينما' : 'POPUP'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleInlineIframeToggle(video.id, e)}
                            className="flex items-center space-x-1 rtl:space-x-reverse text-brand-red hover:underline font-extrabold cursor-pointer"
                          >
                            <span>{isInlineActive ? (isRtl ? 'إغلاق الفيديو' : 'CLOSE IFRAME') : (isRtl ? 'تشغيل iFrame' : 'PLAY IFRAME')}</span>
                            <ArrowUpRight className="w-3 h-3 rtl:rotate-[-90deg]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Gallery Modal Footer */}
            <div className="px-6 py-3 bg-[#0a0a0c] border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
              <span className="text-[10px] uppercase tracking-wider font-semibold">
                {isRtl ? 'إنتاج وحدة السينما والإعلانات في وكالة ديفوتيكس ميديا' : 'Produced by Devotix Media Commercial Video & Film Unit'}
              </span>
              <button
                onClick={() => {
                  setSelectedGallery(null);
                  setActiveInlineVideoId(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {t('modals.close', 'Close Gallery')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
