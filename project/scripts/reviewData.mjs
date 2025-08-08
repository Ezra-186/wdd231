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