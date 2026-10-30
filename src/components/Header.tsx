import React, { useState } from 'react';
import { Menu, X, Globe, MessageCircle, ArrowRight, LayoutGrid, Phone } from 'lucide-react';
import { TEAM_CONTACTS } from '../data/projects';

interface HeaderProps {
  lang: 'ar' | 'en';
  onToggleLang: () => void;
  activeTab: string;
  onNavigate: (tab: string, anchor?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onToggleLang, activeTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = lang === 'ar';

  const handleNavClick = (tab: string, anchor?: string) => {
    setMobileMenuOpen(false);
    onNavigate(tab, anchor);
  };

  const headerWhatsappUrl = `https://wa.me/201205798302?text=${encodeURIComponent(
    isAr
      ? 'مرحباً قسم المبيعات في WebStack، أود الحصول على عرض سعر مخصص لمشروعي.'
      : 'Hello WebStack Sales Department, I would like to get a custom quote for my project.'
  )}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-2xl bg-[#07090E]/90 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        
        {/* Brand Logo with Themed WebStack Emblem in Site Colors */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 text-start group cursor-pointer shrink-0"
          aria-label="WebStack Software Solutions"
        >
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-[0_0_16px_rgba(245,158,11,0.25)] group-hover:shadow-[0_0_24px_rgba(245,158,11,0.45)] transition-all shrink-0">
            <img
              src="/webstack-circle-full.png"
              alt="WebStack Circular Logo"
              className="w-full h-full object-contain rounded-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div dir="ltr" className="font-extrabold text-base sm:text-lg tracking-tight flex items-center gap-1">
              <span className="font-sans text-white font-black tracking-tight">Web</span>
              <span className="font-sans text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 font-black">Stack</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)] ml-0.5"></span>
            </div>
            <div className="hidden md:block text-[11px] text-amber-200/80 font-medium leading-none">
              {isAr ? 'حلول البرمجيات والمتاجر المخصصة' : 'Custom Software & E-Commerce'}
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5" aria-label="Main Navigation">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'home' ? 'text-amber-300 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {isAr ? 'المتاجر والمواقع' : 'Stores & Websites'}
          </button>

          <button
            onClick={() => handleNavClick('home', 'client-work')}
            className="text-sm font-semibold text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            {isAr ? 'سابقة الأعمال الحية' : 'Live Client Work'}
          </button>

          <button
            onClick={() => handleNavClick('home', 'store-demos')}
            className="text-sm font-semibold text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            {isAr ? 'المتاجر الحية' : 'Live Stores'}
          </button>

          <button
            onClick={() => handleNavClick('home', 'store-features')}
            className="text-sm font-semibold text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            {isAr ? 'مواصفات المتجر' : 'Store Architecture'}
          </button>

          {/* Highlighted Link to Dedicated Other Services Page */}
          <button
            onClick={() => handleNavClick('other-services')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-sm font-bold transition-all hover:scale-105 cursor-pointer shadow-sm ${
              activeTab === 'other-services'
                ? 'bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900/90 hover:bg-slate-800 border-amber-500/35 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'الخدمات والأنظمة الأخرى' : 'Other Systems & Services'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]"></span>
          </button>
        </nav>

        {/* Action Buttons - Fully Optimized for Mobile Viewports */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher - Sleek Circle on Mobile ("مجرد كورة بس") */}
          <button
            type="button"
            onClick={onToggleLang}
            className="w-8 h-8 sm:w-auto sm:h-10 sm:px-3.5 rounded-full sm:rounded-xl border border-amber-500/30 bg-slate-900/90 hover:bg-slate-800 text-xs font-bold text-slate-200 transition-all flex items-center justify-center sm:gap-1.5 cursor-pointer shadow-sm hover:border-amber-400/60 active:scale-95 shrink-0"
            aria-label={isAr ? 'التحويل للإنجليزية' : 'Switch to Arabic'}
            title={isAr ? 'English' : 'العربية'}
          >
            <Globe className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="hidden sm:inline font-mono text-xs">{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* WhatsApp Quote CTA - Compact on Mobile */}
          <a
            href={headerWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-bold text-[11px] sm:text-xs md:text-sm shadow-[0_0_15px_rgba(220,38,38,0.35)] hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="inline sm:hidden">{isAr ? 'عرض سعر' : 'Quote'}</span>
            <span className="hidden sm:inline">{isAr ? 'احصل على عرض سعر' : 'Get Custom Quote'}</span>
          </a>

          {/* Mobile Menu Toggle ("القائمة التلاتراير") - Always Visible & Clearly Positioned */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl bg-slate-900 border border-amber-500/30 hover:bg-slate-800 text-slate-200 cursor-pointer shrink-0 active:scale-95 transition-all shadow-sm"
            aria-label={isAr ? 'فتح القائمة الرئيسية' : 'Toggle navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-amber-400" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-amber-500/20 bg-[#0B0F19]/98 px-5 py-4 space-y-3 backdrop-blur-2xl shadow-2xl animate-in fade-in duration-200">
          <button
            onClick={() => handleNavClick('other-services')}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 font-bold cursor-pointer text-start"
          >
            <span className="flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-amber-400" />
              <span>{isAr ? 'الخدمات والأنظمة الأخرى' : 'Other Systems & Services'}</span>
            </span>
            <ArrowRight className="w-4 h-4 text-amber-400 rtl:rotate-180" />
          </button>

          <button
            onClick={() => handleNavClick('home')}
            className="w-full block py-2 text-start text-slate-200 font-semibold hover:text-amber-300 cursor-pointer"
          >
            {isAr ? 'المتاجر الإلكترونية والمواقع' : 'E-Commerce & Websites'}
          </button>

          <button
            onClick={() => handleNavClick('home', 'client-work')}
            className="w-full block py-2 text-start text-slate-200 font-semibold hover:text-amber-300 cursor-pointer"
          >
            {isAr ? 'سابقة الأعمال الحية' : 'Live Client Work'}
          </button>

          <button
            onClick={() => handleNavClick('home', 'store-demos')}
            className="w-full block py-2 text-start text-slate-200 font-semibold hover:text-amber-300 cursor-pointer"
          >
            {isAr ? 'المتاجر الإلكترونية الحية' : 'Live Turnkey Stores'}
          </button>

          <button
            onClick={() => handleNavClick('home', 'store-features')}
            className="w-full block py-2 text-start text-slate-200 font-semibold hover:text-amber-300 cursor-pointer"
          >
            {isAr ? 'مواصفات ومعمارية المتجر' : 'Store Specs & Features'}
          </button>

          <button
            onClick={() => handleNavClick('home', 'faq')}
            className="w-full block py-2 text-start text-slate-200 font-semibold hover:text-amber-300 cursor-pointer"
          >
            {isAr ? 'الأسئلة الشائعة وتحديد التكلفة' : 'FAQ & Pricing Model'}
          </button>

          <div className="pt-3 border-t border-slate-800 space-y-2.5">
            {/* Sales Department */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-amber-300 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{isAr ? 'المبيعات (الخط الأساسي):' : 'Sales Dept (Primary):'}</span>
              </span>
              <a
                href={TEAM_CONTACTS.sales.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 font-mono font-bold flex items-center gap-1 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                <span dir="ltr">01205798302</span>
              </a>
            </div>

            {/* Eng. Mostafa - Lead Software Engineer */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>{isAr ? 'م/ مصطفى (المبرمج الرئيسي):' : 'Eng. Mostafa (Lead Dev):'}</span>
              </span>
              <a
                href={TEAM_CONTACTS.engMostafa.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 font-mono font-bold flex items-center gap-1 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span dir="ltr">01107787049</span>
              </a>
            </div>

            {/* Eng. Ammar - Executive Management */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>{isAr ? 'م/ عمار (الإدارة):' : 'Eng. Ammar (Management):'}</span>
              </span>
              <a
                href={TEAM_CONTACTS.engAmmar.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-mono font-bold flex items-center gap-1 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span dir="ltr">01555668194</span>
              </a>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
              <a
                href="https://www.facebook.com/profile.php?id=61595189300053&locale=ar_AR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-400 flex items-center gap-1"
              >
                <span>{isAr ? 'صفحة الفيسبوك الرسمية' : 'Official Facebook Page'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
