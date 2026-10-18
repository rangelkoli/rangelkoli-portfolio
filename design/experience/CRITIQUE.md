# Design Critique Log — `/experience`

## Round 1 Critique (Independent Critic Subagent `baccf2fb6110e784afe57a0a145cb709`)

### Eight-Axis Scorecard (1–5)

| Axis | Score | Visual Notes from R1 Screenshots (`1440`, `1280`, `768`, `390`, `dark`, `matrix`, `film`) |
| --- | :---: | --- |
| **1. Composition** | **3.5 / 5** | In `1440.png` and `1280.png`, the 12-column asymmetric split (`5-col` tenure rail + `7-col` evidence stage) establishes a clear left-to-right operational flow. However, right beneath the `Experience` `h1`, there is a redundant double-rule band: `SectionTitle` draws a full-width bottom border, and `ExperiencePageClient` immediately adds a second full-width bordered strip (`Production scope / Query latency gain / Academic record` + 2 CTA buttons) before the interactive matrix even begins. On `768.png` and `390.png`, stacking `SectionTitle` + the 3-stat `<dl>` + the 2 CTA buttons + 4 full-width vertical track buttons pushes the live `StageArtifact` below the first viewport. |
| **2. Typography** | **4.5 / 5** | Strictly disciplined to two families (`Instrument Sans` + `Bricolage Grotesque` optical size 96) with `tabular-nums` applied consistently across dates, latency figures (`35.8ms → 5.6ms`), and GPAs (`3.85 / 4.0`). Hierarchy between the `84px` page title, `44px` company headings, `17px` engineering contribution rows, and `13px` metadata is crisp and scannable at both `1440px` and `390px`. |
| **3. Color & surface** | **4.0 / 5** | Light (`#F4F4F4` ground / `#FFFFFF` elevated proof surface) and dark (`#1A1A1A` ground / `#14161C` surface in `1440-dark.png` and `390-dark.png`) both feel cohesive with `/` and `/projects`. However, `DIRECTION.md` specifies `#2563EB` (`bg-blue-600`) for the signature electric-blue active/hover fill, whereas Round 1 uses `#1D4ED8` (`blue-700`) in light mode and switches the accent text/bars to mint teal (`#9FE7D7`) in dark mode (`1440-dark.png`), which drifts from the portfolio's signature electric-blue identity. |
| **4. Imagery & media** | **3.5 / 5** | In `1440.png` and `matrix/sheet.png` (states 1 and 2), the real Orange Housing and HereAfter interfaces look sharp and evidentiary inside the stage frame. However, in `matrix/sheet.png` (states 3 and 4 for `Delet` and `GRIP`), `StageArtifact` falls back to three text-only boxes (`Stage 01`, `Stage 02`, `Stage 03`) that duplicate the exact `architectureNodes` text cards from Section 2 (`#roles`). Additionally, the telemetry comparison in `StageArtifact` uses nested HTML `div` progress bars instead of the promised flight-test SVG strip chart from Exploration B. |
| **5. Copy** | **5.0 / 5** | Zero AI slop, zero exclamation marks, zero vague claims. Every bullet and caption leads with concrete systems nouns (`Next.js 16`, `Deno 2 Edge Functions`, `Mapbox 100m geofence`, `AWS EC2/S3`, `8,346 Syracuse police reports`) and measured deltas (`35.8ms → 5.6ms`, `-60% reported defects`, `+40% engagement`). |
| **6. Craft & states** | **3.0 / 5** | While `matrix/sheet.png` confirms all 4 role states switch cleanly without layout shift, `film/strip.png` exposes that the **Signature Storyboard** from `DIRECTION.md` is missing its motion choreography: the tenure track buttons use a flat `transition-colors duration-200` instead of the portfolio's signature rising bottom-edge blue fill (`translate-y-full → translate-y-0`, `450ms cubic-bezier(0.22, 1, 0.36, 1)`), and `StageArtifact` swaps instantaneously without the `500ms` upward clip-path wipe (`clip-path: inset(100% 0 0 0) → inset(0 0 0 0)`). Also, role dossiers in `#roles` lack the `"Inspect on stage ↑"` trigger mentioned in `DIRECTION.md`. |
| **7. Restraint** | **3.5 / 5** | Inside `StageArtifact` (`1440.png`, `1440-dark.png`), the `Before` and `Shipped` telemetry section nests bordered gray cards (`bg-[#F4F4F4] border`) inside the bordered white stage container, and then nests a third bordered track (`border bg-white`) inside each card—creating three concentric rectangular borders. Removing those inner card wrappers and rendering a single hairline-divided inline SVG telemetry chart will substantially clean up the stage. |
| **8. Distinctiveness** | **4.0 / 5** | Successfully refuses the category-default center-line timeline with glowing dots. The combination of an interactive tenure matrix + live production artifact stage + numbered architectural dossiers reads like an engineering specification binder, and will hit 5/5 once the SVG telemetry strip chart and rising-fill motion choreography are in place. |

