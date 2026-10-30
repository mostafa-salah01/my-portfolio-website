import React from 'react';
import { MessageCircle, ShieldCheck, Mail, MapPin, ExternalLink, Code2, Phone } from 'lucide-react';
import { TEAM_CONTACTS } from '../data/projects';

interface FooterProps {
  lang: 'ar' | 'en';
  onNavigate: (tab: string, anchor?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const isAr = lang === 'ar';

  return (
    <footer className="relative bg-[#05070B] border-t border-amber-500/20 text-slate-400 text-sm overflow-hidden z-10">
      {/* Decorative top ambient glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full p-0.5 flex items-center justify-center shadow-[0_0_18px_rgba(245,158,11,0.25)] shrink-0">
                <img
                  src="/webstack-circle-full.png"
                  alt="WebStack Circular Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <div className="font-extrabold text-xl tracking-tight flex items-center gap-1">
                  <span className="font-sans text-white font-black">Web</span>
                  <span className="font-sans text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 font-black">Stack</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)] ml-0.5"></span>
                </div>
                <span className="text-[11px] text-amber-300 font-mono">
                  {isAr ? 'حلول البرمجيات والمتاجر المخصصة' : 'Custom Software & E-Commerce'}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              {isAr
                ? 'شركة WebStack للحلول البرمجية: نبني لك متجرك الإلكتروني وموقع شركتك وأنظمتك مخصصة 100% من الصفر بدون قوالب جاهزة، مع ملكية تامة للكود و0% عمولات على مبيعاتك.'
                : 'WebStack Software Solutions: We build your custom e-commerce store, corporate website, and enterprise software from scratch with 100% code ownership and 0% sales commission.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{isAr ? 'كل عميل له نظامه الخاص' : 'Every client has their own dedicated system'}</span>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>{isAr ? 'خدماتنا البرمجية' : 'Software Services'}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('ecommerce-store')}
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'المتاجر الإلكترونية المخصصة' : 'Custom E-Commerce Store'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('corporate-website')}
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'تصميم مواقع الشركات التعريفية' : 'Corporate Bilingual Websites'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('whatsapp-ai-employee')}
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'موظف الذكاء الاصطناعي لواتساب' : 'WhatsApp AI Employee'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('smart-shipping-system')}
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'سيستم الشحن وإدارة المناديب' : 'Smart Shipping & Courier'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mobile-retail-apps')}
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'تطبيقات الموبايل وأنظمة POS' : 'Mobile Apps & POS'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('n8n-automation')}
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'أتمتة مسارات العمل n8n' : 'Enterprise n8n Automation'}
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links & Demos */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
              <span>{isAr ? 'روابط ومشاريع حية' : 'Portfolio & Live Stores'}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="https://larose.salah-logistics.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{isAr ? 'متجر لاروز (Larose Store)' : 'Larose Live Store'}</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://voltedge-store.salah-logistics.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{isAr ? 'معرض VoltEdge للأثاث 2026' : 'VoltEdge Furniture (Live)'}</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="http://voltedge-fashion.codix.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{isAr ? 'متجر VoltEdge Fashion' : 'VoltEdge Fashion (Live)'}</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="http://voltedge-atelier.codix.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{isAr ? 'فولت إيدج أتيليه (VoltEdge Atelier)' : 'VoltEdge Atelier (Live)'}</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://alkemma.codix.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{isAr ? 'موقع شركة القمة للديكور' : 'Al Kemma Decor (Live)'}</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://egypt-builders.codix.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{isAr ? 'موقع شركة إيجيبت بيلدرز' : 'Egypt Builders (Live)'}</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://alayyash.codix.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{isAr ? 'شركة عياش للمقاولات (بالسعودية)' : 'AYASH Construction (KSA)'}</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://clean-almithalia.salah-logistics.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{isAr ? 'موقع كلين المثالية (بالسعودية)' : 'Clean Al-Mithalia (KSA)'}</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="http://nabd-clinic.codix.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{isAr ? 'مركز نبض للرعاية الطبية' : 'Nabd Medical Clinics (Live)'}</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="http://perfumes.codix.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{isAr ? 'متجر العطور (VoltEdge Perfumes)' : 'VoltEdge Perfumes (Live)'}</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://voltedge-sports.codix.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{isAr ? 'متجر الرياضة (VoltEdge Sports)' : 'VoltEdge Sports (Live)'}</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('other-services')}
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer text-amber-300 font-bold"
                >
                  {isAr ? 'صفحة الأنظمة والخدمات الأخرى ↗' : 'Other Systems & Services ↗'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('partner-program')}
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'برنامج شركاء المبيعات والعمولة' : 'Sales Partner Program'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'سياسة الخصوصية والأمان' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {isAr ? 'الشروط والأحكام' : 'Terms of Service'}
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Support & Team Contacts */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>{isAr ? 'فريق العمل وأرقام التواصل' : 'Direct Team Contacts'}</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              
              {/* 1. Primary Sales Line */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-1.5 shadow-sm">
                <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{isAr ? TEAM_CONTACTS.sales.nameAr : TEAM_CONTACTS.sales.nameEn}</span>
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                    {isAr ? 'الخط الأساسي' : 'Primary Line'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">
                  {isAr ? TEAM_CONTACTS.sales.roleAr : TEAM_CONTACTS.sales.roleEn}
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                  <a
                    href={TEAM_CONTACTS.sales.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-gradient-to-r from-[#DC2626] to-[#D97706] hover:from-[#B91C1C] hover:to-[#B45309] text-white font-mono font-bold text-xs transition-colors shadow-sm"
                    title={isAr ? 'واتساب المبيعات (الخط الأساسي)' : 'WhatsApp Sales (Primary Line)'}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span dir="ltr">01205798302</span>
                  </a>
                  <a
                    href={TEAM_CONTACTS.sales.telUrl}
                    className="inline-flex items-center justify-center p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white transition-colors"
                    title={isAr ? 'اتصال مباشر' : 'Call'}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 2. Eng. Mostafa - Lead Software Engineer */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-1.5 shadow-sm">
                <div className="text-xs font-bold text-cyan-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>{isAr ? TEAM_CONTACTS.engMostafa.nameAr : TEAM_CONTACTS.engMostafa.nameEn}</span>
                  </span>
                  <span className="text-[10px] text-cyan-300 font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30">
                    {isAr ? 'المبرمج الرئيسي' : 'Lead Dev'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">
                  {isAr ? TEAM_CONTACTS.engMostafa.roleAr : TEAM_CONTACTS.engMostafa.roleEn}
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                  <a
                    href={TEAM_CONTACTS.engMostafa.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-cyan-300 font-mono font-bold text-xs transition-colors border border-cyan-500/30"
                    title={isAr ? 'واتساب م/ مصطفى (المبرمج الرئيسي)' : 'WhatsApp Eng. Mostafa (Lead Dev)'}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span dir="ltr">01107787049</span>
                  </a>
                  <a
                    href={TEAM_CONTACTS.engMostafa.telUrl}
                    className="inline-flex items-center justify-center p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white transition-colors"
                    title={isAr ? 'اتصال مباشر' : 'Call'}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 3. Eng. Ammar - Executive Management */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5 shadow-sm">
                <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span>{isAr ? TEAM_CONTACTS.engAmmar.nameAr : TEAM_CONTACTS.engAmmar.nameEn}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {isAr ? 'الإدارة' : 'Management'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {isAr ? TEAM_CONTACTS.engAmmar.roleAr : TEAM_CONTACTS.engAmmar.roleEn}
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                  <a
                    href={TEAM_CONTACTS.engAmmar.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-emerald-400 font-mono font-bold text-xs transition-colors border border-slate-700/60"
                    title={isAr ? 'واتساب م/ عمار (الإدارة)' : 'WhatsApp Eng. Ammar (Management)'}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span dir="ltr">01555668194</span>
                  </a>
                  <a
                    href={TEAM_CONTACTS.engAmmar.telUrl}
                    className="inline-flex items-center justify-center p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                    title={isAr ? 'اتصال مباشر' : 'Call'}
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 text-slate-400 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{isAr ? 'القاهرة، جمهورية مصر العربية' : 'Cairo, Egypt'}</span>
              </div>

              <a
                href="https://www.facebook.com/profile.php?id=61595189300053&locale=ar_AR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/15 border border-blue-500/30 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors mt-1"
              >
                <span>{isAr ? 'صفحة الفيسبوك الرسمية' : 'Official Facebook'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} WebStack Software Solutions. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-4 font-mono">
            <span>Clean Architecture</span>
            <span>·</span>
            <span>PHP 8+ & MySQL</span>
            <span>·</span>
            <span>0% Commission</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
