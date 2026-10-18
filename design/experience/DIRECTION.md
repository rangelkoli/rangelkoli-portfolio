# DIRECTION — Experience (`/experience`)

## Brief (Self-authored from user prompt & live repo)

1. **What is it, and who is it for?**
   A dedicated `/experience` page on Rangel Koli's software engineering portfolio (`http://localhost:3001/experience`), paired with replacing the navbar's `About` link with `Experience`. Built for hiring managers, founders, and staff engineers who want to inspect Rangel's full career record beyond the 3-row homepage summary.
2. **The one job:**
   In ten seconds, let a visitor see Rangel's chronological engineering trajectory (`2019–2026`, from Mumbai to San Francisco, Syracuse, and New York), inspect the real production interfaces and measured latency/retention outcomes from each role, and either jump into the deep-dive case study or contact him directly.
3. **Three words & outside-the-web references:**
   *Exact, architectural, evidentiary.* References: an architectural practice's project specification binder, a flight-test telemetry strip chart, and a Dieter Rams Braun technical manual.
4. **What exists:**
   - Four software engineering roles from Rangel's resume (`OrangeHousing.com LLC`, `HereAfter Inc.`, `Delet`, and `GRIP – The Sparks Foundation`)
   - Two Computer Science / IT degrees (`Syracuse University` M.S. CS, GPA 3.85/4.0; `Mumbai University` B.E. IT, GPA 3.80/4.0) and two 1st-place hackathon wins (`CuseHacks 2024` for `WalkSafe`, `Hackathon 2023` for `AgroBasket`)
   - Real production screenshots and video walkthroughs in `public/projects/orange-housing/`, `public/projects/hereafter/`, `public/projects/walksafe/`, and `public/projects/judgify/`
   - Portfolio design system: `SectionTitle` (`Instrument Sans`), display headlines (`Bricolage Grotesque` optical size 96), light surface (`#F4F4F4`) & dark surface (`#1A1A1A`), and the signature rising electric-blue hover/active fill (`#2563EB` / `bg-blue-600`).
5. **Image generation:**
   Not used; every visual is either a real production screenshot/video from Rangel's shipped work or a code-drawn telemetry diagram.

---

## Category Default & Slop Faces Refused

- **Category default refused:** Developer portfolio "Experience" pages almost universally render a vertical central line with glowing dots, alternating left/right rounded cards, company logo placeholders, and five generic resume bullets pasted verbatim.
- **Slop faces refused:**
  - *Face 1 (The Paper Edition):* Warm cream paper, italic serif accent words, mono uppercase pill badges.
  - *Face 3 (The shadcn Dashboard):* A row of 4 KPI stat boxes at the top of the screen, multi-hue status badges, and nested rounded cards inside cards.
  - *The Overcorrection:* Numbered mono uppercase eyebrows (`01 — OVERVIEW`) with no visual richness on the first screen.

---

## Three Explorations (`public/explore-experience/`)

1. **Exploration A — Engineering Dossier & Interactive Tenure Rail (`public/explore-experience/a.html`, `design/experience/shots/explore-a/sheet.png`)**
   *Concept:* "`/experience` is an interactive engineering dossier where a 2022–2026 tenure rail scrubs an evidence stage showing each role's production interface and measured system benchmark."
   - **Ground:** Portfolio light (`#F4F4F4`) / dark (`#1A1A1A`)
   - **Type:** `Instrument Sans` + `Bricolage Grotesque` (`opsz 96`, 700)
   - **Richness:** Live interactive tenure rail + production screenshot stage + telemetry comparison
   - **Accent:** Electric blue (`#2563EB`)
   - **Grammar:** `catalogue`

2. **Exploration B — Dark Telemetry Ledger (`public/explore-experience/b.html`, `design/experience/shots/explore-b/sheet.png`)**
   *Concept:* "`/experience` is a dark control-room telemetry ledger pairing condensed display titles with inline SVG before/after latency bars."
   - **Ground:** Obsidian (`#0D0F14`)
   - **Type:** `Mango Grotesque` + `Instrument Sans`
   - **Richness:** Inline SVG benchmark bars
   - **Accent:** Teal (`#2DD4BF`)
   - **Grammar:** `index`
   - *Why it lost as standalone:* Locks the page to a dark-only palette and drops real product screenshots from the first viewport, though its **SVG before/after telemetry bar** is merged into Exploration A's role dossiers.

3. **Exploration C — Cobalt Blueprint Sheet (`public/explore-experience/c.html`, `design/experience/shots/explore-c/sheet.png`)**
   *Concept:* "`/experience` is a cobalt architectural specification sheet with serif headings and tabular schedules."
   - **Ground:** Cobalt colour-field (`#1338BE`)
   - **Type:** `Playfair Display` + `Instrument Sans`
   - **Richness:** Colour-material specification table
   - **Accent:** Warm amber (`#FDBA74`)
   - **Grammar:** `document`
   - *Why it lost:* Introduces `Playfair Display` and a full-bleed cobalt ground that breaks visual continuity with `/` and `/projects`, and lacks product screenshots on the first screen.

