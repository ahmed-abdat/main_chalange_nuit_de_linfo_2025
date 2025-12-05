---
description: Add shadcn/ui components from registries
allowed-tools: Bash(npx:*), mcp__shadcn__*
argument-hint: <component-name>
---

Add the shadcn/ui component: $ARGUMENTS

## Steps
1. Search for the component using shadcn MCP
2. Show component preview and dependencies
3. Install with: `npx shadcn@latest add <name>`
4. Verify installation in src/components/ui/

## Registries
- shadcn/ui: `npx shadcn@latest add button`
- Magic UI: `npx shadcn@latest add "https://magicui.design/r/shimmer-button"`
- Motion Primitives: `npx shadcn@latest add "https://motion-primitives.com/r/animated-group"`
