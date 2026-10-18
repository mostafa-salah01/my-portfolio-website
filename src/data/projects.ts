export interface ProjectItem {
  id: string;
  titleEn: string;
  titleAr: string;
  taglineEn: string;
  taglineAr: string;
  image: string;
  category: 'web-development' | 'ecommerce-demos' | 'ai-employee' | 'shipping' | 'mobile-apps' | 'automation' | 'backend';
  categoryLabelEn: string;
  categoryLabelAr: string;
  metricsEn: string;
  metricsAr: string;
  tech: string[];
  featuresEn: string[];
  featuresAr: string[];
  liveUrl?: string;
  pageUrl?: string;
  whatsappMsg: string;
  badge?: string;
}

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'larose-store',
    titleEn: 'Larose Store — Luxury Fashion & Cosmetics Live Store',
    titleAr: 'متجر لاروز (Larose Store) - متجر إلكتروني حي',
    taglineEn: 'Live production e-commerce store for luxury fashion, cosmetics and lifestyle with smart cart and instant checkout',
    taglineAr: 'متجر إلكتروني حي متكامل للأزياء الراقية ومستحضرات التجميل مع سلة ذكية ودفع إلكتروني سريع',
    image: '/assets/images/larose_beauty_showcase.jpg',
    category: 'ecommerce-demos',
    categoryLabelEn: 'Live Production Store',
    categoryLabelAr: 'متجر إلكتروني حي',
    metricsEn: 'Live Client Platform · 100% Production Ready',
    metricsAr: 'متجر حي رئيسي · جاهزية كاملة للشراء',
    tech: ['Custom E-Commerce', 'PHP & MySQL Architecture', 'Instant Cart Drawer', 'Payment Integrations', 'Cloud Hosting + SSL'],
    featuresEn: [
      'Live production e-commerce store engineered by WebStack for Larose',
      'High-conversion mobile UX with instant cart drawer and fast product filtering',
      'Electronic payment gateways ready (Mada, Visa, Apple Pay, Cash-on-Delivery)',
      'Rich product showcase, responsive luxury aesthetic and lightning-fast loading speed'
    ],
    featuresAr: [
      'متجر إلكتروني حي ومنفذ على أرض الواقع بواسطة فريق WebStack لعلامة Larose',
      'تجربة شراء فائقة السلاسة على الموبايل مع سلة فورية وفلاتر ذكية للمنتجات',
      'جاهزية تامة لكافة بوابات الدفع الإلكتروني (مدى، فيزا، أبل باي، والدفع عند الاستلام)',
      'تصميم فاخر متجاوب وسرعة تصفح فائقة مع استضافة سحابية مؤمنة'
    ],
    liveUrl: 'https://larose.salah-logistics.uk/',
    whatsappMsg: 'مرحباً فريق WebStack، شاهدت متجر لاروز (Larose Store) https://larose.salah-logistics.uk/ وأرغب في برمجة متجر مماثل لنشاطي والحصول على عرض سعر مخصص',
    badge: 'سابق أعمال حي'
  },
  {
    id: 'alkemma-decor',
    titleEn: 'Al Kemma Decor — Luxury Interior Design & Contracting',
    titleAr: 'شركة القمة للديكور والمقاولات العامة والتشطيبات',
    taglineEn: 'Official corporate website for Al Kemma Decor: interior design, architectural contracting & luxury fitouts in Cairo & Gulf',
    taglineAr: 'الموقع الرسمي لشركة القمة للديكور والمقاولات: تصميم داخلي، تشطيبات فاخرة، ومعرض مشاريع هندسية متكامل',
    image: '/assets/images/alkemma_decor_showcase.jpg',
    category: 'web-development',
    categoryLabelEn: 'Corporate Website',
    categoryLabelAr: 'موقع شركة رسمي',
    metricsEn: 'Official Live Website · Project Showcase',
    metricsAr: 'سابقة أعمال حية · معرض أعمال وتشطيبات',
    tech: ['Corporate Architecture', 'Bilingual Engine', 'Fast Responsive UI', 'Interactive Portfolio', 'Direct WhatsApp Quotes'],
    featuresEn: [
      'Official corporate website crafted for Al Kemma Decor and general contracting',
      'High-definition architectural project galleries and interior design showcase',
      'Direct mobile quote requests and immediate consultation booking flow',
      'Responsive luxury aesthetics optimized for mobile, tablet, and desktop'
    ],
    featuresAr: [
      'الموقع الرسمي لشركة القمة للديكور والمقاولات العامة والتشطيبات الفاخرة',
      'معرض صور ومشاريع عالي الجودة يستعرض الفيلات والوحدات المنفذة',
      'حجز مقايسات واستشارات فورية عبر أزرار الواتساب التفاعلية',
      'تصميم راقٍ يعكس فخامة الهوية المعمارية للشركة مع سرعة تصفح فائقة'
    ],
    liveUrl: 'https://alkemma.codix.uk/',
    whatsappMsg: 'مرحباً فريق WebStack، شاهدت موقع شركة القمة للديكور https://alkemma.codix.uk/ وأرغب في تصميم موقع مماثل لشركتي',
    badge: 'موقع حي'
  },
  {
    id: 'egypt-builders',
    titleEn: 'Egypt Builders (EB) — General Contracting & Engineering',
    titleAr: 'شركة إيجيبت بيلدرز (Egypt Builders) - مقاولات عامة وبناء',
    taglineEn: 'Official corporate website for Egypt Builders: civil engineering, turn-key construction, architecture & infrastructure',
    taglineAr: 'الموقع الرسمي لشركة إيجيبت بيلدرز (EB): مقاولات عامة، إنشاءات متكاملة، استشارات هندسية وتشطيبات كبرى',
    image: '/assets/images/egypt_builders_showcase.jpg',
    category: 'web-development',
    categoryLabelEn: 'Corporate Website',
    categoryLabelAr: 'موقع شركة رسمي',
    metricsEn: 'Official Live Platform · Engineering Portfolio',
    metricsAr: 'سابقة أعمال حية · مشاريع إنشائية كبرى',
    tech: ['Corporate Architecture', 'High-Speed CDN', 'Bilingual UI', 'Project Galleries', 'Direct WhatsApp RFQ'],
    featuresEn: [
      'Official corporate web platform built by WebStack for Egypt Builders (EB)',
      'High-definition architectural project portfolios across commercial & residential construction',
      'Direct mobile RFQ and tender quotation workflows for enterprise clients',
      'Bilingual Arabic/English presentation optimized for corporate credibility'
    ],
    featuresAr: [
      'الموقع الرسمي لشركة إيجيبت بيلدرز للإنشاءات والمقاولات العامة صمم بواسطة WebStack',
      'معرض هندسي متكامل للمشاريع الإنشائية والتجارية والسكنية وأعمال البنية التحتية',
      'طلب عروض أسعار ومقايسات مباشرة عبر أزرار التواصل التفاعلية والواتساب',
      'واجهة رسمية راقية متجاوبة بالكامل لتعزيز المصداقية لدى العملاء والشركات'
    ],
    liveUrl: 'https://egypt-builders.codix.uk/',
    whatsappMsg: 'مرحباً فريق WebStack، شاهدت موقع شركة إيجيبت بيلدرز (Egypt Builders) https://egypt-builders.codix.uk/ وأرغب في تنفيذ موقع رسمي لشركتي',
    badge: 'موقع حي'
  },
  {
    id: 'clean-almithalia',
    titleEn: 'Clean Al-Mithalia Corporate Website',
    titleAr: 'موقع كلين المثالية (شركة كلين المثاليين)',
    taglineEn: 'The official website for Clean Al-Mithalia - Cleaning, pest control & maintenance in Eastern Province, KSA. Crafted by WebStack.',
    taglineAr: 'الموقع الرسمي لشركة كلين المثالية - خدمات التنظيف ومكافحة الحشرات والعزل بالمنطقة الشرقية بالمملكة العربية السعودية. صمم بواسطة ويب ستاك.',
    image: '/assets/images/clean_almithalia_showcase.jpg',
    category: 'web-development',
    categoryLabelEn: 'Corporate Website',
    categoryLabelAr: 'موقع شركة تعريفي',
    metricsEn: 'Official Production Platform · Fast Mobile Booking',
    metricsAr: 'سابقة أعمال رسمية · حجز فوري ومباشر',
    tech: ['Bilingual Corporate Web', 'Local SEO Engine', 'Fast Mobile Flow', 'Direct WhatsApp Leads', 'Cloud Hosting + SSL'],
    featuresEn: [
      'Official website for Clean Al-Mithalia in Eastern Province, Saudi Arabia',
      'Comprehensive sections for cleaning, pest control, tank insulation, and plumbing',
      'Direct mobile WhatsApp quote and booking workflows converting visitors into paying clients',
      'High performance responsive design crafted with precision by WebStack'
    ],
    featuresAr: [
      'الموقع الرسمي لشركة كلين المثالية بالمنطقة الشرقية بالمملكة العربية السعودية',
      'أقسام شاملة لخدمات التنظيف، مكافحة الحشرات، عزل الخزانات، والصرف الصحي',
      'أزرار تواصل واتساب ذكية لتحويل زوار الموقع لطلبات تعاقد فورية',
      'تصميم سريع ومتجاوب بالكامل تم بناؤه وتطويره بواسطة ويب ستاك'
    ],
    liveUrl: 'https://clean-almithalia.salah-logistics.uk/',
    whatsappMsg: 'مرحباً فريق WebStack، شاهدت موقع شركة كلين المثالية وأرغب في تصميم موقع مماثل لشركتي',
    badge: 'منفذ لعميل'
  },
  {
    id: 'elsharkawy-farm',
    titleEn: 'Elsharkawy Farm Fresh Products',
    titleAr: 'مزرعة الشرقاوي (منتجات مزارع الشرقاوي)',
    taglineEn: 'Interactive storefront for dairy & farm-fresh products with hero video & WhatsApp ordering',
    taglineAr: 'متجر منتجات الألبان والمزارع (عربي/إنجليزي) مع فيديو رئيسي وإمكانية الطلب عبر واتساب',
    image: '/assets/images/elsharkawy_farm_showcase.jpg',
    category: 'ecommerce-demos',
    categoryLabelEn: 'Live Storefront',
    categoryLabelAr: 'متجر تفاعلي',
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
    liveUrl: 'http://elsharkawy-farm.salah-logistics.uk/',
    whatsappMsg: 'مرحباً فريق WebStack، شاهدت موقع مزرعة الشرقاوي وأرغب في متجر مماثل لمنتجاتي',
    badge: 'معاينة حية'
  },
  {
    id: 'handasiya-aluminum',
    titleEn: 'Al Handasiya Aluminum (Maadi, Cairo)',
    titleAr: 'الشركة الهندسية للألوميتال (عرب المعادي، القاهرة)',
    taglineEn: 'Production website for aluminum workshop: windows, doors, facades, kitchens & gallery',
    taglineAr: 'موقع إلكتروني باللغتين لورشة ألوميتال بالمعادي: شبابيك، أبواب، واجهات ومطابخ مع معرض مشاريع وتواصل واتساب',
    image: '/assets/images/handasiya_aluminum_showcase.jpg',
    category: 'web-development',
    categoryLabelEn: 'Production Website',
    categoryLabelAr: 'سابقة أعمال حية',
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
    liveUrl: 'http://handasiya-aluminum.salah-logistics.uk/',
    whatsappMsg: 'مرحباً فريق WebStack، شاهدت موقع الشركة الهندسية للألوميتال وأرغب في تصميم موقع مماثل لنشاطي',
    badge: 'ورشة معمارية'
  },
  {
    id: 'voltedge-perfumes',
    titleEn: 'Voltedge Perfumes — Luxury Fragrances & Oud Live Store Demo',
    titleAr: 'متجر العطور الملكية والبخور الفاخر (Voltedge Perfumes) - ديمو حي',
    taglineEn: 'Royal luxury fragrance boutique demo with fragrance pyramid and gift bundling',
    taglineAr: 'ديمو متجر ملكي فخم للعطور الشرقية والغربية والعود والبخور مع استعراض الهرم العطري وباقات الهدايا',
    image: '/assets/images/demo_perfumes_store.jpg',
    category: 'ecommerce-demos',
    categoryLabelEn: 'Live Store Demo',
    categoryLabelAr: 'ديمو متجر حي',
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
    liveUrl: 'https://mostafa-salah01.github.io/voltedge-perfumes/?fbclid#/home',
    whatsappMsg: 'مرحباً فريق WebStack، شاهدت ديمو متجر العطور (Voltedge Perfumes) وأرغب في برمجة متجر مماثل لنشاطي والحصول على عرض سعر مخصص',
    badge: 'ديمو عطور'
  },
  {
    id: 'voltedge-beauty',
    titleEn: 'Voltedge Beauty — Cosmetics & Skincare Live Store Demo',
    titleAr: 'متجر مستحضرات التجميل والعناية بالبشرة (Voltedge Beauty) - ديمو حي',
    taglineEn: 'Luxury cosmetics & skincare turnkey store with instant cart and mobile checkout',
    taglineAr: 'ديمو متجر إلكتروني فاخر لمستحضرات التجميل والعناية بالبشرة والمكياج مع سلة ذكية ودفع فوري',
    image: '/assets/images/demo_beauty_store.jpg',
    category: 'ecommerce-demos',
    categoryLabelEn: 'Live Store Demo',
    categoryLabelAr: 'ديمو متجر حي',
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
      'جاهزية تامة للربط مع بوابات الدفع الإلكترونية: مدى، فيزا، أبل باي، وتابي',
      'صفحات منتجات مفصلة تشمل المكونات وطريقة الاستخدام وتقييمات العملاء'
    ],
    liveUrl: 'https://mostafa-salah01.github.io/voltedge-beauty/?fbclid#/home',
    whatsappMsg: 'مرحباً فريق WebStack، شاهدت ديمو متجر التجميل (Voltedge Beauty) وأرغب في برمجة متجر مماثل لنشاطي والحصول على عرض سعر مخصص',
    badge: 'ديمو تجميل'
  },
  {
    id: 'voltedge-sports',
    titleEn: 'Voltedge Sports — Athletic Gear & Apparel Live Store Demo',
    titleAr: 'متجر الأزياء والمعدات الرياضية (Voltedge Sports) - ديمو حي',
    taglineEn: 'High-energy sportswear e-commerce store with dynamic sizing and stock sync',
    taglineAr: 'ديمو متجر رياضي عالي الحيوية للملابس الرياضية والأحذية ومعدات اللياقة مع محرك مقاسات ذكي',
    image: '/assets/images/demo_sports_store.jpg',
    category: 'ecommerce-demos',
    categoryLabelEn: 'Live Store Demo',
    categoryLabelAr: 'ديمو متجر حي',
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
    liveUrl: 'https://mostafa-salah01.github.io/voltedge-sports/?fbclid',
    whatsappMsg: 'مرحباً فريق WebStack، شاهدت ديمو متجر الرياضة (Voltedge Sports) وأرغب في برمجة متجر مماثل لنشاطي والحصول على عرض سعر مخصص',
    badge: 'ديمو رياضي'
  },
  {
    id: 'whatsapp-ai-employee',
    titleEn: 'Natural AI Sales & Support Employee for WhatsApp',
    titleAr: 'موظف ذكاء اصطناعي لواتساب (يرسل صور، ملفات، وكتالوجات)',
    taglineEn: 'Natural and friendly tone — dispatches PDF catalogs, product photos & closes deals with human escalation',
    taglineAr: 'ردود طبيعية وودودة، يرسل عروض الأسعار والكتالوجات والصور، مع إمكانية التحويل للموظف البشري عند الحاجة',
    image: '/assets/images/ai_whatsapp_agent_1789851518713.jpg',
    category: 'ai-employee',
    categoryLabelEn: 'AI Conversational Agent',
    categoryLabelAr: 'موظف ذكاء اصطناعي',
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
    pageUrl: 'whatsapp-ai-employee',
    whatsappMsg: 'مرحباً فريق WebStack، مهتم ببرمجة موظف ذكاء اصطناعي لواتساب والحصول على عرض سعر مخصص',
    badge: 'أتمتة مبيعات'
  },
  {
    id: 'telegram-messenger-ai-employees',
    titleEn: 'Omnichannel AI Employees for Telegram & Facebook Messenger',
    titleAr: 'موظفو الذكاء الاصطناعي لتلجرام وفيسبوك ماسنجر',
    taglineEn: '24/7 Automated Lead Qualification, Multimedia File Sending & Customer Support',
    taglineAr: 'موظف مبيعات وخدمة عملاء ذكي على تلجرام وماسنجر يرسل الصور والملفات ويرد فوراً',
    image: '/assets/images/omnichannel_ai_hub_1789851545960.jpg',
    category: 'ai-employee',
    categoryLabelEn: 'Omnichannel AI',
    categoryLabelAr: 'ذكاء متعدد القنوات',
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
    pageUrl: 'omnichannel-ai-agent',
    whatsappMsg: 'مرحباً فريق WebStack، مهتم ببرمجة موظف ذكاء اصطناعي لتلجرام وفيسبوك ماسنجر',
    badge: 'متعدد القنوات'
  },
  {
    id: 'smart-shipping-courier-system',
    titleEn: 'Smart Shipping & Logistics Management Platform',
    titleAr: 'سيستم الشحن الذكي وإدارة المناديب والبوالص واللوجستيات',
    taglineEn: 'Automated Courier Waybills, Live Driver Tracking & Cash-on-Delivery Sync',
    taglineAr: 'إصدار بوالص الشحن آلياً، تتبع الشحنات والمناديب لحظياً، وتسوية التحصيلات والـ COD',
    image: '/assets/images/logistics_sync_hub_1789849655051.jpg',
    category: 'shipping',
    categoryLabelEn: 'Logistics Platform',
    categoryLabelAr: 'منظومة لوجستية',
    metricsEn: '100% Waybill Accuracy · High Daily Volume',
    metricsAr: 'دقة 100% في البوالص والتسليم · حجم عمليات يومي ضخم',
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
    pageUrl: 'smart-shipping-system',
    whatsappMsg: 'مرحباً فريق WebStack، أود الاستفسار عن سيستم الشحن واللوجستيات وإدارة المناديب والبوالص',
    badge: 'إدارة شحنات'
  },
  {
    id: 'idea-to-apps-supermarket-pharmacy',
    titleEn: 'Custom Software & Mobile App Launch (Android & iOS)',
    titleAr: 'تحويل فكرتك لنظام رقمي وتطبيقات أندرويد وآيفون',
    taglineEn: 'Supermarket POS, Pharmacy ERP, Custom Web Platforms published to Google Play & App Store',
    taglineAr: 'سيستم سوبرماركت، سيستم صيدلية، متاجر إلكترونية أو أي فكرة مبتكرة نبرمجها وننشرها كتطبيقات موبايل',
    image: '/assets/images/mobile_erp_apps_1789851533593.jpg',
    category: 'mobile-apps',
    categoryLabelEn: 'Mobile & ERP Apps',
    categoryLabelAr: 'تطبيقات وأنظمة ERP',
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
    pageUrl: 'mobile-retail-apps',
    whatsappMsg: 'مرحباً فريق WebStack، لدي فكرة مشروع وأريد تحويلها لنظام رقمي وتطبيقات أندرويد وآيفون',
    badge: 'تطبيقات موبايل'
  },
  {
    id: 'n8n-enterprise-orchestrator',
    titleEn: 'Enterprise n8n Workflow Automation Engine',
    titleAr: 'محرك أتمتة مسارات العمل المؤسسية عبر n8n',
    taglineEn: 'Distributed Event-Driven Pipelines, Error Retries & Multi-System Synchronization',
    taglineAr: 'بناء وتنسيق مسارات البيانات المعقدة، المعالجة التلقائية للأخطاء والربط السحابي',
    image: '/assets/images/n8n_workflow_canvas_1789849612939.jpg',
    category: 'automation',
    categoryLabelEn: 'Workflow Automation',
    categoryLabelAr: 'أتمتة الأعمال',
    metricsEn: 'High Execution Reliability · Enterprise Grade',
    metricsAr: 'موثوقية فائقة · أتمتة متقدمة للأعمال',
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
    pageUrl: 'n8n-automation',
    whatsappMsg: 'مرحباً فريق WebStack، مهتم بخدمات أتمتة مسارات العمل والربط المؤسسي عبر n8n',
    badge: 'أتمتة n8n'
  },
  {
    id: 'api-telemetry-dashboard',
    titleEn: 'Real-Time REST API & Database Architecture Hub',
    titleAr: 'هندسة نظم الـ Backend وواجهات REST وتحليلات قواعد البيانات',
    taglineEn: 'End-to-End Latency Tracking, Connection Pool Health & Automated Alerting',
    taglineAr: 'تتبع زمن استجابة الـ Endpoints، مراقبة اتصالات قواعد البيانات والتنبيه الفوري',
    image: '/assets/images/api_telemetry_hub_1789849643910.jpg',
    category: 'backend',
    categoryLabelEn: 'Backend Architecture',
    categoryLabelAr: 'نظم الباك إند',
    metricsEn: 'Real-time Telemetry · Zero Downtime',
    metricsAr: 'مراقبة حية لحظية · أقصى استقرار للسيرفرات',
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
    pageUrl: 'backend-api-architecture',
    whatsappMsg: 'مرحباً فريق WebStack، مهتم بتطوير وفحص أداء الـ Backend وواجهات الـ REST API',
    badge: 'بنية سحابية'
  }
];

