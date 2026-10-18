import React, { useState } from 'react';
import { 
  Bot, Truck, Smartphone, Cpu, Database, CheckCircle2, 
  ArrowRight, MessageCircle, Sparkles, ArrowLeft, ShieldCheck
} from 'lucide-react';
import { OTHER_SERVICES_LIST, ServiceItem, ProjectItem, PORTFOLIO_PROJECTS } from '../data/projects';

interface OtherServicesViewProps {
  lang: 'ar' | 'en';
  onNavigate: (tab: string, anchor?: string) => void;
  onSelectProject: (p: ProjectItem) => void;
}

export const OtherServicesView: React.FC<OtherServicesViewProps> = ({ 
  lang, 
  onNavigate,
  onSelectProject
}) => {
  const isAr = lang === 'ar';
  const [filter, setFilter] = useState<string>('all');

  const filtered = OTHER_SERVICES_LIST.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return s.id === 'ai-employees';
    if (filter === 'shipping') return s.id === 'smart-shipping';
    if (filter === 'mobile-pos') return s.id === 'mobile-pos-apps';
    if (filter === 'automation') return s.id === 'n8n-automation';
    if (filter === 'backend') return s.id === 'backend-architecture';
    return true;
  });

  return (
    <div className="relative z-10 pt-28 pb-20">
      
      {/* Top Breadcrumb & Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 text-center">
        <div className="flex items-center justify-start mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{isAr ? 'العودة للرئيسية (المتاجر والمواقع الإلكترونية)' : 'Back to Home (E-Commerce & Websites)'}</span>
          </button>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/35 text-amber-300 text-xs sm:text-sm font-bold mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{isAr ? 'الأنظمة البرمجية والحلول الذكية الأخرى' : 'Other Systems & Specialized Solutions'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706]">
            {isAr ? 'خدماتنا البرمجية والأنظمة الرقمية الأخرى' : 'Our Specialized Systems & Digital Services'}
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {isAr
            ? 'بجانب تخصصنا الأساسي في برمجة المتاجر والمواقع، نوفر لشركتك حلول الذكاء الاصطناعي لواتساب، سيستمات الشحن واللوجستيات، أنظمة الكاشير POS وتطبيقات الموبايل، أتمتة مسارات العمل n8n، وهندسة الـ Backend.'
            : 'Alongside our core e-commerce & web development expertise, explore our specialized enterprise solutions: WhatsApp AI Employees, Smart Shipping platforms, Retail POS apps, n8n automations, and Cloud APIs.'}
        </p>

        {/* Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mt-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white shadow-md'
                : 'bg-slate-900 text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
            }`}
          >
            {isAr ? 'جميع الأنظمة (الكل)' : 'All Systems'}
          </button>
          <button
            onClick={() => setFilter('ai')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === 'ai'
                ? 'bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white shadow-md'
                : 'bg-slate-900 text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
            }`}
          >
            {isAr ? 'موظفو الذكاء الاصطناعي' : 'AI Employees'}
          </button>
          <button
            onClick={() => setFilter('shipping')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === 'shipping'
                ? 'bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white shadow-md'
                : 'bg-slate-900 text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
            }`}
          >
            {isAr ? 'سيستم الشحن والمناديب' : 'Smart Shipping'}
          </button>
          <button
            onClick={() => setFilter('mobile-pos')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === 'mobile-pos'
                ? 'bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white shadow-md'
                : 'bg-slate-900 text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
            }`}
          >
            {isAr ? 'تطبيقات الموبايل وPOS' : 'Mobile Apps & POS'}
          </button>
          <button
            onClick={() => setFilter('automation')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === 'automation'
                ? 'bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white shadow-md'
                : 'bg-slate-900 text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
            }`}
          >
            {isAr ? 'أتمتة العمليات n8n' : 'n8n Automation'}
          </button>
          <button
            onClick={() => setFilter('backend')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === 'backend'
                ? 'bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white shadow-md'
                : 'bg-slate-900 text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
            }`}
          >
            {isAr ? 'هندسة الـ Backend والـ APIs' : 'Backend & APIs'}
          </button>
        </div>
      </section>

      {/* Services List Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {filtered.map((service) => {
          const serviceWhatsappUrl = `https://wa.me/201107787049?text=${encodeURIComponent(
            isAr
              ? `مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لنظام (${service.titleAr}).`
              : `Hello WebStack team, I would like to inquire and request a custom quote for (${service.titleEn}).`
          )}`;

          const serviceImage = service.image || '/assets/images/ai_whatsapp_agent_1789851518713.jpg';

          return (
            <div
              key={service.id}
              className="rounded-3xl bg-[#0B0F19] border border-amber-500/25 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-amber-400/50 transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Visual Image (Col 5) */}
                <div 
                  className="lg:col-span-5 order-2 lg:order-1 cursor-pointer"
                  onClick={() => onNavigate(service.pageTab)}
                  title={isAr ? `اضغط للاطلاع على مواصفات ${service.titleAr}` : `Click to view specs for ${service.titleEn}`}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-950 aspect-[4/3] group/img">
                    <img
                      src={serviceImage}
                      alt={isAr ? service.titleAr : service.titleEn}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg">
                        <span>{isAr ? 'عرض المواصفات الفنية ↗' : 'View Technical Specs ↗'}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-5 pointer-events-none">
                      <div className="text-xs font-mono text-amber-200">
                        <div className="font-bold text-white text-sm">
                          {isAr ? service.titleAr : service.titleEn}
                        </div>
                        <div className="text-[11px] text-amber-400 font-mono">
                          {isAr ? service.taglineAr : service.taglineEn}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Details (Col 7) */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#DC2626] to-[#D97706] text-white flex items-center justify-center shadow-md shrink-0">
                      {service.icon === 'Bot' && <Bot className="w-6 h-6" />}
                      {service.icon === 'Truck' && <Truck className="w-6 h-6" />}
                      {service.icon === 'Smartphone' && <Smartphone className="w-6 h-6" />}
                      {service.icon === 'Cpu' && <Cpu className="w-6 h-6" />}
                      {service.icon === 'Database' && <Database className="w-6 h-6" />}
                    </div>

                    <div>
                      {service.badgeAr && (
                        <span className="text-[11px] font-mono font-bold text-amber-300 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30">
                          {isAr ? service.badgeAr : service.badgeEn}
                        </span>
                      )}
                      <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mt-1 group-hover:text-amber-300 transition-colors">
                        {isAr ? service.titleAr : service.titleEn}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                    {isAr ? service.fullDescAr : service.fullDescEn}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs sm:text-sm text-slate-200">
                    {(isAr ? service.keyPointsAr : service.keyPointsEn).map((pt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800">
                    <a
                      href={serviceWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{isAr ? 'طلب استشارة وعرض سعر' : 'Get Tailored Quote'}</span>
                    </a>

                    <button
                      onClick={() => onNavigate(service.pageTab)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs sm:text-sm border border-amber-500/35 transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:scale-105"
                    >
                      <span>{isAr ? 'صفحة المواصفات الفنية' : 'Technical Specs'}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* Return to Home Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="rounded-3xl bg-slate-900/80 border border-amber-500/30 p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            {isAr ? 'ترغب في متجر إلكتروني مخصص أو تصميم موقع لشركتك؟' : 'Looking for a Custom E-Commerce Store or Website?'}
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            {isAr
              ? 'تصفح صفحتنا الرئيسية المخصصة بالكامل لإنشاء المتاجر الإلكترونية وسابقة الأعمال الحية والمواقع المنفذة.'
              : 'Explore our dedicated home page focused exclusively on handcrafted e-commerce stores and live showcases.'}
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-bold text-sm shadow-md hover:scale-105 transition-transform cursor-pointer"
          >
            <span>{isAr ? 'الانتقال لصفحة المتاجر الإلكترونية والمواقع' : 'Go to E-Commerce & Websites Page'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </section>

    </div>
  );
};
