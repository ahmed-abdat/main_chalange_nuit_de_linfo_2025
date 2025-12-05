# Village NIRD - Clean Modern Landing Page Plan

## Overview
Create a clean, modern, consistent landing page with purposeful animations. Each section has ONE clear message. Animations enhance understanding, not distract.

---

## Design Principles (Research-Backed)

### Visual Style: **Dark Hero → Light Sections**
Based on professional landing page research, this creates a visual narrative:
- **Dark = Problem** (Empire/Big Tech threatening)
- **Light = Solution** (Village/NIRD freedom)
- CTAs pop harder on dark backgrounds
- Aligns with tech product standards (Notion, GitHub)

### Color Flow
```
Hero:     Dark (#1a1a1d) with emerald glow
Crisis:   Dark → Light gradient transition
Choice:   Light (parchment #FFF8E1)
Game:     Light (gray-50)
Pillars:  Light (#f4f4f9)
Join:     Emerald (#00997d) - celebration
Footer:   Dark (#1a1a1d) - bookend
```

### Animation Philosophy
| ✅ DO | ❌ DON'T |
|-------|----------|
| Animate to draw attention to key content | Animate everything |
| Use entrance animations once | Loop animations continuously |
| Subtle, professional motion | Flashy, distracting effects |
| One animation type per section | Multiple competing animations |
| Respect `prefers-reduced-motion` | Force animations on all users |

---

## Page Structure (6 Sections)

### Section 1: HERO (Dark Theme)
**Message**: "One village still resists the Empire"

