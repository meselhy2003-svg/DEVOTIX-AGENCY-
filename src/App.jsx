import { useState, useEffect } from 'react';
import { ThemeLanguageProvider, useThemeLanguage } from './context/ThemeLanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Production from './components/Production';
import ContentViewsSection from './components/ContentViewsSection';
import Photography from './components/Photography';
import Graphic from './components/Graphic';
import Clients from './components/Clients';
import Footer from './components/Footer';
import RightSlideBar from './components/RightSlideBar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FloatingContactButton from './components/FloatingContactButton';

// Pages
import ProjectViewPage from './pages/ProjectViewPage';
import SoftwareCaseStudyPage from './pages/SoftwareCaseStudyPage';
import AboutPage from './pages/AboutPage';
import CareerPage from './pages/CareerPage';
import JobApplyPage from './pages/JobApplyPage';
import SendCvPage from './pages/SendCvPage';
import ContactPage from './pages/ContactPage';
import PhotographyGalleryPage from './pages/PhotographyGalleryPage';
import GraphicsGalleryPage from './pages/GraphicsGalleryPage';
import GraphicSingleViewPage from './pages/GraphicSingleViewPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Modals
import VideoModal from './components/VideoModal';
import ContactModal from './components/ContactModal';
import LightboxModal from './components/LightboxModal';
import ProjectModal from './components/ProjectModal';
import PolicyModal from './components/PolicyModal';
import CareerModal from './components/CareerModal';
import AboutModal from './components/AboutModal';
import { initCmsSync } from './services/cmsSync';

