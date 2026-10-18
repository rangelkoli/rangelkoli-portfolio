<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Browser tab titles

Project detail pages must use the project's display name as the entire browser tab title. Future experience detail pages must use the corresponding experience or project display name. Read the name from the same data used for the page heading and set `metadata.title.absolute` or return `title: { absolute: name }` from `generateMetadata`, without a portfolio-name suffix. Keep metadata exports in Server Components.
