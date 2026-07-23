---
name: setup-portfolio
description: Guide the user through creating their own portfolio from this repo's template — greet them, optionally extract content from a pasted LinkedIn/resume, gather remaining content, and build it. Use when the user says things like "set up my portfolio", "create my portfolio", "build my site", or opens this repo wanting to generate their own portfolio.
---

# Setup Portfolio

The full flow lives in [`AI_SETUP.md`](../../../AI_SETUP.md) at the repo root and the `setup/*.md` files it hands off to. Read `AI_SETUP.md` first, then follow each file it links to, in order, exactly as written — that document is agent-agnostic and complete on its own. This skill only adds a few things worth doing differently because you're running in Claude Code specifically.

## Track progress with tasks

At the start, create one task per phase with TaskCreate — intake, content (extraction or manual questions), design preferences, finalize — and move each to `in_progress`/`completed` as you go through `setup/`. This flow involves a lot of back-and-forth; visible progress matters more here than on a typical single-shot task.

## Use AskUserQuestion for closed-set design choices

`setup/04-design-preferences.md` has several fixed-option questions: visual style, navigation style, hero layout, color preset, dark/light mode. Use the AskUserQuestion tool for these — it's a better fit than free text for a 2-4 option pick, and the user sees all options at once instead of reading a table.

Keep everything else conversational plain text. Name, bio, experience, the LinkedIn/resume paste itself, and any content gap-filling from `setup/03-manual-questions.md` are open-ended — AskUserQuestion is for closed choices, not for content the user has to compose.

## Don't shortcut the confirmation checkpoint

`setup/02-extract-from-sources.md` requires summarizing what was extracted and getting explicit approval before writing any files. Having more tool-calling throughput than a typical agent is not a reason to skip this — it exists because pasted LinkedIn/resume text is messy and needs a human sanity check, not because of a technical limitation.

## Actually verify before handing off

Run the `npm install && npm run build` from `setup/05-finalize.md` yourself with the Bash tool and confirm it exits cleanly before telling the user their portfolio is ready. Don't report success without having run it.
