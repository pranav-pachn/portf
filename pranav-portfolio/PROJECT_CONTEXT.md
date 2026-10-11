# Project Context & Engineering Handoff

Comprehensive architecture, design system, motion guidelines, and implementation documentation for the portfolio of **Pranav Pachunoori** (Full-Stack & AI Product Engineer).

---

## 1. Project Overview & Identity

- **Target Persona**: Pranav Pachunoori — Full-Stack & AI Product Engineer based in Hyderabad, India.
- **Design Philosophy**: Restrained, confident editorial product engineering. A blend of **editorial typography, architectural surface rhythm, and deterministic systems engineering**.
- **Visual Tone**: Warm off-white primary surfaces, near-black editorial typography, hairline dividers, a restrained cobalt-blue accent, and selective charcoal bookends creating an intentional chaptered publication feel.
- **Repository Location**: `c:\Users\prana\Projects\portf\pranav-portfolio`

---

## 2. Technology Stack

- **Framework**: Next.js 16.2.9 (App Router, Turbopack, React 19).
- **Styling**: Tailwind CSS v4 (`@theme inline` in `app/globals.css`).
- **Smooth Scroll & Animation Engine**:
  - `lenis` (`^1.3.26`) for inertial, butter-smooth scroll momentum.
  - `gsap` + `ScrollTrigger` + `@gsap/react` for scroll-scrubbed surface interpolation, pinned showcase sequences, and timelines.
  - `framer-motion` for spring-based UI micro-interactions, modal overlays, and restrained vertical reveals.
- **Type Safety**: TypeScript 5+ in strict mode.
- **Icons & Graphics**: `lucide-react`, vector SVGs, and responsive `matrix3d` screen projection quad.

---

## 3. Design System & Dynamic Surface Tokens

