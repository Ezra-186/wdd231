export async function loadMembers() {
    const container = document.getElementById('members');
    if (!container) return;

    try {
        const resp = await fetch('data/members.json');
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        data.forEach(m => {
            const card = document.createElement('section');
            card.innerHTML = `
          <img src="images/${m.image}" alt="${m.name}" width="240" height="240" loading="lazy">
          <h3>${m.name}</h3>
          <p>${m.address}</p>
          <p>${m.phone}</p>
          <p><a class="visit-link" href="${m.website}" target="_blank">Visit Website</a></p>
        `;
            container.append(card);
        });
    } catch (e) {
        console.error('Failed to load members:', e);
    }
  }