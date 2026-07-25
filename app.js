import { siteConfig } from './config.js';

// Global Durum (State) Yönetimi
const state = {
    lang: 'tr',       
    currentView: 'projects', 
    activeCategory: null,     
    sliderInterval: null,
    mobileMenuOpen: false // Mobil menünün açık/kapalı durumu
};

const DOM = {
    topBar: document.getElementById('top-bar'),
    header: document.getElementById('main-header'),
    content: document.getElementById('app-content'),
    footer: document.getElementById('main-footer')
};

// Çeviri (Dil) Fonksiyonu
function t() {
    return siteConfig.i18n[state.lang];
}

export function navigate(viewOrId, evt = null) {
    if (evt) evt.preventDefault(); 
    
    if (state.currentView === viewOrId) return; 

    // Yeni sayfaya geçerken mobil menüyü ve slider'ı otomatik kapat
    state.mobileMenuOpen = false; 
    if (state.sliderInterval) {
        clearInterval(state.sliderInterval);
        state.sliderInterval = null;
    }

    state.currentView = viewOrId;
    
    // Geçiş Animasyonu: Önce gizle
    DOM.content.classList.remove('page-fade-in');
    DOM.content.classList.add('page-fade-out');
    
    renderHeader();

    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
        
        if (viewOrId === 'projects') {
            renderProjectsList();
        } else if (['home', 'prices', 'gallery', 'reviews', 'about', 'contact'].includes(viewOrId)) {
            renderGenericPage(viewOrId);
        } else {
            renderProjectDetail(viewOrId);
        }

        // İçeriği geri göster
        DOM.content.classList.remove('page-fade-out');
        DOM.content.classList.add('page-fade-in');
    }, 250); 
}

export function changeLanguage(lang) {
    if (state.lang === lang) return;
    state.lang = lang;
    document.documentElement.lang = lang; 
    
    renderTopBar();
    renderHeader();
    
    if (state.currentView === 'projects') renderProjectsList();
    else if (['home', 'prices', 'gallery', 'reviews', 'about', 'contact'].includes(state.currentView)) renderGenericPage(state.currentView);
    else renderProjectDetail(state.currentView);
    
    renderFooter();
}

window.navigate = navigate;
window.changeLanguage = changeLanguage;

window.filterCategory = function(catId, evt) {
    if(evt) evt.preventDefault();
    state.activeCategory = catId;
    renderProjectsList();
};

window.toggleMobileMenu = function() {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    renderHeader(); // Menü açılıp kapandığında header'ı yeniden çiz
};

window.changeMainImage = function(src) {
    const mainImg = document.getElementById('detail-main-image');
    if(mainImg) {
        mainImg.style.opacity = 0.3; 
        setTimeout(() => {
            mainImg.src = src;
            mainImg.style.opacity = 1; 
        }, 300); 
    }
};

window.formatPhone = function(input) {
    let x = input.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    input.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '');
};

window.submitTestForm = function(evt, form) {
    evt.preventDefault();
    
    const inputs = form.querySelectorAll('input');
    const name = inputs[0].value;
    const phone = inputs[1].value;
    const email = inputs[2].value || 'Belirtilmedi';
    
    const projectName = document.querySelector('h1').innerText;
    
    const message = `YENİ MÜŞTERİ TALEBİ\n\n🏠 Proje: ${projectName}\n👤 İsim: ${name}\n📞 Telefon: ${phone}\n✉️ E-posta: ${email}`;
    const encodedMessage = encodeURIComponent(message);
    const testPhoneNumber = "905308321046"; 
    
    window.open(`https://wa.me/${testPhoneNumber}?text=${encodedMessage}`, '_blank');
    
    document.getElementById('alert-modal').classList.add('active');
    form.reset(); 
};

