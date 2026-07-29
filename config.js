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
        logoSrc: "https://media.discordapp.net/attachments/1531819616484196476/1532128007828013146/Adsz_tasarm__1_-removebg-preview.png?ex=6a6bb8e6&is=6a6a6766&hm=4afada63f997124315fa425ac4815986625fb9bfe0e5d772c24df9c545a3502f&=&format=webp&quality=lossless&width=942&height=335",
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
            tr: "Lüks ve Minimalizmin Birleşimi",
            en: "Fusion of Luxury and Minimalism"
        },
        subSlogan: {
            tr: "SIP Panel teknolojisiyle hayalinizdeki yapıya hızla kavuşun.",
            en: "Reach your dream structure quickly with SIP Panel technology."
        }
    },

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
        ]
    },

    projects: [
                {
            id: "Test ev -001",
            title: "Köy evleri",
            titleEn: "Calanthe Model - 145",
            area: 54, rooms: 4,
            pageMenu: "konutlar", 
            categoryId: "ev-standart",
            mainImage: "https://www.sipeurope.eu/wp-content/uploads/2022/03/se-sip-panel-house-Nova-Lesna-Slovakia-8.jpg",
            gallery: ["https://www.sipeurope.eu/wp-content/uploads/2022/03/se-sip-panel-house-Nova-Lesna-Slovakia-5.jpg",
                      "https://www.sipeurope.eu/wp-content/uploads/2022/03/se-sip-panel-house-Nova-Lesna-Slovakia-3.jpg",
                      "https://www.sipeurope.eu/wp-content/uploads/2022/03/se-sip-panel-house-Nova-Lesna-Slovakia-1.jpg",
                     ],
            description: {
                tr: "Doğa ile iç içe yaşam sunan şık ve kullanışlı bir ev tasarımı.",
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
            id: "Test ev -001",
            title: "Köy evleri",
            titleEn: "Calanthe Model - 145",
            area: 54, rooms: 4,
            pageMenu: "konutlar", 
            categoryId: "ev-standart",
            mainImage: "https://www.sipeurope.eu/wp-content/uploads/2022/03/se-sip-panel-house-Nova-Lesna-Slovakia-8.jpg",
            gallery: ["https://www.sipeurope.eu/wp-content/uploads/2022/03/se-sip-panel-house-Nova-Lesna-Slovakia-5.jpg",
                      "https://www.sipeurope.eu/wp-content/uploads/2022/03/se-sip-panel-house-Nova-Lesna-Slovakia-3.jpg",
                      "https://www.sipeurope.eu/wp-content/uploads/2022/03/se-sip-panel-house-Nova-Lesna-Slovakia-1.jpg",
                     ],
            description: {
                tr: "Doğa ile iç içe yaşam sunan şık ve kullanışlı bir ev tasarımı.",
                en: "A stylish and useful house design."
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
            gallery: ["https://www.sipeurope.eu/wp-content/uploads/2020/06/19-Rimavska-Sobota-Slovakia-sip-panel-building-3D.jpg",
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
        }
    ],

    i18n: {
        tr: {
            menu: {
                "home": "Ana Sayfa", "sip-panel": "SIP Panel", "konutlar": "Konutlar", 
                "egitim-ticari": "Eğitim ve Ticari Yapılar", "bahce-yapilari": "Bahçe Yapıları", 
                "garaj-yapilari": "Garaj Yapıları", "galeri": "Galeri", "hakkimizda": "Hakkımızda"
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
                "bahce-yapilari": "Bahçe Yapılarımız", "garaj-yapilari": "Garaj Yapılarımız"
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
                    "Hem konsept ev modellerimizi tercih eden bireysel müşterilerimizle hem de kendi mimari projelerini hayata geçirmek isteyenlerle çalışıyoruz. Toplu konut projeleri geliştiren veya yüksek hacimli panel tedariği arayan kurumsal müşterilerimize, piyasadaki en kaliteli ürünü en rekabetçi fiyatlarla sunuyoruz."
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
                heroImg: "https://vividgreen.co.uk/wp-content/uploads/2024/04/IMG_5283-scaled-1280x750-2-1024x600.jpg",
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
                futureTitle: "SIP Panelin Geleceği",
                futureText: "SIP paneller, inşaat sektöründe sürdürülebilirlik ve enerji verimliliği konularına olan ilginin artmasıyla birlikte daha da önem kazanmaktadır. Özellikle küresel ısınma ve enerji kaynaklarının daralması, SIP panellerin sağladığı izolasyon devrimini zorunlu kılmaktadır. Sonuç olarak; SIP panel, hızlı, çevreci ve dayanıklı yapılar oluşturmak için geleceğin rakipsiz yapı malzemesi olarak görülmektedir.",
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
        },
        en: {
            menu: {
                "home": "Home", "sip-panel": "SIP Panel", "konutlar": "Residences", 
                "egitim-ticari": "Educational & Commercial", "bahce-yapilari": "Garden Structures", 
                "garaj-yapilari": "Garage Structures", "galeri": "Gallery", "hakkimizda": "About Us"
            },
            consultBtn: "Contact Us", categoryTitle: "Categories",
            allProjectsTitle: "All Options", sqm: "m²", totalArea: "Total area", roomCount: "Rooms",
            getQuoteTitle: "Get a Quote", 
            contactFormDesc: "Send us your request, and our customer representatives will get back to you as soon as possible.",
            formName: "Full Name", 
            formPhone: "Phone Number", 
            formEmail: "Email Address",
            submitBtn: "Submit Request", backBtn: "Go Back", projectDetailsTitle: "Details",
            prevProject: "Previous Project", nextProject: "Next Project",
            
            formErrorName: "Please enter your full name.", 
            formErrorPhone: "Please enter a valid phone number.",
            formErrorEmail: "Please enter a valid email address.",
            kvkkText: "I have read and accept the <a href='#' class='underline text-brand-orange hover:text-orange-400'>Privacy Policy</a> regarding my personal data.",
            kvkkError: "You must accept the privacy policy to continue.",
            
            cookieText: "We use cookies on our site to improve your user experience and enhance our services.",
            cookieAccept: "Accept",

            pageTitles: {
                "home": "ZEMU SIPPAN", "iletisim": "Contact Us",
                "galeri": "Gallery", "hakkimizda": "About Us", "sip-panel": "Why SIP Panel?", 
                "konutlar": "Residential Models", "egitim-ticari": "Educational & Commercial", 
                "bahce-yapilari": "Garden Structures", "garaj-yapilari": "Garage Structures"
            },

            relatedProjectsTitle: "You May Also Like",
            processTitle: "How We Work?",
            processSteps: [
                { icon: "fa-comments", title: "Request & Survey", desc: "We listen to your needs and design the best architectural solution." },
                { icon: "fa-pencil-ruler", title: "Design", desc: "Our architects draw your project in 3D and offer a precise quote." },
                { icon: "fa-cogs", title: "Factory Production", desc: "SIP panels are cut and sized with millimetric precision." },
                { icon: "fa-hammer", title: "Fast Assembly", desc: "Your structure is delivered turnkey in weeks, unaffected by weather." }
            ],
            
            faqTitle: "Frequently Asked Questions",
            faq: [
                { q: "What is a SIP Panel?", a: "A SIP panel is a highly insulating, lightweight, and durable building element consisting of high-density polystyrene foam sandwiched between two structural exterior claddings. It is frequently preferred in the construction industry, especially in prefabricated house construction." },
                { q: "What are the Main Advantages of SIP Panels?", a: "The most important advantages of SIP panels include high insulation properties, fast construction time, durability, lightness, and eco-friendliness. This saves energy, reduces construction costs, and creates more comfortable living spaces." },
                { q: "Are SIP Panel Houses Earthquake Resistant?", a: "Yes, SIP panel houses are highly resistant to earthquakes. The integrated structure, high strength, and flexibility of the panel minimize potential damage during an earthquake." },
                { q: "What is the Lifespan of SIP Panel Houses?", a: "When used under proper conditions, the lifespan of SIP panel houses can exceed 100 years. However, this may vary depending on the quality of materials used, maintenance, and climate conditions." },
                { q: "What is the Cost of SIP Panel Houses?", a: "The cost varies depending on the size of the project, materials used, additional features, and region. However, in general, they are more economical than houses built with traditional methods. Thanks to long-term energy savings, the investment pays off in a short time." },
                { q: "Is There a Moisture Problem in SIP Panel Houses?", a: "When a proper insulation and ventilation system is used, there are no moisture problems. The structure of the SIP panel does not absorb moisture and expels it." },
                { q: "Is There a Fire Risk in SIP Panel Houses?", a: "The polystyrene foam inside the SIP panel is flammable. However, thanks to the structural materials on the outer surface and the fire-resistant coating, it is safe against fire. It also slows down the spread of smoke in the event of a fire." },
                { q: "How is the Sound Insulation in SIP Panel Houses?", a: "The SIP panel provides excellent sound insulation thanks to the high-density polystyrene foam. It significantly reduces sounds coming from outside and offers a quieter, more peaceful living space." },
                { q: "How Long Does the Construction of SIP Panel Houses Take?", a: "Construction is completed in a much shorter time compared to traditional methods due to the lightness and easy installation of the panel. On average, construction can be completed in a few weeks." },
                { q: "Do Bugs/Insects Infest SIP Panel Houses?", a: "The structure of the SIP panel is not suitable for insects to harbor. However, as with every structure, regular maintenance is important." }
            ],

            hakkimizdaData: {
                title: "Who We Are",
                paragraphs: [
                    "ZEMU SIPPAN is an innovative and purpose-driven building company that designs, manufactures, and sizes SIP (Structural Insulated Panels) according to customer requirements.",
                    "We use only top-tier materials for our panels, conducting all panel production processes in controlled temperature and climate environments to guarantee the highest quality of the final product.",
                    "We work with both individual clients choosing from our concept home models and those looking to bring their own architectural projects to life. For corporate clients developing large-scale housing projects or seeking high-volume panel supplies, we offer the highest quality product at the most competitive market prices."
                ],
                techTitle: "Our Production & Technology Power",
                features: [
                    { 
                        icon: "fa-layer-group", 
                        title: "Semi-Automatic Press Line", 
                        desc: "Our panels are produced on modern machines that ensure perfect adhesive distribution and standard-compliant pressing. We can process non-standard, massive panels up to 4 meters in length and 1.5 meters in width as a single piece." 
                    },
                    { 
                        icon: "fa-laptop-code", 
                        title: "Precision CNC Technology", 
                        desc: "Panel sizing and finishing are performed on precision CNC cutting and milling machines, accurate to a tenth of a millimeter. This zero-fault tolerance significantly accelerates installation speed on site." 
                    },
                    { 
                        icon: "fa-cogs", 
                        title: "Mitek Posi-Joist Infrastructure", 
                        desc: "By utilizing globally recognized Mitek Posi-Joist technology in truss manufacturing, we offer our clients ultra-light, innovative, and robust solutions for upper floors and flat roofs." 
                    }
                ]
            },

            sipPanelData: {
                heroImg: "https://vividgreen.co.uk/wp-content/uploads/2024/04/IMG_5283-scaled-1280x750-2-1024x600.jpg",
                introTitle: "What is a SIP Panel?",
                introText: "SIP (Structural Insulated Panel) is a highly popular building material in recent years. It consists of an insulating foam core sandwiched between two structural facings, typically oriented strand board (OSB). This combination provides extremely strong, energy-efficient, and cost-effective building systems.<br><br>The most important feature of this panel is that it acts as both a load-bearing structure and high-performance insulation simultaneously.",
                advantagesTitle: "Advantages of SIPs",
                advantages: [
                    { icon: "fa-stopwatch", title: "Fast Construction", desc: "Built in days rather than weeks due to large and lightweight panels." },
                    { icon: "fa-temperature-low", title: "High Insulation", desc: "Saves energy and minimizes heat loss thanks to the dense core." },
                    { icon: "fa-volume-mute", title: "Soundproofing", desc: "Significantly reduces external noise, creating quieter living spaces." },
                    { icon: "fa-shield-alt", title: "Durability", desc: "Highly resistant to natural disasters like earthquakes due to its structural strength." },
                    { icon: "fa-tint-slash", title: "Water Resistance", desc: "Protects the building from external elements with its watertight features." },
                    { icon: "fa-leaf", title: "Eco-Friendly", desc: "Manufactured using sustainable materials and a low carbon footprint." },
                    { icon: "fa-fire-extinguisher", title: "Fire Resistance", desc: "Offers various levels of fire resistance depending on the insulation core." },
                    { icon: "fa-sun", title: "Bioclimatic Design", desc: "Allows structures to be designed in harmony with their climate conditions." }
                ],
                usageAreasTitle: "Usage Areas",
                usageAreas: [
                    "Prefabricated Houses: Quick and economical residential solutions.",
                    "Bungalows: Ideal for small-scale structures like holiday and garden homes.",
                    "Roof Systems: Ensures more efficient use of attic spaces with high insulation.",
                    "Wall Systems: A versatile material for interior and exterior walls.",
                    "Floor Systems: Preferred for flooring due to its high load-bearing capacity.",
                    "Commercial Structures: Used in large-scale buildings like offices and malls."
                ],
                futureTitle: "The Future & Conclusion",
                futureText: "As interest in sustainability and energy efficiency grows in the construction industry, SIP panels are becoming increasingly vital. The challenges of global warming and limited energy resources are expanding the applications of SIPs. In conclusion, SIP panels are modern building materials that create fast, energy-efficient, and durable structures, firmly establishing themselves as the building material of the future.",
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
                "galeri": "Gallery coming soon."
            },
            footerText: "© 2026 ZEMU SIPPAN Structures House Systems. All rights reserved."
        }
    }
};
