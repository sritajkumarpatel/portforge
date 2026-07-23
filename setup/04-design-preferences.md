# Step 4: Design Preferences

Content is settled. Now decide how it should look.

## Pick a path

Ask: *"For the look — want to describe a vibe and I'll configure it, or go through the options one at a time? Either way you'll get to review before anything's final."*

- **Structured** → skip to "One at a time" below.
- **Describe the vibe** → go to "Vibe mode" below.

## Vibe mode

Ask: *"Describe what you're going for — words, colors, references, whatever comes to mind. Something like 'minimal black and white, feels like a design studio' or 'dark hacker terminal with green accents' works fine."*

Take whatever they give you and map it yourself against the real options below — don't invent a 6th style or a made-up config value to match their words more closely; pick the closest real fit for each axis:

- **Visual style** → closest match from the Visual Style table below (color/mood words lean Minimal/Editorial/Brutalist; "dramatic", "high-contrast", "bold" leans Bold; "hacker", "code", "green-on-black", "matrix" leans Terminal; "serif", "calm", "editorial", "essay", "writer" leans Editorial; "raw", "unpolished", "concrete", "harsh" leans Brutalist).
- **Hero layout** → if they mention not wanting a photo, or "text-first", use `text-only`; if they describe a big background image, use `full-image`; otherwise default to `center-profile` unless they clearly want a side-by-side layout (`left-profile`).
- **Nav style** → default to `scroll` unless they specifically describe tabs or a timeline/sidebar feel.
- **Color** → if they name specific colors, set `theme.customTheme` hex values directly rather than forcing it into the nearest preset. If they name a mood without specific colors ("warm", "cool", "earthy"), pick the closest preset from the Color Theme table.
- **Mode** → dark unless they say otherwise or their description clearly implies light/paper/bright.

State your interpretation back before touching any files: *"Here's what I'm setting: Editorial style, text-only hero, slate-cyan colors, dark mode. Sound right, or want to adjust anything?"* Only apply it once they confirm or correct you — same rule as content extraction, don't finalize a guess silently.

If their description leaves an axis genuinely ambiguous (rare, but possible), ask about just that one thing rather than guessing.

Once confirmed and applied, skip "One at a time" entirely and go to "Sections" below.

## One at a time

Ask about each of these in turn.

### Visual Style

Ask: *"Pick a visual style:"*

| Style | Vibe | Best For |
|-------|------|----------|
| **Minimal** | Clean, subtle, professional | Default — works for everyone |
| **Bold** | High contrast, dramatic, large typography | Creative roles, leadership |
| **Terminal** | Monospace, green-on-black, retro CRT | Engineers, dev tools, tech-forward |
| **Editorial** | Serif type, muted paper palette, calm — minimal motion, no glass/blur effects | Writers, researchers, text-first portfolios |
| **Brutalist** | Stark black/white, thick sharp-edged borders, no shadows or rounded corners | Designers, anyone wanting a raw/unpolished statement look |

For **Minimal**: Copy `themes/minimal.css` → `themes/active.css`
For **Bold**: Copy `themes/bold.css` → `themes/active.css`
For **Terminal**: Copy `themes/terminal.css` → `themes/active.css`
For **Editorial**: Copy `themes/editorial.css` → `themes/active.css`
For **Brutalist**: Copy `themes/brutalist.css` → `themes/active.css`

Also update `config.json` → `theme.visualStyle`. Note: picking **Editorial** automatically reduces motion app-wide (it's read directly from `theme.visualStyle` in `main.jsx`), independent of the visitor's own OS reduced-motion setting — that's intentional, it's a calm-by-design style, not just a color swap.

### Navigation Style

Ask: *"How should navigation work?"*

Options (set `theme.navStyle` in `config.json`):
- **scroll** — Top nav bar with links; clicking smooth-scrolls to each section (default)
- **tabs** — Top nav renders as tabs; only the selected section's content is shown, no scrolling between sections
- **timeline** — Top bar keeps just their name + theme controls; a vertical dot-and-line rail on the left (desktop only) lets you jump between sections while the page still scrolls normally

### Hero Layout

Ask: *"How should the hero section look?"*

Options (set `theme.heroLayout` in `config.json`):
- **center-profile** — Photo, name, titles centered (default)
- **left-profile** — Photo left, text right, two-column on desktop
- **full-image** — Full-bleed background image with a dark overlay for text legibility, no avatar. If they have a hero background photo, save it as `public/images/hero-bg.jpg`; if not, it still looks fine — falls back to a plain gradient.
- **text-only** — No photo at all, just their name/title/bio at a larger type size. Pairs especially well with Editorial.

### Color Theme

Show the presets:

| Preset | Primary | Accent |
|--------|---------|--------|
| slate-amber | Slate | Amber |
| indigo-violet | Indigo | Violet |
| emerald-teal | Emerald | Teal |
| rose-fuchsia | Rose | Fuchsia |
| blue-cyan | Blue | Cyan |
| slate-cyan | Slate | Cyan |
| indigo-amber | Indigo | Amber |

Also ask if they want custom colors:
- *"Want custom colors? I can set any hex values for primary, accent, and background."*
- If yes, ask for hex values and set `theme.customTheme.primaryHex` / `accentHex` / `darkBg` in `config.json`. The app reads these at runtime and generates light/dark variants automatically — no CSS editing needed. (There's also a live color picker in the running app's nav, click the palette icon.)
- Picking a preset later clears any custom hex override.

Also ask: *"Dark mode or light mode?"*

## Sections

Ask: *"Which sections do you want, and in what order?"*

Default sections: About, Experience, Skills, Articles/Blog, Projects, Awards, Certifications, Education.

Let them enable/disable and reorder. Update `sections[]` in `config.json`. If a section has no content (e.g. Articles was skipped), suggest disabling it rather than shipping it empty.

---

Continue to [`05-finalize.md`](05-finalize.md).
