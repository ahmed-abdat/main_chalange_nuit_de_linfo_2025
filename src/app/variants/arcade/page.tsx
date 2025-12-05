'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Gamepad2, Trophy } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Arcade Components
import TextType from '@/components/TextType';

// Dynamic imports for components that use window/canvas/matter.js
const RetroGrid = dynamic(() => import('@/components/RetroGrid'), { ssr: false });
const FallingText = dynamic(() => import('@/components/FallingText'), { ssr: false });
const PixelCard = dynamic(() => import('@/components/PixelCard'), { ssr: false });
const Magnet = dynamic(() => import('@/components/Magnet'), { ssr: false });

// Physics - Dynamic import to avoid SSR issues with Matter.js
const GravityModule = dynamic(
  () => import('@/components/ui/gravity').then(mod => ({ default: mod.Gravity })),
  { ssr: false }
);
const MatterBodyModule = dynamic(
  () => import('@/components/ui/gravity').then(mod => ({ default: mod.MatterBody })),
  { ssr: false }
);

// Animation Components
import CountUp from '@/components/CountUp';
import ClickSpark from '@/components/ClickSpark';

// Store
import { useChoiceStore } from '@/store/choiceStore';
import { cn } from '@/lib/utils';

/**
 * VARIANT B: ARCADE GAME
 * Retro 8-bit gaming theme - Play through the NIRD story
 */

