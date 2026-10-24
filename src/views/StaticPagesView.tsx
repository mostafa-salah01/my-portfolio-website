import React from 'react';
import { ArrowLeft, ShieldCheck, FileText, Users, DollarSign, CheckCircle2, MessageCircle } from 'lucide-react';
import {
  AmbientBackgroundGlow,
  AlternatingCardReveal,
  TypewriterHeading,
  TypewriterText
} from '../components/AnimatedVisuals';

interface StaticPagesViewProps {
  pageType: 'partner-program' | 'privacy' | 'terms';
  lang: 'ar' | 'en';
  onNavigate: (tab: string, anchor?: string) => void;
}

export const StaticPagesView: React.FC<StaticPagesViewProps> = ({ pageType, lang, onNavigate }) => {
  const isAr = lang === 'ar';

  if (pageType === 'partner-program') {
    const partnerWhatsapp = `https://wa.me/201555668194?text=${encodeURIComponent(
      isAr
        ? 'مرحباً م/ عمار (الإدارة)، أود الانضمام لبرنامج شركاء المبيعات والعمولة وبدء تسويق الحلول البرمجية.'
        : 'Hello Eng. Ammar (Management), I would like to join the Sales Partner Program and market your software solutions.'
    )}`;

    return (
      <div className="relative z-10 pt-28 pb-20">
        <AmbientBackgroundGlow />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-amber-300 transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </button>

          <div className="rounded-3xl bg-[#0B0F19] border border-amber-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
              <Users className="w-4 h-4" />
              <span>{isAr ? 'شراكة النجاح' : 'Sales Partner Program'}</span>
            </div>

            <TypewriterHeading
              as="h1"
              text={isAr ? 'برنامج شركاء المبيعات والتسويق بالعمولة' : 'Freelance Sales Partner Program'}
              startTrigger={true}
              speed={28}
              className="text-2xl sm:text-4xl font-black text-white mb-4"
            />

            <p className="text-slate-300 leading-relaxed mb-8 min-h-[50px]">
              <TypewriterText
                text={isAr
                  ? 'هل لديك شبكة علاقات مع أصحاب الأعمال، التجار، أو الشركات؟ انضم الآن كشريك مبيعات معتمد لشركة WebStack، وسوّق حلول المتاجر الإلكترونية، مواقع الشركات، وموظفي الذكاء الاصطناعي مع عمولات مجزية وفورية عن كل تعاقد.'
                  : 'Do you have connections with business owners and merchants? Join WebStack as an authorized freelance sales partner and earn lucrative commissions on every closed software contract.'}
                startTrigger={true}
                speed={16}
                delay={200}
              />
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <AlternatingCardReveal index={0} isParentVisible={true} staggerDelayMs={100}>
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all h-full">
                  <div className="text-amber-400 font-bold text-lg mb-1 font-mono">01</div>
                  <div className="text-white font-bold text-sm mb-1">{isAr ? 'عمولات مباشرة' : 'Direct Payouts'}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{isAr ? 'نسبة عمولة فورية عند إتمام التعاقد' : 'Immediate payout upon deal closure'}</div>
                </div>
              </AlternatingCardReveal>

              <AlternatingCardReveal index={1} isParentVisible={true} staggerDelayMs={100}>
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all h-full">
                  <div className="text-emerald-400 font-bold text-lg mb-1 font-mono">02</div>
                  <div className="text-white font-bold text-sm mb-1">{isAr ? 'دعم فني كامل' : 'Technical Backing'}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{isAr ? 'فريقنا الهندسي يتولى كل التفاصيل' : 'Our engineers handle specs & delivery'}</div>
                </div>
              </AlternatingCardReveal>

              <AlternatingCardReveal index={2} isParentVisible={true} staggerDelayMs={100}>
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/30 transition-all h-full">
                  <div className="text-rose-400 font-bold text-lg mb-1 font-mono">03</div>
                  <div className="text-white font-bold text-sm mb-1">{isAr ? 'شفافية ومتابعة' : 'Transparent CRM'}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{isAr ? 'متابعة لحظية لحالة كل عميل' : 'Live updates on client progress'}</div>
                </div>
              </AlternatingCardReveal>
            </div>

            <div className="text-center pt-4">
              <a
                href={partnerWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{isAr ? 'تواصل معنا للانضمام كشريك مبيعات' : 'Join as Sales Partner via WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Privacy Policy & Terms of Service View
  const isPrivacy = pageType === 'privacy';
  return (
    <div className="relative z-10 pt-28 pb-20">
      <AmbientBackgroundGlow />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-amber-300 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
        </button>

        <div className="rounded-3xl bg-[#0B0F19] border border-amber-500/30 p-8 sm:p-12 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>WebStack Legal & Security</span>
          </div>

          <TypewriterHeading
            as="h1"
            text={isPrivacy
              ? (isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy & Data Protection Policy')
              : (isAr ? 'الشروط والأحكام العامة' : 'Terms & Conditions of Service')}
            startTrigger={true}
            speed={28}
            className="text-2xl sm:text-4xl font-black text-white mb-6"
          />

          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            {isPrivacy ? (
              <>
                <p>
                  {isAr
                    ? 'في شركة WebStack للحلول البرمجية، نولي سرية وأمان بيانات عملائنا وشركائنا الأولوية القصوى. نحن نضمن عدم مشاركة أي بيانات حساسة أو قواعد بيانات أو بيانات تجارية مع أي أطراف ثالثة دون إذن كتابي مسبق.'
                    : 'At WebStack Software Solutions, we prioritize customer confidentiality and data security. We guarantee that no client data, databases, or trade secrets are shared with third parties.'}
                </p>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-base font-bold text-amber-300 mb-2">{isAr ? '1. ملكية البيانات والكود' : '1. Data and Code Ownership'}</h3>
                  <p>
                    {isAr
                      ? 'يمتلك العميل الكود المصدري للمشروع وقاعدة البيانات واسم النطاق بمجرد اكتمال التسليم وتسوية المستحقات المالية المتفق عليها.'
                      : 'The client receives full ownership of their project source code, database, and domain upon completion and project sign-off.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-base font-bold text-amber-300 mb-2">{isAr ? '2. التشفير والحماية السحابية' : '2. Encryption & Security'}</h3>
                  <p>
                    {isAr
                      ? 'نطبق أعلى معايير الأمان وتشفير شهادات SSL (TLS 1.3)، والتحقق من التوقيع المشفر في جميع واجهات برمجة التطبيقات (APIs).'
                      : 'All web traffic and database connections are encrypted using modern TLS standards and secure tokens.'}
                  </p>
                </div>
              </>
            ) : (
              <>
                <p>
                  {isAr
                    ? 'تسري هذه الشروط على جميع المشاريع والخدمات البرمجية التي تقدمها شركة WebStack. يتم تحديد نطاق العمل والميزات المتفق عليها في عقد المشروع الاستشاري قبل البدء.'
                    : 'These terms apply to all custom development, e-commerce, and software services delivered by WebStack.'}
                </p>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-base font-bold text-amber-300 mb-2">{isAr ? '1. نطاق العمل والتسليم' : '1. Project Scope & Handover'}</h3>
                  <p>
                    {isAr
                      ? 'يتم تسليم المشروع مع استضافة سحابية وتجهيز الدومين ولوحة التحكم، مع فترة فحص واختبار دقيقة لضمان عمل كافة الوظائف.'
                      : 'Projects are delivered on cloud infrastructure with dedicated domain linkage and comprehensive testing verification.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <h3 className="text-base font-bold text-amber-300 mb-2">{isAr ? '2. الدعم الفني والصيانة' : '2. Maintenance & Ongoing Support'}</h3>
                  <p>
                    {isAr
                      ? 'تشمل كافة باقاتنا عقود دعم فني ومتابعة دورية لحل أي استفسارات أو تحديثات تقنية طارئة.'
                      : 'All packages include active maintenance contracts to handle technical inquiries and ensure uptime.'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
