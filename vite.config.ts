import { defineConfig, Plugin } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { GoogleGenAI } from '@google/genai';

function staticAssetsCopyPlugin(): Plugin {
  return {
    name: 'static-assets-copy',
    transformIndexHtml(html) {
      const deepseekKey = (process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || '').trim();
      const isValidKey = deepseekKey && deepseekKey.length > 15 && !deepseekKey.includes('YOUR_DEEPSEEK');
      if (isValidKey) {
        return html.replace('<head>', `<head>\n  <script>window.DEEPSEEK_API_KEY = ${JSON.stringify(deepseekKey)}; window.VITE_DEEPSEEK_API_KEY = window.DEEPSEEK_API_KEY; window.__DEEPSEEK_API_KEY__ = window.DEEPSEEK_API_KEY;</script>`);
      }
      return html;
    },
    closeBundle() {
      const deepseekKey = (process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || '').trim();
      const isValidKey = deepseekKey && deepseekKey.length > 15 && !deepseekKey.includes('YOUR_DEEPSEEK');
      const keyToInject = isValidKey ? deepseekKey : '';

      const filesToCopy = ['theme-init.js', 'style.css', 'CNAME', 'sitemap.xml', 'google7da3f41b1c6a9b4a.html', 'robots.txt'];
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

const CUSTOMER_SERVICE_SYSTEM_PROMPT = `أنت "أحمد"، مساعد ذكي وموظف دعم لشركة WebStack للحلول البرمجية والأنظمة الرقمية (WebStack Software Solutions).

تنبيه حاسم وإلزامي:
هذا الموقع هو المنصة الرسمية لشركة WebStack للحلول البرمجية والمتاجر الإلكترونية وهندسة الأنظمة الذكية.
ممنوع نهائياً ومطلقاً ذكر كلمة أو اسم "صلاح لوجيستيكس" أو "صلاح لوجيستيك" أو "Salah Logistics" في أي جملة أو رد أو ترحيب على الإطلاق!
أنت تمثل شركة WebStack فقط.

قواعد الأسعار (مهمة للغاية):
- ممنوع ذكر أي أرقام مالية أو أسعار ثابتة أو عبارات "يبدأ من" أو "التجديد السنوي"!
- إذا سأل العميل عن السعر أو التكلفة، وضح له بلطف واحترافية: "التكلفة تختلف حسب متطلبات كل مشروع وحجم الميزات المطلوبة، لأننا في WebStack بنبني كل نظام مخصص من الصفر 100% بدون قوالب جاهزة. تفضل بالتواصل معنا عبر واتساب (+201107787049) للحصول على استشارة مجانية وعرض سعر مخصص ودقيق يناسب نشاطك."

قواعد التنسيق البصري:
1. التباعد والتنظيم: اترك سطراً فارغاً بين كل فكرة وأخرى، واجعل كل فقرة قصيرة ومريحة للنظر.
2. استخدام نقاط مرتبة وواضحة عند استعراض الخدمات.
3. التحدث بلهجة مصرية راقية ومهذبة ومحترمة تناسب بيئة الأعمال.
4. عدم استخدام أرقام غير مثبتة (تجنب نسب مثل 100% دقة أو +65% أو 99.98%).
5. وصف الذكاء الاصطناعي بدقة: "ردود طبيعية وودودة، مع إمكانية التحويل للموظف البشري عند الحاجة".

قاعدة بيانات خدمات وسابقة أعمال WebStack:
1. الصفحة الرئيسية للموقع:
   - مخصصة بالكامل لإنشاء المتاجر الإلكترونية المخصصة من الصفر (PHP & MySQL، 0% عمولات، جميع بوابات الدفع) وتصميم المواقع التعريفية للشركات.
2. سابقة أعمالنا الحية على أرض الواقع:
   - متجر لاروز (Larose Store): متجر إلكتروني حي متكامل للعطور ومستحضرات التجميل والأزياء (https://larose.salah-logistics.uk/)
   - شركة القمة للديكور والمقاولات (Al Kemma Decor): موقع حي رسمي للتشطيبات والتصميم الداخلي (https://alkemma-decor.salah-logistics.uk/)
   - شركة كلين المثالية (Clean Almithalia): موقع حي رسمي لخدمات النظافة والصيانة بالسعودية (https://clean-almithalia.salah-logistics.uk/)
   - مزرعة الشرقاوي (Elsharkawy Farm): متجر حي للألبان ومنتجات المزارع (http://elsharkawy-farm.salah-logistics.uk/)
   - الشركة الهندسية للألوميتال (Handasiya Aluminum): معرض مشاريع الألوميتال بالمعادي (http://handasiya-aluminum.salah-logistics.uk/)
3. المتاجر الاستعراضية الجاهزة للمعاينة:
   - ديمو متجر العطور (Voltedge Perfumes)
   - ديمو متجر التجميل (Voltedge Beauty)
   - ديمو متجر الرياضة (Voltedge Sports)
4. صفحة الأنظمة والخدمات الأخرى (#other-services):
   - موظف الذكاء الاصطناعي لواتساب وتلجرام (ردود 24/7، إرسال ملفات وكتالوجات، تحويل للبشر)
   - سيستم الشحن واللوجستيات وإدارة المناديب وبوالص الـ PDF وتتبع الـ COD
   - تطبيقات الموبايل (Android & iOS) وأنظمة نقاط البيع والكاشير POS
   - أتمتة مسارات العمل المؤسسية عبر n8n
   - هندسة الـ Backend وواجهات برمجة التطبيقات REST APIs

أرقام التواصل الرسمية لفريق WebStack:
• م/ عمار (استشارات تقنية وهندسية ومبيعات): +201555668194 (أو 01555668194)
• إدارة WebStack والمبيعات: +201107787049 (أو 01107787049)`;

function generateLocalSmartResponse(userText: string): string {
  const text = (userText || '').toLowerCase();
  const isEn = /^[a-zA-Z0-9\s.,?!'"@#$%^&*()_+-=:;/<>]+$/.test(userText.trim()) && !/[\u0600-\u06FF]/.test(userText);

  // E-Commerce Store Inquiry Branch
  if (text.includes('متجر') || text.includes('متاجر') || text.includes('شوب') || text.includes('ecommerce') || text.includes('e-commerce') || text.includes('store') || text.includes('منتجات') || text.includes('دفع إلكتروني') || text.includes('بوابة دفع')) {
    if (isEn) {
      return `Hello! 🛍️ Welcome to WebStack's Custom E-Commerce Store Solution!

Here is how we engineer your store:
1. 100% Handcrafted from Scratch: Built with clean PHP & MySQL architecture tailored to your specific business without bloated templates.
2. Complete Payment Integrations: Mada, Visa, Mastercard, Apple Pay, Tabby, Tamara, InstaPay, PayPal & COD.
3. Operations Dashboard: Inventory sync, PDF invoices & waybills, and customer accounts.
4. Official Domain & Fast Cloud Hosting with ongoing dedicated technical support.

Pricing is tailored to your exact catalog and feature specifications. Connect with our engineering team on WhatsApp (+201107787049) for a free consultation and customized quote! 🚀`;
    }
    return `أهلاً بحضرتك يا فندم! 🛍️ في شركة WebStack بنقدملك خدمة إنشاء المتاجر الإلكترونية المخصصة:

1. **برمجة من الصفر 100%**:
   • المتجر بيتعمل بالكامل بكود نظيف بلغة PHP وقواعد بيانات MySQL مخصصة لنشاطك، بدون قوالب جاهزة بطيئة وبدون عمولات على مبيعاتك.
2. **بوابات الدفع والعمليات**:
   • ربط جميع بوابات الدفع (مدى، فيزا، أبل باي، تابي، تمارا، إنستاباي، باي بال، والدفع عند الاستلام).
   • لوحة تحكم ذكية لإدارة المخزون، المنتجات، الفواتير، وبوالص الشحن PDF.
3. **الدومين والاستضافة والدعم**:
   • اسم نطاق رسمي خاص بمتجرك + استضافة سحابية فائقة السرعة SSD + عقد دعم فني ومتابعة مستمرة.

تختلف التكلفة بدقة حسب متطلبات نشاطك وحجم المميزات التي تحتاجها. تواصل معنا عبر واتساب (+201107787049) لنناقش تفاصيل متجرك ونقدم لك عرض سعر مخصص مجاني! 🚀`;
  }

  // Price & Quote Inquiries
  if (text.includes('سعر') || text.includes('باقة') || text.includes('تكلفة') || text.includes('كام') || text.includes('price') || text.includes('quote') || text.includes('cost')) {
    if (isEn) {
      return `Hello! 🌟 At WebStack, every client receives a dedicated, custom-crafted system without pre-made templates.

Because our solutions are built 100% from scratch to fit your exact business workflows, pricing depends on your required features, scale, and integrations.

Please connect with us on WhatsApp at +201107787049 for an instant free consultation and tailored quotation! 🚀`;
    }
    return `أهلاً بحضرتك يا فندم! 🌟
في شركة WebStack شعارنا هو: "كل عميل له نظامه الخاص".

لأن كل متجر أو موقع أو نظام بنبنيه من الصفر 100% بدون أي قوالب معلبة، فإن التكلفة بتختلف حسب متطلبات مشروعك بدقة والمميزات التي تحتاجها.

تفضل بالتواصل معنا مباشرة على واتساب (+201107787049) وسنكون سعداء بمناقشة فكرتك وتقديم استشارة مجانية وعرض سعر مخصص يناسب أهدافك! 🚀`;
  }

  // Corporate Website Inquiries
  if (text.includes('موقع') || text.includes('تعريفي') || text.includes('شركات') || text.includes('شركة') || text.includes('website') || text.includes('corporate')) {
    if (isEn) {
      return `Hello! 🌐 WebStack designs high-performance corporate websites crafted for enterprise credibility:
• Full bilingual support: Arabic and English fully integrated.
• Fast SSD cloud hosting with free security SSL certificate.
• 100% responsive across mobile, tablet, and desktop screens.
• Direct WhatsApp integration to capture customer leads.

Contact our team on WhatsApp (+201107787049) for a tailored quotation! 🚀`;
    }
    return `يا هلا بحضرتك يا فندم! 🌐
باقة تصميم المواقع التعريفية للشركات من WebStack بتوفر لك واجهة رقمية راقية تعكس قوة ومصداقية شركتك:
• دعم كامل للغتين (العربية والإنجليزية معاً) مع تصميم متجاوب فائق السرعة.
• استضافة سحابية سريعة SSD مع شهادة أمان SSL.
• ربط مباشر مع محادثات واتساب ونماذج التواصل لتحويل الزوار لعملاء.

تفضل بالتواصل معنا على واتساب (+201107787049) لاستلام عرض سعر مخصص لموقع شركتك! 🚀`;
  }

  // AI Employee Inquiries
  if (text.includes('ذكاء') || text.includes('ai') || text.includes('واتساب') || text.includes('whatsapp') || text.includes('موظف') || text.includes('بوت') || text.includes('bot')) {
    if (isEn) {
      return `Hello! 🤖 WebStack's AI Employees for WhatsApp & Telegram are built for business efficiency:
• Natural and friendly 24/7 replies in Arabic and English, with polite human escalation whenever needed.
• Dispatches product photos, specification sheets, and official PDF quotations inside the chat.
• Direct synchronization with your CRM, Google Sheets, and databases.

Let's discuss customizing an AI employee for your business on WhatsApp: +201107787049! 🚀`;
    }
    return `يا هلا بحضرتك يا فندم! 🤖
موظف الذكاء الاصطناعي من WebStack للواتساب وتلجرام بيساعدك على مدار الساعة:
• ردود طبيعية وودودة 24/7 بلهجة تناسب طبيعة عملائك، مع تحويل العميل للموظف البشري عند الحاجة.
• إرسال فوري لكتالوجات المنتجات وعروض الأسعار الرسمية PDF وصور المنتجات داخل الشات.
• تسجيل فوري للطلبات والبيانات في جداول Google وقواعد البيانات.

تحب نجربه لنشاطك؟ تواصل معنا على واتساب (+201107787049) لمعرفة التفاصيل وعرض السعر المخصص! 🚀`;
  }

  // General Inquiry
  if (isEn) {
    return `Welcome to WebStack! 👋 I'm Ahmed, your smart assistant.
At WebStack, "Every client has their own dedicated system" — custom-built from scratch with clean code:
1. Custom E-Commerce Stores (PHP & MySQL, all payment gateways, zero sales commissions).
2. Corporate Bilingual Websites (Arabic & English, ultra-fast hosting, SSL).
3. Human-like AI Employees (WhatsApp & Telegram 24/7 support & sales).
4. Smart Shipping & Courier Management Platforms.
5. Mobile Apps & Business ERP Systems.

How can I help you today? You can also message our team directly on WhatsApp (+201107787049) for a custom quotation! 🚀`;
  }

  return `أهلاً بحضرتك يا فندم في شركة WebStack للحلول البرمجية! 👋
أنا أحمد، مساعدك الذكي، وسعيد جداً بتواصلك معنا:

في WebStack نؤمن بأن: "كل عميل له نظامه الخاص":
1. **المتاجر الإلكترونية المخصصة**: برمجة من الصفر بلغة PHP وقواعد بيانات MySQL بدون قوالب جاهزة و0% عمولات على مبيعاتك.
2. **المواقع الإلكترونية للشركات**: تصميم احترافي باللغتين العربية والإنجليزية مع سرعة عالية واستضافة سحابية مؤمنة.
3. **موظفو الذكاء الاصطناعي**: ردود طبيعية وودودة على مدار الساعة وإرسال ملفات وعروض أسعار PDF مع تحويل للموظف البشري.
4. **سيستمات الشحن واللوجستيات**: إصدار بوالص الشحن، تتبع المناديب، وتسوية تحصيل الـ COD.
5. **تطبيقات الموبايل وأنظمة إدارة الشركات**: حلول مخصصة تناسب نشاطك بدقة.

أي هذه الحلول ترغب في الاستفسار عنها أو معرفة تفاصيلها؟ ويمكنك دائماً التواصل مباشرة مع فريقنا الهندسي عبر واتساب على (+201107787049) لاستلام عرض سعر مخصص! 🚀`;
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

        // 1. First priority: DeepSeek API directly via DEEPSEEK_API_KEY (if a valid non-placeholder key is provided)
        const deepseekKey = (process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || '').trim();
        const isPlaceholderDeepseek = !deepseekKey || 
          deepseekKey === 'YOUR_DEEPSEEK_API_KEY' || 
          deepseekKey === 'YOUR_DEEPSEEK_API_KEY_HERE' || 
          deepseekKey.includes('YOUR_DEEPSEEK') || 
          deepseekKey.length < 15;

        if (!isPlaceholderDeepseek) {
          try {
            const formattedHistory = history.slice(-10).map((h: any) => ({
              role: h.role === 'assistant' ? 'assistant' : 'user',
              content: String(h.content || '')
            }));

            const messages = [
              { role: 'system', content: CUSTOMER_SERVICE_SYSTEM_PROMPT },
              ...formattedHistory,
              { role: 'user', content: userMessage }
            ];

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 12000);

            const dsResponse = await fetch('https://api.deepseek.com/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${deepseekKey}`
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
              const result: any = await dsResponse.json();
              if (result && result.choices && result.choices[0] && result.choices[0].message) {
                const reply = result.choices[0].message.content;
                if (reply) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: true,
                    reply: reply,
                    source: 'deepseek-chat'
                  }));
                  return;
                }
              }
            } else {
              const errBody = await dsResponse.text();
              console.warn('DeepSeek API responded with HTTP error:', dsResponse.status, errBody);
            }
          } catch (dsErr: any) {
            console.warn('DeepSeek invocation attempt failed, falling back:', dsErr?.message || dsErr);
          }
        }

        // 2. Second priority: Google Gemini API via @google/genai
        const geminiKey = (process.env.GEMINI_API_KEY || '').trim();
        if (geminiKey && geminiKey !== 'MY_GEMINI_API_KEY') {
          try {
            const ai = new GoogleGenAI({
              apiKey: geminiKey,
            });

            const contents: any[] = [];
            for (const h of history.slice(-8)) {
              if (h.content) {
                contents.push({
                  role: h.role === 'assistant' ? 'model' : 'user',
                  parts: [{ text: String(h.content) }]
                });
              }
            }
            contents.push({
              role: 'user',
              parts: [{ text: userMessage }]
            });

            const response = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents: contents,
              config: {
                systemInstruction: CUSTOMER_SERVICE_SYSTEM_PROMPT,
                temperature: 0.7,
              }
            });

            const reply = response.text;
            if (reply) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                reply: reply,
                source: 'gemini-3.8-flash'
              }));
              return;
            }
          } catch (geminiErr: any) {
            console.warn('Gemini API invocation attempt failed, falling back:', geminiErr?.message || geminiErr);
          }
        }

        // 3. Built-in Fallback: Intelligent Egyptian AI Customer Service Engine
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
    define: {
      'import.meta.env.VITE_DEEPSEEK_API_KEY': JSON.stringify(process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || ''),
      'import.meta.env.DEEPSEEK_API_KEY': JSON.stringify(process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || ''),
      'DEEPSEEK_API_KEY': JSON.stringify(process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || ''),
      'process.env.DEEPSEEK_API_KEY': JSON.stringify(process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || ''),
      'process.env.VITE_DEEPSEEK_API_KEY': JSON.stringify(process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || ''),
      '__DEEPSEEK_API_KEY__': JSON.stringify(process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || ''),
    },
    plugins: [
      react(),
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
        },
      },
    },
  };
});
