let currentIndex = 0;
const intervalTime = 3000; // 3 Sekunden
let slideInterval;

const slider = document.getElementById('slider');
const container = document.getElementById('main-container');
const slides = document.querySelectorAll('.slide');

// Funktion zum Verschieben
function updateSlider() {
  const offset = -currentIndex * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  updateSlider();
}

function prevSlide() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  updateSlider();
}

// Manuelle Steuerung (stoppt den Timer kurzzeitig)
function manualMove(direction) {
  stopAutoSlide();
  if (direction === 1) nextSlide();
  else prevSlide();
  startAutoSlide();
}

// Timer-Funktionen
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, intervalTime);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Event Listener für "Pause on Hover"
container.addEventListener('mouseenter', stopAutoSlide);
container.addEventListener('mouseleave', startAutoSlide);

// Initialer Start
startAutoSlide();




