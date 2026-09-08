// ═══════════════════════════════════════════════════════════
// ZEMU SIPPAN Admin Panel v2.1 - Panel Mantigi
// NOT: Config yukleme auth.js'teki loadAdminConfig ile yapilir;
//      adminConfig global degiskeni orada doldurulur.
// ═══════════════════════════════════════════════════════════

let adminConfig = {
    site: null,
    categories: { categories: [] },
    projects: { projects: [] },
    i18n: { tr: { menu: {}, pageTitles: {} }, en: { menu: {}, pageTitles: {} } }
};
let currentExportFile = 'site.json';

document.addEventListener('DOMContentLoaded', function () { window.adminBoot(); });

// ── Yardimcilar ──
function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function slugify(s) {
    return String(s || '').toLowerCase()
        .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o')
        .replace(/ş/g, 's').replace(/ü/g, 'u')
        .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').substring(0, 40);
}
function resolveImageUrl(v) {
    v = String(v || '').trim();
    if (!v) return '';
    if (/^(https?:)?\/\//i.test(v) || v.indexOf('data:') === 0) return v;
    if (/^\.?\/?images\//i.test(v)) return './' + v.replace(/^\.?\//, '');
    return './images/' + v.replace(/^\.?\//, '');
}
function knownImages() {
    const set = ['logo.png'];
    (adminConfig.projects.projects || []).forEach(function (p) {
        if (p.mainImage && set.indexOf(p.mainImage) === -1) set.push(p.mainImage);
        (p.images || []).forEach(function (x) { if (x && set.indexOf(x) === -1) set.push(x); });
    });
    return set;
}

function saveToLocalStorage() {
    try {
        localStorage.setItem('admin_siteConfig', JSON.stringify(adminConfig));
        const el = document.getElementById('stat-last-update');
        if (el) el.textContent = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    } catch (e) { console.warn('Kaydetme hatasi:', e); }
}

function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(function (item) {
        item.addEventListener('click', function () { showSection(item.dataset.section); });
    });
}
function showSection(sectionId) {
    document.querySelectorAll('.nav-item').forEach(function (i) { i.classList.remove('active'); });
    document.querySelectorAll('.section').forEach(function (s) { s.classList.remove('active'); });
    const nav = document.querySelector('[data-section="' + sectionId + '"]');
    if (nav) nav.classList.add('active');
    const sec = document.getElementById(sectionId);
    if (sec) sec.classList.add('active');
    if (sectionId === 'export') generateExport();
    if (sectionId === 'users' && typeof renderUsersTable === 'function') renderUsersTable();
}

function initTabs() {
    document.querySelectorAll('.tab').forEach(function (tab) {
        if (tab.classList.contains('export-tab')) return;
        tab.addEventListener('click', function () {
            const parent = tab.parentElement;
            parent.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');
            if (tab.dataset.projectTab) {
                document.querySelectorAll('.project-tab').forEach(function (t) { t.style.display = 'none'; });
                const target = document.getElementById('project-tab-' + tab.dataset.projectTab);
                if (target) target.style.display = 'block';
            }
        });
    });
}

function initExportTabs() {
    document.querySelectorAll('.export-tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.export-tab').forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');
            currentExportFile = tab.dataset.file;
            generateExport();
        });
    });
}

function updateDashboard() {
    const c = document.getElementById('stat-categories');
    const p = document.getElementById('stat-projects');
    if (c) c.textContent = (adminConfig.categories.categories || []).length;
    if (p) p.textContent = (adminConfig.projects.projects || []).length;
}

