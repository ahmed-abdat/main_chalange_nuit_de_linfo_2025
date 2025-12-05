'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, Users, Shield, Leaf } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Mystical Components
import WaterRippleImage from '@/components/ui/water-ripple-image';
import { Component as EtheralShadow } from '@/components/ui/etheral-shadow';
import AuroraCanvas from '@/components/ui/ambient-aurora';
import { NeonOrbs } from '@/components/ui/neon-orbs';

// Animation Components
import BlurText from '@/components/BlurText';
import Particles from '@/components/Particles';
import CountUp from '@/components/CountUp';
import TrueFocus from '@/components/TrueFocus';
import { Component as ShatterButton } from '@/components/ui/shatter-button';
import { CometCard } from '@/components/ui/CometCard';
import GlareHover from '@/components/GlareHover';
import Waves from '@/components/Waves';
import Magnet from '@/components/Magnet';
import ClickSpark from '@/components/ClickSpark';

// Physics - Dynamic import to avoid SSR issues with Matter.js
const Gravity = dynamic(
  () => import('@/components/ui/gravity').then(mod => ({ default: mod.Gravity })),
  { ssr: false }
);
const MatterBody = dynamic(
  () => import('@/components/ui/gravity').then(mod => ({ default: mod.MatterBody })),
  { ssr: false }
);

// Utils
import { cn } from '@/lib/utils';

/**
 * VARIANT C: MAGIC POTION
 * Mystical forest theme - Asterix faithful, cauldron brewing
 */

// =============================================================================
// MYSTICAL HERO - "The Druid's Call"
// =============================================================================
function MysticalHero() {
  const scrollToForest = () => {
    document.getElementById('dark-forest')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1a0a]">
      {/* Layer 1: Aurora mystical background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <AuroraCanvas />
      </div>

      {/* Layer 2: Water ripple forest image */}
      <div className="absolute inset-0 z-[1] opacity-40">
        <WaterRippleImage
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920"
          blueish={0.2}
          scale={5}
          illumination={0.1}
        />
      </div>

      {/* Layer 3: Ethereal flowing shadow */}
      <div className="absolute inset-0 z-[2]">
        <EtheralShadow
          color="rgba(0, 153, 125, 0.4)"
          animation={{ scale: 30, speed: 15 }}
          noise={{ opacity: 0.08, scale: 1 }}
        />
      </div>

      {/* Layer 4: Magic particles */}
      <div className="absolute inset-0 z-[3]">
        <Particles
          particleCount={150}
          particleSpread={25}
          speed={0.04}
          particleColors={['#00997d', '#F9A825', '#2E7D32', '#FFF8E1']}
          alphaParticles={true}
          particleBaseSize={100}
          moveParticlesOnHover={true}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Druid's eye */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.5 }}
          className="mb-8"
        >
          <span className="text-8xl">🧙‍♂️</span>
        </motion.div>

        {/* Epic intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl text-[#F9A825] font-medium tracking-wider mb-6"
        >
          Nous sommes en 2025...
        </motion.p>

        {/* Main title with blur reveal */}
        <BlurText
          text="La Potion Magique Existe"
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 drop-shadow-[0_0_60px_rgba(0,153,125,0.6)]"
          delay={80}
          animateBy="words"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
        >
          Un village d&apos;irréductibles enseignants résiste encore à l&apos;envahisseur.
          <br />
          <span className="text-[#00997d] font-bold">Leur secret ? Le logiciel libre.</span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, type: 'spring' }}
        >
          <Magnet padding={80} magnetStrength={2}>
            <ShatterButton
              shatterColor="#F9A825"
              shardCount={30}
              onClick={scrollToForest}
              className="text-xl font-bold px-12 py-6 bg-gradient-to-r from-[#00997d] to-[#2E7D32]"
            >
              <Sparkles className="inline-block mr-2 w-6 h-6" />
              Entrer dans la Forêt
            </ShatterButton>
          </Magnet>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="cursor-pointer text-[#F9A825]"
            onClick={scrollToForest}
          >
            <ChevronDown className="w-10 h-10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// DARK FOREST - Crisis (Empire Threat)
