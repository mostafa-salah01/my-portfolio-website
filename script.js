/**
 * Mostafa Salah Portfolio - Pure Vanilla JavaScript Engine
 * Zero dependencies, ultra-fast, cross-browser compatible
 */

(function () {
  'use strict';

  // --- Safe Storage Helpers (Zero crashes in restricted iframes / privacy mode) ---
  function safeGetStorage(key, fallback) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const val = window.localStorage.getItem(key);
        return val !== null ? val : fallback;
      }
    } catch (e) {
      // Storage unavailable or blocked
    }
    return fallback;
  }

  function safeSetStorage(key, value) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      // Storage blocked
    }
  }

  // --- State ---
  let currentLang = safeGetStorage('portfolio_lang', 'ar');
  let currentTheme = safeGetStorage('portfolio_theme', 'dark');
  let activeCategory = 'all';

  // --- Project Data Dictionary for Modals & Details ---
  const PROJECTS_DATA = {
    'corporate-website-package': {
      pageUrl: 'corporate-website.html',
      titleEn: 'Professional Corporate Website Design & Setup',
      titleAr: 'تصميم وإعداد موقع تعريفي احترافي للشركات',
      taglineEn: 'Bilingual (Arabic & English Included) · $65 USD (.uk) / $75 USD (.com) · $40/year Fixed Annual Renewal',
      taglineAr: 'دعم كامل للغتين (عربي وإنجليزي معاً مشمولان) · 65$ (دومين uk.) أو 75$ (دومين com.) · 40$ تجديد سنوي ثابت',
      image: 'assets/images/watermarked_img_3971138867213192952.jpg',
      category: 'web-development',
      metricsEn: '$65 USD (.uk) / $75 USD (.com) · Bilingual AR/EN Included · Renewal: $40/Year',
      metricsAr: '65$ (دومين uk.) / 75$ (دومين com.) · اللغتان معاً مشمولتان · التجديد: 40$ سنوياً',
      tech: ['Bilingual AR/EN Included (اللغتان معاً)', 'Option 1: .uk Domain ($65)', 'Option 2: .com Domain ($75)', 'High-Speed Cloud Hosting + SSL', 'WhatsApp Direct CTA', 'Fixed Renewal $40/Year'],
      featuresEn: [
        'Full bilingual support included: professional site architecture and content in both Arabic and English together within the base price',
        'Domain Choice 1 (.uk): Base package at $65 USD for the first year with official .uk domain included',
        'Domain Choice 2 (.com): Corporate package at $75 USD for the first year with official .com domain included',
        'Multi-page responsive UI: 100% optimized for mobile, tablet, and desktop screens with ultra-fast performance',
        'High-speed cloud hosting + SSL: fast SSD cloud hosting with free security SSL certificate included in year one',
        'Direct WhatsApp integration: interactive smart buttons connecting customer inquiries instantly to WhatsApp',
        'Ongoing technical support & maintenance: active support and rapid updates (Saturday to Thursday)',
        'Fixed annual renewal: $40 USD / year for all packages (includes domain renewal + technical support & daily maintenance + hosting)'
      ],
      featuresAr: [
        'دعم كامل للغتين ضمن السعر الأساسي: إعداد وتصميم الموقع باللغتين (العربية والإنجليزية معاً) دون أي تكلفة إضافية',
        'خيار الدومين الأول (.uk): الباقة الأساسية بسعر 65 دولار للسنة الأولى مع دومين uk. رسمي مشمول',
        'خيار الدومين الثاني (.com): باقة الشركات بسعر 75 دولار للسنة الأولى عند اختيار دومين com. رسمي',
        'تصميم متعدد الصفحات ومستجيب: متوافق بالكامل مع جميع الشاشات (موبايل، تابلت، وكمبيوتر) بسرعة تحميل فائقة',
        'استضافة سحابية فائقة السرعة والأمان (SSL): استضافة سحابية مؤمنة بشهادة أمان SSL مجاناً للسنة الأولى',
        'ربط مباشر بالواتساب: أزرار تواصل تفاعلية ذكية لتحويل استفسارات العملاء مباشرة لمحادثة واتساب',
        'دعم فني وصيانة يومية مستمرة: متابعة مستمرة وتحديثات سريعة وإصلاحات تقنية فورية (من السبت إلى الخميس)',
        'تجديد سنوي ثابت: 40 دولار سنوياً لجميع الباقات (شامل تجديد الدومين + الصيانة والدعم الفني + الاستضافة السحابية)'
      ],
      whatsappMsg: 'مرحباً مصطفى أود الاستفسار وحجز باقة تصميم موقع تعريفي للشركات (65$ بدومين uk. أو 75$ بدومين com.)'
    },
    'whatsapp-ai-employee': {
      pageUrl: 'whatsapp-ai-employee.html',
      titleEn: 'Human-Like AI Sales & Support Employee for WhatsApp',
      titleAr: 'موظف ذكاء اصطناعي بشري لواتساب (يرسل صور، ملفات، وكتالوجات)',
      taglineEn: 'Speaks naturally like a real company employee — sends PDF catalogs, photos & closes deals',
      taglineAr: 'يرد بأسلوب بشري طبيعي يصعب تمييزه عن موظف شركتك الحقيقي، ويرسل عروض الأسعار والصور والكتالوجات',
      image: 'assets/images/ai_whatsapp_agent_1789851518713.jpg',
      category: 'ai-employee',
      metricsEn: '99.4% Human Satisfaction · Instant Replies',
      metricsAr: 'رضا عملاء 99.4% · رد فوري في ثوانٍ',
      tech: ['WhatsApp Cloud API', 'OpenAI / Claude LLMs', 'Python', 'FastAPI', 'Redis', 'PDF Engine'],
      featuresEn: [
        'Indistinguishable from real human staff: uses natural phrasing, emojis, and empathy',
        'Dynamic file & media dispatcher: sends PDF catalogs, quotation sheets, and product photos',
        'Smart objection handling and conversational upsell/cross-sell techniques',
        'Instant order confirmation and direct synchronization with your CRM / Google Sheets'
      ],
      featuresAr: [
        'أسلوب بشري طبيعي بالكامل: استخدام تعبيرات عفوية وذكاء عاطفي يصعب كشفه أو تفريقه عن موظف حقيقي',
        'إرسال فوري للوسائط والملفات: صور المنتجات، كتالوجات PDF، وعروض الأسعار الفورية',
        'إتقان فنون البيع، معالجة اعتراضات العملاء، واقتراح المنتجات التكميلية بذكاء',
        'تأكيد الطلبات لحظياً وتسجيل بيانات العميل في قاعدة البيانات وGoogle Sheets'
      ],
      whatsappMsg: 'مرحباً مصطفى، مهتم ببرمجة موظف ذكاء اصطناعي بشري لواتساب يرسل صور وملفات وعروض أسعار'
    },
    'human-ai-whatsapp-employee': {
      pageUrl: 'whatsapp-ai-employee.html',
      titleEn: 'Human-Like AI Sales & Support Employee for WhatsApp',
      titleAr: 'موظف ذكاء اصطناعي بشري لواتساب (يرسل صور، ملفات، وكتالوجات)',
      taglineEn: 'Speaks naturally like a real company employee — sends PDF catalogs, photos & closes deals',
      taglineAr: 'يرد بأسلوب بشري طبيعي يصعب تمييزه عن موظف شركتك الحقيقي، ويرسل عروض الأسعار والصور والكتالوجات',
      image: 'assets/images/ai_whatsapp_agent_1789851518713.jpg',
      category: 'ai-employee',
      metricsEn: '99.4% Human Satisfaction · Instant Replies',
      metricsAr: 'رضا عملاء 99.4% · رد فوري في ثوانٍ',
      tech: ['WhatsApp Cloud API', 'OpenAI / Claude LLMs', 'Python', 'FastAPI', 'Redis', 'PDF Engine'],
      featuresEn: [
        'Indistinguishable from real human staff: uses natural phrasing, emojis, and empathy',
        'Dynamic file & media dispatcher: sends PDF catalogs, quotation sheets, and product photos',
        'Smart objection handling and conversational upsell/cross-sell techniques',
        'Instant order confirmation and direct synchronization with your CRM / Google Sheets'
      ],
      featuresAr: [
        'أسلوب بشري طبيعي بالكامل: استخدام تعبيرات عفوية وذكاء عاطفي يصعب كشفه أو تفريقه عن موظف حقيقي',
        'إرسال فوري للوسائط والملفات: صور المنتجات، كتالوجات PDF، وعروض الأسعار الفورية',
        'إتقان فنون البيع، معالجة اعتراضات العملاء، واقتراح المنتجات التكميلية بذكاء',
        'تأكيد الطلبات لحظياً وتسجيل بيانات العميل في قاعدة البيانات وGoogle Sheets'
      ],
      whatsappMsg: 'مرحباً مصطفى، مهتم ببرمجة موظف ذكاء اصطناعي بشري لواتساب يرسل صور وملفات وعروض أسعار'
    },
    'telegram-messenger-ai-employees': {
      pageUrl: 'omnichannel-ai-agent.html',
      titleEn: 'Omnichannel AI Employees for Telegram & Facebook Messenger',
      titleAr: 'موظفو الذكاء الاصطناعي لتلجرام وفيسبوك ماسنجر',
      taglineEn: '24/7 Automated Lead Qualification, Multimedia File Sending & Customer Support',
      taglineAr: 'موظف مبيعات وخدمة عملاء ذكي على تلجرام وماسنجر يرسل الصور والملفات ويرد فوراً',
      image: 'assets/images/omnichannel_ai_hub_1789851545960.jpg',
      category: 'ai-employee',
      metricsEn: '< 3s Response · +85% Lead Capture',
      metricsAr: 'استجابة أقل من 3 ثوانٍ · اقتناص +85% من العملاء',
      tech: ['Telegram API', 'Meta Messenger API', 'Node.js', 'Vector DB', 'Webhooks', 'Cloud Functions'],
      featuresEn: [
        'Multi-platform unified knowledge base synced between Telegram and Messenger',
        'Automated brochure, contract, and high-resolution picture dispatch',
        'Voice note understanding and natural conversational text generation',
        'Smart escalation to human team when high-ticket custom negotiations occur'
      ],
      featuresAr: [
        'قاعدة معرفية موحدة تخدم تلجرام وماسنجر بنفس الدقة والاحترافية العالية',
        'إرسال تلقائي للبروشورات والعقود وصور المنتجات بجودة عالية',
        'الاستماع للرسائل الصوتية وفهمها والرد عليها بذكاء واحتراف',
        'تحويل ذكي للعميل لفريق الإدارة عند وصول صفقات كبرى أو طلبات مخصصة'
      ],
      whatsappMsg: 'مرحباً مصطفى، مهتم ببرمجة موظف ذكاء اصطناعي لتلجرام وفيسبوك ماسنجر'
    },
    'smart-shipping-courier-system': {
      pageUrl: 'smart-shipping-system.html',
      titleEn: 'End-to-End Smart Shipping & Logistics Management System',
      titleAr: 'سيستم الشحن الذكي وإدارة المناديب والبوالص واللوجستيات',
      taglineEn: 'Automated Courier Waybills, Live Driver Tracking & Cash-on-Delivery Sync',
      taglineAr: 'إصدار بوالص الشحن آلياً، تتبع الشحنات والمناديب لحظياً، وتسوية التحصيلات والـ COD',
      image: 'assets/images/logistics_sync_hub_1789849655051.jpg',
      category: 'shipping',
      metricsEn: '100% Waybill Accuracy · 500+ Daily Shipments',
      metricsAr: 'دقة 100% في البوالص والتسليم · +500 شحنة يومياً',
      tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Courier APIs', 'Barcode Gen', 'Docker'],
      featuresEn: [
        'Automated printable PDF waybills with high-density barcodes and QR codes',
        'Live tracking portal with SMS & WhatsApp automated customer updates',
        'Driver delivery confirmation app with signature & proof-of-delivery capture',
        'Cash-on-Delivery (COD) settlement ledger with daily bank reconciliation'
      ],
      featuresAr: [
        'توليد بوالص شحن PDF جاهزة للطباعة مع باركودات ورموز QR متوافقة مع شركات الشحن',
        'بوابة تتبع مباشرة مع إرسال رسائل واتساب وSMS أوتوماتيكية للعميل بحالة شحنته',
        'شاشات خاصة بالمناديب لتسجيل الاستلام وإثبات التسليم والتوقيع',
        'دفتر حسابات مالي لمطابقة مبالغ الدفع عند الاستلام والحسابات البنكية بدقة'
      ],
      whatsappMsg: 'مرحباً مصطفى، أود الاستفسار عن سيستم الشحن واللوجستيات وإدارة المناديب والبوالص'
    },
    'idea-to-apps-supermarket-pharmacy': {
      pageUrl: 'mobile-retail-apps.html',
      titleEn: 'Custom Software & Mobile App Launch (Android & iOS)',
      titleAr: 'تحويل فكرتك لنظام رقمي وتطبيقات أندرويد وآيفون',
      taglineEn: 'Supermarket POS, Pharmacy ERP, Custom Web Platforms published to Google Play & App Store',
      taglineAr: 'سيستم سوبرماركت، سيستم صيدلية، متاجر إلكترونية أو أي فكرة مبتكرة نبرمجها وننشرها كتطبيقات موبايل',
      image: 'assets/images/mobile_erp_apps_1789851533593.jpg',
      category: 'mobile-apps',
      metricsEn: 'Android & iOS Store Approved · POS Integrated',
      metricsAr: 'معتمد على متاجر التطبيقات · متكامل مع أجهزة الكاشير',
      tech: ['Flutter / React Native', 'Node.js / Python', 'PostgreSQL', 'POS Drivers', 'Cloud Infra'],
      featuresEn: [
        'Full-cycle engineering: UI/UX, Backend, Cloud DB, and Mobile Applications',
        'App Store & Google Play publishing, store listing, and approvals guaranteed',
        'Supermarket POS & Barcode cashier systems with receipt printer integration',
        'Pharmacy ERP with inventory batch control, expiry alerts, and supplier accounts'
      ],
      featuresAr: [
        'تنفيذ شامل من الصفر حتى الإطلاق: التصميم، الباك إند، قواعد البيانات، وتطبيقات الموبايل',
        'رفع ونشر التطبيقات على Google Play وApp Store وضمان قبولها الرسمي',
        'أنظمة كاشير ونقاط بيع للسوبرماركت مع ربط طابعات الفواتير وقارئات الباركود',
        'أنظمة صيدليات ذكية تتبع أرقام التشغيل، صلاحيات الأدوية، وحسابات الموردين'
      ],
      whatsappMsg: 'مرحباً مصطفى، لدي فكرة مشروع وأريد تحويلها لنظام رقمي وتطبيقات أندرويد وآيفون'
    },
    'n8n-enterprise-orchestrator': {
      pageUrl: 'n8n-automation.html',
      titleEn: 'Enterprise n8n Workflow Automation Engine',
      titleAr: 'محرك أتمتة مسارات العمل المؤسسية عبر n8n',
      taglineEn: 'Distributed Event-Driven Pipelines, Error Retries & Multi-System Synchronization',
      taglineAr: 'بناء وتنسيق مسارات البيانات المعقدة، المعالجة التلقائية للأخطاء والربط السحابي',
      image: 'assets/images/n8n_workflow_canvas_1789849612939.jpg',
      category: 'automation',
      metricsEn: '10k+ Daily Executions · 99.98% Reliability',
      metricsAr: '+10,000 تدفق يومي · موثوقية 99.98%',
      tech: ['n8n', 'Docker', 'PostgreSQL', 'Redis', 'REST APIs', 'Webhooks'],
      featuresEn: [
        'Sub-workflow modular design isolating business logic from external dependencies',
        'Automatic error recovery queues with exponential backoff retry mechanisms',
        'HMAC-SHA256 signature verification on all incoming webhook triggers',
        'Continuous audit logging and structured alerting via Telegram bots'
      ],
      featuresAr: [
        'تصميم مسارات فرعية معيارية تعزل المنطق التشغيلي عن الأنظمة الخارجية',
        'إعادة محاولة تلقائية عند انقطاع الاتصال مع طوابير أمان للأخطاء',
        'التحقق الأمني بالتوقيع المشفر HMAC-SHA256 لجميع الـ Webhooks الواردة',
        'سجلات تدقيق شاملة وبث تقارير فورية على بوتات تيليجرام'
      ],
      whatsappMsg: 'مرحباً مصطفى، مهتم بخدمات أتمتة مسارات العمل والربط المؤسسي عبر n8n'
    },
    'api-telemetry-dashboard': {
      pageUrl: 'backend-api-architecture.html',
      titleEn: 'Real-Time REST API & Database Telemetry Hub',
      titleAr: 'منظومة مراقبة واجهات REST وتحليلات قواعد البيانات اللحظية',
      taglineEn: 'End-to-End Latency Tracking, Connection Pool Health & Automated Alerting',
      taglineAr: 'تتبع زمن استجابة الـ Endpoints، مراقبة اتصالات قواعد البيانات والتنبيه الفوري',
      image: 'assets/images/api_telemetry_hub_1789849643910.jpg',
      category: 'backend',
      metricsEn: 'Real-time Telemetry · Zero Downtime',
      metricsAr: 'مراقبة حية لحظية · 0 توقف مفاجئ',
      tech: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
      featuresEn: [
        'P95/P99 latency tracking per endpoint with automated slow-query threshold alerts',
        'Connection pool starvation diagnostics with automated kill-switches',
        'Redis cache hit/miss ratio optimization and memory consumption analytics',
        'Webhook delivery success tracker with automatic payload re-dispatch'
      ],
      featuresAr: [
        'تتبع دقيق لأزمنة الاستجابة P95/P99 لكل نقطة اتصال وتنبيه فوري عند البطء',
        'مراقبة اتصالات قواعد البيانات ومنع اختناق السيرفرات',
        'تحليل كفاءة التخزين المؤقت في Redis ونسب إصابة الكاش',
        'متابعة تسليم الـ Webhooks وإعادة إرسال العمليات الفاشلة تلقائياً'
      ],
      whatsappMsg: 'مرحباً مصطفى، مهتم بتطوير وفحص أداء الـ Backend وواجهات الـ REST API'
    }
  };

  // --- Dynamic Roles Typing Effect in Hero ---
  const rolesEn = [
    'Corporate Websites & Portals ($65 Full Package)',
    'AI Employees (WhatsApp · Telegram · Messenger)',
    'Custom Systems & Mobile Apps (Android & iOS)',
    'Smart Shipping & Logistics Systems',
    'Automation & n8n Workflow Specialist',
    'Backend Developer & API Architect'
  ];

  const rolesAr = [
    'مواقع تعريفية احترافية للشركات (باقة 65$ المتكاملة)',
    'موظفو ذكاء اصطناعي (واتساب · تلجرام · ماسنجر)',
    'أنظمة شركات وتطبيقات أندرويد وآيفون',
    'سيستمات الشحن واللوجستيات والمناديب',
    'خبير أتمتة الأعمال ومسارات n8n',
    'مطور نظم خلفية (Backend) وواجهات برمجة'
  ];

  let roleIdx = 0;
  function updateHeroRole() {
    const roleElem = document.getElementById('hero-rotating-role');
    if (!roleElem) return;
    const list = currentLang === 'ar' ? rolesAr : rolesEn;
    roleElem.style.opacity = '0';
    setTimeout(() => {
      roleIdx = (roleIdx + 1) % list.length;
      roleElem.textContent = list[roleIdx];
      roleElem.style.opacity = '1';
    }, 250);
  }
  setInterval(updateHeroRole, 3200);

  // --- Dynamic WhatsApp Engine with Service Customization ---
  const WHATSAPP_PHONE = '201107787049';

  const SERVICE_MESSAGES = {
    'general': {
      ar: 'مرحباً مصطفى أود بدء مشروع برمجي معك',
      en: 'Hello Mostafa I would like to start a software project with you'
    },
    'corporate-website-package': {
      ar: 'مرحباً مصطفى أود الاستفسار وحجز باقة تصميم موقع تعريفي للشركات (65$ بدومين .uk أو 75$ بدومين .com)',
      en: 'Hello Mostafa I would like to inquire about and order the Corporate Website Package ($65 with .uk domain or $75 with .com domain)'
    },
    'n8n-enterprise-orchestrator': {
      ar: 'مرحباً مصطفى أود الاستفسار عن خدمة أتمتة الأعمال n8n',
      en: 'Hello Mostafa I would like to inquire about n8n automation services'
    },
    'smart-shipping-courier-system': {
      ar: 'مرحباً مصطفى أود الاستفسار عن سيستمات الشحن واللوجستيات',
      en: 'Hello Mostafa I would like to inquire about smart shipping and logistics systems'
    },
    'idea-to-apps-supermarket-pharmacy': {
      ar: 'مرحباً مصطفى أود الاستفسار عن تطوير تطبيق جديد',
      en: 'Hello Mostafa I would like to inquire about developing a new application'
    },
    'whatsapp-ai-employee': {
      ar: 'مرحباً مصطفى أود الاستفسار عن موظف الذكاء الاصطناعي لواتساب',
      en: 'Hello Mostafa I would like to inquire about building a human-like AI employee for WhatsApp'
    },
    'telegram-messenger-ai-employees': {
      ar: 'مرحباً مصطفى أود الاستفسار عن موظف الذكاء الاصطناعي لتلجرام وماسنجر',
      en: 'Hello Mostafa I would like to inquire about AI employees for Telegram and Messenger'
    },
    'api-telemetry-dashboard': {
      ar: 'مرحباً مصطفى، مهتم بتطوير وفحص أداء الـ Backend وواجهات الـ REST API',
      en: 'Hello Mostafa I would like to inquire about backend development and REST API optimization'
    }
  };

  window.getDynamicWhatsAppUrl = function (lang, serviceKey) {
    const selectedLang = lang || currentLang || 'ar';
    const key = serviceKey || 'general';
    const serviceObj = SERVICE_MESSAGES[key] || SERVICE_MESSAGES['general'];
    const textMsg = (selectedLang === 'en' ? serviceObj.en : serviceObj.ar) || SERVICE_MESSAGES['general'][selectedLang];
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(textMsg)}`;
  };

  window.updateAllWhatsAppLinks = function (lang) {
    const targetLang = lang || currentLang || 'ar';

    // Update all matching elements reading their individual data-service attribute
    document.querySelectorAll('.dynamic-whatsapp-link').forEach(el => {
      const serviceKey = el.getAttribute('data-service') || 'general';
      el.href = window.getDynamicWhatsAppUrl(targetLang, serviceKey);
    });
  };

  // --- Language Switching ---
  window.setLanguage = function (lang) {
    currentLang = lang;
    safeSetStorage('portfolio_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');

    // Only walk DOM if language changed from initial server HTML language (ar)
    if (lang !== 'ar') {
      // Update all elements with data-en and data-ar
      document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        const val = el.getAttribute('data-en');
        if (val !== null && val !== undefined) {
          el.textContent = val;
        }
      });

      // Update placeholders
      document.querySelectorAll('[data-placeholder-en][data-placeholder-ar]').forEach(el => {
        const val = el.getAttribute('data-placeholder-en');
        if (val !== null && val !== undefined) {
          el.setAttribute('placeholder', val);
        }
      });
    } else {
      document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        const val = el.getAttribute('data-ar');
        if (val !== null && val !== undefined) {
          el.textContent = val;
        }
      });

      document.querySelectorAll('[data-placeholder-en][data-placeholder-ar]').forEach(el => {
        const val = el.getAttribute('data-placeholder-ar');
        if (val !== null && val !== undefined) {
          el.setAttribute('placeholder', val);
        }
      });
    }

    // Update Lang button text everywhere
    document.querySelectorAll('#lang-btn-text, .lang-btn-text').forEach(el => {
      el.textContent = lang === 'ar' ? 'English' : 'عربي';
    });

    // Update Theme button label based on language
    document.querySelectorAll('#theme-btn-text, .theme-btn-text').forEach(el => {
      if (currentTheme === 'light') {
        el.textContent = lang === 'ar' ? 'فاتح' : 'Light';
      } else {
        el.textContent = lang === 'ar' ? 'داكن' : 'Dark';
      }
    });

    // Update active rotating role immediately
    const roleElem = document.getElementById('hero-rotating-role');
    if (roleElem) {
      const list = lang === 'ar' ? rolesAr : rolesEn;
      roleElem.textContent = list[roleIdx % list.length];
    }

    // Update WhatsApp links to active language message immediately
    window.updateAllWhatsAppLinks(lang);
  };

  let lastLangToggle = 0;
  window.toggleLanguage = function () {
    const now = Date.now();
    if (now - lastLangToggle < 300) return;
    lastLangToggle = now;
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    window.setLanguage(nextLang);
  };

  // Ensure clicking any dynamic WhatsApp CTA always has the latest active URL and service text
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('#header-whatsapp-cta, #hero-whatsapp-cta, #contact-whatsapp-cta, .dynamic-whatsapp-link');
    if (btn) {
      const serviceKey = btn.getAttribute('data-service') || 'general';
      btn.href = window.getDynamicWhatsAppUrl(currentLang, serviceKey);
    }
  });

  // --- Theme Switching (Dark / Light Mode) ---
  window.setTheme = function (theme) {
    currentTheme = theme;
    safeSetStorage('portfolio_theme', theme);

    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

    // Update all theme icons across the site
    document.querySelectorAll('#theme-btn-icon, #theme-icon, .theme-btn-icon').forEach(iconElem => {
      iconElem.textContent = (theme === 'light' ? '☀️' : '🌙');
    });

    // Update all theme text labels across the site
    document.querySelectorAll('#theme-btn-text, .theme-btn-text').forEach(textElem => {
      if (theme === 'light') {
        textElem.textContent = currentLang === 'ar' ? 'فاتح' : 'Light';
      } else {
        textElem.textContent = currentLang === 'ar' ? 'داكن' : 'Dark';
      }
    });
  };

  let lastThemeToggle = 0;
  window.toggleTheme = function () {
    const now = Date.now();
    if (now - lastThemeToggle < 300) return;
    lastThemeToggle = now;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    window.setTheme(nextTheme);
  };

  // --- Terminal Simulator ---
  let isSimulating = false;
  window.simulateTerminalInquiry = function () {
    if (isSimulating) return;
    isSimulating = true;
    const body = document.getElementById('terminal-logs-body');
    const btn = document.getElementById('simulate-terminal-btn');
    if (!body) return;

    if (btn) btn.disabled = true;

    const orderId = Math.floor(1000 + Math.random() * 9000);
    const now = new Date().toTimeString().split(' ')[0];

    const inLog = document.createElement('div');
    inLog.className = 'log-entry text-cyan-400';
    inLog.innerHTML = `<span class="text-slate-500 font-mono text-xs">[${now}]</span> <span class="text-amber-400 font-bold">[CUSTOMER CHAT]</span> ${
      currentLang === 'ar'
        ? `رسالة واتساب: "محتاج تفاصيل وصور وعرض سعر المنتج #${orderId}". موظف الذكاء الاصطناعي يحلل الطلب...`
        : `WhatsApp inquiry: "Need specs, photos & quote for item #${orderId}". AI Employee analyzing...`
    }`;
    body.appendChild(inLog);
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
      const replyTime = new Date().toTimeString().split(' ')[0];
      const replyLog = document.createElement('div');
      replyLog.className = 'log-entry text-emerald-400';
      replyLog.innerHTML = `<span class="text-slate-500 font-mono text-xs">[${replyTime}]</span> <span class="text-emerald-400 font-bold">[HUMAN AI REPLY]</span> ${
        currentLang === 'ar'
          ? `تم إرسال رد بشري طبيعي + صورة المنتج + عرض سعر PDF في 38ms! تم تأكيد اهتمام العميل بنجاح.`
          : `Human-tone conversational reply + Product Photo + PDF quote dispatched in 38ms! Customer converted.`
      }`;
      body.appendChild(replyLog);
      body.scrollTop = body.scrollHeight;

      isSimulating = false;
      if (btn) btn.disabled = false;
    }, 750);
  };

  // --- Filter Tabs for Live Projects ---
  window.filterProjects = function (category) {
    activeCategory = category;
    
    // Update active tab buttons
    document.querySelectorAll('.filter-tab').forEach(btn => {
      if (btn.getAttribute('data-category') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Filter project cards
    document.querySelectorAll('.project-card-item').forEach(card => {
      const cardCat = card.getAttribute('data-project-category');
      if (category === 'all' || cardCat === category) {
        card.style.display = 'block';
        setTimeout(() => { card.style.opacity = '1'; }, 20);
      } else {
        card.style.opacity = '0';
        card.style.display = 'none';
      }
    });
  };

  // --- Lightbox Modal ---
  window.openLightbox = function (imgSrc, title) {
    const overlay = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (!overlay || !img) return;

    img.src = imgSrc;
    if (cap) cap.textContent = title || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    const overlay = document.getElementById('lightbox-modal');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // --- Project Details Modal ---
  window.openProjectDetails = function (projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    const modal = document.getElementById('project-detail-modal');
    if (!modal) return;

    const isAr = currentLang === 'ar';
    document.getElementById('modal-project-title').textContent = isAr ? data.titleAr : data.titleEn;
    document.getElementById('modal-project-tagline').textContent = isAr ? data.taglineAr : data.taglineEn;
    document.getElementById('modal-project-img').src = data.image;
    document.getElementById('modal-project-metrics').textContent = isAr ? data.metricsAr : data.metricsEn;

    // Tech badges
    const techBox = document.getElementById('modal-project-tech');
    techBox.innerHTML = '';
    data.tech.forEach(t => {
      const badge = document.createElement('span');
      badge.className = 'px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700';
      badge.textContent = t;
      techBox.appendChild(badge);
    });

    // Features list
    const featList = document.getElementById('modal-project-features');
    featList.innerHTML = '';
    const feats = isAr ? data.featuresAr : data.featuresEn;
    feats.forEach(f => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2 text-sm text-slate-300';
      li.innerHTML = `<span class="text-emerald-400 font-bold">✓</span> <span>${f}</span>`;
      featList.appendChild(li);
    });

    // WhatsApp action button link
    const waBtn = document.getElementById('modal-project-whatsapp-btn');
    if (waBtn) {
      waBtn.setAttribute('data-service', projectId);
      waBtn.href = window.getDynamicWhatsAppUrl(currentLang, projectId);
    }

    // Dedicated page button link
    const pageBtn = document.getElementById('modal-project-page-btn');
    if (pageBtn) {
      if (data.pageUrl) {
        pageBtn.href = data.pageUrl;
        pageBtn.style.display = 'inline-flex';
      } else {
        pageBtn.style.display = 'none';
      }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectDetails = function () {
    const modal = document.getElementById('project-detail-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // --- Interactive Architecture Tabs ---
  window.selectArchitectureTab = function (tabId) {
    document.querySelectorAll('.arch-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active-arch-tab', 'border-emerald-500', 'bg-emerald-950/40', 'text-emerald-400');
        btn.classList.remove('border-slate-800', 'text-slate-400');
      } else {
        btn.classList.remove('active-arch-tab', 'border-emerald-500', 'bg-emerald-950/40', 'text-emerald-400');
        btn.classList.add('border-slate-800', 'text-slate-400');
      }
    });

    document.querySelectorAll('.arch-tab-content').forEach(content => {
      if (content.id === `arch-content-${tabId}`) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    });
  };

  // --- Interactive Workflow Playground Simulator ---
  window.runWorkflowSimulation = function () {
    const steps = [
      document.getElementById('wf-step-1'),
      document.getElementById('wf-step-2'),
      document.getElementById('wf-step-3'),
      document.getElementById('wf-step-4')
    ];
    const triggerBtn = document.getElementById('wf-trigger-btn');
    if (triggerBtn) triggerBtn.disabled = true;

    // Reset steps
    steps.forEach(s => {
      if (s) {
        s.classList.remove('border-emerald-400', 'bg-emerald-950/60', 'scale-105');
        s.classList.add('border-slate-800', 'bg-slate-900/60');
      }
    });

    // Animate sequentially
    let delay = 0;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        if (step) {
          step.classList.remove('border-slate-800', 'bg-slate-900/60');
          step.classList.add('border-emerald-400', 'bg-emerald-950/60', 'scale-105');
        }
        if (idx === steps.length - 1) {
          setTimeout(() => {
            if (triggerBtn) triggerBtn.disabled = false;
          }, 600);
        }
      }, delay);
      delay += 550;
    });
  };

  // --- Copy Email with Toast ---
  window.copyEmail = function () {
    const email = 'mostafaalsn82@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast(currentLang === 'ar' ? 'تم نسخ البريد الإلكتروني بنجاح!' : 'Email copied to clipboard!');
    }).catch(() => {
      showToast(email);
    });
  };

  function showToast(msg) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // --- Mobile Menu Toggle ---
  let lastMenuToggle = 0;
  window.toggleMobileMenu = function () {
    const now = Date.now();
    if (now - lastMenuToggle < 300) return;
    lastMenuToggle = now;
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    menu.classList.toggle('hidden');
  };

  // --- Corporate Website Domain Option Selector ---
  window.selectDomainOption = function (domain) {
    const cardUk = document.getElementById('card-uk');
    const cardCom = document.getElementById('card-com');
    const summaryTitle = document.getElementById('selected-summary-title');
    const orderBtn = document.getElementById('interactive-order-btn');
    const orderBtnLabel = document.getElementById('order-btn-label');
    const isArabic = (document.documentElement.lang || currentLang || 'ar') === 'ar';

    if (!cardUk || !cardCom) return;

    if (domain === 'uk') {
      cardUk.className = 'p-6 rounded-2xl border-2 border-cyan-500 bg-cyan-950/20 cursor-pointer transition-all hover:border-cyan-400 flex flex-col justify-between';
      cardCom.className = 'p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/60 cursor-pointer transition-all hover:border-emerald-400 flex flex-col justify-between';
      
      if (summaryTitle) {
        summaryTitle.innerHTML = `<span data-en="Selected: Base Package with .uk Domain ($65 USD)" data-ar="المختار: الباقة الأساسية بدومين uk. رسمي (65 دولار)">${isArabic ? 'المختار: الباقة الأساسية بدومين uk. رسمي (65 دولار)' : 'Selected: Base Package with .uk Domain ($65 USD)'}</span>`;
      }
      if (orderBtnLabel) {
        orderBtnLabel.textContent = isArabic ? 'طلب الباقة بدومين uk. (65$)' : 'Order with .uk ($65)';
      }
      if (orderBtn) {
        orderBtn.href = 'https://wa.me/201107787049?text=' + encodeURIComponent(isArabic ? 'مرحباً مصطفى أود حجز باقة الموقع التعريفي بدومين uk. بسعر 65 دولار' : 'Hello Mostafa I would like to order the Corporate Website Package with .uk domain ($65 USD)');
      }
    } else {
      cardCom.className = 'p-6 rounded-2xl border-2 border-emerald-500 bg-emerald-950/20 cursor-pointer transition-all hover:border-emerald-400 flex flex-col justify-between';
      cardUk.className = 'p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/60 cursor-pointer transition-all hover:border-cyan-400 flex flex-col justify-between';
      
      if (summaryTitle) {
        summaryTitle.innerHTML = `<span data-en="Selected: Corporate Package with .com Domain ($75 USD)" data-ar="المختار: باقة الشركات بدومين com. رسمي (75 دولار)">${isArabic ? 'المختار: باقة الشركات بدومين com. رسمي (75 دولار)' : 'Selected: Corporate Package with .com Domain ($75 USD)'}</span>`;
      }
      if (orderBtnLabel) {
        orderBtnLabel.textContent = isArabic ? 'طلب الباقة بدومين com. (75$)' : 'Order with .com ($75)';
      }
      if (orderBtn) {
        orderBtn.href = 'https://wa.me/201107787049?text=' + encodeURIComponent(isArabic ? 'مرحباً مصطفى أود حجز باقة الموقع التعريفي بدومين com. بسعر 75 دولار' : 'Hello Mostafa I would like to order the Corporate Website Package with .com domain ($75 USD)');
      }
    }
  };

  // --- DeepSeek WhatsApp AI Employee Chat Engine ---
  let chatHistory = [];
  let isSendingAiMessage = false;

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Fallback intelligent natural response generator for Salah Logistics sales & client communication
  function generateSalahLogisticsAiResponse(userText, lang) {
    const isAr = lang === 'ar';
    const text = (userText || '').toLowerCase();

    if (text.includes('سعر') || text.includes('باقة') || text.includes('موقع') || text.includes('price') || text.includes('quote') || text.includes('website') || text.includes('cost') || text.includes('65') || text.includes('75') || text.includes('تجديد') || text.includes('renewal')) {
      if (isAr) {
        return `أهلاً بحضرتك يا فندم! 🌟
