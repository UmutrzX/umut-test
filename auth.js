// ═══════════════════════════════════════════════════════════════
// ZEMU SIPPAN Admin - Kimlik Doğrulama & Kullanıcı Yönetimi
// PBKDF2-SHA256 (100.000 iterasyon) + rastgele salt (Web Crypto API)
// NOT: Bu dosya admin.js'ten SONRA yüklenir.
//  - window.adminBoot giriş kapısını yönetir
//  - loadAdminConfig geliştirilmiş sürümle geçersiz kılar
// Şifre sıfırlama: Konsolda localStorage.removeItem('zemu_admin_users')
//                   çalıştırıp sayfayı yenileyin.
// ═══════════════════════════════════════════════════════════════

const AUTH_USERS_KEY = 'zemu_admin_users';
const AUTH_SESSION_KEY = 'zemu_admin_session';
const AUTH_REMEMBER_KEY = 'zemu_admin_remember';
const AUTH_LOCK_KEY = 'zemu_admin_lock';
const PBKDF2_ITERATIONS = 100000;
const REMEMBER_DAYS = 7;
const LOCK_ATTEMPTS = 5;
const LOCK_MINUTES = 5;
const IDLE_MINUTES = 30;

let currentUser = null;
let idleTimer = null;
let lockTick = null;

function bufToHex(buf) {
    return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
}
function hexToBuf(hex) {
    const out = new Uint8Array(hex.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
    return out;
}
function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function getUsers() {
    try { const v = JSON.parse(localStorage.getItem(AUTH_USERS_KEY)); return Array.isArray(v) ? v : []; }
    catch (e) { return []; }
}
function saveUsers(users) { localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users)); }

async function pbkdf2Hash(password, saltHex, iterations) {
    if (!window.crypto || !crypto.subtle) throw new Error('Web Crypto desteklenmiyor');
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt: hexToBuf(saltHex), iterations: iterations || PBKDF2_ITERATIONS, hash: 'SHA-256' },
        key, 256
    );
    return bufToHex(bits);
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    if (btn) btn.innerHTML = show ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
}

// ── GİRİŞ KAPISI: admin.js DOMContentLoaded buraya gelir ──
window.adminBoot = async function () {
    const ok = await ensureAuthenticated();
    if (!ok) return;
    await loadAdminConfig();
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initTabs === 'function') initTabs();
    if (typeof initExportTabs === 'function') initExportTabs();
    if (typeof updateDashboard === 'function') updateDashboard();
    if (typeof renderCategoriesTable === 'function') renderCategoriesTable();
    if (typeof renderProjectsTable === 'function') renderProjectsTable();
    renderUsersTable();
    if (typeof populateCategorySelect === 'function') populateCategorySelect();
    if (typeof loadSiteSettings === 'function') loadSiteSettings();
    startIdleWatcher();
};

async function ensureAuthenticated() {
    if (!window.crypto || !crypto.subtle) {
        showAuthScreen('login');
        setAuthError('Bu tarayıcı Web Crypto API desteklemiyor. Güncel Chrome/Edge/Firefox kullanın.');
        return false;
    }
    const users = getUsers();
    if (users.length === 0) { showAuthScreen('register'); return false; }
    if (window.__justRegistered) {
        const u = window.__justRegistered;
        window.__justRegistered = null;
        await loginAs(u, false);
        return true;
    }
    const sessionUser = getSessionUser();
    if (sessionUser && users.some(function (u) { return u.username.toLowerCase() === sessionUser.toLowerCase(); })) {
        await loginAs(sessionUser, false);
        return true;
    }
    const remembered = getRememberedUser();
    if (remembered && users.some(function (u) { return u.username.toLowerCase() === remembered.toLowerCase(); })) {
        await loginAs(remembered, false);
        return true;
    }
    showAuthScreen('login');
    return false;
}

