/**
 * ======================================================================
 * YÖNETİM PANELİ (CONFIG DOSYASI) - KARTECH PANEL STRUCTURES HOUSE SYSTEMS
 * ======================================================================
 */

export const siteConfig = {
    contact: {
        logoSrc: "https://pbs.twimg.com/media/HOLR5R6XAAAe8QI?format=png&name=small",
        address: "Sakarya, Türkiye",
        phone: "+90 507 880 76 07", 
        email: "info@kartechpanel.com",
        social: { 
            facebook: "https://www.facebook.com/", 
            youtube: "https://www.youtube.com/", 
            instagram: "https://www.instagram.com/muhammet.tutkun/" 
        }
    },

    homeHero: {
        // ANA SAYFA GÖRSELİ İÇİN ÖNERİ: En kaliteli, net ve keskin görünüm için 
        // 1920x1080 piksel (Full HD) veya 2560x1440 piksel (2K) boyutlarında görsel kullanın.
        backgroundImage: "https://i.pinimg.com/1200x/bd/20/dd/bd20ddd04e4e1cac3fb9a6b88958749d.jpg",
        slogan: {
            tr: "Lüks ve Minimalizmin Birleşimi",
            en: "Fusion of Luxury and Minimalism"
        },
        subSlogan: {
            tr: "SİP Panel teknolojisiyle hayalinizdeki yapıya hızla kavuşun.",
            en: "Reach your dream structure quickly with SIP Panel technology."
        }
    },

    categories: {
        "ev-modelleri": [
            { id: "ev-standart", tr: "Standart Evler", en: "Standard Houses" },
            { id: "ev-ahsap", tr: "Ahşap Kaplamalı Evler", en: "Wooden Clad Houses" },
            { id: "ev-luks", tr: "Lüks Villalar", en: "Luxury Villas" }
        ],
        "bahce-yapilari": [
            { id: "by-kamelya", tr: "Kamelya & Çardak", en: "Gazebos & Pergolas" },
            { id: "by-kisbahcesi", tr: "Kış Bahçeleri", en: "Winter Gardens" },
            { id: "by-depo", tr: "Bahçe Depoları", en: "Garden Sheds" }
        ],
        "garaj-sistemleri": [
            { id: "gs-tekacik", tr: "Tek Araçlık Açık Garaj", en: "Single Car Open Garage" },
            { id: "gs-ciftkapali", tr: "Çift Araçlık Kapalı Garaj", en: "Double Car Closed Garage" },
            { id: "gs-atolye", tr: "Atölyeli Garajlar", en: "Garages with Workshop" }
        ]
    },

    /* 
     * ======================================================================
     * YENİ PROJE EKLEME REHBERİ
     * ======================================================================
     * - mainImage: Sadece fotoğraf linki ekleyin. (Örn: "https://...jpg")
     * - gallery: Buraya hem fotoğraf hem de YOUTUBE linki ekleyebilirsiniz! 
     *   Sistem YouTube linkini otomatik algılar ve video oynatıcıya çevirir.
     */
    projects: [
        {
            id: "dubleks-298", 
            title: "Zifin House",
            titleEn: "Duplex Project - 298",
            area: 61, rooms: 3,  
            pageMenu: "ev-modelleri", 
            categoryId: "ev-luks", 
            mainImage: "https://i.pinimg.com/736x/e0/b9/e1/e0b9e1b995c80a7c916a8ad64fa09d83.jpg",
            gallery: [
                "https://i.pinimg.com/736x/e4/9b/cb/e49bcbcb4078e3140f07f75687455669.jpg",
                "https://i.pinimg.com/736x/4f/4e/11/4f4e11dbabea7f52a2425b3d04505b60.jpg"
            ],
            description: {
                tr: "Kartech Panel kalitesiyle tasarlanmış modern iki katlı dubleks proje. İhtiyaçlarınıza özel olarak üretilmiştir.",
                en: "Modern two-story duplex SIP panel project designed specifically for your needs."
            }
        },
        {
            id: "calanthe-145",
            title: "Calanthe Modeli",
            titleEn: "Calanthe Model - 145",
            area: 54, rooms: 4,
            pageMenu: "ev-modelleri", 
            categoryId: "ev-standart",
            mainImage: "https://i.pinimg.com/736x/b3/fc/38/b3fc3888aecdcc57cd78193d31f7bd46.jpg",
            // VİDEO DESTEĞİ ÖRNEĞİ: Galeriye bir youtube linki koymanız yeterli!
            gallery: [
                "https://www.youtube.com/watch?v=ScMzIvxBSi4", 
                "https://i.pinimg.com/1200x/be/d6/bf/bed6bfbffcea556193c1a2b9c7ce4b92.jpg"
            ],
            description: {
                tr: "Doğa ile iç içe yaşam sunan şık ve kullanışlı bir ev tasarımı. Bu modelde video desteği örneği mevcuttur.",
                en: "A stylish and useful house design offering a life intertwined with nature."
            }
        },
        {
            id: "kis-bahcesi-1",
            title: "Premium Kış Bahçesi",
            titleEn: "Premium Winter Garden",
            area: 25, rooms: 1,
            pageMenu: "bahce-yapilari", 
            categoryId: "by-kisbahcesi",
            mainImage: "https://placehold.co/1200x900/1a1a1a/FFF?text=Kis+Bahcesi",
            gallery: [],
            description: { tr: "Dört mevsim bahçe keyfi.", en: "Enjoy your garden in all seasons." }
        },
        {
            id: "garaj-1",
            title: "Çift Araçlık Garaj",
            titleEn: "Double Car Garage",
            area: 40, rooms: 1,
            pageMenu: "garaj-sistemleri", 
            categoryId: "gs-ciftkapali",
            mainImage: "https://placehold.co/1200x900/2ecc71/FFF?text=Garaj+Projesi",
            gallery: [],
            description: { tr: "Araçlarınız için güvenli SİP panel garaj.", en: "Secure SIP panel garage for your vehicles." }
        }
    ],

    i18n: {
        tr: {
            menu: {
                "home": "Ana Sayfa",
                "sip-panel": "Sip Panel", 
                "ev-modelleri": "Ev Modelleri", 
                "bahce-yapilari": "Bahçe Yapıları", 
                "garaj-sistemleri": "Garaj Sistemleri", 
                "uretim": "Üretim", 
                "galeri": "Galeri", 
                "hakkimizda": "Hakkımızda",
                "iletisim": "İletişim"
            },
            
            consultBtn: "Bize Ulaşın",
            allProjectsTitle: "Tüm Seçenekler",
            categoryTitle: "Kategoriler",
            sqm: "m²",
            totalArea: "Toplam alan",
            roomCount: "Oda sayısı",
            getQuoteTitle: "Hemen Fiyat Alın",
            formName: "İsminiz Soyisminiz",
            formPhone: "Telefon (Örn: 507 880 7607)",
            submitBtn: "Gönder",
            backBtn: "Geri Dön",
            projectDetailsTitle: "Proje Detayları",
            prevProject: "Önceki Proje",
            nextProject: "Sonraki Proje",
            formErrorName: "Lütfen adınızı ve soyadınızı giriniz.",
            formErrorPhone: "Lütfen 10 haneli telefon numaranızı eksiksiz giriniz.",
            
            pageTitles: {
                "home": "Ana Sayfa",
                "uretim": "Üretim Tesisimiz",
                "galeri": "Fotoğraf Galerisi",
                "hakkimizda": "Hakkımızda",
                "sip-panel": "SİP Panel Nedir?",
                "ev-modelleri": "Ev Modellerimiz",
                "bahce-yapilari": "Bahçe Yapılarımız",
                "garaj-sistemleri": "Garaj Sistemlerimiz",
                "iletisim": "Bize Ulaşın"
            },

            sipPanelData: {
                heroImg: "https://vividgreen.co.uk/wp-content/uploads/2024/04/IMG_5283-scaled-1280x750-2-1024x600.jpg",
                introTitle: "SİP (Yapısal Yalıtımlı Panel) Nedir?",
                introText: "SİP (Structural Insulated Panel), yüksek yoğunluklu yalıtım çekirdeğinin (genellikle EPS) iki yapısal kaplama malzemesi (OSB-3) arasına preslenmesiyle oluşturulan, taşıyıcı kapasitesi olağanüstü yüksek, modern ve kompozit bir yapı malzemesidir. Geleneksel sistemlere göre %60'a varan enerji tasarrufu ve ultra hızlı kurulum sunar.",
                advantagesTitle: "Neden SİP Panel Tercih Edilmeli?",
                advantages: [
                    { icon: "fa-bolt", title: "Ultra Hızlı Kurulum", desc: "Paneller fabrikamızda projenize özel milimetrik kesilir. Şantiyede sadece montajı yapılır, inşaat süresi %50 kısalır." },
                    { icon: "fa-leaf", title: "Üstün Isı Yalıtımı", desc: "Yekpare yalıtım çekirdeği sayesinde ısı köprüleri oluşmaz. Yazın serin, kışın sıcak tutar." },
                    { icon: "fa-shield-alt", title: "Depreme Tam Dayanım", desc: "Esnek ve yekpare çalışma prensibi sayesinde deprem sarsıntılarını sönümler. Betonarme gibi yıkılma riski taşımaz." },
                    { icon: "fa-volume-mute", title: "Akustik Konfor", desc: "Yüksek yoğunluklu EPS katmanı dışarıdan gelen sesleri ciddi oranda keserek huzurlu bir yaşam alanı sunar." }
                ],
                specsTitle: "Mühendislik ve Teknik Tablo",
                specsDesc: "Uluslararası standartlarda, en yüksek kalite birleşenleri kullanıyoruz.",
                technicalSpecs: [
                    { label: "Dış Yüzey Kaplaması", value: "11mm veya 15mm OSB-3 (Neme Ekstra Dayanıklı)" },
                    { label: "Yalıtım Çekirdeği (Core)", value: "EPS (Genleştirilmiş Polistiren) - 16 ila 30 Dansite Arası" },
                    { label: "Standart Panel Kalınlıkları", value: "100mm, 150mm, 200mm seçenekleri" },
                    { label: "Isı İletim Katsayısı (U-Değeri)", value: "0.15 - 0.25 W/m²K (Kalınlığa bağlı maksimum verim)" },
                    { label: "Yangın Direnç Sınıfı", value: "E Sınıfı (Alev yürütmez, kendi kendini söndüren EPS)" },
                    { label: "Taşıyıcı ve Statik Kapasite", value: "Geleneksel ahşap/çelik karkasa göre 3 kat daha yüksek yapısal bütünlük" }
                ]
            },
            
            pageContents: {
                "uretim": `<p class="mb-6 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-medium break-words">Fabrikamızda en son teknoloji ile SİP panellerin üretimini gerçekleştiriyoruz.</p>`,
                "galeri": "<p class='text-center text-gray-500 text-lg md:text-xl font-medium break-words'>Şantiye ve tamamlanan projelerimizin detaylı fotoğrafları yakında burada yer alacaktır.</p>",
                "hakkimizda": `
                    <h3 class="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 text-gray-900 tracking-tight leading-tight">Kartech Panel Structures House Systems</h3>
                    <p class="mb-6 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-medium break-words">Yılların verdiği tecrübe ile yenilikçi yapı teknolojilerini Türkiye ile buluşturuyoruz.</p>
                `
            },
            footerText: "© 2026 Kartech Panel Structures House Systems. Tüm hakları saklıdır."
        },
        en: {
            menu: {
                "home": "Home", "sip-panel": "SIP Panel", "ev-modelleri": "House Models", 
                "bahce-yapilari": "Garden Structures", "garaj-sistemleri": "Garage Systems", 
                "uretim": "Production", "galeri": "Gallery", "hakkimizda": "About Us", "iletisim": "Contact"
            },
            consultBtn: "Contact Us", categoryTitle: "Categories",
            allProjectsTitle: "All Options", sqm: "m²", totalArea: "Total area", roomCount: "Rooms",
            getQuoteTitle: "Get a Quote", formName: "Full Name", formPhone: "Phone",
            submitBtn: "Submit", backBtn: "Go Back", projectDetailsTitle: "Project Details",
            prevProject: "Previous Project", nextProject: "Next Project",
            formErrorName: "Please enter your full name.", formErrorPhone: "Please enter a valid phone number.",
            pageTitles: {
                "home": "Home", "uretim": "Production", "galeri": "Gallery", "hakkimizda": "About Us",
                "sip-panel": "What is SIP Panel?", "ev-modelleri": "House Models", 
                "bahce-yapilari": "Garden Structures", "garaj-sistemleri": "Garage Systems", "iletisim": "Contact Us"
            },
            sipPanelData: {
                heroImg: "https://vividgreen.co.uk/wp-content/uploads/2024/04/IMG_5283-scaled-1280x750-2-1024x600.jpg",
                introTitle: "What is a Structural Insulated Panel?",
                introText: "SIPs are high-performance building panels used in floors, walls, and roofs. Each panel is made using an expanded polystyrene (EPS) rigid foam insulation sandwiched between two structural skins of oriented strand board (OSB).",
                advantagesTitle: "Why Choose SIP?",
                advantages: [
                    { icon: "fa-bolt", title: "Fast Installation", desc: "Panels are pre-cut in our factory. Site assembly is 50% faster than traditional methods." },
                    { icon: "fa-leaf", title: "Thermal Efficiency", desc: "Continuous insulation means no thermal bridging. Keeps you warm in winter, cool in summer." },
                    { icon: "fa-shield-alt", title: "Earthquake Resistant", desc: "Flexible structural integrity handles seismic waves significantly better than concrete." },
                    { icon: "fa-volume-mute", title: "Acoustic Comfort", desc: "High-density EPS effectively dampens exterior noise." }
                ],
                specsTitle: "Technical Specifications",
                specsDesc: "Engineered to meet the highest global standards.",
                technicalSpecs: [
                    { label: "Structural Skins", value: "11mm / 15mm OSB-3 (Moisture Resistant)" },
                    { label: "Insulation Core", value: "EPS - 16-30 Density" },
                    { label: "Standard Thicknesses", value: "100mm, 150mm, 200mm" },
                    { label: "U-Value", value: "0.15 - 0.25 W/m²K (Depends on thickness)" },
                    { label: "Fire Rating", value: "Class E (Fire Retardant EPS)" },
                    { label: "Load Bearing", value: "Up to 3x stronger than traditional timber framing" }
                ]
            },
            pageContents: {
                "uretim": "<p class='text-base sm:text-lg break-words'>Information about our production facility.</p>",
                "galeri": "<p class='text-base sm:text-lg break-words'>Gallery coming soon.</p>",
                "hakkimizda": "<p class='text-base sm:text-lg break-words'>About Kartech Panel Structures House Systems.</p>"
            },
            footerText: "© 2026 Kartech Panel Structures House Systems. All rights reserved."
        }
    }
};
