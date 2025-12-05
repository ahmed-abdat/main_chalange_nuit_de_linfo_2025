# Phase 2: Crisis Section - Premium Implementation

## Goal
Create dramatic urgency with animated statistics, visual danger indicators, and immersive 3D cards.

## Time Estimate: 30-45 minutes

---

## Components to Use

| Component | Purpose | File |
|-----------|---------|------|
| `CountUp` | Animated number counters | `@/components/CountUp` |
| `Squares` | Digital grid background | `@/components/Squares` |
| `CometCard` | 3D tilting stat cards | `@/components/ui/CometCard` |
| `GlowCard` | Mouse-following glow | `@/components/ui/spotlight-card` |
| `BlurText` | Section title reveal | `@/components/BlurText` |

---

## Implementation Steps

### Step 1: Section Container with Background (10 min)
```tsx
function CrisisSection() {
  return (
    <section id="crisis" className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#0d0d0f] via-[#1a1a2e] to-[#16213e]">
      {/* Animated grid background - digital empire feel */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Squares
          direction="diagonal"
          speed={0.4}
          borderColor="#C62828"
          hoverFillColor="rgba(198, 40, 40, 0.1)"
          squareSize={60}
        />
      </div>

      {/* Red vignette for danger atmosphere */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#C62828]/20 z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Content here */}
      </div>
    </section>
  );
}
```

### Step 2: Section Header with Alert Badge (10 min)
```tsx
<div className="text-center mb-20">
  {/* Danger badge - pulsing */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="inline-block mb-6"
  >
    <span className="px-6 py-3 bg-[#C62828] text-white font-bold text-sm rounded-full
                     shadow-[0_0_30px_rgba(198,40,40,0.6)] animate-pulse">
      ⚠️ ALERTE : 14 OCTOBRE 2025
    </span>
  </motion.div>

  {/* Title */}
  <BlurText
    text="La Crise du Numérique"
    className="text-4xl md:text-6xl font-bold text-white mb-6"
    delay={80}
    animateBy="words"
  />

  {/* Subtitle */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-xl text-gray-300 max-w-3xl mx-auto"
  >
    Microsoft met fin au support <span className="text-[#C62828] font-bold">GRATUIT</span> de Windows 10.
    Des millions d'ordinateurs deviennent vulnérables.
  </motion.p>
</div>
```

### Step 3: Stats Grid with CometCard + CountUp (15 min)
```tsx
const stats = [
  {
    value: 240,
    suffix: 'M',
    label: 'PCs menacés',
    description: 'Ordinateurs à jeter dans le monde',
    color: '#C62828',
    glowColor: 'red',
    icon: '💻'
  },
  {
    value: 68,
    suffix: '%',
    label: 'Admin française',
    description: 'Encore sous Windows 10',
    color: '#ff8c00',
    glowColor: 'orange',
    icon: '🏛️'
  },
  {
    value: 800,
    prefix: '€',
    label: 'Coût/nouveau PC',
    description: 'Budget impossible pour les écoles',
    color: '#C62828',
    glowColor: 'red',
    icon: '💸'
  },
  {
    value: 0,
    prefix: '€',
    label: 'Coût Linux',
    description: 'Gratuit, libre, et durable',
    color: '#00997d',
    glowColor: 'green',
    icon: '🐧'
  },
];

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {stats.map((stat, index) => (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
    >
      <CometCard rotateDepth={12} translateDepth={15}>
        <GlowCard
          glowColor={stat.glowColor as 'red' | 'green' | 'orange'}
          customSize
          className="p-8 h-full bg-[#1a1a2e]/80 backdrop-blur-md"
        >
          <div className="text-center">
            <span className="text-5xl mb-4 block">{stat.icon}</span>
            <div className="flex items-baseline justify-center gap-1">
              {stat.prefix && (
                <span className="text-2xl font-bold" style={{ color: stat.color }}>
                  {stat.prefix}
                </span>
              )}
              <CountUp
                to={stat.value}
                duration={2.5}
                delay={index * 0.2}
                className="text-5xl md:text-6xl font-black"
                style={{ color: stat.color }}
              />
              {stat.suffix && (
                <span className="text-2xl font-bold" style={{ color: stat.color }}>
                  {stat.suffix}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-white mt-4">{stat.label}</h3>
            <p className="text-gray-400 text-sm mt-2">{stat.description}</p>
          </div>
        </GlowCard>
      </CometCard>
    </motion.div>
  ))}
</div>
```

### Step 4: Bottom CTA to continue (5 min)
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="mt-20 text-center"
>
  <p className="text-2xl text-white mb-8">
    Mais <span className="text-[#00997d] font-bold">une solution existe</span>...
  </p>
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    <ChevronDown className="w-12 h-12 text-[#00997d] mx-auto" />
  </motion.div>
</motion.div>
```

---

## Data Integration

```tsx
// Use from @/data/statistics
import { crisisStatistics } from '@/data/statistics';

// Map stats with proper types
const formattedStats = crisisStatistics.map(stat => ({
  value: typeof stat.value === 'number' ? stat.value : 0,
  suffix: stat.suffix,
  prefix: stat.prefix,
  label: stat.label,
  description: stat.description,
  color: stat.type === 'danger' ? '#C62828' : stat.type === 'success' ? '#00997d' : '#ff8c00',
  glowColor: stat.type === 'danger' ? 'red' : stat.type === 'success' ? 'green' : 'orange',
}));
```

---

## Color Palette

```tsx
const CRISIS_COLORS = {
  background: ['#0d0d0f', '#1a1a2e', '#16213e'],
  danger: '#C62828',
  warning: '#ff8c00',
  solution: '#00997d',
  gridBorder: '#C62828',
  text: '#FFFFFF',
  subtext: '#9CA3AF',
};
```

---

## Files to Create/Modify

- `src/app/page.tsx` - Update CrisisSection function
- `src/data/statistics.ts` - Already has the data

---

## Testing Checklist

- [ ] CountUp animates on scroll into view
- [ ] CometCard tilts on hover
- [ ] GlowCard follows mouse
- [ ] Squares background animates
- [ ] Stats colors match danger/success
- [ ] Mobile responsive (stack cards)
- [ ] No console errors
