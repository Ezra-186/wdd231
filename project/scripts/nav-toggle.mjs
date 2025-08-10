export function initNavToggle() {
    const btn = document.querySelector('#menu-toggle');
    const nav = document.querySelector('#site-nav');
    if (!btn || !nav) return;

    const onKey = e => { if (e.key === 'Escape') close(); };

    const open = () => {
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.add('open');
        nav.removeAttribute('hidden');
        nav.removeAttribute('inert');
        nav.querySelector('a')?.focus();
        document.addEventListener('keydown', onKey);
    };

    const close = () => {
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('open');
        nav.setAttribute('inert', '');
        nav.setAttribute('hidden', '');
        btn.focus();
        document.removeEventListener('keydown', onKey);
    };

    btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        expanded ? close() : open();
    });

    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => {
        if (mq.matches) {
            btn.setAttribute('aria-expanded', 'true');
            btn.classList.remove('open');
            nav.removeAttribute('hidden');
            nav.removeAttribute('inert');
        } else {
            close();
        }
    };
    mq.addEventListener('change', sync);
    sync();
}
