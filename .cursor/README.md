# Cursor IDE Rules - Village NIRD

This folder contains AI rules for team members using Cursor IDE.

## How It Works

When you open this project in Cursor, these rules automatically load and help the AI understand:
- Our tech stack and conventions
- The NIRD design system
- Challenge requirements and winning strategy
- Green IT optimization targets

## Rule Files

| File | Purpose | When Applied |
|------|---------|--------------|
| `nird-core.mdc` | Core project conventions | Always |
| `nird-design.mdc` | Color palette & styling | When editing CSS/TSX |
| `react-patterns.mdc` | React/Next.js patterns | When editing components |
| `scrollytelling.mdc` | Animation & scroll patterns | When editing sections |
| `winning-strategy.mdc` | Challenge strategy | Always |
| `green-it.mdc` | Performance optimization | When editing code |

## For Team Members

### First Time Setup

1. Install [Cursor IDE](https://cursor.com)
2. Open this project folder
3. Rules load automatically

### Verify Rules Are Active

1. Open any `.tsx` file
2. Start a new chat with Cursor AI
3. The AI should reference NIRD colors, conventions, etc.

### Adding New Rules

Create a new `.mdc` file in `.cursor/rules/`:

```yaml
---
description: Brief description of rule purpose
globs: ["src/**/*.tsx"]  # Files where this applies
alwaysApply: false
---

# Rule Title

Your instructions here...
```

## Rule Types

### Always Apply
```yaml
alwaysApply: true
```
Used for core conventions everyone must follow.

### File-Specific (Auto-Attach)
```yaml
globs: ["src/components/**/*.tsx"]
```
Applied only when editing matching files.

## Quick Reference

### Tech Stack
- Next.js 16.0.7 (App Router)
- React 19.2.0
- TypeScript 5 (strict)
- Tailwind CSS 4
- Framer Motion 12
- Zustand 5

### Primary Colors
- Emerald Green: `#00997d`
- Forest Green: `#2E7D32`
- Gold: `#F9A825`

### Commands
```bash
pnpm dev      # Start dev server
pnpm build    # Build for production
pnpm lint     # Run linter
```

## Sync with CLAUDE.md

For team members using Claude Code, the `CLAUDE.md` file contains similar information. Keep both in sync when updating project conventions.
