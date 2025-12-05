# Village NIRD - Implementation Plan

> **Competition:** La Nuit de l'Info 2025
> **Duration:** ~12 hours (sunset to sunrise)
> **Strategy:** Coherent Excellence - High-end experience with Green IT compliance

---

## Executive Summary

This plan merges insights from the PRD and Strategic Analysis PDF to deliver a winning entry that:
1. **Respects the Subject** - Deep NIRD integration, not surface-level
2. **Solves the Paradox** - 3D experience + EcoIndex Grade A via demand rendering
3. **Engages Partners** - Specific features for competition challenges
4. **Stands Out Visually** - Emerald theme (Juliette Taka) differentiates from generic designs

---

## Phase Overview

| Phase | Time | Focus | Key Deliverables |
|-------|------|-------|------------------|
| **1. Core Sections** | 0-3h | MVP Scrollytelling | Hero, Crisis, Pillars, Join |
| **2. Choice Mechanic** | 3-5h | WOW Feature | Choice section, Consequences, Calculator |
| **3. Animation Polish** | 5-7h | Premium Feel | Scroll animations, text reveals, counters |
| **4. Gamification** | 7-9h | Stretch Goals | Refurbish mini-game, Chatbot |
| **5. Green IT Audit** | 9-10h | Compliance | EcoIndex, Lighthouse, Low Carbon Mode |
| **6. Final Polish** | 10-12h | Deploy & Test | Mobile, cross-browser, bug fixes |

---

## Phase 1: Core Sections (Hours 0-3)

### 1.1 Hero Section Enhancement
**Current:** Basic hero with Framer Motion
**Target:** Dramatic entry with Emerald theme

**Tasks:**
- [ ] Update color scheme to Emerald palette
- [ ] Add `BlurText` or `SplitText` for title reveal
- [ ] Implement `NeonOrbs` or `Particles` background
- [ ] Replace emoji with Lucide icons
- [ ] Add scroll indicator animation

