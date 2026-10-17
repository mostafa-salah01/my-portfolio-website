import React, { useState } from 'react';
import { 
  ShoppingBag, Globe, Bot, Truck, Smartphone, Cpu, Database, 
  CheckCircle2, ArrowRight, MessageCircle, Sparkles, Filter
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../data/projects';

interface ServicesViewProps {
  lang: 'ar' | 'en';
  onNavigate: (tab: string, anchor?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ lang, onNavigate }) => {
  const isAr = lang === 'ar';
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'ai' | 'ops'>('all');

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return ['custom-ecommerce', 'corporate-websites'].includes(s.id);
    if (activeFilter === 'ai') return ['ai-employees'].includes(s.id);
    if (activeFilter === 'ops') return ['smart-shipping', 'mobile-pos-apps', 'n8n-automation', 'backend-architecture'].includes(s.id);
    return true;
  });

  return (
    <div className="relative z-10 pt-28 pb-20">
      
      {/* Services Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/35 text-amber-300 text-xs sm:text-sm font-bold mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span>{isAr ? 'دليل خدمات WebStack المتكاملة' : 'WebStack Complete Services Directory'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#D97706]">
            {isAr ? 'كل خدماتنا البرمجية وحلول الأنظمة' : 'All Software & Digital Solutions'}
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {isAr
            ? 'حلول مخصصة لكل نشاط... كل عميل له نظامه الخاص. أنظمة مبرمجة من الصفر بأحدث التقنيات وبدون قوالب مكررة.'
            : 'Tailored solutions for every business... every client has their own dedicated system. Built from scratch with clean code.'}
        </p>

        {/* Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mt-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white shadow-md'
                : 'bg-slate-900 text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
            }`}
          >
            {isAr ? 'جميع الخدمات (الكل)' : 'All Solutions'}
          </button>
          <button
            onClick={() => setActiveFilter('web')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'web'
                ? 'bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white shadow-md'
                : 'bg-slate-900 text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
            }`}
          >
            {isAr ? 'المتاجر والمواقع التعريفية' : 'E-Commerce & Websites'}
          </button>
          <button
            onClick={() => setActiveFilter('ai')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'ai'
                ? 'bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white shadow-md'
                : 'bg-slate-900 text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
            }`}
          >
            {isAr ? 'موظفو الذكاء الاصطناعي' : 'AI Employees'}
          </button>
          <button
            onClick={() => setActiveFilter('ops')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'ops'
                ? 'bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white shadow-md'
                : 'bg-slate-900 text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
            }`}
          >
            {isAr ? 'اللوجستيات وتطبيقات الموبايل وn8n' : 'Logistics, Apps & n8n'}
          </button>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {filteredServices.map((service, index) => {
          const serviceWhatsappUrl = `https://wa.me/201107787049?text=${encodeURIComponent(
            isAr
              ? `مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لـ (${service.titleAr}).`
              : `Hello WebStack team, I would like to inquire and request a custom quote for (${service.titleEn}).`
          )}`;

          return (
            <div
              key={service.id}
              className="rounded-3xl bg-[#0B0F19] border border-amber-500/25 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-amber-400/50 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Main Info (Col 7) */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#DC2626] to-[#D97706] text-white flex items-center justify-center shadow-md shrink-0">
                      {service.icon === 'ShoppingBag' && <ShoppingBag className="w-6 h-6" />}
                      {service.icon === 'Globe' && <Globe className="w-6 h-6" />}
                      {service.icon === 'Bot' && <Bot className="w-6 h-6" />}
                      {service.icon === 'Truck' && <Truck className="w-6 h-6" />}
                      {service.icon === 'Smartphone' && <Smartphone className="w-6 h-6" />}
                      {service.icon === 'Cpu' && <Cpu className="w-6 h-6" />}
                      {service.icon === 'Database' && <Database className="w-6 h-6" />}
                    </div>

                    <div>
                      {service.badgeAr && (
                        <span className="text-[11px] font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/25">
                          {isAr ? service.badgeAr : service.badgeEn}
                        </span>
                      )}
                      <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mt-1">
                        {isAr ? service.titleAr : service.titleEn}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-amber-200/90 font-mono mb-4">
                    {isAr ? service.taglineAr : service.taglineEn}
                  </p>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                    {isAr ? service.fullDescAr : service.fullDescEn}
                  </p>

                  <div className="flex flex-wrap gap-4 items-center pt-2">
                    <button
                      onClick={() => onNavigate(service.pageTab)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs sm:text-sm border border-amber-500/35 transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:scale-105"
                    >
                      <span>{isAr ? 'عرض صفحة الخدمة المتخصصة' : 'Dedicated Page Details'}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </button>

                    <a
                      href={serviceWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{isAr ? 'طلب استشارة وعرض سعر' : 'Request Tailored Quote'}</span>
                    </a>
                  </div>
                </div>

                {/* Features & Key Points (Col 5) */}
                <div className="lg:col-span-5 bg-slate-950/70 rounded-2xl p-6 border border-slate-800/80">
                  <h3 className="text-xs font-mono font-bold text-amber-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{isAr ? 'مواصفات ومزايا التنفيذ' : 'Included Deliverables'}</span>
                  </h3>

                  <ul className="space-y-3">
                    {(isAr ? service.featuresAr : service.featuresEn).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>100% Custom Code</span>
                    <span className="text-emerald-400 font-bold">0% Sales Commission</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

    </div>
  );
};
