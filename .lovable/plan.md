
User wants light theme as default with a dark mode toggle. They like the "Amber/Carbon" option for the dark theme. Going to plan a professional landing page for Apratim Adirtham (2-day robotics & drone fest, May 14–15, 2026).

Since they didn't answer the other questions, I'll use sensible defaults:
- Apply button: placeholder `#` link with a clear TODO comment (easy to swap)
- Per-event Apply: No, single main Apply button
- Contact: coordinator phone numbers from proposal + generic email placeholder

## Color themes

**Light (default)**
- Background: warm off-white `#FAFAF7`
- Foreground: near-black `#0A0A0A`
- Primary (accent): deep amber `#B45309`
- Secondary surface: soft cream `#F5F1E8`
- Muted text: warm gray `#6B6B6B`
- Border: `#E5E1D8`

**Dark (Amber / Carbon)**
- Background: carbon black `#0A0A0A`
- Foreground: warm white `#F5F1E8`
- Primary (accent): bright amber `#F59E0B`
- Card surface: charcoal `#171717`
- Muted text: warm gray `#A1A1AA`
- Border: `#262626`

Headline font: Space Grotesk (bold, modern, tech feel). Body: Inter.

## Page structure (single landing route — `src/routes/index.tsx`)

```text
┌─────────────────────────────────────────┐
│ Sticky Nav: Logo | Events About Contact │ ← theme toggle (sun/moon)
├─────────────────────────────────────────┤
│ HERO                                    │
│  APRATIM ADIRTHAM                       │
│  Robotics & Drone Fest                  │
│  📅 May 14–15, 2026                     │
│  [ Apply Now → ]  [ View Events ]       │
│  (animated gradient / grid backdrop)    │
├─────────────────────────────────────────┤
│ EVENTS (6 cards in responsive grid)     │
│  • Robo Race        • Drone Race        │
│  • Robo Soccer      • Line Follower     │
│  • Maze Solver      • Bot Wars (etc.)   │
│  Each: icon, name, short desc, rules    │
├─────────────────────────────────────────┤
│ ABOUT US                                 │
│  R&D Club intro + mission               │
├─────────────────────────────────────────┤
│ CONTACT                                  │
│  Coordinator names + phone numbers      │
│  Email + venue                           │
├─────────────────────────────────────────┤
│ Footer                                   │
└─────────────────────────────────────────┘
```

## Files to create / modify

1. **`src/styles.css`** — replace OKLCH tokens with the warm amber/carbon palette above for `:root` and `.dark`. Add Google Fonts import for Space Grotesk + Inter.
2. **`src/components/ThemeProvider.tsx`** — small client provider that toggles `dark` class on `<html>`, persists to `localStorage`, defaults to `light`.
3. **`src/components/ThemeToggle.tsx`** — sun/moon icon button using existing `Button` + lucide icons.
4. **`src/routes/__root.tsx`** — wrap `<Outlet />` in `ThemeProvider`; add proper `<head>` meta (title, description, og tags).
5. **`src/routes/index.tsx`** — replace placeholder with full landing page (Nav, Hero, Events, About, Contact, Footer). All sections in one route since user asked for a single landing page; in-page anchor links are fine here per guidance (single landing page TOC behavior).
6. **`src/components/landing/`** — split into `Navbar.tsx`, `Hero.tsx`, `EventsSection.tsx`, `EventCard.tsx`, `AboutSection.tsx`, `ContactSection.tsx`, `Footer.tsx` for clarity.

## Content sourced from the proposal
- Event title, dates, 6 sub-events with descriptions and rules
- About: R&D Club intro
- Contact: faculty + student coordinator phone numbers from doc

## Behavior details
- Theme toggle persists; respects no flash on load (inline script in `__root.tsx` head).
- Apply buttons link to `#` with `TODO: replace with Google Form URL` comment so user can swap one string.
- Fully responsive: mobile-first (single column), `sm` 2-col events, `lg` 3-col events.
- Subtle entrance animations via Tailwind `animate-in` utilities.

After approval I'll implement everything in one pass.