function renderTopBar() {
    DOM.topBar.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div class="flex space-x-6">
                <span><i class="fas fa-map-marker-alt text-brand-orange mr-2"></i>${siteConfig.contact.address}</span>
                <span><i class="fas fa-phone-alt text-brand-orange mr-2"></i>${siteConfig.contact.phone}</span>
                <span><i class="fas fa-envelope text-brand-orange mr-2"></i>${siteConfig.contact.email}</span>
            </div>
            <div class="flex space-x-4 items-center">
                <span>${t().followUs}</span>
                <a href="${siteConfig.contact.social.facebook}" class="hover:text-brand-orange transition"><i class="fab fa-facebook-f"></i></a>
                <a href="${siteConfig.contact.social.youtube}" class="hover:text-brand-orange transition"><i class="fab fa-youtube"></i></a>
                <a href="${siteConfig.contact.social.instagram}" target="_blank" class="hover:text-brand-orange transition"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
    `;
}

function renderHeader() {
    const menuItems = [
        { id: 'home', label: t().menu.home },
        { id: 'projects', label: t().menu.projects },
        { id: 'prices', label: t().menu.prices },
        { id: 'gallery', label: t().menu.gallery },
        { id: 'reviews', label: t().menu.reviews },
        { id: 'about', label: t().menu.about },
        { id: 'contact', label: t().menu.contact }
    ];

    // Masaüstü için linkler
    const desktopMenuHTML = menuItems.map(item => {
        const isProjectDetail = !menuItems.find(m => m.id === state.currentView) && state.currentView !== 'projects';
        const isActive = (state.currentView === item.id) || (item.id === 'projects' && isProjectDetail);
        return `<a href="#" onclick="navigate('${item.id}', event)" class="text-sm font-semibold text-gray-800 hover:text-brand-orange nav-link transition-colors ${isActive ? 'active' : ''}">${item.label}</a>`;
    }).join('');

    // Mobil için menü linkleri (Daha büyük ve tıklanabilir alan)
    const mobileMenuHTML = menuItems.map(item => {
        const isProjectDetail = !menuItems.find(m => m.id === state.currentView) && state.currentView !== 'projects';
        const isActive = (state.currentView === item.id) || (item.id === 'projects' && isProjectDetail);
        return `<a href="#" onclick="navigate('${item.id}', event)" class="block px-4 py-3 rounded-sm text-base font-semibold ${isActive ? 'bg-brand-orange text-white' : 'text-gray-800 hover:bg-gray-50 hover:text-brand-orange'} transition">${item.label}</a>`;
    }).join('');

    DOM.header.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative bg-white z-50">
            <div class="flex items-center cursor-pointer transform hover:scale-105 transition" onclick="navigate('projects')">
                <img src="${siteConfig.contact.logoSrc}" alt="Muhammet Tutkun A.Ş" class="h-10 md:h-12 object-contain">
            </div>
            
            <nav class="hidden lg:flex space-x-6 items-center">
                ${desktopMenuHTML}
                <div class="flex space-x-2 text-sm ml-4">
                    <span class="cursor-pointer lang-btn transition hover:text-brand-orange ${state.lang === 'tr' ? 'active' : 'text-gray-400'}" onclick="changeLanguage('tr')">TR</span>
                    <span class="text-gray-300">|</span>
                    <span class="cursor-pointer lang-btn transition hover:text-brand-orange ${state.lang === 'en' ? 'active' : 'text-gray-400'}" onclick="changeLanguage('en')">EN</span>
                </div>
                <button onclick="navigate('contact')" class="bg-brand-orange text-white px-6 py-2 rounded-sm font-bold text-sm hover:bg-orange-500 hover:shadow-lg transform hover:-translate-y-0.5 transition shadow-md">
                    ${t().consultBtn}
                </button>
            </nav>
            
            <!-- Mobil Hamburger Butonu -->
            <button onclick="window.toggleMobileMenu()" class="lg:hidden text-2xl text-gray-800 hover:text-brand-orange focus:outline-none transition-transform duration-200 ${state.mobileMenuOpen ? 'rotate-90' : ''}">
                <i class="fas ${state.mobileMenuOpen ? 'fa-times' : 'fa-bars'}"></i>
            </button>
        </div>

        <!-- Mobil Açılır Menü Container -->
        <div class="${state.mobileMenuOpen ? 'max-h-screen opacity-100 shadow-xl border-b border-gray-100' : 'max-h-0 opacity-0 pointer-events-none'} lg:hidden absolute top-full left-0 w-full bg-white overflow-hidden transition-all duration-300 ease-in-out z-40">
            <div class="flex flex-col px-4 py-6 space-y-2">
                ${mobileMenuHTML}
                <div class="flex justify-center space-x-4 pt-4 border-t border-gray-100 mt-2">
                    <span class="cursor-pointer font-bold px-6 py-2 rounded-sm ${state.lang === 'tr' ? 'bg-gray-100 text-brand-orange' : 'text-gray-500'}" onclick="changeLanguage('tr')">TR</span>
                    <span class="cursor-pointer font-bold px-6 py-2 rounded-sm ${state.lang === 'en' ? 'bg-gray-100 text-brand-orange' : 'text-gray-500'}" onclick="changeLanguage('en')">EN</span>
                </div>
                <button onclick="navigate('contact')" class="w-full mt-4 bg-brand-orange text-white px-6 py-3 rounded-sm font-bold text-sm hover:bg-orange-500 transition shadow-md">
                    ${t().consultBtn}
                </button>
            </div>
        </div>
    `;
}

