# Our Story Scrollytelling Frontend Implementation Plan

## Overview

Implement the full mobile-first anniversary scrollytelling experience described in `thoughts/context/flow-context.md`: a single vertical scroll page built with Astro (static shell), React islands for GSAP-heavy interactions, Tailwind v4 design tokens, and GSAP ScrollTrigger. The repository currently ships the default Astro welcome page and only partial global styling.

## Current State Analysis

- **Stack is aligned**: Astro 6, React 19, GSAP 3, `@gsap/react`, Tailwind 4 via `@tailwindcss/vite` are present in `package.json`.
- **Design tokens started**: `src/styles/global.css` defines `--color-base`, `--color-surface`, `--color-primary`, `--color-accent`, `--font-sans`, `--font-serif` and applies base body styles.
- **Entry page**: `src/pages/index.astro` composes story sections in order; `Welcome.astro` removed.
- **Layout**: `Layout.astro` accepts optional `title` (default «Наша история»); Google Fonts URL uses valid `family=` parameters for Inter and Playfair Display.
- **Structure**: `src/components/ui`, `sections`, `interactive`, and `src/hooks` are in place per context.
- **Checks**: `npm run build` and `npm run check` (`astro check` with `typescript` + `@astrojs/check`); no Vitest yet.

## Desired End State

- One primary route (`src/pages/index.astro`) composes all story sections in order: intro, meeting animation, memory gallery, journey path, swipe reasons, final letter.
- Visuals match the soft romantic / glassmorphism spec: typography scale, colors, spacing, `min-h-[100dvh]` / `100dvh` usage where specified.
- Scroll and touch interactions behave as specified; GSAP only animates transform and opacity (no layout property animation).
- Personal imagery uses Astro `<Image />` with meaningful `alt` text; semantic `<section>`, `<article>`, `<time>` where appropriate.
- GSAP timelines respect `prefers-reduced-motion` via `gsap.matchMedia()` (or equivalent pattern).
- Production build succeeds with no TypeScript errors.

### Key Discoveries

- Tailwind theme extension lives in `src/styles/global.css` under `@theme` (Tailwind v4 pattern).
- React integration is configured in `astro.config.mjs` via `@astrojs/react`; islands use `client:load` or `client:visible` as appropriate to limit JS cost.

## What We're NOT Doing

- Backend, auth, analytics, or CMS integration (content can be local static data or frontmatter unless you add scope later).
- Internationalization beyond the Russian copy already implied by `lang="ru"` and the context strings.
- Native app or offline PWA (unless explicitly added later).
- Animating layout-affecting CSS properties (width, height, margin, top, left) per project rules.

## Implementation Approach

1. Establish the **foundation**: fix layout API and fonts, complete the Tailwind token set, add the target directory layout, and replace the starter page with a thin `index.astro` that imports section components in order.
2. Build **static and light sections first** (intro, typography, glass cards) to lock the visual language.
3. Add **React + GSAP islands** for the pinned meeting scene, swipe stack, and any section where a hook keeps the component under ~100 lines of logic.
4. Use **ScrollTrigger** for scroll-linked sequences (polaroids, path draw); centralize cleanup in `useLayoutEffect` / `@gsap/react` patterns.
5. Finish with **accessibility pass**, image optimization, and build verification.

## Phase 1: Foundation and Page Shell

### Overview

Replace the starter UI with the real page structure, align `Layout` with usage, ensure fonts and tokens match the spec, and create empty or placeholder section components so later phases can plug in without reshaping the tree.

### Changes Required

#### 1. Layout and global styles

**File**: `src/layouts/Layout.astro`

**Changes**: Pass a default or explicit `title` from every page; correct the Google Fonts URL so Inter and Playfair load (use valid `family=` parameters). Optionally add weights for caption/body (e.g. 400/500) and document `lang` if copy mixes languages.

**File**: `src/styles/global.css`

**Changes**: Extend `@theme` with any missing utilities (e.g. explicit font sizes for H1/H2/body/caption if not expressed purely as Tailwind classes). Ensure `surface` glass usage is achievable via `bg-surface backdrop-blur-md` or equivalent.

#### 2. Directory skeleton

**New directories**:

- `src/components/ui/`
- `src/components/sections/`
- `src/components/interactive/`
- `src/hooks/`

#### 3. Main page composition

