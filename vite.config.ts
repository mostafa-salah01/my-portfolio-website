import { defineConfig, Plugin } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';
import { GoogleGenAI } from '@google/genai';

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
   - رحب به بحفاوة وشغف واشرح له نظام الأفلييت والشراكة.
   - وضح له بوضوح تام أن نظام التسويق بالعمولة يمنحه عمولة فورية قدرها 30% كاش من قيمة كل خدمة أو مشروع يتم بيعه أو التعاقد عليه عن طريقه!
   - اضرب له أمثلة واضحة على الأرباح:
     * موقع شركات تعريفي (75$): عمولتك فوراً 22.5$ كاش.
     * موظف ذكاء اصطناعي لواتساب أو أنظمة متوسطة: عمولتك 30% فوراً.
     * سيستم شحن أو إدارة شركات (مثلاً 500$): عمولتك فوراً 150$ كاش.
     * تطبيقات موبايل أو مشاريع مخصصة (مثلاً 1000$): عمولتك فوراً 300$ كاش.
     * الدفع فوري بمجرد تعاقد العميل عبر إنستاباي أو فودافون كاش أو تحويل بنكي.
   - قم بالتعرف على إمكانيات وخبرة المستخدم: اسأله بلطف عن خلفيته التسويقية (هل شغال سوشيال ميديا، إعلانات ممولة، شبكة علاقات مع شركات ومحلات، تسويق مباشر؟) واقترح عليه خطة تسويقية سريعة لتحقيق أكبر دخل.
2. جمع بيانات التواصل وإرسالها للواتساب:
   - عندما يبدي المستخدم رغبته في الانضمام كمسوق أو البدء معنا، اطلب منه بلطف اسمه الكريم ورقم هاتفه أو واتس اب.
   - بمجرد أن يرسل لك اسمه ورقمه، أكد له تسجيله فوراً، واعرض عليه رابط التواصل المباشر مع المهندس مصطفى صلاح على واتساب (+201107787049)، مع استمرارك في الحديث معه بسلاسة وإجابته عن أي استفسار دون أي انقطاع.

رقم واتساب المباشر للمهندس مصطفى صلاح: 201107787049 (أو 01107787049).
مهمتك: الرد بذكاء وسرعة، بناء علاقة ودية وثقة مع العميل أو المسوق، ومساعدته خطوة بخطوة للبدء وتحقيق النجاح!`;

function generateLocalSmartResponse(userText: string): string {
  const text = (userText || '').toLowerCase();
  const isEn = /^[a-zA-Z0-9\s.,?!'"@#$%^&*()_+-=:;/<>]+$/.test(userText.trim()) && !/[\u0600-\u06FF]/.test(userText);

  // Affiliate & Marketing Program Query
  if (text.includes('أفلييت') || text.includes('افلييت') || text.includes('تسويق') || text.includes('عمولة') || text.includes('مسوق') || text.includes('اشتغل') || text.includes('شغل') || text.includes('ربح') || text.includes('30%') || text.includes('affiliate') || text.includes('commission') || text.includes('marketer') || text.includes('partner')) {
    if (isEn) {
      return `Welcome to the Eng. Mostafa Salah 30% Affiliate & Growth Program! 🚀💰
Here is how you earn high immediate payouts with us:
1. Instant 30% Cash Commission on every client or project closed through you.
   • Corporate Website Package ($75): You get $22.50 instant cash.
   • WhatsApp AI Employee / CRM Systems: 30% immediate payout.
   • Custom Logistics & Dispatch Systems ($500+): You get $150+ cash.
   • Mobile Apps & ERP Systems ($1,000+): You get $300+ cash!
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

  // Price & Packages
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
5. 30% Affiliate Program for marketers and partners (instant cash commissions on every sale).

How can I help you today? You can also message Eng. Mostafa directly on WhatsApp (+201107787049)! 🚀`;
  }

  return `أهلاً بحضرتك يا فندم في موقع المهندس مصطفى صلاح! 👋
أنا أحمد من خدمة العملاء والمبيعات، سعيد جداً بتواصلك وتحت أمرك في أي استفسار:
1. تصميم مواقع الشركات التعريفية (باقة 65$ بدومين uk. أو 75$ بدومين com. تشمل العربي والإنجليزي مع تجديد سنوي ثابت 40$).
2. موظف الذكاء الاصطناعي البشري للواتساب وتليجرام للرد الفوري وتوليد عروض أسعار PDF.
3. سيستمات إدارة الشحن وتتبع المناديب وتسوية الـ COD.
4. تطبيقات الموبايل وأنظمة السوبرماركت والصيدليات.
5. برنامج التسويق بالعمولة والأفلييت 30% (اربح 30% عمولة فورية كاش عن كل تعاقد).

تحب تستفسر عن تفاصيل خدمة معينة؟ أو تحب تنضم كمسوق في برنامج الأفلييت 30%؟ 🚀`;
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

        // 1. First priority: DeepSeek API directly via DEEPSEEK_API_KEY
        const deepseekKey = process.env.DEEPSEEK_API_KEY;
        if (deepseekKey && deepseekKey !== 'YOUR_DEEPSEEK_API_KEY' && deepseekKey.trim() !== '') {
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
            const timeoutId = setTimeout(() => controller.abort(), 18000);

            const dsResponse = await fetch('https://api.deepseek.com/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${deepseekKey.trim()}`
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
        const geminiKey = process.env.GEMINI_API_KEY;
        if (geminiKey && geminiKey !== 'MY_GEMINI_API_KEY' && geminiKey.trim() !== '') {
          try {
            const ai = new GoogleGenAI({
              apiKey: geminiKey.trim(),
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                }
              }
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
