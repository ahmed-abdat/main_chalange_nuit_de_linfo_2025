'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { Shield, Users, Laptop, FlaskConical, BookOpen, Castle, Usb, Monitor, Cpu, HardDrive, Zap, AlertTriangle, DollarSign, Recycle, Globe, FileText, Video, Cloud, MessageSquare, ClipboardList, Leaf } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mystical Components
import { Component as EtheralShadow } from '@/components/ui/etheral-shadow';
import AuroraCanvas from '@/components/ui/ambient-aurora';
import { NeonOrbs } from '@/components/ui/neon-orbs';

// Animation Components
import BlurText from '@/components/BlurText';
import Particles from '@/components/Particles';
import { Component as ShatterButton } from '@/components/ui/shatter-button';
import Waves from '@/components/Waves';
import Magnet from '@/components/Magnet';
import ClickSpark from '@/components/ClickSpark';

// Immersive Game
import ImmersiveRefurbishGame from '@/components/games/ImmersiveRefurbishGame';

import { cn } from '@/lib/utils';

/**
 * VARIANT C: MAGIC POTION - REDESIGNED
 * - Consistent dark theme throughout
 * - SVG/Icon based visuals (no random stock photos)
 * - Visual mini-games with Windows to Linux USB transformation
 * - Smooth parallax scrolling for immersive experience
 */

// =============================================================================
// PARALLAX SECTION WRAPPER
// =============================================================================
interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  bgSpeed?: number; // 0 = fixed, 1 = normal scroll, 0.5 = half speed
  contentSpeed?: number;
}

function ParallaxSection({ children, className, bgSpeed = 0.3, contentSpeed = 1 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', `${bgSpeed * 100}%`]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', `${(1 - contentSpeed) * 30}%`]);
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });
  const smoothContentY = useSpring(contentY, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <motion.div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y: smoothBackgroundY }} className="absolute inset-0 z-0" />
      <motion.div style={{ y: smoothContentY, opacity }} className="relative z-10">
        {children}
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// SCROLL REVEAL COMPONENT
// =============================================================================
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

function ScrollReveal({ children, delay = 0, direction = 'up', className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// FLOATING NAV
// =============================================================================
function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full transition-all duration-500',
        scrolled
          ? 'bg-card/90 backdrop-blur-xl border border-primary/30 shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="flex items-center gap-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <FlaskConical className="w-6 h-6 text-primary" />
        </motion.div>
        <span className="text-foreground font-bold hidden sm:block">Potion Magique</span>
        <div className="w-px h-6 bg-border hidden sm:block" />
        <Link href="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
          Accueil
        </Link>
        <a
          href="https://nird.forge.apps.education.fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 bg-primary text-primary-foreground text-sm rounded-full hover:bg-primary/90 transition-colors"
        >
          NIRD
        </a>
      </div>
    </motion.nav>
  );
}

