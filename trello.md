# Formal-Red Hero — Trello Breakdown

## Column: Backlog / Alignment `#C4924B`
- [ ] **Confirm Constraints:** Re-state goals, Shopify-only rule, desktop parallax + mobile motion split, success metrics.
- [ ] **Asset Inventory:** Collect latest layered PSD/Figma exports (3 layers) + Nano Banana source stills; document usage rights.
- [ ] **Theme Access:** Ensure Partner dev store + collaborator access, verify target production theme version.

## Column: Research & Planning `#C86041`
- [ ] **Hero Audit:** Screenshot/record existing hero (desktop + mobile) with notes on copy, CTAs, spacing issues.
- [ ] **Competitive Sweep:** Capture 3–5 reference hero patterns with depth motion; log pros/cons + performance notes.
- [ ] **Tech Validation:** Spike Three.js + GSAP scene using placeholder images to confirm cursor + scroll behavior and GPU load.
- [ ] **Schema Blueprint:** Define all section fields (media pickers, copy, CTAs, toggles, telemetry flags) and migration steps from current hero.

## Column: Design & Asset Prep `#A54B65`
- [ ] **Layer Exports:** Deliver foreground/mid/background PNGs (2–3 layers) with alpha and consistent bounding boxes; export static fallback JPG.
- [ ] **Mobile Motion Loop:** Run still through Nano Banana, iterate until sub-1 MB loop matches brand rhythm; create poster frame.
- [ ] **Content Copy:** Align marketing on desktop vs mobile headlines/subcopy/CTAs; finalize tone + typography tokens.
- [ ] **Accessibility Review:** Plan color contrast, focus order, and reduced-motion alternatives before build starts.

## Column: Build `#5B62A6`
- [ ] **Section Scaffold:** Create `hero-parallax.liquid` with semantic markup, data attributes, and schema JSON.
- [ ] **JS Bundle:** Implement Three.js scene, GSAP bindings, pointer throttling, reduced-motion gates, analytics events.
- [ ] **Responsive Toggle:** Wire breakpoint detection + WebGL feature test to swap desktop vs mobile DOM branches.
- [ ] **Asset Loader:** Add lazy-load + `requestIdleCallback` init, poster fallback for mobile video, and graceful 404 handling.
- [ ] **Config Defaults:** Seed schema with current copy/assets so preview immediately mirrors production.

## Column: Internal QA `#31838F`
- [ ] **Dev Store Preview:** Deploy to dedicated Dawn clone; confirm section loads with fixture assets.
- [ ] **Automated Checks:** Run lint, unit tests (if any), Lighthouse perf pass (desktop + mobile), bundle size gate.
- [ ] **Manual Matrix:** Test Chrome/Safari/Edge desktop (mouse + trackpad), low-power laptop, iOS Safari, Android Chrome, reduced-motion toggles; capture GIF evidence.
- [ ] **Analytics Verification:** Confirm `heroParallax:init` and `heroParallax:fallback` hit dev GTM workspace; log payload sizes.

## Column: Client Package `#3E9772`
- [ ] **Zip Assembly:** Bundle hashed JS, PNGs, MP4/WebM, fallback JPG, checksums, and install guide PDF/screens.
- [ ] **Install Guide:** Step-by-step doc covering theme duplication, asset upload paths, section placement, schema field mapping, QA sign-off checklist.
- [ ] **Release Notes:** Summarize changes, dependencies, and rollback instructions.

## Column: Handoff & Post-Launch `#6C6C6C`
- [ ] **Client Walkthrough:** Schedule session to demo Theme Customizer workflow and analytics panel.
- [ ] **Support Window:** Define SLA for bug fixes, performance tuning, or copy tweaks (e.g., two weeks).
- [ ] **Monitoring:** Review analytics after launch (fallback rate, mobile autoplay opt-outs) and decide if iteration needed.
- [ ] **Retrospective:** Capture technical debt, future enhancements (e.g., app extension) and criteria for moving to next phase.

