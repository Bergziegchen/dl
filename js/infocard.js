const visual = document.getElementById("visual");
const cursorBtn = document.getElementById("cursorBtn");
const heroImage = document.getElementById("heroImage");
const card = document.getElementById("card");

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

const images = [
    "img/kompensatoren.jpg",
    "img/kulissenschalldaempfer.jpg",
    "img/rohrschalldaempfer.jpg"
];

let currentIndex = 0;

/* ========================= */
/* Mouse Follow */
/* ========================= */

visual.addEventListener("mousemove", (e) => {
    const rect = visual.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

function animate() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;

    cursorBtn.style.left = posX + "px";
    cursorBtn.style.top = posY + "px";

    requestAnimationFrame(animate);
}
animate();

/* ========================= */
/* Smooth Card Height Change */
/* ========================= */

function animateCardHeight() {
    const startHeight = card.offsetHeight;

    // kurz auf auto setzen um neue Höhe zu messen
    card.style.height = "auto";
    const endHeight = card.scrollHeight;

    // zurück auf Startwert
    card.style.height = startHeight + "px";

    // Reflow triggern
    card.offsetHeight;

    // neue Höhe setzen (Transition greift)
    card.style.height = endHeight + "px";

    // nach Animation wieder auto setzen
    setTimeout(() => {
        card.style.height = "auto";
    }, 400);
}

/* ========================= */
/* Image Switch */
/* ========================= */

visual.addEventListener("click", () => {

    currentIndex = (currentIndex + 1) % images.length;

    heroImage.style.opacity = 0;

    setTimeout(() => {
        heroImage.src = images[currentIndex];
        heroImage.style.opacity = 1;

        // Height Animation auslösen
        animateCardHeight();

    }, 200);
});

/* ========================= */
/* Touch deaktivieren */
/* ========================= */

if (window.matchMedia("(hover: none)").matches) {
    cursorBtn.style.display = "none";
}