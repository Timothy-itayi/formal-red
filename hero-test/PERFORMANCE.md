# Performance Optimization Guide

## Implemented Optimizations

### 1. GSAP quickTo() Method
**Location:** `script.js` - `setupQuickTo()` method

**Why:** GSAP's `quickTo()` is specifically designed for high-frequency updates like mouse tracking. It pre-compiles the animation, resulting in 50-70% better performance than standard `gsap.to()` calls.

**Implementation:**
```javascript
this.quickToFunctions.set(layer, {
    x: gsap.quickTo(layer, 'x', { duration: 0.6, ease: 'power2.out' }),
    y: gsap.quickTo(layer, 'y', { duration: 0.6, ease: 'power2.out' })
});
```

### 2. Conditional will-change Property
**Location:** `styles.css` - `.hero-container.is-interacting`

**Why:** `will-change: transform` tells the browser to optimize for transforms, but it uses extra memory. We only apply it during active interaction.

**Implementation:**
```css
.hero-container.is-interacting .parallax-layer {
    will-change: transform;
}
```

### 3. GPU Acceleration
**Location:** `styles.css` - `.parallax-layer`

**Why:** Forces layers onto the GPU for smooth 60fps animations.

**Implementation:**
```css
.parallax-layer {
    transform: translateZ(0);
    backface-visibility: hidden;
}
```

### 4. Touch Device Detection
**Location:** `script.js` - `init()` method

**Why:** Parallax effects are less effective on mobile and can cause performance issues. We disable them on touch devices.

**Implementation:**
```javascript
if (CONFIG.disableOnTouch && this.isTouch) {
    console.log('Parallax disabled on touch device');
    return;
}
```

### 5. Debounced Resize Handler
**Location:** `script.js` - `handleResize()` method

**Why:** Resize events fire rapidly. We only recalculate center points, which is lightweight.

**Current Implementation:** Direct recalculation (lightweight operation)

**If needed:** Add throttling for more complex resize operations:
```javascript
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => this.handleResize(), 150);
});
```

### 6. Object-fit for Images
**Location:** `styles.css` - `.layer-image`

**Why:** Browser-native image fitting is more performant than JavaScript solutions.

**Implementation:**
```css
.layer-image {
    object-fit: cover; /* or contain for models */
}
```

---

## Performance Testing Checklist

### Chrome DevTools
1. Open DevTools (F12)
2. Go to Performance tab
3. Start recording
4. Move mouse around hero section for 5-10 seconds
5. Stop recording
6. Check:
   - **FPS:** Should be steady at 60fps
   - **GPU usage:** Should show green bars (GPU-accelerated)
   - **Main thread:** Should not show long tasks (>50ms)

### Expected Results
- **Frame rate:** 60fps consistently
- **GPU layers:** 6 layers (3 per side)
- **Memory usage:** <50MB increase during interaction
- **Paint time:** <16ms per frame

### Performance Budget
| Metric | Target | Maximum |
|--------|--------|---------|
| FPS | 60 | 55 |
| First Paint | <100ms | <200ms |
| JS Parse | <50ms | <100ms |
| Total Page Weight | <500KB | <1MB |
| GSAP Library | 50KB | 50KB |

---

## Image Optimization

### Recommended Formats
- **Backgrounds:** WebP (smaller file size, good quality)
- **Models (transparent):** PNG with alpha channel

### Compression Guidelines
```bash
# Background images (WebP)
Target: 100-200KB per image
Quality: 80-85

# Model images (PNG)
Target: 150-300KB per image
Use: TinyPNG or similar compression

# Total hero assets
Target: <1MB combined
```

### Image Dimensions
```
Desktop viewport: 1920x1080 (Full HD)
Backgrounds: 1920x1080px
Models: 800x1080px (portrait orientation)
```

### Lazy Loading (Optional)
If implementing lazy loading for backgrounds:
```html
<img src="placeholder.jpg" data-src="assets/seasonal-bg.webp" class="lazy">
```

---

## Browser Compatibility

### Tested Browsers
- ✅ Chrome 90+ (Excellent)
- ✅ Firefox 88+ (Excellent)
- ✅ Safari 14+ (Good - may have minor timing differences)
- ✅ Edge 90+ (Excellent)

### Fallback Strategy
**No JavaScript:** Static layout, no parallax
**Implementation:** CSS-only layout works without JS

**Old Browsers:** Graceful degradation
```css
@supports not (transform: translateZ(0)) {
    .parallax-layer {
        position: relative;
    }
}
```

---

## Shopify Deployment Considerations

### Asset Hosting
1. **Upload to Shopify CDN:** `Settings > Files > Upload`
2. **Reference in code:** `{{ 'seasonal-bg.webp' | asset_url }}`
3. **Benefits:** Automatic CDN, compression, caching

### GSAP Loading
**Current:** CDN link in `<head>`
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

**Production:** Consider Shopify asset for reliability
1. Download GSAP from CDN
2. Upload to Shopify assets
3. Update script tag: `{{ 'gsap.min.js' | asset_url }}`

### Critical CSS
For Shopify, consider inlining critical CSS:
```liquid
<style>
  /* Critical above-fold styles */
  .hero-container { ... }
</style>
<link rel="stylesheet" href="{{ 'styles.css' | asset_url }}" media="print" onload="this.media='all'">
```

---

## Monitoring & Metrics

### Production Monitoring
Once deployed, monitor:
1. **Google Analytics:** Bounce rate on hero page
2. **PageSpeed Insights:** Overall performance score
3. **Shopify Analytics:** Time on page, engagement

### A/B Testing Recommendations
Test parallax vs static:
- Conversion rate
- Time on page
- Scroll depth
- CTA click-through rate

---

## Troubleshooting

### Issue: Janky/Stuttering Animation
**Solutions:**
1. Reduce `CONFIG.maxMovement` values
2. Increase `CONFIG.duration` to 0.8-1.0
3. Check for heavy CSS (shadows, filters)
4. Verify images are optimized (<200KB each)

### Issue: High CPU Usage
**Solutions:**
1. Verify GPU acceleration: Check DevTools > Rendering > "Layer borders"
2. Reduce number of layers
3. Simplify CSS (remove expensive properties like `filter`, `backdrop-filter`)

### Issue: Mobile Performance
**Solutions:**
1. Ensure `CONFIG.disableOnTouch` is `true`
2. Test on real devices, not just emulators
3. Reduce image sizes for mobile viewports

### Issue: Delayed Initial Load
**Solutions:**
1. Preload hero images: `<link rel="preload" as="image" href="...">`
2. Use loading placeholder
3. Implement progressive image loading (LQIP - Low Quality Image Placeholder)

---

## Future Enhancements

### Potential Optimizations
1. **Intersection Observer:** Only animate when hero is in viewport
2. **RequestAnimationFrame:** Manual RAF loop for even more control
3. **Web Workers:** Offload calculations (overkill for this use case)
4. **Scroll-based fallback:** Alternative interaction for mobile
5. **Adaptive quality:** Reduce animation on lower-end devices

### Advanced Features
1. **Gyroscope support:** Mobile tilt-based parallax
2. **Video backgrounds:** Cinematic alternative to static images
3. **3D transforms:** True depth with CSS 3D or Three.js
4. **WebGL shaders:** Premium effects for high-end devices

