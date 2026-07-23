# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

PortForge is not itself a portfolio — it's a **generator**. The repo root contains tooling; `template/` is a complete, standalone React + Vite portfolio site that gets copied out and personalized (by an AI agent or manually) into a user's own project.

Two separate npm projects exist here:
- `/package.json` — root tooling (prettier only). No app code.
- `/template/package.json` — the actual portfolio app (React 18, Vite 5, Tailwind 3, Framer Motion). This is what gets copied to `./{project-name}/` for an end user.

Because of this split, always check *which* `package.json`/directory you're operating in before running install/build/dev commands.

## Commands

Root (tooling):
```bash
npm run format          # prettier --write .
npm run format:check    # prettier --check .
npm run lint            # alias for format:check
```

Inside `template/` (the portfolio app itself):
```bash
cd template
npm install
npm run dev        # vite dev server
npm run build      # vite build — CI runs this to validate the template compiles
npm run preview    # preview production build
npm run deploy      # gh-pages -d dist (GitHub Pages)
```

There is no test suite. CI (`.github/workflows/ci.yml`) runs `prettier --check .` at the root, `npm run build` inside `template/`, and validates every `template/src/data/*.json` + `template/src/config.json` file parses as JSON. Replicate these three checks when verifying changes.

## Architecture

### The AI-agent-driven setup flow

The core product isn't code, it's a set of instruction documents written *for an AI coding agent* (Claude Code, opencode, Copilot, etc.), not for the end user directly. `AI_SETUP.md` is the entry point / orchestrator only — it's short on purpose and hands off to `setup/*.md` for the actual steps, in order:

1. `setup/01-welcome-and-intake.md` — greet, get name + project folder, copy `template/` to `./{project-name}/`, append that folder to the root `.gitignore` if running inside a clone of this repo, offer LinkedIn/resume paste (both optional).
2. `setup/02-extract-from-sources.md` — **if** LinkedIn/resume text was pasted, the agent reads and understands it directly (no parsing script) and maps it into the content schema, then confirms with the user before writing anything.
3. `setup/03-manual-questions.md` — one-question-at-a-time content gathering, used standalone (both sources skipped) or just to fill whatever gaps extraction left.
4. `setup/04-design-preferences.md` — visual style, `navStyle`, `heroLayout`, color theme, section order.
5. `setup/05-finalize.md` — SEO, deploy config, install/build verification, hand-off message.

`setup/content-schema.md` is the single source of truth both step 2 and step 3 read from — every `config.json`/`src/data/*.json` field is tagged `[fact]` (must come from real pasted text or a direct answer, never invented), `[derived]` (computed from facts already gathered), `[draft]` (agent may propose it, user must approve before it's written), or `[ask]` (always a direct question). If you're asked to change the setup flow, edit the relevant `setup/*.md` file — don't add a second copy of instructions elsewhere, and don't add a deterministic parsing script for LinkedIn/resume text; that's a deliberate choice (regex-style parsing of PDF-exported text produces confidently-wrong data — an old `scripts/import-linkedin.js` did exactly this and was removed for that reason).

### Content vs. code separation in `template/`

All user-specific content lives in `template/src/config.json` (personal info, theme choice, section enable/order, `bentoGrid.enabled`) and `template/src/data/*.json` (one file per section: `aboutMe`, `experience`, `techStacks`, `projects`, `mediumArticles`, `awards`, `certifications`, `education`, plus `stats` and `highlights` for the optional row under the hero). Components in `template/src/components/` read this data — they are never hand-edited with user content. When personalizing a portfolio, only touch `config.json`, `src/data/*.json`, `src/themes/active.css`, `index.html`, and `vite.config.js`.

Each content section has a matching component (e.g. `experience.json` ↔ `Experience.jsx`, `techStacks.json` ↔ `TechStack.jsx`). `App.jsx` renders sections based on the `sections[]` array in `config.json` (id, label, navLabel, enabled), so reordering/toggling sections is a config change, not a code change.

### Theming

Several independent theme axes, all under `config.json`'s `theme` block:
1. **Visual style** (`visualStyle`: `minimal` / `bold` / `terminal`) — a whole CSS file swap. `template/src/themes/{minimal,bold,terminal}.css` are the source files; whichever is active gets copied wholesale into `template/src/themes/active.css`, which is what's actually imported by the app. Never edit `active.css` as a "theme" — edit the source variant and re-copy it, unless applying one-off custom colors.
2. **Hero layout** (`heroLayout`: `center-profile` / `left-profile` / `full-image`) and **nav style** (`navStyle`: `scroll` / `tabs` / `timeline`) — structural variants read directly by `Hero.jsx` and `Nav.jsx`/`App.jsx` at runtime, not CSS swaps.
3. **Color preset** (slate-amber, indigo-violet, etc.) plus optional custom hex (`customTheme.primaryHex`/`accentHex`/`darkBg`) — consumed by `template/src/context/ThemeContext.jsx`, which computes CSS variables (including light/dark variants for custom hex) at runtime and persists mode to localStorage. Picking a preset clears any custom hex override.

### Deployment target awareness

`template/vite.config.js`'s `base` path must match the deploy target (GitHub Pages subpath vs. Netlify/Vercel root). `AI_SETUP.md` calls this out explicitly at multiple steps — if you're touching setup logic, keep `base` updates in sync with whatever project/repo name is chosen.

## Style

- Prettier is the only formatting authority (`.prettierrc`: single quotes, semicolons, 100 print width, trailing commas). No ESLint config exists.
- Functional React components with hooks; follow the patterns already in `template/src/components/`.
- Tailwind utility classes for layout/spacing; CSS custom properties (via the theme files) for anything theme-dependent.
- Keep user content in JSON, never hardcoded into components.
