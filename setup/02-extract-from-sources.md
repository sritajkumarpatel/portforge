# Step 2a: Extract From LinkedIn / Resume

You have raw pasted text from LinkedIn and/or a resume. Read it yourself and understand it — the way you'd read someone's profile if a colleague handed it to you, not the way a regex would scan it for line-length patterns. That's the entire point of doing this here instead of running a parsing script: text exported from LinkedIn/PDFs is inconsistent in layout, and pattern matching on it produces confidently-wrong data. Your comprehension doesn't have that failure mode — use it.

Work against [`content-schema.md`](content-schema.md). For every `[fact]` field, only fill it if it's genuinely present in the text. For every `[draft]` field, propose something grounded in what's actually there.

## If you have both LinkedIn and resume text

Don't just pick one. Cross-reference:
- The resume often has punchier, more specific bullet points for `experience[].highlights` — LinkedIn often has more complete role/date history.
- If they disagree on a fact (different date ranges, different titles for the same role), don't silently pick one — flag it in your gap list and ask which is right.

## What to extract

Go through `content-schema.md` file by file. For each `[fact]` field:
- Found it → use it, as close to verbatim as makes sense (see the "lightly cleaned up" note on `experience[].highlights`).
- Not found → do not fill it in. Add it to your gap list instead.

For each `[draft]` field, write a proposed version grounded in facts you did find, but don't write it to a file yet — it goes in the summary in step 3 below for approval.

Skip anything tagged `[ask]` or `[design]` entirely here — those never come from source text, no point looking for them.

**`stats.json` needs special care.** Only include a stat if you can actually derive it (e.g. sum real role durations for "years of experience"). Do not manufacture a percentage, a project count, or anything else you can't trace back to real data you just extracted. It is completely fine to leave `stats.json` as `[]` at this point — real numbers may become available once `projects.json`/`certifications.json` are filled in later steps.

## Build a gap list

After extraction, you'll have three buckets:
1. **Filled facts** — ready to write.
2. **Drafts** — need user approval.
3. **Gaps** — schema fields with no source data (most commonly: `personal.email/github/medium`, `philosophy`, all of `projects.json`, all of `mediumArticles.json`, and anything genuinely missing from what they pasted).

## Confirm before writing anything

Summarize what you found in plain language, not a JSON dump. Something like:

> "Here's what I pulled together: 3 companies (Acme Corp, current; Globex, 2 years; Initech, 1 year), 5 skill areas, 2 certifications, a B.S. in Computer Science. I don't have your email, GitHub, or Medium handle yet, and there's no project info in either source — we'll cover those next. Here's a draft headline: '...' — want to keep it, tweak it, or skip it?"

Walk through the drafts and let the user edit or reject each one. Only write files once the user says something like "looks good" / "proceed" / gives you edits to apply. Never finalize a draft silently.

## Continue

Write the confirmed facts and approved drafts to the relevant files now.

Take the gap list to [`03-manual-questions.md`](03-manual-questions.md) — but only ask about the sections that are actually gaps. If experience/education/certifications are already fully covered, don't re-ask those questions; jump straight to the ones still open (projects, articles, personal contact info, philosophy, etc.).

Once gaps are resolved, continue to [`04-design-preferences.md`](04-design-preferences.md).
