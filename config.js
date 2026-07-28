export const siteConfig = {
    contact: {
        logoSrc: "https://pbs.twimg.com/media/HOVlhqAWcAAObeq?format=png&name=small",
        address: "Sakarya, Türkiye",
        phone: "+90 507 880 76 07", 
        email: "info@kartechpanel.com",
        social: { 
            facebook: "#", 
            youtube: "#", 
            instagram: "https://www.instagram.com/muhammet.tutkun/" 
        }
    },

    homeHero: {
        backgroundImage: "https://pbs.twimg.com/media/HOLXzKvXcAAOx2J?format=jpg&name=large",
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
        {
            id: "calanthe-145",
            title: "Calanthe Modeli",
            titleEn: "Calanthe Model - 145",
            area: 54, rooms: 4,
            pageMenu: "ev-modelleri", 
            categoryId: "ev-standart",
            mainImage: "https://i.pinimg.com/736x/b3/fc/38/b3fc3888aecdcc57cd78193d31f7bd46.jpg",
            gallery: ["https://i.pinimg.com/1200x/be/d6/bf/bed6bfbffcea556193c1a2b9c7ce4b92.jpg"],
            description: {
                tr: "Doğa ile iç içe yaşam sunan şık ve kullanışlı bir ev tasarımı.",
                en: "A stylish and useful house design."
            }
        },
        {
            id: "kis-bahcesi-1",
            title: "Premium Kış Bahçesi",
            titleEn: "Premium Winter Garden",
            area: 25, rooms: 1,
            pageMenu: "bahce-yapilari", 
            categoryId: "by-kisbahcesi",
            mainImage: "https://i.pinimg.com/736x/fe/1a/64/fe1a6462fc8e84a9d1429b6900044ba8.jpg",
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
            mainImage: "https://i.pinimg.com/1200x/3f/b2/f0/3fb2f0ef390fda1df627ba294679b175.jpg",
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
                "hakkimizda": "Hakkımızda"
            },
            
            consultBtn: "Bize Ulaşın",
            allProjectsTitle: "Tüm Seçenekler",
            categoryTitle: "Kategoriler",
            sqm: "m²",
            totalArea: "Toplam alan",
            roomCount: "Oda sayısı",
            getQuoteTitle: "Hemen Fiyat Alın",
            formName: "İsminiz",
            formPhone: "Telefon (Örn: 507 880 7607)",
            submitBtn: "Gönder",
            backBtn: "Geri Dön",
            projectDetailsTitle: "Detaylar",
            prevProject: "Önceki Proje",
            nextProject: "Sonraki Proje",
            formErrorName: "Lütfen isminizi giriniz.",
            formErrorPhone: "Lütfen geçerli bir telefon numarası giriniz (10 hane).",
            
            pageTitles: {
                "home": "Kartech Panel",
                "iletisim": "Bize Ulaşın",
                "uretim": "Üretim Tesisimiz",
                "galeri": "Fotoğraf Galerisi",
                "hakkimizda": "Hakkımızda",
                "sip-panel": "Neden SİP Panel?",
                "ev-modelleri": "Ev Modellerimiz",
                "bahce-yapilari": "Bahçe Yapılarımız",
                "garaj-sistemleri": "Garaj Sistemlerimiz"
            },
            
            sipPanelData: {
                heroImg: "https://vividgreen.co.uk/wp-content/uploads/2024/04/IMG_5283-scaled-1280x750-2-1024x600.jpg",
                introTitle: "Geleceğin Yapı Teknolojisi: SİP Panel",
                introText: "SİP (Yapısal Yalıtımlı Panel) teknolojisi, yüksek yoğunluklu yalıtım malzemesinin (EPS) iki yapısal levha (OSB) arasına preslenmesiyle oluşturulan, günümüzün en gelişmiş ve enerji tasarruflu yapı sistemidir. Betonarmeye göre çok daha hafif, esnek ve depreme karşı dayanıklıdır.",
                advantagesTitle: "SİP Panelin Avantajları",
                advantages: [
                    { icon: "fa-bolt", title: "Yüksek Enerji Tasarrufu", desc: "Mükemmel ısı yalıtımı sayesinde ısıtma ve soğutma giderlerinde %60'a varan tasarruf sağlar." },
                    { icon: "fa-stopwatch", title: "Hızlı Kurulum", desc: "Fabrikada milimetrik hassasiyetle üretilen paneller, şantiyede haftalar yerine günler içinde birleştirilir." },
                    { icon: "fa-shield-alt", title: "Deprem Güvenliği", desc: "Esnek ve hafif yapısı sayesinde deprem enerjisini emer, yıkılma riskini minimuma indirir." },
                    { icon: "fa-leaf", title: "Çevre Dostu", desc: "Üretim sürecinde çok daha az karbon ayak izi bırakır ve malzemeler geri dönüştürülebilirdir." }
                ],
                specsTitle: "Teknik Özellikler ve Performans",
                specsDesc: "Projelerimizde kullandığımız SİP paneller uluslararası standartlarda üretilmekte olup zorlu iklim koşullarına karşı test edilmiştir.",
                technicalSpecs: [
                    { label: "Panel Kalınlıkları (Dış Duvar)", value: "114 mm / 164 mm / 214 mm" },
                    { label: "İzolasyon Özü (Core)", value: "16-30 kg/m³ Yoğunluklu EPS (Genleştirilmiş Polistiren)" },
                    { label: "Dış ve İç Yüzey (Kaplama)", value: "11 mm - 15 mm OSB-3 (Neme Dayanıklı)" },
                    { label: "Isı İletim Katsayısı (U-Değeri)", value: "0.14 - 0.20 W/m²K (Mükemmel Yalıtım)" },
                    { label: "Yangın Dayanımı", value: "B-s1, d0 (Alev Yürütmez Sınıfı)" },
                    { label: "Ses Yalıtımı (Akustik)", value: "40 dB - 45 dB Ses İndirgeme İndeksi" }
                ]
            },

            pageContents: {
                "uretim": "Fabrikamızda en son teknoloji ile SİP panellerin üretimini gerçekleştiriyoruz.",
                "galeri": "Şantiye ve tamamlanan projelerimizin detaylı fotoğrafları yakında burada yer alacaktır.",
                "hakkimizda": "Yılların verdiği tecrübe ile yenilikçi yapı teknolojilerini Türkiye ile buluşturuyoruz."
            },
            footerText: "© 2026 Kartech Panel Structures House Systems. Tüm hakları saklıdır."
        },
        en: {
            menu: {
                "home": "Home",
                "sip-panel": "Sip Panel", 
                "ev-modelleri": "House Models", 
                "bahce-yapilari": "Garden Structures", 
                "garaj-sistemleri": "Garage Systems", 
                "uretim": "Production", 
                "galeri": "Gallery", 
                "hakkimizda": "About Us"
            },
            consultBtn: "Contact Us", categoryTitle: "Categories",
            allProjectsTitle: "All Options", sqm: "m²", totalArea: "Total area", roomCount: "Rooms",
            getQuoteTitle: "Get a Quote", formName: "Your Name", formPhone: "Phone",
            submitBtn: "Submit", backBtn: "Go Back", projectDetailsTitle: "Details",
            prevProject: "Previous Project", nextProject: "Next Project",
            formErrorName: "Please enter your name.", formErrorPhone: "Please enter a valid phone number.",
            pageTitles: {
                "home": "Kartech Panel", "iletisim": "Contact Us",
                "uretim": "Production", "galeri": "Gallery", "hakkimizda": "About Us",
                "sip-panel": "Why SIP Panel?", "ev-modelleri": "House Models", 
                "bahce-yapilari": "Garden Structures", "garaj-sistemleri": "Garage Systems"
            },
            sipPanelData: {
                heroImg: "https://vividgreen.co.uk/wp-content/uploads/2024/04/IMG_5283-scaled-1280x750-2-1024x600.jpg",
                introTitle: "Building Technology of the Future",
                introText: "Structural Insulated Panels (SIPs) are a high-performance building system...",
                advantagesTitle: "Advantages of SIPs",
                advantages: [
                    { icon: "fa-bolt", title: "Energy Efficient", desc: "Reduces energy costs by up to 60%." },
                    { icon: "fa-stopwatch", title: "Fast Construction", desc: "Built in days, not weeks." },
                    { icon: "fa-shield-alt", title: "Earthquake Safety", desc: "Flexible and resistant structure." },
                    { icon: "fa-leaf", title: "Eco-Friendly", desc: "Low carbon footprint." }
                ],
                specsTitle: "Technical Specifications",
                specsDesc: "Tested for extreme weather conditions.",
                technicalSpecs: [
                    { label: "Panel Thickness", value: "114 mm / 164 mm / 214 mm" },
                    { label: "Core Material", value: "16-30 kg/m³ EPS" },
                    { label: "Surfaces", value: "11 mm - 15 mm OSB-3" },
                    { label: "U-Value", value: "0.14 - 0.20 W/m²K" },
                    { label: "Fire Resistance", value: "B-s1, d0" },
                    { label: "Sound Insulation", value: "40 dB - 45 dB" }
                ]
            },
            pageContents: {
                "uretim": "Information about our production facility.",
                "galeri": "Gallery coming soon.",
                "hakkimizda": "About Kartech Panel Structures House Systems."
            },
            footerText: "© 2026 Kartech Panel Structures House Systems. All rights reserved."
        }
    }
};
