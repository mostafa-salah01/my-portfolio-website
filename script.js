/**
 * Mostafa Salah Portfolio - Pure Vanilla JavaScript Engine
 * Zero dependencies, ultra-fast, cross-browser compatible
 */

(function () {
  'use strict';

  // --- State ---
  let currentLang = localStorage.getItem('portfolio_lang') || 'ar';
  let currentTheme = localStorage.getItem('portfolio_theme') || 'dark';
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
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');

    // Update all elements with data-en and data-ar
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      el.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });

    // Update placeholders
    document.querySelectorAll('[data-placeholder-en][data-placeholder-ar]').forEach(el => {
      el.setAttribute('placeholder', lang === 'ar' ? el.getAttribute('data-placeholder-ar') : el.getAttribute('data-placeholder-en'));
    });

    // Update Lang button text
    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) {
      langBtnText.textContent = lang === 'ar' ? 'English' : 'عربي';
    }

    // Update Theme button label based on language
    const themeBtnText = document.getElementById('theme-btn-text');
    if (themeBtnText) {
      if (currentTheme === 'light') {
        themeBtnText.textContent = lang === 'ar' ? 'فاتح' : 'Light';
      } else {
        themeBtnText.textContent = lang === 'ar' ? 'داكن' : 'Dark';
      }
    }

    // Update active rotating role immediately
    const roleElem = document.getElementById('hero-rotating-role');
    if (roleElem) {
      const list = lang === 'ar' ? rolesAr : rolesEn;
      roleElem.textContent = list[roleIdx % list.length];
    }

    // Update WhatsApp links to active language message immediately
    window.updateAllWhatsAppLinks(lang);
  };

  window.toggleLanguage = function () {
    window.setLanguage(currentLang === 'ar' ? 'en' : 'ar');
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
    localStorage.setItem('portfolio_theme', theme);

    const iconElem = document.getElementById('theme-btn-icon');
    const textElem = document.getElementById('theme-btn-text');

    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      if (iconElem) iconElem.textContent = '☀️';
      if (textElem) {
        textElem.textContent = currentLang === 'ar' ? 'فاتح' : 'Light';
      }
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      if (iconElem) iconElem.textContent = '🌙';
      if (textElem) {
        textElem.textContent = currentLang === 'ar' ? 'داكن' : 'Dark';
      }
    }
  };

  window.toggleTheme = function () {
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
  window.toggleMobileMenu = function () {
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

  // --- WhatsApp AI Live Simulator ---
  window.simulateLiveInquiry = function () {
    const box = document.getElementById('sim-chat-box');
    const btn = document.getElementById('sim-btn');
    if (!box) return;
    if (btn) btn.disabled = true;

    const isAr = (document.documentElement.lang || currentLang || 'ar') === 'ar';
    const orderId = Math.floor(1000 + Math.random() * 9000);
    const timeNow = new Date().toTimeString().split(' ')[0];

    box.innerHTML = '';
    
    // Step 1: Customer message
    const msg1 = document.createElement('div');
    msg1.className = 'p-3 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300';
    msg1.innerHTML = `<span class="text-slate-500">[${timeNow}]</span> <span class="font-bold text-amber-400">[Customer on WhatsApp]:</span> ${
      isAr 
        ? `السلام عليكم، محتاج تفاصيل وعرض سعر لطلب توريد عاجل للمنتج #${orderId}، ومعرفة مدة الشحن.` 
        : `Hello, I need specs, delivery time & an official price quote for bulk order #${orderId}.`
    }`;
    box.appendChild(msg1);

    // Step 2: AI Employee Analyzing
    setTimeout(() => {
      const msg2 = document.createElement('div');
      msg2.className = 'p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300';
      msg2.innerHTML = `<span class="text-slate-500">[${timeNow}]</span> <span class="font-bold text-emerald-400">[AI Employee Reply - 34ms]:</span> ${
        isAr
          ? `أهلاً بحضرتك يا فندم! سعداء بخدمتك. تم فحص المخزون فوراً: الكمية متاحة والشحن يستغرق 48 ساعة فقط. أرسلت لحضرتك الآن ملف عرض السعر الرسمي PDF بكافة التفاصيل والخصم المتاح. هل تحب نأكد حجز الكمية لحضرتك؟`
          : `Hello! Delighted to assist you. Inventory checked: in stock with 48h dispatch. I have just attached your official PDF quotation with applied quantity discount. Would you like me to reserve this batch for you?`
      }`;
      box.appendChild(msg2);

      // Step 3: PDF Attachment Confirmation
      const pdfBadge = document.createElement('div');
      pdfBadge.className = 'p-2 rounded bg-slate-900 border border-emerald-500/40 text-[11px] text-emerald-400 flex items-center justify-between';
      pdfBadge.innerHTML = `<span>📎 ${isAr ? 'عرض_سعر_رسمي_' + orderId + '.pdf' : 'Official_Quote_' + orderId + '.pdf'} (142 KB)</span> <span class="text-slate-400">${isAr ? 'تم الإرسال والمزامنة في قاعدة البيانات' : 'Sent & Logged to DB'}</span>`;
      box.appendChild(pdfBadge);
      
      box.scrollTop = box.scrollHeight;
      if (btn) btn.disabled = false;
    }, 700);
  };

  // --- Global Event Delegation (Zero inline onclick for 100% strict CSP) ---
  document.addEventListener('click', function(e) {
    const target = e.target;
    if (!target) return;

    // Theme Toggle
    const themeBtn = target.closest('#theme-toggle-btn, [data-action="toggle-theme"]');
    if (themeBtn) {
      e.preventDefault();
      window.toggleTheme();
      return;
    }

    // Language Toggle
    const langBtn = target.closest('#lang-toggle-btn, [data-action="toggle-language"]');
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

  // --- Initialize on DOM Loaded ---
  document.addEventListener('DOMContentLoaded', function () {
    window.setLanguage(currentLang);
    window.setTheme(currentTheme);
  });

})();
