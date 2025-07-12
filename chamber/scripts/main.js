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
        <img
          src="images/${m.image}"
          alt="${m.name}"
          width="240" height="240"
          loading="lazy"
        >
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
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
}

window.addEventListener('DOMContentLoaded', () => {
    loadMembers();
    setFooterDates();
});


