let audioUnlocked = false;
const engineSound = new Audio('audio/truck-speeding-up-01.mp3');
let hasPlayed = false;

// 1. Ignition Master System
const startBtn = document.getElementById('start-ignition');
const overlay = document.getElementById('ignition-overlay');

startBtn.addEventListener('click', () => {
    audioUnlocked = true;
    
    // Play roar immediately
    engineSound.volume = 0.6;
    engineSound.play();
    hasPlayed = true;

    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflowY = 'auto';
    }, 1000);
});

// 2. Parallax
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax').forEach(el => {
        const speed = el.getAttribute('data-speed');
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});