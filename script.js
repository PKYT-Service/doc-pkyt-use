function updateIframeFromHash() {
    const hash = window.location.hash.substring(1); // Retire le #
    if (hash) {
        const pages = {
            "conditions": "https://doc-pkyt-use.vercel.app/pages/Rules-PKYT-2025.html",
            "discord_pikayutmg": "https://doc-pkyt-use.vercel.app/pages/Rules-Discord_PKYT-2025.html",
            "discord_ebsayder": "https://doc-pkyt-use.vercel.app/pages/Rules-EbsayderFlyse-2024.html",
            "dcr_ebsayderFlyse": "https://doc-pkyt-use.vercel.app/pages/Others-Ebsayder_dcr.html",
            "lspdfr": "https://doc-pkyt-use.vercel.app/pages/Others-LSPDFR_multiplayers.html"
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
