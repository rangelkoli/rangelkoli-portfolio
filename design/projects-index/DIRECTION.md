# DIRECTION — Projects index (`/projects`)

## Brief (self-authored)
Redesign the all-projects page of Rangel Koli's portfolio for hiring managers and engineers. One job: scan every project in seconds and open the one worth reading.

## Current (before)
Alternating image/text rows, purple blurred orb, "100% Passion" stat bar, Mango + Playfair + bueno on top of the site fonts (4 families), giant "01" numerals overlapping titles on phone, 29 unnamed icon buttons, clipped buttons at 390px, empty `<title>`, a duplicate "Say Hello" CTA above a footer that already has the email. 8 scan FAILs.

## Decision: evolution, not a new look
This is one page inside a site with an established system (homepage Projects and Experience sections). A fresh ground/type/accent would break the site, so the look columns stay the site's (`paper-ish light #F4F4F4 · grotesque · blue · photo · index`). The grammar changes: the archive becomes an index with a live preview (the "index + viewer" option already explored in `design/projects-options/C.png`).

## Grammar
1. **Title** — "Projects" + count line. *What's here?*
2. **Index** — one row per project: kind · year, name (Bricolage Bold), stack icons, GitHub / live links. Whole row opens the case study. *Which one should I open?*
3. **Preview (desktop)** — sticky, follows hover and keyboard focus: screenshot or video, description, `04 / 07`. On phone the media and description sit inside each row.

## Signature
Hover/focus a row: the homepage's blue rises from the bottom of the row (500ms, `cubic-bezier(.22,1,.36,1)`) and the preview's new media wipes up the same way (`clip-path` 550ms). Reduced motion: no transitions, video doesn't autoplay, swap is instant.

## Tokens
Reused from the site: `bg-seashell`, Instrument Sans (UI/body), Bricolage Grotesque Bold opsz 96 (project names), `blue-600` hover field, `black/10` hairlines, 2px media radius.
