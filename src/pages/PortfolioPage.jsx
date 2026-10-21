import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

export default function PortfolioPage({
  onBackToHome,
  onBack,
  onOpenContact,
  onSelectProject,
  onOpenPolicy,
  onViewProjectDetail,
  onNavigateSoftwareEngineering
}) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (onBackToHome) {
      onBackToHome();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '#home';
    }
  };

  const [activeTab, setActiveTab] = useState('media'); // 'media' | 'software'

  const featuredProject = activeTab === 'software' ? {
    id: 'lumina-core',
    title: 'Lumina Core: Next-Gen Analytics',
    status: 'COMPLETED',
    category: 'SOFTWARE ENGINEERING • PREDICTIVE AI • CLOUD',
    subtitle: 'A high-throughput enterprise analytics platform built with predictive intelligence and real-time WebGL streaming.',
    description: 'A complete architectural overhaul for a Fortune 500 logistics firm. We implemented a custom neural engine that reduced operational overhead by 42% through predictive routing.',
    solution: 'Engineered high-concurrency microservices, sub-second latency data charting, and intuitive institutional dashboards.',
    link: 'https://luminacore.analytics.devotix.io',
    image: '/assets/portfolio/aero-dynamics.png',
    tags: ['SOFTWARE ENGINEERING', 'PREDICTIVE AI', 'CLOUD']
  } : {
    id: 'velocity-ev',
    title: 'Velocity EV: Hypercar Global Launch',
    status: 'COMPLETED',
    category: '3D CGI CINEMA • COMMERCIAL • DIGITAL MARKETING',
    subtitle: 'Cinema-grade visual campaign, photorealistic 3D configurator, and global performance marketing rollout.',
    description: 'Produced 4K cinema commercials and dynamic digital launch assets that generated over 15,000 reservation deposits in the first 48 hours.',
    solution: 'Directed high-octane live-action cinematography blended seamlessly with photorealistic CGI simulations and targeted paid media channels.',
    link: 'https://velocityev.motors.devotix.io',
    image: '/assets/portfolio/velocity-ev.png',
    tags: ['3D CGI CINEMA', 'COMMERCIAL', 'DIGITAL MARKETING']
  };

  const mediaProjects = [
    {
      id: 'aura-luxury',
      title: 'Aura Luxury: Editorial Campaign',
      status: 'COMPLETED',
      category: 'BRAND IDENTITY / PHOTOGRAPHY',
      subtitle: 'High-end fashion brand elevating digital identity and editorial photography for luxury retail stores.',
      description: 'Comprehensive brand identity and high-fashion editorial production that transformed global runway presence into a 4x increase in direct consumer sales.',
      solution: 'Crafted an avant-garde digital identity, luxury lookbook photography, and an interactive e-commerce boutique platform.',
      link: 'https://auraluxury.fashion.devotix.io',
      image: '/assets/portfolio/aura-luxury.png',
      tags: ['BRAND IDENTITY', 'PHOTOGRAPHY', 'CAMPAIGN']
    },
    {
      id: 'velocity-ev-grid',
      title: 'Velocity EV: Commercial Production',
      status: 'COMPLETED',
      category: '3D CGI / COMMERCIAL FILM / MEDIA BUYING',
      subtitle: 'Cinema-grade commercial visual campaign and web launch platform for an all-electric hypercar manufacturer.',
      description: 'Produced 4K cinema commercials and a dynamic 3D web configurator for high-net-worth vehicle reservations.',
      solution: 'Directed high-octane live-action cinematography blended seamlessly with photorealistic CGI simulations.',
      link: 'https://velocityev.motors.devotix.io',
      image: '/assets/portfolio/velocity-ev.png',
      tags: ['3D CGI', 'COMMERCIAL', 'PERFORMANCE']
    },
    {
      id: 'terra-botanics',
      title: 'Terra Botanics: Pure Skincare',
      status: 'COMPLETED',
      category: 'BRANDING / E-COMMERCE / CONTENT MARKETING',
      subtitle: 'Packaging design and direct-to-consumer e-commerce campaign for high-end organic skincare cosmetics.',
      description: 'Complete brand narrative development, sustainable packaging architecture, and multi-channel influencer conversion assets.',
      solution: 'Engineered bespoke typography, tactile bottle labels, and a high-converting headless Shopify experience.',
      link: 'https://terrabotanics.shop.devotix.io',
      image: '/assets/portfolio/terra-botanics.png',
      tags: ['BRANDING', 'E-COMMERCE', 'CONTENT']
    },
    {
      id: 'aero-dynamics-media',
      title: 'Aero Dynamics: Brand Evolution',
      status: 'COMPLETED',
      category: 'CREATIVE DIRECTION / BRAND ARCHITECTURE',
      subtitle: 'Modernizing legacy aerospace branding with cinematic visual systems and digital marketing strategy.',
      description: 'Reimagined a 25-year-old aerospace firm with dynamic visual language, high-impact keynote visuals, and strategic media positioning.',
      solution: 'Designed comprehensive design tokens, 3D motion packages, and enterprise media collateral.',
      link: 'https://aerodynamics.brand.devotix.io',
      image: '/assets/portfolio/aero-dynamics.png',
      tags: ['CREATIVE DIRECTION', 'BRANDING', 'STRATEGY']
    }
  ];

  const softwareProjects = [
    {
      id: 'nexus-fintech',
      title: 'Nexus Fintech: Real-Time Trading',
      status: 'COMPLETED',
      category: 'WEB APP / PRODUCT DESIGN / TRADING UI',
      subtitle: 'A revolutionary trading platform providing real-time data visualization for global financial markets.',
      description: 'Architected high-throughput financial dashboards with sub-millisecond latency visualizations and intuitive institutional UX.',
      solution: 'Engineered WebGL data charting modules and responsive enterprise trading interfaces.',
      link: 'https://nexusfintech.app.devotix.io',
      image: '/assets/portfolio/nexus-fintech.png',
      tags: ['WEB APP', 'PRODUCT DESIGN', 'FINTECH']
    },
    {
      id: 'lumina-core-grid',
      title: 'Lumina Core: Neural Analytics Engine',
      status: 'COMPLETED',
      category: 'FULL-STACK WEB / AI ROUTING / CLOUD',
      subtitle: 'Smart logistics analytics platform utilizing custom machine learning models for supply chain optimization.',
      description: 'Integrated multi-tenant distributed cloud infrastructure handling over 500,000 telemetry events per second with automatic load-balancing.',
      solution: 'Designed modular micro-frontends, high-performance WebSockets streams, and zero-downtime CI/CD deployment pipelines.',
      link: 'https://luminacore.analytics.devotix.io',
      image: '/assets/portfolio/aero-dynamics.png',
      tags: ['ENTERPRISE ARCHITECTURE', 'AI PIPELINES', 'CLOUD']
    },
    {
      id: 'velocity-configurator',
      title: 'Velocity 3D WebGL Configurator',
      status: 'COMPLETED',
      category: 'WEBGL / 3D GRAPHICS / FRONTEND ENG',
      subtitle: 'Interactive real-time 3D vehicle configurator running directly in modern web browsers at 60 FPS.',
      description: 'Custom Three.js shader pipeline allowing realistic paint reflections, interior customization, and instant checkout integration.',
      solution: 'Optimized GLTF asset compression, custom PBR material shaders, and WebAssembly computation modules.',
      link: 'https://velocityev.motors.devotix.io/configurator',
      image: '/assets/portfolio/velocity-ev.png',
      tags: ['THREE.JS', 'WEBGL', 'INTERACTIVE 3D']
    },
    {
      id: 'aura-headless',
      title: 'Aura Commerce: Headless Platform',
      status: 'COMPLETED',
      category: 'NEXT.JS / HEADLESS ARCHITECTURE / API',
      subtitle: 'Next-generation luxury e-commerce engine with sub-second page transitions and global edge caching.',
      description: 'Built with Next.js, GraphQL, and edge middleware to deliver flawless shopping experiences across international markets.',
      solution: 'Designed headless CMS integrations, automated inventory syncing, and ultra-secure checkout flows.',
      link: 'https://auraluxury.fashion.devotix.io',
      image: '/assets/portfolio/aura-luxury.png',
      tags: ['NEXT.JS', 'HEADLESS COMMERCE', 'GRAPHQL']
    }
  ];

  const activeProjects = activeTab === 'software' ? softwareProjects : mediaProjects;

  const handleOpenDetail = (proj) => {
    if (onViewProjectDetail) {
      onViewProjectDetail(proj);
    } else if (onSelectProject) {
      onSelectProject(proj);
    }
  };

  return (
    <div className="bg-white text-black font-sans selection:bg-brand-red selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Exact Typography, Scale & Positioning matching reference) */}
      {/* ========================================================================= */}
      <section id="port-hero" className="min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 bg-white text-black pt-20 pb-12">
        <div className="max-w-6xl mx-auto w-full my-auto">
          {/* Back Link */}
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="inline-flex items-center space-x-1.5 text-sm font-semibold text-black hover:text-brand-red transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-black group-hover:text-brand-red group-hover:-translate-x-1 transition-transform" />
              <span>Back to previous page</span>
            </button>
          </div>

          {/* Eyebrow */}
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-brand-red block mb-4">
            DEVOITX MEDIA / PORTFOLIO
          </span>

          {/* Massive Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-black uppercase tracking-tight text-black leading-[0.96] font-display">
            OUR WORK SAYS
            <br />
            MORE.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl md:text-2xl text-[#4b5563] font-normal max-w-3xl leading-relaxed">
            A collection of brands, campaigns, digital experiences and creative work built by DEVOITX MEDIA.
          </p>

          {/* Divider */}
          <div className="w-full h-[1px] bg-neutral-200 my-8 sm:my-10" />

          {/* Capabilities Sub-row */}
          <div className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-neutral-400 mb-8">
            STRATEGY / CREATIVE / MEDIA / PRODUCTION / TECHNOLOGY / GROWTH
          </div>

          {/* Two Elevated Rectangular Buttons (Media & Digital Marketing / Software Engineering) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Left Button: Media & Digital Marketing */}
            <button
              onClick={() => setActiveTab('media')}
              className={`px-7 sm:px-9 py-3.5 sm:py-4 bg-white rounded-lg transition-all duration-200 cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-neutral-100/90 text-sm sm:text-base font-semibold ${
                activeTab === 'media'
                  ? 'text-brand-red ring-1 ring-brand-red/30 shadow-[0_8px_25px_rgba(255,30,39,0.1)] scale-[1.01]'
                  : 'text-[#1e293b] hover:text-brand-red'
              }`}
            >
              Media & Digital Marketing
            </button>

            {/* Right Button: Software Engineering */}
            <button
              onClick={() => {
                if (onNavigateSoftwareEngineering) {
                  onNavigateSoftwareEngineering();
                } else {
                  setActiveTab('software');
                }
              }}
              className="px-7 sm:px-9 py-3.5 sm:py-4 bg-white rounded-lg transition-all duration-200 cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-neutral-100/90 text-sm sm:text-base font-semibold text-brand-red ring-1 ring-brand-red/30 shadow-[0_8px_25px_rgba(255,30,39,0.1)] hover:scale-[1.02]"
            >
              Software Engineering
            </button>
          </div>
        </div>
      </section>

      {/* 2. Featured Case Study (Dark Charcoal Background) */}
      <section id="port-featured" className="min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 bg-[#0c0c0e] text-white pt-16 pb-12">
        <div className="max-w-6xl mx-auto w-full my-auto">
          {/* Eyebrow */}
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red block mb-2">
            FEATURED {activeTab === 'software' ? 'SOFTWARE ENGINEERING' : 'MEDIA & MARKETING'} CASE STUDY
          </span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-display leading-tight max-w-2xl">
            A PROJECT WORTH A CLOSER
            <br />
            LOOK.
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-medium max-w-xl leading-relaxed">
            {featuredProject.subtitle}
          </p>

          {/* Featured Large Media Card */}
          <div
            onClick={() => handleOpenDetail(featuredProject)}
            className="mt-8 group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer transition-all duration-300 hover:border-brand-red/50 shadow-2xl"
          >
            <div className="aspect-[16/8] max-h-[380px] sm:max-h-[440px] w-full overflow-hidden relative">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>

            {/* Bottom Floating Bar on Card */}
            <div className="p-5 sm:p-7 bg-neutral-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-neutral-800">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                    ● {featuredProject.status}
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    {activeTab === 'software' ? 'TECH STACK' : 'PRODUCTION'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-display mt-1 group-hover:text-brand-red transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="text-sm text-neutral-400 font-medium mt-1 line-clamp-1">
                  {featuredProject.category}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDetail(featuredProject);
                }}
                className="px-5 py-2.5 bg-brand-red hover:bg-brand-redHover text-white text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 transform hover:scale-105 shadow-md shadow-red-600/30 flex items-center space-x-2 flex-shrink-0"
              >
                <span>VIEW CASE STUDY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Project Grid Section (White Background) */}
      <section id="port-grid" className="min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 bg-white text-black pt-16 pb-12">
        <div className="max-w-6xl mx-auto w-full my-auto">
          <div className="mb-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red block mb-1">
              PORTFOLIO ARCHIVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black font-display">
              {activeTab === 'software' ? 'SOFTWARE & DIGITAL SYSTEMS' : 'MEDIA, CAMPAIGNS & BRANDING'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {activeProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenDetail(project)}
                className="group cursor-pointer flex flex-col p-3 rounded-xl border border-neutral-200 hover:border-brand-red/40 hover:shadow-lg transition-all bg-white"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/9] max-h-[140px] sm:max-h-[160px] rounded-lg overflow-hidden bg-neutral-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Project Info */}
                <div className="mt-3 flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-black font-display group-hover:text-brand-red transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-600 font-medium leading-relaxed line-clamp-1 mt-1">
                    {project.description}
                  </p>

                  {/* Bottom row: Tags + Button */}
                  <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 truncate max-w-[200px]">
                      {project.category}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(project);
                      }}
                      className="px-3 py-1.5 bg-brand-red hover:bg-brand-redHover text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors flex items-center space-x-1 flex-shrink-0"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pre-Footer Call to Action */}
      <section id="port-cta" className="min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 bg-white text-black pt-16 pb-12">
        <div className="max-w-6xl mx-auto w-full my-auto">
          {/* Eyebrow */}
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red block mb-2">
            READY TO MAKE AN IMPACT WITH YOUR BRAND?
          </span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-black font-display leading-[1.02]">
            LET'S CREATE
            <br />
            SOMETHING
            <br />
            MEMORABLE.
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-neutral-600 font-medium max-w-lg leading-relaxed">
            Tell us about your brand, your goals, and where you want to go. We'll handle the rest with world-class strategy, design, and technology.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenContact}
              className="px-8 py-3 bg-brand-red hover:bg-brand-redHover text-white text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 shadow-md shadow-red-600/30 cursor-pointer"
            >
              Start a Project
            </button>

            <button
              onClick={onBackToHome}
              className="px-8 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Back to Main
            </button>
          </div>
        </div>
      </section>

      {/* 5. Full-Width Pure White Footer */}
      <Footer onOpenPolicy={onOpenPolicy} />
    </div>
  );
}
