export function initLightbox() {
    const dlg = document.getElementById('lightbox');
    if (!dlg) return;

    const imgEl = dlg.querySelector('.lightbox__img');
    const capEl = dlg.querySelector('.lightbox__caption');
    const closeBtn = dlg.querySelector('.lightbox__close');
    let lastFocus = null;

    function onKeyDown(e) {
        if (e.key === 'Escape') close();
    }

    function open(src, alt) {
        lastFocus = document.activeElement;
        imgEl.src = src;
        imgEl.alt = alt || '';
        capEl.textContent = alt || '';
        dlg.classList.add('active');
        if (closeBtn) closeBtn.focus();
        document.addEventListener('keydown', onKeyDown);
    }

    function close() {
        dlg.classList.remove('active');
        document.removeEventListener('keydown', onKeyDown);
        if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    if (closeBtn) closeBtn.addEventListener('click', close);
    dlg.addEventListener('click', e => { if (e.target === dlg) close(); });

    document.body.addEventListener('click', e => {
        if (e.target.matches('.thumb img')) {
            open(e.target.src, e.target.alt);
        }
    });
}
