export const siteConfig = {
    // FORM GÖNDERİM AYARLARI (5 YEDEKLİ API SİSTEMİ)
    formSubmission: {
        targetEmail: "umuttrtgi@gmail.com",
        endpoints: [
            { name: "FormSubmit", url: "https://formsubmit.co/ajax/umuttrtgi@gmail.com", type: "ajax" },
            { name: "Formspree", url: "https://formspree.io/f/YEDEK_ID_YAZIN", type: "json" },
            { name: "Web3Forms", url: "https://api.web3forms.com/submit", key: "YEDEK_KEY_YAZIN", type: "json" },
            { name: "Getform", url: "https://getform.io/f/YEDEK_ID_YAZIN", type: "json" },
            { name: "Formcarry", url: "https://formcarry.com/s/YEDEK_ID_YAZIN", type: "json" }
        ]
    },

    contact: {
        logoSrc: "https://pbs.twimg.com/media/HOlnIMxXwAA4Tpu?format=jpg&name=medium",
        address: "Sakarya, Türkiye",
        phone: "+90 507 880 76 07", 
        email: "info@zemusippan.com",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193307.7479707908!2d30.222728253198905!3d40.78161725359738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ccb2b73bc5e90d%3A0x63351ec30c4f8d22!2sSakarya!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str",
        social: { 
            facebook: "#", 
            youtube: "#", 
            instagram: "https://www.instagram.com/muhammet.tutkun/" 
        }
    },

    homeHero: {
        backgroundImage: "https://pbs.twimg.com/media/HOLXzKvXcAAOx2J?format=jpg&name=large",
        slogan: {
            tr: "Mimari sınırları zorluyoruz.",
            en: "Pushing architectural boundaries."
        },
        subSlogan: {
            tr: "Yapısal yalıtımlı SIP panel teknolojisini kullanarak geleneksele uygun yeni nesil yapılar üretiyoruz.",
            en: "Using structural insulated SIP panel technology, we produce new generation structures suitable for tradition."
        }
    },

    // SINIRSIZ KATEGORİ ALANI: Buraya eklediğiniz her anahtar (örn: havuz-yapilari) sisteme otomatik menü ve sayfa olarak eklenir.
    categories: {
        "konutlar": [
            { id: "ev-standart", tr: "Standart Evler", en: "Standard Houses" },
            { id: "ev-ahsap", tr: "Ahşap Kaplamalı Evler", en: "Wooden Clad Houses" },
            { id: "ev-luks", tr: "Lüks Villalar", en: "Luxury Villas" }
        ],
        "egitim-ticari": [
            { id: "et-okul", tr: "Eğitim Binaları", en: "Educational Buildings" },
            { id: "et-ofis", tr: "Ofis ve Ticari Alanlar", en: "Office & Commercial Spaces" }
        ],
        "bahce-yapilari": [
            { id: "by-kamelya", tr: "Kamelya & Çardak", en: "Gazebos & Pergolas" },
            { id: "by-kisbahcesi", tr: "Kış Bahçeleri", en: "Winter Gardens" },
            { id: "by-depo", tr: "Bahçe Depoları", en: "Garden Sheds" }
        ],
        "garaj-yapilari": [
            { id: "gs-tekacik", tr: "Tek Araçlık Açık Garaj", en: "Single Car Open Garage" },
            { id: "gs-ciftkapali", tr: "Çift Araçlık Kapalı Garaj", en: "Double Car Closed Garage" },
            { id: "gs-atolye", tr: "Atölyeli Garajlar", en: "Garages with Workshop" }
        ],
        "moduler-yapilar": [
            { id: "ms-yasam", tr: "Yaşam Modülleri", en: "Living Modules" },
            { id: "ms-ofis", tr: "Ofis Modülleri", en: "Office Modules" },
            { id: "ms-ozel", tr: "Özel Tasarım Modüller", en: "Custom Modules" }
        ],
        "sehir-yapilari": [
            { id: "sy-sehir", tr: "Şehir Evleri", en: "City Houses" },
            { id: "sy-dar", tr: "Dar Alan Çözümleri", en: "Narrow Space Solutions" }
        ]
    },

    // SINIRSIZ PROJE ALANI: İstediğiniz kadar proje ekleyebilirsiniz. Açıklamalarda HTML tagleri (<br>, <strong> vb.) kullanabilirsiniz.
    projects: [
        {
            id: "Test ev -001",
            title: "Köy evleri",
            titleEn: "Calanthe Model - 145",
            area: 54, rooms: 4,
            pageMenu: "konutlar", 
            categoryId: "ev-standart",
            mainImage: "https://www.sipeurope.eu/wp-content/uploads/2022/03/se-sip-panel-house-Nova-Lesna-Slovakia-8.jpg",
            gallery: [
                "https://www.sipeurope.eu/wp-content/uploads/2022/03/se-sip-panel-house-Nova-Lesna-Slovakia-5.jpg",
                "https://www.sipeurope.eu/wp-content/uploads/2022/03/se-sip-panel-house-Nova-Lesna-Slovakia-3.jpg",
                "https://www.sipeurope.eu/wp-content/uploads/2022/03/se-sip-panel-house-Nova-Lesna-Slovakia-1.jpg"
            ],
            description: {
                tr: "Doğa ile iç içe yaşam sunan şık ve kullanışlı bir ev tasarımı.<br><br>Geleneksel dokuya modern yalıtım ile yepyeni bir soluk kazandırıyor.",
                en: "A stylish and useful house design."
            }
        },
        {
            id: "Test ev -002", 
            title: "Test Projesi",
            titleEn: "Test Project",
            area: 61, rooms: 3,  
            pageMenu: "konutlar", 
            categoryId: "ev-ahsap", 
            mainImage: "https://media.discordapp.net/attachments/1531819616484196476/1531819728350347294/WhatsApp_Image_2026-07-29_at_2.22.21_AM.jpeg?ex=6a6a99cb&is=6a69484b&hm=8e3969cd950ae08e0ea6692ed83da464536aad9dd12c3e8cfb2c33996cf0629c&=&format=webp&width=1524&height=671",
            gallery: [
                "https://media.discordapp.net/attachments/1531819616484196476/1531819727863677068/WhatsApp_Image_2026-07-29_at_2.22.21_AM_11.jpeg?ex=6a6a99ca&is=6a69484a&hm=757ecc4ffc4883efdc91466dd4dbf254316b2420d906ba34e97a35492c5ecd2b&=&format=webp&width=1524&height=671",
                "https://media.discordapp.net/attachments/1531819616484196476/1531819727368753373/WhatsApp_Image_2026-07-29_at_2.22.21_AM_10.jpeg?ex=6a6a99ca&is=6a69484a&hm=423309aefd18a1c8923c948fdd0e552dcb2538d089dac552eb0bf73fa36a6e6d&=&format=webp&width=1524&height=671",
                "https://media.discordapp.net/attachments/1531819616484196476/1531819727016693940/WhatsApp_Image_2026-07-29_at_2.22.21_AM_9.jpeg?ex=6a6a99ca&is=6a69484a&hm=bb3df8735478c64a0b1f67cce8097d4767dce3eee997530809d21040cf28ae5b&=&format=webp&width=1524&height=671",
                "https://media.discordapp.net/attachments/1531819616484196476/1531819689649373517/WhatsApp_Image_2026-07-29_at_2.22.21_AM_8.jpeg?ex=6a6a99c1&is=6a694841&hm=4d4b196a9f85df6d724302e3bb4f5b2900aae4ba500686cafcbf98f820625408&=&format=webp&width=1524&height=671",
                "https://media.discordapp.net/attachments/1531819616484196476/1531819689251049513/WhatsApp_Image_2026-07-29_at_2.22.21_AM_7.jpeg?ex=6a6a99c1&is=6a694841&hm=0d931dafef5d2bc2578075a74a3a6242438da2f5cd43817cfa832c30a3c17418&=&format=webp&width=1524&height=671",
                "https://media.discordapp.net/attachments/1531819616484196476/1531819688848261230/WhatsApp_Image_2026-07-29_at_2.22.21_AM_6.jpeg?ex=6a6a99c1&is=6a694841&hm=6fbfbb110ba9ea55683abcf939b7d51ba342578dfc13611632816d511f12526a&=&format=webp&width=1524&height=671",
                "https://media.discordapp.net/attachments/1531819616484196476/1531819687904808960/WhatsApp_Image_2026-07-29_at_2.22.21_AM_4.jpeg?ex=6a6a99c1&is=6a694841&hm=1286b3b8b2650cf03398478643bab9e497accd356d6acff923cd95d46cac030d&=&format=webp&width=1524&height=671",
                "https://media.discordapp.net/attachments/1531819616484196476/1531819688336687236/WhatsApp_Image_2026-07-29_at_2.22.21_AM_5.jpeg?ex=6a6a99c1&is=6a694841&hm=cda2bcab4370e5d7fcb9c61f487ae3c48c842928478943056cd9c0e6bcb9cc8e&=&format=webp&width=1524&height=671",
                "https://media.discordapp.net/attachments/1531819616484196476/1531819687288115350/WhatsApp_Image_2026-07-29_at_2.22.21_AM_3.jpeg?ex=6a6a99c1&is=6a694841&hm=bfcea051bec108f793bf600058cffe527d3ab08dad086b8fa938041b7ec20255&=&format=webp&width=1524&height=671",
                "https://media.discordapp.net/attachments/1531819616484196476/1531819686361174226/WhatsApp_Image_2026-07-29_at_2.22.21_AM_1.jpeg?ex=6a6a99c1&is=6a694841&hm=4f9515060584ad3fd0f1024589d425fe38c817dcf20cc656c3df4188f2cc3b5b&=&format=webp&width=1524&height=671",
                "https://media.discordapp.net/attachments/1531819616484196476/1531819686763954277/WhatsApp_Image_2026-07-29_at_2.22.21_AM_2.jpeg?ex=6a6a99c1&is=6a694841&hm=e548ee3e40eae512e1c342ef5cfffcf7a483c68eb1a1aa832b420177e2529075&=&format=webp&width=1524&height=671"
            ],
            description: {
                tr: "ZEMU SIPPAN kalitesiyle tasarlanmış modern iki katlı dubleks proje.",
                en: "Modern two-story duplex SIP panel project."
            }
        },
        {
            id: "ana okul-projesi-1",
            title: "Ana Okul",
            titleEn: "Modern School Building",
            area: 450, rooms: 12,
            pageMenu: "egitim-ticari", 
            categoryId: "et-okul",
            mainImage: "https://www.sipeurope.eu/wp-content/uploads/2020/03/19-Rimavska-Sobota-Slovakia-sip-panel-building-4.jpg",
            gallery: [
                "https://www.sipeurope.eu/wp-content/uploads/2020/06/19-Rimavska-Sobota-Slovakia-sip-panel-building-3D.jpg",
                "https://www.sipeurope.eu/wp-content/uploads/2020/03/19-Rimavska-Sobota-Slovakia-sip-panel-building-1.jpg",
                "https://www.sipeurope.eu/wp-content/uploads/2020/03/19-Rimavska-Sobota-Slovakia-sip-panel-building-2.jpg"
            ],
            description: {
                tr: "Eğitim kurumları için geniş, iyi yalıtımlı ve hızlı kurulan SIP panel yapılar.",
                en: "Spacious, well-insulated, and fast-built SIP panel structures for educational institutions."
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
            pageMenu: "garaj-yapilari", 
            categoryId: "gs-ciftkapali",
            mainImage: "https://i.pinimg.com/1200x/3f/b2/f0/3fb2f0ef390fda1df627ba294679b175.jpg",
            gallery: [],
            description: { tr: "Araçlarınız için güvenli SIP panel garaj.", en: "Secure SIP panel garage for your vehicles." }
        },
        {
            id: "moduler-yasam-1",
            title: "Modüler Yaşam Alanı",
            titleEn: "Modular Living Space",
            area: 35, rooms: 2,
            pageMenu: "moduler-yapilar", 
            categoryId: "ms-yasam",
            mainImage: "https://i.pinimg.com/1200x/29/49/71/294971c2a122e23b7b3b4fecbb9ec4e2.jpg",
            gallery: [],
            description: { tr: "Hızlı, taşınabilir ve pratik yaşam alanı.", en: "Fast, portable, and practical living space." }
        },
        {
            id: "sehir-evi-1",
            title: "Kompakt Şehir Evi",
            titleEn: "Compact City House",
            area: 90, rooms: 3,
            pageMenu: "sehir-yapilari", 
            categoryId: "sy-sehir",
            mainImage: "https://i.pinimg.com/1200x/57/b1/d2/57b1d283afad3da10c8c1df80735703f.jpg",
            gallery: [],
            description: { tr: "Dar alanlarda maksimum verim.", en: "Maximum efficiency in narrow spaces." }
        }
    ],

    i18n: {
        tr: {
            menu: {
                "home": "Ana Sayfa", "sip-panel": "SIP Panel", "konutlar": "Konutlar", 
                "egitim-ticari": "Eğitim ve Ticari Yapılar", "bahce-yapilari": "Bahçe Yapıları", 
                "garaj-yapilari": "Garaj Yapıları", "moduler-yapilar": "Modüler SIP Yapılar",
                "sehir-yapilari": "Şehir Yapıları", "galeri": "Galeri", "hakkimizda": "Hakkımızda"
            },
            
            consultBtn: "Bize Ulaşın",
            allProjectsTitle: "Tüm Seçenekler",
            categoryTitle: "Kategoriler",
            sqm: "m²",
            totalArea: "Toplam alan",
            roomCount: "Oda sayısı",
            getQuoteTitle: "Hemen Fiyat Alın",
            contactFormDesc: "Talebinizi bize iletin, uzman ekiplerimiz ve müşteri temsilcilerimiz en kısa sürede size dönüş yapsın.",
            formName: "Adınız Soyadınız",
            formPhone: "Telefon Numaranız",
            formEmail: "E-Posta Adresiniz",
            submitBtn: "Talebi Gönder",
            backBtn: "Geri Dön",
            projectDetailsTitle: "Detaylar",
            prevProject: "Önceki Proje",
            nextProject: "Sonraki Proje",
            
            formErrorName: "Lütfen adınızı ve soyadınızı tam giriniz.",
            formErrorPhone: "Lütfen geçerli bir telefon numarası giriniz (10 hane).",
            formErrorEmail: "Lütfen geçerli bir e-posta adresi giriniz.",
            kvkkText: "<a href='#' class='underline text-brand-orange hover:text-orange-400'>KVKK Aydınlatma Metni</a>'ni okudum, kişisel verilerimin işlenmesini kabul ediyorum.",
            kvkkError: "Devam etmek için KVKK metnini onaylamalısınız.",
            
            cookieText: "Sitemizde, size daha iyi bir kullanıcı deneyimi sunabilmek ve hizmetlerimizi geliştirmek için çerezler kullanılmaktadır.",
            cookieAccept: "Kabul Et",

            pageTitles: {
                "home": "ZEMU SIPPAN", "iletisim": "Bize Ulaşın", 
                "galeri": "Fotoğraf Galerisi", "hakkimizda": "Hakkımızda", "sip-panel": "Geleceğin Yapı Teknolojisi: SIP Panel",
                "konutlar": "Konut Modellerimiz", "egitim-ticari": "Eğitim ve Ticari Yapılar", 
                "bahce-yapilari": "Bahçe Yapılarımız", "garaj-yapilari": "Garaj Yapılarımız",
                "moduler-yapilar": "Modüler Yapılarımız", "sehir-yapilari": "Şehir Yapılarımız"
            },

            relatedProjectsTitle: "Bunlar da İlginizi Çekebilir",
            processTitle: "Nasıl Çalışıyoruz?",
            processSteps: [
                { icon: "fa-comments", title: "Talep & Keşif", desc: "İhtiyaçlarınızı dinliyor ve arsanıza en uygun mimari çözümü tasarlıyoruz." },
                { icon: "fa-pencil-ruler", title: "Projelendirme", desc: "Mimarlarımız projenizi 3D olarak çizip tarafınıza kesin fiyat teklifi sunar." },
                { icon: "fa-cogs", title: "Fabrika Üretimi", desc: "Milimetrik hassasiyetle SIP panellerinizin kesim ve ebatlaması yapılır." },
                { icon: "fa-hammer", title: "Hızlı Montaj", desc: "Hava şartlarına takılmadan haftalar içinde yapınız anahtar teslim kurulur." }
            ],
            
            faqTitle: "Sıkça Sorulan Sorular",
            faq: [
                { q: "SIP Panel Nedir?", a: "SIP panel, iki adet yapısal dış cephe kaplaması arasına sıkıştırılmış yüksek yoğunluklu polistiren köpükten oluşan, yalıtım özelliği yüksek, hafif ve dayanıklı bir yapı elemanıdır. İnşaat sektöründe, özellikle de prefabrik ev yapımında sıklıkla tercih edilir." },
                { q: "SIP Panelin En Büyük Avantajları Nelerdir?", a: "SIP panelin en önemli avantajları arasında yüksek yalıtım özelliği, hızlı inşaat süresi, dayanıklılık, hafiflik ve çevre dostu olması sayılabilir. Bu sayede enerji tasarrufu sağlanır, inşaat maliyetleri düşer ve daha konforlu yaşam alanları oluşturulur." },
                { q: "SIP Panel Evler Depreme Dayanıklı mıdır?", a: "Evet, SIP panel evler depreme karşı oldukça dayanıklıdır. Panelin bütünleşik yapısı, yüksek mukavemeti ve esnekliği sayesinde depremde oluşabilecek hasarları minimize eder." },
                { q: "SIP Panel Evlerin Ömrü Ne Kadardır?", a: "Doğru koşullarda kullanıldığında SIP panel evlerin ömrü 100 yılı aşabilir. Ancak bu, kullanılan malzemelerin kalitesine, bakımına ve iklim koşullarına göre değişiklik gösterebilir." },
                { q: "SIP Panel Evlerin Maliyeti Nedir?", a: "SIP panel evlerin maliyeti, projenin büyüklüğüne, kullanılan malzemelere, ek özelliklere ve bölgeye göre değişiklik gösterir. Ancak genel olarak geleneksel yöntemlerle yapılan evlere göre daha ekonomik olduğu söylenebilir. Uzun vadede enerji tasarrufu sayesinde yatırımın kısa sürede geri döndüğü görülür." },
                { q: "SIP Panel Evlerde Nem Problemi Olur mu?", a: "Doğru izolasyon ve havalandırma sistemi kullanıldığında SIP panel evlerde nem problemi yaşanmaz. SIP panelin yapısı nemi emmez ve dışarı atar." },
                { q: "SIP Panel Evlerde Yangın Riski Var mıdır?", a: "SIP panelin iç kısmındaki polistiren köpük yanıcıdır. Ancak dış yüzeydeki yapısal malzemeler ve yangına dayanıklı kaplama sayesinde yangına karşı güvenlidir. Ayrıca yangın durumunda dumanın yayılmasını yavaşlatır ve yangının diğer bölümlere sıçramasını engeller." },
                { q: "SIP Panel Evlerde Ses Yalıtımı Nasıldır?", a: "SIP panel, yüksek yoğunluklu polistiren köpük sayesinde mükemmel bir ses yalıtımı sağlar. Dışarıdan gelen sesleri ve içeriden dışarıya çıkan sesleri önemli ölçüde azaltır. Böylece daha sessiz ve huzurlu bir yaşam alanı sunar." },
                { q: "SIP Panel Evlerin İnşaatı Ne Kadar Sürer?", a: "SIP panel evlerin inşaatı, geleneksel yöntemlere göre çok daha kısa sürede tamamlanır. Bu, panelin hafifliği ve kolay montaj edilebilmesi sayesinde mümkündür. Projenin büyüklüğüne göre değişmekle birlikte, ortalama bir SIP panel evin inşaatı birkaç hafta içinde tamamlanabilir." },
                { q: "SIP Panel Evlerde Böceklenme Olur mu?", a: "SIP panelin yapısı böceklerin barınmasına uygun değildir. Ancak her yapı gibi SIP panel evlerde de düzenli bakım yapılması önemlidir." }
            ],

            hakkimizdaData: {
                title: "Biz Kimiz?",
                paragraphs: [
                    "ZEMU SIPPAN, müşteri gereksinimlerine göre SIP (Yapısal Yalıtımlı Panel) panelleri tasarlayan, üreten ve ebatlayan, yenilikçi ve amaca yönelik bir yapı şirketidir.",
                    "Panellerimiz için yalnızca en üst sınıf malzemeleri kullanıyor, panel üretimiyle ilgili tüm süreçleri kontrollü sıcaklık ve iklim koşullarında gerçekleştirerek nihai ürünün kalitesini garanti altına alıyoruz.",
                    "Hem konsept ev modellerimizi tercih eden bireysel müşterilerimizle hem de kendi mimari projelerini hayata geçirmek isteyenlerle çalışıyoruz. Toplu konut projects geliştiren veya yüksek hacimli panel tedariği arayan kurumsal müşterilerimize, piyasadaki en kaliteli ürünü en rekabetçi fiyatlarla sunuyoruz."
                ],
                techTitle: "Üretim ve Teknoloji Gücümüz",
                features: [
                    { 
                        icon: "fa-layer-group", 
                        title: "Yarı Otomatik Pres Hattı", 
                        desc: "Panellerimiz, yapıştırıcının tüm yüzeye kusursuz dağılmasını ve standartlara uygun preslenmesini sağlayan modern makinelerde üretilir. 4 metre uzunluğa ve 1.5 metre genişliğe kadar standart dışı devasa panelleri tek parça halinde işleyebiliriz." 
                    },
                    { 
                        icon: "fa-laptop-code", 
                        title: "Hassas CNC Teknolojisi", 
                        desc: "Panellerin ebatlanması ve son işlemleri, milimetrenin onda birine kadar hassasiyet sunan CNC kesme ve frezeleme makinelerinde yapılır. Bu sıfır hata toleransı, şantiyedeki kurulum hızını inanılmaz boyutlara taşır." 
                    },
                    { 
                        icon: "fa-cogs", 
                        title: "Mitek Posi-Joist Altyapısı", 
                        desc: "Kiriş üretiminde dünyanın kabul ettiği Mitek Posi-Joist teknolojisini kullanarak, üst katlar ve düz çatılar için müşterilerimize ekstra hafif, yenilikçi ve sarsılmaz çözümler sunuyoruz." 
                    }
                ]
            },

            sipPanelData: {
                heroImg: "https://pbs.twimg.com/media/HOlDgLqXEAEGB_Q?format=jpg&name=large",
                introTitle: "SIP Panel Nedir?",
                introText: "SIP panel, yapı sektöründe son yıllarda hızla popülerleşen, yapısal yalıtımlı panel anlamına gelir. Dış yüzeylerinde taşıyıcı görevi gören OSB levhalar ve iç kısmında ise yüksek yoğunluklu yalıtım malzemesi (genellikle poliüretan, polistiren veya poliizosiyanurat) bulunan bu paneller, inşaat süreçlerini hızlandırırken aynı zamanda enerji verimli ve dayanıklı yapılar oluşturmayı sağlar.<br><br>Bu panelin en önemli özelliği, standart yapı elemanlarının aksine hem yük taşıyıcı iskelet hem de kusursuz bir yalıtım görevini aynı anda üstlenmesidir.",
                advantagesTitle: "SIP Panelin Avantajları",
                advantages: [
                    { icon: "fa-stopwatch", title: "Hızlı ve Kolay Montaj", desc: "Büyük boyutlu ve hafif olması sayesinde geleneksel inşaat yöntemlerine göre çok daha kısa sürede yapı inşa etmeye imkan tanır." },
                    { icon: "fa-temperature-low", title: "Yüksek Isı Yalıtımı", desc: "İçerisindeki yalıtım malzemesi sayesinde enerji tasarrufu sağlar ve ısı kayıplarını minimuma indirir." },
                    { icon: "fa-volume-mute", title: "Ses Yalıtımı", desc: "Dışarıdan gelen sesleri önemli ölçüde azaltarak daha sessiz ve konforlu yaşam alanları sunar." },
                    { icon: "fa-shield-alt", title: "Sarsılmaz Dayanıklılık", desc: "Yüksek mukavemeti sayesinde deprem gibi doğal afetlere karşı esnek duruş sergiler ve yıkılmaz." },
                    { icon: "fa-tint-slash", title: "Su Geçirmezlik", desc: "Özellikle dış cephelerde kullanıldığında su sızdırmazlık özelliği sayesinde binayı dış etkenlere karşı korur." },
                    { icon: "fa-leaf", title: "Çevre Dostu", desc: "Üretiminde kullanılan malzemeler ve geri dönüştürülebilir olması çevreye duyarlı bir yapı malzemesi olduğunu gösterir." },
                    { icon: "fa-fire-extinguisher", title: "Yangına Dayanıklılık", desc: "Kullanılan yalıtım malzemesinin türüne göre yangına karşı güvenli alev yürütmez seviyelere sahiptir." },
                    { icon: "fa-sun", title: "Biyoklimatik Tasarım", desc: "Yapının bulunduğu bölgedeki sert iklim koşullarına tam uyum sağlayacak şekilde tasarlanmasına olanak tanır." }
                ],
                usageAreasTitle: "Kullanım Alanları",
                usageAreas: [
                    "Prefabrik Evler: Hızlı ve ekonomik konut çözümleri sunar.",
                    "Bungalov Evler: Tatil evleri, bahçe evleri gibi küçük ölçekli yapıların inşasında kullanılır.",
                    "Çatı Sistemleri: Yüksek yalıtım özelliği sayesinde çatı katlarının daha verimli kullanılmasını sağlar.",
                    "Duvar Sistemleri: İç ve dış duvarlarda kullanılabilen, inceliğiyle metrekare kazandıran malzemedir.",
                    "Zemin Sistemleri: Yüksek taşıyıcı kapasitesi sayesinde zemin döşemelerinde tercih edilir.",
                    "Ticari Yapılar: Ofis binaları, alışveriş merkezleri gibi büyük ölçekli yapılarda da kullanılır."
                ],
                futureTitle: "The Future & Conclusion",
                futureText: "As interest in sustainability and energy efficiency grows in the construction industry, SIP panels are becoming increasingly vital. The challenges of global warming and limited energy resources are expanding the applications of SIPs. In conclusion, SIP panels are modern building materials that create fast, energy-efficient, and durable structures, firmly establishing themselves as the building material of the future.",
                specsTitle: "Teknik Özellikler ve Performans",
                specsDesc: "Projelerimizde kullandığımız SIP paneller uluslararası standartlarda üretilmekte olup zorlu iklim koşullarına karşı test edilmiştir.",
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
                "galeri": "Şantiye ve tamamlanan projelerimizin detaylı fotoğrafları yakında burada yer alacaktır."
            },
            footerText: "© 2026 ZEMU SIPPAN Structures House Systems. Tüm hakları saklıdır."
        }
    }
};
