/**
 * ======================================================================
 * YÖNETİM PANELİ (CONFIG DOSYASI) - KARTECH PANEL STRUCTURES HOUSE SYSTEMS
 * ======================================================================
 */

export const siteConfig = {
    contact: {
        logoSrc: "https://pbs.twimg.com/media/HOLR5R6XAAAe8QI?format=png&name=small", // YENİ ŞEFFAF LOGO
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

    /* 
     * ======================================================================
     * KATEGORİ EKLEME/DÜZENLEME REHBERİ
     * ======================================================================
     * Yeni bir alt kategori eklemek için aşağıdaki listeye formatı bozmadan ekleme yapın.
     * 'id' kısmı benzersiz olmalı (boşluksuz, ingilizce karakter, örn: "yeni-kategori").
     * 'tr' ve 'en' kısımları ise menüde ve filtrelerde görünen isimlerdir.
     */
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
     * Hiç kod bilmeseniz bile yeni proje ekleyebilirsiniz. Yeni bir proje için mevcut bir projenin { ... } arasındaki bloğunu kopyalayıp en alta yapıştırın.
     * 
     * ÖNEMLİ FOTOĞRAF BOYUTLARI (EN KALİTELİ GÖRÜNTÜ İÇİN):
     * - Ana Görsel (mainImage) ve Galeri (gallery) fotoğrafları YATAY (Landscape) olmalıdır.
     * - İdeal Oran: 4:3 (Dört bölü Üç) veya 16:9
     * - Önerilen Çözünürlük: 1200x900 piksel veya 1920x1080 piksel boyutlarındadır.
     * 
     * ALANLARIN ANLAMLARI:
     * - id: Projeye özel benzersiz bir isim (boşluksuz, küçük harf, örn: "kis-bahcesi-premium")
     * - pageMenu: Projenin çıkacağı ana menü (Seçenekler: "ev-modelleri", "bahce-yapilari", "garaj-sistemleri")
     * - categoryId: Projenin çıkacağı alt kategori (Yukarıdaki 'categories' listesindeki id'lerden biri olmalı)
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
                tr: "Kartech Panel kalitesiyle tasarlanmış modern iki katlı dubleks proje.",
                en: "Modern two-story duplex SIP panel project."
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
            gallery: ["https://i.pinimg.com/1200x/be/d6/bf/bed6bfbffcea556193c1a2b9c7ce4b92.jpg"],
            description: {
                tr: "Doğa ile iç içe yaşam sunan şık ve kullanışlı bir ev tasarımı.",
                en: "A stylish and useful house design."
            }
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
                "iletisim": "Bize Ulaşın"
            },
            
            consultBtn: "Bize Ulaşın", // GÜNCELLENDİ
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
            
            pageTitles: {
                "home": "Ana Sayfa",
                "uretim": "Üretim Tesisimiz",
                "galeri": "Fotoğraf Galerisi",
                "hakkimizda": "Hakkımızda",
                "sip-panel": "SİP Panel Teknolojisi",
                "ev-modelleri": "Ev Modellerimiz",
                "bahce-yapilari": "Bahçe Yapılarımız",
                "garaj-sistemleri": "Garaj Sistemlerimiz",
                "iletisim": "Bize Ulaşın"
            },

            // DİNAMİK SİP PANEL VERİSİ
            sipPanelData: {
                heroImg: "https://vividgreen.co.uk/wp-content/uploads/2024/04/IMG_5283-scaled-1280x750-2-1024x600.jpg", // GÜNCELLENDİ
                introTitle: "SİP (Yapısal Yalıtımlı Panel) Nedir?",
                introText: "SİP (Structural Insulated Panel), yüksek yoğunluklu yalıtım çekirdeğinin (genellikle EPS) iki yapısal kaplama malzemesi (OSB-3) arasına preslenmesiyle oluşturulan, taşıyıcı kapasitesi olağanüstü yüksek, modern ve kompozit bir yapı malzemesidir. Geleneksel sistemlere göre %60'a varan enerji tasarrufu ve ultra hızlı kurulum sunar.",
                
                advantagesTitle: "Neden SİP Panel?",
                advantages: [
                    { icon: "fa-bolt", title: "Ultra Hızlı Kurulum", desc: "Paneller fabrikamızda projenize özel milimetrik kesilir. Şantiyede sadece montajı yapılır, inşaat süresi %50 kısalır." },
                    { icon: "fa-leaf", title: "Üstün Isı Yalıtımı", desc: "Yekpare yalıtım çekirdeği sayesinde ısı köprüleri oluşmaz. Yazın serin, kışın sıcak tutar." },
                    { icon: "fa-shield-alt", title: "Depreme Tam Dayanım", desc: "Esnek ve yekpare çalışma prensibi sayesinde deprem sarsıntılarını sönümler. Betonarme gibi yıkılma riski taşımaz." },
                    { icon: "fa-volume-mute", title: "Akustik Konfor", desc: "Yüksek yoğunluklu EPS katmanı dışarıdan gelen sesleri ciddi oranda keserek huzurlu bir yaşam alanı sunar." }
                ],
                
                specsTitle: "Teknik Spesifikasyonlar",
                specsDesc: "Projelerinizde mühendislik standartlarını en üst seviyede tutuyoruz.",
                technicalSpecs: [
                    { label: "Dış Yüzey Kaplaması", value: "11mm / 15mm OSB-3 (Neme Dayanıklı)" },
                    { label: "Yalıtım Çekirdeği", value: "EPS (Genleştirilmiş Polistiren) - 16-30 Dansite" },
                    { label: "Standart Panel Kalınlıkları", value: "100mm, 150mm, 200mm" },
                    { label: "Isı İletim Katsayısı (U-Değeri)", value: "0.15 - 0.25 W/m²K (Kalınlığa göre)" },
                    { label: "Yangın Direnç Sınıfı", value: "E Sınıfı (Alev yürütmez EPS)" },
                    { label: "Taşıyıcı Kapasite", value: "Geleneksel ahşap karkasa göre 3 kat daha güçlü" }
                ]
            },
            
            pageContents: {
                "home-intro": `
                    <div class="text-left max-w-4xl mx-auto mb-16 px-4">
                        <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Geleceğin Yapı Teknolojisi</h2>
                        <p class="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">SİP (Yapısal Yalıtımlı Panel) teknolojisi ile evlerinizi hem daha hızlı inşa ediyor hem de maksimum enerji tasarrufu sağlıyoruz. Kartech Panel tecrübemizi doğayla buluşturuyoruz.</p>
                        <div class="mt-6 w-20 h-1.5 bg-brand-orange rounded-full"></div>
                    </div>
                `,
                "uretim": `<p class="mb-6 text-xl text-gray-700 leading-relaxed font-medium break-words">Fabrikamızda en son teknoloji ile SİP panellerin üretimini gerçekleştiriyoruz.</p>`,
                "galeri": "<p class='text-center text-gray-500 text-xl font-medium break-words'>Şantiye ve tamamlanan projelerimizin detaylı fotoğrafları yakında burada yer alacaktır.</p>",
                "hakkimizda": `
                    <h3 class="text-4xl font-black mb-6 text-gray-900 tracking-tight">Kartech Panel Structures House Systems</h3>
                    <p class="mb-6 text-xl text-gray-700 leading-relaxed font-medium break-words">Yılların verdiği tecrübe ile yenilikçi yapı teknolojilerini Türkiye ile buluşturuyoruz.</p>
                `
            },
            footerText: "© 2026 Kartech Panel Structures House Systems. Tüm hakları saklıdır."
        },

        en: {
            menu: {
                "home": "Home", "sip-panel": "SIP Panel", "ev-modelleri": "House Models", 
                "bahce-yapilari": "Garden Structures", "garaj-sistemleri": "Garage Systems", 
                "uretim": "Production", "galeri": "Gallery", "hakkimizda": "About Us", "iletisim": "Contact Us"
            },
            consultBtn: "Contact Us", categoryTitle: "Categories",
            allProjectsTitle: "All Options", sqm: "m²", totalArea: "Total area", roomCount: "Rooms",
            getQuoteTitle: "Get a Quote", formName: "Your Name", formPhone: "Phone",
            submitBtn: "Submit", backBtn: "Go Back", projectDetailsTitle: "Details",
            pageTitles: {
                "home": "Home", "uretim": "Production", "galeri": "Gallery", "hakkimizda": "About Us",
                "sip-panel": "SIP Panel Technology", "ev-modelleri": "House Models", 
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
                "home-intro": `
                    <div class="text-left max-w-4xl mx-auto mb-16 px-4">
                        <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Future Building Technology</h2>
                        <p class="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">We build your homes faster and provide maximum energy savings with SIP technology.</p>
                        <div class="mt-6 w-20 h-1.5 bg-brand-orange rounded-full"></div>
                    </div>
                `,
                "uretim": "<p class='text-xl break-words'>Information about our production facility.</p>",
                "galeri": "<p class='text-xl break-words'>Gallery coming soon.</p>",
                "hakkimizda": "<p class='text-xl break-words'>About Kartech Panel Structures House Systems.</p>"
            },
            footerText: "© 2026 Kartech Panel Structures House Systems. All rights reserved."
        }
    }
};
