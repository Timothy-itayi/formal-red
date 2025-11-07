# Parallax Hero Section Prototype

A mouse-based parallax effect for F.R Clothiers hero section with multi-layer depth effects.

## Features

- **Mouse-driven parallax:** Smooth layer movement following cursor position
- **Multi-layer depth:** 3 layers per side with different movement speeds
- **50/50 Split layout:** SEASONAL (left) and WEDDINGS (right)
- **Performance optimized:** 60fps with GSAP quickTo() and GPU acceleration
- **Responsive:** Touch device detection with graceful degradation
- **Shopify-ready:** Easy integration with Shopify themes

## Quick Start

### 1. Prepare Your Assets

Create and place these images in the `assets/` folder:

```
assets/
├── seasonal-bg.webp        # Background for brown suit (1920x1080)
├── seasonal-model.png      # Model in brown suit, transparent PNG (800x1080)
├── weddings-bg.webp        # Background for tuxedo (1920x1080)
└── weddings-model.png      # Model in tuxedo, transparent PNG (800x1080)
```

**Asset Preparation Steps:**
1. Extract models from original photos (remove backgrounds)
2. Save models as transparent PNGs
3. Generate/design studio backgrounds (use AI tools like Midjourney, DALL-E)
4. Compress images:
   - Backgrounds: WebP at 80-85 quality
   - Models: PNG with TinyPNG compression

### 2. Open in Browser

Simply open `index.html` in a modern web browser:
```bash
open index.html
# or
python3 -m http.server 8000  # then visit http://localhost:8000
```

### 3. Test the Effect

Move your mouse around the hero section and observe:
- Backgrounds move slowest (subtle depth)
- Models move at medium speed (natural feel)
- Text moves fastest (dynamic emphasis)

## File Structure

```
hero-test/
├── index.html              # HTML structure
├── styles.css              # All styling and layout
├── script.js               # Parallax logic with GSAP
├── PERFORMANCE.md          # Performance optimization guide
├── README.md               # This file
└── assets/                 # Image assets (you provide)
    ├── seasonal-bg.webp
    ├── seasonal-model.png
    ├── weddings-bg.webp
    └── weddings-model.png
```

## Configuration

Edit `script.js` to customize parallax behavior:

```javascript
const CONFIG = {
    maxMovement: {
        background: 8,   // Background layer movement (px)
        model: 15,       // Model layer movement (px)
        text: 20         // Text layer movement (px)
    },
    ease: 'power2.out',      // GSAP easing function
    duration: 0.6,           // Animation duration (seconds)
    disableOnTouch: true     // Disable on mobile/touch devices
};
```

### Animation Intensity Guide

**Subtle (Professional):**
```javascript
maxMovement: { background: 5, model: 10, text: 15 }
duration: 0.8
```

**Moderate (Current):**
```javascript
maxMovement: { background: 8, model: 15, text: 20 }
duration: 0.6
```

**Bold (Dramatic):**
```javascript
maxMovement: { background: 12, model: 25, text: 35 }
duration: 0.4
```

## Testing Checklist

### Visual Testing
- [ ] Both sides (SEASONAL/WEDDINGS) display correctly
- [ ] Images load without errors (check console)
- [ ] Text is readable and positioned correctly
- [ ] Layout is symmetrical and balanced

### Interaction Testing
- [ ] Mouse movement triggers parallax effect
- [ ] Layers move at different speeds (background slowest, text fastest)
- [ ] Animation is smooth without stuttering
- [ ] Layers reset to center when mouse leaves area
- [ ] Effect disables on touch devices (test on phone/tablet)

### Performance Testing
- [ ] Open Chrome DevTools > Performance
- [ ] Record 5-10 seconds of mouse movement
- [ ] Verify 60fps frame rate (see green line at top)
- [ ] Check GPU acceleration (Rendering > Layer Borders)
- [ ] Monitor memory usage (<50MB increase)

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Responsive Testing
- [ ] Desktop (1920px, 1440px, 1280px widths)
- [ ] Laptop (1024px)
- [ ] Tablet (768px - should stack vertically)
- [ ] Mobile (375px - parallax disabled)

## Troubleshooting

### Images Not Showing
**Problem:** Console shows 404 errors for images  
**Solution:** 
1. Verify image files exist in `assets/` folder
2. Check file names match exactly (case-sensitive)
3. Ensure proper file extensions (.webp, .png)

