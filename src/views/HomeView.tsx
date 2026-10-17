import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, ShoppingBag, Globe, Bot, Truck, 
  Smartphone, Cpu, Database, CheckCircle2, MessageCircle, ExternalLink,
  ChevronDown, ChevronUp, Layers, HelpCircle
} from 'lucide-react';
import { PORTFOLIO_PROJECTS, SERVICES_DATA, FAQ_ITEMS, HOW_IT_WORKS_STEPS, ProjectItem } from '../data/projects';

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
    'موظفو ذكاء اصطناعي (واتساب · تلجرام · ماسنجر)',
    'سيستمات الشحن واللوجستيات والمناديب',
    'أنظمة كاشير ونقاط بيع وتطبيقات موبايل',
    'خبير أتمتة مسارات العمل المؤسسية عبر n8n'
  ];

  const rolesEn = [
    'Custom E-Commerce Stores (PHP & MySQL from Scratch)',
    'Bilingual Corporate Websites (Arabic & English)',
    'AI Employees for WhatsApp, Telegram & Messenger',
    'Smart Shipping & Logistics Management Systems',
    'POS Cashier Systems & Mobile Applications',
    'Enterprise n8n Workflow Automation Specialist'
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

  // Portfolio category filter
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelAr: 'جميع الأعمال', labelEn: 'All Projects' },
    { id: 'ecommerce-demos', labelAr: 'متاجر إلكترونية حية', labelEn: 'E-Commerce Demos' },
    { id: 'web-development', labelAr: 'مواقع شركات وسابقة أعمال', labelEn: 'Corporate Websites' },
    { id: 'ai-employee', labelAr: 'موظفو الذكاء الاصطناعي', labelEn: 'AI Employees' },
    { id: 'shipping', labelAr: 'الشحن واللوجستيات', labelEn: 'Logistics Systems' },
    { id: 'mobile-apps', labelAr: 'تطبيقات الموبايل وPOS', labelEn: 'Mobile & POS' },
    { id: 'automation', labelAr: 'أتمتة العمليات n8n', labelEn: 'Automation' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  // WhatsApp CTA link
  const generalQuoteUrl = `https://wa.me/201107787049?text=${encodeURIComponent(
    isAr
      ? 'مرحباً فريق WebStack، أود الحصول على استشارة مجانية وعرض سعر مخصص لمشروعي البرمجي.'
      : 'Hello WebStack team, I would like a free consultation and a custom quotation for my software project.'
  )}`;

  return (
    <div className="relative z-10 pt-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
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
              {isAr ? 'كل عميل له نظامه الخاص' : 'Every Client Has Their Own System'}
            </span>
            <span className="gold-gradient-text block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706]">
              {isAr ? 'برمجة مخصصة 100% بدون قوالب جاهزة' : '100% Custom Built With Zero Templates'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            {isAr
              ? 'في WebStack نبني لك متجرك الإلكتروني وموقع شركتك مخصصاً بالكامل من الصفر بلغة PHP وقواعد بيانات MySQL. لا قوالب ووردبريس بطيئة، ولا منصات مؤجرة تقتطع عمولات، مع ملكية كاملة 100% لكود مشروعك ودعم فني مستمر.'
              : 'At WebStack, we handcraft your custom e-commerce store and corporate website from the ground up using clean PHP & MySQL. Zero bloated templates, zero platform commissions, with 100% full source code ownership and ongoing technical support.'}
          </p>

          {/* CTAs */}
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
              onClick={() => onNavigate('home', 'portfolio')}
              className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-bold text-sm sm:text-base border border-amber-500/30 hover:border-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:scale-105"
            >
              <span>{isAr ? 'معاينة سابقة الأعمال والديموهات' : 'Explore Portfolio & Demos'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          {/* Trust Highlights Strip */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 text-start">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/15 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-sm font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>0% Commission</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isAr ? 'صفر عمولات على مبيعاتك وأرباحك' : 'Zero sales commission'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/15 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-sm font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Custom Code</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isAr ? 'مبرمج من الصفر بدون قوالب جاهزة' : 'No templates, clean PHP/MySQL'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/15 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-sm font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Full Ownership</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isAr ? 'ملكية تامة للكود والدومين والداتا' : '100% Code & Database ownership'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/15 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-sm font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Active Support</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isAr ? 'دعم فني ومتابعة مستمرة' : 'Ongoing dedicated support'}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Services Showcase Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'حلولنا وهندستنا البرمجية' : 'Software Engineering Solutions'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isAr ? 'حلول برمجية متكاملة مصممة خصيصاً لنمو أعمالك' : 'Tailored Software Solutions Engineered For Scale'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {isAr
              ? 'كل مشروع نأخذه كحالة فريدة... نبني بنيته التحتية وواجهته وأمانه خطوة بخطوة.'
              : 'Every project is engineered as a unique architecture with dedicated workflows, zero templates, and full ownership.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.slice(0, 6).map((service) => {
            const serviceWhatsappUrl = `https://wa.me/201107787049?text=${encodeURIComponent(
              isAr
                ? `مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لـ (${service.titleAr}).`
                : `Hello WebStack team, I would like to inquire about and request a quote for (${service.titleEn}).`
            )}`;

            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-gradient-to-b from-[#0F1626]/90 to-[#0B0F19]/90 border border-amber-500/20 hover:border-amber-400/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(245,158,11,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      {service.icon === 'ShoppingBag' && <ShoppingBag className="w-6 h-6" />}
                      {service.icon === 'Globe' && <Globe className="w-6 h-6" />}
                      {service.icon === 'Bot' && <Bot className="w-6 h-6" />}
                      {service.icon === 'Truck' && <Truck className="w-6 h-6" />}
                      {service.icon === 'Smartphone' && <Smartphone className="w-6 h-6" />}
                      {service.icon === 'Cpu' && <Cpu className="w-6 h-6" />}
                      {service.icon === 'Database' && <Database className="w-6 h-6" />}
                    </div>

                    {service.badgeAr && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
                        {isAr ? service.badgeAr : service.badgeEn}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {isAr ? service.titleAr : service.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {isAr ? service.shortDescAr : service.shortDescEn}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {(isAr ? service.keyPointsAr : service.keyPointsEn).slice(0, 3).map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onNavigate(service.pageTab)}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{isAr ? 'تفاصيل الخدمة' : 'View Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>

                  <a
                    href={serviceWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white text-xs font-bold hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{isAr ? 'عرض سعر' : 'Quote'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold text-sm transition-all hover:scale-105 shadow-md cursor-pointer"
          >
            <span>{isAr ? 'استكشف دليل جميع الخدمات البرمجية المتاحة (8+ خدمات)' : 'Explore Complete Services Directory (8+ Solutions)'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </section>

      {/* 3. Portfolio & Live Demos Section (Featuring Larose & Others) */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>{isAr ? 'أعمالنا ونماذج المعاينة الحية' : 'Live Showcases & Demos'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isAr ? 'سابقة أعمال حية ومشاريع تم بناؤها بدقة' : 'Live Client Production Platforms & Interactive Demos'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {isAr
              ? 'تصفح عينات حية من المتاجر والمواقع التي صممناها وبرمجناها بكود نظيف وتجربة مستخدم سريعة.'
              : 'Browse real client platforms and live demos engineered with clean code, zero template bloat, and fast UX.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white shadow-[0_0_15px_rgba(220,38,38,0.35)] scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const projectTitle = isAr ? project.titleAr : project.titleEn;
            const projectTagline = isAr ? project.taglineAr : project.taglineEn;
            const projectMetrics = isAr ? project.metricsAr : project.metricsEn;

            return (
              <div
                key={project.id}
                className="group rounded-2xl bg-[#0B0F19] border border-amber-500/20 hover:border-amber-400/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={projectTitle}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/ecommerce_store_showcase.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 justify-between">
                      <span className="text-[11px] font-mono font-bold text-amber-300 bg-black/75 px-2.5 py-0.5 rounded-md border border-amber-500/30">
                        {projectMetrics}
                      </span>
                      {project.badge && (
                        <span className="text-[10px] font-bold text-rose-300 bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 rounded-md">
                          {project.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="text-[11px] text-amber-400 font-mono font-bold mb-1.5">
                      {isAr ? project.categoryLabelAr : project.categoryLabelEn}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight group-hover:text-amber-300 transition-colors">
                      {projectTitle}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {projectTagline}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{isAr ? 'المواصفات والتفاصيل' : 'Specs & Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all hover:scale-105 cursor-pointer"
                    >
                      <span>{isAr ? 'معاينة حية' : 'Live Demo'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 4. "How We Work" 4-Step Process */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>{isAr ? 'منهجية العمل' : 'Our Methodology'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isAr ? 'كيف نحول فكرتك لنظام برمجي حي وناجح؟' : 'How We Engineer Your Project Step-by-Step'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {isAr
              ? 'عملية هندسية واضحة وشفافة تمشي معك خطوة بخطوة من الاستشارة الأولى حتى الإطلاق والمتابعة.'
              : 'A transparent, collaborative 4-step engineering roadmap from initial blueprint to live cloud launch.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-slate-900/60 border border-amber-500/20 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#DC2626] to-[#D97706] text-white flex items-center justify-center font-mono font-black text-lg mb-4 shadow-md">
                  {step.step}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight">
                  {isAr ? step.titleAr : step.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isAr ? step.descAr : step.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Custom Quote Generator & Pricing Philosophy */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-gradient-to-b from-[#0F1626] to-[#07090E] border border-amber-500/30 p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden text-center">
          
          <div className="max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono inline-block mb-4">
              {isAr ? 'فلسفة التسعير العادل' : 'Tailored Value Architecture'}
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {isAr ? 'لماذا لا نضع أسعاراً معلبة؟' : 'Why Don’t We Sell Cookie-Cutter Plans?'}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              {isAr
                ? 'لأن كل تاجر أو شركة لها طبيعة عمل مختلفة وعدد منتجات وبوابات دفع ومتطلبات خاصة. نحن لا نبيع قوالب معلبة مكررة، بل نبني لكل عميل نظامه المخصص 100% من الصفر. تواصل معنا لمناقشة مشروعك والحصول على استشارة مجانية وعرض سعر دقيق يناسبك تماماً.'
                : 'Because every business has unique catalogs, logistics, and workflows. We don’t resell bloated templates; we handcraft dedicated systems from scratch. Connect with our engineering team for a free consultation and customized quote.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={generalQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-extrabold text-sm sm:text-base shadow-[0_10px_30px_rgba(220,38,38,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{isAr ? 'تواصل معنا على واتساب واحصل على عرضك' : 'Message on WhatsApp for Tailored Quote'}</span>
              </a>
            </div>

            <div className="mt-6 text-xs text-slate-400 font-mono">
              Direct Engineering Hotline: +20 110 778 7049
            </div>
          </div>

        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'إجابات واضحة' : 'FAQ'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {isAr ? 'الأسئلة الشائعة وتفاصيل التعاقد' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-sm text-slate-300">
            {isAr ? 'كل ما تود معرفته عن الملكية، الأسعار، بوابات الدفع، وطرق التنفيذ.' : 'Everything you need to know about ownership, payments, and workflow.'}
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/70 border border-amber-500/20 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {isAr ? faq.qAr : faq.qEn}
                  </span>
                  <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    <p className="whitespace-pre-line">{isAr ? faq.aAr : faq.qEnShort}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