function AppContent() {
  const { isDark } = useThemeLanguage();

  // Page routing state ('home' | 'project-view' | 'software-engineering' | 'about' | 'career' | 'job-apply' | 'send-cv' | 'contact' | 'photography-gallery' | 'graphics-gallery' | 'graphic-view' | 'admin')
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProjectDetail, setSelectedProjectDetail] = useState(null);
  const [selectedJobRole, setSelectedJobRole] = useState(null);
  const [selectedPhotoGallery, setSelectedPhotoGallery] = useState(null);
  const [selectedGraphic, setSelectedGraphic] = useState(null);
  const [selectedGraphicsCategory, setSelectedGraphicsCategory] = useState('all');

  // Modal states
  const [activeVideo, setActiveVideo] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCareerOpen, setIsCareerOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState(null);
  const [policyType, setPolicyType] = useState(null);

  // Initialize Cloud CMS synchronization on application load
  useEffect(() => {
    initCmsSync();
  }, []);

  // Listen to hash changes for single-page routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin' || hash === '#dashboard' || hash === '#cms') {
        setCurrentPage('admin');
      } else if (hash === '#software-engineering' || hash === '#case-study') {
        setCurrentPage('software-engineering');
      } else if (hash === '#project-view') {
        setCurrentPage('project-view');
      } else if (hash === '#about') {
        setCurrentPage('about');
      } else if (hash === '#career') {
        setCurrentPage('career');
      } else if (hash === '#job-apply') {
        setCurrentPage('job-apply');
      } else if (hash === '#send-cv') {
        setCurrentPage('send-cv');
      } else if (hash === '#contact' || hash === '#talk') {
        setCurrentPage('contact');
      } else if (hash === '#photography-gallery' || hash === '#gallery') {
        setCurrentPage('photography-gallery');
      } else if (hash === '#graphics-gallery') {
        setCurrentPage('graphics-gallery');
      } else if (hash === '#graphic-view') {
        setCurrentPage('graphic-view');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToSoftwareEngineering = (project = null) => {
    if (project) {
      setSelectedProjectDetail(project);
    }
    window.location.hash = '#software-engineering';
    setCurrentPage('software-engineering');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAbout = () => {
    window.location.hash = '#about';
    setCurrentPage('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCareer = () => {
    window.location.hash = '#career';
    setCurrentPage('career');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToContact = (service) => {
    setActiveVideo(null);
    setLightboxData(null);
    setSelectedProject(null);
    setIsAboutOpen(false);
    setIsCareerOpen(false);
    setIsContactOpen(false);
    setPolicyType(null);
    if (service) {
      const val = service.formValue || service.title || (typeof service === 'string' ? service : null);
      if (val) setSelectedServiceForContact(val);
    } else {
      setSelectedServiceForContact(null);
    }
    window.location.hash = '#contact';
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToJobApply = (role) => {
    setSelectedJobRole(role);
    window.location.hash = '#job-apply';
    setCurrentPage('job-apply');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToSendCv = () => {
    window.location.hash = '#send-cv';
    setCurrentPage('send-cv');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToProjectView = (project) => {
    setSelectedProjectDetail(project);
    window.location.hash = '#project-view';
    setCurrentPage('project-view');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToPhotoGallery = (gallery) => {
    setSelectedPhotoGallery(gallery);
    window.location.hash = '#photography-gallery';
    setCurrentPage('photography-gallery');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToGraphicsGallery = (category = 'all') => {
    setSelectedGraphicsCategory(category);
    window.location.hash = '#graphics-gallery';
    setCurrentPage('graphics-gallery');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToGraphicSingleView = (graphic) => {
    setSelectedGraphic(graphic);
    window.location.hash = '#graphic-view';
    setCurrentPage('graphic-view');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToHome = (targetSection = 'home') => {
    window.location.hash = `#${targetSection}`;
    setCurrentPage('home');
    setTimeout(() => {
      const element = document.getElementById(targetSection);
      if (element) {
        const headerOffset = targetSection === 'home' ? 0 : 60;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      const headerOffset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (currentPage === 'admin') {
    return <AdminDashboardPage onNavigateHome={() => navigateToHome('home')} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#08080a] text-neutral-900 dark:text-white selection:bg-brand-red selection:text-white font-sans overflow-x-hidden transition-colors duration-300">
      {/* 1. FIXED Header (Across ALL pages) */}
      <Header
        currentPage={currentPage}
        onOpenContact={navigateToContact}
        onNavigateContact={navigateToContact}
        onOpenCareer={navigateToCareer}
        onNavigateCareer={navigateToCareer}
        onOpenAbout={navigateToAbout}
        onNavigateAbout={navigateToAbout}
        onNavigateSoftwareEngineering={navigateToSoftwareEngineering}
        onNavigateHome={navigateToHome}
      />

      {/* 2. Interactive Right Slide Bar (Section Progress & Quick Slide) */}
      <RightSlideBar currentPage={currentPage} />

      {/* Page Content Rendering (Normal Natural Scrolling) */}
      {currentPage === 'contact' ? (
        <ContactPage
          initialService={selectedServiceForContact}
          onBackToHome={() => navigateToHome('home')}
          onOpenPolicy={(type) => setPolicyType(type)}
        />
      ) : currentPage === 'job-apply' ? (
        <JobApplyPage
          role={selectedJobRole}
          onBackToCareer={navigateToCareer}
          onOpenPolicy={(type) => setPolicyType(type)}
        />
      ) : currentPage === 'send-cv' ? (
        <SendCvPage
          onBackToCareer={navigateToCareer}
          onOpenPolicy={(type) => setPolicyType(type)}
        />
      ) : currentPage === 'career' ? (
        <CareerPage
          onBackToHome={() => navigateToHome('home')}
          onOpenContact={navigateToContact}
          onApplyRole={(role) => navigateToJobApply(role)}
          onNavigateSendCv={navigateToSendCv}
          onOpenPolicy={(type) => setPolicyType(type)}
        />
      ) : currentPage === 'about' ? (
        <AboutPage
          onBackToHome={() => navigateToHome('home')}
          onOpenContact={navigateToContact}
          onOpenPolicy={(type) => setPolicyType(type)}
        />
      ) : currentPage === 'software-engineering' ? (
        <SoftwareCaseStudyPage
          project={selectedProjectDetail}
          onBack={() => navigateToHome('work')}
          onBackToHome={() => navigateToHome('work')}
          onBackToPortfolio={() => navigateToHome('work')}
          onOpenContact={navigateToContact}
          onOpenPolicy={(type) => setPolicyType(type)}
        />
      ) : currentPage === 'project-view' ? (
        <ProjectViewPage
          project={selectedProjectDetail}
          onBackToPortfolio={() => navigateToHome('work')}
          onPlayVideo={(video) => setActiveVideo(video)}
          onOpenLightbox={(photos, index) => setLightboxData({ photos, index })}
          onOpenPolicy={(type) => setPolicyType(type)}
        />
      ) : currentPage === 'photography-gallery' ? (
        <PhotographyGalleryPage
          gallery={selectedPhotoGallery}
          onBackToHome={() => navigateToHome('photography')}
          onOpenLightbox={(photos, index) => setLightboxData({ photos, index })}
          onOpenPolicy={(type) => setPolicyType(type)}
        />
      ) : currentPage === 'graphics-gallery' ? (
        <GraphicsGalleryPage
          initialCategory={selectedGraphicsCategory}
          onBackToHome={() => navigateToHome('graphic')}
          onSelectGraphic={navigateToGraphicSingleView}
          onOpenPolicy={(type) => setPolicyType(type)}
        />
      ) : currentPage === 'graphic-view' ? (
        <GraphicSingleViewPage
          graphic={selectedGraphic}
          onBackToGallery={navigateToGraphicsGallery}
          onSelectGraphic={navigateToGraphicSingleView}
          onOpenPolicy={(type) => setPolicyType(type)}
        />
      ) : (
        <>
          <main>
            {/* 1. Hero Section (id="home") */}
            <Hero
              onOpenContact={navigateToContact}
              onScrollToWork={scrollToWork}
              onPlayVideo={(video) => setActiveVideo(video)}
            />

            {/* 2. Services Section (id="services") */}
            <Services onSelectService={navigateToContact} />

            {/* 3. Our Work Section (id="work") */}
            <Work
              onSelectProject={(project) => {
                navigateToSoftwareEngineering(project);
              }}
              onRequestSimilarWork={(project) => {
                navigateToSoftwareEngineering(project);
              }}
            />

            {/* 4. Production Section (id="production") */}
            <Production onPlayVideo={(video) => setActiveVideo(video)} />

            {/* 4.1 Content Views & Virality Section (id="content-views") */}
            <ContentViewsSection onPlayVideo={(video) => setActiveVideo(video)} />


            {/* 5. Photography Section (id="photography") */}
            <Photography onSelectGallery={navigateToPhotoGallery} />

            {/* 6. Graphic Section (id="graphic") */}
            <Graphic
              onNavigateGallery={navigateToGraphicsGallery}
              onSelectGraphic={navigateToGraphicSingleView}
            />

            {/* 7. Clients Section (id="clients") */}
            <Clients />
          </main>

          {/* 8. Standalone Footer (White Background) */}
          <Footer onOpenPolicy={(type) => setPolicyType(type)} />
        </>
      )}

      {/* Interactive Modals (Shared across all pages) */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {lightboxData && (
        <LightboxModal
          photos={lightboxData.photos}
          initialIndex={lightboxData.index}
          onClose={() => setLightboxData(null)}
        />
      )}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={navigateToContact}
        onNavigateSoftwareEngineering={navigateToSoftwareEngineering}
      />

      <PolicyModal
        type={policyType}
        onClose={() => setPolicyType(null)}
      />

      <CareerModal
        isOpen={isCareerOpen}
        onClose={() => setIsCareerOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenContact={navigateToContact}
      />

      {/* 3. Floating WhatsApp with Branch Selector (Egypt / Saudi Arabia) */}
      <FloatingWhatsApp />

      {/* 4. Persistent Global Floating Contact CTA Button */}
      {currentPage !== 'contact' && (
        <FloatingContactButton
          onNavigateContact={navigateToContact}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeLanguageProvider>
      <AppContent />
    </ThemeLanguageProvider>
  );
}
