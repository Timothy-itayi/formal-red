/**
 * Parallax Hero Section with Mouse Tracking
 * Uses GSAP for smooth animations
 */

// Configuration
const CONFIG = {
    // Movement range in pixels
    maxMovement: {
        background: 8,   // 5-8px as per spec
        model: 15,       // 10-15px as per spec
        text: 20         // 15-20px as per spec
    },
    // Animation easing
    ease: 'power2.out',
    // Animation duration
    duration: 0.6,
    // Disable on touch devices
    disableOnTouch: true
};

class ParallaxHero {
    constructor() {
        this.container = document.querySelector('.hero-container');
        this.layers = document.querySelectorAll('.parallax-layer');
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
        this.quickToFunctions = new Map();
        
        this.init();
    }

    init() {
        // Skip initialization on touch devices if configured
        if (CONFIG.disableOnTouch && this.isTouch) {
            console.log('Parallax disabled on touch device');
            return;
        }

        // Create quickTo functions for each layer for better performance
        this.setupQuickTo();
        
        // Bind event listeners
        this.bindEvents();
        
        console.log('Parallax hero initialized');
    }

    setupQuickTo() {
        // GSAP's quickTo provides the most performant way to animate repeatedly
        this.layers.forEach((layer) => {
            const speed = parseFloat(layer.dataset.speed) || 1;
            
            // Create quickTo functions for x and y transforms
            this.quickToFunctions.set(layer, {
                x: gsap.quickTo(layer, 'x', {
                    duration: CONFIG.duration,
                    ease: CONFIG.ease
                }),
                y: gsap.quickTo(layer, 'y', {
                    duration: CONFIG.duration,
                    ease: CONFIG.ease
                }),
                speed: speed
            });
        });
    }

    bindEvents() {
        // Mouse move event
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Update center point on resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Add interaction class for will-change optimization
        this.container.addEventListener('mouseenter', () => {
            this.container.classList.add('is-interacting');
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.container.classList.remove('is-interacting');
            this.resetLayers();
        });
    }

    handleMouseMove(event) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        
        // Calculate offset from center (-1 to 1 range)
        const xOffset = (this.mouseX - this.centerX) / this.centerX;
        const yOffset = (this.mouseY - this.centerY) / this.centerY;
        
        // Update all layers
        this.updateLayers(xOffset, yOffset);
    }

    updateLayers(xOffset, yOffset) {
        this.quickToFunctions.forEach((functions, layer) => {
            const { x, y, speed } = functions;
            
            // Determine max movement based on layer type
            let maxMove;
            if (layer.classList.contains('parallax-layer--bg')) {
                maxMove = CONFIG.maxMovement.background;
            } else if (layer.classList.contains('parallax-layer--model')) {
                maxMove = CONFIG.maxMovement.model;
            } else if (layer.classList.contains('parallax-layer--text')) {
                maxMove = CONFIG.maxMovement.text;
            } else {
                maxMove = CONFIG.maxMovement.model; // Default
            }
            
            // Calculate movement with speed multiplier
            const moveX = xOffset * maxMove * speed;
            const moveY = yOffset * maxMove * speed;
            
            // Apply transforms using quickTo for performance
            x(moveX);
            y(moveY);
        });
    }

    resetLayers() {
        // Smoothly return all layers to center position
        this.quickToFunctions.forEach((functions) => {
            functions.x(0);
            functions.y(0);
        });
    }

    handleResize() {
        // Recalculate center point
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
    }

    destroy() {
        // Cleanup method for removing event listeners
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('resize', this.handleResize);
        this.quickToFunctions.clear();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParallaxHero();
    });
} else {
    // DOM is already ready
    new ParallaxHero();
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParallaxHero;
}

