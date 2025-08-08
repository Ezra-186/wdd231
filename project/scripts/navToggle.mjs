export function initNavToggle() {
    const menuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav-links');
    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', () => {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('active');
        menuBtn.classList.toggle('open');
    });
}