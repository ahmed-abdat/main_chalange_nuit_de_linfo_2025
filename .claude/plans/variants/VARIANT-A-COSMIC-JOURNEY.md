# VARIANT A: "Cosmic Journey" - Space Exploration Theme

> **Concept:** The journey from Big Tech to NIRD as an epic space voyage. Users navigate through the digital cosmos, escaping the "Empire Station" to reach the "Village Planet."

---

## Visual Identity

| Element | Style |
|---------|-------|
| **Theme** | Deep space, nebulas, starfields |
| **Colors** | Dark blues, purples, emerald nebulas, gold stars |
| **Feel** | Epic, vast, cinematic |
| **Inspiration** | Interstellar, No Man's Sky, Star Wars |

---

## Unique Components to Use

| Component | Purpose | File |
|-----------|---------|------|
| `HorizonHeroSection` | 3D space with parallax mountains | `@/components/ui/horizon-hero-section` |
| `SpaceBackground` | Animated starfield | `@/components/ui/space-background` |
| `WireframeDottedGlobe` | Rotating Earth | `@/components/ui/wireframe-dotted-globe` |
| `Globe` (CSS) | Simple rotating Earth | `@/components/ui/globe` |
| `ParticleTextEffect` | Words made of particles | `@/components/ui/particle-text-effect` |
| `SphereImageGrid` | 3D sphere of school images | `@/components/ui/img-sphere` |
| `VaporizeTextCycle` | Text that vaporizes between words | `@/components/ui/vapour-text-effect` |

---

## Section-by-Section Experience

### 1. Hero: "The Launch"
```tsx
<section className="relative min-h-screen bg-black overflow-hidden">
  {/* 3D Space hero with stars and nebulas */}
  <HorizonHeroSection />

  {/* Override content with custom message */}
  <div className="absolute inset-0 flex items-center justify-center z-20">
    <div className="text-center">
      {/* Particles forming text */}
      <ParticleTextEffect
        words={['2025', 'CRISE', 'LIBERTÉ', 'NIRD']}
      />

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-5xl md:text-7xl font-black text-white mt-8"
      >
        Échapper à l'Empire
      </motion.h1>

      <VaporizeTextCycle
        texts={["WINDOWS", "BIG TECH", "DÉPENDANCE"]}
        color="#C62828"
        direction="left-to-right"
      />
    </div>
  </div>
</section>
```

### 2. Crisis: "The Empire Station"
```tsx
<section className="relative py-32 bg-[#0a0a1a]">
  {/* Starfield background */}
  <SpaceBackground
    particleCount={300}
    particleColor="blue"
    backgroundColor="transparent"
  />

  {/* Rotating globe showing affected regions */}
  <div className="flex flex-col md:flex-row items-center gap-12">
    <WireframeDottedGlobe
      width={500}
      height={500}
      className="opacity-60"
    />

    <div className="space-y-8">
      {/* Stats as "space transmissions" */}
      {stats.map(stat => (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="bg-[#C62828]/20 border-l-4 border-[#C62828] p-6 rounded-r-xl"
        >
          <span className="font-mono text-[#C62828] text-sm">
            [TRANSMISSION REÇUE]
          </span>
          <CountUp to={stat.value} className="text-5xl font-black text-white" />
          <p className="text-gray-400">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

### 3. Choice: "Choose Your Destination"
```tsx
<section className="py-32 bg-gradient-to-b from-[#0a0a1a] to-[#1a0a2e]">
  {/* Three "planet" options */}
  <div className="grid md:grid-cols-3 gap-8">
    {/* Planet A: Empire - Red dying star */}
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="relative aspect-square"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#C62828] to-transparent
                      shadow-[0_0_100px_50px_rgba(198,40,40,0.4)]" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       text-2xl font-bold text-white">
        Empire Station
      </span>
    </motion.div>

    {/* Planet B: Village - Green paradise */}
    <motion.div
      whileHover={{ scale: 1.2 }}
      className="relative aspect-square md:-translate-y-12"
    >
      <Globe /> {/* CSS animated Earth */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2
                       text-2xl font-bold text-[#00997d]">
        ⭐ Village Planet
      </span>
    </motion.div>

    {/* Planet C: Void - Gray asteroid */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative aspect-square"
    >
      <div className="absolute inset-0 rounded-full bg-[#455A64]/30
                      border-2 border-dashed border-[#455A64]" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       text-xl text-gray-500">
        Nulle Part
      </span>
    </motion.div>
  </div>
</section>
```

### 4. Consequences: "Landing"
- **Village:** Starfield celebration with green/gold particles, triumphant music tone
- **Empire:** Red warning lights, "collision course" alerts
- **Void:** Drifting in space, lonely asteroids

### 5. Pillars: "The Colony Features"
```tsx
<section className="py-32 bg-[#0a1520]">
  {/* 3D sphere of community images */}
  <SphereImageGrid
    images={schoolPhotos}
    containerSize={600}
    sphereRadius={250}
    autoRotate={true}
  />

  {/* Pillars as "colony modules" */}
  <div className="mt-16 grid md:grid-cols-3 gap-8">
    {pillars.map(pillar => (
      <div className="p-8 bg-[#00997d]/10 border border-[#00997d]/30 rounded-2xl
                      backdrop-blur-md hover:bg-[#00997d]/20 transition-all">
        <div className="text-4xl mb-4">{pillar.icon}</div>
        <h3 className="text-2xl font-bold text-white">{pillar.title}</h3>
        <p className="text-gray-400">{pillar.description}</p>
      </div>
    ))}
  </div>
</section>
```

### 6. Join: "Mission Control"
```tsx
<section className="py-32 bg-gradient-to-t from-[#00997d] to-[#0a1520]">
  <h2 className="text-6xl font-black text-white text-center mb-12">
    REJOINDRE LA MISSION
  </h2>

  <div className="flex justify-center gap-8">
    <Magnet>
      <ShatterButton shatterColor="#F9A825" className="px-12 py-6 text-xl">
        🚀 Lancer la Mission NIRD
      </ShatterButton>
    </Magnet>
  </div>
</section>
```

---

## Unique Interactions

1. **Scroll = Space travel** - Parallax stars move as you scroll
2. **Mouse = Navigation** - Particles follow cursor like ship trail
3. **Choice = Planet selection** - Orbit animations on hover
4. **Consequences = Landing sequence** - Different planet environments

---

## Sound Design (Optional)

- Ambient space hum
- Transmission beeps for stats
- Warp sound on choice selection
- Triumphant fanfare for Village path

---

## Files to Create

```
src/app/variants/cosmic/page.tsx  # Full cosmic experience
src/components/cosmic/            # Cosmic-specific components
```
