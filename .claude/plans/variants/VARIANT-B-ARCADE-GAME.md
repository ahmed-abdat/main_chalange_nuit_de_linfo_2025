# VARIANT B: "Arcade Game" - Retro Gaming Theme

> **Concept:** The whole experience is an 8-bit/pixel art arcade game. Users "play through" the NIRD story, defeating Big Tech bosses and leveling up their school.

---

## Visual Identity

| Element | Style |
|---------|-------|
| **Theme** | Retro arcade, 8-bit pixel art |
| **Colors** | Neon greens, hot pinks, electric blues, CRT glow |
| **Feel** | Nostalgic, playful, energetic |
| **Inspiration** | Pac-Man, Space Invaders, Celeste, Shovel Knight |

---

## Unique Components to Use

| Component | Purpose | File |
|-----------|---------|------|
| `PixelCard` | Pixel shimmer cards | `@/components/PixelCard` |
| `RetroGrid` | 80s perspective grid | `@/components/RetroGrid` |
| `Gravity` | Physics-based dragging | `@/components/ui/gravity` |
| `SnakeGame` | Actual mini-game! | `@/components/SnakeGame` |
| `PixelatedCanvas` | Pixelation effect | `@/components/ui/PixelatedCanvas` |
| `TextType` | Typewriter text | `@/components/TextType` |
| `FallingText` | Physics falling letters | `@/components/FallingText` |

---

## Section-by-Section Experience

### 1. Hero: "Press Start"
```tsx
<section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
  {/* Retro grid background */}
  <div className="absolute inset-0">
    <RetroGrid
      gridColor="#00997d"
      showScanlines={true}
      glowEffect={true}
    />
  </div>

  {/* CRT scanline overlay */}
  <div className="absolute inset-0 pointer-events-none
                  bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />

  <div className="relative z-10 text-center pt-32">
    {/* Arcade cabinet style title */}
    <motion.div
      animate={{
        textShadow: [
          '0 0 10px #00997d, 0 0 20px #00997d',
          '0 0 20px #F9A825, 0 0 40px #F9A825',
          '0 0 10px #00997d, 0 0 20px #00997d',
        ]
      }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="font-mono text-6xl md:text-8xl font-black text-[#00997d]"
    >
      VILLAGE NIRD
    </motion.div>

    <TextType
      text="LEVEL 1: L'EMPIRE ATTAQUE..."
      className="font-mono text-xl text-[#F9A825] mt-8"
      delay={50}
    />

    {/* Blinking "Press Start" */}
    <motion.button
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="mt-16 font-mono text-2xl text-white
                 border-4 border-[#00997d] px-8 py-4
                 hover:bg-[#00997d] transition-colors"
      onClick={() => document.getElementById('crisis')?.scrollIntoView({ behavior: 'smooth' })}
    >
      [ APPUYEZ POUR JOUER ]
    </motion.button>

    {/* High score display */}
    <div className="mt-12 font-mono text-[#C62828]">
      <p>HIGH SCORE: €800,000</p>
      <p className="text-sm">(Budget gaspillé par les écoles)</p>
    </div>
  </div>
</section>
```

### 2. Crisis: "Boss Stats" (Enemy Introduction)
```tsx
<section id="crisis" className="py-32 bg-[#1a0a1a]">
  <h2 className="font-mono text-4xl text-[#C62828] text-center mb-16 animate-pulse">
    ⚠️ BOSS ALERT: MICROSOFT INC. ⚠️
  </h2>

  {/* Stats as "enemy stats" */}
  <div className="max-w-4xl mx-auto">
    {stats.map((stat, i) => (
      <motion.div
        initial={{ x: -100 }}
        whileInView={{ x: 0 }}
        transition={{ delay: i * 0.2 }}
        className="flex items-center gap-4 mb-6"
      >
        <PixelCard variant="pink" className="w-full p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-white">{stat.label}</span>
            <div className="flex items-center gap-2">
              <CountUp
                to={stat.value}
                className="font-mono text-3xl text-[#C62828]"
              />
              {/* Health bar style */}
              <div className="w-32 h-4 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(stat.value / 300) * 100}%` }}
                  className="h-full bg-gradient-to-r from-[#C62828] to-[#ff6b6b]"
                />
              </div>
            </div>
          </div>
        </PixelCard>
      </motion.div>
    ))}
  </div>

  {/* "Defeat" message */}
  <FallingText
    text="DÉFAITES LE BOSS AVEC LINUX!"
    trigger="scroll"
    className="font-mono text-[#00997d] mt-16"
  />
</section>
```

### 3. Choice: "Select Your Fighter"
```tsx
<section className="py-32 bg-gradient-to-b from-[#1a0a1a] to-[#0a1a0a]">
  <h2 className="font-mono text-4xl text-white text-center mb-4">
    CHOISISSEZ VOTRE CAMP
  </h2>

  <p className="font-mono text-[#F9A825] text-center mb-16">
    → PLAYER 1: SELECT ←
  </p>

  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    {/* Each choice as a "character select" card */}
    {choices.map((choice, i) => (
      <motion.div
        whileHover={{ y: -20, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setUserChoice(choice.id)}
        className={cn(
          "cursor-pointer",
          userChoice === choice.id && "ring-4 ring-[#F9A825]"
        )}
      >
        <PixelCard
          variant={choice.id === 'A' ? 'pink' : choice.id === 'B' ? 'blue' : 'default'}
          className="p-8 text-center"
        >
          {/* Pixel art character */}
          <div className="text-6xl mb-4">
            {choice.id === 'A' ? '👹' : choice.id === 'B' ? '🦸' : '👻'}
          </div>

          <h3 className="font-mono text-xl text-white mb-2">{choice.title}</h3>

          {/* Stats bars */}
          <div className="space-y-2 mt-4">
            <div className="flex justify-between font-mono text-xs">
              <span>COÛT</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <span
                    key={j}
                    className={j < (choice.id === 'B' ? 1 : 4) ? 'text-[#C62828]' : 'text-gray-600'}
                  >
                    ■
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-between font-mono text-xs">
              <span>LIBERTÉ</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <span
                    key={j}
                    className={j < (choice.id === 'B' ? 5 : 1) ? 'text-[#00997d]' : 'text-gray-600'}
                  >
                    ■
                  </span>
                ))}
              </div>
            </div>
          </div>

          {choice.id === 'B' && (
            <span className="inline-block mt-4 px-3 py-1 bg-[#F9A825] text-black font-mono text-xs">
              BEST CHOICE
            </span>
          )}
        </PixelCard>
      </motion.div>
    ))}
  </div>
