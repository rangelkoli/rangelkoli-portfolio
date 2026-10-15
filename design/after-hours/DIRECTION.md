# DIRECTION — After Hours (`BeyondTheCodeSection.tsx`)

## Brief (Self-authored from user prompt & live repo)

1. **What is it, and who is it for?**
   Redesign of the **After Hours** section (`components/BeyondTheCodeSection.tsx`) on Rangel Koli's personal software engineer portfolio (`http://localhost:3001`), viewed by hiring managers, founders, and engineering peers.
2. **The one job:**
   Show who Rangel is off the clock—weekly five-a-side indoor futsal on a gym floor—in a single-row interactive video piece that feels crafted by a top design studio and coheres with the portfolio's existing `Projects` and `Experience` sections.
3. **Hard constraint from the user:**
   **All four videos must sit in the same horizontal row.** Any visual or interactive effects over the row are encouraged, as long as all four clips stay in one row.
4. **Three words & outside-the-web references:**
   *Tactical, kinetic, floodlit.* References: a futsal coach's dry-erase telestrator clipboard, Monday Night Football's live broadcast telestrator arcs, and a 35mm contact sheet under a loupe.
5. **What exists:**
   - Four vertical (9:16) indoor futsal clips: `/soccer-clip-1.mp4`, `/soccer-clip-3.mp4`, `/soccer-clip-4.mp4`, `/soccer-clip-2.mp4`
   - Portfolio design system: `SectionTitle` (`Instrument Sans`), display cards (`Bricolage Grotesque` optical size 96), light surface (`#F4F4F4`) & dark surface (`#1A1A1A`), and the signature rising electric-blue hover fill (`#2563EB` / `bg-blue-600`) used in `ExperienceSection` and `ProjectsSection`.

---

## Current Audit & Keep List

- **Before (`git HEAD` / attached screenshot):**
  Four rounded vertical video cards in a 4-column row with alternating vertical scroll offsets (`yUp` / `yDown`) that broke horizontal alignment, plus a mute icon in the bottom-right corner and no context for what each clip shows.
- **Refused category defaults & slop tells:**
  - *Refused:* Scattered vertical offsets that break the single-row baseline.
  - *Refused:* Badge/pill soup (stacking 5–6 tiny 10px glass pills, fake live blinking dots, and nested borders inside each card).
  - *Refused:* The Paper Edition serif-italic cliché and generic SaaS bento grids.
- **Keep list (contract):**
  - `SectionTitle` with `title="After Hours"` and `eyebrow="Off the clock"`
  - All 4 futsal video clips (`/soccer-clip-1.mp4`, `/soccer-clip-2.mp4`, `/soccer-clip-3.mp4`, `/soccer-clip-4.mp4`) in **one single horizontal row**
  - Viewport-aware autoplay (`IntersectionObserver`) + reduced-motion pause
  - Per-card click/keyboard audio mute/unmute toggle (`activeAudioIndex`)
  - `data-loader-media="video-card"` hook for `LoaderContext`

---

## Three Single-Row Explorations

1. **Exploration A — Tactical Telestrator Strip (`public/explore-ah/a.html`)**
   *Concept:* "`After Hours` is a coach's tactical telestrator where a single continuous play trajectory arcs across all four clips in the row, from keeper release to far-post finish."
   - **Ground:** Portfolio paper (`#F4F4F4`) / dark (`#1A1A1A`)
   - **Type:** `Bricolage Grotesque` (`opsz 96`, 700) + `Instrument Sans`
   - **Effect over the row:** A continuous SVG court diagram (halfway line, center circle, and Bezier pass trajectory connecting stations `01 → 02 → 03 → 04`) spans directly over the 4-card row, paired with horizontal accordion expansion and a rising `#2563EB` bottom band.

2. **Exploration B — 35mm Contact Sheet (`public/explore-ah/b.html`)**
   *Concept:* "`After Hours` is a 35mm film contact strip where four consecutive frames share a single edge-to-edge sprocket rail."
   - **Ground:** Darkroom obsidian (`#0B0C0F`)
   - **Type:** `Mango Grotesque` + `Instrument Sans`
   - **Effect over the row:** Edge-to-edge hairlines, monochrome-to-colour hover reveal.
   - *Why it lost as standalone:* Breaks away from the portfolio's light/dark theme surface and `SectionTitle` system, though its **monochrome-to-colour spotlight** on hover is merged into A.

