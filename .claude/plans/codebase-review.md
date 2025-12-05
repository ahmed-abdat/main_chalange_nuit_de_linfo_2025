# Codebase Review & Full Refactor Plan

## Overview

Full refactor of the GameBoy Snake project following Next.js 16 best practices with Zustand/useReducer for state management.

**User Requirements**:
- Keep ALL UI components (no deletions)
- Use Zustand or useReducer for state management
- Follow Next.js 16 best practices

---

## Codebase Metrics

| Metric | Value |
|--------|-------|
| **Total Files** | 79 TypeScript/React files |
| **Estimated LOC** | ~37,000 lines |
| **Components** | 48 component files |
| **Largest File** | GameBoy.tsx (1,454 LOC) |
| **Average Component** | ~245 LOC |

---

## Next.js 16 Best Practices Checklist

### Server vs Client Components
- [ ] Keep layouts as Server Components (no 'use client')
- [ ] Use 'use client' only for interactive components
- [ ] Async params in dynamic routes: `params: Promise<{ slug: string }>`
- [ ] Metadata exports in Server Components only

### Performance
- [ ] React Compiler enabled (already done ✅)
- [ ] Use `next/image` with explicit dimensions
- [ ] Lazy load heavy components with `next/dynamic`
- [ ] Streaming with Suspense for slow data

### State Management
- [ ] Zustand for global game state (cross-component)
- [ ] useReducer for complex local state (GameBoy internal)
- [ ] Avoid prop drilling with stores

---

## IMPLEMENTATION PLAN

### Phase 1: State Management Setup (Zustand)

**Install Zustand**:
```bash
pnpm add zustand
```

**Create Game Store** (`src/store/gameStore.ts`):
```typescript
import { create } from 'zustand';

interface GameState {
  // Cartridge state
  insertedCartridge: string | null;
  cartridgeState: 'empty' | 'booting' | 'ready' | 'incompatible';

  // Game state
  snake: Position[];
  food: Position;
  direction: Direction;
  score: number;
  highScore: number;
  gameOver: boolean;
  isPaused: boolean;
  gameStarted: boolean;

  // Actions
  insertCartridge: (id: string) => void;
  ejectCartridge: () => void;
  setDirection: (dir: Direction) => void;
  moveSnake: () => void;
  resetGame: () => void;
  togglePause: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  insertedCartridge: null,
  cartridgeState: 'empty',
  snake: [{ x: 8, y: 8 }],
  food: { x: 4, y: 4 },
  direction: 'RIGHT',
  score: 0,
  highScore: 0,
  gameOver: false,
  isPaused: false,
  gameStarted: false,

  // Actions with game logic
  insertCartridge: (id) => set({ insertedCartridge: id, cartridgeState: 'booting' }),
  ejectCartridge: () => set({ insertedCartridge: null, cartridgeState: 'empty' }),
  // ... more actions
}));
```

---

### Phase 2: GameBoy Refactor with useReducer

**New Structure**:
```
src/components/GameBoy/
├── index.tsx              # Main component, renders UI
├── GameBoyScreen.tsx      # Canvas rendering component
├── GameBoyControls.tsx    # D-pad and buttons
├── useGameReducer.ts      # useReducer for internal state
├── useGameLoop.ts         # Game loop hook
├── showcaseScreens.ts     # Zelda/Mario/Tetris/Pokemon screens
├── constants.ts           # GRID_SIZE, INITIAL_SPEED, colors
└── types.ts               # GameBoy-specific types
```

**useGameReducer.ts**:
```typescript
type GameAction =
  | { type: 'MOVE' }
  | { type: 'CHANGE_DIRECTION'; direction: Direction }
  | { type: 'EAT_FOOD' }
  | { type: 'GAME_OVER' }
  | { type: 'RESET' }
  | { type: 'TOGGLE_PAUSE' }
  | { type: 'START_GAME' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MOVE':
      // Calculate new head position
      // Check collisions
      // Return new state
    case 'CHANGE_DIRECTION':
      // Validate direction (no 180° turns)
      // Update direction
    case 'EAT_FOOD':
      // Grow snake, increase score, generate new food
    // ... etc
  }
}
```

