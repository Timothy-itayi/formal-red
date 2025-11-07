# Shopify Deployment Options — 3D Hero Section

## Objective
Enable integration of a 3D hero section into a Shopify storefront without requiring direct access to the client’s admin account.

---

## Option A — Spline Embed (Quick Demo)

**Summary:**  
Use a Spline-hosted interactive iframe embedded via Shopify's Theme Editor.

**Steps for Client:**
1. Go to **Online Store → Themes → Customize**.  
2. Add a **Custom HTML** block to the homepage hero section.  
3. Paste the Spline iframe snippet:  

```html
<div style="position:relative;padding-top:45%;overflow:hidden;">
  <iframe src="https://my.spline.design/YOUR_SPLINE_URL" 
          style="position:absolute;left:0;top:0;width:100%;height:100%;border:0;"
          loading="lazy" allow="fullscreen; autoplay">
  </iframe>
</div>
```

**Pros:** Fast setup, visually impressive demo.  
**Cons:** Limited control, possible performance issues, not editable in the theme editor.

**Deliverables:**  
- Spline scene URL  
- iframe snippet  
- Static fallback image

---

## Option B — Custom Shopify Section (Recommended for Production)

**Summary:**  
Create a reusable and theme-compatible Liquid section (`hero-3d.liquid`) with bundled JS for 3D rendering (Three.js or Spline embed).

**Steps for Client:**
1. Duplicate the theme for safety.  
2. Upload assets via **Settings → Files** (JS + models).  
3. Add a new section file under `sections/hero-3d.liquid`.  
4. Paste provided Liquid + schema + JS snippet.  
5. Add the new section via the Theme Customizer.

**Example Schema Skeleton:**
```liquid
<section id="hero-3d" class="hero-3d" data-section-type="hero-3d">
  <div id="hero3d-canvas"></div>
  {% schema %}
  {
    "name": "3D Hero",
    "settings": [
      {"type": "checkbox", "id": "enable_3d", "label": "Enable 3D", "default": true},
      {"type": "text", "id": "model_url", "label": "3D Model URL"},
      {"type": "text", "id": "headline", "label": "Headline", "default": "Seasonal / Weddings"}
    ]
  }
  {% endschema %}
</section>

{{ 'hero-3d.bundle.js' | asset_url | script_tag }}
```

**Pros:**  
- Integrated into Shopify editor.  
- Clean separation of content and code.  
- Editable toggles for 3D mode and asset switching.

**Cons:**  
- Requires minor theme code access for installation.  
- Slightly longer development cycle.

**Deliverables:**  
- `hero-3d.liquid` file  
- `hero-3d.bundle.js` script  
- Installation guide (step-by-step with screenshots)

---

## Option C — Shopify App Extension (For Long-Term Scalability)

**Summary:**  
Develop a theme app extension with an embedded app block for the hero section.

**Pros:**  
- Updatable via app.  
- Perfect for multi-client reuse.  
- No direct theme editing needed.

**Cons:**  
- Requires Shopify Partner account + hosting setup.  
- Overkill for single-site deployment.

---

## Security and Maintenance Considerations
- Always duplicate theme before any edits.  
- Lazy-load WebGL to avoid blocking LCP.  
- Use compressed `.glb`/`.gltf` assets (under 5MB).  
- Provide a static fallback for non-WebGL browsers.  
- Add analytics for interaction tracking.  
- Offer a one-sprint support window post-deployment for testing.

---

## Recommended Path
1. **Phase 1:** Deliver Spline prototype to confirm creative direction.  
2. **Phase 2:** Build custom Shopify section with Three.js for production stability.  
3. **Phase 3 (optional):** Convert to theme app extension for maintainability and reuse.