3. **Exploration C — 3D Floodlight Collector Cards (`public/explore-ah/c.html`)**
   *Concept:* "`After Hours` is a row of four physical match-day collector cards tilted in 3D under gym floodlights."
   - **Ground:** Warm hardwood (`#ECE8DF`)
   - **Type:** `Schibsted Grotesk` + `Instrument Sans`
   - **Effect over the row:** 3D perspective tilt + diagonal specular sheen.
   - *Why it lost:* Treats the four videos as separate isolated cards rather than unifying the entire row with a cross-row visual effect.

**Winner:** **Exploration A** merged with **B's monochrome-to-colour spotlight** — keeping the portfolio's native `SectionTitle`, `Bricolage Grotesque` display voice, and rising `#2563EB` hover fill while uniting all four clips in one row under a live interactive SVG tactical telestrator overlay.

---

## Tokens & Signature Storyboard

- **Tokens:**
  - Ground: `#F4F4F4` (light) / `#1A1A1A` (dark)
  - Card surface: `#0D0E12` with `1px solid rgba(26,26,26,0.14)` (light) / `rgba(255,255,255,0.16)` (dark)
  - Accent: `#2563EB` (`bg-blue-600`, rising bottom band & active station node) + `#60A5FA` (active SVG pass trajectory)
  - Typography:
    - Section heading: `Instrument Sans` `clamp(52px, 6.5vw, 84px)` via `SectionTitle`
    - Card play title: `Bricolage Grotesque` `24px–28px`, `font-weight: 700`, `font-variation-settings: "opsz" 96`
    - Metadata & station numbers: `Instrument Sans` `12px–13px`, `tabular-nums`
- **The Signature (Interactive Cross-Row Telestrator + Rising Blue Stage):**
  - **Trigger:** Hovering, focusing, or toggling audio on any of the 4 clips in the row (defaults to Station `01` at rest so the first screen has an immediate focal point).
  - **Frames & Timing:**
    1. The active card widens (`flex: 1.42`) over `500ms cubic-bezier(0.22, 1, 0.36, 1)` while the other three cards narrow (`flex: 0.88`) and shift to desaturated monochrome (`grayscale(0.85) contrast(1.06)`).
    2. Across the SVG telestrator layer spanning all 4 cards, the solid electric-blue Bezier pass path (`stroke-dashoffset`) draws from Station `01` up to the active station (`01`, `02`, `03`, or `04`), locking a target ring onto that clip's action point.
    3. Inside the active card, the `bg-blue-600` footer band rises from the bottom edge (`scaleY(0)` → `scaleY(1)`), matching `ProjectsSection` and `ExperienceSection`.
  - **Reduced motion:** Accordion width shifts, video playback, and path dash animations are disabled; all four clips sit calmly in one row with the full pass line rendered statically.
- **Voice:** Direct, observational player's notebook—short futsal calls (`Keeper Release`, `Touchline Build-Up`, `Midcourt 1v1`, `Spot-Kick Finish`), no marketing fluff.

## Content

- **Eyebrow:** `Off the clock`
- **Title:** `After Hours` `(04)`
- **Description:** `Five-a-side indoor futsal most weeks. Four plays traced from keeper release to the far post.`
- **Row Clips (ordered left-to-right across the court):**
  1. `01` · `/soccer-clip-1.mp4` · **Keeper Release** · `Own Box · Q1` · `Quick outlet pass out of pressure · 0:17`
  2. `02` · `/soccer-clip-3.mp4` · **Touchline Build-Up** · `Right Wing · Q2` · `Two-touch wall pass down the line · 0:32`
  3. `03` · `/soccer-clip-4.mp4` · **Midcourt 1v1** · `Center Circle · Q3` · `Sharp cut inside at the halfway line · 0:29`
  4. `04` · `/soccer-clip-2.mp4` · **Spot-Kick Finish** · `Far Goal · FT` · `Six-meter penalty before lights out · 0:26`
