'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import {
  RotateCcw, Folder, Globe, FileText, Image as ImageIcon, Music, Settings,
  Search, Wifi, Battery, Volume2, ChevronUp, ShieldX, Trophy,
  Zap, Leaf, Users, Shield, Star, PartyPopper, HardDrive, CreditCard
} from 'lucide-react';
import CountUp from '@/components/CountUp';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Particles from '@/components/Particles';

type GameState = 'intro' | 'idle' | 'dragging' | 'hovering' | 'installing' | 'booting' | 'success' | 'failure';
type ChoiceType = 'linux' | 'windows' | null;
type DraggingItem = 'linux' | 'windows' | null;

// =============================================================================
// CELEBRATION CONFETTI
// =============================================================================
function Confetti({ active }: { active: boolean }) {
  const confettiColors = ['#00997d', '#F9A825', '#4CAF50', '#00d9a7', '#FFD700'];

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -20,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            rotate: 0,
            opacity: 1
          }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
            rotate: Math.random() * 720 - 360,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 0.5,
            ease: 'easeOut'
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            left: 0,
          }}
        />
      ))}
    </div>
  );
}

// =============================================================================
// FLOATING ACHIEVEMENT TOAST
// =============================================================================
function AchievementToast({
  show,
  title,
  description,
  icon: Icon
}: {
  show: boolean;
  title: string;
  description: string;
  icon: typeof Trophy;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.8 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-[#00997d] to-[#00d9a7] p-1 rounded-2xl shadow-2xl">
            <div className="bg-gray-900 px-6 py-4 rounded-xl flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="w-12 h-12 rounded-full bg-[#00997d]/20 flex items-center justify-center"
              >
                <Icon className="w-6 h-6 text-[#00d9a7]" />
              </motion.div>
              <div>
                <p className="text-[#00d9a7] font-bold text-lg">{title}</p>
                <p className="text-white/70 text-sm">{description}</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Star className="w-5 h-5 text-[#F9A825]" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// IMPACT COUNTER (Floating real-time stats)
// =============================================================================
function ImpactCounter({
  co2Saved,
  moneySaved,
  pcsSaved,
  visible
}: {
  co2Saved: number;
  moneySaved: number;
  pcsSaved: number;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="flex gap-2">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="bg-green-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-green-500/30 flex items-center gap-1.5"
            >
              <Leaf className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-bold">{co2Saved}kg CO₂</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="bg-[#F9A825]/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#F9A825]/30 flex items-center gap-1.5"
            >
              <span className="text-[#F9A825] text-xs font-bold">€{moneySaved}</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="bg-[#00997d]/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#00997d]/30 flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5 text-[#00d9a7]" />
              <span className="text-[#00d9a7] text-xs font-bold">{pcsSaved} PC{pcsSaved > 1 ? 's' : ''}</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// NARRATIVE INTRO
// =============================================================================
function NarrativeIntro({ onStart }: { onStart: () => void }) {
  const [step, setStep] = useState(0);

  const narrativeSteps = [
    {
      text: "L'Empire Big Tech menace nos écoles...",
      subtext: "Windows 10 arrive en fin de vie le 14 octobre 2025",
      icon: ShieldX,
      color: '#C62828'
    },
    {
      text: "240 millions de PCs seront obsolètes",
      subtext: "Sans accès aux mises à jour de sécurité",
      icon: Shield,
      color: '#FF6B6B'
    },
    {
      text: "Mais le Village a une solution...",
      subtext: "La Potion Magique : Linux NIRD",
      icon: Zap,
      color: '#00997d'
    }
  ];

  useEffect(() => {
    if (step < narrativeSteps.length - 1) {
      const timer = setTimeout(() => setStep(step + 1), 2500);
      return () => clearTimeout(timer);
    }
  }, [step, narrativeSteps.length]);

  const currentStep = narrativeSteps[step];
  const Icon = currentStep.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/90 backdrop-blur-md z-40 flex items-center justify-center"
    >
      <div className="text-center px-6 max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${currentStep.color}20` }}
            >
              <Icon className="w-10 h-10" style={{ color: currentStep.color }} />
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {currentStep.text}
            </h3>
            <p className="text-white/60 text-lg mb-8">
              {currentStep.subtext}
            </p>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-8">
              {narrativeSteps.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: i === step ? 1.3 : 1 }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    i === step ? "bg-[#00997d]" : "bg-white/30"
                  )}
                />
              ))}
            </div>

            {step === narrativeSteps.length - 1 && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onStart}
                className="px-8 py-4 bg-gradient-to-r from-[#00997d] to-[#00d9a7] text-white font-bold rounded-xl text-lg hover:scale-105 transition-transform shadow-lg shadow-[#00997d]/30"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Commencer la mission
                </span>
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// =============================================================================
// ICON COMPONENTS
// =============================================================================
function TuxIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/lunix.svg"
      alt="Linux Tux"
      width={48}
      height={48}
      draggable={false}
      className={cn("object-contain pointer-events-none select-none", className)}
    />
  );
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/images/Windows_11_logo.svg"
      alt="Windows 11"
      width={48}
      height={48}
      draggable={false}
      className={cn("object-contain pointer-events-none select-none", className)}
    />
  );
}