function getSessionUser() {
    try { const s = JSON.parse(sessionStorage.getItem(AUTH_SESSION_KEY)); return (s && s.username) ? s.username : null; }
    catch (e) { return null; }
}
function getRememberedUser() {
    try {
        const r = JSON.parse(localStorage.getItem(AUTH_REMEMBER_KEY));
        if (r && r.username && r.expires && Date.now() < r.expires) return r.username;
        localStorage.removeItem(AUTH_REMEMBER_KEY);
    } catch (e) { localStorage.removeItem(AUTH_REMEMBER_KEY); }
    return null;
}

function showAuthScreen(mode) {
    const overlay = document.getElementById('auth-overlay');
    if (overlay) overlay.classList.remove('hidden');
    const lf = document.getElementById('login-form');
    const rf = document.getElementById('register-form');
    if (lf) lf.style.display = mode === 'login' ? 'block' : 'none';
    if (rf) rf.style.display = mode === 'register' ? 'block' : 'none';
    setAuthError('');
    updateLockUI();
    const inp = document.getElementById(mode === 'login' ? 'auth-username' : 'reg-username');
    if (inp) setTimeout(function () { inp.focus(); }, 120);
}

function setAuthError(msg) {
    ['auth-error', 'reg-error'].forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.textContent = msg;
    });
}

function getLock() { try { return JSON.parse(localStorage.getItem(AUTH_LOCK_KEY)); } catch (e) { return null; } }
function isLocked() { const l = getLock(); return !!(l && l.until && Date.now() < l.until); }

function updateLockUI() {
    const el = document.getElementById('auth-lock');
    if (!el) return;
    const l = getLock();
    if (l && l.until && Date.now() < l.until) { el.style.display = 'block'; tickLockCountdown(); }
    else { el.style.display = 'none'; }
}

function tickLockCountdown() {
    if (lockTick) clearInterval(lockTick);
    const step = function () {
        const l = getLock();
        const el = document.getElementById('auth-lock');
        if (!l || !l.until || Date.now() >= l.until) {
            if (lockTick) clearInterval(lockTick);
            if (el) el.style.display = 'none';
            return;
        }
        const left = Math.ceil((l.until - Date.now()) / 1000);
        if (el) {
            el.style.display = 'block';
            el.textContent = 'Çok fazla hatalı deneme! ' + Math.ceil(left / 60) + ' dk ' + (left % 60) + ' sn sonra tekrar deneyin.';
        }
    };
    step();
    lockTick = setInterval(step, 1000);
}

async function attemptLogin() {
    if (isLocked()) { tickLockCountdown(); return; }
    const username = (document.getElementById('auth-username').value || '').trim();
    const password = document.getElementById('auth-password').value || '';
    const remember = document.getElementById('auth-remember').checked;
    if (!username || !password) { setAuthError('Kullanıcı adı ve şifre gerekli.'); return; }
    const users = getUsers();
    const user = users.find(function (u) { return u.username.toLowerCase() === username.toLowerCase(); });
    try {
        const hash = user ? await pbkdf2Hash(password, user.salt, user.iterations)
                           : await pbkdf2Hash(password, '0'.repeat(32));
        if (!user || hash !== user.hash) { failAttempt(); return; }
        localStorage.removeItem(AUTH_LOCK_KEY);
        await loginAs(user.username, remember);
    } catch (e) {
        console.error('Giriş hatası:', e);
        setAuthError('Giriş yapılamadı: ' + e.message);
    }
}

function failAttempt() {
    const l = getLock() || { attempts: 0, until: 0 };
    l.attempts = (l.attempts || 0) + 1;
    let msg = 'Kullanıcı adı veya şifre hatalı. Kalan deneme: ' + (LOCK_ATTEMPTS - l.attempts);
    if (l.attempts >= LOCK_ATTEMPTS) {
        l.until = Date.now() + LOCK_MINUTES * 60 * 1000;
        l.attempts = 0;
        msg = '';
        tickLockCountdown();
    }
    localStorage.setItem(AUTH_LOCK_KEY, JSON.stringify(l));
    setAuthError(msg);
}

