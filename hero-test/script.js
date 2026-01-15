/**
 * FR Clothiers - Design Iterations Controller
 * "Luxury doesn't scream, it whispers."
 */

const body = document.body;
const spotlight = document.getElementById('spotlight');
const heroInner = document.querySelector('.hero__inner');
const panels = document.querySelectorAll('.hero__panel');
const themeBtns = document.querySelectorAll('.theme-btn');

// Performance optimized mouse tracking
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

// --- Theme Switching Logic ---
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        
        // Update UI
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Add transition flash for Bond switch
        if (theme === 'bond') {
            body.style.transition = 'none';
            body.style.filter = 'brightness(3) contrast(2)';
            setTimeout(() => {
                body.style.transition = 'filter 0.5s ease';
                body.style.filter = 'none';
            }, 50);
        }

        // Switch Theme
        body.className = `theme-${theme}`;
        
        // Reset specific theme states
        if (theme !== '3d') {
            heroInner.style.transform = 'none';
        }
        
        // Handle Video Playback for AI Mode
        const videos = document.querySelectorAll('.hero__video');
        if (theme === 'ai') {
            videos.forEach(v => {
                v.play().catch(e => console.log("Video play blocked until user interaction"));
            });
        } else {
            videos.forEach(v => v.pause());
        }
    });
});

// --- Animation Loop ---
function animate() {
    // Smoothing (Interpolation)
    mouseX += (targetX - mouseX) * 0.1;
    mouseY += (targetY - mouseY) * 0.1;

    // 1. Experience Parallax Logic
    if (body.classList.contains('theme-bond')) {
        const centerX = window.innerWidth / 2;
        const moveX = (targetX - centerX) / 50;
        panels.forEach((panel, index) => {
            const img = panel.querySelector('.hero__image');
            const depth = index === 0 ? 1 : -1;
            img.style.transform = `scale(1.1) translateX(${moveX * depth}px)`;
        });
    }

    // 2. 3D Tilt Logic
    if (body.classList.contains('theme-3d')) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (mouseX - centerX) / (window.innerWidth / 20);
        const moveY = (centerY - mouseY) / (window.innerHeight / 20);
        
        heroInner.style.transform = `rotateY(${moveX}deg) rotateX(${moveY}deg)`;
    }

    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

animate();

// Panel Hovers
panels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
        if (body.classList.contains('theme-bond')) {
            // Additional Bond interaction can go here
        }
    });
});

// Initial setup: Pause videos
document.querySelectorAll('.hero__video').forEach(v => v.pause());