// =============================================================================
function DarkForest() {
  const threats = [
    { value: 240, suffix: 'M', label: 'PCs condamnés', icon: '💀' },
    { value: 68, suffix: '%', label: 'Écoles captives', icon: '⛓️' },
    { value: 800, prefix: '€', label: 'Tribut par PC', icon: '💰' },
  ];

  return (
    <section
      id="dark-forest"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#0a1a0a] via-[#1a0a0a] to-[#0a0a1a]"
    >
      {/* Dark ethereal effect (red for danger) */}
      <div className="absolute inset-0 z-0">
        <EtheralShadow
          color="rgba(198, 40, 40, 0.3)"
          animation={{ scale: 40, speed: 10 }}
          noise={{ opacity: 0.1, scale: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-3 bg-[#C62828]/30 border border-[#C62828] text-[#C62828] font-bold rounded-lg">
              ⚠️ L&apos;EMPIRE APPROCHE ⚠️
            </span>
          </motion.div>

          <BlurText
            text="La Menace de l'Empire"
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            delay={80}
            animateBy="words"
          />

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Octobre 2025 : Microsoft abandonne des millions d&apos;ordinateurs.
            L&apos;Empire exige son tribut.
          </p>
        </div>

        {/* Threat Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {threats.map((threat, i) => (
            <motion.div
              key={threat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <CometCard>
                <div className="p-8 bg-[#C62828]/10 border border-[#C62828]/30 rounded-2xl text-center backdrop-blur-md">
                  <span className="text-5xl block mb-4">{threat.icon}</span>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    {threat.prefix && <span className="text-xl text-[#C62828]">{threat.prefix}</span>}
                    <CountUp
                      to={threat.value}
                      duration={2.5}
                      className="text-5xl font-black text-[#C62828]"
                    />
                    {threat.suffix && <span className="text-xl text-[#C62828]">{threat.suffix}</span>}
                  </div>
                  <p className="text-gray-400">{threat.label}</p>
                </div>
              </CometCard>
            </motion.div>
          ))}
        </div>

        {/* Hope message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-2xl text-white mb-4">
            Mais dans la forêt, le Druide prépare sa{' '}
            <span className="text-[#F9A825] font-bold">potion magique</span>...
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// THE CAULDRON - Brewing Mini-Game
// =============================================================================
function TheCauldron() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [potionReady, setPotionReady] = useState(false);

  const allIngredients = [
    { id: 'linux', emoji: '🐧', name: 'Noyau Linux' },
    { id: 'libre', emoji: '📖', name: 'Logiciel Libre' },
    { id: 'community', emoji: '👥', name: 'Communauté' },
    { id: 'sovereignty', emoji: '🏰', name: 'Souveraineté' },
  ];

  const addIngredient = (id: string) => {
    if (!ingredients.includes(id)) {
      const newIngredients = [...ingredients, id];
      setIngredients(newIngredients);
      if (newIngredients.length === allIngredients.length) {
        setTimeout(() => setPotionReady(true), 1000);
      }
    }
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#0a1a0a] to-[#0a0a0a]">
      {/* Magical background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <NeonOrbs />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-8xl inline-block mb-6"
          >
            🧪
          </motion.span>

          <BlurText
            text="Le Chaudron du Druide"
            className="text-4xl md:text-5xl font-bold text-[#F9A825] mb-4"
            delay={60}
            animateBy="words"
          />

          <p className="text-gray-400 max-w-xl mx-auto">
            Glissez les ingrédients dans le chaudron pour préparer la potion !
          </p>
        </div>

        {/* Cauldron Game Area */}
        <div className="relative h-[500px] bg-[#0a0a0a]/80 rounded-3xl border-2 border-[#F9A825]/30 overflow-hidden">
          <ClickSpark sparkColor="#F9A825" sparkCount={15}>
            <Gravity gravity={{ x: 0, y: 0.5 }} grabCursor>
              {/* Draggable ingredients */}
              {allIngredients.map((ing, i) => (
                <MatterBody
                  key={ing.id}
                  x={`${15 + i * 20}%`}
                  y="15%"
                  isDraggable
                  matterBodyOptions={{ friction: 0.3, restitution: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={cn(
                      'p-4 rounded-xl cursor-grab active:cursor-grabbing backdrop-blur-md border-2 transition-all',
                      ingredients.includes(ing.id)
                        ? 'bg-[#00997d]/30 border-[#00997d]'
                        : 'bg-[#F9A825]/20 border-[#F9A825]'
                    )}
                    onClick={() => addIngredient(ing.id)}
                  >
                    <span className="text-4xl block mb-1">{ing.emoji}</span>
                    <span className="text-xs text-white font-bold">{ing.name}</span>
                  </motion.div>
                </MatterBody>
              ))}

              {/* The Cauldron */}
              <MatterBody x="50%" y="75%" matterBodyOptions={{ isStatic: true }}>
                <motion.div
                  animate={potionReady ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className={cn(
                    'relative p-10 rounded-full text-center transition-all duration-500',
                    potionReady
                      ? 'bg-gradient-to-b from-[#00997d] to-[#2E7D32] shadow-[0_0_80px_rgba(0,153,125,0.8)]'
                      : 'bg-gradient-to-b from-gray-800 to-gray-900'
                  )}
                >
                  <span className="text-6xl">{potionReady ? '✨' : '🔥'}</span>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <p className="text-[#F9A825] font-bold text-sm">
                      {potionReady ? 'POTION PRÊTE !' : `${ingredients.length}/${allIngredients.length} ingrédients`}
                    </p>
                  </div>
                </motion.div>
              </MatterBody>
            </Gravity>
          </ClickSpark>

          {/* Potion Ready Overlay */}
          <AnimatePresence>
            {potionReady && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[#00997d]/30 flex items-center justify-center backdrop-blur-sm"
              >
                <div className="text-center">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-8xl block mb-4"
                  >
                    🧪
                  </motion.span>
                  <p className="text-3xl font-bold text-white mb-6">
                    La Potion Magique est prête !
                  </p>
                  <ShatterButton
                    shatterColor="#F9A825"
                    onClick={() => {
                      setIngredients([]);
                      setPotionReady(false);
                    }}
                  >
                    Recommencer
                  </ShatterButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// VILLAGE HUTS - The 3 Pillars
// =============================================================================
function VillageHuts() {
  const huts = [
    {
      icon: Users,
      title: 'INCLUSIF',
      subtitle: 'Pour tous les élèves',
      color: '#00997d',
      description: '132 PCs reconditionnés distribués à 11 écoles',
    },
    {
      icon: Shield,
      title: 'RESPONSABLE',
      subtitle: 'Données souveraines',
      color: '#1A237E',
      description: 'Vos données restent en France, pas chez Big Tech',
    },
    {
      icon: Leaf,
      title: 'DURABLE',
      subtitle: '+5 ans de vie',
      color: '#2E7D32',
      description: 'Un SSD à 30€ et Linux = PC comme neuf',
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#0a1a0a]">
      {/* Waves background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Waves lineColor="#00997d" waveSpeedX={0.01} waveAmpX={30} waveAmpY={15} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurText
            text="Les Huttes du Village"
            className="text-4xl md:text-6xl font-bold text-white mb-8"
            delay={80}
            animateBy="words"
          />

          <TrueFocus
            sentence="Inclusif Responsable Durable"
            blurAmount={5}
            borderColor="#00997d"
            glowColor="rgba(0, 153, 125, 0.6)"
            animationDuration={0.6}
            pauseBetweenAnimations={1.5}
          />
        </div>

        {/* Hut Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {huts.map((hut, i) => {
            const Icon = hut.icon;
            return (
              <motion.div
                key={hut.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <CometCard rotateDepth={12} translateDepth={15}>
                  <GlareHover glareColor={hut.color} glareOpacity={0.3} className="h-full">
                    <div
                      className="p-8 rounded-2xl h-full border backdrop-blur-md"
                      style={{
                        backgroundColor: `${hut.color}10`,
                        borderColor: `${hut.color}40`,
                      }}
                    >
                      {/* Hut roof */}
                      <div className="text-center mb-6">
                        <span className="text-6xl">🏠</span>
                      </div>

                      {/* Icon */}
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: `${hut.color}30` }}
                      >
                        <Icon className="w-8 h-8" style={{ color: hut.color }} />
                      </div>

                      <h3 className="text-2xl font-bold text-center mb-2" style={{ color: hut.color }}>
                        {hut.title}
                      </h3>
                      <p className="text-gray-400 text-sm text-center mb-4">{hut.subtitle}</p>
                      <p className="text-gray-300 text-center">{hut.description}</p>
                    </div>
                  </GlareHover>
                </CometCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// VILLAGE CELEBRATION - Join CTA
// =============================================================================
function VillageCelebration() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-t from-[#00997d] to-[#0a1a0a]">
      {/* Celebration particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={200}
          particleSpread={30}
          speed={0.1}
          particleColors={['#F9A825', '#FFF8E1', '#00997d', '#2E7D32']}
          alphaParticles={true}
          particleBaseSize={120}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Celebration icons */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8 mb-8"
        >
          {['🏛️', '🧙‍♂️', '🐧', '🏛️'].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              className="text-6xl"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        <BlurText
          text="Rejoignez le Village !"
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8"
          delay={60}
          animateBy="words"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
        >
          La potion est prête. Le village vous attend.
          <br />
          <span className="text-[#F9A825] font-bold">Ensemble, résistons à l&apos;Empire !</span>
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Magnet padding={60} magnetStrength={1.5}>
            <ShatterButton
              shatterColor="#F9A825"
              shardCount={30}
              onClick={() => window.open('https://nird.forge.apps.education.fr/', '_blank')}
              className="text-xl font-bold px-12 py-6 bg-white text-[#00997d]"
            >
              🏛️ Découvrir NIRD
            </ShatterButton>
          </Magnet>

          <Magnet padding={60} magnetStrength={1.5}>
            <ShatterButton
              shatterColor="#00997d"
              onClick={() => window.open('https://nird.forge.apps.education.fr/linux/', '_blank')}
              className="text-lg font-bold px-10 py-5"
            >
              🧪 Boire la Potion (Linux)
            </ShatterButton>
          </Magnet>
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-xl italic text-white/70 max-w-2xl mx-auto"
        >
          &ldquo;Ils sont fous ces Romains... et leurs licences Microsoft !&rdquo;
          <cite className="block mt-4 text-[#F9A825] not-italic">— Obélix, fan de Linux</cite>
        </motion.blockquote>
      </div>
    </section>
  );
}

// =============================================================================
// FOOTER
// =============================================================================
function MysticalFooter() {
  return (
    <footer className="py-12 px-6 bg-[#0a0a0a] border-t border-[#00997d]/30">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-[#00997d] mb-2">
          🧪 VARIANT C: MAGIC POTION
        </p>
        <p className="text-gray-500 text-sm">
          La Nuit de l&apos;Info 2025 | Team Mauritania
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="/" className="text-gray-400 hover:text-[#00997d] transition-colors">
            ← Retour Accueil
          </Link>
          <Link href="/variants/cosmic" className="text-gray-400 hover:text-[#00997d] transition-colors">
            Cosmic →
          </Link>
          <Link href="/variants/arcade" className="text-gray-400 hover:text-[#00997d] transition-colors">
            Arcade →
          </Link>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================
export default function MagicPotionPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <MysticalHero />
      <DarkForest />
      <TheCauldron />
      <VillageHuts />
      <VillageCelebration />
      <MysticalFooter />
    </main>
  );
}