async function loginAs(username, remember) {
    currentUser = username;
    sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ username: username, ts: Date.now() }));
    if (remember) {
        localStorage.setItem(AUTH_REMEMBER_KEY, JSON.stringify({ username: username, expires: Date.now() + REMEMBER_DAYS * 24 * 60 * 60 * 1000 }));
    }
    const overlay = document.getElementById('auth-overlay');
    if (overlay) overlay.classList.add('hidden');
    const container = document.getElementById('admin-container');
    if (container) container.style.visibility = 'visible';
    const label = document.getElementById('sidebar-username');
    if (label) label.innerHTML = '<i class="fas fa-user-circle"></i> ' + escapeHtml(username);
    if (typeof showToast === 'function') showToast('Hoş geldiniz, ' + username + '!', 'success');
}

function logout() {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    localStorage.removeItem(AUTH_REMEMBER_KEY);
    currentUser = null;
    stopIdleWatcher();
    const container = document.getElementById('admin-container');
    if (container) container.style.visibility = 'hidden';
    const au = document.getElementById('auth-username'); if (au) au.value = '';
    const ap = document.getElementById('auth-password'); if (ap) ap.value = '';
    const rm = document.getElementById('auth-remember'); if (rm) rm.checked = false;
    showAuthScreen('login');
    if (typeof showToast === 'function') showToast('Çıkış yapıldı.', '');
}

// ── 30 dakika hareketsizlik kilidi ──
function startIdleWatcher() {
    if (!window.__idleBound) {
        window.__idleBound = true;
        ['click', 'keydown', 'mousemove', 'touchstart', 'scroll'].forEach(function (ev) {
            document.addEventListener(ev, resetIdleTimer, { passive: true });
        });
    }
    resetIdleTimer();
}
function stopIdleWatcher() { if (idleTimer) clearTimeout(idleTimer); idleTimer = null; }
function resetIdleTimer() {
    if (!currentUser) return;
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
        sessionStorage.removeItem(AUTH_SESSION_KEY);
        localStorage.removeItem(AUTH_REMEMBER_KEY);
        currentUser = null;
        idleTimer = null;
        const container = document.getElementById('admin-container');
        if (container) container.style.visibility = 'hidden';
        showAuthScreen('login');
        setAuthError('30 dakika hareketsizlik nedeniyle otomatik çıkış yapıldı.');
    }, IDLE_MINUTES * 60 * 1000);
}

// ── İLK KURULUM: ilk yönetici hesabı ──
async function registerFirstUser() {
    const errEl = document.getElementById('reg-error');
    const username = (document.getElementById('reg-username').value || '').trim();
    const p1 = document.getElementById('reg-password').value || '';
    const p2 = document.getElementById('reg-password2').value || '';
    const err = validateUsername(username) || validatePasswordPair(p1, p2);
    if (err) { errEl.textContent = err; return; }
    try {
        const salt = bufToHex(crypto.getRandomValues(new Uint8Array(16)));
        const hash = await pbkdf2Hash(p1, salt);
        saveUsers([{ username: username, salt: salt, hash: hash, iterations: PBKDF2_ITERATIONS, createdAt: new Date().toISOString() }]);
        errEl.textContent = '';
        window.__justRegistered = username;
        adminBoot();
    } catch (e) {
        errEl.textContent = 'Hesap oluşturulamadı: ' + e.message;
    }
}

function validateUsername(u) {
    if (!u) return 'Kullanıcı adı gerekli.';
    if (u.length < 3 || u.length > 20) return 'Kullanıcı adı 3-20 karakter olmalı.';
    if (!/^[a-zA-Z0-9_.çğıöşüÇĞİÖŞÜ]+$/.test(u)) return 'Kullanıcı adı yalnızca harf, rakam, alt çizgi ve nokta içerebilir.';
    if (getUsers().some(function (x) { return x.username.toLowerCase() === u.toLowerCase(); })) return 'Bu kullanıcı adı zaten alınmış.';
    return '';
}
function validatePasswordPair(p1, p2) {
    if (p1.length < 6) return 'Şifre en az 6 karakter olmalı.';
    if (p1 !== p2) return 'Şifreler eşleşmiyor.';
    return '';
}

