'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Rocket, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Space-themed Components
import { SpaceBackground } from '@/components/ui/space-background';
import RotatingEarth from '@/components/ui/wireframe-dotted-globe';
import Globe from '@/components/ui/globe';
import VaporizeTextCycle, { Tag } from '@/components/ui/vapour-text-effect';
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';

// Physics & Interactive - Dynamic import to avoid SSR issues with Matter.js
const Gravity = dynamic(
  () => import('@/components/ui/gravity').then(mod => ({ default: mod.Gravity })),
  { ssr: false }
);
const MatterBody = dynamic(
  () => import('@/components/ui/gravity').then(mod => ({ default: mod.MatterBody })),
  { ssr: false }
);

// Animation Components
import BlurText from '@/components/BlurText';
import Particles from '@/components/Particles';
import CountUp from '@/components/CountUp';
import { Component as ShatterButton } from '@/components/ui/shatter-button';
import { CometCard } from '@/components/ui/CometCard';
import Magnet from '@/components/Magnet';
import ClickSpark from '@/components/ClickSpark';

// Data & Store
import { useChoiceStore } from '@/store/choiceStore';
import { cn } from '@/lib/utils';

/**
 * VARIANT A: COSMIC JOURNEY
 * Space exploration theme - Navigate from Empire to Village Planet
 */

