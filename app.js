import { siteConfig } from './config.js';

const state = {
    lang: 'tr',       
    currentView: 'sip-panel', // Artık ilk açılış sayfası SİP PANEL
    activeCategory: null,     
    sliderInterval: null,
    mobileMenuOpen: false,
    sortBy: 'default',
    lightboxImages: [],
    currentLightboxIndex: 0,
    activeGalleryIndex: 0
};

const DOM = {
    topBar: document.getElementById('top-bar'),
    header: document.getElementById('main-header'),
    content: document.getElementById('app-content'),
    footer: document.getElementById('main-footer')
};

function t() { return siteConfig.i18n[state.lang]; }

function updateDocumentTitle(viewOrId) {
    const baseTitle = "Muhammet Tutkun A.Ş";
    let subTitle = "";
    if (['sip-panel', 'ev-modelleri', 'bahce-yapilari', 'garaj-sistemleri', 'uretim', 'galeri', 'hakkimizda'].includes(viewOrId)) {
        subTitle = t().pageTitles[viewOrId];
    } else {
        const project = siteConfig.projects.find(p => p.id === viewOrId);
        if (project) subTitle = state.lang === 'tr' ? project.title : project.titleEn;
    }
    document.title = subTitle ? `${subTitle} | ${baseTitle}` : baseTitle;
}

export function navigate(viewOrId, evt = null) {
    if (evt) evt.preventDefault(); 
    if (state.currentView === viewOrId) return; 

    state.mobileMenuOpen = false; 
    state.activeCategory = null; // Sayfa değiştiğinde filtreyi sıfırla
    if (state.sliderInterval) { clearInterval(state.sliderInterval); state.sliderInterval = null; }

    state.currentView = viewOrId;
    
    DOM.content.classList.remove('page-fade-in');
    DOM.content.classList.add('page-fade-out');
    
    renderHeader();
    updateDocumentTitle(viewOrId);

    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
        
        // YENİ MANTIK: 4 adet ana proje sayfamız var
        if (['sip-panel', 'ev-modelleri', 'bahce-yapilari', 'garaj-sistemleri'].includes(viewOrId)) {
            renderProjectsPage(viewOrId);
        } 
        else if (['uretim', 'galeri', 'hakkimizda'].includes(viewOrId)) {
            renderGenericPage(viewOrId);
        } else {
            renderProjectDetail(viewOrId);
        }

        DOM.content.classList.remove('page-fade-out');
        DOM.content.classList.add('page-fade-in');
    }, 300); 
}

export function changeLanguage(lang) {
    if (state.lang === lang) return;
    state.lang = lang;
    document.documentElement.lang = lang; 
    
    renderTopBar();
    renderHeader();
    updateDocumentTitle(state.currentView);
    navigate(state.currentView);
    renderFooter();
}

window.navigate = navigate;
window.changeLanguage = changeLanguage;

window.filterCategory = function(catId, evt) {
    if(evt) evt.preventDefault();
    state.activeCategory = catId === 'all' ? null : catId;
    
    // Eğer proje detayındaysa, kategoriye tıklayınca bağlı olduğu ana menüye dön
    if (!['sip-panel', 'ev-modelleri', 'bahce-yapilari', 'garaj-sistemleri'].includes(state.currentView)) {
        // En basit yol sip-panel'e dönüp oradan filtrelemek
        state.currentView = 'sip-panel';
    }
    renderProjectsPage(state.currentView);
};

window.toggleMobileMenu = function() {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    renderHeader(); 
};

window.sortProjects = function(sortBy) {
    state.sortBy = sortBy;
    renderProjectsPage(state.currentView);
};

window.changeMainImage = function(src) {
    const mainImg = document.getElementById('detail-main-image');
    if(mainImg) {
        mainImg.style.opacity = 0.3; 
        setTimeout(() => { mainImg.src = src; mainImg.style.opacity = 1; }, 300); 
    }
};

window.setGalleryImage = function(index) {
    if (state.sliderInterval) { clearInterval(state.sliderInterval); state.sliderInterval = null; }
    state.activeGalleryIndex = index;
    window.changeMainImage(state.lightboxImages[index]);
};

window.openLightboxCurrent = function() {
    if (state.sliderInterval) { clearInterval(state.sliderInterval); state.sliderInterval = null; }
    window.openLightbox(state.activeGalleryIndex);
};

