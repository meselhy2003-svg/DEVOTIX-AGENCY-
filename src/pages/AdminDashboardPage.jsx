import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  ArrowLeft,
  Share2,
  Video,
  Image as ImageIcon,
  TrendingUp,
  BarChart3,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Check,
  ExternalLink,
  Upload,
  RefreshCw,
  Eye,
  Download,
  AlertCircle,
  Sparkles,
  Search,
  Filter,
  Flame,
  Phone,
  MessageSquare,
  Clock,
  Layers,
  ChevronRight,
  Sun,
  Moon,
  Globe,
  ArrowUp,
  ArrowDown,
  Star,
  GripVertical,
  Database,
  Cloud,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { getSocialLinks, saveSocialLinks, resetSocialLinks, DEFAULT_SOCIAL_LINKS } from '../data/socialLinks';
import { getContentViewsData, saveContentViewsData, resetContentViewsData } from '../data/contentViewsData';
import { getProductionGalleries, saveProductionGalleries, resetProductionGalleries } from '../data/productionData';
import { getSavedCampaigns, saveCampaignsData, resetCampaignsData } from '../data/campaignsData';
import { getPhotographyGalleries, savePhotographyGalleries, resetPhotographyGalleries } from '../data/photographyData';
import { getGraphicsData, saveGraphicsData, resetGraphicsData } from '../data/graphicsData';
import { getStoredLeads, updateLeadStatus, deleteStoredLead, clearAllLeads } from '../data/leadsInbox';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';
import {
  getSupabaseConfig,
  saveSupabaseConfig,
  testSupabaseConnection,
  isSupabaseConfigured,
  SUPABASE_SQL_SETUP,
} from '../services/supabaseClient';
import { syncAllLocalDataToCloud, initCmsSync } from '../services/cmsSync';
import { GOOGLE_APPS_SCRIPT_CODE } from '../services/googleSheetService';

const DEFAULT_PIN = 'devotix2026';

