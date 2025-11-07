# Testing Guide - Parallax Hero Prototype

This guide provides step-by-step instructions for testing the parallax hero section.

## Pre-Testing Setup

### 1. Verify File Structure
Ensure all files exist:
```
hero-test/
├── index.html
├── styles.css
├── script.js
├── README.md
├── PERFORMANCE.md
├── TESTING-GUIDE.md (this file)
└── assets/
    ├── seasonal-bg.webp
    ├── seasonal-model.png
    ├── weddings-bg.webp
    └── weddings-model.png
```

### 2. Prepare Test Environment
Option A: Direct file open
```bash
open index.html
```

Option B: Local server (recommended for accurate testing)
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if http-server installed)
npx http-server -p 8000

# Then visit: http://localhost:8000
```

### 3. Open Browser DevTools
- Chrome/Edge: `F12` or `Cmd+Option+I` (Mac)
- Firefox: `F12` or `Cmd+Option+I` (Mac)
- Safari: Enable Dev Tools first in Preferences, then `Cmd+Option+I`

---

## Test Suite 1: Visual & Layout

### Test 1.1: Initial Render
**Steps:**
1. Open `index.html` in browser
2. Wait for page to fully load

**Expected:**
- 50/50 split layout visible
- Left side (SEASONAL) with beige background (#E8DDD3)
- Right side (WEDDINGS) with light neutral background (#F5F5F0)
- Both titles visible in coral/orange color (#E8573F)
- No console errors

**Pass Criteria:**
- [ ] Layout renders correctly
- [ ] Colors match specification
- [ ] No 404 errors in console
- [ ] Text is readable

### Test 1.2: Image Loading
**Steps:**
1. Check Network tab in DevTools
2. Look for image requests
3. Verify all images load (status 200)

**Expected:**
- 4 images load successfully
- WebP backgrounds: ~100-200KB each
- PNG models: ~150-300KB each
- Total: <1MB

**Pass Criteria:**
- [ ] All images return 200 status
- [ ] Images display in correct positions
- [ ] No broken image icons
- [ ] File sizes within budget

### Test 1.3: Typography
**Steps:**
1. Inspect "SEASONAL" and "WEDDINGS" text
2. Check font size, color, positioning

**Expected:**
- Font size scales responsively
- Color: #E8573F (coral/orange)
- Text shadow visible for depth
- Positioned in lower section of each side
- All caps, bold weight

**Pass Criteria:**
- [ ] Text is clearly visible
- [ ] Color contrasts with background
- [ ] Proper positioning
- [ ] Responsive sizing works

---

## Test Suite 2: Interaction & Animation

### Test 2.1: Mouse Movement Detection
**Steps:**
1. Move mouse into hero section
2. Observe layer movement
3. Check console for initialization message

**Expected:**
- Console shows: "Parallax hero initialized"
- Layers begin moving with mouse
- Movement is smooth
- Different layers move at different speeds

**Pass Criteria:**
- [ ] Mouse tracking works
- [ ] Layers respond to movement
- [ ] No console errors
- [ ] Smooth animation (no stuttering)

### Test 2.2: Layer Movement Hierarchy
**Steps:**
1. Move mouse slowly from left to right
2. Observe which layers move more/less
3. Verify speed differences

**Expected:**
- Background: moves slowest (~5-8px range)
- Model: moves at medium speed (~10-15px)
- Text: moves fastest (~15-20px)
- Movement feels natural and creates depth

**Pass Criteria:**
- [ ] Background moves slowest
- [ ] Model moves at medium speed
- [ ] Text moves fastest
- [ ] Hierarchy is noticeable

### Test 2.3: Mouse Leave Reset
**Steps:**
1. Move mouse into hero section
2. Move mouse around to trigger parallax
3. Move mouse out of hero section
4. Observe layer behavior

**Expected:**
- Layers smoothly return to center position
- Animation eases back (not instant)
- No jumping or snapping
- Ready for next interaction

**Pass Criteria:**
- [ ] Layers reset to center
- [ ] Smooth transition back
- [ ] No visual glitches
- [ ] Repeatable behavior

### Test 2.4: Continuous Interaction
**Steps:**
1. Move mouse continuously for 30 seconds
2. Vary speed (slow, medium, fast)
3. Move in circles, diagonals, etc.

**Expected:**
- Consistent smooth movement
- No lag or delay buildup
- No memory leaks
- Performance remains stable

**Pass Criteria:**
- [ ] No performance degradation
- [ ] Smooth throughout test
- [ ] No stuttering or jank
- [ ] CPU/GPU usage stable

---

## Test Suite 3: Performance

### Test 3.1: Frame Rate Analysis
**Steps:**
1. Open DevTools > Performance tab
2. Click "Record" button
3. Move mouse around hero for 10 seconds
4. Stop recording
5. Analyze results

**Expected:**
- FPS: 60fps consistently
- Green bars at top of timeline
- Frame time: ~16ms or less
- No long tasks (red markers)

**Pass Criteria:**
- [ ] Average FPS ≥ 58
- [ ] No dropped frames
- [ ] Frame time < 16.67ms
- [ ] Timeline shows green

### Test 3.2: GPU Acceleration
**Steps:**
1. DevTools > More tools > Rendering
2. Enable "Layer borders"
3. Observe colored borders around layers

**Expected:**
- Orange/yellow borders around parallax layers
- Indicates GPU-accelerated layers
- Should see 6 layers (3 per side)

**Pass Criteria:**
- [ ] Layer borders visible
- [ ] All parallax layers accelerated
- [ ] 6 layers total
- [ ] Orange/yellow color

### Test 3.3: Memory Usage
**Steps:**
1. DevTools > Memory tab
2. Take heap snapshot (baseline)
3. Interact with parallax for 1 minute
4. Take another heap snapshot
5. Compare memory usage

**Expected:**
- Baseline: ~5-10MB
- After interaction: ~10-20MB increase
- No continuous growth (memory leaks)
- Garbage collection working

**Pass Criteria:**
- [ ] Memory increase < 50MB
- [ ] No continuous growth
- [ ] Stable after interaction stops
- [ ] No memory leaks detected

### Test 3.4: Network Performance
**Steps:**
1. DevTools > Network tab
2. Reload page
3. Check waterfall timeline

**Expected:**
- GSAP CDN: ~50KB, loads quickly
- Images: load in parallel
- Total page weight: <1MB
- Load time: <2 seconds

**Pass Criteria:**
- [ ] Total weight < 1MB
- [ ] GSAP loads successfully
- [ ] Images optimized
- [ ] Fast load time

---

## Test Suite 4: Browser Compatibility

### Test 4.1: Chrome
**Browser:** Google Chrome (latest version)
**Steps:**
1. Open prototype
2. Test all interactions
3. Check performance

**Pass Criteria:**
- [ ] All features work
- [ ] 60fps performance
- [ ] No console errors
- [ ] Smooth animations

### Test 4.2: Firefox
**Browser:** Mozilla Firefox (latest version)
**Steps:**
1. Open prototype
2. Test all interactions
3. Check performance

**Expected Notes:**
- May have slightly different timing
- GSAP works consistently
- Performance may vary slightly

**Pass Criteria:**
- [ ] All features work
- [ ] Acceptable performance (55+ fps)
- [ ] No console errors
- [ ] Functional animations

### Test 4.3: Safari
**Browser:** Safari (latest version)
**Steps:**
1. Open prototype
2. Test all interactions
3. Check for Safari-specific issues

**Expected Notes:**
- Transform behavior may differ slightly
- Easing curves may vary
- Generally good performance

**Pass Criteria:**
- [ ] All features work
- [ ] Acceptable performance
- [ ] No console errors
- [ ] Visual consistency

### Test 4.4: Edge
**Browser:** Microsoft Edge (latest version)
**Steps:**
1. Open prototype
2. Test all interactions
3. Check performance

**Expected Notes:**
- Chromium-based, similar to Chrome
- Should have excellent compatibility

**Pass Criteria:**
- [ ] All features work
- [ ] 60fps performance
- [ ] No console errors
- [ ] Smooth animations

---

## Test Suite 5: Responsive Design

### Test 5.1: Desktop - 1920px
**Viewport:** 1920x1080 (Full HD)
**Steps:**
1. Set browser window to 1920px wide
2. Test all interactions

**Expected:**
- Full width 50/50 split
- Optimal viewing experience
- Maximum parallax effect visible

**Pass Criteria:**
- [ ] Layout perfect at this size
- [ ] Images not pixelated
- [ ] Text readable
- [ ] Parallax smooth

### Test 5.2: Laptop - 1440px
**Viewport:** 1440x900
**Steps:**
1. Resize browser to 1440px
2. Test interactions

**Expected:**
- Still 50/50 split
- Images scale appropriately
- Text remains readable

**Pass Criteria:**
- [ ] Layout maintains structure
- [ ] Images scale well
- [ ] No horizontal scroll
- [ ] Interactions work

### Test 5.3: Tablet - 768px
**Viewport:** 768x1024 (iPad portrait)
**Steps:**
1. Resize to 768px or use device
2. Check layout changes

**Expected:**
- May switch to vertical stack
- Touch detection should disable parallax
- Static layout fallback

**Pass Criteria:**
- [ ] Layout adapts correctly
- [ ] Content readable
- [ ] No broken elements
- [ ] Touch behavior correct

### Test 5.4: Mobile - 375px
**Viewport:** 375x667 (iPhone)
**Steps:**
1. Resize to 375px or use device
2. Verify mobile behavior

**Expected:**
- Vertical stack layout
- Parallax disabled (touch device)
- Static images
- Optimized typography

**Pass Criteria:**
- [ ] Vertical layout works
- [ ] Parallax disabled
- [ ] Content accessible
- [ ] Performance good

---

## Test Suite 6: Touch Devices

### Test 6.1: Touch Detection
**Devices:** iPhone, iPad, Android
**Steps:**
1. Open on actual touch device
2. Check console for message

**Expected:**
- Console: "Parallax disabled on touch device"
- No parallax effect on touch
- Static layout displays correctly

**Pass Criteria:**
- [ ] Touch detected correctly
- [ ] Parallax disabled
- [ ] Layout works
- [ ] No errors

### Test 6.2: Touch Interaction
**Steps:**
1. Try touching and dragging
2. Try scrolling
3. Verify no parallax

**Expected:**
- Touch/drag does not trigger parallax
- Normal scrolling works
- No unintended animations

**Pass Criteria:**
- [ ] Touch ignored for parallax
- [ ] Scrolling smooth
- [ ] No animation issues
- [ ] User experience intact

---

## Test Suite 7: Edge Cases

### Test 7.1: No JavaScript
**Steps:**
1. Disable JavaScript in browser
2. Reload page
3. Observe fallback behavior

**Expected:**
- Layout remains intact
- Static images display
- Typography readable
- No broken functionality

**Pass Criteria:**
- [ ] Page displays correctly
- [ ] Layout not broken
- [ ] Content accessible
- [ ] Graceful degradation

### Test 7.2: Slow Network
**Steps:**
1. DevTools > Network > Throttling > "Slow 3G"
2. Reload page
3. Observe loading behavior

**Expected:**
- Progressive loading
- Layout doesn't break during load
- GSAP loads before interaction
- Images load in order

**Pass Criteria:**
- [ ] Page remains functional
- [ ] No JavaScript errors
- [ ] Loading state acceptable
- [ ] Eventually fully loads

### Test 7.3: Missing Images
**Steps:**
1. Temporarily rename one image file
2. Reload page
3. Check error handling

**Expected:**
- Console shows 404 for missing image
- Layout doesn't break
- Other images still display
- Graceful handling

**Pass Criteria:**
- [ ] Page doesn't crash
- [ ] Error logged clearly
- [ ] Other content works
- [ ] Layout intact

### Test 7.4: GSAP Fails to Load
**Steps:**
1. Block GSAP CDN (DevTools > Network > Block request)
2. Reload page
3. Check fallback behavior

**Expected:**
- JavaScript errors for GSAP
- Static layout fallback
- Page still functional
- No infinite loops/crashes

**Pass Criteria:**
- [ ] Page doesn't hang
- [ ] Static content displays
- [ ] Errors logged
- [ ] Graceful failure

---

## Performance Benchmarks

### Acceptable Performance Targets

| Metric | Target | Minimum | Maximum |
|--------|--------|---------|---------|
| Frame Rate | 60 fps | 55 fps | 60 fps |
| Load Time | <1s | - | 3s |
| First Paint | <100ms | - | 300ms |
| Interaction Ready | <500ms | - | 1s |
| Memory Usage | <20MB | - | 50MB |
| CPU (idle) | <5% | - | 10% |
| CPU (active) | <30% | - | 50% |

### Quick Performance Check
```bash
# Chrome DevTools Console
// Check current FPS
performance.now()