// ── KATEGORILER ──
function renderCategoriesTable() {
    const tbody = document.getElementById('categories-table');
    if (!tbody) return;
    const cats = (adminConfig.categories.categories || []).slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    if (!cats.length) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#999;padding:20px;">Henuz kategori yok — Yeni Ekle ile baslayin</td></tr>'; return; }
    tbody.innerHTML = cats.map(function (cat, i) {
        const labelTr = (cat.label && cat.label.tr) || (adminConfig.i18n.tr.menu || {})[cat.id] || (cat.items && cat.items[0] && cat.items[0].tr) || cat.id;
        const labelEn = (cat.label && cat.label.en) || (adminConfig.i18n.en.menu || {})[cat.id] || (cat.items && cat.items[0] && cat.items[0].en) || cat.id;
        const pcount = (adminConfig.projects.projects || []).filter(function (p) { return p.category === cat.id; }).length;
        return '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td><code>' + esc(cat.id) + '</code></td>' +
            '<td>' + esc(labelTr) + '</td>' +
            '<td>' + esc(labelEn) + '</td>' +
            '<td>' + pcount + '</td>' +
            '<td>' +
            '<button class="btn btn-secondary btn-sm" onclick="moveCategory(\'' + esc(cat.id) + '\',-1)" title="Yukari"><i class="fas fa-arrow-up"></i></button> ' +
            '<button class="btn btn-secondary btn-sm" onclick="moveCategory(\'' + esc(cat.id) + '\',1)" title="Asagi"><i class="fas fa-arrow-down"></i></button> ' +
            '<button class="btn btn-secondary btn-sm" onclick="editCategory(\'' + esc(cat.id) + '\')" title="Duzenle"><i class="fas fa-edit"></i></button> ' +
            '<button class="btn btn-danger btn-sm" onclick="deleteCategory(\'' + esc(cat.id) + '\')" title="Sil"><i class="fas fa-trash"></i></button>' +
            '</td></tr>';
    }).join('');
}

function moveCategory(id, dir) {
    const cats = adminConfig.categories.categories || [];
    cats.sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    const idx = cats.findIndex(function (c) { return c.id === id; });
    const j = idx + dir;
    if (idx < 0 || j < 0 || j >= cats.length) return;
    const tmp = cats[idx]; cats[idx] = cats[j]; cats[j] = tmp;
    cats.forEach(function (c, i) { c.order = i + 1; });
    saveToLocalStorage();
    renderCategoriesTable();
}

// ── Kategori Modal ──
function openCategoryModal(id) {
    id = id || null;
    const modal = document.getElementById('category-modal');
    if (!modal) return;
    const title = document.getElementById('category-modal-title');
    const list = document.getElementById('category-items-list');
    list.innerHTML = '';
    document.getElementById('category-edit-id').value = id || '';
    if (id) {
        const cat = (adminConfig.categories.categories || []).find(function (c) { return c.id === id; });
        if (!cat) { showToast('Kategori bulunamadi', 'error'); return; }
        title.textContent = 'Kategori Duzenle: ' + ((cat.label && cat.label.tr) || cat.id);
        document.getElementById('category-id-input').value = cat.id;
        document.getElementById('category-tr').value = (cat.label && cat.label.tr) || (adminConfig.i18n.tr.menu || {})[cat.id] || (cat.items && cat.items[0] && cat.items[0].tr) || '';
        document.getElementById('category-en').value = (cat.label && cat.label.en) || (adminConfig.i18n.en.menu || {})[cat.id] || (cat.items && cat.items[0] && cat.items[0].en) || '';
        (cat.items || []).forEach(function (it) { addCategoryItemRow(it); });
    } else {
        title.textContent = 'Yeni Kategori Ekle';
        document.getElementById('category-id-input').value = '';
        document.getElementById('category-tr').value = '';
        document.getElementById('category-en').value = '';
        addCategoryItemRow();
    }
    modal.classList.add('active');
}

function addCategoryItemRow(data) {
    data = data || {};
    const list = document.getElementById('category-items-list');
    if (!list) return;
    const row = document.createElement('div');
    row.className = 'cat-item-row';
    row.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr 34px;gap:8px;margin-bottom:8px;';
    row.innerHTML =
        '<input type="text" class="ci-id" placeholder="ID (bos=otomatik)" value="' + esc(data.id || '') + '">' +
        '<input type="text" class="ci-tr" placeholder="TR ad" value="' + esc(data.tr || '') + '">' +
        '<input type="text" class="ci-en" placeholder="EN ad" value="' + esc(data.en || '') + '">' +
        '<button type="button" class="btn btn-danger btn-sm" onclick="removeItemRow(this)" title="Satiri Sil"><i class="fas fa-times"></i></button>';
    list.appendChild(row);
}
function removeItemRow(btn) { const r = btn.closest('.cat-item-row'); if (r) r.remove(); }