</section>
```

### 4. Mini-Game: "Refurbish PC" (THE WOW FEATURE)
```tsx
<section className="py-32 bg-[#0a0a0a]">
  <h2 className="font-mono text-4xl text-[#00997d] text-center mb-8">
    🎮 BONUS LEVEL: RECONDITIONNE LE PC! 🎮
  </h2>

  {/* Physics-based drag game */}
  <div className="max-w-4xl mx-auto h-[500px] bg-[#1a1a1a] rounded-xl border-4 border-[#00997d]">
    <Gravity gravity={{ x: 0, y: 0.8 }} grabCursor>
      {/* Draggable items */}
      <MatterBody x="20%" y="30%" isDraggable>
        <PixelCard className="p-4">
          <span className="text-4xl">🔧</span>
          <p className="font-mono text-xs">SSD 30€</p>
        </PixelCard>
      </MatterBody>

      <MatterBody x="80%" y="20%" isDraggable>
        <PixelCard className="p-4">
          <span className="text-4xl">🐧</span>
          <p className="font-mono text-xs">USB LINUX</p>
        </PixelCard>
      </MatterBody>

      {/* Target PC */}
      <MatterBody x="50%" y="70%" bodyType="static">
        <div className="p-8 bg-gray-800 rounded-xl border-4 border-dashed border-[#F9A825]">
          <span className="text-6xl">🖥️</span>
          <p className="font-mono text-[#F9A825] mt-2">VIEUX PC</p>
          <p className="font-mono text-xs text-gray-400">
            Glissez les éléments ici!
          </p>
        </div>
      </MatterBody>
    </Gravity>
  </div>

  <p className="font-mono text-center text-gray-400 mt-8">
    SCORE: <span className="text-[#00997d]">+132 PCs</span> SAUVÉS!
  </p>
</section>
```

### 5. Pillars: "Power-Ups"
```tsx
<section className="py-32 bg-[#0a1a0a]">
  <h2 className="font-mono text-4xl text-[#F9A825] text-center mb-16">
    COLLECT ALL POWER-UPS!
  </h2>

  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    {pillars.map((pillar, i) => (
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
      >
        <PixelCard variant="yellow" className="p-8 text-center">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-5xl block mb-4"
          >
            {pillar.icon}
          </motion.span>
          <h3 className="font-mono text-xl text-white">{pillar.title}</h3>
          <p className="font-mono text-xs text-gray-400 mt-2">{pillar.subtitle}</p>

          {/* XP gain */}
          <div className="mt-4 font-mono text-[#00997d]">
            +{pillar.stats[0].value} XP
          </div>
        </PixelCard>
      </motion.div>
    ))}
  </div>
</section>
```

### 6. Join: "Game Complete"
```tsx
<section className="py-32 bg-[#00997d]">
  <div className="text-center">
    <motion.h2
      animate={{
        textShadow: [
          '0 0 10px #FFF',
          '0 0 30px #F9A825',
          '0 0 10px #FFF',
        ]
      }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="font-mono text-6xl md:text-8xl font-black text-white"
    >
      YOU WIN!
    </motion.h2>

    <p className="font-mono text-2xl text-white/80 mt-8">
      SCORE FINAL: €750,000 ÉCONOMISÉS
    </p>

    <div className="mt-16 space-y-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="block mx-auto font-mono text-xl px-8 py-4
                   bg-[#F9A825] text-black border-4 border-black
                   hover:bg-white transition-colors"
        onClick={() => window.open('https://nird.forge.apps.education.fr/', '_blank')}
      >
        [ NEW GAME+ ] REJOINDRE NIRD
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        className="block mx-auto font-mono text-lg px-6 py-3
                   bg-transparent text-white border-2 border-white"
        onClick={() => window.open('https://nird.forge.apps.education.fr/linux/', '_blank')}
      >
        [ DOWNLOAD ] LINUX
      </motion.button>
    </div>
  </div>
</section>
```

---

## Unique Interactions

1. **Scroll = Level progression** - Level counter in corner
2. **Choices = Character selection** - Fighting game style
3. **Mini-game = Drag & drop** - Physics-based refurbishing
4. **Stats = Health bars** - Enemy damage visualization
5. **CTA = "Press Start"** - Blinking arcade buttons

---

## Sound Design (Optional)

- 8-bit background music
- Coin collect sounds for stats
- Power-up sounds for pillars
- Victory fanfare at end

---

## CSS Required

```css
/* Arcade font */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.font-arcade {
  font-family: 'Press Start 2P', cursive;
}

/* CRT effect */
.crt-effect {
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.98; }
}
```