export interface ServiceItem {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  shortDescEn: string;
  shortDescAr: string;
  fullDescEn: string;
  fullDescAr: string;
  icon: string;
  image: string;
  liveUrl?: string;
  taglineEn: string;
  taglineAr: string;
  keyPointsEn: string[];
  keyPointsAr: string[];
  featuresEn: string[];
  featuresAr: string[];
  whatsappServiceKey: string;
  pageTab: string;
  badgeEn?: string;
  badgeAr?: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'custom-ecommerce',
    slug: 'ecommerce-store',
    pageTab: 'ecommerce-store',
    titleEn: 'Custom E-Commerce Store (PHP & MySQL Architecture)',
    titleAr: 'إنشاء وبرمجة المتاجر الإلكترونية المخصصة (PHP & MySQL)',
    shortDescEn: '100% Handcrafted from scratch with clean PHP & MySQL. Zero templates, all payment gateways, and 0% sales commission.',
    shortDescAr: 'برمجة مخصصة 100% من الصفر بكود PHP وقواعد MySQL بدون قوالب جاهزة، ربط جميع بوابات الدفع، و0% عمولات على مبيعاتك.',
    fullDescEn: 'We engineer your online store from the ground up tailored to your business model, without ready-made templates or restricted platforms. Includes dedicated consultation sessions walking step-by-step with you to analyze your workflow, seamless payment gateways, full operational control, and full year of hosting, domain, and technical support.',
    fullDescAr: 'نصمم ونبرمج متجرك الإلكتروني بالكامل من الصفر كوداً مخصصاً لاحتياجات تجارتك، بدون قوالب جاهزة أو قيود المنصات المؤجرة. نوفر لك جلسات استشارية متخصصة بنمشي فيها معك خطوة بخطوة لحد ما نحلل ونفهم طبيعة خدمتك وتجارتك ماشية إزاي، مع ربط جميع بوابات الدفع، وإدارة كل العمليات داخل متجرك، مع دومين واستضافة سحابية ودعم فني وصيانة مستمرة.',
    icon: 'ShoppingBag',
    image: '/assets/images/larose_beauty_showcase.jpg',
    liveUrl: 'https://larose.salah-logistics.uk/',
    taglineEn: 'Every merchant has their unique workflow — built with zero templates',
    taglineAr: 'كل تاجر له نظامه الخاص — مبني بكود نظيف وبدون قوالب معلبة',
    keyPointsEn: [
      '100% Custom code (PHP 8+ & MySQL)',
      '0% Commissions on your sales',
      'All Payment Gateways (Mada, Visa, ApplePay, Tabby, Tamara, InstaPay, COD)',
      'Custom inventory, PDF waybills & invoices',
      'Domain & fast SSD cloud hosting included'
    ],
    keyPointsAr: [
      'برمجة خاصة من الصفر 100% (PHP 8+ وقواعد MySQL)',
      '0% عمولات على مبيعاتك وأرباحك',
      'ربط جميع بوابات الدفع (مدى، فيزا، أبل باي، تابي، تمارا، إنستاباي، والدفع عند الاستلام)',
      'إدارة كاملة للمخزون، وبوالص وفواتير PDF',
      'دومين رسمي واستضافة سحابية فائقة السرعة مشمولان'
    ],
    featuresEn: [
      'Step-by-step dedicated technical consultations before writing a single line of code',
      'Direct order and inventory management with real-time stock alert thresholds',
      'Automated printable PDF invoices & courier shipping waybills',
      'Customer database, coupon codes, and promotional marketing engine',
      'Ongoing technical support contract for maintenance and server stability'
    ],
    featuresAr: [
      'جلسات استشارية تفصيلية خطوة بخطوة لدراسة تجارتك قبل كتابة أول سطر كود',
      'إدارة فورية للطلبات والمخزون مع تنبيهات عند اقتراب نفاد الكميات',
      'إصدار فواتير ضريبية وبوالص شحن PDF جاهزة للطباعة آلياً',
      'قاعدة بيانات العملاء، محرك كوبونات الخصم، والعروض الترويجية',
      'عقد دعم فني مستمر ومتابعة يومية لأداء السيرفرات والأمان'
    ],
    whatsappServiceKey: 'custom-ecommerce-store',
    badgeEn: 'Core Solution',
    badgeAr: 'الحل الأقوى'
  },
  {
    id: 'corporate-websites',
    slug: 'corporate-website',
    pageTab: 'corporate-website',
    titleEn: 'Bilingual Corporate Website Package',
    titleAr: 'تصميم مواقع الشركات التعريفية (ثنائية اللغة)',
    shortDescEn: 'Enterprise bilingual (Arabic & English included) corporate websites with ultra-fast cloud hosting, custom domain & SSL.',
    shortDescAr: 'واجهة رقمية راقية تعكس قوة ومصداقية شركتك باللغتين العربية والإنجليزية معاً، شاملة الاستضافة والدومين وشهادة الأمان SSL.',
    fullDescEn: 'A high-impact, premium corporate web presence designed to establish undeniable enterprise authority and convert decision-makers. Includes full bilingual support out of the box, lightning-fast SSD cloud hosting, official corporate domain, SSL certificate, and direct WhatsApp integration.',
    fullDescAr: 'موقع تعريفي احترافي فاخر مصمم ليعكس ثقل شركتك ويبني ثقة فورية لدى عملائك وشركائك. يشمل دعماً كاملاً للغتين العربية والإنجليزية معاً، استضافة سحابية فائقة السرعة، اسم نطاق رسمي، شهادة أمان SSL، وربطاً مباشراً مع محادثات واتساب.',
    icon: 'Globe',
    image: '/assets/images/corporate_web_package_1790064802558.jpg',
    liveUrl: 'https://clean-almithalia.salah-logistics.uk/',
    taglineEn: 'Bilingual AR/EN included · Fast Cloud Hosting · Official Domain',
    taglineAr: 'اللغتان معاً مشمولتان · استضافة سريعة · اسم نطاق رسمي',
    keyPointsEn: [
      'Full bilingual AR & EN support included',
      'Official custom domain name (.com, .net, etc.)',
      'High-speed SSD cloud hosting with free SSL',
      '100% Responsive for mobile, tablet, and PC',
      'Direct WhatsApp conversion lead buttons'
    ],
    keyPointsAr: [
      'دعم كامل للغتين (العربية والإنجليزية معاً مشمولتان)',
      'اسم نطاق رسمي خاص بشركتك (.com أو .net)',
      'استضافة سحابية فائقة السرعة SSD مع شهادة SSL مجانية',
      'تصميم متجاوب 100% مع كافة الشاشات والموبايل',
      'أزرار تواصل واتساب تفاعلية ذكية لتحويل الزوار لعملاء'
    ],
    featuresEn: [
      'Comprehensive company profile sections: About, Services, Leadership, and Portfolio',
      'Interactive contact forms with instant WhatsApp lead notifications',
      'Optimized Core Web Vitals with 90+ performance scores on Google PageSpeed',
      'Custom bilingual typography (Cairo for Arabic, Plus Jakarta Sans for English)',
      'Ongoing technical maintenance and continuous security updates'
    ],
    featuresAr: [
      'أقسام شاملة ومخصصة: عن الشركة، الخدمات، سابقة الأعمال، وفريق العمل',
      'نماذج تواصل تفاعلية مع إرسال فوري لبيانات العميل على واتساب',
      'تهيئة محركات البحث (SEO) وسرعة فائقة تتخطى 90 نقطة على Google PageSpeed',
      'خطوط عربية وأجنبية راقية ومتناسقة مع الهوية البصرية لشركتك',
      'متابعة تقنية وتحديثات أمنية دورية لضمان سلامة موقعك'
    ],
    whatsappServiceKey: 'corporate-website',
    badgeEn: 'Best Seller',
    badgeAr: 'الأكثر طلباً'
  },
  {
    id: 'ai-employees',
    slug: 'whatsapp-ai-employee',
    pageTab: 'whatsapp-ai-employee',
    titleEn: 'Natural WhatsApp & Telegram AI Employees',
    titleAr: 'موظف الذكاء الاصطناعي لواتساب وتلجرام (يرسل ملفات وصور)',
    shortDescEn: '24/7 Human-like conversational agents that dispatch PDF catalogs, handle inquiries, and escalate politely to human staff.',
    shortDescAr: 'موظف مبيعات ودعم فني ذكي يرد بنبرة طبيعية وودودة على مدار الساعة، يرسل الكتالوجات والصور وعروض الأسعار مع تحويل للبشر.',
    fullDescEn: 'Deploy a tireless, courteous AI employee trained on your exact company knowledge base. Communicates naturally in Egyptian or Gulf dialect, dispatches PDF brochures, quotations and product photos directly in chat, and escalates complex inquiries gracefully to your human sales reps.',
    fullDescAr: 'وظف في شركتك مساعداً ذكياً مدرباً على كافة منتجاتك وخدماتك يعمل 24 ساعة بدون انقطاع. يرد بنبرة عفوية ومحترمة تفهم اللهجات المختلفة، يرسل ملفات الـ PDF وصور المنتجات وروابط الحجز داخل الشات، مع إمكانية تحويل العميل للموظف البشري في أي لحظة.',
    icon: 'Bot',
    image: '/assets/images/ai_whatsapp_agent_1789851518713.jpg',
    taglineEn: 'Friendly 24/7 responses · Instant file dispatch · Smooth human escalation',
    taglineAr: 'ردود طبيعية 24/7 · إرسال فوري للملفات والكتالوجات · تحويل للموظف البشري',
    keyPointsEn: [
      'Natural conversational tone (Arabic & English)',
      'Dispatches PDF catalogs, price lists & images in chat',
      'Instant polite handoff to human representatives',
      'Direct sync with Google Sheets, CRM & databases',
      '24/7 Uninterrupted availability'
    ],
    keyPointsAr: [
      'ردود طبيعية وودودة تفهم سياق العميل ولهجته',
      'إرسال فوري لكتالوجات الـ PDF، صور المنتجات، وعروض الأسعار',
      'تحويل سلس ومهذب للموظف البشري عند الحاجة أو الصفقات الكبرى',
      'مزامنة لحظية للبيانات والطلبات مع Google Sheets والـ CRM',
      'جاهزية وتواجد دائم على مدار الساعة دون تأخير'
    ],
    featuresEn: [
      'Full WhatsApp Business Cloud API compliance with verified sender credentials',
      'Dynamic product recommendation engine based on customer preferences',
      'Multi-channel expansion to Telegram and Facebook Messenger',
      'Smart lead qualification and automated appointment booking',
      'Weekly conversation summary reports with lead insights'
    ],
    featuresAr: [
      'ربط رسمي مع WhatsApp Cloud API المعتمد من Meta',
      'اقتراح المنتجات والخدمات المناسبة بناءً على رغبة العميل بدقة',
      'إمكانية التوسع على تلجرام وفيسبوك ماسنجر بنفس القاعدة المعرفية',
      'فرز وتصنيف العملاء الجادين وحجز المواعيد والاستشارات تلقائياً',
      'تقارير أسبوعية تفصيلية عن المحادثات والطلبات التي تمت'
    ],
    whatsappServiceKey: 'whatsapp-ai-employee',
    badgeEn: 'Smart Automation',
    badgeAr: 'ذكاء الأعمال'
  },
  {
    id: 'smart-shipping',
    slug: 'smart-shipping-system',
    pageTab: 'smart-shipping-system',
    titleEn: 'Smart Shipping & Courier Management Platform',
    titleAr: 'سيستم الشحن واللوجستيات وإدارة المناديب والبوالص',
    shortDescEn: 'Automated waybill generation, live courier tracking, barcode scanning, and Cash-on-Delivery (COD) financial reconciliation.',
    shortDescAr: 'إصدار بوالص الشحن PDF مع باركود وQR، تتبع مناديب التوصيل، وتسوية مبالغ الدفع عند الاستلام COD بدقة محاسبية متناهية.',
    fullDescEn: 'A complete end-to-end platform engineered for e-commerce brands, courier companies, and fulfillment centers. Automates waybill creation, driver dispatch, live tracking via WhatsApp & SMS, and exact cash reconciliation.',
    fullDescAr: 'منظومة متكاملة لشركات الشحن ومتاجر التجارة الإلكترونية ومراكز التوزيع. تصدر بوالص الشحن آلياً، تدير تحركات المناديب، توفر بوابات تتبع للعملاء، وتضبط تسويات المبالغ المالية المحصلة عند الاستلام.',
    icon: 'Truck',
    image: '/assets/images/logistics_sync_hub_1789849655051.jpg',
    taglineEn: 'Printable waybills · Courier tracking · COD financial ledger',
    taglineAr: 'بوالص شحن PDF · تتبع المناديب · تسوية تحصيل COD',
    keyPointsEn: [
      'Printable PDF waybills with barcodes & QR codes',
      'Driver mobile app for proof-of-delivery & signatures',
      'Live tracking page for end-customers',
      'COD collection ledger & daily bank payouts',
      'Integration with external courier APIs'
    ],
    keyPointsAr: [
      'طباعة فورية لبوالص الشحن مع باركودات متوافقة قياسياً',
      'شاشات للمناديب لتسجيل إثبات التسليم والتوقيع باليد',
      'صفحة تتبع حية للعميل مع تنبيهات واتساب بحالة الشحنة',
      'دفتر حسابات مالي دقيق لمطابقة تحصيلات الدفع عند الاستلام',
      'إمكانية الربط مع شركات الشحن المحلية والدولية'
    ],
    featuresEn: [
      'Batch waybill generation for hundreds of orders with one click',
      'Delivery zones and custom pricing matrix per city/governorate',
      'Failed delivery and return-to-origin (RTO) workflow management',
      'Real-time courier performance dashboard with completion rates',
      'Exportable accounting ledgers in Excel and PDF formats'
    ],
    featuresAr: [
      'طباعة جماعية لمئات البوالص بنقرة واحدة لتسريع التجهيز',
      'تحديد مناطق التوصيل وتكلفة الشحن حسب كل محافظة ومدينة',
      'إدارة المرتجعات والشحنات الملغاة والراجع للمخزن بسلاسة',
      'لوحة قياس أداء المناديب ونسب التسليم الناجحة لحظياً',
      'تصدير كشوف الحسابات المالية لصيغ Excel وPDF'
    ],
    whatsappServiceKey: 'smart-shipping-system',
    badgeEn: 'Operations Hub',
    badgeAr: 'إدارة العمليات'
  },
  {
    id: 'mobile-pos-apps',
    slug: 'mobile-retail-apps',
    pageTab: 'mobile-retail-apps',
    titleEn: 'Custom Mobile Apps (Android & iOS) & Retail POS',
    titleAr: 'تطبيقات الموبايل (Android & iOS) وأنظمة الكاشير POS',
    shortDescEn: 'Turnkey mobile applications for supermarkets, pharmacies, and brands published directly to Google Play and Apple App Store.',
    shortDescAr: 'تحويل فكرتك لتطبيقات موبايل ونظم نقاط بيع POS للسوبرماركت والصيدليات والمتاجر مع نشرها على App Store وGoogle Play.',
    fullDescEn: 'From initial prototype to official app store approval, we build high-performance native-feel applications and integrated point-of-sale systems with receipt printers, barcode readers, and offline capabilities.',
    fullDescAr: 'من الفكرة حتى النشر والاعتماد على متاجر التطبيقات، نبرمج تطبيقات موبايل سريعة وأنظمة نقاط بيع متكاملة متصلة بطابعات الفواتير وقارئات الباركود وأجهزة الكاشير مع دعم العمل بدون إنترنت.',
    icon: 'Smartphone',
    image: '/assets/images/mobile_erp_apps_1789851533593.jpg',
    taglineEn: 'Google Play & App Store approval · Cashier POS · Inventory Batches',
    taglineAr: 'اعتماد المتاجر الرسمية · كاشير ونقاط بيع · تتبع الصلاحيات والتشغيلات',
    keyPointsEn: [
      'Android & iOS publishing guaranteed',
      'Supermarket POS & barcode cashier systems',
      'Pharmacy ERP with expiry batch tracking',
      'Hardware integration (thermal printers, scales, scanners)',
      'Cross-platform velocity with clean architecture'
    ],
    keyPointsAr: [
      'ضمان اعتماد التطبيقات على Google Play وApp Store',
      'أنظمة كاشير ونقاط بيع ذكية مع قراءة الباركود',
      'إدارة الصيدليات مع تتبع تواريخ الصلاحية وأرقام التشغيل',
      'ربط طابعات الفواتير الحرارية والموازين الإلكترونية',
      'أداء سريع وتصميم عصري يسهل استخدامه من قبل الموظفين'
    ],
    featuresEn: [
      'Offline-first architecture keeping sales running during internet outages',
      'Multi-branch inventory sync with real-time transfer orders',
      'Comprehensive cashier shift closing and cash drawer audits',
      'Customer loyalty points, discount codes, and digital receipts',
      'Role-based permissions for cashiers, managers, and admins'
    ],
    featuresAr: [
      'نظام أوفلاين ذكي يضمن استمرار البيع حتى في حال انقطاع الإنترنت',
      'مزامنة المخزون بين الفروع المتعددة وأوامر التحويل الداخلية',
      'تقفيل ورديات الكاشير ومطابقة درج النقدية بالمليم',
      'برامج ولاء العملاء، نقاط المكافآت، والفواتير الرقمية',
      'صلاحيات محددة بدقة للكاشير، المشرف، ومدير النظام'
    ],
    whatsappServiceKey: 'custom-mobile-app',
    badgeEn: 'Mobile & POS',
    badgeAr: 'تطبيقات ونقاط بيع'
  },
  {
    id: 'n8n-automation',
    slug: 'n8n-automation',
    pageTab: 'n8n-automation',
    titleEn: 'Enterprise n8n Workflow Automation',
    titleAr: 'أتمتة الأعمال وربط الأنظمة السحابية عبر n8n',
    shortDescEn: 'Eliminate repetitive manual tasks. Connect your ERP, CRM, WhatsApp, Google Sheets, and payment gateways into automated workflows.',
    shortDescAr: 'تخلص من المهام اليدوية المكررة واربط أنظمتك، قواعد بياناتك، رسائل الواتساب، وبوابات الدفع في مسارات عمل آلية وموثوقة.',
    fullDescEn: 'Design, deploy, and maintain self-hosted enterprise automation pipelines using n8n and modern webhooks. Handle thousands of events daily with guaranteed retries and continuous audit logging.',
    fullDescAr: 'تصميم وتنفيذ مسارات أتمتة مؤسسية ذاتية الاستضافة عبر n8n. معالجة آلاف الأحداث والطلبات يومياً مع إعادة المحاولة التلقائية عند حدوث أي خطأ، ومتابعة الأداء من خلال تقارير لحظية.',
    icon: 'Cpu',
    image: '/assets/images/n8n_workflow_canvas_1789849612939.jpg',
    taglineEn: 'Event-driven pipelines · Error resilience · Multi-system synchronization',
    taglineAr: 'مسارات بيانات فورية · معالجة الأخطاء تلقائياً · ربط شامل للأنظمة',
    keyPointsEn: [
      'Self-hosted privacy-first automation',
      'Automatic error recovery queues',
      'HMAC-SHA256 secure webhook triggers',
      'Zero monthly per-operation subscription fees',
      'Sync CRM, ERP, WhatsApp & financial tools'
    ],
    keyPointsAr: [
      'استضافة خاصة تضمن سرية وأمان بيانات شركتك',
      'طوابير معالجة تلقائية للأخطاء وإعادة المحاولة',
      'تأمين مشفر لكافة نقاط استقبال البيانات (Webhooks)',
      'توفير مئات الدولارات من اشتراكات الأدوات السحابية الشهرية',
      'ربط شامل بين أنظمة المبيعات والواتساب والمالية'
    ],
    featuresEn: [
      'Sub-workflow modular design isolating business logic from external systems',
      'Automatic failover alerting sent immediately to private Telegram channels',
      'Custom JavaScript/TypeScript node scripting for complex transformations',
      'High-throughput Docker deployment with persistent Redis queues',
      'Full documentation and handover diagrams for your technical team'
    ],
    featuresAr: [
      'هندسة معيارية للمسارات تعزل منطق العمل عن أعطال الخدمات الخارجية',
      'إرسال إشعارات فورية على قنوات تيليجرام الخاصة عند حدوث أي طارئ',
      'كتابة دوال جافا سكريبت مخصصة للتحويلات والمعادلات الحسابية المعقدة',
      'بنية Docker سريعة ومحمية مع طوابير Redis لضمان عدم ضياع أي أمر',
      'توثيق كامل ومخططات بيانية توضح مسارات تدفق البيانات'
    ],
    whatsappServiceKey: 'business-automation-n8n',
    badgeEn: 'Automation',
    badgeAr: 'أتمتة ذكية'
  },
  {
    id: 'backend-architecture',
    slug: 'backend-api-architecture',
    pageTab: 'backend-api-architecture',
    titleEn: 'Backend Architecture & Cloud API Engineering',
    titleAr: 'هندسة نظم الـ Backend وواجهات برمجة التطبيقات APIs',
    shortDescEn: 'Scalable RESTful & GraphQL APIs, secure relational databases, Redis caching layers, and high-concurrency cloud architecture.',
    shortDescAr: 'بناء خوادم سحابية فائقة السرعة، واجهات برمجة REST، قواعد بيانات علائقية محكمة، وتخزين مؤقت عالي الأداء مع أقصى درجات الأمان.',
    fullDescEn: 'Architect robust backends designed to withstand heavy traffic spikes. Built using clean patterns, optimal relational schemas (PostgreSQL / MySQL), Redis caching, and real-time monitoring.',
    fullDescAr: 'هندسة نظم خلفية صلبة قادرة على استيعاب آلاف الزوار والطلبات المتزامنة بدون بطء أو انهيار، باستخدام أفضل الممارسات البرمجية وقواعد البيانات السريعة والتخزين المؤقت في Redis.',
    icon: 'Database',
    image: '/assets/images/api_telemetry_hub_1789849643910.jpg',
    taglineEn: 'Sub-100ms response times · Relational integrity · Zero downtime',
    taglineAr: 'استجابة فائقة السرعة · أمان البيانات · استقرار السيرفرات',
    keyPointsEn: [
      'Clean TypeScript & Node.js / Python / PHP',
      'PostgreSQL & MySQL performance tuning',
      'Redis cache & pub/sub messaging layers',
      'Microservice & monolithic modular patterns',
      'Telemetry, rate limiting & DDoS protection'
    ],
    keyPointsAr: [
      'كود نظيف بلغات TypeScript / Python / PHP الحديثة',
      'تحسين استعلامات قواعد البيانات وتسريع الفهارس (Indexes)',
      'طبقات تخزين مؤقت Redis لتسريع استجابة النظام أضعافاً',
      'هندسة معيارية تسهل التوسع المستقبلي وإضافة ميزات جديدة',
      'حماية الخوادم من الهجمات وتحديد معدل الطلبات (Rate Limiting)'
    ],
    featuresEn: [
      'P95/P99 latency tracking per endpoint with automated slow-query threshold alerts',
      'Connection pool starvation diagnostics with automated kill-switches',
      'Webhook delivery success tracker with automatic payload re-dispatch',
      'Database encryption at rest and in transit with TLS 1.3 enforcement',
      'Automated daily encrypted database backups stored in multi-region buckets'
    ],
    featuresAr: [
      'تتبع دقيق لأزمنة الاستجابة P95/P99 وتنبيه فوري عند أي بطء غير طبيعي',
      'مراقبة اتصالات قواعد البيانات وحمايتها من الاختناق عند ضغط الزوار',
      'تتبع تسليم الـ Webhooks وإعادة إرسال العمليات الفاشلة تلقائياً',
      'تشفير كامل لقواعد البيانات أثناء التخزين والنقل عبر بروتوكول TLS 1.3',
      'نسخ احتياطية يومية مشفرة تحفظ في خوادم سحابية آمنة'
    ],
    whatsappServiceKey: 'backend-api-solutions',
    badgeEn: 'Cloud Infra',
    badgeAr: 'بنية تحتية'
  }
];

