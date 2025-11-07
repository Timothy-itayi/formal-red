# Asset Preparation Guide

This guide explains how to prepare the layered assets needed for the parallax hero section.

## Required Assets Overview

You need **4 image files** total:

```
assets/
├── seasonal-bg.webp        # Background for SEASONAL (brown suit)
├── seasonal-model.png      # Model in brown suit (transparent)
├── weddings-bg.webp        # Background for WEDDINGS (tuxedo)
└── weddings-model.png      # Model in tuxedo (transparent)
```

---

## Asset Specifications

### Background Images (WebP)

**File names:**
- `seasonal-bg.webp`
- `weddings-bg.webp`

**Specifications:**
- Format: WebP
- Dimensions: 1920x1080px (16:9 aspect ratio)
- File size: 100-200KB per image
- Quality: 80-85%
- Color profile: sRGB

**Content:**
- Studio/showroom environment
- Should match aesthetic of product photography
- Neutral, elegant backgrounds
- No models or products in background
- Consider: textured walls, elegant furniture, soft lighting

### Model Images (PNG)

**File names:**
- `seasonal-model.png`
- `weddings-model.png`

**Specifications:**
- Format: PNG with alpha channel (transparency)
- Dimensions: 800x1080px (portrait orientation)
- File size: 150-300KB per image
- Transparency: Clean edges, no white fringe
- Color profile: sRGB

**Content:**
- Full-body product shots
- Models extracted from original backgrounds
- Clean, professional cutouts
- Match lighting of backgrounds

---

## Step-by-Step: Extract Models from Photos

### Option 1: Photoshop (Professional)

**Tools needed:** Adobe Photoshop

**Steps:**
1. Open original hero image in Photoshop
2. Select model using one of these tools:
   - **Quick Selection Tool** (W) - for clean backgrounds
   - **Pen Tool** (P) - for precise edges
   - **Select Subject** (Select > Subject) - AI-powered
3. Refine edge:
   - Select > Select and Mask
   - Adjust Edge Detection radius: 1-3px
   - Output: New Layer with Layer Mask
4. Clean up edges:
   - Use Refine Edge Brush on hair/fabric
   - Remove any color fringe
5. Export:
   - File > Export > Export As
   - Format: PNG
   - Transparency: Yes
   - Save as `seasonal-model.png` or `weddings-model.png`

### Option 2: Photopea (Free Alternative)

**Tools needed:** Browser, internet connection

**Steps:**
1. Go to https://www.photopea.com/
2. Open original image (File > Open)
3. Use Magic Wand Tool (W) or Quick Selection
4. Click background to select it
5. Invert selection (Ctrl/Cmd + Shift + I)
6. Copy selection (Ctrl/Cmd + C)
7. New document with transparency (Ctrl/Cmd + N, check Transparent)
8. Paste (Ctrl/Cmd + V)
9. Export as PNG:
   - File > Export as > PNG
   - Save with appropriate filename

### Option 3: Remove.bg (Fast & Easy)

**Tools needed:** Browser, account (free tier available)

**Steps:**
1. Go to https://www.remove.bg/
2. Upload original hero image
3. AI automatically removes background
4. Download high-resolution PNG (may require account)
5. Rename to appropriate filename
6. Optional: Touch up in Photoshop/Photopea if needed

**Pros:**
- Fast (seconds)
- Good for most product shots
- No design skills needed

**Cons:**
- May need manual cleanup
- Free tier has limits
- Less control than manual methods

### Option 4: Figma (Team Workflow)

**Tools needed:** Figma account

**Steps:**
1. Import image to Figma
2. Use background removal plugin:
   - Plugins > Browse > "Remove BG"
   - Or use Figma's native Remove Background (Beta)
3. Export as PNG:
   - Right-click layer > Export
   - Format: PNG
   - Scale: 2x or 3x
   - Export

---

## Step-by-Step: Create AI Backgrounds

You need studio/showroom style backgrounds that match the product photography aesthetic.

### Option 1: Midjourney (Premium Quality)

**Tools needed:** Midjourney subscription ($10/month)

**Prompt template:**
```
luxury menswear showroom interior, elegant minimalist design, 
soft natural lighting, beige and neutral tones, textured walls, 
sophisticated ambiance, high-end retail space, 16:9 aspect ratio, 
professional photography --ar 16:9 --v 6
```

**For SEASONAL (Brown Suit):**
```
warm luxury menswear boutique interior, beige textured walls, 
soft ambient lighting, elegant wooden accents, sophisticated 
retail space, autumn tones, professional photography --ar 16:9 --v 6
```

**For WEDDINGS (Tuxedo):**
```
bright elegant menswear showroom, light neutral walls, natural 
window lighting, minimal sophisticated design, luxury retail 
interior, clean aesthetic, professional photography --ar 16:9 --v 6
```