export default function AdminDashboardPage({ onNavigateHome }) {
  const { isRtl, isDark, toggleTheme, toggleLanguage } = useThemeLanguage();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('devotix_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [savedPin, setSavedPin] = useState(() => {
    return localStorage.getItem('devotix_admin_pin') || DEFAULT_PIN;
  });

  // Active Tab: 'social' | 'views' | 'production' | 'media' | 'campaigns' | 'inbox' | 'settings'
  const [activeTab, setActiveTab] = useState('social');

  // Notification Toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // State Stores
  const [socials, setSocials] = useState(getSocialLinks);
  const [contentViews, setContentViews] = useState(getContentViewsData);
  const [production, setProduction] = useState(getProductionGalleries);
  const [campaigns, setCampaigns] = useState(getSavedCampaigns);
  const [photoGalleries, setPhotoGalleries] = useState(getPhotographyGalleries);
  const [graphics, setGraphics] = useState(getGraphicsData);
  const [leads, setLeads] = useState(getStoredLeads);

  // Cloudinary Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Modals for Create / Edit
  const [editingReel, setEditingReel] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null); // { galleryId, video }
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [newPhotoData, setNewPhotoData] = useState({
    galleryId: 'fashion',
    title: '',
    category: 'FASHION & EDITORIAL',
    location: '',
    camera: '',
    image: '',
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProdGalleryId, setSelectedProdGalleryId] = useState('reals');
  const [selectedPhotoGalleryId, setSelectedPhotoGalleryId] = useState('fashion');
  const [draggedPhotoIndex, setDraggedPhotoIndex] = useState(null);
  const [draggedGraphicIndex, setDraggedGraphicIndex] = useState(null);
  const graphicFileInputRef = useRef(null);

  const [newGraphicData, setNewGraphicData] = useState({
    title: '',
    category: 'BRANDING & IDENTITY',
    categoryFilter: 'branding',
    client: '',
    image: '',
    tag: 'NEW RELEASE',
  });

  // Supabase Cloud Database Configuration State
  const [supabaseConfig, setSupabaseConfigState] = useState(getSupabaseConfig);
  const [supabaseStatus, setSupabaseStatus] = useState({ testing: false, result: null });
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showAppsScriptModal, setShowAppsScriptModal] = useState(false);
  const [copiedAppsScript, setCopiedAppsScript] = useState(false);
  const [isTestingSheet, setIsTestingSheet] = useState(false);

  const handleTestGoogleSheet = async () => {
    const url = socials.googleSheetWebhookUrl;
    if (!url || !url.startsWith('http')) {
      showToast(isRtl ? 'يرجى إدخال رابط Webhook صالح أولاً' : 'Enter a valid Webhook URL first', 'error');
      return;
    }
    setIsTestingSheet(true);
    try {
      const payload = {
        formType: 'services',
        timestamp: new Date().toLocaleString('ar-EG'),
        fullName: 'تجربة لوحة التحكم (Admin Test)',
        profession: 'اختبار الربط المباشر مع شيت جوجل',
        heardFrom: 'لوحة التحكم',
        businessType: 'Devotix Media',
        country: 'EGYPT',
        phone: '+20 101 018 5181',
        email: socials.projectRequestEmail || 'test@devotix.com',
        serviceNeeded: 'الإنتاج السينمائي وصناعة الفيديو',
        hasSocialPages: 'نعم',
        source: 'Devotix Dashboard Test Row',
      };
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      showToast(isRtl ? 'تم إرسال صف تجريبي بنجاح! تفقد شيت جوجل الآن ✅' : 'Test row dispatched successfully! Check Google Sheet ✅');
    } catch (err) {
      showToast(isRtl ? 'حدث خطأ أثناء الاتصال بالسكربت' : 'Error dispatching test row', 'error');
    } finally {
      setIsTestingSheet(false);
    }
  };

  // Listen to external data updates
  useEffect(() => {
    const onLeadsUpdate = (e) => setLeads(e.detail || getStoredLeads());
    window.addEventListener('devotix_leads_updated', onLeadsUpdate);
    return () => window.removeEventListener('devotix_leads_updated', onLeadsUpdate);
  }, []);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput.trim() === savedPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('devotix_admin_auth', 'true');
      setPinError(false);
      showToast(isRtl ? 'تم تسجيل الدخول بنجاح' : 'Authenticated successfully');
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('devotix_admin_auth');
    setPinInput('');
  };

  // ─────────────────────────────────────────────
  // 1. Social Links Handlers
  // ─────────────────────────────────────────────
  const handleSaveSocials = (e) => {
    e.preventDefault();
    saveSocialLinks(socials);
    showToast(isRtl ? 'تم تحديث روابط السوشيال ميديا بالكامل' : 'Social media links saved & synced');
  };

  const handleResetSocials = () => {
    if (window.confirm(isRtl ? 'هل تريد استعادة الروابط الافتراضية؟' : 'Reset social links to defaults?')) {
      resetSocialLinks();
      setSocials(DEFAULT_SOCIAL_LINKS);
      showToast(isRtl ? 'تمت استعادة الروابط الافتراضية' : 'Reset to default links');
    }
  };

  const handleCopyAppsScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedAppsScript(true);
    setTimeout(() => setCopiedAppsScript(false), 2500);
    showToast(isRtl ? 'تم نسخ كود Google Apps Script بنجاح!' : 'Apps Script code copied to clipboard!');
  };

  // ─────────────────────────────────────────────
  // 2. Content Views (Viral Reels) Handlers
  // ─────────────────────────────────────────────
  const handleSaveReel = (e) => {
    e.preventDefault();
    let updated;
    if (editingReel.id) {
      updated = contentViews.map((item) => (item.id === editingReel.id ? editingReel : item));
    } else {
      const newId = 'view-reel-' + Date.now();
      const ytId = extractYoutubeId(editingReel.url || editingReel.youtubeId);
      const newReel = {
        ...editingReel,
        id: newId,
        youtubeId: ytId || 'X7y6WTEykGw',
        image: editingReel.image || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      };
      updated = [newReel, ...contentViews];
    }
    setContentViews(updated);
    saveContentViewsData(updated);
    setEditingReel(null);
    showToast(isRtl ? 'تم حفظ بيانات الفيديو بنجاح' : 'Reel saved successfully');
  };

  const handleDeleteReel = (id) => {
    if (window.confirm(isRtl ? 'هل أنت متأكد من حذف هذا الفيديو؟' : 'Delete this reel?')) {
      const updated = contentViews.filter((item) => item.id !== id);
      setContentViews(updated);
      saveContentViewsData(updated);
      showToast(isRtl ? 'تم حذف الفيديو' : 'Reel deleted');
    }
  };

  // ─────────────────────────────────────────────
  // 3. Production Video Handlers
  // ─────────────────────────────────────────────
  const handleSaveProductionVideo = (e) => {
    e.preventDefault();
    const { galleryId, video } = editingVideo;
    const ytId = extractYoutubeId(video.url || video.youtubeId);
    const resolvedVideo = {
      ...video,
      id: video.id || `video-${Date.now()}`,
      youtubeId: ytId || '7xkk1GqBHi4',
      image: video.image || `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
    };

    const updatedGalleries = production.map((g) => {
      if (g.id !== galleryId) return g;
      const exists = g.videos.some((v) => v.id === resolvedVideo.id);
      const newVideos = exists
        ? g.videos.map((v) => (v.id === resolvedVideo.id ? resolvedVideo : v))
        : [resolvedVideo, ...g.videos];
      return { ...g, videos: newVideos };
    });

    setProduction(updatedGalleries);
    saveProductionGalleries(updatedGalleries);
    setEditingVideo(null);
    showToast(isRtl ? 'تم حفظ فيديو الإنتاج بنجاح' : 'Production video saved');
  };

  const handleDeleteProductionVideo = (galleryId, videoId) => {
    if (window.confirm(isRtl ? 'هل أنت متأكد من حذف هذا الفيديو من المعرض؟' : 'Delete this video?')) {
      const updatedGalleries = production.map((g) => {
        if (g.id !== galleryId) return g;
        return { ...g, videos: g.videos.filter((v) => v.id !== videoId) };
      });
      setProduction(updatedGalleries);
      saveProductionGalleries(updatedGalleries);
      showToast(isRtl ? 'تم حذف الفيديو من المعرض' : 'Video deleted');
    }
  };

  // ─────────────────────────────────────────────
  // 4. Cloudinary File Upload
  // ─────────────────────────────────────────────
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(10);
      const res = await uploadToCloudinary(file, { folder: 'devotix_cms' }, (pct) => {
        setUploadProgress(pct);
      });

      setNewPhotoData((prev) => ({
        ...prev,
        image: res.secure_url,
      }));

      showToast(isRtl ? 'تم رفع الملف بنجاح إلى Cloudinary!' : 'Uploaded successfully to Cloudinary!');
    } catch (err) {
      console.error(err);
      showToast(isRtl ? 'فشل الرفع، تحقق من الاتصال' : (err.message || 'Upload failed'), 'error');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddPhotoToGallery = (e) => {
    e.preventDefault();
    if (!newPhotoData.image) {
      showToast(isRtl ? 'يرجى رفع صورة أولاً أو إدخال رابطها' : 'Please upload or provide an image URL', 'error');
      return;
    }

    if (newPhotoData.galleryId === 'graphic') {
      const newGraphic = {
        id: 'graphic-' + Date.now(),
        title: newPhotoData.title || 'NEW GRAPHIC ARTWORK',
        category: newPhotoData.category || 'BRANDING & IDENTITY',
        client: newPhotoData.location || 'DEVOTIX CLIENT',
        image: newPhotoData.image,
        thumb: newPhotoData.image,
        tag: 'NEW RELEASE',
        categoryFilter: 'branding',
        description: 'New design release uploaded from Devotix CMS.',
        year: '2026',
        format: 'Digital Artwork',
      };
      const updated = [newGraphic, ...graphics];
      setGraphics(updated);
      saveGraphicsData(updated);
    } else {
      const newPhoto = {
        id: Date.now(),
        title: newPhotoData.title || 'NEW CAPTURE',
        category: newPhotoData.category || 'PHOTOGRAPHY',
        image: newPhotoData.image,
        location: newPhotoData.location || 'DEVOTIX STUDIO',
        camera: newPhotoData.camera || 'SONY A1 • 50mm f/1.2 GM',
      };
      const updatedGalleries = photoGalleries.map((g) => {
        if (g.id !== newPhotoData.galleryId) return g;
        return { ...g, photos: [newPhoto, ...g.photos] };
      });
      setPhotoGalleries(updatedGalleries);
      savePhotographyGalleries(updatedGalleries);
    }

    setNewPhotoData({
      galleryId: 'fashion',
      title: '',
      category: 'FASHION & EDITORIAL',
      location: '',
      camera: '',
      image: '',
    });
    showToast(isRtl ? 'تمت إضافة الصورة بنجاح إلى المعرض' : 'Photo added to gallery successfully');
  };

  // Reorder & Sequence Photos in Gallery
  const handleMovePhoto = (galleryId, fromIndex, toIndex) => {
    if (galleryId === 'graphic') {
      if (toIndex < 0 || toIndex >= graphics.length) return;
      const updated = [...graphics];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      setGraphics(updated);
      saveGraphicsData(updated);
      showToast(isRtl ? `تم نقل التصميم للمركز #${toIndex + 1}` : `Moved artwork to position #${toIndex + 1}`);
    } else {
      const targetGallery = photoGalleries.find((g) => g.id === galleryId);
      if (!targetGallery || toIndex < 0 || toIndex >= targetGallery.photos.length) return;
      const updatedGalleries = photoGalleries.map((g) => {
        if (g.id !== galleryId) return g;
        const updatedPhotos = [...g.photos];
        const [moved] = updatedPhotos.splice(fromIndex, 1);
        updatedPhotos.splice(toIndex, 0, moved);
        const newCover = updatedPhotos[0]?.image || g.coverImage;
        return { ...g, photos: updatedPhotos, coverImage: newCover };
      });
      setPhotoGalleries(updatedGalleries);
      savePhotographyGalleries(updatedGalleries);
      showToast(isRtl ? `تم نقل الصورة للمركز #${toIndex + 1}` : `Moved photo to position #${toIndex + 1}`);
    }
  };

  const handleSetCoverPhoto = (galleryId, photoIndex) => {
    if (galleryId === 'graphic') {
      handleMovePhoto(galleryId, photoIndex, 0);
      showToast(isRtl ? 'تم تعيين العمل كغلاف أول' : 'Set as primary artwork');
    } else {
      const targetGallery = photoGalleries.find((g) => g.id === galleryId);
      if (!targetGallery) return;
      const photoToCover = targetGallery.photos[photoIndex];
      const updatedGalleries = photoGalleries.map((g) => {
        if (g.id !== galleryId) return g;
        const updatedPhotos = [...g.photos];
        const [moved] = updatedPhotos.splice(photoIndex, 1);
        updatedPhotos.unshift(moved);
        return { ...g, photos: updatedPhotos, coverImage: photoToCover.image };
      });
      setPhotoGalleries(updatedGalleries);
      savePhotographyGalleries(updatedGalleries);
      showToast(isRtl ? 'تم تعيين الصورة كغلاف للمعرض وفي المرتبة الأولى' : 'Photo set as gallery cover & #1');
    }
  };

  const handleDeletePhotoFromGallery = (galleryId, photoId) => {
    if (!window.confirm(isRtl ? 'هل أنت متأكد من حذف هذه الصورة من المعرض؟' : 'Delete this photo from gallery?')) return;
    if (galleryId === 'graphic') {
      const updated = graphics.filter((item) => item.id !== photoId);
      setGraphics(updated);
      saveGraphicsData(updated);
      showToast(isRtl ? 'تم حذف التصميم' : 'Artwork deleted');
    } else {
      const updatedGalleries = photoGalleries.map((g) => {
        if (g.id !== galleryId) return g;
        const updatedPhotos = g.photos.filter((p) => p.id !== photoId);
        const newCover = updatedPhotos[0]?.image || g.coverImage;
        return { ...g, photos: updatedPhotos, coverImage: newCover };
      });
      setPhotoGalleries(updatedGalleries);
      savePhotographyGalleries(updatedGalleries);
      showToast(isRtl ? 'تم حذف الصورة من المعرض' : 'Photo removed from gallery');
    }
  };

  // ─────────────────────────────────────────────
  // 4.1 Graphics Artworks Handlers
  // ─────────────────────────────────────────────
  const handleGraphicFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(10);
      const res = await uploadToCloudinary(file, { folder: 'devotix_cms' }, (pct) => {
        setUploadProgress(pct);
      });

      setNewGraphicData((prev) => ({
        ...prev,
        image: res.secure_url,
      }));

      showToast(isRtl ? 'تم رفع التصميم بنجاح إلى Cloudinary!' : 'Uploaded artwork to Cloudinary!');
    } catch (err) {
      console.error(err);
      showToast(isRtl ? 'فشل الرفع' : (err.message || 'Upload failed'), 'error');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (graphicFileInputRef.current) graphicFileInputRef.current.value = '';
    }
  };

  const handleAddGraphicArtwork = (e) => {
    e.preventDefault();
    if (!newGraphicData.image) {
      showToast(isRtl ? 'يرجى رفع تصميم أولاً أو إدخال رابط الصورة' : 'Please upload or provide an image URL', 'error');
      return;
    }
    const newArt = {
      id: 'graphic-' + Date.now(),
      title: newGraphicData.title || 'NEW GRAPHIC ARTWORK',
      category: newGraphicData.category || 'BRANDING & IDENTITY',
      client: newGraphicData.client || 'DEVOTIX CLIENT',
      image: newGraphicData.image,
      thumb: newGraphicData.image,
      tag: newGraphicData.tag || 'NEW RELEASE',
      categoryFilter: newGraphicData.categoryFilter || 'branding',
      description: 'New design release uploaded from Devotix CMS.',
      year: '2026',
      format: 'Digital Artwork',
      details: 'Visual artwork created by Devotix Media.',
    };
    const updated = [newArt, ...graphics];
    setGraphics(updated);
    saveGraphicsData(updated);
    setNewGraphicData({
      title: '',
      category: 'BRANDING & IDENTITY',
      categoryFilter: 'branding',
      client: '',
      image: '',
      tag: 'NEW RELEASE',
    });
    showToast(isRtl ? 'تم نشر التصميم في معرض الجرافيك بنجاح!' : 'Artwork published to graphics gallery!');
  };

  const handleMoveGraphic = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= graphics.length) return;
    const updated = [...graphics];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setGraphics(updated);
    saveGraphicsData(updated);
    showToast(isRtl ? `تم نقل التصميم للمركز #${toIndex + 1}` : `Moved artwork to #${toIndex + 1}`);
  };

  const handleDeleteGraphic = (graphicId) => {
    if (!window.confirm(isRtl ? 'هل تريد حذف هذا التصميم من المعرض؟' : 'Delete this artwork?')) return;
    const updated = graphics.filter((item) => item.id !== graphicId);
    setGraphics(updated);
    saveGraphicsData(updated);
    showToast(isRtl ? 'تم حذف التصميم' : 'Artwork deleted');
  };

  // ─────────────────────────────────────────────
  // 5. Campaigns Handlers
  // ─────────────────────────────────────────────
  const handleSaveCampaign = (e) => {
    e.preventDefault();
    let updated;
    if (editingCampaign.id) {
      updated = campaigns.map((c) => (c.id === editingCampaign.id ? editingCampaign : c));
    } else {
      const newCamp = {
        ...editingCampaign,
        id: 'camp-' + Date.now(),
        code: editingCampaign.code || 'DV-' + Math.floor(Math.random() * 900 + 100),
      };
      updated = [newCamp, ...campaigns];
    }
    setCampaigns(updated);
    saveCampaignsData(updated);
    setEditingCampaign(null);
    showToast(isRtl ? 'تم حفظ بيانات الحملة بنجاح' : 'Campaign saved');
  };

  const handleDeleteCampaign = (id) => {
    if (window.confirm(isRtl ? 'هل تريد حذف هذه الحملة؟' : 'Delete campaign?')) {
      const updated = campaigns.filter((c) => c.id !== id);
      setCampaigns(updated);
      saveCampaignsData(updated);
      showToast(isRtl ? 'تم حذف الحملة' : 'Campaign deleted');
    }
  };

  // ─────────────────────────────────────────────
  // 6. Settings & Full Backup Export/Import
  // ─────────────────────────────────────────────
  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      socials,
      contentViews,
      production,
      campaigns,
      photoGalleries,
      graphics,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devotix_cms_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(isRtl ? 'تم تصدير نسخة احتياطية كاملة' : 'Full backup exported');
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.socials) {
          saveSocialLinks(data.socials);
          setSocials(data.socials);
        }
        if (data.contentViews) {
          saveContentViewsData(data.contentViews);
          setContentViews(data.contentViews);
        }
        if (data.production) {
          saveProductionGalleries(data.production);
          setProduction(data.production);
        }
        if (data.campaigns) {
          saveCampaignsData(data.campaigns);
          setCampaigns(data.campaigns);
        }
        if (data.photoGalleries) {
          savePhotographyGalleries(data.photoGalleries);
          setPhotoGalleries(data.photoGalleries);
        }
        if (data.graphics) {
          saveGraphicsData(data.graphics);
          setGraphics(data.graphics);
        }
        showToast(isRtl ? 'تم استيراد وتطبيق النسخة الاحتياطية بنجاح' : 'Backup restored successfully');
      } catch (err) {
        showToast(isRtl ? 'ملف غير صالح' : 'Invalid JSON file', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleChangePin = (newPin) => {
    if (!newPin || newPin.trim().length < 4) {
      showToast(isRtl ? 'الرمز يجب أن يتكون من 4 خانات على الأقل' : 'PIN must be at least 4 characters', 'error');
      return;
    }
    localStorage.setItem('devotix_admin_pin', newPin.trim());
    setSavedPin(newPin.trim());
    showToast(isRtl ? 'تم تغيير رمز الدخول بنجاح' : 'Admin PIN changed');
  };

  const handleResetAllDefaults = () => {
    if (window.confirm(isRtl ? 'تحذير: هل أنت متأكد من استعادة كافة بيانات الموقع الافتراضية؟' : 'Reset ALL website content to defaults?')) {
      resetSocialLinks();
      resetContentViewsData();
      resetProductionGalleries();
      resetCampaignsData();
      resetPhotographyGalleries();
      resetGraphicsData();
      setSocials(DEFAULT_SOCIAL_LINKS);
      setContentViews(getContentViewsData());
      setProduction(getProductionGalleries());
      setCampaigns(getSavedCampaigns());
      setPhotoGalleries(getPhotographyGalleries());
      setGraphics(getGraphicsData());
      showToast(isRtl ? 'تمت استعادة كافة البيانات الافتراضية بنجاح' : 'All defaults restored');
    }
  };

  // ─────────────────────────────────────────────
  // 7. Supabase Cloud Database Handlers
  // ─────────────────────────────────────────────
  const handleSaveSupabaseConfig = async (e) => {
    e.preventDefault();
    saveSupabaseConfig(supabaseConfig.url, supabaseConfig.anonKey);
    setSupabaseConfigState(getSupabaseConfig());
    showToast(isRtl ? 'تم حفظ الإعدادات وجارِ جلب البيانات من السحابة...' : 'Saved config & pulling latest cloud data...');
    try {
      const res = await initCmsSync(true);
      if (res && res.synced) {
        setPhotoGalleries(getPhotographyGalleries());
        setGraphics(getGraphicsData());
        setSocials(getSocialLinks());
        setContentViews(getContentViewsData());
        setProduction(getProductionGalleries());
        setCampaigns(getSavedCampaigns());
        showToast(isRtl ? 'تم ربط السحابة وتحديث بيانات الموقع بنجاح!' : 'Cloud connected & website data synced!');
      } else {
        showToast(isRtl ? 'تم حفظ الإعدادات بنجاح' : 'Supabase config saved');
      }
    } catch (err) {
      console.warn('Sync on save failed:', err);
    }
  };

  const handleTestSupabase = async () => {
    setSupabaseStatus({ testing: true, result: null });
    const res = await testSupabaseConnection(supabaseConfig.url, supabaseConfig.anonKey);
    setSupabaseStatus({ testing: false, result: res });
    if (res.success) {
      showToast(isRtl ? 'تم الاتصال بقاعدة بيانات Supabase بنجاح!' : 'Connected to Supabase successfully!');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleSyncAllToCloud = async () => {
    try {
      setIsSyncingAll(true);
      await syncAllLocalDataToCloud();
      showToast(isRtl ? 'تمت مزامنة ورفع كافة بيانات الموقع إلى قاعدة البيانات السحابية!' : 'All site data synced to cloud database!');
    } catch (err) {
      showToast(err.message || 'Sync failed', 'error');
    } finally {
      setIsSyncingAll(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    showToast(isRtl ? 'تم نسخ كود SQL لإنشاء الجدول' : 'SQL script copied to clipboard');
    setTimeout(() => setCopiedSql(false), 3000);
  };

  // Helper: extract YouTube video ID from various URL formats
  function extractYoutubeId(urlOrId) {
    if (!urlOrId) return '';
    if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId.trim())) return urlOrId.trim();
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/;
    const match = urlOrId.match(regExp);
    return match ? match[1] : urlOrId.trim();
  }

  // ─────────────────────────────────────────────
  // RENDER: LOCK SCREEN (PIN GATE)
  // ─────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#070709] px-4 select-none relative overflow-hidden font-sans">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/15 blur-[140px] rounded-full pointer-events-none" />

        <div className={`relative w-full max-w-md p-8 rounded-2xl bg-neutral-900/90 border ${pinError ? 'border-brand-red animate-shake' : 'border-white/10'} backdrop-blur-xl shadow-2xl`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/30 mb-4 shadow-lg shadow-brand-red/10">
              <Shield className="w-8 h-8 text-brand-red" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-wider uppercase mb-1">
              DEVOTIX MEDIA
            </h1>
            <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              {isRtl ? 'لوحة الإدارة والتحكم في المحتوى' : 'CMS MANAGEMENT PORTAL'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                {isRtl ? 'رمز الدخول السري (Master PIN)' : 'Enter Admin PIN'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-center text-lg tracking-widest focus:outline-none focus:border-brand-red transition-all"
                />
                <KeyRound className="w-5 h-5 text-neutral-500 absolute top-1/2 left-4 -translate-y-1/2 rtl:left-auto rtl:right-4 pointer-events-none" />
              </div>
              {pinError && (
                <p className="mt-2 text-xs text-brand-red font-semibold text-center animate-pulse">
                  {isRtl ? 'رمز الدخول غير صحيح، حاول مجدداً' : 'Incorrect PIN. Please try again.'}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-brand-red hover:bg-brand-red/90 text-white font-black uppercase tracking-wider text-sm shadow-lg shadow-brand-red/25 hover:shadow-brand-red/40 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{isRtl ? 'فتح لوحة التحكم' : 'Unlock Dashboard'}</span>
              <Unlock className="w-4 h-4 transition-transform group-hover:rotate-12" />
            </button>

            <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{isRtl ? 'العودة للموقع' : 'Back to Website'}</span>
              </button>
              <span className="text-[11px] text-neutral-600">Default PIN: devotix2026</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // RENDER: AUTHENTICATED DASHBOARD
  // ─────────────────────────────────────────────
  const totalVideos = production.reduce((acc, g) => acc + (g.videos?.length || 0), 0) + contentViews.length;

  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-[#09090c] text-white' : 'bg-white text-neutral-900'} transition-colors duration-300 font-sans select-none pb-20`}>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 animate-bounce">
          <div className={`flex items-center gap-2.5 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md text-sm font-bold border ${toast.type === 'error' ? 'bg-red-600/90 text-white border-red-400' : 'bg-emerald-600/90 text-white border-emerald-400'}`}>
            <Check className="w-4 h-4" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className={`sticky top-0 z-40 border-b ${isDark ? 'bg-neutral-950/80 border-white/10' : 'bg-white/90 border-neutral-200'} backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className={`p-2 rounded-lg border ${isDark ? 'border-white/10 hover:bg-white/5 text-neutral-300' : 'border-neutral-200 hover:bg-neutral-100 text-neutral-700'} transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer`}
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span className="hidden sm:inline">{isRtl ? 'الرئيسية' : 'Site'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-black tracking-wider text-brand-red uppercase">
              DEVOTIX
            </span>
            <span className="hidden sm:inline text-xs font-black uppercase px-2 py-0.5 rounded bg-brand-red/10 text-brand-red border border-brand-red/20">
              CMS PORTAL
            </span>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Metrics Badge */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-bold text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-1 text-brand-red">
              <Flame className="w-3.5 h-3.5" />
              {contentViews.length} {isRtl ? 'ريلز فيروسي' : 'Viral Reels'}
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-400" />
            <span>{totalVideos} {isRtl ? 'فيديو كلي' : 'Videos'}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-400" />
            <span>{leads.length} {isRtl ? 'طلب وارد' : 'Leads'}</span>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border ${isDark ? 'border-white/10 hover:bg-white/5 text-yellow-400' : 'border-neutral-200 hover:bg-neutral-100 text-neutral-700'} transition-colors cursor-pointer`}
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleLanguage}
            className={`px-2.5 py-1.5 rounded-lg border ${isDark ? 'border-white/10 hover:bg-white/5 text-neutral-300' : 'border-neutral-200 hover:bg-neutral-100 text-neutral-700'} text-xs font-bold uppercase transition-colors cursor-pointer`}
          >
            {isRtl ? 'EN' : 'عربي'}
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
            title={isRtl ? 'تسجيل الخروج' : 'Logout'}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar border-b border-neutral-200 dark:border-white/10">
          {[
            { id: 'social', label: isRtl ? 'السوشيال ميديا وإيميلات النماذج' : 'Social & Form Emails', icon: Share2 },
            { id: 'sheets', label: isRtl ? 'ربط ومزامنة شيت جوجل' : 'Google Sheets Sync', icon: Database },
            { id: 'views', label: isRtl ? 'فيوهات المحتوى (ريلز)' : 'Content Views (Reels)', icon: Flame },
            { id: 'production', label: isRtl ? 'معارض الإنتاج والفيديو' : 'Production Galleries', icon: Video },
            { id: 'photography', label: isRtl ? 'معارض التصوير الفوتوغرافي' : 'Photography Galleries', icon: ImageIcon },
            { id: 'graphics', label: isRtl ? 'معرض التصاميم والجرافيك' : 'Graphic Artworks', icon: Layers },
            { id: 'campaigns', label: isRtl ? 'متابعة الكامبينز' : 'Campaigns Tracker', icon: BarChart3 },
            { id: 'inbox', label: isRtl ? `صندوق الاستفسارات (${leads.length})` : `Leads Inbox (${leads.length})`, icon: Mail },
            { id: 'settings', label: isRtl ? 'الإعدادات والنسخ' : 'Settings & Backup', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/25'
                    : 'bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TAB 1: SOCIAL MEDIA LINKS
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'social' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Tab Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider">
                  {isRtl ? 'إدارة إيميلات النماذج وروابط السوشيال ميديا' : 'Forms Email Routing & Social Media'}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {isRtl
                    ? 'تعديل الإيميلات المربوطة باستقبال طلبات المشاريع ونماذج التوظيف والروابط الرسمية للشركة.'
                    : 'Manage recipient emails for website forms and official agency social media links.'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetSocials}
                className="px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-white/10 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                {isRtl ? 'استعادة الافتراضي' : 'Reset Defaults'}
              </button>
            </div>

            <form onSubmit={handleSaveSocials} className="space-y-8">
              {/* ========================================================================= */}
              {/* SECTION 1: FORM EMAILS ROUTING (طلب مشروع & التقديم على وظيفة)           */}
              {/* ========================================================================= */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-white/[0.02] border-2 border-brand-red/35 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-red text-white flex items-center justify-center shadow-md shadow-brand-red/30">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black uppercase tracking-wide text-neutral-900 dark:text-white font-display">
                        {isRtl ? 'ربط إيميلات نماذج الموقع (Form Email Routing)' : 'Forms Email Routing Configuration'}
                      </h3>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {isRtl
                          ? 'حدد الإيميل الذي يستلم رسائل كل نموذج على حدة (نموذج طلب مشروع & نموذج التقديم على وظيفة).'
                          : 'Set dedicated recipient emails for Project Inquiries and Job Applications.'}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10.5px] font-black uppercase tracking-wider w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {isRtl ? 'مزامنة سحابية نشطة ⚡' : 'Cloud Synced ⚡'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Form 1: Project Request Email (طلب مشروع) */}
                  <div className="p-4 sm:p-5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3 hover:border-brand-red/60 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
                        <label className="text-xs sm:text-[13px] font-black uppercase tracking-wide text-neutral-900 dark:text-white font-display">
                          {isRtl ? '1. إيميل نموذج (طلب مشروع)' : '1. Project Requests Email'}
                        </label>
                      </div>
                      {socials.projectRequestEmail && (
                        <a
                          href={`mailto:${socials.projectRequestEmail}`}
                          className="text-[10.5px] font-bold text-brand-red hover:underline flex items-center gap-1"
                          title="Test Email Client"
                        >
                          <span>{isRtl ? 'اختبار' : 'Test'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                      {isRtl
                        ? 'تُرسل إليه كافة استفسارات العملاء والميزانيات وطلبات الخدمات عبر نموذج (ابدأ مشروعك / Contact).'
                        : 'Receives all client project briefs, budgets, and inquiries from the Start Project & Contact forms.'}
                    </p>

                    <div className="space-y-1">
                      <input
                        type="email"
                        value={socials.projectRequestEmail || ''}
                        onChange={(e) => setSocials({ ...socials, projectRequestEmail: e.target.value })}
                        placeholder="devotixm@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/60 border border-neutral-300 dark:border-white/15 text-xs sm:text-sm font-semibold focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                      />
                    </div>

                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono flex items-center justify-between pt-1 border-t border-neutral-200 dark:border-white/5">
                      <span>{isRtl ? 'النماذج المربوطة:' : 'Linked:'} Contact Page & Project Modals</span>
                      <span className="text-emerald-500 font-bold uppercase">{isRtl ? 'متصل' : 'Connected'}</span>
                    </div>
                  </div>

                  {/* Form 2: Job Application Email (التقديم على وظيفة) */}
                  <div className="p-4 sm:p-5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3 hover:border-blue-500/60 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                        <label className="text-xs sm:text-[13px] font-black uppercase tracking-wide text-neutral-900 dark:text-white font-display">
                          {isRtl ? '2. إيميل نموذج (التقديم على وظيفة)' : '2. Job Applications Email'}
                        </label>
                      </div>
                      {socials.jobApplicationEmail && (
                        <a
                          href={`mailto:${socials.jobApplicationEmail}`}
                          className="text-[10.5px] font-bold text-blue-500 hover:underline flex items-center gap-1"
                          title="Test Email Client"
                        >
                          <span>{isRtl ? 'اختبار' : 'Test'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                      {isRtl
                        ? 'تُرسل إليه كافة السير الذاتية (CV) وروابط البورتفوليو وطلبات الانضمام للفريق في الوظائف الشاغرة.'
                        : 'Receives all resumes, CV attachments, and portfolio applications submitted for open positions.'}
                    </p>

                    <div className="space-y-1">
                      <input
                        type="email"
                        value={socials.jobApplicationEmail || ''}
                        onChange={(e) => setSocials({ ...socials, jobApplicationEmail: e.target.value })}
                        placeholder="careers@devotixmedia.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/60 border border-neutral-300 dark:border-white/15 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono flex items-center justify-between pt-1 border-t border-neutral-200 dark:border-white/5">
                      <span>{isRtl ? 'النماذج المربوطة:' : 'Linked:'} Job Apply & Send CV Pages</span>
                      <span className="text-blue-500 font-bold uppercase">{isRtl ? 'متصل' : 'Connected'}</span>
                    </div>
                  </div>

                  {/* Google Sheets Sync Pointer Banner (Centralized in Sheets tab) */}
                  <div className="md:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <h4 className="text-sm font-black uppercase tracking-wide text-neutral-900 dark:text-white font-display">
                            {isRtl ? 'إدارة ومزامنة شيت جوجل (Google Sheets Sync)' : 'Centralized Google Sheets Sync'}
                          </h4>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
                          {isRtl
                            ? 'تم توحيد جميع إعدادات Webhook وروابط الشيت وتجربة الإرسال الحي في تبويب شيت جوجل المخصص.'
                            : 'All Google Sheet Webhooks, live spreadsheet URLs, test rows, and Apps Script codes are managed in the dedicated tab.'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('sheets')}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20 whitespace-nowrap shrink-0 transition-all"
                    >
                      <span>{isRtl ? 'فتح مدير شيت جوجل' : 'Open Sheets Manager'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* SECTION 2: OFFICIAL SOCIAL MEDIA & PHONE CHANNELS                         */}
              {/* ========================================================================= */}
              <div className="space-y-4">
                <div className="pb-2 border-b border-neutral-200 dark:border-white/10">
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white font-display">
                    {isRtl ? 'روابط التواصل الاجتماعي الرسمية وأرقام الفروع' : 'Official Social Channels & Branch Contact'}
                  </h3>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {isRtl
                      ? 'الروابط المعروضة في شريط السوشيال العائم والهيدر والفوتر.'
                      : 'Links displayed across Header, Footer, and Floating Mobile Social Bar.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'instagram', label: 'Instagram URL', icon: Share2, placeholder: 'https://instagram.com/devotixmedia' },
                    { key: 'tiktok', label: 'TikTok URL', icon: Flame, placeholder: 'https://tiktok.com/@devotixmedia' },
                    { key: 'facebook', label: 'Facebook Page', icon: Share2, placeholder: 'https://facebook.com/devotixmedia' },
                    { key: 'linkedin', label: 'LinkedIn Company', icon: Share2, placeholder: 'https://linkedin.com/company/devotixmedia' },
                    { key: 'youtube', label: 'YouTube Channel', icon: Video, placeholder: 'https://youtube.com/@devotixmedia' },
                    { key: 'twitter', label: 'X (Twitter) URL', icon: Share2, placeholder: 'https://twitter.com/devotixmedia' },
                    { key: 'behance', label: 'Behance Portfolio', icon: ImageIcon, placeholder: 'https://behance.net/devotix' },
                    { key: 'email', label: 'General Official Email', icon: Mail, placeholder: 'devotixm@gmail.com' },
                    { key: 'whatsappEgypt', label: 'WhatsApp Egypt Link / Number', icon: Phone, placeholder: 'https://wa.me/201010185181' },
                    { key: 'whatsappSaudi', label: 'WhatsApp Saudi Link / Number', icon: Phone, placeholder: 'https://wa.me/966558661845' },
                    { key: 'phoneEgypt', label: 'Direct Phone (Egypt)', icon: Phone, placeholder: '+20 101 018 5181' },
                    { key: 'phoneSaudi', label: 'Direct Phone (Saudi Arabia)', icon: Phone, placeholder: '+966 55 866 1845' },
                  ].map((item) => (
                    <div key={item.key} className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                          {item.label}
                        </label>
                        {socials[item.key] && (
                          <a
                            href={socials[item.key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold text-brand-red flex items-center gap-1 hover:underline"
                          >
                            <span>{isRtl ? 'معاينة' : 'Test'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <input
                        type="text"
                        value={socials[item.key] || ''}
                        onChange={(e) => setSocials({ ...socials, [item.key]: e.target.value })}
                        placeholder={item.placeholder}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm focus:outline-none focus:border-brand-red transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Save Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-brand-red hover:bg-brand-red/90 text-white font-black uppercase tracking-wider text-sm shadow-xl shadow-brand-red/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{isRtl ? 'حفظ ومزامنة إيميلات النماذج والروابط فوراً' : 'Save & Sync All Emails & Links'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB: GOOGLE SHEETS INTEGRATION & LINKS
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'sheets' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-500">
                    {isRtl ? 'الربط المباشر مع جداول بيانات جوجل' : 'LIVE SPREADSHEET SYNC'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-neutral-900 dark:text-white font-display">
                  {isRtl ? 'إدارة وربط شيت جوجل (Google Sheets)' : 'Google Sheets Integration'}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {isRtl
                    ? 'أضف رابط شيت جوجل المباشر ورابط تطبيق الويب (Webhook) لتسجيل كل طلبات الخدمات والوظائف تلقائياً في صفوف الشيت فور إرسالها.'
                    : 'Manage your direct Google Sheet link and Webhook URL to stream client service inquiries and job applicants in real-time.'}
                </p>
              </div>

              {socials.googleSheetViewUrl && (
                <a
                  href={socials.googleSheetViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer w-fit"
                >
                  <span>{isRtl ? 'فتح شيت جوجل مباشرة' : 'Open Google Sheet'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <form onSubmit={handleSaveSocials} className="space-y-6">
              {/* Card 1: Links Input */}
              <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-white/10">
                  <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-500" />
                    <span>{isRtl ? '1. روابط شيت جوجل (Google Sheet URLs)' : '1. Google Sheet Links'}</span>
                  </h3>
                  <span className={socials.googleSheetWebhookUrl ? "text-[11px] font-bold text-emerald-500 flex items-center gap-1" : "text-[11px] font-bold text-neutral-400"}>
                    <span className={`w-2 h-2 rounded-full ${socials.googleSheetWebhookUrl ? 'bg-emerald-500' : 'bg-neutral-400'}`} />
                    {socials.googleSheetWebhookUrl ? (isRtl ? 'الربط مفعل ✅' : 'Connected ✅') : (isRtl ? 'غير مربوط' : 'Not Connected')}
                  </span>
                </div>

                {/* Webhook Input */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label className="text-xs font-black uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                      {isRtl ? 'رابط تطبيق الويب المربوط (Google Apps Script Webhook URL)' : 'Google Apps Script Webhook URL'} <span className="text-brand-red">*</span>
                    </label>
                    <span className="text-[10.5px] text-neutral-500">
                      {isRtl ? 'ينتهي بـ /exec' : 'Ends with /exec'}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {isRtl
                      ? 'الرابط الذي يتم إرسال طلبات الموقع (طلب الخدمات + وظائف ديفوتيكس) إليه تلقائياً عبر السكربت.'
                      : 'Endpoint where all forms send data in background mode.'}
                  </p>
                  <div className="relative">
                    <input
                      type="url"
                      value={socials.googleSheetWebhookUrl || ''}
                      onChange={(e) => setSocials({ ...socials, googleSheetWebhookUrl: e.target.value })}
                      placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                      className="w-full px-3.5 py-3 rounded-xl bg-white dark:bg-black/60 border border-neutral-300 dark:border-white/15 text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      disabled={isTestingSheet || !socials.googleSheetWebhookUrl}
                      onClick={handleTestGoogleSheet}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isTestingSheet ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>{isRtl ? 'جارِ الاختبار...' : 'Testing...'}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isRtl ? 'تجربة إرسال صف تجريبي للشيت الآن' : 'Send Test Row to Sheet'}</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (socials.googleSheetWebhookUrl) {
                          navigator.clipboard.writeText(socials.googleSheetWebhookUrl);
                          showToast(isRtl ? 'تم نسخ الرابط' : 'URL Copied');
                        }
                      }}
                      className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-white/15 hover:bg-neutral-100 dark:hover:bg-white/5 text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'نسخ الرابط' : 'Copy URL'}</span>
                    </button>
                  </div>
                </div>

                {/* Direct Google Sheet Link */}
                <div className="space-y-2 pt-3 border-t border-neutral-200 dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                      {isRtl ? 'رابط ملف شيت جوجل المباشر للمعاينة (Google Spreadsheet Direct Link)' : 'Direct Google Spreadsheet View Link'}
                    </label>
                    {socials.googleSheetViewUrl && (
                      <a
                        href={socials.googleSheetViewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1"
                      >
                        <span>{isRtl ? 'فتح الشيت' : 'Open'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {isRtl
                      ? 'ضع رابط ملف الشيت من المتصفح لفتحه بضغطة زر من لوحة التحكم في أي وقت لمتابعة العملاء والمتقدمين.'
                      : 'Paste your Google Sheet browser URL to quickly open and review submissions from this dashboard.'}
                  </p>
                  <div className="relative">
                    <input
                      type="url"
                      value={socials.googleSheetViewUrl || ''}
                      onChange={(e) => setSocials({ ...socials, googleSheetViewUrl: e.target.value })}
                      placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5.../edit"
                      className="w-full px-3.5 py-3 rounded-xl bg-white dark:bg-black/60 border border-neutral-300 dark:border-white/15 text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Code Snippet & Copy */}
              <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-white/10">
                  <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
                    <Copy className="w-4 h-4 text-emerald-500" />
                    <span>{isRtl ? '2. كود Google Apps Script الجاهز (يدعم تبويبي الخدمات والتوظيف)' : '2. Complete Google Apps Script Code'}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={handleCopyAppsScript}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      copiedAppsScript ? 'bg-emerald-600 text-white' : 'bg-neutral-200 dark:bg-white/10 text-neutral-800 dark:text-white hover:bg-neutral-300 dark:hover:bg-white/20'
                    }`}
                  >
                    {copiedAppsScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAppsScript ? (isRtl ? 'تم نسخ الكود!' : 'Copied!') : (isRtl ? 'نسخ الكود بالكامل' : 'Copy All Code')}</span>
                  </button>
                </div>

                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {isRtl
                    ? 'هذا السكربت يقوم تلقائياً بإنشاء تبويب "طلبات الخدمات" وتبويب "طلبات التوظيف" وتنسيق العناوين تلقائياً فور أول طلب، مع دعم الـ CORS والاستجابة السريعة.'
                    : 'Automatically routes submissions to "طلبات الخدمات" and "طلبات التوظيف" tabs with styled header rows.'}
                </p>

                <div className="relative rounded-xl overflow-hidden border border-neutral-300 dark:border-white/10 bg-black/90 p-3.5 max-h-56 overflow-y-auto font-mono text-[11px] text-emerald-400 leading-relaxed no-scrollbar select-text">
                  <pre>{GOOGLE_APPS_SCRIPT_CODE}</pre>
                </div>
              </div>

              {/* Card 3: 3-step setup guide */}
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {isRtl ? 'طريقة الربط في 3 خطوات بسيطة:' : 'How to set up in 3 simple steps:'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-neutral-700 dark:text-neutral-300">
                  <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-emerald-500/20 space-y-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">1</span>
                    <p className="font-bold">{isRtl ? 'افتح Apps Script' : 'Open Apps Script'}</p>
                    <p className="text-[11px] text-neutral-500">{isRtl ? 'في شيت جوجل، اضغط على التوسيعات (Extensions) ثم Apps Script.' : 'In Google Sheets, click Extensions > Apps Script.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-emerald-500/20 space-y-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">2</span>
                    <p className="font-bold">{isRtl ? 'الصق الكود وانشره' : 'Paste & Deploy'}</p>
                    <p className="text-[11px] text-neutral-500">{isRtl ? 'الصق الكود المنسوخ، واضغط Deploy > New deployment > Web app واجعل Access: Anyone.' : 'Paste code, Deploy > New deployment > Web app, Access: Anyone.'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-emerald-500/20 space-y-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">3</span>
                    <p className="font-bold">{isRtl ? 'احفظ الرابط هنا' : 'Save URL Here'}</p>
                    <p className="text-[11px] text-neutral-500">{isRtl ? 'الصق رابط الـ Web App المعطى في الحقل أعلاه واضغط حفظ التغييرات.' : 'Paste Web App URL in the field above and click Save.'}</p>
                  </div>
                </div>
              </div>

              {/* Submit Save Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-sm shadow-xl shadow-emerald-600/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{isRtl ? 'حفظ إعدادات وروابط شيت جوجل فوراً' : 'Save Google Sheet Links & Sync'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 2: CONTENT VIEWS & VIRAL REELS
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'views' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider">
                  {isRtl ? 'فيوهات المحتوى والشورتس الفيروسي' : 'Content Views & Virality Tracker'}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {isRtl
                    ? 'إدارة فيديوهات الريلز العمودية مع أرقام المشاهدات والتفاعل (المعروضة في قسم فيوهات الكونتنت).'
                    : 'Manage 9:16 vertical reels with verified view counts and high-engagement metrics.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setEditingReel({
                    id: '',
                    url: '',
                    youtubeId: '',
                    title: '',
                    titleAr: '',
                    client: '',
                    platform: 'tiktok',
                    platformLabel: 'TikTok Viral',
                    platformLabelAr: 'تيك توك فيروسي',
                    views: '1.5M',
                    viewsNumber: 1500000,
                    likes: '100K',
                    shares: '15K',
                    duration: '00:45',
                    category: 'reels',
                    isVertical: true,
                    tag: 'Trending #1',
                    tagAr: 'الأكثر تداولاً #1',
                  })
                }
                className="px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red/90 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-red/20"
              >
                <Plus className="w-4 h-4" />
                <span>{isRtl ? 'إضافة ريل جديد' : 'Add New Viral Reel'}</span>
              </button>
            </div>

            {/* List of Reels */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contentViews.map((reel) => (
                <div
                  key={reel.id}
                  className="rounded-xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] flex flex-col group transition-all hover:border-brand-red/50"
                >
                  <div className="relative aspect-[9/10] bg-black overflow-hidden">
                    <img
                      src={reel.image || `https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg`}
                      alt={reel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded-full bg-brand-red text-white text-[10px] font-black uppercase tracking-wider">
                      {reel.platformLabel || reel.platform}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-2xl font-black text-brand-red tracking-tight flex items-center gap-1.5">
                        <Flame className="w-5 h-5 text-brand-red" />
                        <span>{reel.views}</span>
                      </div>
                      <h4 className="font-bold text-sm line-clamp-1 mt-0.5">
                        {isRtl && reel.titleAr ? reel.titleAr : reel.title}
                      </h4>
                      <p className="text-[11px] text-neutral-300 font-semibold uppercase tracking-wider">
                        {reel.client}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-xs">
                    <div className="text-neutral-500 dark:text-neutral-400 font-mono">
                      ID: {reel.youtubeId}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingReel(reel)}
                        className="p-1.5 rounded-lg border border-neutral-300 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 cursor-pointer"
                        title={isRtl ? 'تعديل' : 'Edit'}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReel(reel.id)}
                        className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 cursor-pointer"
                        title={isRtl ? 'حذف' : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 3: PRODUCTION VIDEO GALLERIES
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'production' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider">
                  {isRtl ? 'معارض الإنتاج والفيديو (Production)' : 'Production Video Galleries'}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {isRtl
                    ? 'إدارة الأقسام الـ 4: ريلز، بروموز 4K، مونتاج وتحرير، وأفكار وحملات إعلانية.'
                    : 'Manage 4 distinct video categories: Reels, 4K Promos, Video Edits, and Creative Ads.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingVideo({
                    galleryId: selectedProdGalleryId,
                    video: {
                      id: '',
                      url: '',
                      youtubeId: '',
                      title: '',
                      titleAr: '',
                      client: '',
                      category: 'COMMERCIAL',
                      duration: '01:00',
                      description: '',
                      isVertical: selectedProdGalleryId === 'reals',
                    },
                  })
                }
                className="px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red/90 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-red/20"
              >
                <Plus className="w-4 h-4" />
                <span>{isRtl ? 'إضافة فيديو للمعرض' : 'Add Video to Selected Gallery'}</span>
              </button>
            </div>

            {/* Gallery Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {production.map((gal) => (
                <button
                  key={gal.id}
                  onClick={() => setSelectedProdGalleryId(gal.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    selectedProdGalleryId === gal.id
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-black shadow'
                      : 'bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                  }`}
                >
                  {isRtl && gal.titleAr ? gal.titleAr : gal.title} ({gal.videos?.length || 0})
                </button>
              ))}
            </div>

            {/* Selected Gallery Videos Grid */}
            {(() => {
              const currentGal = production.find((g) => g.id === selectedProdGalleryId) || production[0];
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentGal?.videos?.map((vid) => (
                    <div
                      key={vid.id}
                      className="rounded-xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] flex flex-col group hover:border-brand-red/50 transition-all"
                    >
                      <div className="relative aspect-video bg-black overflow-hidden">
                        <img
                          src={vid.image || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                          alt={vid.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
                          <span className="font-bold uppercase tracking-wider">{vid.client}</span>
                          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur font-mono text-[11px]">
                            {vid.duration}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          <h4 className="font-bold text-sm line-clamp-1">
                            {isRtl && vid.titleAr ? vid.titleAr : vid.title}
                          </h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1">
                            {vid.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-xs">
                          <span className="text-[11px] font-mono text-neutral-500">ID: {vid.youtubeId}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setEditingVideo({ galleryId: currentGal.id, video: vid })}
                              className="p-1.5 rounded-lg border border-neutral-300 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProductionVideo(currentGal.id, vid.id)}
                              className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 4: PHOTOS & GRAPHICS UPLOAD (Cloudinary)
        ───────────────────────────────────────────────────────────── */}
        {(activeTab === 'photography' || activeTab === 'media') && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="pb-4 border-b border-neutral-200 dark:border-white/10">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider">
                {isRtl ? 'معارض التصوير الفوتوغرافي' : 'Photography Galleries CMS'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {isRtl
                  ? 'رفع الصور مباشرة إلى سحابة Cloudinary وإدارتها في معارض الفاشون، المنتجات، والطعام مع ترتيب ظهورها وغلاف كل معرض.'
                  : 'Upload high-resolution photography directly to Cloudinary and manage Fashion, Products, and Food galleries.'}
              </p>
            </div>

            {/* Direct Upload Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border-2 border-dashed border-neutral-300 dark:border-white/20 text-center relative hover:border-brand-red/60 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                <div className="w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center">
                  {isUploading ? (
                    <RefreshCw className="w-8 h-8 text-brand-red animate-spin" />
                  ) : (
                    <Upload className="w-8 h-8 text-brand-red" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    {isUploading
                      ? (isRtl ? `جاري الرفع إلى Cloudinary... ${uploadProgress}%` : `Uploading to Cloudinary... ${uploadProgress}%`)
                      : (isRtl ? 'انقر أو اسحب الصورة هنا للرفع' : 'Click or Drag image here to upload')}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Direct Cloudinary (qs6oltzi) • Auto-optimised WebP/AVIF
                  </p>
                </div>
              </div>

              {isUploading && (
                <div className="mt-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-brand-red h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Photo Metadata & Gallery Assign Form */}
            <form onSubmit={handleAddPhotoToGallery} className="p-6 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-red" />
                <span>{isRtl ? 'بيانات الصورة وتعيين المعرض' : 'Photo Details & Gallery Placement'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                    {isRtl ? 'المعرض المستهدف' : 'Target Gallery'}
                  </label>
                  <select
                    value={newPhotoData.galleryId}
                    onChange={(e) => setNewPhotoData({ ...newPhotoData, galleryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm focus:outline-none focus:border-brand-red"
                  >
                    <option value="fashion">Fashion & Editorial (فاشون)</option>
                    <option value="product">Products & Commercial (منتجات)</option>
                    <option value="food">Food & Culinary (طعام ومأكولات)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                    {isRtl ? 'عنوان الصورة / العمل' : 'Photo Title'}
                  </label>
                  <input
                    type="text"
                    value={newPhotoData.title}
                    onChange={(e) => setNewPhotoData({ ...newPhotoData, title: e.target.value })}
                    placeholder="e.g. LUXURY EDITORIAL VII"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                    {isRtl ? 'الموقع / العميل' : 'Location / Client'}
                  </label>
                  <input
                    type="text"
                    value={newPhotoData.location}
                    onChange={(e) => setNewPhotoData({ ...newPhotoData, location: e.target.value })}
                    placeholder="e.g. RIYADH STUDIO, SAUDI ARABIA"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                    {isRtl ? 'معدات التصوير / التفاصيل' : 'Camera Gear / Specs'}
                  </label>
                  <input
                    type="text"
                    value={newPhotoData.camera}
                    onChange={(e) => setNewPhotoData({ ...newPhotoData, camera: e.target.value })}
                    placeholder="e.g. Hasselblad H6D • 85mm f/1.8"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  {isRtl ? 'رابط الصورة (Cloudinary URL)' : 'Cloudinary Image URL'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPhotoData.image}
                    onChange={(e) => setNewPhotoData({ ...newPhotoData, image: e.target.value })}
                    placeholder="https://res.cloudinary.com/qs6oltzi/image/upload/..."
                    className="flex-1 px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm font-mono focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              {/* Preview if image URL exists */}
              {newPhotoData.image && (
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-black/40 border border-neutral-200 dark:border-white/10">
                  <img
                    src={newPhotoData.image}
                    alt="Uploaded preview"
                    className="w-20 h-20 object-cover rounded-lg border border-neutral-300 dark:border-white/15"
                  />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-emerald-500">{isRtl ? 'جاهز للإضافة للمعرض' : 'Ready to add'}</p>
                    <p className="text-neutral-500 font-mono line-clamp-1">{newPhotoData.image}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-brand-red hover:bg-brand-red/90 text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-red/25"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isRtl ? 'نشر الصورة في المعرض' : 'Publish to Gallery'}</span>
                </button>
              </div>
            </form>

            {/* ─────────────────────────────────────────────────────────────
                SECTION: REORDER & ARRANGE GALLERY PHOTOS (ترتيب الصور)
            ───────────────────────────────────────────────────────────── */}
            <div className="pt-6 border-t border-neutral-200 dark:border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider flex items-center gap-2 text-neutral-900 dark:text-white">
                    <Layers className="w-5 h-5 text-brand-red" />
                    <span>{isRtl ? 'ترتيب وتنسيق ظهور الصور في المعارض' : 'Reorder & Arrange Gallery Photos'}</span>
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {isRtl
                      ? 'يمكنك تقديم وتأخير أي صورة بالأسهم ⬆️ ⬇️ أو السحب والإفلات، والصورة رقم #1 هي غلاف المعرض دائماً.'
                      : 'Reorder photos using ⬆️ ⬇️ buttons or drag & drop. Photo #1 serves as the gallery cover.'}
                  </p>
                </div>

                {/* Quick Info Badge */}
                <div className="px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-bold text-neutral-600 dark:text-neutral-300 w-fit">
                  {photoGalleries.find((g) => g.id === selectedPhotoGalleryId)?.photos?.length || 0} {isRtl ? 'صورة في المعرض' : 'Photos in Gallery'}
                </div>
              </div>

              {/* Gallery Switcher for Reordering */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {[
                  { id: 'fashion', label: isRtl ? 'معرض الفاشون (Fashion)' : 'Fashion Gallery' },
                  { id: 'product', label: isRtl ? 'معرض المنتجات (Products)' : 'Products Gallery' },
                  { id: 'food', label: isRtl ? 'معرض المأكولات (Food)' : 'Food Gallery' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedPhotoGalleryId(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      selectedPhotoGalleryId === tab.id
                        ? 'bg-brand-red text-white shadow-md shadow-brand-red/25'
                        : 'bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Reordering Grid */}
              {(() => {
                const itemsList = photoGalleries.find((g) => g.id === selectedPhotoGalleryId)?.photos || [];

                if (itemsList.length === 0) {
                  return (
                    <div className="p-8 text-center rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/10 text-xs text-neutral-500">
                      {isRtl ? 'لا توجد صور في هذا المعرض حالياً.' : 'No photos in this gallery yet.'}
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                    {itemsList.map((photo, index) => {
                      const isCover = index === 0;
                      return (
                        <div
                          key={photo.id || index}
                          draggable
                          onDragStart={() => setDraggedPhotoIndex(index)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (draggedPhotoIndex !== null && draggedPhotoIndex !== index) {
                              handleMovePhoto(selectedPhotoGalleryId, draggedPhotoIndex, index);
                              setDraggedPhotoIndex(null);
                            }
                          }}
                          className={`relative rounded-xl overflow-hidden border transition-all flex flex-col justify-between bg-white dark:bg-neutral-900 group ${
                            isCover
                              ? 'border-brand-red shadow-md shadow-brand-red/10 ring-1 ring-brand-red/50'
                              : 'border-neutral-200 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/30'
                          }`}
                        >
                          {/* Photo Preview & Rank Badge */}
                          <div className="relative aspect-square bg-black overflow-hidden">
                            <img
                              src={photo.image || photo.thumb}
                              alt={photo.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                            {/* Rank Badge */}
                            <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 flex items-center gap-1">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase shadow ${
                                  isCover
                                    ? 'bg-brand-red text-white ring-2 ring-white/40'
                                    : 'bg-black/75 text-white backdrop-blur-md border border-white/20'
                                }`}
                              >
                                #{index + 1} {isCover ? (isRtl ? '⭐ الغلاف' : '⭐ COVER') : ''}
                              </span>
                            </div>

                            {/* Drag Indicator */}
                            <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 p-1 rounded-md bg-black/60 text-white/70 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                              <GripVertical className="w-3.5 h-3.5" />
                            </div>

                            {/* Bottom Info on Image */}
                            <div className="absolute bottom-2 left-2 right-2 text-white">
                              <p className="text-xs font-bold truncate">{photo.title || 'Untitled'}</p>
                              <p className="text-[10px] text-neutral-300 font-medium truncate">
                                {photo.location || photo.client || photo.category || ''}
                              </p>
                            </div>
                          </div>

                          {/* Reordering Action Buttons */}
                          <div className="p-2.5 bg-neutral-50 dark:bg-white/[0.02] border-t border-neutral-200 dark:border-white/10 flex items-center justify-between gap-1.5 text-xs">
                            {/* Move Up / Down Buttons */}
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => handleMovePhoto(selectedPhotoGalleryId, index, index - 1)}
                                className="p-1.5 rounded-lg border border-neutral-300 dark:border-white/15 bg-white dark:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-200 transition-colors cursor-pointer"
                                title={isRtl ? 'تقديم خطوة للأمام' : 'Move Up'}
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                disabled={index === itemsList.length - 1}
                                onClick={() => handleMovePhoto(selectedPhotoGalleryId, index, index + 1)}
                                className="p-1.5 rounded-lg border border-neutral-300 dark:border-white/15 bg-white dark:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-200 transition-colors cursor-pointer"
                                title={isRtl ? 'تأخير خطوة للخلف' : 'Move Down'}
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Set As Cover Button */}
                            {!isCover && (
                              <button
                                type="button"
                                onClick={() => handleSetCoverPhoto(selectedPhotoGalleryId, index)}
                                className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                title={isRtl ? 'تعيين كغلاف أول للمعرض' : 'Set as Cover'}
                              >
                                <Star className="w-3 h-3" />
                                <span>{isRtl ? 'غلاف' : 'Cover'}</span>
                              </button>
                            )}

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDeletePhotoFromGallery(selectedPhotoGalleryId, photo.id)}
                              className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                              title={isRtl ? 'حذف الصورة' : 'Delete Photo'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB: GRAPHIC DESIGN & ARTWORKS (معرض التصاميم والجرافيك)
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'graphics' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="pb-4 border-b border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-6 h-6 text-brand-red" />
                  <span>{isRtl ? 'إدارة معرض التصاميم والجرافيك' : 'Graphic Artworks & Designs CMS'}</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {isRtl
                    ? 'رفع أعمال وتصاميم الهوية البصرية، الباكيدجينج، وسوشيال ميديا ديزاين وترتيب تسلسل ظهورها في الموقع.'
                    : 'Upload and arrange brand identity, packaging, typography, and social media designs.'}
                </p>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-bold text-neutral-600 dark:text-neutral-300 w-fit shrink-0">
                {graphics.length} {isRtl ? 'تصميم منشور' : 'Published Artworks'}
              </div>
            </div>

            {/* Direct Upload Box for Graphics */}
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border-2 border-dashed border-neutral-300 dark:border-white/20 text-center relative hover:border-brand-red/60 transition-colors">
              <input
                ref={graphicFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleGraphicFileUpload}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                <div className="w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center">
                  {isUploading ? (
                    <RefreshCw className="w-8 h-8 text-brand-red animate-spin" />
                  ) : (
                    <Upload className="w-8 h-8 text-brand-red" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    {isUploading
                      ? (isRtl ? `جاري رفع التصميم إلى Cloudinary... ${uploadProgress}%` : `Uploading Graphic to Cloudinary... ${uploadProgress}%`)
                      : (isRtl ? 'انقر أو اسحب ملف التصميم هنا للرفع المباشر' : 'Click or Drag artwork file here to upload')}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Direct Cloudinary (qs6oltzi) • Auto-optimised WebP/AVIF
                  </p>
                </div>
              </div>

              {isUploading && (
                <div className="mt-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-brand-red h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Graphic Metadata Form */}
            <form onSubmit={handleAddGraphicArtwork} className="p-6 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-red" />
                <span>{isRtl ? 'بيانات العمل وتصنيف الجرافيك' : 'Graphic Details & Category'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                    {isRtl ? 'تصنيف الفلترة' : 'Category Filter'}
                  </label>
                  <select
                    value={newGraphicData.categoryFilter}
                    onChange={(e) => {
                      const filterVal = e.target.value;
                      let label = 'BRANDING & IDENTITY';
                      if (filterVal === 'social') label = 'SOCIAL MEDIA & ADS';
                      else if (filterVal === 'packaging') label = 'PACKAGING & PRINT';
                      else if (filterVal === 'typography') label = 'TYPOGRAPHY & ART';
                      setNewGraphicData({
                        ...newGraphicData,
                        categoryFilter: filterVal,
                        category: label,
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm focus:outline-none focus:border-brand-red"
                  >
                    <option value="branding">Branding & Identity (هوية بصرية)</option>
                    <option value="social">Social Media & Ads (سوشيال ميديا)</option>
                    <option value="packaging">Packaging & Print (تغليف وطباعة)</option>
                    <option value="typography">Typography & Art (تايبوجرافي وفنون)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                    {isRtl ? 'عنوان العمل' : 'Artwork Title'}
                  </label>
                  <input
                    type="text"
                    value={newGraphicData.title}
                    onChange={(e) => setNewGraphicData({ ...newGraphicData, title: e.target.value })}
                    placeholder="e.g. LUXURY COFFEE REBRAND"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                    {isRtl ? 'اسم العميل / العلامة' : 'Client / Brand'}
                  </label>
                  <input
                    type="text"
                    value={newGraphicData.client}
                    onChange={(e) => setNewGraphicData({ ...newGraphicData, client: e.target.value })}
                    placeholder="e.g. AROMA ROASTERS"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                    {isRtl ? 'شارة العمل (Tag / Badge)' : 'Artwork Tag'}
                  </label>
                  <input
                    type="text"
                    value={newGraphicData.tag}
                    onChange={(e) => setNewGraphicData({ ...newGraphicData, tag: e.target.value })}
                    placeholder="e.g. BRAND IDENTITY"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  {isRtl ? 'رابط التصميم (Image URL)' : 'Artwork Image URL'}
                </label>
                <input
                  type="text"
                  value={newGraphicData.image}
                  onChange={(e) => setNewGraphicData({ ...newGraphicData, image: e.target.value })}
                  placeholder="https://res.cloudinary.com/qs6oltzi/image/upload/..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm font-mono focus:outline-none focus:border-brand-red"
                />
              </div>

              {/* Preview if image URL exists */}
              {newGraphicData.image && (
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-black/40 border border-neutral-200 dark:border-white/10">
                  <img
                    src={newGraphicData.image}
                    alt="Artwork preview"
                    className="w-20 h-20 object-cover rounded-lg border border-neutral-300 dark:border-white/15"
                  />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-emerald-500">{isRtl ? 'جاهز للإضافة لمعرض الجرافيك' : 'Ready to add'}</p>
                    <p className="text-neutral-500 font-mono line-clamp-1">{newGraphicData.image}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-brand-red hover:bg-brand-red/90 text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-red/25"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isRtl ? 'نشر التصميم في المعرض' : 'Publish to Graphics Gallery'}</span>
                </button>
              </div>
            </form>

            {/* Reorder & Arrange Graphics Artworks */}
            <div className="pt-6 border-t border-neutral-200 dark:border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider flex items-center gap-2 text-neutral-900 dark:text-white">
                    <Layers className="w-5 h-5 text-brand-red" />
                    <span>{isRtl ? 'ترتيب وتنسيق ظهور التصاميم' : 'Reorder & Sequence Graphics'}</span>
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {isRtl
                      ? 'يمكنك ترتيب ظهور التصاميم بالأسهم ⬆️ ⬇️ أو بالسحب والإفلات. التصميم رقم #1 يتصدر واجهة المعرض.'
                      : 'Reorder artworks using ⬆️ ⬇️ or drag & drop. Design #1 appears first in the gallery.'}
                  </p>
                </div>
              </div>

              {graphics.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/10 text-xs text-neutral-500">
                  {isRtl ? 'لا توجد تصاميم في المعرض حالياً.' : 'No graphic artworks in the gallery yet.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                  {graphics.map((art, index) => {
                    const isCover = index === 0;
                    return (
                      <div
                        key={art.id || index}
                        draggable
                        onDragStart={() => setDraggedGraphicIndex(index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (draggedGraphicIndex !== null && draggedGraphicIndex !== index) {
                            handleMoveGraphic(draggedGraphicIndex, index);
                            setDraggedGraphicIndex(null);
                          }
                        }}
                        className={`relative rounded-xl overflow-hidden border transition-all flex flex-col justify-between bg-white dark:bg-neutral-900 group ${
                          isCover
                            ? 'border-brand-red shadow-md shadow-brand-red/10 ring-1 ring-brand-red/50'
                            : 'border-neutral-200 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/30'
                        }`}
                      >
                        {/* Artwork Preview & Rank Badge */}
                        <div className="relative aspect-square bg-black overflow-hidden">
                          <img
                            src={art.image || art.thumb}
                            alt={art.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                          {/* Rank Badge */}
                          <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 flex items-center gap-1">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase shadow ${
                                isCover
                                  ? 'bg-brand-red text-white ring-2 ring-white/40'
                                  : 'bg-black/75 text-white backdrop-blur-md border border-white/20'
                              }`}
                            >
                              #{index + 1} {isCover ? (isRtl ? '⭐ الأول' : '⭐ #1') : ''}
                            </span>
                          </div>

                          {/* Category Tag Badge */}
                          <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 flex items-center gap-1">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-white/20 text-white backdrop-blur-md">
                              {art.categoryFilter || 'artwork'}
                            </span>
                          </div>

                          {/* Bottom Info on Image */}
                          <div className="absolute bottom-2 left-2 right-2 text-white">
                            <p className="text-xs font-bold truncate">{art.title || 'Untitled'}</p>
                            <p className="text-[10px] text-neutral-300 font-medium truncate">
                              {art.client || art.tag || ''}
                            </p>
                          </div>
                        </div>

                        {/* Reordering Action Buttons */}
                        <div className="p-2.5 bg-neutral-50 dark:bg-white/[0.02] border-t border-neutral-200 dark:border-white/10 flex items-center justify-between gap-1.5 text-xs">
                          {/* Move Up / Down Buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => handleMoveGraphic(index, index - 1)}
                              className="p-1.5 rounded-lg border border-neutral-300 dark:border-white/15 bg-white dark:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-200 transition-colors cursor-pointer"
                              title={isRtl ? 'تقديم خطوة للأمام' : 'Move Up'}
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              disabled={index === graphics.length - 1}
                              onClick={() => handleMoveGraphic(index, index + 1)}
                              className="p-1.5 rounded-lg border border-neutral-300 dark:border-white/15 bg-white dark:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-200 transition-colors cursor-pointer"
                              title={isRtl ? 'تأخير خطوة للخلف' : 'Move Down'}
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleDeleteGraphic(art.id)}
                            className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title={isRtl ? 'حذف التصميم' : 'Delete Artwork'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 5: CAMPAIGNS TRACKER
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider">
                  {isRtl ? 'حملات التسويق والكامبينز (Campaigns)' : 'Client Marketing Campaigns'}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {isRtl
                    ? 'إدارة بطاقات متابعة الكامبينز الإعلانية والنتائج المحققة للعملاء.'
                    : 'Manage client marketing campaigns, growth metrics, ROAS, and stage tracking.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setEditingCampaign({
                    id: '',
                    code: 'DV-' + Math.floor(Math.random() * 900 + 100),
                    clientName: '',
                    clientNameAr: '',
                    industry: '',
                    industryAr: '',
                    campaignTitle: '',
                    campaignTitleAr: '',
                    objective: '',
                    objectiveAr: '',
                    platforms: ['Meta', 'Google Ads', 'TikTok'],
                    status: 'active',
                    statusLabel: 'Live Active',
                    statusLabelAr: 'حملة نشطة',
                    progressPercent: 75,
                    currentStageTitle: 'Ad Optimization',
                    currentStageTitleAr: 'التحسين الذكي للنتائج',
                    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
                    metrics: {
                      reach: '1.2M',
                      impressions: '3.5M',
                      leads: '+350 Leads',
                      leadsAr: '+350 عميل',
                      roas: '5.0x',
                      growth: '+180%',
                    },
                    highlight: 'Solid lead generation with high ROAS.',
                    highlightAr: 'نتائج ممتازة وعائد إعلاني قوي.',
                  })
                }
                className="px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red/90 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-red/20"
              >
                <Plus className="w-4 h-4" />
                <span>{isRtl ? 'إضافة حملة جديدة' : 'Add New Campaign'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="p-5 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 flex flex-col justify-between space-y-4 hover:border-brand-red/50 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-brand-red px-2 py-0.5 rounded bg-brand-red/10 border border-brand-red/20">
                        {camp.code}
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        camp.status === 'scaling'
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      }`}>
                        {isRtl && camp.statusLabelAr ? camp.statusLabelAr : camp.statusLabel}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-black text-base text-neutral-900 dark:text-white">
                        {isRtl && camp.clientNameAr ? camp.clientNameAr : camp.clientName}
                      </h4>
                      <p className="text-xs text-neutral-500 font-semibold">
                        {isRtl && camp.campaignTitleAr ? camp.campaignTitleAr : camp.campaignTitle}
                      </p>
                    </div>

                    {/* Quick Metrics Grid */}
                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-neutral-200 dark:border-white/10 text-center">
                      <div className="p-2 rounded-lg bg-white dark:bg-black/40">
                        <span className="block text-[10px] text-neutral-500 font-bold uppercase">{isRtl ? 'الوصول' : 'Reach'}</span>
                        <span className="text-xs font-black text-brand-red">{camp.metrics?.reach}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white dark:bg-black/40">
                        <span className="block text-[10px] text-neutral-500 font-bold uppercase">{isRtl ? 'الظهور' : 'Impr.'}</span>
                        <span className="text-xs font-black">{camp.metrics?.impressions}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white dark:bg-black/40">
                        <span className="block text-[10px] text-neutral-500 font-bold uppercase">ROAS</span>
                        <span className="text-xs font-black text-emerald-500">{camp.metrics?.roas}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white dark:bg-black/40">
                        <span className="block text-[10px] text-neutral-500 font-bold uppercase">{isRtl ? 'النمو' : 'Growth'}</span>
                        <span className="text-xs font-black text-amber-500">{camp.metrics?.growth}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-neutral-500">{isRtl ? 'الإنجاز' : 'Progress'}: {camp.progressPercent}%</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingCampaign(camp)}
                        className="p-1.5 rounded-lg border border-neutral-300 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCampaign(camp.id)}
                        className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 6: INQUIRIES & LEADS INBOX
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'inbox' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10">
              <div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider">
                  {isRtl ? 'صندوق الرسائل والاستفسارات الواردة' : 'Direct Inquiries & Leads Inbox'}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {isRtl
                    ? 'جميع الرسائل وطلبات التوظيف والاستفسارات الواردة من نماذج الموقع (ترسل أيضاً للإيميل الرسمي devotixm@gmail.com).'
                    : 'All inquiries submitted via website forms (also routed directly to official email devotixm@gmail.com).'}
                </p>
              </div>
              {leads.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm(isRtl ? 'مسح كافة الرسائل؟' : 'Clear all messages?')) {
                      clearAllLeads();
                      setLeads([]);
                      showToast(isRtl ? 'تم مسح الصندوق' : 'Inbox cleared');
                    }
                  }}
                  className="px-3.5 py-2 rounded-lg border border-red-500/30 text-red-500 text-xs font-bold hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  {isRtl ? 'مسح الصندوق' : 'Clear All'}
                </button>
              )}
            </div>

            {leads.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/10">
                <Mail className="w-12 h-12 text-neutral-400 mx-auto mb-3 opacity-50" />
                <h3 className="font-bold text-neutral-700 dark:text-neutral-300">
                  {isRtl ? 'لا توجد رسائل واردة حتى الآن' : 'No incoming leads yet'}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {isRtl
                    ? 'أي رسالة يرسلها الزوار عبر نماذج التواصل أو التوظيف ستظهر هنا فوراً وتُرسل لـ devotixm@gmail.com.'
                    : 'Submissions from contact & career modals will appear here instantly.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-neutral-900 dark:text-white">
                          {lead.name || lead.fullName || 'Anonymous Visitor'}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                          {lead.type || 'Contact Inquiry'}
                        </span>
                        {lead.recipientEmail && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            ✉️ {lead.recipientEmail}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : ''}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {lead.email && (
                        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                          <Mail className="w-3.5 h-3.5 text-brand-red" />
                          <a href={`mailto:${lead.email}`} className="hover:underline">
                            {lead.email}
                          </a>
                        </div>
                      )}
                      {lead.phone && (
                        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                          <Phone className="w-3.5 h-3.5 text-brand-red" />
                          <a href={`tel:${lead.phone}`} className="hover:underline">
                            {lead.phone}
                          </a>
                        </div>
                      )}
                      {lead.service && (
                        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                          <Layers className="w-3.5 h-3.5 text-brand-red" />
                          <span>{lead.service}</span>
                        </div>
                      )}
                    </div>

                    {lead.message && (
                      <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-neutral-200 dark:border-white/10 text-xs text-neutral-700 dark:text-neutral-300">
                        {lead.message}
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {lead.phone && (
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-700 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}?subject=Re: Devotix Media Inquiry`}
                            className="px-3 py-1.5 rounded-lg bg-brand-red text-white text-xs font-bold flex items-center gap-1.5 hover:bg-brand-red/90 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply Email</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => deleteStoredLead(lead.id)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title={isRtl ? 'حذف' : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 7: SETTINGS & BACKUP
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="pb-4 border-b border-neutral-200 dark:border-white/10">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider">
                {isRtl ? 'الإعدادات والنسخ الاحتياطي' : 'System Settings & Database Backup'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {isRtl
                  ? 'إدارة كلمة المرور، تصدير واستيراد قاعدة بيانات الموقع كملف JSON، واستعادة ضبط المصنع.'
                  : 'Manage Master PIN, export/import complete JSON database backup, and factory restore.'}
              </p>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                SECTION: SUPABASE CLOUD DATABASE (الربط السحابي المركزي)
            ───────────────────────────────────────────────────────────── */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-black uppercase tracking-wider flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-500" />
                    <span>{isRtl ? 'قاعدة البيانات السحابية (Supabase Cloud Database)' : 'Supabase Cloud Database'}</span>
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    {isRtl
                      ? 'مزامنة مركزية حية: أي تعديل (غلاف، صور، ريلز) يسمّع فوراً عند جميع الزوار في العالم بدون إعادة رفع الموقع.'
                      : 'Live Centralized Sync: Updates in dashboard reflect instantly for all visitors worldwide without redeploying.'}
                  </p>
                </div>

                {/* Status Badge */}
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit border ${
                  isSupabaseConfigured()
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured() ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <span>
                    {isSupabaseConfigured()
                      ? (isRtl ? 'السحابة مُفعلة ومربوطة' : 'Cloud DB Connected')
                      : (isRtl ? 'تخزين محلي فقط (غير مربوط)' : 'Local Storage Only')}
                  </span>
                </div>
              </div>

              {/* Form Inputs for Supabase URL & Anon Key */}
              <form onSubmit={handleSaveSupabaseConfig} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://your-project.supabase.co"
                    value={supabaseConfig.url}
                    onChange={(e) => setSupabaseConfigState({ ...supabaseConfig, url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-xs font-mono focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1">
                    Supabase Anon Public API Key
                  </label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={supabaseConfig.anonKey}
                    onChange={(e) => setSupabaseConfigState({ ...supabaseConfig, anonKey: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-xs font-mono focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
                  />
                </div>

                {/* Test Result Message */}
                {supabaseStatus.result && (
                  <div className={`p-3 rounded-xl text-xs font-medium border ${
                    supabaseStatus.result.success
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-500'
                  }`}>
                    {supabaseStatus.result.message}
                  </div>
                )}

                {/* Actions: Save, Test, Sync, SQL Setup */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-red/90 cursor-pointer shadow-md shadow-brand-red/20"
                  >
                    {isRtl ? 'حفظ الإعدادات' : 'Save Config'}
                  </button>

                  <button
                    type="button"
                    disabled={supabaseStatus.testing || !supabaseConfig.url}
                    onClick={handleTestSupabase}
                    className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/15 hover:bg-neutral-100 dark:hover:bg-white/5 text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${supabaseStatus.testing ? 'animate-spin' : ''}`} />
                    <span>{supabaseStatus.testing ? (isRtl ? 'جارِ الاختبار...' : 'Testing...') : (isRtl ? 'اختبار الاتصال' : 'Test Connection')}</span>
                  </button>

                  <button
                    type="button"
                    disabled={isSyncingAll || !isSupabaseConfigured()}
                    onClick={handleSyncAllToCloud}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                    title={isRtl ? 'رفع كافة المعارض والصور الحالية للسحابة' : 'Upload all current content to cloud'}
                  >
                    <Cloud className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-bounce' : ''}`} />
                    <span>{isSyncingAll ? (isRtl ? 'جارِ المزامنة...' : 'Syncing...') : (isRtl ? 'مزامنة كل البيانات للسحابة' : 'Sync All to Cloud')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSqlModal(true)}
                    className="px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/15 hover:bg-neutral-100 dark:hover:bg-white/5 text-[11px] font-bold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
                  >
                    {isRtl ? '📋 كود الـ SQL للجدول' : '📋 SQL Setup'}
                  </button>
                </div>
              </form>

              {/* Quick Setup Hint */}
              <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-neutral-600 dark:text-neutral-300 space-y-1">
                <p className="font-bold text-blue-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'كيف تحصل على مفاتيح Supabase مجاناً في دقيقة؟' : 'Quick Supabase Setup (1 Minute):'}</span>
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {isRtl
                    ? '1. افتح supabase.com وأنشئ مشروع جديد مجاني. 2. من Project Settings > API انسخ Project URL و anon public key والصقهما هنا. 3. انسخ كود الـ SQL واضغط Run في SQL Editor.'
                    : '1. Create a free project on supabase.com. 2. Under Project Settings > API copy URL and anon key. 3. Paste SQL in SQL Editor and Run.'}
                </p>
              </div>
            </div>

            {/* Change PIN Box */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-red" />
                <span>{isRtl ? 'تغيير رمز الدخول السري (Master PIN)' : 'Change Admin Master PIN'}</span>
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="newPinInput"
                  placeholder="e.g. devotix2026"
                  defaultValue={savedPin}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm font-mono focus:outline-none focus:border-brand-red"
                />
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('newPinInput');
                    if (el) handleChangePin(el.value);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-red/90 cursor-pointer"
                >
                  {isRtl ? 'تحديث' : 'Update'}
                </button>
              </div>
            </div>

            {/* Backup & Export */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                <Download className="w-4 h-4 text-brand-red" />
                <span>{isRtl ? 'النسخ الاحتياطي والاستعادة' : 'JSON Backup & Restore'}</span>
              </h3>
              <p className="text-xs text-neutral-500">
                {isRtl
                  ? 'يمكنك تنزيل ملف JSON يحتوي على كافة الروابط، الفيديوهات، الصور، والحملات لاستخدامه كنسخة احتياطية أو نقله.'
                  : 'Export all modified site data into a single JSON file or restore from a previous backup.'}
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:opacity-90"
                >
                  <Download className="w-4 h-4" />
                  <span>{isRtl ? 'تصدير نسخة JSON' : 'Export JSON Backup'}</span>
                </button>

                <label className="px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-white/15 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-white/5">
                  <Upload className="w-4 h-4" />
                  <span>{isRtl ? 'استيراد نسخة JSON' : 'Import JSON Backup'}</span>
                  <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                </label>
              </div>
            </div>

            {/* Factory Reset */}
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-3">
              <div className="flex items-center gap-2 text-red-500 font-black text-sm uppercase">
                <AlertCircle className="w-4 h-4" />
                <span>{isRtl ? 'منطقة الخطر: استعادة ضبط المصنع' : 'Danger Zone: Factory Reset'}</span>
              </div>
              <p className="text-xs text-neutral-500">
                {isRtl
                  ? 'سيتم مسح كافة التعديلات المخزنة محلياً والعودة للبيانات الأصلية المبرمجة للموقع.'
                  : 'Permanently restore all default website media, campaigns, and links.'}
              </p>
              <button
                type="button"
                onClick={handleResetAllDefaults}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                {isRtl ? 'استعادة ضبط المصنع بالكامل' : 'Reset All to Defaults'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: EDIT / CREATE VIRAL REEL
      ───────────────────────────────────────────────────────────── */}
      {editingReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/15 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-black uppercase tracking-wider">
              {editingReel.id ? (isRtl ? 'تعديل بيانات الريل' : 'Edit Viral Reel') : (isRtl ? 'إضافة ريل فيروسي جديد' : 'Add New Viral Reel')}
            </h3>

            <form onSubmit={handleSaveReel} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">
                  YouTube ID or Shorts URL
                </label>
                <input
                  type="text"
                  value={editingReel.url || editingReel.youtubeId}
                  onChange={(e) => setEditingReel({ ...editingReel, url: e.target.value, youtubeId: extractYoutubeId(e.target.value) })}
                  placeholder="e.g. X7y6WTEykGw or https://youtube.com/shorts/X7y6WTEykGw"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm font-mono focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Title (EN)</label>
                  <input
                    type="text"
                    value={editingReel.title}
                    onChange={(e) => setEditingReel({ ...editingReel, title: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">العنوان (عربي)</label>
                  <input
                    type="text"
                    value={editingReel.titleAr}
                    onChange={(e) => setEditingReel({ ...editingReel, titleAr: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editingReel.client}
                    onChange={(e) => setEditingReel({ ...editingReel, client: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Platform</label>
                  <select
                    value={editingReel.platform}
                    onChange={(e) => {
                      const p = e.target.value;
                      setEditingReel({
                        ...editingReel,
                        platform: p,
                        platformLabel: p === 'tiktok' ? 'TikTok Viral' : p === 'instagram' ? 'Instagram Reel' : 'YouTube Shorts',
                        platformLabelAr: p === 'tiktok' ? 'تيك توك فيروسي' : p === 'instagram' ? 'إنستغرام ريل' : 'يوتيوب شورتس',
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm"
                  >
                    <option value="tiktok">TikTok</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Views</label>
                  <input
                    type="text"
                    value={editingReel.views}
                    onChange={(e) => setEditingReel({ ...editingReel, views: e.target.value })}
                    placeholder="e.g. 2.4M"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm text-brand-red font-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Likes</label>
                  <input
                    type="text"
                    value={editingReel.likes}
                    onChange={(e) => setEditingReel({ ...editingReel, likes: e.target.value })}
                    placeholder="148K"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Shares</label>
                  <input
                    type="text"
                    value={editingReel.shares}
                    onChange={(e) => setEditingReel({ ...editingReel, shares: e.target.value })}
                    placeholder="22K"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingReel(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-white/15 text-xs font-bold cursor-pointer"
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-red text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-red/90 cursor-pointer"
                >
                  {isRtl ? 'حفظ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: EDIT / CREATE PRODUCTION VIDEO
      ───────────────────────────────────────────────────────────── */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/15 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-black uppercase tracking-wider">
              {editingVideo.video.id ? (isRtl ? 'تعديل فيديو الإنتاج' : 'Edit Production Video') : (isRtl ? 'إضافة فيديو للمعرض' : 'Add Production Video')}
            </h3>

            <form onSubmit={handleSaveProductionVideo} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">
                  YouTube ID or Video URL
                </label>
                <input
                  type="text"
                  value={editingVideo.video.url || editingVideo.video.youtubeId}
                  onChange={(e) =>
                    setEditingVideo({
                      ...editingVideo,
                      video: {
                        ...editingVideo.video,
                        url: e.target.value,
                        youtubeId: extractYoutubeId(e.target.value),
                      },
                    })
                  }
                  placeholder="e.g. 7xkk1GqBHi4 or https://youtu.be/..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm font-mono focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Title (EN)</label>
                  <input
                    type="text"
                    value={editingVideo.video.title}
                    onChange={(e) =>
                      setEditingVideo({
                        ...editingVideo,
                        video: { ...editingVideo.video, title: e.target.value },
                      })
                    }
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">العنوان (عربي)</label>
                  <input
                    type="text"
                    value={editingVideo.video.titleAr || ''}
                    onChange={(e) =>
                      setEditingVideo({
                        ...editingVideo,
                        video: { ...editingVideo.video, titleAr: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Client</label>
                  <input
                    type="text"
                    value={editingVideo.video.client}
                    onChange={(e) =>
                      setEditingVideo({
                        ...editingVideo,
                        video: { ...editingVideo.video, client: e.target.value },
                      })
                    }
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingVideo.video.duration}
                    onChange={(e) =>
                      setEditingVideo({
                        ...editingVideo,
                        video: { ...editingVideo.video, duration: e.target.value },
                      })
                    }
                    placeholder="01:15"
                    className="w-full px-3.5 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={editingVideo.video.description || ''}
                  onChange={(e) =>
                    setEditingVideo({
                      ...editingVideo,
                      video: { ...editingVideo.video, description: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingVideo(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-white/15 text-xs font-bold cursor-pointer"
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-red text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-red/90 cursor-pointer"
                >
                  {isRtl ? 'حفظ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: EDIT / CREATE CAMPAIGN
      ───────────────────────────────────────────────────────────── */}
      {editingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/15 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-black uppercase tracking-wider">
              {editingCampaign.id ? (isRtl ? 'تعديل بيانات الحملة' : 'Edit Campaign') : (isRtl ? 'إضافة حملة جديدة' : 'Add Campaign')}
            </h3>

            <form onSubmit={handleSaveCampaign} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Client Name (EN)</label>
                  <input
                    type="text"
                    value={editingCampaign.clientName}
                    onChange={(e) => setEditingCampaign({ ...editingCampaign, clientName: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">اسم العميل (عربي)</label>
                  <input
                    type="text"
                    value={editingCampaign.clientNameAr}
                    onChange={(e) => setEditingCampaign({ ...editingCampaign, clientNameAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Campaign Title</label>
                <input
                  type="text"
                  value={editingCampaign.campaignTitle}
                  onChange={(e) => setEditingCampaign({ ...editingCampaign, campaignTitle: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border border-neutral-300 dark:border-white/15 text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Reach</label>
                  <input
                    type="text"
                    value={editingCampaign.metrics?.reach || ''}
                    onChange={(e) =>
                      setEditingCampaign({
                        ...editingCampaign,
                        metrics: { ...editingCampaign.metrics, reach: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-black/50 border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">ROAS</label>
                  <input
                    type="text"
                    value={editingCampaign.metrics?.roas || ''}
                    onChange={(e) =>
                      setEditingCampaign({
                        ...editingCampaign,
                        metrics: { ...editingCampaign.metrics, roas: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-black/50 border text-xs text-emerald-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Growth</label>
                  <input
                    type="text"
                    value={editingCampaign.metrics?.growth || ''}
                    onChange={(e) =>
                      setEditingCampaign({
                        ...editingCampaign,
                        metrics: { ...editingCampaign.metrics, growth: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-black/50 border text-xs text-amber-500 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Status</label>
                  <select
                    value={editingCampaign.status}
                    onChange={(e) => {
                      const s = e.target.value;
                      setEditingCampaign({
                        ...editingCampaign,
                        status: s,
                        statusLabel: s === 'scaling' ? 'Scaling Phase' : s === 'completed' ? 'Completed' : 'Live Active',
                        statusLabelAr: s === 'scaling' ? 'مرحلة التوسيع' : s === 'completed' ? 'مكتملة' : 'حملة نشطة',
                      });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border text-sm"
                  >
                    <option value="active">Live Active (نشطة)</option>
                    <option value="scaling">Scaling Phase (توسيع النتائج)</option>
                    <option value="completed">Completed (مكتملة)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Progress %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingCampaign.progressPercent || 75}
                    onChange={(e) => setEditingCampaign({ ...editingCampaign, progressPercent: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-100 dark:bg-black/50 border text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingCampaign(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-white/15 text-xs font-bold cursor-pointer"
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-red text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-red/90 cursor-pointer"
                >
                  {isRtl ? 'حفظ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: SUPABASE SQL SETUP SCRIPT
      ───────────────────────────────────────────────────────────── */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-500" />
                <h3 className="font-black text-sm uppercase tracking-wider">
                  {isRtl ? 'كود إنشاء الجدول في Supabase' : 'Supabase SQL Setup Script'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSqlModal(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-500">
              {isRtl
                ? 'انسخ هذا الكود والصقه في نافذة SQL Editor داخل لوحة تحكم Supabase ثم اضغط Run:'
                : 'Copy and paste this SQL query into your Supabase SQL Editor and click Run:'}
            </p>

            <pre className="p-4 rounded-xl bg-neutral-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-white/10 max-h-60 leading-relaxed select-all">
              {SUPABASE_SQL_SETUP}
            </pre>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCopySql}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
              >
                {copiedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ الكود' : 'Copy Script')}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSqlModal(false)}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/15 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {isRtl ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: GOOGLE APPS SCRIPT CODE FOR GOOGLE SHEETS
      ───────────────────────────────────────────────────────────── */}
      {showAppsScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-text">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
                    {isRtl ? 'كود Google Apps Script لربط الشيت تلقائياً' : 'Google Apps Script Webhook Code'}
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    {isRtl ? 'خطوات الربط البسيطة خلال دقيقة واحدة:' : 'Simple 1-minute setup instructions:'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAppsScriptModal(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Steps Guide */}
            <div className="space-y-2 p-3.5 rounded-xl bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <p className="font-bold text-emerald-600 dark:text-emerald-400">
                {isRtl ? '📌 كيف تفعل الربط في جوجل شيت الخاص بك:' : '📌 How to enable in your Google Sheet:'}
              </p>
              <ol className="list-decimal list-inside space-y-1 text-[11.5px]">
                <li>{isRtl ? 'افتح شيت جوجل الخاص بك (أو أنشئ شيت جديد فارغ).' : 'Open your Google Sheet (or create a new blank one).'}</li>
                <li>{isRtl ? 'من القائمة العلوية اضغط على: التوسيعات (Extensions) > Apps Script.' : 'From top menu click: Extensions > Apps Script.'}</li>
                <li>{isRtl ? 'امسح أي كود موجود والصق الكود الموجود بالأسفل مكانه.' : 'Replace any existing code with the code below.'}</li>
                <li>{isRtl ? 'اضغط نشر (Deploy) > نشر جديد (New deployment) > اختر تطبيق ويب (Web app).' : 'Click Deploy > New deployment > Select type: Web app.'}</li>
                <li>{isRtl ? 'في خانة Who has access اختر: Anyone (أي مستخدم) ثم اضغط Deploy.' : 'Under "Who has access" choose: Anyone, then click Deploy.'}</li>
                <li>{isRtl ? 'انسخ رابط تطبيق الويب (Web App URL) والصقه في خانة الرابط بالداشبورد واضغط حفظ!' : 'Copy the Web App URL and paste it into the Webhook field in this Dashboard!'}</li>
              </ol>
            </div>

            <pre className="p-4 rounded-xl bg-neutral-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-white/10 max-h-56 leading-relaxed select-all">
              {GOOGLE_APPS_SCRIPT_CODE}
            </pre>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCopyAppsScript}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
              >
                {copiedAppsScript ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedAppsScript ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ الكود' : 'Copy Code')}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAppsScriptModal(false)}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-white/15 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {isRtl ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
