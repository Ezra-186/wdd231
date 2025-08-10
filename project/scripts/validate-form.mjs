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