تفاصيل باقة الموقع التعريفي الاحترافي للشركات مع م. مصطفى صلاح:
1. السعر للسنة الأولى:
   • 65 دولار فقط بدومين .uk رسمي شامل.
   • أو 75 دولار فقط بدومين .com رسمي شامل.
2. المزايا المشمولة مجاناً في الباقة:
   • الموقع يدعم اللغتين معاً (العربية والإنجليزية) دون أي تكلفة إضافية.
   • استضافة سحابية فائقة السرعة + شهادة أمان SSL مجانية للسنة الأولى.
   • ربط تفاعلي مباشر بالواتساب وتصميم متجاوب 100% مع الموبايل والتابلت.
   • دعم فني يومي وصيانة مستمرة وسريعة (من السبت للخميس).
3. التجديد السنوي ثابت: 40 دولار فقط سنوياً لجميع الباقات (شامل تجديد الدومين والاستضافة والصيانة والدعم الفني).

تحب نبدأ حجز الباقة لحضرتك الآن أو نتحقق من توفر اسم الدومين المطلوب؟`;
      } else {
        return `Hello! 🌟 Here are the official details for the Corporate Website Package with Eng. Mostafa Salah:
1. First-Year Price:
   • Only $65 USD with official .uk domain included.
   • Or $75 USD with official .com domain included.
