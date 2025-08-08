import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } from './config.mjs';

export function initEmailForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    emailjs.init(EMAILJS_USER_ID);

    form.addEventListener('submit', async (e) => {
        if (e.defaultPrevented) return;
        e.preventDefault();

        const fd = new FormData(form);
        const services = fd.getAll('Reason').join(', ');
        const data = Object.fromEntries(fd.entries());
        data.Reason = services;

        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
            location.href = `review.html?${new URLSearchParams(data)}`;
        } catch (_) {
            alert('An error occurred sending your message.');
        }
    });
}
