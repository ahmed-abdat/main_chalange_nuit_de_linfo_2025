# Plan: Snake Game Enhancements

## Overview

Enhance the GameBoy Snake game with:
1. **Progressive obstacles** - New obstacles spawn as score increases
2. **Difficulty selector** - Player chooses Easy/Normal/Hard before starting
3. **Enhanced sound effects** - More retro 8-bit sounds
4. **Visual effects** - Screen shake, particle effects, animations

---

## Feature 1: Difficulty Selection Menu

### UI Flow
1. When game is ready (cartridge inserted), show difficulty selection screen instead of "Press START"
2. Use D-pad UP/DOWN to select difficulty
3. Press START to begin with selected difficulty

### Difficulty Levels
```typescript
const DIFFICULTY_LEVELS = {
  EASY: {
    name: 'FACILE',
    initialSpeed: 250,      // Slower
    speedIncrement: 0.3,    // Slower acceleration
    obstacleSpawnRate: 50,  // Spawn obstacle every 50 points
    maxObstacles: 5,
  },
  NORMAL: {
    name: 'NORMAL',
    initialSpeed: 200,
    speedIncrement: 0.5,
    obstacleSpawnRate: 30,  // Every 30 points
    maxObstacles: 10,
  },
  HARD: {
    name: 'DIFFICILE',
    initialSpeed: 150,      // Faster
    speedIncrement: 0.8,    // Quick acceleration
    obstacleSpawnRate: 20,  // Every 20 points
    maxObstacles: 15,
  },
};
```

---

## Feature 2: Progressive Obstacle System

### Obstacle Mechanics
- Obstacles are static walls that kill the snake on collision
- New obstacles spawn as score increases (based on difficulty)
- Obstacles spawn in random empty positions (not on snake or food)
- Visual: Dark squares distinct from snake body

### Spawn Logic
```typescript
// Check if new obstacle should spawn
const shouldSpawnObstacle = (score: number, difficulty: Difficulty, obstacleCount: number) => {
  const config = DIFFICULTY_LEVELS[difficulty];
  const targetCount = Math.floor(score / config.obstacleSpawnRate);
  return obstacleCount < targetCount && obstacleCount < config.maxObstacles;
};
```

### Collision Detection
Add obstacle collision check in game loop:
```typescript
// After self-collision check
if (obstacles.some(obs => obs.x === head.x && obs.y === head.y)) {
  setGameOver(true);
  playSound('hit'); // New sound
  return currentSnake;
}
```

---

## Feature 3: Enhanced Sound Effects

### New Sounds to Add (in useRetroSounds.ts)
| Sound | Trigger | Type |
|-------|---------|------|
| `select` | Menu navigation | Short beep |
| `confirm` | Difficulty selected | Rising tone |
| `hit` | Hit obstacle | Low thud |
| `levelUp` | New obstacle spawns | Alert tone |

### Implementation
Extend the existing `useRetroSounds` hook with new oscillator patterns.

---

## Feature 4: Visual Effects

### Screen Shake (Already exists)
- Trigger on game over ✓
- Add: Trigger on obstacle collision

### New Effects
1. **Obstacle spawn flash** - Brief screen flash when obstacle appears
2. **Score popup** - "+10" text briefly appears when eating food
3. **Danger warning** - Screen border flashes red when near obstacle

---

## Implementation Steps

### Step 1: Add Constants
**File**: `src/constants/game.ts`
- Add `DIFFICULTY_LEVELS` configuration
- Add obstacle-related constants

### Step 2: Extend Game State
**File**: `src/components/GameBoy/index.tsx`
- Add state: `difficulty`, `obstacles`, `showDifficultyMenu`
- Add obstacle collision detection in game loop
- Add obstacle spawning logic based on score

### Step 3: Difficulty Menu UI
**File**: `src/components/GameBoy/GameBoyScreen.tsx`
- Add `renderDifficultyMenu()` function
- Handle D-pad navigation for menu

### Step 4: Render Obstacles
**File**: `src/components/GameBoy/GameBoyScreen.tsx`
- Add obstacle drawing in `renderGameScreen()`
- Use distinct visual style (hatched pattern or different shade)

### Step 5: Enhanced Sounds
**File**: `src/hooks/useRetroSounds.ts`
- Add new sound types: `select`, `confirm`, `hit`, `levelUp`
- Create oscillator patterns for each

### Step 6: Visual Effects
**File**: `src/components/GameBoy/index.tsx`
- Add obstacle spawn animation
- Add score popup effect

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/constants/game.ts` | Add difficulty levels, obstacle constants |
| `src/components/GameBoy/index.tsx` | State, game loop, obstacle logic, menu handling |
| `src/components/GameBoy/GameBoyScreen.tsx` | Difficulty menu UI, obstacle rendering |
| `src/hooks/useRetroSounds.ts` | New sound effects |
| `src/components/GameBoy/types.ts` | Add Difficulty type, obstacle types |

---

## Game Flow

```
[Insert Snake Cartridge]
        ↓
[Boot Animation]
        ↓
[Difficulty Menu]        ← NEW
  ↑↓ = Select
  START = Confirm
        ↓
[Game Starts]
        ↓
[Score increases] → [Spawn obstacle?] → [Yes] → [Add obstacle + sound]
        ↓
[Hit obstacle?] → [Yes] → [Game Over + shake]
        ↓
[Game Over Screen]
  A = Replay (same difficulty)
  SELECT = Back to menu      ← NEW
```

---

## Estimated Scope

- **Constants**: ~30 lines
- **State & Logic**: ~80 lines
- **UI Rendering**: ~60 lines
- **Sounds**: ~40 lines
- **Total**: ~210 lines of new/modified code

---

## Status: PENDING

Ready to implement when you give the go-ahead!