---

### Phase 3: File Naming Standardization

**Rename to PascalCase** (keep all files, just rename):

| Current | New Name |
|---------|----------|
| `footer-one.tsx` | `FooterOne.tsx` |
| `retro-grid.tsx` | `RetroGrid.tsx` |
| `hero-03.tsx` | `Hero03.tsx` |
| `bento-grid.tsx` | `BentoGrid.tsx` |
| `expand-cards.tsx` | `ExpandCards.tsx` |
| `hero-section.tsx` | `HeroSection.tsx` |
| `circular-gallery-2.tsx` | `CircularGallery.tsx` |
| `testimonial-slider-1.tsx` | `TestimonialSlider.tsx` |

**Update imports** in all files that reference them.

---

### Phase 4: Constants & Types Extraction

**Create `src/constants/game.ts`**:
```typescript
export const GRID_SIZE = 16;
export const INITIAL_SPEED = 200;
export const SCREEN_WIDTH = 160;
export const SCREEN_HEIGHT = 144;
export const CELL_SIZE = SCREEN_WIDTH / GRID_SIZE;

export const COLORS = {
  background: '#9bbc0f',
  backgroundDark: '#8bac0f',
  snake: '#0f380f',
  food: '#306230',
  text: '#0f380f',
} as const;

// Showcase screen positions (no more magic numbers)
export const SHOWCASE = {
  zelda: { linkX: 70, linkY: 90, dungeonX: 20, dungeonY: 40 },
  mario: { marioX: 60, groundY: 120, pipeX: 100 },
  tetris: { wellX: 50, wellY: 20, wellWidth: 60 },
  pokemon: { battleY: 80, menuY: 110 },
} as const;
```

---

### Phase 5: Error Boundary Component

**Create `src/components/ErrorBoundary.tsx`**:
```typescript
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <p className="text-red-400">Something went wrong</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

---

### Phase 6: Organize Imports & Barrel Files

**Create `src/components/index.ts`** (barrel export):
```typescript
// UI Components
export * from './ui';

// Feature Components
export { GameBoy } from './GameBoy';
export { Cartridge } from './Cartridge';
export { CircularGallery } from './CircularGallery';
// ... etc
```

**Create `src/hooks/index.ts`**:
```typescript
export { useRetroSounds } from './useRetroSounds';
export { useGameStore } from '../store/gameStore';
```

---

## Implementation Order

| Step | Task | Files Affected |
|------|------|----------------|
| 1 | Install Zustand | package.json |
| 2 | Create game store | src/store/gameStore.ts |
| 3 | Create constants file | src/constants/game.ts |
| 4 | Create GameBoy types | src/components/GameBoy/types.ts |
| 5 | Create useGameReducer | src/components/GameBoy/useGameReducer.ts |
| 6 | Split GameBoy component | src/components/GameBoy/* |
| 7 | Rename kebab-case files | Multiple files |
| 8 | Update all imports | All affected files |
| 9 | Add ErrorBoundary | src/components/ErrorBoundary.tsx |
| 10 | Create barrel exports | src/components/index.ts, etc. |
| 11 | Run lint + build | Verify everything works |

---

## Critical Files to Modify

| File | Changes |
|------|---------|
| `src/components/GameBoy.tsx` | Split into modular structure |
| `src/components/sections/CoffreFortSection.tsx` | Use Zustand store |
| `src/app/page.tsx` | Import from barrels |
| `src/app/globals.css` | No changes needed |
| `package.json` | Add Zustand dependency |

---

## Verification Steps

After implementation:
```bash
pnpm lint          # Check for errors
pnpm build         # Verify production build
pnpm dev           # Test functionality
```

---

## Summary

This full refactor will:
1. **Keep all UI components** - no deletions
2. **Add Zustand** for global game state
3. **Use useReducer** for complex GameBoy state
4. **Split GameBoy** from 1,454 LOC → modular structure
5. **Standardize naming** to PascalCase
6. **Extract constants** (no magic numbers)
7. **Add ErrorBoundary** for resilience
8. **Follow Next.js 16** best practices throughout
