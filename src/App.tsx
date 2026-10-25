import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AiChatWidget } from './components/AiChatWidget';
import { HomeView } from './views/HomeView';
import { OtherServicesView } from './views/OtherServicesView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { StaticPagesView } from './views/StaticPagesView';
import { ProjectItem } from './data/projects';
import { CelebrationMouseCanvas } from './components/CelebrationMouseCanvas';

export const App: React.FC = () => {
  // Initialize language from localStorage or default to Arabic
  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    try {
      const saved = localStorage.getItem('portfolio_lang');
      return saved === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  });

  // Track active navigation tab based on URL hash or default to 'home'
  const getTabFromHash = (): string => {
    const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    if (!hash) return 'home';
    if (['other-services', 'services', 'ecommerce-store', 'corporate-website', 'whatsapp-ai-employee', 'smart-shipping-system', 'mobile-retail-apps', 'n8n-automation', 'omnichannel-ai-agent', 'backend-api-architecture', 'partner-program', 'privacy', 'terms'].includes(hash)) {
      return hash;
    }
    // If it's an anchor on the Home page
    if (['client-work', 'store-demos', 'store-services', 'store-features', 'portfolio', 'faq', 'how-it-works'].includes(hash)) {
      return 'home';
    }
    return 'home';
  };

  const [activeTab, setActiveTab] = useState<string>(getTabFromHash);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Sync document attributes when language changes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('portfolio_lang', lang);
    } catch {
      // storage unavailable
    }
  }, [lang]);

  // Listen to hashchange events for browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const newTab = getTabFromHash();
      setActiveTab(newTab);

      // Check if there is an anchor to scroll to
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (['client-work', 'store-demos', 'store-services', 'store-features', 'portfolio', 'how-it-works', 'faq'].includes(hash)) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleNavigate = (tab: string, anchor?: string) => {
    setActiveTab(tab);
    if (anchor) {
      if (activeTab !== 'home' && tab === 'home') {
        window.location.hash = `#${anchor}`;
      } else {
        window.location.hash = `#${anchor}`;
      }
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else {
      window.location.hash = tab === 'home' ? '' : `#${tab}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentView = () => {
    if (activeTab === 'home') {
      return (
        <HomeView
          lang={lang}
          onSelectProject={(project) => setSelectedProject(project)}
          onNavigate={handleNavigate}
        />
      );
    }

    if (activeTab === 'other-services' || activeTab === 'services') {
      return (
        <OtherServicesView
          lang={lang}
          onNavigate={handleNavigate}
          onSelectProject={(project) => setSelectedProject(project)}
        />
      );
    }

    if (['partner-program', 'privacy', 'terms'].includes(activeTab)) {
      return (
        <StaticPagesView
          pageType={activeTab as 'partner-program' | 'privacy' | 'terms'}
          lang={lang}
          onNavigate={handleNavigate}
        />
      );
    }

    // Otherwise, it's a specific service deep-dive view
    return (
      <ServiceDetailView
        slug={activeTab}
        lang={lang}
        onNavigate={handleNavigate}
        onSelectProject={(project) => setSelectedProject(project)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-300 relative selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden w-full max-w-full">
      
      {/* Interactive Celebration Mouse Trail & Click Fireworks (Fixed Canvas) */}
      <CelebrationMouseCanvas enabled={true} />

      {/* Luxury Ambient Glow Blobs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] blob-pastel-blue pointer-events-none z-0"></div>
      <div className="fixed top-48 -right-24 w-[600px] h-[600px] blob-pastel-teal pointer-events-none z-0"></div>
      <div className="fixed top-96 -left-24 w-[600px] h-[600px] blob-pastel-peach pointer-events-none z-0"></div>

      {/* Main App Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        activeTab={activeTab}
        onNavigate={handleNavigate}
      />

      {/* Dynamic Views */}
      <main className="relative z-10 min-h-[calc(100vh-280px)]">
        {renderCurrentView()}
      </main>

      {/* Comprehensive Footer */}
      <Footer
        lang={lang}
        onNavigate={handleNavigate}
      />

      {/* Project Showcase Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
      />

      {/* Smart AI Customer Service Support Agent (Ahmed) */}
      <AiChatWidget
        lang={lang}
      />

    </div>
  );
};