### Janky/Stuttering Animation
**Problem:** Animation is not smooth  
**Solution:**
1. Open DevTools > Performance > Check FPS
2. Reduce `maxMovement` values in CONFIG
3. Compress images (should be <200KB each)
4. Check for other CPU-intensive processes

### Parallax Not Working
**Problem:** Layers don't move with mouse  
**Solution:**
1. Check browser console for JavaScript errors
2. Verify GSAP loaded (check Network tab)
3. Ensure you're not on a touch device (or set `disableOnTouch: false`)
4. Test in a different browser

### Text Not Visible
**Problem:** "SEASONAL" or "WEDDINGS" text is missing  
**Solution:**
1. Check if text color contrasts with background
2. Verify z-index in CSS (text should be highest)
3. Inspect element to see if text exists in DOM

## Shopify Integration

### Step 1: Prepare Assets
Upload all images to Shopify:
1. Go to: Settings > Files
2. Upload `seasonal-bg.webp`, `seasonal-model.png`, etc.
3. Copy the URLs Shopify provides

### Step 2: Create Custom Section
Create a new section file in your theme:
1. Theme > Edit Code
2. Add new section: `hero-parallax.liquid`
3. Paste HTML from `index.html`

### Step 3: Update Image URLs
Replace local paths with Shopify URLs:
```liquid
<img src="{{ 'seasonal-bg.webp' | asset_url }}" alt="Seasonal background">
```

### Step 4: Add CSS & JS
Option A: Theme.liquid (Global)
```liquid
{{ 'hero-parallax.css' | asset_url | stylesheet_tag }}
<script src="{{ 'gsap.min.js' | asset_url }}"></script>
<script src="{{ 'hero-parallax.js' | asset_url }}"></script>
```

Option B: Section-specific (Recommended)
```liquid
{% stylesheet %}
  /* Inline CSS here */
{% endstylesheet %}

{% javascript %}
  /* Inline JS here */
{% endjavascript %}
```

### Step 5: Add to Homepage
1. Customize theme
2. Add section: "Hero Parallax"
3. Configure content via schema (if implemented)

### Optional: Add Schema Settings
Allow client to customize via theme editor:
```liquid
{% schema %}
{
  "name": "Hero Parallax",
  "settings": [
    {
      "type": "image_picker",
      "id": "seasonal_bg",
      "label": "Seasonal Background"
    },
    {
      "type": "text",
      "id": "seasonal_text",
      "label": "Seasonal Text",
      "default": "SEASONAL"
    }
  ]
}
{% endschema %}
```

## Performance Metrics

**Target Performance:**
- Frame Rate: 60fps
- First Paint: <200ms
- Total Weight: <1MB
- Interaction Ready: <300ms

**Optimizations Included:**
- GSAP quickTo() for efficient updates
- GPU acceleration with translateZ
- Conditional will-change property
- Touch device detection
- Lazy image loading ready

See `PERFORMANCE.md` for detailed optimization guide.

## Customization Ideas

### Alternative Layouts
1. **Single hero with foreground/background split**
2. **Diagonal split instead of vertical**
3. **Circular reveal on hover**

### Additional Effects
1. **Scroll-based parallax** (for mobile support)
2. **Color tint overlays** (brand colors)
3. **Animated text reveals** (fade in, slide up)
4. **Hover scale effects** on models

### Enhanced Interactions
1. **Click to view details** (product info overlay)
2. **Category navigation** (arrow buttons)
3. **Video backgrounds** instead of static images

## Support & Resources

**GSAP Documentation:**  
https://greensock.com/docs/

**Shopify Theme Development:**  
https://shopify.dev/themes

**Image Optimization Tools:**
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- WebP Converter: https://cloudconvert.com/

**AI Background Generation:**
- Midjourney: https://midjourney.com/
- DALL-E: https://openai.com/dall-e-3
- Stable Diffusion: https://stability.ai/

## Next Steps

1. ✅ Review prototype functionality
2. ⏳ Prepare layered assets (backgrounds + models)
3. ⏳ Test with real assets
4. ⏳ Adjust movement intensity if needed
5. ⏳ Integrate into Shopify theme
6. ⏳ A/B test against current hero
7. ⏳ Monitor performance and engagement

## Credits

Built for F.R Clothiers  
Technology: GSAP, Vanilla JavaScript, CSS Grid  
Performance: 60fps target with GPU acceleration