// =============================================================================
// IMMERSIVE HERO - The Portal
// =============================================================================
function ImmersiveHero() {
  const [entered, setEntered] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity }}
      className="relative min-h-[200vh] overflow-hidden bg-background"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Layer 1: Deep gradient */}
        <motion.div style={{ scale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        </motion.div>

        {/* Layer 2: Aurora */}
        <div className="absolute inset-0 z-[1] opacity-30">
          <AuroraCanvas />
        </div>

        {/* Layer 3: Ethereal flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: entered ? 0.5 : 0.3 }}
          className="absolute inset-0 z-[2]"
        >
          <EtheralShadow
            color={entered ? 'var(--nird-emerald)' : 'var(--nird-gold)'}
            animation={{ scale: 40, speed: entered ? 25 : 15 }}
            noise={{ opacity: 0.1, scale: 1 }}
          />
        </motion.div>

        {/* Layer 4: Magic particles */}
        <div className="absolute inset-0 z-[3]">
          <Particles
            particleCount={entered ? 200 : 80}
            particleSpread={30}
            speed={entered ? 0.08 : 0.03}
            particleColors={['var(--nird-emerald)', 'var(--nird-gold)', 'var(--nird-forest-green)']}
            alphaParticles={true}
            particleBaseSize={entered ? 120 : 60}
            moveParticlesOnHover={true}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <AnimatePresence mode="wait">
            {!entered ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 1 }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-primary text-lg mb-8 tracking-[0.3em] font-medium"
                >
                  NOUS SOMMES EN 2025...
                </motion.p>

                {/* The Cauldron Portal */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: 'spring' }}
                  className="mb-12"
                >
                  <Magnet padding={100} magnetStrength={0.5}>
                    <motion.button
                      onClick={() => setEntered(true)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group"
                    >
                      {/* Glowing cauldron */}
                      <motion.div
                        animate={{
                          boxShadow: [
                            '0 0 60px var(--nird-gold)',
                            '0 0 100px var(--nird-emerald)',
                            '0 0 60px var(--nird-gold)',
                          ],
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-primary flex items-center justify-center bg-card/80 backdrop-blur-md"
                      >
                        <motion.div
                          animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            rotate: { repeat: Infinity, duration: 20, ease: 'linear' },
                            scale: { repeat: Infinity, duration: 2 }
                          }}
                        >
                          <FlaskConical className="w-20 h-20 md:w-28 md:h-28 text-primary" />
                        </motion.div>
                      </motion.div>

                      {/* Pulse rings */}
                      <motion.div
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 rounded-full border-2 border-primary"
                      />
                    </motion.button>
                  </Magnet>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="text-muted-foreground text-xl"
                >
                  Cliquez sur la potion pour entrer...
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="entered"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <BlurText
                  text="Bienvenue au Village"
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-6"
                  delay={100}
                  animateBy="words"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
                >
                  Un village d&apos;irréductibles résiste à l&apos;Empire Big Tech.
                  <br />
                  <span className="text-primary font-bold">Leur arme secrète ? La Potion Magique.</span>
                </motion.p>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

// =============================================================================
// THE THREAT - Empire with Icon-based Cards + Parallax
// =============================================================================
function TheThreat() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Parallax transforms with spring for smoothness
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const smoothBgY = useSpring(bgY, { stiffness: 100, damping: 30 });
  const contentScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const threats = [
    {
      icon: Monitor,
      stat: '240M',
      label: 'PCs condamnés',
      description: 'Windows 10 obsolète en octobre 2025',
    },
    {
      icon: DollarSign,
      stat: '€800',
      label: 'Par PC',
      description: 'Coût de remplacement imposé par Microsoft',
    },
    {
      icon: AlertTriangle,
      stat: '68%',
      label: 'Écoles vulnérables',
      description: 'Sans protection après la date limite',
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="relative min-h-screen py-32 px-6 overflow-hidden bg-background"
    >
      {/* Evil red glow with parallax */}
      <motion.div style={{ y: smoothBgY }} className="absolute inset-0 z-0">
        <EtheralShadow
          color="var(--nird-roman-red)"
          animation={{ scale: 50, speed: 20 }}
          noise={{ opacity: 0.1, scale: 1 }}
        />
      </motion.div>

      <motion.div style={{ scale: contentScale }} className="relative z-10 max-w-5xl mx-auto">
        {/* Warning badge */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-destructive/20 border-2 border-destructive rounded-2xl"
            >
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <span className="text-destructive text-2xl font-black">L&apos;EMPIRE APPROCHE</span>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Threat cards with staggered reveal */}
        <ClickSpark sparkColor="var(--nird-roman-red)" sparkCount={15}>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {threats.map((threat, i) => {
              const Icon = threat.icon;
              return (
                <ScrollReveal
                  key={i}
                  delay={i * 0.15}
                  direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    onHoverStart={() => setHoveredCard(i)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="cursor-pointer h-full"
                  >
                    <div
                      className={cn(
                        'p-8 rounded-3xl border-2 transition-all duration-300 bg-card/50 backdrop-blur-sm text-center h-full',
                        hoveredCard === i
                          ? 'border-destructive shadow-[0_0_40px_var(--nird-roman-red)]'
                          : 'border-destructive/30'
                      )}
                    >
                      <motion.div
                        animate={hoveredCard === i ? { rotate: [0, 10, -10, 0] } : {}}
                        className="inline-block mb-6"
                      >
                        <div className="w-20 h-20 rounded-2xl bg-destructive/20 flex items-center justify-center mx-auto">
                          <Icon className="w-10 h-10 text-destructive" />
                        </div>
                      </motion.div>

                      <p className="text-5xl font-black text-destructive mb-2">{threat.stat}</p>
                      <p className="text-xl font-bold text-foreground mb-2">{threat.label}</p>
                      <p className="text-muted-foreground text-sm">{threat.description}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </ClickSpark>

        <ScrollReveal delay={0.4}>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">
              Mais le Druide a une <span className="text-primary">solution</span>...
            </p>
          </div>
        </ScrollReveal>
      </motion.div>
    </motion.section>
  );
}

// =============================================================================
// DEVICE REPAIR WORKSHOP - Drag parts to fix broken laptop (RefurbishGame style)
// =============================================================================
type RepairState = 'idle' | 'dragging' | 'hovering' | 'installing' | 'success';
type DraggingPart = 'ssd' | 'ram' | 'linux' | null;

function DeviceRepairGame() {
  const [gameState, setGameState] = useState<RepairState>('idle');
  const [installedParts, setInstalledParts] = useState<string[]>([]);
  const [draggingPart, setDraggingPart] = useState<DraggingPart>(null);
  const [isOverPC, setIsOverPC] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);

  const pcRef = useRef<HTMLDivElement>(null);
  const ssdRef = useRef<HTMLDivElement>(null);
  const ramRef = useRef<HTMLDivElement>(null);
  const linuxRef = useRef<HTMLDivElement>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);

  const allPartsInstalled = installedParts.length === 3;
  const isInteractive = gameState === 'idle' || gameState === 'dragging' || gameState === 'hovering';

  const checkOverlap = useCallback((itemRef: React.RefObject<HTMLDivElement | null>) => {
    if (!pcRef.current || !itemRef.current) return false;
    const pcRect = pcRef.current.getBoundingClientRect();
    const itemRect = itemRef.current.getBoundingClientRect();
    const itemCenterX = itemRect.left + itemRect.width / 2;
    const itemCenterY = itemRect.top + itemRect.height / 2;
    return (
      itemCenterX >= pcRect.left &&
      itemCenterX <= pcRect.right &&
      itemCenterY >= pcRect.top &&
      itemCenterY <= pcRect.bottom
    );
  }, []);

  const getRef = (part: DraggingPart) => {
    if (part === 'ssd') return ssdRef;
    if (part === 'ram') return ramRef;
    if (part === 'linux') return linuxRef;
    return null;
  };

  const handleDrag = useCallback((part: DraggingPart) => {
    if (!isInteractive || !part || installedParts.includes(part)) return;
    setDraggingPart(part);
    setGameState('dragging');
    const ref = getRef(part);
    if (ref) {
      const isOver = checkOverlap(ref);
      setIsOverPC(isOver);
      if (isOver) setGameState('hovering');
    }
  }, [isInteractive, installedParts, checkOverlap]);

  const handleDragEnd = useCallback((part: DraggingPart) => {
    if (!part) return;
    if (isOverPC && isInteractive && !installedParts.includes(part)) {
      // Install the part
      setGameState('installing');
      setInstallProgress(0);

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20 + 10;
        if (progress >= 100) {
          clearInterval(interval);
          setInstallProgress(100);
          const newParts = [...installedParts, part];
          setInstalledParts(newParts);

          setTimeout(() => {
            if (newParts.length === 3) {
              setGameState('success');
            } else {
              setGameState('idle');
            }
            setDraggingPart(null);
            setIsOverPC(false);
          }, 300);
        }
        setInstallProgress(Math.min(progress, 100));
      }, 100);
    } else {
      setGameState('idle');
      setIsOverPC(false);
      setDraggingPart(null);
    }
  }, [isOverPC, isInteractive, installedParts]);

  const resetGame = () => {
    setGameState('idle');
    setInstalledParts([]);
    setDraggingPart(null);
    setIsOverPC(false);
    setInstallProgress(0);
  };

  // Accurate pricing based on NIRD reconditioning approach:
  // - SSD 120-256GB: ~20-35€ (we say ~30€)
  // - RAM: Already in the PC (reused)
  // - Linux: Free and open source
  const parts = [
    { id: 'ssd' as const, ref: ssdRef, name: 'SSD 256Go', price: '~30€', color: '#F9A825', icon: HardDrive, desc: 'Stockage rapide' },
    { id: 'ram' as const, ref: ramRef, name: 'RAM', price: 'Réutilisée', color: '#00997d', icon: Cpu, desc: 'Déjà dans le PC' },
    { id: 'linux' as const, ref: linuxRef, name: 'Linux NIRD', price: 'Gratuit', color: '#00997d', icon: Usb, desc: 'Open source' },
  ];

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="relative min-h-screen py-24 px-4 overflow-hidden bg-background"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            Atelier <span className="text-primary">Reconditionnement</span>
          </h2>
          <p className="text-muted-foreground">
            Glissez les composants vers le PC pour le réparer
          </p>
        </div>

        {/* Game Area - Three Column Layout */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">

          {/* LEFT - Draggable Parts */}
          <div className="flex flex-col items-end gap-4">
            {parts.map((part) => {
              const isInstalled = installedParts.includes(part.id);
              const isDragging = draggingPart === part.id;
              const Icon = part.icon;

              return (
                <motion.div
                  key={part.id}
                  ref={part.ref}
                  drag={isInteractive && !isInstalled}
                  dragSnapToOrigin
                  dragElastic={0.15}
                  whileDrag={{ scale: 1.1, zIndex: 100 }}
                  whileHover={isInteractive && !isInstalled ? { scale: 1.05 } : {}}
                  onDrag={() => handleDrag(part.id)}
                  onDragEnd={() => handleDragEnd(part.id)}
                  className={cn(
                    'select-none transition-all duration-200',
                    isInstalled && 'opacity-30 cursor-not-allowed',
                    !isInstalled && isInteractive && 'cursor-grab active:cursor-grabbing',
                    !isInteractive && !isInstalled && 'opacity-50 cursor-not-allowed'
                  )}
                  style={{ touchAction: 'none' }}
                >
                  <div className={cn(
                    'relative flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all',
                    isInstalled
                      ? 'border-accent/30 bg-accent/5'
                      : isDragging && isOverPC
                      ? 'border-primary bg-primary/20 shadow-lg shadow-primary/30'
                      : 'border-border bg-card hover:border-primary/50'
                  )}>
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${part.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: part.color }} />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="font-bold text-sm text-foreground">{part.name}</p>
                      <p className="text-[10px] text-muted-foreground">{part.desc}</p>
                      <p className="text-xs text-primary font-medium">{part.price}</p>
                    </div>
                    {isInstalled && (
                      <span className="text-accent text-sm font-bold">✓</span>
                    )}
                  </div>
                  {!isInstalled && isInteractive && (
                    <p className="text-[10px] text-muted-foreground text-center mt-1">
                      Glissez →
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* CENTER - PC/Laptop */}
          <div className="flex flex-col items-center">
            <motion.div
              ref={pcRef}
              className={cn(
                'relative w-[280px] md:w-[360px] aspect-[16/10] rounded-xl border-4 transition-all duration-300 shadow-2xl overflow-hidden',
                gameState === 'idle' && 'border-gray-600 bg-gray-900',
                gameState === 'dragging' && 'border-gray-500',
                gameState === 'hovering' && 'border-primary ring-4 ring-primary/40 shadow-primary/30',
                gameState === 'installing' && 'border-primary',
                gameState === 'success' && 'border-accent shadow-accent/40'
              )}
            >
              {/* Screen */}
              <div className="absolute inset-2 rounded-lg overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  {/* Broken State */}
                  {(gameState === 'idle' || gameState === 'dragging') && !allPartsInstalled && (
                    <motion.div
                      key="broken"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full bg-[#0078D4] flex flex-col items-center justify-center p-4"
                    >
                      <div className="text-5xl mb-2">:(</div>
                      <p className="text-white text-sm font-light">Votre PC est lent</p>
                      <p className="text-white/50 text-xs mt-1">Composants manquants: {3 - installedParts.length}</p>
                      <div className="flex gap-2 mt-4">
                        {parts.map((p) => (
                          <div
                            key={p.id}
                            className={cn(
                              'w-8 h-8 rounded border flex items-center justify-center',
                              installedParts.includes(p.id)
                                ? 'border-green-400 bg-green-500/20'
                                : 'border-white/30 bg-white/5'
                            )}
                          >
                            <p.icon className={cn(
                              'w-4 h-4',
                              installedParts.includes(p.id) ? 'text-green-400' : 'text-white/50'
                            )} />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Hover State */}
                  {gameState === 'hovering' && (
                    <motion.div
                      key="hover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full bg-gradient-to-b from-[#0a2a1a] to-[#001a10] flex flex-col items-center justify-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        {draggingPart && parts.find(p => p.id === draggingPart) && (
                          React.createElement(parts.find(p => p.id === draggingPart)!.icon, {
                            className: 'w-12 h-12 text-primary'
                          })
                        )}
                      </motion.div>
                      <p className="text-primary font-bold mt-3">Relâchez pour installer !</p>
                    </motion.div>
                  )}

                  {/* Installing */}
                  {gameState === 'installing' && (
                    <motion.div
                      key="installing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full bg-[#1a1a1a] flex flex-col items-center justify-center p-6"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      >
                        <HardDrive className="w-10 h-10 text-primary" />
                      </motion.div>
                      <p className="text-primary text-sm mt-4">Installation...</p>
                      <div className="w-32 h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          animate={{ width: `${installProgress}%` }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Success - Linux Desktop */}
                  {gameState === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full h-full relative"
                      style={{
                        background: 'linear-gradient(135deg, #1a472a 0%, #2d5a3d 30%, #87ae73 70%, #a8c49a 100%)',
                      }}
                    >
                      {/* Top bar */}
                      <div className="absolute top-0 left-0 right-0 h-5 bg-[#2d2d2d]/90 flex items-center justify-between px-2 text-[8px] text-white">
                        <div className="flex items-center gap-1">
                          <Image src="/lunix.svg" alt="Linux" width={12} height={12} />
                          <span>Linux NIRD</span>
                        </div>
                        <span>14:35</span>
                      </div>
                      {/* Center content */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                          >
                            <Image src="/lunix.svg" alt="Linux" width={48} height={48} className="mx-auto" />
                          </motion.div>
                          <p className="text-white font-bold text-sm mt-2 drop-shadow-lg">PC Réparé !</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Power LED */}
              <div className={cn(
                'absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-colors',
                gameState === 'success' && 'bg-accent shadow-[0_0_8px] shadow-accent',
                gameState !== 'success' && 'bg-orange-500 animate-pulse'
              )} />
            </motion.div>

            {/* Stand */}
            <div className="w-16 h-3 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-sm" />
            <div className="w-24 h-2 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full" />

            {/* Status */}
            <p className={cn(
              'text-sm mt-4 font-medium',
              gameState === 'success' ? 'text-accent' : 'text-muted-foreground'
            )}>
              {gameState === 'idle' && `${installedParts.length}/3 composants installés`}
              {gameState === 'dragging' && 'Glissez vers le PC'}
              {gameState === 'hovering' && 'Relâchez !'}
              {gameState === 'installing' && 'Installation...'}
              {gameState === 'success' && 'PC comme neuf !'}
            </p>
          </div>

          {/* RIGHT - Stats (all verified claims) */}
          <div className="flex flex-col items-start gap-3">
            <div className="p-3 rounded-lg bg-card border border-border">
              <p className="text-xs text-muted-foreground">Coût total</p>
              <p className="text-2xl font-black text-primary">~30€</p>
              <p className="text-[10px] text-muted-foreground">vs 600-800€ neuf</p>
            </div>
            <div className="p-3 rounded-lg bg-card border border-border">
              <p className="text-xs text-muted-foreground">Durée de vie</p>
              <p className="text-2xl font-black text-accent">+5 ans</p>
              <p className="text-[10px] text-muted-foreground">Source: NIRD</p>
            </div>
            <div className="p-3 rounded-lg bg-card border border-border">
              <p className="text-xs text-muted-foreground">CO₂ évité</p>
              <p className="text-2xl font-black text-green-500">~200kg</p>
              <p className="text-[10px] text-muted-foreground">vs PC neuf*</p>
            </div>
          </div>
        </div>

        {/* Success Results */}
        <AnimatePresence>
          {gameState === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-card border-2 border-accent rounded-2xl text-center max-w-lg mx-auto"
            >
              <h4 className="text-xl font-bold text-accent mb-2">PC Sauvé !</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Avec 30€ et Linux, ce PC est prêt pour 5 ans de plus
              </p>
              <div className="flex gap-3 justify-center">
                <ShatterButton
                  shatterColor="var(--nird-emerald)"
                  onClick={() => window.open('https://nird.forge.apps.education.fr/linux/', '_blank')}
                  className="px-6 py-3 font-bold text-sm"
                >
                  Télécharger Linux
                </ShatterButton>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted text-sm flex items-center gap-2"
                >
                  <Recycle className="w-4 h-4" />
                  Rejouer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

// =============================================================================
// PC LIBERATION GAME - USB to PC Visual + Parallax
// =============================================================================
function PCLiberationGame() {
  const [liberated, setLiberated] = useState<number[]>([]);
  const [usbPosition, setUsbPosition] = useState<number | null>(null);
  const [celebrating, setCelebrating] = useState(false);
  const totalPCs = 5;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Parallax effects
  const wavesY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const smoothWavesY = useSpring(wavesY, { stiffness: 100, damping: 30 });
  const contentScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);

  const handleUSBClick = (pcIndex: number) => {
    if (!liberated.includes(pcIndex)) {
      setUsbPosition(pcIndex);
      setTimeout(() => {
        setLiberated(prev => [...prev, pcIndex]);
        setUsbPosition(null);
        if (liberated.length + 1 === totalPCs) {
          setCelebrating(true);
        }
      }, 800);
    }
  };

  const resetGame = () => {
    setLiberated([]);
    setUsbPosition(null);
    setCelebrating(false);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="relative min-h-screen py-32 px-6 overflow-hidden bg-background"
    >
      {/* Waves background with parallax */}
      <motion.div style={{ y: smoothWavesY }} className="absolute inset-0 z-0 opacity-20">
        <Waves lineColor="var(--nird-emerald)" waveSpeedX={0.01} waveAmpX={30} waveAmpY={15} />
      </motion.div>

      {celebrating && (
        <div className="absolute inset-0 z-[1]">
          <Particles
            particleCount={200}
            particleSpread={40}
            speed={0.12}
            particleColors={['var(--nird-emerald)', 'var(--nird-gold)']}
            alphaParticles={true}
            particleBaseSize={120}
          />
        </div>
      )}

      <motion.div style={{ scale: contentScale }} className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Usb className="w-12 h-12 text-primary" />
              <Zap className="w-8 h-8 text-accent" />
              <Monitor className="w-12 h-12 text-accent" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              Libérez les <span className="text-accent">PC</span> !
            </h2>
            <p className="text-muted-foreground text-xl">
              Cliquez sur chaque PC pour y insérer la clé USB Linux
            </p>
          </div>
        </ScrollReveal>

        {/* Game Area */}
        <div className="relative p-8 bg-card/30 rounded-3xl border-2 border-accent/30 backdrop-blur-sm mb-8">
          <ClickSpark sparkColor="var(--nird-emerald)" sparkCount={12}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {Array.from({ length: totalPCs }).map((_, i) => {
                const isLiberated = liberated.includes(i);
                const isInstalling = usbPosition === i;

                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={!isLiberated && !isInstalling ? { scale: 1.1, y: -5 } : {}}
                    onClick={() => handleUSBClick(i)}
                    disabled={isLiberated || isInstalling}
                    className={cn(
                      'relative w-24 h-28 md:w-32 md:h-36 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300',
                      isLiberated
                        ? 'border-accent bg-accent/20 cursor-default'
                        : isInstalling
                        ? 'border-primary bg-primary/20'
                        : 'border-destructive/50 bg-destructive/10 hover:border-destructive cursor-pointer'
                    )}
                  >
                    {/* PC Screen */}
                    <div className={cn(
                      'w-16 h-12 md:w-20 md:h-14 rounded-lg mb-2 flex items-center justify-center transition-colors',
                      isLiberated ? 'bg-accent/30' : isInstalling ? 'bg-primary/30' : 'bg-destructive/20'
                    )}>
                      {isLiberated ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Image src="/lunix.svg" alt="Linux" width={24} height={24} />
                        </motion.div>
                      ) : isInstalling ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        >
                          <HardDrive className="w-6 h-6 text-primary" />
                        </motion.div>
                      ) : (
                        <Monitor className="w-6 h-6 text-destructive" />
                      )}
                    </div>

                    {/* PC Stand */}
                    <div className="w-6 h-1 bg-muted rounded" />
                    <div className="w-10 h-2 bg-muted rounded-b" />

                    {/* USB Animation */}
                    <AnimatePresence>
                      {isInstalling && (
                        <motion.div
                          initial={{ y: -50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute -top-4"
                        >
                          <Usb className="w-8 h-8 text-primary" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Status */}
                    <div className="absolute -bottom-6 text-xs font-medium">
                      {isLiberated ? (
                        <span className="text-accent">Linux</span>
                      ) : isInstalling ? (
                        <span className="text-primary">Installation...</span>
                      ) : (
                        <span className="text-destructive">Windows</span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </ClickSpark>

          {/* Progress */}
          <div className="mt-12 text-center">
            <p className="text-foreground font-bold text-xl mb-4">
              {celebrating ? 'Tous libérés !' : `${liberated.length}/${totalPCs} PC libérés`}
            </p>
            <div className="w-64 h-3 bg-muted rounded-full mx-auto overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(liberated.length / totalPCs) * 100}%` }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Success */}
        <AnimatePresence>
          {celebrating && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="text-3xl font-bold text-accent mb-6">
                Bravo ! Tous les PC sont libres !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ShatterButton
                  shatterColor="var(--nird-gold)"
                  onClick={() => window.open('https://nird.forge.apps.education.fr/', '_blank')}
                  className="px-8 py-4 font-bold"
                >
                  <Castle className="inline-block w-5 h-5 mr-2" />
                  Rejoindre NIRD
                </ShatterButton>
                <button
                  onClick={resetGame}
                  className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted"
                >
                  Rejouer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}

// =============================================================================
// SOFTWARE LIBERATION - Clean minimal style matching RefurbishGame
// =============================================================================
function SoftwareLiberation() {
  const [liberatedApps, setLiberatedApps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);

  // All alternatives are real open-source software used in French education
  // Source: NIRD recommendations and French Education Ministry guidelines
  const appSwaps = [
    { bigTech: 'Chrome', libre: 'Firefox', bigIcon: Globe, libreIcon: Globe, bigColor: '#4285F4', libreColor: '#FF7139', issue: 'Tracking Google' },
    { bigTech: 'MS Office', libre: 'LibreOffice', bigIcon: FileText, libreIcon: FileText, bigColor: '#D83B01', libreColor: '#18A303', issue: 'Licence payante' },
    { bigTech: 'Zoom', libre: 'BigBlueButton', bigIcon: Video, libreIcon: Video, bigColor: '#2D8CFF', libreColor: '#0F70B7', issue: 'Serveurs US' },
    { bigTech: 'Google Drive', libre: 'Nextcloud', bigIcon: Cloud, libreIcon: Cloud, bigColor: '#FBBC04', libreColor: '#0082C9', issue: 'Cloud Act US' },
    { bigTech: 'Teams', libre: 'Element', bigIcon: MessageSquare, libreIcon: MessageSquare, bigColor: '#6264A7', libreColor: '#0DBD8B', issue: 'Données Microsoft' },
    { bigTech: 'Google Forms', libre: 'Framaforms', bigIcon: ClipboardList, libreIcon: ClipboardList, bigColor: '#673AB7', libreColor: '#3A3A3A', issue: 'Profilage' },
  ];

  const allLiberated = liberatedApps.length === appSwaps.length;

  const liberateApp = (index: number) => {
    if (!liberatedApps.includes(index)) {
      setLiberatedApps([...liberatedApps, index]);
    }
  };

  const resetGame = () => {
    setLiberatedApps([]);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="relative min-h-screen py-24 px-4 overflow-hidden bg-background"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            Libérez vos <span className="text-primary">Logiciels</span>
          </h2>
          <p className="text-muted-foreground">
            Cliquez pour remplacer Big Tech par des alternatives libres
          </p>
        </div>

        {/* Game Layout */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4 md:gap-8">

          {/* LEFT - Big Tech Apps */}
          <div className="space-y-3">
            <p className="text-sm text-destructive font-medium text-center mb-4">Big Tech</p>
            {appSwaps.map((app, i) => {
              const isLiberated = liberatedApps.includes(i);
              const Icon = app.bigIcon;
              return (
                <motion.button
                  key={`bigtech-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={!isLiberated ? { scale: 1.02, x: 5 } : {}}
                  whileTap={!isLiberated ? { scale: 0.98 } : {}}
                  onClick={() => liberateApp(i)}
                  disabled={isLiberated}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-300 text-left',
                    isLiberated
                      ? 'border-gray-700 bg-gray-800/50 opacity-40 cursor-not-allowed'
                      : 'border-destructive/50 bg-card hover:border-destructive cursor-pointer'
                  )}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${app.bigColor}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: app.bigColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'font-bold text-sm truncate',
                      isLiberated ? 'text-gray-500 line-through' : 'text-foreground'
                    )}>
                      {app.bigTech}
                    </p>
                    {!isLiberated && (
                      <p className="text-[10px] text-destructive">{app.issue}</p>
                    )}
                  </div>
                  {!isLiberated && (
                    <span className="text-destructive text-lg">✕</span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* CENTER - Arrow / Progress */}
          <div className="flex flex-col items-center justify-center py-8">
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-3xl text-primary mb-4"
            >
              →
            </motion.div>

            {/* Progress Circle */}
            <div className="relative w-20 h-20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18" cy="18" r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted"
                />
                <motion.circle
                  cx="18" cy="18" r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={100}
                  animate={{ strokeDashoffset: 100 - (liberatedApps.length / appSwaps.length) * 100 }}
                  className={allLiberated ? 'text-accent' : 'text-primary'}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn(
                  'text-lg font-bold',
                  allLiberated ? 'text-accent' : 'text-foreground'
                )}>
                  {liberatedApps.length}/{appSwaps.length}
                </span>
              </div>
            </div>

            {allLiberated && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 text-accent font-bold text-xl"
              >
                ✓
              </motion.div>
            )}
          </div>

          {/* RIGHT - Libre Apps */}
          <div className="space-y-3">
            <p className="text-sm text-accent font-medium text-center mb-4">Logiciels Libres</p>
            {appSwaps.map((app, i) => {
              const isLiberated = liberatedApps.includes(i);
              const Icon = app.libreIcon;
              return (
                <motion.div
                  key={`libre-${i}`}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: isLiberated ? 1 : 0.3 }}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-300',
                    isLiberated
                      ? 'border-accent bg-accent/10'
                      : 'border-border bg-card/30'
                  )}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: isLiberated ? `${app.libreColor}20` : 'rgba(128,128,128,0.1)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: isLiberated ? app.libreColor : '#666' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'font-bold text-sm truncate',
                      isLiberated ? 'text-accent' : 'text-muted-foreground'
                    )}>
                      {app.libre}
                    </p>
                    {isLiberated && (
                      <p className="text-[10px] text-primary">Gratuit · Open Source</p>
                    )}
                  </div>
                  {isLiberated && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-accent text-lg"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Success Results */}
        <AnimatePresence>
          {allLiberated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-6 bg-card border-2 border-accent rounded-2xl text-center max-w-lg mx-auto"
            >
              <h4 className="text-xl font-bold text-accent mb-2">Souveraineté Retrouvée !</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Vos données restent en France, sous votre contrôle
              </p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <p className="text-lg font-black text-accent">0€</p>
                  <p className="text-[10px] text-muted-foreground">Coût total</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <p className="text-lg font-black text-primary">100%</p>
                  <p className="text-[10px] text-muted-foreground">RGPD</p>
                </div>
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <p className="text-lg font-black text-green-500">FR</p>
                  <p className="text-[10px] text-muted-foreground">Hébergé en France</p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <ShatterButton
                  shatterColor="var(--nird-gold)"
                  onClick={() => window.open('https://nird.forge.apps.education.fr/', '_blank')}
                  className="px-5 py-2.5 font-bold text-sm"
                >
                  Découvrir NIRD
                </ShatterButton>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted text-sm flex items-center gap-2"
                >
                  <Recycle className="w-4 h-4" />
                  Rejouer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

// =============================================================================
// THE VILLAGE - NIRD Pillars + Parallax
// =============================================================================
function TheVillage() {
  const [activeHut, setActiveHut] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Parallax effects
  const forestY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const smoothForestY = useSpring(forestY, { stiffness: 100, damping: 30 });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);

  const huts = [
    {
      icon: Users,
      title: 'Inclusif',
      subtitle: 'Pour tous les élèves',
      description: '132 PCs reconditionnés pour 11 écoles. Les grands aident les petits.',
      stat: '132 PCs',
    },
    {
      icon: Shield,
      title: 'Responsable',
      subtitle: 'Vos données, votre choix',
      description: 'Données souveraines en France. Pas de Big Tech. Pas de Cloud Act.',
      stat: '100% RGPD',
    },
    {
      icon: Recycle,
      title: 'Durable',
      subtitle: '+10 ans de vie',
      description: 'Un SSD à 30€ + Linux = PC comme neuf. Zéro déchet électronique.',
      stat: '+10 ans',
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="relative min-h-screen py-32 px-6 overflow-hidden bg-background"
    >
      {/* Forest ambiance with parallax */}
      <motion.div style={{ y: smoothForestY }} className="absolute inset-0 z-0 opacity-20">
        <EtheralShadow
          color="var(--nird-emerald)"
          animation={{ scale: 30, speed: 10 }}
          noise={{ opacity: 0.05, scale: 1 }}
        />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
              Les 3 Piliers du <span className="text-primary">Village</span>
            </h2>
            <p className="text-muted-foreground text-xl">NIRD = Numérique Inclusif, Responsable, Durable</p>
          </div>
        </ScrollReveal>

        <ClickSpark sparkColor="var(--nird-gold)" sparkCount={10}>
          <div className="grid md:grid-cols-3 gap-8">
            {huts.map((hut, i) => {
              const Icon = hut.icon;
              const isActive = activeHut === i;
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setActiveHut(isActive ? null : i)}
                  className={cn(
                    'p-8 rounded-3xl border-2 text-left transition-all duration-300 bg-card/50 backdrop-blur-sm',
                    isActive
                      ? 'border-primary shadow-[0_0_40px_var(--nird-emerald)]'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <motion.div
                    animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                    className="mb-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-primary mb-2">{hut.title}</h3>
                  <p className="text-muted-foreground mb-4">{hut.subtitle}</p>

                  <div className="mb-4 py-3 px-4 bg-primary/10 rounded-xl">
                    <p className="text-3xl font-black text-primary">{hut.stat}</p>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-border">
                          <p className="text-foreground">{hut.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="text-xs text-muted-foreground mt-4">
                    {isActive ? 'Fermer' : 'Cliquer pour en savoir plus'}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </ClickSpark>
      </div>
    </motion.section>
  );
}

// =============================================================================
// CELEBRATION FINALE + Parallax
// =============================================================================
function CelebrationFinale() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const particlesY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const smoothParticlesY = useSpring(particlesY, { stiffness: 100, damping: 30 });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.3, 1, 1, 1]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="relative min-h-screen py-32 px-6 overflow-hidden bg-gradient-to-t from-primary/20 via-background to-background"
    >
      {/* Celebration particles with parallax */}
      <motion.div style={{ y: smoothParticlesY }} className="absolute inset-0 z-0">
        <Particles
          particleCount={150}
          particleSpread={35}
          speed={0.1}
          particleColors={['var(--nird-gold)', 'var(--nird-emerald)']}
          alphaParticles={true}
          particleBaseSize={100}
          moveParticlesOnHover={true}
        />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-12"
        >
          {[FlaskConical, Laptop, Users, Shield, Recycle].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
            >
              <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
            </motion.div>
          ))}
        </motion.div>

        <BlurText
          text="Rejoignez le Village !"
          className="text-5xl md:text-7xl font-black text-foreground mb-8"
          delay={80}
          animateBy="words"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          La Potion Magique est prête. Le Village vous attend.
          <br />
          <span className="text-primary font-bold">Ensemble, libérons l&apos;école !</span>
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Magnet padding={60} magnetStrength={1.5}>
            <ShatterButton
              shatterColor="var(--nird-gold)"
              shardCount={30}
              onClick={() => window.open('https://nird.forge.apps.education.fr/', '_blank')}
              className="text-xl font-bold px-12 py-6 bg-card"
            >
              <Leaf className="inline-block mr-2 w-6 h-6" />
              Découvrir NIRD
            </ShatterButton>
          </Magnet>

          <Magnet padding={60} magnetStrength={1.5}>
            <ShatterButton
              shatterColor="var(--nird-emerald)"
              onClick={() => window.open('https://nird.forge.apps.education.fr/linux/', '_blank')}
              className="text-lg font-bold px-10 py-5"
            >
              <Laptop className="inline-block mr-2 w-5 h-5" />
              Télécharger Linux
            </ShatterButton>
          </Magnet>
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-xl italic text-muted-foreground"
        >
          &ldquo;Ils sont fous ces Romains... et leurs licences Microsoft !&rdquo;
          <cite className="block mt-3 text-primary not-italic font-bold">— Obélix</cite>
        </motion.blockquote>
      </div>
    </motion.section>
  );
}

// =============================================================================
// FOOTER
// =============================================================================
function MagicFooter() {
  return (
    <footer className="py-8 px-6 bg-card border-t border-border">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <FlaskConical className="w-5 h-5 text-primary" />
          <p className="text-primary font-medium">POTION MAGIQUE</p>
        </div>
        <p className="text-muted-foreground text-sm mb-4">La Nuit de l&apos;Info 2025</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary">Accueil</Link>
          <Link href="/variants" className="text-muted-foreground hover:text-primary">Variantes</Link>
          <a href="https://nird.forge.apps.education.fr/" target="_blank" rel="noopener noreferrer" className="text-primary">
            NIRD Officiel
          </a>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================
export default function MagicPotionExperience() {
  return (
    <div className="variant-potion dark scroll-smooth">
      <ClickSpark sparkColor="var(--nird-gold)" sparkCount={6}>
        <main className="min-h-screen bg-background text-foreground">
          <FloatingNav />
          <ImmersiveHero />
          <TheThreat />

          {/* Enhanced Immersive Game Section */}
          <ParallaxSection className="min-h-screen py-24 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-8">
                  <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                    Sauvez un <span className="text-primary">PC</span>
                  </h2>
                  <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                    Faites l&apos;expérience de la Potion Magique. Glissez le bon système pour sauver ce PC de l&apos;obsolescence programmée.
                  </p>
                </div>
              </ScrollReveal>
              <ImmersiveRefurbishGame />
            </div>
          </ParallaxSection>

          <PCLiberationGame />
          <SoftwareLiberation />
          <TheVillage />
          <CelebrationFinale />
          <MagicFooter />
        </main>
      </ClickSpark>
    </div>
  );
}
