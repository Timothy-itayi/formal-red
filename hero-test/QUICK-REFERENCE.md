# Quick Reference Card - Parallax Hero Prototype

> One-page overview for fast reference

---

## 🎯 Project Status

| Item | Status | Action |
|------|--------|--------|
| Code Implementation | ✅ Complete | None |
| Documentation | ✅ Complete | Read guides |
| Assets | ⏳ Pending | Prepare 4 images |
| Testing | ⏳ Ready | Test after assets |
| Shopify Integration | ⏳ Ready | After testing |

---

## 📦 Required Assets

```
assets/
├── seasonal-bg.webp        (1920x1080, 100-200KB)
├── seasonal-model.png      (800x1080, 150-300KB, transparent)
├── weddings-bg.webp        (1920x1080, 100-200KB)
└── weddings-model.png      (800x1080, 150-300KB, transparent)
```

**See:** ASSETS-GUIDE.md for preparation steps

---

## 🚀 Quick Start

```bash
# 1. Add assets to folder
mkdir -p assets/
# Place your 4 images in assets/

# 2. Open in browser
open index.html

# OR start local server
python3 -m http.server 8000
# Visit: http://localhost:8000

# 3. Test mouse movement
# Move cursor around hero section
# Observe layered parallax effect
```

---

## ⚙️ Configuration

**File:** `script.js` (lines 11-19)

```javascript
const CONFIG = {
    maxMovement: {
        background: 8,   // Background movement (px)
        model: 15,       // Model movement (px)
        text: 20         // Text movement (px)
    },
    ease: 'power2.out',      // Animation easing
    duration: 0.6,           // Speed (seconds)
    disableOnTouch: true     // Disable on mobile
};
```

**Intensity Presets:**
- **Subtle:** 5, 10, 15 | duration: 0.8
- **Moderate:** 8, 15, 20 | duration: 0.6 ← Current
- **Bold:** 12, 25, 35 | duration: 0.4

---

## 🎨 Color Customization

**File:** `styles.css`

```css
/* Line 35 - Left side background */
.hero-section--left {
    background-color: #E8DDD3;  /* Warm beige */
}

/* Line 39 - Right side background */
.hero-section--right {
    background-color: #F5F5F0;  /* Light neutral */
}

/* Line 85 - Text color */
.hero-title {
    color: #E8573F;  /* Coral/orange */
}
```

---

## 📋 Documentation Index

| Guide | Purpose | When to Use |
|-------|---------|-------------|
| **README.md** | Main documentation | Overview, Shopify setup |
| **ASSETS-GUIDE.md** | Asset preparation | Before creating images |
| **TESTING-GUIDE.md** | Testing procedures | After adding assets |
| **PERFORMANCE.md** | Optimization details | Performance issues |
| **IMPLEMENTATION-SUMMARY.md** | Complete overview | Understanding full project |
| **QUICK-REFERENCE.md** | This file | Quick lookups |

---

## 🧪 Fast Test Checklist

Once assets are in place:

**Visual:**
- [ ] Both sides display
- [ ] Images load correctly
- [ ] Text visible and readable
- [ ] No console errors

**Interaction:**
- [ ] Mouse movement triggers effect
- [ ] Layers move at different speeds
- [ ] Smooth animation (no stutter)
- [ ] Resets when mouse leaves

**Performance:**
- [ ] Open DevTools > Performance
- [ ] Record 5s of mouse movement
- [ ] Check FPS (should be ~60)
- [ ] Check console (no errors)

---

## 🛠️ Common Fixes

### Images not showing (404)
```bash
# Check filenames exactly match:
ls -la assets/
# Should show: seasonal-bg.webp, seasonal-model.png, etc.
```

### Stuttering animation
```javascript
// In script.js, reduce movement:
maxMovement: { background: 5, model: 10, text: 15 }
// Or increase duration:
duration: 0.8
```

### Text not visible
```css
/* In styles.css, increase contrast: */
.hero-title { color: #FF4500; }
/* Or add stronger shadow: */
text-shadow: 2px 2px 12px rgba(0,0,0,0.3);
```

### Parallax not working
```javascript
// In script.js, check console:
// Should see: "Parallax hero initialized"
// If "disabled on touch device", set:
disableOnTouch: false
```

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| FPS | 60 |
| Load Time | <2s |
| Total Size | <1MB |
| Memory | <50MB |

---

## 🔗 External Resources

**Asset Preparation:**
- Remove.bg: https://www.remove.bg/
- Photopea: https://www.photopea.com/
- TinyPNG: https://tinypng.com/

**AI Backgrounds:**
- Midjourney: https://www.midjourney.com/
- DALL-E: https://openai.com/dall-e-3
- Leonardo.ai: https://leonardo.ai/

**GSAP Documentation:**
- Docs: https://greensock.com/docs/
- quickTo: https://greensock.com/docs/v3/GSAP/gsap.quickTo()

---

## 📱 Browser Support

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome | ✅ Excellent | Full support, 60fps |
| Firefox | ✅ Excellent | Full support |
| Safari | ✅ Good | Minor timing differences |
| Edge | ✅ Excellent | Chromium-based |
| Mobile Safari | ✅ Disabled | Touch detection |
| Chrome Mobile | ✅ Disabled | Touch detection |

---

## 🎬 Shopify Integration (Brief)

1. **Upload assets:** Settings > Files
2. **Create section:** `hero-parallax.liquid`
3. **Copy HTML:** From index.html
4. **Update paths:** Use `{{ 'filename' | asset_url }}`
5. **Add CSS/JS:** Upload or inline
6. **Test:** On staging theme
7. **Deploy:** Publish to live theme

**Full guide:** See README.md Shopify Integration section

---

## 🐛 Troubleshooting Flow

```
Problem detected
    ↓
Check browser console for errors
    ↓
Error found? → Check relevant guide
    ↓
No error? → Check asset files exist
    ↓
Assets OK? → Check configuration
    ↓
Config OK? → Check browser compatibility
    ↓
Still stuck? → Review TESTING-GUIDE.md
```

---

## 📞 Quick Help

**Issue:** Images not loading  
**Fix:** Check assets/ folder, verify filenames

**Issue:** Janky animation  
**Fix:** Reduce maxMovement values, compress images

**Issue:** Parallax not working  
**Fix:** Check console, verify GSAP loaded

**Issue:** Text not visible  
**Fix:** Adjust color in styles.css

**Issue:** Performance problems  
**Fix:** See PERFORMANCE.md

---

## ✅ Final Checklist

**Before Testing:**
- [ ] 4 images prepared and optimized
- [ ] Files in assets/ folder
- [ ] Filenames match exactly

**During Testing:**
- [ ] Opened in multiple browsers
- [ ] Tested mouse interaction
- [ ] Checked DevTools for errors
- [ ] Verified 60fps performance

**Before Shopify:**
- [ ] Prototype fully tested
- [ ] Client feedback received
- [ ] Final adjustments made
- [ ] Assets ready for upload

**After Deploy:**
- [ ] Production testing done
- [ ] Analytics tracking added
- [ ] Performance monitored
- [ ] Metrics compared to old hero

---

## 🎯 Next Immediate Action

**→ Go to ASSETS-GUIDE.md and prepare your 4 image files**

Once assets are ready, return here and run Quick Start commands.

---

*For detailed information, see the full documentation files. This is just a quick reference for common tasks and lookups.*

