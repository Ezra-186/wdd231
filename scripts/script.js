
document.addEventListener('DOMContentLoaded', () => {
    // 1) Hamburger Toggle
    const menuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav-links');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });
    }


    // 2) Gallery & Filters
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
        { id: 11, category: 'Groomsmen', title: 'Groomsmen', src: 'images/Website_27.webp' },
        { id: 12, category: 'Groomsmen', title: 'Groomsmen', src: 'images/Website_28.webp' },
        { id: 13, category: 'Engagements', title: 'Engagements', src: 'images/Website_24.webp' },
        { id: 14, category: 'Family Portraits', title: 'Family Portraits', src: 'images/Website_33.webp' },
        { id: 15, category: 'Weddings', title: 'Weddings', src: 'images/Website_2.webp' },
        { id: 16, category: 'Family Portraits', title: 'Family Portraits', src: 'images/Website_22.jpg' },
        { id: 17, category: 'Engagements', title: 'Engagements', src: 'images/Website_36.webp' },
        { id: 18, category: 'Weddings', title: 'Weddings', src: 'images/Website_16.webp' },
        { id: 19, category: 'Weddings', title: 'Weddings', src: 'images/Website_20.webp' },
        { id: 20, category: 'Bridesmaids', title: 'Bridesmaids', src: 'images/Website_9.webp' },
        { id: 21, category: 'Engagements', title: 'Engagements', src: 'images/Website_8.webp' },
        { id: 22, category: 'Weddings', title: 'Weddings', src: 'images/Website_37.webp' },
        { id: 23, category: 'Weddings', title: 'Weddings', src: 'images/Website_31.jpg' },
        { id: 24, category: 'Weddings', title: 'Weddings', src: 'images/Website_18.webp' },
        { id: 25, category: 'Family Portraits', title: 'Family Portraits', src: 'images/Website_25.webp' },
        { id: 26, category: 'Weddings', title: 'Weddings', src: 'images/Website_32.webp' },
        { id: 27, category: 'Weddings', title: 'Weddings', src: 'images/Website_14.webp' },
        
        
    ];

    const galleryContainer = document.querySelector('.grid');
    const filtersContainer = document.querySelector('.filters');
    const filterButtons = document.querySelectorAll('.filters button');

    function renderGallery(items) {
        if (!galleryContainer) return;
        galleryContainer.innerHTML = '';
        items.forEach(item => {
            const thumb = document.createElement('div');
            thumb.className = 'thumb';
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.title;
            img.loading = 'lazy';
            thumb.appendChild(img);
            galleryContainer.appendChild(thumb);
        });
    }

    function applyFilter(filter) {
        const items = filter === 'all'
            ? galleryData
            : galleryData.filter(item => item.category === filter);
        renderGallery(items);
    }

    if (filtersContainer) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilter(btn.getAttribute('data-filter'));
            });
        });
        applyFilter('all');
    } else if (galleryContainer) {
        renderGallery(galleryData.slice(0, 6));
    }

    // 3) Last-Updated Timestamp
    const updatedEl = document.getElementById('last-updated');
    if (updatedEl) {
        updatedEl.textContent = `Last updated: ${new Date().toLocaleString()}`;
    }

    // 4) Lightbox
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox__img');
        const lightboxCaption = lightbox.querySelector('.lightbox__caption');
        const lightboxClose = lightbox.querySelector('.lightbox__close');
        lightboxImg.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

        document.body.addEventListener('click', e => {
            if (e.target.matches('.thumb img')) {
                lightboxImg.src = e.target.src;
                lightboxImg.alt = e.target.alt;
                lightboxCaption.textContent = e.target.alt;
                lightbox.classList.add('active');
            }
        });

        lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }
    
    // 5) Contact Form Validation
    const form = document.getElementById('contact-form');
    if (form) {
        const nameEl = document.getElementById('name');
        const emailEl = document.getElementById('email');
        const dateEl = document.getElementById('event-date');   
        const toggleGroup = document.querySelector('.toggle-group'); 
        const serviceEls = Array.from(document.querySelectorAll('input[name="Reason"]'));

        form.addEventListener('submit', e => {
            let valid = true;

            [nameEl, emailEl, dateEl].forEach(el => el.classList.remove('error'));
            toggleGroup.classList.remove('invalid');

            if (!nameEl.value.trim()) {
                nameEl.classList.add('error');
                valid = false;
            }

            const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
            if (!emailEl.value.trim() || !emailPattern.test(emailEl.value)) {
                emailEl.classList.add('error');
                valid = false;
            }

            if (!serviceEls.some(cb => cb.checked)) {
                toggleGroup.classList.add('invalid');
                valid = false;
            }

            if (!dateEl.value) {
                dateEl.classList.add('error');
                valid = false;
            }

            if (!valid) {
                e.preventDefault();
                const firstError = document.querySelector('.error, .invalid');
                if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        // 6) Clear errors
        nameEl.addEventListener('input', () => nameEl.classList.remove('error'));
        emailEl.addEventListener('input', () => emailEl.classList.remove('error'));
        dateEl.addEventListener('change', () => dateEl.classList.remove('error'));
        serviceEls.forEach(cb =>
            cb.addEventListener('change', () => toggleGroup.classList.remove('invalid'))
        );

        ['Name', 'Email', 'Reason', 'EventDate', 'Subject', 'Message'].forEach(key => {
            const saved = localStorage.getItem(key);
            if (!saved) return;
            const el = form.elements[key];
            if (!el) return;

            if (el.type === 'checkbox') {
                JSON.parse(saved).forEach(val => {
                    const cb = form.querySelector(`input[name="Reason"][value="${val}"]`);
                    if (cb) cb.checked = true;
                });
            } else {
                el.value = saved;
            }
        });

        form.addEventListener('input', e => {
            const { name, type, value } = e.target;
            if (!name) return;

            if (type === 'checkbox') {
                const checked = Array.from(
                    form.querySelectorAll('input[name="Reason"]:checked')
                ).map(cb => cb.value);
                localStorage.setItem('Reason', JSON.stringify(checked));
            } else {
                localStorage.setItem(name, value);
            }
        });

        form.addEventListener('submit', () => {
            ['Name','Email','Reason','EventDate','Subject','Message']
              .forEach(key => localStorage.removeItem(key));
          });
    }
    
    const reviewContainer = document.getElementById('review-data');
    if (reviewContainer) {
        const params = new URLSearchParams(window.location.search);

        ['Name', 'Email'].forEach(key => {
            const value = params.get(key) || '(none)';
            const div = document.createElement('div');
            div.className = 'form-group';
            div.innerHTML = `
      <label>${key}</label>
      <div class="value">${value.replace(/\n/g, '<br>')}</div>`;
            reviewContainer.appendChild(div);
        });

        const services = params.getAll('Reason');
        const svcDiv = document.createElement('div');
        svcDiv.className = 'form-group';
        svcDiv.innerHTML = `
    <label>Services Selected:</label>
    <div class="value">${services.length ? services.join(', ') : '(none)'}</div>`;
        reviewContainer.appendChild(svcDiv);

        const rawDate = params.get('EventDate');
        const formattedDate = rawDate
            ? new Date(rawDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })
            : '(none)';
        const dateDiv = document.createElement('div');
        dateDiv.className = 'form-group';
        dateDiv.innerHTML = `
    <label>Event Date:</label>
    <div class="value">${formattedDate}</div>`;
        reviewContainer.appendChild(dateDiv);

        ['Subject', 'Message'].forEach(key => {
            const value = params.get(key) || '(none)';
            const div = document.createElement('div');
            div.className = 'form-group';
            div.innerHTML = `
      <label>${key}</label>
      <div class="value">${value.replace(/\n/g, '<br>')}</div>`;
            reviewContainer.appendChild(div);
        });
    }
});