// Check memory
performance.memory.usedJSHeapSize / 1048576 + " MB"
```

---

## Bug Report Template

If you find issues, document with this format:

```markdown
### Bug: [Title]
**Severity:** Critical / High / Medium / Low
**Browser:** Chrome 120.0 / Firefox 115.0 / Safari 17.0
**OS:** macOS 14 / Windows 11 / iOS 17
**Viewport:** 1920x1080 / 768x1024 / 375x667

**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Screenshots/Video:**
[Attach if applicable]

**Console Errors:**
```
Paste any console errors
```

**Additional Context:**
Any other relevant information
```

---

## Final Checklist

Before considering testing complete:

**Functionality:**
- [ ] All visual elements render
- [ ] Mouse tracking works
- [ ] Layer hierarchy correct
- [ ] Reset behavior functions
- [ ] Touch detection works

**Performance:**
- [ ] 60fps on desktop
- [ ] Acceptable mobile performance
- [ ] No memory leaks
- [ ] Fast load times
- [ ] GPU acceleration active

**Compatibility:**
- [ ] Chrome works
- [ ] Firefox works
- [ ] Safari works
- [ ] Edge works

**Responsive:**
- [ ] Desktop (1920px)
- [ ] Laptop (1440px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

**Edge Cases:**
- [ ] No JavaScript fallback
- [ ] Slow network handled
- [ ] Missing assets handled
- [ ] Touch devices work

**Documentation:**
- [ ] README reviewed
- [ ] PERFORMANCE guide reviewed
- [ ] All files present
- [ ] Comments clear

---

## Next Steps After Testing

1. **Document findings** - Use bug report template
2. **Prioritize issues** - Critical bugs first
3. **Iterate on performance** - Adjust CONFIG values
4. **Gather feedback** - Show to stakeholders
5. **Prepare for Shopify** - Follow deployment guide in README

## Support

For testing questions or issues:
1. Check README.md for troubleshooting
2. Review PERFORMANCE.md for optimization tips
3. Inspect browser console for specific errors
4. Test in isolated environment (fresh browser profile)

