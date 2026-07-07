<div align="center">

# PortForge ⚡

### AI-Powered React Portfolio Builder

**Talk to an AI agent. Answer 10 questions. Get a production-ready portfolio in 5 minutes.**

[![CI](https://img.shields.io/github/actions/workflow/status/sritajkumarpatel/portforge/ci.yml?branch=main&style=flat-square)](https://github.com/sritajkumarpatel/portforge/actions)
[![npm](https://img.shields.io/npm/v/portforge?style=flat-square)](https://www.npmjs.com/package/portforge)
[![GitHub stars](https://img.shields.io/github/stars/sritajkumarpatel/portforge?style=flat-square)](https://github.com/sritajkumarpatel/portforge/stargazers)
[![GitHub release](https://img.shields.io/github/v/release/sritajkumarpatel/portforge?style=flat-square)](https://github.com/sritajkumarpatel/portforge/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)

[Try the Demo](https://github.com/sritajkumarpatel/portforge#demo) · [Quick Start](#quick-start) · [Features](#features) · [Deploy](#deploy) · [Docs](AI_SETUP.md)

---

https://github.com/user-attachments/assets/demo-placeholder

</div>

## The Problem

You're a developer. You need a portfolio to get hired, land clients, or showcase your work. But:

- **Pre-built templates feel generic** — every React portfolio looks the same
- **Building from scratch takes weeks** — you'd rather spend that time on actual projects
- **CMS platforms are overkill** — drag-and-drop builders are slow, locked-in, and bloated
- **You keep putting it off** — months go by and your GitHub profile is still your only presence

## The Solution

PortForge is different. You don't build a portfolio — you **have a conversation** with an AI coding agent. The agent asks you 10–15 questions about your experience, projects, skills, and preferences. After each answer, it edits the data files in real time. Five minutes later, you have a fully personalized, production-ready portfolio website.

```
You: "Set up my portfolio"
Agent: "Great! Pick a visual style: Minimal, Bold, or Terminal?"
You: "Terminal"
Agent: "Want to import your LinkedIn profile?"
You: "Sure — here it is..."
... 5 minutes later ...
Agent: "Your portfolio is ready at ./my-portfolio/"
```

No account signup. No drag-and-drop. No CMS. Just your data + a React template + an AI agent.

## Features

### Content Sections (8 toggleable sections)

| Section | Description |
|---|---|
| **Hero** | Typewriter titles, floating orbs, social links, animated counters |
| **About** | Short bio, 2–3 paragraph full bio, 4 expertise pillars with capabilities |
| **Experience** | Timeline with companies, multiple roles per company, highlights, awards |
| **Skills / Tech Stack** | Collapsible expertise domains with categorized skills + brand icons |
| **Projects** | Card grid with featured flag, tech tags, GitHub + live demo links, detail modal |
| **Blog / Articles** | Medium articles with topic filtering (AI & LLM, Testing, Leadership, Development) |
| **Awards** | Gradient badge cards with company and year |
| **Certifications** | Grid with optional issuer logos and dates |
| **Education** | Cards with degree, institution, period, focus tags |

### Visual Customization

- **3 visual styles** — Minimal (clean/professional), Bold (high contrast/dramatic), Terminal (monospace/CRT retro)
- **7 color presets** — Slate-Amber, Indigo-Violet, Emerald-Teal, Rose-Fuchsia, Blue-Cyan, Purple-Pink, Indigo-Amber
- **Custom colors** — any hex values for primary, accent, and background
- **Dark / Light mode** — toggleable, persisted to localStorage

### Animations & UX

- Framer Motion scroll-triggered fade-ups, parallax, floating gradient orbs, glass-morphism cards
- Sticky navigation with scroll progress indicator and active section tracking
- Back-to-top button, custom scrollbar, skeleton loading states
- Responsive design (mobile-first Tailwind)

### Developer Experience

- **LinkedIn auto-import** — paste your LinkedIn profile text, get JSON files generated automatically
- **SEO-ready** — Open Graph tags, Twitter Cards, JSON-LD structured data, sitemap.xml, robots.txt
- **One-command deploy** — GitHub Pages, Netlify, or Vercel with included configs
- **Zero lock-in** — plain React + Vite + JSON data files. Take it anywhere.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18 | UI framework |
| **Vite** | 5 | Build tool & dev server |
| **Tailwind CSS** | 3 | Utility-first styling |
| **Framer Motion** | 11 | Animations |
| **Lucide React** | 0.400 | Icons |
| **react-icons** | 5 | Brand / tech logos |

## Quick Start

### Option 1: AI Agent Setup (Recommended)

```bash
npx create-portforge my-portfolio
cd my-portfolio && npm run dev
```

Or open an existing directory with your AI coding agent:

```bash
# Copy the template
cp -r template my-portfolio
cd my-portfolio

# Open with your AI agent
opencode .
# or: claude .
# or: code . (with Copilot Codex)

# Then say:
"Set up my portfolio"
```

The agent will walk you through every step — no manual config required.

### Option 2: Manual Setup

```bash
cp -r template my-portfolio
cd my-portfolio
npm install
# Edit JSON files in src/data/ and src/config.json
npm run dev
```

## Demo

Watch PortForge build a complete portfolio automatically with dummy data:

```bash
npm run demo
cd _demo
opencode .
# Say: "set up my portfolio"
```

The agent auto-fills everything using sample data ("Alex Rivera", full-stack engineer) — you just watch it build.

```bash
npm run demo-clean  # Clean up when done
```

## Project Structure

```
portforge/
├── AI_SETUP.md              # Agent instructions (the engine)
├── scripts/
│   └── import-linkedin.js   # LinkedIn profile → JSON parser
├── template/                # Portfolio template (copy this)
│   ├── public/
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/      # 18 React components (Hero, About, Experience, etc.)
│   │   ├── themes/          # Visual style CSS (minimal/bold/terminal)
│   │   ├── data/            # JSON content files (edit these)
│   │   ├── context/         # ThemeContext (dark/light, color presets)
│   │   ├── config.json      # Central configuration
│   │   ├── App.jsx
│   │   └── index.css
│   ├── netlify.toml         # One-click Netlify deploy
│   ├── vercel.json          # One-click Vercel deploy
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── LICENSE
├── CONTRIBUTING.md
└── README.md
```

## Deploy

```bash
# GitHub Pages
npm run deploy

# Netlify — connect your repo, netlify.toml is included
# Vercel — connect your repo, vercel.json is included
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Run `npx prettier --check .` to ensure formatting
4. Verify the template builds: `cd template && npm install && npm run build`
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<p align="center">
Built by <a href="https://github.com/sritajkumarpatel">Sritaj Patel</a><br>
Designed for agentic setup — no hand-editing required.
</p>