function renderGenericPage(pageId) {
    const title = t().pageTitles[pageId] || '';
    const content = t().pageContents[pageId] || '';

    DOM.content.innerHTML = `
        <div class="max-w-4xl mx-auto py-12 px-4">
            <div class="text-center mb-10">
                <h1 class="text-4xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b-2 border-brand-orange pb-4 inline-block">${title}</h1>
            </div>
            
            <div class="text-lg text-gray-700 leading-relaxed space-y-6">
                ${content}
            </div>
            
            ${pageId === 'contact' ? `
                <div class="mt-12 bg-gray-50 p-8 rounded border border-gray-100 flex flex-col items-center shadow-sm">
                    <i class="fas fa-headset text-5xl text-brand-orange mb-4"></i>
                    <h3 class="text-xl font-bold mb-2">Bize Ulaşın</h3>
                    <p class="text-3xl font-black text-gray-800 mb-2">${siteConfig.contact.phone}</p>
                    <p class="text-gray-500 font-medium">${siteConfig.contact.email}</p>
                    <p class="text-gray-400 mt-4"><i class="fas fa-map-marker-alt mr-2"></i>${siteConfig.contact.address}</p>
                </div>
            ` : ''}
        </div>
    `;
}

function renderProjectsList() {
    const categoriesHTML = siteConfig.categories.map(cat => {
        const isActive = state.activeCategory === cat.id;
        return `
        <button onclick="filterCategory('${cat.id}', event)" class="whitespace-nowrap px-4 py-2 md:w-full md:text-left border-b border-transparent md:border-gray-100 last:border-0 transition text-sm font-medium ${isActive ? 'text-brand-orange font-bold border-brand-orange md:border-transparent' : 'text-gray-500 hover:text-brand-orange'}">
            ${isActive ? '<i class="fas fa-chevron-right text-[10px] mr-2 hidden md:inline"></i>' : ''}
            ${cat[state.lang]}
        </button>
    `}).join('');
    
    const allCatActive = state.activeCategory === null;
    const allCategoriesHTML = `
        <button onclick="filterCategory(null, event)" class="whitespace-nowrap px-4 py-2 md:w-full md:text-left border-b border-transparent md:border-gray-100 transition text-sm font-medium ${allCatActive ? 'text-brand-orange font-bold border-brand-orange md:border-transparent' : 'text-gray-500 hover:text-brand-orange'}">
            ${allCatActive ? '<i class="fas fa-chevron-right text-[10px] mr-2 hidden md:inline"></i>' : ''}
            ${state.lang === 'tr' ? 'Tüm Projeler' : 'All Projects'}
        </button>
    ` + categoriesHTML;

    const filteredProjects = state.activeCategory 
        ? siteConfig.projects.filter(p => p.categoryId === state.activeCategory)
        : siteConfig.projects;

    const projectsHTML = filteredProjects.length > 0 ? filteredProjects.map(project => `
        <div class="project-card bg-white border border-gray-100 cursor-pointer group rounded-sm" onclick="navigate('${project.id}')">
            <div class="relative overflow-hidden aspect-[4/3]">
                <img src="${project.mainImage}" alt="${state.lang === 'tr' ? project.title : project.titleEn}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out">
                
                <div class="absolute bottom-0 left-0 bg-brand-orange text-white px-4 py-2 font-bold flex items-center space-x-2 shadow-lg z-10">
                    <i class="fas fa-ruler-combined"></i>
                    <span>${project.area} ${t().sqm}</span>
                </div>
                
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 flex items-center justify-center">
                    <span class="bg-white text-gray-900 px-6 py-2 rounded-full font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300 shadow-xl">
                        <i class="fas fa-search mr-2"></i> ${state.lang === 'tr' ? 'Detayları İncele' : 'View Details'}
                    </span>
                </div>
            </div>
            <div class="p-5 flex justify-between items-center bg-white border-t border-gray-50">
                <h3 class="text-gray-800 font-bold text-lg group-hover:text-brand-orange transition">${state.lang === 'tr' ? project.title : project.titleEn}</h3>
                <i class="fas fa-arrow-right text-gray-300 group-hover:text-brand-orange transform group-hover:translate-x-1 transition"></i>
            </div>
        </div>
    `).join('') : `<div class="col-span-2 text-center py-12 text-gray-500">${state.lang === 'tr' ? 'Bu kategoride henüz proje bulunmuyor.' : 'No projects found in this category.'}</div>`;

    DOM.content.innerHTML = `
        <div class="text-center mb-10">
            <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 uppercase tracking-tight">${t().allProjectsTitle}</h1>
            <div class="bg-gray-50 p-4 text-sm text-gray-500 text-left rounded-sm border border-gray-100 flex items-center inline-flex">
                <a href="#" onclick="navigate('projects', event)" class="hover:text-brand-orange transition font-medium"><i class="fas fa-home mr-1"></i> Muhammet Tutkun A.Ş</a> 
                <i class="fas fa-angle-right mx-3 text-gray-300"></i> 
                <span class="text-gray-800 font-semibold">${t().projectsPath}</span>
            </div>
        </div>

        <div class="flex flex-col md:flex-row gap-10">
            <div class="w-full md:w-1/4">
                <div class="bg-gray-50 p-4 md:p-6 rounded-sm border border-gray-100 sticky top-24">
                    <h2 class="font-black text-gray-900 mb-4 md:mb-6 text-lg border-l-4 border-brand-orange pl-3 hidden md:block">${t().categoryTitle}</h2>
                    <div class="flex flex-row overflow-x-auto no-scrollbar md:flex-col space-x-2 md:space-x-0 md:space-y-1">
                        ${allCategoriesHTML}
                    </div>
                </div>
            </div>
            
            <div class="w-full md:w-3/4 grid grid-cols-1 lg:grid-cols-2 gap-8">
                ${projectsHTML}
            </div>
        </div>
    `;
}

