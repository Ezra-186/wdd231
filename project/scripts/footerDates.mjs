export function setFooterDates() {
    const el = document.getElementById('last-updated');
    if (!el) return;
    const d = new Date(document.lastModified);
    el.setAttribute('datetime', d.toISOString());
    el.textContent = `Last updated: ${d.toLocaleString()}`;
}