**File**: `src/pages/index.astro`

**Changes**: Remove `Welcome.astro`; import section components in story order inside `<Layout title="...">`. Use a single column wrapper with `max-w-md mx-auto` (or similar) per context.

**File**: `src/components/Welcome.astro`

**Changes**: Delete or stop importing from `index.astro` once replaced (remove file if unused).

#### 4. Placeholder exports

Add minimal placeholder components for each major block named in the context (`HeroIntro`, `MeetingAnimation`, etc.) so the build stays green while implementations land in later phases.

### Success Criteria

#### Automated Verification

- [x] `npm run build` completes with exit code 0.
- [x] No TypeScript errors reported by the Astro/TS pipeline (strict config in `tsconfig.json`).

#### Manual Verification

- [x] `npm run dev` shows the new section order with placeholders.
- [x] Fonts render as serif for headings and sans for body.
- [x] Background and text colors match the soft romantic palette.

---

## Phase 2: Shared UI Primitives and HeroIntro

### Overview

Add dumb presentational components (`Button`, `GlassCard`, heading/body wrappers) and implement the intro section with the line "Говорят, случайности не случайны..." plus a subtle fade-in (CSS or minimal GSAP) and scroll cue.

### Changes Required

#### 1. UI primitives

**Files**: `src/components/ui/*.tsx` or `.astro` (prefer Astro for static-only; React only if interaction requires it)

**Changes**: Glass card using `surface` token + `backdrop-blur-md`; typography scale per context (H1 40px, etc.); tap feedback via `active:scale-95` where buttons exist.

#### 2. HeroIntro

**File**: `src/components/sections/HeroIntro.astro` (or `.tsx` if animated with GSAP)

**Changes**: Semantic `<section>`; `min-h-[100dvh]`; content centered; optional reduced-motion-safe animation.

### Success Criteria

#### Automated Verification

- [x] `npm run build` succeeds.

#### Manual Verification

- [x] Intro reads clearly at 375px width.
- [x] No reliance on hover for core behavior.
- [x] With OS "reduce motion" enabled, intro does not play disruptive motion (verify `matchMedia` when GSAP is added).

---

## Phase 3: MeetingAnimation (Pinned GSAP Scene)

### Overview

Implement the boy/girl convergence, collision, heart/confetti reveal, and anniversary date inside a pinned ScrollTrigger section. Extract timeline logic into `src/hooks/useGsapTimeline` or similar if the component grows past ~100 lines.

### Changes Required

#### 1. React island

**File**: `src/components/interactive/MeetingAnimation.tsx`

**Changes**: `useRef` for container and avatars; register ScrollTrigger; animate `x`/`y` via transforms only; heart pop on `scale` + `opacity`; wrap animation registration in `gsap.matchMedia()` for `prefers-reduced-motion`.

#### 2. Page integration

**File**: `src/pages/index.astro`

**Changes**: Import island with `client:visible` or `client:load` (pinning often needs early init; prefer `client:load` if `visible` causes jump).

### Success Criteria

#### Automated Verification

- [x] `npm run build` succeeds.

#### Manual Verification

- [x] Section pins and scrubs correctly on mobile Safari.
- [x] Reduced motion: static or simplified state without broken layout.
- [x] No animation of width/height/margin/top/left.

---

## Phase 4: MemoriesTimeline and PolaroidCard

### Overview

Vertical stack of polaroid-style cards; each card enters with `y` + `opacity` via ScrollTrigger. Use Astro `<Image />` for photos in `src/assets/` (or a dedicated folder).

### Changes Required

#### 1. PolaroidCard

**File**: `src/components/ui/PolaroidCard.astro` (markup + styling) + optional small React wrapper for ScrollTrigger if cleaner than one parent controller.

#### 2. MemoriesTimeline

**File**: `src/components/sections/MemoriesTimeline.astro`

**Changes**: Map over a static array of memory metadata (date, image import, caption); each wrapped in `<article>` with meaningful `alt`.

### Success Criteria

#### Automated Verification

- [x] `npm run build` succeeds (image imports resolve).

#### Manual Verification

- [x] Cards stagger in smoothly on scroll.
- [x] Images are sharp and load progressively; LCP remains acceptable.

---

## Phase 5: JourneyPath SVG Draw

### Overview

