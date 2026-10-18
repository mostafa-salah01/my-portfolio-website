import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, ShoppingBag, Globe, CheckCircle2, 
  MessageCircle, ExternalLink, ChevronDown, ChevronUp, Layers, HelpCircle,
  Cpu, Truck, Smartphone, Eye, ArrowUpRight
} from 'lucide-react';
import { 
  CLIENT_PROJECTS, 
  DEMO_STORES, 
  CORE_WEB_SERVICES, 
  FAQ_ITEMS, 
  HOW_IT_WORKS_STEPS, 
  ProjectItem,
  ServiceItem
} from '../data/projects';

interface HomeViewProps {
  lang: 'ar' | 'en';
  onSelectProject: (p: ProjectItem) => void;
  onNavigate: (tab: string, anchor?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ lang, onSelectProject, onNavigate }) => {
  const isAr = lang === 'ar';

  // Rotating roles effect
  const rolesAr = [
    'متاجر إلكترونية مخصصة (PHP & MySQL من الصفر)',
    'مواقع تعريفية احترافية للشركات (ثنائية اللغة)',
    '0% عمولات على مبيعات متجرك للأبد',
    'ربط جميع بوابات الدفع (مدى، فيزا، أبل باي، تابي، تمارا)',
    'سابقة أعمال حية ونماذج ديمو تفاعلية'
  ];

  const rolesEn = [
    'Custom E-Commerce Stores (PHP & MySQL from Scratch)',
    'Bilingual Corporate Websites (Arabic & English Included)',
    '0% Sales Commission on Your Store Forever',
    'All Payment Gateways (Mada, Visa, Apple Pay, Tabby, Tamara)',
    'Live Client Showcases & Interactive Turnkey Demos'
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [roleOpacity, setRoleOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleOpacity(0);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % (isAr ? rolesAr.length : rolesEn.length));
        setRoleOpacity(1);
      }, 250);
    }, 3200);

    return () => clearInterval(interval);
  }, [isAr]);

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  // WhatsApp general consultation link
  const generalQuoteUrl = `https://wa.me/201107787049?text=${encodeURIComponent(
    isAr
      ? 'مرحباً فريق WebStack، أود الحصول على استشارة مجانية وعرض سعر مخصص لمتجر إلكتروني / موقع شركة مخصص من الصفر.'
      : 'Hello WebStack team, I would like a free consultation and custom quotation for a custom e-commerce store / website.'
  )}`;

  // Direct redirection handler: clicking any image or card opens the live project/service immediately
  const handleProjectDirectClick = (project: ProjectItem) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else if (project.pageUrl) {
      onNavigate(project.pageUrl);
    } else {
      onSelectProject(project);
    }
  };

  const handleServiceDirectClick = (service: ServiceItem) => {
    if (service.liveUrl) {
      window.open(service.liveUrl, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(service.pageTab);
    }
  };

  return (
    <div className="relative z-10 pt-24 pb-20">
      
      {/* 1. Hero Section - Strictly Dedicated to Custom E-Commerce & Websites */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Rotating Tag Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/35 text-amber-300 text-xs sm:text-sm font-bold mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse"></span>
            <span
              style={{ opacity: roleOpacity, transition: 'opacity 0.25s ease-in-out' }}
              className="font-mono"
            >
              {isAr ? rolesAr[roleIndex] : rolesEn[roleIndex]}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] mb-6">
            <span className="block text-slate-100">
              {isAr ? 'إنشاء المتاجر الإلكترونية وتصميم المواقع' : 'Custom E-Commerce Stores & Corporate Websites'}
            </span>
            <span className="gold-gradient-text block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706]">
              {isAr ? 'برمجة مخصصة 100% من الصفر بدون قوالب جاهزة' : '100% Handcrafted Code With Zero Template Bloat'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            {isAr
              ? 'كل عميل له نظامه الخاص. نبني متجرك الإلكتروني وموقع شركتك كوداً مخصصاً بالكامل بلغة PHP وقواعد بيانات MySQL. بدون قوالب جاهزة، مع ملكية كاملة 100% لكود مشروعك، ربط جميع بوابات الدفع، و0% عمولات على مبيعاتك للأبد.'
              : 'Every client gets a dedicated custom system. We handcraft your online store and corporate website with clean PHP & MySQL. Zero ready-made templates, full source code ownership, all payment gateways, and 0% sales commission.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={generalQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#D97706] text-white font-extrabold text-sm sm:text-base shadow-[0_10px_30px_rgba(220,38,38,0.4)] ring-1 ring-amber-400/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>{isAr ? 'احصل على استشارة وعرض سعر مجاني' : 'Get Free Consultation & Quote'}</span>
            </a>

            <button
              onClick={() => onNavigate('home', 'client-work')}
              className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-bold text-sm sm:text-base border border-amber-500/30 hover:border-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:scale-105"
            >
              <span>{isAr ? 'معاينة سابقة أعمالنا الحية' : 'Explore Live Client Stores'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            {/* Dedicated Button to the Second Page: Other Services */}
            <button
              onClick={() => onNavigate('other-services')}
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 text-amber-300 hover:text-white font-bold text-xs sm:text-sm border border-amber-500/40 hover:border-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:scale-105"
            >
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'الخدمات والأنظمة البرمجية الأخرى' : 'Other Systems & Services'}</span>
              <span className="text-xs font-mono font-bold text-amber-400">↗</span>
            </button>
          </div>

          {/* Trust Value Badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 text-start">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/15 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-sm font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>0% Commission</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isAr ? 'صفر عمولات على مبيعات متجرك' : '0% Sales Commission'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/15 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-sm font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Clean Code</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isAr ? 'PHP & MySQL كود نظيف أصيل' : 'Pure PHP & MySQL without templates'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/15 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-sm font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>All Payments</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isAr ? 'مدى، فيزا، أبل باي، تابي، تمارا' : 'Mada, Visa, Apple Pay, BNPL'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/15 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-sm font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Full Ownership</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isAr ? 'ملكية كاملة للكود والدومين' : '100% Code & Database ownership'}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SECTION 1: LIVE CLIENT PRODUCTION PROJECTS (سابقة الأعمال الحية المنفذة لعملائنا) */}
      <section id="client-work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-amber-500/15">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{isAr ? 'سابقة أعمال حية على أرض الواقع' : 'Official Production Client Platforms'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {isAr ? 'مواقع ومتاجر حية تعمل الآن لعملائنا' : 'Live Client Websites & Stores in Production'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {isAr
              ? 'انقر على أي صورة أو بطاقة للانتقال مباشرة لزيارة المتجر أو الموقع الحي ومعاينته وتجربته على أرض الواقع.'
              : 'Click anywhere on any image or card to visit and test the live client storefront directly.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIENT_PROJECTS.map((project) => {
            const projectTitle = isAr ? project.titleAr : project.titleEn;
            const projectTagline = isAr ? project.taglineAr : project.taglineEn;

            return (
              <div
                key={project.id}
                className="group rounded-2xl bg-[#0B0F19] border border-amber-500/20 hover:border-amber-400/70 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(245,158,11,0.22)] cursor-pointer"
                onClick={() => handleProjectDirectClick(project)}
                title={isAr ? `اضغط لفتح ${projectTitle} مباشرة` : `Click to open ${projectTitle} directly`}
              >
                <div>
                  {/* Clickable Image with direct live link overlay */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={projectTitle}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/ecommerce_store_main.jpg';
                      }}
                    />

                    {/* Prominent Click Prompt Overlay */}
                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <div className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-bold text-xs flex items-center gap-2 shadow-xl transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                        <span>
                          {isAr
                            ? (project.category === 'ecommerce-demos' ? 'اضغط لفتح المتجر الحي مباشرة' : 'اضغط لفتح الموقع الحي مباشرة')
                            : (project.category === 'ecommerce-demos' ? 'Open Live Store Now' : 'Open Live Website Now')}
                        </span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="absolute top-2.5 end-2.5">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/90 text-slate-950 text-[10px] font-bold font-mono shadow-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse"></span>
                        {isAr ? 'موقع حي ↗' : 'LIVE ↗'}
                      </span>
                    </div>

                    <div className="absolute bottom-2 start-2">
                      <span className="text-[10px] font-mono font-bold text-amber-300 bg-black/85 px-2 py-0.5 rounded border border-amber-500/30">
                        {isAr ? project.metricsAr : project.metricsEn}
                      </span>
                    </div>
                  </div>

                  {/* Card Information */}
                  <div className="p-5">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors flex items-start justify-between gap-2">
                      <span>{projectTitle}</span>
                      <ArrowUpRight className="w-4 h-4 text-amber-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {projectTagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action Bar */}
                <div 
                  className="p-3.5 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors"
                  >
                    <span>{isAr ? 'زيارة الموقع الحي مباشرة' : 'Visit Live Site'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  </a>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="text-[11px] font-mono text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {isAr ? 'المواصفات' : 'Specs'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SECTION 2: INTERACTIVE LIVE STORE DEMOS (نماذج وديموهات المتاجر الإلكترونية الجاهزة للمعاينة) */}
      <section id="store-demos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-amber-500/15">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold mb-3">
            <ShoppingBag className="w-3.5 h-3.5 text-rose-400" />
            <span>{isAr ? 'متاجر ديمو جاهزة للمعاينة الفورية' : 'Turnkey Live Store Demos'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {isAr ? 'نماذج متاجر إلكترونية حية جاهزة للتصفح والشراء' : 'Interactive E-Commerce Store Demos Ready to Explore'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {isAr
              ? 'تصفح عينات حية لمتاجر الأثاث والديكور، الأزياء الكاجوال، فساتين الأتيليه الفاخرة، العطور الملكية، والملابس الرياضية والتجميل. انقر على أي صورة للدخول للمتجر مباشرة وتجربة السلة والدفع الإلكتروني.'
              : 'Explore ready-to-test live store demos for Furniture, Casual Fashion, Haute Couture, Fragrances, Sportswear, and Cosmetics. Click any image to test live carts and checkout.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_STORES.map((project) => {
            const projectTitle = isAr ? project.titleAr : project.titleEn;
            const projectTagline = isAr ? project.taglineAr : project.taglineEn;

            return (
              <div
                key={project.id}
                className="group rounded-2xl bg-[#0B0F19] border border-amber-500/20 hover:border-amber-400/70 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(220,38,38,0.22)] cursor-pointer"
                onClick={() => handleProjectDirectClick(project)}
                title={isAr ? `اضغط للدخول إلى ${projectTitle} مباشرة` : `Click to enter ${projectTitle} directly`}
              >
                <div>
                  {/* Clickable Image with direct live demo overlay */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={projectTitle}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/ecommerce_store_main.jpg';
                      }}
                    />

                    {/* Live Demo Click Prompt Overlay */}
                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <div className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-bold text-xs flex items-center gap-2 shadow-xl transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                        <span>{isAr ? 'اضغط لتجربة المتجر الحي ↗' : 'Test Live Store Demo ↗'}</span>
                      </div>
                    </div>

                    <div className="absolute top-2.5 end-2.5">
                      <span className="px-2.5 py-1 rounded-md bg-rose-600/90 text-white text-[10px] font-bold font-mono shadow-md">
                        {isAr ? 'ديمو حي تفاعلي ↗' : 'LIVE DEMO ↗'}
                      </span>
                    </div>

                    <div className="absolute bottom-2 start-2">
                      <span className="text-[10px] font-mono font-bold text-amber-300 bg-black/85 px-2 py-0.5 rounded border border-amber-500/30">
                        {isAr ? project.metricsAr : project.metricsEn}
                      </span>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-5">
                    <div className="text-[11px] text-amber-400 font-mono font-bold mb-1.5">
                      {isAr ? project.categoryLabelAr : project.categoryLabelEn}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight group-hover:text-amber-300 transition-colors flex items-center justify-between gap-2">
                      <span>{projectTitle}</span>
                      <ArrowUpRight className="w-4 h-4 text-amber-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {projectTagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div 
                  className="p-4 bg-slate-900/70 border-t border-slate-800 flex items-center justify-between gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all hover:scale-105"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isAr ? 'معاينة المتجر الحي' : 'Test Live Demo'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{isAr ? 'المواصفات' : 'Specs'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SECTION 3: CORE WEBSITE & STORE SERVICES (خدماتنا للمتاجر والمواقع) */}
      <section id="store-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-amber-500/15">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold mb-3">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'خدماتنا البرمجية الرئيسية' : 'Core Web & Store Packages'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {isAr ? 'باقات المتاجر الإلكترونية ومواقع الشركات المخصصة' : 'Bespoke E-Commerce & Corporate Website Packages'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {isAr
              ? 'اضغط على أي خدمة أو صورتها للانتقال مباشرة لمعاينة المتجر الأساسي أو الموقع الحي المنفذ.'
              : 'Click any service card or image to visit the actual live production store or executed website.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CORE_WEB_SERVICES.map((service) => {
            const serviceWhatsappUrl = `https://wa.me/201107787049?text=${encodeURIComponent(
              isAr
                ? `مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لخدمة (${service.titleAr}).`
                : `Hello WebStack team, I would like to inquire and request a custom quote for (${service.titleEn}).`
            )}`;

            return (
              <div
                key={service.id}
                className="rounded-3xl bg-[#0B0F19] border border-amber-500/25 hover:border-amber-400/60 overflow-hidden p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer"
                onClick={() => handleServiceDirectClick(service)}
                title={isAr ? `اضغط لمعاينة المتجر / الموقع الحي لخدمة ${service.titleAr}` : `Click to preview live store for ${service.titleEn}`}
              >
                <div>
                  {/* Service Visual Preview with Direct Click Overlay */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-amber-500/25 bg-slate-950">
                    <img
                      src={service.image}
                      alt={isAr ? service.titleAr : service.titleEn}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <div className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xl">
                        <span>{isAr ? 'اضغط لمعاينة المتجر / الموقع الحي للمشروع ↗' : 'Click to View Live Production Store ↗'}</span>
                      </div>
                    </div>

                    <div className="absolute top-3 end-3">
                      <span className="px-3 py-1 rounded-full bg-slate-950/90 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold shadow-md">
                        {isAr ? service.badgeAr : service.badgeEn}
                      </span>
                    </div>

                    <div className="absolute bottom-3 start-3">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/90 text-slate-950 text-xs font-bold font-mono shadow-md">
                        {service.id === 'custom-ecommerce'
                          ? (isAr ? 'معاينة متجر حي (Larose) ↗' : 'Live Store Preview (Larose) ↗')
                          : (isAr ? 'معاينة موقع حي رسمي ↗' : 'Live Production Site ↗')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#DC2626] to-[#D97706] flex items-center justify-center text-white shrink-0 shadow-md">
                      {service.icon === 'ShoppingBag' ? <ShoppingBag className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {isAr ? service.titleAr : service.titleEn}
                      </h3>
                      <div className="text-xs font-mono text-amber-400">
                        {isAr ? service.taglineAr : service.taglineEn}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {isAr ? service.fullDescAr : service.fullDescEn}
                  </p>

                  {/* Key Points */}
                  <div className="space-y-2.5 mb-6">
                    {(isAr ? service.keyPointsAr : service.keyPointsEn).map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div 
                  className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={service.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-bold text-xs sm:text-sm transition-all hover:scale-105"
                  >
                    <span>{isAr ? 'معاينة المتجر / الموقع الحي' : 'Preview Live Store'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={serviceWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isAr ? 'طلب عرض سعر فوري' : 'Get Quote'}</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SECTION 4: BESPOKE E-COMMERCE & CORPORATE WEBSITE ARCHITECTURE */}
      <section id="store-features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-amber-500/15">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'مواصفات ومعمارية المتجر' : 'Architecture & Deliverables'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isAr ? 'ما الذي ستحصل عليه في متجرك الإلكتروني المخصص؟' : 'What You Get in Your Bespoke E-Commerce Store'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {isAr
              ? 'كل ما يحتاجه مشروعك التجاري ليعمل بأعلى كفاءة وسرعة واستقلال مالي تام بدون عمولات.'
              : 'Everything your business needs to operate with peak speed, reliability, and 0% sales commission.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Clean Code */}
          <div className="p-6 rounded-2xl bg-[#0B0F19] border border-amber-500/25 flex flex-col justify-between hover:border-amber-400/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#DC2626] to-[#D97706] text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md font-mono">
                PHP
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {isAr ? 'كود خاص 100% بلغة PHP وقواعد MySQL' : '100% Clean Code (PHP 8+ & MySQL)'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {isAr
                  ? 'برمجة نظيفة من الصفر بدون قوالب جاهزة وبدون إضافات ووردبريس بطيئة، مما يمنح متجرك سرعة تحميل خارقة وحماية كاملة ضد الاختراقات.'
                  : 'Engineered from scratch without template bloat or slow plugins, guaranteeing lightning velocity and rock-solid database integrity.'}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-xs font-mono text-amber-400">
              {isAr ? 'أداء فائق وسرعة قياسية' : 'Sub-second Load Times'}
            </div>
          </div>

          {/* Card 2: 0% Commission */}
          <div className="p-6 rounded-2xl bg-[#0B0F19] border border-amber-500/25 flex flex-col justify-between hover:border-amber-400/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#DC2626] to-[#D97706] text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md font-mono">
                0%
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {isAr ? '0% عمولات على مبيعات متجرك للأبد' : '0% Sales Commission Forever'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {isAr
                  ? 'أموالك وأرباحك تدخل حسابك البنكي مباشرة دون أي خصومات أو اشتراكات شهرية متزايدة تفرضها منصات التأجير السحابية.'
                  : 'All your revenue flows directly into your bank account without transaction cuts or mandatory platform subscriptions.'}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-xs font-mono text-emerald-400">
              {isAr ? 'وفر آلاف الدولارات سنوياً' : 'Save Thousands Yearly'}
            </div>
          </div>

          {/* Card 3: All Payment Gateways */}
          <div className="p-6 rounded-2xl bg-[#0B0F19] border border-amber-500/25 flex flex-col justify-between hover:border-amber-400/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#DC2626] to-[#D97706] text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md font-mono">
                PAY
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {isAr ? 'ربط جميع بوابات الدفع الإلكتروني' : 'All Payment Gateways Integrated'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {isAr
                  ? 'دعم متكامل لمدى، فيزا، أبل باي، تابي وتمارا للتقسيط، إنستاباي، المحافظ الإلكترونية، والدفع عند الاستلام مع إصدار الفواتير وبوالص الشحن.'
                  : 'Full support for Mada, Visa, Apple Pay, Tabby, Tamara, InstaPay, mobile wallets, and COD with automated waybills.'}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-xs font-mono text-amber-400">
              {isAr ? 'تسوية آلية فورية للطلبات' : 'Instant Order Confirmation'}
            </div>
          </div>

        </div>

        {/* Feature Grid Breakdown */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-amber-500/20 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-sm mb-1">{isAr ? 'جلسات استشارية تفصيلية' : 'Step-by-step Consultations'}</div>
                <div className="text-xs text-slate-300">{isAr ? 'بنمشي معاك خطوة بخطوة لدراسة طبيعة نشاطك وتدفق تجارتك قبل كتابة أول سطر كود.' : 'In-depth sessions walking through your exact commerce workflow.'}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-sm mb-1">{isAr ? 'لوحة تحكم كاملة ومخصصة' : 'Custom Admin Dashboard'}</div>
                <div className="text-xs text-slate-300">{isAr ? 'إدارة سهلة للمنتجات، الأسعار، المخزون، الطلبات، وبوالص وفواتير الـ PDF.' : 'Full control over orders, stock alerts, discounts, and customer CRM.'}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-sm mb-1">{isAr ? 'دومين رسمي واستضافة سريعة' : 'Official Domain & SSD Hosting'}</div>
                <div className="text-xs text-slate-300">{isAr ? 'اسم نطاق خاص بمتجرك واستضافة سحابية فائقة السرعة SSD مع شهادة أمان SSL مشمولة.' : 'High-speed cloud SSD infrastructure with free SSL certificate included.'}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-sm mb-1">{isAr ? 'دعم فني وصيانة مستمرة' : 'Ongoing Technical Support'}</div>
                <div className="text-xs text-slate-300">{isAr ? 'عقد دعم ومتابعة دورية لحل أي استفسارات وضمان استقرار المتجر وأمانه 24/7.' : 'Dedicated technical maintenance ensuring peak uptime and stability.'}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-sm mb-1">{isAr ? 'تجربة موبايل فائقة السلاسة' : 'Frictionless Mobile UX'}</div>
                <div className="text-xs text-slate-300">{isAr ? 'سلة مشتريات جانبية فورية، فلاتر سريعة، وإتمام شراء بلمسة واحدة لزيادة مبيعاتك.' : 'Instant cart drawer and high-converting single-tap mobile checkout.'}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-sm mb-1">{isAr ? 'ربط مباشر بالواتساب' : 'Smart WhatsApp CTA Buttons'}</div>
                <div className="text-xs text-slate-300">{isAr ? 'أزرار تواصل تفاعلية ذكية ترسل تفاصيل المنتج تلقائياً لمحادثة واتساب المتجر.' : 'Interactive lead buttons routing customer inquiries directly to WhatsApp.'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROMINENT CALLOUT BANNER: EXPLORE OTHER SYSTEMS & SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1E1124] via-[#0E1528] to-[#1A1208] border border-amber-500/35 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold mb-4 border border-amber-500/30">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAr ? 'هل تبحث عن أنظمة وحلول تقنية أخرى؟' : 'Looking for Other Enterprise Systems?'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                {isAr
                  ? 'اكتشف خدماتنا في الذكاء الاصطناعي، الشحن، الكاشير، وأتمتة n8n'
                  : 'Explore AI Employees, Logistics Shipping, POS Apps & n8n Automations'}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {isAr
                  ? 'خصصنا صفحة كاملة ومستقلة لاستعراض أنظمة موظف الذكاء الاصطناعي لواتساب، سيستمات الشحن وتتبع المناديب، تطبيقات الموبايل POS، أتمتة الأعمال عبر n8n، وهندسة واجهات الـ APIs.'
                  : 'We have built a dedicated page showcasing our WhatsApp AI agents, shipping & waybill trackers, retail POS mobile apps, n8n orchestrations, and scalable cloud backends.'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('other-services')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer shrink-0"
            >
              <span>{isAr ? 'الانتقال لصفحة الخدمات والأنظمة الأخرى' : 'View Other Systems & Services'}</span>
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. SECTION 5: HOW IT WORKS (خطوات العمل خطوة بخطوة) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-amber-500/15">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold mb-3">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'خطوات تنفيذ متجرك' : 'Our Engineering Workflow'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {isAr ? 'كيف نبني متجرك ونظامك خطوة بخطوة؟' : 'How We Build Your Custom Store Step by Step'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {isAr
              ? 'من الجلسة الاستشارية الأولى حتى الإطلاق السحابي وعقد الدعم المستمر.'
              : 'From your initial consultation through custom development to live cloud launch and maintenance.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-[#0B0F19] border border-amber-500/20 hover:border-amber-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-black font-mono text-amber-400/80 mb-3">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {isAr ? step.titleAr : step.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isAr ? step.descAr : step.descEn}
                </p>
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-[#DC2626] to-[#D97706] rounded-full mt-6"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SECTION 6: FAQ ACCORDION (الأسئلة الشائعة) */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 border-t border-amber-500/15">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'الأسئلة الأكثر تكراراً' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {isAr ? 'كل ما يهمك معرفته عن خدماتنا' : 'Everything You Need to Know'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {isAr
              ? 'إجابات واضحة وشفافة حول تكلفة المتاجر، الملكية، بوابات الدفع، والمدة الزمنية.'
              : 'Clear and transparent answers regarding cost, source code ownership, payment gateways, and delivery time.'}
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0B0F19] border border-amber-500/20 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/60 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {isAr ? faq.qAr : faq.qEn}
                  </span>
                  <span className="p-1.5 rounded-lg bg-slate-800 text-amber-400 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {isAr ? faq.aAr : (faq.aAr || faq.qEnShort)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Final Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#0B0F19] via-slate-900 to-[#1A1208] border border-amber-500/35 text-center shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
            {isAr ? 'جاهز لإطلاق متجرك أو موقعك بنظام خاص 100%؟' : 'Ready to Launch Your 100% Custom Store or Website?'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            {isAr
              ? 'تواصل معنا الآن عبر الواتساب لمناقشة فكرة مشروعك، والحصول على جلسة استشارية مجانية وعرض سعر مخصص ودقيق.'
              : 'Contact our engineering team now via WhatsApp to discuss your commerce blueprint and receive a free consultation.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={generalQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#D97706] text-white font-extrabold text-base shadow-[0_10px_35px_rgba(220,38,38,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{isAr ? 'تواصل معنا عبر واتساب الآن (+201107787049)' : 'Contact Us on WhatsApp (+201107787049)'}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
