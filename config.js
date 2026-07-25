/**
 * ======================================================================
 * YÖNETİM PANELİ (CONFIG DOSYASI) - MUHAMMET TUTKUN A.Ş.
 * ======================================================================
 * HOŞ GELDİNİZ! Bu dosya sitenizin beynidir. Kodlama bilmenize gerek yok.
 * Sadece tırnak işaretleri (" " veya ` `) içindeki yazıları değiştirerek 
 * tüm siteyi anında güncelleyebilirsiniz. 
 * 
 * ÇOK ÖNEMLİ KURAL: Yazıları değiştirirken baştaki ve sondaki tırnakları,
 * ve satır sonlarındaki virgülleri (,) ASLA SİLMEYİN.
 */

export const siteConfig = {
    // ==================================================================
    // BÖLÜM 1: GENEL BİLGİLER VE İLETİŞİM (Her Yerde Görünen Bilgiler)
    // ==================================================================
    contact: {
        // Sitenizin Sol Üstünde ve En Altında Çıkan Logo
        logoSrc: "https://i.pinimg.com/736x/3c/09/22/3c09223c7da248f49f461aca4c87301f.jpg",
        
        address: "Sakarya, Türkiye",
        
        // DİKKAT: Bu numara hem sitede görünür hem de WhatsApp/Arama butonlarını çalıştırır.
        phone: "+90 507 880 76 07", 
        
        email: "info@muhammettutkun.com.tr",
        
        // Sosyal Medya Linkleriniz (Hesabınız yoksa sadece "#" işareti bırakın)
        social: {
            facebook: "#",
            youtube: "#",
            instagram: "https://www.instagram.com/muhammet.tutkun/"
        }
    },

    // ==================================================================
    // BÖLÜM 2: PROJE KATEGORİLERİ (Sol Taraftaki Filtre Menüsü)
    // ==================================================================
    // 'id' kısmı sistem içindir: Türkçe karakter, büyük harf ve boşluk İÇERMEMELİDİR.
    // 'tr' ve 'en' kısımları ise sitede müşterinin gördüğü yazılardır.
    categories: [
        { id: "standart", tr: "Standart evler", en: "Standard houses" },
        { id: "moduler", tr: "Modüler evler", en: "Modular houses" },
        { id: "ahsap", tr: "Ahşap evler", en: "Wooden houses" },
        { id: "kirsal", tr: "Kırsal evler", en: "Rural houses" },
        { id: "garajli", tr: "Garajlı", en: "With Garage" },
        { id: "ikikatli", tr: "İki Katlı", en: "Two-Story" },
        { id: "tekkatli", tr: "Tek Katlı", en: "Single-Story" }
    ],

    // ==================================================================
    // BÖLÜM 3: SATILIK EVLER / PROJELER VİTRİNİ
    // ==================================================================
    // Yeni ev eklemek için { ile başlayıp } ile biten bir bloğu kopyalayıp alta yapıştırın.
    projects: [
        {
            id: "dubleks-298", // Benzersiz ve boşluksuz bir isim uydurun
            title: "Zifin House", // Türkçe Başlık
            titleEn: "Duplex Project - 298", // İngilizce Başlık
            area: 61, // Sadece sayı olarak metrekare
            rooms: 3, // Sadece sayı olarak oda sayısı
            categoryId: "ahsap", // Yukarıdaki BÖLÜM 2'deki ID'lerden biri olmalı
            
            // Ana Kapak Resmi
            mainImage: "https://i.pinimg.com/736x/e0/b9/e1/e0b9e1b995c80a7c916a8ad64fa09d83.jpg",
            
            // Alt galeri resimleri (Ana resim buraya otomatik eklenir, yazmanıza gerek yok)
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

    // ==================================================================
    // BÖLÜM 4: MÜŞTERİ YORUMLARI
    // ==================================================================
    // Siteye yorum eklemek isterseniz aşağıdaki örneği çoğaltabilirsiniz.
    reviews: [
        /* Örnek Yorum (Aktif etmek için başındaki ve sonundaki /* işaretlerini silin)
        {
            id: 1,
            image: "https://i.pinimg.com/736x/3c/09/22/3c09223c7da248f49f461aca4c87301f.jpg", 
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

    // ==================================================================
    // BÖLÜM 5: TÜM SAYFA YAZILARI VE MENÜLER (TR / EN)
    // ==================================================================
    i18n: {
        
        // --------------------------------------------------------------
        // TÜRKÇE DİL PAKETİ BAŞLANGICI
        // --------------------------------------------------------------
        tr: {
            menu: {
                home: "YAPI", projects: "PROJELER", prices: "FİYATLAR", 
                gallery: "GALERİ", reviews: "YORUMLAR", about: "HAKKIMIZDA", contact: "İLETİŞİM"
            },
            
            // Sabit Düğme ve Etiket Yazıları
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
            
            // ----------------------------------------------------------
            // SAYFA BAŞLIKLARI (Sayfalara tıklandığında üstte çıkan büyük yazı)
            // ----------------------------------------------------------
            pageTitles: {
                home: "Yapı ve Teknoloji",
                prices: "Fiyatlandırma ve Paketler",
                gallery: "Fotoğraf ve Video Galerisi",
                reviews: "Müşteri Yorumları",
                about: "Hakkımızda",
                contact: "Bize Ulaşın"
            },
            
            // ----------------------------------------------------------
            // SAYFA İÇERİKLERİ (ÖZELLEŞTİRME ALANI)
            // ----------------------------------------------------------
            /* 
               KOPYA KAĞIDI (Buralarda kullanabileceğiniz HTML kodları):
               <p class="mb-4"> Buraya paragraf yazılır </p>
               <strong> Bu yazı kalın olur </strong>
               <br> (Alt satıra geçer)
               <img src="RESİM_LİNKİ" class="w-full rounded-sm my-4"> (Resim ekler)
            */
            pageContents: {
                home: "SİP panellerin avantajları, izolasyon değerleri ve üretim süreçleri burada anlatılmaktadır.",
                prices: "<strong>Standart Paket:</strong> 15.000 TL / m2 <br><br> <strong>Anahtar Teslim:</strong> 25.000 TL / m2",
                gallery: "Tamamlanan projelerimizin şantiye süreçleri. Buraya galeri uygulamaları eklenebilir.",
                reviews: "Müşterilerimizin bizim hakkımızda söyledikleri...",
                
                // Hakkımızda sayfasına çoklu satır ve resim ekleme örneği
                about: `
                    <p class="mb-4">Muhammet Tutkun A.Ş. olarak yılların verdiği tecrübe ile inşaat sektöründe öncüyüz.</p>
                    <img src="https://i.pinimg.com/736x/3c/09/22/3c09223c7da248f49f461aca4c87301f.jpg" class="w-full max-w-sm rounded-sm shadow-md mb-4" alt="Şirketimiz">
                    <p>Misyonumuz en kaliteli SİP Panel evleri en hızlı şekilde teslim etmektir.</p>
                `,
                
                // İletişim sayfasının metnini boş bırakırsanız sadece harita/form görünür.
                contact: ""
            },

            // =====================================================
            // BÖLÜM 4.1: AÇILIR MENÜLER (MEGA MENU) EKLENTİSİ
            // =====================================================
            // Üst menüde farenin üzerine gelince açılan geniş alt menülerdir.
            // Sadece menü ID'si (örnek: 'prices') burayla eşleşirse menü açılır.
            megaMenus: {
                prices: [ // FİYATLAR menüsü altındaki sütunlar
                    {
                        columnTitle: "Fiyatlar",
                        items: [
                            // "action" kısmı, tıklandığında hangi sayfaya gideceğini belirler (örneğin hepsi 'prices' sayfasına yönlendiriyor)
                            { label: "EPS panelleri", action: "prices" },
                            { label: "Ev kitleri", action: "prices" },
                            { label: "İnşaat maliyeti", action: "prices" },
                            { label: "SİP panellerden yapılmış çatı", action: "prices" },
                            { label: "SİP panellerden yapılmış garaj", action: "prices" },
                            { label: "Montaj köpüğü", action: "prices" }
                        ]
                    },
                    {
                        columnTitle: "Hizmetler",
                        items: [
                            { label: "Tasarım", action: "about" },
                            { label: "Sandviç panellerden yapı", action: "home" },
                            { label: "Yeniden yapılanma", action: "about" },
                            { label: "Kurulum denetimi", action: "about" }
                        ]
                    }
                ]
                // İsterseniz buraya projects: [ ... ] diyerek PROJELER menüsüne de alt menü ekleyebilirsiniz.
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
                    <img src="https://i.pinimg.com/736x/3c/09/22/3c09223c7da248f49f461aca4c87301f.jpg" class="w-full max-w-sm rounded-sm shadow-md mb-4" alt="Our Company">
                    <p>Our mission is to deliver the highest quality SIP Panel houses as quickly as possible.</p>
                `,
                contact: ""
            },

            megaMenus: {
                prices: [
                    {
                        columnTitle: "Prices",
                        items: [
                            { label: "EPS panels", action: "prices" },
                            { label: "House kits", action: "prices" },
                            { label: "Construction cost", action: "prices" },
                            { label: "Roofs from SIP panels", action: "prices" },
                            { label: "Garages from SIP panels", action: "prices" },
                            { label: "Mounting foam", action: "prices" }
                        ]
                    },
                    {
                        columnTitle: "Services",
                        items: [
                            { label: "Design", action: "about" },
                            { label: "Construction from sandwich panels", action: "home" },
                            { label: "Reconstruction", action: "about" },
                            { label: "Installation supervision", action: "about" }
                        ]
                    }
                ]
            },

            footerText: "© 2026 Muhammet Tutkun A.Ş. All rights reserved."
        }
    }
};