window.openLightbox = function(startIndex) {
    const overlay = document.getElementById('lightbox-overlay');
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    
    state.currentLightboxIndex = startIndex;
    img.src = state.lightboxImages[startIndex];
    counter.innerText = `${startIndex + 1} / ${state.lightboxImages.length}`;
    
    overlay.classList.add('active');
    document.addEventListener('keydown', window.handleLightboxKeys);
};

window.closeLightbox = function() {
    document.getElementById('lightbox-overlay').classList.remove('active');
    document.removeEventListener('keydown', window.handleLightboxKeys);
};

window.changeLightboxImage = function(direction) {
    state.currentLightboxIndex += direction;
    if (state.currentLightboxIndex < 0) state.currentLightboxIndex = state.lightboxImages.length - 1;
    else if (state.currentLightboxIndex >= state.lightboxImages.length) state.currentLightboxIndex = 0;
    
    const img = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    
    img.style.opacity = 0;
    img.style.transform = direction > 0 ? 'translateX(50px) scale(0.9)' : 'translateX(-50px) scale(0.9)';
    
    setTimeout(() => {
        img.src = state.lightboxImages[state.currentLightboxIndex];
        img.style.opacity = 1;
        img.style.transform = 'translateX(0) scale(1)';
        counter.innerText = `${state.currentLightboxIndex + 1} / ${state.lightboxImages.length}`;
    }, 200);
};

window.handleLightboxKeys = function(e) {
    if (e.key === 'Escape') window.closeLightbox();
    if (e.key === 'ArrowRight') window.changeLightboxImage(1);
    if (e.key === 'ArrowLeft') window.changeLightboxImage(-1);
};

document.getElementById('lightbox-overlay')?.addEventListener('click', function(e) {
    if (e.target === this) window.closeLightbox();
});

window.shareProject = function(evt) {
    evt.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast(state.lang === 'tr' ? 'Bağlantı kopyalandı!' : 'Link copied!');
    });
};

function showToast(message) {
    const toast = document.getElementById('toast-message');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

window.formatPhone = function(input) {
    let x = input.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    input.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '');
};

window.submitTestForm = function(evt, form) {
    evt.preventDefault();
    const inputs = form.querySelectorAll('input');
    const message = `TALEBİ\nİsim: ${inputs[0].value}\nTel: ${inputs[1].value}`;
    window.open(`https://wa.me/905308321046?text=${encodeURIComponent(message)}`, '_blank');
    document.getElementById('alert-modal').classList.add('active');
    form.reset(); 
};

