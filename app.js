import { siteConfig } from './config.js';

// Global Durum Yönetimi
const state = {
    lang: 'tr',       
    currentView: 'projects', 
    activeCategory: null,     
    sliderInterval: null,
    mobileMenuOpen: false
};

const DOM = {
    topBar: document.getElementById('top-bar'),
    header: document.getElementById('main-header'),
    content: document.getElementById('app-content'),
    footer: document.getElementById('main-footer')
};

function t() {
    return siteConfig.i18n[state.lang];
}

export function navigate(viewOrId, evt = null) {
    if (evt) evt.preventDefault(); 
    if (state.currentView === viewOrId) return; 

    state.mobileMenuOpen = false; 
    if (state.sliderInterval) {
        clearInterval(state.sliderInterval);
        state.sliderInterval = null;
    }

    state.currentView = viewOrId;
    
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
    renderHeader(); 
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

    const desktopMenuHTML = menuItems.map(item => {
        const isProjectDetail = !menuItems.find(m => m.id === state.currentView) && state.currentView !== 'projects';
        const isActive = (state.currentView === item.id) || (item.id === 'projects' && isProjectDetail);
        
        // Bu menü maddesi için config'de açılır menü (megaMenu) tanımlanmış mı kontrol et
        const megaMenuData = t().megaMenus && t().megaMenus[item.id];
        let megaMenuHTML = '';
        
        if (megaMenuData) {
            // Açılır menü sütunlarını oluştur
            const columnsHTML = megaMenuData.map(col => `
                <div class="flex-1">
                    <h4 class="text-brand-orange font-bold text-lg mb-5 border-b border-gray-100 pb-2">${col.columnTitle}</h4>
                    <ul class="space-y-4">
                        ${col.items.map(link => `
                            <li>
                                <a href="#" onclick="navigate('${link.action}', event)" class="text-gray-600 hover:text-brand-orange transition flex items-center text-sm font-medium">
                                    ${link.label}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `).join('');

            // Mega menü kapsayıcısını inşa et (Fare üzerine gelince görünür olan kısım)
            megaMenuHTML = `
                <div class="absolute left-1/2 -translate-x-1/2 top-full w-[600px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0">
                    <div class="bg-white shadow-2xl border-t-4 border-brand-orange rounded-b-md p-8 flex gap-12 cursor-default relative">
                        <!-- Üstteki küçük ok işareti (Görsellik için) -->
                        <div class="absolute -top-[12px] left-1/2 -translate-x-1/2 border-[6px] border-transparent border-b-brand-orange"></div>
                        ${columnsHTML}
                    </div>
                </div>
            `;
        }

        // Ana linki ve mega menüyü '.group' divi içine sararak hover efektini bağla
        return `
            <div class="relative group h-full flex items-center">
                <a href="#" onclick="navigate('${item.id}', event)" class="text-sm font-semibold text-gray-800 hover:text-brand-orange nav-link transition-colors ${isActive ? 'active' : ''} py-6 flex items-center">
                    ${item.label}
                    ${megaMenuData ? '<i class="fas fa-chevron-down text-[10px] ml-1.5 text-gray-400 group-hover:text-brand-orange transition transform group-hover:rotate-180 duration-300"></i>' : ''}
                </a>
                ${megaMenuHTML}
            </div>
        `;
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
            
            <button onclick="window.toggleMobileMenu()" class="lg:hidden text-2xl text-gray-800 hover:text-brand-orange focus:outline-none transition-transform duration-200 ${state.mobileMenuOpen ? 'rotate-90' : ''}">
                <i class="fas ${state.mobileMenuOpen ? 'fa-times' : 'fa-bars'}"></i>
            </button>
        </div>

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
    
    let extraHTML = '';

    // ÖZEL: Müşteri Yorumları Sayfası
    if (pageId === 'reviews') {
        if (siteConfig.reviews && siteConfig.reviews.length > 0) {
            extraHTML = `<div class="space-y-8 mt-10">` + siteConfig.reviews.map(review => `
                <div class="flex flex-col md:flex-row gap-6 bg-white border border-gray-100 p-4 shadow-sm hover:shadow-md transition rounded-sm">
                    <div class="w-full md:w-1/3 shrink-0">
                         <img src="${review.image}" class="w-full h-56 object-cover rounded-sm">
                    </div>
                    <div class="w-full md:w-2/3 flex flex-col justify-center">
                         <h3 class="text-brand-orange font-bold text-xl md:text-2xl mb-2 uppercase tracking-wide">${review.title[state.lang]}</h3>
                         <span class="text-gray-400 text-sm mb-4 font-medium"><i class="far fa-calendar-alt mr-2"></i>${review.date}</span>
                         <p class="text-gray-700 leading-relaxed text-lg italic">"${review.text[state.lang]}"</p>
                    </div>
                </div>
            `).join('') + `</div>`;
        } else {
            // Boş ise resmi uyarı mesajı (Hazırlanıyor)
            const emptyMsg = state.lang === 'tr' 
                ? 'Değerli müşteri yorumları ve proje değerlendirmeleri en kısa sürede bu alanda yayımlanacaktır. Bizi tercih ettiğiniz için teşekkür ederiz.' 
                : 'Valuable customer reviews and project evaluations will be published in this area as soon as possible. Thank you for choosing us.';
            extraHTML = `
                <div class="mt-12 bg-gray-50 p-12 text-center rounded-sm border border-gray-200">
                    <i class="fas fa-quote-left text-4xl text-gray-300 mb-6 block"></i>
                    <p class="text-xl text-gray-500 font-medium leading-relaxed italic">${emptyMsg}</p>
                </div>
            `;
        }
    }

    // ÖZEL: YAPI (Ana Sayfa) Rastgele Görsel Çekme Motoru
    if (pageId === 'home') {
        let allImages = [];
        siteConfig.projects.forEach(p => {
            allImages.push(p.mainImage);
            allImages.push(...p.gallery);
        });
        // Rastgele 3 resmi seç
        allImages = [...new Set(allImages)].sort(() => 0.5 - Math.random()).slice(0, 3);
        
        const galleryHTML = allImages.map(img => `
            <div class="aspect-video overflow-hidden rounded-sm shadow-sm border border-gray-100">
                <img src="${img}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
            </div>
        `).join('');

        const featuredTitle = state.lang === 'tr' ? 'Öne Çıkan Kareler' : 'Featured Shots';
        extraHTML = `
            <div class="mt-16">
                <h3 class="text-2xl font-bold mb-6 border-l-4 border-brand-orange pl-3 text-gray-800">${featuredTitle}</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${galleryHTML}
                </div>
                <div class="text-center mt-10">
                    <button onclick="navigate('projects')" class="bg-brand-orange text-white px-8 py-3 rounded-sm font-bold text-lg hover:bg-orange-600 transition shadow-md">
                        ${state.lang === 'tr' ? 'Tüm Projeleri İncele' : 'View All Projects'}
                    </button>
                </div>
            </div>
        `;
    }

    DOM.content.innerHTML = `
        <div class="max-w-5xl mx-auto py-12 px-4">
            <div class="text-center mb-10">
                <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight border-b-4 border-brand-orange pb-4 inline-block">${title}</h1>
            </div>
            
            <div class="text-lg text-gray-700 leading-relaxed">
                ${content}
            </div>
            
            ${extraHTML}
            
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
        <button onclick="filterCategory('${cat.id}', event)" class="whitespace-nowrap px-4 py-2 md:w-full md:text-left border-b border-transparent md:border-gray-100 last:border-0 transition text-sm font-medium shrink-0 ${isActive ? 'text-brand-orange font-bold border-brand-orange md:border-transparent' : 'text-gray-500 hover:text-brand-orange'}">
            ${isActive ? '<i class="fas fa-chevron-right text-[10px] mr-2 hidden md:inline"></i>' : ''}
            ${cat[state.lang]}
        </button>
    `}).join('');
    
    const allCatActive = state.activeCategory === null;
    const allCategoriesHTML = `
        <button onclick="filterCategory(null, event)" class="whitespace-nowrap px-4 py-2 md:w-full md:text-left border-b border-transparent md:border-gray-100 transition text-sm font-medium shrink-0 ${allCatActive ? 'text-brand-orange font-bold border-brand-orange md:border-transparent' : 'text-gray-500 hover:text-brand-orange'}">
            ${allCatActive ? '<i class="fas fa-chevron-right text-[10px] mr-2 hidden md:inline"></i>' : ''}
            ${state.lang === 'tr' ? 'Tüm Projeler' : 'All Projects'}
        </button>
    ` + categoriesHTML;

    const filteredProjects = state.activeCategory 
        ? siteConfig.projects.filter(p => p.categoryId === state.activeCategory)
        : siteConfig.projects;

    const projectsHTML = filteredProjects.length > 0 ? filteredProjects.map(project => `
        <div class="project-card bg-white border border-gray-100 cursor-pointer group rounded-sm flex flex-col h-full" onclick="navigate('${project.id}')">
            <div class="relative overflow-hidden aspect-video">
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
            <div class="p-5 flex justify-between items-center bg-white border-t border-gray-50 flex-grow">
                <h3 class="text-gray-800 font-bold text-lg group-hover:text-brand-orange transition">${state.lang === 'tr' ? project.title : project.titleEn}</h3>
                <i class="fas fa-arrow-right text-gray-300 group-hover:text-brand-orange transform group-hover:translate-x-1 transition"></i>
            </div>
        </div>
    `).join('') : `<div class="col-span-1 md:col-span-2 text-center py-12 text-gray-500">${state.lang === 'tr' ? 'Bu kategoride henüz proje bulunmuyor.' : 'No projects found in this category.'}</div>`;

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
                    <div class="flex flex-row overflow-x-auto no-scrollbar md:flex-col space-x-2 md:space-x-0 md:space-y-1 pb-2 md:pb-0">
                        ${allCategoriesHTML}
                    </div>
                </div>
            </div>
            
            <div class="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8">
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

    // MOBİL GÖRSEL OPTİMİZASYONU: w-20 h-20 (Kare) olarak daralmayı engeller.
    const thumbnailsHTML = fullGallery.map((img, index) => `
        <img src="${img}" 
             alt="Galeri ${index+1}" 
             class="w-20 h-20 md:w-full md:h-24 object-cover cursor-pointer border-2 border-transparent hover:border-brand-orange transition opacity-70 hover:opacity-100 rounded-sm shrink-0"
             onclick="window.changeMainImage('${img}'); currentImgIndex = ${index}; clearInterval(state.sliderInterval);"
        >
    `).join('');

    DOM.content.innerHTML = `
        <div class="mb-6 flex justify-between items-center border-b border-gray-200 pb-4">
            <h1 class="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">${prjTitle}</h1>
            <button onclick="navigate('projects')" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-sm text-sm font-semibold transition flex items-center shrink-0 ml-4">
                <i class="fas fa-arrow-left md:mr-2"></i> <span class="hidden md:inline">${t().backBtn}</span>
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
                <div class="w-full md:w-28 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0">
                    ${thumbnailsHTML}
                </div>
                <div class="flex-grow">
                    <!-- MOBİL ANA GÖRSEL OPTİMİZASYONU: aspect-video eklendi (16:9 sabit) -->
                    <img id="detail-main-image" src="${project.mainImage}" alt="${prjTitle}" class="w-full aspect-video md:aspect-auto md:max-h-[600px] object-cover rounded-sm shadow-md transition-opacity duration-200">
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
