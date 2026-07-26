/**
 * ======================================================================
 * YÖNETİM PANELİ (CONFIG DOSYASI) - MUHAMMET TUTKUN A.Ş.
 * ======================================================================
 * PREMIUM MİMARİ GÜNCELLEMESİ:
 * Artık 4 farklı proje sayfası var (SİP Panel, Ev, Bahçe, Garaj).
 * Hangi projenin hangi sayfada çıkacağını 'pageMenu' ayarından seçersiniz.
 */

export const siteConfig = {
    contact: {
        // YENİ YUVARLAK BÜYÜK LOGONUZ
        logoSrc: "https://i.pinimg.com/736x/4e/f6/25/4ef625ad3564670a75e74be775fac392.jpg",
        address: "Sakarya, Türkiye",
        phone: "+90 507 880 76 07", 
        email: "info@muhammettutkun.com.tr",
        social: { facebook: "#", youtube: "#", instagram: "https://www.instagram.com/muhammet.tutkun/" }
    },

    // ==========================================
    // YENİ: SİP PANEL ANA SAYFA (HERO) AYARLARI
    // ==========================================
    homeHero: {
        // Site açılır açılmaz arkada görünecek devasa resim (veya ileride video eklenebilir)
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

    // ==========================================
    // FİLTRE KATEGORİLERİ (Tüm proje sayfalarında solda çıkar)
    // ==========================================
    categories: [
        { id: "standart", tr: "Standart Evler", en: "Standard Houses" },
        { id: "moduler", tr: "Modüler Evler", en: "Modular Houses" },
        { id: "ahsap", tr: "Ahşap Kaplama", en: "Wooden Finish" },
        { id: "tekkatli", tr: "Tek Katlı", en: "Single-Story" },
        { id: "ikikatli", tr: "İki Katlı", en: "Two-Story" },
        { id: "kamelya", tr: "Kamelya & Çardak", en: "Gazebo" },
        { id: "kisbahcesi", tr: "Kış Bahçesi", en: "Winter Garden" }
    ],

    // ==========================================
    // PROJELER (Yeni 'pageMenu' sistemine göre)
    // ==========================================
    projects: [
        {
            id: "dubleks-298", 
            title: "Zifin House",
            titleEn: "Duplex Project - 298",
            area: 61, rooms: 3,  
            
            // DİKKAT: Bu proje üst menüde HANGİ sekmeye basınca çıksın?
            // Seçenekler: "sip-panel", "ev-modelleri", "bahce-yapilari", "garaj-sistemleri"
            pageMenu: "sip-panel", 
            categoryId: "ikikatli", 
            
            mainImage: "https://i.pinimg.com/736x/e0/b9/e1/e0b9e1b995c80a7c916a8ad64fa09d83.jpg",
            gallery: [
                "https://i.pinimg.com/736x/e4/9b/cb/e49bcbcb4078e3140f07f75687455669.jpg",
                "https://i.pinimg.com/736x/4f/4e/11/4f4e11dbabea7f52a2425b3d04505b60.jpg"
            ],
            description: {
                tr: "SİP Panel ana sayfasında sergilenmek üzere tasarlanmış modern iki katlı dubleks proje.",
                en: "Modern two-story duplex SIP panel project."
            }
        },
        {
            id: "calanthe-145",
            title: "Calanthe Modeli",
            titleEn: "Calanthe Model - 145",
            area: 54, rooms: 4,
            
            pageMenu: "ev-modelleri", // Sadece Ev Modelleri'ne basınca çıkar
            categoryId: "tekkatli",
            
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
            
            pageMenu: "bahce-yapilari", // Sadece Bahçe Yapıları'na basınca çıkar
            categoryId: "kisbahcesi",
            
            mainImage: "https://placehold.co/800x600/1a1a1a/FFF?text=Kış+Bahçesi",
            gallery: [],
            description: { tr: "Dört mevsim bahçe keyfi.", en: "Enjoy your garden in all seasons." }
        }
    ],

    i18n: {
        tr: {
            // YENİ 7'Lİ MENÜ SİSTEMİ (İstediğiniz gibi güncellendi)
            menu: {
                "sip-panel": "SİP PANEL", 
                "ev-modelleri": "EV MODELLERİ", 
                "bahce-yapilari": "BAHÇE YAPILARI", 
                "garaj-sistemleri": "GARAJ SİSTEMLERİ", 
                "uretim": "ÜRETİM", 
                "galeri": "GALERİ", 
                "hakkimizda": "HAKKIMIZDA"
            },
            
            consultBtn: "İLETİŞİM",
            followUs: "Bizi takip edin:",
            categoryTitle: "KATEGORİLER",
            allProjectsTitle: "Tüm Seçenekler",
            sqm: "m²",
            totalArea: "Toplam alan",
            roomCount: "Oda sayısı",
            getQuoteTitle: "Hemen Fiyat Alın",
            formName: "İsminiz",
            formPhone: "Telefon (Örn: 507 880 7607)",
            formEmail: "E-postanız",
            submitBtn: "Gönder",
            backBtn: "Geri Dön",
            projectDetailsTitle: "Detaylar",
            
            pageTitles: {
                "uretim": "Üretim Tesisimiz",
                "galeri": "Fotoğraf Galerisi",
                "hakkimizda": "Hakkımızda",
                "sip-panel": "SİP Panel Projeler",
                "ev-modelleri": "Ev Modellerimiz",
                "bahce-yapilari": "Bahçe Yapılarımız",
                "garaj-sistemleri": "Garaj Sistemlerimiz"
            },
            
            pageContents: {
                // Ana sayfanın (SİP PANEL) alt kısmında (projelerden önce) çıkacak tanıtım yazısı
                "sip-panel-intro": `
                    <div class="text-center max-w-4xl mx-auto mb-16 px-4">
                        <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6">Geleceğin Yapı Teknolojisi</h2>
                        <p class="text-lg text-gray-600 leading-relaxed font-medium">SİP (Yapısal Yalıtımlı Panel) teknolojisi ile evlerinizi hem daha hızlı inşa ediyor hem de maksimum enerji tasarrufu sağlıyoruz. Kurumsal tecrübemizi doğayla buluşturuyoruz.</p>
                    </div>
                `,
                
                "uretim": `
                    <p class="mb-6 text-lg text-gray-700 leading-relaxed">Fabrikamızda en son teknoloji ile SİP panellerin üretimini gerçekleştiriyoruz. Kalite kontrol süreçlerimiz Avrupa standartlarındadır.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <img src="https://placehold.co/600x400/f39c12/white?text=Uretim+Hatti+1" class="w-full rounded-sm shadow-md" alt="Üretim 1">
                        <img src="https://placehold.co/600x400/f39c12/white?text=Uretim+Hatti+2" class="w-full rounded-sm shadow-md" alt="Üretim 2">
                    </div>
                `,
                "galeri": "<p class="text-center text-gray-500 text-lg">Şantiye ve tamamlanan projelerimizin detaylı fotoğrafları yakında burada yer alacaktır.</p>",
                "hakkimizda": `
                    <h3 class="text-3xl font-black mb-4 text-gray-900">Muhammet Tutkun A.Ş.</h3>
                    <p class="mb-6 text-lg text-gray-700 leading-relaxed">Yılların verdiği tecrübe ile yenilikçi yapı teknolojilerini Türkiye ile buluşturuyoruz. Güven, estetik ve sağlamlık temel ilkelerimizdir.</p>
                `
            },
            footerText: "© 2026 Muhammet Tutkun A.Ş. Tüm hakları saklıdır."
        },
        en: {
            menu: {
                "sip-panel": "SIP PANEL", "ev-modelleri": "HOUSE MODELS", 
                "bahce-yapilari": "GARDENS", "garaj-sistemleri": "GARAGES", 
                "uretim": "PRODUCTION", "galeri": "GALLERY", "hakkimizda": "ABOUT US"
            },
            consultBtn: "CONTACT", followUs: "Follow us:", categoryTitle: "CATEGORIES",
            allProjectsTitle: "All Options", sqm: "m²", totalArea: "Total area", roomCount: "Rooms",
            getQuoteTitle: "Get a Quote", formName: "Your Name", formPhone: "Phone", formEmail: "Email",
            submitBtn: "Submit", backBtn: "Go Back", projectDetailsTitle: "Details",
            pageTitles: {
                "uretim": "Production", "galeri": "Gallery", "hakkimizda": "About Us",
                "sip-panel": "SIP Panel Projects", "ev-modelleri": "House Models", 
                "bahce-yapilari": "Garden Structures", "garaj-sistemleri": "Garage Systems"
            },
            pageContents: {
                "sip-panel-intro": `
                    <div class="text-center max-w-4xl mx-auto mb-16 px-4">
                        <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6">Future Building Technology</h2>
                        <p class="text-lg text-gray-600 leading-relaxed font-medium">We build your homes faster and provide maximum energy savings with SIP technology.</p>
                    </div>
                `,
                "uretim": "<p>Information about our production facility.</p>",
                "galeri": "<p>Gallery coming soon.</p>",
                "hakkimizda": "<p>About Muhammet Tutkun A.Ş.</p>"
            },
            footerText: "© 2026 Muhammet Tutkun A.Ş. All rights reserved."
        }
    }
};
