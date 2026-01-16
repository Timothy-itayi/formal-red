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

// --- Text Scramble Logic ---
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
function scrambleText(element) {
    const originalText = element.dataset.text || element.innerText;
    let iteration = 0;
    const interval = setInterval(() => {
        element.innerText = originalText.split('')
            .map((char, index) => {
                if (index < iteration) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        if (iteration >= originalText.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 30);
}

// --- Theme Switching Logic ---
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        if (theme === 'bond') {
            body.style.transition = 'none';
            body.style.filter = 'brightness(3) contrast(2)';
            setTimeout(() => {
                body.style.transition = 'filter 0.5s ease';
                body.style.filter = 'none';
            }, 50);
        }

        body.className = `theme-${theme}`;
        
        if (theme !== '3d') {
            panels.forEach(panel => {
                const img = panel.querySelector('.hero__image');
                const revealCard = panel.querySelector('.hero__reveal-card');
                const popImages = panel.querySelectorAll('.hero__pop-image');
                
                gsap.to(img, { rotationX: 0, rotationY: 0, duration: 0.5 });
                gsap.to(revealCard, { x: 0, y: 0, rotationX: 0, rotationY: 0, opacity: 0, duration: 0.5 });
                popImages.forEach(pop => {
                    gsap.killTweensOf(pop);
                    gsap.to(pop, { x: 0, y: 0, rotation: 0, opacity: 0, duration: 0.5 });
                });
            });
        }
        
        const videos = document.querySelectorAll('.hero__video');
        videos.forEach(v => {
            v.pause();
            v.currentTime = 0;
        });
    });
});

