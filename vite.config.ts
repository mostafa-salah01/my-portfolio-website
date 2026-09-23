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

function deepseekProxyPlugin(): Plugin {
  return {
    name: 'deepseek-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/deepseek-chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const userMessage = data.message || '';
            const history = data.history || [];
            const apiKey = process.env.DEEPSEEK_API_KEY || '';
            if (!apiKey) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                success: false, 
                error: 'No DEEPSEEK_API_KEY configured',
                fallbackNeeded: true 
              }));
              return;
            }

            const systemPrompt = `أنت موظف مبيعات وتواصل ذكي ودود واحترافي لشركة "صلاح لوجيستيكس" (Salah Logistics) والمهندس مصطفى صلاح. تتحدث بلهجة مصرية وعربية راقية وطبيعية تشبه البشر تماماً بدون أي تكلف أو جمود.
خدمات الشركة وأسعارها الرسمية:
1. باقة الموقع التعريفي الاحترافي للشركات: 65 دولار بدومين uk. أو 75 دولار بدومين com. تشمل اللغتين (عربي وإنجليزي معاً بدون أي رسوم إضافية)، استضافة سحابية فائقة السرعة، شهادة أمان SSL، ربط مباشر بالواتساب، دعم فني وصيانة يومية، مع تجديد سنوي ثابت 40 دولار فقط.
2. موظف الذكاء الاصطناعي البشري للواتساب وتليجرام: رد فوري، إرسال عروض أسعار PDF، تسجيل الطلبات في السيستم، وإشعار الإدارة.
3. سيستم الشحن واللوجستيات: إدارة الشحنات والمناديب وتتبع خطوط السير والتحصيل COD.
4. تطبيقات الموبايل وأنظمة السوبرماركت والمتاجر والصيدليات.
5. أتمتة العمليات عبر n8n وهندسة الـ APIs وقواعد البيانات.
رقم الواتساب المباشر للتأكيد والحجز: 201107787049 (أو 01107787049).
مهمتك: الرد على استفسار العميل بإيجاز وذكاء ولباقة وحثه على تأكيد حجزه أو التواصل عبر واتساب.`;

            const messages = [
              { role: 'system', content: systemPrompt },
              ...history.slice(-6),
              { role: 'user', content: userMessage }
            ];

            const response = await fetch('https://api.deepseek.com/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
              },
              body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                temperature: 0.7,
                max_tokens: 350
              })
            });

            const result = await response.json();
            if (response.ok && result.choices && result.choices[0]) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                success: true, 
                reply: result.choices[0].message.content,
                source: 'deepseek-api'
              }));
            } else {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                success: false, 
                error: result.error || 'DeepSeek API response error',
                fallbackNeeded: true
              }));
            }
          } catch (err: any) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ 
              success: false, 
              error: err?.message || 'Server error',
              fallbackNeeded: true
            }));
          }
        });
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      tailwindcss(),
      staticAssetsCopyPlugin(),
      deepseekProxyPlugin(),
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
