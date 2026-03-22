# Project Context: "Our Story" - Anniversary Scrollytelling Website

## 1. Project Overview
A highly emotional, mobile-first, scrollytelling website built by a boyfriend for his girlfriend to celebrate their 2-year anniversary. The site acts as an interactive digital memory book, guiding the user through the timeline of their relationship using scroll-driven animations, personal photos, and interactive micro-interactions.

**Core Tech Stack:**
- **Framework:** Astro (for zero-JS static generation and fast LCP) + React Islands (`client:load`, `client:visible`).
- **Language:** TypeScript (Strict mode).
- **Styling:** Tailwind CSS (Utility-first, heavily relying on custom design tokens).
- **Animations:** GSAP (ScrollTrigger) for complex scroll sequences, and Tailwind transitions for simple micro-interactions.

---

## 2. Design System & UI Specs (Mobile-First)
The aesthetic is "Soft Romantic / Glassmorphism" — airy, light, elegant, avoiding cliché "red and black" romantic themes.

### Typography
- **Headings (Display/H1-H3):** `Playfair Display` or `Cormorant Garamond` (Serif, Elegant).
- **Body & Captions:** `Inter` or `Manrope` (Sans-serif, Clean).
- **Scale:** H1 `40px` (leading-tight), H2 `32px`, Body `16px` (leading-relaxed), Caption `12px` (uppercase, tracking-widest).

### Color Palette (Tailwind Configuration)
- `bg-base`: `#FFF5F5` (Rose White - warm, soft background).
- `surface`: `rgba(255, 255, 255, 0.7)` with `backdrop-blur-md` (Glass effect for cards).
- `text-primary`: `#2D2A2A` (Charcoal - softer than pure black).
- `accent`: `#EFA8B8` (Blush - for dates, highlights, and subtle borders).

### Spacing & Layout (8pt System)
- **Container:** Mobile optimized. Max-width constraints on larger screens (e.g., `max-w-md mx-auto`).
- **Vertical Rhythm:** Large gaps between sections to allow animations to breathe (`py-24` or `py-32` / `96px` - `128px`).
- **Heights:** Use `h-[100dvh]` or `min-h-[100dvh]` instead of `vh` to fix iOS Safari toolbar jumps.

---

## 3. Logical Flow & Component Structure

The page is a continuous vertical scroll, structured into sequential blocks:

1. **Intro Section (`<HeroIntro />`):**
   - **Visual:** Soft fade-in, text "Говорят, случайности не случайны...".
   - **Interaction:** Scroll down to begin.

2. **The Meeting (`<MeetingAnimation />`):**
   - **Visual:** A pinned section (`GSAP pin: true`).
   - **Interaction:** On scroll, a boy emoji/avatar and a girl emoji/avatar slide from opposite edges (`xPercent`) to the center. They collide, triggering a heart/confetti pop (`scale` + `opacity`), revealing the anniversary date.

3. **Memory Gallery (`<MemoriesTimeline />` & `<PolaroidCard />`):**
   - **Visual:** A vertical sequence of polaroid-style photo cards.
   - **Interaction:** As they enter the viewport (`ScrollTrigger`), they float up and fade in (`y: 50, opacity: 0 -> 1`).

4. **The Journey (`<JourneyPath />`):**
   - **Visual:** An SVG line/path spanning down the screen.
   - **Interaction:** The SVG path "draws" itself as the user scrolls down (`stroke-dashoffset` animation via GSAP), passing by little milestone icons.

5. **Swipeable Reasons (`<SwipeReasons />`):**
   - **Visual:** A stack of cards like Tinder.
   - **Interaction:** Shift from scroll to touch. User swipes left/right to read reasons "Why I love you".

6. **Final Love Letter (`<FinalLetter />`):**
   - **Visual:** A beautiful envelope.
   - **Interaction:** Tap to open. The letter slides out. Ends with a CTA button for a real-life surprise.

---

## 4. Architecture & File Structure

```text
src/
├── assets/          # Compressed images (webp/avif), SVGs
├── components/
│   ├── ui/          # Dumb components (Button, Typography, GlassCard)
│   ├── sections/    # Smart components (Hero, Timeline, Swiper)
│   └── interactive/ # Heavy GSAP/React components (MeetingAnimation)
├── hooks/           # useGsapTimeline, useSwipe, etc.
├── layouts/         # Base HTML head, fonts, global styles
└── pages/
    └── index.astro  # Main entry point importing React Islands
5. Development Rules & Best Practices (Cursor AI Instructions)
When generating code for this project, STRICTLY adhere to the following rules:

Performance over Everything: - DO NOT animate layout properties (width, height, margin, top, left).

ONLY animate transform (translate, scale, rotate) and opacity using GSAP or Tailwind.

Use Astro's <Image /> component for automatic optimization.

Mobile-First Mindset:

Design for 375px - 430px widths first. Do not rely on hover states for core functionality (use them only as progressive enhancement for desktop).

Use active:scale-95 for tap feedbacks instead of complex hovers.

Accessibility (a11y):

Include meaningful alt attributes for all personal photos.

Use semantic HTML tags (<section>, <article>, <time>).

Wrap GSAP animations in gsap.matchMedia() to respect prefers-reduced-motion.

Clean Code:

Keep React components small. Extract GSAP logic into custom hooks if the component grows over 100 lines.

Use standard Tailwind utility classes.
