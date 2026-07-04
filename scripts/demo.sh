#!/usr/bin/env bash
set -euo pipefail

DEMO_DIR="${1:-_demo}"
NAME="${2:-Alex Rivera}"
HANDLE=$(echo "$NAME" | tr '[:upper:]' '[:lower:]' | sed 's/ //g')
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "=== PortForge Demo ==="
echo "Setting up demo portfolio in ./$DEMO_DIR/ for $NAME ..."

# Copy template, strip stale node_modules
cp -r "$ROOT_DIR/template" "$ROOT_DIR/$DEMO_DIR"
rm -rf "$ROOT_DIR/$DEMO_DIR/node_modules" "$ROOT_DIR/$DEMO_DIR/package-lock.json"

# Update vite.config.js base path with the user's handle
sed -i '' "s|base: \"/my-portfolio/\"|base: \"/$HANDLE/\"|" "$ROOT_DIR/$DEMO_DIR/vite.config.js"

# Place AI_SETUP.md with pre-determined dummy instructions
# The agent will read this and auto-fill everything without asking questions
cat > "$ROOT_DIR/$DEMO_DIR/AI_SETUP.md" << 'AI_SETUP_EOF'
# PortForge Demo — Auto-Fill Mode

You are setting up a portfolio for a DEMO. Use the values below for everything.
**Do NOT ask the user for input** — proceed through every step automatically.

## Step 1: Project Name
The project directory already exists at `./_demo/`. All edits go into `./`.

Update `./vite.config.js` — set the `base` to `/__HANDLE__/`.

## Step 2: LinkedIn Import
Skip this step.

## Step 3: Visual Style
Use **Minimal**.

## Step 4: Navigation Style
Use **scroll**.

## Step 5: Hero Layout
Use **center-profile**.

## Step 6: Color Theme
Use the **indigo-amber** preset with **dark** mode.

## Step 7: Sections
Enable all 8 sections in their default order.

## Step 8: Personal Info
- Name: __NAME__
- Email: __HANDLE__@example.com
- GitHub: __HANDLE__
- LinkedIn: __HANDLE__
- Medium: __HANDLE__
- Headline: Full-Stack Engineer & Open Source Contributor
- Subtitle: Building resilient distributed systems and delightful user experiences. Passionate about developer tooling, performance optimization, and clean architecture.
- Titles: Full-Stack Engineer, Open Source Contributor, System Design Enthusiast, DevTools Builder

## Step 9: Bio / About
Write aboutMe.json with this data:
- shortBio: "Full-stack engineer with 6+ years building scalable web applications and developer tools."
- fullBio: "I'm a full-stack engineer based in San Francisco, specializing in distributed systems and developer experience. Over the past six years, I've worked across the stack—from designing high-throughput microservices in Go and Rust to crafting pixel-perfect React interfaces with Framer Motion animations.

I'm passionate about open source: I maintain several popular libraries in the JavaScript ecosystem and contribute regularly to the Rust and TypeScript communities. When I'm not shipping code, I write about system design, testing strategies, and the craft of software engineering.

