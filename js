
document.addEventListener('DOMContentLoaded', () => {
    // Mode sombre automatique basé sur les préférences du système
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = prefersDarkScheme.matches ? "dark" : "light";
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Initialise les barres de compétences
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
});