2. Included features at no extra charge:
   • Full bilingual support (Arabic & English together).
   • Ultra-fast cloud SSD hosting + Free SSL security certificate.
   • Direct interactive WhatsApp CTA & 100% mobile-optimized UI.
   • Active daily technical support & ongoing maintenance.
3. Fixed annual renewal: $40 USD flat per year (covers domain renewal, cloud hosting, and daily support).

Would you like to reserve your package or check domain name availability now?`;
      }
    }

    if (text.includes('واتساب') || text.includes('whatsapp') || text.includes('موظف') || text.includes('employee') || text.includes('bot') || text.includes('بوت') || text.includes('pdf') || text.includes('عرض سعر')) {
      if (isAr) {
        return `أهلاً بيك يا فندم! 🤖 خدمة موظف الذكاء الاصطناعي البشري للواتساب وتليجرام هي أقوى حل لمضاعفة مبيعاتك:
• يرد في أجزاء من الثانية بلهجة بشرية ودودة ومقنعة 24/7 دون أي توقف.
• يولد ملفات عروض أسعار رسمية PDF باسم شركتك وشعارك ويبعتها للعميل فوراً داخل الشات.
• يربط البيانات مباشرة بقاعدة بياناتك وسيستم الشحن ومسارات n8n.
• يرسل تنبيهات فورية للإدارة عند وجود طلب مؤكد أو عميل عاجل.

