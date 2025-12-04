# Village NIRD - Product Requirements Document (PRD)

> **Challenge:** La Nuit de l'Info 2025 - "Le Village Numérique Résistant"
> **Theme:** How can schools stand up to Big Tech? (David vs Goliath, Asterix vs Digital Empire)
> **Duration:** One night (December 4-5, 2025, sunset to sunrise ~12 hours)
> **Deadline:** Application must be online and accessible for judging by Friday morning

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Challenge Analysis](#2-challenge-analysis)
3. [Target Audience](#3-target-audience)
4. [Product Vision](#4-product-vision)
5. [User Stories](#5-user-stories)
6. [Technical Architecture](#6-technical-architecture)
7. [Feature Specifications](#7-feature-specifications)
8. [Content Requirements](#8-content-requirements)
9. [Design System](#9-design-system)
10. [Animation & Interaction Strategy](#10-animation--interaction-strategy)
11. [Implementation Roadmap](#11-implementation-roadmap)
12. [Success Metrics](#12-success-metrics)
13. [Risk Assessment](#13-risk-assessment)
14. [Appendices](#appendices)

---

## 1. Executive Summary

### 1.1 The Challenge

Create an engaging, interactive web application that:
- Helps schools understand how to reduce Big Tech dependency
- Promotes the NIRD movement (Numérique Inclusif, Responsable, Durable)
- Uses the Asterix vs Roman Empire metaphor creatively
- Provides a ludic, attractive, and engaging experience
- Must be online and functional for judging (~3 minutes per project)

### 1.2 Our Solution: "Le Village NIRD"

An **interactive scrollytelling experience** that takes users on a journey from crisis (Windows 10 end of life) to solution (NIRD adoption), using:

- **Narrative Framework:** Asterix village resistance metaphor
- **Core Mechanic:** Choice-based consequences ("What would YOUR school do?")
- **Visual Identity:** Comic-book aesthetic with forest green (village) vs red (empire)
- **Engagement:** Micro-interactions, animated statistics, success stories
- **Call to Action:** Clear path to join the NIRD community

### 1.3 Key Differentiators

| Feature | Why It Wins |
|---------|-------------|
| Interactive Choice System | Personal investment, see consequences of decisions |
| Asterix Cultural Resonance | Emotionally powerful for French audience |
| Real School Statistics | Credibility through concrete data (132 PCs, 11 schools) |
| Scrollytelling Narrative | Guides users through story, not just information dump |
| Professional Polish | shadcn/ui + Framer Motion = modern, accessible |

---

## 2. Challenge Analysis

### 2.1 Competition Requirements

| Requirement | Our Implementation |
|-------------|-------------------|
| Online at end of night | Vercel deployment (auto-deploy on push) |
| Web application format | Next.js 16 with App Router |
| Libre resources | Open source fonts, icons, CC-licensed images |
| Libre license | MIT License for our code |
| Ludic/engaging experience | Choice-based narrative + animations |
| Promote NIRD values | Core content around 3 pillars |

### 2.2 Judging Criteria (Researched)

Based on competition research, judges evaluate:

1. **Creativity & Innovation** (25%) - Unique approach to theme
2. **User Experience** (25%) - Intuitive, beautiful, accessible
3. **Technical Quality** (20%) - Clean code, no bugs, good architecture
4. **Theme Alignment** (20%) - How well it interprets the challenge
5. **Completeness** (10%) - Working features over broken promises

### 2.3 The 3-Minute Rule

**CRITICAL:** Judges have ~3 minutes per project. Our site must:
- Create immediate visual impact (hero section)
- Communicate purpose in <10 seconds
- Have ONE memorable "wow" feature
- Work flawlessly on first load
- Be mobile-responsive (judges may use phones)

### 2.4 NIRD Official Context

**What is NIRD?**
- **N**umérique **I**nclusif, **R**esponsable, **D**urable
- Teacher collective from Forge des Communs Numériques Éducatifs
- Born at Lycée Carnot de Bruay-la-Buissière
- 18 pilot schools across France (2025)
- Promotes Linux adoption to combat planned obsolescence

**The Crisis:**
- Windows 10 support ended October 14, 2025
- 240 million PCs worldwide face disposal
- Schools forced to upgrade hardware or pay recurring ESU fees
- Alternative: Free Linux distributions (PrimTux, Linux NIRD)

**Key Statistics to Feature:**
| Metric | Value | Context |
|--------|-------|---------|
| PCs facing disposal | 240 million | Worldwide e-waste |
| French gov PCs on Win10 | 68% | Vulnerable administration |
| Hardware lifespan (Linux) | 8-10 years | vs 3-5 years Windows |
| PCs reconditioned by Lycée Carnot | 132 | Distributed to 11 schools |
| Linux cost | €0 | vs €61/year ESU per PC |

---

## 3. Target Audience

### 3.1 Primary Audiences

| Audience | Motivation | Key Message |
|----------|------------|-------------|
| **Students** | Curiosity, activism, tech interest | "You can make a difference" |
| **Teachers** | Budget concerns, pedagogy, autonomy | "Regain control of your classroom" |
| **School Administrators** | Cost savings, compliance, reputation | "Save money while doing good" |
| **Parents/Families** | Children's education, sustainability | "Your child's school can lead" |
| **Local Government** | Budget management, policy | "Scalable solution for all schools" |

### 3.2 User Personas

**Persona 1: Sophie, NSI Teacher (35)**
- Teaches computer science at lycée
- Frustrated by Windows updates breaking lessons
- Wants digital sovereignty for students
- **Journey:** Crisis → "I knew it!" → Choice → "Let's try Linux" → Resources

**Persona 2: Marc, School Principal (52)**
- Manages 400-student lycée budget
- Pressure from région to cut costs
- Concerned about IT complexity
- **Journey:** Crisis → "How much will this cost?" → Calculator → "It's cheaper!" → Action plan

**Persona 3: Léa, Eco-Delegate Student (16)**
- Passionate about sustainability
- Active in school environmental club
- Wants concrete actions
- **Journey:** Crisis → "This is e-waste!" → Pillars → "I'll tell my teachers" → Share

### 3.3 User Journey Mapping

```
AWARENESS          UNDERSTANDING         DECISION            ACTION
    │                    │                  │                  │
    ▼                    ▼                  ▼                  ▼
[Hero Section]    [Crisis Section]    [Choice Section]    [Join Section]
"The problem      "Why it matters"    "What would YOU    "Here's how
exists"                               do?"                to start"
    │                    │                  │                  │
    └────────────────────┴──────────────────┴──────────────────┘
                    NIRD PILLARS (Inclusive, Responsible, Sustainable)
                              woven throughout
```

---

## 4. Product Vision

### 4.1 Vision Statement

> "Transform the complex issue of digital sovereignty into an engaging, emotional journey that empowers schools to join the NIRD resistance against Big Tech dependency."

### 4.2 Core Experience Principles

1. **Storytelling Over Information**
   - Users experience a narrative, not a brochure
   - Each section advances the "resistance" story
   - Characters (inspired by Asterix archetypes) guide the journey

2. **Choice Creates Investment**
   - "What would YOUR school do?" is the central mechanic
   - Seeing consequences of choices creates emotional connection
   - Multiple paths show different outcomes

3. **Data Makes It Real**
   - Abstract concepts backed by concrete statistics
   - Real schools, real numbers, real impact
   - Cost calculators personalize the message

4. **Delight Through Details**
   - Micro-interactions reward exploration
   - Smooth animations create premium feel
   - Hidden details for engaged users

5. **Clear Call to Action**
   - Every section points toward joining NIRD
   - Links to official resources
   - Easy first steps for each audience

### 4.3 The Asterix Metaphor Framework

| Asterix World | Digital World | Visual Treatment |
|---------------|---------------|------------------|
| Gaulish Village | School adopting NIRD | Warm greens, wood, community |
| Roman Empire | Big Tech monopoly | Cold reds, metal, corporate |
| Magic Potion | Linux + Open Source | Gold glow, sparkles, power |
| Panoramix (Druid) | Open Source Community | Wise, collaborative |
| Village Palisade | Firewall / Data Sovereignty | Protective, strong |
| Roman Camps | Big Tech HQ | Threatening, surrounding |
| Tux (Dogmatix) | Linux Mascot | Friendly, faithful |

### 4.4 Emotional Journey Map

```
OPENING     →    CONCERN    →    REALIZATION    →    EMPOWERMENT    →    ACTION
"Wow!"           "Oh no!"        "Wait, there's     "I can do        "Let's go!"
                                 a solution!"        this!"
   │                │                  │                 │                 │
[Hero]          [Crisis]         [Solution]        [Pillars]         [Join]
Epic visual     Statistics       Linux reveal      Explore huts     CTA buttons
Asterix         Windows EOL      Magic potion      3 pillars        Official links
opening         Cost impact      Community         Real stories     Next steps
```

### 4.5 The NIRD Three-Stage Journey ("La Démarche")

> **Aligned with Official NIRD Roadmap:** The user journey maps to NIRD's official three-stage implementation process for schools.

| Stage | NIRD Term | User Action | App Feature |
|-------|-----------|-------------|-------------|
| **Jalon 1** | Mobilization | Awareness, identify as potential "NIRD contact" | Hero + Crisis sections, "Join the Resistance" signup |
| **Jalon 2** | Experimentation | Learn about Linux, see the process | Choice section, "Refurbish & Liberate" mini-game |
| **Jalon 3** | Integration | Commit to action, access resources | Calculator, CTAs to official NIRD resources |

**Stage 1: Mobilization (Raising Awareness)**
- User discovers the Windows 10 crisis
- Sees real statistics and impact
- Identifies with the "resistance" narrative
- Becomes a potential "NIRD contact" for their school

**Stage 2: Experimentation (Hands-On Learning)**
- User makes a choice (A/B/C)
- Sees consequences of each path
- Explores NIRD pillars in detail
- Optionally tries "Refurbish & Liberate" mini-game

**Stage 3: Integration (Taking Action)**
- User calculates savings for their school
- Reads success stories from real schools
- Clicks through to official NIRD resources
- Shares with their community

---

## 5. User Stories

### 5.1 Epic: Discover NIRD

**US-1.1: First Impression**
> As a visitor, I want to immediately understand that this site is about schools resisting Big Tech, so that I know if this content is relevant to me.

**Acceptance Criteria:**
- [ ] Hero headline visible within 1 second
- [ ] Asterix/village metaphor immediately clear
- [ ] "NIRD" term introduced with explanation
- [ ] Scroll indicator invites exploration

**US-1.2: Understand the Crisis**
> As a teacher, I want to understand why Windows 10 end-of-life matters, so that I can appreciate the urgency of the problem.

**Acceptance Criteria:**
- [ ] Key statistics displayed with context
- [ ] Visual distinction between "danger" and "opportunity"
- [ ] Scroll-triggered animations draw attention to numbers
- [ ] Mobile-readable statistics

**US-1.3: Make My Choice**
> As a school administrator, I want to see the consequences of different choices, so that I can make an informed decision for my school.

**Acceptance Criteria:**
- [ ] 3 clear choice options presented
- [ ] Each choice leads to different consequences display
- [ ] Cost implications shown for each path
- [ ] Timeline implications shown for each path

### 5.2 Epic: Explore NIRD Pillars

**US-2.1: Inclusive Pillar**
> As a parent, I want to understand how NIRD promotes inclusive technology, so that I know my child won't be left behind.

**Acceptance Criteria:**
- [ ] "Inclusif" pillar clickable/expandable
- [ ] Examples of reconditioning projects
- [ ] Student involvement highlighted
- [ ] Digital divide context explained

**US-2.2: Responsible Pillar**
> As an IT administrator, I want to understand data sovereignty benefits, so that I can address GDPR compliance concerns.

**Acceptance Criteria:**
- [ ] "Responsable" pillar explains data control
- [ ] Open source software alternatives listed
- [ ] Contrast with Big Tech data practices
- [ ] European/French sovereignty context

**US-2.3: Sustainable Pillar**
> As an eco-delegate, I want to see environmental impact data, so that I can advocate for NIRD at my school.

**Acceptance Criteria:**
- [ ] "Durable" pillar shows environmental benefits
- [ ] Hardware lifespan comparison (3-5 years vs 8-10)
- [ ] E-waste prevention statistics
- [ ] Energy consumption differences

### 5.3 Epic: Take Action

**US-3.1: Join the Movement**
> As an interested teacher, I want clear next steps to join NIRD, so that I don't have to figure it out myself.

**Acceptance Criteria:**
- [ ] Primary CTA links to official NIRD site
- [ ] Secondary CTA for community (Tchap forum)
- [ ] Resources for different audiences (teacher, admin, student)
- [ ] Share functionality for spreading the word

**US-3.2: See Success Stories**
> As a skeptical administrator, I want to see real schools that succeeded with NIRD, so that I trust this approach works.

**Acceptance Criteria:**
- [ ] Testimonials from real schools
- [ ] Specific metrics (132 PCs, 11 schools)
- [ ] Before/after comparisons
- [ ] Geographic diversity shown

---

## 6. Technical Architecture

### 6.1 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | Next.js 16.0.7 | App Router, Turbopack, React Compiler |
| Runtime | React 19.2 | Latest features, concurrent rendering |
| Language | TypeScript 5 | Type safety, better DX |
| Styling | Tailwind CSS 4 | Utility-first, fast development |
| Components | shadcn/ui | Accessible, customizable, modern |
| Animation | Framer Motion 12 | React-native animations, scroll triggers |
| Scroll Effects | GSAP ScrollTrigger | Complex scroll animations, pinning |
| State | Zustand 5 | Simple, performant state management |
| 3D (optional) | Three.js + R3F | Village visualization if time permits |
| Icons | Lucide React | Consistent, comprehensive icon set |
| Deployment | Vercel | Instant deploys, free tier |

### 6.2 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main scrollytelling page
│   ├── layout.tsx            # Root layout with providers
│   └── globals.css           # Theme + animation definitions
│
├── components/
│   ├── sections/             # Page sections (extracted)
│   │   ├── HeroSection.tsx
│   │   ├── CrisisSection.tsx
│   │   ├── ChoiceSection.tsx
│   │   ├── ConsequencesSection.tsx
│   │   ├── PillarsSection.tsx
│   │   ├── SuccessSection.tsx
│   │   └── JoinSection.tsx
│   │
│   ├── village/              # Asterix-themed components
│   │   ├── VillageMap.tsx
│   │   ├── Hut.tsx
│   │   └── Character.tsx
│   │
│   ├── interactive/          # Choice mechanics
│   │   ├── ChoiceCard.tsx
│   │   ├── ConsequenceDisplay.tsx
│   │   └── CostCalculator.tsx
│   │
│   └── ui/                   # shadcn + custom components
│
├── store/
│   └── choiceStore.ts        # User choice state (Zustand)
│
├── data/
│   ├── statistics.ts         # Key metrics
│   ├── schools.ts            # Success stories
│   ├── choices.ts            # Choice options + consequences
│   └── pillars.ts            # NIRD pillar content
│
├── constants/
│   └── animations.ts         # Framer Motion variants
│
├── hooks/
│   ├── useMediaQuery.ts
│   ├── useScrollProgress.ts
│   └── usePerformanceMonitor.ts
│
└── types/
    └── index.ts              # Shared TypeScript interfaces
```

### 6.3 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        User Journey                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Zustand Store                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ userChoice   │  │ selectedPillar│  │ scrollProgress   │  │
│  │ 'A'|'B'|'C' │  │ 'I'|'R'|'D'  │  │ 0-100%           │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
           ┌──────────────────┼──────────────────┐
           ▼                  ▼                  ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ ConsequencesSection│ │  PillarsSection │ │ ScrollProgress  │
│ Renders based   │  │ Expands based   │  │ UI indicator    │
│ on userChoice   │  │ on pillar       │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 6.4 Component Hierarchy

```
<RootLayout>
  <ThemeProvider>
    <main>
      <HeroSection />

      <CrisisSection>
        <StatisticCard /> (×4)
        <AnimatedCounter />
      </CrisisSection>

      <ChoiceSection>
        <ChoiceCard option="A" /> (Keep Windows)
        <ChoiceCard option="B" /> (Go Linux)
        <ChoiceCard option="C" /> (Do Nothing)
      </ChoiceSection>

      <ConsequencesSection>
        <ConsequenceDisplay choice={userChoice} />
        <CostCalculator />
      </ConsequencesSection>

      <PillarsSection>
        <Hut pillar="inclusive" />
        <Hut pillar="responsible" />
        <Hut pillar="sustainable" />
        <PillarDetail pillar={selectedPillar} />
      </PillarsSection>

      <SuccessSection>
        <TestimonialCard /> (×3)
        <SchoolStats />
      </SuccessSection>

      <JoinSection>
        <CTAButton primary />
        <CTAButton secondary />
      </JoinSection>

      <Footer />
    </main>
    <Toaster />
  </ThemeProvider>
</RootLayout>
```

### 6.5 Green IT & Eco-Conception Strategy

> **Critical for O2 Switch Challenge:** The "Green it!" challenge is highly technical. Achieving EcoIndex Grade A while delivering a rich experience is the central strategic challenge.

#### 6.5.1 Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| EcoIndex Score | Grade A or B | EcoIndex.fr |
| Page Weight | < 1MB (initial load) | Lighthouse |
| Lighthouse Performance | > 95 | Lighthouse |
| First Contentful Paint | < 1.5s | Web Vitals |
| DOM Elements | < 1000 | DevTools |
| HTTP Requests | < 25 | DevTools |

#### 6.5.2 3D Optimization: "On-Demand" Rendering

Standard 3D apps render at 60 FPS, draining battery. We use **demand-based rendering**:

```typescript
// R3F Canvas with demand-based rendering
<Canvas frameloop="demand">
  {/* Scene only re-renders when:
    - User interacts (mouse, click)
    - State changes
    - Camera moves
  */}
</Canvas>
```

**Impact:** When user reads text, GPU usage drops to near zero.

#### 6.5.3 Asset Optimization Pipeline

| Asset Type | Optimization | Size Reduction |
|------------|--------------|----------------|
| 3D Models | Draco compression via gltf-pipeline | ~90% (5MB -> 500KB) |
| Images | AVIF format, WebP fallback | ~70% |
| Fonts | WOFF2, subsetting to used characters | ~80% |
| Textures | Baked lighting (no real-time shadows) | Eliminates GPU load |

#### 6.5.4 "Low Carbon Mode" Toggle (WOW Feature)

A persistent toggle that:
1. **Default ON:** Full experience with 3D and animations
2. **Eco Mode:** Disables 3D Canvas, replaces with static SVG illustrations
3. **Shows metrics:** "CO2 saved this session"

```typescript
// Green Monitor HUD concept
interface GreenMonitor {
  co2Emitted: number;      // grams
  waterConsumed: number;   // mL
  requestsMade: number;
  lowCarbonMode: boolean;
}
```

#### 6.5.5 Implementation Checklist

- [ ] `<Canvas frameloop="demand">` active
- [ ] All textures baked and compressed to WebP/AVIF
- [ ] GLB files Draco-compressed
- [ ] `next/script` with `strategy="lazyOnload"` for non-essentials
- [ ] `Cache-Control: immutable` headers for static assets
- [ ] No third-party trackers (Google Analytics prohibited)
- [ ] Font subsetting applied

---

## 7. Feature Specifications

### 7.1 Hero Section

**Purpose:** Create immediate impact, establish Asterix metaphor

**Content:**
```
"Nous sommes en 2025. Toutes les écoles françaises sont occupées
par Big Tech... Toutes ? Non ! Un village d'irréductibles enseignants
et élèves résiste encore à l'envahisseur numérique."
```

**Elements:**
- [ ] Full-viewport height
- [ ] Animated text reveal (word by word)
- [ ] Background: Parchment texture with village silhouette
- [ ] Empire vs Village visual contrast
- [ ] CTA: "Découvrir le Village NIRD"
- [ ] Scroll indicator (animated down arrow)

**Animations:**
- Text appears with staggered fade-in (Framer Motion)
- Background parallax on scroll
- CTA button hover: lift + glow effect

### 7.2 Crisis Section

**Purpose:** Establish urgency, present the problem

**Statistics to Display:**
| Statistic | Value | Color | Animation |
|-----------|-------|-------|-----------|
| Windows 10 EOL | 14 Oct 2025 | Red | Pulse |
| PCs at risk | 240M worldwide | Red | Count up |
| French gov affected | 68% | Orange | Count up |
| Linux cost | €0 | Green | Bounce |

**Elements:**
- [ ] Section title: "La Crise du Numérique"
- [ ] 4-column grid (2 on mobile)
- [ ] Each stat in card with icon
- [ ] Color-coded by severity (red/orange/green)
- [ ] "Source" footnotes for credibility

**Animations:**
- Cards stagger in on scroll (Framer Motion `whileInView`)
- Numbers count up when visible (CountUp component)
- Cards hover: lift + shadow

### 7.3 Choice Section

**Purpose:** Core interactive mechanic - personal investment

**The Question:**
> "Votre école fait face à cette crise. Que choisissez-vous ?"

**Options:**

| Choice | Title | Description | Consequence Preview |
|--------|-------|-------------|---------------------|
| A | Payer pour rester | ESU + hardware upgrades | €300-800/PC + recurring |
| B | Rejoindre le Village | Linux + open source | €0 + freedom |
| C | Ne rien faire | Ignore the problem | Security risk + forced upgrade later |

**Elements:**
- [ ] Large, clickable choice cards
- [ ] Hover state shows brief consequence preview
- [ ] Selection triggers animated transition
- [ ] Selected card expands, others fade
- [ ] Progress to Consequences section

**Interactions:**
- Click to select (store in Zustand)
- Hover preview (tooltip or card expansion)
- Selection animation (Framer Motion `layoutId`)
- Scroll to consequences after selection

### 7.4 Consequences Section

**Purpose:** Show impact of user's choice

**Display Logic:**
```typescript
if (choice === 'A') {
  show: Windows path costs, recurring fees, vendor lock-in
}
if (choice === 'B') {
  show: Linux benefits, savings calculator, freedom metrics
}
if (choice === 'C') {
  show: Risks, eventual forced upgrade, higher total cost
}
```

**Elements:**
- [ ] Conditional rendering based on choice
- [ ] Cost breakdown (Year 1, Year 3, Year 5)
- [ ] Interactive calculator (school size slider)
- [ ] Comparison chart (selected vs alternatives)
- [ ] "Reconsider" button to go back

**Data Visualization:**
- Bar chart: 5-year TCO comparison
- Timeline: Migration milestones
- Counter: Potential savings

### 7.5 Pillars Section

**Purpose:** Deep dive into NIRD values

**Three Huts (Village Map Concept):**

| Pillar | Icon | Color | Key Message |
|--------|------|-------|-------------|
| Inclusif | Users | Blue | "Tech for everyone" |
| Responsable | Shield | Purple | "Control your data" |
| Durable | Leaf | Green | "Make hardware last" |

**Elements:**
- [ ] Visual village map layout
- [ ] 3 clickable huts
- [ ] Hover shows pillar name
- [ ] Click expands detail panel
- [ ] Detail includes: description, examples, actions

**Detail Content per Pillar:**

**Inclusif:**
- Reconditioning projects (students → younger students)
- 132 PCs delivered to 11 schools
- Raspberry Pi energy efficiency
- Digital divide reduction

**Responsable:**
- Open source alternatives list
- Data sovereignty (France/EU)
- GDPR compliance
- Educational choice vs captivity

**Durable:**
- 8-10 year lifespan vs 3-5 years
- €30 SSD transformation
- E-waste prevention
- Carbon footprint reduction

### 7.6 Success Stories Section

**Purpose:** Social proof, real-world validation

**Featured Schools:**

| School | Region | Achievement | Quote |
|--------|--------|-------------|-------|
| Lycée Carnot | Bruay-la-Buissière | 132 PCs reconditioned | "Les élèves sont acteurs du changement" |
| École Primaire Fouquières | Fouquières-lès-Béthune | 14 PCs with PrimTux | "Nos vieux ordinateurs sont plus rapides qu'avant" |
| Collège Example | Region | Metrics | "Quote" |

**Elements:**
- [ ] Testimonial cards (carousel on mobile)
- [ ] School name, location, photo
- [ ] Key metric highlight
- [ ] Quote from teacher/admin
- [ ] "Read more" links to Café Pédagogique article

**Animations:**
- Cards slide in on scroll
- Quote text types out
- Stats count up

### 7.7 Join Section

**Purpose:** Clear call to action

**CTAs:**

| CTA | Label | Link | Style |
|-----|-------|------|-------|
| Primary | "Rejoindre le Village NIRD" | nird.forge.apps.education.fr | Large, green, prominent |
| Secondary | "Rejoindre la communauté Tchap" | Tchap forum link | Outline style |
| Tertiary | "Télécharger Linux NIRD" | Linux download page | Text link |

**Elements:**
- [ ] Dark green background (village colors)
- [ ] Compelling headline: "Prêt à résister ?"
- [ ] Subheadline with benefit
- [ ] Primary CTA button (animated)
- [ ] Secondary options below
- [ ] Social share buttons (optional)

### 7.8 Footer

**Purpose:** Attribution, additional links

**Elements:**
- [ ] "Créé pour La Nuit de l'Info 2025"
- [ ] Team name/members
- [ ] GitHub link (open source)
- [ ] NIRD official link
- [ ] License notice (MIT)

### 7.9 Gamification Features (Stretch Goals)

> **Partner Challenges:** These features address specific competition challenges from Laser Game Evolution ("La Zerguèm") and Viveris ("Chat'bruti").

#### 7.9.1 "Refurbish & Liberate" Mini-Game

**Objective:** Teaches the hardware/software distinction and the value of refurbishment.

**Gameplay Loop:**
1. An old, dusty PC appears on screen (3D model or illustration)
2. **Diagnosis:** User clicks to inspect components. "HDD is slow," "RAM is low"
3. **Action:** User drags and drops a "Linux NIRD USB Key" to the PC
4. **Result:** Screen boots into Linux NIRD desktop (screenshot integration). PC turns green

**Reward:** User earns "Resistance Credits" and unlocks a badge

**Tech:** Drag & Drop API + state transitions

#### 7.9.2 "Chat'bruti vs Resistance Bot" (Chatbot Challenge)

**Concept:** A dual-mode chatbot demonstrating Big Tech vs NIRD approaches.

| Mode | Persona | Behavior |
|------|---------|----------|
| Mode 1 | "Big Tech Salesbot" (Clippy's Evil Twin) | Corporate jargon, refuses repair questions |
| Mode 2 | "Resistance Bot" (Tux/Pangolin mascot) | Interrupts Salesbot with real NIRD answers |

**Interaction:** User "defeats" the bot in a debate by selecting correct NIRD arguments:
- "Linux is free"
- "Data stays in France"
- "Hardware lasts 10+ years"

**Result:** Winning crashes the Salesbot (glitch animation) and replaces with helpful Resistance Bot.

**Tech:** Decision tree with scripted responses (no LLM required)

#### 7.9.3 "Digital Laser Tag" (La Zerguèm)

**Concept:** Mini-game overlaid on 3D village (if implemented)

**Mechanic:**
- "Bugs" (Windows icons, data leeches) attack the school's server room
- User controls a "Linux Turret" (mascot)
- Shoot "Open Source Patches" (lasers) at bugs to defend

**Tech:** R3F Canvas with simple raycasting for hit detection

**Reward:** High scores unlock simulated "Laser Game Pass" coupon

#### 7.9.4 Implementation Priority

| Feature | Priority | Complexity | Challenge Addressed |
|---------|----------|------------|---------------------|
| Refurbish Mini-Game | High | Medium | Core engagement |
| Chat'bruti Chatbot | Medium | Low | Viveris challenge |
| Laser Tag | Low | High | Laser Game Evolution |

---

## 8. Content Requirements

### 8.1 Copywriting Tone

**Voice:** Inspiring, urgent, empowering
**Tone:** Serious problem, hopeful solution, playful Asterix references
**Language:** French (primary), accessible to all education levels

### 8.2 Key Messages to Convey

1. **The crisis is real and urgent** - October 2025 has arrived
2. **A solution EXISTS** - Linux + open source = free + often superior
3. **Schools are already doing this** - NIRD has proven results
4. **It's more than money** - Freedom, sovereignty, sustainability
5. **Anyone can start** - Concrete first steps exist
6. **Join a community** - You're not alone

### 8.3 Asterix-Inspired Copy Examples

**Hero:**
> "Nous sommes en 2025. Toutes les écoles françaises sont occupées par Big Tech... Toutes ? Non ! Un village d'irréductibles enseignants et élèves résiste encore à l'envahisseur numérique."

**Crisis:**
> "L'Empire numérique exige son tribut : 240 millions d'ordinateurs jetés, des licences payées à l'infini, vos données stockées hors de nos frontières."

**Solution:**
> "La Communauté du Libre a créé la potion magique : Linux. Gratuit. Puissant. Éternel. Un ordinateur sous Linux ne vieillit jamais."

**Join:**
> "Rejoignez le village NIRD. Ensemble, l'irréductibilité numérique est possible."

### 8.4 Statistics Data Source

All statistics must be sourceable:

| Statistic | Value | Source |
|-----------|-------|--------|
| Windows 10 EOL | Oct 14, 2025 | Microsoft official |
| 240M PCs | E-waste risk | Canalys research |
| 68% French gov | On Windows 10 | NIRD documentation |
| 132 PCs | Reconditioned | Café Pédagogique article |
| 11 schools | Received PCs | Café Pédagogique article |
| €61/year | ESU business | Microsoft pricing |
| €0 | Linux cost | Open source |

---

## 9. Design System

### 9.1 Color Palette - "Emerald Resistance" Theme

> **Design Note:** Inspired by Juliette Taka's "Emerald" theme for Debian 12. This creates visual cohesion with Linux NIRD's actual OS wallpaper and bridges "Institutional Credibility" with "Hacker/Resistance Culture."

**Village (Positive/NIRD) - Primary:**
| Name | Hex | Usage | Meaning |
|------|-----|-------|---------|
| Emerald Green | #00997d | Primary buttons, success states | Sustainability, NIRD identity |
| Forest Green | #2E7D32 | Secondary actions | Nature, growth |
| Gold | #F9A825 | Accents, magic potion | Power, transformation |
| Parchment | #FFF8E1 | Light backgrounds | Clarity, paper metaphor |
| Soft White | #f4f4f9 | Text backgrounds | Clean, minimal |

**Empire (Negative/Big Tech):**
| Name | Hex | Usage | Meaning |
|------|-----|-------|---------|
| Roman Red | #C62828 | Danger, warnings | Big Tech threat |
| Resistance Orange | #ff8c00 | CTAs, alerts | Urgency, action ("The Fire") |
| Dark Blue | #1A237E | Corporate, serious | Big Tech coldness |
| Steel Gray | #455A64 | Neutral, industrial | Empire machinery |

**Technology/Linux:**
| Name | Hex | Usage | Meaning |
|------|-----|-------|---------|
| Slate Blue | #4a697d | Backgrounds, footer | Technology, Linux stability |
| Deep Mineral | #1a1a1d | Dark mode background | Hardware, "The Forge" |

**Semantic:**
| Name | Hex | Usage |
|------|-----|-------|
| Danger | #C62828 | Critical statistics |
| Warning | #ff8c00 | Cautionary metrics |
| Success | #00997d | Positive outcomes |
| Info | #4a697d | Neutral information |

### 9.2 Typography

**Display (Headlines):**
- Font: System UI or "Fredoka Bold" (if loaded)
- Weight: 700-900
- Tracking: 0.02em
- Style: Slightly rounded for approachability

**Body:**
- Font: "Inter" or system sans-serif
- Weight: 400-600
- Line height: 1.6
- Max width: 65ch for readability

**Code/Stats:**
- Font: "JetBrains Mono" or monospace
- Used for: Statistics, counters

### 9.3 Spacing Scale

Using Tailwind defaults:
- Section padding: `py-16 md:py-24`
- Container max-width: `max-w-7xl`
- Card padding: `p-6 md:p-8`
- Gap between elements: `gap-4 md:gap-8`

### 9.4 Component Styles

**Cards:**
```css
/* Village card (positive) */
.village-card {
  background: var(--nird-parchment);
  border: 3px solid var(--nird-forest-green);
  border-radius: 1rem;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.1);
}

/* Empire card (negative) */
.empire-card {
  background: var(--steel-gray);
  border: 3px solid var(--nird-roman-red);
  border-radius: 0;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
}
```

**Buttons:**
- Primary: Forest green background, white text, hover lift
- Secondary: Outline style, forest green border
- Danger: Roman red background, white text

**Speech Bubbles (Asterix style):**
```css
.speech-bubble {
  border: 3px solid var(--nird-forest-green);
  border-radius: 20px 20px 20px 5px;
  background: var(--nird-parchment);
  position: relative;
}
/* Pointer triangle via ::after */
```

### 9.5 Iconography

Using Lucide React icons:
- Inclusive: `Users`, `Heart`, `HandHelping`
- Responsible: `Shield`, `Lock`, `Database`
- Sustainable: `Leaf`, `Recycle`, `TreeDeciduous`
- Crisis: `AlertTriangle`, `TrendingDown`, `XCircle`
- Success: `CheckCircle`, `TrendingUp`, `Award`
- Navigation: `ChevronDown`, `ArrowRight`, `ExternalLink`

---

## 10. Animation & Interaction Strategy

### 10.1 Animation Philosophy

**Principles:**
1. **Purposeful** - Every animation serves the narrative
2. **Performant** - 60fps or no animation
3. **Subtle** - Enhance, don't distract
4. **Accessible** - Respect reduced motion preference

### 10.2 Animation Library Usage

**Framer Motion (Primary):**
- Entry/exit animations
- Scroll-triggered reveals
- Layout animations
- Hover/tap interactions

**GSAP ScrollTrigger (Complex Effects):**
- Section pinning
- Parallax backgrounds
- Timeline coordination

**CSS (Simple Transitions):**
- Hover states
- Focus states
- Color transitions

### 10.3 Animation Inventory

| Element | Trigger | Animation | Duration |
|---------|---------|-----------|----------|
| Hero text | On load | Staggered fade-in | 1.5s total |
| Scroll indicator | Loop | Bounce down | 2s infinite |
| Stat cards | In viewport | Stagger slide-up | 0.3s each |
| Number counters | In viewport | Count up | 1.5s |
| Choice cards | Hover | Lift + shadow | 0.2s |
| Choice selection | Click | Expand + fade others | 0.4s |
| Consequences | Choice made | Slide in from right | 0.5s |
| Pillars/Huts | Hover | Scale up + glow | 0.2s |
| Pillar detail | Click | Expand accordion | 0.3s |
| Testimonial cards | In viewport | Stagger fade | 0.3s each |
| CTA button | Hover | Pulse + lift | 0.2s |

### 10.4 Scroll Behavior

**Smooth Scrolling:**
- Enable via CSS `scroll-behavior: smooth`
- Lenis library for extra smoothness (optional)

**Section Snap (Optional):**
- CSS `scroll-snap-type: y proximity`
- Each section as snap point

**Parallax:**
- Hero background moves slower than content
- Village elements have depth layers

### 10.5 Performance Optimization

**Best Practices:**
- Use `transform` and `opacity` only (GPU accelerated)
- Lazy load animations for below-fold sections
- Use `will-change` sparingly
- Test on throttled CPU (4x slowdown)
- Respect `prefers-reduced-motion`

```typescript
// Reduced motion check
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

// Conditional animations
const variants = prefersReducedMotion
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
```

---

## 11. Implementation Roadmap

### 11.1 Phase Overview (One Night)

| Phase | Hours | Focus | Deliverables |
|-------|-------|-------|--------------|
| 1. Setup | 0-1 | Foundation | Data files, store, structure |
| 2. Core | 1-4 | Essential sections | Hero, Crisis, Choice, Join |
| 3. Interactive | 4-7 | Key mechanic | Consequences, Calculator |
| 4. Polish | 7-10 | Animations | Scroll effects, micro-interactions |
| 5. Deploy | 10-11 | Launch | Vercel, testing, fixes |
| 6. Rest | 11-12 | Buffer | Bug fixes, final polish |

### 11.2 Phase 1: Setup (Hour 0-1)

**Tasks:**
- [ ] Create data files (statistics.ts, schools.ts, choices.ts)
- [ ] Implement Zustand store (choiceStore.ts)
- [ ] Extract existing sections to components
- [ ] Verify deployment works (push to Vercel)

**Files to Create:**
```
src/data/statistics.ts
src/data/schools.ts
src/data/choices.ts
src/data/pillars.ts
src/store/choiceStore.ts
src/components/sections/HeroSection.tsx
src/components/sections/CrisisSection.tsx
src/components/sections/ChoiceSection.tsx
src/components/sections/ConsequencesSection.tsx
src/components/sections/PillarsSection.tsx
src/components/sections/SuccessSection.tsx
src/components/sections/JoinSection.tsx
```

### 11.3 Phase 2: Core Sections (Hour 1-4)

**Tasks:**
- [ ] Hero section with Asterix opening
- [ ] Crisis section with 4 statistics
- [ ] Basic Choice section (3 options)
- [ ] Join section with CTAs
- [ ] Footer

**Priority:** Get a complete, scrollable story working

### 11.4 Phase 3: Interactive Features (Hour 4-7)

**Tasks:**
- [ ] Choice selection stores to Zustand
- [ ] Consequences section conditional rendering
- [ ] Cost calculator component
- [ ] Pillars section with expandable details
- [ ] Success stories section

**Priority:** The choice mechanic is the WOW factor

### 11.5 Phase 4: Animation Polish (Hour 7-10)

**Tasks:**
- [ ] Hero text animation (staggered reveal)
- [ ] Stat cards scroll animation
- [ ] Counter animations (count up)
- [ ] Choice card hover effects
- [ ] Section transitions
- [ ] Micro-interactions

**Priority:** Make it feel premium

### 11.6 Phase 5: Deploy & Test (Hour 10-11)

**Tasks:**
- [ ] Final Vercel deployment
- [ ] Mobile responsiveness check
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Lighthouse performance audit
- [ ] Fix critical bugs only

### 11.7 Phase 6: Buffer (Hour 11-12)

**Tasks:**
- [ ] Address any judging prep
- [ ] Final content review
- [ ] Rest before judging begins

### 11.8 Risk Mitigation Checkpoints

| Hour | Checkpoint | Fallback if Behind |
|------|------------|-------------------|
| 2 | Core sections scaffolded? | Skip Consequences, simplify |
| 4 | Choice mechanic working? | Make it static display |
| 6 | Animations started? | Ship without animations |
| 8 | Mobile tested? | Add viewport meta only |
| 10 | Deployed successfully? | Debug deploy issues immediately |

---

## 12. Success Metrics

### 12.1 Judging Success Criteria

| Criterion | Target | Measurement |
|-----------|--------|-------------|
| First Impression | <3 seconds to understand | Hero clarity |
| WOW Factor | 1 memorable feature | Choice consequences |
| Functionality | Zero crashes | Manual testing |
| Mobile | Works on phone | Responsive testing |
| Theme Alignment | Clear Asterix metaphor | Visual language |
| Message Clarity | NIRD values understood | Content quality |

### 12.2 Technical Quality Metrics

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Performance | >80 | Lighthouse |
| Lighthouse Accessibility | >90 | Lighthouse |
| First Contentful Paint | <1.5s | Web Vitals |
| Largest Contentful Paint | <2.5s | Web Vitals |
| No Console Errors | 0 | DevTools |
| TypeScript Errors | 0 | `pnpm build` |

### 12.3 User Experience Metrics (Ideal)

| Metric | Target | How |
|--------|--------|-----|
| Scroll Completion | >60% reach Join | ScrollProgress |
| Choice Interaction | >40% make a choice | Analytics |
| CTA Clicks | >10% click primary | Analytics |

---

## 13. Risk Assessment

### 13.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Animation performance issues | Medium | High | Test early, have fallbacks |
| Build/deploy failure | Low | Critical | Test deploy in Phase 1 |
| Mobile breakage | Medium | High | Mobile-first, test on device |
| State management bugs | Medium | Medium | Keep store simple |
| Component library issues | Low | Medium | Use proven shadcn patterns |

### 13.2 Content Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Asterix copyright concerns | Low | Medium | Create original characters |
| Statistics outdated | Low | Low | Use official sources only |
| French language errors | Low | Low | Native speaker review |

### 13.3 Competition Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Scope creep | High | High | Strict phase gates |
| Team fatigue | High | Medium | Schedule breaks |
| Other teams same concept | Medium | Low | Execution > idea |

---

## Appendices

### A. Data Schema Definitions

```typescript
// src/types/index.ts

export interface NIRDPillar {
  id: 'inclusive' | 'responsible' | 'sustainable';
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  details: string[];
  actions: string[];
}

export interface Statistic {
  id: string;
  value: string | number;
  label: string;
  context: string;
  type: 'danger' | 'warning' | 'success' | 'info';
  source?: string;
  animateAs?: 'counter' | 'date' | 'text';
}

export interface ChoiceOption {
  id: 'A' | 'B' | 'C';
  title: string;
  description: string;
  icon: LucideIcon;
  consequences: {
    cost: { year1: number; year3: number; year5: number };
    timeline: string;
    risks: string[];
    benefits: string[];
    freedom: 'low' | 'medium' | 'high';
    sustainability: 'low' | 'medium' | 'high';
  };
}

export interface School {
  id: string;
  name: string;
  location: string;
  type: 'lycee' | 'college' | 'ecole';
  pcsReconditioned: number;
  studentsImpacted: number;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface Character {
  id: string;
  name: string;
  archetype: string; // e.g., "The Pioneer", "The Druid"
  description: string;
  quote: string;
  role: string; // What they represent in NIRD
}
```

### B. Zustand Store Implementation

```typescript
// src/store/choiceStore.ts
import { create } from 'zustand';

type Choice = 'A' | 'B' | 'C' | null;
type Pillar = 'inclusive' | 'responsible' | 'sustainable' | null;

interface ChoiceStore {
  // User's selected choice
  userChoice: Choice;
  setUserChoice: (choice: Choice) => void;

  // Currently expanded pillar
  selectedPillar: Pillar;
  setSelectedPillar: (pillar: Pillar) => void;

  // Calculator inputs
  schoolSize: number;
  setSchoolSize: (size: number) => void;

  // Reset all
  reset: () => void;
}

export const useChoiceStore = create<ChoiceStore>((set) => ({
  userChoice: null,
  setUserChoice: (choice) => set({ userChoice: choice }),

  selectedPillar: null,
  setSelectedPillar: (pillar) => set({ selectedPillar: pillar }),

  schoolSize: 100,
  setSchoolSize: (size) => set({ schoolSize: size }),

  reset: () => set({
    userChoice: null,
    selectedPillar: null,
    schoolSize: 100,
  }),
}));
```

### C. Animation Variants Reference

```typescript
// src/constants/animations.ts

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
};

export const choiceCardVariants = {
  unselected: { opacity: 0.5, scale: 0.95 },
  selected: { opacity: 1, scale: 1 },
  exit: { opacity: 0, x: -50 },
};
```

### D. Resource Links

**Official NIRD:**
- Site: https://nird.forge.apps.education.fr/
- Linux: https://nird.forge.apps.education.fr/linux/
- Pilots: https://nird.forge.apps.education.fr/pilotes/

**Press Coverage:**
- Café Pédagogique: https://cafepedagogique.net/2025/04/27/bruay-labuissiere-voyage-au-centre-du-libre-educatif/
- ZDNet: https://www.zdnet.fr/blogs/l-esprit-libre/demarche-nird-dans-les-ecoles-precisions-sur-primtux-soutien-du-cnll-485787.htm

**Competition:**
- La Nuit de l'Info: https://www.nuitdelinfo.com/

**Linux Distributions:**
- PrimTux: https://primtux.fr/
- Linux NIRD: (download from official site)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-04 | Team | Initial PRD for competition |
| 1.1 | 2025-12-04 | Team | Added Emerald theme, Green IT strategy, gamification features, NIRD journey stages |

---

*This PRD was created for La Nuit de l'Info 2025. The project promotes NIRD (Numérique Inclusif, Responsable, Durable) and is released under MIT License.*
