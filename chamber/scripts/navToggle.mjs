const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');
export function initNavToggle() {
    if (!navButton || !navBar) return;
    navButton.addEventListener('click', () => {
        const expanded = navButton.getAttribute('aria-expanded') === 'true';
        navButton.setAttribute('aria-expanded', !expanded);
        navButton.classList.toggle('show');
        navBar.classList.toggle('show');
    });
}