# Phase 5: Pillars Section - NIRD 3 Pillars

## Goal
Showcase the three NIRD pillars (Inclusif, Responsable, Durable) with premium interactive cards and focus effects.

## Time Estimate: 30-45 minutes

---

## Components to Use

| Component | Purpose | File |
|-----------|---------|------|
| `TrueFocus` | Sequential word highlight | `@/components/TrueFocus` |
| `ExpandCards` | Hover-to-expand cards | `@/components/ExpandCards` |
| `CometCard` | 3D tilt effect | `@/components/ui/CometCard` |
| `GlareHover` | Premium shine | `@/components/GlareHover` |
| `BlurText` | Title reveal | `@/components/BlurText` |
| `Waves` | Organic background | `@/components/Waves` |

---

## Implementation Steps

### Step 1: Section Container (10 min)
```tsx
function PillarsSection() {
  return (
    <section id="pillars" className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#1a1a1d] to-[#0a1a15]">
      {/* Organic waves background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Waves
          lineColor="#00997d"
          waveSpeedX={0.015}
          waveAmpX={40}
          waveAmpY={20}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Content */}
      </div>
    </section>
  );
}
```

### Step 2: Section Header with TrueFocus (10 min)
```tsx
<div className="text-center mb-20">
  <BlurText
    text="Le Mouvement NIRD"
    className="text-4xl md:text-6xl font-bold text-white mb-8"
    delay={80}
    animateBy="words"
  />

  {/* TrueFocus highlighting each word */}
  <div className="mb-8">
    <TrueFocus
      sentence="Inclusif Responsable Durable"
      blurAmount={5}
      borderColor="#00997d"
      glowColor="rgba(0, 153, 125, 0.6)"
      animationDuration={0.5}
      pauseBetweenAnimations={1.5}
    />
  </div>

  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
    Trois piliers pour une école numérique libre et souveraine
  </p>
</div>
```

### Step 3: Pillar Cards with Premium Effects (20 min)
```tsx
import { pillars } from '@/data/pillars';
import { Users, Shield, Leaf } from 'lucide-react';

const iconMap = {
  users: Users,
  shield: Shield,
  leaf: Leaf,
};

<div className="grid md:grid-cols-3 gap-8">
  {pillars.map((pillar, index) => {
    const IconComponent = iconMap[pillar.iconName as keyof typeof iconMap];

    return (
      <motion.div
        key={pillar.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
      >
        <CometCard rotateDepth={12} translateDepth={15}>
          <GlareHover
            width="100%"
            height="auto"
            glareColor={pillar.color}
            glareOpacity={0.3}
            className="h-full"
          >
            <div
              className="p-8 rounded-2xl h-full border transition-all duration-300"
              style={{
                backgroundColor: `${pillar.color}10`,
                borderColor: `${pillar.color}40`,
              }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${pillar.color}30` }}
              >
                <IconComponent
                  className="w-8 h-8"
                  style={{ color: pillar.color }}
                />
              </div>

              {/* Title */}
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: pillar.color }}
              >
                {pillar.title}
              </h3>

              {/* Subtitle */}
              <p className="text-gray-400 text-sm mb-4">{pillar.subtitle}</p>

              {/* Description */}
              <p className="text-gray-300 mb-6">{pillar.description}</p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4">
                {pillar.stats.slice(0, 2).map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${pillar.color}15` }}
                  >
                    <p
                      className="text-2xl font-bold"
                      style={{ color: pillar.color }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlareHover>
        </CometCard>
      </motion.div>
    );
  })}
</div>
```

### Step 4: Bottom Quote (5 min)
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="mt-20 text-center"
>
  <blockquote className="text-2xl italic text-gray-300 max-w-3xl mx-auto">
    "Le choix de la technologie n'est pas neutre."
  </blockquote>
  <cite className="block mt-4 text-[#00997d]">
    — Collectif enseignant NIRD
  </cite>
</motion.div>
```

---

## Pillar Data Reference

```tsx
// From @/data/pillars.ts
const pillars = [
  {
    id: 'inclusive',
    title: 'Inclusif',
    subtitle: 'La tech pour tous',
    description: 'Les élèves plus âgés reconditionnent des PCs pour les plus jeunes. 132 ordinateurs livrés à 11 écoles.',
    color: '#00997d',
    iconName: 'users',
    stats: [
      { value: '132', label: 'PCs reconditionnés' },
      { value: '11', label: 'Écoles équipées' },
    ],
  },
  {
    id: 'responsible',
    title: 'Responsable',
    subtitle: 'Contrôlez vos données',
    description: 'Utilisez des alternatives open-source. Gardez les données en France/UE. Souveraineté numérique.',
    color: '#1A237E',
    iconName: 'shield',
    stats: [
      { value: '100%', label: 'Données en France' },
      { value: '350+', label: 'Apps libres' },
    ],
  },
  {
    id: 'sustainable',
    title: 'Durable',
    subtitle: 'Matériel qui dure 10+ ans',
    description: 'Linux fonctionne sur les vieux ordinateurs. Un SSD à 30€ transforme un vieux PC en machine rapide.',
    color: '#2E7D32',
    iconName: 'leaf',
    stats: [
      { value: '10+', label: 'Années de vie' },
      { value: '90%', label: "Réduction e-waste" },
    ],
  },
];
```

---

## Files to Create/Modify

- `src/app/page.tsx` - Update PillarsSection function
- `src/data/pillars.ts` - Already has the data

---

## Testing Checklist

- [ ] TrueFocus cycles through words
- [ ] CometCard tilts on hover
- [ ] GlareHover shows shine effect
- [ ] Waves background animates
- [ ] Stats display correctly
- [ ] Mobile responsive (stack cards)
- [ ] Colors match pillar themes
