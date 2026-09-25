import { defineConfig, Plugin } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';

function staticAssetsCopyPlugin(): Plugin {
  return {
    name: 'static-assets-copy',
    closeBundle() {
      const filesToCopy = ['script.js', 'theme-init.js', 'style.css'];
      for (const file of filesToCopy) {
        const src = resolve(import.meta.dirname, file);
        const dest = resolve(import.meta.dirname, 'dist', file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
        }
      }
    }
  };
}

const CUSTOMER_SERVICE_SYSTEM_PROMPT = `أنت موظف خدمة عملاء ودعم ومبيعات حقيقي وبشري 100% لموقع المهندس مصطفى صلاح (Eng. Mostafa Salah).
اسمك "أحمد" من فريق خدمة العملاء والدعم الفني للمهندس مصطفى صلاح.

تنبيه حاسم وإلزامي:
هذا الموقع هو موقع شخصي ومهني تعريفي خاص بالمهندس مصطفى صلاح (مطور برمجيات ومهندس أتمتة وبناء أنظمة ذكية).
ممنوع نهائياً ومطلقاً ذكر كلمة أو اسم "صلاح لوجيستيكس" أو "صلاح لوجيستيك" أو "Salah Logistics" في أي جملة أو رد أو ترحيب على الإطلاق!
أنت تمثل شخص وخدمات المهندس مصطفى صلاح وفريقه التقني فقط لا غير.

شخصيتك وأسلوبك الحقيقي:
1. أنت إنسان وبشري تماماً، ودود، محترم، لبق، راقي، وذكي. لست آلياً أو روبوتياً على الإطلاق، وتتجنب تماماً التكلف أو الإجابات الجامدة والمصطنعة.
2. اللهجة الأساسية: مصرية راقية ومهذبة تناسب بيئة الأعمال والشركات (مثل: "أهلاً بحضرتك يا فندم"، "تمام يا فندم تحت أمرك"، "من عيوني"، "حاضر يا غالي"، "بص يا فندم...").
3. ثنائي اللغة واحترافية المصطلحات (Code-Switching): أنت شخص مصري دارس وفاهم إنجليزي كويس جداً. إذا العميل كتب بالعربي ومدخل كلام إنجليزي أو مصطلحات تقنية (مثل: domain, hosting, SSL, system, dashboard, package, features, setup, backend, API, webhook, renewal)، تفهمه تماماً وترد عليه بلهجة مصرية ذكية مع استخدام المصطلحات الإنجليزية بعفوية وطبيعية زي ما بيتكلم المهندس المصري بالظبط.
4. التكيف التلقائي مع جميع اللغات:
   - لو كلمك العميل بالإنجليزي: رد عليه بإنجليزي احترافي ودود وسلس جداً.
   - لو كلمك بالفرانكو (Franco-Arab): افهمه ورد عليه بأسلوب مريح وواضح.
   - لو كلمك بأي لغة تانية (فرنسي، ألماني، إسباني، روسي... إلخ): رد عليه بنفس لغته بطلاقة وود.
   - لو كلمك بعربي فصحى أو لهجة خليجية أو مغاربية: رحب بيه بأعلى درجات الأدب والاحترافية ورد عليه بأسلوب يفهمه ويرتاح له.

قاعدة بيانات خدماتنا وأسعارنا الرسمية المؤكدة:
1. باقة تصميم الموقع التعريفي الاحترافي للشركات (Corporate Website Package):
   - السعر: 65 دولار فقط للسنة الأولى مع دومين رسمي .uk شامل، أو 75 دولار فقط للسنة الأولى مع دومين رسمي .com شامل.
   - اللغتان (العربية والإنجليزية معاً) مشمولتان في السعر الأساسي مجاناً بدون أي تكلفة إضافية.
   - استضافة سحابية فائقة السرعة SSD + شهادة أمان SSL مجانية للسنة الأولى.
   - تصميم متجاوب 100% وسريع للموبايل والتابلت والكمبيوتر، وربط تفاعلي مباشر بأزرار الواتساب.
   - دعم فني وصيانة يومية سريعة ومستمرة (من السبت للخميس).
   - تجديد سنوي ثابت ومضمون: 40 دولار فقط سنوياً لجميع الباقات (يشمل تجديد الدومين والاستضافة السحابية والصيانة والدعم الفني اليومي).
2. موظف الذكاء الاصطناعي البشري (WhatsApp & Telegram AI Employee):
   - يرد في ثوانٍ معدودة بطبيعة بشرية مقنعة 24/7.
   - يولد ويرسل ملفات عروض أسعار رسمية PDF مخصصة، صور المنتجات، والكتالوجات داخل الشات.
   - تسجيل فوري للطلبات في قاعدة البيانات وجوجل شيتس، وإشعارات للمدير بالطلبات العاجلة.
3. سيستم الشحن واللوجستيات (Smart Shipping & Courier Management):
   - إصدار بوالص الشحن PDF مع باركود وQR، تتبع خطوط السير والمناديب لحظياً، وتسوية تحصيل الـ COD ومحافظ المناديب.
4. تطبيقات الموبايل والمتاجر وأنظمة السوبرماركت والصيدليات:
   - برمجة ونشر تطبيقات أندرويد وآيفون على Google Play وApp Store.
   - أنظمة نقاط بيع وكاشير للسوبرماركت مع طابعات الفواتير وقارئات الباركود.
   - أنظمة صيدليات ERP متكاملة تتبع الصلاحيات وأرقام التشغيل وحسابات الموردين.
5. أتمتة مسارات العمل n8n وهندسة الـ APIs والباك إند السحابي:
   - ربط المتاجر (Shopify, WooCommerce, Salla) بأتمتة n8n مع قواعد بيانات PostgreSQL وRedis.

رقم واتساب المباشر للتأكيد والحجز مع م. مصطفى صلاح: 201107787049 (أو 01107787049).
مهمتك: الرد بذكاء ولباقة وبشرية تامة، ومساعدة العميل فوراً في أي استفسار، وتشجيعه بود على التواصل عبر واتساب لتأكيد حجزه والبدء فوراً!`;