// --- Independent 3D Panel Tilt & Quadrant Reveal (GSAP) ---
panels.forEach((panel, panelIndex) => {
    const img = panel.querySelector('.hero__image');
    const revealCard = panel.querySelector('.hero__reveal-card');
    const popImages = panel.querySelectorAll('.hero__pop-image');
    const shineTexts = panel.querySelectorAll('.shine-text');
    const video = panel.querySelector('.hero__video');
    const videoWrap = panel.querySelector('.hero__video-wrap');
    const scanner = panel.querySelector('.bond-ui__scanner');
    const colorReveal = panel.querySelector('.hero__color-reveal');
    const heroContent = panel.querySelector('.hero__content');
    const heroHeading = panel.querySelector('.hero__heading');
    const heroSubheading = panel.querySelector('.hero__subheading');
    
    // Bond Suit Selection
    let suitIndex = 0;
    const suits = JSON.parse(panel.dataset.suits || '[]');

    panel.addEventListener('mouseenter', () => {
        if (body.classList.contains('theme-ai')) {
            video.play().catch(e => console.log("Auto-play blocked"));
        }
        
        if (body.classList.contains('theme-bond')) {
            // Start video loop for Bond mode
            if (panelIndex === 1) { // Wedding panel
                video.currentTime = 2;
            }
            video.play().catch(e => console.log("Auto-play blocked"));

            // Trigger scramble on all UI text
            panel.querySelectorAll('.scramble-text').forEach(scrambleText);

            // Laser Scan Reveal
            gsap.killTweensOf([scanner, colorReveal, heroContent, videoWrap]);
            
            // Reset positions
            gsap.set(scanner, { top: '0%', opacity: 1 });
            gsap.set([colorReveal, heroContent, videoWrap], { clipPath: 'inset(0 0 100% 0)' });
            
            const tl = gsap.timeline();
            tl.to(scanner, { 
                top: '100%', 
                duration: 4.5, // Decelerated significantly for cinematic timing
                ease: "none" 
            })
            .to([colorReveal, videoWrap], { 
                clipPath: 'inset(0 0 0% 0)', 
                duration: 4.5, 
                ease: "none" 
            }, 0)
            .to(heroContent, {
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.5, 
                ease: "power2.out"
            }, 1.5) // Starts once scanner is well into the panel
            .to(scanner, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.6"); 
        }
    });

    panel.addEventListener('click', () => {
        if (body.classList.contains('theme-bond') && suits.length > 0) {
            suitIndex = (suitIndex + 1) % suits.length;
            
            // Glitch transition for suit change
            gsap.to(img, {
                filter: 'brightness(5) contrast(2) grayscale(1)',
                duration: 0.1,
                onComplete: () => {
                    img.src = suits[suitIndex];
                    colorReveal.querySelector('img').src = suits[suitIndex]; // Update reveal image too
                    gsap.to(img, {
                        filter: 'grayscale(1) contrast(1.1) brightness(0.6)',
                        duration: 0.4
                    });
                }
            });
        }
    });

    panel.addEventListener('mousemove', (e) => {
        if (body.classList.contains('theme-3d')) {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 15;
            const rotateX = ((centerY - y) / centerY) * 15;

            gsap.to(img, { rotationY: rotateY, rotationX: rotateX, duration: 0.4, ease: "power2.out", overwrite: true });
            gsap.to(revealCard, { x: -rotateY * 2, y: rotateX * 2, opacity: 0.6, duration: 0.6, ease: "power2.out", overwrite: true });

            popImages.forEach(pop => {
                const isFront = pop.classList.contains('pop-front');
                const isTop = pop.classList.contains('pop-top');
                let isLeftImage = panelIndex === 0 ? !isFront : isFront;
                const targetXCoord = isLeftImage ? 0 : rect.width;
                const targetYCoord = isTop ? 0 : rect.height;
                const dist = Math.sqrt(Math.pow(x - targetXCoord, 2) + Math.pow(y - targetYCoord, 2));
                const maxDist = rect.width * 0.7; 
                const proximity = Math.max(0, 1 - (dist / maxDist));
                const activeProximity = Math.pow(proximity, 2); 
                const direction = isLeftImage ? -1 : 1;
                const baseMaxPop = isFront ? 240 : 180;
                const maxPop = isTop ? baseMaxPop + 40 : baseMaxPop + 80;
                
                if (activeProximity > 0.05) {
                    gsap.to(pop, { x: direction * (activeProximity * maxPop), y: (isTop ? -1 : 1) * (activeProximity * (isTop ? 80 : 100)), rotation: direction * 10, opacity: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
                } else {
                    gsap.to(pop, { opacity: 0, duration: 0.6, ease: "power2.out", overwrite: "auto" });
                }
            });

            const percentX = (x / rect.width) * 100;
            shineTexts.forEach(text => { text.style.backgroundPosition = `${100 - percentX}% 0`; });
        }
    });

    panel.addEventListener('mouseleave', () => {
        if (body.classList.contains('theme-ai') || body.classList.contains('theme-bond')) {
            video.pause();
            gsap.to(video, { currentTime: 0, duration: 0.5, ease: "power2.inOut" });
        }

        if (body.classList.contains('theme-bond')) {
            gsap.killTweensOf([scanner, colorReveal, heroContent, videoWrap]);
            gsap.to(scanner, { top: '0%', duration: 0.5 });
            gsap.to([colorReveal, heroContent, videoWrap], { clipPath: 'inset(0 0 100% 0)', duration: 0.5 });
        }

        if (body.classList.contains('theme-3d')) {
            gsap.to(img, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
            gsap.to(revealCard, { x: 0, y: 0, opacity: 0, duration: 0.8 });
            popImages.forEach(pop => {
                gsap.to(pop, { opacity: 0, duration: 0.8, ease: "power2.out", overwrite: true, onComplete: () => { gsap.set(pop, { x: 0, y: 0 }); } });
            });
            shineTexts.forEach(text => { text.style.backgroundPosition = `100% 0`; });
        }
    });
});

// --- Global Animation Loop ---
function animate() {
    mouseX += (targetX - mouseX) * 0.1;
    mouseY += (targetY - mouseY) * 0.1;

    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

animate();
document.querySelectorAll('.hero__video').forEach(v => {
    v.pause();
    v.currentTime = 0;
});
