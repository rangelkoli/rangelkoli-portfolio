# CRITIQUE — After Hours (`BeyondTheCodeSection.tsx`)

## Round 1 → Round 2 Scores

| # | Rubric Line | R1 | R2 | Evidence |
|---|---|---|---|---|
| 1 | **Concept on the page** | 4 | 5 | The continuous tactical telestrator arc across all four clips (`01 Keeper Release` → `02 Touchline Build-Up` → `03 Midcourt 1v1` → `04 Spot-Kick Finish`) makes the futsal sequence immediately legible without reading a paragraph. |
| 2 | **Not the category average** | 4 | 5 | Refuses the standard grid of plain vertical video thumbnails; treats the four clips as four sequential stations on one court. |
| 3 | **Not a slop face** | 4 | 5 | Zero pill soup, zero fake blinking status dots, zero indigo gradients or bento boxes. |
| 4 | **First screen (of component)** | 4 | 4 | Section header, 4-clip single-row stage, active station reticle, and audio toggle are all visible at once on desktop and phone. |
| 5 | **Typography** | 4 | 5 | Uses the portfolio's native `Instrument Sans` + `Bricolage Grotesque` (`opsz 96`, 700) scale with tabular numerals (`01`–`04`, durations) and zero sub-12px text. |
| 6 | **Colour** | 4 | 5 | Coheres with the portfolio's `#F4F4F4` / `#1A1A1A` surfaces and reuses the exact `#2563EB` (`bg-blue-600`) rising footer fill from `ProjectsSection` and `ExperienceSection`, while inactive clips desaturate (`grayscale-[0.68]`). |
| 7 | **Richness** | 4 | 5 | Four real indoor futsal video clips paired with a live dynamic SVG coaching telestrator overlay. |
| 8 | **Structure and rhythm** | 4 | 5 | Strictly locked to a single horizontal row (`flex-row items-stretch`) with horizontal accordion expansion (`1.38fr` vs `0.88fr`). |
| 9 | **Craft** | 4 | 5 | R2 computes station X coordinates dynamically from the accordion flex weights (`ACTIVE_FLEX` / `INACTIVE_FLEX`) so each SVG target reticle stays centered on its card as the accordion shifts, and adds the keeper origin cross-mark (`×`) + lead-in arc at Station `01`. |
| 10 | **Responsive** | 4 | 4 | Phone (`390px`) uses a single-row horizontal snap carousel (`snap-start`, `78vw` cards) with zero text clipping. |
| 11 | **Everyone's computer** | 4 | 4 | Semantic `<button type="button">` cards with `aria-pressed`, keyboard focus rings, high-contrast scrims (`>7:1`), and `prefers-reduced-motion` support. |
| 12 | **Signature** | 4 | 5 | Hovering or focusing any clip in the row expands its frame, snaps the tactical crosshair reticle and solid blue pass trajectory to that station, brings the clip into full colour, and raises the `bg-blue-600` footer band. |
| 13 | **The screenshot test** | 4 | 5 | The four-card single row spanned by a continuous tactical pass line and rising electric-blue stage reads like an editorial sports broadcast piece. |
| 14 | **Fidelity (Redesign)** | 5 | 5 | All 4 original futsal clips, `SectionTitle` ("After Hours" / "Off the clock"), viewport autoplay, `data-loader-media="video-card"`, and per-card audio toggle are preserved in a single row. |

**Verdict:** Done by the stop rule (0 FAILs in the component, all rubric lines >= 4).