جاهزون لبرمجة الموظف وربطه بمنتجاتك وسيستمك فوراً. تود تجربته مع كاتالوج شركتك؟`;
      } else {
        return `Hello! 🤖 Our Human-like WhatsApp & Telegram AI Employee is built to supercharge your sales:
• Replies in milliseconds with a warm, human-like sales tone 24/7.
• Generates and dispatches official PDF quotations with your company branding directly inside the chat.
• Seamlessly syncs customer inquiries to your database, ERP, and n8n pipelines.
• Delivers instant notifications to managers for hot leads and confirmed orders.

Would you like us to customize this AI employee for your business workflow?`;
      }
    }

    if (text.includes('شحن') || text.includes('shipping') || text.includes('لوجست') || text.includes('logistics') || text.includes('مندوب') || text.includes('courier') || text.includes('تتبع') || text.includes('cod')) {
      if (isAr) {
        return `يا مرحباً! 🚚 سيستم الشحن واللوجستيات الذكي من صلاح لوجيستيكس يشمل:
• لوحة تحكم سحابية لإدارة آلاف الشحنات، بوالص الشحن (Waybills)، وتوزيع المناطق تلقائياً.
• تطبيق موبايل للمناديب لتحديث حالات التوصيل بالـ QR Code ومسح الباركود جغرافياً.
• تسوية دقيقة للمبالغ المحصلة عند الاستلام (COD) مع المحافظ وتقارير الأرباح لحظة بلحظة.
• بوابة تتبع مباشرة للعملاء عبر رسائل الواتساب مع إشعارات الرسائل القصيرة.