SVG path along the scroll axis; `stroke-dashoffset` driven by ScrollTrigger timeline. Milestone icons positioned along the path.

### Changes Required

#### 1. SVG and section

**File**: `src/components/sections/JourneyPath.tsx` or `.astro` + React controller

**Changes**: Precompute path length for `stroke-dasharray`/`stroke-dashoffset`; animate only transform-related SVG properties or dashoffset as allowed by performance rules; icons as separate layers or absolutely positioned.

### Success Criteria

#### Automated Verification

- [x] `npm run build` succeeds.

#### Manual Verification

- [x] Path draws in sync with scroll on long pages.
- [x] Milestones remain aligned at common breakpoints.

---

## Phase 6: SwipeReasons

### Overview

Card stack with horizontal swipe (touch-first; pointer events for desktop). Temporarily competes with vertical scroll: use a dedicated full-height region and `touch-action` / gesture handling so swipes do not scroll the page unintentionally.

### Changes Required

#### 1. Hook

**File**: `src/hooks/useSwipe.ts`

**Changes**: Track drag delta, threshold, and exit direction; optional spring or GSAP for card exit.

#### 2. Component

**File**: `src/components/interactive/SwipeReasons.tsx`

**Changes**: Stack of cards with reasons as props; advance index on successful swipe.

### Success Criteria

#### Automated Verification

- [x] `npm run build` succeeds.

#### Manual Verification

- [x] Swiping works on a real phone; no accidental page scroll during horizontal drag.
- [x] Keyboard or alternative path not required for MVP unless you add it in scope.

---

## Phase 7: FinalLetter

### Overview

Envelope tap opens letter; content slides out; CTA button for real-life surprise. Prefer CSS transitions or GSAP on transform/opacity only.

### Changes Required

**File**: `src/components/sections/FinalLetter.tsx` or split Astro + React for animation.

**Changes**: `aria-expanded` or button semantics for open state; focus management for any modal-like behavior if overlay used.

### Success Criteria

#### Automated Verification

- [x] `npm run build` succeeds.

#### Manual Verification

- [x] Open/close is intuitive on touch.
- [x] CTA is visible and tappable.

---

## Phase 8: Polish and Performance

### Overview

Cross-cutting pass: audit all GSAP under `matchMedia`, verify `alt` text, compress assets (webp/avif), ensure sections use `py-24`/`py-32` rhythm, and confirm no layout thrashing.

### Changes Required

- Review every island for ScrollTrigger cleanup on unmount (`gsap.context` or `useGSAP` from `@gsap/react`).
- Add `@astrojs/check` or `astro check` if you want static analysis as a recurring gate (optional dependency addition).

### Success Criteria

#### Automated Verification

- [x] `npm run build` succeeds.

#### Manual Verification

- [x] Lighthouse or similar: reasonable performance on mobile throttling.
- [x] Full scroll journey feels cohesive; no flashes or jank at section boundaries.

---

## Testing Strategy

### Unit Tests

The project does not yet ship Vitest or a test script. Optional follow-up: add Vitest + React Testing Library for pure hooks (`useSwipe`) and GSAP-free helpers. GSAP-heavy UI remains primarily manual and visual.

### Integration Tests

Optional Playwright or Cypress for smoke navigation (not required for initial launch unless you add tooling).

### Manual Testing Steps

1. Load on iOS Safari: verify `100dvh` sections and pinned meeting.
2. Enable `prefers-reduced-motion`: verify reduced or static animations.
3. Scroll through entire page: no console errors; no stuck ScrollTriggers after fast scroll.
4. Swipe section: verify no gesture conflicts with browser back/forward.

## Performance Considerations

- Load React islands with `client:visible` where scroll-driven init is enough; use `client:load` only for above-the-fold or pin-critical components.
- Prefer Astro `<Image />` for raster assets; keep dimensions explicit.
- Avoid animating layout properties; batch ScrollTrigger `refresh` if dynamic content changes height.

## Migration Notes

- Remove `Welcome.astro` and starter assets once unused (`astro.svg`, `background.svg` if replaced).
- Keep real photo filenames and alt text out of public repos if privacy is a concern (use local-only assets or env-based URLs in a future iteration).

## References

- Context: `thoughts/context/flow-context.md`
- Current tokens: `src/styles/global.css`
- Layout: `src/layouts/Layout.astro`
- Entry: `src/pages/index.astro`
