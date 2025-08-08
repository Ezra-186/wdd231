// config.mjs
export const EMAILJS_SERVICE_ID = 'service_xxxx';
export const EMAILJS_TEMPLATE_ID = 'template_xxxx';
export const EMAILJS_USER_ID = 'user_xxxx';

// navToggle.mjs
export function initNavToggle() {
    const menuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav-links');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });
    }
}

// storage.mjs – persist form fields
export function initFormStorage(form) {
    const inputs = form.querySelectorAll('input[name], textarea[name]');
    inputs.forEach(input => {
        const saved = localStorage.getItem(input.name);
        if (saved !== null) {
            if (input.type === 'checkbox') {
                input.checked = saved === 'true';
            } else {
                input.value = saved;
            }
        }
        input.addEventListener('input', () => {
            if (input.type === 'checkbox') {
                localStorage.setItem(input.name, input.checked);
            } else {
                localStorage.setItem(input.name, input.value);
            }
        });
    });
    form.addEventListener('submit', () => localStorage.clear());
}

// gallery.mjs – local gallery & filters
const galleryData = [
    { id: 1, category: 'Weddings', title: 'Sunset Couple', src: 'images/Website_19.jpg' },
    { id: 2, category: 'Family Portraits', title: 'Family Portraits', src: 'images/Website_34.webp' },
    { id: 3, category: 'Weddings', title: 'Bride and Groom', src: 'images/Website_17.jpg' },
    { id: 4, category: 'Weddings', title: 'Weddings', src: 'images/Website_38.webp' },
    { id: 5, category: 'Engagements', title: 'Engagement', src: 'images/Website_5.jpg' },
    { id: 6, category: 'Bridesmaids', title: 'Bridesmaid', src: 'images/Website_26.jpg' },
    { id: 7, category: 'Groomsmen', title: 'Groomsmen', src: 'images/Website_11.jpg' },
    { id: 8, category: 'Engagements', title: 'Engagements', src: 'images/Website_35.webp' },
    { id: 9, category: 'Weddings', title: 'Weddings', src: 'images/Website_1.webp' },
    { id: 10, category: 'Engagements', title: 'Engagements', src: 'images/Website_4.webp' },
    // … truncated for brevity …
];

function renderGallery(items, container) {
    container.innerHTML = '';
    items.forEach(item => {
        const thumb = document.createElement('div');
        thumb.className = 'thumb';
        thumb.innerHTML = `<img src="${item.src}" alt="${item.title}" loading="lazy">`;
        container.appendChild(thumb);
    });
}

export function initGallery() {
    const galleryContainer = document.querySelector('.grid');
    const filterBtns = document.querySelectorAll('.filters button');
    if (!galleryContainer) return;

    const applyFilter = filter => {
        const items = filter === 'all' ? galleryData : galleryData.filter(i => i.category === filter);
        renderGallery(items, galleryContainer);
    };

    if (filterBtns.length) {
        filterBtns.forEach(btn => btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.filter);
        }));
        applyFilter('all');
    } else {
        renderGallery(galleryData.slice(0, 6), galleryContainer);
    }
}

// lightbox.mjs – click thumb ➜ modal
export function initLightbox() {
    const dlg = document.getElementById('lightbox');
    if (!dlg) return;
    const imgEl = dlg.querySelector('.lightbox__img');
    const capEl = dlg.querySelector('.lightbox__caption');
    dlg.querySelector('.lightbox__close').addEventListener('click', () => dlg.classList.remove('active'));
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.classList.remove('active'); });

    document.body.addEventListener('click', e => {
        if (e.target.matches('.thumb img')) {
            imgEl.src = e.target.src;
            imgEl.alt = e.target.alt;
            capEl.textContent = e.target.alt;
            dlg.classList.add('active');
        }
    });
}

// validateForm.mjs – client‑side checks
export function initValidation(form) {
    const nameEl = form.querySelector('#name');
    const emailEl = form.querySelector('#email');
    const dateEl = form.querySelector('#event-date');
    const svcWrap = form.querySelector('.toggle-group');
    const svcEls = Array.from(form.querySelectorAll('input[name="Reason"]'));

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    form.addEventListener('submit', e => {
        let ok = true;
        [nameEl, emailEl, dateEl].forEach(el => el.classList.remove('error'));
        svcWrap.classList.remove('invalid');

        if (!nameEl.value.trim()) { nameEl.classList.add('error'); ok = false; }
        if (!emailRegex.test(emailEl.value)) { emailEl.classList.add('error'); ok = false; }
        if (!dateEl.value) { dateEl.classList.add('error'); ok = false; }
        if (!svcEls.some(cb => cb.checked)) { svcWrap.classList.add('invalid'); ok = false; }

        if (!ok) {
            e.preventDefault();
            (document.querySelector('.error, .invalid') || form).scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// reviewData.mjs – build thank‑you page
export function initReviewPage() {
    const container = document.getElementById('review-data');
    if (!container) return;
    const p = new URLSearchParams(location.search);
    const add = (label, val) => {
        const g = document.createElement('div');
        g.className = 'form-group';
        g.innerHTML = `<label>${label}</label><div class="value">${val}</div>`;
        container.appendChild(g);
    };

    add('Name', p.get('Name') || '(none)');
    add('Email', p.get('Email') || '(none)');
    add('Date', p.get('EventDate') ? new Date(p.get('EventDate')).toLocaleDateString() : '(none)');
    add('Reason', p.getAll('Reason').join(', ') || '(none)');
    add('Subject', p.get('Subject') || '(none)');
    add('Message', p.get('Message') || '(none)');
}

// emailForm.mjs – EmailJS integration (uses global `emailjs` from the UMD script tag)
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } from '../project/scripts/config.mjs';

export function initEmailForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    emailjs.init(EMAILJS_USER_ID);

    // send ONLY if earlier validation did not call preventDefault()
    form.addEventListener('submit', async e => {
        if (e.defaultPrevented) return; // validation failed – abort send
        e.preventDefault();

        const fd = new FormData(form);
        // Aggregate all checked services into a comma‑separated string
        const services = fd.getAll('Reason').join(', ');
        const data = Object.fromEntries(fd.entries());
        data.Reason = services;
        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
            location.href = `review.html?${new URLSearchParams(data)}`;
        } catch (err) {
            console.error('EmailJS error:', err);
            alert('An error occurred sending your message.');
        }
    });
}

// footerDates.mjs.mjs
export function setFooterDates() {
    const el = document.getElementById('last-updated');
    if (!el) return;
    const d = new Date(document.lastModified);
    el.setAttribute('datetime', d.toISOString());
    el.textContent = `Last updated: ${d.toLocaleString()}`;
}

// main.mjs – single entry point
import { initNavToggle } from '../project/scripts/navToggle.mjs';
import { initFormStorage } from '../project/scripts/storage.mjs';
import { initValidation } from '../project/scripts/validateForm.mjs';
import { initGallery } from '../project/scripts/gallery.mjs';
import { initLightbox } from '../project/scripts/lightbox.mjs';
import { initReviewPage } from '../project/scripts/reviewData.mjs';
import { initEmailForm } from '../project/scripts/emailForm.mjs';
import { setFooterDates } from '../project/scripts/footerDates.mjs';

window.addEventListener('DOMContentLoaded', () => {
    setFooterDates();
    initNavToggle();
    initGallery();
    initLightbox();

    const form = document.getElementById('contact-form');
    if (form) {
        initFormStorage(form);
        initValidation(form);
        initEmailForm();
    }

    if (document.getElementById('review-data')) {
        initReviewPage();
    }
});
