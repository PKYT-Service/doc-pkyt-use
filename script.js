function updateIframeFromHash() {
    const hash = window.location.hash.substring(1); // Retire le #
    if (hash) {
        const pages = {
            "fdfd": "./pages/sqkdjfs.html",
            "page2": "./pages/autre-page.html",
            "doc": "https://doc-pkyt-use.vercel.app/pages/Uses-pkyt_account-V3.html"
        };
        if (pages[hash]) {
            document.getElementById('contentFrame').src = pages[hash];
        }
    }
}

// Écoute le changement de hash
window.addEventListener('hashchange', updateIframeFromHash);

// Charger la bonne page au chargement initial
window.addEventListener('DOMContentLoaded', updateIframeFromHash);
