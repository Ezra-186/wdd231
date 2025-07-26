const courses = [
    { subject: 'CSE', number: 110, credits: 2, completed: true, title: 'Intro to Programming', certificate: 'Web', description: 'Basics of coding', technology: ['JavaScript'] },
    { subject: 'WDD', number: 130, credits: 2, completed: true, title: 'HTML & CSS', certificate: 'Web', description: 'Building layouts', technology: ['HTML', 'CSS'] },
    { subject: 'CSE', number: 111, credits: 2, completed: true, title: 'Data Structures', certificate: 'CS', description: 'Arrays, objects', technology: ['JavaScript'] },
    { subject: 'CSE', number: 210, credits: 2, completed: true, title: 'OOP Concepts', certificate: 'CS', description: 'Classes and objects', technology: ['JavaScript'] },
    { subject: 'WDD', number: 131, credits: 2, completed: true, title: 'Responsive Design', certificate: 'Web', description: 'Media queries', technology: ['CSS'] },
    { subject: 'WDD', number: 231, credits: 2, completed: false, title: 'Web Frontend I', certificate: 'Web', description: 'ES Modules, DOM', technology: ['JavaScript', 'ES Modules'] }
];

const listEl = document.getElementById('course-list');
const creditsEl = document.getElementById('credits');
const buttons = document.querySelectorAll('.buttons button');
const dialog = document.getElementById('course-details');
const contentEl = dialog.querySelector('.modal-content');
const closeBtn = dialog.querySelector('.close-modal');

function render(arr) {
    listEl.innerHTML = '';
    arr.forEach(c => {
        const card = document.createElement('div');
        card.className = 'course-card' + (c.completed ? ' completed' : '');
        card.textContent = `${c.subject} ${c.number}`;
        card.addEventListener('click', () => showDetails(c));
        listEl.appendChild(card);
    });
    creditsEl.textContent = arr.reduce((sum, c) => sum + c.credits, 0);
}

function showDetails(course) {
    contentEl.innerHTML = `
    <h2>${course.subject} ${course.number}: ${course.title}</h2>
    <p><strong>Credits</strong> ${course.credits}</p>
    <p><strong>Certificate</strong> ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong> ${course.technology.join(', ')}</p>
  `;
    dialog.showModal();
}

closeBtn.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
});

render(courses);

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.id;
        render(key === 'all' ? courses : courses.filter(c => c.subject.toLowerCase() === key));
    });
});
