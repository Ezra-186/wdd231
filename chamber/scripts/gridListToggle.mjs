export function initViewToggle() {
    const gridBtn = document.querySelector('#grid');
    const listBtn = document.querySelector('#list');
    const membersEl = document.querySelector('#members');
    if (!gridBtn || !listBtn || !membersEl) return;
    gridBtn.addEventListener('click', () =>
        membersEl.classList.replace('list', 'grid')
    );
    listBtn.addEventListener('click', () =>
        membersEl.classList.replace('grid', 'list')
    );
  }