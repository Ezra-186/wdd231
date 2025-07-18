export async function loadSpotlights() {
    console.log('⭐ loadSpotlights called');
    const container = document.getElementById('spotlights');
    if (!container) return;

    try {
        const resp = await fetch('data/members.json');
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        const pool = data.filter(m => m.level === 'gold' || m.level === 'silver');
        const selected = [];
        while (selected.length < 3 && pool.length) {
            selected.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
        }
        selected.forEach(m => {
            const card = document.createElement('section');
            card.classList.add('card');
            card.innerHTML = `
          <h3>${m.name}</h3>
          <img src="images/${m.image}" alt="${m.name} logo" loading="lazy">
          <p>${m.address}</p>
          <p>${m.phone}</p>
          <p><a href="${m.website}" target="_blank" rel="noopener">${m.website}</a></p>
          <p>Level: ${m.level}</p>
        `;
            container.append(card);
        });
    } catch (e) {
        console.error('Failed to load spotlights:', e);
    }
  }