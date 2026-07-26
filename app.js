import { siteConfig } from './config.js';

const state = {
    lang: 'tr',       
    currentView: 'home', // Ana sayfa girişi
    activeCategory: null,     
    sliderInterval: null,
    mobileMenuOpen: false,    
    openAccordion: null,      
    sortBy: 'default',
    lightboxImages: [],
    currentLightboxIndex: 0,
    activeGalleryIndex: 0
};

window.state = state;

const DOM = {
    header: document.getElementById('main-header'),
    content: document.getElementById('app-content'),
    footer: document.getElementById('main-footer')
};

function t() { return siteConfig.i18n[state.lang]; }

function updateDocumentTitle(viewOrId) {
    const baseTitle = "Kartech Panel Structures House Systems";
    let subTitle = "";
    if (['home', 'sip-panel', 'ev-modelleri', 'bahce-yapilari', 'garaj-sistemleri', 'uretim', 'galeri', 'hakkimizda', 'iletisim'].includes(viewOrId)) {
        subTitle = t().pageTitles[viewOrId];
    } else {
        const project = siteConfig.projects.find(p => p.id === viewOrId);
        if (project) subTitle = state.lang === 'tr' ? project.title : project.titleEn;
    }
    document.title = subTitle ? `${subTitle} | ${baseTitle}` : baseTitle;
}

export function navigate(viewOrId, evt = null, keepCategory = false) {
    if (evt) evt.preventDefault(); 
    
    // İletişim butonundan gelen yönlendirmeyi yönet
    if (viewOrId === 'contact') viewOrId = 'iletisim';

    if (state.mobileMenuOpen) window.toggleMobileMenu();

    if (state.currentView === viewOrId && !keepCategory && !state.activeCategory) return; 

    // Eğer dışarıdan veya logodan tıklanırsa filtreyi sıfırla, menüden filtrelendiyse koru
    if (!keepCategory) state.activeCategory = null; 
    
    if (state.sliderInterval) { clearInterval(state.sliderInterval); state.sliderInterval = null; }

    state.currentView = viewOrId;
    
    DOM.content.classList.remove('page-fade-in');
    DOM.content.classList.add('page-fade-out');
    
    renderHeader();
    updateDocumentTitle(viewOrId);

    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
        
        if (viewOrId === 'home') {
            renderHomePage();
        } else if (viewOrId === 'sip-panel') {
            renderSipPanelPage();
        } else if (viewOrId === 'iletisim') {
            renderContactPage();
        } else if (['ev-modelleri', 'bahce-yapilari', 'garaj-sistemleri'].includes(viewOrId)) {
            renderProjectsPage(viewOrId);
        } else if (['uretim', 'galeri', 'hakkimizda'].includes(viewOrId)) {
            renderGenericPage(viewOrId);
        } else {
            renderProjectDetail(viewOrId);
        }

        DOM.content.classList.remove('page-fade-out');
        DOM.content.classList.add('page-fade-in');
        
        window.dispatchEvent(new Event('scroll'));
    }, 350); 
}

export function changeLanguage(lang) {
    if (state.lang === lang) return;
    state.lang = lang;
    document.documentElement.lang = lang; 
    navigate(state.currentView, null, true);
    renderFooter();
}

window.navigate = navigate;
window.changeLanguage = changeLanguage;

window.filterAndNavigate = function(menuId, catId, evt) {
    if(evt) { evt.preventDefault(); evt.stopPropagation(); }
    if (state.mobileMenuOpen) window.toggleMobileMenu();
    state.activeCategory = catId === 'all' ? null : catId;
    
    if (state.currentView !== menuId) {
        navigate(menuId, null, true); 
    } else {
        renderProjectsPage(menuId);
        setTimeout(() => {
             const grid = document.getElementById('projects-grid');
             if(grid) grid.scrollIntoView({behavior: 'smooth', block: 'start'});
        }, 100);
    }
};

window.filterCategory = function(catId, evt) {
    if(evt) evt.preventDefault();
    state.activeCategory = catId === 'all' ? null : catId;
    if (!['ev-modelleri', 'bahce-yapilari', 'garaj-sistemleri'].includes(state.currentView)) {
        state.currentView = 'ev-modelleri';
    }
    renderProjectsPage(state.currentView);
};

window.sortProjects = function(sortBy) { state.sortBy = sortBy; renderProjectsPage(state.currentView); };