function generateLocalSmartResponse(userText: string): string {
  const text = (userText || '').toLowerCase();
  const isEn = /^[a-zA-Z0-9\s.,?!'"@#$%^&*()_+-=:;/<>]+$/.test(userText.trim()) && !/[\u0600-\u06FF]/.test(userText);

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

Would you like to reserve your package or check domain name availability now on WhatsApp (+201107787049)? 🚀`;
    }
    return `أهلاً بحضرتك يا فندم! 🌟
بص يا فندم، باقة الموقع التعريفي الاحترافي للشركات مع م. مصطفى صلاح تفاصيلها واضحة وممتازة:
1. السعر للسنة الأولى:
   • 65 دولار فقط بدومين .uk رسمي شامل.
   • أو 75 دولار فقط بدومين .com رسمي شامل.
2. المزايا المشمولة مجاناً في الباقة:
   • الموقع بيدعم اللغتين معاً (العربية والإنجليزية) بدون أي مصاريف زيادة.
   • استضافة سحابية فائقة السرعة SSD + شهادة أمان SSL مجانية للسنة الأولى.
   • ربط تفاعلي مباشر بالواتساب وتصميم متجاوب 100% مع الموبايل والتابلت.
   • دعم فني يومي وصيانة مستمرة وسريعة (من السبت للخميس).
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

Would you like us to customize this AI employee for your business workflow? You can connect with Eng. Mostafa directly at +201107787049! 🚀`;
    }
    return `يا هلا بحضرتك يا فندم! 🤖
خدمة موظف الذكاء الاصطناعي البشري للواتساب وتليجرام بتوفر عليك وقت وتضاعف مبيعاتك:
• بيرد في أجزاء من الثانية بلهجة بشرية ودودة ومقنعة 24/7 ومستحيل العميل يحس إنه بيكلم آلة.
• بيولد ملفات عروض أسعار رسمية PDF باسم وشعار شركتك ويبعتها فوراً جوه الشات.
• بيسجل بيانات الطلبات مباشرة في قاعدة البيانات وجوجل شيتس.
• بيبعت إشعار فوري للإدارة عند وجود طلب مؤكد أو عميل مستعجل.

جاهزين نبرمجه لشركتك ونربطه بمنتجاتك فوراً، تحب نجربه سوا؟`;
  }

  if (text.includes('شحن') || text.includes('shipping') || text.includes('لوجست') || text.includes('logistics') || text.includes('مندوب') || text.includes('courier') || text.includes('تتبع') || text.includes('cod')) {
    if (isEn) {
      return `Hello! 🚚 Our Smart Shipping & Logistics Operations Platform developed by Eng. Mostafa Salah includes:
• Cloud dashboard to manage thousands of shipments, printable waybills, and smart territory routing.
• Native mobile app for couriers with real-time QR scanning and GPS status updates.
• Instant COD cash reconciliation, commission wallets, and financial reporting.
• Real-time customer tracking portal with automated WhatsApp notifications.

Customizable to fit your exact fleet size. Contact us on WhatsApp (+201107787049) for a live walkthrough! 🚀`;
    }
    return `يا مرحباً بحضرتك يا فندم! 🚚
سيستم الشحن وإدارة المناديب الذكي من المهندس مصطفى صلاح بيشمل كل اللي محتاجه:
• لوحة تحكم سحابية لإدارة آلاف الشحنات، إصدار بوالص الشحن (Waybills) بباركود وQR، وتوزيع المناديب جغرافياً.
• تطبيق موبايل للمناديب لتحديث حالات التوصيل وتأكيد الاستلام والتوقيع.
• تسوية دقيقة لمبالغ الدفع عند الاستلام (COD) وتقارير مالية لحظية.
• بوابة تتبع مباشرة للعملاء عبر رسائل الواتساب مع إشعارات SMS.

السيستم جاهز للتخصيص حسب محافظاتك وفريقك!`;
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
• سيستم كاشير ونقاط بيع (POS) متكامل للسوبرماركت مع قارئات الباركود وطابعات الإيصالات.
• سيستم إدارة صيدليات ERP متكامل لتتبع الأدوية، تواريخ الصلاحية، وحسابات الموردين.

عند حضرتك فكرة معينة تحب نحولها لتطبيق؟`;
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

function aiChatProxyPlugin(): Plugin {
  const handleChat = async (req: any, res: any) => {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      return;
    }

    let body = '';
    req.on('data', (chunk: any) => { body += chunk; });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const userMessage = (data.message || '').trim();
        const history = Array.isArray(data.history) ? data.history : [];

        if (!userMessage) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Empty message' }));
          return;
        }

                // Primary & only AI provider: Direct DeepSeek API (OpenAI-compatible format).
        // The API key is read securely from the server-side environment (.env) and
        // is never exposed to the browser.
        const deepseekKey = process.env.DEEPSEEK_API_KEY;
        if (deepseekKey && deepseekKey !== 'YOUR_DEEPSEEK_API_KEY') {
          try {
            // OpenAI / DeepSeek-compatible payload: messages: [{ role, content }]
            const messages = [
              { role: 'system', content: CUSTOMER_SERVICE_SYSTEM_PROMPT },
              ...history.slice(-20).map((h: any) => ({
                role: h.role === 'assistant' ? 'assistant' : 'user',
                content: String(h.content || '')
              })),
              { role: 'user', content: userMessage }
            ];

            const dsResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${deepseekKey}`
              },
              body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                temperature: 0.7,
                max_tokens: 450,
                stream: false
              })
            });

            const result: any = await dsResponse.json();
            if (dsResponse.ok && result.choices && result.choices[0] && result.choices[0].message) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                reply: result.choices[0].message.content,
                source: 'deepseek-chat'
              }));
              return;
            }
            console.warn('DeepSeek API non-OK response:', dsResponse.status, result?.error?.message || result);
          } catch (dsErr: any) {
            console.warn('DeepSeek invocation attempt:', dsErr?.message || dsErr);
          }
        } else {
          console.warn('DEEPSEEK_API_KEY is not configured in the environment (.env).');
        }

        // Fallback: Intelligent Egyptian AI Customer Service Engine
        const fallbackReply = generateLocalSmartResponse(userMessage);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          success: true,
          reply: fallbackReply,
          source: 'egyptian-customer-service-engine'
        }));
      } catch (err: any) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          success: false,
          error: err?.message || 'Server error',
          fallbackNeeded: true
        }));
      }
    });
  };

  return {
    name: 'ai-chat-proxy',
    configureServer(server) {
      server.middlewares.use('/api/chat', handleChat);
      server.middlewares.use('/api/ai-customer-service', handleChat);
      server.middlewares.use('/api/deepseek-chat', handleChat);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/chat', handleChat);
      server.middlewares.use('/api/ai-customer-service', handleChat);
      server.middlewares.use('/api/deepseek-chat', handleChat);
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      tailwindcss(),
      staticAssetsCopyPlugin(),
      aiChatProxyPlugin(),
    ],
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      headers: {
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https: ws: wss:; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://wa.me; object-src 'none'; upgrade-insecure-requests;",
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), vr=(), interest-cohort=()',
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'same-origin'
      }
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
      headers: {
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https: ws: wss:; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://wa.me; object-src 'none'; upgrade-insecure-requests;",
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), vr=(), interest-cohort=()',
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'same-origin'
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          corporateWebsite: resolve(import.meta.dirname, 'corporate-website.html'),
          whatsappAiEmployee: resolve(import.meta.dirname, 'whatsapp-ai-employee.html'),
          n8nAutomation: resolve(import.meta.dirname, 'n8n-automation.html'),
          smartShippingSystem: resolve(import.meta.dirname, 'smart-shipping-system.html'),
          mobileRetailApps: resolve(import.meta.dirname, 'mobile-retail-apps.html'),
          omnichannelAiAgent: resolve(import.meta.dirname, 'omnichannel-ai-agent.html'),
          backendApiArchitecture: resolve(import.meta.dirname, 'backend-api-architecture.html'),
          privacy: resolve(import.meta.dirname, 'privacy.html'),
          privacyPolicy: resolve(import.meta.dirname, 'privacy-policy.html'),
          terms: resolve(import.meta.dirname, 'terms.html'),
          termsOfService: resolve(import.meta.dirname, 'terms-of-service.html'),
        },
      },
    },
  };
});
