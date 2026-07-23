# Content Schema Reference

Every field in `template/src/config.json` and `template/src/data/*.json`, tagged by where it should come from. Both the extraction flow (`02-extract-from-sources.md`) and the manual Q&A flow (`03-manual-questions.md`) work from this file — it's the single source of truth for what the portfolio needs, so the two flows never drift apart.

## Tags

- **`[fact]`** — Must come from something real: text the user pasted (LinkedIn export, resume) or an explicit direct answer. Never invent, estimate, or pad a `[fact]` field. If you don't have one, leave it out and ask, or leave the array/field empty.
- **`[derived]`** — Computed arithmetically from facts you already have (e.g. total years from real role date ranges). Still a fact once computed — show your math is real, don't round up to something more impressive.
- **`[draft]`** — You may propose wording grounded in the facts already gathered (e.g. a headline built from their most recent title). Always show the draft to the user and get explicit approval or an edit before writing it to a file. Never finalize a draft silently.
- **`[ask]`** — Not something LinkedIn or a resume will contain in usable form. Always ask directly, and it's fine for the user to skip it.

If a source (LinkedIn/resume) doesn't contain a `[fact]` field, it moves to the gap list and gets asked about directly in `03-manual-questions.md` — it does not get invented to fill the gap.

---

## `config.json`

```
personal.name        [fact]  — from intake question or source text
personal.email       [ask]
personal.github      [ask]   — username only
personal.linkedin    [ask]   — profile slug/handle
personal.medium      [ask]   — handle, omit if they don't have one
bio.headline         [draft] — short role/positioning line, grounded in their most recent title
bio.subtitle         [draft] — 2-3 sentence summary, grounded in their actual summary/experience
titles[]             [draft] — role titles for the hero typewriter, pulled from experience.json roles once that exists
sections[]           [design] — handled in 04-design-preferences.md
bentoGrid.enabled    [design] — handled in 04-design-preferences.md, but content comes from stats.json/highlights.json below
theme.*              [design] — handled in 04-design-preferences.md entirely
```

## `data/aboutMe.json`

```
shortBio             [draft] — one line, grounded in headline/most recent role
fullBio              [draft] — 2-3 paragraphs grounded in the real summary + experience. Never add
                       achievements, metrics, or claims that aren't in the source material.
whatIdo[].title      [draft] — group of related skills/experience into a named area
whatIdo[].icon       must be one of: Brain, Shield, Terminal, Users
whatIdo[].color      [design] — pick any of the palette hexes already used elsewhere in the file, or ask
whatIdo[].capabilities[]  [fact] — actual skills/responsibilities found in source, not filler
philosophy           [ask] — a personal statement of approach; this is opinion, not something to draft
                       from a resume. Ask directly. If skipped, leave a short, honestly-generic line and
                       tell the user it's a placeholder — don't present a guess as their philosophy.
```

## `data/experience.json` (array, one entry per company)

```
company     [fact]
roles[].title    [fact]
roles[].period   [fact] — as written in the source (don't reformat dates you're unsure about)
duration    [derived] — computed from roles[].period, not guessed
current     [derived] — true if the latest role's period says "Present"/ongoing
location    [fact] if present in source, else [ask]
highlights[]  [fact, lightly cleaned up] — take actual bullet points from the source; you may fix
              grammar/tense for consistency, but don't add achievements, numbers, or scope that
              weren't stated
```

## `data/techStacks.json` (`expertise[]`)

```
id            [derived] — slug from title
title         [fact] if a domain/category is named in source, else [draft] grouping of real skills found
description   [draft] — one line, grounded in the actual skills in this group
icon          must be one of: Brain, Shield, Terminal, Cloud, Eye
color         [design] — any hex, ask if they care, otherwise pick a reasonable distinct one
categories    [fact] — map of category name -> skill names, all pulled from source/user answers.
              Don't invent categories to look more organized than the source material is.
```

## `data/projects.json` (array)

```
title, description, technologies[], features[], link, featured   [ask]
```
LinkedIn/resume text almost never has portfolio-project-level detail. If a resume bullet clearly
describes a distinct named project, you may draft an entry from it, but confirm with the user before
keeping it — otherwise this whole section is direct Q&A in `03-manual-questions.md`.

## `data/mediumArticles.json` (array, optional section)

```
title, description, url, date, topic, readTime   [ask]
```
Not derivable from LinkedIn/resume at all — always direct Q&A, and it's fine for the user to skip
this section entirely (disable it in `sections[]` in 04).

## `data/awards.json` (array)

```
title, year, company   [fact]
description             [draft] if source gives enough context, else [ask]
```

## `data/certifications.json` (array)

```
name, issuer, date   [fact]
skills[]              [fact] if listed in source, else omit (don't pad with guesses)
logoFile / logoUrl    [ask] — only if the user has an actual logo asset/URL to use; optional
```

## `data/education.json` (array)

```
degree, institution, period   [fact]
focus[]                        [fact] if subjects/concentration are named in source, else [ask] or omit
```

## `data/stats.json` (array, up to 4 entries for the hero counters — optional, can be `[]`)

```
value, suffix, label, sublabel   [derived] ONLY
```
Every number here must trace back to something real: total years computed from actual role dates,
a count of entries actually in `projects.json`/`certifications.json` once populated, or a number the
user explicitly states about themselves. **Never invent a metric** (no "90% efficiency gains", no
"20+ projects" if there are only 4) just to fill 4 slots. If you can honestly derive fewer than 4,
ship fewer, or leave the array empty — don't pad it.

## `data/highlights.json` (bento cards under the hero — optional, `bentoGrid.enabled` can be `false`)

```
cards[].icon         must be one of: Code2, Briefcase, Zap, Clock, Monitor, Cpu, Brain, Shield, Terminal, Users
cards[].label        [draft] — short category label
cards[].value        [draft] — grounded in real experience/focus, user approves
cards[].description  [draft] — one line, grounded in real facts
cards[].color        [design] — any hex
tools[]               [fact] — actual tools/technologies the user works with; never generic filler
```
