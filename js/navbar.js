document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');

    // Hilfsfunktion zum Schließen des Menüs
    const closeMobileMenu = () => {
        navWrapper.classList.remove('active');
        header.classList.remove('is-menu-open'); 
        navToggle.setAttribute('aria-expanded', 'false');
        
        // --- LOCK ENTFERNEN ---
        body.style.overflow = ''; 
        body.style.height = ''; 
        
        document.querySelectorAll('.has-dropdown').forEach(p => p.classList.remove('is-open'));
    };

    // --- 1. BURGER MENU TOGGLE ---
    if (navToggle && navWrapper) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            const nextState = !isExpanded;

            navToggle.setAttribute('aria-expanded', nextState);
            navWrapper.classList.toggle('active', nextState);
            header.classList.toggle('is-menu-open', nextState);
            
            // --- LOCK SETZEN/ENTFERNEN ---
            if (nextState) {
                body.style.overflow = 'hidden'; // Verhindert Scrollen
                body.style.height = '100vh';    // Fixiert die Höhe auf Viewport
            } else {
                body.style.overflow = '';
                body.style.height = '';
            }
        });
    }

    // --- 2. SCROLL EFFECT ---
    window.addEventListener('scroll', () => {
        header.classList.toggle('is-scrolled', window.scrollY > 50);
    }, { passive: true });

    // --- 3. SEAMLESS HOVER ANIMATION ---
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const isLeft = x < rect.width / 2;
            link.classList.toggle('origin-left', isLeft);
            link.classList.toggle('origin-right', !isLeft);
        });

        link.addEventListener('mouseleave', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const exitsRight = x > rect.width / 2;
            link.classList.toggle('origin-right', exitsRight);
            link.classList.toggle('origin-left', !exitsRight);
        });
    });

    // --- 4. MOBILE DROPDOWN TOGGLE ---
    const dropdownItems = document.querySelectorAll('.has-dropdown > .nav-link');
    dropdownItems.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const parent = link.parentElement;
                const isOpen = parent.classList.contains('is-open');

                document.querySelectorAll('.has-dropdown').forEach(p => {
                    if (p !== parent) p.classList.remove('is-open');
                    p.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
                });

                parent.classList.toggle('is-open');
                link.setAttribute('aria-expanded', !isOpen);
            }
        });
    });

    // --- 5. CLOSE ON RESIZE ---
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMobileMenu();
        }
    });

    // --- 6. CLOSE ON LINK CLICK ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const isDropdownTrigger = link.parentElement.classList.contains('has-dropdown');
            
            // Wenn es kein Dropdown ist ODER wir auf Desktop sind -> Menü schließen & Scroll freigeben
            if (!isDropdownTrigger || window.innerWidth > 1024) {
                closeMobileMenu();
            }
        });
    });
});