// =============================================================================
// COSMIC HERO - "The Launch"
// =============================================================================
function CosmicHero() {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToMission = () => {
    document.getElementById('mission-briefing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Layer 1: Deep Space Background */}
      <div className="absolute inset-0 z-0">
        <SpaceBackground
          particleCount={500}
          particleColor="#ffffff"
          backgroundColor="#000010"
        />
      </div>

      {/* Layer 2: Nebula gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-radial from-purple-900/30 via-transparent to-blue-900/20" />

      {/* Layer 3: Magic particles */}
      {showParticles && (
        <div className="absolute inset-0 z-[2]">
          <Particles
            particleCount={100}
            particleSpread={30}
            speed={0.03}
            particleColors={['#00997d', '#F9A825', '#9333ea', '#3b82f6']}
            alphaParticles={true}
            particleBaseSize={60}
            moveParticlesOnHover={true}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Mission Status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm font-mono">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            MISSION STATUS: ACTIVE
          </span>
        </motion.div>

        {/* Particle Text Effect - cycling words */}
        <div className="mb-8 h-[120px] flex items-center justify-center">
          <ParticleTextEffect words={['2025', 'CRISE', 'LIBERTÉ', 'NIRD']} />
        </div>

        {/* Main Title with Vaporize Effect */}
        <div className="mb-8">
          <VaporizeTextCycle
            texts={["ÉCHAPPER", "À L'EMPIRE", "NUMÉRIQUE"]}
            font={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '48px',
              fontWeight: 700,
            }}
            color="rgb(255, 255, 255)"
            spread={5}
            density={6}
            animation={{
              vaporizeDuration: 2.5,
              fadeInDuration: 0.8,
              waitDuration: 1,
            }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.H1}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
        >
          Votre école est prisonnière de l&apos;Empire Big Tech.
          <br />
          <span className="text-[#00997d] font-bold">Naviguez vers le Village Planet.</span>
        </motion.p>

        {/* Launch Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: 'spring' }}
        >
          <Magnet padding={80} magnetStrength={2}>
            <ShatterButton
              shatterColor="#9333ea"
              shardCount={30}
              onClick={scrollToMission}
              className="text-xl font-bold px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600"
            >
              <Rocket className="inline-block mr-2 w-6 h-6" />
              LANCER LA MISSION
            </ShatterButton>
          </Magnet>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="cursor-pointer text-purple-400"
            onClick={scrollToMission}
          >
            <ChevronDown className="w-10 h-10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// MISSION BRIEFING - Crisis with Rotating Globe
// =============================================================================
function MissionBriefing() {
  const transmissions = [
    { value: 240, suffix: 'M', label: 'PCs menacés', icon: '📡' },
    { value: 68, suffix: '%', label: 'Admin française', icon: '🏛️' },
    { value: 800, prefix: '€', label: 'Coût migration', icon: '💸' },
    { value: 0, prefix: '€', label: 'Coût Linux', icon: '🐧' },
  ];

  return (
    <section
      id="mission-briefing"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-black via-[#0a0a2e] to-black"
    >
      {/* Starfield */}
      <div className="absolute inset-0 z-0">
        <SpaceBackground particleCount={300} particleColor="#4a5568" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-3 bg-red-600/20 border border-red-500 text-red-400 font-mono text-sm rounded-lg animate-pulse">
              ⚠️ ALERTE EMPIRE - NIVEAU CRITIQUE
            </span>
          </motion.div>

          <BlurText
            text="Briefing de Mission"
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            delay={80}
            animateBy="words"
          />
        </div>

        {/* Globe + Transmissions */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <RotatingEarth width={400} height={400} />
              {/* Orbit ring */}
              <div className="absolute inset-0 border-2 border-dashed border-purple-500/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
            </div>
          </motion.div>

          {/* Transmissions */}
          <div className="space-y-6">
            <h3 className="text-xl font-mono text-purple-400 mb-6">
              [ TRANSMISSIONS REÇUES ]
            </h3>

            {transmissions.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <CometCard>
                  <div
                    className={cn(
                      'p-6 rounded-xl border-l-4 backdrop-blur-md',
                      item.label === 'Coût Linux'
                        ? 'bg-green-900/20 border-green-500'
                        : 'bg-red-900/20 border-red-500'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{item.icon}</span>
                        <span className="text-gray-300 font-mono">{item.label}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        {item.prefix && (
                          <span className={cn('text-xl', item.label === 'Coût Linux' ? 'text-green-400' : 'text-red-400')}>
                            {item.prefix}
                          </span>
                        )}
                        <CountUp
                          to={item.value}
                          duration={2.5}
                          className={cn(
                            'text-4xl font-black',
                            item.label === 'Coût Linux' ? 'text-green-400' : 'text-red-400'
                          )}
                        />
                        {item.suffix && (
                          <span className={cn('text-xl', item.label === 'Coût Linux' ? 'text-green-400' : 'text-red-400')}>
                            {item.suffix}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CometCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Next section hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-xl text-gray-300">
            Choisissez votre <span className="text-purple-400 font-bold">destination</span>...
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// PLANET SELECTION - Interactive Choice (THE GAME!)
// =============================================================================
function PlanetSelection() {
  const { userChoice, setUserChoice } = useChoiceStore();
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  const planets = [
    {
      id: 'A',
      name: 'Empire Station',
      subtitle: 'Payer Microsoft',
      color: '#C62828',
      emoji: '🔴',
      cost: '€800/PC',
      description: 'Restez captif de l\'Empire',
      scale: 1,
    },
    {
      id: 'B',
      name: 'Village Planet',
      subtitle: 'Linux & Liberté',
      color: '#00997d',
      emoji: '🌍',
      cost: '€0',
      description: 'Rejoignez la résistance',
      scale: 1.3,
      recommended: true,
    },
    {
      id: 'C',
      name: 'Void Station',
      subtitle: 'Ne rien faire',
      color: '#455A64',
      emoji: '⚫',
      cost: '€???',
      description: 'Dériver dans le néant',
      scale: 0.9,
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-black via-[#1a0a2e] to-black">
      {/* Stars */}
      <div className="absolute inset-0 z-0">
        <SpaceBackground particleCount={200} particleColor="#6366f1" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurText
            text="Choisissez Votre Destination"
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            delay={80}
            animateBy="words"
          />
          <p className="text-xl text-purple-300 font-mono">
            → CAPITAINE : SÉLECTIONNEZ VOTRE CAP ←
          </p>
        </div>

        {/* Planet Grid */}
        <ClickSpark sparkColor="#F9A825" sparkCount={15}>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {planets.map((planet, index) => (
              <motion.div
                key={planet.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={cn(
                  'relative',
                  planet.recommended && 'md:-translate-y-12'
                )}
              >
                {/* Recommended badge */}
                {planet.recommended && (
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
                  >
                    <span className="px-4 py-2 bg-[#00997d] text-white font-bold text-sm rounded-full flex items-center gap-2">
                      <Star className="w-4 h-4" /> DESTINATION OPTIMALE
                    </span>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: planet.scale * 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredPlanet(planet.id)}
                  onHoverEnd={() => setHoveredPlanet(null)}
                  onClick={() => setUserChoice(planet.id as 'A' | 'B' | 'C')}
                  className={cn(
                    'w-full p-8 rounded-3xl text-center transition-all duration-500',
                    'bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-md',
                    'border-2 hover:shadow-[0_0_60px_var(--glow)]',
                    userChoice === planet.id && 'ring-4 ring-offset-4 ring-offset-black'
                  )}
                  style={{
                    borderColor: planet.color,
                    // @ts-expect-error - CSS custom property
                    '--glow': `${planet.color}60`,
                    transform: `scale(${planet.scale})`,
                    ringColor: userChoice === planet.id ? planet.color : undefined,
                  }}
                >
                  {/* Planet Visual */}
                  <motion.div
                    animate={hoveredPlanet === planet.id ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="relative mx-auto w-32 h-32 mb-6"
                  >
                    {planet.id === 'B' ? (
                      <div className="scale-50 origin-center">
                        <Globe />
                      </div>
                    ) : (
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${planet.color}80, ${planet.color}20)`,
                          boxShadow: `0 0 60px ${planet.color}40, inset -20px -20px 60px rgba(0,0,0,0.5)`,
                        }}
                      />
                    )}

                    {/* Orbit */}
                    <div
                      className="absolute inset-[-20px] border border-dashed rounded-full animate-spin"
                      style={{
                        borderColor: `${planet.color}40`,
                        animationDuration: '15s'
                      }}
                    />
                  </motion.div>

                  {/* Info */}
                  <h3 className="text-2xl font-bold text-white mb-2">{planet.name}</h3>
                  <p className="text-gray-400 mb-4">{planet.subtitle}</p>

                  <div
                    className="py-3 px-6 rounded-full inline-block font-mono font-bold"
                    style={{ backgroundColor: `${planet.color}20`, color: planet.color }}
                  >
                    {planet.cost}
                  </div>

                  <p className="text-sm text-gray-500 mt-4">{planet.description}</p>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </ClickSpark>

        {/* Choice feedback */}
        <AnimatePresence>
          {userChoice && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-16 text-center"
            >
              <p className="text-2xl text-white mb-4">
                Cap sur :{' '}
                <span
                  className="font-bold"
                  style={{ color: planets.find(p => p.id === userChoice)?.color }}
                >
                  {planets.find(p => p.id === userChoice)?.name}
                </span>
              </p>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ChevronDown className="w-8 h-8 text-purple-400 mx-auto" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// =============================================================================
// REFURBISH GAME - Physics-based Mini-Game
// =============================================================================
function RefurbishGame() {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const items = [
    { id: 'ssd', emoji: '💾', label: 'SSD 30€', points: 50 },
    { id: 'linux', emoji: '🐧', label: 'USB Linux', points: 100 },
    { id: 'ram', emoji: '🧠', label: 'RAM 8GB', points: 30 },
    { id: 'clean', emoji: '🧹', label: 'Nettoyage', points: 20 },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-black to-[#0a1520]">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block px-6 py-3 bg-[#00997d] text-white font-bold rounded-full mb-6"
          >
            🎮 BONUS LEVEL
          </motion.span>

          <BlurText
            text="Reconditionne le PC !"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            delay={60}
            animateBy="words"
          />

          <p className="text-gray-400 max-w-xl mx-auto">
            Glisse les composants vers le vieux PC pour le ramener à la vie !
          </p>
        </div>

        {/* Game Area */}
        <div className="relative h-[500px] bg-[#1a1a2e] rounded-3xl border-4 border-[#00997d] overflow-hidden">
          {!gameStarted ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <ShatterButton
                shatterColor="#00997d"
                onClick={() => setGameStarted(true)}
                className="text-xl font-bold"
              >
                <Zap className="inline-block mr-2" />
                COMMENCER
              </ShatterButton>
            </div>
          ) : (
            <Gravity gravity={{ x: 0, y: 0.8 }} grabCursor>
              {/* Draggable items */}
              {items.map((item, i) => (
                <MatterBody
                  key={item.id}
                  x={`${15 + i * 20}%`}
                  y="15%"
                  isDraggable
                  matterBodyOptions={{ friction: 0.3, restitution: 0.6 }}
                >
                  <div
                    className="p-4 bg-[#00997d]/20 border-2 border-[#00997d] rounded-xl cursor-grab active:cursor-grabbing backdrop-blur-md"
                    onClick={() => setScore(s => s + item.points)}
                  >
                    <span className="text-4xl block mb-1">{item.emoji}</span>
                    <span className="text-xs text-[#00997d] font-mono">{item.label}</span>
                  </div>
                </MatterBody>
              ))}

              {/* Target PC */}
              <MatterBody x="50%" y="75%" matterBodyOptions={{ isStatic: true }}>
                <div className="p-8 bg-gray-800/80 rounded-2xl border-4 border-dashed border-[#F9A825] text-center">
                  <span className="text-6xl block mb-2">🖥️</span>
                  <p className="text-[#F9A825] font-bold">VIEUX PC</p>
                  <p className="text-xs text-gray-400 mt-1">Glissez les composants ici !</p>
                </div>
              </MatterBody>
            </Gravity>
          )}

          {/* Score */}
          <div className="absolute top-4 right-4 px-6 py-3 bg-[#00997d] rounded-full">
            <span className="text-white font-mono font-bold">
              SCORE: <CountUp to={score} duration={0.5} className="inline" />
            </span>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-center text-gray-500 mt-6 font-mono text-sm">
          💡 Astuce : Avec 30€ de SSD et Linux gratuit, donnez 5 ans de vie supplémentaire à un PC !
        </p>
      </div>
    </section>
  );
}

// =============================================================================
// MISSION COMPLETE - Join CTA
// =============================================================================
function MissionComplete() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-t from-[#00997d] to-[#0a1520]">
      {/* Stars and particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={150}
          particleSpread={30}
          speed={0.08}
          particleColors={['#F9A825', '#ffffff', '#00997d']}
          alphaParticles={true}
          particleBaseSize={100}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <span className="text-8xl block mb-6">🏆</span>
        </motion.div>

        <BlurText
          text="MISSION ACCOMPLIE !"
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8"
          delay={60}
          animateBy="letters"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl text-white/80 mb-12"
        >
          Vous avez atteint le <span className="text-[#F9A825] font-bold">Village Planet</span>
          <br />
          Score final : <span className="text-[#F9A825] font-bold">€750,000</span> économisés !
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Magnet padding={60} magnetStrength={1.5}>
            <ShatterButton
              shatterColor="#F9A825"
              shardCount={30}
              onClick={() => window.open('https://nird.forge.apps.education.fr/', '_blank')}
              className="text-xl font-bold px-12 py-6 bg-white text-[#00997d]"
            >
              🚀 NOUVELLE PARTIE → NIRD
            </ShatterButton>
          </Magnet>

          <Magnet padding={60} magnetStrength={1.5}>
            <ShatterButton
              shatterColor="#00997d"
              onClick={() => window.open('https://nird.forge.apps.education.fr/linux/', '_blank')}
              className="text-lg font-bold px-10 py-5"
            >
              🐧 TÉLÉCHARGER LINUX
            </ShatterButton>
          </Magnet>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// FOOTER
// =============================================================================
function CosmicFooter() {
  return (
    <footer className="py-12 px-6 bg-black border-t border-purple-900/50">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-purple-400 font-mono mb-2">
          🌌 VARIANT A: COSMIC JOURNEY
        </p>
        <p className="text-gray-500 text-sm">
          La Nuit de l&apos;Info 2025 | Team Mauritania
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
            ← Retour Accueil
          </Link>
          <Link href="/variants/arcade" className="text-gray-400 hover:text-purple-400 transition-colors">
            Arcade Variant →
          </Link>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================
export default function CosmicJourneyPage() {
  return (
    <main className="min-h-screen bg-black">
      <CosmicHero />
      <MissionBriefing />
      <PlanetSelection />
      <RefurbishGame />
      <MissionComplete />
      <CosmicFooter />
    </main>
  );
}