// =============================================================================
// ARCADE HERO - "Press Start"
// =============================================================================
function ArcadeHero() {
  const showStart = true; // Always show blinking effect

  const scrollToGame = () => {
    document.getElementById('boss-alert')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Retro Grid Background */}
      <div className="absolute inset-0 z-0">
        <RetroGrid gridColor="#00997d" showScanlines={true} glowEffect={true} />
      </div>

      {/* CRT Scanline overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-30"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Arcade Cabinet Title */}
        <motion.h1
          animate={{
            textShadow: [
              '0 0 10px #00997d, 0 0 20px #00997d, 0 0 30px #00997d',
              '0 0 20px #F9A825, 0 0 40px #F9A825, 0 0 60px #F9A825',
              '0 0 10px #00997d, 0 0 20px #00997d, 0 0 30px #00997d',
            ],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="font-mono text-6xl md:text-8xl font-black text-[#00997d] mb-8"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          VILLAGE NIRD
        </motion.h1>

        {/* Level indicator */}
        <div className="mb-8">
          <TextType
            text="LEVEL 1: L'EMPIRE ATTAQUE..."
            className="font-mono text-xl text-[#F9A825]"
          />
        </div>

        {/* High Score */}
        <div className="font-mono text-[#C62828] mb-12">
          <p className="text-2xl">HIGH SCORE: €800,000</p>
          <p className="text-sm text-gray-500">(Budget gaspillé par les écoles)</p>
        </div>

        {/* Blinking Press Start */}
        <motion.button
          animate={{ opacity: showStart ? [1, 0, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 1 }}
          onClick={scrollToGame}
          className="font-mono text-2xl text-white border-4 border-[#00997d] px-8 py-4
                     hover:bg-[#00997d] transition-colors"
        >
          [ APPUYEZ POUR JOUER ]
        </motion.button>

        {/* Controls hint */}
        <p className="font-mono text-gray-500 text-sm mt-8">
          ↑↓←→ ou WASD pour jouer
        </p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToGame}
      >
        <ChevronDown className="w-10 h-10 text-[#00997d]" />
      </motion.div>
    </section>
  );
}

// =============================================================================
// BOSS ALERT - Enemy Stats
// =============================================================================
function BossAlert() {
  const bossStats = [
    { label: 'PCs à détruire', value: 240, suffix: 'M', power: 90 },
    { label: 'Budget drainé', value: 800, prefix: '€', suffix: '/PC', power: 80 },
    { label: 'Écoles captives', value: 68, suffix: '%', power: 70 },
  ];

  return (
    <section
      id="boss-alert"
      className="relative py-32 px-6 overflow-hidden bg-[#1a0a1a]"
    >
      {/* Warning background */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-[#C62828]/20 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Alert Header */}
        <motion.h2
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="font-mono text-4xl text-[#C62828] text-center mb-16"
        >
          ⚠️ BOSS ALERT: MICROSOFT INC. ⚠️
        </motion.h2>

        {/* Boss Stats */}
        <div className="space-y-6">
          {bossStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <PixelCard variant="pink" className="w-full">
                <div className="p-6 flex items-center justify-between">
                  <span className="font-mono text-white">{stat.label}</span>
                  <div className="flex items-center gap-4">
                    {/* Value */}
                    <div className="font-mono text-3xl text-[#C62828] flex items-baseline gap-1">
                      {stat.prefix && <span>{stat.prefix}</span>}
                      <CountUp to={stat.value} duration={2} />
                      {stat.suffix && <span className="text-xl">{stat.suffix}</span>}
                    </div>

                    {/* Health Bar */}
                    <div className="w-32 h-4 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.power}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className="h-full bg-gradient-to-r from-[#C62828] to-[#ff6b6b]"
                      />
                    </div>
                  </div>
                </div>
              </PixelCard>
            </motion.div>
          ))}
        </div>

        {/* Defeat message */}
        <div className="mt-16">
          <FallingText
            text="DÉFAITES LE BOSS AVEC LINUX !"
            trigger="scroll"
            highlightWords={['LINUX']}
            fontSize="1.5rem"
          />
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// CHARACTER SELECT - Choose Your Fighter
// =============================================================================
function CharacterSelect() {
  const { userChoice, setUserChoice } = useChoiceStore();

  const fighters = [
    {
      id: 'A',
      name: 'EMPIRE SOLDIER',
      emoji: '👹',
      subtitle: 'Payer Microsoft',
      stats: { cost: 5, freedom: 1, durability: 1 },
      color: '#C62828',
      variant: 'pink' as const,
    },
    {
      id: 'B',
      name: 'VILLAGE HERO',
      emoji: '🦸',
      subtitle: 'Rejoindre NIRD',
      stats: { cost: 1, freedom: 5, durability: 5 },
      color: '#00997d',
      variant: 'blue' as const,
      bestChoice: true,
    },
    {
      id: 'C',
      name: 'GHOST NPC',
      emoji: '👻',
      subtitle: 'Ne rien faire',
      stats: { cost: 4, freedom: 0, durability: 0 },
      color: '#455A64',
      variant: 'default' as const,
    },
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-[#1a0a1a] to-[#0a1a0a]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-mono text-4xl text-white mb-4">
            CHOISISSEZ VOTRE CAMP
          </h2>
          <p className="font-mono text-[#F9A825] animate-pulse">
            → PLAYER 1: SELECT ←
          </p>
        </div>

        {/* Fighter Grid */}
        <ClickSpark sparkColor="#F9A825" sparkCount={12}>
          <div className="grid md:grid-cols-3 gap-8">
            {fighters.map((fighter) => (
              <motion.div
                key={fighter.id}
                whileHover={{ y: -20, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserChoice(fighter.id as 'A' | 'B' | 'C')}
                className="cursor-pointer"
              >
                <PixelCard
                  variant={fighter.variant}
                  className={cn(
                    'transition-all duration-300',
                    userChoice === fighter.id && 'ring-4 ring-[#F9A825]'
                  )}
                >
                  <div className="p-8 text-center">
                    {/* Character */}
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-6xl block mb-4"
                    >
                      {fighter.emoji}
                    </motion.span>

                    <h3 className="font-mono text-xl text-white mb-2">
                      {fighter.name}
                    </h3>
                    <p className="font-mono text-gray-400 text-sm mb-6">
                      {fighter.subtitle}
                    </p>

                    {/* Stats bars */}
                    <div className="space-y-3">
                      {Object.entries(fighter.stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center font-mono text-xs">
                          <span className="text-gray-400 uppercase">{key}</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={cn(
                                  i < value
                                    ? key === 'cost' ? 'text-[#C62828]' : 'text-[#00997d]'
                                    : 'text-gray-700'
                                )}
                              >
                                ■
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Best choice badge */}
                    {fighter.bestChoice && (
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="inline-block mt-6 px-4 py-2 bg-[#F9A825] text-black font-mono text-xs font-bold"
                      >
                        BEST CHOICE
                      </motion.span>
                    )}
                  </div>
                </PixelCard>
              </motion.div>
            ))}
          </div>
        </ClickSpark>

        {/* Selected feedback */}
        <AnimatePresence>
          {userChoice && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-12 text-center"
            >
              <p className="font-mono text-2xl text-white">
                PLAYER 1 SELECTED:{' '}
                <span style={{ color: fighters.find(f => f.id === userChoice)?.color }}>
                  {fighters.find(f => f.id === userChoice)?.name}
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// =============================================================================
// BONUS LEVEL - PC Refurbish Game
// =============================================================================
function BonusLevel() {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const items = [
    { id: 'ssd', emoji: '💾', label: 'SSD 30€', points: 50 },
    { id: 'linux', emoji: '🐧', label: 'USB Linux', points: 100 },
    { id: 'ram', emoji: '🧠', label: 'RAM 8GB', points: 30 },
    { id: 'clean', emoji: '🧹', label: 'Nettoyage', points: 20 },
  ];

  return (
    <section className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block"
          >
            <Gamepad2 className="w-16 h-16 text-[#00997d] mx-auto mb-4" />
          </motion.span>

          <h2 className="font-mono text-4xl text-[#00997d] mb-4">
            🎮 BONUS LEVEL 🎮
          </h2>

          <p className="font-mono text-gray-400">
            Reconditionne le vieux PC ! Glisse les composants !
          </p>
        </div>

        {/* Game Container - Arcade Cabinet Style */}
        <div className="relative h-[500px] bg-gray-900 rounded-3xl p-4 border-8 border-[#00997d] overflow-hidden">
          <div className="absolute top-2 left-4 font-mono text-xs text-[#00997d]">
            RECYCLE QUEST
          </div>

          {!gameStarted ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]">
              <motion.p
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="font-mono text-[#00997d] text-xl mb-8"
              >
                RECYCLE QUEST
              </motion.p>
              <button
                onClick={() => setGameStarted(true)}
                className="font-mono text-[#00997d] border-2 border-[#00997d] px-6 py-3 hover:bg-[#00997d] hover:text-black transition-colors"
              >
                INSERT COIN
              </button>
            </div>
          ) : (
            <GravityModule gravity={{ x: 0, y: 0.8 }} grabCursor>
              {/* Draggable items */}
              {items.map((item, i) => (
                <MatterBodyModule
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
                </MatterBodyModule>
              ))}

              {/* Target PC */}
              <MatterBodyModule x="50%" y="75%" matterBodyOptions={{ isStatic: true }}>
                <div className="p-8 bg-gray-800/80 rounded-2xl border-4 border-dashed border-[#F9A825] text-center">
                  <span className="text-6xl block mb-2">🖥️</span>
                  <p className="text-[#F9A825] font-mono font-bold">VIEUX PC</p>
                  <p className="text-xs text-gray-400 mt-1">Glissez les composants ici !</p>
                </div>
              </MatterBodyModule>
            </GravityModule>
          )}

          {/* Score display */}
          <div className="absolute top-4 right-4 px-6 py-3 bg-[#00997d] rounded-full">
            <span className="text-black font-mono font-bold">
              SCORE: <CountUp to={score} duration={0.5} className="inline" />
            </span>
          </div>
        </div>

        {/* Instructions */}
        <p className="font-mono text-center text-gray-600 mt-8 text-sm">
          💡 Avec 30€ de SSD et Linux gratuit, donnez 5 ans de vie à un vieux PC !
        </p>
      </div>
    </section>
  );
}

// =============================================================================
// POWER-UPS - Pillars
// =============================================================================
function PowerUps() {
  const powerUps = [
    { icon: '♿', title: 'INCLUSIF', xp: 132, color: '#00997d' },
    { icon: '🛡️', title: 'RESPONSABLE', xp: 100, color: '#1A237E' },
    { icon: '🌱', title: 'DURABLE', xp: 200, color: '#2E7D32' },
  ];

  return (
    <section className="py-32 px-6 bg-[#0a1a0a]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-mono text-4xl text-[#F9A825] text-center mb-16">
          COLLECT ALL POWER-UPS!
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {powerUps.map((powerUp, i) => (
            <motion.div
              key={powerUp.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
              >
                <PixelCard variant="yellow" className="p-8 text-center">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-5xl block mb-4"
                  >
                    {powerUp.icon}
                  </motion.span>

                  <h3 className="font-mono text-xl text-white mb-2">
                    {powerUp.title}
                  </h3>

                  <div className="font-mono text-sm" style={{ color: powerUp.color }}>
                    +{powerUp.xp} XP
                  </div>
                </PixelCard>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// GAME COMPLETE - Victory Screen
// =============================================================================
function GameComplete() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#00997d]">
      {/* Confetti-like particles */}
      <div className="absolute inset-0 z-0 opacity-50">
        <GravityModule gravity={{ x: 0, y: 0.3 }} addTopWall={false}>
          {['🎉', '⭐', '🏆', '🎮', '🐧'].map((emoji, i) => (
            <MatterBodyModule
              key={i}
              x={`${10 + i * 20}%`}
              y="-10%"
              matterBodyOptions={{ restitution: 0.8 }}
            >
              <span className="text-4xl">{emoji}</span>
            </MatterBodyModule>
          ))}
        </GravityModule>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring' }}
        >
          <Trophy className="w-24 h-24 text-[#F9A825] mx-auto mb-6" />
        </motion.div>

        <motion.h2
          animate={{
            textShadow: [
              '0 0 10px #FFF',
              '0 0 30px #F9A825',
              '0 0 10px #FFF',
            ],
          }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="font-mono text-6xl md:text-8xl font-black text-white mb-8"
        >
          YOU WIN!
        </motion.h2>

        <p className="font-mono text-2xl text-white/80 mb-4">
          SCORE FINAL: €750,000 ÉCONOMISÉS
        </p>

        <p className="font-mono text-lg text-white/60 mb-12">
          Félicitations, vous avez libéré votre école !
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Magnet padding={60} magnetStrength={1.5}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open('https://nird.forge.apps.education.fr/', '_blank')}
              className="font-mono text-xl px-8 py-4 bg-[#F9A825] text-black border-4 border-black hover:bg-white transition-colors"
            >
              [ NEW GAME+ ] REJOINDRE NIRD
            </motion.button>
          </Magnet>

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => window.open('https://nird.forge.apps.education.fr/linux/', '_blank')}
            className="font-mono text-lg px-6 py-3 bg-transparent text-white border-2 border-white hover:bg-white/20 transition-colors"
          >
            [ DOWNLOAD ] LINUX
          </motion.button>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// FOOTER
// =============================================================================
function ArcadeFooter() {
  return (
    <footer className="py-12 px-6 bg-[#0a0a0a] border-t border-[#00997d]/30">
      <div className="max-w-6xl mx-auto text-center font-mono">
        <p className="text-[#00997d] mb-2">
          🎮 VARIANT B: ARCADE GAME
        </p>
        <p className="text-gray-600 text-sm">
          La Nuit de l&apos;Info 2025 | Team Mauritania
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="/" className="text-gray-500 hover:text-[#00997d] transition-colors">
            ← Accueil
          </Link>
          <Link href="/variants/cosmic" className="text-gray-500 hover:text-[#00997d] transition-colors">
            Cosmic →
          </Link>
          <Link href="/variants/potion" className="text-gray-500 hover:text-[#00997d] transition-colors">
            Potion →
          </Link>
        </div>

        {/* Insert coin */}
        <motion.p
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-[#F9A825] mt-8"
        >
          INSERT COIN TO CONTINUE
        </motion.p>
      </div>
    </footer>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================
export default function ArcadeGamePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <ArcadeHero />
      <BossAlert />
      <CharacterSelect />
      <BonusLevel />
      <PowerUps />
      <GameComplete />
      <ArcadeFooter />
    </main>
  );
}
