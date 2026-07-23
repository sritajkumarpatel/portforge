# Step 1: Welcome & Intake

Open with something warm and short — you're helping someone build their portfolio, not filling out a form. Something like: *"Hey! I'll help you set up your portfolio. Should take a few minutes."*

## 1. Name & project folder

Ask: *"What's your name? I'll use it to personalize your portfolio."*

Then ask: *"What should your portfolio project be called? (default: my-portfolio)"*

```bash
cp -r template ./{project-name}
```

All subsequent edits go into `./{project-name}/`.

If a `.gitignore` file exists in the current directory (i.e. you're running this inside a clone of the portforge repo itself, not a standalone copy), append `/{project-name}/` to it — unless that exact line is already present — so the generated portfolio never gets tracked as part of the portforge tool repo. Skip this if there's no `.gitignore` here.

Update `./{project-name}/vite.config.js` — set `base` to `/{project-name}/` (this may get corrected again in `05-finalize.md` once the deploy target is known).

## 2. Offer to import (both optional)

Ask, as one message: *"Want to speed this up? You can paste your LinkedIn profile and/or your resume, and I'll pull real content from them — you'll still get to review and edit everything before it's final. Or we can just go through it question by question. Totally up to you."*

Then, one at a time:

1. *"Got a LinkedIn export handy? Go to your profile → More → Save to PDF, then paste the text here. Or just skip this if you'd rather not."*
2. *"Want to paste your resume too? Same deal — optional."*

Accept whatever the user gives you, in whatever order, including nothing at all. Don't push back if they skip both — that's a completely normal path, not a fallback of last resort.

## 3. Decide the branch

- **If they pasted LinkedIn text and/or a resume** → go to `02-extract-from-sources.md` with the raw pasted text in hand.
- **If they skipped both** → go straight to `03-manual-questions.md` and work through every content group from scratch.

Either way, once content is gathered, both paths continue on to `04-design-preferences.md`.
