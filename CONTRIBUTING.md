# Contributing to PortForge

First off, thanks for taking the time to contribute! 🎉

## Code of Conduct

This project and everyone participating in it is governed by the [PortForge Code of Conduct](https://github.com/sritajkumarpatel/portforge/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in [Issues](https://github.com/sritajkumarpatel/portforge/issues)
- Use the Bug Report template
- Include clear reproduction steps and environment details

### Suggesting Features

- Open a Feature Request issue
- Explain why the feature would benefit the community
- Include examples or references if possible

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Make your changes
4. Run `npx prettier --check .` to ensure consistent formatting
5. Verify the template builds: `cd template && npm install && npm run build`
6. Commit with a clear message (`feat: add amazing feature`)
7. Push and open a Pull Request

### Development Setup

```bash
git clone https://github.com/sritajkumarpatel/portforge.git
cd portforge
npm install
```

### Project Structure

```
portforge/
├── AI_SETUP.md          # Agent orchestrator — entry point
├── setup/               # Step-by-step agent instructions AI_SETUP.md hands off to
├── template/            # Portfolio template (main artifact)
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── data/        # JSON content files
│   │   ├── themes/      # Visual style CSS
│   │   └── ...
│   └── package.json
└── package.json
```

### Style Guidelines

- **Components**: Functional React components with hooks. Follow patterns in existing components.
- **CSS**: Tailwind utility classes + CSS variables for theming.
- **JSON**: Keep content in `src/data/*.json` — never hardcode user content.
- **Formatting**: Prettier is configured at the root. Run `npx prettier --write .` before committing.

## Questions?

Open a [Discussion](https://github.com/sritajkumarpatel/portforge/discussions) or reach out to [@sritajkumarpatel](https://github.com/sritajkumarpatel).
