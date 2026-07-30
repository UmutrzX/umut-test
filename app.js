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
    activeGalleryIndex: 0,
    pageCache: {}
};

window.state = state;

const DOM = {
    header: document.getElementById('main-header'),
    content: document.getElementById('app-content'),
    footer: document.getElementById('main-footer')
};

function t() { return siteConfig.i18n[state.lang]; }

function updateMetaTags(viewOrId, projectData = null) {
    const baseTitle = "ZEMU SIPPAN Structures";
    let title = "";
    let desc = "";
    let img = siteConfig.contact.logoSrc;
    let url = window.location.href;

    if (projectData) {
        title = `${state.lang === 'tr' ? projectData.title : projectData.titleEn} | ${baseTitle}`;
        desc = projectData.description[state.lang];
        img = projectData.mainImage;
    } else {
        const pageTitles = t().pageTitles;
        title = `${pageTitles[viewOrId] || baseTitle} | ${baseTitle}`;
        desc = siteConfig.homeHero.subSlogan[state.lang];
    }
    
    document.title = title;
    
    const metaDesc = document.getElementById('meta-desc');
    if (metaDesc) metaDesc.content = desc;

    const ogTitle = document.getElementById('og-title');
    const ogDesc = document.getElementById('og-description');
    const ogImg = document.getElementById('og-image');
    const ogUrl = document.getElementById('og-url');
    const canonical = document.getElementById('canonical-link');
    
    if(ogTitle) ogTitle.content = title;
    if(ogDesc) ogDesc.content = desc;
    if(ogImg) ogImg.content = img;
    if(ogUrl) ogUrl.content = url;
    if(canonical) canonical.href = url.split('#')[0] + '#' + viewOrId;
}

export function navigate(viewOrId, evt = null, keepCategory = false, fromHash = false) {
    if (evt) evt.preventDefault(); 
    
    viewOrId = decodeURIComponent(viewOrId);
    
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
        
        const cacheKey = `${viewOrId}-${state.lang}-${state.activeCategory || 'all'}-${state.sortBy}`;
        
        if (state.pageCache[cacheKey] && !['home'].includes(viewOrId) && !siteConfig.projects.find(p => p.id === viewOrId)) {
            updateMetaTags(viewOrId);
            DOM.content.innerHTML = state.pageCache[cacheKey];
        } else {
            if (viewOrId === 'home') {
                updateMetaTags(viewOrId); renderHomePage();
            } else if (viewOrId === 'sip-panel') {
                updateMetaTags(viewOrId); renderSipPanelPage();
                state.pageCache[cacheKey] = DOM.content.innerHTML;
            } else if (viewOrId === 'hakkimizda') {
                updateMetaTags(viewOrId); renderAboutPage();
                state.pageCache[cacheKey] = DOM.content.innerHTML;
            } else if (viewOrId === 'iletisim') {
                updateMetaTags(viewOrId); renderContactPage();
                state.pageCache[cacheKey] = DOM.content.innerHTML;
            } else if (['konutlar', 'egitim-ticari', 'bahce-yapilari', 'garaj-yapilari'].includes(viewOrId)) {
                updateMetaTags(viewOrId); renderProjectsPage(viewOrId);
            } else if (['galeri'].includes(viewOrId)) {
                updateMetaTags(viewOrId); renderGenericPage(viewOrId);
                state.pageCache[cacheKey] = DOM.content.innerHTML;
            } else {
                const project = siteConfig.projects.find(p => p.id === viewOrId);
                if (project) { updateMetaTags(viewOrId, project); renderProjectDetail(viewOrId); }
                else { navigate('home'); }
            }
        }

        DOM.content.classList.remove('page-fade-out');
        DOM.content.classList.add('page-fade-in');
        window.dispatchEvent(new Event('scroll'));
    }, 300); 
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
    if(hash) {
        hash = decodeURIComponent(hash);
        navigate(hash, null, true, true);
    }
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
    if (!['konutlar', 'egitim-ticari', 'bahce-yapilari', 'garaj-yapilari'].includes(state.currentView)) {
        state.currentView = 'konutlar';
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
    
    document.querySelectorAll('.thumb-wrapper').forEach((el, i) => {
        if(i === index) {
            el.classList.add('border-brand-orange');
            el.classList.remove('border-transparent');
            el.style.opacity = '1';
        } else {
            el.classList.remove('border-brand-orange');
            el.classList.add('border-transparent');
            el.style.opacity = '0.7';
        }
    });
    
    container.style.opacity = 0; container.style.transform = 'scale(0.98)';
    setTimeout(() => { 
        if(media.type === 'image') {
            container.innerHTML = `<img id="detail-main-image" src="${media.url}" alt="Project details" class="absolute inset-0 w-full h-full object-cover transition-all duration-500 hover:scale-105 pointer-events-auto" loading="lazy">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-opacity duration-300 pointer-events-none"></div>
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur text-gray-900 px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-400 shadow-lg flex items-center pointer-events-none whitespace-nowrap z-10">
                <i class="fas fa-expand mr-2 text-brand-orange"></i> Tam Ekran
            </div>`;
        } else {
            container.innerHTML = `<iframe src="${media.embed}" class="absolute inset-0 w-full h-full" frameborder="0" allow="autoplay; fullscreen"></iframe>`;
        }
        container.style.opacity = 1; container.style.transform = 'scale(1)';
    }, 250); 
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
    const imgEl = document.getElementById('lightbox-img');
    const loader = document.getElementById('lightbox-loader');
    
    state.currentLightboxIndex = newIndex;
    state.currentLightboxArray = imagesOnly; 

    imgEl.classList.remove('loaded');
    if(loader) loader.classList.add('active');

    imgEl.onload = function() {
        if(loader) loader.classList.remove('active');
        imgEl.classList.add('loaded');
    };

    imgEl.src = imagesOnly[newIndex].url;
    document.getElementById('lightbox-counter').innerText = `${newIndex + 1} / ${imagesOnly.length}`;
    
    overlay.classList.add('active');
    document.addEventListener('keydown', window.handleLightboxKeys);
    
    if(imagesOnly.length > 1) {
        let nextIdx = (newIndex + 1) % imagesOnly.length;
        let preloader = new Image(); preloader.src = imagesOnly[nextIdx].url;
    }
};

window.closeLightbox = function() {
    document.getElementById('lightbox-overlay').classList.remove('active');
    document.removeEventListener('keydown', window.handleLightboxKeys);
    document.getElementById('lightbox-img').classList.remove('loaded');
};

window.changeLightboxImage = function(direction) {
    let arr = state.currentLightboxArray;
    if(!arr || arr.length <= 1) return;
    
    state.currentLightboxIndex += direction;
    
    if (state.currentLightboxIndex < 0) state.currentLightboxIndex = arr.length - 1;
    else if (state.currentLightboxIndex >= arr.length) state.currentLightboxIndex = 0;
    
    const imgEl = document.getElementById('lightbox-img');
    const loader = document.getElementById('lightbox-loader');
    
    imgEl.classList.remove('loaded');
    if(loader) loader.classList.add('active');
    
    setTimeout(() => {
        imgEl.onload = function() {
            if(loader) loader.classList.remove('active');
            imgEl.classList.add('loaded');
        };
        imgEl.src = arr[state.currentLightboxIndex].url;
        document.getElementById('lightbox-counter').innerText = `${state.currentLightboxIndex + 1} / ${arr.length}`;
        
        let nextIdx = (state.currentLightboxIndex + direction + arr.length) % arr.length;
        let preloader = new Image(); preloader.src = arr[nextIdx].url;
    }, 150);
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
    window.clearError(input);
};

window.clearError = function(input) {
    input.classList.remove('border-red-500');
    let errId = input.id === 'project-form-kvkk' ? 'project-form-kvkk-error' : 
                input.id === 'contact-form-kvkk' ? 'contact-form-kvkk-error' : (input.id + '-error');
    const err = document.getElementById(errId);
    if(err) err.classList.add('hidden');
}