window.toggleMobileMenu = function() {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    const overlay = document.getElementById('vg-overlay-bg');
    if(state.mobileMenuOpen) {
        state.openAccordion = null; 
        document.body.classList.add('menu-open');
        document.querySelectorAll('.accordion-content').forEach(el => el.classList.remove('open'));
        document.querySelectorAll('.accordion-icon').forEach(el => el.classList.remove('rotate-180'));
        if (overlay) overlay.classList.add('active');
    } else {
        document.body.classList.remove('menu-open');
        if (overlay) overlay.classList.remove('active');
    }
};

window.toggleAccordion = function(menuId, evt) {
    if (evt) { evt.preventDefault(); evt.stopPropagation(); }
    const targetContent = document.getElementById(`accordion-${menuId}`);
    const targetIcon = document.getElementById(`icon-${menuId}`);
    if (state.openAccordion === menuId) {
        state.openAccordion = null;
        if (targetContent) targetContent.classList.remove('open');
        if (targetIcon) targetIcon.classList.remove('rotate-180');
    } else {
        document.querySelectorAll('.accordion-content').forEach(el => el.classList.remove('open'));
        document.querySelectorAll('.accordion-icon').forEach(el => el.classList.remove('rotate-180'));
        state.openAccordion = menuId;
        if (targetContent) targetContent.classList.add('open');
        if (targetIcon) targetIcon.classList.add('rotate-180');
    }
};

window.closeMenuFromOutside = function(e) { if(e.target.id === 'vg-overlay-bg') window.toggleMobileMenu(); };

window.changeMainImage = function(src) {
    const mainImg = document.getElementById('detail-main-image');
    if(mainImg) {
        mainImg.style.opacity = 0; mainImg.style.transform = 'scale(0.95)';
        setTimeout(() => { mainImg.src = src; mainImg.style.opacity = 1; mainImg.style.transform = 'scale(1)'; }, 300); 
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
    state.currentLightboxIndex = startIndex;
    document.getElementById('lightbox-img').src = state.lightboxImages[startIndex];
    document.getElementById('lightbox-counter').innerText = `${startIndex + 1} / ${state.lightboxImages.length}`;
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
    img.style.opacity = 0;
    img.style.transform = direction > 0 ? 'translateX(100px) scale(0.9)' : 'translateX(-100px) scale(0.9)';
    setTimeout(() => {
        img.src = state.lightboxImages[state.currentLightboxIndex];
        img.style.opacity = 1; img.style.transform = 'translateX(0) scale(1)';
        document.getElementById('lightbox-counter').innerText = `${state.currentLightboxIndex + 1} / ${state.lightboxImages.length}`;
    }, 250);
};

window.handleLightboxKeys = function(e) {
    if (e.key === 'Escape') window.closeLightbox();
    if (e.key === 'ArrowRight') window.changeLightboxImage(1);
    if (e.key === 'ArrowLeft') window.changeLightboxImage(-1);
};

window.shareProject = function(evt) {
    evt.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(() => showToast(state.lang === 'tr' ? 'Bağlantı kopyalandı!' : 'Link copied!'));
};

function showToast(message) {
    const toast = document.getElementById('toast-message');
    toast.innerHTML = `<i class="fas fa-check-circle mr-2 text-brand-green"></i>${message}`;
    toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000);
}

window.formatPhone = function(input) {
    let x = input.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    input.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '');
};

