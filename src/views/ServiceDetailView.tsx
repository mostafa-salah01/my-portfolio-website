import React from 'react';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, ExternalLink, 
  ShieldCheck, ShoppingBag, Globe, Bot, Truck, Smartphone, Cpu, Database, Sparkles, Layers
} from 'lucide-react';
import { SERVICES_DATA, PORTFOLIO_PROJECTS, ServiceItem, ProjectItem } from '../data/projects';

interface ServiceDetailViewProps {
  slug: string;
  lang: 'ar' | 'en';
  onNavigate: (tab: string, anchor?: string) => void;
  onSelectProject: (p: ProjectItem) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ 
  slug, 
  lang, 
  onNavigate,
  onSelectProject
}) => {
  const isAr = lang === 'ar';

  const service = SERVICES_DATA.find((s) => s.slug === slug || s.pageTab === slug) || SERVICES_DATA[0];

  // Relevant projects for this service
  const relatedProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (slug === 'ecommerce-store') return p.category === 'ecommerce-demos' || p.category === 'web-development';
    if (slug === 'corporate-website') return p.category === 'web-development';
    if (slug === 'whatsapp-ai-employee' || slug === 'omnichannel-ai-agent') return p.category === 'ai-employee';
    if (slug === 'smart-shipping-system') return p.category === 'shipping';
    if (slug === 'mobile-retail-apps') return p.category === 'mobile-apps';
    if (slug === 'n8n-automation') return p.category === 'automation';
    if (slug === 'backend-api-architecture') return p.category === 'backend';
    return true;
  }).slice(0, 3);

  const quoteWhatsappUrl = `https://wa.me/201205798302?text=${encodeURIComponent(
    isAr
      ? `مرحباً قسم المبيعات في WebStack، أود الاستفسار وطلب عرض سعر مخصص لخدمة (${service.titleAr}).`
      : `Hello WebStack Sales Department, I would like to request a tailored quote for (${service.titleEn}).`
  )}`;

  return (
    <div className="relative z-10 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <button
            onClick={() => onNavigate(slug === 'ecommerce-store' || slug === 'corporate-website' ? 'home' : 'other-services')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>
              {slug === 'ecommerce-store' || slug === 'corporate-website'
                ? (isAr ? 'العودة للرئيسية (المتاجر والمواقع)' : 'Back to Home (Stores & Websites)')
                : (isAr ? 'العودة لقائمة الخدمات والأنظمة الأخرى' : 'Back to Other Systems & Services')}
            </span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{isAr ? 'مبني برمجياً من الصفر 100%' : '100% Custom Built from Scratch'}</span>
              </span>

              {service.badgeAr && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                  {isAr ? service.badgeAr : service.badgeEn}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              {isAr ? service.titleAr : service.titleEn}
            </h1>

            <p className="text-amber-300 font-mono text-sm sm:text-base mb-4">
              {isAr ? service.taglineAr : service.taglineEn}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {isAr ? service.fullDescAr : service.fullDescEn}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={quoteWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-extrabold text-sm sm:text-base shadow-[0_10px_30px_rgba(220,38,38,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{isAr ? 'احصل على استشارة وعرض سعر' : 'Get Free Consultation & Quote'}</span>
              </a>

              <button
                onClick={() => onNavigate('home', 'portfolio')}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-sm sm:text-base border border-amber-500/30 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{isAr ? 'معاينة المتاجر والمواقع الحية' : 'View Live Stores & Sites'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Quick Deliverables Box (Col 4) */}
          <div className="lg:col-span-4 bg-[#0B0F19] rounded-2xl p-6 border border-amber-500/30 shadow-xl">
            <h3 className="text-sm font-bold text-amber-400 mb-4 flex items-center gap-2 font-mono">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'أبرز مميزات التنفيذ' : 'Key Specifications'}</span>
            </h3>

            <div className="space-y-3">
              {(isAr ? service.featuresAr : service.featuresEn).map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
              <div>✓ Official Domain & SSL Included</div>
              <div>✓ 100% Code & DB Ownership</div>
              <div>✓ Zero Ongoing Platform Cut</div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Features Grid */}
        <div className="my-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 text-center">
            {isAr ? 'كيف يتم تنفيذ هذا الحل في WebStack؟' : 'How We Engineer This Solution'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold mb-4 font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {isAr ? 'جلسات استشارية تفصيلية' : 'Bespoke Blueprint & Scope'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isAr
                  ? 'بنمشي معاك خطوة بخطوة لحد ما نحلل ونفهم طبيعة تجارتك وتفاصيل منتجاتك وسير العمل قبل البدء.'
                  : 'We walk step-by-step with you to map your exact catalog, operations, and business rules.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold mb-4 font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {isAr ? 'كود نظيف وأمان فائق' : 'Clean Code Architecture'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isAr
                  ? 'برمجة خالية من القوالب الجاهزة البطيئة لضمان أعلى سرعة وأمان ومرونة للتوسع المستقبلي.'
                  : 'High-performance architecture built for instant responsiveness, scalability, and robust security.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold mb-4 font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {isAr ? 'دعم فني ومتابعة مستمرة' : 'Cloud Launch & Support'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isAr
                  ? 'تسليم كامل لكود المشروع مع استضافة سحابية فائقة السرعة وعقد صيانة ودعم تقني دائم.'
                  : 'Full cloud deployment, custom domain setup, and ongoing technical maintenance.'}
              </p>
            </div>
          </div>
        </div>

        {/* Related Portfolio Items (e.g. Larose Store, Clean Al-Mithalia, etc.) */}
        {relatedProjects.length > 0 && (
          <div className="my-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 text-center">
              {isAr ? 'سابقة أعمال ومشاريع حية مرتبطة بهذه الخدمة' : 'Related Live Production Showcases'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl bg-[#0B0F19] border border-amber-500/20 overflow-hidden flex flex-col justify-between hover:border-amber-400/50 transition-all group cursor-pointer"
                  onClick={() => {
                    if (p.liveUrl) {
                      window.open(p.liveUrl, '_blank', 'noopener,noreferrer');
                    } else {
                      onSelectProject(p);
                    }
                  }}
                  title={isAr ? `اضغط لمعاينة ${p.titleAr} مباشرة` : `Click to open ${p.titleEn} directly`}
                >
                  <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                    <img
                      src={p.image}
                      alt={isAr ? p.titleAr : p.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                      <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                        <span>{isAr ? 'فتح الرابط الحي ↗' : 'Open Live Link ↗'}</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                      {isAr ? p.titleAr : p.titleEn}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                      {isAr ? p.taglineAr : p.taglineEn}
                    </p>
                  </div>
                  <div 
                    className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onSelectProject(p)}
                      className="text-xs font-bold text-amber-300 hover:text-white cursor-pointer"
                    >
                      {isAr ? 'المواصفات' : 'Specs'}
                    </button>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>{isAr ? 'زيارة الموقع الحي' : 'Visit Live'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
