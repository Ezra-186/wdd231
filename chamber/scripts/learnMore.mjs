export function updateLearnMoreLinks() {
    document.querySelectorAll('#allplaces .card a').forEach(link => {
        const card = link.closest('.card');
        const name = card.querySelector('h3')?.textContent.trim();
        if (name) {
            link.textContent = `Learn more about ${name}`;
        }
    });
}