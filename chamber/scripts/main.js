// nav toggle + accessibility
const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    const expanded = navButton.getAttribute('aria-expanded') === 'true';
    navButton.setAttribute('aria-expanded', !expanded);
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

// grid / list toggle
const gridBtn = document.querySelector('#grid');
const listBtn = document.querySelector('#list');
const members = document.querySelector('#members');

gridBtn.addEventListener('click', () => {
    members.classList.replace('list', 'grid');
});
listBtn.addEventListener('click', () => {
    members.classList.replace('grid', 'list');
});

// fetch + render members
async function loadMembers() {
    try {
        const resp = await fetch('data/members.json');
        const data = await resp.json();
        data.forEach(m => {
            const card = document.createElement('section');
            card.innerHTML = `
        <img src="images/${m.image}" alt="${m.name}" width="240" height="240" loading="lazy">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <p>
          <a class="visit-link" href="${m.website}" target="_blank">
            Visit Website
          </a>
        </p>
      `;
            members.append(card);
        });
    } catch (e) {
        console.error('Failed to load members:', e);
    }
}

// footer dates
function setFooterDates() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    const pad = n => String(n).padStart(2, '0');

    // last-modified
    const lmEl = document.getElementById('lastModified');
    if (lmEl) {
        const d = new Date(document.lastModified);
        const iso = d.toISOString();
        lmEl.setAttribute('datetime', iso);

        const friendly =
            `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
            `${pad(d.getHours())}:${pad(d.getMinutes())}`;

        lmEl.textContent = friendly; 
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadMembers();
    setFooterDates();
});