السيستم قابل للتخصيص الكامل حسب أسطولك ومحافظاتك! تحب نشارك معاينة حية؟`;
      } else {
        return `Hello! 🚚 The Salah Logistics Smart Shipping & Courier Platform includes:
• Cloud dashboard to manage thousands of shipments, printable waybills, and smart territory routing.
• Native mobile app for couriers with real-time QR scanning and GPS status updates.
• Instant COD cash reconciliation, commission wallets, and financial reporting.
• Real-time customer tracking portal with automated WhatsApp notifications.

Customizable to fit your exact fleet size. Shall we schedule a live walkthrough?`;
      }
    }

    if (text.includes('n8n') || text.includes('أتمتة') || text.includes('automation') || text.includes('api') || text.includes('backend') || text.includes('باك إند')) {
      if (isAr) {
        return `أهلاً بحضرتك! ⚡ نحن متخصصون في أتمتة الأعمال وهندسة الـ APIs:
• بناء مسارات n8n المعقدة لربط متجرك (Shopify/WooCommerce/Salla) بالواتساب ومخازنك وجوجل شيتس.
• إعادة إرسال تلقائية للعمليات الفاشلة (Retry Mechanism) وضمان وصول الـ Webhooks بنسبة 99.9%.
• تطوير نظم خلفية (Backend APIs) فائقة السرعة بـ Node.js / Python مع قواعد بيانات PostgreSQL وRedis.

