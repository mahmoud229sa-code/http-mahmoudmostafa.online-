# Mahmoud Figa Portfolio

موقع شخصي لعرض أعمال محمود مصطفى في مونتاج الفيديو وصناعة المحتوى، مع صفحات الباقات ونموذج تواصل ولوحة تحكم اختيارية تعتمد على Supabase.

## الهيكل

```text
├── index.html             # الصفحة الرئيسية
├── pages/                 # الصفحات الداخلية ولوحة التحكم
├── assets/
│   ├── css/style.css
│   ├── js/                # وظائف الموقع وإعداد Supabase النموذجي
│   ├── images/
│   └── logos/
├── robots.txt
├── sitemap.xml
└── urlShort.txt
database/                  # مخططات Supabase
reference/                # ملفات مرجعية اختيارية
docs/                     # أدلة التشغيل
server.js                 # خادم Express محلي
netlify.toml              # إعداد نشر Netlify
```

## التشغيل المحلي

يتطلب Node.js 18 أو أحدث.

```bash
npm install
npm start
```

ثم افتح `http://localhost:3000`.

يمكن فتح `index.html` مباشرة للعرض الثابت، لكن بعض وظائف Supabase تحتاج خادم HTTP وإعدادًا صحيحًا.

## إعداد Supabase

1. انسخ `assets/js/supabase-config.example.js` إلى ملف إعداد محلي.
2. ضع رابط المشروع والمفتاح publishable وبريد المالك في إعدادك المحلي.
3. شغّل أوامر `database/supabase-schema.sql` في مشروع Supabase.
4. لا تضع كلمات مرور أو مفاتيح سرية في ملفات JavaScript أو Git.

ملف `supabase-config.js` المتعقّب يحتوي على قيم فارغة عمدًا. كلمة مرور المدير لا تُخزّن داخل المتصفح؛ تسجيل الدخول يتم عبر Supabase Auth.

## النشر

- **Netlify:** استخدم جذر المستودع كمجلد النشر. إعداد ذلك موجود في `netlify.toml`.
- **GitHub Pages:** اختر `main` و`/(root)` في إعداد Pages.
- **Express:** استخدم `npm start` لخدمة جذر المستودع.

## الأمان قبل الرفع

- أنشئ بيانات Supabase المطلوبة خارج المستودع.
- دوّر أي كلمة مرور أو اعتماد سبق وضعه في النسخ القديمة.
- راجع `git diff` و`git status` قبل أول push.
- لا ترفع ملفات `.env` أو الإعدادات المحلية أو بيانات العملاء.

## الملفات المرجعية

- [دليل التثبيت](docs/INSTALLATION.md)
- [دليل البدء السريع](docs/QUICKSTART.md)
- [مخطط Supabase](database/supabase-schema.sql)
