# Phase 3: Choice Section - THE WOW FEATURE

## Goal
Create an interactive A/B/C choice that makes users personally invested in the NIRD message. This is the main differentiator.

## Time Estimate: 60-90 minutes

---

## Components to Use

| Component | Purpose | File |
|-----------|---------|------|
| `CometCard` | 3D choice cards | `@/components/ui/CometCard` |
| `PixelCard` | Pixel shimmer effect | `@/components/PixelCard` |
| `Shuffle` | Windows→Linux transform | `@/components/Shuffle` |
| `ClickSpark` | Selection feedback | `@/components/ClickSpark` |
| `CountUp` | Cost animation | `@/components/CountUp` |
| `BlurText` | Title reveal | `@/components/BlurText` |
| `TrueFocus` | Highlight key words | `@/components/TrueFocus` |

---

## Section Structure

```
ChoiceSection
├── Header "Que choisissez-vous pour votre école?"
├── School Size Calculator (slider)
├── 3 Choice Cards Row
│   ├── Choice A: Empire (red) - Pay Microsoft
│   ├── Choice B: Village (green) - JOIN NIRD [HERO]
│   └── Choice C: Inaction (gray) - Do Nothing
└── Selected choice preview with costs
```

---

## Implementation Steps

### Step 1: Section Container (10 min)
```tsx
function ChoiceSection() {
  const { userChoice, setUserChoice, calculatorInputs, setCalculatorInputs } = useChoiceStore();
  const [schoolSize, setSchoolSize] = useState(100);

  return (
    <section id="choice" className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#16213e] to-[#1a1a1d]">
      {/* Background particles - subtle */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Particles
          particleCount={80}
          particleSpread={25}
          speed={0.03}
          particleColors={['#00997d', '#C62828', '#455A64']}
          alphaParticles={true}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Content */}
      </div>
    </section>
  );
}
```

### Step 2: Section Header (10 min)
```tsx
<div className="text-center mb-16">
  <BlurText
    text="Votre école face au choix"
    className="text-4xl md:text-6xl font-bold text-white mb-6"
    delay={80}
    animateBy="words"
  />

  <TrueFocus
    sentence="Payer Résister Ignorer"
    blurAmount={4}
    borderColor="#F9A825"
    glowColor="rgba(249, 168, 37, 0.5)"
    animationDuration={0.6}
    pauseBetweenAnimations={2}
  />

  <p className="text-xl text-gray-300 mt-8 max-w-2xl mx-auto">
    Face à la fin de Windows 10, que ferait <span className="text-[#F9A825] font-bold">VOTRE</span> établissement ?
  </p>
</div>
```

