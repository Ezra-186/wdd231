import { setFooterDates } from './footer-dates.mjs';
import { initNavToggle } from './nav-toggle.mjs';
import { initGallery } from './gallery.mjs';
import { initLightbox } from './lightbox.mjs';
import { initFormStorage } from './storage.mjs';
import { initValidation } from './validate-form.mjs';
import { initEmailForm } from './email-form.mjs';
import { initReviewPage } from './review-data.mjs';

window.addEventListener('DOMContentLoaded', () => {
  if (typeof setFooterDates === 'function') setFooterDates();
  if (typeof initNavToggle === 'function') initNavToggle();

  const grid = document.querySelector('.grid');
  if (grid) {
    if (typeof initGallery === 'function') initGallery();
    if (typeof initLightbox === 'function') initLightbox();
  }

  const form = document.getElementById('contact-form');
  if (form) {
    if (typeof initFormStorage === 'function') initFormStorage(form);
    if (typeof initValidation === 'function') initValidation(form);
    if (typeof initEmailForm === 'function') initEmailForm();
  }

  if (document.getElementById('review-data')) {
    if (typeof initReviewPage === 'function') initReviewPage();
  }
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const links = document.querySelectorAll('header nav a');

  links.forEach(a => {
    a.classList.remove('cta');
    a.removeAttribute('aria-current');

    const linkURL = new URL(a.getAttribute('href'), location.href);
    const linkPage = (linkURL.pathname.split('/').pop() || 'index.html').toLowerCase();

    if (linkPage === path) {
      a.classList.add('cta');
      a.setAttribute('aria-current', 'page');
    }
  });

  document.getElementById('view-portfolio')?.addEventListener('click', () => {
    location.href = 'gallery.html';
  });
  document.getElementById('book-session')?.addEventListener('click', () => {
    location.href = 'contact.html';
  });

  const f = document.querySelector('link[rel~="icon"]') || document.createElement('link');
  f.rel = 'icon';
  f.href = 'images/favicon.ico?v=3';
  document.head.appendChild(f);

});