// ── KULLANICI YÖNETİMİ UI ──
function renderUsersTable() {
    const tbody = document.getElementById('users-table');
    if (!tbody) return;
    const users = getUsers();
    tbody.innerHTML = users.map(function (u) {
        const isSelf = currentUser && u.username.toLowerCase() === currentUser.toLowerCase();
        return '<tr>' +
            '<td><i class="fas fa-user"></i> ' + escapeHtml(u.username) + (isSelf ? ' <span class="you-badge">siz</span>' : '') + '</td>' +
            '<td>' + (u.createdAt ? new Date(u.createdAt).toLocaleDateString('tr-TR') : '-') + '</td>' +
            '<td>' +
            '<button class="btn btn-secondary btn-sm" onclick="openUserModal(\'password\', \'' + escapeHtml(u.username) + '\')" title="Şifre Değiştir"><i class="fas fa-key"></i></button> ' +
            '<button class="btn btn-danger btn-sm" ' + (isSelf ? 'disabled title="Kendinizi silemezsiniz"' : '') + ' onclick="deleteAdminUser(\'' + escapeHtml(u.username) + '\')" title="Sil"><i class="fas fa-trash"></i></button>' +
            '</td></tr>';
    }).join('');
}

function openUserModal(mode, target) {
    const modal = document.getElementById('user-modal');
    if (!modal) return;
    document.getElementById('user-mode').value = mode;
    document.getElementById('user-target').value = target || '';
    document.getElementById('user-modal-error').textContent = '';
    const unameField = document.getElementById('user-username-field');
    const oldField = document.getElementById('user-old-field');
    if (mode === 'add') {
        document.getElementById('user-modal-title').textContent = 'Kullanıcı Ekle';
        unameField.style.display = 'block';
        oldField.style.display = 'none';
        document.getElementById('user-username').value = '';
    } else {
        const isSelf = target && currentUser && target.toLowerCase() === currentUser.toLowerCase();
        document.getElementById('user-modal-title').textContent = 'Şifre Değiştir: ' + target;
        unameField.style.display = 'none';
        oldField.style.display = isSelf ? 'block' : 'none';
    }
    document.getElementById('user-new-pass').value = '';
    document.getElementById('user-new-pass2').value = '';
    document.getElementById('user-old-pass').value = '';
    modal.classList.add('active');
}

async function saveUserForm() {
    const errEl = document.getElementById('user-modal-error');
    errEl.textContent = '';
    const mode = document.getElementById('user-mode').value;
    const p1 = document.getElementById('user-new-pass').value || '';
    const p2 = document.getElementById('user-new-pass2').value || '';
    const pairErr = validatePasswordPair(p1, p2);
    if (pairErr) { errEl.textContent = pairErr; return; }
    const users = getUsers();
    const salt = bufToHex(crypto.getRandomValues(new Uint8Array(16)));
    const hash = await pbkdf2Hash(p1, salt);
    if (mode === 'add') {
        const username = (document.getElementById('user-username').value || '').trim();
        const uErr = validateUsername(username);
        if (uErr) { errEl.textContent = uErr; return; }
        users.push({ username: username, salt: salt, hash: hash, iterations: PBKDF2_ITERATIONS, createdAt: new Date().toISOString() });
        saveUsers(users);
        renderUsersTable();
        closeModal('user-modal');
        showToast('Kullanıcı eklendi: ' + username, 'success');
    } else {
        const target = document.getElementById('user-target').value;
        const idx = users.findIndex(function (u) { return u.username.toLowerCase() === target.toLowerCase(); });
        if (idx === -1) { errEl.textContent = 'Kullanıcı bulunamadı.'; return; }
        const isSelf = target.toLowerCase() === (currentUser || '').toLowerCase();
        if (isSelf) {
            const oldHash = await pbkdf2Hash(document.getElementById('user-old-pass').value || '', users[idx].salt, users[idx].iterations);
            if (oldHash !== users[idx].hash) { errEl.textContent = 'Mevcut şifreniz hatalı.'; return; }
        }
        users[idx].salt = salt; users[idx].hash = hash; users[idx].iterations = PBKDF2_ITERATIONS;
        saveUsers(users);
        renderUsersTable();
        closeModal('user-modal');
        showToast('Şifre güncellendi: ' + target, 'success');
    }
}

