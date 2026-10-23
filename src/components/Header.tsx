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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-start group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#DC2626] via-[#B91C1C] to-[#D97706] flex items-center justify-center font-mono font-bold text-white text-base shadow-[0_0_20px_rgba(220,38,38,0.45)] ring-1 ring-amber-400/40 group-hover:scale-105 transition-transform shrink-0">
            &gt;_
          </div>
          <div className="flex flex-col justify-center">
            <div className="font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
              <span className="font-sans">WebStack</span>
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
            </div>
            <div className="text-[11px] text-amber-200/80 font-medium leading-none">
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

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className="h-10 px-3.5 rounded-xl border border-amber-500/25 bg-slate-900/80 hover:bg-slate-800 text-xs font-bold text-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:border-amber-400/50"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* WhatsApp Quote CTA */}
          <a
            href={headerWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(220,38,38,0.35)] hover:scale-105 transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">{isAr ? 'احصل على عرض سعر' : 'Get Custom Quote'}</span>
            <span className="sm:hidden">{isAr ? 'عرض سعر' : 'Quote'}</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900 border border-amber-500/25 hover:bg-slate-800 text-slate-200 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