**Winner:** **Exploration A** merged with **Exploration B's inline SVG before/after telemetry bars**, built natively in the portfolio's light/dark theme system.
- **History check:** `site|object|light|grotesque|blue|data|catalogue` — clear, differs from all earlier looks on at least 4 of 6 columns.

---

## Tokens

- **Ground & Surfaces:**
  - Page ground: `var(--background)` (`#F4F4F4` light / `#1A1A1A` dark)
  - Elevated proof surface: `#FFFFFF` light / `#14161C` dark
  - Hairlines: `rgba(26, 26, 26, 0.12)` (`border-black/12`) light / `rgba(255, 255, 255, 0.15)` (`dark:border-white/15`) dark
- **Colour Roles:**
  - Primary ink: `#1A1A1A` light / `#F4F5F8` dark
  - Secondary body ink: `#3F3F46` light / `#D1D3DC` dark
  - Muted metadata ink: `#52525B` light / `#9A9EAC` dark (all measured >= 4.6:1 contrast on both surfaces)
  - Accent (`#2563EB` / `bg-blue-600`): Active tenure selector fill, rising hover band, and active telemetry bar fill, always paired with `#FFFFFF` ink (`5.17:1` contrast).
- **Typography (2 families only):**
  - Display & company names: `Bricolage Grotesque` (`font-bricolage`), `700`, `opsz 96`, `-0.02em` tracking.
  - Page title, UI controls, and body copy: `Instrument Sans` (`font-instrument`), `16px` body (`leading-[1.65]`, `max-w-[62ch]`), `tabular-nums` on every date, duration, GPA, and benchmark figure.
- **Layout & Radius:**
  - Max width: `max-w-7xl` (`72rem`) aligned to `Header` and `Footer`
  - Hairline grid divisions (`1px`), `2px` (`rounded-sm`) on media frames, `9999px` (`rounded-full`) only on action pills.

---

## Grammar (`catalogue` — 4 sections)

1. **Header + First-Screen Interactive Tenure Matrix (`#matrix`)** — *Where has Rangel worked, and what did he ship?*
   - `SectionTitle` (`h1` "Experience") with a direct primary action (`Get in touch →` scrolling to `#contact` and `View all projects →` linking to `/projects`).
   - Immediately below in the first viewport: the **Interactive Career Matrix (2022 – 2026)** with 4 selectable role tabs (`Orange Housing`, `HereAfter`, `Delet`, `GRIP Foundation`) and a live **Evidence & Telemetry Stage** showing the active role's production media, key engineering outcome, and an SVG before/after benchmark comparison (`35.8ms → 5.6ms` UI query latency for Orange Housing, `+40%` visitor engagement in 6 weeks for HereAfter, `-40%` stream load time on AWS for Delet, `-25%` checkout abandonment for GRIP).
2. **Complete Role Dossiers (`#roles`)** — *What did he own, architect, and measure in each role?*
   - Four full-width hairline-divided role dossiers (`01` to `04`). Each dossier pairs the role metadata (period, location, stack icons, links to case study / live site / GitHub) on the left with numbered architectural contributions, an inline SVG before/after metric bar, and real product screenshots/video on the right.
3. **Academic Foundation & Honors (`#education`)** — *Where did he train, and what has he won?*
   - Two-column hairline ledger:
     - **Education:** Syracuse University (`M.S. in Computer Science · GPA 3.85 / 4.0 · 2023 – 2025`) and Mumbai University (`B.E. in Information Technology · GPA 3.80 / 4.0 · 2019 – 2023`) with specific systems/ML coursework.
     - **Hackathon Wins:** `1st Place · CuseHacks 2024` (`WalkSafe`, Syracuse University) and `1st Place · Hackathon 2023` (`AgroBasket`), each linking directly to its technical case study.
4. **Footer (`#contact`)** — Shared site footer with `rangelkoli@gmail.com` and explore/social links.

---

## Signature Storyboard

- **The Signature:** **Interactive Career Telemetry & Evidence Stage**
  - **Trigger:** Clicking, hovering, or keyboard-focusing any of the 4 tenure tracks in the top Career Matrix (or clicking "Inspect on stage" from any role dossier).
  - **Frames & Timing:**
    1. The selected tenure track fills from its bottom edge with `#2563EB` (`bg-blue-600`, `450ms cubic-bezier(0.22, 1, 0.36, 1)`) and flips its text to crisp white (`#FFFFFF`).
    2. In the adjacent Evidence Stage, the production screenshot/video wipes upward (`clip-path: inset(100% 0 0 0)` → `inset(0 0 0 0)`, `500ms cubic-bezier(0.22, 1, 0.36, 1)`), while the SVG before/after telemetry bar animates its comparison fill to the role's measured improvement.
  - **Reduced motion (`prefers-reduced-motion: reduce`):** No clip-path wipe or bar sweep transitions; switching roles swaps the stage and telemetry readout instantaneously, and videos stay paused with their poster frame visible.

---

## Voice

Direct, factual engineering log: concrete systems nouns, real stack names, and specific measured deltas (`35.8ms to 5.6ms`, `8,346 police reports`, `GPA 3.85 / 4.0`) with zero exclamation marks, zero em-dashes, and zero marketing clichés.
