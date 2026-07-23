# Step 2b/3: Manual Content Questions

Ask **one question at a time**, update the relevant file after each answer, and validate JSON syntax after every edit. Field shapes and icon options are defined in [`content-schema.md`](content-schema.md) — don't guess a shape, check it.

If you arrived here from `02-extract-from-sources.md` with a gap list, only ask about the groups below that are actually open. If you arrived here directly from `01-welcome-and-intake.md` (both sources skipped), go through every group in order.

### Personal Info
Ask for: name (unless already given), email, headline, subtitle, GitHub, LinkedIn, Medium (optional).
Update `config.json`, and `index.html` (title + description).

### Bio / About
Ask for: 2-3 paragraph bio, up to 4 expertise areas (each with a title, icon from Brain/Shield/Terminal/Users, and 3-4 capabilities), and a philosophy line (optional — see `content-schema.md`, don't draft this one for them).
Update `aboutMe.json`.

### Experience
For each company: name, location, roles (title + period), 3-5 highlights.
Update `experience.json`.

### Skills
For each domain: title, icon (Brain/Shield/Terminal/Cloud/Eye), color, categories with skills.
Update `techStacks.json`.

### Projects
For each project: title, description, technologies, features, link, featured flag.
Update `projects.json`.

### Articles (Optional)
Title, description, URL, topic, read time, date.
Update `mediumArticles.json`. Fine to skip this section entirely — if so, disable it in `sections[]` later in `04-design-preferences.md`.

### Awards & Certifications (Optional)
Ask if they have any to add. Update `awards.json`, `certifications.json`.

### Education
Degree, institution, period, focus areas.
Update `education.json`.

### Highlights & Stats (the row under the hero)
Ask: *"Want a quick-glance highlights row under your hero (4 stat-style cards + a 'daily tools' strip)? You can skip this."*

If yes: ask for up to 4 highlights (icon from Code2/Briefcase/Zap/Clock/Monitor/Cpu/Brain/Shield/Terminal/Users, label, value, one-line description, accent color) and a list of tools/technologies they actually use. Update `highlights.json`.

Then ask if there are any real numbers worth showing as counters (years of experience, certifications, etc. — see the `[derived]`-only rule in `content-schema.md`). Update `stats.json`, or leave it `[]`.

If they say no to the whole section, set `bentoGrid.enabled` to `false` in `config.json`.

---

Once every open group is resolved, continue to [`04-design-preferences.md`](04-design-preferences.md).