**Steps:**
1. Join Midjourney Discord
2. Use `/imagine` command with prompt
3. Generate 4 variations
4. Upscale best option (U1, U2, U3, or U4)
5. Download image
6. Convert to WebP (see conversion section)

### Option 2: DALL-E 3 (Via ChatGPT Plus)

**Tools needed:** ChatGPT Plus subscription ($20/month)

**Prompt template:**
```
A luxury menswear showroom interior in neutral beige tones. 
Elegant textured walls, soft natural lighting, minimal sophisticated 
design. High-end retail space with warm ambiance. Professional 
interior photography style. 16:9 landscape format.
```

**Steps:**
1. Go to ChatGPT
2. Enter prompt (customize for each side)
3. Generate image
4. Download
5. Convert to WebP

**Note:** DALL-E generates 1024x1024 by default. You may need to:
- Regenerate with specific aspect ratio instructions
- Crop/resize to 1920x1080

### Option 3: Leonardo.ai (Free Tier Available)

**Tools needed:** Leonardo.ai account (free tier: 150 tokens/day)

**Steps:**
1. Sign up at https://leonardo.ai/
2. Go to Image Generation
3. Select "Leonardo Diffusion XL" model
4. Set dimensions: 16:9 (1536x864 or custom)
5. Enter prompt (similar to Midjourney prompts above)
6. Generate
7. Download
8. Upscale if needed (use Upscayl or similar)
9. Convert to WebP

### Option 4: Stable Diffusion (Self-Hosted, Free)

**Tools needed:** 
- Computer with GPU (8GB+ VRAM recommended)
- Stable Diffusion WebUI installed

**Steps:**
1. Install Stable Diffusion WebUI
2. Use checkpoint: Realistic Vision or Deliberate
3. Prompt similar to above examples
4. Settings:
   - Width: 1920, Height: 1080
   - Sampling: DPM++ 2M Karras
   - Steps: 25-30
   - CFG Scale: 7
5. Generate
6. Select best output
7. Convert to WebP

### Option 5: Use Stock Photography

**If AI not available:** Use royalty-free stock images

**Sources:**
- Unsplash: https://unsplash.com/
- Pexels: https://www.pexels.com/
- Pixabay: https://pixabay.com/

**Search terms:**
- "luxury retail interior"
- "menswear boutique"
- "elegant showroom"
- "minimalist store interior"

**Steps:**
1. Search and download high-res images
2. Ensure they match aesthetic
3. Crop/resize to 1920x1080
4. Adjust colors if needed (Lightroom, Photoshop)
5. Convert to WebP

---

## Image Optimization

### Convert to WebP

**Online tool (easiest):**
1. Go to https://cloudconvert.com/jpg-to-webp
2. Upload JPG/PNG
3. Set quality: 80-85%
4. Convert and download

**Command line (cwebp):**
```bash
# Install
brew install webp  # macOS
apt-get install webp  # Linux

# Convert
cwebp -q 85 input.jpg -o seasonal-bg.webp
```

**Photoshop:**
1. Install WebP plugin
2. File > Export > Save for Web
3. Choose WebP format
4. Quality: 80-85
5. Save

### Compress PNG

**Online tool:**
1. Go to https://tinypng.com/
2. Upload PNG files (models)
3. Download compressed versions

**Command line (pngquant):**
```bash
# Install
brew install pngquant  # macOS

# Compress
pngquant --quality=80-90 seasonal-model.png -o seasonal-model-compressed.png
```

### Resize Images

**ImageMagick (command line):**
```bash
# Install
brew install imagemagick  # macOS

# Resize background to 1920x1080
magick input.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 output.jpg

# Resize model to max 800px width, maintain aspect
magick input.png -resize 800x output.png
```

**Online tool:**
1. Go to https://squoosh.app/
2. Upload image
3. Resize in right panel
4. Adjust quality
5. Download

---

## Asset Quality Checklist

### Background Images
- [ ] Format: WebP
- [ ] Dimensions: 1920x1080px
- [ ] File size: 100-200KB
- [ ] Quality: No visible compression artifacts
- [ ] Aesthetic: Matches brand/product style
- [ ] Color: Neutral, complementary tones
- [ ] Lighting: Soft, even, professional

### Model Images
- [ ] Format: PNG with transparency
- [ ] Dimensions: 800x1080px (or similar portrait ratio)
- [ ] File size: 150-300KB
- [ ] Edges: Clean cutout, no white fringe
- [ ] Lighting: Matches background lighting direction
- [ ] Position: Centered, full body visible
- [ ] Quality: Sharp, professional

