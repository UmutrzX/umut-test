/**
 * ======================================================================
 * YÖNETİM PANELİ (CONFIG DOSYASI) - MUHAMMET TUTKUN A.Ş.
 * ======================================================================
 * HOŞ GELDİNİZ! Bu dosya sitenizin beynidir. Kodlama bilmenize gerek yok.
 * Sadece tırnak işaretleri (" ") içindeki yazıları değiştirerek tüm siteyi 
 * anında güncelleyebilirsiniz. LÜTFEN TIRNAKLARI SİLMEMEYE DİKKAT EDİN!
 */

export const siteConfig = {
    // ==========================================
    // BÖLÜM 1: GENEL BİLGİLER VE İLETİŞİM
    // ==========================================
    contact: {
        logoSrc: "https://i.pinimg.com/736x/3c/09/22/3c09223c7da248f49f461aca4c87301f.jpg",
        address: "Sakarya, Türkiye",
        phone: "+90 507 880 76 07", 
        email: "info@muhammettutkun.com.tr",
        social: {
            facebook: "#",
            youtube: "#",
            instagram: "https://www.instagram.com/muhammet.tutkun/"
        }
    },

    // ==========================================
    // BÖLÜM 2: PROJE KATEGORİLERİ (Soldaki Menü)
    // ==========================================
    categories: [
        { id: "standart", tr: "Standart evler", en: "Standard houses" },
        { id: "moduler", tr: "Modüler evler", en: "Modular houses" },
        { id: "ahsap", tr: "Ahşap evler", en: "Wooden houses" },
        { id: "kirsal", tr: "Kırsal evler", en: "Rural houses" },
        { id: "garajli", tr: "Garajlı", en: "With Garage" },
        { id: "ikikatli", tr: "İki Katlı", en: "Two-Story" },
        { id: "tekkatli", tr: "Tek Katlı", en: "Single-Story" }
    ],

    // ==========================================
    // BÖLÜM 3: SATILIK EVLER / PROJELER
    // ==========================================
    projects: [
        {
            id: "dubleks-298", 
            title: "Zifin House",
            titleEn: "Duplex Project - 298",
            area: 61, 
            rooms: 3, 
            categoryId: "ahsap", 
            mainImage: "https://i.pinimg.com/736x/e0/b9/e1/e0b9e1b995c80a7c916a8ad64fa09d83.jpg",
            gallery: [
                "https://i.pinimg.com/736x/e4/9b/cb/e49bcbcb4078e3140f07f75687455669.jpg",
                "https://i.pinimg.com/736x/4f/4e/11/4f4e11dbabea7f52a2425b3d04505b60.jpg",
                "https://i.pinimg.com/1200x/bd/20/dd/bd20ddd04e4e1cac3fb9a6b88958749d.jpg"
            ],
            description: {
                tr: "Modern iki katlı dubleks SİP panel proje. İki ailenin yan yana fakat kendi özel alanlarını koruyarak yaşamak istedikleri durumlar için pratik bir çözümdür. Geniş pencereler, garaj alanı ve modern mimari detaylar ile tasarlanmıştır.",
                en: "Modern two-story duplex SIP panel project. It is a practical solution for two families who want to live side by side but preserve their own private spaces."
            }
        },
        {
            id: "calanthe-145",
            title: "Test projesi",
            titleEn: "Calanthe Project - 145",
            area: 54,
            rooms: 4,
            categoryId: "tekkatli",
            mainImage: "https://i.pinimg.com/736x/b3/fc/38/b3fc3888aecdcc57cd78193d31f7bd46.jpg",
            gallery: [
                "https://i.pinimg.com/1200x/be/d6/bf/bed6bfbffcea556193c1a2b9c7ce4b92.jpg"
            ],
            description: {
                tr: "Tek katlı, geniş bahçe teraslı doğa ile iç içe yaşam sunan şık ve kullanışlı bir SİP panel ev tasarımı. Enerji verimliliği yüksek, hızlı kurulabilen modern bir yaşam alanı.",
                en: "A stylish and useful SIP panel house design that offers life in touch with nature with a single-story, large garden terrace."
            }
        }
    ],

    // ==========================================
    // BÖLÜM 4: MÜŞTERİ YORUMLARI
    // ==========================================
    reviews: [
        /* Örnek Yorum (Aktif etmek için başındaki ve sonundaki /* işaretlerini silin)
        {
            id: 1,
            image: "https://i.pinimg.com/736x/3c/09/22/3c09223c7da248f49f461aca4c87301f.jpg", // Örnek olarak logo eklendi
            date: "20.12.2023",
            title: {
                tr: "VİDEO İNCELEMESİ: NEDEN GAZBETON YERİNE SİP EV TERCİH ETTİM?",
                en: "VIDEO REVIEW: WHY I CHOSE A SIP HOUSE?"
            },
            text: {
                tr: "Müşteriye yaklaşımlarını çok beğendik. Her şey bize çok detaylı bir şekilde açıklandı...",
                en: "We really liked their approach to the customer. Everything was explained to us in detail..."
            }
        }
        */
    ],

    // ==========================================
    // BÖLÜM 5: ÇEVİRİLER VE TÜM SAYFA İÇERİKLERİ
    // ==========================================
    // NOT: Sayfa içeriklerine resim eklemek için <img src="RESİM_LİNKİ" class="w-full rounded-sm my-4"> kullanabilirsiniz.
    i18n: {
        tr: {
            menu: {
                home: "YAPI", projects: "PROJELER", prices: "FİYATLAR", 
                gallery: "GALERİ", reviews: "YORUMLAR", about: "HAKKIMIZDA", contact: "İLETİŞİM"
            },
            consultBtn: "DANIŞMA",
            followUs: "Bizi sosyal medyada takip edin:",
            categoryTitle: "PROJE KATEGORİSİ",
            allProjectsTitle: "Örnek Projeler",
            sqm: "metrekare",
            homePath: "Ana Sayfa",
            projectsPath: "Projeler",
            totalArea: "Toplam alan",
            roomCount: "Oda sayısı",
            getQuoteTitle: "İnşaat maliyetini öğrenin",
            formName: "İsminiz",
            formPhone: "Telefon (Örn: 507 880 7607)",
            formEmail: "E-postanız",
            submitBtn: "Fiyatı Öğren",
            backBtn: "Geri Dön",
            projectDetailsTitle: "Proje Detayları",
            
            pageTitles: {
                home: "Yapı ve Teknoloji",
                prices: "Fiyatlandırma ve Paketler",
                gallery: "Fotoğraf ve Video Galerisi",
                reviews: "Müşteri Yorumları",
                about: "Hakkımızda",
                contact: "Bize Ulaşın"
            },
            
            pageContents: {
                // Ana sayfanın üst metni. (Motor bu yazının altına otomatik rastgele projeler ekler)
                home: `
                    <p class="mb-4">SİP panellerin avantajları, izolasyon değerleri ve üretim süreçleri alanındaki tecrübemizle hayalinizdeki evi inşa ediyoruz. Aşağıda son projelerimizden bazı kareleri inceleyebilirsiniz.</p>
                `,
                // Fiyatlar Sayfası - Metin, Tablo veya Görsel ekleyebilirsiniz.
                prices: `
                    <p class="mb-4 text-gray-700">Güncel fiyatlandırma politikamız projenin büyüklüğüne ve seçilen paket özelliklerine göre değişiklik göstermektedir. Örnek bir fiyat tablosunu ve referans görselimizi aşağıda bulabilirsiniz:</p>
                    <img src="https://i.pinimg.com/736x/3c/09/22/3c09223c7da248f49f461aca4c87301f.jpg" class="w-full h-auto max-h-[300px] object-contain rounded-sm shadow-sm border border-gray-100 my-6 bg-white p-4" alt="Fiyat Tablosu Referans">
                    <div class="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <p class="mb-3"><i class="fas fa-check text-brand-orange mr-2"></i> <strong>Standart Paket:</strong> 15.000 TL / m2</p>
                        <p><i class="fas fa-check-double text-brand-orange mr-2"></i> <strong>Anahtar Teslim Paket:</strong> 25.000 TL / m2</p>
                    </div>
                `,
                // Galeri Sayfası - Proje detayları haricindeki genel şantiye fotoları vb. eklenebilir.
                gallery: `
                    <p class="mb-6 text-gray-700">Tamamlanan projelerimizin şantiye süreçlerinden ve üretim aşamalarından bazı kareler:</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <img src="https://i.pinimg.com/736x/b3/fc/38/b3fc3888aecdcc57cd78193d31f7bd46.jpg" class="w-full h-48 object-cover rounded-sm shadow-sm hover:scale-105 transition" alt="Şantiye 1">
                        <img src="https://i.pinimg.com/736x/e0/b9/e1/e0b9e1b995c80a7c916a8ad64fa09d83.jpg" class="w-full h-48 object-cover rounded-sm shadow-sm hover:scale-105 transition" alt="Şantiye 2">
                    </div>
                `,
                // Hakkımızda Sayfası
                about: `
                    <div class="text-left">
                        <p class="mb-4 text-lg">Muhammet Tutkun A.Ş. olarak yılların verdiği tecrübe ile inşaat sektöründe öncüyüz. Güven ve kaliteyi her zaman ön planda tutuyoruz.</p>
                        <img src="https://i.pinimg.com/736x/3c/09/22/3c09223c7da248f49f461aca4c87301f.jpg" class="w-full h-auto max-h-[200px] object-contain bg-gray-50 rounded-sm shadow-md mb-6 p-4 border border-gray-100" alt="Şirketimiz">
                        <p class="mb-2"><strong>Misyonumuz:</strong> En kaliteli SİP Panel evleri en hızlı ve güvenli şekilde teslim etmektir.</p>
                        <p><strong>Vizyonumuz:</strong> Modern yapı teknolojilerinde Türkiye'nin en çok tercih edilen markası olmak.</p>
                    </div>
                `,
                contact: ""
            },
            footerText: "© 2026 Muhammet Tutkun A.Ş. Tüm hakları saklıdır."
        },
        en: {
            menu: {
                home: "BUILDING", projects: "PROJECTS", prices: "PRICING", 
                gallery: "GALLERY", reviews: "REVIEWS", about: "ABOUT US", contact: "CONTACT"
            },
            consultBtn: "CONSULTATION",
            followUs: "Follow us on social media:",
            categoryTitle: "PROJECT CATEGORY",
            allProjectsTitle: "SIP PANEL HOUSE PLANS",
            sqm: "square meters",
            homePath: "Home",
            projectsPath: "Projects",
            totalArea: "Total area",
            roomCount: "Number of rooms",
            getQuoteTitle: "Find out the construction cost",
            formName: "Your Name",
            formPhone: "Phone",
            formEmail: "Your Email",
            submitBtn: "Get Quote",
            backBtn: "Go Back",
            projectDetailsTitle: "Project Details",
            pageTitles: {
                home: "Building and Technology", prices: "Pricing and Packages", gallery: "Photo Gallery",
                reviews: "Customer Reviews", about: "About Us", contact: "Contact Us"
            },
            pageContents: {
                home: `<p class="mb-4">With our experience in the advantages of SIP panels, insulation values, and production processes, we build your dream home.</p>`,
                prices: `
                    <p class="mb-4 text-gray-700">Our pricing varies depending on the size of the project and the selected package features.</p>
                    <img src="https://i.pinimg.com/736x/3c/09/22/3c09223c7da248f49f461aca4c87301f.jpg" class="w-full h-auto max-h-[300px] object-contain rounded-sm shadow-sm border border-gray-100 my-6 bg-white p-4" alt="Pricing Reference">
                    <div class="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <p class="mb-3"><i class="fas fa-check text-brand-orange mr-2"></i> <strong>Standard Package:</strong> $500 / sqm</p>
                        <p><i class="fas fa-check-double text-brand-orange mr-2"></i> <strong>Turnkey Package:</strong> $800 / sqm</p>
                    </div>
                `,
                gallery: `
                    <p class="mb-6 text-gray-700">Some shots from the construction processes and production stages of our completed projects:</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <img src="https://i.pinimg.com/736x/b3/fc/38/b3fc3888aecdcc57cd78193d31f7bd46.jpg" class="w-full h-48 object-cover rounded-sm shadow-sm hover:scale-105 transition" alt="Site 1">
                         <img src="https://i.pinimg.com/736x/e0/b9/e1/e0b9e1b995c80a7c916a8ad64fa09d83.jpg" class="w-full h-48 object-cover rounded-sm shadow-sm hover:scale-105 transition" alt="Site 2">
                    </div>
                `,
                about: `
                    <div class="text-left">
                        <p class="mb-4 text-lg">As Muhammet Tutkun A.Ş., we are pioneers in the construction sector with years of experience.</p>
                        <img src="https://i.pinimg.com/736x/3c/09/22/3c09223c7da248f49f461aca4c87301f.jpg" class="w-full h-auto max-h-[200px] object-contain bg-gray-50 rounded-sm shadow-md mb-6 p-4 border border-gray-100" alt="Our Company">
                        <p class="mb-2"><strong>Our Mission:</strong> To deliver the highest quality SIP Panel houses as quickly and safely as possible.</p>
                    </div>
                `,
                contact: ""
            },
            footerText: "© 2026 Muhammet Tutkun A.Ş. All rights reserved."
        }
    }
};
