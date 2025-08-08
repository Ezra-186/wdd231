export function initModal() {
    const modal = document.getElementById('lightbox');
    modal.querySelector('.lightbox__close')
        .addEventListener('click', () => modal.close());
}

export function showModal(photo) {
    const modal = document.getElementById('lightbox');
    modal.querySelector('.lightbox__img').src = photo.urls.regular;
    modal.querySelector('.lightbox__caption').textContent = photo.alt_description;
    modal.showModal();
}