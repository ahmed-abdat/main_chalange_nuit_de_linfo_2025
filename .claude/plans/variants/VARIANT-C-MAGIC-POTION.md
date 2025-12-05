# VARIANT C: "Magic Potion" - Mystical Forest Theme

> **Concept:** The most faithful to the Asterix metaphor. Users enter an enchanted forest where the "magic potion" (Linux) is brewed. Mystical, organic, and enchanting.

---

## Visual Identity

| Element | Style |
|---------|-------|
| **Theme** | Enchanted forest, druidic magic, ancient wisdom |
| **Colors** | Deep emeralds, gold, warm amber, mystical purples |
| **Feel** | Magical, organic, warm, mystical |
| **Inspiration** | Asterix, Studio Ghibli, Celtic art, Fantasia |

---

## Unique Components to Use

| Component | Purpose | File |
|-----------|---------|------|
| `EtheralShadow` | Flowing mystical shadows | `@/components/ui/etheral-shadow` |
| `WaterRippleImage` | Potion surface effect | `@/components/ui/water-ripple-image` |
| `AmbientAurora` | Magical aurora borealis | `@/components/ui/ambient-aurora` |
| `Waves` | Organic forest waves | `@/components/Waves` |
| `ThermalEffect` | Heat map for "brewing" | `@/components/ui/thermal-shader` |
| `LiquidGlass` | Glass morphism | `@/components/ui/liquid-glass` |
| `Stack` | Draggable potion ingredients | `@/components/Stack` |
| `DecayCard` | "Roman" empire decay | `@/components/DecayCard` |

---

## Section-by-Section Experience

### 1. Hero: "The Enchanted Forest"
```tsx
<section className="relative min-h-screen overflow-hidden bg-[#0a1a10]">
  {/* Layered mystical backgrounds */}

  {/* Layer 1: Aurora - northern lights feel */}
  <div className="absolute inset-0 z-0 opacity-50">
    <AuroraCanvas />
  </div>

  {/* Layer 2: Ethereal flowing magic */}
  <div className="absolute inset-0 z-[1]">
    <EtheralShadow
      color="rgba(0, 153, 125, 0.7)"
      animation={{ scale: 60, speed: 25 }}
      noise={{ opacity: 0.2, scale: 1.5 }}
    />
  </div>

  {/* Layer 3: Golden particles - magic dust */}
  <div className="absolute inset-0 z-[2]">
    <Particles
      particleCount={100}
      particleSpread={20}
      speed={0.03}
      particleColors={['#F9A825', '#FFF8E1', '#00997d']}
      alphaParticles={true}
      particleBaseSize={60}
    />
  </div>

  {/* Content */}
  <div className="relative z-10 min-h-screen flex items-center justify-center">
    <div className="text-center px-6">
      {/* Mystical intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-xl text-[#F9A825] font-serif italic tracking-wide"
      >
        Il était une fois, en l'an 2025...
      </motion.p>

      {/* Forest imagery with water effect */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="my-12 max-w-3xl mx-auto rounded-3xl overflow-hidden"
      >
        <WaterRippleImage
          src="/forest-village.jpg"
          blueish={0.2}
          illumination={0.3}
          scale={8}
          surfaceDistortion={0.05}
        />
      </motion.div>

      {/* Title with gold glow */}
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-5xl md:text-7xl font-black text-[#00997d]
                   drop-shadow-[0_0_40px_rgba(0,153,125,0.6)]"
      >
        Le Village Résistant
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="text-2xl text-white/80 mt-6 max-w-2xl mx-auto font-serif"
      >
        Un village d'irréductibles enseignants et élèves résiste encore à l'Empire...
      </motion.p>

      {/* Scroll hint - leaf falling */}
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="mt-16"
      >
        <span className="text-4xl">🍃</span>
      </motion.div>
    </div>
  </div>
</section>
```

### 2. Crisis: "The Empire's Shadow"
```tsx
<section className="py-32 bg-gradient-to-b from-[#0a1a10] to-[#1a0a0a]">
  {/* Decay effect - empire corruption spreading */}
  <div className="max-w-6xl mx-auto px-6">
    <BlurText
      text="L'ombre de l'Empire s'étend..."
      className="text-4xl md:text-6xl font-serif text-[#C62828] text-center mb-16"
      delay={100}
    />

    {/* Decay cards for stats */}
    <div className="grid md:grid-cols-2 gap-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <DecayCard
            width={400}
            height={200}
            image="/decay-bg.jpg"
          >
            <div className="p-8 text-center">
              <CountUp
                to={stat.value}
                className="text-5xl font-black text-[#C62828]"
              />
              <p className="text-white font-serif mt-2">{stat.label}</p>
            </div>
          </DecayCard>
        </motion.div>
      ))}
    </div>

    {/* Corruption visual */}
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      className="h-2 bg-gradient-to-r from-[#C62828] via-[#ff6b6b] to-transparent mt-16 rounded-full"
    />
  </div>
</section>
```

