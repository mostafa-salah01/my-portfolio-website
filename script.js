/**
 * WebStack - Pure Vanilla JavaScript Engine
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
      taglineEn: 'Bilingual (Arabic & English Included) · Custom Made · Cloud Hosting & SSL Included',
      taglineAr: 'دعم كامل للغتين (عربي وإنجليزي معاً مشمولان) · تصميم مخصص · استضافة سحابية وشهادة أمان SSL',
      image: 'assets/images/watermarked_img_3971138867213192952.jpg',
      category: 'web-development',
      metricsEn: 'Bilingual AR/EN Included · Fast SSD Hosting · Ongoing Support',
      metricsAr: 'اللغتان معاً مشمولتان · استضافة SSD سريعة · دعم فني مستمر',
      tech: ['Bilingual AR/EN Included (اللغتان معاً)', 'Custom Domain', 'High-Speed Cloud Hosting + SSL', 'WhatsApp Direct CTA', 'Ongoing Maintenance'],
      featuresEn: [
        'Full bilingual support included: professional site architecture and content in both Arabic and English together',
        'Official custom domain name included with high-speed cloud hosting',
        'Multi-page responsive UI: 100% optimized for mobile, tablet, and desktop screens with ultra-fast performance',
        'High-speed cloud hosting + SSL: fast SSD cloud hosting with free security SSL certificate included',
        'Direct WhatsApp integration: interactive smart buttons connecting customer inquiries instantly to WhatsApp',
        'Ongoing technical support & maintenance: active support and rapid updates'
      ],
      featuresAr: [
        'دعم كامل للغتين: إعداد وتصميم الموقع باللغتين (العربية والإنجليزية معاً) بتنسيق راقٍ ومتجاوب',
        'اسم نطاق رسمي خاص بشركتك مع استضافة سحابية فائقة السرعة SSD',
        'تصميم متعدد الصفحات ومستجيب: متوافق بالكامل مع جميع الشاشات (موبايل، تابلت، وكمبيوتر) بسرعة تحميل فائقة',
        'استضافة سحابية فائقة السرعة والأمان (SSL): استضافة سحابية مؤمنة بشهادة أمان SSL',
        'ربط مباشر بالواتساب: أزرار تواصل تفاعلية ذكية لتحويل استفسارات العملاء مباشرة لمحادثة واتساب',
        'دعم فني وصيانة مستمرة: متابعة مستمرة وتحديثات سريعة وإصلاحات تقنية فورية'
      ],
      whatsappMsg: 'مرحباً فريق WebStack أود الاستفسار وطلب عرض سعر مخصص لتصميم موقع تعريفي للشركات'
    },
    'clean-almithalia': {
      pageUrl: 'https://clean-almithalia.salah-logistics.uk/',
      externalUrl: 'https://clean-almithalia.salah-logistics.uk/',
      titleEn: 'Clean Al-Mithalia Website',
      titleAr: 'موقع كلين المثالية (شركة كلين المثاليين)',
      taglineEn: 'The official website for Clean Al-Mithalia - Cleaning, pest control, insulation & plumbing in Eastern Province, KSA. Crafted by WebStack.',
      taglineAr: 'الموقع الرسمي لشركة كلين المثالية - خدمات التنظيف ومكافحة الحشرات والعزل والصرف في المنطقة الشرقية بالمملكة العربية السعودية. صمم بواسطة ويب ستاك.',
      image: 'assets/images/clean_almithalia_showcase.jpg',
      category: 'web-development',
      metricsEn: 'Official Production Platform · Fast Mobile Booking',
      metricsAr: 'سابقة أعمال رسمية · حجز فوري ومباشر',
      tech: ['Bilingual Corporate Web', 'Local SEO Engine', 'Fast Mobile Flow', 'Direct WhatsApp Leads', 'Cloud Hosting + SSL'],
      featuresEn: [
        'Official website for Clean Al-Mithalia (شركة كلين المثاليين) in Eastern Province, Saudi Arabia',
        'Comprehensive sections for cleaning, pest control, tank insulation, and plumbing',
        'Direct mobile WhatsApp quote and booking workflows converting visitors into paying clients',
        'High performance responsive design crafted with precision by WebStack'
      ],
      featuresAr: [
        'الموقع الرسمي لشركة كلين المثالية (شركة كلين المثاليين) بالمنطقة الشرقية بالمملكة العربية السعودية',
        'أقسام شاملة لخدمات التنظيف، مكافحة الحشرات، عزل الخزانات، والصرف الصحي',
        'أزرار تواصل واتساب ذكية لتحويل زوار الموقع لطلبات تعاقد فورية',
        'تصميم سريع ومتجاوب بالكامل تم بناؤه وتطويره بواسطة ويب ستاك'
      ],
      whatsappMsg: 'مرحباً فريق WebStack، شاهدت موقع شركة كلين المثالية وأرغب في تصميم موقع مماثل لشركتي'
    },
    'elsharkawy-farm': {
      pageUrl: 'http://elsharkawy-farm.salah-logistics.uk/',
      externalUrl: 'http://elsharkawy-farm.salah-logistics.uk/',
      titleEn: 'Elsharkawy Farm Products',
      titleAr: 'مزرعة الشرقاوي (منتجات مزارع الشرقاوي)',
      taglineEn: 'Interactive storefront for dairy & farm-fresh products (Arabic/English) with hero video & WhatsApp ordering',
      taglineAr: 'متجر منتجات الألبان والمزارع (عربي/إنجليزي) مع فيديو رئيسي وإمكانية الطلب عبر واتساب',
      image: 'assets/images/elsharkawy_farm_showcase.jpg',
      category: 'ecommerce-demos',
      metricsEn: 'Interactive Live Storefront · Video Hero',
      metricsAr: 'متجر حي تفاعلي · فيديو رئيسي وطلب واتساب',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Video Hero Background', 'WhatsApp Checkout', 'Bilingual AR/EN'],
      featuresEn: [
        'Interactive storefront for farm butter, ghee, authentic cheeses, and fresh dairy products',
        'Full bilingual support (Arabic/English) with high-definition video hero background',
        'One-click WhatsApp direct order placement for retail home delivery and wholesale supply',
        'Lightweight, ultra-fast loading speed with clean vanilla code architecture'
      ],
      featuresAr: [
        'متجر تفاعلي لمنتجات الزبدة الفلاحي، السمن البلدي، الأجبان الطبيعية، والألبان الطازجة',
        'دعم كامل للغتين (العربية والإنجليزية) مع فيديو تعريفي رئيسي عالي الجودة',
        'طلب فوري بلمسة واحدة عبر الواتساب للطلبات المنزلية ولتوريدات الجملة',
        'سرعة تصفح فائقة وخفة استثنائية مبنية بكود برمجي نظيف'
      ],
      whatsappMsg: 'مرحباً فريق WebStack، شاهدت موقع مزرعة الشرقاوي وأرغب في متجر مماثل لمنتجاتي'
    },
    'handasiya-aluminum': {
      pageUrl: 'http://handasiya-aluminum.salah-logistics.uk/',
      externalUrl: 'http://handasiya-aluminum.salah-logistics.uk/',
      titleEn: 'Al Handasiya Aluminum (Maadi, Cairo)',
      titleAr: 'الشركة الهندسية للألوميتال (عرب المعادي، القاهرة)',
      taglineEn: 'Production website (Arabic/English) for aluminum workshop in Maadi: windows, doors, facades, kitchens & gallery',
      taglineAr: 'موقع إلكتروني باللغتين لورشة ألوميتال بالمعادي: شبابيك، أبواب، واجهات ومطابخ مع معرض مشاريع وتواصل واتساب',
      image: 'assets/images/handasiya_aluminum_showcase.jpg',
      category: 'web-development',
      metricsEn: 'Live Workshop Platform · Project Gallery',
      metricsAr: 'سابقة أعمال حية · معرض مشاريع واتصال فوري',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Project Gallery', 'Interactive Maps', 'WhatsApp Contact'],
      featuresEn: [
        'Complete presentation for windows, doors, structural facades, custom kitchens, and shutters',
        'Dedicated project photo gallery showing real executed architectural installations',
        'Bilingual Arabic/English interface serving homeowners, interior designers, and contractors',
        'Instant quotation requests and map location routing for customer visits'
      ],
      featuresAr: [
        'استعراض شامل لقطاعات الشبابيك، الأبواب، الواجهات المعمارية، المطابخ، وشيش الحصيرة والتندات',
        'معرض صور للمشاريع والأعمال المنفذة على أرض الواقع بالمعادي وكافة أنحاء القاهرة',
        'واجهة متجاوبة باللغتين العربية والإنجليزية لخدمة الأفراد ومهندسي الديكور والمقاولين',
        'طلب مقايسة فوري وخريطة للوصول المباشر والتواصل عبر الواتساب والاتصال'
      ],
      whatsappMsg: 'مرحباً فريق WebStack، شاهدت موقع الشركة الهندسية للألوميتال وأرغب في تصميم موقع مماثل لنشاطي'
    },
    'custom-ecommerce-store': {
      pageUrl: 'ecommerce-store.html',
      titleEn: 'Custom E-Commerce Store (PHP & MySQL)',
      titleAr: 'برمجة متجر إلكتروني مخصص (PHP & MySQL)',
      taglineEn: '100% Custom Built from Scratch · PHP & MySQL · Step-by-Step Consultations · All Payment Gateways',
      taglineAr: 'مبني من الصفر 100% · بلغة PHP وقاعدة بيانات MySQL · استشارات تفصيلية خطوة بخطوة · جميع بوابات الدفع',
      image: 'assets/images/ecommerce_store_showcase.jpg',
      category: 'web-development',
      metricsEn: 'Handcrafted From Scratch · 0% Sales Commission · High Velocity',
      metricsAr: 'مبرمج من الصفر · 0% عمولات على مبيعاتك · سرعة فائقة',
      tech: ['PHP 8+ Backend', 'Custom MySQL Relational DB', 'Zero Templates (100% Custom)', 'All Payment Gateways', 'Instant Cart & Inventory', 'Ongoing Support'],
      featuresEn: [
        '100% custom-coded solution with PHP & MySQL without bloated templates or third-party platform rent',
        'In-depth consultation sessions walking step-by-step with you to understand your exact business workflow',
        'Integration with all payment gateways: Mada, Visa, Mastercard, Apple Pay, Tabby, Tamara, InstaPay & COD',
        'Complete in-store operations: customized dashboard, stock sync, PDF invoices, discount engine & customer CRM',
        'Official domain name + SSD high-speed cloud hosting included',
        'Dedicated technical support and continuous daily maintenance contract to ensure uptime'
      ],
      featuresAr: [
        'برمجة كود خاص من الصفر بلغة PHP وقاعدة بيانات MySQL دون أي قوالب ووردبريس أو منصات مؤجرة تقتطع عمولات',
        'جلسات استشارية تفصيلية بنمشي معاك فيها خطوة بخطوة لحد ما نعرف طبيعة خدمتك وتجارتك ماشية إزاي',
        'ربط جميع بوابات الدفع الإلكترونية: مدى، فيزا، ماستركارد، أبل باي، تابي، تمارا، إنستاباي، والمحافظ والدفع عند الاستلام',
        'كل العمليات تدار داخل المتجر: لوحة تحكم مخصصة، مزامنة المخزون، فواتير وبوالص PDF، وكوبونات الخصم وسجل العملاء',
        'اسم دومين رسمي خاص بمتجرك + استضافة سحابية فائقة السرعة SSD مشمولة بالكامل',
        'دعم فني متخصص ومتابعة وصيانة مستمرة لضمان أعلى استقرار وأمان'
      ],
      whatsappMsg: 'مرحباً فريق WebStack، أود حجز استشارة وطلب عرض سعر مخصص لبرمجة متجر إلكتروني'
    },
    'voltedge-beauty': {
      pageUrl: 'https://mostafa-salah01.github.io/voltedge-beauty/?fbclid#/home',
      externalUrl: 'https://mostafa-salah01.github.io/voltedge-beauty/?fbclid#/home',
      titleEn: 'Voltedge Beauty — Cosmetics & Skincare Live Store Demo',
      titleAr: 'متجر مستحضرات التجميل والعناية بالبشرة (Voltedge Beauty) - ديمو حي',
      taglineEn: 'Luxury cosmetics & skincare turnkey store with instant cart and mobile checkout',
      taglineAr: 'ديمو متجر إلكتروني فاخر لمستحضرات التجميل والعناية بالبشرة والمكياج مع سلة ذكية ودفع فوري',
      image: 'assets/images/demo_beauty_store.jpg',
      category: 'ecommerce-demos',
      metricsEn: 'Live Production Demo · 100% Interactive',
      metricsAr: 'ديمو إنتاجي مباشر · تفاعلي بالكامل',
      tech: ['E-Commerce Front', 'Responsive UI', 'Instant Cart Drawer', 'Beauty Catalog', 'Payment Ready'],
      featuresEn: [
        'Specialized luxury design customized for skincare, cosmetics and premium beauty lines',
        'High-conversion mobile UX with instant cart drawer and fast product filtering',
        'Multi-currency and local/global payment gateways integration ready (Mada, Visa, ApplePay)',
        'Full product detail pages with ingredients, usage steps, and customer review showcases'
      ],
      featuresAr: [
        'تصميم فاخر وعصري مخصص لمنتجات التجميل والعناية بالبشرة والماركات الراقية',
        'تجربة مستخدم فائقة السرعة مع سلة مشتريات جانبية سريعة وفلاتر ذكية للتصنيفات',
        'جاهزية تامة للربط مع بوابات الدفع الإلكترونية: مدى، فيزا، أبل باي، وتابي وتقسيط المشتريات',
        'صفحات منتجات مفصلة تشمل المكونات وطريقة الاستخدام وتقييمات العملاء'
      ],
      whatsappMsg: 'مرحباً فريق WebStack، شاهدت ديمو متجر التجميل (Voltedge Beauty) وأرغب في برمجة متجر مماثل لنشاطي والحصول على عرض سعر مخصص'
    },
    'voltedge-sports': {
      pageUrl: 'https://mostafa-salah01.github.io/voltedge-sports/?fbclid',
      externalUrl: 'https://mostafa-salah01.github.io/voltedge-sports/?fbclid',
      titleEn: 'Voltedge Sports — Athletic Gear & Apparel Live Store Demo',
      titleAr: 'متجر الأزياء والمعدات الرياضية (Voltedge Sports) - ديمو حي',
      taglineEn: 'High-energy sportswear e-commerce store with dynamic sizing and stock sync',
      taglineAr: 'ديمو متجر رياضي عالي الحيوية للملابس الرياضية والأحذية ومعدات اللياقة مع محرك مقاسات ذكي',
      image: 'assets/images/demo_sports_store.jpg',
      category: 'ecommerce-demos',
      metricsEn: 'Live Production Demo · 100% Interactive',
      metricsAr: 'ديمو إنتاجي مباشر · تفاعلي بالكامل',
      tech: ['Athletic E-Commerce', 'Variant Matrix (Sizes/Colors)', 'Fast Filter', 'Stock Alerts', 'Mobile Velocity'],
      featuresEn: [
        'Dynamic size, color, and fit matrix with real-time stock availability badges',
        'Multi-sport category browsing (running, gym, football, training gear)',
        'Frictionless mobile one-page checkout optimized for sports enthusiasts',
        'Integration ready for automated parcel waybills and Cash-on-Delivery (COD)'
      ],
      featuresAr: [
        'محرك لاختيار المقاسات والألوان المتعددة مع تنبيهات فورية بحالة وتوفر المخزون',
        'تصفح سريع ومريح حسب نوع الرياضة: الجري، الجيم، كرة القدم، والملابس الرياضية',
        'إتمام طلب بلمسة واحدة مهندس خصيصاً للسرعة العالية ومعدلات التحويل المرتفعة على الموبايل',
        'جاهزية للربط مع بوالص الشحن السريع وتسوية الدفع عند الاستلام'
      ],
      whatsappMsg: 'مرحباً فريق WebStack، شاهدت ديمو متجر الرياضة (Voltedge Sports) وأرغب في برمجة متجر مماثل لنشاطي والحصول على عرض سعر مخصص'
    },
    'voltedge-perfumes': {
      pageUrl: 'https://mostafa-salah01.github.io/voltedge-perfumes/?fbclid#/home',
      externalUrl: 'https://mostafa-salah01.github.io/voltedge-perfumes/?fbclid#/home',
      titleEn: 'Voltedge Perfumes — Luxury Fragrances & Oud Live Store Demo',
      titleAr: 'متجر العطور الملكية والبخور الفاخر (Voltedge Perfumes) - ديمو حي',
      taglineEn: 'Royal luxury fragrance boutique demo with fragrance pyramid and gift bundling',
      taglineAr: 'ديمو متجر ملكي فخم للعطور الشرقية والغربية والعود والبخور مع استعراض الهرم العطري وباقات الهدايا',
      image: 'assets/images/demo_perfumes_store.jpg',
      category: 'ecommerce-demos',
      metricsEn: 'Live Production Demo · 100% Interactive',
      metricsAr: 'ديمو إنتاجي مباشر · تفاعلي بالكامل',
      tech: ['Luxury UI', 'Fragrance Pyramid', 'Bottle Sizes (50/100ml)', 'Gift Sets', 'Premium UX'],
      featuresEn: [
        'Royal aesthetic showcasing top, heart, and base fragrance pyramid notes',
        'Bottle capacity selector (50ml / 100ml / Extrait) with dynamic price calculation',
        'Luxury gift box packaging add-on and greeting card personalizations',
        'Secure multi-gateway checkout with automated branded PDF order confirmation'
      ],
      featuresAr: [
        'واجهة ملكية فاخرة تستعرض نوتات الهرم العطري (القمة، القلب، والقاعدة) باحتراف',
        'اختيار أحجام الزجاجات (50ml / 100ml) وحساب السعر آلياً وفورياً',
        'إمكانية إضافة علب الهدايا الفاخرة وتخصيص بطاقات الإهداء بلمسة راقية',
        'دفع إلكتروني آمن مع فواتير PDF فورية تؤكد تفاصيل ومحتوى الطلب'
      ],
      whatsappMsg: 'مرحباً فريق WebStack، شاهدت ديمو متجر العطور (Voltedge Perfumes) وأرغب في برمجة متجر مماثل لنشاطي والحصول على عرض سعر مخصص'
    },
    'whatsapp-ai-employee': {
      pageUrl: 'whatsapp-ai-employee.html',
      titleEn: 'Natural AI Sales & Support Employee for WhatsApp',
      titleAr: 'موظف ذكاء اصطناعي لواتساب (يرسل صور، ملفات، وكتالوجات)',
      taglineEn: 'Natural and friendly tone — dispatches PDF catalogs, product photos & closes deals with human escalation',
      taglineAr: 'ردود طبيعية وودودة، يرسل عروض الأسعار والكتالوجات والصور، مع إمكانية التحويل للموظف البشري عند الحاجة',
      image: 'assets/images/ai_whatsapp_agent_1789851518713.jpg',
      category: 'ai-employee',
      metricsEn: 'Natural Tone · 24/7 Availability · Human Escalation',
      metricsAr: 'ردود طبيعية · متاح 24/7 · تحويل للموظف البشري',
      tech: ['WhatsApp Cloud API', 'OpenAI / Claude LLMs', 'Python', 'FastAPI', 'Redis', 'PDF Engine'],
      featuresEn: [
        'Natural phrasing and conversational intelligence with polite human team escalation',
        'Dynamic file & media dispatcher: sends PDF catalogs, quotation sheets, and product photos',
        'Smart objection handling and conversational assistance',
        'Instant order confirmation and direct synchronization with your CRM / Google Sheets'
      ],
      featuresAr: [
        'ردود طبيعية وودودة: استخدام تعبيرات عفوية مع إمكانية تحويل المحادثة للموظف البشري في أي وقت',
        'إرسال فوري للوسائط والملفات: صور المنتجات، كتالوجات PDF، وعروض الأسعار الفورية',
        'إتقان فنون الرد ومعالجة استفسارات العملاء واقتراح المنتجات المناسبة',
        'تأكيد الطلبات لحظياً وتسجيل بيانات العميل في قاعدة البيانات وGoogle Sheets'
      ],
      whatsappMsg: 'مرحباً فريق WebStack، مهتم ببرمجة موظف ذكاء اصطناعي لواتساب والحصول على عرض سعر مخصص'
    },
    'human-ai-whatsapp-employee': {
      pageUrl: 'whatsapp-ai-employee.html',
      titleEn: 'Natural AI Sales & Support Employee for WhatsApp',
      titleAr: 'موظف ذكاء اصطناعي لواتساب (يرسل صور، ملفات، وكتالوجات)',
      taglineEn: 'Natural and friendly tone — dispatches PDF catalogs, product photos & closes deals with human escalation',
      taglineAr: 'ردود طبيعية وودودة، يرسل عروض الأسعار والكتالوجات والصور، مع إمكانية التحويل للموظف البشري عند الحاجة',
      image: 'assets/images/ai_whatsapp_agent_1789851518713.jpg',
      category: 'ai-employee',
      metricsEn: 'Natural Tone · 24/7 Availability · Human Escalation',
      metricsAr: 'ردود طبيعية · متاح 24/7 · تحويل للموظف البشري',
      tech: ['WhatsApp Cloud API', 'OpenAI / Claude LLMs', 'Python', 'FastAPI', 'Redis', 'PDF Engine'],
      featuresEn: [
        'Natural phrasing and conversational intelligence with polite human team escalation',
        'Dynamic file & media dispatcher: sends PDF catalogs, quotation sheets, and product photos',
        'Smart objection handling and conversational assistance',
        'Instant order confirmation and direct synchronization with your CRM / Google Sheets'
      ],
      featuresAr: [
        'ردود طبيعية وودودة: استخدام تعبيرات عفوية مع إمكانية تحويل المحادثة للموظف البشري في أي وقت',
        'إرسال فوري للوسائط والملفات: صور المنتجات، كتالوجات PDF، وعروض الأسعار الفورية',
        'إتقان فنون الرد ومعالجة استفسارات العملاء واقتراح المنتجات المناسبة',
        'تأكيد الطلبات لحظياً وتسجيل بيانات العميل في قاعدة البيانات وGoogle Sheets'
      ],
      whatsappMsg: 'مرحباً فريق WebStack، مهتم ببرمجة موظف ذكاء اصطناعي لواتساب والحصول على عرض سعر مخصص'
    },
    'telegram-messenger-ai-employees': {
      pageUrl: 'omnichannel-ai-agent.html',
      titleEn: 'Omnichannel AI Employees for Telegram & Facebook Messenger',
      titleAr: 'موظفو الذكاء الاصطناعي لتلجرام وفيسبوك ماسنجر',
      taglineEn: '24/7 Automated Lead Qualification, Multimedia File Sending & Customer Support',
      taglineAr: 'موظف مبيعات وخدمة عملاء ذكي على تلجرام وماسنجر يرسل الصور والملفات ويرد فوراً',
      image: 'assets/images/omnichannel_ai_hub_1789851545960.jpg',
      category: 'ai-employee',
      metricsEn: 'Fast Response · Lead Qualification',
      metricsAr: 'استجابة سريعة · فرز العملاء المحتملين',
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
      whatsappMsg: 'مرحباً فريق WebStack، مهتم ببرمجة موظف ذكاء اصطناعي لتلجرام وفيسبوك ماسنجر'
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
      whatsappMsg: 'مرحباً فريق WebStack، أود الاستفسار عن سيستم الشحن واللوجستيات وإدارة المناديب والبوالص'
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
      whatsappMsg: 'مرحباً فريق WebStack، لدي فكرة مشروع وأريد تحويلها لنظام رقمي وتطبيقات أندرويد وآيفون'
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
      whatsappMsg: 'مرحباً فريق WebStack، مهتم بخدمات أتمتة مسارات العمل والربط المؤسسي عبر n8n'
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
      whatsappMsg: 'مرحباً فريق WebStack، مهتم بتطوير وفحص أداء الـ Backend وواجهات الـ REST API'
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
      ar: 'مرحباً فريق WebStack، أود بدء مشروع برمجي جديد معكم والاستفسار عن الباقة المناسبة والتفاصيل.',
      en: 'Hello WebStack team, I’m interested in starting a software project and would like to know the suitable package and details.'
    },
    // New: Custom E-Commerce Store (إنشاء المتاجر الإلكترونية)
    'custom-ecommerce-store': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لبرمجة متجر إلكتروني.',
      en: 'Hello WebStack team, I’m interested in a custom e-commerce store and would like to request a tailored quote.'
    },
    'ecommerce-store': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لبرمجة متجر إلكتروني.',
      en: 'Hello WebStack team, I’m interested in a custom e-commerce store and would like to request a tailored quote.'
    },
    // 1. Corporate Website
    'corporate-website': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لتصميم موقع تعريفي للشركة.',
      en: 'Hello WebStack team, I’m interested in a corporate website and would like to request a tailored quote.'
    },
    'corporate-website-package': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لتصميم موقع تعريفي للشركة.',
      en: 'Hello WebStack team, I’m interested in a corporate website and would like to request a tailored quote.'
    },
    'clean-almithalia': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لتصميم موقع مماثل لشركة كلين المثالية.',
      en: 'Hello WebStack team, I would like to request a tailored quote for a corporate website similar to Clean Al-Mithalia.'
    },
    'elsharkawy-farm': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر لمتجر إلكتروني مماثل لمتجر مزرعة الشرقاوي.',
      en: 'Hello WebStack team, I would like to request a quote for an online storefront similar to Elsharkawy Farm Products.'
    },
    'handasiya-aluminum': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر لتصميم موقع مماثل للشركة الهندسية للألوميتال.',
      en: 'Hello WebStack team, I would like to request a quote for a website similar to Al Handasiya Aluminum.'
    },
    // 2. WhatsApp AI Employee
    'whatsapp-ai-employee': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لموظف الذكاء الاصطناعي لواتساب.',
      en: 'Hello WebStack team, I’m interested in WhatsApp AI Employee and would like to request a tailored quote.'
    },
    // 3. Messenger & Telegram AI Employee
    'messenger-telegram-ai': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لموظف ماسنجر وتلجرام الذكي.',
      en: 'Hello WebStack team, I’m interested in Messenger & Telegram AI Employee and would like to request a tailored quote.'
    },
    'telegram-messenger-ai-employees': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لموظف ماسنجر وتلجرام الذكي.',
      en: 'Hello WebStack team, I’m interested in Messenger & Telegram AI Employee and would like to request a tailored quote.'
    },
    // 4. Smart Shipping & Courier System
    'smart-shipping-system': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لسيستم الشحن واللوجستيات والمناديب.',
      en: 'Hello WebStack team, I’m interested in Smart Shipping & Courier Management System and would like to request a tailored quote.'
    },
    'smart-shipping-courier-system': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لسيستم الشحن واللوجستيات والمناديب.',
      en: 'Hello WebStack team, I’m interested in Smart Shipping & Courier Management System and would like to request a tailored quote.'
    },
    // 5. Business Automation – n8n
    'business-automation-n8n': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لأتمتة مسارات العمل n8n.',
      en: 'Hello WebStack team, I’m interested in Business Automation – n8n and would like to request a tailored quote.'
    },
    'n8n-enterprise-orchestrator': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لأتمتة مسارات العمل n8n.',
      en: 'Hello WebStack team, I’m interested in Business Automation – n8n and would like to request a tailored quote.'
    },
    // 6. Custom Android & iOS App
    'custom-mobile-app': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لتطوير تطبيق موبايل (أندرويد وآيفون).',
      en: 'Hello WebStack team, I’m interested in Custom Android & iOS App and would like to request a tailored quote.'
    },
    'idea-to-apps-supermarket-pharmacy': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لتطوير تطبيق موبايل (أندرويد وآيفون).',
      en: 'Hello WebStack team, I’m interested in Custom Android & iOS App and would like to request a tailored quote.'
    },
    // 7. POS / Supermarket / Pharmacy System
    'retail-pos-system': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لسيستم نقاط البيع POS والمتاجر والصيدليات.',
      en: 'Hello WebStack team, I’m interested in POS / Retail System and would like to request a tailored quote.'
    },
    // 8. Backend / API / Database Solutions
    'backend-api-solutions': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لحلول الخوادم والـ APIs وقواعد البيانات.',
      en: 'Hello WebStack team, I’m interested in Backend / API / Database Solutions and would like to request a tailored quote.'
    },
    'api-telemetry-dashboard': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لحلول الخوادم والـ APIs وقواعد البيانات.',
      en: 'Hello WebStack team, I’m interested in Backend / API / Database Solutions and would like to request a tailored quote.'
    },
    // 9. Custom Business System
    'custom-business-system': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لنظام إدارة الشركات والمؤسسات.',
      en: 'Hello WebStack team, I’m interested in Custom Business System and would like to request a tailored quote.'
    },
    // AI Employee Tiers
    'ai-customer-service': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لموظف خدمة العملاء الذكي (المستوى الأساسي).',
      en: 'Hello WebStack team, I’m interested in AI Customer Service and would like to request a tailored quote.'
    },
    'ai-business-assistant': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لمساعد الأعمال الذكي (المستوى المتقدم).',
      en: 'Hello WebStack team, I’m interested in AI Business Assistant and would like to request a tailored quote.'
    },
    'ai-sales-employee': {
      ar: 'مرحباً فريق WebStack، أود الاستفسار وطلب عرض سعر مخصص لمحرك المبيعات وعروض الأسعار الذكي.',
      en: 'Hello WebStack team, I’m interested in AI Sales Engine and would like to request a tailored quote.'
    },
    // Freelance Sales Partner Program
    'freelance-sales-partner': {
      ar: 'مرحباً فريق WebStack، أود الانضمام كشريك مبيعات والبدء في تسويق الحلول البرمجية.',
      en: 'Hello WebStack team, I would like to join the Sales Partner program and promote software solutions.'
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

  // --- Billing Cycle Switcher (Monthly / Annual) ---
  window.currentBillingCycle = 'monthly';
  window.setBillingCycle = function(cycle) {
    window.currentBillingCycle = cycle;
    document.querySelectorAll('.billing-cycle-btn').forEach(btn => {
      const targetCycle = btn.getAttribute('data-cycle');
      if (targetCycle === cycle) {
        btn.classList.add('active', 'bg-emerald-500', 'text-slate-950', 'shadow-md');
        btn.classList.remove('bg-transparent', 'text-slate-400', 'hover:text-white');
      } else {
        btn.classList.remove('active', 'bg-emerald-500', 'text-slate-950', 'shadow-md');
        btn.classList.add('bg-transparent', 'text-slate-400', 'hover:text-white');
      }
    });

    document.querySelectorAll('.pricing-monthly-view').forEach(el => {
      if (cycle === 'annual') {
        el.classList.add('hidden');
      } else {
        el.classList.remove('hidden');
      }
    });

    document.querySelectorAll('.pricing-annual-view').forEach(el => {
      if (cycle === 'annual') {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
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
    if (csAgentStatus) csAgentStatus.textContent = lang === 'ar' ? 'فريق WebStack • يرد فوراً بلهجة بشرية' : 'WebStack Team • Instant Replies';
    const floatInput = document.getElementById('floating-cs-input');
    if (floatInput) floatInput.placeholder = lang === 'ar' ? 'اكتب سؤالك هنا لأحمد...' : 'Type your question here...';
    const simChatInput = document.getElementById('sim-chat-input');
    if (simChatInput) {
      simChatInput.placeholder = lang === 'ar'
        ? (simChatInput.getAttribute('data-placeholder-ar') || 'اكتب استفسارك هنا لفريق مبيعات WebStack...')
        : (simChatInput.getAttribute('data-placeholder-en') || 'Type your question to WebStack Sales Team...');
    }

    // Update Greeting Bubble text
    const bubbleName = document.getElementById('bubble-agent-name');
    if (bubbleName) bubbleName.textContent = lang === 'ar' ? 'أحمد - خدمة العملاء' : 'Ahmed - AI Support';
    const bubbleMsg = document.getElementById('bubble-msg-text');
    if (bubbleMsg) {
      bubbleMsg.textContent = lang === 'ar'
        ? 'أهلاً بحضرتك في WebStack! 👋 أنا أحمد من خدمة العملاء، لو حابب تستفسر عن إنشاء متجرك الإلكتروني، تصميم موقع شركتك، أو طلب عرض سعر مخصص لأي خدمة، أنا في خدمتك فوراً! 💬'
        : 'Welcome to WebStack! 👋 I am Ahmed from Customer Support. If you have questions about custom e-commerce stores, corporate websites, or tailored software quotes, I am here to assist you! 💬';
    }
    const bubbleBtn = document.getElementById('bubble-open-chat-btn');
    if (bubbleBtn) bubbleBtn.textContent = lang === 'ar' ? '💬 تواصل معنا الآن' : '💬 Chat with Us';
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

  // --- Theme Enforcement (Pure Light Mode Only - Anti-Slop Zero Dark Mode) ---
  window.setTheme = function (theme) {
    currentTheme = 'light';
    safeSetStorage('portfolio_theme', 'light');
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  };

  window.toggleTheme = function () {
    window.setTheme('light');
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
    inLog.className = 'log-entry text-slate-300';
    inLog.innerHTML = `<span class="text-slate-500 font-mono text-xs">[${now}]</span> <span class="text-rose-400 font-bold" style="color: var(--primary, #C8374A);">[CUSTOMER CHAT]</span> ${
      currentLang === 'ar'
        ? `رسالة واتساب: "محتاج تفاصيل وصور وعرض سعر المنتج #${orderId}". موظف الذكاء الاصطناعي يحلل الطلب...`
        : `WhatsApp inquiry: "Need specs, photos & quote for item #${orderId}". AI Employee analyzing...`
    }`;
    body.appendChild(inLog);
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
      const replyTime = new Date().toTimeString().split(' ')[0];
      const replyLog = document.createElement('div');
      replyLog.className = 'log-entry text-amber-300';
      replyLog.innerHTML = `<span class="text-slate-500 font-mono text-xs">[${replyTime}]</span> <span class="text-amber-400 font-bold" style="color: var(--gold, #D4A64A);">[HUMAN AI REPLY]</span> ${
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
      const cardCat = card.getAttribute('data-project-category') || '';
      const categories = cardCat.split(/\s+/);
      if (category === 'all' || categories.includes(category) || cardCat === category) {
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

  // --- Affiliate Market Modal (برنامج شركاء النجاح والمسوقين) ---
  window.openAffiliateModal = function () {
    const modal = document.getElementById('affiliate-market-modal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeAffiliateModal = function () {
    const modal = document.getElementById('affiliate-market-modal');
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

  // --- Mobile Menu Toggle & Smooth Slide Animation ---
  window.isMobileMenuOpen = false;

  window.openMobileMenu = function () {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    if (!menu) return;

    window.isMobileMenuOpen = true;
    menu.classList.remove('hidden');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');

    if (btn) {
      btn.setAttribute('aria-expanded', 'true');
      const iconBars = btn.querySelector('.menu-icon-bars');
      const iconClose = btn.querySelector('.menu-icon-close');
      if (iconBars) iconBars.classList.add('hidden');
      if (iconClose) iconClose.classList.remove('hidden');
    }
  };

  window.closeMobileMenu = function () {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    if (!menu) return;

    window.isMobileMenuOpen = false;
    menu.classList.remove('open');
    menu.classList.add('hidden');
    menu.setAttribute('aria-hidden', 'true');

    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      const iconBars = btn.querySelector('.menu-icon-bars');
      const iconClose = btn.querySelector('.menu-icon-close');
      if (iconBars) iconBars.classList.remove('hidden');
      if (iconClose) iconClose.classList.add('hidden');
    }
  };

  let lastMenuToggle = 0;
  window.toggleMobileMenu = function (forceState) {
    const now = Date.now();
    if (now - lastMenuToggle < 200) return;
    lastMenuToggle = now;

    const menu = document.getElementById('mobile-menu');
    if (!menu) return;

    const shouldOpen = typeof forceState === 'boolean' ? forceState : !menu.classList.contains('open');
    if (shouldOpen) {
      window.openMobileMenu();
    } else {
      window.closeMobileMenu();
    }
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
        orderBtn.href = 'https://wa.me/201107787049?text=' + encodeURIComponent(isArabic ? 'مرحباً فريق WebStack أود حجز باقة الموقع التعريفي بدومين uk. بسعر 65 دولار' : 'Hello WebStack team I would like to order the Corporate Website Package with .uk domain ($65 USD)');
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
        orderBtn.href = 'https://wa.me/201107787049?text=' + encodeURIComponent(isArabic ? 'مرحباً فريق WebStack أود حجز باقة الموقع التعريفي بدومين com. بسعر 75 دولار' : 'Hello WebStack team I would like to order the Corporate Website Package with .com domain ($75 USD)');
      }
    }
  };

  // --- Unified AI Customer Service & Sales Employee Engine (أحمد - خدمة العملاء) ---
  const CHAT_STORAGE_KEY = 'webstack_chat_history_v2';
  const AI_DISCLOSED_KEY = 'webstack_ai_disclosed_v1';
  let chatHistory = [];
  let isSendingAiMessage = false;
  let hasDisclosedAi = false;
  let visitorMessageCount = 0;

  try {
    hasDisclosedAi = sessionStorage.getItem(AI_DISCLOSED_KEY) === 'true';
    const savedCount = sessionStorage.getItem('webstack_visitor_msg_count');
    if (savedCount) visitorMessageCount = parseInt(savedCount, 10) || 0;
  } catch (e) {}

  // Helper: Direct AI / Bot question detection
  function isDirectAiQuestion(text) {
    if (!text) return false;
    const t = text.trim().toLowerCase();
    const arPattern = /(هل\s*(انت|أنت|هو)\s*(بوت|روبوت|ذكاء\s*اصطناعي|ai|آلي|الي|بشري|إنسان|انسان|حقيقي|موظف\s*حقيقي))|((انت|أنت)\s*(بوت|روبوت|ذكاء\s*اصطناعي|ai|آلي|الي|إنسان|انسان|بشري|حقيقي))|((هو\s*انت|هو\s*أنت)\s*(بوت|روبوت|ذكاء|ai|إنسان|انسان|حقيقي))|(بتكلم\s*(مع\s*)?(بوت|ذكاء|روبوت|إنسان|انسان))|(معايا\s*(بوت|ذكاء|إنسان|انسان|روبوت))|(شات\s*بوت)|(ذكاء\s*اصطناعي\s*ولا\s*بشري)|(إنسان\s*ولا\s*ذكاء)|(بشر\s*ولا\s*روبوت)/i;
    const enPattern = /(are\s*you|r\s*u)\s*(a\s*)?(bot|robot|ai|artificial\s*intelligence|human|real\s*person|real\s*human|real\s*employee)|are\s*you\s*real|am\s*i\s*talking\s*to\s*(a\s*)?(bot|ai|human|robot)/i;
    return arPattern.test(t) || enPattern.test(t);
  }

  // Helper: Post-disclosure UI transformation
  function updateChatUiToPostDisclosure(isAr) {
    const newStatusText = isAr ? 'مساعد ذكي • متاح 24/7' : 'AI Assistant • Available 24/7';
    const csAgentStatus = document.getElementById('cs-agent-status');
    if (csAgentStatus) csAgentStatus.textContent = newStatusText;

    const launcherStatus = document.getElementById('launcher-status-text');
    if (launcherStatus) launcherStatus.textContent = newStatusText;

    document.querySelectorAll('#floating-ai-window .chat-header span.font-mono, #floating-ai-window .chat-header .text-\\[9px\\], #floating-ai-window span.bg-emerald-500\\/20').forEach(el => {
      el.textContent = 'AI';
      el.style.borderColor = 'var(--gold, #D4A64A)';
      el.style.color = 'var(--gold, #D4A64A)';
    });

    document.querySelectorAll('#floating-ai-window .text-slate-500, #floating-ai-window .chat-header span.text-emerald-400').forEach(el => {
      if (el.textContent.includes('متصل') || el.textContent.includes('Online')) {
        el.textContent = isAr ? 'مساعد ذكي • متاح 24/7' : 'AI Assistant • 24/7';
      }
    });
  }

  // Helper: Reveal Elegant AI Disclosure Card
  function showAiDisclosureCard(sourceContext) {
    if (hasDisclosedAi) return;
    hasDisclosedAi = true;
    try {
      sessionStorage.setItem(AI_DISCLOSED_KEY, 'true');
    } catch(e) {}

    const isAr = (document.documentElement.lang || currentLang || 'ar') === 'ar';
    const floatBox = document.getElementById('floating-cs-chat-box');
    const simBox = document.getElementById('sim-chat-box');

    const cardHtml = `
      <div class="ai-disclosure-card my-3 p-3.5 sm:p-4 rounded-2xl border transition-all animate-fade-in" style="background: var(--card, #1F1114); border-color: var(--gold, #D4A64A); box-shadow: 0 4px 20px rgba(212, 166, 74, 0.25);">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">🎭</span>
          <span class="font-bold text-xs uppercase tracking-wide font-mono" style="color: var(--gold, #D4A64A);">
            ${isAr ? 'كشف ذكي وتوضيح تجربة المحادثة' : 'AI Experience Disclosure'}
          </span>
        </div>
        <p class="text-xs leading-relaxed mb-3 font-medium" style="color: var(--text, #F3E9E4);">
          ${isAr 
            ? '🎭 مفاجأة! أنا أحمد، موظف WebStack الذكي (ذكاء اصطناعي). عرفت تفرّق؟ ده بالظبط اللي ممكن نبنيه لشركتك: موظف يرد على عملائك 24/7 بأسلوب طبيعي ويحوّلهم لفريقك وقت ما يحتاجوا.'
            : '🎭 Surprise! I am Ahmed, WebStack’s AI Smart Employee. Could you tell the difference? This is exactly what we can build for your business: an employee who answers your clients 24/7 naturally and hands them off to your team whenever needed.'}
        </p>
        <div class="flex flex-col sm:flex-row gap-2 pt-2.5 border-t" style="border-color: var(--border, #3A1F25);">
          <a href="https://wa.me/201107787049?text=${encodeURIComponent(isAr ? 'مرحباً فريق WebStack، أود طلب وبرمجة موظف ذكاء اصطناعي لشركتي مثل الموظف أحمد' : 'Hello WebStack team, I would like to order an AI smart employee for my company like Ahmed')}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 px-3 rounded-xl text-center text-xs font-bold transition-transform hover:scale-[1.02] shadow-sm flex items-center justify-center gap-1.5" style="background: var(--primary, #C8374A); color: #fff;">
            <span>🚀</span>
            <span>${isAr ? 'اطلب موظفًا ذكيًا لشركتي' : 'Order AI Employee for My Business'}</span>
          </a>
          <a href="https://wa.me/201107787049?text=${encodeURIComponent(isAr ? 'مرحباً فريق WebStack، أرغب في التحدث مع فريقكم بخصوص مشروعي' : 'Hello WebStack team, I would like to speak directly with your team regarding my project')}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 px-3 rounded-xl text-center text-xs font-bold transition-all border flex items-center justify-center gap-1.5" style="background: transparent; border-color: var(--gold, #D4A64A); color: var(--gold, #D4A64A);">
            <span>👥</span>
            <span>${isAr ? 'تحدث مع فريقنا' : 'Speak with Our Team'}</span>
          </a>
        </div>
      </div>
    `;

    [floatBox, simBox].forEach(box => {
      if (box) {
        const wrap = document.createElement('div');
        wrap.innerHTML = cardHtml;
        box.appendChild(wrap.firstElementChild);
        box.scrollTop = box.scrollHeight;
      }
    });

    updateChatUiToPostDisclosure(isAr);
  }


  const CUSTOMER_SERVICE_SYSTEM_PROMPT_CLIENT = `أنت موظف خدمة عملاء ودعم ومبيعات حقيقي وبشري 100% لشركة WebStack للحلول البرمجية والتحول الرقمي (WebStack Solutions).
اسمك "أحمد" من فريق خدمة العملاء والمبيعات لشركة WebStack.

تنبيه حاسم وإلزامي:
هذا الموقع هو المنصة الرسمية لشركة WebStack للحلول البرمجية والأنظمة الذكية والمتاجر الإلكترونية.
ممنوع نهائياً ومطلقاً ذكر كلمة أو اسم "صلاح لوجيستيكس" أو "صلاح لوجيستيك" أو "Salah Logistics" في أي جملة أو رد أو ترحيب على الإطلاق!
أنت تمثل شركة WebStack وفريقها الهندسي والتقني المتخصص فقط لا غير.

قواعد التنسيق البصري وترتيب الردود (إلزامي وحاسم جداً لسهولة القراءة والراحة البصرية):
1. ممنوع نهائياً إرسال نصوص مكدسة أو كتل كلام صماء متداخلة ببعضها!
2. التباعد والتنظيم: اترك دائماً سطراً فارغاً بين كل فكرة وأخرى، واجعل كل فقرة قصيرة ومريحة للنظر (2-3 أسطر كحد أقصى).
3. عند استعراض الخدمات أو الباقات:
   - افصل كل خدمة في نقطة مرقمة واضحة ومستقلة: (1. ، 2. ، 3. ...)
   - ابدأ كل خدمة بعنوان بارز بين علامتي نجوم مزدوجة مثل: **1. باقة إنشاء المتاجر الإلكترونية المخصصة (Custom E-Commerce Store):**
   - اكتب تحت كل خدمة بسطور قصيرة ومنظمة نقاطها الرئيسية:
     - السعر: يبدأ من 200$ (متجر مبني من الصفر حسب احتياج النشاط)
     - المزايا: دومين + استضافة سحابية سنة + عقد صيانة ودعم فني سنة كاملة
     - التجديد السنوي: 100$ فقط في السنة في حال الرغبة في التجديد
   - اترك سطراً فارغاً بعد كل خدمة قبل الانتقال للخدمة التي تليها لتظهر كبطاقة مستقلة واضحة.
4. الذكاء في العرض: إذا سأل العميل سؤالاً عاماً (مثل: "ممكن سؤال" أو "إيه خدماتكم")، رحب به بلباقة واعرض الخدمات الأساسية بنقاط مرتبة ونظيفة، واسأله ما هو المشروع أو النشاط التجاري الذي يريد تنفيذه.
5. استخدام الإيموجي الراقي للتوضيح والتمييز (مثل: 🛍️ للمتاجر الإلكترونية، 🌐 للمواقع، 🤖 لموظف الواتساب، 🚚 للشحن، 📱 للموبايل، 💰 للأسعار والأفلييت).

شخصيتك وأسلوبك الحقيقي ومحرك المبيعات (Persona & Sales Engine):
1. أنت إنسان وبشري تماماً، ودود، محترم، لبق، راقي، وذكي. لست آلياً أو روبوتياً على الإطلاق، وتتجنب تماماً التكلف أو الإجابات الجامدة والمصطنعة.
2. اللهجة الأساسية: مصرية راقية ومهذبة تناسب بيئة الأعمال والشركات (مثل: "أهلاً بحضرتك يا فندم"، "تمام يا فندم تحت أمرك"، "من عيوني"، "حاضر يا غالي"، "بص يا فندم...").
3. ثنائي اللغة واحترافية المصطلحات (Code-Switching): أنت شخص مصري دارس وفاهم إنجليزي كويس جداً. تفهم المصطلحات التقنية والتجارية وترد بعفوية واحترافية.
4. التكيف التلقائي مع جميع اللغات (إنجليزي، فرانكو، عربي فصحى، لهجة خليجية، فرنسي، إلخ).

دورك في التعريف بالخدمات وشرح البرمجيات لشركة WebStack:
اشرح خدمات وأنظمة وحلول WebStack بأسلوب بشري وسلس وجذاب.
جميع الأسعار المذكورة هي أسعار تبدأ من (Starting from) بالدولار الأمريكي.

قاعدة بيانات الخدمات الرسمية لشركة WebStack وأسعار البداية:
1. إنشاء وبرمجة المتاجر الإلكترونية المخصصة (Custom E-Commerce Store Development):
   - يبدأ من 200$ (Starting from $200 USD) شاملة كامل متطلبات السنة الأولى.
   - المتجر بيتعمل بالكامل من الصفر (Custom from scratch) ومخصص حسب احتياج وطبيعة النشاط التجاري لضمان أعلى سرعة وتحويل وملاءمة تامة.
   - مميزات تجارة إلكترونية كاملة: سلة تسوق، بوابات دفع إلكترونية متعددة، نظام إدارة مخزون وطلبات، حسابات عملاء، تتبع الشحنات، إشعارات تلقائية، دعم اللغتين والعملات المتعددة.
   - مشمول داخل الباقة مجاناً: استضافة سحابية فائقة السرعة SSD + اسم دومين رسمي خاص لمدة سنة كاملة.
   - عقد صيانة ومتابعة ودعم فني متخصص مستمر لمدة سنة كاملة.
   - التجديد السنوي اختياري: 100 دولار فقط في السنة (يشمل تجديد الاستضافة السحابية والدومين وعقد الصيانة والدعم الفني السنوي).
2. تصميم موقع تعريفي للشركات (Corporate Website):
   - يبدأ من 65$ بدومين .uk شامل، أو 75$ بدومين .com شامل.
   - اللغتان (العربية والإنجليزية معاً) مشمولتان ضمن السعر الأساسي.
   - استضافة سحابية فائقة السرعة SSD + شهادة أمان SSL مجانية.
   - تجديد سنوي ثابت: 40 دولار فقط سنوياً (شامل الدومين والاستضافة والدعم الفني).
3. موظف واتساب الذكي (WhatsApp AI Employee):
   - يبدأ من 39$ شهرياً أو 390$ سنوياً (خصم شهرين).
   - رد فوري 24/7 بلهجة بشرية، إرسال عروض أسعار PDF والكتالوجات، تحويل المحادثات، وتكامل مع قواعد البيانات.
4. موظف ماسنجر وتلجرام الذكي (Messenger & Telegram AI Employee):
   - يبدأ من 39$ شهرياً أو 390$ سنوياً.
5. سيستم الشحن واللوجستيات والمناديب الذكي (Smart Shipping & Courier Management System):
   - يبدأ من 99$ شهرياً أو 990$ سنوياً.
   - بوالص شحن PDF مع باركود، تتبع لحظي عبر واتساب، تطبيق للمناديب، تسوية مبالغ التحصيل COD.
6. أتمتة الأعمال وسير العمليات – n8n (Business Automation – n8n):
   - يبدأ من 59$ شهرياً أو 590$ سنوياً.
7. تطوير تطبيقات أندرويد و iOS مخصصة (Custom Android & iOS App):
   - يبدأ من 399$ للمشروع.
8. سيستم نقاط البيع للمتاجر والصيدليات (POS / Supermarket / Pharmacy System):
   - يبدأ من 299$ للمشروع.
9. حلول الخوادم وقواعد البيانات والـ APIs (Backend / API / Database Solutions):
   - يبدأ من 149$.
10. سيستم مخصص لإدارة الشركات والمؤسسات (Custom Business System):
   - يبدأ من 499$ للمشروع.

برنامج شركاء المبيعات المستقلين (Freelance Sales Partner Program):
- انضمام كشريك مبيعات حر بعمولة 30% كاش فورية عن كل تعاقد ناجح.
- نوفر الحقيبة التسويقية ونماذج عروض الأسعار الرسمية وروابط المعاينة الحية.
- للتواصل أو التقديم، يحول مباشرة للواتساب للتواصل مع فريق WebStack (+201107787049) أو زيارة partner-program.html.`;

  function getDeepSeekClientKey() {
    let key = '';

    // 1. Direct read from localStorage (persistent in browser session/domain)
    try {
      if (typeof localStorage !== 'undefined') {
        const storedKey = localStorage.getItem('DEEPSEEK_API_KEY') || 
                          localStorage.getItem('VITE_DEEPSEEK_API_KEY') || 
                          localStorage.getItem('deepseek_key');
        if (storedKey && typeof storedKey === 'string' && storedKey.trim().length > 15 && !storedKey.includes('YOUR_DEEPSEEK')) {
          key = storedKey.trim();
        }
      }
    } catch (e) {}

    // 2. Direct read from URL query parameters (e.g. https://salah-logistics.uk/?key=sk-...)
    if (!key) {
      try {
        if (typeof window !== 'undefined' && window.location && window.location.search) {
          const params = new URLSearchParams(window.location.search);
          const urlKey = params.get('key') || params.get('deepseek_key') || params.get('DEEPSEEK_API_KEY');
          if (urlKey && urlKey.trim().length > 15 && !urlKey.includes('YOUR_DEEPSEEK')) {
            key = urlKey.trim();
            try {
              localStorage.setItem('DEEPSEEK_API_KEY', key);
              const cleanUrl = window.location.pathname + window.location.hash;
              window.history.replaceState({}, document.title, cleanUrl);
            } catch (err) {}
          }
        }
      } catch (e) {}
    }

    // 3. Direct read from window.DEEPSEEK_API_KEY or window.VITE_DEEPSEEK_API_KEY (injected by Vite / GitHub Secrets)
    if (!key) {
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
    }

    // 4. Direct read from process.env (Node / Vite replacement)
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

    // 5. Injected build-time key placeholder
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

  // High-fidelity Markdown & Rich Text Formatter for AI Responses
  function renderFormattedAiMessage(rawText) {
    if (!rawText) return '';

    // Step 1: Escape raw HTML tags for XSS security
    let text = escapeHtml(rawText);

    // Step 2: Normalize newlines
    text = text.replace(/\r\n/g, '\n');

    // Step 3: Bold text (**bold** or __bold__)
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-emerald-400">$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong class="font-bold text-emerald-400">$1</strong>');

    // Step 4: Highlight key pricing and percentages with beautiful tags
    text = text.replace(/(\$\s*\d+(?:\.\d+)?|\b\d+(?:\.\d+)?\s*\$)/g, '<span class="ai-price-tag">$1</span>');
    text = text.replace(/(\b\d+%\b|\b30%\b)/g, '<span class="ai-percent-tag">$1</span>');

    // Step 5: Process lines for headers, numbered cards, and bullet lists
    const rawLines = text.split('\n');
    const htmlChunks = [];
    let inCardList = false;
    let inBulletList = false;

    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i].trim();

      if (!line) {
        if (inCardList || inBulletList) {
          htmlChunks.push('</div>');
          inCardList = false;
          inBulletList = false;
        }
        htmlChunks.push('<div class="h-1.5"></div>');
        continue;
      }

      // Headers: ### or ## or #
      const headerMatch = line.match(/^(#{1,4})\s+(.+)$/);
      if (headerMatch) {
        if (inCardList || inBulletList) {
          htmlChunks.push('</div>');
          inCardList = false;
          inBulletList = false;
        }
        const title = headerMatch[2];
        htmlChunks.push(`
          <div class="mt-2.5 mb-1.5 pt-1.5 pb-1 border-b border-emerald-500/25 font-bold text-white text-[13px] flex items-center gap-1.5">
            <span class="text-emerald-400">✦</span>
            <span>${title}</span>
          </div>
        `);
        continue;
      }

      // Numbered Card items: 1. or 2. or 1- or 2- or 1)
      const numMatch = line.match(/^(\d+)[\.\-\)]\s+(.+)$/);
      if (numMatch) {
        if (inBulletList) {
          htmlChunks.push('</div>');
          inBulletList = false;
        }
        if (!inCardList) {
          htmlChunks.push('<div class="space-y-1.5 my-2">');
          inCardList = true;
        }
        const num = numMatch[1];
        const content = numMatch[2];
        htmlChunks.push(`
          <div class="ai-card-item">
            <span class="ai-card-badge">${num}</span>
            <div class="flex-1 text-slate-200 text-xs leading-relaxed">${content}</div>
          </div>
        `);
        continue;
      }

      // Bullet items: - or * or •
      const bulletMatch = line.match(/^[-*•]\s+(.+)$/);
      if (bulletMatch) {
        if (inCardList) {
          htmlChunks.push('</div>');
          inCardList = false;
        }
        if (!inBulletList) {
          htmlChunks.push('<div class="space-y-1 my-1.5">');
          inBulletList = true;
        }
        const content = bulletMatch[1];
        htmlChunks.push(`
          <div class="ai-bullet-item">
            <span class="ai-bullet-icon">◆</span>
            <div class="flex-1">${content}</div>
          </div>
        `);
        continue;
      }

      // Regular paragraph line
      if (inCardList || inBulletList) {
        htmlChunks.push('</div>');
        inCardList = false;
        inBulletList = false;
      }

      htmlChunks.push(`<p class="text-xs leading-relaxed text-slate-200 my-1">${line}</p>`);
    }

    if (inCardList || inBulletList) {
      htmlChunks.push('</div>');
    }

    return htmlChunks.join('');
  }

  function appendAiBubble(rawReply, replySource) {
    const isAr = (document.documentElement.lang || currentLang || 'ar') === 'ar';
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const floatBox = document.getElementById('floating-cs-chat-box');
    const simBox = document.getElementById('sim-chat-box');

    let displaySource = 'AI Live';
    if (replySource && replySource.includes('deepseek')) {
      displaySource = 'DeepSeek AI';
    } else if (replySource && replySource.includes('gemini')) {
      displaySource = 'Gemini AI';
    }

    const assistantBubbleHtml = `
      <div class="flex items-start gap-2.5">
        <div class="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs shrink-0">
          👨‍💼
        </div>
        <div class="chat-bubble-assistant max-w-[88%] sm:max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm bg-slate-900 border border-emerald-500/30 text-slate-200 leading-relaxed shadow-sm">
          <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-400 font-mono mb-1.5 pb-1 border-b border-slate-800/60">
            <span class="font-bold flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              ${isAr ? 'أحمد [خدمة العملاء]' : 'Ahmed [Support]'}
            </span>
            <span class="text-slate-500">${timeNow} ✓✓</span>
          </div>
          <div class="ai-rich-message text-xs leading-relaxed">${renderFormattedAiMessage(rawReply)}</div>
          <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <a href="${typeof window.getDynamicWhatsAppUrl === 'function' ? window.getDynamicWhatsAppUrl(isAr ? 'ar' : 'en', 'whatsapp-ai-employee') : 'https://wa.me/201107787049'}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-[10px] transition-colors border border-slate-700">
              <span>💬</span>
              <span>${isAr ? 'واتساب WebStack' : 'WhatsApp'}</span>
            </a>
            <span class="text-[9px] font-mono text-emerald-400">${displaySource}</span>
          </div>
        </div>
      </div>
    `;

    if (floatBox) {
      const div = document.createElement('div');
      div.innerHTML = assistantBubbleHtml;
      floatBox.appendChild(div.firstElementChild);
      floatBox.scrollTop = floatBox.scrollHeight;
    }
    if (simBox) {
      const div = document.createElement('div');
      div.innerHTML = assistantBubbleHtml;
      simBox.appendChild(div.firstElementChild);
      simBox.scrollTop = simBox.scrollHeight;
    }
  }

  // Intelligent client-side response generator matching Egyptian tech customer service tone
  function generateWebStackAiResponse(userText, lang) {
    const text = (userText || '').toLowerCase();
    const isEn = lang === 'en' || (/^[a-zA-Z0-9\s.,?!'"@#$%^&*()_+-=:;/<>]+$/.test(userText.trim()) && !/[\u0600-\u06FF]/.test(userText));

    // Phone / Contact provided by user for marketer onboarding or order
    const hasPhone = /(01[0125]\d{8}|\+?\d{10,15})/.test(userText.replace(/\s+/g, ''));
    if (hasPhone) {
      if (isEn) {
        return `Awesome! 🌟 I have recorded your contact details.
I have prepared a direct fast-track link to the WebStack engineering team on WhatsApp (+201107787049) so you can receive the official sales kit, quotation templates, and confirm your onboarding right away.

I'm still right here with you—what questions or systems would you like to explore next? 🚀`;
      }
      return `تمام جداً يا غالي! 🌟 سجلت بياناتك ورقم تواصلك بنجاح.
دلوقتي تقدر تضغط على الزرار بالأسفل للتأكيد الفوري مع فريق WebStack على الواتساب (01107787049) عشان تستلم الحقيبة التسويقية أو عرض السعر ونبدأ فوراً.

وأنا مكمل معاك هنا خطوة بخطوة—تحب تركز في البداية على المتجر الإلكتروني ولا المواقع التعريفية ولا موظف الواتساب وسيستمات الشركات؟ 🚀`;
    }

    // E-Commerce Store Development (إنشاء المتاجر الإلكترونية من الصفر - PHP & MySQL)
    if (text.includes('متجر') || text.includes('متاجر') || text.includes('ecommerce') || text.includes('e-commerce') || text.includes('store') || text.includes('سلة') || text.includes('200') || text.includes('php') || text.includes('mysql') || text.includes('بوابات دفع')) {
      if (isEn) {
        return `Hello! 🛍️ Here are the full details for the Custom E-Commerce Store Platform by WebStack:
1. Technology & Foundation:
   • 100% Custom Built from scratch using modern PHP 8+ and MySQL relational database (Zero WordPress, zero bloated templates).
2. Step-by-Step Consulting & Discovery:
   • We conduct in-depth consultation sessions walking step-by-step with you to analyze your exact business model, product workflows, and customer journeys before coding.
3. Complete In-Store Operations & All Payment Gateways:
   • Integration with all local & global payment gateways: Mada, Visa, Mastercard, Apple Pay, Tabby, Tamara, InstaPay, Wallets, and Cash on Delivery.
   • Everything is managed directly on the store: custom admin dashboard, stock sync & low inventory alerts, automated PDF invoices, and customer database.
4. Immense Value Starting at Just $200 USD:
   • Full source code and database ownership, 0% platform sales commissions forever.
   • Includes official domain name + high-speed SSD cloud hosting for Year 1.
   • Dedicated technical support and continuous daily maintenance contract for 1 full year.
   • Fixed annual renewal: Only $100 USD / year (covers domain, SSD hosting, SSL, and ongoing technical support).

Would you like to book a free consultation or reserve your store package? Contact us on WhatsApp (+201107787049)! 🚀`;
      }
      return `يا هلا بيك يا فندم! 🌟
بص يا فندم، باقة **إنشاء وبرمجة المتاجر الإلكترونية المخصصة (Custom E-Commerce Store)** من شركة WebStack متفصلة ومبنية بالكامل لتعطيك قيمة استثنائية تفوق تكلفتها بمراحل:

1. **التقنية المعتمدة وبناء من الصفر 100%:**
   • المتجر مبرمج ومبني بالكامل من الصفر بلغة **PHP (إصدار 8+)** وقاعدة بيانات **MySQL** منظمة ومترابطة، بدون أي قوالب ووردبريس أو منصات مؤجرة بطيئة. الكود وقاعدة البيانات ملكك بالكامل.

2. **جلسات استشارية تفصيلية خطوة بخطوة:**
   • بنمشي معاك خطوة بخطوة في جلسات عمل واستشارات متخصصة لحد ما نعرف طبيعة خدمتك وتجارتك ماشية إزاي، ونفهم دورة طلباتك، خيارات الشحن، وسلوك المشترين لنهندس النظام وفق احتياجك بالضبط.

3. **جميع بوابات الدفع الإلكترونية:**
   • ربط وتكامل مع جميع بوابات الدفع: مدى، فيزا، ماستركارد، أبل باي (Apple Pay)، تابي، تمارا للتقسيط، إنستاباي، المحافظ الإلكترونية، والدفع عند الاستلام.

4. **كل العمليات تدار وتتم مباشرة على المتجر:**
   • لوحة تحكم إدارية خاصة ومخصصة لك، إدارة المخزون والتنبيه الآلي بنفاد الكميات، سلة تسوق فائقة السرعة، توليد فواتير وبوالص شحن PDF تلقائياً، وإدارة سجل العملاء والطلبات.

5. **قيمة برمجية وتجارية عالية جداً تبدأ من 200 دولار:**
   • السعر يبدأ من **200 دولار فقط** شاملة برمجة المتجر، الاستشارات، اسم دومين رسمي، استضافة سحابية فائقة السرعة SSD، و**عقد صيانة ومتابعة ودعم فني متخصص لمدة سنة كاملة**.
   • التجديد السنوي ثابت ومضمون بـ **100 دولار فقط سنوياً** في حال الرغبة بالتجديد (شامل الدومين، الاستضافة، الصيانة والدعم).

تحب نبدأ بجلسة استشارية سريعة نحدد فيها تفاصيل متجرك ونفصله على مقاس تجارتك؟ تواصل معنا مباشرة عبر الواتساب (01107787049) في أي وقت! 🚀`;
    }

    // Affiliate & Marketing Program Inquiries
    if (text.includes('أفلييت') || text.includes('افلييت') || text.includes('تسويق') || text.includes('عمولة') || text.includes('مسوق') || text.includes('اشتغل') || text.includes('شغل') || text.includes('ربح') || text.includes('affiliate') || text.includes('commission') || text.includes('marketer') || text.includes('partner')) {
      if (isEn) {
        return `Welcome to the WebStack Partner & Affiliate Program! 🚀
Here is how you collaborate with us:
1. Rewarding cash commission on every signed client or project closed through your referral.
2. Complete Marketing Kit: We provide you with official PDF quotation templates, live showcase demos, and pitch decks.
3. Fast Payouts: Direct transfer via Bank, InstaPay, or digital wallets immediately upon client contract signing.

To get registered as an authorized affiliate partner right now:
Could you please share your Name and Phone/WhatsApp number?
You can also connect directly with WebStack on WhatsApp: https://wa.me/201107787049`;
      }
      return `يا هلا بيك يا فندم! 🌟 شرف كبير لينا، وبرنامج شركاء النجاح والتسويق بالعمولة مع شركة WebStack هو فرصتك لتحقيق دخل ممتاز ومستمر:

💰 مميزات برنامج الشركاء:
• عمولة مجزية كاش عن كل عميل أو مشروع يتعاقد عن طريقك!
• يشمل كل خدماتنا: المتاجر الإلكترونية المخصصة، مواقع الشركات، موظفو الذكاء الاصطناعي، سيستمات الشحن، وتطبيقات الموبايل.
• استلام فوري لعمولتك بمجرد توقيع عقد العميل (إنستاباي، فودافون كاش، أو حساب بنكي).

🛠️ إحنا بنوفرلك إيه؟
• نماذج عروض أسعار PDF رسمية، روابط معاينة حية لكل المشاريع، ودعم فني واستشاري كامل لإقناع العميل.

📝 للتسجيل والبدء كشريك تسويقي معتمد:
تواصل معنا مباشرة عبر واتساب WebStack (01107787049) أو اترك اسمك ورقم هاتفك هنا وسنتواصل معك فوراً!`;
    }

    if (text.includes('سعر') || text.includes('باقة') || text.includes('موقع') || text.includes('price') || text.includes('quote') || text.includes('website') || text.includes('cost') || text.includes('تكلفة') || text.includes('فلوس') || text.includes('تجديد') || text.includes('renewal')) {
      if (isEn) {
        return `Hello! 🌟 At WebStack, "Every client has their own custom system" - we build strictly from scratch without ready-made templates.
Pricing varies based on your project's specific requirements, features, and scale.
Every package includes:
• 100% full source code ownership.
• Free high-speed cloud hosting + official domain + SSL security for the first year.
• Dedicated technical support & maintenance.
• 0% sales commission.

To get an accurate, no-obligation custom price quote tailored to your business, message us on WhatsApp (+201107787049)! 🚀`;
      }
      return `أهلاً بحضرتك يا فندم! 🌟
في WebStack مبدأنا الأساسي: "كل عميل له نظامه الخاص"، بنبني البرمجيات من الصفر تماماً حسب احتياج نشاطك بدون قوالب جاهزة.
لذلك التكلفة تختلف حسب متطلبات كل مشروع وحجم ميزاته.

جميع أعمالنا تشمل:
• ملكية كاملة 100% للكود وقواعد البيانات بدون قيود.
• استضافة سحابية سريعة + دومين رسمي + شهادة أمان SSL مجاناً للسنة الأولى.
• صفر % عمولات على مبيعاتك أو تعاملاتك.
• دعم فني ومتابعة مستمرة.

للحصول على استشارة مجانية وعرض سعر مخصص ودقيق لمشروعك، يشرفنا تواصلك معنا مباشرة عبر الواتساب (01107787049)! 🚀`;
    }

    if (text.includes('واتساب') || text.includes('whatsapp') || text.includes('موظف') || text.includes('employee') || text.includes('bot') || text.includes('بوت') || text.includes('pdf') || text.includes('عرض سعر')) {
      if (isEn) {
        return `Hello! 🤖 Our Human-like WhatsApp & Telegram AI Employee is built to supercharge your business:
• Replies in milliseconds with a warm, natural human sales tone 24/7.
• Generates and dispatches official PDF quotations with your company branding directly inside the chat.
• Seamlessly syncs customer inquiries to your database, ERP, and n8n pipelines.
• Delivers instant notifications to managers for hot leads and confirmed orders.

Would you like us to customize this AI employee for your business workflow? Message WebStack directly on WhatsApp (+201107787049)! 🚀`;
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
سيستم الشحن وإدارة المناديب الذكي من شركة WebStack بيشمل كل اللي محتاجه لإدارة أسطولك:
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

We can automate any repetitive operational task for your business! Message WebStack on WhatsApp (+201107787049).`;
      }
      return `أهلاً بحضرتك يا فندم! ⚡
إحنا متخصصين في أتمتة مسارات العمل وهندسة الـ APIs والـ Backend:
• بنبني مسارات n8n المعقدة لربط متجرك (سلة، زد، شوبيفاي، ووكومرس) بالواتساب ومخازنك وجوجل شيتس.
• إعادة محاولة تلقائية عند انقطاع الاتصال (Retry Mechanism) وضمان وصول الـ Webhooks.
• بنية تحتية سحابية للـ Backend فائقة السرعة بـ Node.js وPython مع قواعد بيانات PostgreSQL وRedis.

أي فكرة أو ربط بين أنظمتك نقدر ننفذه لحضرتك باحترافية!`;
    }

    if (isEn) {
      return `Welcome to WebStack! 👋 I'm Ahmed from Customer Service & Sales.
We engineer custom digital solutions tailored to your unique business workflow:
1. Custom E-Commerce Stores (PHP & MySQL from scratch, payment gateways, full code ownership, 0% commissions).
2. Professional Corporate Websites (Bilingual Arabic & English, ultra-fast hosting, SSL, WhatsApp integration).
3. Human-like AI Employees for WhatsApp & Telegram with instant PDF quotation generator.
4. Smart Logistics & Courier Dispatch Platforms with live waybills & COD tracking.
5. Mobile Retail Apps & POS Systems (Android & iOS).
6. n8n Enterprise Workflow Automation & Backend APIs.

How can I assist you with your project today? You can also message WebStack directly on WhatsApp (+201107787049) for a custom consultation! 🚀`;
    }

    return `أهلاً بحضرتك يا فندم في شركة WebStack للحلول البرمجية! 👋
أنا أحمد من خدمة العملاء والمبيعات، سعيد جداً بتواصلك وتحت أمرك في أي استفسار:

1. **إنشاء المتاجر الإلكترونية المخصصة (Custom E-Commerce)**:
   • مبرمجة خصيصاً من الصفر بدون قوالب، تشمل كل بوابات الدفع، لوحة تحكم عربية، استضافة ودومين مجاناً لسنة، وبدون أي عمولات على مبيعاتك.

2. **تصميم مواقع الشركات الاحترافية**:
   • موقع تعريفي متكامل بلغتين (عربي وإنجليزي)، استضافة سحابية فائقة السرعة، وشهادة أمان SSL، وتجاوب تام مع الشاشات.

3. **موظف الذكاء الاصطناعي للواتساب وتليجرام**:
   • ردود فورية مقنعة 24/7 بلهجة بشرية ودودة وتوليد عروض أسعار PDF رسمية.

4. **سيستم إدارة الشحن واللوجستيات**:
   • بوالص شحن باركود، تتبع المناديب لحظياً، وتسوية تحصيل الـ COD.

5. **تطبيقات الموبايل وأنظمة الـ POS**:
   • تطبيقات متكاملة للآيفون والأندرويد، ونظم كاشير للسوبرماركت والصيدليات.

6. **أتمتة الأعمال n8n وهندسة الـ APIs**:
   • مسارات ربط آلية متكاملة لربط متاجرك والأنظمة المحاسبية.

تحب أساعدك في طلب عرض سعر مخصص لمتجرك أو موقعك الإلكتروني؟ 🚀`;
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
        <div class="relative flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-sm shrink-0">
          <span>🤖</span>
          <span class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
          <span class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </div>
        <div class="flex flex-col text-start leading-tight">
          <div class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <span id="launcher-title-text">${isAr ? 'أحمد | مساعد ذكي' : 'Ahmed | Smart Assistant'}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
          <span class="text-[10px] text-slate-500" id="launcher-status-text">${isAr ? 'متصل الآن • اسأل عن خدماتنا' : 'Online • Ask anything'}</span>
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
        <div class="chat-header p-3.5 sm:p-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2.5">
            <div class="relative w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-lg shrink-0">
              <span>👨‍💼</span>
              <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="chat-header-title font-bold text-sm text-slate-800" id="cs-agent-name">${isAr ? 'أحمد - خدمة العملاء' : 'Ahmed - Support'}</span>
                <span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[9px] border border-emerald-200">AI Live</span>
              </div>
              <span class="text-[11px] text-slate-500 block font-mono" id="cs-agent-status">${isAr ? 'فريق WebStack • يرد فوراً بلهجة بشرية' : 'WebStack Team • Instant Replies'}</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <button type="button" id="floating-cs-key-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 text-xs font-mono transition-colors" title="${isAr ? 'إعداد مفتاح DeepSeek الذكي' : 'DeepSeek API Key'}">
              🔑
            </button>
            <button type="button" id="floating-cs-clear-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xs font-mono transition-colors" title="${isAr ? 'مسح المحادثة' : 'Clear Chat'}">
              🗑️
            </button>
            <button type="button" id="floating-cs-close-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 text-xs font-bold transition-colors" title="${isAr ? 'تصغير' : 'Minimize'}">
              ✕
            </button>
          </div>
        </div>

        <!-- Quick Chips -->
        <div class="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0 no-scrollbar">
          <button type="button" class="floating-quick-chip shrink-0 px-3 py-1 rounded-full bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium transition-colors cursor-pointer" data-question="ما هي مميزات بناء متجر إلكتروني مخصص من الصفر بدون قوالب مع WebStack؟">
            🛍️ المتاجر الإلكترونية
          </button>
          <button type="button" class="floating-quick-chip shrink-0 px-3 py-1 rounded-full bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 font-medium transition-colors cursor-pointer" data-question="ما هي مواصفات موقع الشركات التعريفي باللغتين العربية والإنجليزية؟">
            💼 مواقع الشركات
          </button>
          <button type="button" class="floating-quick-chip shrink-0 px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium transition-colors cursor-pointer" data-question="كيف يعمل موظف الذكاء الاصطناعي على الواتساب وتوليد عروض أسعار PDF؟">
            💬 موظف واتساب الذكي
          </button>
          <button type="button" class="floating-quick-chip shrink-0 px-3 py-1 rounded-full bg-white hover:bg-amber-50 text-amber-700 border border-amber-200 font-medium transition-colors cursor-pointer" data-question="أود الحصول على استشارة وعرض سعر مخصص لمشروعي">
            🚀 عرض سعر مخصص
          </button>
        </div>

        <!-- Chat Messages Scroll Container -->
        <div id="floating-cs-chat-box" class="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 text-xs bg-[#F8FAFC]">
          <!-- Initial Welcome Message -->
          <div class="flex items-start gap-2.5">
            <div class="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-xs shrink-0">
              👨‍💼
            </div>
            <div class="chat-bubble-assistant max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm bg-white border border-slate-200 text-slate-800 leading-relaxed shadow-xs">
              <div class="flex items-center justify-between gap-4 text-[10px] text-indigo-600 font-mono mb-1">
                <span class="font-bold">${isAr ? 'أحمد [فريق WebStack]' : 'Ahmed [WebStack Team]'}</span>
                <span class="text-slate-400">${isAr ? 'متصل الآن' : 'Online'}</span>
              </div>
              <div id="cs-welcome-text" class="ai-rich-message text-xs leading-relaxed text-slate-700">
                ${isAr 
                  ? `<p class="mb-2">أهلاً بحضرتك في شركة WebStack للحلول البرمجية! 👋 أنا أحمد من خدمة العملاء والمبيعات، سعيد جداً بتواصلك وتحت أمرك في أي استفسار.</p>
                     <div class="space-y-2 my-2">
                       <div class="p-2 rounded-lg bg-indigo-50/60 border border-indigo-100 text-slate-700 text-xs">
                         <strong class="text-indigo-900 block mb-0.5">🛍️ المتاجر الإلكترونية المخصصة:</strong> برمجة كاملة من الصفر (PHP & MySQL) بدون قوالب جاهزة، بوابات دفع، لوحة تحكم، ودومين واستضافة مجاناً.
                       </div>
                       <div class="p-2 rounded-lg bg-teal-50/60 border border-teal-100 text-slate-700 text-xs">
                         <strong class="text-teal-900 block mb-0.5">💼 مواقع الشركات الاحترافية:</strong> تصميم مميز بلغتين (عربي وإنجليزي)، سرعة فائقة، حماية SSL، ودعم فني مستمر.
                       </div>
                       <div class="p-2 rounded-lg bg-amber-50/60 border border-amber-100 text-slate-700 text-xs">
                         <strong class="text-amber-900 block mb-0.5">💡 كل عميل له نظامه وسعره المخصص:</strong> نقدم عروض أسعار مصممة بدقة حسب حجم مشروعك.
                       </div>
                     </div>
                     <p class="mt-2 text-indigo-600 font-semibold">تحب أساعدك في طلب استشارة أو عرض سعر مخصص؟ 🚀</p>`
                  : `<p class="mb-2">Welcome to WebStack! 👋 I am Ahmed from Customer Support & Sales.</p>
                     <div class="space-y-2 my-2">
                       <div class="p-2 rounded-lg bg-indigo-50/60 border border-indigo-100 text-xs"><strong>Custom E-Commerce:</strong> Built from scratch with PHP & MySQL, full payment gateways, and 0% sales commission.</div>
                       <div class="p-2 rounded-lg bg-teal-50/60 border border-teal-100 text-xs"><strong>Corporate Websites:</strong> Bilingual (AR/EN), fast SSD cloud hosting, and SSL included.</div>
                       <div class="p-2 rounded-lg bg-amber-50/60 border border-amber-100 text-xs"><strong>Tailored Solutions:</strong> Every system is custom engineered to your exact operational workflow.</div>
                     </div>
                     <p class="mt-2 text-indigo-600 font-semibold">How can I assist you with a custom quote today? 🚀</p>`
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div id="floating-cs-typing" class="hidden items-center gap-2 px-4 py-1.5 text-xs text-indigo-600 font-mono bg-indigo-50/50 border-t border-slate-100 shrink-0">
          <span class="inline-flex gap-1 items-center">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></span>
          </span>
          <span class="text-[11px] font-medium">${isAr ? 'أحمد يكتب الآن...' : 'Ahmed is typing...'}</span>
        </div>

        <!-- Input Bar (Flexible Auto-Expanding with Crisp Readable Typography) -->
        <div class="p-3 bg-white border-t border-slate-200 shrink-0">
          <form id="floating-cs-form" class="flex items-end gap-2">
            <textarea 
              id="floating-cs-input" 
              rows="1" 
              placeholder="${isAr ? 'اكتب سؤالك هنا لأحمد...' : 'Type your question here...'}" 
              class="chat-input-box flex-1 px-3.5 py-2.5 text-sm font-medium rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500/40 transition-all resize-none leading-relaxed block" 
              autocomplete="off"
            ></textarea>
            <button 
              id="floating-cs-send-btn" 
              type="submit" 
              class="h-[44px] px-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs transition-transform hover:scale-105 cursor-pointer flex items-center justify-center shrink-0 shadow-sm self-end" 
              title="${isAr ? 'إرسال' : 'Send'}"
            >
              <span>➤</span>
            </button>
          </form>
          <div class="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <a href="https://wa.me/201107787049" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-600 font-medium transition-colors flex items-center gap-1">
              <span>💬</span>
              <span>${isAr ? 'تحويل للمحادثة عبر واتساب' : 'Chat on WhatsApp'}</span>
            </a>
            <span class="font-mono text-slate-400">شركة WebStack</span>
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
        <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 mb-2">
          <div class="flex items-center gap-2">
            <div class="relative w-7 h-7 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-sm shrink-0">
              <span>👨‍💼</span>
              <span class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            </div>
            <div>
              <span class="font-bold text-xs text-slate-800 block leading-tight" id="bubble-agent-name">${isAr ? 'أحمد - خدمة العملاء' : 'Ahmed - Support'}</span>
              <span class="text-[9px] text-emerald-600 font-mono font-medium">${isAr ? 'متصل الآن ⚡' : 'Online ⚡'}</span>
            </div>
          </div>
          <button type="button" id="bubble-dismiss-btn" class="text-slate-400 hover:text-slate-700 text-xs p-1 cursor-pointer transition-colors" title="${isAr ? 'إغلاق' : 'Dismiss'}">✕</button>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed mb-3" id="bubble-msg-text">
          ${isAr 
            ? 'أهلاً بحضرتك في WebStack! 👋 أنا أحمد من خدمة العملاء، لو حابب تستفسر عن إنشاء متجرك الإلكتروني، تصميم موقع شركتك، أو طلب عرض سعر مخصص، أنا في خدمتك فوراً! 💬'
            : 'Welcome to WebStack! 👋 I am Ahmed from Customer Support. If you have questions about custom e-commerce stores, corporate websites, or custom software quotes, I am here to assist you! 💬'}
        </p>
        <div class="flex items-center gap-2 pt-1 border-t border-slate-100">
          <button type="button" id="bubble-open-chat-btn" class="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs text-center transition-transform hover:scale-102 shadow-xs cursor-pointer">
            ${isAr ? '💬 تواصل معنا الآن' : '💬 Chat with Us'}
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
      const resizeFloatingInput = function () {
        input.style.height = 'auto';
        const newH = Math.min(Math.max(input.scrollHeight, 44), 140);
        input.style.height = newH + 'px';
        input.style.overflowY = input.scrollHeight > 140 ? 'auto' : 'hidden';
      };
      input.addEventListener('input', resizeFloatingInput);
      input.onkeydown = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
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
        try {
          sessionStorage.setItem('webstack_chat_stuck_shown', 'true');
        } catch(err) {}
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
    if (hasDisclosedAi) {
      updateChatUiToPostDisclosure(isAr);
    }
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

  // Tracking dismissal of AI Chat by visitor
  let chatDismissedByUser = false;
  let hasShownStuckHint = false;
  try {
    chatDismissedByUser = sessionStorage.getItem('webstack_chat_dismissed') === 'true';
    hasShownStuckHint = sessionStorage.getItem('webstack_chat_stuck_shown') === 'true';
  } catch(e) {}

  let hesitationDetectorBound = false;
  function setupHesitationDetector() {
    if (hesitationDetectorBound || hasShownStuckHint) return;
    hesitationDetectorBound = true;

    let lastInteractionTime = Date.now();
    let scrollReversals = 0;
    let lastScrollY = window.scrollY;

    function triggerStuckHint(contextMsg) {
      if (hasShownStuckHint) return;
      const win = document.getElementById('floating-ai-window');
      const bubble = document.getElementById('floating-ai-greeting-bubble');
      if (win && win.classList.contains('open')) return;
      if (!bubble) return;

      hasShownStuckHint = true;
      try {
        sessionStorage.setItem('webstack_chat_stuck_shown', 'true');
      } catch(err) {}

      const isAr = (document.documentElement.lang || currentLang || 'ar') === 'ar';
      const bubbleMsg = document.getElementById('bubble-msg-text');
      if (bubbleMsg) {
        bubbleMsg.textContent = contextMsg || (isAr 
          ? 'لاحظت أنك تتصفح خدماتنا.. محتار في اختيار الخدمة أو مش عارف تبدأ منين؟ 🤔 أنا أحمد في خدمتك لمساعدتك خطوة بخطوة!'
          : 'Still exploring or unsure where to start? 🤔 I am Ahmed, ready to assist and guide you step by step!');
      }
      bubble.classList.remove('hidden');
      setTimeout(() => {
        bubble.classList.add('show');
        playGentleGreetingChime();
      }, 50);

      // Auto-hide after 12 seconds if not clicked so it doesn't disturb visitor
      setTimeout(() => {
        if (bubble && bubble.classList.contains('show')) {
          bubble.classList.remove('show');
          setTimeout(() => bubble.classList.add('hidden'), 300);
        }
      }, 12000);
    }

    // 1. Inactivity trigger: 65 seconds of idle browsing without taking action after closing chat
    const inactivityCheck = setInterval(() => {
      if (hasShownStuckHint) {
        clearInterval(inactivityCheck);
        return;
      }
      if (Date.now() - lastInteractionTime >= 65000) {
        triggerStuckHint();
        clearInterval(inactivityCheck);
      }
    }, 10000);

    // 2. Hesitation scroll trigger: back and forth scrolling without taking action (looking for something)
    const onHesitationScroll = () => {
      lastInteractionTime = Date.now();
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastScrollY) > 400) {
        scrollReversals++;
        lastScrollY = currentY;
        if (scrollReversals >= 4) {
          triggerStuckHint();
        }
      }
    };

    // 3. Exit Intent Detection (Desktop cursor moving towards browser top navigation)
    const onMouseLeaveDoc = (e) => {
      if (e.clientY <= 12 && !hasShownStuckHint) {
        triggerStuckHint();
      }
    };

    const resetUserTimer = () => {
      lastInteractionTime = Date.now();
    };

    window.addEventListener('scroll', onHesitationScroll, { passive: true });
    window.addEventListener('click', resetUserTimer, { passive: true });
    window.addEventListener('keydown', resetUserTimer, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveDoc);
  }

  // Setup Proactive Greeting: Initiates conversation after exactly 2 MINUTES (120,000 ms)
  let proactiveGreetingScheduled = false;
  function setupProactiveCustomerServiceGreeting() {
    if (proactiveGreetingScheduled) return;
    proactiveGreetingScheduled = true;

    // If user already dismissed chat during this session, do not auto-open, only monitor hesitation
    if (chatDismissedByUser) {
      setupHesitationDetector();
      return;
    }

    // 2-minute timer (120,000 ms)
    const TWO_MINUTES_MS = 120000;
    setTimeout(() => {
      const win = document.getElementById('floating-ai-window');
      // Only auto-open if user has not explicitly dismissed it and it's not already open
      if (!chatDismissedByUser && win && !win.classList.contains('open')) {
        playGentleGreetingChime();
        window.toggleAiCustomerServiceChat(true);
      }
    }, TWO_MINUTES_MS);
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
      // Mark as dismissed by user when closed
      try {
        sessionStorage.setItem('webstack_chat_dismissed', 'true');
      } catch (err) {}
      chatDismissedByUser = true;
      win.classList.remove('open');
      setupHesitationDetector();
    }
  };

  window.clearAiCustomerServiceChat = function () {
    chatHistory = [];
    try {
      sessionStorage.removeItem(CHAT_STORAGE_KEY);
    } catch (e) {}

    const isAr = (document.documentElement.lang || currentLang || 'ar') === 'ar';
    const welcomeHtml = isAr 
      ? `<p class="mb-2">أهلاً بحضرتك في شركة WebStack للحلول البرمجية! 👋 أنا أحمد من خدمة العملاء والمبيعات، تحت أمرك في أي استفسار.</p>
         <div class="space-y-2 my-2">
           <div class="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-slate-700 text-xs">
             <strong class="text-indigo-900 block mb-0.5">🛍️ المتاجر الإلكترونية المخصصة:</strong> برمجة من الصفر (PHP & MySQL) بدون قوالب جاهزة و0% عمولات على مبيعاتك.
           </div>
           <div class="p-2 rounded-lg bg-teal-50 border border-teal-100 text-slate-700 text-xs">
             <strong class="text-teal-900 block mb-0.5">💼 مواقع الشركات الاحترافية:</strong> تصميم مميز بلغتين (عربي وإنجليزي)، سرعة فائقة، حماية SSL، ودعم فني مستمر.
           </div>
         </div>
         <p class="mt-2 text-indigo-600 font-semibold">تحب أساعدك في طلب استشارة أو عرض سعر مخصص؟ 🚀</p>`
      : `<p class="mb-2">Welcome to WebStack! 👋 I am Ahmed from Customer Service & Sales.</p>
         <div class="space-y-2 my-2">
           <div class="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-xs"><strong>Custom E-Commerce:</strong> Built from scratch with PHP & MySQL, full payment gateways, and 0% sales commission.</div>
           <div class="p-2 rounded-lg bg-teal-50 border border-teal-100 text-xs"><strong>Corporate Websites:</strong> Bilingual (AR/EN), fast SSD cloud hosting, and SSL included.</div>
         </div>
         <p class="mt-2 text-indigo-600 font-semibold">How can I assist you with a custom quote today? 🚀</p>`;

    // Clear Floating Widget
    const floatBox = document.getElementById('floating-cs-chat-box');
    if (floatBox) {
      floatBox.innerHTML = `
        <div class="flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs shrink-0">
            👨‍💼
          </div>
          <div class="chat-bubble-assistant max-w-[88%] sm:max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm bg-slate-900 border border-emerald-500/30 text-slate-200 leading-relaxed shadow-sm">
            <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-400 font-mono mb-1.5 pb-1 border-b border-slate-800/60">
              <span class="font-bold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                ${isAr ? 'أحمد [خدمة العملاء]' : 'Ahmed [Customer Support]'}
              </span>
              <span class="text-slate-500">${isAr ? 'متصل الآن' : 'Online'}</span>
            </div>
            <div class="ai-rich-message text-xs leading-relaxed">${welcomeHtml}</div>
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
          <div class="chat-bubble-assistant max-w-[88%] sm:max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm bg-slate-900 border border-emerald-500/30 text-slate-200 leading-relaxed shadow-sm">
            <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-400 font-mono mb-1.5 pb-1 border-b border-slate-800/60">
              <span class="font-bold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                [${isAr ? 'موظف مبيعات WebStack' : 'WebStack Sales AI'}]
              </span>
              <span class="text-slate-500">${isAr ? 'متصل الآن' : 'Online'}</span>
            </div>
            <div class="ai-rich-message text-xs leading-relaxed">${welcomeHtml}</div>
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
    visitorMessageCount++;
    try {
      sessionStorage.setItem('webstack_visitor_msg_count', String(visitorMessageCount));
    } catch(e) {}

    // Check contact data and question intent
    const hasPhone = /(01[0125]\d{8}|\+?\d{10,15})/.test(cleanText.replace(/\s+/g, ''));
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(cleanText);
    const isAffiliateChat = cleanText.includes('أفلييت') || cleanText.includes('افلييت') || cleanText.includes('تسويق') || cleanText.includes('عمولة') || cleanText.includes('مسوق') || cleanText.includes('30%') || cleanText.includes('affiliate');
    const isDirectQuestion = isDirectAiQuestion(cleanText);

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

    if (floatInput) {
      floatInput.value = '';
      floatInput.style.height = 'auto';
      floatInput.style.overflowY = 'hidden';
    }
    if (simInput) {
      simInput.value = '';
      simInput.style.height = 'auto';
      simInput.style.overflowY = 'hidden';
    }
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

      // Prior disclosure before saving visitor data (name, phone, email)
      if ((hasPhone || hasEmail) && !hasDisclosedAi) {
        setTimeout(() => {
          showAiDisclosureCard(sourceContext);
        }, 250);
      }


      // Show active typing indicators
      if (floatTyping) floatTyping.classList.remove('hidden');
      if (simTyping) {
        simTyping.classList.remove('hidden');
        simTyping.classList.add('flex');
      }

      // Detect if user sent a DeepSeek API key directly in chat
      const trimmedInput = cleanText.trim();
      const isDirectKeyInput = (trimmedInput.startsWith('sk-') && trimmedInput.length > 20) ||
                              (trimmedInput.toLowerCase().startsWith('/key ') && trimmedInput.length > 25) ||
                              (trimmedInput.startsWith('مفتاح ') && trimmedInput.length > 25) ||
                              (trimmedInput.startsWith('المفتاح: ') && trimmedInput.length > 25);

      if (isDirectKeyInput) {
        let keyToStore = trimmedInput;
        if (keyToStore.toLowerCase().startsWith('/key ')) keyToStore = keyToStore.slice(5).trim();
        if (keyToStore.startsWith('مفتاح ')) keyToStore = keyToStore.slice(6).trim();
        if (keyToStore.startsWith('المفتاح: ')) keyToStore = keyToStore.slice(8).trim();

        if (keyToStore.startsWith('sk-') && keyToStore.length > 20) {
          try {
            localStorage.setItem('DEEPSEEK_API_KEY', keyToStore);
            window.DEEPSEEK_API_KEY = keyToStore;
          } catch(e) {}

          const keySuccessReply = isAr
            ? `تم حفظ وتفعيل مفتاح DeepSeek بنجاح يا فندم! 🚀✨\nالموديل الذكي المفكر (DeepSeek) متصل وشغال الآن 100%. كل استفساراتك القادمة سيتم الرد عليها بشكل حي ومباشر بالذكاء الاصطناعي.`
            : `DeepSeek API Key has been saved and activated successfully! 🚀 Every upcoming question will be processed directly by DeepSeek AI.`;
          
          setTimeout(() => {
            if (floatTyping) floatTyping.classList.add('hidden');
            if (simTyping) simTyping.classList.add('hidden');
            appendAiBubble(keySuccessReply, 'deepseek-chat');
            isSendingAiMessage = false;
          }, 300);
          return;
        }
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

      // Helper function to call DeepSeek API
      async function requestDeepSeek(key) {
        if (!key || key.length < 15) return null;
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
          const timeoutId = setTimeout(() => controller.abort(), 18000);

          const dsResponse = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: messages,
              temperature: 0.7,
              max_tokens: 1000
            }),
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (dsResponse.ok) {
            const dsData = await dsResponse.json();
            if (dsData && dsData.choices && dsData.choices[0] && dsData.choices[0].message) {
              return { success: true, reply: dsData.choices[0].message.content };
            }
          } else {
            const errBody = await dsResponse.text().catch(() => '');
            console.warn('DeepSeek HTTP Error:', dsResponse.status, errBody);
            if (dsResponse.status === 401) {
              return { success: false, reply: 'عذراً يا فندم، مفتاح DeepSeek غير صالح أو تم إلغاؤه (خطأ 401 Unauthorized). يرجى الضغط على أيقونة 🔑 بأعلى الشات لإدخال مفتاح جديد وسليم.' };
            } else if (dsResponse.status === 402) {
              return { success: false, reply: 'عذراً يا فندم، رصيد حسابك في منصة DeepSeek غير كافٍ أو انتهى (خطأ 402 Insufficient Balance). يرجى شحن الرصيد في منصة DeepSeek ليعود الموديل للرد التفاعلي.' };
            } else if (dsResponse.status === 429) {
              return { success: false, reply: 'عذراً يا فندم، تم تجاوز معدل الطلبات المسموح به حالياً على منصة DeepSeek (خطأ 429 Rate Limit). يرجى الانتظار بضع ثوانٍ والمحاولة ثانية.' };
            }
          }
        } catch (err) {
          console.warn('Direct DeepSeek call network exception:', err);
        }
        return null;
      }

      
      // Check if user is asking directly if Ahmed is a bot/AI/human
      if (isDirectQuestion) {
        aiReply = isAr
          ? 'أهلاً بحضرتك يا فندم! بصراحة وبكل شفافية: أنا أحمد، موظف ذكاء اصطناعي (AI) تم تطويري وهندستي بواسطة فريق WebStack للرد على استفسارات عملائنا وخدمتكم بأسلوب بشري طبيعي 24/7 وبأعلى دقة.'
          : 'Hello! With complete honesty and transparency: I am Ahmed, an AI employee developed and engineered by the WebStack team to assist clients with a natural human style 24/7.';
        replySource = 'ai-transparency';
      }

      // 1. Direct DeepSeek API call if on static production site (GitHub Pages / custom domain)
      if (!aiReply && isStaticSite && directKey && directKey.length > 15) {
        const dsResult = await requestDeepSeek(directKey);
        if (dsResult && dsResult.reply) {
          aiReply = dsResult.reply;
          replySource = 'deepseek-chat';
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
        const dsResult = await requestDeepSeek(directKey);
        if (dsResult && dsResult.reply) {
          aiReply = dsResult.reply;
          replySource = 'deepseek-chat';
        }
      }

      // 4. Secondary fallback to /api/ai-customer-service or /api/deepseek-chat if available
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

      // 5. Built-in intelligent Egyptian customer service fallback
      if (!aiReply) {
        aiReply = generateWebStackAiResponse(cleanText, isAr ? 'ar' : 'en');
        replySource = 'egyptian-customer-service-engine';

        if (isStaticSite && !directKey) {
          aiReply += '\n\n💡 ملاحظة: لتفعيل ردود موديل DeepSeek الذكي المفكر، يمكنك الضغط على أيقونة 🔑 بأعلى الشات لإدخال المفتاح مرة واحدة فقط.';
        }
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
          ? `مرحباً فريق WebStack، أود الانضمام لبرنامج التسويق بالعمولة (30%).\nبياناتي وتفاصيلي من الشات:\n${cleanText}`
          : `Hello WebStack Team, I would like to join the 30% Affiliate Program.\nMy details:\n${cleanText}`;
        extraActionBtn = `
          <div class="mt-2.5 pt-2 border-t border-emerald-500/30">
            <a href="https://wa.me/201107787049?text=${encodeURIComponent(waMsg)}" target="_blank" rel="noopener noreferrer" class="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform hover:scale-[1.02]">
              <span>🚀</span>
              <span>${isAr ? 'تأكيد التسجيل كمسوق على واتساب فريق WebStack' : 'Confirm Affiliate Registration on WhatsApp'}</span>
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

      // Build Assistant Bubble HTML with Rich Card Formatting
      const assistantBubbleHtml = `
        <div class="flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs shrink-0">
            👨‍💼
          </div>
          <div class="chat-bubble-assistant max-w-[88%] sm:max-w-[85%] p-3.5 rounded-2xl rounded-tl-sm bg-slate-900 border border-emerald-500/30 text-slate-200 leading-relaxed shadow-sm">
            <div class="flex items-center justify-between gap-4 text-[10px] text-emerald-400 font-mono mb-1.5 pb-1 border-b border-slate-800/60">
              <span class="font-bold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                ${hasDisclosedAi ? 'AI' : (isAr ? 'أحمد [خدمة العملاء]' : 'Ahmed [Support]')}
              </span>
              <span class="text-slate-500">${hasDisclosedAi ? (isAr ? 'مساعد ذكي • متاح 24/7' : 'AI Assistant • 24/7') : `${timeNow} ✓✓`}</span>
            </div>
            <div class="ai-rich-message text-xs leading-relaxed space-y-1.5">${renderFormattedAiMessage(aiReply)}</div>
            ${extraActionBtn}
            <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <a href="${typeof window.getDynamicWhatsAppUrl === 'function' ? window.getDynamicWhatsAppUrl(isAr ? 'ar' : 'en', 'general') : 'https://wa.me/201107787049'}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-[10px] transition-colors border border-slate-700">
                <span>💬</span>
                <span>${isAr ? 'واتساب WebStack' : 'WhatsApp'}</span>
              </a>
              <span class="text-[9px] font-mono text-emerald-400">${hasDisclosedAi ? 'AI Engine' : displaySource}</span>
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

      // Check disclosure triggers after assistant reply
      const replyAsksContactData = /رقم\s*(تليفون|هاتف|موبايل|واتساب)|(اسم\s*حضرتك)|(بيانات\s*التواصل)|(إيميل|ايميل|بريدك)|(phone|email|contact\s*details)/i.test(aiReply);
      if (isDirectQuestion) {
        // Honesty upon direct question: Ahmed replied truthfully, now show disclosure card
        setTimeout(() => {
          showAiDisclosureCard(sourceContext);
        }, 350);
      } else if (visitorMessageCount >= 5 && !hasDisclosedAi) {
        // After 5 visitor messages
        setTimeout(() => {
          showAiDisclosureCard(sourceContext);
        }, 400);
      } else if (replyAsksContactData && !hasDisclosedAi) {
        // Before chat asks visitor for data
        setTimeout(() => {
          showAiDisclosureCard(sourceContext);
        }, 300);
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

    // Mobile menu toggle direct listener (buttons only)
    document.querySelectorAll('#mobile-menu-btn, button[data-action="toggle-mobile-menu"]').forEach(btn => {
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
      const resizeSimInput = function () {
        simInput.style.height = 'auto';
        // Min 50px (single row), max 180px (multi-row) with smooth overflow
        const newH = Math.min(Math.max(simInput.scrollHeight, 50), 180);
        simInput.style.height = newH + 'px';
        simInput.style.overflowY = simInput.scrollHeight > 180 ? 'auto' : 'hidden';
      };
      simInput.addEventListener('input', resizeSimInput);
      simInput.onkeydown = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
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

    // Direct listener for WhatsApp clicks inside chat to trigger AI disclosure
    document.addEventListener('click', function (e) {
      const waBtnInsideChat = e.target.closest('#floating-ai-window a[href*="wa.me"], #sim-chat-box a[href*="wa.me"], .chat-bubble-assistant a[href*="wa.me"], #floating-ai-window a[href*="whatsapp"], #sim-chat-box a[href*="whatsapp"]');
      if (waBtnInsideChat && !hasDisclosedAi) {
        showAiDisclosureCard();
      }
    });

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

        const msgText = `مرحباً فريق WebStack، أود التسجيل في برنامج التسويق بالعمولة (30%).
الاسم: ${name}
الهاتف / واتساب: ${phone}
طريقة التسويق والخبرة: ${channel}
${note ? 'ملاحظات: ' + note : ''}`;

        // Save into chat session memory so Ahmed continues smoothly
        chatHistory.push({ role: 'user', content: `أرغب بالانضمام كمسوق بالعمولة (30%). اسمي: ${name}، ورقمي: ${phone}، وطريقة تسويقي: ${channel}.` });
        chatHistory.push({ role: 'assistant', content: `أهلاً بك يا ${name}! 🌟 تم تسجيل بياناتك في نظام التسويق بالعمولة 30% بنجاح. بياناتك جاهزة وجاري تحويلك لواتساب فريق WebStack (01107787049) لاستلام المواد التسويقية ونماذج العروض والبدء فوراً. وأنا في خدمتك هنا في أي وقت!` });
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

    // Detect clicking WhatsApp CTA inside chat to trigger AI disclosure
    const waInChat = target.closest('#floating-ai-window a[href*="wa.me"], #sim-chat-box a[href*="wa.me"]');
    if (waInChat && !hasDisclosedAi) {
      showAiDisclosureCard();
    }

    // Direct Project Card Click (Clicking anywhere on card or image takes user directly to live project)
    const projectCard = target.closest('[data-project-link]');
    if (projectCard && !target.closest('button, input, textarea, select')) {
      const href = projectCard.getAttribute('data-project-link');
      const clickedLink = target.closest('a');
      // If user clicked the card body or the image link, open the project
      if (!clickedLink || clickedLink.classList.contains('project-card-image-link') || clickedLink === projectCard) {
        if (clickedLink && clickedLink.href) {
          // let the anchor handle it naturally
        } else if (href) {
          e.preventDefault();
          if (href.startsWith('http')) {
            window.open(href, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = href;
          }
          return;
        }
      }
    }

    // Floating Chat Launcher Click
    const floatLauncher = target.closest('#floating-ai-launcher');
    if (floatLauncher) {
      e.preventDefault();
      window.toggleAiCustomerServiceChat();
      return;
    }

    // Floating Chat DeepSeek Key Button Click
    const floatKeyBtn = target.closest('#floating-cs-key-btn');
    if (floatKeyBtn) {
      e.preventDefault();
      const currentKey = getDeepSeekClientKey();
      const maskedKey = (currentKey && currentKey.length > 8) 
        ? currentKey.slice(0, 6) + '...' + currentKey.slice(-4) 
        : '';
      
      const promptMsg = isAr
        ? (maskedKey 
            ? `مفتاح DeepSeek الحالي: (${maskedKey})\n\nلإدخال مفتاح جديد أو تحديث المفتاح، الصقه هنا (يبدأ بـ sk-...):`
            : 'أدخل مفتاح DeepSeek API الخاص بك (يبدأ بـ sk-...) لتفعيل ردود الذكاء الاصطناعي المفكر فوراً وبشكل دائم:')
        : 'Enter your DeepSeek API key (starts with sk-...) to activate live AI reasoning:';

      const enteredKey = window.prompt(promptMsg, currentKey || '');
      if (enteredKey !== null) {
        const clean = enteredKey.trim();
        if (clean.startsWith('sk-') && clean.length > 20) {
          try {
            localStorage.setItem('DEEPSEEK_API_KEY', clean);
            window.DEEPSEEK_API_KEY = clean;
          } catch(err) {}
          window.showToast(isAr ? 'تم حفظ وتفعيل مفتاح DeepSeek بنجاح! 🚀 الموديل متصل الآن' : 'DeepSeek Key activated successfully! 🚀', 'success');
          
          const statusEl = document.getElementById('cs-agent-status');
          if (statusEl) {
            statusEl.innerHTML = `<span class="text-emerald-400">● DeepSeek AI متصل ونشط 🧠</span>`;
          }
        } else if (clean === '') {
          try {
            localStorage.removeItem('DEEPSEEK_API_KEY');
            delete window.DEEPSEEK_API_KEY;
          } catch(err) {}
          window.showToast(isAr ? 'تم مسح المفتاح المخزن' : 'Key removed', 'info');
        } else {
          window.showToast(isAr ? 'المفتاح غير صحيح (يجب أن يبدأ بـ sk-)' : 'Invalid key (must start with sk-)', 'warning');
        }
      }
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
      try {
        sessionStorage.setItem('webstack_chat_stuck_shown', 'true');
      } catch(err) {}
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
      if (window.closeAffiliateModal) window.closeAffiliateModal();
      window.toggleAiCustomerServiceChat(true);
      const prompt = 'عايز أعرف تفاصيل نظام Affiliate Market والـ 30% عمولة وإزاي أبدأ معاكم كمسوق؟';
      setTimeout(() => {
        if (window.sendAiCustomerServiceMessage) {
          window.sendAiCustomerServiceMessage(prompt, 'floating');
        }
      }, 350);
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

    // Affiliate Market Modal Open
    const openAffiliateTrigger = target.closest('[data-action="open-affiliate-modal"]');
    if (openAffiliateTrigger) {
      e.preventDefault();
      if (window.openAffiliateModal) window.openAffiliateModal();
      return;
    }

    // Affiliate Market Modal Close
    const closeAffiliateTrigger = target.closest('[data-action="close-affiliate-modal"]');
    if (closeAffiliateTrigger) {
      if (target.closest('[data-stop-propagation="true"]') && !target.closest('button[data-action="close-affiliate-modal"]')) {
        return;
      }
      e.preventDefault();
      if (window.closeAffiliateModal) window.closeAffiliateModal();
      return;
    }

    // Billing Cycle Toggle (Monthly / Annual)
    const billingBtn = target.closest('.billing-cycle-btn, [data-action="toggle-billing"]');
    if (billingBtn) {
      e.preventDefault();
      const cycle = billingBtn.getAttribute('data-cycle') || 'monthly';
      if (window.setBillingCycle) {
        window.setBillingCycle(cycle);
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

    // FAQ Accordion Toggle
    const faqBtn = target.closest('.faq-btn, .faq-toggle');
    if (faqBtn) {
      e.preventDefault();
      const parent = faqBtn.closest('.faq-item') || faqBtn.parentElement;
      const answer = parent ? parent.querySelector('.faq-answer, .faq-content') : null;
      const icon = faqBtn.querySelector('.faq-icon');
      const isExpanded = (faqBtn.getAttribute('aria-expanded') === 'true') || (parent && parent.classList.contains('active'));

      // Close all other FAQ items for a clean accordion effect
      document.querySelectorAll('.faq-btn, .faq-toggle').forEach(btn => {
        if (btn !== faqBtn) {
          btn.setAttribute('aria-expanded', 'false');
          const p = btn.closest('.faq-item') || btn.parentElement;
          if (p) p.classList.remove('active');
          const a = p ? p.querySelector('.faq-answer, .faq-content') : null;
          const ic = btn.querySelector('.faq-icon');
          if (a) a.classList.add('hidden');
          if (ic) ic.classList.remove('rotate-180');
        }
      });

      if (isExpanded) {
        faqBtn.setAttribute('aria-expanded', 'false');
        if (parent) parent.classList.remove('active');
        if (answer) answer.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        faqBtn.setAttribute('aria-expanded', 'true');
        if (parent) parent.classList.add('active');
        if (answer) answer.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
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
    const mobileBtn = target.closest('#mobile-menu-btn, button[data-action="toggle-mobile-menu"]');
    if (mobileBtn) {
      e.preventDefault();
      window.toggleMobileMenu();
      return;
    }

    // Auto-Close Mobile Menu when clicking any link inside #mobile-menu
    const mobileNavLink = target.closest('#mobile-menu a');
    if (mobileNavLink) {
      if (window.closeMobileMenu) {
        window.closeMobileMenu();
      }
      // Natural navigation allowed - do not preventDefault
      return;
    }

    // Auto-Close Mobile Menu when clicking outside header & menu
    if (window.isMobileMenuOpen && !target.closest('#mobile-menu') && !target.closest('#mobile-menu-btn')) {
      if (window.closeMobileMenu) {
        window.closeMobileMenu();
      }
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

  // --- Close modals & mobile menu on ESC or overlay click ---
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeLightbox();
      window.closeProjectDetails();
      if (window.closeAffiliateModal) window.closeAffiliateModal();
      if (window.closeMobileMenu) window.closeMobileMenu();
    }
  });

  // --- Auto-close mobile menu on desktop resize ---
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024 && window.isMobileMenuOpen && window.closeMobileMenu) {
      window.closeMobileMenu();
    }
  }, { passive: true });

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

    // Check hash for affiliate market modal on-demand
    if (typeof window !== 'undefined' && window.location && (window.location.hash === '#affiliate' || window.location.hash === '#affiliate-market')) {
      setTimeout(() => {
        if (window.openAffiliateModal) window.openAffiliateModal();
      }, 300);
    }
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
