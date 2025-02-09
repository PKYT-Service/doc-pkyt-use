function updateIframeFromHash() {
    const hash = window.location.hash.substring(1); // Retire le #
    if (hash) {
        const pages = {
            "conditions": "https://doc-pkyt-use.vercel.app/forum_pkyt/page/cdt_web_pkyt.html",
            "discord_pikayutmg": "https://doc-pkyt-use.vercel.app/forum_pkyt/page/cdt_discord-PKYT.html",
            "discord_ebsayder": "https://doc-pkyt-use.vercel.app/forum_pkyt/page/cdt_discord-EBSDR.html",
            "dcr_ebsayderFlyse": "https://doc-pkyt-use.vercel.app/forum_pkyt/page/dcr_EBSDR.html"
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
