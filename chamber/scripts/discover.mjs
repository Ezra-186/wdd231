import { places } from '../data/places.mjs';

export async function initDiscoverPage() {
    const container = document.getElementById('allplaces');
    const msgBox = document.getElementById('visit-message');
    const DAY_MS = 86_400_000;

    /* build one card per place */
    places.forEach(p => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <h2>${p.name}</h2>
            <img src="${p.photo}" alt="${p.name}" loading="lazy" width="300" height="300">
            <p class="desc">${p.description}</p>
            <address>${p.address} • <strong>${p.cost}</strong></address>
            <a class="learn-btn"
                href="https://www.google.com/search?q=${encodeURIComponent(p.name + ' Anaheim CA')}"
                target="_blank" rel="noopener">
                Learn more about ${p.name}
            </a>`;
        container.append(card);
    });

    /* last-visit message */
    const then = Number(localStorage.getItem('lastVisit') || 0);
    const now = Date.now();
    msgBox.textContent = then
        ? (Math.round((now - then) / DAY_MS) === 0
            ? 'Welcome back! You visited earlier today.'
            : `Welcome back! It has been ${Math.round((now - then) / DAY_MS)} days since your last visit.`)
        : 'Welcome! Thanks for exploring Anaheim with us for the first time.';
    localStorage.setItem('lastVisit', now);

    return Promise.resolve();
}
