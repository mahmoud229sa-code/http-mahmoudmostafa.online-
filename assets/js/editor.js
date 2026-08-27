(() => {
    if (new URLSearchParams(window.location.search).get('edit') !== '1' || !window.supabase || !window.SUPABASE_CONFIG) return;

    const client = window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
    const ownerEmail = window.SUPABASE_CONFIG.ownerEmail.toLowerCase();
    const settingTargets = {
        heroTitle: ['.hero-content h1', 'العنوان الرئيسي'],
        heroTagline: ['.hero-tagline', 'الجملة التعريفية'],
        heroDesc: ['.hero-desc', 'الوصف الرئيسي'],
        aboutIntro: ['#about .about-text p[data-i18n="aboutIntro"]', 'نبذة من أنا'],
        contactDesc: ['#contact .section-desc', 'وصف التواصل']
    };

    function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character])); }
    function showLogin() {
        document.body.insertAdjacentHTML('beforeend', `<div class="editor-login"><form><h2>دخول وضع التعديل</h2><input type="email" placeholder="البريد الإلكتروني" required><input type="password" placeholder="كلمة المرور" required><button type="submit">دخول</button><p role="alert"></p></form></div>`);
        document.querySelector('.editor-login form').addEventListener('submit', async event => { event.preventDefault(); const form = event.currentTarget; const result = await client.auth.signInWithPassword({ email: form.querySelector('input[type=email]').value.trim(), password: form.querySelector('input[type=password]').value }); if (result.error) { form.querySelector('[role=alert]').textContent = 'بيانات الدخول غير صحيحة.'; return; } document.querySelector('.editor-login').remove(); await startEditor(); });
    }
    async function saveSetting(key, value) {
        const { data } = await client.from('site_content').select('id').eq('content_type', 'setting').eq('title', key).limit(1);
        const result = data?.[0] ? await client.from('site_content').update({ description: value, is_visible: true, updated_at: new Date().toISOString() }).eq('id', data[0].id) : await client.from('site_content').insert({ content_type: 'setting', title: key, description: value, is_visible: true, sort_order: 0 });
        return result.error;
    }
    function openTextEditor(key, target, label) {
        document.querySelector('.editor-edit-dialog')?.remove();
        document.body.insertAdjacentHTML('beforeend', `<div class="editor-edit-dialog"><form><h2>تعديل ${label}</h2><textarea required>${escapeHtml(target.textContent.trim())}</textarea><div><button type="submit">حفظ</button><button type="button" class="editor-cancel">إلغاء</button></div><p role="alert"></p></form></div>`);
        const dialog = document.querySelector('.editor-edit-dialog');
        const form = dialog.querySelector('form');
        form.querySelector('textarea').focus();
        form.addEventListener('submit', async event => { event.preventDefault(); const value = form.querySelector('textarea').value.trim(); if (!value) return; target.textContent = value; const error = await saveSetting(key, value); if (error) form.querySelector('[role=alert]').textContent = 'تعذر الحفظ. تأكد من تشغيل جدول site_content.'; else dialog.remove(); });
        dialog.querySelector('.editor-cancel').addEventListener('click', () => dialog.remove());
    }
    function addEditorStyles() {
        const style = document.createElement('style');
        style.textContent = `.editor-bar{position:fixed;top:0;left:0;right:0;z-index:10001;display:flex;align-items:center;gap:10px;padding:10px 18px;background:#172033;color:#fff;font:600 14px Cairo,sans-serif;box-shadow:0 4px 18px #0003}.editor-bar strong{margin-left:auto}.editor-bar button,.editor-bar a{padding:7px 12px;border:1px solid #ffffff44;border-radius:4px;background:#e26d45;color:#fff;text-decoration:none;font:inherit;cursor:pointer}.editor-bar .editor-muted{background:transparent}.editor-marker{display:inline-flex;margin:0 8px;padding:3px 8px;border:1px solid #e26d45;border-radius:4px;background:#fff;color:#b44f2f;font:600 12px Cairo,sans-serif;cursor:pointer;vertical-align:middle}.editor-login,.editor-edit-dialog{position:fixed;inset:0;z-index:10002;display:grid;place-items:center;background:#172033cc}.editor-login form,.editor-edit-dialog form{width:min(460px,calc(100% - 32px));padding:28px;border-radius:8px;background:#fff;color:#172033}.editor-login h2,.editor-edit-dialog h2{margin:0 0 15px;font-size:1.4rem}.editor-login input,.editor-edit-dialog textarea{display:block;width:100%;margin:10px 0;padding:11px;border:1px solid #e5e9f0;border-radius:4px;font:inherit}.editor-login button,.editor-edit-dialog button{width:100%;padding:11px;border:0;border-radius:4px;background:#e26d45;color:#fff;font:inherit;font-weight:700;cursor:pointer}.editor-edit-dialog textarea{min-height:120px;resize:vertical}.editor-edit-dialog form>div{display:flex;gap:10px}.editor-edit-dialog form>div button{flex:1}.editor-edit-dialog form>div .editor-cancel{border:1px solid #e5e9f0;background:#fff;color:#172033}.editor-login p,.editor-edit-dialog p{min-height:22px;color:#b44f2f;font-size:.85rem}.editor-mode{padding-top:58px!important}`;
        document.head.appendChild(style);
    }
    async function startEditor() {
        const { data: { user } } = await client.auth.getUser();
        if (!user || user.email.toLowerCase() !== ownerEmail) { showLogin(); return; }
        addEditorStyles(); document.body.classList.add('editor-mode');
        const [{ count: visitors }, { data: orders }] = await Promise.all([client.from('visitors').select('*', { count: 'exact', head: true }), client.from('orders').select('id')]);
        document.body.insertAdjacentHTML('afterbegin', `<div class="editor-bar"><strong>وضع تعديل الموقع</strong><span>الزوار: ${visitors || 0}</span><span>الطلبات: ${orders?.length || 0}</span><button id="editorTheme">تغيير الثيم</button><a href="pages/dashboard.html">إدارة المحتوى</a><button class="editor-muted" id="editorExit">خروج</button></div>`);
        document.getElementById('editorExit').addEventListener('click', () => { window.location.href = window.location.pathname; });
        document.getElementById('editorTheme').addEventListener('click', async () => { const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark'; setTheme(nextTheme); await saveSetting('theme', nextTheme); });
        Object.entries(settingTargets).forEach(([key, [selector, label]]) => { const target = document.querySelector(selector); if (!target) return; const marker = document.createElement('button'); marker.className = 'editor-marker'; marker.textContent = 'تعديل'; marker.title = `تعديل ${label}`; marker.addEventListener('click', () => openTextEditor(key, target, label)); target.parentElement.insertBefore(marker, target.nextSibling); });
    }
    startEditor();
})();
