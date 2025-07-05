const courses = [
    { subject: 'CSE', number: 110, credits: 2, completed: true },
    { subject: 'WDD', number: 130, credits: 2, completed: true },
    { subject: 'CSE', number: 111, credits: 2, completed: true },
    { subject: 'CSE', number: 210, credits: 2, completed: true },
    { subject: 'WDD', number: 131, credits: 2, completed: true },
    { subject: 'WDD', number: 231, credits: 2, completed: false }
];

const listEl = document.getElementById('course-list');
const creditsEl = document.getElementById('credits');
const buttons = document.querySelectorAll('.buttons button');

function render(arr) {
    listEl.innerHTML = '';
    arr.forEach(c => {
        const card = document.createElement('div');
        card.className = 'course-card' + (c.completed ? ' completed' : '');
        card.textContent = `${c.subject} ${c.number}`;
        listEl.appendChild(card);
    });
    creditsEl.textContent = arr.reduce((sum, c) => sum + c.credits, 0);
}

render(courses);

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.id;
        render(key === 'all'
            ? courses
            : courses.filter(c => c.subject.toLowerCase() === key)
        );
    });
});