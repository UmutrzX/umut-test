// Tailwind CSS Fallback
(function() {
    if (typeof tailwind !== 'undefined') return;
    console.warn('Tailwind CSS yüklenemedi, fallback kullanılıyor');
    var s = document.createElement('style');
    s.textContent = 'body{font-family:Inter,sans-serif;margin:0}.flex{display:flex}.grid{display:grid}.hidden{display:none!important}.text-white{color:#fff}.bg-white{background:#fff}.bg-gray-900{background:#111827}.text-gray-900{color:#111827}.text-gray-500{color:#6b7280}.text-brand-orange{color:#f39c12}.bg-brand-orange{background:#f39c12}.bg-brand-green{background:#2ecc71}.rounded-full{border-radius:9999px}.p-4{padding:1rem}.px-4{padding-left:1rem;padding-right:1rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.m-0{margin:0}.mx-auto{margin-left:auto;margin-right:auto}.w-full{width:100%}.min-h-screen{min-height:100vh}.items-center{align-items:center}.justify-center{justify-content:center}.text-center{text-align:center}.font-bold{font-weight:700}.text-2xl{font-size:1.5rem}.text-3xl{font-size:1.875rem}.text-4xl{font-size:2.25rem}.mb-4{margin-bottom:1rem}.mb-8{margin-bottom:2rem}.mt-8{margin-top:2rem}.gap-4{gap:1rem}.cursor-pointer{cursor:pointer}';
    document.head.appendChild(s);
})();