// =============================================================================
// SCREEN COMPONENTS
// =============================================================================

function Windows10EOLScreen() {
  return (
    <div className="w-full h-full bg-[#0078D4] flex items-center justify-center text-white font-['Segoe_UI',sans-serif]">
      <div className="flex flex-col items-center justify-center text-center px-4 py-6">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl sm:text-6xl md:text-7xl mb-3"
        >
          :(
        </motion.div>
        <p className="text-sm sm:text-base md:text-lg font-light mb-1.5">Votre PC a rencontré un problème</p>
        <p className="text-white/60 text-[10px] sm:text-xs mb-3">Code d'arrêt: FIN_DE_SUPPORT_WINDOWS_10</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center">
            <WindowsIcon className="w-6 h-6 sm:w-8 sm:h-8 brightness-0 invert opacity-60" />
          </div>
          <div className="text-left">
            <p className="text-xs sm:text-sm font-medium">Windows 10</p>
            <p className="text-[9px] sm:text-xs text-white/50">Fin de support: 14 Oct 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinuxNIRDDesktop() {
  const desktopIcons = [
    { icon: Folder, label: 'Fichiers', color: '#F9A825' },
    { icon: Globe, label: 'Firefox', color: '#FF6611' },
    { icon: FileText, label: 'LibreOffice', color: '#00997d' },
  ];

  const dockApps = [
    { icon: Folder, color: '#F9A825' },
    { icon: Globe, color: '#FF6611' },
    { icon: FileText, color: '#18A303' },
    { icon: ImageIcon, color: '#9C27B0' },
    { icon: Music, color: '#E91E63' },
    { icon: Settings, color: '#607D8B' },
  ];

  const nirdPillars = [
    { label: 'Inclusif', desc: 'Gratuit pour tous', color: '#F9A825', Icon: Users },
    { label: 'Responsable', desc: 'Données privées', color: '#00997d', Icon: Shield },
    { label: 'Durable', desc: '+5 ans de vie', color: '#4CAF50', Icon: Leaf },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a472a 0%, #2d5a3d 30%, #87ae73 70%, #a8c49a 100%)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
            className="absolute w-2 h-2 bg-white/50 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`
            }}
          />
        ))}
      </div>

      {/* Top Panel */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-[#2d2d2d]/95 flex items-center justify-between px-2 text-white text-[9px]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-white/10 rounded">
            <TuxIcon className="w-3 h-3" />
            <span className="font-medium">Applications</span>
          </div>
          <span className="text-white/50">|</span>
          <span className="text-white/70">Fichiers</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="w-3 h-3 text-white/70" />
          <Volume2 className="w-3 h-3 text-white/70" />
          <Battery className="w-3 h-3 text-white/70" />
          <span className="text-white/70">14:35</span>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-10 left-3 flex flex-col gap-3">
        {desktopIcons.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center gap-1 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors shadow-lg">
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
            <span className="text-[8px] text-white font-medium drop-shadow-md">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* NIRD Pillars */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
        {nirdPillars.map((pillar, i) => (
          <motion.div
            key={pillar.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.15, type: 'spring' }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/15 backdrop-blur-md rounded-lg p-2 border border-white/20 shadow-lg text-center min-w-[70px] cursor-pointer"
          >
            <pillar.Icon className="w-5 h-5 mx-auto mb-1" style={{ color: pillar.color }} />
            <p className="text-white font-bold text-[9px]" style={{ color: pillar.color }}>{pillar.label}</p>
            <p className="text-white/70 text-[7px]">{pillar.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Plank Dock */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#2d2d2d]/80 backdrop-blur-md rounded-xl px-2 py-1.5 flex items-center gap-1.5 shadow-2xl border border-white/10"
        >
          {dockApps.map((app, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              whileHover={{ scale: 1.3, y: -8 }}
              className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
            >
              <app.icon className="w-4 h-4" style={{ color: app.color }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function Windows11Desktop({ hasError = false }: { hasError?: boolean }) {
  const taskbarApps = [
    { icon: Search, color: '#fff' },
    { icon: Folder, color: '#F9A825' },
    { icon: Globe, color: '#4285F4' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #0d1f33 50%, #162d4a 100%)',
      }}
    >
      {/* Windows 11 bloom effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-[#0078D4]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[#00BCF2]/20 rounded-full blur-3xl" />
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-4 left-3 flex flex-col gap-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center">
            <WindowsIcon className="w-6 h-6" />
          </div>
          <span className="text-[8px] text-white/80">Ce PC</span>
        </motion.div>
      </div>

      {/* Error Dialog */}
      {hasError && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-[#2d2d2d] rounded-lg shadow-2xl border border-white/10 overflow-hidden min-w-[220px]"
          >
            <div className="bg-[#1f1f1f] px-3 py-1.5 flex items-center justify-between">
              <span className="text-white text-[10px]">Problèmes Windows 11</span>
              <div className="w-2.5 h-2.5 rounded-sm bg-[#c42b1c]" />
            </div>
            <div className="p-3 space-y-2">
              {[
                { Icon: CreditCard, title: 'Coût: 800€+', desc: 'Nouveau PC obligatoire', color: '#ff6b6b', delay: 0.2 },
                { Icon: Shield, title: 'Télémétrie', desc: 'Données collectées', color: '#ffa726', delay: 0.35 },
                { Icon: HardDrive, title: 'E-déchet', desc: 'PC jeté à la poubelle', color: '#9e9e9e', delay: 0.5 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: item.delay }}
                  className="flex items-center gap-2 bg-white/5 rounded p-1.5"
                >
                  <item.Icon className="w-4 h-4" style={{ color: item.color }} />
                  <div>
                    <p className="text-[9px] font-bold" style={{ color: item.color }}>{item.title}</p>
                    <p className="text-white/50 text-[7px]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Windows 11 Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#1f1f1f]/90 backdrop-blur-xl border-t border-white/5">
        <div className="h-full flex items-center justify-center gap-1">
          <motion.div whileHover={{ scale: 1.1 }} className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center cursor-pointer">
            <WindowsIcon className="w-5 h-5" />
          </motion.div>
          {taskbarApps.map((app, i) => (
            <div key={i} className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center cursor-pointer">
              <app.icon className="w-4 h-4" style={{ color: app.color }} />
            </div>
          ))}
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/60 text-[9px]">
          <ChevronUp className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Volume2 className="w-3 h-3" />
          <span>14:35</span>
        </div>
      </div>
    </motion.div>
  );
}

function InstallingScreen({ choice, progress }: { choice: ChoiceType; progress: number }) {
  const isLinux = choice === 'linux';

  const linuxMessages = [
    'Détection du matériel...',
    'Copie des fichiers système...',
    'Installation de Linux NIRD...',
    'Configuration de Xfce...',
    'Installation des logiciels libres...',
    'Configuration du dock Plank...',
    'Finalisation...',
  ];

  const windowsMessages = [
    'Préparation des fichiers...',
    'Installation des fonctionnalités...',
    'Installation des mises à jour...',
    'Vérification de la compatibilité...',
    'Erreur de compatibilité TPM...',
  ];

  const messages = isLinux ? linuxMessages : windowsMessages;
  const messageIndex = Math.min(Math.floor(progress / (100 / messages.length)), messages.length - 1);

  return (
    <div className={cn(
      "w-full h-full flex flex-col items-center justify-center p-6",
      isLinux ? "bg-[#1a1a1a]" : "bg-[#0078D4]"
    )}>
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-6"
      >
        {isLinux ? (
          <TuxIcon className="w-16 h-16" />
        ) : (
          <WindowsIcon className="w-16 h-16 brightness-0 invert" />
        )}
      </motion.div>

      <p className={cn("text-lg font-medium mb-4", isLinux ? "text-[#00997d]" : "text-white")}>
        {isLinux ? "Installation de Linux NIRD" : "Installation de Windows 11"}
      </p>

      <div className="w-full max-w-[80%] h-2 bg-white/20 rounded-full overflow-hidden mb-3">
        <motion.div
          className={cn("h-full rounded-full", isLinux ? "bg-gradient-to-r from-[#00997d] to-[#00d9a7]" : "bg-white")}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <motion.p
        key={progress}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        className={cn("text-3xl font-bold mb-2", isLinux ? "text-[#00997d]" : "text-white")}
      >
        {Math.round(progress)}%
      </motion.p>

      <p className={cn("text-xs", isLinux ? "text-white/50" : "text-white/70")}>
        {messages[messageIndex]}
      </p>
    </div>
  );
}

function BootingScreen({ choice }: { choice: ChoiceType }) {
  const isLinux = choice === 'linux';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black">
      <div className="mb-4">
        {isLinux ? <TuxIcon className="w-20 h-20" /> : <WindowsIcon className="w-20 h-20" />}
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className={cn("w-8 h-8 border-2 rounded-full border-t-transparent", isLinux ? "border-[#00997d]" : "border-[#0078D4]")}
      />

      <p className={cn("text-sm mt-4", isLinux ? "text-[#00997d]" : "text-[#0078D4]")}>
        Démarrage...
      </p>
    </div>
  );
}

// =============================================================================
// USB DRIVE COMPONENT
// =============================================================================
function USBDrive({
  type,
  isActive,
  isHovering,
  direction
}: {
  type: 'linux' | 'windows';
  isActive: boolean;
  isHovering: boolean;
  direction: 'left' | 'right';
}) {
  const isLinux = type === 'linux';
  const gradient = isLinux
    ? 'linear-gradient(135deg, #00b894 0%, #00997d 50%, #006653 100%)'
    : 'linear-gradient(135deg, #2a9df4 0%, #0078D4 50%, #004a8c 100%)';

  return (
    <div className="relative">
      {/* Badge */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={cn(
          "absolute -top-6 left-1/2 -translate-x-1/2 text-white text-[8px] px-2 py-0.5 rounded-full whitespace-nowrap font-bold shadow-lg z-10",
          isLinux ? "bg-[#00997d]" : "bg-[#C62828]"
        )}
      >
        {isLinux ? '✓ Recommandé' : '⚠ Coûteux'}
      </motion.div>

      {/* USB Body */}
      <motion.div
        animate={isHovering ? {
          boxShadow: isLinux
            ? '0 0 30px rgba(0,153,125,0.8)'
            : '0 0 30px rgba(198,40,40,0.8)'
        } : {}}
        className={cn(
          'relative transition-all duration-300 flex items-center',
          direction === 'right' ? 'flex-row' : 'flex-row-reverse'
        )}
      >
        {/* USB Body */}
        <div
          className={cn(
            'w-20 h-14 md:w-24 md:h-16 relative overflow-hidden shadow-lg',
            direction === 'right' ? 'rounded-l-lg' : 'rounded-r-lg',
            isHovering && 'ring-2 ring-white/80'
          )}
          style={{ background: gradient }}
        >
          {/* Shine effect */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
          />

          {/* Logo & Label */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 px-2">
            <div className="flex-shrink-0">
              {isLinux ? <TuxIcon className="w-8 h-8 md:w-10 md:h-10" /> : <WindowsIcon className="w-8 h-8 md:w-10 md:h-10" />}
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-[9px] md:text-[10px] leading-tight drop-shadow-md">
                {isLinux ? 'LINUX' : 'WIN'}
              </p>
              <p className="text-white font-bold text-[9px] md:text-[10px] leading-tight drop-shadow-md">
                {isLinux ? 'NIRD' : '11'}
              </p>
              <p className="text-white/80 text-[7px] md:text-[8px] drop-shadow-sm">
                {isLinux ? 'GRATUIT' : '€145+'}
              </p>
            </div>
          </div>

          {/* LED */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className={cn(
              "absolute top-1 w-1.5 h-1.5 rounded-full",
              direction === 'right' ? 'left-1' : 'right-1',
              isLinux ? "bg-[#00ff88]" : "bg-[#00a2ff]"
            )}
          />
        </div>

        {/* USB Connector */}
        <div className={cn(
          "w-6 md:w-7 h-10 md:h-12 bg-gradient-to-r from-[#a0a0a0] to-[#c0c0c0] border border-[#808080] relative flex items-center justify-center",
          direction === 'right' ? 'rounded-r' : 'rounded-l'
        )}>
          <div className="w-4 md:w-5 h-7 md:h-8 bg-[#e8e8e8] rounded-sm border border-[#bbb] flex items-center justify-center">
            <div className="w-2 h-5 md:h-6 bg-white rounded-sm" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// =============================================================================
// MAIN GAME COMPONENT
// =============================================================================
export default function ImmersiveRefurbishGame() {
  // Start directly in idle state - no intro click needed
  const [gameState, setGameState] = useState<GameState>('idle');
  const [installProgress, setInstallProgress] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [isOverPC, setIsOverPC] = useState(false);
  const [choice, setChoice] = useState<ChoiceType>(null);
  const [draggingItem, setDraggingItem] = useState<DraggingItem>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [totalPCsSaved, setTotalPCsSaved] = useState(0);
  const [totalCO2Saved, setTotalCO2Saved] = useState(0);
  const [totalMoneySaved, setTotalMoneySaved] = useState(0);

  const pcRef = useRef<HTMLDivElement>(null);
  const linuxRef = useRef<HTMLDivElement>(null);
  const windowsRef = useRef<HTMLDivElement>(null);

  // Mouse position for glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

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

  const handleDrag = useCallback((itemType: 'linux' | 'windows') => {
    if (gameState === 'idle' || gameState === 'dragging' || gameState === 'hovering') {
      setDraggingItem(itemType);
      setGameState('dragging');
      const ref = itemType === 'linux' ? linuxRef : windowsRef;
      const isOver = checkOverlap(ref);
      setIsOverPC(isOver);
      if (isOver) setGameState('hovering');
    }
  }, [gameState, checkOverlap]);

  const handleDragEnd = useCallback((itemType: 'linux' | 'windows') => {
    if (isOverPC && (gameState === 'dragging' || gameState === 'hovering')) {
      handleDrop(itemType);
    } else {
      setGameState('idle');
      setIsOverPC(false);
      setDraggingItem(null);
    }
  }, [isOverPC, gameState]);

  const handleDrop = (itemType: 'linux' | 'windows') => {
    if (gameState === 'installing' || gameState === 'booting' || gameState === 'success' || gameState === 'failure') return;

    setChoice(itemType);
    setGameState('installing');
    setIsOverPC(false);
    setDraggingItem(null);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setInstallProgress(100);
        setTimeout(() => {
          setGameState('booting');
          setTimeout(() => {
            const finalState = itemType === 'linux' ? 'success' : 'failure';
            setGameState(finalState);
            setShowStats(true);

            if (itemType === 'linux') {
              // Success celebrations
              setShowConfetti(true);
              setShowAchievement(true);
              setTotalPCsSaved(prev => prev + 1);
              setTotalCO2Saved(prev => prev + 300);
              setTotalMoneySaved(prev => prev + 800);

              setTimeout(() => setShowConfetti(false), 3000);
              setTimeout(() => setShowAchievement(false), 4000);
            }
          }, 2000);
        }, 500);
      }
      setInstallProgress(Math.min(progress, 100));
    }, 300);
  };

  const resetGame = () => {
    setGameState('idle');
    setInstallProgress(0);
    setShowStats(false);
    setIsOverPC(false);
    setChoice(null);
    setDraggingItem(null);
  };

  const switchToLinux = () => {
    setShowStats(false);
    setChoice('linux');
    setInstallProgress(0);
    setGameState('installing');

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 4;
      if (progress >= 100) {
        clearInterval(interval);
        setInstallProgress(100);
        setTimeout(() => {
          setGameState('booting');
          setTimeout(() => {
            setGameState('success');
            setShowStats(true);
            setShowConfetti(true);
            setShowAchievement(true);
            setTotalPCsSaved(prev => prev + 1);
            setTotalCO2Saved(prev => prev + 300);
            setTotalMoneySaved(prev => prev + 800);

            setTimeout(() => setShowConfetti(false), 3000);
            setTimeout(() => setShowAchievement(false), 4000);
          }, 2000);
        }, 500);
      }
      setInstallProgress(Math.min(progress, 100));
    }, 300);
  };

  const startGame = () => {
    setGameState('idle');
  };

  const isInteractive = gameState === 'idle' || gameState === 'dragging' || gameState === 'hovering';

  return (
    <div
      className="relative w-full max-w-5xl mx-auto px-2 sm:px-3 md:px-4 overflow-visible py-4 sm:py-6 md:py-8"
      onMouseMove={handleMouseMove}
    >
      {/* Confetti */}
      <Confetti active={showConfetti} />

      {/* Achievement Toast */}
      <AchievementToast
        show={showAchievement}
        title="PC Sauvé !"
        description={`${totalPCsSaved} PC${totalPCsSaved > 1 ? 's' : ''} sauvé${totalPCsSaved > 1 ? 's' : ''} au total`}
        icon={Trophy}
      />

      {/* Narrative Intro */}
      <AnimatePresence>
        {gameState === 'intro' && <NarrativeIntro onStart={startGame} />}
      </AnimatePresence>

      {/* Impact Counter */}
      <ImpactCounter
        co2Saved={totalCO2Saved}
        moneySaved={totalMoneySaved}
        pcsSaved={totalPCsSaved}
        visible={totalPCsSaved > 0 && gameState !== 'intro'}
      />

      {/* Main Game Area - Responsive grid */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3 md:gap-6 justify-items-center mt-4 sm:mt-6 md:mt-8">

        {/* LEFT - Linux USB */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            ref={linuxRef}
            drag={isInteractive}
            dragSnapToOrigin
            dragElastic={0.15}
            whileDrag={{ scale: 1.15, rotate: -8, zIndex: 100 }}
            whileHover={isInteractive ? { scale: 1.08, y: -5 } : {}}
            onDrag={() => handleDrag('linux')}
            onDragEnd={() => handleDragEnd('linux')}
            className={cn(
              "cursor-grab active:cursor-grabbing select-none transition-opacity",
              !isInteractive && "opacity-50 cursor-not-allowed"
            )}
            style={{ touchAction: 'none' }}
          >
            <USBDrive
              type="linux"
              isActive={draggingItem === 'linux'}
              isHovering={draggingItem === 'linux' && isOverPC}
              direction="right"
            />
            <motion.p
              animate={{ opacity: isInteractive ? 1 : 0, x: [0, 5, 0] }}
              transition={{ x: { duration: 1.5, repeat: Infinity } }}
              className="mt-4 text-center text-xs text-[#00997d] font-medium h-5"
            >
              Glissez vers le PC →
            </motion.p>
          </motion.div>
        </div>

        {/* CENTER - PC Monitor - Responsive max width */}
        <div className="flex flex-col items-center w-full max-w-[280px] sm:max-w-[380px] md:max-w-[450px]">
          <motion.div
            ref={pcRef}
            animate={gameState === 'hovering' ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.5, repeat: gameState === 'hovering' ? Infinity : 0 }}
            className={cn(
              'relative w-full aspect-[16/10] rounded-xl border-4 transition-all duration-300 shadow-2xl overflow-hidden',
              (gameState === 'idle' || gameState === 'dragging') && 'border-gray-600 bg-gray-900',
              gameState === 'hovering' && draggingItem === 'linux' && 'border-[#00997d] ring-4 ring-[#00997d]/50',
              gameState === 'hovering' && draggingItem === 'windows' && 'border-[#C62828] ring-4 ring-[#C62828]/50',
              (gameState === 'installing' || gameState === 'booting') && choice === 'linux' && 'border-[#00997d]',
              (gameState === 'installing' || gameState === 'booting') && choice === 'windows' && 'border-[#0078D4]',
              gameState === 'success' && 'border-[#00997d] shadow-[0_0_50px_rgba(0,153,125,0.5)]',
              gameState === 'failure' && 'border-[#C62828]'
            )}
          >
            {/* Screen */}
            <div className="absolute inset-1.5 md:inset-2 rounded-lg overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                {(gameState === 'idle' || gameState === 'dragging') && (
                  <motion.div key="win10-eol" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                    <Windows10EOLScreen />
                  </motion.div>
                )}

                {gameState === 'hovering' && draggingItem === 'linux' && (
                  <motion.div
                    key="hover-linux"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0a2a1a] to-[#001a10] p-6"
                  >
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                      <TuxIcon className="w-20 h-20 md:w-24 md:h-24" />
                    </motion.div>
                    <p className="text-[#00997d] font-bold text-xl mt-4">Relâchez pour installer !</p>
                    <p className="text-white/50 text-sm mt-1">Installation 100% gratuite</p>
                  </motion.div>
                )}

                {gameState === 'hovering' && draggingItem === 'windows' && (
                  <motion.div
                    key="hover-win"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#2a1a1a] to-[#1a0a0a] p-6"
                  >
                    <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
                      <WindowsIcon className="w-20 h-20 md:w-24 md:h-24" />
                    </motion.div>
                    <p className="text-[#C62828] font-bold text-xl mt-4">Êtes-vous sûr ?</p>
                    <p className="text-white/50 text-sm mt-1">Coût estimé: €800+ (nouveau PC)</p>
                  </motion.div>
                )}

                {gameState === 'installing' && (
                  <motion.div key="installing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                    <InstallingScreen choice={choice} progress={installProgress} />
                  </motion.div>
                )}

                {gameState === 'booting' && (
                  <motion.div key="booting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                    <BootingScreen choice={choice} />
                  </motion.div>
                )}

                {gameState === 'success' && (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
                    <LinuxNIRDDesktop />
                  </motion.div>
                )}

                {gameState === 'failure' && (
                  <motion.div key="failure" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
                    <Windows11Desktop hasError />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Power LED */}
            <motion.div
              animate={gameState === 'success' ? { boxShadow: ['0 0 5px #00997d', '0 0 15px #00997d', '0 0 5px #00997d'] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className={cn(
                "absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-colors",
                gameState === 'success' && 'bg-[#00997d]',
                gameState === 'failure' && 'bg-[#C62828] animate-pulse',
                (gameState === 'idle' || gameState === 'dragging') && 'bg-orange-500 animate-pulse',
                (gameState === 'installing' || gameState === 'booting' || gameState === 'hovering') && 'bg-yellow-500 animate-pulse'
              )}
            />
          </motion.div>

          {/* Monitor Stand */}
          <div className="w-20 h-4 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-sm" />
          <div className="w-32 h-2 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full shadow-lg" />

          {/* Status Label */}
          <div className="h-8 mt-4 flex items-center justify-center">
            <motion.p
              key={gameState}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "text-center text-sm font-medium",
                gameState === 'success' && 'text-[#00997d]',
                gameState === 'failure' && 'text-[#C62828]',
                (gameState !== 'success' && gameState !== 'failure') && 'text-white/60'
              )}
            >
              {gameState === 'idle' && 'Ce PC a besoin d\'un nouveau système'}
              {gameState === 'dragging' && 'Glissez un système vers le PC'}
              {gameState === 'hovering' && 'Relâchez pour installer'}
              {gameState === 'installing' && 'Installation en cours...'}
              {gameState === 'booting' && 'Démarrage du système...'}
              {gameState === 'success' && 'PC sauvé avec Linux NIRD !'}
              {gameState === 'failure' && 'PC incompatible avec Windows 11'}
            </motion.p>
          </div>
        </div>

        {/* RIGHT - Windows USB */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            ref={windowsRef}
            drag={isInteractive}
            dragSnapToOrigin
            dragElastic={0.15}
            whileDrag={{ scale: 1.15, rotate: 8, zIndex: 100 }}
            whileHover={isInteractive ? { scale: 1.08, y: -5 } : {}}
            onDrag={() => handleDrag('windows')}
            onDragEnd={() => handleDragEnd('windows')}
            className={cn(
              "cursor-grab active:cursor-grabbing select-none transition-opacity",
              !isInteractive && "opacity-50 cursor-not-allowed"
            )}
            style={{ touchAction: 'none' }}
          >
            <USBDrive
              type="windows"
              isActive={draggingItem === 'windows'}
              isHovering={draggingItem === 'windows' && isOverPC}
              direction="left"
            />
            <motion.p
              animate={{ opacity: isInteractive ? 1 : 0, x: [0, -5, 0] }}
              transition={{ x: { duration: 1.5, repeat: Infinity } }}
              className="mt-4 text-center text-xs text-gray-400 font-medium h-5"
            >
              ← Glissez vers le PC
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {showStats && choice === 'linux' && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#00997d] rounded-2xl text-center relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-[#00997d]/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#00997d]/20 blur-3xl" />

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 mx-auto mb-4 bg-[#00997d]/20 rounded-full flex items-center justify-center"
              >
                <PartyPopper className="w-8 h-8 text-[#00d9a7]" />
              </motion.div>

              <h4 className="text-2xl font-bold text-[#00d9a7] mb-2">PC Sauvé avec Linux NIRD !</h4>
              <p className="text-white/80 text-sm mb-6">Système gratuit, libre et durable installé</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#F9A825]/20 rounded-xl p-4 border border-[#F9A825]/30"
                >
                  <div className="flex items-baseline justify-center">
                    <CountUp to={800} duration={1.5} className="text-3xl font-black text-[#F9A825]" />
                    <span className="text-lg text-[#F9A825]">€</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">Économisés</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#2E7D32]/20 rounded-xl p-4 border border-[#4CAF50]/30"
                >
                  <div className="flex items-baseline justify-center">
                    <CountUp to={300} duration={1.5} className="text-3xl font-black text-[#4CAF50]" />
                    <span className="text-lg text-[#4CAF50]">kg</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">CO₂ évités</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#00997d]/20 rounded-xl p-4 border border-[#00997d]/30"
                >
                  <p className="text-3xl font-black text-[#00d9a7]">+5 ans</p>
                  <p className="text-xs text-white/70 mt-1">De vie</p>
                </motion.div>
              </div>

              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
                  className="px-6 py-3 bg-gradient-to-r from-[#00997d] to-[#00d9a7] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#00997d]/30 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Sauver un autre PC
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://nird.forge.apps.education.fr/linux/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/10 text-white rounded-xl text-sm font-bold border border-white/20 flex items-center gap-2 hover:bg-white/20 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Télécharger Linux
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}

        {showStats && choice === 'windows' && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-[#C62828] rounded-2xl text-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="w-16 h-16 mx-auto mb-4 bg-[#C62828]/20 rounded-full flex items-center justify-center"
            >
              <ShieldX className="w-8 h-8 text-[#ff6b6b]" />
            </motion.div>

            <h4 className="text-2xl font-bold text-[#ff6b6b] mb-2">Mise à jour impossible</h4>
            <p className="text-white/80 text-sm mb-6">Ce PC ne supporte pas Windows 11 (TPM 2.0 requis)</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#C62828]/20 rounded-xl p-4 border border-[#C62828]/30">
                <p className="text-3xl font-black text-[#ff6b6b]">800€+</p>
                <p className="text-xs text-white/70 mt-1">Nouveau PC</p>
              </div>
              <div className="bg-orange-500/20 rounded-xl p-4 border border-orange-500/30">
                <p className="text-3xl font-black text-orange-400">+1</p>
                <p className="text-xs text-white/70 mt-1">E-déchet</p>
              </div>
              <div className="bg-[#C62828]/20 rounded-xl p-4 border border-[#C62828]/30">
                <p className="text-3xl font-black text-[#ff6b6b]">3-5 ans</p>
                <p className="text-xs text-white/70 mt-1">Durée de vie</p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={switchToLinux}
                className="px-6 py-3 bg-gradient-to-r from-[#00997d] to-[#00d9a7] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#00997d]/30 flex items-center gap-2"
              >
                <TuxIcon className="w-5 h-5" />
                Essayer Linux NIRD
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="px-6 py-3 bg-gray-700 text-white rounded-xl text-sm font-medium hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Réessayer
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
