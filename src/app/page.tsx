'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import {
  Users, Shield, Leaf, ExternalLink, ArrowRight, Gamepad2,
  Landmark, Swords, AlertTriangle, CreditCard, Monitor, Moon,
  Star, Download, Check, HelpCircle, Tv, Radio, Play, Newspaper
} from 'lucide-react';
import Link from 'next/link';

// Components
import CountUp from '@/components/CountUp';
import BlurText from '@/components/BlurText';
import SplitText from '@/components/SplitText';
import TrueFocus from '@/components/TrueFocus';
import Particles from '@/components/Particles';
import Shuffle from '@/components/Shuffle';
// TestimonialSlider removed - now using MediaCoverageSection
import { Button } from '@/components/ui/button';
import { SmoothCursor } from '@/components/ui/SmoothCursor';
import { cn } from '@/lib/utils';

// Narrative system
import CharacterGuide from '@/components/narrative/CharacterGuide';

// Background Components for Hero
import { Component as EtheralShadow } from '@/components/ui/etheral-shadow';
import AuroraCanvas from '@/components/ui/ambient-aurora';
import Waves from '@/components/Waves';
import Squares from '@/components/Squares';

// Advanced UI Components
import { GlowCard } from '@/components/ui/spotlight-card';
import { CometCard } from '@/components/ui/CometCard';
import { GlowingEffect } from '@/components/ui/GlowingEffect';
import { ScrollProgressBar } from '@/components/ui/scroll-effects';

// Magic UI Components
import { MagicCard } from '@/components/ui/magic-card';
import { NumberTicker } from '@/components/ui/number-ticker';
import { BorderBeam } from '@/components/ui/border-beam';
import { SparklesText } from '@/components/ui/sparkles-text';

// Creative Effects
import { Component as ShatterButton } from '@/components/ui/shatter-button';
import Floating, { FloatingElement } from '@/components/ui/parallax-floating';

// Data
import { type ChoiceId } from '@/data/choices';

// Store
import { useChoiceStore } from '@/store/choiceStore';

// Games
import { ImmersiveRefurbishGame, ResistanceQuiz, TowerDefenseGame, MemoryGame, TypingGame } from '@/components/games';

// Narrative Bridge Sections
import KnowledgePotionSection from '@/components/narrative/KnowledgePotionSection';
import ThreatsSection from '@/components/narrative/ThreatsSection';
// FinalTrialSection removed - redundant with TypingGameSection

// Defis Sections (Scenarios renamed)
import { DefisSection } from '@/components/scenarios';

// Gamification
import AchievementToast from '@/components/game/AchievementToast';

/**
 * Village NIRD - La Nuit de l'Info 2025
 * "Le Village Numérique Résistant"
 *
 * Enhanced with:
 * - Lenis smooth scrolling
 * - Parallax effects
 * - Micro/macro interactions
 * - Premium feel with subtle animations
 */