function renderProjectDetail(projectId) {
    const project = siteConfig.projects.find(p => p.id === projectId);
    if (!project) return navigate('projects'); 

    const prjTitle = state.lang === 'tr' ? project.title : project.titleEn;
    const prjDesc = project.description[state.lang];

    let currentImgIndex = 0;
    
    if (state.sliderInterval) clearInterval(state.sliderInterval);
    
    const fullGallery = [project.mainImage, ...project.gallery.filter(img => img !== project.mainImage)];
    
    state.sliderInterval = setInterval(() => {
        currentImgIndex = (currentImgIndex + 1) % fullGallery.length;
        window.changeMainImage(fullGallery[currentImgIndex]);
    }, 3000);

    const thumbnailsHTML = fullGallery.map((img, index) => `
        <img src="${img}" 
             alt="Galeri ${index+1}" 
             class="w-full h-20 md:h-24 object-cover cursor-pointer border-2 border-transparent hover:border-brand-orange transition opacity-70 hover:opacity-100 rounded-sm shrink-0"
             onclick="window.changeMainImage('${img}'); currentImgIndex = ${index}; clearInterval(state.sliderInterval);"
        >
    `).join('');

    DOM.content.innerHTML = `
        <div class="mb-6 flex justify-between items-center border-b border-gray-200 pb-4">
            <h1 class="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">${prjTitle}</h1>
            <button onclick="navigate('projects')" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-sm text-sm font-semibold transition flex items-center">
                <i class="fas fa-arrow-left mr-2"></i> ${t().backBtn}
            </button>
        </div>
        
        <div class="bg-gray-50 p-3 mb-8 text-sm text-gray-500 rounded-sm border border-gray-100 flex items-center flex-wrap">
             <a href="#" onclick="navigate('projects', event)" class="hover:text-brand-orange transition"><i class="fas fa-home mr-1"></i> Muhammet Tutkun A.Ş</a>
             <i class="fas fa-angle-right mx-2 text-gray-300"></i> 
             <a href="#" onclick="navigate('projects', event)" class="hover:text-brand-orange transition">${t().projectsPath}</a>
             <i class="fas fa-angle-right mx-2 text-gray-300"></i>
             <span class="text-gray-800 font-semibold">${prjTitle}</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
            
            <div class="lg:col-span-2 flex flex-col md:flex-row gap-4">
                <div class="w-full md:w-28 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
                    ${thumbnailsHTML}
                </div>
                <div class="flex-grow">
                    <img id="detail-main-image" src="${project.mainImage}" alt="${prjTitle}" class="w-full h-auto max-h-[600px] object-cover rounded-sm shadow-md transition-opacity duration-200">
                </div>
            </div>

            <div class="lg:col-span-1 space-y-6">
                <div class="border border-gray-200 bg-white shadow-sm rounded-sm overflow-hidden">
                    <div class="flex justify-between p-4 border-b border-gray-100 bg-gray-50">
                        <span class="text-gray-600 font-medium">${t().totalArea}</span>
                        <span class="font-black text-gray-900">${project.area} M2</span>
                    </div>
                    <div class="flex justify-between p-4 bg-white">
                        <span class="text-gray-600 font-medium">${t().roomCount}</span>
                        <span class="font-black text-gray-900">${project.rooms}</span>
                    </div>
                </div>

                <div class="bg-white border-t-4 border-brand-orange shadow-lg p-6 rounded-sm relative">
                    <h3 class="text-xl font-bold text-center mb-6 text-gray-800">${t().getQuoteTitle}</h3>
                    
                    <form class="space-y-4" onsubmit="window.submitTestForm(event, this)">
                        <div>
                            <input type="text" placeholder="${t().formName}" required
                                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange transition font-medium">
                        </div>
                        <div>
                            <input type="tel" placeholder="${t().formPhone}" required oninput="window.formatPhone(this)" maxlength="15"
                                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange transition font-medium text-gray-700 tracking-wide">
                        </div>
                        <div>
                            <input type="email" placeholder="${t().formEmail}"
                                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange transition font-medium">
                        </div>
                        <button type="submit" 
                            class="w-full bg-brand-orange hover:bg-orange-500 text-white font-bold py-4 rounded-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-4 flex justify-center items-center">
                            <i class="fas fa-paper-plane mr-2"></i> ${t().submitBtn}
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <div class="bg-gray-50 p-8 rounded-sm border border-gray-200 shadow-sm">
            <h3 class="text-xl font-black mb-4 text-gray-900 border-l-4 border-brand-orange pl-3">${t().projectDetailsTitle}</h3>
            <p class="text-gray-700 leading-relaxed text-lg">${prjDesc}</p>
        </div>
    `;
}

function renderFooter() {
    DOM.footer.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0 cursor-pointer" onclick="navigate('projects')">
                <img src="${siteConfig.contact.logoSrc}" alt="Muhammet Tutkun A.Ş" class="h-8 md:h-10 object-contain hover:scale-105 transition duration-300">
            </div>
            <p class="text-sm text-gray-400 font-medium">${t().footerText}</p>
        </div>
    `;
}

function initApp() {
    renderTopBar();
    renderHeader();
    renderFooter();
    
    state.currentView = 'projects';
    renderProjectsList();
    DOM.content.classList.remove('page-fade-out');
    DOM.content.classList.add('page-fade-in');
}

window.addEventListener('DOMContentLoaded', initApp);