window.submitTestForm = function(evt, form) {
    evt.preventDefault();
    const inputs = form.querySelectorAll('input');
    const message = `SİTE TALEBİ\nİsim: ${inputs[0].value}\nTel: ${inputs[1].value}`;
    window.open(`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    document.getElementById('alert-modal').classList.add('active');
    form.reset(); 
};

function renderHeader() {
    const menuItems = ['home', 'sip-panel', 'ev-modelleri', 'bahce-yapilari', 'garaj-sistemleri', 'uretim', 'galeri', 'hakkimizda'];

    const overlayMenuHTML = menuItems.map(id => {
        const isProjectMenu = ['ev-modelleri', 'bahce-yapilari', 'garaj-sistemleri'].includes(id);
        const label = t().menu[id];
        if (isProjectMenu) {
            const categories = siteConfig.categories[id] || [];
            const isOpen = state.openAccordion === id;
            return `
            <div class="mb-3 md:mb-5">
               <div class="flex items-center justify-between cursor-pointer group w-full max-w-sm" onclick="window.toggleAccordion('${id}', event)">
                   <span class="text-2xl md:text-4xl font-semibold text-gray-300 group-hover:text-white transition">${label}</span>
                   <i id="icon-${id}" class="accordion-icon fas fa-chevron-down text-base md:text-xl text-gray-500 group-hover:text-white transition transform ${isOpen ? 'rotate-180' : ''}"></i>
               </div>
               <div id="accordion-${id}" class="accordion-content ${isOpen ? 'open' : ''} pl-4 md:pl-6 border-l border-gray-700 ml-2 flex flex-col">
                   <a href="#" class="text-base md:text-xl text-gray-400 hover:text-brand-orange cursor-pointer font-medium py-1.5" onclick="window.filterAndNavigate('${id}', 'all', event)">${t().allProjectsTitle}</a>
                   ${categories.map(cat => `<a href="#" class="text-base md:text-xl text-gray-400 hover:text-brand-orange cursor-pointer font-medium py-1.5" onclick="window.filterAndNavigate('${id}', '${cat.id}', event)">${cat[state.lang]}</a>`).join('')}
               </div>
            </div>`;
        } else {
            return `<div class="mb-3 md:mb-5"><a href="#" onclick="navigate('${id}', event)" class="text-2xl md:text-4xl font-semibold text-gray-300 hover:text-white transition inline-block">${label}</a></div>`;
        }
    }).join('');

    DOM.header.innerHTML = `
        <div class="max-w-[1400px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between relative z-50">
            <div class="cursor-pointer h-full flex items-center py-2" onclick="navigate('home')">
                 <img src="${siteConfig.contact.logoSrc}" alt="Kartech Panel" class="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105 mix-blend-multiply">
            </div>
            
            <div class="flex items-center space-x-3 md:space-x-4 ml-auto">
                <div class="hidden sm:flex space-x-3 text-white social-icons mr-2 transition-colors duration-300">
                    <a href="${siteConfig.contact.social.instagram}" target="_blank" class="hover:text-brand-orange text-lg sm:text-xl transition-colors header-icon"><i class="fab fa-instagram"></i></a>
                    <a href="${siteConfig.contact.social.facebook}" target="_blank" class="hover:text-brand-orange text-lg sm:text-xl transition-colors header-icon"><i class="fab fa-facebook-f"></i></a>
                </div>
                <button onclick="navigate('iletisim')" class="hidden md:block bg-brand-orange hover:bg-orange-500 text-white font-semibold py-2 px-5 sm:px-6 rounded-full shadow-md transition-all btn-press text-xs sm:text-sm whitespace-nowrap">
                    ${t().consultBtn}
                </button>
                <button onclick="window.toggleMobileMenu()" class="w-10 h-10 md:w-12 md:h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white hover:bg-brand-orange shadow-lg transition-all duration-300 btn-press focus:outline-none shrink-0 z-[101]">
                    <i class="fas fa-bars text-base sm:text-lg pointer-events-none"></i>
                </button>
            </div>
        </div>

        <div id="vg-overlay-bg" onclick="window.closeMenuFromOutside(event)" class="vg-overlay">
            <div class="w-full p-4 sm:p-6 md:p-8 flex justify-end items-center shrink-0">
                <div class="flex items-center space-x-4 md:space-x-6">
                    <button onclick="window.toggleMobileMenu()" class="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all duration-300 btn-press z-[105]">
                        <i class="fas fa-times text-xl sm:text-2xl pointer-events-none"></i>
                    </button>
                </div>
            </div>
            <div class="w-full flex-grow px-6 sm:px-12 md:px-24 lg:px-40 flex flex-col justify-start pt-6 sm:pt-10 pb-24 overflow-y-auto no-scrollbar">
                ${overlayMenuHTML}
                <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 flex items-center space-x-6 w-max shrink-0">
                    <div class="flex space-x-4">
                        <span class="cursor-pointer font-bold text-base sm:text-lg btn-press ${state.lang === 'tr' ? 'text-brand-orange' : 'text-gray-500'}" onclick="changeLanguage('tr')">TR</span>
                        <span class="text-gray-700">|</span>
                        <span class="cursor-pointer font-bold text-base sm:text-lg btn-press ${state.lang === 'en' ? 'text-brand-orange' : 'text-gray-500'}" onclick="changeLanguage('en')">EN</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    window.dispatchEvent(new Event('scroll'));
}

function handleScroll() {
    const btn = document.getElementById('btn-scroll-top');
    if (window.scrollY > 400) btn?.classList.add('visible');
    else btn?.classList.remove('visible');

    const header = document.getElementById('main-header');
    if(!header) return;
    const icons = header.querySelectorAll('.header-icon');
    
    const hasHero = ['home', 'sip-panel'].includes(state.currentView);

    if (window.scrollY > 50) {
        header.classList.remove('bg-transparent');
        header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
        icons.forEach(icon => { icon.classList.remove('text-white'); icon.classList.add('text-gray-900'); });
    } else {
        header.classList.add('bg-transparent');
        header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
        if(hasHero) {
            icons.forEach(icon => { icon.classList.remove('text-gray-900'); icon.classList.add('text-white'); });
        } else {
            icons.forEach(icon => { icon.classList.remove('text-white'); icon.classList.add('text-gray-900'); });
        }
    }
}

function renderHomePage() {
    const pageProjects = [...siteConfig.projects].sort(() => 0.5 - Math.random()).slice(0, 3);
    const projectsHTML = pageProjects.map(project => `
        <div class="project-card bg-white border border-gray-100 cursor-pointer rounded-2xl btn-press overflow-hidden flex flex-col group" onclick="navigate('${project.id}')">
            <div class="relative aspect-[4/3] overflow-hidden">
                <img src="${project.mainImage}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-400 flex items-center justify-center">
                     <span class="bg-brand-orange text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-bold opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-400 shadow-2xl text-sm md:text-base">${t().projectDetailsTitle}</span>
                </div>
            </div>
            <div class="p-4 sm:p-5 md:p-6 bg-white flex-grow flex items-center justify-between border-t border-gray-50">
                <h3 class="text-gray-900 font-bold text-base sm:text-lg md:text-xl group-hover:text-brand-orange transition-colors truncate pr-2">${state.lang === 'tr' ? project.title : project.titleEn}</h3>
                <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors shrink-0"><i class="fas fa-chevron-right text-xs sm:text-sm"></i></div>
            </div>
        </div>
    `).join('');

    DOM.content.innerHTML = `
        <div class="relative w-full h-[100vh] flex overflow-hidden">
            <div class="absolute inset-0 z-0"><img src="${siteConfig.homeHero.backgroundImage}" class="w-full h-full object-cover"></div>
            <div class="relative z-10 w-full md:w-[75%] lg:w-[60%] h-full bg-[#1a201c]/40 backdrop-blur-sm flex flex-col justify-center px-4 sm:px-10 md:px-16 pt-20">
                <div class="max-w-2xl transform">
                    <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-lg">${siteConfig.homeHero.slogan[state.lang]}</h1>
                    <p class="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 font-medium drop-shadow-md">${siteConfig.homeHero.subSlogan[state.lang]}</p>
                    <button onclick="navigate('ev-modelleri')" class="mt-6 sm:mt-8 md:mt-10 bg-brand-orange text-white font-bold px-5 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:bg-orange-500 transition-all btn-press text-xs sm:text-sm md:text-base">
                        Projeleri İncele <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="bg-white relative z-20 w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6">
            ${t().pageContents['home-intro']}
            <div class="max-w-[1400px] mx-auto mt-6 sm:mt-8 md:mt-12">
                <h2 class="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-6 md:mb-8 text-center md:text-left">Öne Çıkan Projeler</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">${projectsHTML}</div>
            </div>
        </div>
    `;
}

function renderSipPanelPage() {
    const data = t().sipPanelData;
    
    const advantagesHTML = data.advantages.map(adv => `
        <div class="bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-md border-t-4 border-brand-orange hover:shadow-xl transition-shadow group">
            <div class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-orange-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <i class="fas ${adv.icon} text-lg sm:text-xl md:text-2xl text-brand-orange group-hover:text-white"></i>
            </div>
            <h4 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">${adv.title}</h4>
            <p class="text-xs sm:text-sm md:text-base text-gray-600">${adv.desc}</p>
        </div>
    `).join('');

    const specsHTML = data.technicalSpecs.map(spec => `
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 sm:py-3 md:py-4 border-b border-gray-100 last:border-0 gap-1 sm:gap-4">
            <span class="font-bold text-gray-700 text-xs sm:text-sm md:text-base w-full sm:w-1/3">${spec.label}</span>
            <span class="text-gray-500 font-medium text-xs sm:text-sm md:text-base w-full sm:w-2/3 sm:text-right">${spec.value}</span>
        </div>
    `).join('');

    DOM.content.innerHTML = `
        <div class="relative w-full h-[50vh] md:h-[60vh] flex overflow-hidden">
            <div class="absolute inset-0 z-0">
                <img src="${data.heroImg}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/60"></div>
            </div>
            <div class="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 sm:px-6">
                <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 tracking-tight">${t().pageTitles['sip-panel']}</h1>
                <div class="w-12 sm:w-16 md:w-24 h-1 md:h-1.5 bg-brand-orange rounded-full"></div>
            </div>
        </div>

        <div class="bg-gray-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
            <div class="max-w-[1200px] mx-auto space-y-12 sm:space-y-16 md:space-y-20">
                
                <div class="bg-white p-5 sm:p-8 md:p-16 rounded-2xl md:rounded-3xl shadow-xl flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center">
                    <div class="w-full lg:w-1/2">
                        <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">${data.introTitle}</h3>
                        <p class="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed font-medium">${data.introText}</p>
                    </div>
                    <div class="w-full lg:w-1/2 rounded-xl md:rounded-2xl overflow-hidden shadow-lg border-2 md:border-4 border-white">
                        <img src="${data.heroImg}" alt="SIP Panel Structure" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700">
                    </div>
                </div>

                <div>
                    <div class="text-center mb-6 sm:mb-8 md:mb-12">
                        <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">${data.advantagesTitle}</h3>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        ${advantagesHTML}
                    </div>
                </div>

                <div class="bg-white p-5 sm:p-8 md:p-16 rounded-2xl md:rounded-3xl shadow-xl">
                    <div class="mb-6 sm:mb-8 md:mb-10 border-l-4 border-brand-orange pl-3 sm:pl-4 md:pl-6">
                        <h3 class="text-lg sm:text-xl md:text-3xl font-black text-gray-900 mb-1 sm:mb-2">${data.specsTitle}</h3>
                        <p class="text-xs sm:text-sm md:text-base text-gray-500 font-medium">${data.specsDesc}</p>
                    </div>
                    <div class="bg-gray-50 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-10 border border-gray-100">
                        ${specsHTML}
                    </div>
                </div>
                
            </div>
        </div>
    `;
}

function renderContactPage() {
    DOM.content.innerHTML = `
        <div class="bg-gray-50 min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6">
            <div class="max-w-5xl mx-auto">
                <div class="text-center mb-8 sm:mb-10 md:mb-16">
                    <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-2 sm:mb-4">${t().pageTitles['iletisim']}</h1>
                    <div class="w-12 sm:w-16 md:w-24 h-1 md:h-1.5 bg-brand-orange mx-auto rounded-full"></div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 bg-white p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100">
                    
                    <div class="space-y-5 sm:space-y-6 md:space-y-8">
                        <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 border-b pb-3 sm:pb-4">İletişim Bilgilerimiz</h3>
                        
                        <div class="flex items-start space-x-3 sm:space-x-4">
                            <div class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                <i class="fas fa-map-marker-alt text-brand-orange text-sm sm:text-lg md:text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900 mb-1 text-xs sm:text-sm md:text-base">Adres</h4>
                                <p class="text-gray-600 text-xs sm:text-sm md:text-base">${siteConfig.contact.address}</p>
                            </div>
                        </div>

                        <div class="flex items-start space-x-3 sm:space-x-4">
                            <div class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                <i class="fas fa-phone-alt text-brand-orange text-sm sm:text-lg md:text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900 mb-1 text-xs sm:text-sm md:text-base">Telefon</h4>
                                <a href="tel:${siteConfig.contact.phone.replace(/\s/g,'')}" class="text-gray-600 hover:text-brand-orange transition-colors text-xs sm:text-sm md:text-base">${siteConfig.contact.phone}</a>
                            </div>
                        </div>

                        <div class="flex items-start space-x-3 sm:space-x-4">
                            <div class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                <i class="fas fa-envelope text-brand-orange text-sm sm:text-lg md:text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900 mb-1 text-xs sm:text-sm md:text-base">E-Posta</h4>
                                <a href="mailto:${siteConfig.contact.email}" class="text-gray-600 hover:text-brand-orange transition-colors text-xs sm:text-sm md:text-base break-all">${siteConfig.contact.email}</a>
                            </div>
                        </div>
                    </div>

                    <div class="bg-[#1a201c] p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg relative">
                        <h3 class="text-base sm:text-lg md:text-xl font-bold text-white mb-4 md:mb-6">${t().getQuoteTitle}</h3>
                        <form class="space-y-3 sm:space-y-4" onsubmit="window.submitTestForm(event, this)">
                            <input type="text" placeholder="${t().formName}" required class="w-full px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 bg-black/40 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-brand-orange transition-colors text-xs sm:text-sm md:text-base">
                            <input type="tel" placeholder="${t().formPhone}" required oninput="window.formatPhone(this)" maxlength="15" class="w-full px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 bg-black/40 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-brand-orange transition-colors text-xs sm:text-sm md:text-base">
                            <button type="submit" class="w-full bg-brand-orange text-white font-bold py-3 md:py-4 rounded-xl transition-all shadow-lg hover:bg-orange-500 mt-2 flex justify-center items-center text-sm sm:text-base md:text-lg btn-press">
                                <i class="fas fa-paper-plane mr-2 md:mr-3"></i> ${t().submitBtn}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderGenericPage(pageId) {
    const title = t().pageTitles[pageId] || '';
    const content = t().pageContents[pageId] || '';
    DOM.content.innerHTML = `
        <div class="max-w-5xl mx-auto py-20 sm:py-24 md:py-32 px-4 sm:px-6 min-h-[60vh]">
            <div class="mb-8 sm:mb-10 md:mb-16">
                <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">${title}</h1>
                <div class="w-12 sm:w-16 md:w-24 h-1 md:h-1.5 bg-brand-orange rounded-full"></div>
            </div>
            <div class="bg-white p-5 sm:p-6 md:p-12 lg:p-16 shadow-xl border border-gray-100 rounded-2xl break-words text-sm sm:text-base md:text-lg">${content}</div>
        </div>
    `;
}

function renderProjectsPage(pageId) {
    let pageProjects = siteConfig.projects.filter(p => p.pageMenu === pageId);
    
    if (state.activeCategory) pageProjects = pageProjects.filter(p => p.categoryId === state.activeCategory);
    
    if (state.sortBy === 'areaAsc') pageProjects.sort((a, b) => a.area - b.area);
    else if (state.sortBy === 'areaDesc') pageProjects.sort((a, b) => b.area - a.area);

    const specificCategories = siteConfig.categories[pageId] || [];
    const allCatActive = state.activeCategory === null;
    const allCategoriesHTML = `
        <button onclick="filterCategory(null, event)" class="w-full text-left px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 border-b border-gray-100/50 transition-all font-semibold btn-press rounded-xl mb-1 text-xs sm:text-sm md:text-base ${allCatActive ? 'bg-brand-orange text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-brand-orange'}">
            ${t().allProjectsTitle}
        </button>
    ` + specificCategories.map(cat => `
        <button onclick="filterCategory('${cat.id}', event)" class="w-full text-left px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 border-b border-gray-100/50 transition-all font-semibold btn-press rounded-xl mb-1 text-xs sm:text-sm md:text-base whitespace-nowrap lg:whitespace-normal ${state.activeCategory === cat.id ? 'bg-brand-orange text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-brand-orange'}">
            ${cat[state.lang]}
        </button>
    `).join('');

    const projectsHTML = pageProjects.length > 0 ? pageProjects.map(project => `
        <div class="project-card bg-white border border-gray-100 cursor-pointer rounded-2xl btn-press overflow-hidden flex flex-col group" onclick="navigate('${project.id}')">
            <div class="relative aspect-[4/3] overflow-hidden">
                <img src="${project.mainImage}" class="w-full h-full object-cover">
                <div class="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-gray-900/80 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-1.5 font-bold rounded-lg shadow-lg z-10 text-[10px] sm:text-xs md:text-sm">${project.area} ${t().sqm}</div>
            </div>
            <div class="p-4 sm:p-5 md:p-8 bg-white flex-grow flex items-center justify-between">
                <h3 class="text-gray-900 font-bold text-sm sm:text-lg md:text-xl group-hover:text-brand-orange transition-colors truncate pr-2">${state.lang === 'tr' ? project.title : project.titleEn}</h3>
                <div class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors shrink-0"><i class="fas fa-chevron-right text-[10px] sm:text-sm"></i></div>
            </div>
        </div>
    `).join('') : `<div class="col-span-full text-center py-16 sm:py-20 md:py-32 text-gray-400 font-medium text-base sm:text-lg md:text-xl bg-white rounded-2xl shadow-sm border border-dashed border-gray-300 mx-2">Proje bulunamadı.</div>`;

    DOM.content.innerHTML = `
        <div id="projects-grid" class="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 md:py-12 mt-16 sm:mt-20 md:mt-24">
            <div class="mb-8 sm:mb-10 md:mb-16">
                <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">${t().pageTitles[pageId]}</h1>
                <div class="w-12 sm:w-16 md:w-24 h-1 md:h-1.5 bg-brand-orange rounded-full"></div>
            </div>
            <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-16">
                <div class="w-full lg:w-1/4">
                    <div class="bg-white p-2 sm:p-3 md:p-4 rounded-2xl border border-gray-100 lg:sticky lg:top-28 shadow-xl">
                        <h2 class="font-bold text-gray-900 mb-4 px-3 text-base sm:text-lg md:text-xl hidden lg:block">${t().categoryTitle}</h2>
                        <div class="flex flex-row overflow-x-auto no-scrollbar lg:flex-col gap-2 pb-2 lg:pb-0 snap-x">${allCategoriesHTML}</div>
                    </div>
                </div>
                <div class="w-full lg:w-3/4">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 md:mb-8 bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 gap-3 sm:gap-4">
                        <span class="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500">${pageProjects.length} Sonuç</span>
                        <select onchange="window.sortProjects(this.value)" class="w-full sm:w-auto bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-[10px] sm:text-xs md:text-sm rounded-lg focus:ring-2 focus:ring-brand-orange py-1.5 sm:py-2 md:py-2.5 px-2 sm:px-3 md:px-4 cursor-pointer outline-none transition-colors">
                            <option value="default" ${state.sortBy === 'default' ? 'selected' : ''}>Varsayılan</option>
                            <option value="areaAsc" ${state.sortBy === 'areaAsc' ? 'selected' : ''}>m² (Artan)</option>
                            <option value="areaDesc" ${state.sortBy === 'areaDesc' ? 'selected' : ''}>m² (Azalan)</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">${projectsHTML}</div>
                </div>
            </div>
        </div>
    `;
}

function renderProjectDetail(projectId) {
    const project = siteConfig.projects.find(p => p.id === projectId);
    if (!project) return navigate('home'); 

    const prjTitle = state.lang === 'tr' ? project.title : project.titleEn;
    const fullGallery = [project.mainImage, ...(project.gallery || []).filter(img => img !== project.mainImage)];
    
    state.lightboxImages = fullGallery;
    state.activeGalleryIndex = 0; 
    
    if (state.sliderInterval) clearInterval(state.sliderInterval);
    state.sliderInterval = setInterval(() => {
        state.activeGalleryIndex = (state.activeGalleryIndex + 1) % state.lightboxImages.length;
        window.changeMainImage(state.lightboxImages[state.activeGalleryIndex]);
    }, 4500);

    const thumbnailsHTML = fullGallery.map((img, index) => `
        <div class="w-16 sm:w-20 md:w-24 lg:w-full aspect-square shrink-0 overflow-hidden rounded-lg md:rounded-xl border-2 md:border-4 border-white shadow-md hover:border-brand-orange cursor-pointer btn-press" onclick="window.setGalleryImage(${index})">
             <img src="${img}" class="w-full h-full object-cover opacity-80 hover:opacity-100">
        </div>
    `).join('');

    DOM.content.innerHTML = `
        <div class="max-w-[1400px] mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-32">
            <div class="mb-6 sm:mb-8 md:mb-10 flex flex-col md:flex-row justify-between md:items-end gap-4 md:gap-6">
                <div>
                    <div class="flex items-center text-[10px] sm:text-xs md:text-sm font-semibold text-brand-orange space-x-2 mb-1 sm:mb-2 md:mb-4 flex-wrap gap-y-1">
                        <span class="cursor-pointer hover:text-gray-900" onclick="navigate('${project.pageMenu}')">${t().menu[project.pageMenu]}</span>
                        <i class="fas fa-arrow-right text-[8px] md:text-[10px] text-gray-300 mt-0.5"></i>
                        <span class="text-gray-900">${prjTitle}</span>
                    </div>
                    <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">${prjTitle}</h1>
                </div>
                <button onclick="navigate('${project.pageMenu}')" class="w-full md:w-auto bg-gray-900 text-white px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 rounded-full font-semibold hover:bg-brand-orange transition-colors flex justify-center items-center text-xs sm:text-sm md:text-base"><i class="fas fa-arrow-left mr-2"></i> ${t().backBtn}</button>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 xl:gap-16 mb-8 sm:mb-12 md:mb-16">
                <div class="xl:col-span-2 flex flex-col-reverse md:flex-row gap-3 sm:gap-4 md:gap-6">
                    <div class="w-full md:w-20 lg:w-28 flex flex-row md:flex-col gap-2 sm:gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0 snap-x">${thumbnailsHTML}</div>
                    <div class="flex-grow rounded-xl md:rounded-2xl shadow-xl overflow-hidden bg-gray-100">
                        <div class="w-full aspect-[4/3] cursor-zoom-in relative" onclick="window.openLightboxCurrent()">
                            <img id="detail-main-image" src="${project.mainImage}" class="absolute inset-0 w-full h-full object-cover transition-all duration-500">
                        </div>
                    </div>
                </div>

                <div class="xl:col-span-1 space-y-4 sm:space-y-6 md:space-y-8">
                    <div class="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                        <div class="bg-white p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md border text-center">
                            <span class="text-gray-400 font-semibold text-[8px] sm:text-[10px] md:text-xs uppercase mb-1 block truncate">${t().totalArea}</span>
                            <span class="font-black text-xl sm:text-2xl md:text-3xl text-gray-900">${project.area} <span class="text-xs sm:text-sm md:text-base text-brand-orange">m²</span></span>
                        </div>
                        <div class="bg-white p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md border text-center">
                            <span class="text-gray-400 font-semibold text-[8px] sm:text-[10px] md:text-xs uppercase mb-1 block truncate">${t().roomCount}</span>
                            <span class="font-black text-xl sm:text-2xl md:text-3xl text-gray-900">${project.rooms}</span>
                        </div>
                    </div>

                    <div class="bg-[#1a201c] p-4 sm:p-6 md:p-8 rounded-xl md:rounded-3xl shadow-2xl">
                        <h3 class="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 md:mb-6">${t().getQuoteTitle}</h3>
                        <form class="space-y-2 sm:space-y-3 md:space-y-4" onsubmit="window.submitTestForm(event, this)">
                            <input type="text" placeholder="${t().formName}" required class="w-full px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 bg-black/40 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-brand-orange text-xs sm:text-sm md:text-base">
                            <input type="tel" placeholder="${t().formPhone}" required oninput="window.formatPhone(this)" class="w-full px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 bg-black/40 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-brand-orange text-xs sm:text-sm md:text-base">
                            <button type="submit" class="w-full bg-brand-orange text-white font-bold py-2.5 sm:py-3 md:py-4 rounded-xl transition-all shadow-lg hover:bg-orange-500 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">${t().submitBtn}</button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div class="bg-white p-4 sm:p-6 md:p-12 lg:p-16 rounded-xl md:rounded-3xl shadow-xl border border-gray-100">
                <h3 class="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900 border-l-4 border-brand-orange pl-2 sm:pl-3 md:pl-4">${t().projectDetailsTitle}</h3>
                <p class="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">${project.description[state.lang]}</p>
            </div>
        </div>
    `;
}

function renderFooter() {
    DOM.footer.innerHTML = `
        <div class="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col items-center justify-center space-y-4 sm:space-y-6 md:space-y-8">
            <div class="w-24 sm:w-32 md:w-40 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 mix-blend-multiply" onclick="navigate('home')">
                <img src="${siteConfig.contact.logoSrc}" alt="Kartech Panel" class="w-full h-auto object-contain mix-blend-multiply">
            </div>
            <p class="text-xs sm:text-sm text-gray-500 font-medium tracking-wide text-center px-4">${t().footerText}</p>
        </div>
    `;
}

function initApp() {
    renderHeader();
    renderFooter();
    
    window.addEventListener('scroll', handleScroll);

    state.currentView = 'home';
    renderHomePage();
    updateDocumentTitle('home'); 
    
    DOM.content.classList.remove('page-fade-out');
    DOM.content.classList.add('page-fade-in');
}

window.addEventListener('DOMContentLoaded', initApp);
