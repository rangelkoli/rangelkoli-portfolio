# DIRECTION — Judgify case study (`/projects/judgifysu`)

## Brief (self-authored)

1. **What:** redesign of the Judgify project page on Rangel Koli's portfolio. Readers: hiring managers and engineers.
2. **One job:** in ten seconds, understand that Judgify solved a real scheduling problem (who judges which poster) with an optimizer, and open the repo or demo.
3. **Feel:** exact, fair, procedural. References outside the web: a science-fair results board, a tournament draw sheet, a tally sheet on a clipboard.
4. **Exists:** repo `rangelkoli/JudgifySU` (Flask + PuLP/CBC solver, SPECTER matching, CrewAI expertise agent, Next.js + Supabase judge app, z-score ranking), real solver output for an 8-poster / 40-judge sample, one AI-generated cover image with garbled text (dropped: it shows fake rankings), portfolio fonts (Mango Grotesque, bueno, Instrument Sans) and theme tokens.
5. **Image generation:** not used.

## Category default refused

Portfolio case studies share: a giant title, a hero screenshot in a rounded shadowed box, a "Key features" bullet list, tech pills. The old page was exactly that, plus an AI render whose leaderboard is invented. Refused. The richness is the project's own data, drawn in code.

## Look

`site | printed | light | condensed | orange | data | document` — differs from both history rows on all six look columns.

- **Concept:** Judgify is the draw sheet pinned up before the poster session: every poster, its two judges, and the one pairing the rules forbade.
- **Ground:** portfolio `--background` (light `#F4F4F4`, dark `#1A1A1A`). Hairlines from `--border`.
- **Type:** Mango Grotesque (portfolio display voice, condensed, suits a results board); site body face for copy; `tabular-nums` for every number.
- **Accent:** Syracuse orange `#F76900` (it is a Syracuse ECS event). Job: assignment lines and the one mark per figure that matters. Never body text (2.9:1 on light).
- **Radius:** none on figures (a printed sheet); 999px only on the two action links, matching the portfolio.

## Grammar (document)

1. **Title + the draw** — what it is, who for, actions; the real assignment graph. *What is this?*
2. **The rules** — four constraints, stated with their numbers. *What was hard?*
3. **How a pairing is chosen** — agent profiles, SPECTER + department score, integer program. *How does it work?*
4. **On the day** — organizer and judge flow in the Next.js app. *What did people use?*
5. **Fair ranking** — z-score worked example. *Why trust the result?*
6. **Credits + links** — team, stack, repo, demo. *Where next?*

## Signature

The draw draws itself. Trigger: page load. Frames: 16 assignment lines stroke in from poster to judge, 70ms stagger, 900ms each, `cubic-bezier(.2,.7,.2,1)`; the conflict line (Monroe → poster 5) draws last as a dashed line and gets a ×. Hover/focus a poster or judge: its lines go orange at full weight, others fade to 20%. Reduced motion: lines are drawn already; hover still works (opacity only).

## Voice

Plain and specific, numbers over adjectives: "Each poster gets exactly two judges."
