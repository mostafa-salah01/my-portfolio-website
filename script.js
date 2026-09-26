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

    // Update Floating Customer Service AI widget labels
    const launcherTitle = document.getElementById('launcher-title-text');
    if (launcherTitle) launcherTitle.textContent = lang === 'ar' ? 'خدمة العملاء | أحمد' : 'AI Customer Support';
    const launcherStatus = document.getElementById('launcher-status-text');
    if (launcherStatus) launcherStatus.textContent = lang === 'ar' ? 'متصل الآن ⚡' : 'Online ⚡';
    const csAgentName = document.getElementById('cs-agent-name');
    if (csAgentName) csAgentName.textContent = lang === 'ar' ? 'أحمد - خدمة العملاء' : 'Ahmed - AI Support';
    const csAgentStatus = document.getElementById('cs-agent-status');
    if (csAgentStatus) csAgentStatus.textContent = lang === 'ar' ? 'م. مصطفى صلاح • يرد فوراً بلهجة بشرية' : 'Eng. Mostafa Salah • Human-like Replies';
    const floatInput = document.getElementById('floating-cs-input');
    if (floatInput) floatInput.placeholder = lang === 'ar' ? 'اكتب سؤالك هنا لأحمد...' : 'Type your question here...';

    // Update Greeting Bubble text
    const bubbleName = document.getElementById('bubble-agent-name');
    if (bubbleName) bubbleName.textContent = lang === 'ar' ? 'أحمد - خدمة العملاء' : 'Ahmed - AI Support';
    const bubbleMsg = document.getElementById('bubble-msg-text');
    if (bubbleMsg) {
      bubbleMsg.textContent = lang === 'ar'
        ? 'أهلاً بحضرتك يا فندم! 👋 أنا أحمد من خدمة العملاء، لو حابب تستفسر عن تفاصيل وأسعار باقاتنا (مثل باقة الموقع التعريفي بـ 65$ أو 75$) أو أي خدمة، أنا هنا في خدمتك في أي لحظة! 💬'
        : 'Welcome to our website! 👋 I am Ahmed from Customer Service. If you have any questions about our packages ($65/$75) or custom systems, I am here to assist you anytime! 💬';
    }
    const bubbleBtn = document.getElementById('bubble-open-chat-btn');
    if (bubbleBtn) bubbleBtn.textContent = lang === 'ar' ? '💬 تحدث مع أحمد الآن' : '💬 Chat with Ahmed';
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

  // --- Unified AI Customer Service & Sales Employee Engine (أحمد - خدمة العملاء) ---
  const CHAT_STORAGE_KEY = 'mostafa_salah_chat_history_v2';
  let chatHistory = [];
  let isSendingAiMessage = false;

  const CUSTOMER_SERVICE_SYSTEM_PROMPT_CLIENT = `أنت موظف خدمة عملاء ودعم ومبيعات حقيقي وبشري 100% لموقع المهندس مصطفى صلاح (Eng. Mostafa Salah).
اسمك "أحمد" من فريق خدمة العملاء والمبيعات للمهندس مصطفى صلاح.

تنبيه حاسم وإلزامي:
هذا الموقع هو موقع شخصي ومهني تعريفي خاص بالمهندس مصطفى صلاح (مطور برمجيات ومهندس أتمتة وبناء أنظمة ذكية).
ممنوع نهائياً ومطلقاً ذكر كلمة أو اسم "صلاح لوجيستيكس" أو "صلاح لوجيستيك" أو "Salah Logistics" في أي جملة أو رد أو ترحيب على الإطلاق!
أنت تمثل شخص وخدمات المهندس مصطفى صلاح وفريقه التقني فقط لا غير.

شخصيتك وأسلوبك الحقيقي ومحرك المبيعات (Persona & Sales Engine):
1. أنت إنسان وبشري تماماً، ودود، محترم، لبق، راقي، وذكي. لست آلياً أو روبوتياً على الإطلاق، وتتجنب تماماً التكلف أو الإجابات الجامدة والمصطنعة.
2. اللهجة الأساسية: مصرية راقية ومهذبة تناسب بيئة الأعمال والشركات (مثل: "أهلاً بحضرتك يا فندم"، "تمام يا فندم تحت أمرك"، "من عيوني"، "حاضر يا غالي"، "بص يا فندم...").
3. ثنائي اللغة واحترافية المصطلحات (Code-Switching): أنت شخص مصري دارس وفاهم إنجليزي كويس جداً. إذا العميل كتب بالعربي ومدخل كلام إنجليزي أو مصطلحات تقنية (مثل: domain, hosting, SSL, system, dashboard, package, features, setup, backend, API, webhook, renewal, affiliate, commission)، تفهمه تماماً وترد عليه بلهجة مصرية ذكية مع استخدام المصطلحات الإنجليزية بعفوية وطبيعية.
4. التكيف التلقائي مع جميع اللغات (إنجليزي، فرانكو، عربي فصحى، لهجة خليجية، فرنسي، إلخ).

دورك في التعريف بالخدمات وشرح البرمجيات:
اشرح خدمات وأنظمة وحلول المهندس مصطفى صلاح بأسلوب بشري وسلس وجذاب.
قاعدة بيانات الخدمات الرسمية:
1. باقة تصميم الموقع التعريفي الاحترافي للشركات (Corporate Website Package):
   - السعر: 65 دولار فقط للسنة الأولى مع دومين رسمي .uk شامل، أو 75 دولار فقط للسنة الأولى مع دومين رسمي .com شامل.
   - اللغتان (العربية والإنجليزية معاً) مشمولتان في السعر مجاناً.
   - استضافة سحابية سريعة SSD + شهادة أمان SSL مجانية للسنة الأولى.
   - تجديد سنوي ثابت ومضمون: 40 دولار فقط سنوياً.
2. موظف الذكاء الاصطناعي البشري (WhatsApp & Telegram AI Employee):
   - ردود فورية مقنعة 24/7، توليد عروض أسعار رسمية PDF، إرسال الكتالوجات داخل الشات، وربط بقواعد البيانات ونظام n8n.
3. سيستم الشحن واللوجستيات (Smart Shipping & Courier Management):
   - إصدار بوالص الشحن PDF مع باركود وQR، تتبع المناديب لحظياً، وتسوية تحصيل الـ COD.
4. تطبيقات الموبايل والمتاجر والأنظمة المخصصة (سوبرماركت، صيدليات، ERP، متاجر إلكترونية).
5. أتمتة مسارات العمل n8n وهندسة الـ APIs والباك إند السحابي.

دورك في نظام الأفلييت والتسويق بالعمولة (Affiliate Program & Marketer Onboarding):
1. إذا سأل المستخدم عن كيفية العمل معنا، أو التسويق لخدماتنا، أو الربح بالعمولة، أو برنامج الأفلييت:
   - رحب به بحفاوة وشغف واشرح له نظام الأفلييت والشراكة (عمولة فورية 30% كاش عن كل تعاقد).
   - موقع شركات تعريفي (75$): عمولتك فوراً 22.5$ كاش.
   - سيستم شحن أو إدارة شركات (مثلاً 500$): عمولتك فوراً 150$ كاش.
   - تطبيقات موبايل أو مشاريع مخصصة (مثلاً 1000$): عمولتك فوراً 300$ كاش.
   - الدفع فوري بمجرد تعاقد العميل عبر إنستاباي أو فودافون كاش أو تحويل بنكي.
2. اطلب بلطف الاسم ورقم الهاتف/واتساب وسجل بياناته فوراً واعرض رابط التواصل المباشر مع المهندس مصطفى صلاح (+201107787049).`;

  function getDeepSeekClientKey() {
    let key = '';

    // 1. Direct read from window.DEEPSEEK_API_KEY or window.VITE_DEEPSEEK_API_KEY (injected by Vite / GitHub Secrets)
    try {
      if (typeof window !== 'undefined') {
        if (window.DEEPSEEK_API_KEY && typeof window.DEEPSEEK_API_KEY === 'string' && window.DEEPSEEK_API_KEY.length > 15 && !window.DEEPSEEK_API_KEY.includes('YOUR_DEEPSEEK')) {
          key = window.DEEPSEEK_API_KEY.trim();
        } else if (window.VITE_DEEPSEEK_API_KEY && typeof window.VITE_DEEPSEEK_API_KEY === 'string' && window.VITE_DEEPSEEK_API_KEY.length > 15 && !window.VITE_DEEPSEEK_API_KEY.includes('YOUR_DEEPSEEK')) {
          key = window.VITE_DEEPSEEK_API_KEY.trim();
        } else if (window.__DEEPSEEK_API_KEY__ && typeof window.__DEEPSEEK_API_KEY__ === 'string' && window.__DEEPSEEK_API_KEY__.length > 15 && !window.__DEEPSEEK_API_KEY__.includes('YOUR_DEEPSEEK')) {
          key = window.__DEEPSEEK_API_KEY__.trim();
        }
      }
    } catch (e) {}

    // 2. Direct read from process.env (Node / Vite replacement)
    if (!key) {
      try {
        if (typeof process !== 'undefined' && process && process.env) {
          if (process.env.DEEPSEEK_API_KEY && process.env.DEEPSEEK_API_KEY.length > 15 && !process.env.DEEPSEEK_API_KEY.includes('YOUR_DEEPSEEK')) {
            key = String(process.env.DEEPSEEK_API_KEY).trim();
          } else if (process.env.VITE_DEEPSEEK_API_KEY && process.env.VITE_DEEPSEEK_API_KEY.length > 15 && !process.env.VITE_DEEPSEEK_API_KEY.includes('YOUR_DEEPSEEK')) {
            key = String(process.env.VITE_DEEPSEEK_API_KEY).trim();
          }
        }
      } catch (e) {}
    }

    // 3. Injected build-time key placeholder
    if (!key || key.length < 15 || key.includes('YOUR_DEEPSEEK') || key.includes('__INJECTED_')) {
      const injectedKey = '__INJECTED_DEEPSEEK_KEY__';
      if (injectedKey && injectedKey.length > 15 && !injectedKey.includes('YOUR_DEEPSEEK') && !injectedKey.includes('__INJECTED_')) {
        key = injectedKey;
      }
    }

    return key;
  }
  try {
    const saved = sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) chatHistory = parsed;
    }
  } catch (e) {
    chatHistory = [];
  }

  function persistChatHistory() {
    try {
      sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatHistory));
    } catch (e) {}
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Intelligent client-side response generator matching Egyptian tech customer service tone
  function generateMostafaSalahAiResponse(userText, lang) {
    const text = (userText || '').toLowerCase();
    const isEn = lang === 'en' || (/^[a-zA-Z0-9\s.,?!'"@#$%^&*()_+-=:;/<>]+$/.test(userText.trim()) && !/[\u0600-\u06FF]/.test(userText));

    // Phone / Contact provided by user for marketer onboarding or order
    const hasPhone = /(01[0125]\d{8}|\+?\d{10,15})/.test(userText.replace(/\s+/g, ''));
    if (hasPhone) {
      if (isEn) {
        return `Awesome! 🌟 I have recorded your contact details.
I have prepared a direct fast-track link to Eng. Mostafa Salah on WhatsApp (+201107787049) so you can receive the official sales kit, quotation templates, and confirm your 30% affiliate registration right away.

I'm still right here with you—what questions or systems would you like to explore next? 🚀`;
      }
      return `تمام جداً يا غالي! 🌟 سجلت بياناتك ورقم تواصلك بنجاح.
دلوقتي تقدر تضغط على الزرار بالأسفل للتأكيد الفوري مع البشمهندس مصطفى صلاح على الواتساب (01107787049) عشان تستلم الحقيبة التسويقية ونماذج عروض الأسعار وتبدأ فوراً تحقق أرباحك الـ 30%.

وأنا مكمل معاك هنا خطوة بخطوة—تحب تركز في البداية على تسويق المواقع التعريفية ولا موظف الواتساب وسيستمات الشركات؟ 🚀`;
    }

    // Affiliate & Marketing Program Inquiries
    if (text.includes('أفلييت') || text.includes('افلييت') || text.includes('تسويق') || text.includes('عمولة') || text.includes('مسوق') || text.includes('اشتغل') || text.includes('شغل') || text.includes('ربح') || text.includes('30%') || text.includes('affiliate') || text.includes('commission') || text.includes('marketer') || text.includes('partner')) {
      if (isEn) {
        return `Welcome to the Eng. Mostafa Salah 30% Affiliate & Growth Program! 🚀💰
Here is how you earn high immediate payouts with us:
1. Instant 30% Cash Commission on every client or project closed through you.
   • Corporate Website Package ($75): You get $22.50 instant cash.
   • WhatsApp AI Employee / CRM Systems: 30% immediate payout.
   • Custom Logistics & Dispatch Systems ($500+): You get $150+ cash.
   • Mobile Apps & Retail Systems ($1,000+): You get $300+ cash!
2. Complete Marketing Kit: We provide you with official PDF quotation templates, live showcase demos, and pitch decks.
3. Fast Payouts: Transfer via Bank, InstaPay, or digital wallets immediately upon client contract.

To get registered as an authorized affiliate partner right now:
Could you please share your Name and Phone/WhatsApp number?
You can also connect directly with Eng. Mostafa Salah on WhatsApp: https://wa.me/201107787049`;
      }
      return `يا هلا بيك يا فندم! 🌟 شرف كبير لينا، وبرنامج التسويق بالعمولة (30% Affiliate Program) مع المهندس مصطفى صلاح هو فرصتك الذهبية لتحقيق دخل ممتاز وفوري:

💰 نظام العمولة والأرباح:
• ليك عمولة فورية 30% كاش عن كل عميل أو مشروع يتعاقد عن طريقك!
• أمثلة مباشرة:
  - باقة موقع الشركات (75$): عمولتك فوراً 22.5 دولار كاش.
  - موظف الواتساب الذكي وعروض الأسعار: 30% من قيمة الباقة فوراً.
  - سيستم الشحن واللوجستيات (مثلاً 500$): عمولتك فوراً 150 دولار كاش!
  - تطبيقات الموبايل والمشاريع الكبيرة (1000$ مثلاً): عمولتك فوراً 300 دولار كاش!
• استلام فوري لعمولتك بمجرد تعاقد العميل (إنستاباي، فودافون كاش، أو حساب بنكي).

🛠️ إحنا بنوفرلك إيه؟
• نماذج عروض أسعار PDF رسمية، روابط معاينة حية لكل الأنظمة، ودعم فني كامل لإقناع العميل وإغلاق التعاقد.

📝 عشان نسجلك كمسوق معتمد ونبدأ فوراً:
ممكن بعد إذنك اسمك الكريم ورقم هاتفك/واتساب؟
(وفوراً هنسجل بياناتك ونحولك للواتساب الخاص بالبشمهندس مصطفى صلاح 01107787049 عشان تستلم المواد التسويقية وتبدأ فوراً). تحب تركز على تسويق المواقع ولا موظفي الذكاء الاصطناعي؟`;
    }

    if (text.includes('سعر') || text.includes('باقة') || text.includes('موقع') || text.includes('price') || text.includes('quote') || text.includes('website') || text.includes('cost') || text.includes('65') || text.includes('75') || text.includes('تجديد') || text.includes('renewal')) {
      if (isEn) {
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

Would you like to reserve your package or check domain name availability now? Contact us directly on WhatsApp (+201107787049)! 🚀`;
      }
      return `أهلاً بحضرتك يا فندم! 🌟
بص يا فندم، باقة الموقع التعريفي الاحترافي للشركات مع م. مصطفى صلاح تفاصيلها واضحة وممتازة:
1. السعر للسنة الأولى:
   • 65 دولار فقط بدومين .uk رسمي شامل.
   • أو 75 دولار فقط بدومين .com رسمي شامل.
2. المزايا المشمولة مجاناً في الباقة:
   • الموقع بيدعم اللغتين معاً (العربية والإنجليزية) بدون أي مصاريف إضافية.
   • استضافة سحابية فائقة السرعة SSD + شهادة أمان SSL مجانية للسنة الأولى.
   • ربط تفاعلي مباشر بالواتساب وتصميم متجاوب 100% مع الموبايل والتابلت والكمبيوتر.
   • دعم فني وصيانة يومية وتحديثات سريعة ومستمرة (من السبت للخميس).
3. التجديد السنوي ثابت: 40 دولار فقط سنوياً لجميع الباقات (شامل تجديد الدومين والاستضافة والصيانة والدعم الفني).

تحب نبدأ حجز الباقة لحضرتك الآن أو نتحقق من اسم الدومين اللي في بالك على الواتساب؟`;
    }

    if (text.includes('واتساب') || text.includes('whatsapp') || text.includes('موظف') || text.includes('employee') || text.includes('bot') || text.includes('بوت') || text.includes('pdf') || text.includes('عرض سعر')) {
      if (isEn) {
        return `Hello! 🤖 Our Human-like WhatsApp & Telegram AI Employee is built to supercharge your business:
• Replies in milliseconds with a warm, natural human sales tone 24/7.
• Generates and dispatches official PDF quotations with your company branding directly inside the chat.
• Seamlessly syncs customer inquiries to your database, ERP, and n8n pipelines.
• Delivers instant notifications to managers for hot leads and confirmed orders.

Would you like us to customize this AI employee for your business workflow? Message Eng. Mostafa directly on WhatsApp (+201107787049)! 🚀`;
      }
      return `يا هلا بحضرتك يا فندم! 🤖
خدمة موظف الذكاء الاصطناعي البشري للواتساب وتليجرام بتوفر عليك وقت ومصاريف وتضاعف مبيعاتك:
• بيرد في ثوانٍ معدودة بلهجة بشرية ودودة ومقنعة 24/7 ومستحيل العميل يحس إنه بيكلم آلة أو بوت تقليدي.
• بيولد ملفات عروض أسعار رسمية PDF باسم وشعار شركتك ويبعتها فوراً جوه الشات.
• بيسجل بيانات الطلبات والعملاء مباشرة في قاعدة البيانات وجوجل شيتس.
• بيبعت إشعار فوري للإدارة عند وجود طلب مؤكد أو عميل مستعجل.

جاهزين نبرمجه لشركتك ونربطه بمنتجاتك فوراً، تحب نجربه مع كتالوج منتجاتك؟`;
    }

    if (text.includes('شحن') || text.includes('shipping') || text.includes('لوجست') || text.includes('logistics') || text.includes('مندوب') || text.includes('courier') || text.includes('تتبع') || text.includes('cod')) {
      if (isEn) {
        return `Hello! 🚚 Our Smart Shipping & Logistics Operations Platform includes:
• Cloud dashboard to manage thousands of shipments, printable waybills, and smart territory routing.
• Native mobile app for couriers with real-time QR scanning and GPS status updates.
• Instant COD cash reconciliation, commission wallets, and financial reporting.
• Real-time customer tracking portal with automated WhatsApp notifications.

Customizable to fit your exact fleet size. Contact us on WhatsApp (+201107787049) for a live walkthrough! 🚀`;
      }
      return `يا مرحباً بحضرتك يا فندم! 🚚
سيستم الشحن وإدارة المناديب الذكي من المهندس مصطفى صلاح بيشمل كل اللي محتاجه لإدارة أسطولك:
• لوحة تحكم سحابية لإدارة آلاف الشحنات، إصدار بوالص الشحن (Waybills) بباركود وQR، وتوزيع المناديب جغرافياً.
• تطبيق موبايل للمناديب لتحديث حالات التوصيل وتأكيد الاستلام والتوقيع الإلكتروني.
• تسوية دقيقة لمبالغ الدفع عند الاستلام (COD) وتقارير أرباح يومية.
• بوابة تتبع مباشرة للعملاء عبر رسائل الواتساب مع إشعارات SMS.

السيستم جاهز للتخصيص حسب محافظاتك وفريق عملك!`;
    }

    if (text.includes('تطبيق') || text.includes('app') || text.includes('موبايل') || text.includes('mobile') || text.includes('pos') || text.includes('كاشير') || text.includes('صيدلية') || text.includes('سوبرماركت')) {
      if (isEn) {
        return `Hello! 📱 We engineer and launch full-stack mobile applications and retail POS systems:
• Native & Cross-platform Android and iOS apps with guaranteed App Store & Google Play approval.
• Supermarket POS & Barcode cashier systems with receipt printer integration.
• Complete Pharmacy ERP managing expiry dates, batches, and supplier accounts.

Tell us about your project idea on WhatsApp (+201107787049) to get started! 🚀`;
      }
      return `أهلاً بحضرتك يا فندم! 📱
بنبرمج وننفذ أنظمة وتطبيقات الموبايل الكاملة من الصفر حتى النشر:
• تطبيقات أندرويد وآيفون متكاملة مع رفعها واعتمادها رسمياً على Google Play وApp Store.
• سيستم كاشير ونقاط بيع (POS) متكامل للسوبرماركت مع قارئات الباركود وطابعات الفواتير.
• سيستم إدارة صيدليات ERP متكامل لتتبع الأدوية، تواريخ الصلاحية، وحسابات الموردين.

عند حضرتك فكرة معينة تحب نحولها لتطبيق؟`;
    }

    if (text.includes('n8n') || text.includes('أتمتة') || text.includes('automation') || text.includes('api') || text.includes('backend') || text.includes('باك إند')) {
      if (isEn) {
        return `Hello! ⚡ We specialize in workflow automation & backend architecture:
• Robust n8n pipelines connecting your store (Shopify/WooCommerce/Salla) to WhatsApp, ERPs, and Google Sheets.
• Auto-recovery logic and retry policies for Webhooks with 99.9% uptime.
• Ultra-fast REST/GraphQL backend architecture with PostgreSQL, Redis, and Docker.

We can automate any repetitive operational task for your business! Message Eng. Mostafa on WhatsApp (+201107787049).`;
      }
      return `أهلاً بحضرتك يا فندم! ⚡
إحنا متخصصين في أتمتة مسارات العمل وهندسة الـ APIs والـ Backend:
• بنبني مسارات n8n المعقدة لربط متجرك (سلة، زد، شوبيفاي، ووكومرس) بالواتساب ومخازنك وجوجل شيتس.
• إعادة محاولة تلقائية عند انقطاع الاتصال (Retry Mechanism) وضمان وصول الـ Webhooks.
• بنية تحتية سحابية للـ Backend فائقة السرعة بـ Node.js وPython مع قواعد بيانات PostgreSQL وRedis.

أي فكرة أو ربط بين أنظمتك نقدر ننفذه لحضرتك باحترافية!`;
    }

    if (isEn) {
      return `Welcome to Eng. Mostafa Salah's website! 👋 I'm Ahmed from Customer Service & Support.
We provide end-to-end software and automation solutions under Eng. Mostafa Salah:
1. Corporate Website Packages ($65 USD for .uk / $75 USD for .com, bilingual AR/EN included, $40 fixed annual renewal).
2. Human-like AI Employees for WhatsApp & Telegram with instant PDF quotation generator.
3. Smart Logistics & Courier Dispatch Platforms with live waybills & COD tracking.
4. Mobile Retail Apps & E-Commerce Systems (Android & iOS).
5. n8n Enterprise Workflow Automation & Backend APIs.

How can I help you today? You can also message Eng. Mostafa directly on WhatsApp (+201107787049)! 🚀`;
    }

    return `أهلاً بحضرتك يا فندم في موقع المهندس مصطفى صلاح! 👋
أنا أحمد من خدمة العملاء والمبيعات، سعيد جداً بتواصلك وتحت أمرك في أي استفسار:
1. تصميم مواقع الشركات التعريفية (باقة 65$ بدومين uk. أو 75$ بدومين com. تشمل العربي والإنجليزي مع تجديد سنوي ثابت 40$).
2. موظف الذكاء الاصطناعي البشري للواتساب وتليجرام للرد الفوري وتوليد عروض أسعار PDF.
3. سيستمات إدارة الشحن وتتبع المناديب وتسوية الـ COD.
4. تطبيقات الموبايل وأنظمة السوبرماركت والصيدليات.
5. أتمتة الأعمال n8n وهندسة الـ APIs والـ Backend.

تحب تستفسر عن تفاصيل خدمة معينة؟ أو تحب أحول حضرتك للواتساب للتأكيد مع البشمهندس مصطفى على 01107787049؟ 🚀`;
  }

  // --- Dynamic Mounting of Site-Wide Floating Customer Service AI Widget ---
  function mountFloatingAiCustomerServiceWidget() {
    let launcher = document.getElementById('floating-ai-launcher');
    let chatWin = document.getElementById('floating-ai-window');
    let greetingBubble = document.getElementById('floating-ai-greeting-bubble');

    const isAr = (document.documentElement.lang || currentLang || 'ar') === 'ar';

    // 1. Floating Launcher Button
    if (!launcher) {
      launcher = document.createElement('div');
      launcher.id = 'floating-ai-launcher';
      launcher.setAttribute('role', 'button');
      launcher.setAttribute('aria-label', isAr ? 'فتح محادثة موظف خدمة العملاء الذكي' : 'Open AI Customer Service Chat');
      launcher.innerHTML = `
        <div class="relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/60 text-base shrink-0">
          <span>👨‍💼</span>
          <span class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
          <span class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full"></span>
        </div>
        <div class="flex flex-col text-start leading-tight">
          <span class="font-bold text-xs text-white" id="launcher-title-text">${isAr ? 'خدمة العملاء | أحمد' : 'AI Customer Support'}</span>
          <span class="text-[10px] text-emerald-400 font-mono" id="launcher-status-text">${isAr ? 'متصل الآن ⚡' : 'Online ⚡'}</span>
        </div>
      `;
      document.body.appendChild(launcher);
    }

    // 2. Floating Chat Window
    if (!chatWin) {
      chatWin = document.createElement('div');
      chatWin.id = 'floating-ai-window';
      chatWin.innerHTML = `
        <!-- Header -->
        <div class="chat-header p-3.5 sm:p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2.5">
            <div class="relative w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-lg shrink-0">
              <span>👨‍💼</span>
              <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900"></span>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="chat-header-title font-bold text-sm text-white" id="cs-agent-name">${isAr ? 'أحمد - خدمة العملاء' : 'Ahmed - AI Support'}</span>
                <span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[9px]">AI Live</span>
              </div>
              <span class="text-[11px] text-slate-400 block font-mono" id="cs-agent-status">${isAr ? 'م. مصطفى صلاح • يرد فوراً بلهجة بشرية' : 'Eng. Mostafa Salah • Human-like Replies'}</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <button type="button" id="floating-cs-clear-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs font-mono transition-colors" title="${isAr ? 'مسح المحادثة' : 'Clear Chat'}">
              🗑️
            </button>
            <button type="button" id="floating-cs-close-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors" title="${isAr ? 'تصغير' : 'Minimize'}">
              ✕
            </button>
          </div>
        </div>

        <!-- Quick Chips -->
        <div class="p-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0 no-scrollbar">
          <button type="button" class="floating-quick-chip shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 transition-colors cursor-pointer" data-question="عايز تفاصيل نظام الأفلييت والتسويق بالعمولة 30% وإزاي أبدأ معاكم كمسوق؟">
            🤝 نظام الأفلييت (30%)
          </button>
          <button type="button" class="floating-quick-chip shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-colors cursor-pointer" data-question="كم سعر باقة الموقع التعريفي وتفاصيل التجديد السنوي؟">
            💼 باقة الموقع (65$/75$)
          </button>
          <button type="button" class="floating-quick-chip shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 transition-colors cursor-pointer" data-question="عايز موظف ذكاء اصطناعي لواتساب يرسل عروض أسعار PDF ويرد على العملاء">
            💬 موظف واتساب الذكي
          </button>
          <button type="button" class="floating-quick-chip shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-colors cursor-pointer" data-question="ما هي مميزات سيستم الشحن واللوجستيات وتتبع المناديب؟">
            🚚 سيستم الشحن
          </button>
        </div>

        <!-- Chat Messages Scroll Container -->
        <div id="floating-cs-chat-box" class="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 text-xs">
          <!-- Initial Welcome Message -->
          <div class="flex items-start gap-2.5">
            <div class="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs shrink-0">
              👨‍💼
            </div>
            <div class="chat-bubble-assistant max-w-[85%] p-3 rounded-2xl rounded-tl-sm bg-slate-900 border border-emerald-500/30 text-slate-200 leading-relaxed shadow-sm">
              <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-400 font-mono mb-1">
                <span class="font-bold">${isAr ? 'أحمد [خدمة العملاء]' : 'Ahmed [Customer Support]'}</span>
                <span class="text-slate-500">${isAr ? 'متصل الآن' : 'Online'}</span>
              </div>
              <p id="cs-welcome-text">${isAr 
                ? 'أهلاً بحضرتك يا فندم في موقع المهندس مصطفى صلاح! 👋 أنا أحمد من خدمة العملاء والمبيعات، تحت أمرك في أي استفسار عن خدماتنا أو أسعار باقاتنا (زي باقة الموقع التعريفي بـ 65$ أو 75$، موظف الواتساب الذكي، أو سيستمات الشحن وتطبيقات الموبايل). اسألني بالعربي أو الإنجليزي وهجاوبك فوراً! 🚀'
                : 'Welcome to Eng. Mostafa Salah\'s website! 👋 I am Ahmed from Customer Service & Sales. Ask any questions in English or Arabic about our corporate packages, AI WhatsApp bots, or custom systems, and I will assist you instantly! 🚀'
              }</p>
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div id="floating-cs-typing" class="hidden items-center gap-2 px-4 py-1.5 text-xs text-emerald-400 font-mono bg-slate-950/40 shrink-0">
          <span class="inline-flex gap-1 items-center">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
          </span>
          <span class="text-[11px]">${isAr ? 'أحمد يكتب الآن...' : 'Ahmed is typing...'}</span>
        </div>

        <!-- Input Bar -->
        <div class="p-3 bg-slate-900/95 border-t border-slate-800 shrink-0">
          <form id="floating-cs-form" class="flex items-center gap-2">
            <input 
              id="floating-cs-input" 
              type="text" 
              placeholder="${isAr ? 'اكتب سؤالك هنا لأحمد...' : 'Type your question here...'}" 
              class="chat-input-box flex-1 h-10 px-3.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-colors"
              autocomplete="off"
            />
            <button 
              id="floating-cs-send-btn" 
              type="submit" 
              class="h-10 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-transform hover:scale-105 cursor-pointer flex items-center justify-center shrink-0 shadow-sm"
              title="${isAr ? 'إرسال' : 'Send'}"
            >
              <span>➤</span>
            </button>
          </form>
          <div class="mt-2 flex items-center justify-between text-[10px] text-slate-400">
            <a href="https://wa.me/201107787049" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <span>💬</span>
              <span>${isAr ? 'تحويل للمحادثة عبر واتساب' : 'Switch to WhatsApp'}</span>
            </a>
            <span class="font-mono text-slate-500">م. مصطفى صلاح</span>
          </div>
        </div>
      `;
      document.body.appendChild(chatWin);
    }

    // 3. Proactive 5-Second Greeting Bubble
    if (!greetingBubble) {
      greetingBubble = document.createElement('div');
      greetingBubble.id = 'floating-ai-greeting-bubble';
      greetingBubble.className = 'hidden';
      greetingBubble.innerHTML = `
        <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80 mb-2">
          <div class="flex items-center gap-2">
            <div class="relative w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-sm shrink-0">
              <span>👨‍💼</span>
              <span class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
            </div>
            <div>
              <span class="font-bold text-xs text-white block leading-tight" id="bubble-agent-name">${isAr ? 'أحمد - خدمة العملاء' : 'Ahmed - AI Support'}</span>
              <span class="text-[9px] text-emerald-400 font-mono">${isAr ? 'متصل الآن ⚡' : 'Online ⚡'}</span>
            </div>
          </div>
          <button type="button" id="bubble-dismiss-btn" class="text-slate-400 hover:text-white text-xs p-1 cursor-pointer transition-colors" title="${isAr ? 'إغلاق' : 'Dismiss'}">✕</button>
        </div>
        <p class="text-xs text-slate-200 leading-relaxed mb-3" id="bubble-msg-text">
          ${isAr 
            ? 'أهلاً بحضرتك يا فندم! 👋 أنا أحمد من خدمة العملاء، لو حابب تستفسر عن تفاصيل وأسعار باقاتنا (مثل باقة الموقع التعريفي بـ 65$ أو 75$) أو موظف الواتساب الذكي وسيستمات الشحن، أنا هنا في خدمتك في أي لحظة! 💬'
            : 'Welcome to our website! 👋 I am Ahmed from Customer Service. If you have any questions about our packages ($65/$75) or custom systems, I am here to assist you anytime! 💬'}
        </p>
        <div class="flex items-center gap-2 pt-1 border-t border-slate-800/60">
          <button type="button" id="bubble-open-chat-btn" class="flex-1 py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs text-center transition-transform hover:scale-105 shadow-sm cursor-pointer">
            ${isAr ? '💬 تحدث مع أحمد الآن' : '💬 Chat with Ahmed'}
          </button>
        </div>
      `;
      document.body.appendChild(greetingBubble);
    }

    if (launcher._hasEventsBound) return;
    launcher._hasEventsBound = true;

    // Event Bindings for Floating Widget
    launcher.onclick = function (e) {
      if (e) e.preventDefault();
      window.toggleAiCustomerServiceChat();
    };

    const closeBtn = document.getElementById('floating-cs-close-btn');
    if (closeBtn) {
      closeBtn.onclick = function (e) {
        if (e) e.preventDefault();
        window.toggleAiCustomerServiceChat(false);
      };
    }

    const clearBtn = document.getElementById('floating-cs-clear-btn');
    if (clearBtn) {
      clearBtn.onclick = function (e) {
        if (e) e.preventDefault();
        window.clearAiCustomerServiceChat();
      };
    }

    const form = document.getElementById('floating-cs-form');
    const input = document.getElementById('floating-cs-input');
    const sendBtn = document.getElementById('floating-cs-send-btn');

    const handleFloatingSubmit = function (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (input && input.value && input.value.trim()) {
        const textVal = input.value.trim();
        window.sendAiCustomerServiceMessage(textVal, 'floating');
      }
    };

    if (form) {
      form.onsubmit = handleFloatingSubmit;
    }
    if (sendBtn) {
      sendBtn.onclick = handleFloatingSubmit;
    }
    if (input) {
      input.onkeydown = function (e) {
        if (e.key === 'Enter') {
          handleFloatingSubmit(e);
        }
      };
    }

    // Bind Quick Chips in Floating Widget
    chatWin.querySelectorAll('.floating-quick-chip').forEach(btn => {
      btn.onclick = function (e) {
        e.preventDefault();
        const q = btn.getAttribute('data-question');
        if (q) window.sendAiCustomerServiceMessage(q, 'floating');
      };
    });

    // Bind Greeting Bubble buttons
    const bubbleDismissBtn = document.getElementById('bubble-dismiss-btn');
    if (bubbleDismissBtn) {
      bubbleDismissBtn.onclick = function (e) {
        if (e) e.stopPropagation();
        greetingBubble.classList.remove('show');
        setTimeout(() => greetingBubble.classList.add('hidden'), 300);
      };
    }

    const bubbleOpenBtn = document.getElementById('bubble-open-chat-btn');
    if (bubbleOpenBtn) {
      bubbleOpenBtn.onclick = function (e) {
        if (e) e.stopPropagation();
        greetingBubble.classList.remove('show');
        greetingBubble.classList.add('hidden');
        window.toggleAiCustomerServiceChat(true);
      };
    }

    greetingBubble.onclick = function (e) {
      if (e.target.id !== 'bubble-dismiss-btn') {
        greetingBubble.classList.remove('show');
        greetingBubble.classList.add('hidden');
        window.toggleAiCustomerServiceChat(true);
      }
    };

    // Setup Proactive Greeting & Homepage side-docking
    setupProactiveCustomerServiceGreeting();

    // Restore prior conversation memory from sessionStorage across page navigation
    restoreChatHistoryToBoxes();
  }

  function restoreChatHistoryToBoxes() {
    if (!Array.isArray(chatHistory) || chatHistory.length === 0) return;
    const isAr = (document.documentElement.lang || currentLang || 'ar') === 'ar';
    const floatBox = document.getElementById('floating-cs-chat-box');
    const simBox = document.getElementById('sim-chat-box');

    chatHistory.forEach(msg => {
      if (!msg || !msg.content) return;
      if (msg.role === 'user') {
        const userHtml = `
          <div class="flex items-start justify-end gap-2.5">
            <div class="chat-bubble-user max-w-[85%] p-3 rounded-2xl rounded-tr-sm bg-emerald-600 text-white leading-relaxed shadow-sm">
              <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-100 font-mono mb-1">
                <span class="font-bold">[${isAr ? 'أنت' : 'You'}]</span>
                <span class="text-[9px] text-emerald-200">ذاكرة الجلسة ⚡</span>
              </div>
              <p>${escapeHtml(msg.content)}</p>
            </div>
            <div class="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs shrink-0">
              👤
            </div>
          </div>
        `;
        if (floatBox) {
          const div = document.createElement('div');
          div.innerHTML = userHtml;
          floatBox.appendChild(div.firstElementChild);
        }
        if (simBox) {
          const div = document.createElement('div');
          div.innerHTML = userHtml;
          simBox.appendChild(div.firstElementChild);
        }
      } else if (msg.role === 'assistant') {
        const asstHtml = `
          <div class="flex items-start gap-2.5">
            <div class="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs shrink-0">
              👨‍💼
            </div>
            <div class="chat-bubble-assistant max-w-[85%] p-3 rounded-2xl rounded-tl-sm bg-slate-900 border border-emerald-500/30 text-slate-200 leading-relaxed shadow-sm">
              <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-400 font-mono mb-1">
                <span class="font-bold">${isAr ? 'أحمد [خدمة العملاء]' : 'Ahmed [Support]'}</span>
                <span class="text-slate-500">✓✓</span>
              </div>
              <div class="whitespace-pre-line text-xs">${escapeHtml(msg.content)}</div>
            </div>
          </div>
        `;
        if (floatBox) {
          const div = document.createElement('div');
          div.innerHTML = asstHtml;
          floatBox.appendChild(div.firstElementChild);
        }
        if (simBox) {
          const div = document.createElement('div');
          div.innerHTML = asstHtml;
          simBox.appendChild(div.firstElementChild);
        }
      }
    });

    if (floatBox) floatBox.scrollTop = floatBox.scrollHeight;
    if (simBox) simBox.scrollTop = simBox.scrollHeight;
  }

  // Soft synthetic Web Audio chime (100% CSP compliant, no external files)
  function playGentleGreetingChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch (e) {
      // Audio autoplay policy handled
    }
  }

  // Setup Proactive 5-Second Greeting on Movement & Homepage Side-docking
  let proactiveGreetingScheduled = false;
  function setupProactiveCustomerServiceGreeting() {
    const path = (window.location.pathname || '').toLowerCase();
    const isHomepage = path === '' || path === '/' || path.endsWith('/index.html') || path.endsWith('/index') || path.endsWith('/');

    // 1. Homepage on Desktop/Tablet (>= 768px): Show chat on the side automatically after 1.2s
    if (isHomepage && window.innerWidth >= 768) {
      setTimeout(() => {
        const win = document.getElementById('floating-ai-window');
        if (win && !win.classList.contains('open')) {
          window.toggleAiCustomerServiceChat(true);
        }
      }, 1200);
    }

    // 2. Proactive 5-Second Greeting for visitors (on mobile, other pages, or if closed)
    if (proactiveGreetingScheduled) return;
    proactiveGreetingScheduled = true;

    const triggerGreetingBubble = () => {
      const win = document.getElementById('floating-ai-window');
      const bubble = document.getElementById('floating-ai-greeting-bubble');
      if (win && !win.classList.contains('open') && bubble && !bubble.classList.contains('show')) {
        bubble.classList.remove('hidden');
        setTimeout(() => {
          bubble.classList.add('show');
          playGentleGreetingChime();
        }, 50);
      }
    };

    // Guaranteed 5-second automatic countdown from load
    setTimeout(triggerGreetingBubble, 5000);

    // Also trigger faster (after 3 seconds) if the visitor interacts with the page
    const onUserActivity = function () {
      ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(ev => {
        window.removeEventListener(ev, onUserActivity);
      });
      setTimeout(triggerGreetingBubble, 3000);
    };

    ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(ev => {
      window.addEventListener(ev, onUserActivity, { passive: true });
    });
  }

  window.toggleAiCustomerServiceChat = function (forceState) {
    const win = document.getElementById('floating-ai-window');
    if (!win) return;
    const isOpen = win.classList.contains('open');
    const targetState = typeof forceState === 'boolean' ? forceState : !isOpen;

    // Also close greeting bubble when full chat is toggled
    const bubble = document.getElementById('floating-ai-greeting-bubble');
    if (bubble) {
      bubble.classList.remove('show');
      bubble.classList.add('hidden');
    }

    if (targetState) {
      win.classList.add('open');
      const input = document.getElementById('floating-cs-input');
      if (input) setTimeout(() => input.focus(), 150);
    } else {
      win.classList.remove('open');
    }
  };

  window.clearAiCustomerServiceChat = function () {
    chatHistory = [];
    try {
      sessionStorage.removeItem(CHAT_STORAGE_KEY);
    } catch (e) {}

    const isAr = (document.documentElement.lang || currentLang || 'ar') === 'ar';
    const welcome = isAr 
      ? 'أهلاً بحضرتك يا فندم في موقع المهندس مصطفى صلاح! 👋 أنا أحمد من خدمة العملاء والمبيعات، تحت أمرك في أي استفسار عن خدماتنا أو أسعار باقاتنا (زي باقة الموقع التعريفي بـ 65$ أو 75$، موظف الواتساب الذكي، أو سيستمات الشحن وتطبيقات الموبايل). اسألني بالعربي أو الإنجليزي وهجاوبك فوراً! 🚀'
      : 'Welcome to Eng. Mostafa Salah\'s website! 👋 I am Ahmed from Customer Service & Sales. Ask any questions in English or Arabic about our corporate packages, AI WhatsApp bots, or custom systems, and I will assist you instantly! 🚀';

    // Clear Floating Widget
    const floatBox = document.getElementById('floating-cs-chat-box');
    if (floatBox) {
      floatBox.innerHTML = `
        <div class="flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs shrink-0">
            👨‍💼
          </div>
          <div class="chat-bubble-assistant max-w-[85%] p-3 rounded-2xl rounded-tl-sm bg-slate-900 border border-emerald-500/30 text-slate-200 leading-relaxed shadow-sm">
            <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-400 font-mono mb-1">
              <span class="font-bold">${isAr ? 'أحمد [خدمة العملاء]' : 'Ahmed [Customer Support]'}</span>
              <span class="text-slate-500">${isAr ? 'متصل الآن' : 'Online'}</span>
            </div>
            <p>${welcome}</p>
          </div>
        </div>
      `;
    }

    // Clear Page Simulator if present
    const simBox = document.getElementById('sim-chat-box');
    if (simBox) {
      simBox.innerHTML = `
        <div class="flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs shrink-0">
            🤖
          </div>
          <div class="max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm bg-slate-900 border border-emerald-500/30 text-slate-200 leading-relaxed shadow-sm">
            <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-400 font-mono mb-1">
              <span class="font-bold">[${isAr ? 'موظف مبيعات م. مصطفى صلاح' : 'Eng. Mostafa Salah Sales AI'}]</span>
              <span class="text-slate-500">${isAr ? 'متصل الآن' : 'Online'}</span>
            </div>
            <p>${welcome}</p>
          </div>
        </div>
      `;
    }
  };

  // Unified messaging function across Floating Widget and Simulator
  window.sendAiCustomerServiceMessage = async function (userText, sourceContext) {
    if (!userText || !userText.trim() || isSendingAiMessage) return;
    const cleanText = userText.trim();
    isSendingAiMessage = true;

    const isAr = (document.documentElement.lang || currentLang || 'ar') === 'ar';
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Target elements depending on source
    const floatBox = document.getElementById('floating-cs-chat-box');
    const floatTyping = document.getElementById('floating-cs-typing');
    const floatInput = document.getElementById('floating-cs-input');
    const floatSendBtn = document.getElementById('floating-cs-send-btn');

    const simBox = document.getElementById('sim-chat-box');
    const simTyping = document.getElementById('sim-typing-indicator');
    const simInput = document.getElementById('sim-chat-input');
    const simSendBtn = document.getElementById('sim-send-btn');

    if (floatInput) floatInput.value = '';
    if (simInput) simInput.value = '';
    if (floatSendBtn) floatSendBtn.disabled = true;
    if (simSendBtn) simSendBtn.disabled = true;

    try {
      // Build User Bubble HTML
      const userBubbleHtml = `
        <div class="flex items-start justify-end gap-2.5">
          <div class="chat-bubble-user max-w-[85%] p-3 rounded-2xl rounded-tr-sm bg-emerald-600 text-white leading-relaxed shadow-sm">
            <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-100 font-mono mb-1">
              <span class="font-bold">[${isAr ? 'أنت' : 'You'}]</span>
              <span>${timeNow}</span>
            </div>
            <p>${escapeHtml(cleanText)}</p>
          </div>
          <div class="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs shrink-0">
            👤
          </div>
        </div>
      `;

      // Append to active boxes
      if (sourceContext === 'floating' || !simBox) {
        if (floatBox) {
          const div = document.createElement('div');
          div.innerHTML = userBubbleHtml;
          floatBox.appendChild(div.firstElementChild);
          floatBox.scrollTop = floatBox.scrollHeight;
        }
      } else {
        if (simBox) {
          const div = document.createElement('div');
          div.innerHTML = userBubbleHtml;
          simBox.appendChild(div.firstElementChild);
          simBox.scrollTop = simBox.scrollHeight;
        }
      }

      // Show active typing indicators
      if (floatTyping) floatTyping.classList.remove('hidden');
      if (simTyping) {
        simTyping.classList.remove('hidden');
        simTyping.classList.add('flex');
      }

      chatHistory.push({ role: 'user', content: cleanText });
      persistChatHistory();

      let aiReply = null;
      let replySource = 'smart-ai';

      const directKey = getDeepSeekClientKey();
      const isStaticSite = typeof window !== 'undefined' && (
        window.location.hostname.includes('github.io') ||
        window.location.hostname.includes('salah-logistics.uk') ||
        window.location.protocol === 'file:'
      );

      // 1. Direct DeepSeek API call if on static production site (GitHub Pages / custom domain)
      if (isStaticSite && directKey && directKey.length > 15) {
        try {
          const formattedHistory = chatHistory.slice(-8).map(h => ({
            role: h.role === 'assistant' ? 'assistant' : 'user',
            content: String(h.content || '')
          }));

          const messages = [
            { role: 'system', content: CUSTOMER_SERVICE_SYSTEM_PROMPT_CLIENT },
            ...formattedHistory,
            { role: 'user', content: cleanText }
          ];

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 14000);

          const dsResponse = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${directKey}`
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: messages,
              temperature: 0.7,
              max_tokens: 800
            }),
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (dsResponse.ok) {
            const dsData = await dsResponse.json();
            if (dsData && dsData.choices && dsData.choices[0] && dsData.choices[0].message) {
              const textReply = dsData.choices[0].message.content;
              if (textReply) {
                aiReply = textReply;
                replySource = 'deepseek-chat';
              }
            }
          }
        } catch (err) {
          console.warn('Static direct DeepSeek call error:', err);
        }
      }

      // 2. Send to server proxy (/api/chat) for local/preview environments
      if (!aiReply) {
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: cleanText,
              history: chatHistory.slice(-10)
            })
          });

          if (response.ok) {
            const data = await response.json();
            if (data && data.success && data.reply) {
              aiReply = data.reply;
              replySource = data.source || 'ai-engine';
            }
          }
        } catch (err) {
          // Handled gracefully below
        }
      }

      // 3. Direct DeepSeek API call fallback if server proxy failed and key is available
      if (!aiReply && directKey && directKey.length > 15) {
        try {
          const formattedHistory = chatHistory.slice(-8).map(h => ({
            role: h.role === 'assistant' ? 'assistant' : 'user',
            content: String(h.content || '')
          }));

          const messages = [
            { role: 'system', content: CUSTOMER_SERVICE_SYSTEM_PROMPT_CLIENT },
            ...formattedHistory,
            { role: 'user', content: cleanText }
          ];

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 14000);

          const dsResponse = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${directKey}`
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: messages,
              temperature: 0.7,
              max_tokens: 800
            }),
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (dsResponse.ok) {
            const dsData = await dsResponse.json();
            if (dsData && dsData.choices && dsData.choices[0] && dsData.choices[0].message) {
              const textReply = dsData.choices[0].message.content;
              if (textReply) {
                aiReply = textReply;
                replySource = 'deepseek-chat';
              }
            }
          } else {
            console.warn('Direct DeepSeek responded with HTTP error:', dsResponse.status);
          }
        } catch (directDsErr) {
          console.warn('Direct client DeepSeek call attempt failed:', directDsErr);
        }
      }

      // 3. Secondary fallback to /api/ai-customer-service or /api/deepseek-chat if available
      if (!aiReply) {
        try {
          const altResponse = await fetch('/api/ai-customer-service', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: cleanText,
              history: chatHistory.slice(-10)
            })
          });
          if (altResponse.ok) {
            const altData = await altResponse.json();
            if (altData && altData.success && altData.reply) {
              aiReply = altData.reply;
              replySource = altData.source || 'ai-engine';
            }
          }
        } catch (err) {
          // Fallback below
        }
      }

      // 3. Built-in intelligent Egyptian customer service fallback
      if (!aiReply) {
        aiReply = generateMostafaSalahAiResponse(cleanText, isAr ? 'ar' : 'en');
        replySource = 'egyptian-customer-service-engine';
      }

      // Hide typing indicators
      if (floatTyping) floatTyping.classList.add('hidden');
      if (simTyping) {
        simTyping.classList.add('hidden');
        simTyping.classList.remove('flex');
      }

      chatHistory.push({ role: 'assistant', content: aiReply });
      persistChatHistory();

      // Check if user text provides phone number or contact info for affiliate registration
      const hasPhone = /(01[0125]\d{8}|\+?\d{10,15})/.test(cleanText.replace(/\s+/g, ''));
      const isAffiliateChat = cleanText.includes('أفلييت') || cleanText.includes('افلييت') || cleanText.includes('تسويق') || cleanText.includes('عمولة') || cleanText.includes('مسوق') || cleanText.includes('30%') || cleanText.includes('affiliate');

      let extraActionBtn = '';
      if (hasPhone || isAffiliateChat) {
        const waMsg = isAr 
          ? `مرحباً مهندس مصطفى صلاح، أود الانضمام لبرنامج التسويق بالعمولة (30%).\nبياناتي وتفاصيلي من الشات:\n${cleanText}`
          : `Hello Eng. Mostafa Salah, I would like to join the 30% Affiliate Program.\nMy details:\n${cleanText}`;
        extraActionBtn = `
          <div class="mt-2.5 pt-2 border-t border-emerald-500/30">
            <a href="https://wa.me/201107787049?text=${encodeURIComponent(waMsg)}" target="_blank" rel="noopener noreferrer" class="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform hover:scale-[1.02]">
              <span>🚀</span>
              <span>${isAr ? 'تأكيد التسجيل كمسوق على واتساب المهندس مصطفى' : 'Confirm Affiliate Registration on WhatsApp'}</span>
            </a>
          </div>
        `;
      }

      // Determine clean source label
      let displaySource = 'AI Live';
      if (replySource.includes('deepseek')) {
        displaySource = 'DeepSeek AI';
      } else if (replySource.includes('gemini')) {
        displaySource = 'Gemini AI';
      } else {
        displaySource = 'Smart AI';
      }

      // Build Assistant Bubble HTML
      const assistantBubbleHtml = `
        <div class="flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs shrink-0">
            👨‍💼
          </div>
          <div class="chat-bubble-assistant max-w-[85%] p-3 rounded-2xl rounded-tl-sm bg-slate-900 border border-emerald-500/30 text-slate-200 leading-relaxed shadow-sm">
            <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-400 font-mono mb-1">
              <span class="font-bold">${isAr ? 'أحمد [خدمة العملاء]' : 'Ahmed [Support]'}</span>
              <span class="text-slate-500">${timeNow} ✓✓</span>
            </div>
            <div class="whitespace-pre-line text-xs">${escapeHtml(aiReply)}</div>
            ${extraActionBtn}
            <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <a href="${window.getDynamicWhatsAppUrl(isAr ? 'ar' : 'en', 'whatsapp-ai-employee')}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-[10px] transition-colors border border-slate-700">
                <span>💬</span>
                <span>${isAr ? 'واتساب م. مصطفى' : 'WhatsApp'}</span>
              </a>
              <span class="text-[9px] font-mono text-emerald-400">${displaySource}</span>
            </div>
          </div>
        </div>
      `;

      // Append reply to active boxes
      if (sourceContext === 'floating' || !simBox) {
        if (floatBox) {
          const div = document.createElement('div');
          div.innerHTML = assistantBubbleHtml;
          floatBox.appendChild(div.firstElementChild);
          floatBox.scrollTop = floatBox.scrollHeight;
        }
      } else {
        if (simBox) {
          const div = document.createElement('div');
          div.innerHTML = assistantBubbleHtml;
          simBox.appendChild(div.firstElementChild);
          simBox.scrollTop = simBox.scrollHeight;
        }
      }
    } catch (unexpectedError) {
      console.error('Customer service message dispatch error:', unexpectedError);
    } finally {
      if (floatTyping) floatTyping.classList.add('hidden');
      if (simTyping) {
        simTyping.classList.add('hidden');
        simTyping.classList.remove('flex');
      }
      if (floatSendBtn) floatSendBtn.disabled = false;
      if (simSendBtn) simSendBtn.disabled = false;
      isSendingAiMessage = false;
    }
  };

  // Backwards compatibility alias for existing simulation callers
  window.sendDeepSeekMessage = function (userText) {
    window.sendAiCustomerServiceMessage(userText, 'simulator');
  };

  window.clearChat = function () {
    window.clearAiCustomerServiceChat();
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
    window.sendAiCustomerServiceMessage(inquiry, 'simulator');
  };

  // Attach direct listeners to prevent any event bubbling/delegation blocking
  function attachDirectListeners() {
    // Mount floating customer service widget
    mountFloatingAiCustomerServiceWidget();

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

    // In-page Chat simulator form submit & button click
    const simChatForm = document.getElementById('sim-chat-form');
    const simInput = document.getElementById('sim-chat-input');
    const simSendBtn = document.getElementById('sim-send-btn');

    const handleSimulatorSubmit = function (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (simInput && simInput.value && simInput.value.trim()) {
        const textVal = simInput.value.trim();
        window.sendAiCustomerServiceMessage(textVal, 'simulator');
      }
    };

    if (simChatForm) {
      simChatForm.onsubmit = handleSimulatorSubmit;
    }
    if (simSendBtn) {
      simSendBtn.onclick = handleSimulatorSubmit;
    }
    if (simInput) {
      simInput.onkeydown = function (e) {
        if (e.key === 'Enter') {
          handleSimulatorSubmit(e);
        }
      };
    }

    // In-page Quick prompt buttons
    document.querySelectorAll('.quick-prompt-btn').forEach(btn => {
      btn.onclick = function (e) {
        e.preventDefault();
        const q = btn.getAttribute('data-question');
        if (q) window.sendAiCustomerServiceMessage(q, 'simulator');
      };
    });

    // In-page Clear chat button
    const clearBtn = document.getElementById('clear-chat-btn');
    if (clearBtn) {
      clearBtn.onclick = function (e) {
        e.preventDefault();
        window.clearAiCustomerServiceChat();
      };
    }

    // In-page Simulate chat inquiry button
    const simBtn = document.getElementById('sim-btn');
    if (simBtn) {
      simBtn.onclick = function (e) {
        e.preventDefault();
        window.simulateLiveInquiry();
      };
    }

    // Affiliate Program Registration Form
    const affForm = document.getElementById('affiliate-registration-form');
    if (affForm) {
      affForm.onsubmit = function (e) {
        e.preventDefault();
        const nameInput = document.getElementById('affiliate-name');
        const phoneInput = document.getElementById('affiliate-phone');
        const channelInput = document.getElementById('affiliate-channel');
        const noteInput = document.getElementById('affiliate-note');

        const name = (nameInput ? nameInput.value : '').trim();
        const phone = (phoneInput ? phoneInput.value : '').trim();
        const channel = (channelInput ? channelInput.value : '').trim();
        const note = (noteInput ? noteInput.value : '').trim();

        if (!name || !phone) {
          window.showToast('يرجى إدخال الاسم ورقم الواتساب للتسجيل', 'warning');
          return;
        }

        const msgText = `مرحباً مهندس مصطفى صلاح، أود التسجيل في برنامج التسويق بالعمولة (30%).
الاسم: ${name}
الهاتف / واتساب: ${phone}
طريقة التسويق والخبرة: ${channel}
${note ? 'ملاحظات: ' + note : ''}`;

        // Save into chat session memory so Ahmed continues smoothly
        chatHistory.push({ role: 'user', content: `أرغب بالانضمام كمسوق بالعمولة (30%). اسمي: ${name}، ورقمي: ${phone}، وطريقة تسويقي: ${channel}.` });
        chatHistory.push({ role: 'assistant', content: `أهلاً بك يا ${name}! 🌟 تم تسجيل بياناتك في نظام التسويق بالعمولة 30% بنجاح. بياناتك جاهزة وجاري تحويلك لواتساب المهندس مصطفى صلاح (01107787049) لاستلام المواد التسويقية ونماذج العروض والبدء فوراً. وأنا في خدمتك هنا في أي وقت!` });
        persistChatHistory();

        window.showToast('تم تسجيل بياناتك بنجاح! جاري تحويلك للواتساب للتأكيد واستلام الحقيبة التسويقية 🚀', 'success');

        const waUrl = `https://wa.me/201107787049?text=${encodeURIComponent(msgText)}`;
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 500);
      };
    }
  }

  // --- Global Event Delegation (Zero inline onclick for 100% strict CSP) ---
  document.addEventListener('click', function(e) {
    const target = e.target;
    if (!target) return;

    // Floating Chat Launcher Click
    const floatLauncher = target.closest('#floating-ai-launcher');
    if (floatLauncher) {
      e.preventDefault();
      window.toggleAiCustomerServiceChat();
      return;
    }

    // Floating Chat Close / Minimize Button
    const floatClose = target.closest('#floating-cs-close-btn');
    if (floatClose) {
      e.preventDefault();
      window.toggleAiCustomerServiceChat(false);
      return;
    }

    // Greeting Bubble Dismiss Button
    const bubbleDismiss = target.closest('#bubble-dismiss-btn');
    if (bubbleDismiss) {
      e.preventDefault();
      e.stopPropagation();
      const bubble = document.getElementById('floating-ai-greeting-bubble');
      if (bubble) {
        bubble.classList.remove('show');
        setTimeout(() => bubble.classList.add('hidden'), 250);
      }
      return;
    }

    // Greeting Bubble Open Chat (button or clicking the bubble)
    const bubbleOpen = target.closest('#bubble-open-chat-btn, #floating-ai-greeting-bubble');
    if (bubbleOpen) {
      e.preventDefault();
      const bubble = document.getElementById('floating-ai-greeting-bubble');
      if (bubble) {
        bubble.classList.remove('show');
        bubble.classList.add('hidden');
      }
      window.toggleAiCustomerServiceChat(true);
      return;
    }

    // Affiliate Chat Openers
    const affChatBtn = target.closest('#affiliate-open-chat-btn');
    if (affChatBtn) {
      e.preventDefault();
      window.toggleAiCustomerServiceChat(true);
      return;
    }

    const affAskBtn = target.closest('.affiliate-ask-btn');
    if (affAskBtn) {
      e.preventDefault();
      const prompt = affAskBtn.getAttribute('data-prompt');
      window.toggleAiCustomerServiceChat(true);
      if (prompt) {
        setTimeout(() => {
          window.sendAiCustomerServiceMessage(prompt, 'floating');
        }, 300);
      }
      return;
    }

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
    mountFloatingAiCustomerServiceWidget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }

  // Guaranteed immediate mount if body is already available
  if (typeof document !== 'undefined' && document.body) {
    mountFloatingAiCustomerServiceWidget();
  }

})();