I believe the best software emerges from a blend of rigorous engineering, empathy for the end user, and a willingness to iterate rapidly. My approach combines strong architectural foundations with pragmatic, incremental delivery."
- 4 expertise pillars:
  1. Full-Stack Development (icon: Terminal, color: #8b5cf6) — React & Next.js, REST & GraphQL, Node.js & Go, PostgreSQL/Redis/Kafka
  2. System Architecture (icon: Shield, color: #10b981) — Distributed systems, Event-driven, Cloud infra (AWS/GCP), Containers & orchestration
  3. Developer Experience (icon: Brain, color: #3b82f6) — CLI tooling, CI/CD, Documentation & testing, Open source
  4. Frontend Craft (icon: Users, color: #f59e0b) — Component libraries, Performance, Accessibility, Animation
- philosophy: "Good engineering is invisible — the best systems are the ones you never think about."

## Step 10: Experience
Write experience.json with 3 companies:

1. **Vercel** — Senior Software Engineer, Jan 2023 - Present (1yr 6mo), San Francisco CA, current
   Highlights: Architected Next.js edge runtime (60% faster cold starts), Led ISR 2.0 design, Mentored 4 juniors, Drove Rust tooling adoption (40% faster builds)

2. **Stripe** — Software Engineer Mar 2021-Dec 2022, Associate Software Engineer Aug 2019-Feb 2021 (3yr 5mo), San Francisco CA
   Highlights: Built Payment Intents API v3 ($500M+/mo), Real-time fraud detection with Kafka/Flink (25% fewer chargebacks), Internal CLI tools for 200+ engineers, Stripe SDK contributions

3. **GitHub** — Software Engineering Intern, Jun 2018-Aug 2018 (3mo), Remote
   Highlights: Implemented Actions caching (35% faster workflows), Integration tests for Actions runner (90% coverage), Tech talk on event-driven architecture

## Step 11: Skills
Write techStacks.json with 4 domains:

1. **Frontend Engineering** (Terminal, #8b5cf6)
   - Frameworks: React, Next.js, Vue, Svelte
   - Styling: Tailwind CSS, CSS Modules, Styled Components, Framer Motion
   - State Mgmt: Zustand, Redux Toolkit, Jotai, React Query

2. **Backend & Systems** (Shield, #10b981)
   - Languages: TypeScript, Go, Rust, Python
   - Runtimes: Node.js, Deno, Bun
   - Databases: PostgreSQL, Redis, MongoDB, SQLite

3. **Infrastructure & DevOps** (Brain, #3b82f6)
   - Cloud: AWS, GCP, Cloudflare
   - Containers: Docker, Kubernetes, Nomad
   - CI/CD: GitHub Actions, ArgoCD, Terraform

4. **Developer Tooling** (Users, #f59e0b)
   - CLI: oclif, Commander, Bubble Tea (Go)
   - Build: Turborepo, esbuild, SWC, Rolldown
   - Testing: Vitest, Playwright, Cypress, Testing Library

## Step 12: Projects
Write projects.json with 4 projects:

1. **Rolldown** (featured) — Rust-based JS/TS bundler, esbuild-compatible with Rollup plugins
   Technologies: Rust, TypeScript, NAPI-RS, SWC
   Features: esbuild-compatible API, Rollup plugin support, Tree-shaking + code splitting, TypeScript/JSX, Sub-50ms rebuilds

2. **KafkaViz** (featured) — Real-time Kafka cluster visualization & debugging
   Technologies: Go, React, WebSocket, Kafka, D3.js
   Features: Live consumer lag, Message inspection, End-to-end latency tracking, Exportable reports

3. **Prism UI** (featured) — Accessible React component library
   Technologies: React, TypeScript, Radix UI, Tailwind CSS, Storybook
   Features: 30+ accessible components, Tree-shakeable, Dark mode, Storybook docs

4. **TurboCache** — Distributed Node.js caching layer
   Technologies: Node.js, Redis, SQLite, TypeScript
   Features: Multi-tier (L1/L2), Automatic invalidation, Distributed warming, OpenTelemetry

## Step 13: Articles
Write mediumArticles.json with 5 articles:

1. "Building a Real-Time Fraud Detection Pipeline with Kafka and Flink" — System Design, Mar 2024, 12 min
2. "The State of Rust in JavaScript Tooling" — Development, Jan 2024, 8 min
3. "Testing Strategies for Event-Driven Architectures" — Testing, Nov 2023, 10 min
4. "Why I Stopped Using Redux and Reached for Jotai" — Development, Sep 2023, 6 min
5. "LLMs Are Changing How We Write Code — But Not How You Think" — AI & LLM, Jul 2023, 7 min

## Step 14: Awards
Write awards.json:
1. "Rising Star in Engineering" — Stripe, 2023
2. "Best Open Source Contribution" — GitHub, 2022
3. "Hackathon Winner — Developer Tools Track" — Vercel, 2021

## Step 15: Certifications
Write certifications.json:
1. AWS Solutions Architect — Professional (Dec 2023)
2. Google Cloud Professional Data Engineer (Jun 2022)
3. CNCF Certified Kubernetes Administrator (Mar 2022)

## Step 16: Education
Write education.json:
- B.S. in Computer Science, UC Berkeley, 2015-2019
- Focus: Distributed Systems, Algorithms, HCI

## Step 17: SEO
Update index.html:
- Title: "__NAME__ — Portfolio"
- Description: "__NAME__ — Full-Stack Engineer building resilient distributed systems and delightful user experiences."
- Add Open Graph, Twitter Card, JSON-LD tags with the same info

Update `vite.config.js` — ensure `base` is set to `/__HANDLE__/`.

## Step 18: Finalize
Run these commands:
```bash
npm install
npm run build
```

Verify the build succeeds. Then tell the user:
"Demo portfolio is ready! Run `npm run dev` to preview, or explore the files in `src/data/` and `src/config.json`."
AI_SETUP_EOF

# Replace placeholders with actual values
sed -i '' "s/__NAME__/$NAME/g" "$ROOT_DIR/$DEMO_DIR/AI_SETUP.md"
sed -i '' "s/__HANDLE__/$HANDLE/g" "$ROOT_DIR/$DEMO_DIR/AI_SETUP.md"

# Install deps so the agent doesn't have to wait
cd "$ROOT_DIR/$DEMO_DIR"
npm install

echo ""
echo "=== Demo ready! ==="
echo ""
echo "  Location: ./$DEMO_DIR/"
echo ""
echo "  Portfolio for: $NAME"
echo "  GitHub handle: $HANDLE"
echo ""
echo "  To watch the agent build the portfolio, open this directory"
echo "  with your AI coding agent and say:"
echo ""
echo "    set up my portfolio"
echo ""
echo "  The agent will auto-fill everything with dummy data"
echo "  — no typing answers required."
echo ""