function deleteAdminUser(username) {
    const users = getUsers();
    if (username.toLowerCase() === (currentUser || '').toLowerCase()) { showToast('Kendinizi silemezsiniz!', 'error'); return; }
    if (users.length <= 1) { showToast('Son kalan kullanıcı silinemez!', 'error'); return; }
    if (!confirm('"' + username + '" kullanıcısı silinsin mi?')) return;
    saveUsers(users.filter(function (u) { return u.username.toLowerCase() !== username.toLowerCase(); }));
    renderUsersTable();
    showToast('Kullanıcı silindi.', 'success');
}

// Enter ile giriş / kayıt
document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    const overlay = document.getElementById('auth-overlay');
    if (!overlay || overlay.classList.contains('hidden')) return;
    const lf = document.getElementById('login-form');
    if (lf && lf.style.display !== 'none') attemptLogin(); else registerFirstUser();
});

// ── GELİŞTİRİLMİŞ CONFIG YÜKLEYİCİ (admin.js sürümünü geçersiz kılar) ──
async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
}

async function loadAdminConfig() {
    if (window.location.protocol === 'file:') {
        console.error('❌ Admin panel file:// ile açılamaz! VS Code > Live Server ile açın.');
        if (typeof showToast === 'function') showToast('file:// ile açılamaz — Live Server kullanın!', 'error');
    }
    // 1) localStorage (şema doğrulamalı)
    try {
        const saved = localStorage.getItem('admin_siteConfig');
        if (saved) {
            const parsed = JSON.parse(saved);
            const valid = parsed && parsed.site && parsed.categories && Array.isArray(parsed.categories.categories)
                && parsed.projects && Array.isArray(parsed.projects.projects)
                && parsed.i18n && parsed.i18n.tr;
            if (valid) { console.log('✓ Config localStorage\'dan yüklendi'); adminConfig = parsed; return parsed; }
            console.warn('⚠ localStorage şeması eski/bozuk — temizleniyor');
            localStorage.removeItem('admin_siteConfig');
        }
    } catch (e) {
        console.warn('⚠ localStorage bozuk:', e);
        localStorage.removeItem('admin_siteConfig');
    }
    // 2) JSON dosyaları — tek tek, hatalar raporlanır
    const wanted = [
        ['site', '../config/site.json'],
        ['categories', '../config/categories.json'],
        ['projects', '../config/projects.json'],
        ['i18n', '../config/i18n.json']
    ];
    const got = {};
    const errors = [];
    for (const item of wanted) {
        try { got[item[0]] = await fetchJSON(item[1]); }
        catch (e) { errors.push(item[0] + ' (' + e.message + ')'); }
    }
    if (errors.length) console.error('❌ JSON dosyaları yüklenemedi:', errors.join(', '));
    // 3) config.js yedeği (index.html içindeki module script FALLBACK_CONFIG set eder)
    const fb = window.FALLBACK_CONFIG || null;
    const config = {
        site: got.site || (fb ? { formSubmission: fb.formSubmission, contact: fb.contact, homeHero: fb.homeHero } : null),
        categories: got.categories || (fb && fb.categories ? { categories: Object.entries(fb.categories).map(function (kv, i) { return { id: kv[0], order: i + 1, items: kv[1] }; }) } : { categories: [] }),
        projects: got.projects || (fb ? { projects: fb.projects || [] } : { projects: [] }),
        i18n: got.i18n || (fb ? fb.i18n : { tr: { menu: {} }, en: { menu: {} } })
    };
    if (errors.length === 0) {
        try { localStorage.setItem('admin_siteConfig', JSON.stringify(config)); } catch (e) {}
    } else if (typeof showToast === 'function') {
        showToast('Bazı config dosyaları yüklenemedi — yedek kullanılıyor', 'error');
    }
    adminConfig = config; return config;
}
