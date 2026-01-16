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
        
        // Reset 3D transforms when switching away
        if (theme !== '3d') {
            panels.forEach(panel => {
                const img = panel.querySelector('.hero__image');
                const revealCard = panel.querySelector('.hero__reveal-card');
                const popImages = panel.querySelectorAll('.hero__pop-image');
                
                gsap.to(img, { rotationX: 0, rotationY: 0, duration: 0.5 });
                gsap.to(revealCard, { x: 0, y: 0, rotationX: 0, rotationY: 0, opacity: 0, duration: 0.5 });
                popImages.forEach(pop => {
                    gsap.killTweensOf(pop); // Stop any ongoing fade-outs
                    gsap.to(pop, { x: 0, y: 0, rotation: 0, opacity: 0, duration: 0.5 });
                });
            });
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

// --- Independent 3D Panel Tilt & Quadrant Reveal (GSAP) ---
panels.forEach((panel, panelIndex) => {
    const img = panel.querySelector('.hero__image');
    const revealCard = panel.querySelector('.hero__reveal-card');
    const popImages = panel.querySelectorAll('.hero__pop-image');
    const shineTexts = panel.querySelectorAll('.shine-text');
    
    panel.addEventListener('mousemove', (e) => {
        if (!body.classList.contains('theme-3d')) return;

        const rect = panel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 15;
        const rotateX = ((centerY - y) / centerY) * 15;

        // Main image tilt
        gsap.to(img, {
            rotationY: rotateY,
            rotationX: rotateX,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true
        });

        // Reveal card parallax
        gsap.to(revealCard, {
            x: -rotateY * 2,
            y: rotateX * 2,
            opacity: 0.6,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true
        });

        // --- Proximity Based Pop-out (Individual Triggering) ---
        popImages.forEach(pop => {
            const isFront = pop.classList.contains('pop-front');
            const isTop = pop.classList.contains('pop-top');
            
            let isLeftImage = false;
            if (panelIndex === 0) isLeftImage = !isFront;
            else isLeftImage = isFront;

            const targetXCoord = isLeftImage ? 0 : rect.width;
            const targetYCoord = isTop ? 0 : rect.height;

            const dist = Math.sqrt(Math.pow(x - targetXCoord, 2) + Math.pow(y - targetYCoord, 2));
            const maxDist = rect.width * 0.7; 
            
            const proximity = Math.max(0, 1 - (dist / maxDist));
            const activeProximity = Math.pow(proximity, 2); 

            const direction = isLeftImage ? -1 : 1;
            const baseMaxPop = isFront ? 240 : 180;
            const maxPop = isTop ? baseMaxPop + 40 : baseMaxPop + 80;
            
            // Only move if we are NOT in a fade-out sequence
            if (activeProximity > 0.05) {
                gsap.to(pop, {
                    x: direction * (activeProximity * maxPop),
                    y: (isTop ? -1 : 1) * (activeProximity * (isTop ? 80 : 100)),
                    rotation: direction * 10,
                    opacity: 1,
                    duration: 0.25, // Snappier entry
                    ease: "power2.out",
                    overwrite: "auto"
                });
            } else {
                // If moving away from a corner but still over the panel, fade out
                gsap.to(pop, {
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }
        });

        const percentX = (x / rect.width) * 100;
        shineTexts.forEach(text => {
            text.style.backgroundPosition = `${100 - percentX}% 0`;
        });
    });

    panel.addEventListener('mouseleave', () => {
        if (!body.classList.contains('theme-3d')) return;

        gsap.to(img, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        gsap.to(revealCard, { x: 0, y: 0, opacity: 0, duration: 0.8 });
        
        popImages.forEach(pop => {
            // Hard fade out on exit
            gsap.to(pop, { 
                opacity: 0, 
                duration: 0.8, 
                ease: "power2.out",
                overwrite: true,
                onComplete: () => {
                    gsap.set(pop, { x: 0, y: 0 }); 
                }
            });
        });

        shineTexts.forEach(text => { text.style.backgroundPosition = `100% 0`; });
    });
});

// --- Global Animation Loop ---
function animate() {
    mouseX += (targetX - mouseX) * 0.1;
    mouseY += (targetY - mouseY) * 0.1;

    if (body.classList.contains('theme-bond')) {
        const centerX = window.innerWidth / 2;
        const moveX = (targetX - centerX) / 50;
        panels.forEach((panel, index) => {
            const img = panel.querySelector('.hero__image');
            const depth = index === 0 ? 1 : -1;
            img.style.transform = `scale(1.1) translateX(${moveX * depth}px)`;
        });
    }

    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

animate();
document.querySelectorAll('.hero__video').forEach(v => v.pause());
