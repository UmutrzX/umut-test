// ... existing code ...
window.changeLanguage = changeLanguage;

window.filterCategory = function(catId, evt) {
    if(evt) evt.preventDefault();
    state.activeCategory = catId === 'all' ? null : catId;
    
    // Eğer projeler sayfasında değilsek önce oraya yönlendir, sonra filtrele
    if (state.currentView !== 'projects') {
        navigate('projects');
    } else {
        renderProjectsList();
    }
};

window.toggleMobileMenu = function() {
// ... existing code ...
            const columnsHTML = megaMenuData.map(col => `
                <div class="flex-1">
                    <h4 class="text-brand-orange font-bold text-lg mb-5 border-b border-gray-100 pb-2">${col.columnTitle}</h4>
                    <ul class="space-y-4">
                        ${col.items.map(link => {
                            // Eğer link bir kategori ise filtreleme fonksiyonunu, sayfa ise yönlendirme fonksiyonunu tetikle
                            const clickAction = link.category ? `filterCategory('${link.category}', event)` : `navigate('${link.action}', event)`;
                            return `
                            <li>
                                <a href="#" onclick="${clickAction}" class="text-gray-600 hover:text-brand-orange transition flex items-center text-sm font-medium">
                                    ${link.label}
                                </a>
                            </li>
                            `;
                        }).join('')}
                    </ul>
                </div>
            `).join('');

            // Mega menü kapsayıcısını inşa et (Fare üzerine gelince görünür olan kısım)
// ... existing code ...
```

```javascript:Site Veritabanı ve Yönetim Paneli:config.js
// ... existing code ...
                // İletişim sayfasının metnini boş bırakırsanız sadece harita/form görünür.
                contact: ""
            },

            // =====================================================
            // BÖLÜM 4.1: AÇILIR MENÜLER (MEGA MENU) EKLENTİSİ
            // =====================================================
            megaMenus: {
                projects: [ // Sadece içeride var olan gerçek kategoriler eklendi
                    {
                        columnTitle: "Ev Modelleri",
                        items: [
                            { label: "Tüm Projeler", category: "all" },
                            { label: "Standart evler", category: "standart" },
                            { label: "Modüler evler", category: "moduler" },
                            { label: "Ahşap evler", category: "ahsap" },
                            { label: "Kırsal evler", category: "kirsal" },
                            { label: "Garajlı", category: "garajli" },
                            { label: "İki Katlı", category: "ikikatli" },
                            { label: "Tek Katlı", category: "tekkatli" }
                        ]
                    }
                ]
            },
            
            footerText: "© 2026 Muhammet Tutkun A.Ş. Tüm hakları saklıdır."
        },
        en: {
// ... existing code ...
                contact: ""
            },

            megaMenus: {
                projects: [
                    {
                        columnTitle: "House Models",
                        items: [
                            { label: "All Projects", category: "all" },
                            { label: "Standard houses", category: "standart" },
                            { label: "Modular houses", category: "moduler" },
                            { label: "Wooden houses", category: "ahsap" },
                            { label: "Rural houses", category: "kirsal" },
                            { label: "With Garage", category: "garajli" },
                            { label: "Two-Story", category: "ikikatli" },
                            { label: "Single-Story", category: "tekkatli" }
                        ]
                    }
                ]
            },

            footerText: "© 2026 Muhammet Tutkun A.Ş. All rights reserved."
        }
    }
};
// ... existing code ...
```

Bu sayede menümüz hayali sayfalardan temizlendi ve Projeler sekmesindeki filtreleme tamamen işlevsel, şık bir kısayol aracına dönüştü.