أي نظام أو فكرة عندك نقدر نربطها ونؤتمتها بالكامل لتوفير وقتك وتكاليف التشغيل!`;
      } else {
        return `Hello! ⚡ We specialize in workflow automation & backend architecture:
• Robust n8n pipelines connecting your store (Shopify/WooCommerce) to WhatsApp, ERPs, and Google Sheets.
• Auto-recovery logic and retry policies for Webhooks with 99.9% uptime.
• Ultra-fast REST/GraphQL backend architecture with PostgreSQL, Redis, and Docker.

We can automate any repetitive operational task for your business!`;
      }
    }

    // Default warm sales reply
    if (isAr) {
      return `أهلاً بحضرتك يا فندم في شركة صلاح لوجيستيكس! 👋 سعداء جداً بتواصلك معنا.
نحن نقدم حلولاً برمجية ولوجستية متكاملة تحت إشراف م. مصطفى صلاح:
1. تصميم مواقع الشركات التعريفية (باقة 65$ بدومين uk. أو 75$ بدومين com. تشمل اللغتين عربي وإنجليزي مع تجديد سنوي ثابت 40$).
2. موظف الذكاء الاصطناعي البشري للواتساب وتليجرام للرد الفوري وتوليد عروض PDF.
3. سيستمات إدارة الشحن وتتبع المناديب COD.
4. تطبيقات الموبايل والمتاجر الإلكترونية.
5. أتمتة الأعمال n8n وهندسة الـ APIs.