The design system uses a **Dynamic Surface Token System** in [`app/globals.css`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/app/globals.css) and [`components/motion/ScrollColorProgression.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/motion/ScrollColorProgression.tsx). Rather than hardcoded static section colors, surface variables interpolate continuously across section boundaries:

### Dynamic Surface Variables (CSS `:root`)
- `--surface-bg`: Background color of the active scroll zone.
- `--surface-text`: High-contrast primary reading color.
- `--surface-border`: Hairline structural border color.
- `--surface-muted`: Secondary technical metadata and caption color.

### Palette Presets

| Preset | Background (`--surface-bg`) | Primary Text (`--surface-text`) | Border (`--surface-border`) | Muted Text (`--surface-muted`) |
| :--- | :--- | :--- | :--- | :--- |
| **Ivory** (Default) | `#F2F0EA` | `#171715` | `#D8D4CA` | `#77736B` |
| **Warm Grey** | `#E9E6DE` | `#171715` | `#D8D4CA` | `#77736B` |
| **Charcoal** (Dark) | `#191919` | `#F2F0EA` | `#2D2D2D` | `#A09A91` |

### Accent Scale (Cobalt Electric Blue)
- Base Accent: `hsl(220, 70%, 44%)` / `#174FE8` (`--color-accent-500`)
- Hover Accent: `#0F3CC0` (`--color-accent-600`)
- Subtle Tint / Glow: `rgba(23, 79, 232, 0.14)`

### Typography Hierarchy
- **Editorial Sans**: `General Sans` (Fontshare: 400, 500, 600, 700) — `--font-editorial`
- **Editorial Serif (Italic Accent)**: `Instrument Serif` / `Newsreader` (Google Fonts) — `--font-serif-italic`
- **Technical Monospace**: `IBM Plex Mono` / system monospace — `--font-mono`

---

## 4. Scroll-Progress-Driven Surface Progression

Surface transitions are powered by [`ScrollColorProgression.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/motion/ScrollColorProgression.tsx). Color changes are **scroll-progress-driven** (not time-based), mapping scroll progress linearly to color values so upward scrolling naturally reverses without snap, delay, or jump.

### Boundary Mapping

```
[Hero] ── Ivory (#F2F0EA)
  │
  ▼ (Hero → Work: Ivory → Warm Grey, scrubbed top 95% → 60%)
[01 Selected Work] ── Pinned Runway in Warm Grey (#E9E6DE)
  │
  ▼ (Work → Services: Warm Grey → Ivory, scrubbed top 95% → 60%)
[02 Services] ── Warm Ivory (#F2F0EA)
  │
  ▼ (Services → About: Ivory → Charcoal, scrubbed top 95% → 35%)
[03 About & Engineering Manuals] ── Charcoal (#191919)
  │
  ▼ (About → Experience: Charcoal → Ivory, scrubbed top 95% → 35%)
[04 Experience] ── Warm Ivory (#F2F0EA)
  │
  ▼ (Experience → Contact: Ivory → Charcoal, scrubbed top 95% → 40%)
[05 Contact & Footer] ── Charcoal (#191919) Bookend
```

### Key Engineering Invariants
1. **Coordinated Surface Transition**: Background, text, dividers, and muted technical labels change simultaneously in lockstep.
2. **Pre-Boundary Initiation**: The transition begins as the incoming section starts entering the viewport (`top 95%`), avoiding abrupt cuts.
3. **Transparent Section Roots**: Sections do not declare hardcoded opaque `bg-[#191919]` or `bg-[#F2F0EA]` classes; they inherit `bg-transparent` over the parent surface.
4. **Reversible Linear Scrubbing**: Lenis drives GSAP ticker, providing instantaneous interpolation on forward and reverse scrolls.

---

## 5. Page Architecture & Section Flow

Primary page flow assembled in [`app/page.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/app/page.tsx):

```
Hero (Identity) → 01 Work (Sticky Showcase) → 02 Services → 03 About (Manuals + Manifesto) → 04 Experience → 05 Contact → Footer
```

### Hero (Identity)
- **Component**: [`HeroPanel.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/home/panels/HeroPanel.tsx) wrapped in [`BlueprintTransition.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/motion/BlueprintTransition.tsx).
- **Surface**: Warm Ivory (`#F2F0EA`).
- **Layout**: 44% text column / 56% artwork column on shared `max-w-[1440px]` grid.
- **Headline**: 3-line cadence pairing `Instrument Serif` italics with `General Sans`:
  - Line 1: `I build digital` (`I build` serif italic + `digital` sans medium)
  - Line 2: `products with` (sans medium)
  - Line 3: `depth.` (serif italic)
- **Artwork**: [`HeroArtwork.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/home/HeroArtwork.tsx)
  - Photorealistic Space Grey MacBook Pro sculpture on travertine plinths (`public/hero-laptop-focused.jpg`).
  - Screen diagram projected via responsive CSS `matrix3d` quad with pulsing vector data flows (`USER` → `CORE` → `AI`, `DATA`, `APIs`).

### 01 Selected Work: Pinned Showcase
- **Component**: [`StickyProjectShowcase.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/home/panels/StickyProjectShowcase.tsx).
- **Surface**: Warm Grey (`#E9E6DE`).
- **Mechanism**: Pinned GSAP ScrollTrigger timeline cycling featured project cards (`01`, `02`, `03`, `04`, `05`).
- **Data Source**: [`data/featured-projects.ts`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/data/featured-projects.ts).
- **Interactions**: Magnetic circular cursor, live link triggers, responsive browser frames.

### 02 Services: Engineering Capabilities
- **Component**: [`ServicesPanel.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/home/panels/ServicesPanel.tsx).
- **Surface**: Warm Ivory (`#F2F0EA`).
- **Layout**: Editorial ledger with hairline dividers and hover state accents:
  1. `01 / PRODUCT DEVELOPMENT` — Full-Stack Product Development
  2. `02 / APPLIED AI` — AI-Powered Applications
  3. `03 / SYSTEMS` — Backend & System Engineering
- **Bottom Callout**: Direct inquiry link to `#contact`.

### 03 About: Technical Depth & Engineering Manuals
- **Component**: [`AboutSection.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/home/AboutSection.tsx).
- **Surface**: Charcoal (`#191919`).
- **Sections**:
  - `03 — ENGINEERING MANUALS`: Interactive 3D flip handbook ([`ManualBook.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/home/ManualBook.tsx) & [`EngineeringManuals.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/home/EngineeringManuals.tsx)) covering Frontend, Backend Architecture, and AI Systems.
  - `03B — PERSPECTIVE`: Editorial tenets (Deterministic Engineering, Taste as a Function of Detail, End-to-End Ownership) and background ledger.

### 04 Experience: Production Timeline
- **Component**: [`ExperiencePanel.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/home/panels/ExperiencePanel.tsx).
- **Surface**: Warm Ivory (`#F2F0EA`).
- **Mechanism**: Scrubbed timeline line ([`useExperienceTimeline.ts`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/motion/useExperienceTimeline.ts)) illuminating nodes and expanding experience cards.

### 05 Contact & Footer: Inquiries & Bookend
- **Components**: [`ContactPanel.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/home/panels/ContactPanel.tsx) & [`Footer.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/layout/Footer.tsx).
- **Surface**: Charcoal (`#191919`).
- **Elements**: Direct email action, active availability badge, social links, and copyright metadata.

---

## 6. Motion Philosophy & Restraint

- **Major Motion Centerpiece**: Pinned Selected Work showcase provides the major physical motion on the page.
- **Atmospheric Contrast**: Light-to-dark surface transitions provide environmental mood without theatrical camera pans.
- **Restrained Reveals (`subtleRise`)**: Heading and text reveals use subtle opacity changes with restrained 8–12px vertical movement (`y: 10 -> 0`, `duration: 0.5s`) via [`subtleRise`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/lib/animations.ts#L120-L127). Heavy mask clips and large sliding distances are strictly avoided.
- **Reduced Motion Support**: All GSAP timelines and Framer Motion components respect `prefers-reduced-motion` via [`use-reduced-motion.ts`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/hooks/use-reduced-motion.ts).

---

## 7. Navigation Architecture

Navigation operates through a two-tiered system balancing clean viewport real estate with persistent accessibility:

### 1. Top Header ([`Header.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/layout/Header.tsx))
- **Visibility**: Visible when the user is at the top of the page (`scrollY <= 20`).
- **Scroll Behavior**: Slides cleanly out of view (`-translate-y-full opacity-0 pointer-events-none`) when the user scrolls down, and slides back into view when returning to the top.
- **Elements**: `Pranav.` logo left; horizontal section links (`Work`, `Services`, `About`, `Experience`, `Contact`) right.

### 2. Floating Circular Menu ([`FloatingMenu.tsx`](file:///c:/Users/prana/Projects/portf/pranav-portfolio/components/layout/FloatingMenu.tsx))
- **Availability**: Persistent across all screen sizes (desktop and mobile) anchored at `top-3.5 right-4 sm:top-4 sm:right-6 md:top-3.5 md:right-8 lg:top-4 lg:right-10 z-50`.
- **Dynamic Contrast Adaptation**: Uses `bg-[var(--surface-bg)] text-[var(--surface-text)] border-[var(--surface-border)]`, smoothly and continuously interpolating contrast alongside surface transitions without abrupt stepping.
- **Interaction**: Circular button morphs 3-line indicator into an 'X', revealing the full-screen editorial chapter drawer with smooth keyboard accessibility (`Escape` key).

---

## 8. Directory Structure

```
pranav-portfolio/
├── app/
│   ├── globals.css           # Tailwind v4 theme tokens, surface variables, font rules
│   ├── layout.tsx            # Root layout: Lenis provider, Header, Footer, FloatingMenu
│   ├── page.tsx              # Home assembly: Hero → Work → Services → About → Exp → Contact
│   └── work/[slug]/          # Deep-dive case study routes with system diagrams
├── components/
│   ├── home/
│   │   ├── panels/           # HeroPanel, StickyProjectShowcase, ServicesPanel, ExperiencePanel, ContactPanel
│   │   ├── AboutSection.tsx  # Engineering Manuals + Editorial Perspective
│   │   ├── HeroArtwork.tsx   # Laptop sculpture with matrix3d SVG quad overlay
│   │   └── ManualBook.tsx    # 3D interactive flip engineering manual
│   ├── layout/
│   │   ├── Header.tsx        # Top navigation (hides on scroll, reveals at top)
│   │   ├── FloatingMenu.tsx  # Universal circular morphing trigger & editorial drawer
│   │   ├── Footer.tsx        # Charcoal closing bookend
│   │   └── ScrollOrchestrator.tsx # Lenis + GSAP animation clock bridge
│   ├── motion/
│   │   ├── ScrollColorProgression.tsx # 5-boundary scroll-progress surface color interpolator
│   │   ├── AnimateOnScroll.tsx        # Framer Motion scroll observer (subtleRise, fadeIn, etc.)
│   │   └── BlueprintTransition.tsx    # Hero entrance settle
│   └── ui/                   # Container, Button, Card, SectionHeading, AnimatedLink
├── data/
│   ├── featured-projects.ts  # Project data, metrics, screenshots, live links
│   └── nav-links.ts          # Section anchors (Work, Services, About, Experience, Contact)
└── public/
    └── hero-laptop-focused.jpg # High-res sculpture asset
```

---

## 9. Verification & Build Commands

```bash
# Start local development server (Turbopack)
npm run dev

# TypeScript typechecking (strict mode validation)
npx tsc --noEmit

# Production bundle build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## 10. Critical Constraints & Conventions

1. **Surface Continuity**: Never apply static hardcoded background classes (`bg-[#191919]`, `bg-[#F2F0EA]`) to section roots on the homepage; let them inherit `--surface-bg` to prevent opaque box cuts during boundary interpolation.
2. **Transform Protection on Root**: Never add `transform` or `will-change: transform` to `#page-wrapper` during normal scrolling; doing so breaks GSAP `position: fixed` pins.
3. **Restrained Motion**: Use `variant="subtleRise"` (`y: 10`, `duration: 0.5s`) for section reveals. Avoid heavy mask clipping or large translation distances.
4. **Lenis / GSAP Clock Synchronization**: Lenis must always drive through GSAP ticker (`lenis.on('scroll', ScrollTrigger.update)`) to guarantee 100% synchronous scroll math.
5. **Shared Container Standard**: All primary sections align strictly to `w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12`.
