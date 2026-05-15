const canvas = document.getElementById('hero-wave-canvas');
const ctx = canvas.getContext('2d');

let width, height, lfo = 0;
let mouse = { x: -1000, y: -1000 };

// 1. Abfrage für reduzierte Bewegung (einmalig beim Laden)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize() {
    width = canvas.width = window.innerWidth;
    const parent = canvas.parentElement;
    height = canvas.height = parent.offsetHeight;
}

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

function draw() {
    // 2. Prüfung: Wenn User keine Animation will, brechen wir hier ab
    if (prefersReducedMotion) return; 

    ctx.clearRect(0, 0, width, height);
    
    drawWave(30, 'rgba(74, 222, 128, 0.4)', 0.01, 0.02);
    drawWave(15, 'rgba(74, 222, 128, 0.15)', 0.015, 0.01);
    
    // 3. LFO mit Modulo zurücksetzen, um unendlich hohe Werte zu vermeiden
    lfo = (lfo + 0.015) % (Math.PI * 2);
    
    requestAnimationFrame(draw);
}

function drawWave(amplitude, color, freq, speedOffset) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;

    for (let i = 0; i <= width; i += 5) {
        let waveY = height / 2 + Math.sin(i * freq + lfo + speedOffset) * amplitude;
        
        let dx = i - mouse.x;
        let dy = waveY - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            let push = (150 - distance) * 0.4;
            waveY -= (mouse.y - waveY) > 0 ? -push : push;
        }

        if (i === 0) ctx.moveTo(i, waveY);
        else ctx.lineTo(i, waveY);
    }
    ctx.stroke();
}

window.addEventListener('resize', resize);
resize();
draw();