### Step 3: School Size Calculator (15 min)
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mb-16 max-w-2xl mx-auto"
>
  <div className="bg-[#1a1a2e]/80 backdrop-blur-md rounded-2xl p-8 border border-white/10">
    <h3 className="text-xl font-bold text-white mb-6 text-center">
      🏫 Combien de postes dans votre établissement ?
    </h3>

    <div className="flex items-center gap-6">
      <input
        type="range"
        min="10"
        max="500"
        value={schoolSize}
        onChange={(e) => setSchoolSize(Number(e.target.value))}
        className="flex-1 h-3 rounded-full appearance-none bg-gray-700
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-6
                   [&::-webkit-slider-thumb]:h-6
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-[#00997d]
                   [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(0,153,125,0.6)]"
      />
      <span className="text-3xl font-bold text-[#F9A825] min-w-[100px] text-center">
        {schoolSize} PCs
      </span>
    </div>

    {/* Quick cost preview */}
    <div className="grid grid-cols-2 gap-4 mt-8">
      <div className="text-center p-4 rounded-lg bg-[#C62828]/20 border border-[#C62828]/30">
        <p className="text-sm text-gray-400">Avec Microsoft</p>
        <p className="text-2xl font-bold text-[#C62828]">
          €{(schoolSize * 800).toLocaleString()}
        </p>
      </div>
      <div className="text-center p-4 rounded-lg bg-[#00997d]/20 border border-[#00997d]/30">
        <p className="text-sm text-gray-400">Avec Linux</p>
        <p className="text-2xl font-bold text-[#00997d]">
          €{(schoolSize * 50).toLocaleString()}
        </p>
      </div>
    </div>
  </div>
</motion.div>
```

### Step 4: Choice Cards Grid (30 min)
```tsx
const choices = [
  {
    id: 'A',
    title: "Payer l'Empire",
    subtitle: 'ESU + nouveaux ordinateurs',
    icon: '💸',
    color: '#C62828',
    borderColor: 'border-[#C62828]',
    bgGradient: 'from-[#C62828]/20 to-[#C62828]/5',
    cost: schoolSize * 800,
    pros: ['Compatibilité garantie', 'Support Microsoft'],
    cons: ['Coût exorbitant', 'Dépendance accrue', 'E-waste massif'],
  },
  {
    id: 'B',
    title: 'Rejoindre le Village',
    subtitle: 'Linux + logiciels libres',
    icon: '🏛️',
    color: '#00997d',
    borderColor: 'border-[#00997d]',
    bgGradient: 'from-[#00997d]/20 to-[#00997d]/5',
    cost: schoolSize * 50,
    pros: ['Gratuit', 'Souveraineté', 'Durabilité', 'Liberté'],
    cons: ['Apprentissage initial'],
    recommended: true,
  },
  {
    id: 'C',
    title: 'Ne rien faire',
    subtitle: 'Ignorer le problème',
    icon: '🙈',
    color: '#455A64',
    borderColor: 'border-[#455A64]',
    bgGradient: 'from-[#455A64]/20 to-[#455A64]/5',
    cost: schoolSize * 1200, // Hidden costs + security breaches
    pros: ['Aucun effort immédiat'],
    cons: ['Vulnérabilités', 'Coûts cachés', 'Migration forcée'],
  },
];

<ClickSpark sparkColor="#F9A825" sparkCount={12}>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {choices.map((choice, index) => (
      <motion.div
        key={choice.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
        className={cn(
          "relative",
          choice.recommended && "md:-translate-y-8"
        )}
      >
        {/* Recommended badge */}
        {choice.recommended && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
            <span className="px-4 py-2 bg-[#00997d] text-white font-bold text-sm rounded-full
                           shadow-[0_0_30px_rgba(0,153,125,0.6)]">
              ⭐ RECOMMANDÉ
            </span>
          </div>
        )}

        <CometCard rotateDepth={15} translateDepth={20}>
          <button
            onClick={() => setUserChoice(choice.id as ChoiceId)}
            className={cn(
              "w-full h-full p-8 rounded-2xl text-left transition-all duration-300",
              "bg-gradient-to-b", choice.bgGradient,
              "border-2", choice.borderColor,
              userChoice === choice.id && "ring-4 ring-offset-4 ring-offset-[#1a1a1d]",
              userChoice === choice.id && `ring-[${choice.color}]`,
              choice.recommended && "scale-105"
            )}
          >
            <div className="text-center">
              <span className="text-6xl block mb-4">{choice.icon}</span>
              <h3 className="text-2xl font-bold text-white mb-2">{choice.title}</h3>
              <p className="text-gray-400 mb-6">{choice.subtitle}</p>

              {/* Cost display */}
              <div className="py-4 border-y border-white/10 my-6">
                <p className="text-sm text-gray-400 mb-2">Coût sur 5 ans</p>
                <p className="text-4xl font-black" style={{ color: choice.color }}>
                  €{choice.cost.toLocaleString()}
                </p>
              </div>

              {/* Pros/Cons */}
              <div className="space-y-2 text-left">
                {choice.pros.map(pro => (
                  <p key={pro} className="text-sm text-green-400">✓ {pro}</p>
                ))}
                {choice.cons.map(con => (
                  <p key={con} className="text-sm text-red-400">✗ {con}</p>
                ))}
              </div>

              {/* Shuffle effect for choice B */}
              {choice.id === 'B' && (
                <div className="mt-6">
                  <Shuffle
                    text="WINDOWS → LINUX"
                    shuffleDirection="right"
                    shuffleTimes={3}
                    duration={0.4}
                    triggerOnHover={true}
                    colorFrom="#C62828"
                    colorTo="#00997d"
                  />
                </div>
              )}
            </div>
          </button>
        </CometCard>
      </motion.div>
    ))}
  </div>
</ClickSpark>
```

### Step 5: Choice Result Preview (10 min)
```tsx
{userChoice && (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-16 text-center"
  >
    <p className="text-2xl text-white">
      Vous avez choisi :
      <span className={cn(
        "font-bold ml-2",
        userChoice === 'A' && "text-[#C62828]",
        userChoice === 'B' && "text-[#00997d]",
        userChoice === 'C' && "text-[#455A64]",
      )}>
        {choices.find(c => c.id === userChoice)?.title}
      </span>
    </p>

    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="mt-8"
    >
      <p className="text-gray-400 mb-2">Découvrez les conséquences</p>
      <ChevronDown className="w-8 h-8 text-[#F9A825] mx-auto" />
    </motion.div>
  </motion.div>
)}
```

---

## Store Integration

```tsx
// src/store/choiceStore.ts
import { useChoiceStore } from '@/store/choiceStore';

// In component:
const { userChoice, setUserChoice, calculatorInputs, setCalculatorInputs } = useChoiceStore();
```

---

## Files to Create/Modify

- `src/app/page.tsx` - Add new ChoiceSection function
- `src/store/choiceStore.ts` - Already has the state

---

## Testing Checklist

- [ ] Calculator slider works
- [ ] Cost updates in real-time
- [ ] Choice cards tilt on hover
- [ ] Selection is stored in Zustand
- [ ] Shuffle animation works on Choice B
- [ ] ClickSpark fires on selection
- [ ] Mobile responsive (stack vertically)
- [ ] Recommended card elevated
