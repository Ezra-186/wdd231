
async function fetchGalleryData() {
    try {
    
        const res = await fetch('data/gallery.json');
        if (!res.ok) throw new Error(`Gallery load failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}
function renderGallery(items, container) {
    container.innerHTML = '';
    items.forEach(item => {
        const thumb = document.createElement('div');
        thumb.className = 'thumb';
        thumb.innerHTML = `
      <img src="${item.src}" alt="${item.title}" loading="lazy">
      <p class="title">${item.title}</p>
      <p class="description">${item.description}</p>
      <p class="category">${item.category}</p>
    `;
        container.appendChild(thumb);
    });
}

export async function initGallery() {
    const galleryContainer = document.querySelector('.grid');
    const filterBtns = document.querySelectorAll('.filters button');
    if (!galleryContainer) return;

    const galleryData = await fetchGalleryData();

    const applyFilter = filter => {
        const items = filter === 'all'
            ? galleryData
            : galleryData.filter(i => i.category === filter);
        renderGallery(items, galleryContainer);
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
    }
}
