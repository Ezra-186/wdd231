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


// existing toggle and footer setup
window.addEventListener('DOMContentLoaded', () => {
    loadMembers();       // from directory page
    setFooterDates();    // from footer activity
    loadWeather();       // new: fetch OWM data
    loadSpotlights();    // new: display random gold/silver members
});

// Weather: current + 3-day forecast  [oai_citation:3‡W03 _ Chamber Home Page Assignemnt.pdf](file-service://file-QYUZnEoto8dJRMfo7Ch7SH)
async function loadWeather() {
    const apiKey = '54947960998443aa19088a17d8f74825';
    const url = `https://api.openweathermap.org/data/2.5/onecall`
        + `?lat=33.8366&lon=-117.9143&units=imperial`
        + `&appid=${apiKey}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error('Weather fetch error', res.status);
            return;
        }

        const data = await res.json();
        const temp = data.current.temp;
        const desc = data.current.weather[0].description;
        const daily = data.daily;

        let html = `<p>Now: ${Math.round(temp)}°F, ${desc}</p>`;
        html += '<ul>';
        daily.slice(1, 4).forEach(day => {
            const dayName = new Date(day.dt * 1000)
                .toLocaleDateString('en-US', { weekday: 'short' });
            html += `<li>${dayName}: ${Math.round(day.temp.day)}°F</li>`;
        });
        html += '</ul>';

        document.getElementById('weather').innerHTML = html;
    } catch (error) {
        console.error('Failed to load weather', error);
    }
}
  
// Spotlights: random gold/silver members  [oai_citation:4‡W03 _ Chamber Home Page Assignemnt.pdf](file-service://file-QYUZnEoto8dJRMfo7Ch7SH)
async function loadSpotlights() {
    try {
        const res = await fetch('members.json');
        const members = await res.json();
        const pool = members.filter(m => m.level === 'gold' || m.level === 'silver');
        const selected = [];
        while (selected.length < 3 && pool.length) {
            const i = Math.floor(Math.random() * pool.length);
            selected.push(pool.splice(i, 1)[0]);
        }
        const container = document.getElementById('spotlights');
        selected.forEach(m => {
            const card = document.createElement('section');
            card.innerHTML = `
                <h3>${m.name}</h3>
                <img src="${m.logo}" alt="${m.name} logo">
                <p>${m.address}</p>
                <p>${m.phone}</p>
                <p><a href="${m.url}" target="_blank" rel="noopener">${m.url}</a></p>
                <p>Level: ${m.level}</p>
            `;
            container.appendChild(card);
        });
    } catch (e) {
        console.error(e);
    }
}