### File Naming
- [ ] `seasonal-bg.webp` (exact name)
- [ ] `seasonal-model.png` (exact name)
- [ ] `weddings-bg.webp` (exact name)
- [ ] `weddings-model.png` (exact name)
- [ ] Lowercase filenames
- [ ] No spaces in names

---

## Placement in Project

Once assets are ready:

```bash
# Create assets folder if it doesn't exist
mkdir hero-test/assets

# Move files to assets folder
mv seasonal-bg.webp hero-test/assets/
mv seasonal-model.png hero-test/assets/
mv weddings-bg.webp hero-test/assets/
mv weddings-model.png hero-test/assets/
```

Final structure:
```
hero-test/
├── index.html
├── styles.css
├── script.js
├── README.md
├── PERFORMANCE.md
├── TESTING-GUIDE.md
├── ASSETS-GUIDE.md
└── assets/
    ├── seasonal-bg.webp        ✅
    ├── seasonal-model.png      ✅
    ├── weddings-bg.webp        ✅
    └── weddings-model.png      ✅
```

---

## Testing Assets

After adding assets to project:

1. **Open in browser:**
   ```bash
   open index.html
   ```

2. **Check console:** Should see "Parallax hero initialized"

3. **Verify images loaded:**
   - DevTools > Network tab
   - Should see 4 image requests with 200 status

4. **Visual check:**
   - Backgrounds display correctly
   - Models appear with transparency
   - No white edges around models
   - Lighting looks natural

5. **Test parallax:**
   - Move mouse around
   - Layers should move smoothly
   - Background/model/text at different speeds

---

## Troubleshooting

### "Image not found" (404 error)

**Problem:** Console shows 404 for image files

**Solutions:**
1. Check file names match exactly (case-sensitive)
2. Verify files are in `assets/` folder
3. Check file extensions (.webp, .png)
4. Try absolute paths if using file:// protocol

### White fringe around model

**Problem:** Visible white edge around transparent PNG

**Solutions:**
1. Photoshop: Select > Modify > Contract (1-2px), then expand mask
2. Photoshop: Layer > Matting > Defringe (1-2px)
3. Photopea: Similar defringe option in Select > Modify
4. Re-extract with better edge refinement

### Model too large/small

**Problem:** Model doesn't fit well in layout

**Solutions:**
1. Resize image to ~800px width
2. Adjust CSS in `styles.css`:
   ```css
   .parallax-layer--model .layer-image {
       max-width: 80%;  /* Adjust this value */
   }
   ```

### Background doesn't match style

**Problem:** AI-generated background doesn't fit

**Solutions:**
1. Try different AI prompts (more specific)
2. Use stock photography instead
3. Edit in Lightroom/Photoshop:
   - Adjust color temperature
   - Match contrast/saturation to product photos
   - Apply color grading

### File sizes too large

**Problem:** Images over 200KB each

**Solutions:**
1. Increase WebP compression (lower quality to 75-80)
2. Compress PNG with TinyPNG
3. Reduce dimensions slightly:
   - Backgrounds: Try 1600x900 instead of 1920x1080
   - Models: Try 700px width instead of 800px

---

## Quick Start Placeholder

**For immediate testing without final assets:**

Create simple colored rectangles as placeholders:

```html
<!-- Temporary: Replace image src with data URIs -->
<div style="width: 1920px; height: 1080px; background: #E8DDD3;"></div>
```

Or use a placeholder service:
```html
<img src="https://via.placeholder.com/1920x1080/E8DDD3/333333?text=SEASONAL+BG">
<img src="https://via.placeholder.com/800x1080/CCCCCC/333333?text=MODEL">
```

This lets you test the parallax functionality before final assets are ready.

---

## Resources

**Background Removal:**
- Remove.bg: https://www.remove.bg/
- Photopea: https://www.photopea.com/
- Clipping Magic: https://clippingmagic.com/

**AI Image Generation:**
- Midjourney: https://www.midjourney.com/
- DALL-E: https://openai.com/dall-e-3
- Leonardo.ai: https://leonardo.ai/
- Stable Diffusion: https://github.com/AUTOMATIC1111/stable-diffusion-webui

**Image Optimization:**
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- CloudConvert: https://cloudconvert.com/

**Stock Photography:**
- Unsplash: https://unsplash.com/
- Pexels: https://www.pexels.com/
- Pixabay: https://pixabay.com/

---

## Next Steps

1. ✅ Review this guide
2. ⏳ Extract models from original photos
3. ⏳ Generate AI backgrounds (or source stock photos)
4. ⏳ Optimize and compress all images
5. ⏳ Place files in `assets/` folder
6. ⏳ Test prototype with real assets
7. ⏳ Adjust if needed (resize, recolor, etc.)
8. ⏳ Move forward with Shopify integration

Good luck with asset preparation! The quality of your assets will determine the final impact of the parallax effect.