function renderTopBar() {
    DOM.topBar.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 flex justify-end items-center">
            <div class="flex space-x-6">
                <span><i class="fas fa-phone-alt text-brand-orange mr-2"></i>${siteConfig.contact.phone}</span>
                <span><i class="fas fa-envelope text-brand-orange mr-2"></i>${siteConfig.contact.email}</span>
            </div>
        </div>
    `;
}

function renderHeader() {
    const menuItems = ['sip-panel', 'ev-modelleri', 'bahce-yapilari', 'garaj-sistemleri', 'uretim', 'galeri', 'hakkimizda'];

    const desktopMenuHTML = menuItems.map(id => {
        const isActive = state.currentView === id;
        return `<a href="#" onclick="navigate('${id}', event)" class="text-sm lg:text-base font-bold text-gray-800 hover:text-brand-orange nav-link transition-colors ${isActive ? 'active' : ''}">${t().menu[id]}</a>`;
    }).join('');

    const mobileMenuHTML = menuItems.map(id => {
        const isActive = state.currentView === id;
        return `<a href="#" onclick="navigate('${id}', event)" class="block px-4 py-3 rounded-sm text-lg font-bold btn-press ${isActive ? 'bg-brand-orange text-white' : 'text-gray-800 hover:bg-gray-50'} transition">${t().menu[id]}</a>`;
    }).join('');

    // Dışarı taşan devasa yuvarlak logo tasarımı
    DOM.header.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center relative z-50">
            
            <!-- PREMIUM YUVARLAK LOGO (Dışarı Taşan) -->
            <div class="absolute -top-2 md:-top-4 left-4 md:left-8 w-24 h-24 md:w-36 md:h-36 bg-white rounded-full border-4 border-white shadow-xl z-[100] overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 btn-press" onclick="navigate('sip-panel')">
                <img src="${siteConfig.contact.logoSrc}" alt="Muhammet Tutkun A.Ş" class="w-[90%] h-[90%] object-contain rounded-full">
            </div>
            
            <!-- Logodan dolayı menüyü sağa iten margin (ml-32 / md:ml-48) -->
            <nav class="hidden xl:flex space-x-6 items-center ml-48">
                ${desktopMenuHTML}
            </nav>
            
            <div class="hidden xl:flex items-center space-x-4 ml-auto">
                <div class="flex space-x-2 text-sm font-bold bg-gray-50 rounded-full px-3 py-1 border border-gray-100">
                    <span class="cursor-pointer transition hover:text-brand-orange btn-press ${state.lang === 'tr' ? 'text-brand-orange' : 'text-gray-400'}" onclick="changeLanguage('tr')">TR</span>
                    <span class="text-gray-300">|</span>
                    <span class="cursor-pointer transition hover:text-brand-orange btn-press ${state.lang === 'en' ? 'text-brand-orange' : 'text-gray-400'}" onclick="changeLanguage('en')">EN</span>
                </div>
            </div>
            
            <!-- Mobil Hamburger Butonu (Sağda) -->
            <button onclick="window.toggleMobileMenu()" class="xl:hidden ml-auto text-3xl text-gray-800 hover:text-brand-orange focus:outline-none transition-transform duration-200 btn-press ${state.mobileMenuOpen ? 'rotate-90' : ''}">
                <i class="fas ${state.mobileMenuOpen ? 'fa-times' : 'fa-bars'}"></i>
            </button>
        </div>

        <!-- Mobil Menü -->
        <div class="${state.mobileMenuOpen ? 'max-h-screen opacity-100 shadow-xl border-b border-gray-100 py-6' : 'max-h-0 opacity-0 pointer-events-none py-0'} xl:hidden absolute top-full left-0 w-full bg-white overflow-hidden transition-all duration-300 ease-in-out z-40">
            <div class="flex flex-col px-4 space-y-2">
                ${mobileMenuHTML}
                <div class="flex justify-center space-x-6 pt-6 border-t border-gray-100 mt-4">
                    <span class="cursor-pointer font-black text-xl btn-press ${state.lang === 'tr' ? 'text-brand-orange border-b-2 border-brand-orange' : 'text-gray-400'}" onclick="changeLanguage('tr')">TR</span>
                    <span class="cursor-pointer font-black text-xl btn-press ${state.lang === 'en' ? 'text-brand-orange border-b-2 border-brand-orange' : 'text-gray-400'}" onclick="changeLanguage('en')">EN</span>
                </div>
            </div>
        </div>
    `;
}

function renderGenericPage(pageId) {
    const title = t().pageTitles[pageId] || '';
    const content = t().pageContents[pageId] || '';

    DOM.content.innerHTML = `
        <div class="max-w-4xl mx-auto py-20 px-4">
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-wide inline-block relative">
                    ${title}
                    <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-brand-orange rounded-full"></div>
                </h1>
            </div>
            <div class="text-lg text-gray-700 leading-relaxed space-y-6 bg-white p-8 md:p-12 shadow-sm border border-gray-50 rounded-sm">
                ${content}
            </div>
        </div>
    `;
}

