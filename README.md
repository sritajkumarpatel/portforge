# PortForge

> AI-Powered Portfolio Builder — Talk to an agent, get a complete React portfolio.

Created by [Sritaj Patel](https://github.com/sritajkumarpatel) — Automation Architect & AI Engineer.

PortForge is a template + agent instruction system that lets anyone create a production-ready portfolio website entirely through conversation with an AI agent (opencode, Claude Code, GitHub Copilot Codex, or any LLM-powered coding tool).

[GitHub Repository](https://github.com/sritajkumarpatel/portforge) — Star, fork, contribute.

## How It Works

```
You: "Set up my portfolio"

Agent: "Great! First, what should we call your project?"
You: "my-portfolio"
Agent: "Pick a visual style: Minimal, Bold, or Terminal?"
You: "Terminal"
Agent: "Want to paste your LinkedIn profile for auto-import?"
You: "Sure — here it is..."
... 5 minutes later ...
Agent: "Your portfolio is ready at ./my-portfolio/"
```

No coding. No config files to hand-edit. Just conversation.

## Features

- **3 visual styles** — Minimal (clean/professional), Bold (high contrast/dramatic), Terminal (monospace/CRT retro)
- **3 navigation modes** — Single-page scroll, tabbed sections, timeline layout
- **3 hero layouts** — Centered profile, left+right, full background
- **LinkedIn import** — Paste your LinkedIn profile text, get JSON files auto-generated
- **8 configurable sections** — About, Experience, Skills, Blog, Projects, Awards, Certifications, Education
- **7 color presets** + custom color picker (any hex values)
- **Dark/light mode** with theme switching
- **Animated UI** — Framer Motion scroll reveals, typewriter, floating orbs, glass cards
- **Brand icons** — react-icons for tech logos (no emojis)
- **SEO ready** — Open Graph, Twitter Cards, JSON-LD structured data
- **One-command deploy** — GitHub Pages, Netlify, or Vercel

## Tech Stack

React 18 + Vite 5 + Tailwind CSS 3 + Framer Motion 11 + Lucide Icons + react-icons

## Project Structure

```
PortForge/
├── AI_SETUP.md                    # Agent instructions (the engine)
├── scripts/
│   └── import-linkedin.js         # LinkedIn profile → JSON parser
├── template/                      # Portfolio template (copy this)
│   ├── public/
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/            # 15+ animated React components
│   │   ├── themes/                # Visual style CSS (minimal/bold/terminal)
│   │   ├── data/                  # JSON content files (placeholder)
│   │   ├── context/
│   │   ├── config.json            # Central configuration
│   │   ├── App.jsx
│   │   └── index.css
│   ├── netlify.toml               # One-click Netlify deploy
│   ├── vercel.json                # One-click Vercel deploy
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── package.json
└── README.md
```

## Quick Start

```bash
# Open with your AI agent
opencode .
# or: claude .
# or: code . (with Copilot Codex)

# Then just say:
"Set up my portfolio"
```

The agent will ask you 10-15 questions, one at a time, and build everything.

## Demo

Watch the agent build a complete portfolio using dummy data — no typing required:

```bash
# 1. Set up the demo environment
npm run demo

# 2. Open the demo directory with your agent
cd _demo
opencode .
# or: claude .

# 3. Say:
"set up my portfolio"
```

The agent will read the demo `AI_SETUP.md` and auto-fill everything with realistic sample data ("Alex Rivera", full-stack engineer) — you just watch it happen.

```

Clean up when done:

```bash
npm run demo-clean
```

The `_demo/` directory is already in `.gitignore`.

## Manual Use

If you prefer to do it yourself:

```bash
cp -r template my-portfolio
cd my-portfolio
npm install
# Edit all JSON files in src/data/ and src/config.json
npm run dev
```

## Deploy

```bash
# Built-in deploy command (GitHub Pages)
npm run deploy

# Or connect your repo to:
# - Netlify (netlify.toml included)
# - Vercel (vercel.json included)
```

---

Built with React + Vite + Framer Motion + Tailwind CSS.
Designed for agentic setup — no hand-editing required.
