# PortForge — AI Portfolio Builder

Created by [Sritaj Patel](https://github.com/sritajkumarpatel).  
Repo: [github.com/sritajkumarpatel/portforge](https://github.com/sritajkumarpatel/portforge)

You are setting up a portfolio website for the user. The `template/` directory contains a complete React + Vite portfolio with placeholder content.

Guide the user through setup. Ask **one question at a time**. After each answer, update the relevant files. At the end, tell the user the project is ready at `./{project-name}/`.

---

## Step 1: Project Name

Ask: *"What should your portfolio project be called? (default: my-portfolio)"*

```bash
cp -r template ./{project-name}
```

All subsequent edits go into `./{project-name}/`.

---

## Step 2: Import from LinkedIn (Optional)

Ask: *"Do you have your LinkedIn profile text handy? I can import your data automatically."*

If yes:
1. Ask them to paste their LinkedIn text
2. Save it to a temp file and run:
   ```bash
   node ../scripts/import-linkedin.js ./{project-name}
   ```
   (Pipe the text or pass it via stdin)
3. Verify the generated files look correct
4. Skip Steps 6-13 (the script handles those), just do Steps 3-5 and 14-15

---

## Step 3: Visual Style

Ask: *"Pick a visual style:"*

Show these options:

| Style | Vibe | Best For |
|-------|------|----------|
| **Minimal** | Clean, subtle, professional | Default — works for everyone |
| **Bold** | High contrast, dramatic, large typography | Creative roles, leadership |
| **Terminal** | Monospace, green-on-black, retro CRT | Engineers, dev tools, tech-forward |

For **Minimal**: Copy themes/minimal.css → themes/active.css
For **Bold**: Copy themes/bold.css → themes/active.css
For **Terminal**: Copy themes/terminal.css → themes/active.css

Also update config.json → `theme.visualStyle`.

---

## Step 4: Navigation Style

Ask: *"How should navigation work?"*

Options:
- **scroll** — Single page, sections flow vertically (default)
- **tabs** — Tab bar switches between sections
- **timeline** — Vertical timeline layout

---

## Step 5: Hero Layout

Ask: *"How should the hero section look?"*

Options:
- **center-profile** — Photo, name, titles centered (default)
- **left-profile** — Photo left, text right
- **full-image** — Full background image with overlay

---

## Step 6: Color Theme

Show the presets:
| Preset | Primary | Accent |
|--------|---------|--------|
| slate-amber | Slate | Amber |
| indigo-violet | Indigo | Violet |
| emerald-teal | Emerald | Teal |
| rose-fuchsia | Rose | Fuchsia |
| blue-cyan | Blue | Cyan |
| purple-pink | Purple | Pink |

Also ask if they want custom colors:
- *"Want custom colors? I can set any hex values for primary, accent, and background."*
- If yes, ask for hex values and set `theme.customTheme` in config.json
- Then update `themes/active.css` with the custom color values

Also ask: *"Dark mode or light mode?"*

---

## Step 7: Sections

Ask: *"Which sections do you want?"*

Default sections:
1. About
2. Experience
3. Skills
4. Articles / Blog
5. Projects
6. Awards
7. Certifications
8. Education

Let them enable/disable and reorder. Update `sections[]` in config.json.

---

## Steps 8-13: Fill Content

(If LinkedIn import wasn't used, ask one section at a time.)

### Personal Info
Ask for: name, email, headline, tagline, GitHub, LinkedIn, Medium.
Update config.json, index.html (title + description).

### Bio / About
Ask for: 2-3 paragraph bio, 4 expertise pillars (with 3-4 capabilities each), philosophy.
Update aboutMe.json.

### Experience
For each company: name, location, roles (title + period), 3-5 highlights.
Update experience.json.

### Skills
For each domain: name, icon (Brain/Shield/Terminal/Users/Code2), color, categories with skills.
Update techStacks.json.

### Projects
For each project: title, description, technologies, features, link, featured flag.
Update projects.json.

### Articles (Optional)
Title, URL, topic (AI & LLM / Testing / Leadership / Development), read time, date.
Update mediumArticles.json.

### Awards & Certifications (Optional)
Ask if they have any to add. Update awards.json, certifications.json.

### Education
Degree, institution, period, focus areas. Update education.json.

---

## Step 14: SEO & Deploy Config

Update `index.html` with:
- Meta description
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data

The template already has `netlify.toml`, `vercel.json`, `robots.txt`, `sitemap.xml`. Update the domain placeholder in `robots.txt` and `sitemap.xml`.

---

## Step 15: Finalize

```bash
cd ./{project-name}
npm install
npm run build
```

Verify the build succeeds. Tell the user:
*"Your portfolio is ready at `./{project-name}/`. Run `cd {project-name} && npm run dev` to preview, or `npm run build` to publish. Deploy to Netlify by connecting your GitHub repo, or to Vercel with one click."*

---

## Notes for the Agent

- All user content goes in `src/*.json` files. Never edit React components.
- The `src/themes/active.css` controls the visual style. Replace it entirely when changing styles.
- Validate JSON syntax after every edit.
- Run `npm run build` at the end to confirm the project compiles.
- The LinkedIn import script (scripts/import-linkedin.js) generates JSON from raw LinkedIn text.
