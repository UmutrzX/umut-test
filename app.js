import { siteConfig } from './config.js';

const state = {
    lang: 'tr',       
    currentView: 'home', 
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

function updateMetaTags(viewOrId, projectData = null) {
    const baseTitle = "Kartech Panel Structures";
    let title = "";
    let desc = "";

    if (projectData) {
        title = `${state.lang === 'tr' ? projectData.title : projectData.titleEn} | ${baseTitle}`;
        desc = projectData.description[state.lang];
    } else {
        const pageTitles = t().pageTitles;
        title = `${pageTitles[viewOrId] || baseTitle} | ${baseTitle}`;
        desc = siteConfig.homeHero.subSlogan[state.lang];
    }
    
    document.title = title;
    
    const metaDesc = document.getElementById('meta-desc');
    if (metaDesc) metaDesc.content = desc;
}

export function navigate(viewOrId, evt = null, keepCategory = false, fromHash = false) {
    if (evt) evt.preventDefault(); 
    
    if (state.mobileMenuOpen) window.toggleMobileMenu();
    if (state.currentView === viewOrId && !keepCategory && !state.activeCategory) return; 
    if (!keepCategory) state.activeCategory = null; 
    if (state.sliderInterval) { clearInterval(state.sliderInterval); state.sliderInterval = null; }

    state.currentView = viewOrId;
    
    if (!fromHash) window.history.pushState(null, '', '#' + viewOrId);
    
    DOM.content.classList.remove('page-fade-in');
    DOM.content.classList.add('page-fade-out');
    
    renderHeader();

    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
        
        if (viewOrId === 'home') {
            updateMetaTags(viewOrId); renderHomePage();
        } else if (viewOrId === 'sip-panel') {
            updateMetaTags(viewOrId); renderSipPanelPage();
        } else if (viewOrId === 'iletisim') {
            updateMetaTags(viewOrId); renderContactPage();
        } else if (['ev-modelleri', 'bahce-yapilari', 'garaj-sistemleri'].includes(viewOrId)) {
            updateMetaTags(viewOrId); renderProjectsPage(viewOrId);
        } else if (['uretim', 'galeri', 'hakkimizda'].includes(viewOrId)) {
            updateMetaTags(viewOrId); renderGenericPage(viewOrId);
        } else {
            const project = siteConfig.projects.find(p => p.id === viewOrId);
            if (project) { updateMetaTags(viewOrId, project); renderProjectDetail(viewOrId); }
            else { navigate('home'); }
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

window.addEventListener('hashchange', () => {
    let hash = window.location.hash.substring(1);
    if(hash) navigate(hash, null, true, true);
});

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

function parseMedia(url) {
    let ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch) {
        return { type: 'youtube', id: ytMatch[1], url: url, thumb: `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`, embed: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0` };
    }
    if (url.endsWith('.mp4')) return { type: 'mp4', url: url, thumb: url };
    return { type: 'image', url: url, thumb: url };
}

window.changeMainImage = function(index) {
    const media = state.lightboxImages[index];
    const container = document.getElementById('main-image-container');
    if(!container) return;
    
    container.style.opacity = 0; container.style.transform = 'scale(0.95)';
    setTimeout(() => { 
        if(media.type === 'image') {
            container.innerHTML = `<img id="detail-main-image" src="${media.url}" alt="Project details" class="absolute inset-0 w-full h-full object-cover transition-all duration-500 hover:scale-105 pointer-events-auto" loading="lazy">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-opacity duration-300 pointer-events-none"></div>
            <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur text-gray-900 px-4 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-400 shadow-xl flex items-center pointer-events-none whitespace-nowrap">
                <i class="fas fa-expand mr-2 text-brand-orange"></i> Tam Ekran
            </div>`;
        } else {
            container.innerHTML = `<iframe src="${media.embed}" class="absolute inset-0 w-full h-full" frameborder="0" allow="autoplay; fullscreen"></iframe>`;
        }
        container.style.opacity = 1; container.style.transform = 'scale(1)';
    }, 300); 
};

window.setGalleryImage = function(index) {
    if (state.sliderInterval) { clearInterval(state.sliderInterval); state.sliderInterval = null; }
    state.activeGalleryIndex = index;
    window.changeMainImage(index);
};

window.openLightboxCurrent = function() {
    const media = state.lightboxImages[state.activeGalleryIndex];
    if(media.type !== 'image') return; 
    if (state.sliderInterval) { clearInterval(state.sliderInterval); state.sliderInterval = null; }
    window.openLightbox(state.activeGalleryIndex);
};

window.openLightbox = function(startIndex) {
    let imagesOnly = state.lightboxImages.filter(m => m.type === 'image');
    if(imagesOnly.length === 0) return;
    
    let actualMedia = state.lightboxImages[startIndex];
    if(actualMedia.type !== 'image') return;
    let newIndex = imagesOnly.findIndex(m => m.url === actualMedia.url);

    const overlay = document.getElementById('lightbox-overlay');
    state.currentLightboxIndex = newIndex;
    state.currentLightboxArray = imagesOnly; 

    document.getElementById('lightbox-img').src = imagesOnly[newIndex].url;
    document.getElementById('lightbox-counter').innerText = `${newIndex + 1} / ${imagesOnly.length}`;
    
    overlay.classList.add('active');
    document.addEventListener('keydown', window.handleLightboxKeys);
};

window.closeLightbox = function() {
    document.getElementById('lightbox-overlay').classList.remove('active');
    document.removeEventListener('keydown', window.handleLightboxKeys);
};

window.changeLightboxImage = function(direction) {
    let arr = state.currentLightboxArray;
    state.currentLightboxIndex += direction;
    
    if (state.currentLightboxIndex < 0) state.currentLightboxIndex = arr.length - 1;
    else if (state.currentLightboxIndex >= arr.length) state.currentLightboxIndex = 0;
    
    const img = document.getElementById('lightbox-img');
    img.style.opacity = 0;
    img.style.transform = direction > 0 ? 'translateX(100px) scale(0.9)' : 'translateX(-100px) scale(0.9)';
    setTimeout(() => {
        img.src = arr[state.currentLightboxIndex].url;
        img.style.opacity = 1; img.style.transform = 'translateX(0) scale(1)';
        document.getElementById('lightbox-counter').innerText = `${state.currentLightboxIndex + 1} / ${arr.length}`;
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
    input.classList.remove('border-red-500');
    const err = document.getElementById(input.id + '-error');
    if(err) err.classList.add('hidden');
};

window.clearError = function(input) {
    input.classList.remove('border-red-500');
    const err = document.getElementById(input.id + '-error');
    if(err) err.classList.add('hidden');
}

window.submitTestForm = function(evt, formId) {
    evt.preventDefault();
    
    const form = document.getElementById(formId);
    const nameInput = document.getElementById(formId + '-name');
    const phoneInput = document.getElementById(formId + '-phone');
    let hasError = false;

    if (nameInput.value.trim().length < 3) {
        nameInput.classList.add('border-red-500');
        document.getElementById(formId + '-name-error').classList.remove('hidden');
        hasError = true;
    }

    const phoneDigits = phoneInput.value.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
        phoneInput.classList.add('border-red-500');
        document.getElementById(formId + '-phone-error').classList.remove('hidden');
        hasError = true;
    }

    if(hasError) return; 

    const message = `SİTE TALEBİ\nİsim: ${nameInput.value}\nTel: ${phoneInput.value}`;
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
            <div class="mb-4">
               <div class="flex items-center justify-between cursor-pointer group w-[220px] sm:w-[280px]" onclick="window.toggleAccordion('${id}', event)">
                   <span class="text-2xl sm:text-3xl font-semibold text-gray-300 group-hover:text-white transition">${label}</span>
                   <i id="icon-${id}" class="accordion-icon fas fa-chevron-down text-lg sm:text-xl text-gray-500 group-hover:text-white transition transform ${isOpen ? 'rotate-180' : ''}"></i>
               </div>
               <div id="accordion-${id}" class="accordion-content ${isOpen ? 'open' : ''}">
                   <div class="pl-4 border-l-2 border-brand-orange ml-1 flex flex-col">
                       <a href="#" class="text-base sm:text-lg text-gray-400 hover:text-brand-orange cursor-pointer font-medium py-2" onclick="window.filterAndNavigate('${id}', 'all', event)">${t().allProjectsTitle}</a>
                       ${categories.map(cat => `<a href="#" class="text-base sm:text-lg text-gray-400 hover:text-brand-orange cursor-pointer font-medium py-2" onclick="window.filterAndNavigate('${id}', '${cat.id}', event)">${cat[state.lang]}</a>`).join('')}
                   </div>
               </div>
            </div>`;
        } else {
            return `
            <div class="mb-4">
                <div class="w-[220px] sm:w-[280px] flex items-center justify-between">
                    <a href="#" onclick="navigate('${id}', event)" class="text-2xl sm:text-3xl font-semibold text-gray-300 hover:text-white transition block">${label}</a>
                </div>
            </div>`;
        }
    }).join('');

    DOM.header.innerHTML = `
        <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative z-50">
            <div class="cursor-pointer h-full flex items-center py-2" onclick="navigate('home')">
                 <img id="header-logo" src="${siteConfig.contact.logoSrc}" alt="Kartech Panel" class="h-16 sm:h-24 md:h-32 lg:h-40 w-auto object-contain object-left transition-all duration-500 mix-blend-multiply origin-left">
            </div>
            
            <div class="flex items-center space-x-3 md:space-x-4 ml-auto">
                <div class="flex space-x-3 text-white social-icons mr-2 transition-colors duration-300">
                    <a href="${siteConfig.contact.social.instagram}" target="_blank" aria-label="Instagram" class="hover:text-brand-orange text-lg sm:text-xl transition-colors header-icon"><i class="fab fa-instagram"></i></a>
                    <a href="${siteConfig.contact.social.facebook}" target="_blank" aria-label="Facebook" class="hover:text-brand-orange text-lg sm:text-xl transition-colors header-icon"><i class="fab fa-facebook-f"></i></a>
                </div>
                <div class="hidden lg:flex items-center space-x-2 font-bold text-sm mr-2 border-r border-gray-500/30 pr-4">
                    <span class="cursor-pointer transition-colors duration-300 header-text-lang ${state.lang === 'tr' ? 'text-brand-orange' : 'text-white hover:text-brand-orange'}" onclick="changeLanguage('tr')">TR</span>
                    <span class="text-gray-400">|</span>
                    <span class="cursor-pointer transition-colors duration-300 header-text-lang ${state.lang === 'en' ? 'text-brand-orange' : 'text-white hover:text-brand-orange'}" onclick="changeLanguage('en')">EN</span>
                </div>
                <button onclick="navigate('iletisim')" class="hidden md:block bg-brand-orange hover:bg-orange-500 text-white font-semibold py-2.5 px-6 sm:px-8 rounded-full shadow-md transition-all btn-press text-xs sm:text-sm whitespace-nowrap">
                    ${t().consultBtn}
                </button>
                <button onclick="window.toggleMobileMenu()" aria-label="Menü" class="w-10 h-10 md:w-12 md:h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white hover:bg-brand-orange shadow-lg transition-all duration-300 btn-press focus:outline-none shrink-0 z-[101]">
                    <i class="fas fa-bars text-base sm:text-lg pointer-events-none"></i>
                </button>
            </div>
        </div>

        <div id="vg-overlay-bg" onclick="window.closeMenuFromOutside(event)" class="vg-overlay">
            <div class="w-full p-6 sm:p-8 flex justify-end items-center shrink-0">
                <div class="flex items-center space-x-4 md:space-x-6">
                    <div class="flex space-x-4 text-white mr-2">
                        <a href="${siteConfig.contact.social.instagram}" target="_blank" aria-label="Instagram" class="hover:text-brand-orange text-2xl transition-colors"><i class="fab fa-instagram"></i></a>
                        <a href="${siteConfig.contact.social.facebook}" target="_blank" aria-label="Facebook" class="hover:text-brand-orange text-2xl transition-colors"><i class="fab fa-facebook-f"></i></a>
                    </div>
                    <button onclick="window.toggleMobileMenu()" aria-label="Kapat" class="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all duration-300 btn-press z-[105]">
                        <i class="fas fa-times text-xl sm:text-2xl pointer-events-none"></i>
                    </button>
                </div>
            </div>
            <div class="w-full flex-grow px-8 sm:px-16 md:px-24 lg:px-40 flex flex-col justify-start pt-6 sm:pt-10 pb-24 overflow-y-auto no-scrollbar">
                ${overlayMenuHTML}
                <div class="mt-8 pt-8 border-t border-gray-800 flex items-center space-x-6 w-[220px] sm:w-[280px]">
                    <div class="flex w-full justify-between items-center">
                        <span class="text-xl text-gray-400 font-semibold">Dil</span>
                        <div class="flex space-x-3 bg-white/5 rounded-full px-4 py-2">
                            <span class="cursor-pointer font-bold text-sm sm:text-base btn-press ${state.lang === 'tr' ? 'text-brand-orange' : 'text-gray-500'}" onclick="changeLanguage('tr')">TR</span>
                            <span class="text-gray-700">|</span>
                            <span class="cursor-pointer font-bold text-sm sm:text-base btn-press ${state.lang === 'en' ? 'text-brand-orange' : 'text-gray-500'}" onclick="changeLanguage('en')">EN</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    setTimeout(() => { window.dispatchEvent(new Event('scroll')); }, 50);
}

function handleScroll() {
    const btn = document.getElementById('btn-scroll-top');
    if (window.scrollY > 400) btn?.classList.add('visible');
    else btn?.classList.remove('visible');

    const header = document.getElementById('main-header');
    if(!header) return;
    
    const icons = header.querySelectorAll('.header-icon');
    const langTexts = header.querySelectorAll('.header-text-lang');
    const logo = document.getElementById('header-logo');
    const hasHero = ['home'].includes(state.currentView);

    if (window.scrollY > 50) {
        header.classList.remove('bg-transparent');
        header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-gray-100');
        if(logo) {
            logo.classList.remove('h-16', 'sm:h-24', 'md:h-32', 'lg:h-40');
            logo.classList.add('h-10', 'sm:h-12', 'md:h-14', 'lg:h-16');
        }
        icons.forEach(icon => { icon.classList.remove('text-white'); icon.classList.add('text-gray-900'); });
        langTexts.forEach(txt => { 
            if(!txt.classList.contains('text-brand-orange')) { txt.classList.remove('text-white'); txt.classList.add('text-gray-900'); }
        });
    } else {
        header.classList.add('bg-transparent');
        header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-gray-100');
        if(logo) {
            logo.classList.add('h-16', 'sm:h-24', 'md:h-32', 'lg:h-40');
            logo.classList.remove('h-10', 'sm:h-12', 'md:h-14', 'lg:h-16');
        }
        if(hasHero) {
            icons.forEach(icon => { icon.classList.remove('text-gray-900'); icon.classList.add('text-white'); });
            langTexts.forEach(txt => { 
                if(!txt.classList.contains('text-brand-orange')) { txt.classList.remove('text-gray-900'); txt.classList.add('text-white'); }
            });
        } else {
            icons.forEach(icon => { icon.classList.remove('text-white'); icon.classList.add('text-gray-900'); });
            langTexts.forEach(txt => { 
                if(!txt.classList.contains('text-brand-orange')) { txt.classList.remove('text-white'); txt.classList.add('text-gray-900'); }
            });
        }
    }
}

function renderHomePage() {
    const pageProjects = [...siteConfig.projects].sort(() => 0.5 - Math.random()).slice(0, 3);
    const projectsHTML = pageProjects.map(project => `
        <div class="project-card bg-white border border-gray-100 cursor-pointer rounded-2xl btn-press overflow-hidden flex flex-col group" onclick="navigate('${project.id}')">
            <div class="relative aspect-[4/3] overflow-hidden">
                <img src="${project.mainImage}" alt="${state.lang === 'tr' ? project.title : project.titleEn}" class="w-full h-full object-cover" loading="lazy">
                <div class="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-400 flex items-center justify-center pointer-events-none">
                     <span class="bg-brand-orange text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-bold opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-400 shadow-2xl text-sm md:text-base flex items-center">${t().projectDetailsTitle} <i class="fas fa-arrow-right ml-2"></i></span>
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
            <div class="absolute inset-0 z-0"><img src="${siteConfig.homeHero.backgroundImage}" alt="Hero Background" class="w-full h-full object-cover" loading="eager"></div>
            
            <div class="absolute top-0 left-0 bottom-0 w-full md:w-[85%] lg:w-[65%] bg-[#1a201c]/40 backdrop-blur-sm z-10"></div>
            
            <div class="relative z-20 w-full h-full flex flex-col justify-center">
                <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
                    <div class="max-w-2xl lg:max-w-3xl transform">
                        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg tracking-tight">${siteConfig.homeHero.slogan[state.lang]}</h1>
                        <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-medium drop-shadow-md leading-relaxed">${siteConfig.homeHero.subSlogan[state.lang]}</p>
                        
                        <!-- PÜRÜZSÜZ KAYDIRMA EKLENDİ (SMOOTH SCROLL TO FEATURED) -->
                        <button onclick="document.getElementById('featured-projects').scrollIntoView({behavior: 'smooth'})" class="mt-8 md:mt-10 bg-brand-orange text-white font-bold px-6 py-3.5 sm:px-8 sm:py-4 rounded-full shadow-lg hover:bg-orange-500 transition-all btn-press text-sm sm:text-base md:text-lg w-max flex items-center">
                            Projeleri İncele <i class="fas fa-arrow-down ml-3"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- ID EKLENDİ: featured-projects -->
        <div id="featured-projects" class="bg-white relative z-20 w-full py-16 sm:py-20 md:py-24">
            <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-10 sm:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div>
                        <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight">Öne Çıkan Projeler</h2>
                        <div class="w-16 md:w-24 h-1.5 bg-brand-orange rounded-full"></div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">${projectsHTML}</div>
            </div>
        </div>
    `;
}

function renderSipPanelPage() {
    const data = t().sipPanelData;
    
    const advantagesHTML = data.advantages.map(adv => `
        <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-md border-t-4 border-brand-orange hover:shadow-xl transition-shadow group h-full flex flex-col">
            <div class="w-14 h-14 sm:w-16 sm:h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors shrink-0">
                <i class="fas ${adv.icon} text-xl sm:text-2xl text-brand-orange group-hover:text-white transition-colors"></i>
            </div>
            <h4 class="text-lg sm:text-xl font-bold text-gray-900 mb-3">${adv.title}</h4>
            <p class="text-sm sm:text-base text-gray-600 leading-relaxed flex-grow">${adv.desc}</p>
        </div>
    `).join('');

    const specsHTML = data.technicalSpecs.map(spec => `
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-4 border-b border-gray-100 last:border-0 gap-2 sm:gap-6 hover:bg-gray-50 transition-colors px-2 rounded-lg">
            <span class="font-bold text-gray-700 text-sm sm:text-base w-full sm:w-1/3 flex items-center"><i class="fas fa-check text-brand-green mr-3 text-xs"></i> ${spec.label}</span>
            <span class="text-gray-600 font-medium text-sm sm:text-base w-full sm:w-2/3 sm:text-right">${spec.value}</span>
        </div>
    `).join('');

    DOM.content.innerHTML = `
        <div class="relative w-full h-[50vh] md:h-[60vh] flex overflow-hidden">
            <div class="absolute inset-0 z-0">
                <img src="${data.heroImg}" alt="SIP Panel Background" class="w-full h-full object-cover" loading="eager">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            </div>
            <div class="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-16">
                <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tight drop-shadow-xl">${t().pageTitles['sip-panel']}</h1>
                <div class="w-16 sm:w-24 h-1.5 bg-brand-orange rounded-full"></div>
            </div>
        </div>
        <div class="bg-gray-50 py-16 sm:py-24 px-4 sm:px-6">
            <div class="max-w-[1200px] mx-auto space-y-16 sm:space-y-24">
                <div class="bg-white p-6 sm:p-10 md:p-16 rounded-3xl shadow-xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-center border border-gray-100">
                    <div class="w-full lg:w-1/2 order-2 lg:order-1">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4 sm:mb-6 tracking-tight">${data.introTitle}</h3>
                        <p class="text-base sm:text-lg text-gray-600 leading-relaxed font-medium mb-6">${data.introText}</p>
                        <button onclick="navigate('iletisim')" class="bg-gray-900 text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-brand-orange transition-all btn-press">Bilgi Alın</button>
                    </div>
                    <div class="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl border-4 border-white order-1 lg:order-2">
                        <img src="${data.heroImg}" alt="SIP Panel Structure" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" loading="lazy">
                    </div>
                </div>
                <div>
                    <div class="text-center mb-10 sm:mb-16">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">${data.advantagesTitle}</h3>
                        <div class="w-16 sm:w-24 h-1.5 bg-brand-orange mx-auto rounded-full"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">${advantagesHTML}</div>
                </div>
                <div class="bg-white p-6 sm:p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100">
                    <div class="mb-8 sm:mb-12 border-l-4 border-brand-orange pl-4 sm:pl-6">
                        <h3 class="text-2xl sm:text-3xl font-black text-gray-900 mb-2">${data.specsTitle}</h3>
                        <p class="text-sm sm:text-base text-gray-500 font-medium">${data.specsDesc}</p>
                    </div>
                    <div class="bg-gray-50 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-inner">${specsHTML}</div>
                </div>
            </div>
        </div>
    `;
}

function renderContactPage() {
    DOM.content.innerHTML = `
        <div class="bg-gray-50 min-h-screen pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
            <div class="max-w-5xl mx-auto">
                <div class="text-center mb-12 sm:mb-16">
                    <h1 class="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">${t().pageTitles['iletisim']}</h1>
                    <div class="w-16 sm:w-24 h-1.5 bg-brand-orange mx-auto rounded-full"></div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 sm:p-10 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                    
                    <div class="space-y-8 lg:pr-8">
                        <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 border-b-2 border-gray-100 pb-4">İletişim Bilgilerimiz</h3>
                        
                        <div class="flex items-start space-x-4 sm:space-x-5">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-50 flex items-center justify-center shrink-0 shadow-sm border border-orange-100">
                                <i class="fas fa-map-marker-alt text-brand-orange text-xl sm:text-2xl"></i>
                            </div>
                            <div class="pt-1">
                                <h4 class="font-bold text-gray-900 mb-1 text-base sm:text-lg">Adres</h4>
                                <p class="text-gray-600 text-sm sm:text-base leading-relaxed">${siteConfig.contact.address}</p>
                            </div>
                        </div>

                        <div class="flex items-start space-x-4 sm:space-x-5">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-50 flex items-center justify-center shrink-0 shadow-sm border border-orange-100">
                                <i class="fas fa-phone-alt text-brand-orange text-xl sm:text-2xl"></i>
                            </div>
                            <div class="pt-1">
                                <h4 class="font-bold text-gray-900 mb-1 text-base sm:text-lg">Telefon</h4>
                                <a href="tel:${siteConfig.contact.phone.replace(/\s/g,'')}" class="text-gray-600 hover:text-brand-orange transition-colors text-sm sm:text-base font-medium">${siteConfig.contact.phone}</a>
                            </div>
                        </div>

                        <div class="flex items-start space-x-4 sm:space-x-5">
                            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-50 flex items-center justify-center shrink-0 shadow-sm border border-orange-100">
                                <i class="fas fa-envelope text-brand-orange text-xl sm:text-2xl"></i>
                            </div>
                            <div class="pt-1">
                                <h4 class="font-bold text-gray-900 mb-1 text-base sm:text-lg">E-Posta</h4>
                                <a href="mailto:${siteConfig.contact.email}" class="text-gray-600 hover:text-brand-orange transition-colors text-sm sm:text-base break-all font-medium">${siteConfig.contact.email}</a>
                            </div>
                        </div>
                    </div>

                    <div class="bg-[#1a201c] p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl relative">
                        <h3 class="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">${t().getQuoteTitle}</h3>
                        <form id="contact-form" class="space-y-4" onsubmit="window.submitTestForm(event, 'contact-form')">
                            <div>
                                <input type="text" id="contact-form-name" placeholder="${t().formName}" oninput="window.clearError(this)" class="w-full px-4 py-3 sm:px-5 sm:py-4 bg-black/40 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-brand-orange transition-colors text-sm sm:text-base">
                                <div id="contact-form-name-error" class="text-red-500 text-xs sm:text-sm mt-1 hidden pl-1"><i class="fas fa-exclamation-circle mr-1"></i>${t().formErrorName}</div>
                            </div>
                            <div>
                                <input type="tel" id="contact-form-phone" placeholder="${t().formPhone}" oninput="window.formatPhone(this)" maxlength="15" class="w-full px-4 py-3 sm:px-5 sm:py-4 bg-black/40 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-brand-orange transition-colors text-sm sm:text-base">
                                <div id="contact-form-phone-error" class="text-red-500 text-xs sm:text-sm mt-1 hidden pl-1"><i class="fas fa-exclamation-circle mr-1"></i>${t().formErrorPhone}</div>
                            </div>
                            <button type="submit" class="w-full bg-brand-orange text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all shadow-lg hover:bg-orange-500 mt-4 flex justify-center items-center text-base sm:text-lg btn-press">
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
        <div class="max-w-5xl mx-auto py-24 sm:py-32 px-4 sm:px-6 min-h-[60vh]">
            <div class="mb-10 sm:mb-16">
                <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">${title}</h1>
                <div class="w-16 sm:w-24 h-1.5 bg-brand-orange rounded-full"></div>
            </div>
            <div class="bg-white p-6 sm:p-10 md:p-16 shadow-xl border border-gray-100 rounded-3xl break-words text-base sm:text-lg">${content}</div>
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
        <button onclick="filterCategory(null, event)" class="w-full text-left px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100/50 transition-all font-semibold btn-press rounded-xl mb-1 text-sm sm:text-base ${allCatActive ? 'bg-brand-orange text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-brand-orange'}">
            ${t().allProjectsTitle}
        </button>
    ` + specificCategories.map(cat => `
        <button onclick="filterCategory('${cat.id}', event)" class="w-full text-left px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100/50 transition-all font-semibold btn-press rounded-xl mb-1 text-sm sm:text-base whitespace-nowrap lg:whitespace-normal ${state.activeCategory === cat.id ? 'bg-brand-orange text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-brand-orange'}">
            ${cat[state.lang]}
        </button>
    `).join('');

    const projectsHTML = pageProjects.length > 0 ? pageProjects.map(project => `
        <div class="project-card bg-white border border-gray-100 cursor-pointer rounded-2xl btn-press overflow-hidden flex flex-col group shadow-sm" onclick="navigate('${project.id}')">
            <div class="relative aspect-[4/3] overflow-hidden">
                <img src="${project.mainImage}" alt="${state.lang === 'tr' ? project.title : project.titleEn}" class="w-full h-full object-cover" loading="lazy">
                <div class="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-1.5 font-bold rounded-lg shadow-lg z-10 text-xs sm:text-sm">${project.area} ${t().sqm}</div>
            </div>
            <div class="p-5 sm:p-6 md:p-8 bg-white flex-grow flex items-center justify-between">
                <h3 class="text-gray-900 font-bold text-lg sm:text-xl group-hover:text-brand-orange transition-colors truncate pr-2">${state.lang === 'tr' ? project.title : project.titleEn}</h3>
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors shrink-0"><i class="fas fa-chevron-right text-xs sm:text-sm"></i></div>
            </div>
        </div>
    `).join('') : `<div class="col-span-full text-center py-20 sm:py-32 text-gray-400 font-medium text-lg sm:text-xl bg-white rounded-3xl shadow-sm border border-dashed border-gray-300 mx-2">Proje bulunamadı.</div>`;

    DOM.content.innerHTML = `
        <div id="projects-grid" class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20 sm:mt-24">
            <div class="mb-10 sm:mb-16">
                <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">${t().pageTitles[pageId]}</h1>
                <div class="w-16 sm:w-24 h-1.5 bg-brand-orange rounded-full"></div>
            </div>
            <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16">
                <div class="w-full lg:w-1/4">
                    <div class="bg-white p-3 sm:p-4 rounded-2xl border border-gray-100 lg:sticky lg:top-28 shadow-xl">
                        <h2 class="font-bold text-gray-900 mb-4 px-3 text-lg sm:text-xl hidden lg:block tracking-tight">${t().categoryTitle}</h2>
                        <div class="flex flex-row overflow-x-auto no-scrollbar lg:flex-col gap-2 pb-2 lg:pb-0 snap-x">${allCategoriesHTML}</div>
                    </div>
                </div>
                <div class="w-full lg:w-3/4">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 gap-3 sm:gap-4">
                        <span class="text-xs sm:text-sm font-bold text-gray-500 tracking-wider px-2">${pageProjects.length} Sonuç</span>
                        <select aria-label="Sıralama" onchange="window.sortProjects(this.value)" class="w-full sm:w-auto bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-xs sm:text-sm rounded-lg focus:ring-2 focus:ring-brand-orange py-2 sm:py-2.5 px-3 sm:px-4 cursor-pointer outline-none transition-colors">
                            <option value="default" ${state.sortBy === 'default' ? 'selected' : ''}>Varsayılan</option>
                            <option value="areaAsc" ${state.sortBy === 'areaAsc' ? 'selected' : ''}>m² (Artan)</option>
                            <option value="areaDesc" ${state.sortBy === 'areaDesc' ? 'selected' : ''}>m² (Azalan)</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">${projectsHTML}</div>
                </div>
            </div>
        </div>
    `;
}

function renderProjectDetail(projectId) {
    const projectIndex = siteConfig.projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return navigate('home'); 
    
    const project = siteConfig.projects[projectIndex];
    const prevProject = siteConfig.projects[projectIndex - 1] || siteConfig.projects[siteConfig.projects.length - 1];
    const nextProject = siteConfig.projects[projectIndex + 1] || siteConfig.projects[0];

    const prjTitle = state.lang === 'tr' ? project.title : project.titleEn;
    const rawGallery = [project.mainImage, ...(project.gallery || []).filter(img => img !== project.mainImage)];
    const mediaItems = rawGallery.map(url => parseMedia(url));
    
    state.lightboxImages = mediaItems;
    state.activeGalleryIndex = 0; 
    
    if (state.sliderInterval) clearInterval(state.sliderInterval);
    state.sliderInterval = setInterval(() => {
        state.activeGalleryIndex = (state.activeGalleryIndex + 1) % state.lightboxImages.length;
        window.changeMainImage(state.activeGalleryIndex);
    }, 4500);

    const thumbnailsHTML = mediaItems.map((media, index) => {
        const isVideo = media.type !== 'image';
        return `
        <div class="w-20 sm:w-24 lg:w-full aspect-square shrink-0 overflow-hidden rounded-xl border-4 border-white shadow-md hover:border-brand-orange cursor-pointer btn-press relative group" onclick="window.setGalleryImage(${index})">
             <img src="${media.thumb}" alt="Thumbnail ${index + 1}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy">
             ${isVideo ? `<div class="absolute inset-0 flex items-center justify-center bg-black/30"><i class="fas fa-play-circle text-white text-2xl sm:text-3xl drop-shadow-md"></i></div>` : ''}
        </div>
    `}).join('');

    const initialMedia = mediaItems[0];
    let initialContainerHTML = '';
    if(initialMedia.type === 'image') {
        initialContainerHTML = `<img id="detail-main-image" src="${initialMedia.url}" alt="${prjTitle}" class="absolute inset-0 w-full h-full object-cover transition-all duration-500 hover:scale-105 pointer-events-auto" loading="eager">
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-opacity duration-300 pointer-events-none"></div>
        <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur text-gray-900 px-4 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-400 shadow-xl flex items-center pointer-events-none whitespace-nowrap">
            <i class="fas fa-expand mr-2 text-brand-orange"></i> Tam Ekran
        </div>`;
    } else {
        initialContainerHTML = `<iframe src="${initialMedia.embed}" class="absolute inset-0 w-full h-full" frameborder="0" allow="autoplay; fullscreen"></iframe>`;
    }

    DOM.content.innerHTML = `
        <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div class="mb-8 sm:mb-12 flex flex-col md:flex-row justify-between md:items-end gap-4 md:gap-6">
                <div>
                    <div class="flex items-center text-xs sm:text-sm font-semibold text-brand-orange space-x-2 mb-2 sm:mb-4 flex-wrap gap-y-1">
                        <span class="cursor-pointer hover:text-gray-900" onclick="navigate('${project.pageMenu}')">${t().menu[project.pageMenu]}</span>
                        <i class="fas fa-arrow-right text-[10px] text-gray-300 mt-0.5"></i>
                        <span class="text-gray-900">${prjTitle}</span>
                    </div>
                    <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight break-words">${prjTitle}</h1>
                </div>
                <div class="flex space-x-3 w-full md:w-auto">
                    <button onclick="window.shareProject(event)" class="flex-1 md:flex-none bg-white border-2 border-gray-200 hover:border-brand-orange text-gray-800 px-4 py-3 sm:px-6 rounded-full font-semibold transition-all flex justify-center items-center text-sm sm:text-base shadow-sm btn-press"><i class="fas fa-share-alt md:mr-2"></i> <span class="hidden md:inline">Paylaş</span></button>
                    <button onclick="navigate('${project.pageMenu}')" class="flex-1 md:flex-none bg-gray-900 text-white px-4 py-3 sm:px-6 rounded-full font-semibold hover:bg-brand-orange transition-colors flex justify-center items-center text-sm sm:text-base btn-press shadow-lg"><i class="fas fa-arrow-left md:mr-2"></i> <span class="hidden md:inline">${t().backBtn}</span></button>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-16 mb-12 sm:mb-16">
                <div class="xl:col-span-2 flex flex-col-reverse lg:flex-row gap-4 sm:gap-6">
                    <div class="w-full lg:w-28 flex flex-row lg:flex-col gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2 lg:pb-0 snap-x">${thumbnailsHTML}</div>
                    <div class="flex-grow rounded-2xl shadow-xl overflow-hidden bg-gray-100">
                        <div id="main-image-container" class="w-full aspect-[4/3] relative cursor-zoom-in group transition-all duration-300" onclick="window.openLightboxCurrent()">
                            ${initialContainerHTML}
                        </div>
                    </div>
                </div>

                <div class="xl:col-span-1 space-y-6 sm:space-y-8">
                    <div class="grid grid-cols-2 gap-3 sm:gap-4">
                        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-md border flex flex-col items-center text-center">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-3 sm:mb-4"><i class="fas fa-ruler-combined text-brand-orange text-lg sm:text-xl"></i></div>
                            <span class="text-gray-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-1 block truncate">${t().totalArea}</span>
                            <span class="font-black text-2xl sm:text-3xl text-gray-900">${project.area} <span class="text-sm sm:text-base text-brand-orange ml-1">m²</span></span>
                        </div>
                        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-md border flex flex-col items-center text-center">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3 sm:mb-4"><i class="fas fa-door-open text-green-500 text-lg sm:text-xl"></i></div>
                            <span class="text-gray-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-1 block truncate">${t().roomCount}</span>
                            <span class="font-black text-2xl sm:text-3xl text-gray-900">${project.rooms}</span>
                        </div>
                    </div>

                    <div class="bg-[#1a201c] p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                        <h3 class="text-xl sm:text-2xl font-bold text-white mb-2 relative z-10">${t().getQuoteTitle}</h3>
                        <p class="text-gray-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8 relative z-10">Mimarımız sizi arayıp bu proje hakkında detaylı bilgi versin.</p>
                        
                        <form id="project-form" class="space-y-4 relative z-10" onsubmit="window.submitTestForm(event, 'project-form')">
                            <div>
                                <input type="text" id="project-form-name" placeholder="${t().formName}" oninput="window.clearError(this)" class="w-full px-4 py-3 sm:px-5 sm:py-4 bg-black/40 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-brand-orange transition-all text-sm sm:text-base">
                                <div id="project-form-name-error" class="text-red-500 text-xs mt-1 hidden pl-1"><i class="fas fa-exclamation-circle mr-1"></i>${t().formErrorName}</div>
                            </div>
                            <div>
                                <input type="tel" id="project-form-phone" placeholder="${t().formPhone}" oninput="window.formatPhone(this)" maxlength="15" class="w-full px-4 py-3 sm:px-5 sm:py-4 bg-black/40 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-brand-orange transition-all tracking-wider text-sm sm:text-base">
                                <div id="project-form-phone-error" class="text-red-500 text-xs mt-1 hidden pl-1"><i class="fas fa-exclamation-circle mr-1"></i>${t().formErrorPhone}</div>
                            </div>
                            <button type="submit" class="w-full bg-brand-orange text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all shadow-lg hover:bg-orange-500 mt-2 flex justify-center items-center text-sm sm:text-base btn-press">
                                <i class="fas fa-paper-plane mr-2"></i> ${t().submitBtn}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div class="bg-white p-6 sm:p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100 max-w-4xl break-words mb-12 sm:mb-16">
                <h3 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 border-l-4 border-brand-orange pl-3 sm:pl-4">${t().projectDetailsTitle}</h3>
                <p class="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg font-medium">${project.description[state.lang]}</p>
            </div>
            
            <div class="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-8 sm:pt-12 gap-4">
                 <div class="w-full sm:w-1/2 flex justify-start">
                     <button onclick="navigate('${prevProject.id}')" class="group flex items-center text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 p-4 rounded-2xl w-full max-w-sm transition-colors btn-press">
                         <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm group-hover:text-brand-orange transition-colors"><i class="fas fa-arrow-left"></i></div>
                         <div>
                             <span class="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">${t().prevProject}</span>
                             <span class="text-sm sm:text-base font-bold text-gray-900 truncate block">${state.lang === 'tr' ? prevProject.title : prevProject.titleEn}</span>
                         </div>
                     </button>
                 </div>
                 <div class="w-full sm:w-1/2 flex justify-end">
                     <button onclick="navigate('${nextProject.id}')" class="group flex items-center text-right bg-gray-50 hover:bg-gray-100 border border-gray-200 p-4 rounded-2xl w-full max-w-sm transition-colors justify-end btn-press">
                         <div>
                             <span class="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">${t().nextProject}</span>
                             <span class="text-sm sm:text-base font-bold text-gray-900 truncate block">${state.lang === 'tr' ? nextProject.title : nextProject.titleEn}</span>
                         </div>
                         <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center ml-4 shadow-sm group-hover:text-brand-orange transition-colors"><i class="fas fa-arrow-right"></i></div>
                     </button>
                 </div>
            </div>
        </div>
    `;
}

function renderFooter() {
    DOM.footer.innerHTML = `
        <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-10 border-b border-gray-800 pb-10">
                <div class="flex flex-col items-center md:items-start text-center md:text-left">
                    <img src="${siteConfig.contact.logoSrc}" alt="Kartech Panel" class="w-48 sm:w-56 mb-6 cursor-pointer hover:opacity-80 transition-opacity btn-press object-contain" onclick="navigate('home')">
                    <p class="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">${siteConfig.homeHero.subSlogan[state.lang]}</p>
                </div>
                <div class="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 class="text-white font-bold text-lg mb-5 tracking-wide uppercase text-sm">${t().menu['ev-modelleri'] || 'Projeler'}</h4>
                    <ul class="space-y-3 text-gray-400 font-medium">
                        <li><a href="#" onclick="navigate('ev-modelleri', event)" class="hover:text-brand-orange transition-colors">${t().menu['ev-modelleri']}</a></li>
                        <li><a href="#" onclick="navigate('bahce-yapilari', event)" class="hover:text-brand-orange transition-colors">${t().menu['bahce-yapilari']}</a></li>
                        <li><a href="#" onclick="navigate('garaj-sistemleri', event)" class="hover:text-brand-orange transition-colors">${t().menu['garaj-sistemleri']}</a></li>
                        <li><a href="#" onclick="navigate('sip-panel', event)" class="hover:text-brand-orange transition-colors">${t().menu['sip-panel']}</a></li>
                    </ul>
                </div>
                <div class="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 class="text-white font-bold text-lg mb-5 tracking-wide uppercase text-sm">${t().pageTitles['iletisim']}</h4>
                    <ul class="space-y-3 text-gray-400 font-medium">
                        <li class="flex items-center justify-center md:justify-start"><i class="fas fa-phone-alt mr-3 text-brand-orange"></i> <a href="tel:${siteConfig.contact.phone.replace(/\s/g,'')}" class="hover:text-white transition-colors">${siteConfig.contact.phone}</a></li>
                        <li class="flex items-center justify-center md:justify-start"><i class="fas fa-envelope mr-3 text-brand-orange"></i> <a href="mailto:${siteConfig.contact.email}" class="hover:text-white transition-colors break-all">${siteConfig.contact.email}</a></li>
                        <li class="flex items-start justify-center md:justify-start mt-2"><i class="fas fa-map-marker-alt mr-3 mt-1 text-brand-orange"></i> <span>${siteConfig.contact.address}</span></li>
                    </ul>
                    <div class="flex space-x-4 mt-6 text-xl">
                        <a href="${siteConfig.contact.social.instagram}" target="_blank" aria-label="Instagram" class="text-gray-400 hover:text-brand-orange transition-colors btn-press"><i class="fab fa-instagram"></i></a>
                        <a href="${siteConfig.contact.social.facebook}" target="_blank" aria-label="Facebook" class="text-gray-400 hover:text-brand-orange transition-colors btn-press"><i class="fab fa-facebook-f"></i></a>
                    </div>
                </div>
            </div>
            <p class="text-xs sm:text-sm text-gray-500 font-semibold tracking-wide text-center break-words">${t().footerText}</p>
        </div>
    `;
}

function initApp() {
    renderHeader();
    renderFooter();
    window.addEventListener('scroll', handleScroll);
    let hash = window.location.hash.substring(1);
    if(hash) { navigate(hash, null, true, true); } 
    else { state.currentView = 'home'; updateMetaTags('home'); renderHomePage(); }
    DOM.content.classList.remove('page-fade-out');
    DOM.content.classList.add('page-fade-in');
}

window.addEventListener('DOMContentLoaded', initApp);