### Three Fixes Implemented for Round 2
1. **Fix 1 — Signature Rising-Fill Track Choreography, Upward Stage Wipe & Unified Electric Blue (`#2563EB` / `#60A5FA`):**
   - Added rising `#2563EB` (`bg-[#2563EB]`) bottom-edge fill choreography (`450ms cubic-bezier(0.22, 1, 0.36, 1)`) on tenure tracks and a `480ms` upward `clip-path` reveal wipe on `StageArtifact` role changes (respecting `prefers-reduced-motion`).
   - Unified the accent palette around `#2563EB` (light) and `#60A5FA` (dark) so dark mode stays anchored in the portfolio's electric-blue engineering signal.
   - Added `"Inspect on stage ↑"` buttons on every role dossier in `#roles`.
2. **Fix 2 — Inline SVG Flight-Test Telemetry Strip Chart & Custom SVG System Topology Schematics:**
   - Replaced the nested `Before / Shipped` boxed progress bars with a hairline-framed inline `<svg>` flight-test strip chart featuring 10% scale ticks, hatched baseline reference bar, solid `#2563EB` / `#60A5FA` shipped bar, and delta markers—cutting total page `boxes` from `37` down to `21`.
   - Replaced the duplicate 3-box text fallback for `Delet` and `GRIP` in `StageArtifact` with a custom inline `<svg>` system architecture schematic + hairline protocol specification table.
3. **Fix 3 — Consolidated First-Screen Header & Compact Mobile/Tablet Track Layout:**
   - Merged the page header, 3 headline telemetry KPIs, and primary CTAs (`Get in touch`, `View all projects`) into one unified top header band without redundant double horizontal borders.
   - Made the tenure track selector a 2×2 grid on tablet (`sm:grid-cols-2 lg:grid-cols-1`) and compact 2-line rows on mobile (`390px`), lifting `StageArtifact` directly into the first viewport across `390px`, `768px`, `1280px`, and `1440px`.

---

## Round 2 Critique (Independent Critic Subagent `baccf2fb6110e784afe57a0a145cb709`)

### Eight-Axis Scorecard (Round 1 → Round 2)

