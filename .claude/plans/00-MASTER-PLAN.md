# Village NIRD - Master Implementation Plan

> **Competition:** La Nuit de l'Info 2025
> **Theme:** "Le Village Numérique Résistant" - Asterix vs Big Tech
> **Goal:** Create an immersive, premium web experience that wins

---

## Quick Links to Section Plans

| Phase | Plan File | Time Est. | Priority |
|-------|-----------|-----------|----------|
| 1 | [Hero Section](./sections/01-hero-section-premium.md) | 45-60 min | **P0 - CRITICAL** |
| 2 | [Crisis Section](./sections/02-crisis-section-premium.md) | 30-45 min | **P0 - CRITICAL** |
| 3 | [Choice Section](./sections/03-choice-section-premium.md) | 60-90 min | **P0 - THE WOW** |
| 4 | [Consequences Section](./sections/04-consequences-section-premium.md) | 45-60 min | P1 |
| 5 | [Pillars Section](./sections/05-pillars-section-premium.md) | 30-45 min | P1 |
| 6-7 | [Success + Join Sections](./sections/06-success-join-sections-premium.md) | 45-60 min | P2 |

---

## Parallel Execution Strategy

### Team Allocation (If 2-3 developers)

**Developer A:** Sections 1 + 3 (Hero + Choice - THE WOW)
**Developer B:** Sections 2 + 4 (Crisis + Consequences)
**Developer C:** Sections 5 + 6-7 (Pillars + Success/Join)

### If Solo Developer - Priority Order

1. **Phase 1: Hero** - First impression is everything
2. **Phase 3: Choice** - THE WOW feature that differentiates
3. **Phase 2: Crisis** - Sets up the problem dramatically
4. **Phase 5: Pillars** - NIRD core message
5. **Phase 7: Join** - CTA finale
6. **Phase 4: Consequences** - Adds depth to choice
7. **Phase 6: Success** - Social proof

---

## Component Import Reference

```tsx
// Hero + Global
import BlurText from '@/components/BlurText';
import Particles from '@/components/Particles';
import { Component as ShatterButton } from '@/components/ui/shatter-button';
import AuroraCanvas from '@/components/ui/ambient-aurora';
import { Component as EtheralShadow } from '@/components/ui/etheral-shadow';

// Crisis
import CountUp from '@/components/CountUp';
import Squares from '@/components/Squares';
import { CometCard } from '@/components/ui/CometCard';
import { GlowCard } from '@/components/ui/spotlight-card';

// Choice
import TrueFocus from '@/components/TrueFocus';
import PixelCard from '@/components/PixelCard';
import Shuffle from '@/components/Shuffle';
import ClickSpark from '@/components/ClickSpark';

// Pillars
import GlareHover from '@/components/GlareHover';
import Waves from '@/components/Waves';

// Success
import { TestimonialSlider } from '@/components/TestimonialSlider';
import LogoLoop from '@/components/LogoLoop';
import Stack from '@/components/Stack';

// Join
import Magnet from '@/components/Magnet';

// Data
import { crisisStatistics } from '@/data/statistics';
import { pillars } from '@/data/pillars';
import { choices, calculateSavings } from '@/data/choices';

// Store
import { useChoiceStore } from '@/store/choiceStore';
```

---

## NIRD Color Palette

```tsx
const COLORS = {
  // Village (Positive)
  emeraldGreen: '#00997d',   // Primary buttons, success
  forestGreen: '#2E7D32',    // Secondary
  gold: '#F9A825',           // Magic potion, accents
  parchment: '#FFF8E1',      // Light backgrounds

  // Empire (Negative)
  romanRed: '#C62828',       // Big Tech, danger
  warning: '#ff8c00',        // Alerts
  darkBlue: '#1A237E',       // Corporate

  // Neutral
  steelGray: '#455A64',      // Inaction
  background: '#0a0a0f',     // Dark mode base
};
```

---

## Key Features Summary

| Section | WOW Feature | Component |
|---------|-------------|-----------|
| Hero | Magic sparkles + word reveal | Particles + BlurText + AuroraCanvas |
| Crisis | Dramatic stat counters | CountUp + CometCard + GlowCard |
| Choice | Interactive A/B/C + Windows→Linux transform | ClickSpark + Shuffle |
| Consequences | Dynamic celebration vs warning | Particles + conditional rendering |
| Pillars | Focus cycling + 3D cards | TrueFocus + CometCard |
| Success | Testimonial carousel + metrics | TestimonialSlider + CountUp |
| Join | Magnetic exploding buttons | Magnet + ShatterButton |