window.submitTestForm = function(evt, formId) {
    evt.preventDefault();
    
    const form = document.getElementById(formId);
    const nameInput = document.getElementById(formId + '-name');
    const phoneInput = document.getElementById(formId + '-phone');
    const emailInput = document.getElementById(formId + '-email');
    const kvkkCheckbox = document.getElementById(formId + '-kvkk');
    
    const locationInput = document.getElementById(formId + '-location');
    const messageInput = document.getElementById(formId + '-message');

    const submitBtn = form.querySelector('button[type="submit"]');
    
    let hasError = false;

    if (nameInput.value.trim().length < 3) {
        nameInput.classList.add('border-red-500');
        const err = document.getElementById(formId + '-name-error');
        if(err) err.classList.remove('hidden');
        hasError = true;
    }

    const phoneDigits = phoneInput.value.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
        phoneInput.classList.add('border-red-500');
        const err = document.getElementById(formId + '-phone-error');
        if(err) err.classList.remove('hidden');
        hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput.value)) {
        emailInput.classList.add('border-red-500');
        const err = document.getElementById(formId + '-email-error');
        if(err) err.classList.remove('hidden');
        hasError = true;
    }
    
    if (locationInput && locationInput.value.trim().length < 2) {
        locationInput.classList.add('border-red-500');
        const err = document.getElementById(formId + '-location-error');
        if(err) err.classList.remove('hidden');
        hasError = true;
    }

    if (kvkkCheckbox && !kvkkCheckbox.checked) {
        const err = document.getElementById(formId + '-kvkk-error');
        if(err) err.classList.remove('hidden');
        hasError = true;
    }

    if(hasError) return; 

    let projectContext = "";
    if (state.currentView !== 'home' && siteConfig.projects.find(p => p.id === state.currentView)) {
        const pInfo = siteConfig.projects.find(p => p.id === state.currentView);
        const pName = state.lang === 'tr' ? pInfo.title : pInfo.titleEn;
        projectContext = `\nİlgilenilen Proje: ${pName} (${pInfo.area} m²)`;
    }
    
    const formData = {
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput ? emailInput.value : undefined,
        location: locationInput ? locationInput.value : "Belirtilmedi",
        message: messageInput ? messageInput.value : "Mesaj yok.",
        project: projectContext,
        _subject: "Yeni Müşteri Talebi (" + (projectContext ? "Proje" : "Genel") + ")"
    };

    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Gönderiliyor...`;
    submitBtn.disabled = true;

    sendFormWithFallback(formData, 0, submitBtn, form);
};

function sendFormWithFallback(data, apiIndex, btn, form) {
    if (apiIndex >= siteConfig.formSubmission.endpoints.length) {
        showToast("Sistem hatası. Lütfen WhatsApp üzerinden ulaşın.");
        btn.innerHTML = `<i class="fas fa-paper-plane mr-2"></i> Gönder`;
        btn.disabled = false;
        return;
    }

    const api = siteConfig.formSubmission.endpoints[apiIndex];
    
    fetch(api.url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('alert-modal').classList.add('active');
            form.reset(); 
            btn.innerHTML = `<i class="fas fa-check-circle mr-2"></i> Başarıyla Gönderildi`;
            setTimeout(() => {
                btn.innerHTML = `Ücretsiz Teklif Al`;
                btn.disabled = false;
            }, 3000);
        } else {
            throw new Error('API Yanıt Vermedi');
        }
    })
    .catch(error => {
        console.warn(`${api.name} başarısız oldu. Bir sonraki API deneniyor...`);
        sendFormWithFallback(data, apiIndex + 1, btn, form);
    });
}

function renderHeader() {
    const menuItems = ['sip-panel', 'konutlar', 'egitim-ticari', 'bahce-yapilari', 'garaj-yapilari', 'galeri', 'hakkimizda'];
    
    const overlayMenuHTML = menuItems.map(id => {
        const isProjectMenu = ['konutlar', 'egitim-ticari', 'bahce-yapilari', 'garaj-yapilari'].includes(id);
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
                       <a href="#${id}" class="text-base sm:text-lg text-gray-400 hover:text-brand-orange cursor-pointer font-medium py-2" onclick="window.filterAndNavigate('${id}', 'all', event)">${t().allProjectsTitle}</a>
                       ${categories.map(cat => `<a href="#${id}" class="text-base sm:text-lg text-gray-400 hover:text-brand-orange cursor-pointer font-medium py-2" onclick="window.filterAndNavigate('${id}', '${cat.id}', event)">${cat[state.lang]}</a>`).join('')}
                   </div>
               </div>
            </div>`;
        } else {
            return `
            <div class="mb-4">
                <div class="w-[220px] sm:w-[280px] flex items-center justify-between">
                    <a href="#${id}" onclick="navigate('${id}', event)" class="text-2xl sm:text-3xl font-semibold text-gray-300 hover:text-white transition block">${label}</a>
                </div>
            </div>`;
        }
    }).join('');

    DOM.header.innerHTML = `
        <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative z-50">
            <a href="#home" class="cursor-pointer h-full flex items-center py-2" onclick="navigate('home', event)">
                 <img id="header-logo" src="${siteConfig.contact.logoSrc}" alt="ZEMU SIPPAN" class="h-16 sm:h-24 md:h-32 lg:h-40 w-auto object-contain object-left transition-all duration-500 mix-blend-multiply origin-left">
            </a>
            
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
                <a href="#iletisim" onclick="navigate('iletisim', event)" class="hidden md:block cta-pulse bg-brand-orange hover:bg-orange-500 text-white font-semibold py-2.5 px-6 sm:px-8 rounded-full shadow-md transition-all btn-press text-xs sm:text-sm whitespace-nowrap">
                    ${t().consultBtn}
                </a>
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
    const hasHero = ['home', 'sip-panel'].includes(state.currentView);

    if (window.scrollY > 50) {
        header.classList.remove('bg-transparent');
        header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-gray-100');
        if(logo) {
            logo.classList.remove('h-16', 'sm:h-24', 'md:h-32', 'lg:h-40');
            logo.classList.add('h-14', 'sm:h-16', 'md:h-18', 'lg:h-20');
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
            logo.classList.remove('h-14', 'sm:h-16', 'md:h-18', 'lg:h-20');
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
    const projectsHTML = pageProjects.map((project, index) => `
        <a href="#${project.id}" class="project-card bg-white border border-gray-100 cursor-pointer rounded-2xl btn-press overflow-hidden flex flex-col group block shadow-sm" onclick="navigate('${project.id}', event)">
            <div class="relative aspect-[4/3] overflow-hidden">
                <img src="${project.mainImage}" alt="${state.lang === 'tr' ? project.title : project.titleEn}" class="w-full h-full object-cover" loading="lazy">
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400 flex items-center justify-center pointer-events-none">
                     <span class="bg-brand-orange text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-bold opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-400 shadow-2xl text-sm md:text-base flex items-center">${t().projectDetailsTitle} <i class="fas fa-arrow-right ml-2"></i></span>
                </div>
            </div>
            <div class="p-5 bg-white flex-grow flex items-center justify-between border-t border-gray-50">
                <h3 class="text-gray-900 font-bold text-base sm:text-lg md:text-xl group-hover:text-brand-orange transition-colors truncate pr-2">${state.lang === 'tr' ? project.title : project.titleEn}</h3>
                <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors shrink-0"><i class="fas fa-chevron-right text-xs sm:text-sm"></i></div>
            </div>
        </a>
    `).join('');

    const processHTML = (t().processSteps || []).map((step, idx) => `
        <div class="flex flex-col items-center text-center relative z-10 group">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-50 text-brand-orange text-3xl mb-4 group-hover:scale-110 group-hover:border-brand-orange transition-all duration-300">
                <i class="fas ${step.icon}"></i>
            </div>
            <h4 class="font-bold text-lg text-gray-900 mb-2">${idx+1}. ${step.title}</h4>
            <p class="text-sm text-gray-500 font-medium">${step.desc}</p>
        </div>
    `).join('');

    const faqHTML = (t().faq || []).map((f, idx) => `
        <details class="group bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 overflow-hidden h-max break-inside-avoid">
            <summary class="flex justify-between items-center font-bold cursor-pointer list-none p-4 sm:p-5 text-gray-900 hover:text-brand-orange transition-colors">
                <span class="text-sm sm:text-base pr-4">${f.q}</span>
                <span class="transition group-open:rotate-180 shrink-0"><i class="fas fa-chevron-down text-brand-orange"></i></span>
            </summary>
            <div class="text-gray-600 font-medium p-4 sm:p-5 pt-0 border-t border-gray-50 leading-relaxed text-sm sm:text-base bg-gray-50/50">${f.a}</div>
        </details>
    `).join('');

    DOM.content.innerHTML = `
        <div class="relative w-full h-[100vh] flex flex-col justify-start overflow-hidden bg-black">
            <div class="absolute inset-0 z-0">
                <img src="${siteConfig.homeHero.backgroundImage}" alt="Hero Background" class="w-full h-full object-cover opacity-80" loading="eager">
            </div>
            <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center z-20">
                <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="max-w-2xl lg:max-w-3xl transform">
                        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg tracking-tight">${siteConfig.homeHero.slogan[state.lang]}</h1>
                        <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-medium drop-shadow-md leading-relaxed">${siteConfig.homeHero.subSlogan[state.lang]}</p>
                        <button onclick="document.getElementById('categories-section').scrollIntoView({behavior: 'smooth'})" class="cta-pulse mt-8 md:mt-10 bg-brand-orange text-white font-bold px-6 py-3.5 sm:px-8 sm:py-4 rounded-full shadow-lg hover:bg-orange-500 transition-all btn-press text-sm sm:text-base md:text-lg w-max flex items-center">
                            ${state.lang === 'tr' ? 'Çözümlerimizi İncele' : 'View Solutions'} <i class="fas fa-arrow-down ml-3"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="categories-section" class="bg-white relative z-30 w-full py-10 sm:py-16 border-b border-gray-100">
            <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-8 sm:mb-10">
                    <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight">${state.lang === 'tr' ? 'Tüm Yapı Çözümlerimiz' : 'Our Building Solutions'}</h2>
                    <div class="w-16 md:w-24 h-1.5 bg-brand-orange rounded-full mx-auto"></div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    <a href="#konutlar" onclick="navigate('konutlar', event)" class="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer btn-press shadow-md block">
                        <img src="${siteConfig.projects.find(p=>p.pageMenu==='konutlar')?.mainImage || siteConfig.homeHero.backgroundImage}" alt="Konutlar" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 w-full p-5 sm:p-6">
                            <h3 class="text-xl sm:text-2xl font-bold text-white mb-1">${t().menu['konutlar']}</h3>
                            <span class="text-brand-orange text-sm font-medium flex items-center group-hover:text-white transition-colors">${state.lang === 'tr' ? 'Modelleri Gör' : 'View Models'} <i class="fas fa-arrow-right ml-2"></i></span>
                        </div>
                    </a>
                    <a href="#egitim-ticari" onclick="navigate('egitim-ticari', event)" class="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer btn-press shadow-md block">
                        <img src="${siteConfig.projects.find(p=>p.pageMenu==='egitim-ticari')?.mainImage || siteConfig.homeHero.backgroundImage}" alt="Eğitim ve Ticari Yapılar" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 w-full p-5 sm:p-6">
                            <h3 class="text-xl sm:text-2xl font-bold text-white mb-1">${t().menu['egitim-ticari']}</h3>
                            <span class="text-brand-orange text-sm font-medium flex items-center group-hover:text-white transition-colors">${state.lang === 'tr' ? 'Modelleri Gör' : 'View Models'} <i class="fas fa-arrow-right ml-2"></i></span>
                        </div>
                    </a>
                    <a href="#bahce-yapilari" onclick="navigate('bahce-yapilari', event)" class="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer btn-press shadow-md block">
                        <img src="${siteConfig.projects.find(p=>p.pageMenu==='bahce-yapilari')?.mainImage || siteConfig.homeHero.backgroundImage}" alt="Bahçe Yapıları" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 w-full p-5 sm:p-6">
                            <h3 class="text-xl sm:text-2xl font-bold text-white mb-1">${t().menu['bahce-yapilari']}</h3>
                            <span class="text-brand-orange text-sm font-medium flex items-center group-hover:text-white transition-colors">${state.lang === 'tr' ? 'Modelleri Gör' : 'View Models'} <i class="fas fa-arrow-right ml-2"></i></span>
                        </div>
                    </a>
                    <a href="#garaj-yapilari" onclick="navigate('garaj-yapilari', event)" class="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer btn-press shadow-md block" style="animation-delay: 400ms;">
                        <img src="${siteConfig.projects.find(p=>p.pageMenu==='garaj-yapilari')?.mainImage || siteConfig.homeHero.backgroundImage}" alt="Garaj Yapıları" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 w-full p-5 sm:p-6">
                            <h3 class="text-xl sm:text-2xl font-bold text-white mb-1">${t().menu['garaj-yapilari']}</h3>
                            <span class="text-brand-orange text-sm font-medium flex items-center group-hover:text-white transition-colors">${state.lang === 'tr' ? 'Modelleri Gör' : 'View Models'} <i class="fas fa-arrow-right ml-2"></i></span>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <div class="bg-gray-50 relative z-20 w-full py-10 sm:py-16 border-b border-gray-200">
            <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-10">
                    <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">${t().processTitle || 'Nasıl Çalışıyoruz?'}</h2>
                    <div class="w-16 md:w-24 h-1.5 bg-brand-orange rounded-full mx-auto"></div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
                    <div class="hidden lg:block absolute top-10 left-20 right-20 h-1 bg-gray-200 z-0"></div>
                    ${processHTML}
                </div>
            </div>
        </div>

        <div class="bg-white relative z-20 w-full py-10 sm:py-16 border-b border-gray-200">
            <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                    <div class="w-full lg:w-1/2 lg:sticky lg:top-24">
                        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mb-5 leading-tight tracking-tight">${state.lang === 'tr' ? 'Neden ZEMU SIPPAN Teknolojisi?' : 'Why ZEMU SIPPAN Technology?'}</h2>
                        <div class="w-16 sm:w-24 h-1.5 bg-brand-orange rounded-full mb-6"></div>
                        <p class="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 font-medium">
                            ${state.lang === 'tr' ? 'Geleneksel betonarme veya hafif çelik sistemlerin ötesine geçin. SIP (Yapısal Yalıtımlı Panel) teknolojisi, üstün ısı yalıtımı ile enerji maliyetlerinizi düşürürken, fabrikasyon üretim sayesinde inşaat süresini aylardan haftalara indirir.' : 'Go beyond traditional concrete or light steel systems. SIP technology reduces energy costs with superior insulation while cutting construction time from months to weeks.'}
                        </p>
                        <p class="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                            ${state.lang === 'tr' ? 'Depreme karşı yekpare ve esnek bir duruş sergileyen yapılarımız, estetikten ödün vermeden doğayla uyumlu, uzun ömürlü ve güvenli yaşam alanları sunar.' : 'Providing a monolithic and flexible stance against earthquakes, our structures offer long-lasting, safe, and eco-friendly living spaces without compromising on aesthetics.'}
                        </p>
                        <a href="#sip-panel" onclick="navigate('sip-panel', event)" class="inline-flex items-center text-brand-orange font-bold text-sm sm:text-base hover:text-gray-900 transition-colors btn-press">
                            ${state.lang === 'tr' ? 'SIP Panel Detaylarını İnceleyin' : 'Explore SIP Panel Details'} <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                    </div>
                    
                    <div class="w-full lg:w-1/2">
                        <div class="space-y-8 sm:space-y-12">
                            <div class="flex flex-col sm:flex-row items-start sm:gap-5 group">
                                <div class="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 mb-3 sm:mb-0 group-hover:bg-brand-orange transition-colors">
                                    <i class="fas fa-leaf text-xl text-brand-orange group-hover:text-white transition-colors"></i>
                                </div>
                                <div>
                                    <h4 class="text-lg sm:text-xl font-black text-gray-900 mb-2">${state.lang === 'tr' ? 'Maksimum Enerji Tasarrufu' : 'Maximum Energy Savings'}</h4>
                                    <p class="text-gray-600 font-medium leading-relaxed text-sm">${state.lang === 'tr' ? 'Eksiz yalıtım katmanı sayesinde ısıtma ve soğutma giderlerinde %60 net tasarruf elde edin. Enerji dostu yalıtım, doğayı ve cebinizi korur.' : 'Up to 60% savings on heating and cooling costs thanks to the seamless insulation layer.'}</p>
                                </div>
                            </div>
                            <div class="flex flex-col sm:flex-row items-start sm:gap-5 group">
                                <div class="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 mb-3 sm:mb-0 group-hover:bg-brand-orange transition-colors">
                                    <i class="fas fa-stopwatch text-xl text-brand-orange group-hover:text-white transition-colors"></i>
                                </div>
                                <div>
                                    <h4 class="text-lg sm:text-xl font-black text-gray-900 mb-2">${state.lang === 'tr' ? 'Ultra Hızlı Kurulum' : 'Ultra-Fast Installation'}</h4>
                                    <p class="text-gray-600 font-medium leading-relaxed text-sm">${state.lang === 'tr' ? 'Fabrikada milimetrik üretilen panellerle şantiyede hava koşullarına takılmadan haftalar içinde anahtar teslim yapı imkanı sunuyoruz.' : 'Turnkey delivery in weeks without weather delays, using millimetrically precision-manufactured panels.'}</p>
                                </div>
                            </div>
                            <div class="flex flex-col sm:flex-row items-start sm:gap-5 group">
                                <div class="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 mb-3 sm:mb-0 group-hover:bg-brand-orange transition-colors">
                                    <i class="fas fa-shield-alt text-xl text-brand-orange group-hover:text-white transition-colors"></i>
                                </div>
                                <div>
                                    <h4 class="text-lg sm:text-xl font-black text-gray-900 mb-2">${state.lang === 'tr' ? 'Sarsılmaz Deprem Güvenliği' : 'Superior Earthquake Safety'}</h4>
                                    <p class="text-gray-600 font-medium leading-relaxed text-sm">${state.lang === 'tr' ? 'Betonarmeye göre çok daha hafif ve esnek yapısı ile deprem enerjisini emer, çatlamaz ve yıkılmaz bir bütünlük sunar.' : 'Lighter and more flexible than concrete, it absorbs earthquake energy and provides unshakable integrity.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="featured-projects" class="bg-gray-50 relative z-20 w-full py-10 sm:py-16">
            <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-8 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                    <div class="text-left">
                        <h2 class="text-2xl sm:text-3xl font-black text-gray-900 mb-3 tracking-tight">${state.lang === 'tr' ? 'Öne Çıkan Projeler' : 'Featured Projects'}</h2>
                        <div class="w-16 md:w-24 h-1.5 bg-brand-orange rounded-full"></div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">${projectsHTML}</div>
            </div>
        </div>

        <div class="bg-white relative z-20 w-full py-10 sm:py-16 border-t border-gray-200">
            <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-8 sm:mb-12">
                    <h2 class="text-2xl sm:text-3xl font-black text-gray-900 mb-3">${t().faqTitle || 'Sıkça Sorulan Sorular'}</h2>
                    <div class="w-16 md:w-24 h-1.5 bg-brand-orange mx-auto rounded-full"></div>
                </div>
                <div class="columns-1 lg:columns-2 gap-8 items-start">
                    ${faqHTML}
                </div>
            </div>
        </div>

        <div class="bg-[#1a201c] relative z-20 w-full py-12 sm:py-16 overflow-hidden border-t-4 border-brand-orange">
            <div class="absolute inset-0 bg-brand-orange/5 pattern-dots pointer-events-none"></div>
            <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">${state.lang === 'tr' ? 'Hayalinizdeki Yapıya Hemen Kavuşun' : 'Get Your Dream Structure Now'}</h2>
                <p class="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 font-medium">${state.lang === 'tr' ? 'Mimarlarımızla projenizi detaylandırmak ve size özel, ücretsiz fiyat teklifi almak için iletişime geçin.' : 'Contact us to detail your project with our architects and get a custom free quote.'}</p>
                <a href="#iletisim" onclick="navigate('iletisim', event)" class="cta-pulse inline-flex items-center justify-center bg-brand-orange text-white font-bold px-8 py-3 sm:py-4 rounded-full shadow-2xl hover:bg-orange-500 transition-all btn-press text-sm sm:text-base">
                    <i class="fas fa-paper-plane mr-3"></i> ${state.lang === 'tr' ? 'Ücretsiz Teklif Alın' : 'Get a Free Quote'}
                </a>
            </div>
        </div>
    `;
}

function renderSipPanelPage() {
    const data = t().sipPanelData;
    
    const advantagesHTML = data.advantages.map((adv, idx) => `
        <div class="flex flex-col gap-3 group">
            <div class="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200 group-hover:border-brand-orange transition-colors">
                <i class="fas ${adv.icon} text-lg text-gray-900 group-hover:text-brand-orange transition-colors"></i>
            </div>
            <h4 class="text-xl font-bold text-gray-900">${adv.title}</h4>
            <p class="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">${adv.desc}</p>
        </div>
    `).join('');

    const specsHTML = data.technicalSpecs.map((spec, idx) => `
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-100 last:border-0 gap-2 sm:gap-6">
            <span class="font-bold text-gray-700 text-sm sm:text-base w-full sm:w-1/3 flex items-center"><i class="fas fa-check text-brand-green mr-3 text-xs"></i> ${spec.label}</span>
            <span class="text-gray-600 font-medium text-sm sm:text-base w-full sm:w-2/3 sm:text-right">${spec.value}</span>
        </div>
    `).join('');

    const usageHTML = data.usageAreas ? data.usageAreas.map((item, idx) => {
        let parts = item.split(':');
        let title = parts[0] || '';
        let desc = parts.slice(1).join(':') || '';
        return `
        <div class="flex items-start gap-3 bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <div class="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <i class="fas fa-check text-xs text-brand-green"></i>
            </div>
            <p class="text-gray-600 text-sm sm:text-base leading-relaxed">${desc ? `<strong class="text-gray-900 block mb-1">${title}</strong>${desc}` : `<strong class="text-gray-900">${title}</strong>`}</p>
    </div>`;
    }).join('') : '';

    DOM.content.innerHTML = `
        <div class="relative w-full h-[60vh] md:h-[70vh] flex overflow-hidden bg-black">
            <div class="absolute inset-0 z-0">
                <img src="${data.heroImg}" alt="SIP Panel Background" class="w-full h-full object-cover opacity-60" loading="eager">
            </div>
            
            <div class="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 z-10 pt-16">
                <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight drop-shadow-xl">${t().pageTitles['sip-panel']}</h1>
                <div class="w-16 sm:w-24 h-1.5 bg-brand-orange rounded-full"></div>
            </div>
        </div>
        
        <div class="bg-white py-12 sm:py-16 px-4 sm:px-6 relative z-30">
            <div class="max-w-[1000px] mx-auto space-y-12 sm:space-y-20">
                
                <div>
                    <h3 class="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-6 tracking-tight">${data.introTitle}</h3>
                    <div class="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed font-medium space-y-4">
                        <p>${data.introText.split('<br><br>')[0] || data.introText}</p>
                        ${data.introText.split('<br><br>')[1] ? `<p>${data.introText.split('<br><br>')[1]}</p>` : ''}
                    </div>
                </div>
                
                <div class="w-full h-px bg-gray-100"></div>

                <div>
                    <div class="mb-8 sm:mb-12">
                        <h3 class="text-2xl sm:text-3xl font-black text-gray-900 mb-3">${data.advantagesTitle}</h3>
                        <div class="w-16 sm:w-24 h-1.5 bg-brand-orange rounded-full"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                        ${advantagesHTML}
                    </div>
                </div>

                <div class="w-full h-px bg-gray-100"></div>

                ${data.usageAreas ? `
                <div>
                    <div class="mb-8 sm:mb-12">
                        <h3 class="text-2xl sm:text-3xl font-black text-gray-900 mb-3">${data.usageAreasTitle}</h3>
                        <div class="w-16 sm:w-24 h-1.5 bg-brand-orange rounded-full"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        ${usageHTML}
                    </div>
                </div>` : ''}

                ${data.futureTitle ? `
                <div class="bg-[#1a201c] p-6 sm:p-10 md:p-12 rounded-[2rem] shadow-2xl text-center relative overflow-hidden">
                    <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-brand-orange mb-4 relative z-10">${data.futureTitle}</h3>
                    <p class="text-gray-300 leading-relaxed text-sm sm:text-base font-medium relative z-10 max-w-4xl mx-auto">${data.futureText}</p>
                </div>` : ''}

                <div>
                    <div class="mb-6 border-l-4 border-brand-orange pl-4 sm:pl-5">
                        <h3 class="text-xl sm:text-2xl font-black text-gray-900 mb-2">${data.specsTitle}</h3>
                        <p class="text-xs sm:text-sm text-gray-500 font-medium">${data.specsDesc}</p>
                    </div>
                    <div class="border-t border-gray-100 pt-4">${specsHTML}</div>
                </div>

                <div class="bg-gray-50 rounded-[2rem] p-6 sm:p-10 md:p-12 border border-gray-200 text-center relative overflow-hidden mt-10 sm:mt-16">
                     <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-3 relative z-10">${state.lang === 'tr' ? 'Projenizde SIP Panel Kullanmaya Hazır mısınız?' : 'Ready to Use SIP Panels in Your Project?'}</h3>
                     <p class="text-gray-600 text-sm sm:text-base font-medium mb-6 relative z-10 max-w-2xl mx-auto">${state.lang === 'tr' ? 'Hemen uzman ekibimizle iletişime geçin, size özel çözümleri ve fiyat avantajlarını konuşalım.' : 'Contact our expert team now to discuss custom solutions and pricing advantages.'}</p>
                     
                     <a href="#iletisim" onclick="navigate('iletisim', event)" class="cta-pulse inline-flex items-center justify-center bg-brand-orange text-white font-bold px-8 py-3 sm:py-4 rounded-full shadow-lg hover:bg-orange-600 transition-all btn-press text-sm sm:text-base relative z-10 mx-auto w-full sm:w-auto text-center">
                         <i class="fas fa-headset mr-3"></i> ${state.lang === 'tr' ? 'Hemen Mimarlarımızla Görüşün' : 'Contact Our Architects Now'}
                     </a>
                </div>

            </div>
        </div>
    `;
}

function renderAboutPage() {
    const data = t().hakkimizdaData;

    const featuresHTML = data.features.map((f, idx) => `
        <div class="flex flex-col">
            <div class="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 border border-gray-200">
                <i class="fas ${f.icon} text-xl text-gray-900"></i>
            </div>
            <h4 class="text-lg font-bold text-gray-900 mb-2">${f.title}</h4>
            <p class="text-gray-600 leading-relaxed text-sm font-medium">${f.desc}</p>
        </div>
    `).join('');

    const paragraphsHTML = data.paragraphs.map(p => `
        <p class="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed font-medium mb-4 last:mb-0">${p}</p>
    `).join('');

    DOM.content.innerHTML = `
        <div class="bg-white min-h-screen pt-28 sm:pt-36 pb-16">
            <div class="max-w-[1000px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                
                <div class="mb-10">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">${t().pageTitles['hakkimizda']}</h1>
                    <div class="w-20 h-1.5 bg-brand-orange rounded-full"></div>
                </div>

                <div class="mb-12">
                    ${paragraphsHTML}
                </div>

                <div class="w-full h-px bg-gray-100 mb-12"></div>

                <div>
                    <h2 class="text-xl sm:text-2xl font-black text-gray-900 mb-8">${data.techTitle}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                        ${featuresHTML}
                    </div>
                </div>
                
                <div class="mt-16 bg-gray-50 rounded-[2rem] p-6 sm:p-10 border border-gray-200 text-center">
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">${state.lang === 'tr' ? 'Projeleriniz için bizimle iletişime geçin' : 'Contact us for your projects'}</h3>
                    <p class="text-gray-500 font-medium mb-6 text-sm sm:text-base">${state.lang === 'tr' ? 'Uzman mimarlarımız ve mühendislerimizle hayalinizdeki yapıyı inşa edelim.' : 'Let us build your dream structure with our expert architects and engineers.'}</p>
                    <a href="#iletisim" onclick="navigate('iletisim', event)" class="inline-flex items-center justify-center bg-gray-900 text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-brand-orange transition-colors btn-press text-sm sm:text-base w-full sm:w-auto">
                        <i class="fas fa-paper-plane mr-3"></i> ${t().consultBtn}
                    </a>
                </div>

            </div>
        </div>
    `;
}

function renderContactPage() {
    DOM.content.innerHTML = `
        <div class="bg-gray-50 min-h-screen pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
            <div class="max-w-5xl mx-auto">
                <div class="text-center mb-8 sm:mb-12">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">${t().pageTitles['iletisim']}</h1>
                    <div class="w-16 sm:w-20 h-1.5 bg-brand-orange mx-auto rounded-full"></div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                    
                    <div class="space-y-6 lg:pr-6">
                        <h3 class="text-xl sm:text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-3">İletişim Bilgilerimiz</h3>
                        
                        <div class="flex items-start space-x-4">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 shadow-sm border border-orange-100">
                                <i class="fas fa-map-marker-alt text-brand-orange text-lg sm:text-xl"></i>
                            </div>
                            <div class="pt-1">
                                <h4 class="font-bold text-gray-900 mb-0.5 text-sm sm:text-base">Adres</h4>
                                <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">${siteConfig.contact.address}</p>
                            </div>
                        </div>

                        <div class="flex items-start space-x-4">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 shadow-sm border border-orange-100">
                                <i class="fas fa-phone-alt text-brand-orange text-lg sm:text-xl"></i>
                            </div>
                            <div class="pt-1">
                                <h4 class="font-bold text-gray-900 mb-0.5 text-sm sm:text-base">Telefon</h4>
                                <a href="tel:${siteConfig.contact.phone.replace(/\s/g,'')}" class="text-gray-600 hover:text-brand-orange transition-colors text-xs sm:text-sm font-medium">${siteConfig.contact.phone}</a>
                            </div>
                        </div>

                        <div class="flex items-start space-x-4">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 shadow-sm border border-orange-100">
                                <i class="fas fa-envelope text-brand-orange text-lg sm:text-xl"></i>
                            </div>
                            <div class="pt-1">
                                <h4 class="font-bold text-gray-900 mb-0.5 text-sm sm:text-base">E-Posta</h4>
                                <a href="mailto:${siteConfig.contact.email}" class="text-gray-600 hover:text-brand-orange transition-colors text-xs sm:text-sm break-all font-medium">${siteConfig.contact.email}</a>
                            </div>
                        </div>

                        <div class="w-full h-40 sm:h-56 rounded-xl overflow-hidden shadow-sm border border-gray-100 mt-4">
                            <iframe src="${siteConfig.contact.mapEmbedUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>

                    <div class="bg-[#1a201c] p-6 sm:p-8 rounded-2xl shadow-2xl relative">
                        <h3 class="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">${t().getQuoteTitle}</h3>
                        <p class="text-gray-400 text-xs sm:text-sm font-medium mb-5 relative z-10">${t().contactFormDesc || "Talebinizi iletin, dönüş yapalım."}</p>
                        
                        <form id="contact-form" class="space-y-4" onsubmit="window.submitTestForm(event, 'contact-form')">
                            <div>
                                <input type="text" id="contact-form-name" placeholder="${t().formName}" oninput="window.clearError(this)" class="w-full px-4 py-2.5 sm:px-4 sm:py-3 bg-black/40 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-brand-orange transition-colors text-sm">
                                <div id="contact-form-name-error" class="text-red-500 text-xs mt-1 hidden pl-1"><i class="fas fa-exclamation-circle mr-1"></i>${t().formErrorName}</div>
                            </div>
                            <div>
                                <input type="tel" id="contact-form-phone" placeholder="${t().formPhone}" oninput="window.formatPhone(this)" maxlength="15" class="w-full px-4 py-2.5 sm:px-4 sm:py-3 bg-black/40 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-brand-orange transition-colors tracking-wider text-sm">
                                <div id="contact-form-phone-error" class="text-red-500 text-xs mt-1 hidden pl-1"><i class="fas fa-exclamation-circle mr-1"></i>${t().formErrorPhone}</div>
                            </div>
                            <div>
                                <input type="email" id="contact-form-email" placeholder="${t().formEmail || 'E-Posta Adresi'}" oninput="window.clearError(this)" class="w-full px-4 py-2.5 sm:px-4 sm:py-3 bg-black/40 border border-gray-700 text-white rounded-xl focus:outline-none focus:border-brand-orange transition-colors text-sm">
                                <div id="contact-form-email-error" class="text-red-500 text-xs mt-1 hidden pl-1"><i class="fas fa-exclamation-circle mr-1"></i>${t().formErrorEmail || 'Geçerli bir mail giriniz.'}</div>
                            </div>
                            
                            <div class="flex items-start mt-2 bg-black/20 p-3 rounded-lg border border-gray-800">
                                <div class="flex items-center h-4 mt-0.5 shrink-0">
                                    <input id="contact-form-kvkk" type="checkbox" onchange="window.clearError(this)" class="w-4 h-4 rounded bg-black/40 border-gray-600 text-brand-orange focus:ring-brand-orange focus:ring-2 cursor-pointer accent-brand-orange">
                                </div>
                                <div class="ml-3 text-xs">
                                    <label for="contact-form-kvkk" class="text-gray-300 cursor-pointer font-medium leading-snug block">${t().kvkkText}</label>
                                    <div id="contact-form-kvkk-error" class="text-red-500 font-bold text-[11px] mt-1 hidden"><i class="fas fa-exclamation-circle mr-1"></i>${t().kvkkError}</div>
                                </div>
                            </div>

                            <button type="submit" class="cta-pulse w-full bg-brand-orange text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-lg hover:bg-orange-500 mt-4 flex justify-center items-center text-sm sm:text-base btn-press">
                                <i class="fas fa-paper-plane mr-2"></i> ${t().submitBtn}
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
        <div class="max-w-5xl mx-auto py-16 sm:py-24 px-4 sm:px-6 min-h-[60vh]">
            <div class="mb-8 sm:mb-12">
                <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-5 leading-tight tracking-tight">${title}</h1>
                <div class="w-16 sm:w-20 h-1.5 bg-brand-orange rounded-full"></div>
            </div>
            <div class="bg-white p-6 sm:p-8 md:p-12 shadow-xl border border-gray-100 rounded-3xl break-words text-sm sm:text-base">${content}</div>
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
        <button onclick="filterCategory(null, event)" class="w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 border-b border-gray-100/50 transition-all font-semibold btn-press rounded-xl mb-1 text-sm ${allCatActive ? 'bg-brand-orange text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-brand-orange'}">
            ${t().allProjectsTitle}
        </button>
    ` + specificCategories.map(cat => `
        <button onclick="filterCategory('${cat.id}', event)" class="w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 border-b border-gray-100/50 transition-all font-semibold btn-press rounded-xl mb-1 text-sm whitespace-nowrap lg:whitespace-normal ${state.activeCategory === cat.id ? 'bg-brand-orange text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-brand-orange'}">
            ${cat[state.lang]}
        </button>
    `).join('');

    const projectsHTML = pageProjects.length > 0 ? pageProjects.map((project, idx) => `
        <a href="#${project.id}" class="project-card bg-white border border-gray-100 cursor-pointer rounded-2xl btn-press overflow-hidden flex flex-col group shadow-sm block" onclick="navigate('${project.id}', event)">
            <div class="relative aspect-[16/10] overflow-hidden">
                <img src="${project.mainImage}" alt="${state.lang === 'tr' ? project.title : project.titleEn}" class="w-full h-full object-cover" loading="lazy">
                <div class="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1.5 font-bold rounded-lg shadow-lg z-10 text-xs">${project.area} ${t().sqm}</div>
            </div>
            <div class="p-4 sm:p-5 bg-white flex-grow flex items-center justify-between">
                <h3 class="text-gray-900 font-bold text-base sm:text-lg group-hover:text-brand-orange transition-colors truncate pr-2">${state.lang === 'tr' ? project.title : project.titleEn}</h3>
                <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors shrink-0"><i class="fas fa-chevron-right text-xs"></i></div>
            </div>
        </a>
    `).join('') : `<div class="col-span-full text-center py-16 sm:py-24 text-gray-400 font-medium text-base sm:text-lg bg-white rounded-3xl shadow-sm border border-dashed border-gray-300 mx-2">Proje bulunamadı.</div>`;

    DOM.content.innerHTML = `
        <div id="projects-grid" class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24 sm:mt-28">
            <div class="mb-8 sm:mb-10">
                <h1 class="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight tracking-tight">${t().pageTitles[pageId]}</h1>
                <div class="w-16 sm:w-20 h-1.5 bg-brand-orange rounded-full"></div>
            </div>
            <div class="flex flex-col lg:flex-row gap-6 sm:gap-8">
                <div class="w-full lg:w-1/4">
                    <div class="bg-white p-3 rounded-2xl border border-gray-100 lg:sticky lg:top-24 shadow-xl">
                        <h2 class="font-bold text-gray-900 mb-3 px-3 text-base sm:text-lg hidden lg:block tracking-tight">${t().categoryTitle}</h2>
                        <div class="flex flex-row overflow-x-auto no-scrollbar lg:flex-col gap-1 pb-2 lg:pb-0 snap-x">${allCategoriesHTML}</div>
                    </div>
                </div>
                <div class="w-full lg:w-3/4">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-6 bg-white p-3 rounded-xl shadow-sm border border-gray-100 gap-3">
                        <span class="text-xs sm:text-sm font-bold text-gray-500 tracking-wider px-2">${pageProjects.length} Sonuç</span>
                        <select aria-label="Sıralama" onchange="window.sortProjects(this.value)" class="w-full sm:w-auto bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-xs sm:text-sm rounded-lg focus:ring-2 focus:ring-brand-orange py-2 px-3 cursor-pointer outline-none transition-colors">
                            <option value="default" ${state.sortBy === 'default' ? 'selected' : ''}>Varsayılan</option>
                            <option value="areaAsc" ${state.sortBy === 'areaAsc' ? 'selected' : ''}>m² (Artan)</option>
                            <option value="areaDesc" ${state.sortBy === 'areaDesc' ? 'selected' : ''}>m² (Azalan)</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">${projectsHTML}</div>
                </div>
            </div>
        </div>
    `;
}

function renderProjectDetail(projectId) {
    const projectIndex = siteConfig.projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return navigate('home'); 
    
    const project = siteConfig.projects[projectIndex];
    const prjTitle = state.lang === 'tr' ? project.title : project.titleEn;
    
    let catName = "";
    const cats = siteConfig.categories[project.pageMenu] || [];
    const foundCat = cats.find(c => c.id === project.categoryId);
    if (foundCat) catName = foundCat[state.lang];

    const rawGallery = [project.mainImage, ...(project.gallery || []).filter(img => img !== project.mainImage)];
    const mediaItems = rawGallery.map(url => parseMedia(url));
    
    state.lightboxImages = mediaItems;
    state.activeGalleryIndex = 0; 
    
    if (state.sliderInterval) clearInterval(state.sliderInterval);
    
    const MAX_THUMBNAILS = 5;
    const visibleMedia = mediaItems.slice(0, MAX_THUMBNAILS);
    const hiddenCount = mediaItems.length - MAX_THUMBNAILS;

    const thumbnailsHTML = visibleMedia.map((media, index) => {
        const isVideo = media.type !== 'image';
        const isLastVisible = index === MAX_THUMBNAILS - 1 && hiddenCount > 0;
        const clickAction = isLastVisible ? `window.openLightbox(${index})` : `window.setGalleryImage(${index})`;
        const activeClass = index === 0 ? "border-brand-orange opacity-100" : "border-gray-200 opacity-70";

        return `
        <div class="w-20 sm:w-24 lg:w-28 aspect-video shrink-0 overflow-hidden rounded-xl border-2 ${activeClass} hover:border-brand-orange cursor-pointer btn-press relative group transition-all thumb-wrapper" onclick="${clickAction}">
             <img src="${media.thumb}" alt="Thumbnail ${index + 1}" class="w-full h-full object-cover ${isLastVisible ? 'opacity-40' : 'group-hover:opacity-100'} transition-opacity" loading="lazy">
             ${isVideo && !isLastVisible ? `<div class="absolute inset-0 flex items-center justify-center bg-black/30"><i class="fas fa-play-circle text-white text-lg drop-shadow-md"></i></div>` : ''}
             ${isLastVisible ? `
             <div class="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] group-hover:bg-black/50 transition-all">
                 <span class="text-white font-black text-sm drop-shadow-lg">+${hiddenCount}</span>
             </div>` : ''}
        </div>
    `}).join('');

    const initialMedia = mediaItems[0];
    let initialContainerHTML = '';
    if(initialMedia.type === 'image') {
        initialContainerHTML = `<img id="detail-main-image" src="${initialMedia.url}" alt="${prjTitle}" class="absolute inset-0 w-full h-full object-cover transition-all duration-500 pointer-events-auto" loading="eager">
        <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-gray-900 px-3 py-1.5 rounded-lg font-bold text-xs shadow-md flex items-center cursor-pointer pointer-events-auto hover:bg-brand-orange hover:text-white transition-colors" onclick="window.openLightboxCurrent()">
            <i class="fas fa-expand mr-1.5"></i> Büyüt
        </div>`;
    } else {
        initialContainerHTML = `<iframe src="${initialMedia.embed}" class="absolute inset-0 w-full h-full" frameborder="0" allow="autoplay; fullscreen"></iframe>`;
    }

    const relatedProjects = siteConfig.projects
        .filter(p => p.pageMenu === project.pageMenu && p.id !== project.id)
        .slice(0, 3);
        
    let relatedHTML = '';
    if(relatedProjects.length > 0) {
        relatedHTML = `
            <div class="mt-12 sm:mt-16">
                <h3 class="text-xl font-black text-gray-900 mb-6 border-l-4 border-brand-orange pl-3">${t().relatedProjectsTitle || 'Bunlar da İlginizi Çekebilir'}</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    ${relatedProjects.map((p, idx) => `
                        <a href="#${p.id}" class="group rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden block btn-press" onclick="navigate('${p.id}', event)">
                            <div class="aspect-video relative overflow-hidden">
                                <img src="${p.mainImage}" alt="${state.lang === 'tr' ? p.title : p.titleEn}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                            </div>
                            <div class="p-3 flex items-center justify-between">
                                <h4 class="font-bold text-gray-900 text-sm group-hover:text-brand-orange transition-colors truncate pr-2">${state.lang === 'tr' ? p.title : p.titleEn}</h4>
                                <i class="fas fa-arrow-right text-gray-300 group-hover:text-brand-orange transition-colors text-xs"></i>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    DOM.content.innerHTML = `
        <div class="max-w-[1300px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12 relative z-10">
            
            <div class="mb-5 sm:mb-6 flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center text-xs sm:text-sm font-semibold text-gray-500 space-x-2">
                    <a href="#home" onclick="window.navigate('home', event)" class="hover:text-brand-orange transition-colors"><i class="fas fa-home"></i></a>
                    <i class="fas fa-chevron-right text-[10px] text-gray-300"></i>
                    <a href="#${project.pageMenu}" onclick="window.navigate('${project.pageMenu}', event)" class="hover:text-brand-orange transition-colors">${t().menu[project.pageMenu]}</a>
                    <i class="fas fa-chevron-right text-[10px] text-gray-300"></i>
                    <span class="text-gray-900">${prjTitle}</span>
                </div>
                <button onclick="window.shareProject(event)" class="inline-flex items-center text-gray-500 hover:text-brand-orange font-semibold text-xs sm:text-sm transition-colors btn-press">
                    <i class="fas fa-share-alt mr-1.5"></i> Paylaş
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                
                <div class="lg:col-span-7 flex flex-col gap-3">
                    <div class="w-full rounded-2xl shadow-sm overflow-hidden bg-gray-50 border border-gray-100">
                        <div id="main-image-container" class="w-full aspect-[4/3] sm:aspect-video relative transition-all duration-300">
                            ${initialContainerHTML}
                        </div>
                    </div>
                    <div class="w-full flex flex-row gap-2 overflow-x-auto no-scrollbar pb-1 snap-x">
                        ${thumbnailsHTML}
                    </div>
                </div>

                <div class="lg:col-span-5 flex flex-col">
                    ${catName ? `<span class="inline-block bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-full w-max mb-2">${catName}</span>` : ''}
                    <h1 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-3">${prjTitle}</h1>
                    <p class="text-gray-600 text-sm leading-relaxed mb-5 font-medium">${project.description[state.lang]}</p>
                    
                    <div class="border border-gray-200 rounded-xl p-5 sm:p-6 bg-white shadow-sm mb-5">
                        <h4 class="font-bold text-base text-gray-900 mb-3 border-b border-gray-100 pb-2">Özellikler</h4>
                        
                        <div class="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
                            <span class="text-gray-500 font-medium">Kategori:</span>
                            <span class="font-bold text-gray-900 text-right">${catName || '-'}</span>
                        </div>
                        <div class="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
                            <span class="text-gray-500 font-medium">Toplam Alan:</span>
                            <span class="font-bold text-gray-900 text-right">${project.area} m²</span>
                        </div>
                        <div class="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
                            <span class="text-gray-500 font-medium">Oda Sayısı:</span>
                            <span class="font-bold text-gray-900 text-right">${project.rooms}</span>
                        </div>
                    </div>

                    <ul class="space-y-2 text-xs sm:text-sm text-gray-600 font-semibold">
                        <li class="flex items-center"><i class="fas fa-check text-brand-green mr-2"></i> 24 saat içinde geri dönüş</li>
                        <li class="flex items-center"><i class="fas fa-check text-brand-green mr-2"></i> Müşteri memnuniyeti tecrübesi</li>
                        <li class="flex items-center"><i class="fas fa-check text-brand-green mr-2"></i> Detaylı fiyatlandırma ve sunum</li>
                    </ul>
                </div>
            </div>

            <div class="w-full h-px bg-gray-200 my-8 sm:my-12"></div>

            <div class="max-w-4xl mx-auto">
                <div class="bg-white mb-8">
                    <h2 class="text-xl sm:text-2xl font-black text-gray-900 mb-1">Bu Modelle İlgileniyorum</h2>
                    <p class="text-gray-500 font-medium text-sm mb-6">Formu doldurun, detaylı bilgi ve fiyat teklifi gönderelim.</p>
                    
                    <form id="project-form" onsubmit="window.submitTestForm(event, 'project-form')">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-5">
                            
                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1.5">E-posta <span class="text-red-500">*</span></label>
                                <input type="email" id="project-form-email" placeholder="ornek@email.com" oninput="window.clearError(this)" class="w-full px-3 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm">
                                <div id="project-form-email-error" class="text-red-500 text-[10px] mt-1 hidden"><i class="fas fa-exclamation-circle mr-1"></i>Geçerli bir mail giriniz.</div>
                            </div>

                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1.5">Telefon <span class="text-red-500">*</span></label>
                                <input type="tel" id="project-form-phone" placeholder="+90 5XX XXX XX XX" oninput="window.formatPhone(this)" maxlength="15" class="w-full px-3 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors tracking-wide text-sm">
                                <div id="project-form-phone-error" class="text-red-500 text-[10px] mt-1 hidden"><i class="fas fa-exclamation-circle mr-1"></i>Geçerli bir telefon numarası giriniz.</div>
                            </div>

                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1.5">Ad Soyad <span class="text-red-500">*</span></label>
                                <input type="text" id="project-form-name" placeholder="Adınız ve Soyadınız" oninput="window.clearError(this)" class="w-full px-3 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm">
                                <div id="project-form-name-error" class="text-red-500 text-[10px] mt-1 hidden"><i class="fas fa-exclamation-circle mr-1"></i>Adınızı ve soyadınızı giriniz.</div>
                            </div>

                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1.5">Arsa Konumu (İl/İlçe) <span class="text-red-500">*</span></label>
                                <input type="text" id="project-form-location" placeholder="Örn: Ankara/Gölbaşı" oninput="window.clearError(this)" class="w-full px-3 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors text-sm">
                                <div id="project-form-location-error" class="text-red-500 text-[10px] mt-1 hidden"><i class="fas fa-exclamation-circle mr-1"></i>Lütfen arsa konumunu belirtiniz.</div>
                            </div>

                            <div class="md:col-span-2">
                                <label class="block text-xs font-bold text-gray-700 mb-1.5">Mesajınız</label>
                                <textarea id="project-form-message" rows="3" placeholder="${prjTitle} ile ilgili sorularınız..." class="w-full px-3 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors resize-none text-sm"></textarea>
                            </div>
                        </div>

                        <div class="flex items-start bg-gray-50 p-3 rounded-lg border border-gray-200 mb-5">
                            <div class="flex items-center h-4 mt-0.5 shrink-0">
                                <input id="project-form-kvkk" type="checkbox" onchange="window.clearError(this)" class="w-4 h-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange cursor-pointer accent-brand-orange">
                            </div>
                            <div class="ml-2 text-xs">
                                <label for="project-form-kvkk" class="text-gray-700 cursor-pointer font-medium leading-snug block"><a href="#" class="underline text-brand-orange hover:text-orange-500">KVKK Aydınlatma Metni</a>'ni okudum, kişisel verilerimin işlenmesini kabul ediyorum.</label>
                                <div id="project-form-kvkk-error" class="text-red-500 font-bold text-[10px] mt-1 hidden"><i class="fas fa-exclamation-circle mr-1"></i>Devam etmek için onaylamalısınız.</div>
                            </div>
                        </div>

                        <p class="text-[10px] text-gray-400 italic mb-3">Fiyatlarımız yaklaşık fiyatlardır. Mimarlarımız detaylı inceleme sonrası kesin teklifi tarafınıza iletecektir.</p>

                        <button type="submit" class="w-full bg-[#0a0a0a] text-white font-black py-3 rounded-xl transition-all shadow-md hover:bg-gray-800 flex justify-center items-center text-base btn-press disabled:opacity-70">
                            Ücretsiz Teklif Al
                        </button>
                    </form>
                </div>

                <div class="bg-gray-50 rounded-2xl p-5 text-center border border-gray-200 shadow-sm mt-6">
                    <span class="text-xs sm:text-sm text-gray-500 block mb-1.5 font-medium">Telefonla acil iletişim ve destek için:</span>
                    <a href="tel:${siteConfig.contact.phone.replace(/\s/g,'')}" class="text-xl sm:text-2xl font-black text-gray-900 hover:text-brand-orange transition-colors inline-flex items-center">
                        <i class="fas fa-phone-alt mr-2 text-brand-orange"></i>${siteConfig.contact.phone}
                    </a>
                    <div class="flex justify-center items-center gap-3 sm:gap-6 mt-4 text-[10px] sm:text-xs text-gray-600 font-semibold flex-wrap">
                        <span class="flex items-center"><i class="far fa-clock mr-1 text-gray-400"></i> 24 saat içinde geri dönüş</span>
                        <span class="flex items-center"><i class="fas fa-shield-alt mr-1 text-gray-400"></i> Bilgi güvende</span>
                        <span class="flex items-center"><i class="fas fa-users mr-1 text-gray-400"></i> Mimari destek</span>
                    </div>
                </div>
            </div>
            
            ${relatedHTML}
            
        </div>
    `;
    
    const waChatBtn = document.getElementById('btn-chat-floating');
    if (waChatBtn) {
        let msg = `Merhaba, ZEMU SIPPAN web sitesini inceliyordum. ${prjTitle} projeniz (${project.area} m²) hakkında detaylı bilgi alabilir miyim?`;
        waChatBtn.href = `https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
    }
}

function renderFooter() {
    DOM.footer.innerHTML = `
        <div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-gray-800 pb-8">
                <div class="flex flex-col items-center md:items-start text-center md:text-left">
                    <a href="#home" onclick="navigate('home', event)" class="cursor-pointer hover:opacity-80 transition-opacity btn-press block">
                        <img src="${siteConfig.contact.logoSrc}" alt="ZEMU SIPPAN" class="w-40 sm:w-48 mb-4 object-contain">
                    </a>
                    <p class="text-gray-400 text-xs leading-relaxed max-w-xs font-medium">${siteConfig.homeHero.subSlogan[state.lang]}</p>
                </div>
                <div class="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 class="text-white font-bold text-base mb-4 tracking-wide uppercase">${t().menu['konutlar'] || 'Projeler'}</h4>
                    <ul class="space-y-2.5 text-gray-400 font-medium text-sm">
                        <li><a href="#konutlar" onclick="navigate('konutlar', event)" class="hover:text-brand-orange transition-colors">${t().menu['konutlar']}</a></li>
                        <li><a href="#egitim-ticari" onclick="navigate('egitim-ticari', event)" class="hover:text-brand-orange transition-colors">${t().menu['egitim-ticari']}</a></li>
                        <li><a href="#bahce-yapilari" onclick="navigate('bahce-yapilari', event)" class="hover:text-brand-orange transition-colors">${t().menu['bahce-yapilari']}</a></li>
                        <li><a href="#garaj-yapilari" onclick="navigate('garaj-yapilari', event)" class="hover:text-brand-orange transition-colors">${t().menu['garaj-yapilari']}</a></li>
                        <li><a href="#sip-panel" onclick="navigate('sip-panel', event)" class="hover:text-brand-orange transition-colors">${t().menu['sip-panel']}</a></li>
                    </ul>
                </div>
                <div class="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 class="text-white font-bold text-base mb-4 tracking-wide uppercase">${t().pageTitles['iletisim']}</h4>
                    <ul class="space-y-2.5 text-gray-400 font-medium text-sm">
                        <li class="flex items-center justify-center md:justify-start"><i class="fas fa-phone-alt mr-2.5 text-brand-orange"></i> <a href="tel:${siteConfig.contact.phone.replace(/\s/g,'')}" class="hover:text-white transition-colors">${siteConfig.contact.phone}</a></li>
                        <li class="flex items-center justify-center md:justify-start"><i class="fas fa-envelope mr-2.5 text-brand-orange"></i> <a href="mailto:${siteConfig.contact.email}" class="hover:text-white transition-colors break-all">${siteConfig.contact.email}</a></li>
                        <li class="flex items-start justify-center md:justify-start mt-1.5"><i class="fas fa-map-marker-alt mr-2.5 mt-1 text-brand-orange"></i> <span>${siteConfig.contact.address}</span></li>
                    </ul>
                    <div class="flex space-x-4 mt-5 text-lg">
                        <a href="${siteConfig.contact.social.instagram}" target="_blank" aria-label="Instagram" class="text-gray-400 hover:text-brand-orange transition-colors btn-press"><i class="fab fa-instagram"></i></a>
                        <a href="${siteConfig.contact.social.facebook}" target="_blank" aria-label="Facebook" class="text-gray-400 hover:text-brand-orange transition-colors btn-press"><i class="fab fa-facebook-f"></i></a>
                    </div>
                </div>
            </div>
            <p class="text-[10px] sm:text-xs text-gray-500 font-semibold tracking-wide text-center break-words">${t().footerText}</p>
        </div>
    `;
}

function initApp() {
    renderHeader();
    renderFooter();
    window.addEventListener('scroll', handleScroll);
    let hash = window.location.hash.substring(1);
    
    if (!localStorage.getItem('cookie-accepted')) {
        const cookieBar = document.createElement('div');
        cookieBar.id = 'cookie-consent-bar';
        cookieBar.className = 'fixed bottom-0 left-0 w-full bg-gray-900 border-t border-brand-orange text-white p-4 sm:p-6 z-[1000] transform transition-transform duration-500 flex flex-col sm:flex-row items-center justify-between shadow-2xl';
        cookieBar.innerHTML = `
            <div class="text-sm font-medium mb-4 sm:mb-0 max-w-4xl pr-0 sm:pr-8 text-center sm:text-left text-gray-300">
                <i class="fas fa-cookie-bite text-brand-orange mr-2 text-lg"></i> ${t().cookieText}
            </div>
            <button id="accept-cookie-btn" class="bg-brand-orange hover:bg-orange-500 text-white font-bold py-2.5 px-8 rounded-full transition-colors whitespace-nowrap shadow-lg btn-press">
                ${t().cookieAccept}
            </button>
        `;
        document.body.appendChild(cookieBar);
        document.getElementById('accept-cookie-btn').addEventListener('click', () => {
            localStorage.setItem('cookie-accepted', 'true');
            cookieBar.style.transform = 'translateY(100%)';
            setTimeout(() => cookieBar.remove(), 500);
        });
    }

    // DOKUNMATİK KAYDIRMA EKLENTİSİ (Swipe Event Listeners)
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    if (lightboxOverlay) {
        let touchstartX = 0;
        let touchendX = 0;
        
        lightboxOverlay.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        lightboxOverlay.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            if (!lightboxOverlay.classList.contains('active')) return;
            
            const swipeThreshold = 50; // Geçerli sayılması için gereken minimum kaydırma mesafesi
            if (touchendX < touchstartX - swipeThreshold) {
                window.changeLightboxImage(1); // Sola kaydırıldı -> Sonraki resim
            } else if (touchendX > touchstartX + swipeThreshold) {
                window.changeLightboxImage(-1); // Sağa kaydırıldı -> Önceki resim
            }
        }, {passive: true});
    }

    if(hash) { 
        hash = decodeURIComponent(hash);
        navigate(hash, null, true, true); 
    } 
    else { state.currentView = 'home'; updateMetaTags('home'); renderHomePage(); }
    DOM.content.classList.remove('page-fade-out');
    DOM.content.classList.add('page-fade-in');
}

window.addEventListener('DOMContentLoaded', initApp);