// =============================================================================
// PARALLAX SECTION WRAPPER
// =============================================================================
function ParallaxSection({
  children,
  className = '',
  speed = 0.5
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}


// =============================================================================
// NAVIGATION - Commented out (not needed for now)
// =============================================================================
// function Navigation() {
//   const [scrolled, setScrolled] = useState(false);
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
//   return (
//     <motion.nav
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       className={cn(
//         "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500",
//         scrolled ? "bg-[#1a1a1d]/95 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent"
//       )}
//     >
//       <div className="max-w-6xl mx-auto flex items-center justify-end">
//         <div className="flex items-center gap-4">
//           <Link href="/rpg">
//             <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-sm text-[#00997d] hover:text-[#00b894] hover:bg-[#00997d]/10 transition-all duration-300">
//               <Swords className="w-4 h-4" />
//               RPG
//             </Button>
//           </Link>
//           <motion.div whileTap={{ scale: 0.98 }}>
//             <Button asChild className="bg-[#00997d] text-white text-sm font-medium rounded-full hover:bg-[#00b894] transition-colors">
//               <a href="https://nird.forge.apps.education.fr/" target="_blank" rel="noopener noreferrer">Rejoindre NIRD</a>
//             </Button>
//           </motion.div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// }

// =============================================================================
// HERO SECTION - With Background Variants
// =============================================================================
// Change this to test different backgrounds: 'waves' | 'aurora' | 'squares' | 'orbs' | 'minimal'
const HERO_BG_VARIANT: 'waves' | 'aurora' | 'squares' | 'orbs' | 'minimal' = 'waves';

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#1a1a1d] overflow-hidden">

      {/* ===== VARIANT: WAVES (Forest/Village vibe) ===== */}
      {HERO_BG_VARIANT === 'waves' && (
        <>
          <div className="absolute inset-0 z-0 opacity-30">
            <Waves
              lineColor="#00997d"
              waveSpeedX={0.008}
              waveSpeedY={0.003}
              waveAmpX={25}
              waveAmpY={12}
              xGap={14}
              yGap={28}
            />
          </div>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#1a1a1d]/80 via-transparent to-[#1a1a1d]/80" />
        </>
      )}

      {/* ===== VARIANT: AURORA (Mystical/Magic) ===== */}
      {HERO_BG_VARIANT === 'aurora' && (
        <>
          <div className="absolute inset-0 z-0 opacity-40">
            <AuroraCanvas />
          </div>
          <div className="absolute inset-0 z-[1] opacity-25">
            <EtheralShadow
              color="var(--nird-emerald)"
              animation={{ scale: 40, speed: 20 }}
              noise={{ opacity: 0.1, scale: 1 }}
            />
          </div>
        </>
      )}

      {/* ===== VARIANT: SQUARES (Digital/Tech resistance) ===== */}
      {HERO_BG_VARIANT === 'squares' && (
        <>
          <div className="absolute inset-0 z-0 opacity-20">
            <Squares
              direction="diagonal"
              speed={0.3}
              borderColor="#00997d"
              squareSize={50}
              hoverFillColor="#00997d"
            />
          </div>
        </>
      )}

      {/* ===== VARIANT: ORBS (Original simple gradient) ===== */}
      {HERO_BG_VARIANT === 'orbs' && (
        <>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00997d]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F9A825]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 z-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #00997d 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
        </>
      )}

      {/* ===== VARIANT: MINIMAL (Just gradient) ===== */}
      {HERO_BG_VARIANT === 'minimal' && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1a1a1d] via-[#0d1f1a] to-[#1a1a1d]" />
      )}

      {/* Parallax Floating Village Elements */}
      <Floating sensitivity={1} easingFactor={0.03} className="z-[5] pointer-events-none hidden md:block">
        {/* Tux Penguin - Top Left */}
        <FloatingElement depth={2} className="top-[15%] left-[8%]">
          <div className="w-16 h-16 rounded-full bg-[#00997d]/10 backdrop-blur-sm border border-[#00997d]/20 flex items-center justify-center">
            <Leaf className="w-8 h-8 text-[#00997d]" />
          </div>
        </FloatingElement>

        {/* USB Key - Top Right */}
        <FloatingElement depth={1.5} className="top-[20%] right-[10%]">
          <div className="w-14 h-14 rounded-xl bg-[#F9A825]/10 backdrop-blur-sm border border-[#F9A825]/20 flex items-center justify-center rotate-12">
            <Download className="w-7 h-7 text-[#F9A825]" />
          </div>
        </FloatingElement>

        {/* Recycled PC - Bottom Left */}
        <FloatingElement depth={1} className="bottom-[25%] left-[12%]">
          <div className="w-12 h-12 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center -rotate-6">
            <Monitor className="w-6 h-6 text-white/60" />
          </div>
        </FloatingElement>

        {/* Shield - Bottom Right */}
        <FloatingElement depth={2.5} className="bottom-[30%] right-[8%]">
          <div className="w-14 h-14 rounded-full bg-[#8B5CF6]/10 backdrop-blur-sm border border-[#8B5CF6]/20 flex items-center justify-center">
            <Shield className="w-7 h-7 text-[#8B5CF6]" />
          </div>
        </FloatingElement>

        {/* Users - Center Left */}
        <FloatingElement depth={0.8} className="top-[45%] left-[5%]">
          <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 backdrop-blur-sm border border-[#3B82F6]/20 flex items-center justify-center rotate-3">
            <Users className="w-5 h-5 text-[#3B82F6]" />
          </div>
        </FloatingElement>
      </Floating>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main Title */}
        <BlurText
          text="Bienvenue au Village"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-6"
          delay={100}
          animateBy="words"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-2"
        >
          Un village d&apos;irréductibles résiste à l&apos;Empire Big Tech.
        </motion.p>

        {/* Gold accent text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-[#F9A825] font-bold"
        >
          Leur arme secrète ? La Potion Magique.
        </motion.p>
      </div>
    </section>
  );
}

// =============================================================================
// STATS SECTION - Dark theme with scroll-triggered animations
// =============================================================================
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 240, suffix: 'M', label: 'PCs menacés dans le monde', color: '#ff6b6b' },
    { value: 68, suffix: '%', label: 'Admin française sous Win10', color: '#ffa726' },
    { value: 800, prefix: '€', label: 'Coût nouveau PC', color: '#ff6b6b' },
    { value: 0, prefix: '€', label: 'Coût Linux', color: '#00d9a7' },
  ];

  return (
    <section id="stats" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#1a1a1d] relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#00997d 1px, transparent 1px), linear-gradient(90deg, #00997d 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        <ParallaxSection speed={0.2}>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C62828]/20 text-[#ff6b6b] text-sm font-medium rounded-full mb-6"
            >
              <AlertTriangle className="w-4 h-4" />
              La crise est réelle
            </motion.span>

            <BlurText
              text="L'Empire impose l'obsolescence"
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6"
              delay={50}
              animateBy="words"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl"
            >
              Fin du support Windows 10. Des millions de PCs deviennent vulnérables.
            </motion.p>
          </div>
        </ParallaxSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const glowColor = stat.color === '#ff6b6b' ? 'red' : stat.color === '#ffa726' ? 'orange' : 'green';
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="h-full"
              >
                <GlowCard
                  glowColor={glowColor}
                  customSize
                  className="!w-full !h-full bg-white/5 backdrop-blur-sm"
                >
                  <div className="flex flex-col justify-center text-center p-6 relative z-10 min-h-[130px] h-full">
                    <div className="flex items-baseline justify-center gap-0.5 mb-2" style={{ color: stat.color }}>
                      {stat.prefix && <span className="text-xl">{stat.prefix}</span>}
                      <CountUp
                        to={stat.value}
                        duration={2}
                        className="text-4xl font-bold"
                      />
                      {stat.suffix && <span className="text-xl">{stat.suffix}</span>}
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">{stat.label}</p>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// CHOICE SECTION - With transformation animation
// =============================================================================
function ChoiceSection() {
  const { userChoice, setUserChoice, calculatorInputs, setCalculatorInputs } = useChoiceStore();
  const [schoolSize, setSchoolSize] = useState(calculatorInputs.schoolSize);
  const [showTransformation, setShowTransformation] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSchoolSizeChange = (value: number) => {
    setSchoolSize(value);
    setCalculatorInputs({ schoolSize: value });
  };

  const handleChoice = (choiceId: ChoiceId) => {
    setUserChoice(choiceId);
    if (choiceId === 'B') {
      setShowTransformation(true);
      setTimeout(() => setShowTransformation(false), 3000);
    }
  };

  const choices = [
    { id: 'A' as ChoiceId, title: "Payer l'Empire", desc: 'Nouveaux PCs Windows 11', Icon: CreditCard, color: '#C62828', cost: schoolSize * 800 },
    { id: 'B' as ChoiceId, title: 'Résister', desc: 'Linux gratuit + formation', Icon: Monitor, color: '#00997d', cost: schoolSize * 50, recommended: true },
    { id: 'C' as ChoiceId, title: 'Ignorer', desc: 'Risques sécurité + pannes', Icon: Moon, color: '#64748b', cost: schoolSize * 1200 },
  ];

  return (
    <section id="choice" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#1a1a1d] relative overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#00997d]/8 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-[#F9A825]/6 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2" />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        <ParallaxSection speed={0.15}>
          <div className="text-center mb-12">
            <BlurText
              text="Que ferait VOTRE école ?"
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6"
              delay={50}
              animateBy="words"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-400 text-lg md:text-xl"
            >
              Simulez vos économies sur 5 ans
            </motion.p>
          </div>
        </ParallaxSection>

        {/* Transformation Animation */}
        {showTransformation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1d]/90 backdrop-blur-sm"
          >
            <Shuffle
              text="WINDOWS → LINUX"
              colorFrom="#C62828"
              colorTo="#00997d"
              shuffleTimes={5}
              duration={0.5}
              className="text-4xl md:text-6xl font-bold"
            />
          </motion.div>
        )}

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12 max-w-sm mx-auto cursor-auto"
          data-cursor-default
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400 font-medium">Nombre de PCs</span>
            <motion.span
              key={schoolSize}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-[#00d9a7]"
            >
              {schoolSize}
            </motion.span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            value={schoolSize}
            onChange={(e) => handleSchoolSizeChange(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-white/10 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00997d] [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </motion.div>

        {/* Choice Cards with Magic UI */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {choices.map((choice, i) => (
            <motion.div
              key={choice.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              className="relative"
            >
              <MagicCard
                gradientSize={250}
                gradientColor={`${choice.color}30`}
                gradientOpacity={0.6}
                gradientFrom={choice.color}
                gradientTo={choice.id === 'B' ? '#F9A825' : `${choice.color}80`}
                className={cn(
                  'rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-[1.02]',
                  userChoice === choice.id && 'scale-[1.02]'
                )}
              >
                <button
                  onClick={() => handleChoice(choice.id)}
                  className={cn(
                    'relative w-full h-full p-8 rounded-2xl text-left transition-all duration-300',
                    'bg-[#242428]/80 backdrop-blur-sm border border-white/10',
                    choice.recommended && !userChoice && 'ring-2 ring-[#00997d]/30'
                  )}
                >
                  {/* Animated BorderBeam for selected card */}
                  {userChoice === choice.id && (
                    <BorderBeam
                      size={100}
                      duration={4}
                      colorFrom={choice.color}
                      colorTo={choice.id === 'B' ? '#F9A825' : `${choice.color}80`}
                      borderWidth={2}
                    />
                  )}

                  {/* Recommended badge */}
                  {choice.recommended && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-3 left-4 px-4 py-1.5 bg-gradient-to-r from-[#00997d] to-[#00b894] text-white text-[10px] font-bold rounded-full uppercase tracking-wider z-10 shadow-lg shadow-[#00997d]/25"
                    >
                      Recommandé
                    </motion.span>
                  )}

                  <div className="relative z-10">
                    {/* Icon and title */}
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{ backgroundColor: `${choice.color}20` }}
                      >
                        <choice.Icon className="w-7 h-7" style={{ color: choice.color }} />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white">{choice.title}</h3>
                    </div>

                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">{choice.desc}</p>

                    {/* Cost with NumberTicker */}
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2 font-medium">
                        Coût sur 5 ans
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold" style={{ color: choice.color }}>€</span>
                        <NumberTicker
                          value={choice.cost}
                          className="text-4xl font-bold tabular-nums"
                          style={{ color: choice.color }}
                          delay={0.5 + i * 0.2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Selected checkmark */}
                  {userChoice === choice.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white z-10 shadow-lg"
                      style={{
                        backgroundColor: choice.color,
                        boxShadow: `0 4px 15px ${choice.color}40`
                      }}
                    >
                      <Check className="w-5 h-5" strokeWidth={3} />
                    </motion.div>
                  )}
                </button>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        {/* Savings display with SparklesText */}
        {userChoice === 'B' && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="mt-12 relative overflow-hidden"
          >
            <div className="relative text-center p-10 bg-gradient-to-br from-[#00997d]/15 via-[#00b894]/8 to-[#F9A825]/10 rounded-3xl border border-[#00997d]/30 backdrop-blur-sm">
              {/* Animated border beam around savings box */}
              <BorderBeam
                size={150}
                duration={6}
                colorFrom="#00997d"
                colorTo="#F9A825"
                borderWidth={1}
              />

              <SparklesText
                colors={{ first: '#00997d', second: '#F9A825' }}
                sparklesCount={12}
                className="text-2xl md:text-3xl font-bold"
              >
                <span className="bg-gradient-to-r from-[#00d9a7] to-[#00997d] bg-clip-text text-transparent">
                  Économie de €{((schoolSize * 800) - (schoolSize * 50)).toLocaleString()}
                </span>
              </SparklesText>

              <p className="text-gray-400 mt-2 text-lg">sur 5 ans !</p>

              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {['Autonomie technologique', 'Données souveraines', 'Durabilité'].map((item, idx) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm font-medium text-[#00d9a7] border border-[#00997d]/30"
                  >
                    + {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// =============================================================================
// GAME SECTION - "Libérez vos Logiciels" - Immersive Experience
// =============================================================================
function GameSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="game" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#1a1a1d] overflow-hidden cursor-auto" data-cursor-default>
      {/* Subtle ambient particles - matching SuccessStoriesSection */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Particles
          particleCount={25}
          particleSpread={25}
          speed={0.02}
          particleColors={['#00997d', '#F9A825']}
          alphaParticles={true}
          particleBaseSize={30}
          disableRotation={true}
        />
      </div>

      {/* Subtle gradient orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00997d]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F9A825]/8 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        <ParallaxSection speed={0.1}>
          <div className="text-center mb-8">
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F9A825]/20 text-[#F9A825] text-sm font-medium rounded-full mb-4"
            >
              <Gamepad2 className="w-4 h-4" />
              Libérez vos Logiciels
            </motion.span>

            {/* Animated title */}
            <BlurText
              text="Sauvez un PC de l'obsolescence"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
              delay={80}
              animateBy="words"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto"
            >
              Glissez la clé USB Linux sur le PC pour lui donner une
              <span className="text-[#F9A825] font-semibold"> seconde vie</span>
            </motion.p>
          </div>
        </ParallaxSection>

        {/* Game container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <ImmersiveRefurbishGame />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm mb-4">
            Vous voulez vraiment sauver votre PC ?
          </p>
          <motion.a
            href="https://nird.forge.apps.education.fr/linux/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00997d] text-white font-bold rounded-xl hover:bg-[#00b894] transition-colors"
          >
            <Download className="w-5 h-5" />
            Télécharger Linux NIRD
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// MEMORY GAME SECTION
// =============================================================================
function MemoryGameSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="memory" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#1a1a1d] overflow-hidden cursor-auto" data-cursor-default>
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Particles
          particleCount={20}
          particleSpread={20}
          speed={0.015}
          particleColors={['#00997d', '#9C27B0']}
          alphaParticles={true}
          particleBaseSize={25}
          disableRotation={true}
        />
      </div>

      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#00997d]/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#9C27B0]/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto">
        <ParallaxSection speed={0.1}>
          <div className="text-center mb-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00997d]/20 text-[#00d9a7] text-sm font-medium rounded-full mb-4"
            >
              <Gamepad2 className="w-4 h-4" />
              Alternatives Libres
            </motion.span>

            <BlurText
              text="Trouve les paires Open Source"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
              delay={80}
              animateBy="words"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto"
            >
              Chaque logiciel propriétaire a son alternative libre. Découvre-les !
            </motion.p>
          </div>
        </ParallaxSection>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <MemoryGame />
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// TOWER DEFENSE SECTION - Epic Battle Header
// =============================================================================
function TowerDefenseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="defense" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#1a1a1d] overflow-hidden cursor-auto" data-cursor-default>
      {/* Background particles - battle colors */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Particles
          particleCount={25}
          particleSpread={25}
          speed={0.02}
          particleColors={['#00997d', '#C62828']}
          alphaParticles={true}
          particleBaseSize={25}
          disableRotation={true}
        />
      </div>

      {/* Dramatic gradient orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C62828]/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#00997d]/12 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#C62828]/8 rounded-full blur-[150px]" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        <ParallaxSection speed={0.1}>
          <div className="text-center mb-10">
            {/* Battle Badge */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C62828]/20 text-[#ff6b6b] text-sm font-medium rounded-full mb-6"
            >
              <Swords className="w-4 h-4" />
              Défense du Village
            </motion.span>

            {/* VS Battle Icons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center gap-4 sm:gap-6 mb-6"
            >
              {/* Village Shield */}
              <motion.div
                animate={isInView ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="p-3 rounded-xl bg-[#00997d]/20 border border-[#00997d]/40"
              >
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#00997d]" />
              </motion.div>

              {/* VS Swords */}
              <motion.div
                animate={isInView ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl sm:text-3xl"
              >
                ⚔️
              </motion.div>

              {/* Big Tech Empire */}
              <motion.div
                animate={isInView ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="p-3 rounded-xl bg-[#C62828]/20 border border-[#C62828]/40"
              >
                <Landmark className="w-8 h-8 sm:w-10 sm:h-10 text-[#C62828]" />
              </motion.div>
            </motion.div>

            {/* Main Titles with BlurText */}
            <BlurText
              text="Protégez le Village"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2"
              delay={80}
              animateBy="words"
            />
            <BlurText
              text="contre Big Tech"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#C62828]"
              delay={120}
              animateBy="words"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-gray-400 text-base sm:text-lg mt-6 max-w-xl mx-auto"
            >
              Placez vos défenses stratégiquement pour repousser les invasions de l&apos;Empire numérique !
            </motion.p>
          </div>
        </ParallaxSection>

        {/* Game Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <TowerDefenseGame />
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// TYPING GAME SECTION
// =============================================================================
function TypingGameSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="typing" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#1a1a1d] overflow-hidden cursor-auto" data-cursor-default>
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Particles
          particleCount={20}
          particleSpread={20}
          speed={0.015}
          particleColors={['#00997d', '#F9A825']}
          alphaParticles={true}
          particleBaseSize={25}
          disableRotation={true}
        />
      </div>

      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#00997d]/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#F9A825]/10 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto">
        <ParallaxSection speed={0.1}>
          <div className="text-center mb-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F9A825]/20 text-[#F9A825] text-sm font-medium rounded-full mb-4"
            >
              <Gamepad2 className="w-4 h-4" />
              Terminal Magique
            </motion.span>

            <BlurText
              text="Maîtrisez le Terminal Linux"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
              delay={80}
              animateBy="words"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto"
            >
              Tapez les commandes Linux et battez Windows Update !
            </motion.p>
          </div>
        </ParallaxSection>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <TypingGame />
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// PILLARS SECTION - With GlareHover cards
// =============================================================================
function PillarsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillarData = [
    {
      id: 'inclusive',
      title: 'Inclusif',
      icon: Users,
      color: '#3B82F6',
      desc: 'Le numérique pour tous',
      details: [
        'Cercle élève-à-élève : les grands reconditionnent des PCs pour les petits',
        '132 ordinateurs reconditionnés livrés à 11 écoles',
        'Raspberry Pi 400 : ~5W vs 50-100W pour un PC standard',
        'Réduire la fracture numérique entre établissements'
      ]
    },
    {
      id: 'responsible',
      title: 'Responsable',
      icon: Shield,
      color: '#8B5CF6',
      desc: 'Maîtrise des données',
      details: [
        'Alternatives open source (LibreOffice, GIMP, Firefox...)',
        'Données en France/UE (souveraineté numérique)',
        'Apprendre aux élèves à CHOISIR, pas à subir',
        'RGPD respecté, pas de tracking publicitaire'
      ]
    },
    {
      id: 'sustainable',
      title: 'Durable',
      icon: Leaf,
      color: '#00997d',
      desc: 'Matériel qui dure 10+ ans',
      details: [
        'Linux fonctionne sur les vieux ordinateurs (PrimTux : 2Go RAM)',
        'Un SSD à €30 transforme un vieux PC lent en machine rapide',
        'Passer de 3-5 ans de durée de vie à 8-10 ans',
        'Réduire les déchets électroniques et l\'empreinte carbone'
      ]
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#1a1a1d] relative overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-[#00997d]/8 rounded-full blur-[100px] translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-[#F9A825]/6 rounded-full blur-[80px] -translate-x-1/2" />

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        <ParallaxSection speed={0.15}>
          <div className="text-center mb-8 sm:mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00997d]/20 text-[#00d9a7] text-sm font-medium rounded-full mb-6"
            >
              <Landmark className="w-4 h-4" />
              Les 3 Piliers
            </motion.span>

            <BlurText
              text="NIRD : Numérique"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8"
              delay={50}
              animateBy="words"
            />

            {/* TrueFocus for pillar names */}
            <TrueFocus
              sentence="Inclusif Responsable Durable"
              blurAmount={3}
              borderColor="#00997d"
              glowColor="rgba(0, 153, 125, 0.4)"
              animationDuration={0.5}
              pauseBetweenAnimations={2}
              onWordChange={(index) => setActiveIndex(index)}
            />
          </div>
        </ParallaxSection>

        {/* Pillar Cards with 3D Tilt + Glare Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-16">
          {pillarData.map((pillar, i) => {
            const Icon = pillar.icon;
            const isActive = i === activeIndex;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <CometCard rotateDepth={4} translateDepth={6} className="h-full">
                  <div
                    className={cn(
                      'relative p-8 rounded-2xl cursor-pointer transition-all duration-300 h-full',
                      'bg-[#242428]/80 backdrop-blur-sm border border-white/10',
                      isActive ? 'border-opacity-100' : 'opacity-80 hover:opacity-100'
                    )}
                    style={{ borderColor: isActive ? pillar.color : undefined }}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    {/* Subtle glow effect on active card */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                        <GlowingEffect
                          blur={0}
                          spread={10}
                          glow={true}
                          disabled={false}
                          proximity={100}
                          inactiveZone={0.5}
                        />
                      </div>
                    )}

                    <div className="relative z-10">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300"
                        style={{
                          backgroundColor: isActive ? `${pillar.color}20` : `${pillar.color}10`
                        }}
                      >
                        <Icon className="w-8 h-8" style={{ color: pillar.color }} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{pillar.title}</h3>
                      <p className="text-sm text-gray-400 mb-6">{pillar.desc}</p>

                      <ul className="space-y-3">
                        {pillar.details.map((detail, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-3 text-sm text-gray-400"
                          >
                            <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: pillar.color }} />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
// QUIZ SECTION - Test your knowledge (Dark theme)
// =============================================================================
function QuizSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="quiz" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#1a1a1d] relative overflow-hidden">
      {/* Ambient particles */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Particles
          particleCount={20}
          particleSpread={25}
          speed={0.015}
          particleColors={['#F9A825', '#00997d']}
          alphaParticles={true}
          particleBaseSize={25}
          disableRotation={true}
        />
      </div>

      {/* Subtle gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#F9A825]/10 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-[#00997d]/10 rounded-full blur-[80px] translate-y-1/2" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#F9A825 1px, transparent 1px), linear-gradient(90deg, #F9A825 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        <ParallaxSection speed={0.1}>
          <div className="text-center mb-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F9A825]/20 text-[#F9A825] text-sm font-medium rounded-full mb-6"
            >
              <HelpCircle className="w-4 h-4" />
              Testez vos connaissances
            </motion.span>

            <BlurText
              text="Le Quiz du Village"
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4"
              delay={50}
              animateBy="words"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-gray-400 text-lg md:text-xl"
            >
              5 questions pour devenir un expert de la resistance numerique
            </motion.p>
          </div>
        </ParallaxSection>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          {/* Glow effect behind quiz */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#F9A825]/20 via-transparent to-[#00997d]/20 rounded-3xl blur-xl" />
          <div className="relative">
            <ResistanceQuiz questionCount={5} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// MEDIA COVERAGE SECTION - La Résistance dans les Médias (Premium Glass Design)
// =============================================================================
interface MediaCardData {
  id: number;
  title: string;
  description: string;
  duration: string;
  mediaType: 'video' | 'audio';
  source: string;
  url: string;
}

function MediaCard({ item, index, isInView }: { item: MediaCardData; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const MediaIcon = item.mediaType === 'video' ? Tv : Radio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
        <motion.div
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative h-[380px] w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {/* Gradient overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br from-[#00997d]/20 via-transparent to-[#F9A825]/20 pointer-events-none"
          />

          {/* Content */}
          <div className="relative h-full flex flex-col p-6">
            {/* Header with icon and duration badge */}
            <div className="flex items-start justify-between mb-5">
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 rounded-xl bg-[#00997d]/20 backdrop-blur-sm border border-[#00997d]/30"
              >
                <MediaIcon className="w-7 h-7 text-[#00997d]" />
              </motion.div>

              <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <Monitor className="w-3.5 h-3.5 text-white/80" />
                <span className="text-xs font-medium text-white/90">{item.duration}</span>
              </motion.div>
            </div>

            {/* Media source */}
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
              className="mb-2"
            >
              <span className="text-xs font-semibold text-[#F9A825] uppercase tracking-wider">
                {item.source}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-xl font-bold text-white mb-3 leading-tight line-clamp-2"
            >
              {item.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-sm text-white/60 leading-relaxed flex-grow line-clamp-3"
            >
              {item.description}
            </motion.p>

            {/* Play button */}
            <motion.div
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
              className="mt-5 w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-[#00997d]/20 hover:bg-[#00997d]/30 backdrop-blur-sm border border-[#00997d]/30 text-white font-semibold transition-all"
            >
              <motion.div animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.3 }}>
                <Play className="w-5 h-5 fill-[#00997d] text-[#00997d]" />
              </motion.div>
              <span className="text-[#00997d]">
                {item.mediaType === 'audio' ? 'Écouter' : 'Regarder'}
              </span>
            </motion.div>
          </div>

          {/* Glow effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.4 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-[#00997d]/40 via-transparent to-transparent pointer-events-none blur-xl"
          />
        </motion.div>

        {/* Shadow effect */}
        <motion.div
          animate={{ scale: isHovered ? 1.02 : 1, opacity: isHovered ? 0.5 : 0.2 }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-1 bg-gradient-to-br from-[#00997d]/30 to-[#F9A825]/30 rounded-2xl blur-2xl -z-10"
        />
      </a>
    </motion.div>
  );
}

function MediaCoverageSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mediaItems: MediaCardData[] = [
    {
      id: 1,
      title: "Windows 11 : l'alternative des logiciels libres",
      description: "Reportage sur la démarche NIRD et comment les établissements scolaires résistent à l'obsolescence programmée avec Linux.",
      duration: "2 min",
      mediaType: "video",
      source: "France 3 Alpes",
      url: "https://video.echirolles.fr/w/hVykGUtRZqRen6eiutqRvQ",
    },
    {
      id: 2,
      title: "Face à l'obsolescence, le logiciel libre comme solution",
      description: "Grand reportage sur les alternatives aux mises à jour forcées de Windows et l'impact sur l'éducation nationale.",
      duration: "4 min",
      mediaType: "audio",
      source: "France Inter",
      url: "https://www.radiofrance.fr/franceinter/podcasts/le-grand-reportage-de-france-inter/le-grand-reportage-du-mardi-14-octobre-2025-4136495",
    },
    {
      id: 3,
      title: "L'État obligé de jeter des milliers d'ordinateurs ?",
      description: "Enquête sur l'impact environnemental de l'obsolescence logicielle dans le secteur public français.",
      duration: "3 min",
      mediaType: "video",
      source: "France Info",
      url: "https://www.youtube.com/watch?v=76T8oubek-c",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#1a1a1d] relative overflow-hidden">
      {/* Subtle ambient particles */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Particles
          particleCount={15}
          particleSpread={30}
          speed={0.015}
          particleColors={['#00997d', '#F9A825']}
          alphaParticles={true}
          particleBaseSize={25}
          disableRotation={true}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#00997d]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F9A825]/8 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ParallaxSection speed={0.1}>
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F9A825]/20 text-[#F9A825] text-sm font-medium rounded-full mb-6"
            >
              <Newspaper className="w-4 h-4" />
              Dans les médias
            </motion.span>

            <BlurText
              text="La Résistance fait parler d'elle"
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6"
              delay={80}
              animateBy="words"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl"
            >
              Les grands médias français témoignent du mouvement NIRD
            </motion.p>
          </div>
        </ParallaxSection>

        {/* Media Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaItems.map((item, index) => (
            <MediaCard key={item.id} item={item} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Additional Resources Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.cafepedagogique.net/2025/04/27/bruay-labuissiere-voyage-au-centre-du-libre-educatif/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#00997d] transition-colors"
          >
            <span>En savoir plus sur le projet NIRD au lycée Carnot</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// CTA SECTION - Premium finale with immersive effects
// =============================================================================
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: '132+', label: 'PCs sauvés de la poubelle' },
    { value: '11', label: 'Écoles du réseau NIRD' },
    { value: '€0', label: 'Coût du logiciel Linux' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1d]">
      {/* Layer 1: Dark gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1d] via-[#0d1f1a] to-[#1a1a1d]" />

      {/* Layer 2: Animated waves background */}
      <div className="absolute inset-0 z-[1] opacity-20">
        <Waves
          lineColor="#00997d"
          waveSpeedX={0.006}
          waveSpeedY={0.002}
          waveAmpX={30}
          waveAmpY={15}
          xGap={16}
          yGap={32}
        />
      </div>

      {/* Layer 3: Floating particles */}
      <div className="absolute inset-0 z-[2] opacity-40">
        <Particles
          particleCount={40}
          particleSpread={30}
          speed={0.02}
          particleColors={['#00997d', '#F9A825', '#ffffff']}
          alphaParticles={true}
          particleBaseSize={40}
          moveParticlesOnHover={true}
        />
      </div>

      {/* Layer 4: Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00997d]/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#F9A825]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Main Title - Extra large, tighter spacing */}
        <div className="text-center">
          <BlurText
            text="Rejoignez"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tight leading-none"
            delay={60}
            animateBy="letters"
          />
        </div>
        <div className="text-center mb-6 sm:mb-10">
          <BlurText
            text="le Village"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-[#00997d] tracking-tight leading-none"
            delay={80}
            animateBy="letters"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-xl md:text-2xl text-gray-300 mb-3 max-w-2xl mx-auto"
        >
          Des centaines d&apos;écoles ont déjà fait le choix de la liberté numérique.
        </motion.p>

        {/* Gold accent question */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center text-2xl md:text-3xl font-bold text-[#F9A825] mb-10"
        >
          Et vous ?
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              className="text-center px-5 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <p className="text-2xl md:text-3xl font-bold text-[#00997d]">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons with Shatter Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Primary CTA - Download Linux NIRD */}
          <div className="flex flex-col items-center">
            <ShatterButton
              shatterColor="#00997d"
              shardCount={25}
              onClick={() => window.open('https://nird.forge.apps.education.fr/linux/', '_blank')}
              className="text-lg"
            >
              <span className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Télécharger Linux NIRD
              </span>
            </ShatterButton>
            <p className="text-sm text-gray-400 mt-2">Gratuit - Fonctionne sur vos anciens PC</p>
          </div>

          {/* Secondary CTA - Discover the movement */}
          <div className="flex flex-col items-center">
            <ShatterButton
              shatterColor="#F9A825"
              shardCount={20}
              onClick={() => window.open('https://nird.forge.apps.education.fr/', '_blank')}
              className="text-lg"
            >
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Découvrir le Mouvement
              </span>
            </ShatterButton>
            <p className="text-sm text-gray-400 mt-2">Ressources, guides et communauté</p>
          </div>
        </motion.div>

        {/* Bottom quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-14 text-center text-sm text-gray-400 italic"
        >
          &ldquo;Un village d&apos;irréductibles enseignants et élèves résiste encore à l&apos;envahisseur.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}

// =============================================================================
// FOOTER
// =============================================================================
function Footer() {
  return (
    <footer className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-[#1a1a1d] text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-sm">
            {[
              { label: 'Site NIRD', href: 'https://nird.forge.apps.education.fr/' },
              { label: 'Linux NIRD', href: 'https://nird.forge.apps.education.fr/linux/' },
              { label: 'Variants', href: '/variants', internal: true },
              { label: 'Tonton Roger 🤖', href: 'https://chatbot-kappa-mocha.vercel.app/' },
              { label: 'Audio visuelisation 🎧', href: 'https://interctive-audio.vercel.app/' },
            ].map((link) => (
              <div key={link.label}>
                {link.internal ? (
                  <Link href={link.href} className="text-gray-400 hover:text-[#00997d] transition-colors">
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#00997d] transition-colors"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            <Landmark className="w-4 h-4" />
            &ldquo;Un village d&apos;irréductibles enseignants et élèves résiste encore à l&apos;envahisseur.&rdquo;
          </p>
          <p className="text-sm text-gray-400 mt-3">
            Projet sous licence libre • Numérique Inclusif, Responsable, Durable
          </p>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// SCROLL SECTION TRACKER HOOK
// =============================================================================
function useScrollSectionTracker() {
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    // Reordered for better narrative flow: Problem → Urgency → Decision → Practice → Education → Games → Credibility → Action
    const sections = [
      'hero', 'stats', 'threats', 'choice',
      'scenario-teasers', 'pillars', 'knowledge-potion',
      'game', 'memory', 'defense', 'quiz', 'typing',
      'media-coverage', 'cta'
    ];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setCurrentSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0.3, 0.5],
      rootMargin: '-10% 0px -10% 0px'
    });

    // Observe all sections with data-section attribute
    sections.forEach((sectionId) => {
      const element = document.querySelector(`[data-section="${sectionId}"]`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return currentSection;
}

// =============================================================================
// MAIN PAGE - With Lenis smooth scroll
// Sections ordered for visual flow: Dark → Light → Light → Dark → Light → Dark
// =============================================================================
export default function Home() {
  const currentSection = useScrollSectionTracker();

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <main className="relative min-h-screen bg-white">
        {/* Custom animated cursor */}
        <SmoothCursor />
        {/* <Navigation /> */}

        {/* Scroll progress indicator */}
        <ScrollProgressBar color="#00997d" glowColor="#F9A825" height={3} />

        {/* Character Narrator - Floating dialogue */}
        <CharacterGuide currentSection={currentSection} />

        {/* Achievement Toast - Shows badge unlocks */}
        <AchievementToast />

        {/* 1. HOOK - Welcome to the village */}
        <div data-section="hero">
          <HeroSection />
        </div>

        {/* 2. CRISIS - The problem is real */}
        <div data-section="stats">
          <StatsSection />
        </div>

        {/* 3. THREATS - Amplify urgency BEFORE solutions */}
        <div data-section="threats">
          <ThreatsSection />
        </div>

        {/* 4. DECISION - What would your school do? */}
        <div data-section="choice">
          <ChoiceSection />
        </div>

        {/* 5. SCENARIOS - Real-world grounding (moved up) */}
        <div data-section="scenario-teasers">
          <DefisSection />
        </div>

        {/* 6. PILLARS - The NIRD framework */}
        <div data-section="pillars">
          <PillarsSection />
        </div>

        {/* 7. ALTERNATIVES - Discover software alternatives */}
        <div data-section="knowledge-potion">
          <KnowledgePotionSection />
        </div>

        {/* 8. REFURBISH GAME - Save a PC from obsolescence */}
        <div data-section="game">
          <GameSection />
        </div>

        {/* 9. MEMORY GAME - Match open source alternatives */}
        <div data-section="memory">
          <MemoryGameSection />
        </div>

        {/* 10. TOWER DEFENSE - Defend the village */}
        <div data-section="defense">
          <TowerDefenseSection />
        </div>

        {/* 11. QUIZ - Test your knowledge */}
        <div data-section="quiz">
          <QuizSection />
        </div>

        {/* 12. TYPING - Master the terminal */}
        <div data-section="typing">
          <TypingGameSection />
        </div>

        {/* 13. MEDIA - Credibility through press coverage */}
        <div data-section="media-coverage">
          <MediaCoverageSection />
        </div>

        {/* 14. CTA - Join the village */}
        <div data-section="cta">
          <CTASection />
        </div>

        <Footer />
      </main>
    </ReactLenis>
  );
}
