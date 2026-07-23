# Step 5: SEO, Deploy Config & Finish

## SEO

Update `index.html` with:
- Meta description
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data

Update `vite.config.js` — make sure `base` is correct for the deploy target: `/<repo-name>/` for GitHub Pages, or `/` for a custom domain / user site.

The template already has `netlify.toml`, `vercel.json`, `robots.txt`, `sitemap.xml`. Update the domain placeholder in `robots.txt` and `sitemap.xml`.

## Install & Build

```bash
cd ./{project-name}
npm install
npm run build
```

Verify the build succeeds. If it fails, fix the issue before telling the user it's ready — don't hand off a broken build.

## Hand it back

Tell the user:

*"Your portfolio is ready at `./{project-name}/`. Run `cd {project-name} && npm run dev` to preview, or `npm run build` to publish. Deploy to Netlify by connecting your GitHub repo, or to Vercel with one click."*

## Notes for the agent (apply throughout, not just this step)

- All user content goes in `src/*.json` files. Never edit React components.
- `src/themes/active.css` controls the visual style. Replace it entirely when changing styles, don't hand-tweak it.
- Validate JSON syntax after every edit.
- If the user has a photo, save it as `public/images/profile.png`. If they don't, that's fine — the hero shows their initials instead automatically.
- Never fabricate content. This applies everywhere, not just during extraction — if you're ever about to write a specific claim (a number, a company, an achievement) that didn't come from the user, stop and ask instead.