export const FAQ_ITEMS = [
  {
    qAr: 'كيف يتم تحديد تكلفة وسعر المتجر أو الموقع أو النظام؟',
    qEn: 'How is the cost and pricing of a custom store or system determined?',
    aAr: 'شعارنا في WebStack هو: "كل عميل له نظامه الخاص". لأننا نبني كل مشروع مخصصاً من الصفر 100% بكود نظيف بلغة PHP وقواعد بيانات MySQL بدون قوالب جاهزة أو حلول معلبة، فإن التكلفة تتحدد بدقة بناءً على حجم الميزات، بوابات الدفع المطلوبة، وطبيعة تدفق عمل نشاطك. تفضل بالتواصل معنا عبر واتساب (+201107787049) لمناقشة مشروعك والحصول على استشارة مجانية وعرض سعر مخصص ودقيق يناسب ميزانيتك.',
    qEnShort: 'Customized based on your exact business needs with zero template fees.'
  },
  {
    qAr: 'هل أحصل على ملكية كاملة لكود المتجر والموقع؟',
    qEn: 'Do I get 100% full ownership of the source code?',
    aAr: 'نعم، بكل تأكيد! أنت تمتلك الكود المصدري وقاعدة البيانات واسم النطاق (الدومين) بنسبة 100%. على عكس منصات التأجير السحابية مثل سلة وزد وShopify التي تلزمك باشتراكات مستمرة وتقتطع عمولات من مبيعاتك، مع WebStack المتجر ملكك بالكامل ولا تدفع أي نسبة عمولة على مبيعاتك إطلاقاً (0% عمولات).',
    qEnShort: 'Yes, 100% complete code & database ownership with zero platform rent.'
  },
  {
    qAr: 'ما بوابات الدفع التي يمكن ربطها في المتجر المخصص؟',
    qEn: 'What payment gateways can be integrated into custom stores?',
    aAr: 'نربط جميع بوابات الدفع المحلية والعالمية، بما في ذلك: مدى (Mada)، فيزا وماستركارد، أبل باي (Apple Pay)، تابي (Tabby) وتمارا (Tamara) لتقسيط المشتريات، إنستاباي (InstaPay)، فودافون كاش والمحافظ الإلكترونية، باي بال (PayPal)، بالإضافة إلى نظام الدفع عند الاستلام (COD) مع تسوية الفواتير.',
    qEnShort: 'Mada, Visa, Mastercard, Apple Pay, Tabby, Tamara, InstaPay, PayPal & COD.'
  },
  {
    qAr: 'ما الذي تتضمنه باقة تصميم المواقع التعريفية للشركات؟',
    qEn: 'What is included in the Corporate Website Package?',
    aAr: 'تتضمن الباقة دعماً كاملاً للغتين (العربية والإنجليزية معاً دون أي تكلفة إضافية)، اسم نطاق رسمي (.com أو .net)، استضافة سحابية فائقة السرعة SSD، شهادة أمان SSL، تصميم متجاوب فائق السرعة مع الموبايل والكمبيوتر، ربط مباشر بأزرار الواتساب لتحويل الزوار لعملاء، مع عقد دعم فني ومتابعة مستمرة.',
    qEnShort: 'Bilingual AR/EN included, domain, high-speed SSD hosting, SSL & support.'
  },
  {
    qAr: 'كيف يعمل موظف الذكاء الاصطناعي لواتساب وتلجرام؟',
    qEn: 'How does the WhatsApp & Telegram AI Employee work?',
    aAr: 'يتم تدريب الموظف الذكي على قاعدة معرفية كاملة بمنتجاتك وخدماتك وسياسات نشاطك. يتحدث بلغة طبيعية وودودة (لهجة مصرية أو خليجية أو لغة عربية فصحى وإنجليزية)، ويرسل صور المنتجات وكتالوجات وعروض أسعار PDF داخل المحادثة فوراً، مع إمكانية تحويل المحادثة للموظف البشري في أي وقت بسلاسة تامة.',
    qEnShort: 'Natural 24/7 chat, instant PDF/photo dispatch, and polite human escalation.'
  },
  {
    qAr: 'ما هي مدة تنفيذ المشروع وتسليمه؟',
    qEn: 'What is the estimated delivery timeframe?',
    aAr: 'تتراوح مدة التنفيذ عادة بين 5 إلى 14 يوماً عمل حسب حجم المشروع وتعقيد المميزات المطلوبة، مع عرض مسودة أولية ونموذج تجريبي تفاعلي للمعاينة وإجراء أي تعديلات قبل الإطلاق النهائي.',
    qEnShort: 'Typically between 5 to 14 business days depending on feature scope.'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    titleAr: 'جلسة استشارية وتحليل متطلبات نشاطك',
    titleEn: 'Consultation & Workflow Blueprint',
    descAr: 'بنمشي معاك خطوة بخطوة في جلسة مفصلة لفهم طبيعة تجارتك، طريقة إدارة طلباتك، وميزات نظامك قبل كتابة أول سطر كود.',
    descEn: 'We walk step-by-step with you to deeply analyze your commerce flow, customer journey, and specific functional needs.'
  },
  {
    step: '02',
    titleAr: 'برمجة وتصميم مخصص من الصفر 100%',
    titleEn: '100% Bespoke Code Architecture',
    descAr: 'نبني الكود المصدري بلغة PHP وقواعد بيانات MySQL بدون قوالب جاهزة بطيئة، مع تصميم راقٍ وسريع ومتوافق تماماً مع الموبايل.',
    descEn: 'Engineered from the ground up using clean PHP and MySQL without template bloat, optimized for raw speed and security.'
  },
  {
    step: '03',
    titleAr: 'ربط بوابات الدفع والشحن والعمليات',
    titleEn: 'Payment & Logistics Integrations',
    descAr: 'تفعيل مدى، فيزا، أبل باي، تابي، تمارا، وبوالص الشحن والفواتير PDF واختبار تجربة الشراء خطوة بخطوة والتأكد من أمان المعاملات.',
    descEn: 'Seamless connection of Mada, Visa, Apple Pay, BNPL, automated waybills and end-to-end sandbox testing.'
  },
  {
    step: '04',
    titleAr: 'الإطلاق السحابي وعقد الدعم المستمر',
    titleEn: 'Cloud Launch & Dedicated Support',
    descAr: 'ربط الدومين الرسمي، تشغيل السيرفر السحابي SSD المؤمن بشهادة SSL، وتسليمك لوحة التحكم مع عقد دعم فني ومتابعة مستمرة.',
    descEn: 'Production deployment with official domain, SSL cloud infrastructure, admin handover, and active ongoing support.'
  }
];

// 1. Live production client projects (المواقع والمتاجر الحية المنفذة لعملائنا)
export const CLIENT_PROJECTS: ProjectItem[] = PORTFOLIO_PROJECTS.filter((p) =>
  ['larose-store', 'alkemma-decor', 'egypt-builders', 'clean-almithalia', 'elsharkawy-farm', 'handasiya-aluminum'].includes(p.id)
);

// 2. Interactive turnkey demo stores (المتاجر الاستعراضية الجاهزة للمعاينة)
export const DEMO_STORES: ProjectItem[] = PORTFOLIO_PROJECTS.filter((p) =>
  ['voltedge-perfumes', 'voltedge-beauty', 'voltedge-sports'].includes(p.id)
);

// 3. Core website & store services for the Home page
export const CORE_WEB_SERVICES: ServiceItem[] = SERVICES_DATA.filter((s) =>
  ['custom-ecommerce', 'corporate-websites'].includes(s.id)
);

// 4. Other specialized services for the dedicated second page
export const OTHER_SERVICES_LIST: ServiceItem[] = SERVICES_DATA.filter((s) =>
  ['ai-employees', 'smart-shipping', 'mobile-pos-apps', 'n8n-automation', 'backend-architecture'].includes(s.id)
);
