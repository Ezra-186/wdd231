export function initLightbox() {
    const dlg = document.getElementById('lightbox');
    if (!dlg) return;

    const imgEl = dlg.querySelector('.lightbox__img');
    const capEl = dlg.querySelector('.lightbox__caption');
    const closeBtn = dlg.querySelector('.lightbox__close');
    const grid = document.querySelector('.grid');
    let lastFocus = null;

    function onKeyDown(e) { if (e.key === 'Escape') close(); }

    async function open(src, alt, caption) {
        lastFocus = document.activeElement;

        imgEl.removeAttribute('width');
        imgEl.removeAttribute('height');
        imgEl.style.width = '';
        imgEl.style.height = '';

        imgEl.alt = alt || '';
        capEl.textContent = caption || alt || '';
        imgEl.src = src;

        try { await imgEl.decode(); } catch (_) { }
        dlg.classList.add('active');
        closeBtn?.focus();
        document.addEventListener('keydown', onKeyDown);
    }

    function close() {
        dlg.classList.remove('active');
        document.removeEventListener('keydown', onKeyDown);
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    grid?.addEventListener('click', (e) => {
        const thumb = e.target.closest('.thumb');
        if (!thumb || !grid.contains(thumb)) return;

        const img = thumb.querySelector('.thumb-media img');
        if (!img) return;

        const src = img.dataset.full || img.currentSrc || img.src;
        const alt = img.alt || '';
        const caption = thumb.querySelector('.title')?.textContent || alt;
        open(src, alt, caption);
    });

    dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
    closeBtn?.addEventListener('click', close);

    grid?.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const thumb = e.target.closest('.thumb');
        if (!thumb || !grid.contains(thumb)) return;
        e.preventDefault();
        const img = thumb.querySelector('.thumb-media img');
        if (!img) return;
        const src = img.dataset.full || img.currentSrc || img.src;
        open(src, img.alt || '', thumb.querySelector('.title')?.textContent || img.alt || '');
    });
}
