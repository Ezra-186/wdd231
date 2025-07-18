export function setFooterDates() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const lmEl = document.getElementById('lastModified');
    if (lmEl) {
        const d = new Date(document.lastModified);
        lmEl.setAttribute('datetime', d.toISOString());

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        };

        lmEl.textContent = d.toLocaleString('en-US', options);
    }
}
  