هل في خدمة معينة أو مشروع تحب نبدأ فيه مع حضرتك؟ تواصل معنا مباشرة عبر واتساب على 01107787049 لتأكيد طلبك فوراً! 🚀`;
    } else {
      return `Welcome to Salah Logistics! 👋 We're thrilled to assist you.
Under the engineering leadership of Eng. Mostafa Salah, we offer:
1. Corporate Website Packages ($65 USD for .uk / $75 USD for .com, bilingual AR/EN included, $40 fixed annual renewal).
2. AI Employees for WhatsApp & Telegram with instant PDF quotation generator.
3. Smart Logistics & Courier Dispatch Platforms.
4. Mobile Retail Apps & E-Commerce Systems.
5. n8n Enterprise Workflow Automation & Backend Architecture.

Which solution can we help you launch today? Feel free to contact us on WhatsApp (+201107787049) to get started! 🚀`;
    }
  }

  // Send message to DeepSeek API endpoint with graceful fallback
  window.sendDeepSeekMessage = async function (userText) {
    if (!userText || !userText.trim() || isSendingAiMessage) return;
    const cleanText = userText.trim();
    isSendingAiMessage = true;

    const chatBox = document.getElementById('sim-chat-box');
    const typingIndicator = document.getElementById('sim-typing-indicator');
    const inputField = document.getElementById('sim-chat-input');
    const sendBtn = document.getElementById('sim-send-btn');
    const isAr = (document.documentElement.lang || currentLang || 'ar') === 'ar';
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (inputField) inputField.value = '';
    if (sendBtn) sendBtn.disabled = true;

    // Append User Message to UI
    if (chatBox) {
      const userBubble = document.createElement('div');
      userBubble.className = 'flex items-start justify-end gap-2.5';
      userBubble.innerHTML = `
        <div class="max-w-[85%] p-3.5 rounded-2xl rounded-tr-sm bg-emerald-950/60 border border-emerald-500/40 text-emerald-100 leading-relaxed shadow-sm">
          <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-300 font-mono mb-1">
            <span class="font-bold">[${isAr ? 'أنت على واتساب' : 'You on WhatsApp'}]</span>
            <span>${timeNow}</span>
          </div>
          <p>${escapeHtml(cleanText)}</p>
        </div>
        <div class="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs shrink-0">
          👤
        </div>
      `;
      chatBox.appendChild(userBubble);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Show Typing Indicator
    if (typingIndicator) {
      typingIndicator.classList.remove('hidden');
      typingIndicator.classList.add('flex');
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Add to history
    chatHistory.push({ role: 'user', content: cleanText });

    let aiReply = null;
    let replySource = 'deepseek-api';

    try {
      const response = await fetch('/api/deepseek-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: cleanText,
          history: chatHistory.slice(-6)
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.success && data.reply) {
          aiReply = data.reply;
          replySource = 'deepseek-api';
        }
      }
    } catch (err) {
      // Fetch error handled gracefully
    }

    // Fallback to intelligent built-in generator if DeepSeek API key requires active billing or proxy unavailable
    if (!aiReply) {
      aiReply = generateSalahLogisticsAiResponse(cleanText, isAr ? 'ar' : 'en');
      replySource = 'salah-ai-engine';
    }

    // Hide Typing Indicator
    if (typingIndicator) {
      typingIndicator.classList.add('hidden');
      typingIndicator.classList.remove('flex');
    }

    // Add AI message to history
    chatHistory.push({ role: 'assistant', content: aiReply });

    // Render AI Reply bubble
    if (chatBox) {
      const aiBubble = document.createElement('div');
      aiBubble.className = 'flex items-start gap-2.5';
      const badgeText = replySource === 'deepseek-api' 
        ? (isAr ? 'موظف مبيعات صلاح لوجيستيكس (DeepSeek API)' : 'Salah Logistics AI Sales (DeepSeek API)')
        : (isAr ? 'موظف مبيعات صلاح لوجيستيكس' : 'Salah Logistics AI Sales');

      aiBubble.innerHTML = `
        <div class="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs shrink-0">
          🤖
        </div>
        <div class="max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm bg-slate-900 border border-emerald-500/30 text-slate-200 leading-relaxed shadow-sm">
          <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-400 font-mono mb-1">
            <span class="font-bold">[${badgeText}]</span>
            <span class="text-slate-500">${timeNow} ✓✓</span>
          </div>
          <div class="whitespace-pre-line text-xs">${escapeHtml(aiReply)}</div>
          <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <a href="${window.getDynamicWhatsAppUrl(isAr ? 'ar' : 'en', 'whatsapp-ai-employee')}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[10px] transition-transform hover:scale-105">
              <span>💬</span>
              <span>${isAr ? 'تأكيد الحجز عبر واتساب' : 'Confirm on WhatsApp'}</span>
            </a>
            <span class="text-[9px] font-mono text-slate-500">24/7 Live</span>
          </div>
        </div>
      `;
      chatBox.appendChild(aiBubble);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    if (sendBtn) sendBtn.disabled = false;
    isSendingAiMessage = false;
  };

  // --- WhatsApp AI Live Simulator Trigger ---
  const SAMPLE_INQUIRIES = [
    'السلام عليكم، محتاج تفاصيل وعرض سعر باقة الموقع التعريفي للشركات بدومين com. ومدة التسليم.',
    'مرحباً، عايز أعرف إزاي موظف الذكاء الاصطناعي بيولد عروض أسعار PDF ويرد فوراً على العملاء.',
    'السلام عليكم، محتاجين سيستم شحن متكامل لإدارة 20 مندوب وتتبع بوالص الشحن وتحصيل الـ COD.',
    'Hello, what is included in the $65 Corporate Website package and how does the annual renewal work?'
  ];
  let sampleInquiryIdx = 0;

  window.simulateLiveInquiry = function () {
    const inquiry = SAMPLE_INQUIRIES[sampleInquiryIdx % SAMPLE_INQUIRIES.length];
    sampleInquiryIdx++;
    window.sendDeepSeekMessage(inquiry);
  };

  // Reset/Clear Chat
  window.clearChat = function () {
    chatHistory = [];
    const chatBox = document.getElementById('sim-chat-box');
    const isAr = (document.documentElement.lang || currentLang || 'ar') === 'ar';
    if (!chatBox) return;

    chatBox.innerHTML = `
      <div class="flex items-start gap-2.5">
        <div class="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs shrink-0">
          🤖
        </div>
        <div class="max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm bg-slate-900 border border-emerald-500/30 text-slate-200 leading-relaxed shadow-sm">
          <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-400 font-mono mb-1">
            <span class="font-bold">[${isAr ? 'موظف مبيعات صلاح لوجيستيكس' : 'Salah Logistics Sales AI'}]</span>
            <span class="text-slate-500">${isAr ? 'متصل الآن' : 'Online'}</span>
          </div>
          <p>${isAr 
            ? 'أهلاً بحضرتك يا فندم في منصة صلاح لوجيستيكس والمهندس مصطفى صلاح! 👋 أنا موظف المبيعات والتواصل الذكي، أقدر أساعد حضرتك فوراً في معرفة تفاصيل وأسعار باقاتنا (مثل باقة الموقع التعريفي بـ 65$ أو 75$، موظف الذكاء الاصطناعي لواتساب، وسيستمات الشحن وتطبيقات الموبايل). اتفضل اسألني في أي تفاصيل أو اكتب طلبك وهرد عليك فوراً! 🚀'
            : 'Welcome to Salah Logistics and Eng. Mostafa Salah! 👋 I am your intelligent sales & client relations agent. Ask any questions about our corporate packages, AI WhatsApp bots, or shipping systems, and I will assist you instantly! 🚀'
          }</p>
        </div>
      </div>
    `;
  };

  // Attach direct listeners to prevent any event bubbling/delegation blocking
  function attachDirectListeners() {
    // Theme toggle direct listener
    document.querySelectorAll('#theme-toggle-btn, [data-action="toggle-theme"], .theme-toggle-btn').forEach(btn => {
      btn.onclick = function (e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        window.toggleTheme();
      };
    });

    // Language toggle direct listener
    document.querySelectorAll('#lang-toggle-btn, [data-action="toggle-language"], .lang-toggle-btn').forEach(btn => {
      btn.onclick = function (e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        window.toggleLanguage();
      };
    });

    // Mobile menu toggle direct listener
    document.querySelectorAll('#mobile-menu-btn, [data-action="toggle-mobile-menu"]').forEach(btn => {
      btn.onclick = function (e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        window.toggleMobileMenu();
      };
    });

    // DeepSeek Chat form submit
    const chatForm = document.getElementById('sim-chat-form');
    if (chatForm) {
      chatForm.onsubmit = function (e) {
        e.preventDefault();
        const input = document.getElementById('sim-chat-input');
        if (input && input.value) {
          window.sendDeepSeekMessage(input.value);
        }
      };
    }

    // Quick prompt buttons
    document.querySelectorAll('.quick-prompt-btn').forEach(btn => {
      btn.onclick = function (e) {
        e.preventDefault();
        const q = btn.getAttribute('data-question');
        if (q) window.sendDeepSeekMessage(q);
      };
    });

    // Clear chat button
    const clearBtn = document.getElementById('clear-chat-btn');
    if (clearBtn) {
      clearBtn.onclick = function (e) {
        e.preventDefault();
        window.clearChat();
      };
    }

    // Simulate chat inquiry button
    const simBtn = document.getElementById('sim-btn');
    if (simBtn) {
      simBtn.onclick = function (e) {
        e.preventDefault();
        window.simulateLiveInquiry();
      };
    }
  }

  // --- Global Event Delegation (Zero inline onclick for 100% strict CSP) ---
  document.addEventListener('click', function(e) {
    const target = e.target;
    if (!target) return;

    // Theme Toggle
    const themeBtn = target.closest('#theme-toggle-btn, [data-action="toggle-theme"], .theme-toggle-btn');
    if (themeBtn) {
      e.preventDefault();
      window.toggleTheme();
      return;
    }

    // Language Toggle
    const langBtn = target.closest('#lang-toggle-btn, [data-action="toggle-language"], .lang-toggle-btn');
    if (langBtn) {
      e.preventDefault();
      window.toggleLanguage();
      return;
    }

    // Mobile Menu Toggle
    const mobileBtn = target.closest('#mobile-menu-btn, [data-action="toggle-mobile-menu"]');
    if (mobileBtn) {
      e.preventDefault();
      window.toggleMobileMenu();
      return;
    }

    // Clear Chat
    const clearChatBtn = target.closest('#clear-chat-btn, [data-action="clear-chat"]');
    if (clearChatBtn) {
      e.preventDefault();
      window.clearChat();
      return;
    }

    // Quick prompt
    const quickPrompt = target.closest('.quick-prompt-btn');
    if (quickPrompt) {
      e.preventDefault();
      const q = quickPrompt.getAttribute('data-question');
      if (q) window.sendDeepSeekMessage(q);
      return;
    }

    // Lightbox Open
    const lightboxTrigger = target.closest('[data-action="open-lightbox"]');
    if (lightboxTrigger) {
      e.preventDefault();
      const img = lightboxTrigger.getAttribute('data-img');
      const cap = lightboxTrigger.getAttribute('data-caption');
      if (img) window.openLightbox(img, cap);
      return;
    }

    // Lightbox Close
    const lightboxClose = target.closest('#lightbox-close-btn, [data-action="close-lightbox"]');
    if (lightboxClose) {
      if (target.closest('[data-stop-propagation="true"]') && !target.closest('button[data-action="close-lightbox"], #lightbox-close-btn')) {
        return;
      }
      e.preventDefault();
      window.closeLightbox();
      return;
    }

    // Project Details Open
    const projectDetailTrigger = target.closest('[data-action="open-project-details"]');
    if (projectDetailTrigger) {
      e.preventDefault();
      const pid = projectDetailTrigger.getAttribute('data-project-id');
      if (pid) window.openProjectDetails(pid);
      return;
    }

    // Project Details Close
    const projectDetailClose = target.closest('#modal-close-btn, [data-action="close-project-details"]');
    if (projectDetailClose) {
      if (target.closest('[data-stop-propagation="true"]') && !target.closest('button[data-action="close-project-details"], #modal-close-btn')) {
        return;
      }
      e.preventDefault();
      window.closeProjectDetails();
      return;
    }

    // Domain Option Selector
    const domainTrigger = target.closest('[data-action="select-domain"]');
    if (domainTrigger) {
      e.preventDefault();
      const domain = domainTrigger.getAttribute('data-domain');
      if (domain) window.selectDomainOption(domain);
      return;
    }

    // Terminal Simulation
    const termTrigger = target.closest('#simulate-terminal-btn, [data-action="simulate-terminal"]');
    if (termTrigger) {
      e.preventDefault();
      window.simulateTerminalInquiry();
      return;
    }

    // Live AI Chat Simulator
    const simTrigger = target.closest('#sim-btn, [data-action="simulate-chat"]');
    if (simTrigger) {
      e.preventDefault();
      window.simulateLiveInquiry();
      return;
    }

    // Workflow Simulation
    const wfTrigger = target.closest('#wf-trigger-btn, [data-action="run-flow"]');
    if (wfTrigger) {
      e.preventDefault();
      window.runWorkflowSimulation();
      return;
    }

    // Copy Email
    const copyTrigger = target.closest('[data-action="copy-email"]');
    if (copyTrigger) {
      e.preventDefault();
      window.copyEmail();
      return;
    }

    // Filter Project Tabs
    const filterTab = target.closest('.filter-tab');
    if (filterTab) {
      e.preventDefault();
      const cat = filterTab.getAttribute('data-category');
      if (cat) window.filterProjects(cat);
      return;
    }

    // Architecture Tabs
    const archTab = target.closest('.arch-tab-btn');
    if (archTab) {
      e.preventDefault();
      const tabId = archTab.getAttribute('data-tab');
      if (tabId) window.selectArchitectureTab(tabId);
      return;
    }
  });

  // --- Close modals on ESC or overlay click ---
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeLightbox();
      window.closeProjectDetails();
    }
  });

  // --- Safe Unified App Initialization ---
  function initializeApp() {
    // Only perform DOM update if preferred language is not the pre-rendered default (ar)
    if (currentLang !== 'ar') {
      window.setLanguage(currentLang);
    } else {
      // Ensure WhatsApp links have the default language query
      window.updateAllWhatsAppLinks('ar');
    }
    window.setTheme(currentTheme);
    attachDirectListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }

})();