### 3. Choice: "The Crossroads" - 3 Mystical Paths
```tsx
<section className="relative py-32 bg-[#1a1a10]">
  {/* Organic waves background */}
  <div className="absolute inset-0 opacity-30">
    <Waves lineColor="#00997d" waveSpeedX={0.01} />
  </div>

  <div className="relative z-10 max-w-6xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-serif text-center text-white mb-4">
      Trois chemins s'offrent à vous...
    </h2>

    <TrueFocus
      sentence="Payer Résister Ignorer"
      blurAmount={5}
      borderColor="#F9A825"
      glowColor="rgba(249, 168, 37, 0.5)"
    />

    {/* Three mystical paths */}
    <div className="grid md:grid-cols-3 gap-8 mt-16">
      {/* Path A: Roman Road (Empire) */}
      <motion.div
        whileHover={{ y: -10 }}
        onClick={() => setUserChoice('A')}
        className={cn(
          "cursor-pointer p-8 rounded-3xl border-2 transition-all",
          "bg-gradient-to-b from-[#C62828]/20 to-[#C62828]/5",
          "border-[#C62828]/50 hover:border-[#C62828]",
          userChoice === 'A' && "ring-4 ring-[#C62828]"
        )}
      >
        <div className="text-center">
          <span className="text-6xl block mb-4">🏛️</span>
          <h3 className="text-2xl font-bold text-[#C62828]">
            La Voie Romaine
          </h3>
          <p className="text-gray-400 font-serif mt-2">
            Payer tribut à l'Empire
          </p>
          <div className="mt-6 font-serif text-[#C62828]">
            💰 €{(schoolSize * 800).toLocaleString()}
          </div>
        </div>
      </motion.div>

      {/* Path B: Forest Path (Village) - HIGHLIGHTED */}
      <motion.div
        whileHover={{ y: -20, scale: 1.05 }}
        onClick={() => setUserChoice('B')}
        className={cn(
          "cursor-pointer p-8 rounded-3xl border-2 -translate-y-8",
          "bg-gradient-to-b from-[#00997d]/30 to-[#00997d]/10",
          "border-[#00997d] shadow-[0_0_60px_rgba(0,153,125,0.3)]",
          userChoice === 'B' && "ring-4 ring-[#F9A825]"
        )}
      >
        {/* Recommended badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-2 bg-[#F9A825] text-black font-bold text-sm rounded-full">
            ✨ La Potion Magique
          </span>
        </div>

        <div className="text-center">
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-7xl block mb-4"
          >
            🧪
          </motion.span>
          <h3 className="text-2xl font-bold text-[#00997d]">
            Le Sentier de la Forêt
          </h3>
          <p className="text-gray-300 font-serif mt-2">
            Rejoindre le village résistant
          </p>
          <div className="mt-6 font-serif text-[#00997d]">
            🌿 €{(schoolSize * 50).toLocaleString()}
          </div>

          {/* Shuffle effect */}
          <div className="mt-4">
            <Shuffle
              text="WINDOWS → LINUX"
              colorFrom="#C62828"
              colorTo="#00997d"
              triggerOnHover={true}
            />
          </div>
        </div>
      </motion.div>

      {/* Path C: Misty Path (Inaction) */}
      <motion.div
        whileHover={{ y: -10 }}
        onClick={() => setUserChoice('C')}
        className={cn(
          "cursor-pointer p-8 rounded-3xl border-2 transition-all opacity-70",
          "bg-gradient-to-b from-[#455A64]/20 to-[#455A64]/5",
          "border-[#455A64]/50 hover:border-[#455A64]",
          userChoice === 'C' && "ring-4 ring-[#455A64]"
        )}
      >
        <div className="text-center">
          <span className="text-6xl block mb-4 grayscale">🌫️</span>
          <h3 className="text-2xl font-bold text-[#455A64]">
            Le Chemin Brumeux
          </h3>
          <p className="text-gray-500 font-serif mt-2">
            Ne rien faire...
          </p>
          <div className="mt-6 font-serif text-[#455A64]">
            ⚠️ Risques inconnus
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>
```

