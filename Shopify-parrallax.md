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

## Breakpoint Strategy
- **Desktop (≥1024px):** Enable full depth parallax with cursor + scroll response, lazy-init scene after hero intersects viewport to protect LCP.
- **Tablet/Mobile (<1024px):** Auto-disable WebGL bundle; render complementary hero (static layered image or lightweight Lottie/video loop) plus CTA stack that mirrors the screenshot you shared (headline + “Book My Fitting / Call Us” actions).
- **Author Controls:** Section schema exposes independent desktop + mobile media pickers so marketing can update either experience without code changes.

## Process
1. **Extract Layers** – From Figma, export the 2–3 agreed hero layers (foreground subject, mid copy, atmospheric background) as individual PNGs while preserving depth order.
2. **Prototype Motion** – Build motion simulation in Figma or Framer for approval.
3. **Implement Interaction** – Use GSAP or custom Three.js scene reacting to cursor and scroll.
4. **Shopify Embed** – Inject via a custom section or app embed block.
5. **Test Responsiveness** – Validate that breakpoint detection swaps to the mobile composition, ensures CTA hit targets remain above the fold, and that analytics fire for both states.

## Mobile Complement Strategy
- **Visual Treatment:** Source the existing layered still and run it through Nano Banana (or equivalent image-to-video model) to generate a subtle motion loop that reinforces the desktop hero without shouting—think gentle lighting sweep or background drift under 3 seconds.
- **Content Blocks:** Headline, supporting copy, and dual CTA buttons (“Book My Fitting”, “Call Us”) managed via schema so content can diverge from desktop if needed.
- **Performance Guardrails:** Cap encoded MP4/WebM at <1 MB, serve via responsive `poster` fallback, and only autoplay when `prefers-reduced-motion` is off; otherwise drop to the original still.
- **Fallback Logic:** Feature-detect WebGL; if unavailable, force the mobile composition even on desktop, emit a telemetry ping, and log whether we served video or static fallback for later tuning.

## Delivery Package
- **Asset Bundle:** `hero-parallax.bundle.js` (hashed build), three PNG layers, mobile MP4/WebM loop, static fallback JPEG. Ship inside a timestamped zip plus checksum file so the client can verify uploads.
- **Liquid Section:** `sections/hero-parallax.liquid` containing markup, data attributes, and schema fields for desktop media, mobile media, copy blocks, CTA labels, enable/disable toggles, telemetry flag, and reduced-motion handling.
- **Config Defaults:** Pre-populate schema with the current hero content so the section renders immediately after install; document each field inline.
- **Analytics Hook:** Lightweight snippet pushing `heroParallax:init` / `heroParallax:fallback` events to `dataLayer` so marketing can see adoption without us.
- **Reduced-Motion Handling:** Include CSS + JS switches wired to `prefers-reduced-motion` to keep auditors happy and to avoid manual edits.

## Client Handoff Checklist
1. Duplicate live theme; confirm backup exists.
2. Upload bundled assets via `Settings → Files`, following the provided naming matrix (e.g., `hero-parallax-foreground.png`, `hero-parallax-mobile.mp4`).
3. Drop `hero-parallax.liquid` into `/sections` using Theme Editor or Shopify CLI.
4. Open Theme Customizer, add “Hero Parallax” section, point schema fields to uploaded assets, set copy/CTAs, and choose whether mobile video autoplays.
5. Verify desktop/mid/mobile breakpoints plus reduced-motion behavior in preview, then publish.
6. Post-launch: watch analytics dashboard for fallback/interaction counts during the first week to catch regressions early.

## Internal QA Setup
- **Dev Store:** Maintain a Shopify Partner dev store with a cloned Dawn theme dedicated to this hero; keep collaborator access locked down so only engineering touches it.
- **Local Preview:** Use `shopify theme serve` against the dev theme to hot-reload Liquid + JS changes; feed it a `sections/hero-parallax.settings.json` fixture containing default assets so our desktop/mobile paths never 404 in preview.
- **Asset Fixtures:** Version-control low-res stand-ins for the 3 PNG layers plus Nano Banana video to avoid leaking client originals yet keep scene behavior identical.
- **Automated Checks:** Add npm scripts for linting the Three.js bundle, running throttled performance audits via Lighthouse CI, and snapshotting WebGL enable/disable logic in headless Chrome.
- **Manual Test Matrix:** Desktop Chrome/Safari/Edge (mouse + trackpad), low-power laptop with `chrome://flags/#disable-accelerated-2d-canvas`, iOS Safari, Android Chrome, and reduced-motion toggles. Record GIFs/demo clips for the client straight from the dev store preview URL.
- **Sign-off Process:** Only package the deliverable after the dev store preview mimics production settings, analytics events are visible in dev GTM workspace, and QA checklist is signed by engineering + design.

## Edge Cases / Risks
- Browser GPU performance on low-end devices.
- Shopify theme restrictions (Liquid section rendering order).
- Must throttle mousemove events for energy efficiency.

## Outcome
Interactive hero motion layer that visually maps the showroom’s luxury feel through depth and subtle motion — fast, elegant, and minimal on resources.
