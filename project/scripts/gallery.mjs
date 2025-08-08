async function fetchGalleryData() {
    try {
        const res = await fetch('data/gallery.json');
        if (!res.ok) throw new Error(`Gallery load failed: ${res.status}`);
        return await res.json();
    } catch (_) {
        return [];
    }
}

function renderGallery(items, container) {
    container.innerHTML = '';
    const frag = document.createDocumentFragment();

    items.forEach(item => {
        const thumb = document.createElement('div');
        thumb.className = 'thumb';
        thumb.innerHTML = `
      <div class="thumb-media">
        <img
          src="${item.src}"
          alt="${item.title}"
          loading="lazy"
          decoding="async"
          width="400"
          height="300"
          sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 90vw">
      </div>
      <p class="title">${item.title}</p>
      <p class="description">${item.description}</p>
      <p class="category">${item.category}</p>
    `;
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