### 4. Potion Brewing: "THE WOW FEATURE"
```tsx
<section className="py-32 bg-[#0a1510]">
  <h2 className="text-4xl font-serif text-[#F9A825] text-center mb-16">
    🧙 Le Druide prépare la Potion...
  </h2>

  <div className="max-w-4xl mx-auto">
    {/* Thermal/heat effect as cauldron */}
    <div className="relative aspect-square max-w-lg mx-auto">
      <ThermalEffect
        width={400}
        height={400}
        logoUrl="/tux-logo.png"
        className="mx-auto"
      />

      {/* Bubbling particles overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <Particles
          particleCount={50}
          particleSpread={5}
          speed={0.2}
          particleColors={['#00997d', '#F9A825']}
          alphaParticles={true}
        />
      </div>
    </div>

    {/* Ingredients stack - draggable */}
    <div className="mt-16">
      <p className="text-center text-gray-400 font-serif mb-8">
        Les ingrédients de la liberté numérique:
      </p>

      <Stack
        cardsData={[
          { id: 1, img: '/ingredients/linux.png', title: 'Linux' },
          { id: 2, img: '/ingredients/libreoffice.png', title: 'LibreOffice' },
          { id: 3, img: '/ingredients/firefox.png', title: 'Firefox' },
          { id: 4, img: '/ingredients/gimp.png', title: 'GIMP' },
        ]}
        cardDimensions={{ width: 150, height: 150 }}
        sendToBackOnClick={true}
      />
    </div>
  </div>
</section>
```

### 5. Pillars: "The Three Druids"
```tsx
<section className="py-32 bg-gradient-to-b from-[#0a1510] to-[#0a1a15]">
  <h2 className="text-4xl font-serif text-white text-center mb-4">
    Les Trois Sages du Village
  </h2>

  <TrueFocus
    sentence="Inclusif Responsable Durable"
    blurAmount={4}
    borderColor="#00997d"
    glowColor="rgba(0, 153, 125, 0.5)"
  />

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16 px-6">
    {pillars.map((pillar, i) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.2 }}
      >
        <CometCard>
          <div
            className="p-8 rounded-3xl h-full"
            style={{ backgroundColor: `${pillar.color}15` }}
          >
            {/* Druid character */}
            <div className="text-6xl text-center mb-4">
              {i === 0 ? '🧙‍♂️' : i === 1 ? '🛡️' : '🌿'}
            </div>

            <h3
              className="text-2xl font-bold text-center font-serif"
              style={{ color: pillar.color }}
            >
              {pillar.title}
            </h3>

            <p className="text-gray-400 text-center font-serif mt-2 mb-6">
              {pillar.subtitle}
            </p>

            <p className="text-gray-300 font-serif text-sm">
              {pillar.description}
            </p>

            {/* Mystical stats */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {pillar.stats.slice(0, 2).map(stat => (
                <div
                  key={stat.label}
                  className="p-3 rounded-lg text-center"
                  style={{ backgroundColor: `${pillar.color}20` }}
                >
                  <p className="text-xl font-bold" style={{ color: pillar.color }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </CometCard>
      </motion.div>
    ))}
  </div>
</section>
```

### 6. Join: "The Village Awaits"
```tsx
<section className="relative py-32 overflow-hidden bg-[#00997d]">
  {/* Magical particles */}
  <div className="absolute inset-0 opacity-50">
    <Particles
      particleCount={150}
      particleColors={['#F9A825', '#FFF8E1']}
      alphaParticles={true}
    />
  </div>

  <div className="relative z-10 text-center px-6">
    <motion.span
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="text-8xl block mb-8"
    >
      🏛️
    </motion.span>

    <BlurText
      text="Le Village vous attend"
      className="text-5xl md:text-7xl font-serif font-bold text-white mb-8"
      delay={80}
    />

    <p className="text-2xl text-white/90 font-serif max-w-2xl mx-auto mb-12">
      La potion est prête. L'heure est venue de rejoindre la résistance.
    </p>

    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <Magnet padding={80} magnetStrength={2}>
        <ShatterButton
          shatterColor="#F9A825"
          shardCount={30}
          onClick={() => window.open('https://nird.forge.apps.education.fr/', '_blank')}
          className="text-xl font-serif px-12 py-6"
        >
          🧪 Boire la Potion NIRD
        </ShatterButton>
      </Magnet>

      <Magnet padding={80} magnetStrength={2}>
        <ShatterButton
          shatterColor="#00997d"
          onClick={() => window.open('https://nird.forge.apps.education.fr/linux/', '_blank')}
          className="text-lg font-serif px-8 py-5"
        >
          🐧 Installer Linux
        </ShatterButton>
      </Magnet>
    </div>
  </div>
</section>
```

---

## Unique Interactions

1. **Scroll = Journey through forest** - Organic parallax effects
2. **Hover = Magic activation** - Elements glow and animate
3. **Choice = Path selection** - Mystical crossroads
4. **Brewing = Thermal effect** - Heat map cauldron
5. **CTA = Potion drinking** - Magical transformation

---

## Sound Design (Optional)

- Ambient forest sounds
- Bubbling cauldron
- Mystical chimes
- Bird songs

---

## CSS Required

```css
/* Mystical font */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

.font-mystical {
  font-family: 'Cinzel', serif;
}

/* Glow effects */
.magic-glow {
  filter: drop-shadow(0 0 20px rgba(0, 153, 125, 0.6));
}

.gold-glow {
  filter: drop-shadow(0 0 30px rgba(249, 168, 37, 0.5));
}
```
