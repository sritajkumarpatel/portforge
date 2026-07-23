# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

PortForge is not itself a portfolio — it's a **generator**. The repo root contains tooling; `template/` is a complete, standalone React + Vite portfolio site that gets copied out and personalized (by an AI agent or manually) into a user's own project.

Two separate npm projects exist here:
- `/package.json` — root tooling (prettier, demo scripts). No app code.
- `/template/package.json` — the actual portfolio app (React 18, Vite 5, Tailwind 3, Framer Motion). This is what gets copied to `./{project-name}/` for an end user.

Because of this split, always check *which* `package.json`/directory you're operating in before running install/build/dev commands.

## Commands

Root (tooling):
```bash
npm run format          # prettier --write .
npm run format:check    # prettier --check .
npm run lint            # alias for format:check
npm run demo            # scripts/demo.sh — builds a demo portfolio in ./_demo with dummy data
npm run demo-clean      # scripts/demo-clean.sh — removes ./_demo
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

The core product isn't code, it's `AI_SETUP.md` — a step-by-step instruction document written *for an AI coding agent* (Claude Code, opencode, Copilot, etc.), not for the end user directly. When a user runs an agent against a copy of `template/` and says "set up my portfolio," the agent follows `AI_SETUP.md` step by step: copy the template, ask the user questions one at a time, and edit `config.json` / `src/data/*.json` / `themes/active.css` / `index.html` / `vite.config.js` after each answer. If you're asked to change the setup flow itself, edit `AI_SETUP.md`, not app code.

`scripts/demo.sh` exercises this same flow non-interactively: it copies `template/` to `_demo/`, writes a modified `AI_SETUP.md` with all answers pre-filled (dummy data for "Alex Rivera"), and lets an agent run through the steps with no user interaction — this is how the demo shown in the README is produced.

`scripts/import-linkedin.js` is an alternate content source: it parses raw LinkedIn profile text (from clipboard/PDF export) into the same JSON shape as `template/src/data/*.json`, letting the agent skip most of the Q&A in `AI_SETUP.md`.

### Content vs. code separation in `template/`

All user-specific content lives in `template/src/config.json` (personal info, theme choice, section enable/order) and `template/src/data/*.json` (one file per section: `aboutMe`, `experience`, `techStacks`, `projects`, `mediumArticles`, `awards`, `certifications`, `education`). Components in `template/src/components/` read this data — they are never hand-edited with user content. When personalizing a portfolio, only touch `config.json`, `src/data/*.json`, `src/themes/active.css`, `index.html`, and `vite.config.js`.

Each content section has a matching component (e.g. `experience.json` ↔ `Experience.jsx`, `techStacks.json` ↔ `TechStack.jsx`). `App.jsx` renders sections based on the `sections[]` array in `config.json` (id, label, navLabel, enabled), so reordering/toggling sections is a config change, not a code change.

### Theming

Two independent theme axes:
1. **Visual style** (`minimal` / `bold` / `terminal`) — a whole CSS file swap. `template/src/themes/{minimal,bold,terminal}.css` are the source files; whichever is active gets copied wholesale into `template/src/themes/active.css`, which is what's actually imported by the app. Never edit `active.css` as a "theme" — edit the source variant and re-copy it, unless applying one-off custom colors.
2. **Color preset** (slate-amber, indigo-violet, etc.) plus optional custom hex — controlled via `config.json`'s `theme` block (`primary`/`accent`/`mode`/`presets`/`customTheme`) and consumed by `template/src/context/ThemeContext.jsx`, which applies CSS variables at runtime and persists dark/light mode to localStorage.

### Deployment target awareness

`template/vite.config.js`'s `base` path must match the deploy target (GitHub Pages subpath vs. Netlify/Vercel root). `AI_SETUP.md` calls this out explicitly at multiple steps — if you're touching setup logic, keep `base` updates in sync with whatever project/repo name is chosen.

## Style

- Prettier is the only formatting authority (`.prettierrc`: single quotes, semicolons, 100 print width, trailing commas). No ESLint config exists.
- Functional React components with hooks; follow the patterns already in `template/src/components/`.
- Tailwind utility classes for layout/spacing; CSS custom properties (via the theme files) for anything theme-dependent.
- Keep user content in JSON, never hardcoded into components.
