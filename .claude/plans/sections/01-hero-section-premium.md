# Phase 1: Hero Section - Premium Implementation

## Goal
Create an immersive, cinematic hero that captures judges in < 3 seconds with "magic potion" atmosphere.

## Time Estimate: 45-60 minutes

---

## Components to Use

| Component | Purpose | File |
|-----------|---------|------|
| `Particles` | 3D WebGL sparkles | `@/components/Particles` |
| `BlurText` | Word-by-word reveal | `@/components/BlurText` |
| `ShatterButton` | Explosive CTA | `@/components/ui/shatter-button` |
| `AuroraCanvas` | Animated aurora background | `@/components/ui/ambient-aurora` |
| `EtheralShadow` | Mystical flowing shadows | `@/components/ui/etheral-shadow` |

---

## Implementation Steps

### Step 1: Background Layers (15 min)
```tsx
<section className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
  {/* Layer 1: Aurora Canvas - mystical base */}
  <div className="absolute inset-0 z-0 opacity-40">
    <AuroraCanvas />
  </div>

  {/* Layer 2: Ethereal Shadow - flowing magic */}
  <div className="absolute inset-0 z-[1]">
    <EtheralShadow
      color="rgba(0, 153, 125, 0.6)"
      animation={{ scale: 40, speed: 20 }}
      noise={{ opacity: 0.15, scale: 1 }}
    />
  </div>

  {/* Layer 3: Particles - magic sparkles */}
  <div className="absolute inset-0 z-[2]">
    <Particles
      particleCount={200}
      particleSpread={20}
      speed={0.06}
      particleColors={['#00997d', '#F9A825', '#2E7D32', '#FFF8E1']}
      moveParticlesOnHover={true}
      alphaParticles={true}
      particleBaseSize={100}
    />
  </div>
</section>
```

### Step 2: Text Content with BlurText (20 min)
```tsx
<div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
  {/* Intro line */}
  <BlurText
    text="Nous sommes en 2025..."
    className="text-xl text-[#F9A825] font-medium tracking-widest uppercase"
    delay={100}
    animateBy="words"
  />

  {/* Main headline - staggered */}
  <div className="mt-6 space-y-4">
    <BlurText
      text="Toutes les écoles françaises"
      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
      delay={80}
      animateBy="words"
    />
    <BlurText
      text="sont occupées par"
      className="text-3xl md:text-5xl font-bold text-white/70"
      delay={100}
      animateBy="words"
    />
    <BlurText
      text="BIG TECH..."
      className="text-5xl md:text-7xl lg:text-8xl font-black text-[#C62828]
                 drop-shadow-[0_0_60px_rgba(198,40,40,0.8)]"
      delay={120}
      animateBy="letters"
    />
  </div>

  {/* The twist - with spring animation */}
  <motion.h2
    initial={{ opacity: 0, scale: 0.5, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: 2.5, type: 'spring', stiffness: 100 }}
    className="mt-12 text-4xl md:text-6xl font-black text-[#00997d]
               drop-shadow-[0_0_80px_rgba(0,153,125,0.9)]"
  >
    Toutes ? NON !
  </motion.h2>

  {/* Subtitle */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 3 }}
    className="mt-8"
  >
    <BlurText
      text="Un village d'irréductibles enseignants et élèves résiste encore..."
      className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
      delay={40}
      animateBy="words"
    />
  </motion.div>
</div>
```

### Step 3: CTA with ShatterButton (10 min)
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 4, duration: 0.8 }}
  className="mt-16"
>
  <ShatterButton
    shatterColor="#00997d"
    shardCount={30}
    onClick={() => document.getElementById('crisis')?.scrollIntoView({ behavior: 'smooth' })}
    className="text-xl font-bold px-10 py-5"
  >
    ⚔️ Entrer dans le Village
  </ShatterButton>
</motion.div>
```

### Step 4: Scroll Indicator (5 min)
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 5 }}
  className="absolute bottom-10 left-1/2 -translate-x-1/2"
>
  <motion.div
    animate={{ y: [0, 15, 0] }}
    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
  >
    <ChevronDown className="w-10 h-10 text-[#F9A825]" />
  </motion.div>
</motion.div>
```

---

## Color Palette

```tsx
const HERO_COLORS = {
  background: '#0a0a0f',
  particles: ['#00997d', '#F9A825', '#2E7D32', '#FFF8E1'],
  etherealShadow: 'rgba(0, 153, 125, 0.6)',
  introText: '#F9A825',
  mainText: '#FFFFFF',
  bigTech: '#C62828',
  village: '#00997d',
};
```

---

## Files to Create/Modify

- `src/app/page.tsx` - Update HeroSection function

---

## Testing Checklist

- [ ] Particles animate smoothly (60fps)
- [ ] BlurText reveals in correct order
- [ ] ShatterButton explodes on click
- [ ] Mobile responsive (stack text vertically)
- [ ] Aurora/Ethereal effects visible
- [ ] Scroll indicator works
- [ ] No console errors
