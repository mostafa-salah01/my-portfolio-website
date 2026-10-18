import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, PhoneCall, ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

interface AiChatWidgetProps {
  lang: 'ar' | 'en';
}

const QUICK_PROMPTS_AR = [
  'كيف يتم تحديد أسعار المشاريع؟',
  'ما مميزات برمجة المتجر من الصفر؟',
  'تفاصيل موقع الشركات ثنائي اللغة',
  'كيف يعمل موظف الذكاء الاصطناعي؟',
  'تواصل مع مهندس عبر واتساب'
];

const QUICK_PROMPTS_EN = [
  'How is project pricing determined?',
  'Benefits of custom e-commerce stores?',
  'Bilingual corporate website details',
  'How does the AI employee work?',
  'Connect with engineer on WhatsApp'
];

export const AiChatWidget: React.FC<AiChatWidgetProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUserClosed, setHasUserClosed] = useState(false);
  const [showHesitationPrompt, setShowHesitationPrompt] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const lastActivityRef = useRef(Date.now());
  const autoOpenTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: lang === 'ar'
        ? `أهلاً بك يا فندم في شركة WebStack للحلول البرمجية! 👋\nأنا "أحمد"، مساعدك الذكي وموظف خدمة العملاء والدعم الفني.\n\nفي WebStack نؤمن بأن: "كل عميل له نظامه الخاص" — نبني متاجرك وأنظمتك ومواقعك مخصصة بالكامل من الصفر 100% بدون قوالب جاهزة و0% عمولات على مبيعاتك.\n\nكيف يمكنني مساعدتك اليوم؟`
        : `Welcome to WebStack Software Solutions! 👋\nI'm Ahmed, your smart customer service and technical assistant.\n\nAt WebStack, "Every client has their own dedicated system" — custom-built 100% from scratch with zero template bloat and 0% sales commission.\n\nHow can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // 1. Auto-open after 2 minutes (120,000 ms) with warm greeting if user hasn't closed it
  useEffect(() => {
    autoOpenTimerRef.current = setTimeout(() => {
      setIsOpen((alreadyOpen) => {
        if (!alreadyOpen && !hasUserClosed) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === 'auto-2min-greeting')) return prev;
            return [
              ...prev,
              {
                id: 'auto-2min-greeting',
                role: 'assistant',
                content:
                  lang === 'ar'
                    ? 'أهلاً بك مجدداً يا فندم! 👋\nأنا أحمد، موظف المبيعات والدعم الفني في WebStack.\n\nلاحظت تصفحك لخدماتنا وسابقة أعمالنا.. يسعدني مساعدتك في اختيار الباقة الأنسب لمشروعك، أو حساب التكلفة الدقيقة لمتجرك أو موقعك المخصص من الصفر 100% بدون أي قوالب معلبة! كيف يمكنني مساعدتك؟'
                    : 'Hello again! 👋\nI am Ahmed, your dedicated WebStack support & sales engineer.\n\nI noticed you browsing our solutions.. Would you like any assistance regarding your custom website or store project?',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ];
          });
          return true;
        }
        return alreadyOpen;
      });
    }, 120000); // 2 minutes

    return () => {
      if (autoOpenTimerRef.current) clearTimeout(autoOpenTimerRef.current);
    };
  }, [hasUserClosed, lang]);

  // 2. Track activity and detect hesitation/idle if user closed chat
  useEffect(() => {
    const recordActivity = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener('mousemove', recordActivity, { passive: true });
    window.addEventListener('scroll', recordActivity, { passive: true });
    window.addEventListener('keydown', recordActivity, { passive: true });
    window.addEventListener('click', recordActivity, { passive: true });

    idleCheckIntervalRef.current = setInterval(() => {
      if (hasUserClosed && !isOpen && !showHesitationPrompt) {
        const idleDuration = Date.now() - lastActivityRef.current;
        // User has been idle / hesitant on the page for 50 seconds after closing
        if (idleDuration >= 50000) {
          setShowHesitationPrompt(true);
        }
      }
    }, 10000);

    return () => {
      window.removeEventListener('mousemove', recordActivity);
      window.removeEventListener('scroll', recordActivity);
      window.removeEventListener('keydown', recordActivity);
      window.removeEventListener('click', recordActivity);
      if (idleCheckIntervalRef.current) clearInterval(idleCheckIntervalRef.current);
    };
  }, [hasUserClosed, isOpen, showHesitationPrompt]);

  const generateLocalResponse = (text: string): string => {
    const lower = text.toLowerCase();
    const isEn = lang === 'en' || (/^[a-zA-Z0-9\s.,?!'"@#$%^&*()_+-=:;/<>]+$/.test(text.trim()) && !/[\u0600-\u06FF]/.test(text));

    if (lower.includes('متجر') || lower.includes('متاجر') || lower.includes('ecommerce') || lower.includes('store') || lower.includes('شوب') || lower.includes('دفع')) {
      if (isEn) {
        return `Hello! 🛍️ WebStack's Custom E-Commerce Store Solution is handcrafted from scratch:\n\n1. 100% Clean Code: Built with PHP 8+ and MySQL relational database, giving you 100% code ownership and 0% sales commission.\n2. Payment Integrations: Mada, Visa, Apple Pay, Tabby, Tamara, InstaPay, PayPal & Cash-on-Delivery.\n3. Operations Hub: Real-time inventory sync, PDF waybills & invoices, and discount coupons.\n4. Official Domain & Fast SSD Cloud Hosting included.\n\nPricing is tailored to your required catalog and features. Contact our team on WhatsApp (+201107787049) for a free consultation and custom quote! 🚀`;
      }
      return `أهلاً بحضرتك يا فندم! 🛍️ في WebStack بنقدملك خدمة إنشاء المتاجر الإلكترونية المخصصة:\n\n1. برمجة من الصفر 100%: المتجر يُبنى بالكامل بلغة PHP وقواعد بيانات MySQL بدون قوالب ووردبريس أو منصات مؤجرة تقتطع عمولات.\n2. بوابات الدفع: ربط مدى، فيزا، أبل باي، تابي، تمارا، إنستاباي، والمحافظ والدفع عند الاستلام.\n3. لوحة تحكم ذكية لإدارة المخزون، المنتجات، الفواتير، وبوالص الشحن PDF.\n4. دومين رسمي + استضافة سحابية فائقة السرعة SSD + عقد دعم فني مستمر.\n\nالتكلفة تتحدد بدقة حسب ميزات نشاطك. تفضل بمراسلتنا على واتساب (+201107787049) لمناقشة مشروعك والحصول على استشارة مجانية وعرض سعر مخصص! 🚀`;
    }

    if (lower.includes('سعر') || lower.includes('باقة') || lower.includes('تكلفة') || lower.includes('كام') || lower.includes('price') || lower.includes('cost') || lower.includes('quote')) {
      if (isEn) {
        return `At WebStack, "Every client has their own dedicated system".\n\nBecause we build 100% custom from scratch without rigid pre-made templates, pricing is tailored to your exact scope, features, and integrations.\n\nChat with our team on WhatsApp at +201107787049 for an instant free consultation and tailored quotation! 🚀`;
      }
      return `أهلاً بحضرتك يا فندم! 🌟\nفي WebStack مبدأنا الأساسي: "كل عميل له نظامه الخاص".\n\nلأن كل متجر أو موقع أو نظام بنبنيه من الصفر 100% بدون قوالب جاهزة، فإن التكلفة بتختلف حسب متطلبات مشروعك بدقة والمميزات المطلوبة.\n\nتفضل بالتواصل معنا مباشرة عبر واتساب (+201107787049) وسنكون سعداء بمناقشة فكرتك وتقديم استشارة مجانية وعرض سعر مخصص ودقيق! 🚀`;
    }

    if (lower.includes('موقع') || lower.includes('شركات') || lower.includes('تعريفي') || lower.includes('website') || lower.includes('corporate')) {
      if (isEn) {
        return `WebStack Corporate Websites are engineered for enterprise credibility:\n• Full bilingual support: Arabic and English fully integrated together.\n• High-speed SSD cloud hosting with free SSL certificate.\n• 100% responsive on all mobile, tablet, and PC screens.\n• Direct WhatsApp lead conversion buttons.\n\nMessage our engineering team on WhatsApp (+201107787049) for a custom quotation! 🚀`;
      }
      return `يا هلا بحضرتك! 🌐\nباقة تصميم المواقع التعريفية للشركات من WebStack بتوفر لك واجهة رقمية تعكس قوة شركتك:\n• دعم كامل للغتين (العربية والإنجليزية معاً) بتنسيق راقٍ ومتجاوب.\n• استضافة سحابية فائقة السرعة SSD مع شهادة أمان SSL.\n• ربط مباشر مع محادثات واتساب لتحويل الزوار لعملاء.\n\nتفضل بالتواصل معنا على واتساب (+201107787049) للحصول على عرض سعر مخصص لموقع شركتك! 🚀`;
    }

    if (lower.includes('ذكاء') || lower.includes('ai') || lower.includes('واتساب') || lower.includes('whatsapp') || lower.includes('بوت') || lower.includes('bot')) {
      if (isEn) {
        return `WebStack AI Employees for WhatsApp & Telegram work 24/7:\n• Natural and friendly tone with polite human escalation.\n• Dispatches product photos, specification sheets, and PDF quotations directly in chat.\n• Direct synchronization with your CRM, Google Sheets, and databases.\n\nConnect on WhatsApp (+201107787049) to customize an AI employee for your business! 🚀`;
      }
      return `يا هلا بحضرتك يا فندم! 🤖\nموظف الذكاء الاصطناعي من WebStack للواتساب وتلجرام بيساعدك على مدار الساعة:\n• ردود طبيعية وودودة 24/7 بلهجة تناسب طبيعة عملائك، مع تحويل العميل للموظف البشري عند الحاجة.\n• إرسال فوري لكتالوجات المنتجات وعروض الأسعار الرسمية PDF وصور المنتجات داخل الشات.\n• تسجيل فوري للطلبات والبيانات في جداول Google وقواعد البيانات.\n\nتواصل معنا على واتساب (+201107787049) لمعرفة التفاصيل وتجربة النظام لنشاطك! 🚀`;
    }

    if (lower.includes('شحن') || lower.includes('لوجست') || lower.includes('shipping') || lower.includes('courier')) {
      if (isEn) {
        return `Our Smart Shipping & Courier Management Platform features:\n• Printable PDF waybills with high-density barcodes & QR codes.\n• Driver proof-of-delivery mobile interface with signatures.\n• Live tracking portal with automated WhatsApp/SMS customer updates.\n• Cash-on-Delivery (COD) financial reconciliation ledger.\n\nContact us on WhatsApp (+201107787049) for a live preview and consultation! 🚀`;
      }
      return `أهلاً بحضرتك! 🚚\nسيستم الشحن واللوجستيات من WebStack بيوفر لك:\n• إصدار بوالص شحن PDF مع باركود وQR متوافق قياسياً.\n• شاشات للمناديب لتسجيل الاستلام وإثبات التسليم والتوقيع.\n• بوابة تتبع حية للعميل مع إشعارات واتساب لحظية.\n• تسوية دقيقة لمبالغ التحصيل عند الاستلام (COD) والمطابقات البنكية.\n\nتفضل بالتواصل معنا على واتساب (+201107787049) لمناقشة تفاصيل نظامك! 🚀`;
    }

    if (isEn) {
      return `Welcome to WebStack! 👋 I'm Ahmed, your smart assistant.\nAt WebStack, "Every client has their own dedicated system" — custom-built with clean code:\n1. Custom E-Commerce Stores (PHP & MySQL, all payment gateways, 0% commissions).\n2. Corporate Bilingual Websites (Arabic & English, fast hosting, SSL).\n3. Natural AI Employees (WhatsApp & Telegram 24/7).\n4. Smart Shipping & Courier Logistics Platforms.\n5. Custom Mobile Apps & POS Systems.\n\nHow can I help you today? You can also message our team directly on WhatsApp (+201107787049) for a custom quotation! 🚀`;
    }

    return `أهلاً بحضرتك يا فندم في شركة WebStack للحلول البرمجية! 👋\nأنا أحمد، مساعدك الذكي:\n\nفي WebStack نؤمن بأن: "كل عميل له نظامه الخاص":\n1. المتاجر الإلكترونية المخصصة: برمجة من الصفر بلغة PHP وقواعد بيانات MySQL بدون قوالب جاهزة و0% عمولات على مبيعاتك.\n2. المواقع الإلكترونية للشركات: تصميم احترافي باللغتين العربية والإنجليزية مع سرعة عالية واستضافة سحابية مؤمنة.\n3. موظفو الذكاء الاصطناعي: ردود طبيعية على مدار الساعة وإرسال ملفات وكتالوجات وعروض أسعار PDF مع تحويل للموظف البشري.\n4. سيستمات الشحن واللوجستيات: إصدار بوالص الشحن، تتبع المناديب، وتسوية تحصيل الـ COD.\n5. تطبيقات الموبايل وأنظمة الكاشير POS وإدارة الشركات.\n\nأي هذه الحلول ترغب في الاستفسار عنها؟ ويمكنك دائماً التواصل مباشرة مع مهندسينا عبر واتساب على (+201107787049) لاستلام عرض سعر مخصص! 🚀`;
  };

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages((prev) => [...prev, aiMsg]);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // API call offline or errored, proceed to built-in smart response
    }

    // Fallback: local engine
    setTimeout(() => {
      const reply = generateLocalResponse(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const whatsappEscalationUrl = `https://wa.me/201107787049?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً فريق WebStack، أود التحدث مع مهندس متخصص بخصوص مشروعي البرمجي وطلب استشارة وعرض سعر مخصص.'
      : 'Hello WebStack team, I would like to speak directly with an engineer for a free consultation and custom quotation.'
  )}`;

  return (
    <>
      {/* Hesitation Prompt: Appears on the right ONLY if user closed chat and has been stuck / hesitant */}
      {showHesitationPrompt && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50 max-w-xs sm:max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-300 !left-auto">
          <div className="bg-[#0B0F19] text-white p-3.5 rounded-2xl border border-amber-400/60 shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative">
            <button
              onClick={() => setShowHesitationPrompt(false)}
              className="absolute top-2.5 start-2.5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close prompt"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#DC2626] to-[#D97706] flex items-center justify-center shrink-0 mt-0.5 text-white shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div className="text-xs pe-4">
                <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <span>{lang === 'ar' ? 'هل محتار في خطوتك القادمة؟' : 'Need help with your next step?'}</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed mb-2.5">
                  {lang === 'ar'
                    ? 'أنا هنا لمساعدتك! تفضل بسؤالي عن أي استفسار أو لمعرفة تكلفة مشروعك بدقة بدون أي التزام.'
                    : 'I am here to help! Ask me anything about your project requirements or get a quick tailored cost estimate.'}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowHesitationPrompt(false);
                      setIsOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#D97706] text-white text-[11px] font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    {lang === 'ar' ? 'تحدث مع أحمد الآن' : 'Chat with Ahmed'}
                  </button>
                  <button
                    onClick={() => setShowHesitationPrompt(false)}
                    className="px-2.5 py-1.5 rounded-xl text-slate-400 hover:text-white text-[11px] transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'لاحقاً' : 'Later'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button (Always anchored to the RIGHT) */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowHesitationPrompt(false);
          }}
          className="fixed bottom-6 right-6 z-50 !left-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#D97706] text-white font-bold text-sm shadow-[0_10px_30px_rgba(220,38,38,0.4)] border border-amber-400/40 hover:scale-105 transition-all group cursor-pointer"
          aria-label="Open AI Customer Service"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-200" />
            <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse"></span>
          </div>
          <div className="flex flex-col text-start leading-tight">
            <span className="text-[13px] font-extrabold flex items-center gap-1">
              <span>{lang === 'ar' ? 'أحمد · المساعد الذكي' : 'Ahmed · AI Assistant'}</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </span>
            <span className="text-[10px] text-amber-200/90 font-mono">WebStack Support</span>
          </div>
        </button>
      )}

      {/* Chat Window Modal (Always anchored to the RIGHT) */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 !left-auto w-[95vw] sm:w-[410px] h-[580px] max-h-[85vh] rounded-2xl bg-[#0B0F19] border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-900 to-[#1A1215] border-b border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#DC2626] to-[#D97706] flex items-center justify-center text-white ring-1 ring-amber-400/50 shadow-md">
                <Bot className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -end-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-900"></span>
              </div>
              <div>
                <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>{lang === 'ar' ? 'أحمد · موظف دعم WebStack' : 'Ahmed · WebStack Support'}</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/20 border border-amber-400/30 text-amber-300">
                    AI
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{lang === 'ar' ? 'متصل الآن · رد فوري 24/7' : 'Online · Instant 24/7 replies'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setHasUserClosed(true);
                  setShowHesitationPrompt(false);
                  lastActivityRef.current = Date.now();
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Info Banner */}
          <div className="bg-amber-500/10 border-b border-amber-500/15 px-3 py-1.5 flex items-center justify-between text-[11px] text-amber-200/90 font-medium">
            <span>{lang === 'ar' ? '⚡ كل عميل له نظامه الخاص — برمجة من الصفر' : '⚡ Every client has their own custom system'}</span>
            <a
              href={whatsappEscalationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>{lang === 'ar' ? 'واتساب مباشر' : 'WhatsApp'}</span>
            </a>
          </div>

          {/* Message History */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 scrollbar-thin">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#DC2626] to-[#D97706] flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white rounded-te-none border border-red-500/30'
                      : 'bg-slate-900/90 text-slate-200 rounded-ts-none border border-amber-500/20 whitespace-pre-line'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.content}</p>
                  <span className={`block text-[9px] mt-1.5 opacity-60 font-mono ${m.role === 'user' ? 'text-end text-red-200' : 'text-start text-slate-400'}`}>
                    {m.timestamp}
                  </span>
                </div>

                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#DC2626] to-[#D97706] flex items-center justify-center text-white shrink-0 mt-1">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-slate-900 border border-amber-500/20 rounded-2xl rounded-ts-none px-4 py-3 text-xs text-amber-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.3s]"></span>
                  <span className="text-[11px] font-mono ms-1">{lang === 'ar' ? 'أحمد يكتب الرد...' : 'Ahmed is replying...'}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2 border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {(lang === 'ar' ? QUICK_PROMPTS_AR : QUICK_PROMPTS_EN).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(prompt)}
                className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/25 text-slate-300 hover:text-amber-300 text-[11px] font-medium transition-colors shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-950 border-t border-amber-500/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={lang === 'ar' ? 'اكتب استفسارك هنا...' : 'Type your question here...'}
                className="flex-1 bg-slate-900 border border-amber-500/30 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#DC2626] to-[#D97706] text-white flex items-center justify-center disabled:opacity-50 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 px-1">
              <span>{lang === 'ar' ? 'WebStack AI Support Engine' : 'WebStack AI Support Engine'}</span>
              <a
                href={whatsappEscalationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
              >
                <span>{lang === 'ar' ? 'تحويل للموظف البشري' : 'Human Escalation'}</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
