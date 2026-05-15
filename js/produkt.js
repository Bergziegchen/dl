document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('dlLightbox');
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = document.querySelector('.dl-lightbox-close');

    // Alle Visual-Container finden
    const cards = document.querySelectorAll('.dl-card-visual');

    cards.forEach(card => {
        card.style.cursor = 'zoom-in'; // Cursor-Feedback

        card.addEventListener('click', function() {
            // Finde das Bild innerhalb der geklickten Karte
            const originalImg = this.querySelector('img');
            
            if (originalImg) {
                lightboxImg.src = originalImg.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Scrollen verhindern
            }
        });
    });

    // Schließen-Logik
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Scrollen wieder erlauben
        setTimeout(() => { lightboxImg.src = ''; }, 300); // Reset nach Animation
    };

    lightbox.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    
    // Mit ESC-Taste schließen
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeLightbox();
    });
});