# Village NIRD - Components Documentation

> Complete reference for all UI and animation components available in the project, with use cases tailored to the NIRD challenge theme.

**Challenge:** La Nuit de l'Info 2025 - "Le Village Numérique Résistant"
**Theme:** Asterix vs Digital Empire | Schools resisting Big Tech

---

## Table of Contents

1. [Section-by-Section Component Guide](#section-by-section-component-guide)
2. [Text Animation Components](#text-animation-components)
3. [Background & Effect Components](#background--effect-components)
4. [Card Components](#card-components)
5. [Interactive Components](#interactive-components)
6. [Layout Components](#layout-components)
7. [Cursor Components](#cursor-components)
8. [UI Components (shadcn/ui)](#ui-components-shadcnui)
9. [Creative Combinations](#creative-combinations)
10. [Asterix Metaphor Mappings](#asterix-metaphor-mappings)

---

## Section-by-Section Component Guide

> Map components directly to PRD sections for quick reference.

### 1. Hero Section - "Empire vs Village"
**Goal:** Immediate visual impact, establish Asterix metaphor in <3 seconds

| Component | Purpose | Effect |
|-----------|---------|--------|
| `BlurText` / `SplitText` | Title reveal | Word-by-word dramatic entrance |
| `NeonOrbs` / `AmbientAurora` | Background | Magical "potion" atmosphere |
| `WaterRippleImage` | Background | Mystical forest/village vibe |
| `Particles` | Overlay | "Magic sparkles" effect |
| `ShatterButton` | CTA | "Break free from Big Tech" |
| `ContainerTextScroll` | Hero container | 3D tilt reveal on scroll |
| `HeroSection03` | Full hero | Typographic hero with dot grid |

**Recommended Combo:**
```tsx
<section className="relative h-screen">
  <AmbientAurora /> {/* Background */}
  <Particles particleColors={['#00997d', '#F9A825']} /> {/* Magic sparkles */}
  <BlurText text="Le Village Résiste" className="text-6xl" />
  <ShatterButton shatterColor="#00997d">Découvrir</ShatterButton>
</section>
```

---

### 2. Crisis Section - "La Crise du Numérique"
**Goal:** Establish urgency with animated statistics

| Component | Purpose | Effect |
|-----------|---------|--------|
| `CountUp` | Statistics | Dramatic number reveals |
| `BentoGrid` | Layout | Organized stat cards |
| `PixelCard` | Containers | Tech/digital aesthetic |
| `FallingText` | Headlines | "Empire collapsing" effect |
| `ScrollReveal` | Text | Gradual information reveal |
| `Squares` | Background | Digital grid pattern |

**Key Statistics to Animate:**
- 240 million PCs → `<CountUp to={240} />` millions
- 68% French gov → `<CountUp to={68} />%`
- €0 Linux cost → `<CountUp from={800} to={0} />`

**Color Mapping:**
- Danger stats: `#C62828` (Roman Red)
- Warning stats: `#ff8c00` (Resistance Orange)
- Solution stats: `#00997d` (Emerald Green)

---

### 3. Choice Section - "Que choisissez-vous?"
**Goal:** Personal investment through interactive decision

| Component | Purpose | Effect |
|-----------|---------|--------|
| `Stepper` | Multi-step flow | Guide through choice |
| `GlareHover` / `HolographicCard` | Choice cards | Premium feel on hover |
| `ClickSpark` | Selection feedback | Magic spark on choice |
| `Shuffle` | Text transform | "Windows" → "Linux" |
| `Magnet` | Buttons | Magnetic attraction |

**The 3 Choices:**
| Choice | Card Style | Consequence Color |
|--------|-----------|------------------|
| A - Pay Microsoft | `empire-card` (red border) | Roman Red |
| B - Join Village | `village-card` (green border) | Emerald Green |
| C - Do Nothing | Gray/muted | Steel Gray |

---

### 4. Consequences Section
**Goal:** Show impact of user's choice dynamically

| Component | Purpose | Effect |
|-----------|---------|--------|
| `CountUp` | Cost calculator | Real-time savings |
| `BentoGrid` | Comparison layout | Side-by-side costs |
| `TrueFocus` | Highlight benefits | Focus on key terms |
| `DecayCard` | "Empire" path | Visual decay/deterioration |
| `CometCard` | "Village" path | Positive, glowing |

---

### 5. Pillars Section - "Les 3 Piliers NIRD"
**Goal:** Explore Inclusive, Responsible, Sustainable

| Component | Purpose | Effect |
|-----------|---------|--------|
| `ExpandCards` | Pillar exploration | Expand on hover |
| `Stack` | Photo galleries | School photos |
| `SphereImageGrid` | Community showcase | 3D image sphere |
| `TrueFocus` | Pillar names | "Inclusif" "Responsable" "Durable" |
| `PixelCard` | Pillar cards | Interactive containers |

**Pillar Colors (from PRD):**
| Pillar | Color | Icon |
|--------|-------|------|
| Inclusif | Blue (#4a697d) | Users |
| Responsable | Purple (#1A237E) | Shield |
| Durable | Green (#00997d) | Leaf |

---

### 6. Success Stories Section
**Goal:** Social proof with real schools

| Component | Purpose | Effect |
|-----------|---------|--------|
| `TestimonialSlider` | Testimonial carousel | Animated quotes |
| `CometCard` | School cards | 3D tilt on hover |
| `InfiniteGallery` | Photo gallery | Immersive 3D scroll |
| `InteractiveImageGallery` | Photo grid | Focus/blur effect |
| `LogoLoop` | Partner logos | Infinite scroll |
| `CountUp` | School metrics | "132 PCs reconditioned" |

---

### 7. Join Section - "Rejoindre le Village"
**Goal:** Clear CTA to official NIRD resources

| Component | Purpose | Effect |
|-----------|---------|--------|
| `ShatterButton` | Primary CTA | Explosive click |
| `NeonOrbs` | Background | Magical finale |
| `Magnet` | Button effect | Magnetic attraction |
| `GlareHover` | CTA container | Premium shine |
| `ClickSpark` | Click feedback | Celebration sparks |

---

## Asterix Metaphor Mappings

> Map components to the Asterix theme for creative inspiration.

| Asterix Element | Digital Equivalent | Component Suggestion |
|-----------------|-------------------|---------------------|
| **Magic Potion** | Linux/Open Source | `NeonOrbs`, `Particles` (gold #F9A825), `WaterRippleImage` |
| **Gaulish Village** | NIRD School | `SphereImageGrid` (community), warm greens |
| **Roman Empire** | Big Tech | `DecayCard`, `FallingText`, red (#C62828) |
| **Panoramix Cauldron** | Open Source Community | `AmbientAurora`, `GradientBlur` (purple/gold) |
| **Village Palisade** | Firewall/Sovereignty | `Squares` (grid pattern), `InteractiveCanvas` |
| **Roman Camps** | Big Tech HQ | Cold colors, angular shapes |
| **Tux (Dogmatix)** | Linux Mascot | Friendly animations, bounces |

### Character Animation Ideas

| Character | Animation | Component |
|-----------|-----------|-----------|
| Asterix (Guide) | Appears to guide user | `FadeContent` + character illustration |
| Obelix (Linux veteran) | "Fell in potion" = early adopter | `Shuffle` text reveal |
| Panoramix (Druid) | Creates solution | `Particles` + cauldron visual |
| Vitalstatistix (Chief) | Makes the choice | `Stepper` for decision flow |

---

## Color Reference - "Emerald Resistance" Theme

```tsx
const NIRD_COLORS = {
  // Village (Positive)
  emeraldGreen: '#00997d',    // Primary buttons, success
  forestGreen: '#2E7D32',     // Secondary actions
  gold: '#F9A825',            // Magic potion, accents
  parchment: '#FFF8E1',       // Light backgrounds
  softWhite: '#f4f4f9',       // Text backgrounds

  // Empire (Negative)
  romanRed: '#C62828',        // Danger, Big Tech
  resistanceOrange: '#ff8c00', // CTAs, alerts
  darkBlue: '#1A237E',        // Corporate, serious
  steelGray: '#455A64',       // Industrial

  // Technology
  slateBlue: '#4a697d',       // Backgrounds, footer
  deepMineral: '#1a1a1d',     // Dark mode
}
```

---

## Creative Combinations

### "The Potion Reveal" (Hero)
```tsx
<div className="relative min-h-screen bg-[#1a1a1d]">
  <WaterRippleImage
    src="/forest-village.jpg"
    blueish={0.3}  // More green
    illumination={0.2}
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <BlurText
      text="La Potion Magique Existe"
      className="text-7xl text-[#F9A825]"
    />
  </div>
  <Particles
    particleColors={['#00997d', '#F9A825', '#FFF8E1']}
    particleCount={100}
  />
</div>
```

### "Empire vs Village" (Contrast)
```tsx
<div className="grid grid-cols-2 h-screen">
  {/* Empire Side */}
  <div className="bg-[#C62828] relative">
    <Squares direction="diagonal" borderColor="#1A237E" speed={0.5} />
    <DecayCard>
      <h2>L'Empire Big Tech</h2>
      <CountUp from={0} to={800} prefix="€" suffix="/PC" />
    </DecayCard>
  </div>

  {/* Village Side */}
  <div className="bg-[#00997d] relative">
    <AmbientAurora />
    <CometCard>
      <h2>Le Village NIRD</h2>
      <CountUp from={800} to={0} prefix="€" />
    </CometCard>
  </div>
</div>
```

### "The Transformation" (Choice Result)
```tsx
// When user chooses Linux
<Shuffle
  text="WINDOWS → LINUX"
  colorFrom="#C62828"
  colorTo="#00997d"
  shuffleTimes={5}
/>
<ShatterButton
  shatterColor="#00997d"
  onClick={() => celebrate()}
>
  Libéré !
</ShatterButton>
<ClickSpark sparkColor="#F9A825" /> {/* Gold sparks */}
```

### "Community Showcase" (Success)
```tsx
<SphereImageGrid
  images={schoolPhotos}
  autoRotate={true}
  containerSize={600}
/>
<TestimonialSlider
  reviews={teacherTestimonials}
/>
<LogoLoop
  logos={openSourceLogos}  // Linux, LibreOffice, Firefox...
  speed={80}
  fadeOut={true}
/>
```

---

## Gamification Components

### "Refurbish & Liberate" Mini-Game
Components needed:
- `Stack` - Old PC cards to drag
- `ClickSpark` - Success feedback
- `Particles` - Boot animation
- `CountUp` - Score/PC count
- `Gravity` - Physics-based dragging

### "Chat'bruti" Dual Bot
Components needed:
- `Stepper` - Conversation flow
- `DecayCard` - Big Tech bot (glitches when defeated)
- `CometCard` - NIRD bot (glows when helping)
- `Shuffle` - Text scramble on bot "crash"

---

## Recently Added Components (Quick Reference)

### MusicReactiveHero
**Path:** `src/components/ui/music-reactive-hero-section.tsx`

Audio-reactive canvas visualization with film grain, chromatic aberration, and wave effects.

```tsx
import { Component as MusicReactiveHero } from '@/components/ui/music-reactive-hero-section'

<MusicReactiveHero />
```

**Features:**
- Audio frequency analysis (bass, mid, treble)
- Dynamic color mapping based on audio
- Film grain & scanline effects
- Chromatic aberration
- Vignette & film scratches
- Play/stop audio controls
- Progress bar

**NIRD Use Cases:**
- "Potion Brewing" interactive experience
- Audio-visual representation of data sovereignty
- Dynamic hero for special events
- Immersive storytelling moments

---

### HorizonHeroSection
**Path:** `src/components/ui/horizon-hero-section.tsx`

Three.js space hero with parallax mountains, nebula, and star fields.

```tsx
import { Component as HorizonHero } from '@/components/ui/horizon-hero-section'

<HorizonHero />
```

**Features:**
- WebGL starfield with custom shaders
- Animated nebula background
- Parallax mountain layers
- Smooth camera movement on scroll
- GSAP text animations
- Bloom post-processing
- Multiple scroll sections (HORIZON → COSMOS → INFINITY)

**NIRD Use Cases:**
- Epic "Journey to Freedom" scrollytelling
- "Horizon of possibilities" with Linux
- Multi-section narrative: "From Empire to Village"
- Immersive storytelling experience

---

### SmoothScrollHero (SpaceX-style)
**Path:** `src/components/ui/modern-hero.tsx`

Framer Motion parallax hero with expanding clip-path animation.

```tsx
import { SmoothScrollHero } from '@/components/ui/modern-hero'

<SmoothScrollHero />
```

**Features:**
- Clip-path polygon animation on scroll
- Background size zoom effect
- Parallax floating images
- Schedule/list section included
- Smooth scroll with Lenis

**NIRD Use Cases:**
- "Launch schedule" for NIRD events
- Timeline of school migrations
- Dramatic image reveal on scroll
- Mission-style presentation

---

### Hero (Clean Modern)
**Path:** `src/components/ui/hero-1.tsx`

Minimal hero with grid background, radial accent, and gradient text.

```tsx
import { Hero } from '@/components/ui/hero-1'

<Hero
  eyebrow="Innovate Without Limits"
  title="Le Village Numérique Résiste"
  subtitle="Rejoignez le mouvement NIRD pour une école libre et durable"
  ctaLabel="Découvrir"
  ctaHref="#about"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `eyebrow` | string | "Innovate Without Limits" | Top badge text |
| `title` | string | required | Main heading |
| `subtitle` | string | required | Description |
| `ctaLabel` | string | "Explore Now" | Button text |
| `ctaHref` | string | "#" | Button link |

**NIRD Use Cases:**
- Clean landing page hero
- Simple, professional presentation
- Light/dark mode compatible
- Corporate/institutional feel

---

### IlluminatedHero
**Path:** `src/components/ui/illuminated-hero.tsx`

Dramatic illuminated glow text effect with SVG filters.

```tsx
import { IlluminatedHero } from '@/components/ui/illuminated-hero'

<IlluminatedHero />
```

**Features:**
- Multi-layer blur glow effect
- SVG filter-based illumination
- Warm golden glow on key text
- Animated background shadows
- Full-screen dark theme

**NIRD Use Cases:**
- "Introducing LINUX" dramatic reveal
- Highlight "Potion Magique" text
- Premium announcement section
- Key message emphasis

---

### WireframeDottedGlobe (RotatingEarth)
**Path:** `src/components/ui/wireframe-dotted-globe.tsx`

D3.js interactive rotating Earth with halftone dot pattern.

```tsx
import RotatingEarth from '@/components/ui/wireframe-dotted-globe'

<RotatingEarth
  width={800}
  height={600}
  className="mx-auto"
/>
```

**Features:**
- D3 orthographic projection
- Auto-rotation with drag override
- Scroll zoom support
- Halftone dot land masses
- Graticule grid lines
- Real GeoJSON land data

**NIRD Use Cases:**
- "Global NIRD Movement" visualization
- Data sovereignty map
- "Schools around the world" display
- International open source community

---

### AnimatedSlideshow (HoverSlider)
**Path:** `src/components/blocks/animated-slideshow.tsx`

Text-based hover slider with staggered character animations.

```tsx
import {
  HoverSlider,
  TextStaggerHover,
  HoverSliderImageWrap,
  HoverSliderImage
} from '@/components/blocks/animated-slideshow'

<HoverSlider>
  <div className="flex flex-col">
    <TextStaggerHover text="LINUX" index={0} />
    <TextStaggerHover text="LIBRE" index={1} />
    <TextStaggerHover text="DURABLE" index={2} />
  </div>
  <HoverSliderImageWrap>
    <HoverSliderImage index={0} imageUrl="/linux.jpg" />
    <HoverSliderImage index={1} imageUrl="/libre.jpg" />
    <HoverSliderImage index={2} imageUrl="/durable.jpg" />
  </HoverSliderImageWrap>
</HoverSlider>
```

**Components:**
- `HoverSlider` - Context provider
- `TextStaggerHover` - Text with character stagger on hover
- `HoverSliderImageWrap` - Image container (grid stack)
- `HoverSliderImage` - Clip-path animated image

**NIRD Use Cases:**
- 3 Pillars showcase (Inclusif, Responsable, Durable)
- Software alternatives menu
- Interactive feature explorer
- Portfolio-style navigation

---

### Globe (Simple CSS)
**Path:** `src/components/ui/globe.tsx`

Simple CSS-animated rotating Earth with twinkling stars.

```tsx
import Globe from '@/components/ui/globe'

<Globe />
```

**Features:**
- Pure CSS animation (no WebGL)
- Rotating earth texture
- Twinkling star effects
- Realistic shadow/glow
- Lightweight & performant

**NIRD Use Cases:**
- Global community representation
- Lightweight alternative to 3D globe
- "World of open source" decoration
- Background element

---

### DotScreenShader
**Path:** `src/components/ui/dot-shader-background.tsx`

WebGL shader-based dot grid with mouse trail effect.

```tsx
import { DotScreenShader } from '@/components/ui/dot-shader-background'

<div className="fixed inset-0 -z-10">
  <DotScreenShader />
</div>
```

**Features:**
- Custom GLSL shader material
- Mouse trail following effect (useTrailTexture)
- Animated dot pulsing
- Light/dark theme support (via next-themes)
- Radial gradient mask
- Performant WebGL rendering

**Theme Colors:**
| Theme | Dot Color | Background | Opacity |
|-------|-----------|------------|---------|
| Dark | #FFFFFF | #121212 | 0.025 |
| Light | #e1e1e1 | #F4F5F5 | 0.15 |

**NIRD Use Cases:**
- Subtle animated background
- "Digital infrastructure" visualization
- Interactive hero backdrop
- Tech-forward aesthetic
- Network/connectivity representation

---

### ThermalEffect
**Path:** `src/components/ui/thermal-shader.tsx`

Interactive thermal imaging effect with logo/image mask.

```tsx
import { ThermalEffect } from '@/components/ui/thermal-shader'

<ThermalEffect
  width={400}
  height={400}
  logoUrl="/your-logo.png"
  className="mx-auto"
/>
```

**Features:**
- WebGL thermal shader with 7-color gradient
- Mouse interaction heat map
- Procedural animation with looping glow
- Film grain, glow, and chromatic effects
- Custom logo mask support
- Responsive container

**NIRD Use Cases:**
- "Potion brewing" thermal effect
- Linux Tux logo reveal
- Interactive logo showcase
- "Heat of resistance" visualization
- Dramatic hero element

---

### DotPattern
**Path:** `src/components/ui/dot-pattern-1.tsx`

Simple SVG dot pattern for backgrounds.

```tsx
import { DotPattern } from '@/components/ui/dot-pattern-1'

<div className="relative h-screen">
  <DotPattern
    width={24}
    height={24}
    cx={1}
    cy={0.5}
    cr={0.5}
    className="fill-slate-500/50"
  />
  <div className="relative z-10">Content</div>
</div>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number | 24 | Pattern cell width |
| `height` | number | 24 | Pattern cell height |
| `cx` | number | 1 | Dot center X |
| `cy` | number | 0.5 | Dot center Y |
| `cr` | number | 0.5 | Dot radius |

**NIRD Use Cases:**
- Subtle tech background
- Section separators
- Card backgrounds
- Minimalist patterns

---

### MacbookPro
**Path:** `src/components/ui/macbook-pro.tsx`

SVG MacBook Pro mockup for displaying screenshots.

```tsx
import { MacbookPro } from '@/components/ui/macbook-pro'

<MacbookPro
  width={650}
  height={400}
  src="/screenshot.png"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number | 650 | SVG width |
| `height` | number | 400 | SVG height |
| `src` | string | - | Screenshot image URL |

**NIRD Use Cases:**
- Linux desktop showcase
- Software demo screenshots
- Before/after Windows→Linux comparison
- Product mockups

---

### VaporizeTextCycle (VapourTextEffect)
**Path:** `src/components/ui/vapour-text-effect.tsx`

Text that cycles through words with particle vaporization effect.

```tsx
import VaporizeTextCycle, { Tag } from '@/components/ui/vapour-text-effect'

<VaporizeTextCycle
  texts={["LINUX", "LIBRE", "NIRD"]}
  font={{
    fontFamily: "Inter, sans-serif",
    fontSize: "70px",
    fontWeight: 600
  }}
  color="rgb(0, 153, 125)"
  spread={5}
  density={5}
  animation={{
    vaporizeDuration: 2,
    fadeInDuration: 1,
    waitDuration: 0.5
  }}
  direction="left-to-right"
  alignment="center"
  tag={Tag.H1}
/>
```

**Features:**
- Canvas-based particle system
- Left-to-right or right-to-left vaporization
- Configurable font, color, speed
- Automatic word cycling
- SEO-friendly (hidden text element)

**NIRD Use Cases:**
- Dramatic word reveals: "WINDOWS" → "LINUX"
- 3 pillars cycling: "INCLUSIF" → "RESPONSABLE" → "DURABLE"
- Hero headlines
- Call-to-action emphasis

---

### RevealText
**Path:** `src/components/ui/reveal-text.tsx`

Text reveal with spring animation and image fill on hover.

```tsx
import { RevealText } from '@/components/ui/reveal-text'

<RevealText
  text="VILLAGE"
  textColor="text-white"
  overlayColor="text-emerald-500"
  fontSize="text-[150px]"
  letterDelay={0.08}
  letterImages={[
    "/linux.jpg",
    "/school.jpg",
    // ...one per letter
  ]}
/>
```

**Features:**
- Spring-animated letter entrance
- Per-letter image reveal on hover
- Color sweep overlay animation
- Configurable timing and colors

**NIRD Use Cases:**
- Hero title with school photos in letters
- Interactive "RÉSISTANCE" text
- Dramatic reveals with thematic imagery
- Premium text presentation

---

### VaporizeAnimationText
**Path:** `src/components/ui/vaporize-animation-text.tsx`

Enhanced particle-based text vaporization with glow and trail effects.

```tsx
import { VaporizeAnimationText } from '@/components/ui/vaporize-animation-text'

<VaporizeAnimationText texts={["LINUX", "NIRD", "LIBRE"]} />
```

**Features:**
- Particle physics with gravity
- Glow and trail effects
- Turbulence animation
- Color transitions
- Configurable effects

**NIRD Use Cases:**
- "Breaking free" from Big Tech visualization
- Dramatic word transitions
- Interactive hero element
- "Transformation" moments

---

### ParticleTextEffect
**Path:** `src/components/ui/particle-text-effect.tsx`

Particles that form text with color transitions and mouse interaction.

```tsx
import { ParticleTextEffect } from '@/components/ui/particle-text-effect'

<ParticleTextEffect words={["NIRD", "LINUX", "LIBRE", "ÉCOLE"]} />
```

**Features:**
- Particle steering toward targets
- Random color transitions per word
- Right-click to destroy particles
- Auto word cycling (4 seconds)
- Motion blur effect

**NIRD Use Cases:**
- Interactive word showcase
- Key message cycling
- Hero element with engagement
- "Digital transformation" visualization

---

### BlurTextAnimation
**Path:** `src/components/ui/blur-text-animation.tsx`

Cinematic blur-to-clear text animation for sentences.

```tsx
import BlurTextAnimation from '@/components/ui/blur-text-animation'

<BlurTextAnimation
  text="Le Village Numérique Résiste à l'Empire Big Tech"
  fontSize="text-4xl md:text-5xl"
  textColor="text-white"
  animationDelay={4000}
/>
```

**Features:**
- Per-word blur reveal
- 3D transform (rotateX, translateY)
- Customizable timing per word
- Auto-looping animation
- Cinematic text shadow

**NIRD Use Cases:**
- Quote reveals
- Mission statement presentations
- Storytelling text blocks
- Dramatic opening statements

---

### SpotlightCard (GlowCard)
**Path:** `src/components/ui/spotlight-card.tsx`

Card with mouse-following spotlight glow effect.

```tsx
import { GlowCard } from '@/components/ui/spotlight-card'

<GlowCard
  glowColor="green"  // 'blue' | 'purple' | 'green' | 'red' | 'orange'
  size="md"          // 'sm' | 'md' | 'lg'
>
  <h2>NIRD Feature</h2>
</GlowCard>
```

**NIRD Use Cases:** Feature cards, pillar highlights, choice cards

---

### TextDisperse
**Path:** `src/components/ui/text-disperse.tsx`

Text that disperses/scatters on hover (max 13 chars).

```tsx
import { TextDisperse } from '@/components/ui/text-disperse'

<TextDisperse>RÉSISTANCE</TextDisperse>
```

**NIRD Use Cases:** Navigation links, dramatic headlines, "breaking free" effect

---

### LiquidGlass
**Path:** `src/components/ui/liquid-glass.tsx`

iOS-style liquid glass morphism effect with dock and buttons.

```tsx
import { Component as LiquidGlass } from '@/components/ui/liquid-glass'

<LiquidGlass />  // Full demo with dock icons
```

**Components included:** `GlassEffect`, `GlassDock`, `GlassButton`, `GlassFilter`

**NIRD Use Cases:** Premium UI elements, software dock showcase, CTAs

---

### Gravity
**Path:** `src/components/ui/gravity.tsx`

Physics-based gravity simulation using Matter.js.

```tsx
import { Gravity, MatterBody } from '@/components/ui/gravity'

<Gravity gravity={{ x: 0, y: 1 }} grabCursor>
  <MatterBody x="50%" y="20%" isDraggable>
    <div className="p-4 bg-green-500">Linux USB</div>
  </MatterBody>
  <MatterBody x="30%" y="10%">
    <div className="p-4 bg-red-500">Windows</div>
  </MatterBody>
</Gravity>
```

**NIRD Use Cases:**
- "Refurbish" mini-game (drag USB to PC)
- Falling Big Tech logos
- Interactive physics playground
- "Weight of the Empire" visualization

---

### ParallaxFloating
**Path:** `src/components/ui/parallax-floating.tsx`

Mouse-following parallax effect for floating elements.

**NIRD Use Cases:** Hero backgrounds, floating icons, depth effects

---

### FeatureShaderCards
**Path:** `src/components/ui/feature-shader-cards.tsx`

Cards with WebGL shader effects.

**NIRD Use Cases:** Premium feature displays, 3D card effects

---

### SmoothScrollHero
**Path:** `src/components/ui/smooth-scroll-hero.tsx`

Hero section with smooth scroll animations.

**NIRD Use Cases:** Main landing hero, scrollytelling intro

---

### DatabaseWithRestApi
**Path:** `src/components/ui/database-with-rest-api.tsx`

Animated database/API visualization.

**NIRD Use Cases:** "Data sovereignty" section, tech architecture display

---

## Text Animation Components

### BlurText
**Path:** `src/components/BlurText.tsx`

Animates text with blur-to-clear effect on scroll into view.

```tsx
import BlurText from '@/components/BlurText'

<BlurText
  text="Le Village Numérique Résiste"
  animateBy="words"        // 'words' | 'letters'
  direction="top"          // 'top' | 'bottom'
  delay={200}              // ms between each word/letter
  className="text-4xl font-bold"
/>
```

**NIRD Use Cases:**
- Hero section title reveal
- Section headers with dramatic entrance
- Quote reveals about digital sovereignty

---

### SplitText
**Path:** `src/components/SplitText.tsx`

GSAP-powered text splitting with scroll-triggered animations.

```tsx
import SplitText from '@/components/SplitText'

<SplitText
  text="Linux: La Potion Magique"
  tag="h1"
  splitType="chars"        // 'chars' | 'words' | 'lines'
  duration={0.6}
  delay={100}
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
/>
```

**NIRD Use Cases:**
- Dramatic headings for the "Crisis" section
- Character-by-character reveal for key statistics
- Animated call-to-action text

---

### TrueFocus
**Path:** `src/components/TrueFocus.tsx`

Highlights words one by one with animated focus brackets.

```tsx
import TrueFocus from '@/components/TrueFocus'

<TrueFocus
  sentence="Inclusif Responsable Durable"
  blurAmount={5}
  borderColor="#2E7D32"     // NIRD Green
  glowColor="rgba(46, 125, 50, 0.6)"
  animationDuration={0.5}
  pauseBetweenAnimations={1}
/>
```

**NIRD Use Cases:**
- Highlight the 3 NIRD pillars one by one
- Focus on key terms: "Libre", "Souveraineté", "Durabilité"
- Interactive vocabulary exploration

---

### Shuffle
**Path:** `src/components/Shuffle.tsx`

Slot machine-style text shuffling animation.

```tsx
import Shuffle from '@/components/Shuffle'

<Shuffle
  text="REJOIGNEZ LE VILLAGE"
  shuffleDirection="right"
  shuffleTimes={3}
  duration={0.35}
  triggerOnHover={true}
  colorFrom="#C62828"       // Roman Red
  colorTo="#2E7D32"         // NIRD Green
/>
```

**NIRD Use Cases:**
- Transform "Windows" to "Linux" visually
- "Empire" to "Village" transition
- Cost counter animation (€800 → €0)

---

### FallingText
**Path:** `src/components/FallingText.tsx`

Physics-based falling text using Matter.js.

```tsx
import FallingText from '@/components/FallingText'

<FallingText
  text="Libérez-vous du Big Tech"
  highlightWords={["Libérez", "Big Tech"]}
  trigger="scroll"         // 'auto' | 'scroll' | 'click' | 'hover'
  gravity={1}
  fontSize="2rem"
/>
```

**NIRD Use Cases:**
- "Breaking free" from Big Tech visualization
- Dramatic impact for crisis statistics
- Interactive "collapse of the empire" moment

---

### ContainerTextScroll
**Path:** `src/components/ui/container-text-scroll.tsx`

Scroll-triggered 3D card that tilts and scales into view.

```tsx
import { ContainerTextScroll } from '@/components/ui/container-text-scroll'

<ContainerTextScroll
  titleComponent={
    <h1 className="text-4xl font-bold">
      Le Village Résiste
    </h1>
  }
>
  {/* Background content (image, video, etc.) */}
  <img src="/village-bg.jpg" className="w-full h-full object-cover" />
</ContainerTextScroll>
```

**Features:**
- 3D tilt effect (rotates from -20° to 0°)
- Scale animation (0.9 → 1.0)
- Translate up on scroll
- Responsive (mobile/desktop)
- Title overlay with separate animation

**NIRD Use Cases:**
- Hero section reveal
- "The Village" dramatic introduction
- Feature showcase with scroll progression
- Full-screen image/video reveal
- Storytelling section transitions

---

### ScrollReveal
**Path:** `src/components/ScrollReveal.tsx`

Text reveals with blur and rotation on scroll.

```tsx
import ScrollReveal from '@/components/ScrollReveal'

<ScrollReveal
  enableBlur={true}
  baseOpacity={0.1}
  baseRotation={3}
  blurStrength={4}
>
  Comment les écoles peuvent-elles résister?
</ScrollReveal>
```

**NIRD Use Cases:**
- Long-form storytelling sections
- Scrollytelling narrative text
- Gradual information reveal

---

### CountUp
**Path:** `src/components/CountUp.tsx`

Animated number counter with spring physics.

```tsx
import CountUp from '@/components/CountUp'

<CountUp
  from={0}
  to={240}
  duration={2}
  separator=" "
  className="text-6xl font-bold"
/>
<span>millions de PC à jeter</span>
```

**NIRD Use Cases:**
- Statistics display (240M PCs, 68% Windows, €0 cost)
- Savings calculator results
- Environmental impact numbers

---

### TextType
**Path:** `src/components/TextType.tsx`

Typewriter effect for text.

**NIRD Use Cases:**
- Terminal-style Linux commands
- "Installing freedom..." loading messages
- Hacker-style reveals

---

## Background & Effect Components

### Particles
**Path:** `src/components/Particles.tsx`

WebGL-powered 3D particle system using OGL.

```tsx
import Particles from '@/components/Particles'

<Particles
  particleCount={200}
  particleSpread={10}
  speed={0.1}
  particleColors={['#2E7D32', '#F9A825', '#FFF8E1']}
  moveParticlesOnHover={true}
  alphaParticles={true}
/>
```

**NIRD Use Cases:**
- "Magic potion" sparkles effect
- Data flowing visualization
- Background ambiance for hero section

---

### Waves
**Path:** `src/components/Waves.tsx`

Interactive wave lines following mouse movement.

```tsx
import Waves from '@/components/Waves'

<Waves
  lineColor="#2E7D32"
  waveSpeedX={0.0125}
  waveAmpX={32}
  waveAmpY={16}
/>
```

**NIRD Use Cases:**
- Forest/nature background effect
- Network connectivity visualization
- Calming section transitions

---

### Squares
**Path:** `src/components/Squares.tsx`

Animated moving grid pattern.

```tsx
import Squares from '@/components/Squares'

<Squares
  direction="diagonal"     // 'diagonal' | 'up' | 'right' | 'down' | 'left'
  speed={1}
  borderColor="#2E7D32"
  hoverFillColor="#F9A82533"
  squareSize={40}
/>
```

**NIRD Use Cases:**
- Digital/tech background pattern
- Village map grid background
- Matrix-style effect for tech sections

---

### RetroGrid
**Path:** `src/components/RetroGrid.tsx`

80s-style 3D perspective grid animation.

```tsx
import RetroGrid from '@/components/RetroGrid'

<RetroGrid
  gridColor="#2E7D32"      // NIRD Green
  showScanlines={true}
  glowEffect={true}
/>
```

**NIRD Use Cases:**
- "Back to basics" retro computing theme
- Time machine effect (1985 → 2025)
- Nostalgic Linux origins section

---

### NeonOrbs
**Path:** `src/components/ui/neon-orbs.tsx`

Glowing orbs with spinning light beams.

```tsx
import { NeonOrbs } from '@/components/ui/neon-orbs'

<NeonOrbs />
```

**NIRD Use Cases:**
- "Magic potion" visualization
- Hero section dramatic background
- Power/energy representation

---

### SpaceBackground
**Path:** `src/components/ui/space-background.tsx`

Animated star field particles.

```tsx
import { SpaceBackground } from '@/components/ui/space-background'

<SpaceBackground
  particleCount={450}
  particleColor="blue"
  backgroundColor="transparent"
/>
```

**NIRD Use Cases:**
- "Digital universe" background
- Night sky for village scene
- Infinite possibilities visualization

---

### GradientBlur
**Path:** `src/components/ui/gradient-blur.tsx`

Mouse-following gradient blur trail.

```tsx
import { GradientBlur } from '@/components/ui/gradient-blur'

<GradientBlur
  radius={60}
  opacityDecay={0.025}
  color={[46, 125, 50]}    // RGB for NIRD Green
/>
```

**NIRD Use Cases:**
- Interactive paint effect
- "Creating your own path" visualization
- Magical cursor trail

---

### DotGrid
**Path:** `src/components/DotGrid.tsx`

Animated dot pattern background.

**NIRD Use Cases:**
- Minimalist tech background
- Data point visualization
- Clean section separators

---

### EtheralShadow
**Path:** `src/components/ui/etheral-shadow.tsx`

Animated flowing shadow effect with SVG turbulence filters.

```tsx
import { Component as EtheralShadow } from '@/components/ui/etheral-shadow'

<EtheralShadow
  color="rgba(0, 153, 125, 0.8)"  // Emerald green
  animation={{
    scale: 50,      // Distortion amount (1-100)
    speed: 30       // Animation speed (1-100)
  }}
  noise={{
    opacity: 0.3,   // Grain overlay
    scale: 1
  }}
  className="h-screen w-full"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | string | `rgba(128,128,128,1)` | Shadow color |
| `animation.scale` | number | - | Distortion intensity (1-100) |
| `animation.speed` | number | - | Animation speed (1-100) |
| `noise.opacity` | number | - | Grain overlay opacity |
| `noise.scale` | number | - | Grain size |
| `sizing` | `'fill'` \| `'stretch'` | `'fill'` | Mask sizing mode |

**NIRD Use Cases:**
- "Magic potion" brewing visualization
- Mystical/ethereal hero backgrounds
- "Digital resistance" flowing energy
- Dramatic text overlays with flowing shadows
- Empire "corruption" effect (use red #C62828)

**Creative Ideas:**
```tsx
// Village potion effect (green/gold)
<EtheralShadow color="rgba(0, 153, 125, 0.7)" />

// Empire corruption effect (red)
<EtheralShadow color="rgba(198, 40, 40, 0.6)" />

// Linux transformation (purple/blue)
<EtheralShadow color="rgba(26, 35, 126, 0.5)" />
```

---

### AmbientAurora
**Path:** `src/components/ui/ambient-aurora.tsx`

Animated aurora borealis effect with floating orbs.

```tsx
import AuroraCanvas from '@/components/ui/ambient-aurora'

<AuroraCanvas />
```

**NIRD Use Cases:**
- Magical/mystical background for "potion" section
- Hero section ambient effect
- Calming nature-inspired background

---

### WaterRippleImage
**Path:** `src/components/ui/water-ripple-image.tsx`

WebGL water surface distortion effect on images.

```tsx
import WaterRippleImage from '@/components/ui/water-ripple-image'

<WaterRippleImage
  src="/your-image.jpg"
  blueish={0.6}
  scale={7}
  illumination={0.15}
  surfaceDistortion={0.07}
  waterDistortion={0.03}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | unsplash URL | Image source |
| `blueish` | number | 0.6 | Blue tint amount |
| `scale` | number | 7 | Wave scale |
| `illumination` | number | 0.15 | Light reflection |
| `surfaceDistortion` | number | 0.07 | Surface wave distortion |
| `waterDistortion` | number | 0.03 | Water movement distortion |

**NIRD Use Cases:**
- "Potion" effect on hero images
- Dreamlike/mystical atmosphere
- Nature/forest backgrounds with water effect
- Artistic image presentations
- "Dive into open source" visualization

---

### InteractiveCanvas
**Path:** `src/components/ui/interactive-canvas.tsx`

Mouse-reactive dot grid with lines pointing toward cursor.

```tsx
import { InteractiveCanvas } from '@/components/ui/interactive-canvas'

<InteractiveCanvas
  gridWidth={120}
  gridHeight={120}
  dotColor="#2E7D32"        // NIRD Green
  lineColor="#555555"
  backgroundColor="transparent"
  maxDistance={2}
  dotSizeMultiplier={200}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gridWidth` | number | 120 | Number of dots horizontally |
| `gridHeight` | number | 120 | Number of dots vertically |
| `dotColor` | string | "#0000ff" | Color of dots |
| `lineColor` | string | "#555555" | Color of lines |
| `backgroundColor` | string | "transparent" | Background color |
| `maxDistance` | number | 2 | Max dot movement distance |
| `dotSizeMultiplier` | number | 200 | Size scaling factor |

**NIRD Use Cases:**
- "Network connectivity" visualization
- Interactive background showing data flow
- Mouse-following effect for engagement
- Digital infrastructure representation
- "Breaking free" from Big Tech visual (dots moving away)

---

### Dither / Noise
**Path:** `src/components/Dither.tsx`, `src/components/Noise.tsx`

Visual texture effects.

**NIRD Use Cases:**
- Retro/vintage aesthetic
- Film grain effect
- Artistic overlays

---

## Card Components

### PixelCard
**Path:** `src/components/PixelCard.tsx`

Card with animated pixel shimmer effect on hover.

```tsx
import PixelCard from '@/components/PixelCard'

<PixelCard
  variant="blue"           // 'default' | 'blue' | 'yellow' | 'pink'
  gap={5}
  speed={35}
>
  <div className="p-6">Card Content</div>
</PixelCard>
```

**NIRD Use Cases:**
- Feature cards for 3 pillars
- Software alternative showcase
- Interactive info cards

---

### DecayCard
**Path:** `src/components/DecayCard.tsx`

SVG displacement effect card following mouse.

```tsx
import DecayCard from '@/components/DecayCard'

<DecayCard
  width={300}
  height={400}
  image="/path/to/image.jpg"
>
  <span>Linux</span>
</DecayCard>
```

**NIRD Use Cases:**
- Character portraits (Asterix theme)
- "Decay of the Empire" visual metaphor
- Dramatic image presentations

---

### GlareHover
**Path:** `src/components/GlareHover.tsx`

Card with light glare sweep on hover.

```tsx
import GlareHover from '@/components/GlareHover'

<GlareHover
  width="300px"
  height="200px"
  glareColor="#F9A825"     // Gold
  glareOpacity={0.5}
  transitionDuration={650}
>
  Content
</GlareHover>
```

**NIRD Use Cases:**
- Premium feature highlights
- "Golden" solution cards
- Interactive buttons with shine

---

### CometCard
**Path:** `src/components/ui/CometCard.tsx`

3D tilting card with glare effect.

```tsx
import { CometCard } from '@/components/ui/CometCard'

<CometCard
  rotateDepth={17.5}
  translateDepth={20}
>
  <img src="/school.jpg" alt="School" />
</CometCard>
```

**NIRD Use Cases:**
- Success story school photos
- Team/community member cards
- Interactive gallery items

---

### HolographicCard
**Path:** `src/components/ui/holographic-card.tsx`

3D tilting card with holographic glow effect.

```tsx
import HolographicCard from '@/components/ui/holographic-card'

<HolographicCard />
```

**NIRD Use Cases:**
- Premium feature highlights
- "Magic" item presentation
- Special announcement cards

---

### Stack
**Path:** `src/components/Stack.tsx`

Draggable card stack with physics.

```tsx
import Stack from '@/components/Stack'

<Stack
  cardsData={[
    { id: 1, img: '/school1.jpg' },
    { id: 2, img: '/school2.jpg' },
  ]}
  cardDimensions={{ width: 208, height: 208 }}
  sendToBackOnClick={true}
/>
```

**NIRD Use Cases:**
- Photo gallery of NIRD schools
- Before/after comparisons
- Software alternatives showcase

---

## Interactive Components

### Stepper
**Path:** `src/components/Stepper.tsx`

Multi-step wizard with animations.

```tsx
import Stepper, { Step } from '@/components/Stepper'

<Stepper
  initialStep={1}
  onStepChange={(step) => console.log(step)}
  nextButtonText="Continuer"
  backButtonText="Retour"
>
  <Step>Étape 1: Évaluation</Step>
  <Step>Étape 2: Migration</Step>
  <Step>Étape 3: Formation</Step>
</Stepper>
```

**NIRD Use Cases:**
- "Join NIRD" sign-up flow
- Migration guide walkthrough
- Decision-making wizard

---

### ShatterButton
**Path:** `src/components/ui/shatter-button.tsx`

Button that explodes into particles on click.

```tsx
import { Component as ShatterButton } from '@/components/ui/shatter-button'

<ShatterButton
  shatterColor="#2E7D32"
  shardCount={20}
  onClick={() => console.log('Action!')}
>
  Rejoindre le Village
</ShatterButton>
```

**NIRD Use Cases:**
- "Break free" CTA button
- Dramatic action triggers
- Form submissions with impact

---

### ClickSpark
**Path:** `src/components/ClickSpark.tsx`

Spark burst effect on click anywhere.

```tsx
import ClickSpark from '@/components/ClickSpark'

<ClickSpark
  sparkColor="#F9A825"
  sparkCount={8}
  sparkRadius={15}
>
  {children}
</ClickSpark>
```

**NIRD Use Cases:**
- Global click feedback
- "Magic" interaction effect
- Celebration micro-interactions

---

### Magnet
**Path:** `src/components/Magnet.tsx`

Element follows mouse within proximity.

```tsx
import Magnet from '@/components/Magnet'

<Magnet
  padding={100}
  magnetStrength={2}
>
  <button>Hover me</button>
</Magnet>
```

**NIRD Use Cases:**
- Interactive CTA buttons
- Navigation elements
- Playful UI touches

---

### SphereImageGrid
**Path:** `src/components/ui/img-sphere.tsx`

3D sphere of images with drag rotation.

```tsx
import SphereImageGrid from '@/components/ui/img-sphere'

<SphereImageGrid
  images={[
    { id: '1', src: '/school1.jpg', alt: 'School 1', title: 'École Bruay' },
    // ...
  ]}
  containerSize={600}
  sphereRadius={200}
  autoRotate={true}
/>
```

**NIRD Use Cases:**
- Community showcase
- Partner schools display
- "Village" visualization

---

## Layout Components

### BentoGrid
**Path:** `src/components/BentoGrid.tsx`

Animated responsive grid layout.

```tsx
import { BentoGridShowcase } from '@/components/BentoGrid'

<BentoGridShowcase
  integrations={<Card1 />}
  featureTags={<Card2 />}
  mainFeature={<Card3 />}
  secondaryFeature={<Card4 />}
  statistic={<Card5 />}
  journey={<Card6 />}
/>
```

**NIRD Use Cases:**
- Features overview section
- Statistics dashboard
- Content organization

---

### ExpandCards
**Path:** `src/components/ExpandCards.tsx`

Horizontal cards that expand on hover.

**NIRD Use Cases:**
- Software alternatives comparison
- Timeline visualization
- Gallery showcase

---

### TestimonialSlider
**Path:** `src/components/TestimonialSlider.tsx`

Animated testimonial carousel.

```tsx
import { TestimonialSlider } from '@/components/TestimonialSlider'

<TestimonialSlider
  reviews={[
    {
      id: '1',
      name: 'Marie Dupont',
      affiliation: 'École Bruay-la-Buissière',
      quote: 'Nos vieux PC fonctionnent mieux que jamais!',
      imageSrc: '/testimonial1.jpg',
      thumbnailSrc: '/thumb1.jpg'
    }
  ]}
/>
```

**NIRD Use Cases:**
- Teacher testimonials
- School success stories
- Community voices

---

### LogoLoop
**Path:** `src/components/LogoLoop.tsx`

Infinite scrolling logo carousel.

```tsx
import LogoLoop from '@/components/LogoLoop'

<LogoLoop
  logos={[
    { src: '/linux.svg', alt: 'Linux' },
    { src: '/libreoffice.svg', alt: 'LibreOffice' },
  ]}
  speed={120}
  direction="left"
  fadeOut={true}
/>
```

**NIRD Use Cases:**
- Open source software logos
- Partner organizations
- Supported distributions

---

### HeroSection03
**Path:** `src/components/ui/hero-03.tsx`

Full-page typographic hero with dot grid background.

```tsx
import { HeroSection03 } from '@/components/ui/hero-03'

<HeroSection03 />
```

**Features:**
- Dot grid pattern background
- Large typographic layout
- Built-in navigation header
- Social media icons
- Responsive design (mobile/desktop)
- Fixed "award" badge on side

**NIRD Use Cases:**
- Bold statement hero: "VILLAGE NUMÉRIQUE RÉSISTANT"
- Typography-focused landing
- Customize text: "LIBRE • INCLUSIF • DURABLE"
- Replace icons with NIRD/Tux mascot

**Customization Ideas:**
```tsx
// Replace "DIGITAL PRODUCTS DESIGN CODE" with:
// "NUMÉRIQUE INCLUSIF RESPONSABLE DURABLE"
// Or: "LINUX LIBERTÉ DURABILITÉ"
```

---

### CircularGallery
**Path:** `src/components/CircularGallery2.tsx`

3D circular image carousel.

**NIRD Use Cases:**
- School gallery
- Feature showcase
- Interactive hero element

---

### InfiniteGallery (3D Photography)
**Path:** `src/components/ui/3d-gallery-photography.tsx`

WebGL-powered infinite 3D gallery with cloth/flag physics on hover.

```tsx
import InfiniteGallery from '@/components/ui/3d-gallery-photography'

<InfiniteGallery
  images={[
    '/school1.jpg',
    '/school2.jpg',
    { src: '/school3.jpg', alt: 'School 3' }
  ]}
  speed={1}
  visibleCount={8}
  className="h-96 w-full"
/>
```

**Features:**
- Scroll/keyboard navigation
- Auto-play after 3s inactivity
- Cloth-like folding on scroll
- Flag wave effect on hover
- Blur/fade depth effects

**NIRD Use Cases:**
- Immersive school photo gallery
- "Journey through the village" section
- Success stories showcase
- Community members display

---

### InteractiveImageGallery
**Path:** `src/components/ui/interactive-image-gallery.tsx`

Grid gallery with focus/blur effect on hover.

```tsx
import { InteractiveImageGallery } from '@/components/ui/interactive-image-gallery'

<InteractiveImageGallery
  items={[
    { id: '1', type: 'image', src: '/school1.jpg' },
    { id: '2', type: 'image', src: '/school2.jpg' },
    { id: '3', type: 'text', text: 'A message here' }
  ]}
/>
```

**NIRD Use Cases:**
- Mixed content gallery (images + text cards)
- School photo collection
- Feature showcase with descriptions

---

## Cursor Components

### InvertedCursor
**Path:** `src/components/ui/inverted-cursor.tsx`

Custom cursor with mix-blend-difference effect.

```tsx
import Cursor from '@/components/ui/inverted-cursor'

<Cursor size={60} />
```

**NIRD Use Cases:**
- Premium desktop experience
- Interactive exploration
- Visual polish

---

### SmoothCursor
**Path:** `src/components/ui/SmoothCursor.tsx`

Smooth-following custom cursor.

---

### TargetCursor
**Path:** `src/components/TargetCursor.tsx`

Crosshair-style targeting cursor.

**NIRD Use Cases:**
- Precision interactions
- Gaming aesthetic
- Call-to-action focus

---

## UI Components (shadcn/ui)

### Base Components
Located in `src/components/ui/`:

| Component | Path | Description |
|-----------|------|-------------|
| Button | `button.tsx` | Standard button variants |
| Card | `card.tsx` | Content container |
| Dialog | `dialog.tsx` | Modal dialogs |
| Badge | `badge.tsx` | Labels and tags |
| Avatar | `avatar.tsx` | User avatars |
| Carousel | `carousel.tsx` | Image carousel |
| Separator | `separator.tsx` | Visual dividers |

### Special Effects

| Component | Description | Best For |
|-----------|-------------|----------|
| `highlighter.tsx` | Text highlighting | Key terms |
| `GlowingEffect.tsx` | Glow on hover | CTAs |
| `PointerHighlight.tsx` | Mouse-following highlight | Interactive areas |
| `AnimatedModal.tsx` | Animated modal | Important content |
| `grid-pattern.tsx` | SVG grid background | Subtle patterns |

---

## Quick Reference: NIRD Theme Colors

Use these colors with components:

```tsx
const NIRD_COLORS = {
  forestGreen: '#2E7D32',   // Village, positive, NIRD
  gold: '#F9A825',          // Magic potion, accents
  romanRed: '#C62828',      // Big Tech, danger
  parchment: '#FFF8E1',     // Backgrounds
  darkBlue: '#1A237E',      // Headers, serious
}
```

---

## Component Selection Guide

### For Hero Section
- `NeonOrbs` or `Particles` for background
- `BlurText` or `SplitText` for title
- `ShatterButton` for CTA

### For Statistics
- `CountUp` for numbers
- `BentoGrid` for layout
- `PixelCard` for containers

### For Storytelling
- `ScrollReveal` for text
- `FadeContent` for sections
- `Waves` or `RetroGrid` for backgrounds

### For Testimonials
- `TestimonialSlider` for carousel
- `CometCard` for individual cards
- `Stack` for photo galleries

### For Interactive Choice
- `Stepper` for wizard flow
- `ShatterButton` for actions
- `ClickSpark` for feedback

---

## Performance Notes

Components with `targetFps` prop support frame rate limiting:
- `Squares` - default 30fps
- `RetroGrid` - default 30fps

For mobile optimization, consider:
- Reducing `particleCount` on `Particles`
- Disabling `autoRotate` on `SphereImageGrid`
- Using `memo` wrapper on heavy components
