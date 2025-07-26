export function initJoinPage() {
    document.getElementById('ts').value = new Date().toISOString();

    const modal = document.getElementById('level-modal');
    const contentEl = modal.querySelector('.modal-content');
    const closeBtn = modal.querySelector('.close-modal');

    const benefits = {
        nonprofit: ['No fee', 'Listing in directory'],
        bronze: ['Directory listing', 'Monthly newsletter'],
        silver: ['Bronze perks', 'Event discounts', 'Training sessions'],
        gold: ['Silver perks', 'Premium listing', 'Advertising spots']
    };

    function showLevelDetails(levelKey) {
        const items = benefits[levelKey] || [];
        contentEl.innerHTML = `
      <h2>${levelKey.charAt(0).toUpperCase() + levelKey.slice(1)} Benefits</h2>
      <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
    `;
        modal.showModal();
    }

    document.querySelectorAll('.info-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const lvl = e.currentTarget.closest('.level-card').dataset.level;
            showLevelDetails(lvl);
        });
    });

    closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.close();
    });
}