| Axis | R1 | R2 | Visual Notes from Round 2 Screenshots (`1440`, `1280`, `768`, `390`, `dark`, `matrix`, `film`, `film-delet`) |
| --- | :---: | :---: | --- |
| **1. Composition** | 3.5 | **5.0 / 5** | Merging the `h1`, description, 3-metric inline `<dl>` (`Scope`, `Latency`, `Degree`), and primary CTAs into a single header band eliminates the redundant double-rule bar from Round 1. On `768.png` (`sm:grid-cols-2` 2×2 track layout) and `390.png` (compact `py-2.5` tracks), `StageArtifact` now rises directly into the first viewport across all four breakpoints (`390, 768, 1280, 1440`). |
| **2. Typography** | 4.5 | **5.0 / 5** | `Instrument Sans` + `Bricolage Grotesque` (`opsz 96`, `700`) with `tabular-nums` across every date, latency figure, GPA, and SVG calibration readout. Measure, line-height, and optical hierarchy are locked in at every viewport. |
| **3. Color & surface** | 4.0 | **4.5 / 5** | Unifying the accent palette around `#2563EB` in light mode (`1440.png`, `390.png`) and `#60A5FA` / `#2563EB` in dark mode (`1440-dark.png`, `390-dark.png`) resolves the split blue/mint accent from Round 1. Both themes feel cohesive with `/` and `/projects` while maintaining >= 4.6:1 contrast across all muted metadata and active fills. |
| **4. Imagery & media** | 3.5 | **5.0 / 5** | In `matrix/sheet.png` and `film-delet/strip.png`, all 4 career states now display a distinct visual artifact on stage: real shipped interfaces/video for `Orange Housing` and `HereAfter`, and the custom inline `<svg>` `SystemTopologySchematic` (3-node vector pipeline + dual-trace latency waveform + hairline specification table) for `Delet` and `GRIP`. Below the media frame, `TelemetryStripChart` renders a true vector flight-test strip chart with 10% scale ticks, hatched baseline bar, solid shipped bar, and dashed delta vector. |
| **5. Copy** | 5.0 | **5.0 / 5** | Exact, evidentiary engineering prose with zero slop, zero exclamation marks, and concrete systems benchmarks throughout. |
| **6. Craft & states** | 3.0 | **5.0 / 5** | `film/strip.png` and `film-delet/strip.png` verify the full **Signature Storyboard** in motion: the `#2563EB` bottom-edge fill rises smoothly (`450ms cubic-bezier(0.22, 1, 0.36, 1)`) on track selection/hover, `StageArtifact` wipes upward (`clip-path: inset(100% 0% 0% 0%) → inset(0% 0% 0% 0%)`, `480ms`), and every dossier in `#roles` now includes a working `"Inspect on stage ↑"` trigger. |
| **7. Restraint** | 3.5 | **4.5 / 5** | Replacing the nested `Before / Shipped` sub-cards, the 3-box `architectureNodes` cards, and the boxed `Hackathon wins` cards with hairline-divided ledgers (`divide-x` / `divide-y`) and inline `<svg>` strip charts cut total page `boxes` from `37` down to `21`, letting the proof artifacts and typography breathe. |
| **8. Distinctiveness** | 4.0 | **5.0 / 5** | The combination of the rising electric-blue tenure rail, upward-wiping evidence stage, custom SVG system topology schematics, and hatched flight-test telemetry strip chart feels unmistakably bespoke to Rangel's engineering portfolio. |

### Six Gut-Check Questions (Round 2)
1. **Does the first screen earn its keep in 3 seconds?** Yes, across all four viewports (`1440`, `1280`, `768`, `390`).
2. **If you blur your eyes, is there one unmistakable focal point per viewport?** Yes—the active `#2563EB` tenure track on the left locks visually to the framed production artifact and vector telemetry bar on the right.
3. **Did any slop face sneak in despite the brief?** No—all nested card-in-card wrappers from Round 1 have been replaced with hairline specification tables and vector schematics.
4. **Are the outside-the-web references actually visible in the pixels?** Yes—the architectural specification binder, flight-test telemetry strip chart (`TelemetryStripChart`), and Braun technical manual schematics (`SystemTopologySchematic`) are all visible in the rendered pixels.
5. **Does dark mode feel intentionally designed or mechanically inverted?** Intentionally designed (`#1A1A1A` ground, `#14161C` stage surface, `#0E1015` schematic well, and unified `#2563EB` / `#60A5FA` electric-blue telemetry traces).
6. **What is the single most memorable detail?** Scrubbing a tenure track triggers the signature rising `#2563EB` fill while the Evidence Stage wipes upward (`480ms` clip-path reveal) to show either the shipped production interface or a 3-stage vector signal schematic paired with a calibrated flight-test latency strip chart.

### Verdict
**Every axis is >= 4.5 / 5 (zero axes below 4). Certified ready to ship.**
