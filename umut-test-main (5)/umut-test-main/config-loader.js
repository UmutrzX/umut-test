// Config Loader - Mevcut config.js'i korur + Admin panel desteği ekler
import { siteConfig as originalConfig } from './config.js';

function getAdminConfig() {
    try {
        const adminData = localStorage.getItem('admin_siteConfig');
        if (adminData) {
            return JSON.parse(adminData);
        }
    } catch (e) {
        console.warn('Admin config okunamadı:', e);
    }
    return null;
}

export function saveAdminConfig(config) {
    try {
        localStorage.setItem('admin_siteConfig', JSON.stringify(config));
        return true;
    } catch (e) {
        console.error('Admin config kaydedilemedi:', e);
        return false;
    }
}

export async function loadConfig() {
    const adminConfig = getAdminConfig();
    
    if (adminConfig) {
        console.log('✓ Admin config yüklendi');
        const mergedConfig = {
            ...originalConfig,
            ...adminConfig.site,
            categories: adminConfig.categories?.categories ? formatCategoriesFromJSON(adminConfig.categories.categories) : originalConfig.categories,
            projects: adminConfig.projects?.projects || originalConfig.projects || [],
            i18n: adminConfig.i18n || originalConfig.i18n
        };
        return mergedConfig;
    }
    
    console.log('✓ Varsayılan config yüklendi (config.js)');
    const config = { ...originalConfig };
    
    try {
        const [categoriesRes, projectsRes, siteRes] = await Promise.allSettled([
            fetch('./config/categories.json'),
            fetch('./config/projects.json'),
            fetch('./config/site.json')
        ]);
        
        if (categoriesRes.status === 'fulfilled' && categoriesRes.value.ok) {
            const categoriesData = await categoriesRes.value.json();
            config.categories = formatCategoriesFromJSON(categoriesData.categories);
        }
        
        if (projectsRes.status === 'fulfilled' && projectsRes.value.ok) {
            const projectsData = await projectsRes.value.json();
            config.projects = projectsData.projects;
        }
        
        if (siteRes.status === 'fulfilled' && siteRes.value.ok) {
            const siteData = await siteRes.value.json();
            config.formSubmission = { ...config.formSubmission, ...siteData.formSubmission };
            config.contact = { ...config.contact, ...siteData.contact };
            config.homeHero = { ...config.homeHero, ...siteData.homeHero };
        }
    } catch (e) {
        console.warn('JSON config dosyaları yüklenemedi:', e);
    }
    
    return config;
}

function formatCategoriesFromJSON(categoriesArray) {
    const formatted = {};
    categoriesArray.forEach(cat => {
        formatted[cat.id] = cat.items.map(item => ({
            id: item.id,
            tr: item.tr,
            en: item.en
        }));
    });
    return formatted;
}

export function exportConfigToJSON(config) {
    return {
        site: {
            formSubmission: config.formSubmission,
            contact: config.contact,
            homeHero: config.homeHero
        },
        categories: config.categories,
        projects: config.projects || [],
        i18n: config.i18n
    };
}

export function downloadConfigJSON(config) {
    const jsonStr = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

window.loadConfig = loadConfig;
window.saveAdminConfig = saveAdminConfig;
window.exportConfigToJSON = exportConfigToJSON;
window.downloadConfigJSON = downloadConfigJSON;