---

## Minimum Viable Product (MVP)

If time is extremely limited, ship ONLY:

1. ✅ Hero with Particles + BlurText + ShatterButton
2. ✅ Crisis with CountUp stats
3. ✅ Basic Choice cards (without calculator)
4. ✅ Join with ShatterButton

**This takes ~2 hours and creates immediate visual impact.**

---

## Success Criteria

- [ ] First 3 seconds create visual WOW
- [ ] Particles create "magic potion" atmosphere
- [ ] Statistics animate dramatically
- [ ] Choice mechanic stores user selection
- [ ] Consequences show different results per choice
- [ ] NIRD pillars highlighted with TrueFocus
- [ ] Testimonials add social proof
- [ ] CTAs link to official NIRD site
- [ ] Mobile responsive
- [ ] No console errors

---

## File Structure After Implementation

```
src/app/page.tsx                  # Main page with all sections
src/components/sections/          # Extracted section components (Phase 8)
  ├── HeroSection.tsx
  ├── CrisisSection.tsx
  ├── ChoiceSection.tsx
  ├── ConsequencesSection.tsx
  ├── PillarsSection.tsx
  ├── SuccessSection.tsx
  └── JoinSection.tsx
```

---

## Competition Reminder

> "Judges have ~3 minutes per project. First impression is EVERYTHING."

**DO:**
- Immediate visual impact
- ONE perfect WOW feature (Choice mechanic)
- Tell a story (Empire vs Village)
- Working demo

**DON'T:**
- 10 mediocre features
- Walls of text
- "It will work soon"
- Boring corporate feel

---

## Placeholder Images (Demo Mode)

Until final assets are provided, use these free image sources:

### Image Sources

| Type | Source | Example URL |
|------|--------|-------------|
| **Unsplash** | Free high-quality photos | `https://images.unsplash.com/photo-ID?w=800` |
| **Picsum** | Random placeholder photos | `https://picsum.photos/800/600` |
| **DiceBear** | Avatar generators | `https://api.dicebear.com/7.x/avataaars/svg?seed=NAME` |
| **Placeholder.co** | Solid color placeholders | `https://placehold.co/400x300/00997d/white` |

### Recommended Images by Section

```tsx
const PLACEHOLDER_IMAGES = {
  hero: {
    background: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920', // Tech abstract
    village: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', // Forest/nature
  },
  crisis: {
    microsoft: 'https://placehold.co/200x200/1A237E/white?text=MS',
    warning: 'https://images.unsplash.com/photo-1555861496-0666c8981751?w=600', // Warning/alert
  },
  testimonials: {
    avatar1: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pascal',
    avatar2: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher',
    avatar3: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BackMarket',
  },
  logos: {
    linux: 'https://cdn.simpleicons.org/linux/FCC624',
    libreoffice: 'https://cdn.simpleicons.org/libreoffice/18A303',
    firefox: 'https://cdn.simpleicons.org/firefox/FF7139',
    gimp: 'https://cdn.simpleicons.org/gimp/5C5543',
  },
  schools: {
    school1: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400', // School
    school2: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', // Classroom
    classroom: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600', // Students
  },
  pillars: {
    inclusive: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', // Team
    responsible: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400', // Privacy
    durable: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400', // Green tech
  },
};
```

### Download Script (Optional)

```bash
# Create public/images directories
mkdir -p public/images/{hero,crisis,testimonials,logos,schools,pillars}

# Download with curl (example)
curl -o public/images/hero/bg.jpg "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920"
```

---

## Variant Themes

| Variant | Plan File | Theme |
|---------|-----------|-------|
| A | [Cosmic Journey](./variants/VARIANT-A-COSMIC-JOURNEY.md) | Space exploration, starfields |
| B | [Arcade Game](./variants/VARIANT-B-ARCADE-GAME.md) | Retro 8-bit, pixel art |
| C | [Magic Potion](./variants/VARIANT-C-MAGIC-POTION.md) | Mystical forest, Asterix faithful |

**Recommendation:** Variant C (Magic Potion) is most faithful to the Asterix theme.

---

*Last updated: December 4, 2025*