// YENİ: Akıllı Proje Sayfaları (Sip Panel, Ev, Bahçe, Garaj aynı mantıkla çalışır)
function renderProjectsPage(pageId) {
    // 1. O sayfaya ait projeleri filtrele (pageMenu özelliğine bakarak)
    let pageProjects = siteConfig.projects.filter(p => p.pageMenu === pageId);
    
    // 2. Eğer kullanıcı soldan bir kategori seçtiyse onu da filtrele
    if (state.activeCategory) {
        pageProjects = pageProjects.filter(p => p.categoryId === state.activeCategory);
    }

    // 3. Sıralama İşlemi
    if (state.sortBy === 'areaAsc') pageProjects.sort((a, b) => a.area - b.area);
    else if (state.sortBy === 'areaDesc') pageProjects.sort((a, b) => b.area - a.area);

    // Kategori Menüsü (Sol Taraf)
    const allCatActive = state.activeCategory === null;
    const allCategoriesHTML = `
        <button onclick="filterCategory(null, event)" class="w-full text-left px-5 py-3 border-b border-transparent md:border-gray-100 transition font-bold btn-press ${allCatActive ? 'bg-brand-orange text-white rounded-sm shadow-md' : 'text-gray-600 hover:text-brand-orange'}">
            ${t().allProjectsTitle}
        </button>
    ` + siteConfig.categories.map(cat => {
        const isActive = state.activeCategory === cat.id;
        return `
        <button onclick="filterCategory('${cat.id}', event)" class="w-full text-left px-5 py-3 border-b border-transparent md:border-gray-100 transition font-semibold btn-press ${isActive ? 'bg-brand-orange text-white rounded-sm shadow-md' : 'text-gray-500 hover:text-brand-orange'}">
            ${cat[state.lang]}
        </button>
    `}).join('');

    // Proje Kartları
    const projectsHTML = pageProjects.length > 0 ? pageProjects.map(project => `
        <div class="project-card bg-white border border-gray-100 cursor-pointer group rounded-sm btn-press overflow-hidden flex flex-col" onclick="navigate('${project.id}')">
            <div class="relative aspect-[4/3] overflow-hidden">
                <img src="${project.mainImage}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out">
                <div class="absolute top-4 right-4 bg-brand-orange text-white px-3 py-1 font-black rounded shadow-lg z-10 text-sm">
                    ${project.area} ${t().sqm}
                </div>
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 flex items-center justify-center backdrop-blur-[1px]">
                    <span class="bg-white text-gray-900 px-6 py-2 rounded-full font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300 shadow-2xl">
                        ${t().projectDetailsTitle} <i class="fas fa-arrow-right ml-2 text-brand-orange"></i>
                    </span>
                </div>
            </div>
            <div class="p-6 bg-white flex-grow flex items-center justify-between">
                <h3 class="text-gray-900 font-black text-xl group-hover:text-brand-orange transition">${state.lang === 'tr' ? project.title : project.titleEn}</h3>
            </div>
        </div>
    `).join('') : `<div class="col-span-full text-center py-20 text-gray-400 font-medium text-lg bg-gray-50 rounded-sm border border-dashed border-gray-200"><i class="fas fa-folder-open text-4xl mb-3 block"></i>Bu kategoride henüz proje eklenmemiş.</div>`;

    // EĞER SAYFA "sip-panel" İSE, ÜSTE DEV HERO (TAM EKRAN) EKLENECEK
    let heroHTML = '';
    if (pageId === 'sip-panel') {
        heroHTML = `
            <div class="relative w-full h-[60vh] lg:h-[75vh] flex items-center justify-center bg-gray-900 overflow-hidden shadow-2xl mb-12">
                <img src="${siteConfig.homeHero.backgroundImage}" class="absolute inset-0 w-full h-full object-cover opacity-60 transform scale-105 hover:scale-100 transition duration-[2s]">
                <div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark opacity-80"></div>
                
                <div class="relative z-10 text-center px-4 max-w-5xl mx-auto transform translate-y-4">
                    <div class="inline-block px-4 py-1 border-2 border-brand-orange text-brand-orange font-black tracking-widest uppercase mb-6 rounded-full text-sm">
                        Muhammet Tutkun A.Ş.
                    </div>
                    <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl leading-tight tracking-tighter">
                        ${siteConfig.homeHero.slogan[state.lang]}
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-200 font-medium drop-shadow-md max-w-2xl mx-auto">
                        ${siteConfig.homeHero.subSlogan[state.lang]}
                    </p>
                    <button onclick="document.getElementById('projects-grid').scrollIntoView({behavior: 'smooth'})" class="mt-12 w-16 h-16 rounded-full border-2 border-white text-white flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 btn-press animate-bounce mx-auto">
                        <i class="fas fa-arrow-down text-2xl"></i>
                    </button>
                </div>
            </div>
            ${t().pageContents['sip-panel-intro']}
        `;
    }

    // Ana HTML (Hero + Konteyner + İçerik)
    DOM.content.innerHTML = `
        ${heroHTML}
        
        <div id="projects-grid" class="max-w-7xl mx-auto px-4 py-8">
            ${pageId !== 'sip-panel' ? `
                <div class="mb-12">
                    <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight">${t().pageTitles[pageId]}</h1>
                    <div class="w-20 h-1.5 bg-brand-orange rounded-full"></div>
                </div>
            ` : ''}

            <div class="flex flex-col lg:flex-row gap-10">
                <!-- Sol Filtre Menüsü -->
                <div class="w-full lg:w-1/4">
                    <div class="bg-gray-50 p-2 md:p-4 rounded-sm border border-gray-100 lg:sticky lg:top-32 shadow-sm">
                        <h2 class="font-black text-gray-900 mb-4 px-3 text-lg border-l-4 border-brand-orange hidden lg:block">${t().categoryTitle}</h2>
                        <div class="flex flex-row overflow-x-auto no-scrollbar lg:flex-col gap-2 pb-2 lg:pb-0">
                            ${allCategoriesHTML}
                        </div>
                    </div>
                </div>
                
                <!-- Sağ Proje Listesi -->
                <div class="w-full lg:w-3/4">
                    <div class="flex justify-between items-center mb-6 bg-white p-4 rounded-sm border border-gray-100 shadow-sm">
                        <span class="text-sm font-bold text-gray-500">${pageProjects.length} Sonuç</span>
                        <select onchange="window.sortProjects(this.value)" class="bg-gray-50 border-none text-gray-700 font-bold text-sm rounded focus:ring-2 focus:ring-brand-orange py-2 px-4 cursor-pointer outline-none btn-press">
                            <option value="default" ${state.sortBy === 'default' ? 'selected' : ''}>Varsayılan</option>
                            <option value="areaAsc" ${state.sortBy === 'areaAsc' ? 'selected' : ''}>m² (Artan)</option>
                            <option value="areaDesc" ${state.sortBy === 'areaDesc' ? 'selected' : ''}>m² (Azalan)</option>
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        ${projectsHTML}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderProjectDetail(projectId) {
    const project = siteConfig.projects.find(p => p.id === projectId);
    if (!project) return navigate('sip-panel'); 

    const prjTitle = state.lang === 'tr' ? project.title : project.titleEn;
    const prjDesc = project.description[state.lang];

    const fullGallery = [project.mainImage, ...(project.gallery || []).filter(img => img !== project.mainImage)];
    
    state.lightboxImages = fullGallery;
    state.activeGalleryIndex = 0; 
    
    if (state.sliderInterval) clearInterval(state.sliderInterval);
    state.sliderInterval = setInterval(() => {
        state.activeGalleryIndex = (state.activeGalleryIndex + 1) % state.lightboxImages.length;
        window.changeMainImage(state.lightboxImages[state.activeGalleryIndex]);
    }, 4000);

    const thumbnailsHTML = fullGallery.map((img, index) => `
        <div class="w-20 md:w-full aspect-square shrink-0 overflow-hidden rounded-sm border-2 border-transparent hover:border-brand-orange transition cursor-pointer btn-press"
             onclick="window.setGalleryImage(${index})">
             <img src="${img}" alt="Galeri ${index+1}" class="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity">
        </div>
    `).join('');

    DOM.content.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-12">
            <div class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 class="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-2">${prjTitle}</h1>
                    <div class="flex items-center text-sm font-bold text-gray-400 space-x-2 uppercase">
                        <span class="cursor-pointer hover:text-brand-orange btn-press" onclick="navigate('${project.pageMenu}')">${t().menu[project.pageMenu]}</span>
                        <i class="fas fa-chevron-right text-[10px]"></i>
                        <span class="text-brand-orange">${prjTitle}</span>
                    </div>
                </div>
                
                <div class="flex space-x-3">
                    <button onclick="window.shareProject(event)" class="bg-white border-2 border-gray-100 hover:border-brand-orange text-gray-700 px-5 py-2.5 rounded-sm font-bold transition flex items-center shadow-sm btn-press">
                        <i class="fas fa-share-alt md:mr-2"></i> <span class="hidden md:inline">Paylaş</span>
                    </button>
                    <button onclick="navigate('${project.pageMenu}')" class="bg-brand-dark text-white px-5 py-2.5 rounded-sm font-bold hover:bg-gray-800 transition flex items-center shadow-md btn-press">
                        <i class="fas fa-arrow-left md:mr-2"></i> <span class="hidden md:inline">${t().backBtn}</span>
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                
                <div class="lg:col-span-2 flex flex-col md:flex-row gap-4">
                    <div class="w-full md:w-24 flex md:flex-col gap-3 overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0">
                        ${thumbnailsHTML}
                    </div>
                    <div class="flex-grow group relative rounded-sm shadow-xl overflow-hidden bg-gray-100">
                        <div class="w-full aspect-[4/3] cursor-zoom-in" onclick="window.openLightboxCurrent()">
                            <img id="detail-main-image" src="${project.mainImage}" alt="${prjTitle}" class="w-full h-full object-cover transition-all duration-300 hover:scale-105">
                            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300 flex items-center justify-center pointer-events-none">
                                <div class="bg-white text-gray-900 w-16 h-16 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition duration-300 shadow-2xl">
                                    <i class="fas fa-expand text-2xl text-brand-orange"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-1 space-y-8">
                    <!-- Üst Bilgi Kartı -->
                    <div class="bg-white shadow-xl rounded-sm border border-gray-100 overflow-hidden">
                        <div class="flex items-center justify-between p-6 border-b border-gray-50 bg-gray-50">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 rounded-full bg-brand-orange bg-opacity-10 flex items-center justify-center">
                                    <i class="fas fa-ruler-combined text-brand-orange"></i>
                                </div>
                                <span class="text-gray-500 font-bold">${t().totalArea}</span>
                            </div>
                            <span class="font-black text-2xl text-gray-900">${project.area} <span class="text-sm text-brand-orange">m²</span></span>
                        </div>
                        <div class="flex items-center justify-between p-6">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 rounded-full bg-brand-orange bg-opacity-10 flex items-center justify-center">
                                    <i class="fas fa-door-open text-brand-orange"></i>
                                </div>
                                <span class="text-gray-500 font-bold">${t().roomCount}</span>
                            </div>
                            <span class="font-black text-2xl text-gray-900">${project.rooms}</span>
                        </div>
                    </div>

                    <!-- Fiyat Alma Formu -->
                    <div class="bg-brand-dark p-8 rounded-sm shadow-2xl relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-brand-orange rounded-full opacity-10 transform translate-x-10 -translate-y-10"></div>
                        <h3 class="text-2xl font-black text-white mb-6 relative z-10">${t().getQuoteTitle}</h3>
                        
                        <form class="space-y-4 relative z-10" onsubmit="window.submitTestForm(event, this)">
                            <div>
                                <input type="text" placeholder="${t().formName}" required
                                    class="w-full px-5 py-4 bg-gray-800 border-none text-white rounded focus:outline-none focus:ring-2 focus:ring-brand-orange transition font-bold placeholder-gray-500">
                            </div>
                            <div>
                                <input type="tel" placeholder="${t().formPhone}" required oninput="window.formatPhone(this)" maxlength="15"
                                    class="w-full px-5 py-4 bg-gray-800 border-none text-white rounded focus:outline-none focus:ring-2 focus:ring-brand-orange transition font-bold tracking-widest placeholder-gray-500">
                            </div>
                            <button type="submit" 
                                class="w-full bg-brand-orange text-white font-black py-4 rounded transition-all shadow-lg hover:shadow-brand-orange/50 mt-2 flex justify-center items-center btn-press">
                                <i class="fas fa-paper-plane mr-3 text-lg"></i> ${t().submitBtn}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="bg-white p-10 md:p-14 rounded-sm border border-gray-100 shadow-xl max-w-4xl relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1.5 h-full bg-brand-orange"></div>
                <h3 class="text-2xl font-black mb-6 text-gray-900 uppercase tracking-widest">${t().projectDetailsTitle}</h3>
                <p class="text-gray-600 leading-relaxed text-lg font-medium">${prjDesc}</p>
            </div>
        </div>
    `;
}

function renderFooter() {
    DOM.footer.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-6">
            <img src="${siteConfig.contact.logoSrc}" alt="Muhammet Tutkun A.Ş" class="h-16 w-16 object-contain rounded-full shadow-lg border-2 border-gray-700 cursor-pointer btn-press transition-transform hover:scale-110" onclick="navigate('sip-panel')">
            <p class="text-sm text-gray-500 font-bold uppercase tracking-widest">${t().footerText}</p>
        </div>
    `;
}

function initApp() {
    renderTopBar();
    renderHeader();
    renderFooter();
    
    // Sistem ilk açıldığında doğrudan SİP PANEL sayfasına gidiyor
    state.currentView = 'sip-panel';
    renderProjectsPage('sip-panel');
    updateDocumentTitle('sip-panel'); 
    
    DOM.content.classList.remove('page-fade-out');
    DOM.content.classList.add('page-fade-in');
}

window.addEventListener('DOMContentLoaded', initApp);
