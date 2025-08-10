async function fetchGalleryData() {
    try {
        const res = await fetch('data/gallery.json');
        if (!res.ok) throw new Error(`Gallery load failed: ${res.status}`);
        return await res.json();
    } catch {
        return [];
    }
}

function renderGallery(items, container) {
    container.innerHTML = '';
    const frag = document.createDocumentFragment();

    items.forEach((item, i) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumb';

        const media = document.createElement('div');
        media.className = 'thumb-media';

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title || '';
        img.decoding = 'async';

        if (item.w && item.h) {
            img.width = item.w;
            img.height = item.h;
        } else {
            img.addEventListener('load', () => {
                img.width = img.naturalWidth;
                img.height = img.naturalHeight;
            }, { once: true });
        }

        if (item.srcset) {
            img.srcset = item.srcset;
            img.sizes = item.sizes || '(min-width:1024px) 25vw, (min-width:768px) 33vw, 90vw';
        }

        if (i === 0) {
            img.loading = 'eager';
            img.fetchPriority = 'high';
            const href = img.currentSrc || img.src;
            if (!document.querySelector(`link[rel="preload"][as="image"][href="${href}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = href;
                link.fetchPriority = 'high';
                document.head.appendChild(link);
            }
        } else {
            img.loading = 'lazy';
        }

        media.appendChild(img);

        const title = document.createElement('p');
        title.className = 'title';
        title.textContent = item.title || '';

        const desc = document.createElement('p');
        desc.className = 'description';
        desc.textContent = item.description || '';

        const cat = document.createElement('p');
        cat.className = 'category';
        cat.textContent = item.category || '';

        thumb.appendChild(media);
        thumb.appendChild(title);
        thumb.appendChild(desc);
        thumb.appendChild(cat);

        frag.appendChild(thumb);
    });

    container.appendChild(frag);
}

export async function initGallery() {
    const galleryContainer = document.querySelector('.grid');
    if (!galleryContainer) return;

    galleryContainer.setAttribute('aria-busy', 'true');
    galleryContainer.innerHTML = '';

    const filterBtns = document.querySelectorAll('.filters button');
    const galleryData = await fetchGalleryData();

    const applyFilter = (filter) => {
        galleryContainer.setAttribute('aria-busy', 'true');
        const items = filter === 'all'
            ? galleryData
            : galleryData.filter(i => i.category === filter);
        renderGallery(items, galleryContainer);
        galleryContainer.removeAttribute('aria-busy');
    };

    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilter(btn.dataset.filter);
            });
        });
        applyFilter('all');
    } else {
        renderGallery(galleryData.slice(0, 6), galleryContainer);
        galleryContainer.removeAttribute('aria-busy');
    }
}
