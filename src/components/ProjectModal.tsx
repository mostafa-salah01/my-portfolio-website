import React from 'react';
import { X, ExternalLink, CheckCircle2, MessageCircle, Layers, Sparkles } from 'lucide-react';
import { ProjectItem } from '../data/projects';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, lang }) => {
  if (!project) return null;

  const isAr = lang === 'ar';
  const title = isAr ? project.titleAr : project.titleEn;
  const tagline = isAr ? project.taglineAr : project.taglineEn;
  const metrics = isAr ? project.metricsAr : project.metricsEn;
  const features = isAr ? project.featuresAr : project.featuresEn;
  const categoryLabel = isAr ? project.categoryLabelAr : project.categoryLabelEn;

  const whatsappUrl = `https://wa.me/201205798302?text=${encodeURIComponent(project.whatsappMsg)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0B0F19] border border-amber-500/30 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-amber-500/20 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
              {categoryLabel}
            </span>
            {project.badge && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[11px] font-bold">
                {project.badge}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Showcase Image */}
          <div 
            className={`relative rounded-xl overflow-hidden border border-amber-500/20 bg-slate-950 aspect-video max-h-72 w-full group ${project.liveUrl ? 'cursor-pointer' : ''}`}
            onClick={() => {
              if (project.liveUrl) {
                window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
              }
            }}
            title={project.liveUrl ? (isAr ? 'اضغط لفتح المتجر أو الموقع الحي مباشرة' : 'Click to open live site') : undefined}
          >
            <img
              src={project.image}
              alt={title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/ecommerce_store_main.jpg';
              }}
            />
            {project.liveUrl && (
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-bold text-xs flex items-center gap-1.5 shadow-xl">
                  <span>{isAr ? 'اضغط لفتح المتجر الحي ↗' : 'Click to Open Live Store ↗'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            )}
            <div className="absolute bottom-3 start-3 z-10 pointer-events-none">
              <span className="text-xs font-mono font-bold text-amber-300 bg-slate-950/85 px-3 py-1 rounded-lg border border-amber-500/30">
                {metrics}
              </span>
            </div>
          </div>

          {/* Titles & Tagline */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Key Features */}
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
            <h3 className="text-sm font-bold text-amber-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'أبرز مميزات ومواصفات المشروع' : 'Key Specifications & Highlights'}</span>
            </h3>
            <div className="space-y-2.5">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider font-mono">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'التقنيات والبنية البرمجية' : 'Technology Stack & Architecture'}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-500/20 text-amber-200 text-xs font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 sm:p-5 border-t border-amber-500/20 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white font-bold text-xs sm:text-sm border border-amber-500/30 transition-all shadow-sm cursor-pointer"
            >
              <span>{isAr ? 'معاينة المتجر / الموقع الحي' : 'Visit Live Showcase'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="text-xs text-slate-400 font-mono">
              {isAr ? 'حل برمجي مخصص من الصفر' : '100% Bespoke Solution'}
            </span>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(220,38,38,0.35)] hover:scale-105 transition-transform cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isAr ? 'اطلب نفس النظام عبر واتساب' : 'Request Similar System on WhatsApp'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
