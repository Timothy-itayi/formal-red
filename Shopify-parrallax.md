# Option A: Depth-Based Parallax / Mouse Movement

## Goal
Enhance the hero section of Formal Red’s Shopify site with a subtle, interactive depth illusion that mimics a luxury showroom aesthetic — engaging but performance-safe.

## Feasibility
✅ Fully feasible now using GSAP, Three.js, and standard WebGL shaders. No Shopify limitations with custom sections or Liquid integration.

## Stack
- **Frontend:** GSAP (ScrollTrigger + MouseMove)
- **3D Engine:** Three.js (for layered depth and lighting)
- **Integration:** Shopify custom section using Liquid + Webpack build
- **Design Source:** Figma prototype layered composition (foreground, mid, background)

## Process
1. **Extract Layers** – From Figma, export hero elements (subject, text, décor) as individual PNGs with depth order.
2. **Prototype Motion** – Build motion simulation in Figma or Framer for approval.
3. **Implement Interaction** – Use GSAP or custom Three.js scene reacting to cursor and scroll.
4. **Shopify Embed** – Inject via a custom section or app embed block.
5. **Test Responsiveness** – Verify parallax scaling on mobile (optional fallback: static composition).

## Edge Cases / Risks
- Browser GPU performance on low-end devices.
- Shopify theme restrictions (Liquid section rendering order).
- Must throttle mousemove events for energy efficiency.

## Outcome
Interactive hero motion layer that visually maps the showroom’s luxury feel through depth and subtle motion — fast, elegant, and minimal on resources.