function saveCategory() {
    const editId = document.getElementById('category-edit-id').value;
    const trName = document.getElementById('category-tr').value.trim();
    const enName = document.getElementById('category-en').value.trim();
    if (!trName || !enName) { showToast('Kategori TR ve EN adlari zorunlu', 'error'); return; }
    const rows = document.querySelectorAll('#category-items-list .cat-item-row');
    const items = [];
    let dupItem = null;
    rows.forEach(function (row) {
        const iTr = row.querySelector('.ci-tr').value.trim();
        const iEn = row.querySelector('.ci-en').value.trim();
        if (!iTr && !iEn) return;
        let iId = row.querySelector('.ci-id').value.trim() || slugify(iTr) || ('oge-' + (items.length + 1));
        if (items.some(function (it) { return it.id === iId; })) dupItem = iId;
        items.push({ id: iId, tr: iTr || iEn, en: iEn || iTr });
    });
    if (dupItem) { showToast('Alt oge ID tekrar ediyor: ' + dupItem, 'error'); return; }

    const cats = adminConfig.categories.categories || [];
    const oldCat = editId ? cats.find(function (c) { return c.id === editId; }) : null;
    const newId = (document.getElementById('category-id-input').value || '').trim() || slugify(trName);
    if (cats.some(function (c) { return c.id === newId && c !== oldCat; })) { showToast('Bu kategori ID zaten kullaniliyor: ' + newId, 'error'); return; }

    const cat = { id: newId, order: oldCat ? oldCat.order : (cats.length + 1), label: { tr: trName, en: enName }, items: items };
    if (oldCat) {
        if (oldCat.id !== newId) {
            (adminConfig.projects.projects || []).forEach(function (p) {
                if (p.category === oldCat.id) p.category = newId;
                if (p.pageMenu === oldCat.id) p.pageMenu = newId;
            });
            ['tr', 'en'].forEach(function (lang) {
                const menu = adminConfig.i18n[lang] && adminConfig.i18n[lang].menu;
                if (menu && menu[oldCat.id] !== undefined) { menu[newId] = menu[oldCat.id]; delete menu[oldCat.id]; }
            });
        }
        cats[cats.indexOf(oldCat)] = cat;
    } else {
        cats.push(cat);
    }
    ['tr', 'en'].forEach(function (lang) {
        if (!adminConfig.i18n[lang]) adminConfig.i18n[lang] = { menu: {}, pageTitles: {} };
        if (!adminConfig.i18n[lang].menu) adminConfig.i18n[lang].menu = {};
        adminConfig.i18n[lang].menu[newId] = lang === 'tr' ? trName : enName;
    });
    saveToLocalStorage();
    renderCategoriesTable(); updateDashboard(); populateCategorySelect();
    closeModal('category-modal');
    showToast('Kategori kaydedildi: ' + trName, 'success');
}

function editCategory(id) { openCategoryModal(id); }

function deleteCategory(id) {
    const cats = adminConfig.categories.categories || [];
    const pcount = (adminConfig.projects.projects || []).filter(function (p) { return p.category === id; }).length;
    const msg = pcount ? ('"' + id + '" kategorisinde ' + pcount + ' proje var. Silinirse projeler kategorisiz kalir. Devam edilsin mi?') : ('"' + id + '" kategorisi silinsin mi?');
    if (!confirm(msg)) return;
    adminConfig.categories.categories = cats.filter(function (c) { return c.id !== id; });
    adminConfig.categories.categories.forEach(function (c, i) { c.order = i + 1; });
    saveToLocalStorage();
    renderCategoriesTable(); updateDashboard(); populateCategorySelect();
    showToast('Kategori silindi', 'success');
}

function populateCategorySelect() {
    const select = document.getElementById('project-category');
    if (!select) return;
    const cats = adminConfig.categories.categories || [];
    select.innerHTML = cats.map(function (c) {
        const lbl = (c.label && c.label.tr) || (adminConfig.i18n.tr.menu || {})[c.id] || c.id;
        return '<option value="' + esc(c.id) + '">' + esc(lbl) + '</option>';
    }).join('');
}

