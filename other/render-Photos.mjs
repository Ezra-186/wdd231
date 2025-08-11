export function renderPhotos(photos, container) {
    container.innerHTML = '';
    photos.forEach(photo => {
        const figure = document.createElement('figure');
        figure.innerHTML = `
      <img src="${photo.urls.small}" alt="${photo.alt_description}" loading="lazy">
      <figcaption>${photo.user.name}</figcaption>
    `;
        figure.addEventListener('click', () => showModal(photo));
        container.append(figure);
    });
}
