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