**Components to Use:**
- `BlurText` - Staggered title reveal
- `Particles` - Magic potion sparkles (#F9A825 gold)
- `ShatterButton` - "Découvrir le Village" CTA

### 1.2 Crisis Section Enhancement
**Current:** Basic stat cards with Framer Motion
**Target:** Impactful statistics with animated counters

**Tasks:**
- [ ] Implement `CountUp` for numbers (240M, 68%, €0)
- [ ] Add danger/success color coding
- [ ] Add source footnotes for credibility
- [ ] Improve card styling with `PixelCard` or shadows

**Components to Use:**
- `CountUp` - Animated number counters
- `PixelCard` - Interactive stat containers

### 1.3 Pillars Section Enhancement
**Current:** Basic cards with emojis
**Target:** Interactive huts with expandable details

**Tasks:**
- [ ] Replace emojis with Lucide icons (Users, Shield, Leaf)
- [ ] Add `TrueFocus` to highlight each pillar
- [ ] Create expandable detail panels
- [ ] Add NIRD-specific content (132 PCs, 11 schools)

**Components to Use:**
- `TrueFocus` - Highlight "Inclusif Responsable Durable"
- `GlareHover` - Premium card effect

### 1.4 Join Section Enhancement
**Current:** Basic CTAs
**Target:** Compelling finale with animated buttons

**Tasks:**
- [ ] Add `ShatterButton` for primary CTA
- [ ] Implement `Magnet` effect on buttons
- [ ] Add success celebration animation
- [ ] Link to official NIRD resources

---

## Phase 2: Choice Mechanic (Hours 3-5)

> **This is THE WOW feature** - Personal investment through consequences

### 2.1 Choice Section (NEW)
**Tasks:**
- [ ] Create `ChoiceSection.tsx` component
- [ ] Implement 3 choice cards (A: Pay, B: Linux, C: Nothing)
- [ ] Store selection in Zustand (`choiceStore.ts`)
- [ ] Animate card selection (expand selected, fade others)
- [ ] Auto-scroll to consequences

**Data Structure:**
```typescript
const choices = [
  {
    id: 'A',
    title: 'Payer pour rester',
    description: 'ESU + nouveaux ordinateurs',
    icon: CreditCard,
    color: 'roman-red',
    consequences: { year1: 500, year3: 1500, year5: 3000 }
  },
  {
    id: 'B',
    title: 'Rejoindre le Village',
    description: 'Linux + logiciels libres',
    icon: TreeDeciduous,
    color: 'emerald-green',
    consequences: { year1: 0, year3: 0, year5: 0 }
  },
  {
    id: 'C',
    title: 'Ne rien faire',
    description: 'Ignorer le problème',
    icon: AlertTriangle,
    color: 'orange',
    consequences: { year1: 0, year3: 800, year5: 2400 }
  }
]
```

### 2.2 Consequences Section (NEW)
**Tasks:**
- [ ] Create `ConsequencesSection.tsx` component
- [ ] Conditional rendering based on choice
- [ ] Cost breakdown visualization (Year 1, 3, 5)
- [ ] "Reconsider" button to go back

**Display Logic:**
- Choice A: Show costs, lock-in warnings
- Choice B: Show savings, freedom benefits
- Choice C: Show risks, eventual higher costs

### 2.3 Cost Calculator (NEW)
**Tasks:**
- [ ] Create `CostCalculator.tsx` component
- [ ] School size slider (50-500 PCs)
- [ ] Real-time savings calculation
- [ ] 5-year TCO comparison chart

---

## Phase 3: Animation Polish (Hours 5-7)

### 3.1 Scroll Animations
**Tasks:**
- [ ] Add `ScrollReveal` to all text sections
- [ ] Implement stagger animations on lists
- [ ] Add parallax to hero background
- [ ] Smooth section transitions

### 3.2 Text Effects
**Tasks:**
- [ ] `Shuffle` effect: "Windows" → "Linux"
- [ ] `FallingText` for crisis impact
- [ ] `TextType` for terminal-style reveals

### 3.3 Micro-interactions
**Tasks:**
- [ ] `ClickSpark` for global click feedback
- [ ] Button hover effects (lift + shadow)
- [ ] Card hover states

---

## Phase 4: Gamification (Hours 7-9)

> **Stretch Goals** - Implement if ahead of schedule

### 4.1 "Refurbish & Liberate" Mini-Game
**Priority:** High
**Complexity:** Medium

**Tasks:**
- [ ] Create draggable PC component
- [ ] Implement diagnosis step (click to inspect)
- [ ] Add USB key drag-and-drop
- [ ] Show Linux boot animation
- [ ] Award "Resistance Credits"

### 4.2 "Chat'bruti vs Resistance Bot"
**Priority:** Medium
**Complexity:** Low

**Tasks:**
- [ ] Create chatbot UI component
- [ ] Implement Big Tech Salesbot responses
- [ ] Add Resistance Bot interruptions
- [ ] Create debate victory condition
- [ ] Glitch animation on defeat

---

## Phase 5: Green IT Audit (Hours 9-10)

### 5.1 Performance Optimization
**Tasks:**
- [ ] Run EcoIndex.fr audit
- [ ] Check page weight (target < 1MB)
- [ ] Minimize DOM elements (target < 1000)
- [ ] Reduce HTTP requests (target < 25)

### 5.2 3D Optimization (if implemented)
**Tasks:**
- [ ] Set `<Canvas frameloop="demand">`
- [ ] Apply Draco compression to GLB files
- [ ] Bake lighting into textures
- [ ] Lazy load 3D components

### 5.3 "Low Carbon Mode" Toggle
**Tasks:**
- [ ] Create toggle in header/footer
- [ ] Disable heavy animations when active
- [ ] Replace 3D with static SVGs
- [ ] Show "CO2 saved" metric

### 5.4 Asset Optimization
**Tasks:**
- [ ] Convert images to AVIF/WebP
- [ ] Subset fonts to used characters
- [ ] Enable Vercel image optimization
- [ ] Set cache headers

---

## Phase 6: Final Polish (Hours 10-12)

### 6.1 Mobile Responsiveness
**Tasks:**
- [ ] Test all sections on mobile viewport
- [ ] Adjust choice cards for touch
- [ ] Ensure buttons are tap-friendly
- [ ] Test scroll animations on mobile

### 6.2 Cross-Browser Testing
**Tasks:**
- [ ] Chrome (primary)
- [ ] Firefox
- [ ] Safari (mobile)
- [ ] Edge

### 6.3 Accessibility
**Tasks:**
- [ ] Keyboard navigation
- [ ] ARIA labels on interactive elements
- [ ] Color contrast check
- [ ] `prefers-reduced-motion` support

### 6.4 Final Deployment
**Tasks:**
- [ ] Push to Vercel
- [ ] Verify live URL works
- [ ] Run final Lighthouse audit
- [ ] Check for console errors

---

## Component Mapping

| Section | Primary Component | Background | Animation |
|---------|-------------------|------------|-----------|
| Hero | `BlurText` | `Particles` | Staggered fade-in |
| Crisis | `CountUp` | `Squares` | Count up on scroll |
| Choice | `PixelCard` | None | Selection expand |
| Consequences | `BentoGrid` | None | Slide in |
| Pillars | `TrueFocus` | `Waves` | Focus one-by-one |
| Success | `TestimonialSlider` | None | Carousel |
| Join | `ShatterButton` | `NeonOrbs` | Shatter on click |

---

## Risk Mitigation

| Hour | Checkpoint | Fallback |
|------|------------|----------|
| 2 | Core sections working? | Simplify to 4 sections only |
| 4 | Choice mechanic working? | Make it static display |
| 6 | Animations started? | Ship without animations |
| 8 | Mobile tested? | Add viewport meta only |
| 10 | Deployed? | Debug immediately |

---

## Files to Create/Modify

### New Files:
```
src/components/sections/ChoiceSection.tsx
src/components/sections/ConsequencesSection.tsx
src/components/interactive/CostCalculator.tsx
src/components/games/RefurbishGame.tsx (stretch)
src/components/games/ChatBot.tsx (stretch)
```

### Files to Modify:
```
src/app/page.tsx - Integrate all sections
src/app/globals.css - Emerald theme colors
src/store/choiceStore.ts - Add calculator state
src/data/choices.ts - Full choice data
```

---

## Success Criteria

| Criterion | Target | How to Verify |
|-----------|--------|---------------|
| First Impression | < 3s to understand | Watch first-time user |
| WOW Factor | 1 memorable feature | Choice → Consequences |
| Mobile Works | No major breaks | Test on phone |
| No Crashes | Zero errors | Console check |
| Green IT | EcoIndex B+ | Run audit |
| Theme Alignment | Clear Asterix vibe | Visual review |

---

## Competitive Advantages

1. **Emerald Theme** - Visual cohesion with actual Linux NIRD OS
2. **Choice Mechanic** - Personal investment, not passive viewing
3. **Green IT Compliance** - On-demand 3D rendering
4. **NIRD Journey Alignment** - Maps to official "La Démarche" stages
5. **Gamification** - Interactive learning, not just information

---

*Plan created: December 4, 2025*
*Based on: PRD.md v1.1 + Strategic Analysis PDF*