**Layout**:
- Full-height hero (min-h-screen)
- Dark background (#1a1a1d) with subtle emerald glow
- Centered content
- Dramatic text reveal

**Components**:
- `BlurText` for main title "Le Village qui Résiste" (word-by-word reveal)
- Animated badge "Octobre 2025 - Fin de Windows 10" (pulse)
- Subtitle with crisis hook
- Primary CTA (emerald, high contrast on dark)
- Scroll indicator

**Why Dark Hero**:
- Commands attention in first 3 seconds
- Perfect for "Empire threatening" narrative
- Emerald CTAs "pop" against dark
- Transitions naturally to "light = solution"

**Animation Budget**: 1 (BlurText only)

---

### Section 2: CRISIS
**Message**: "The problem is real - 240M PCs threatened"

**Layout**:
- Gray-50 background
- 4-column stat grid on desktop, 2x2 on mobile
- Clean stat cards with colored accents

**Components**:
- `CountUp` for 4 statistics:
  - 240M PCs threatened (red)
  - 68% French gov on Windows 10 (orange)
  - €800 cost per new PC (red)
  - €0 cost for Linux (green)

**Animation Budget**: 1 (CountUp triggered on scroll)

---

### Section 3: CHOICE
**Message**: "What would YOUR school do?"

**Layout**:
- White background
- Slider for school size (10-500 PCs)
- 3 choice cards in row

**Components**:
- Range slider with live preview
- 3 cards: Pay (red), Resist (green, recommended), Ignore (gray)
- Cost calculation display
- `ClickSpark` on card selection (subtle feedback)

**Animation Budget**: 1 (ClickSpark on interaction only)

---

### Section 4: MINI-GAME (Adaptive)
**Message**: "Saving a PC is simple - try it yourself"

**Layout**:
- Gray-50 background
- Game container with border
- Instructions above, results below

**Responsive Game Strategy**:
```
Desktop (≥768px): Full RefurbishGame with physics drag-and-drop
Mobile (<768px):  Simple click-based version (lighter weight)
```

**Components - Desktop**:
- `RefurbishGame` (existing component)
  - Physics-based drag Linux USB to PC
  - Real-time savings calculation
  - Satisfying success animation

**Components - Mobile**:
- Simplified click game
  - Tap to "install Linux"
  - Progress bar animation
  - Same result display

**Why Both**:
- Desktop: Full impressive experience for judges
- Mobile: Performance-friendly, still interactive
- Both teach the same concept

**Animation Budget**: Built into game component

---

### Section 5: PILLARS (Research-Backed Design)
**Message**: "NIRD = Inclusive, Responsible, Sustainable"

**Layout**:
- Light background (#f4f4f9)
- TrueFocus headline at top
- 3-column card grid (all visible)

**Display Strategy** (Based on UX Research):
```
1. On scroll into view: TrueFocus auto-cycles ONCE through all 3 words
2. After cycle completes: Stops on first word
3. User can hover/click to manually explore each pillar
4. All 3 cards are always visible (scannable for judges)
```

**Components**:
- `TrueFocus` with modifications:
  - `cycleOnce={true}` - Don't loop infinitely
  - `pauseBetweenAnimations={3}` - 3 seconds per word
  - `blurAmount={3}` - Subtle blur (not too dramatic)
- 3 cards synchronized with TrueFocus:
  - Active card: full opacity, subtle scale
  - Inactive cards: slightly dimmed
  - Hover on any card activates it

**Why This Approach**:
- Research shows auto-carousels have 1% click rate
- Cycle once creates "wow", then gives control
- All content visible = judges don't miss anything
- Respects accessibility (no infinite motion)

**Animation Budget**: 1 (TrueFocus cycle once)

---

### Section 6: JOIN
**Message**: "Join the village, download Linux"

**Layout**:
- Emerald green background (#00997d)
- Centered content
- Two CTA buttons

**Components**:
- Large penguin emoji
- Main headline "Rejoignez le Village"
- `Magnet` + `ShatterButton` for primary CTA (memorable ending)
- Secondary text link for Linux download

**Animation Budget**: 1 (ShatterButton on click)

---

## Component Usage Summary

| Component | Section | Purpose | Usage |
|-----------|---------|---------|-------|
| `BlurText` | Hero | Title reveal | 1x |
| `CountUp` | Crisis | Animate stats | 4x |
| `ClickSpark` | Choice | Selection feedback | 1 wrapper |
| `RefurbishGame` | Game | Interactive learning | 1x |
| `TrueFocus` | Pillars | Highlight values | 1x |
| `ShatterButton` | Join | Memorable CTA | 1x |
| `Magnet` | Join | Button attraction | 1x |
| `motion` | All | Subtle entrances | fade + y |

---

## Components NOT Used (on purpose)

- `Particles` - Too heavy, distracting
- `EtheralShadow` - Inconsistent with clean theme
- `RetroGrid` - Wrong aesthetic
- `SpaceBackground` - Not relevant
- `NeonOrbs` - Too flashy
- `WaterRippleImage` - Overkill for clean design
- `FallingText` - Physics too chaotic
- `Shuffle` - Distracting text effect

---

## Component Modification: TrueFocus

Need to add `cycleOnce` prop to `/src/components/TrueFocus.tsx`:

```typescript
// New prop
cycleOnce?: boolean;

// Behavior:
// - If true: cycle through all words once, then stop
// - Default false: current infinite loop behavior
```

This respects accessibility while still creating the "wow" moment.

---

## File Changes

### Primary File
`/src/app/page.tsx` - Complete rewrite

### Sections to Create
1. `Navigation()` - Fixed header (keep existing)
2. `HeroSection()` - Rewrite with BlurText
3. `CrisisSection()` - New section with CountUp
4. `ChoiceSection()` - Keep existing, add ClickSpark
5. `GameSection()` - Keep existing RefurbishGame
6. `PillarsSection()` - Rewrite with TrueFocus
7. `JoinSection()` - Rewrite with ShatterButton
8. `Footer()` - Keep existing

---

## Implementation Order

1. Start with Hero (BlurText integration)
2. Add Crisis section (CountUp stats)
3. Enhance Choice section (ClickSpark)
4. Keep Game section (already good)
5. Update Pillars (TrueFocus)
6. Update Join (ShatterButton + Magnet)
7. Final review for consistency

---

## Success Criteria

- [ ] Each section has ONE clear message
- [ ] Maximum 1 animation type per section
- [ ] Consistent color palette throughout
- [ ] Smooth transitions between sections
- [ ] Game explains the concept interactively
- [ ] Final CTA is memorable
- [ ] Page feels professional, not chaotic
- [ ] No competing animations
