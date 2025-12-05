'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Animation Components
import BlurText from '@/components/BlurText';
import SplitText from '@/components/SplitText';
import Shuffle from '@/components/Shuffle';
import Squares from '@/components/Squares';
import { GridPattern } from '@/components/ui/grid-pattern';

// =============================================================================
// VARIANT 1 - MINIMAL + BLUR TEXT (Apple-style clean)
// =============================================================================
function HeroMinimal() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-20">
      {/* Subtle grid pattern */}
      <GridPattern
        width={60}
        height={60}
        className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        strokeDasharray="4 4"
      />

      {/* Subtle gradient accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00997d]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00997d]/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Alert Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#C62828]/10 text-[#C62828] text-sm font-medium rounded-full">
            <span className="w-1.5 h-1.5 bg-[#C62828] rounded-full animate-pulse" />
            Octobre 2025 — Fin de Windows 10
          </span>
        </motion.div>

        {/* Main Title with BlurText */}
        <div className="mb-6">
          <BlurText
            text="Le Village qui Résiste"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight justify-center"
            delay={80}
            animateBy="words"
            direction="top"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          <span className="text-[#C62828] font-semibold">240 millions</span> de PCs menacés.
          Une solution existe : <span className="text-[#00997d] font-semibold">Linux</span>.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-[#00997d] text-white font-semibold rounded-full hover:bg-[#007d66] transition-all">
            Découvrir
          </button>
          <button className="px-8 py-4 bg-gray-100 text-gray-900 font-medium rounded-full hover:bg-gray-200 transition-all">
            En savoir plus
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// VARIANT 2 - SHUFFLE TEXT + ANIMATED SQUARES (Tech/Digital - Light Theme)
// =============================================================================
function HeroShuffle() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Animated squares background */}
      <div className="absolute inset-0 opacity-30">
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={50}
          borderColor="#00997d"
          hoverFillColor="#00997d"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/90" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#00997d]/10 text-[#00997d] text-sm font-mono rounded-full border border-[#00997d]/20">
            <span className="w-2 h-2 bg-[#00997d] rounded-full animate-pulse" />
            SYSTÈME: RÉSISTANCE ACTIVE
          </span>
        </motion.div>

        {/* Shuffle Title */}
        <div className="mb-4">
          <Shuffle
            text="LE VILLAGE"
            tag="h1"
            className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight font-sans"
            duration={0.4}
            shuffleTimes={3}
            stagger={0.02}
            triggerOnHover={false}
          />
        </div>

        <div className="mb-6">
          <Shuffle
            text="QUI RÉSISTE"
            tag="h2"
            className="text-4xl md:text-6xl font-black text-[#00997d] tracking-tight font-sans"
            duration={0.5}
            shuffleTimes={2}
            stagger={0.03}
            triggerOnHover={false}
          />
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          {[
            { value: '240M', label: 'PCs menacés', color: '#C62828' },
            { value: '€0', label: 'Linux', color: '#00997d' },
            { value: '+5ans', label: 'Durée de vie', color: '#F9A825' },
          ].map((stat) => (
            <div key={stat.label} className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <span className="font-mono font-bold mr-2" style={{ color: stat.color }}>{stat.value}</span>
              <span className="text-gray-600 text-sm">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-[#00997d] text-white font-bold rounded-xl hover:bg-[#007d66] transition-all font-mono shadow-lg shadow-[#00997d]/20">
            REJOINDRE_LA_RÉSISTANCE
          </button>
          <button className="px-8 py-4 bg-gray-100 text-gray-900 font-medium rounded-xl border border-gray-200 hover:bg-gray-200 transition-all font-mono">
            ./MINI-JEU
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// VARIANT 3 - SPLIT TEXT NARRATIVE (Asterix storytelling)
// =============================================================================
function HeroNarrative() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#FFF8E1] overflow-hidden pt-20">
      {/* Parchment texture pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-4 border-t-4 border-[#8B4513]/30 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-4 border-t-4 border-[#8B4513]/30 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-4 border-b-4 border-[#8B4513]/30 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-4 border-b-4 border-[#8B4513]/30 rounded-br-lg" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Opening narrative */}
        <div className="mb-6">
          <SplitText
            text="Nous sommes en 2025..."
            tag="p"
            className="text-xl md:text-2xl text-[#8B4513] font-serif italic"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            duration={0.5}
            delay={150}
          />
        </div>

        <div className="mb-8">
          <SplitText
            text="Toute la France est occupée par Big Tech."
            tag="p"
            className="text-lg md:text-xl text-[#5D4037] font-serif"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            duration={0.5}
            delay={100}
          />
        </div>

        {/* Main titles */}
        <div className="mb-4">
          <SplitText
            text="Toute ?"
            tag="h2"
            className="text-4xl md:text-5xl font-black text-[#F9A825] font-serif"
            splitType="chars"
            from={{ opacity: 0, scale: 0.5 }}
            to={{ opacity: 1, scale: 1 }}
            duration={0.4}
            delay={80}
          />
        </div>

        <div className="mb-8">
          <SplitText
            text="NON !"
            tag="h1"
            className="text-6xl md:text-8xl font-black text-[#00997d]"
            splitType="chars"
            from={{ opacity: 0, y: 50, rotateX: -90 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            duration={0.6}
            delay={100}
          />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-lg text-[#5D4037] max-w-xl mx-auto mb-10 font-serif leading-relaxed"
        >
          Un village d&apos;irréductibles enseignants résiste encore et toujours à l&apos;envahisseur.
          Leur potion magique ? <strong className="text-[#00997d]">Le logiciel libre.</strong>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
        >
          <button className="px-10 py-4 bg-gradient-to-r from-[#F9A825] to-[#00997d] text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all">
            Rejoindre la Résistance
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// VARIANT 4 - MODERN GRADIENT (Clean & Bold)
// =============================================================================
function HeroModern() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* Large gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00997d]/20 via-[#00997d]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 border border-[#00997d]/10 rounded-full" />
      <div className="absolute bottom-20 left-20 w-48 h-48 border border-[#00997d]/10 rounded-full" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <span className="text-[#00997d] font-semibold text-sm tracking-widest uppercase">
            Initiative NIRD • Numérique Inclusif Responsable Durable
          </span>
        </motion.div>

        {/* Main headline with gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="text-gray-900">Le Village</span>
          <br />
          <span className="bg-gradient-to-r from-[#00997d] via-[#00997d] to-[#22C55E] bg-clip-text text-transparent">
            qui Résiste
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Face à l&apos;obsolescence programmée, des écoles choisissent la liberté.
          <span className="block mt-2 text-[#00997d] font-semibold">Linux. Gratuit. Durable.</span>
        </motion.p>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12"
        >
          {[
            { value: '240M', label: 'PCs menacés', accent: false },
            { value: '€0', label: 'Linux gratuit', accent: true },
            { value: '10+', label: 'Ans de vie', accent: false },
          ].map((stat) => (
            <div
              key={stat.label}
              className={cn(
                'py-4 px-2 rounded-2xl',
                stat.accent ? 'bg-[#00997d] text-white' : 'bg-gray-100'
              )}
            >
              <p className={cn('text-2xl md:text-3xl font-bold', !stat.accent && 'text-gray-900')}>
                {stat.value}
              </p>
              <p className={cn('text-xs', stat.accent ? 'text-white/80' : 'text-gray-500')}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="group px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
            Commencer
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button className="px-8 py-4 text-gray-700 font-medium rounded-full border-2 border-gray-200 hover:border-[#00997d] hover:text-[#00997d] transition-all">
            Voir le mini-jeu
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// VARIANTS PAGE
// =============================================================================
type VariantId = 1 | 2 | 3 | 4;

interface Variant {
  id: VariantId;
  name: string;
  desc: string;
  component: React.ComponentType;
}

export default function VariantsPage() {
  const [activeVariant, setActiveVariant] = useState<VariantId>(1);

  const variants: Variant[] = useMemo(() => [
    { id: 1, name: 'Minimal', desc: 'BlurText + Clean design', component: HeroMinimal },
    { id: 2, name: 'Tech', desc: 'Shuffle + Animated grid', component: HeroShuffle },
    { id: 3, name: 'Narrative', desc: 'SplitText + Storytelling', component: HeroNarrative },
    { id: 4, name: 'Modern', desc: 'Gradient + Bold typography', component: HeroModern },
  ], []);

  const ActiveHero = variants.find(v => v.id === activeVariant)?.component || HeroMinimal;

  return (
    <main className="min-h-screen">
      {/* Variant Selector */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 p-1.5 bg-white/90 backdrop-blur-md rounded-full border border-gray-200 shadow-lg">
          <Link href="/" className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="w-px h-6 bg-gray-200" />

          {variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVariant(v.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeVariant === v.id
                  ? 'bg-[#00997d] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              )}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>

      {/* Info Badge */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full border border-gray-200 shadow-lg text-sm">
          <span className="text-gray-500">Variant {activeVariant}:</span>{' '}
          <span className="text-gray-900 font-medium">
            {variants.find(v => v.id === activeVariant)?.desc}
          </span>
        </div>
      </div>

      {/* Hero Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVariant}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ActiveHero />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
