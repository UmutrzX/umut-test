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
        // Site logonuzun linki (Şu an Pinterest linkiniz bağlı)
        logoSrc: "https://i.pinimg.com/736x/3c/09/22/3c09223c7da248f49f461aca4c87301f.jpg",
        
        // Adres ve İletişim Bilgileriniz
        address: "Sakarya, Türkiyeeeee",
        phone: "+90 507 880 76 07", 
        email: "info@muhammettutkun.com.tr",
        
        // Sosyal Medya Linkleriniz (Eğer bir hesabınız yoksa "#" olarak bırakın)
        social: {
            facebook: "#",
            youtube: "#",
            instagram: "https://www.instagram.com/muhammet.tutkun/"
        }
    },

    // ==========================================
    // BÖLÜM 2: PROJE KATEGORİLERİ (Soldaki Menü)
    // ==========================================
    // Yeni bir kategori eklemek için satırı kopyalayıp alta yapıştırın.
    // 'id' kısmı çok önemlidir: Türkçe karakter ve boşluk İÇERMEMELİDİR.
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
    // Burada sitenizdeki evleri ekliyoruz. İstediğiniz kadar kopyalayıp ekleyebilirsiniz.
    projects: [
        {
            // Sistemin bu evi tanıması için benzersiz ve boşluksuz bir isim verin.
            id: "dubleks-298", 
            
            // Sitede görünecek Evin Adı
            title: "Zifin Hose",
            titleEn: "Duplex Project - 298",
            
            // Özellikleri (Sadece sayı yazın)
            area: 61, // Metrekare
            rooms: 3,  // Oda sayısı
            
            // Bu ev Hangi Kategoride görünsün? (Yukarıdaki BÖLÜM 2'deki ID'lerden birini yazın)
            categoryId: "ahsap", 
            
            // Ana Kapak Resmi
            mainImage: "https://i.pinimg.com/736x/e0/b9/e1/e0b9e1b995c80a7c916a8ad64fa09d83.jpg",
            
            // İç mekan veya diğer galeri resimleri (İstediğiniz kadar alt alta link ekleyebilirsiniz)
            // DİKKAT: Ana resminiz de otomatik olarak galeriye dahil edilecektir, buraya tekrar yazmanıza gerek yok.
            gallery: [
                "https://i.pinimg.com/736x/e4/9b/cb/e49bcbcb4078e3140f07f75687455669.jpg",
                "https://i.pinimg.com/736x/4f/4e/11/4f4e11dbabea7f52a2425b3d04505b60.jpg",
                "https://i.pinimg.com/1200x/bd/20/dd/bd20ddd04e4e1cac3fb9a6b88958749d.jpg"
            ],
            
            // Evin uzun tanıtım yazısı
            description: {
                tr: "Modern iki katlı dubleks SİP panel proje. İki ailenin yan yana fakat kendi özel alanlarını koruyarak yaşamak istedikleri durumlar için pratik bir çözümdür. Geniş pencereler, garaj alanı ve modern mimari detaylar ile tasarlanmıştır.",
                en: "Modern two-story duplex SIP panel project. It is a practical solution for two families who want to live side by side but preserve their own private spaces."
            }
        },
        
        // --- İKİNCİ EV BAŞLANGICI ---
        {
            id: "calanthe-145",
            title: "Calanthe Projesi - 145",
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
    // BÖLÜM 4: ÇEVİRİLER VE SAYFA YAZILARI
    // ==========================================
    i18n: {
        tr: {
            menu: {
                home: "YAPI", projects: "PROJELER", prices: "FİYATLAR", 
                gallery: "GALERİ", reviews: "YORUMLAR", about: "HAKKIMIZDA", contact: "İLETİŞİM"
            },
            
            // Genel Buton ve Başlık Yazıları
            consultBtn: "DANIŞMA",
            followUs: "Bizi sosyal medyada takip edin:",
            categoryTitle: "PROJE KATEGORİSİ",
            allProjectsTitle: "SİP PANEL EV PLANLARI",
            sqm: "metrekare",
            homePath: "Ana Sayfa",
            projectsPath: "Projeler",
            
            // Proje İçi Yazılar
            totalArea: "Toplam alan",
            roomCount: "Oda sayısı",
            getQuoteTitle: "İnşaat maliyetini öğrenin",
            formName: "İsminiz",
            formPhone: "Telefon (Örn: 507 880 7607)",
            formEmail: "E-postanız",
            submitBtn: "Fiyatı Öğren",
            backBtn: "Geri Dön",
            projectDetailsTitle: "Proje Detayları",
            
            // -----------------------------------------------------
            // SAYFA BAŞLIKLARI
            // -----------------------------------------------------
            pageTitles: {
                home: "Yapı ve Teknoloji",
                prices: "Fiyatlandırma",
                gallery: "Fotoğraf Galerisi",
                reviews: "Müşteri Yorumları",
                about: "Hakkımızda",
                contact: "Bize Ulaşın"
            },
            
            // -----------------------------------------------------
            // SAYFA İÇERİKLERİ (İstediğiniz gibi doldurun)
            // HTML Kodları kullanabilirsiniz. Örnek: <br> alt satıra atar.
            // <strong>Kalın Yazı</strong> yazar. 
            // <img src="resim-linki.jpg"> sayfaya büyük resim ekler.
            // -----------------------------------------------------
            pageContents: {
                home: "SİP panellerin avantajları, izolasyon değerleri ve üretim süreçleri burada anlatılmaktadır.",
                prices: "<strong>Standart Paket:</strong> 15.000 TL / m2 <br><br> <strong>Anahtar Teslim:</strong> 25.000 TL / m2",
                gallery: "Tamamlanan projelerimizin şantiye süreçleri. Buraya galeri uygulamaları eklenebilir.",
                reviews: "Müşterilerimizin bizim hakkımızda söyledikleri...",
                
                // Hakkımızda sayfasına çoklu satır ve resim ekleme örneği
                about: `
                    <p class="mb-4">Muhammet Tutkun A.Ş. olarak yılların verdiği tecrübe ile inşaat sektöründe öncüyüz.</p>
                    <img src="https://placehold.co/800x400/f39c12/white?text=Sirket+Fotografi" class="w-full rounded-sm shadow-md mb-4" alt="Şirketimiz">
                    <p>Misyonumuz en kaliteli SİP Panel evleri en hızlı şekilde teslim etmektir.</p>
                `,
                
                // İletişim sayfasının metnini boş bırakırsanız sadece harita/form görünür.
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
            formPhone: "Phone (e.g., 507 880 7607)",
            formEmail: "Your Email",
            submitBtn: "Get Quote",
            backBtn: "Go Back",
            projectDetailsTitle: "Project Details",
            pageTitles: {
                home: "Building and Technology", prices: "Pricing", gallery: "Photo Gallery",
                reviews: "Customer Reviews", about: "About Us", contact: "Contact Us"
            },
            pageContents: {
                home: "Advantages of SIP panels, insulation values, and production processes.",
                prices: "<strong>Standard Package:</strong> $500 / sqm <br><br> <strong>Turnkey:</strong> $800 / sqm",
                gallery: "Construction processes of our completed projects.",
                reviews: "What our customers say about us...",
                about: `
                    <p class="mb-4">As Muhammet Tutkun A.Ş., we are pioneers in the construction sector with years of experience.</p>
                    <img src="https://placehold.co/800x400/f39c12/white?text=Company+Photo" class="w-full rounded-sm shadow-md mb-4" alt="Our Company">
                    <p>Our mission is to deliver the highest quality SIP Panel houses as quickly as possible.</p>
                `,
                contact: ""
            },
            footerText: "© 2026 Muhammet Tutkun A.Ş. All rights reserved."
        }
    }
};