// ── PROJELER ──
function renderProjectsTable() {
    const tbody = document.getElementById('projects-table');
    if (!tbody) return;
    const projects = adminConfig.projects.projects || [];
    if (!projects.length) { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#999;padding:20px;">Henuz proje yok — Yeni Ekle ile baslayin</td></tr>'; return; }
    tbody.innerHTML = projects.map(function (p) {
        const src = resolveImageUrl(p.mainImage);
        const title = (p.title && p.title.tr) || p.titleEn || p.id;
        return '<tr>' +
            '<td>' + (src ? '<img src="' + esc(src) + '" style="width:60px;height:40px;object-fit:cover;border-radius:4px;" onerror="this.style.visibility=\'hidden\'">' : '<i class="fas fa-image" style="color:#ccc;"></i>') + '</td>' +
            '<td>' + esc(title) + '</td>' +
            '<td>' + esc(p.category || '-') + '</td>' +
            '<td>' + esc((p.price && p.price.tr) || p.price || '-') + '</td>' +
            '<td>' +
            '<button class="btn btn-secondary btn-sm" onclick="moveProject(\'' + esc(p.id) + '\',-1)" title="Yukari"><i class="fas fa-arrow-up"></i></button> ' +
            '<button class="btn btn-secondary btn-sm" onclick="moveProject(\'' + esc(p.id) + '\',1)" title="Asagi"><i class="fas fa-arrow-down"></i></button> ' +
            '<button class="btn btn-secondary btn-sm" onclick="editProject(\'' + esc(p.id) + '\')" title="Duzenle"><i class="fas fa-edit"></i></button> ' +
            '<button class="btn btn-danger btn-sm" onclick="deleteProject(\'' + esc(p.id) + '\')" title="Sil"><i class="fas fa-trash"></i></button>' +
            '</td></tr>';
    }).join('');
}

function moveProject(id, dir) {
    const projects = adminConfig.projects.projects || [];
    const idx = projects.findIndex(function (p) { return p.id === id; });
    const j = idx + dir;
    if (idx < 0 || j < 0 || j >= projects.length) return;
    const tmp = projects[idx]; projects[idx] = projects[j]; projects[j] = tmp;
    saveToLocalStorage();
    renderProjectsTable();
}

function openProjectModal(id) {
    id = id || null;
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    populateCategorySelect();
    const sug = document.getElementById('image-suggestions');
    if (sug) sug.innerHTML = knownImages().map(function (x) { return '<option value="' + esc(x) + '">'; }).join('');
    if (id) {
        const p = (adminConfig.projects.projects || []).find(function (pr) { return pr.id === id; });
        if (!p) { showToast('Proje bulunamadi', 'error'); return; }
        document.getElementById('project-modal-title').textContent = 'Proje Duzenle: ' + ((p.title && p.title.tr) || p.id);
        document.getElementById('project-edit-id').value = p.id;
        document.getElementById('project-id').value = p.id;
        document.getElementById('project-category').value = p.category || '';
        document.getElementById('project-title-tr').value = (p.title && p.title.tr) || '';
        document.getElementById('project-title-en').value = (p.title && p.title.en) || p.titleEn || '';
        const priceNum = parseFloat(String((p.price && p.price.tr) || '').replace(/[^0-9,.]/g, '').replace(',', '.'));
        document.getElementById('project-price').value = isNaN(priceNum) ? '' : priceNum;
        document.getElementById('project-sqm').value = p.sqm || '';
        document.getElementById('project-main-image').value = p.mainImage || '';
        document.getElementById('project-gallery').value = (p.images || []).join('\n');
        document.getElementById('project-desc-tr').value = (p.description && p.description.tr) || '';
        document.getElementById('project-desc-en').value = (p.description && p.description.en) || '';
        document.getElementById('project-features').value = (p.features || []).map(function (f) { return (f.icon || 'fa-check') + '|' + ((f.text && f.text.tr) || '') + '|' + ((f.text && f.text.en) || ''); }).join('\n');
        updateImagePreview();
    } else {
        document.getElementById('project-modal-title').textContent = 'Yeni Proje Ekle';
        document.getElementById('project-edit-id').value = '';
        ['project-id', 'project-title-tr', 'project-title-en', 'project-price', 'project-sqm', 'project-main-image', 'project-gallery', 'project-desc-tr', 'project-desc-en', 'project-features'].forEach(function (i) { document.getElementById(i).value = ''; });
        document.getElementById('main-image-preview').innerHTML = '<div class="placeholder"><i class="fas fa-image"></i><br>Gorsel URL veya dosya adi</div>';
        if (!(adminConfig.categories.categories || []).length) showToast('Once bir kategori ekleyin', 'error');
    }
    modal.classList.add('active');
}

function updateImagePreview() {
    const preview = document.getElementById('main-image-preview');
    if (!preview) return;
    const url = resolveImageUrl(document.getElementById('project-main-image').value);
    if (url) {
        preview.innerHTML = '<img src="' + esc(url) + '" alt="Onizleme" onerror="imagePreviewError(this)">';
    } else {
        preview.innerHTML = '<div class="placeholder"><i class="fas fa-image"></i><br>Gorsel URL veya dosya adi</div>';
    }
}
function imagePreviewError(img) {
    img.parentElement.innerHTML = '<div class="placeholder"><i class="fas fa-exclamation-triangle"></i><br>Gorsel bulunamadi — dosya adini kontrol edin</div>';
}

function editProject(id) { openProjectModal(id); }

function deleteProject(id) {
    if (!confirm('"' + id + '" projesi silinsin mi?')) return;
    adminConfig.projects.projects = (adminConfig.projects.projects || []).filter(function (p) { return p.id !== id; });
    saveToLocalStorage();
    renderProjectsTable(); updateDashboard();
    showToast('Proje silindi', 'success');
}

function showProjectTab(name) {
    document.querySelectorAll('.project-tab').forEach(function (t) { t.style.display = 'none'; });
    const t = document.getElementById('project-tab-' + name);
    if (t) t.style.display = 'block';
    document.querySelectorAll('[data-project-tab]').forEach(function (tb) { tb.classList.toggle('active', tb.dataset.projectTab === name); });
}

function saveProject() {
    const editId = document.getElementById('project-edit-id').value;
    const category = document.getElementById('project-category').value;
    const titleTr = document.getElementById('project-title-tr').value.trim();
    const titleEn = document.getElementById('project-title-en').value.trim() || titleTr;
    const price = document.getElementById('project-price').value.trim();
    const sqm = document.getElementById('project-sqm').value.trim();
    const mainImageRaw = document.getElementById('project-main-image').value.trim();
    const galleryText = document.getElementById('project-gallery').value.trim();
    const descTr = document.getElementById('project-desc-tr').value.trim();
    const descEn = document.getElementById('project-desc-en').value.trim() || descTr;
    const featuresText = document.getElementById('project-features').value.trim();

    if (!titleTr) { showToast('Proje basligi (TR) zorunlu', 'error'); showProjectTab('general'); return; }
    if (!category) { showToast('Kategori secin (once kategori ekleyin)', 'error'); showProjectTab('general'); return; }

    const id = (document.getElementById('project-id').value || '').trim() || slugify(titleTr);
    const conflict = (adminConfig.projects.projects || []).some(function (p) { return p.id === id && p.id !== editId; });
    if (conflict) { showToast('Bu proje ID zaten kullaniliyor: ' + id, 'error'); return; }

    const mainImage = resolveImageUrl(mainImageRaw);
    const gallery = galleryText ? galleryText.split('\n').map(function (s) { return resolveImageUrl(s.trim()); }).filter(Boolean) : [];
    const finalMain = mainImage || gallery[0] || '';
    const features = featuresText ? featuresText.split('\n').map(function (line) {
        const parts = line.split('|');
        return { icon: (parts[0] || 'fa-check').trim(), text: { tr: (parts[1] || '').trim(), en: (parts[2] || '').trim() } };
    }).filter(function (f) { return f.text.tr || f.text.en; }) : [];

    const project = {
        id: id, category: category,
        title: { tr: titleTr, en: titleEn },
        titleEn: titleEn,
        mainImage: finalMain,
        images: gallery.length ? gallery : (finalMain ? [finalMain] : []),
        price: { tr: price ? price + ' €' : 'Teklif Alin', en: price ? price + ' €' : 'Get Quote' },
        sqm: sqm || '',
        description: { tr: descTr, en: descEn },
        features: features,
        pageMenu: category,
        content: { tr: '<h2>' + titleTr + '</h2><p>' + descTr + '</p>', en: '<h2>' + titleEn + '</h2><p>' + descEn + '</p>' }
    };
    const projects = adminConfig.projects.projects = adminConfig.projects.projects || [];
    if (editId) {
        const idx = projects.findIndex(function (p) { return p.id === editId; });
        if (idx >= 0) projects[idx] = project; else projects.push(project);
    } else {
        projects.push(project);
    }
    saveToLocalStorage();
    renderProjectsTable(); updateDashboard();
    closeModal('project-modal');
    showToast('Proje kaydedildi: ' + titleTr, 'success');
}

// ── SITE AYARLARI ──
function setVal(id, v) { const el = document.getElementById(id); if (el) el.value = (v == null) ? '' : v; }
function getVal(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }

function loadSiteSettings() {
    const site = adminConfig.site;
    if (!site) return;
    const c = site.contact || {};
    setVal('setting-phone', c.phone); setVal('setting-email', c.email); setVal('setting-address', c.address);
    if (c.social) { setVal('setting-facebook', c.social.facebook); setVal('setting-instagram', c.social.instagram); }
    const h = site.homeHero || {};
    if (h.slogan) { setVal('setting-slogan-tr', h.slogan.tr); setVal('setting-slogan-en', h.slogan.en); }
    if (h.subSlogan) { setVal('setting-subslogan-tr', h.subSlogan.tr); setVal('setting-subslogan-en', h.subSlogan.en); }
}

function saveSiteSettings() {
    if (!adminConfig.site) adminConfig.site = {};
    adminConfig.site.contact = Object.assign({}, adminConfig.site.contact || {}, {
        phone: getVal('setting-phone'),
        email: getVal('setting-email'),
        address: getVal('setting-address'),
        social: Object.assign({}, (adminConfig.site.contact || {}).social || {}, {
            facebook: getVal('setting-facebook'),
            instagram: getVal('setting-instagram')
        })
    });
    saveToLocalStorage();
    showToast('Iletisim ayarlari kaydedildi', 'success');
}

function saveHeroSettings() {
    if (!adminConfig.site) adminConfig.site = {};
    adminConfig.site.homeHero = Object.assign({}, adminConfig.site.homeHero || {}, {
        slogan: { tr: getVal('setting-slogan-tr'), en: getVal('setting-slogan-en') },
        subSlogan: { tr: getVal('setting-subslogan-tr'), en: getVal('setting-subslogan-en') }
    });
    saveToLocalStorage();
    showToast('Hero ayarlari kaydedildi', 'success');
}

// ── DISA AKTARMA ──
function mergedI18n() {
    const i18n = JSON.parse(JSON.stringify(adminConfig.i18n || {}));
    ['tr', 'en'].forEach(function (lang) {
        if (!i18n[lang]) i18n[lang] = { menu: {} };
        if (!i18n[lang].menu) i18n[lang].menu = {};
        (adminConfig.categories.categories || []).forEach(function (cat) {
            const lbl = cat.label && (lang === 'tr' ? cat.label.tr : cat.label.en);
            const fb = cat.items && cat.items[0] && (lang === 'tr' ? cat.items[0].tr : cat.items[0].en);
            if (lbl || fb) i18n[lang].menu[cat.id] = lbl || fb;
        });
    });
    return i18n;
}
function exportData(file) {
    if (file === 'site') return adminConfig.site || {};
    if (file === 'categories') return adminConfig.categories || { categories: [] };
    if (file === 'projects') return adminConfig.projects || { projects: [] };
    if (file === 'i18n') return mergedI18n();
    return {};
}
function generateExport() {
    const el = document.getElementById('code-preview');
    if (el) el.textContent = JSON.stringify(exportData(currentExportFile.replace('.json', '')), null, 2);
}
function downloadFile(filename) {
    const data = JSON.stringify(exportData(filename.replace('.json', '')), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(filename + ' indirildi — config/ klasorune koyun', 'success');
}
function copyCode() {
    const code = document.getElementById('code-preview').textContent;
    navigator.clipboard.writeText(code).then(function () { showToast('Kod kopyalandi!', 'success'); }, function () { showToast('Kopyalanamadi', 'error'); });
}
function resetData() {
    if (!confirm('Panel verileri sifirlanip config JSON dosyalarindan yeniden yuklenecek. Devam edilsin mi?')) return;
    localStorage.removeItem('admin_siteConfig');
    location.reload();
}

function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('active'); }
function showToast(msg, type) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'toast show ' + (type || '');
    setTimeout(function () { toast.className = 'toast'; }, 3000);
}

document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.classList.remove('active'); });
});
document.addEventListener('DOMContentLoaded', function () {
    const mi = document.getElementById('project-main-image');
    if (mi) mi.addEventListener('input', updateImagePreview);
});
