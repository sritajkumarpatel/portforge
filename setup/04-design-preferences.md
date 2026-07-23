# Step 4: Design Preferences

Content is settled. Now ask about how it should look. One question at a time, same as before.

## Visual Style

Ask: *"Pick a visual style:"*

| Style | Vibe | Best For |
|-------|------|----------|
| **Minimal** | Clean, subtle, professional | Default — works for everyone |
| **Bold** | High contrast, dramatic, large typography | Creative roles, leadership |
| **Terminal** | Monospace, green-on-black, retro CRT | Engineers, dev tools, tech-forward |

For **Minimal**: Copy `themes/minimal.css` → `themes/active.css`
For **Bold**: Copy `themes/bold.css` → `themes/active.css`
For **Terminal**: Copy `themes/terminal.css` → `themes/active.css`

Also update `config.json` → `theme.visualStyle`.

## Navigation Style

Ask: *"How should navigation work?"*

Options (set `theme.navStyle` in `config.json`):
- **scroll** — Top nav bar with links; clicking smooth-scrolls to each section (default)
- **tabs** — Top nav renders as tabs; only the selected section's content is shown, no scrolling between sections
- **timeline** — Top bar keeps just their name + theme controls; a vertical dot-and-line rail on the left (desktop only) lets you jump between sections while the page still scrolls normally

## Hero Layout

Ask: *"How should the hero section look?"*

Options (set `theme.heroLayout` in `config.json`):
- **center-profile** — Photo, name, titles centered (default)
- **left-profile** — Photo left, text right, two-column on desktop
- **full-image** — Full-bleed background image with a dark overlay for text legibility, no avatar. If they have a hero background photo, save it as `public/images/hero-bg.jpg`; if not, it still looks fine — falls back to a plain gradient.

## Color Theme

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
