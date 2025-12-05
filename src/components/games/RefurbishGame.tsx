'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Folder, Globe, FileText, Image as ImageIcon, Music, Settings, Search, Wifi, Battery, Volume2, ChevronUp, AlertTriangle, ShieldX } from 'lucide-react';
import CountUp from '@/components/CountUp';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useGameSounds } from '@/hooks/useGameSounds';

type GameState = 'idle' | 'dragging' | 'hovering' | 'installing' | 'booting' | 'success' | 'failure';
type ChoiceType = 'linux' | 'windows' | null;
type DraggingItem = 'linux' | 'windows' | null;

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
// REALISTIC SCREEN COMPONENTS
// =============================================================================

// Windows 10 BSOD (Blue Screen of Death) - End of Life
function Windows10EOLScreen() {
  return (
    <div className="w-full h-full bg-[#0078D4] flex flex-col items-center justify-center p-6 text-white font-['Segoe_UI',sans-serif]">
      <div className="text-7xl md:text-8xl mb-4">:(</div>
      <p className="text-lg md:text-xl font-light mb-2">Votre PC a rencontré un problème</p>
      <p className="text-white/60 text-sm mb-4">Code d'arrêt: FIN_DE_SUPPORT_WINDOWS_10</p>
      <div className="flex items-center gap-3 mt-4">
        <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
          <WindowsIcon className="w-10 h-10 brightness-0 invert opacity-60" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium">Windows 10</p>
          <p className="text-xs text-white/50">Fin de support: 14 Oct 2025</p>
        </div>
      </div>
      <div className="mt-6 px-4 py-2 bg-red-500/30 border border-red-400/50 rounded-lg text-red-200 text-sm flex items-center gap-2">
        <ShieldX className="w-5 h-5 text-red-400" />
        <span>Système non sécurisé - Mises à jour arrêtées</span>
      </div>
    </div>
  );
}

// Linux NIRD Desktop (Linux Mint Xfce style with Plank dock + NIRD pillars)
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

  // NIRD 3 Pillars
  const nirdPillars = [
    { label: 'Inclusif', desc: 'Gratuit pour tous', color: '#F9A825', icon: '👥' },
    { label: 'Responsable', desc: 'Données privées', color: '#00997d', icon: '🔒' },
    { label: 'Durable', desc: '+5 ans de vie', color: '#4CAF50', icon: '♻️' },
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
      {/* Wallpaper overlay pattern (Juliette Taka style) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white/30 rounded-full" />
        <div className="absolute bottom-20 left-8 w-20 h-20 border border-white/20 rounded-full" />
      </div>

      {/* Top Panel (Xfce style) */}
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
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex flex-col items-center gap-1 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors shadow-lg">
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
            <span className="text-[8px] text-white font-medium drop-shadow-md">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* NIRD 3 Pillars - Center Display */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
        {nirdPillars.map((pillar, i) => (
          <motion.div
            key={pillar.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.15, type: 'spring' }}
            className="bg-white/15 backdrop-blur-md rounded-lg p-2 border border-white/20 shadow-lg text-center min-w-[70px]"
          >
            <span className="text-lg">{pillar.icon}</span>
            <p className="text-white font-bold text-[9px] mt-1" style={{ color: pillar.color }}>{pillar.label}</p>
            <p className="text-white/70 text-[7px]">{pillar.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Plank Dock (Bottom) */}
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
              whileHover={{ scale: 1.2, y: -4 }}
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

// Windows 11 Desktop (with centered taskbar)
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
      {/* Windows 11 default wallpaper bloom effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-[#0078D4]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[#00BCF2]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-[#FFB900]/15 rounded-full blur-3xl" />
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-4 left-3 flex flex-col gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center">
            <WindowsIcon className="w-6 h-6" />
          </div>
          <span className="text-[8px] text-white/80">Ce PC</span>
        </motion.div>
      </div>

      {/* Error Dialog with Problems (if hasError) */}
      {hasError && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div className="bg-[#2d2d2d] rounded-lg shadow-2xl border border-white/10 overflow-hidden min-w-[220px]">
            <div className="bg-[#1f1f1f] px-3 py-1.5 flex items-center justify-between">
              <span className="text-white text-[10px]">Problèmes Windows 11</span>
              <div className="w-2.5 h-2.5 rounded-sm bg-[#c42b1c]" />
            </div>
            <div className="p-3 space-y-2">
              {/* Cost Problem */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 bg-[#c42b1c]/15 rounded p-1.5"
              >
                <span className="text-sm">💸</span>
                <div>
                  <p className="text-[#ff6b6b] text-[9px] font-bold">Coût: €800+</p>
                  <p className="text-white/50 text-[7px]">Nouveau PC obligatoire</p>
                </div>
              </motion.div>
              {/* Tracking Problem */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-2 bg-orange-500/15 rounded p-1.5"
              >
                <span className="text-sm">👁️</span>
                <div>
                  <p className="text-orange-400 text-[9px] font-bold">Télémétrie</p>
                  <p className="text-white/50 text-[7px]">Données collectées</p>
                </div>
              </motion.div>
              {/* E-waste Problem */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 bg-gray-500/15 rounded p-1.5"
              >
                <span className="text-sm">🗑️</span>
                <div>
                  <p className="text-gray-400 text-[9px] font-bold">E-déchet</p>
                  <p className="text-white/50 text-[7px]">PC jeté à la poubelle</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Windows 11 Taskbar (Centered) */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#1f1f1f]/90 backdrop-blur-xl border-t border-white/5">
        <div className="h-full flex items-center justify-center gap-1">
          {/* Start Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center cursor-pointer"
          >
            <WindowsIcon className="w-5 h-5" />
          </motion.div>
          {/* Search */}
          <div className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center cursor-pointer">
            <Search className="w-4 h-4 text-white/70" />
          </div>
          {/* Apps */}
          {taskbarApps.slice(1).map((app, i) => (
            <div key={i} className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded flex items-center justify-center cursor-pointer">
              <app.icon className="w-4 h-4" style={{ color: app.color }} />
            </div>
          ))}
        </div>
        {/* System Tray */}
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

// Installing Screen
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
      {/* Logo */}
      <div className="mb-6">
        {isLinux ? (
          <TuxIcon className="w-16 h-16" />
        ) : (
          <WindowsIcon className="w-16 h-16 brightness-0 invert" />
        )}
      </div>

      {/* Title */}
      <p className={cn(
        "text-lg font-medium mb-4",
        isLinux ? "text-[#00997d]" : "text-white"
      )}>
        {isLinux ? "Installation de Linux NIRD" : "Installation de Windows 11"}
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-[80%] h-1.5 bg-white/20 rounded-full overflow-hidden mb-3">
        <motion.div
          className={cn("h-full", isLinux ? "bg-[#00997d]" : "bg-white")}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Progress Text */}
      <p className={cn(
        "text-2xl font-bold mb-2",
        isLinux ? "text-[#00997d]" : "text-white"
      )}>
        {Math.round(progress)}%
      </p>

      {/* Status Message */}
      <p className={cn(
        "text-xs",
        isLinux ? "text-white/50" : "text-white/70"
      )}>
        {messages[messageIndex]}
      </p>
    </div>
  );
}

// Booting Screen
function BootingScreen({ choice }: { choice: ChoiceType }) {
  const isLinux = choice === 'linux';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black">
      {/* Logo */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-4"
      >
        {isLinux ? (
          <TuxIcon className="w-20 h-20" />
        ) : (
          <WindowsIcon className="w-20 h-20" />
        )}
      </motion.div>

      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className={cn(
          "w-8 h-8 border-2 rounded-full border-t-transparent",
          isLinux ? "border-[#00997d]" : "border-[#0078D4]"
        )}
      />

      <p className={cn(
        "text-sm mt-4",
        isLinux ? "text-[#00997d]" : "text-[#0078D4]"
      )}>
        Démarrage...
      </p>
    </div>
  );
}

// =============================================================================
// MAIN GAME COMPONENT
// =============================================================================
export default function RefurbishGame() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [installProgress, setInstallProgress] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [isOverPC, setIsOverPC] = useState(false);
  const [choice, setChoice] = useState<ChoiceType>(null);
  const [draggingItem, setDraggingItem] = useState<DraggingItem>(null);
  const pcRef = useRef<HTMLDivElement>(null);
  const linuxRef = useRef<HTMLDivElement>(null);
  const windowsRef = useRef<HTMLDivElement>(null);
  const { play: playSound } = useGameSounds();

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

    playSound('click');
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
            if (itemType === 'linux') {
              playSound('victory');
              setGameState('success');
            } else {
              playSound('error');
              setGameState('failure');
            }
            setShowStats(true);
          }, 2000);
        }, 500);
      }
      setInstallProgress(Math.min(progress, 100));
    }, 300);
  };

  const resetGame = () => {
    playSound('click');
    setGameState('idle');
    setInstallProgress(0);
    setShowStats(false);
    setIsOverPC(false);
    setChoice(null);
    setDraggingItem(null);
  };

  const switchToLinux = () => {
    playSound('click');
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
            playSound('victory');
            setGameState('success');
            setShowStats(true);
          }, 2000);
        }, 500);
      }
      setInstallProgress(Math.min(progress, 100));
    }, 300);
  };

  const isInteractive = gameState === 'idle' || gameState === 'dragging' || gameState === 'hovering';

  return (
    <div className="relative w-full max-w-5xl mx-auto px-2 md:px-4 overflow-hidden">
      {/* Main Game Area - Three Column Layout */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-6 justify-items-center">

        {/* LEFT SIDE - Linux USB */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            ref={linuxRef}
            drag={isInteractive}
            dragSnapToOrigin
            dragElastic={0.15}
            whileDrag={{ scale: 1.15, rotate: -8, zIndex: 100 }}
            whileHover={isInteractive ? { scale: 1.08 } : {}}
            onDrag={() => handleDrag('linux')}
            onDragEnd={() => handleDragEnd('linux')}
            className={cn(
              "cursor-grab active:cursor-grabbing select-none",
              !isInteractive && "opacity-50 cursor-not-allowed"
            )}
            style={{ touchAction: 'none' }}
          >
            <div className="relative">
              {/* Recommended Badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#00997d] text-white text-[8px] px-2 py-0.5 rounded-full whitespace-nowrap font-bold shadow-lg z-10">
                ✓ Recommandé
              </div>

              {/* USB Flash Drive - Horizontal Style (connector pointing right toward PC) */}
              <div className={cn(
                'relative transition-all duration-300 flex items-center',
                draggingItem === 'linux' && isOverPC && 'drop-shadow-[0_0_15px_rgba(0,153,125,0.7)]'
              )}>
                {/* USB Body */}
                <div className={cn(
                  'w-20 h-14 md:w-24 md:h-16 rounded-l-lg relative overflow-hidden shadow-lg',
                  draggingItem === 'linux' && isOverPC ? 'ring-2 ring-white/80' : ''
                )}
                style={{
                  background: 'linear-gradient(135deg, #00b894 0%, #00997d 50%, #006653 100%)',
                }}>
                  {/* Shine */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-1/2" />

                  {/* Logo & Label */}
                  <div className="absolute inset-0 flex items-center justify-center gap-1.5 px-1">
                    <div className="bg-white rounded p-0.5 flex-shrink-0">
                      <TuxIcon className="w-7 h-7 md:w-9 md:h-9" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-[8px] md:text-[9px] leading-tight">LINUX</p>
                      <p className="text-white font-bold text-[8px] md:text-[9px] leading-tight">NIRD</p>
                      <p className="text-white/70 text-[6px] md:text-[7px]">GRATUIT</p>
                    </div>
                  </div>

                  {/* LED */}
                  <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-[#00ff88]" />
                </div>

                {/* USB Metal Connector (Type-A) - pointing toward PC */}
                <div className="w-6 md:w-7 h-10 md:h-12 bg-gradient-to-l from-[#a0a0a0] to-[#c0c0c0] rounded-r border border-[#808080] relative flex items-center justify-center">
                  <div className="w-4 md:w-5 h-7 md:h-8 bg-[#e8e8e8] rounded-sm border border-[#bbb] flex items-center justify-center">
                    <div className="w-2 h-5 md:h-6 bg-white rounded-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Drag Instruction - Fixed height to prevent layout shift */}
            <p className={cn(
              "mt-4 text-center text-xs text-[#00997d] font-medium h-5 transition-opacity",
              isInteractive ? "opacity-100" : "opacity-0"
            )}>
              ← Glissez vers le PC
            </p>
          </motion.div>
        </div>

        {/* CENTER - PC Monitor */}
        <div className="flex flex-col items-center w-full max-w-[450px]">
          <motion.div
            ref={pcRef}
            className={cn(
              'relative w-full aspect-[16/10] rounded-xl border-4 transition-all duration-300 shadow-2xl overflow-hidden',
              (gameState === 'idle' || gameState === 'dragging') && 'border-gray-600 bg-gray-900',
              gameState === 'hovering' && draggingItem === 'linux' && 'border-[#00997d] ring-4 ring-[#00997d]/50 shadow-[#00997d]/30 shadow-2xl',
              gameState === 'hovering' && draggingItem === 'windows' && 'border-[#C62828] ring-4 ring-[#C62828]/50 shadow-[#C62828]/30 shadow-2xl',
              (gameState === 'installing' || gameState === 'booting') && choice === 'linux' && 'border-[#00997d]',
              (gameState === 'installing' || gameState === 'booting') && choice === 'windows' && 'border-[#0078D4]',
              gameState === 'success' && 'border-[#00997d] shadow-[#00997d]/40 shadow-2xl',
              gameState === 'failure' && 'border-[#C62828]'
            )}
          >
            {/* Screen Bezel */}
            <div className="absolute inset-1.5 md:inset-2 rounded-lg overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                {/* Windows 10 EOL Screen (Initial State) */}
                {(gameState === 'idle' || gameState === 'dragging') && (
                  <motion.div key="win10-eol" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                    <Windows10EOLScreen />
                  </motion.div>
                )}

                {/* Hover States */}
                {gameState === 'hovering' && draggingItem === 'linux' && (
                  <motion.div
                    key="hover-linux"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0a2a1a] to-[#001a10] p-6"
                  >
                    <TuxIcon className="w-20 h-20 md:w-24 md:h-24" />
                    <p className="text-[#00997d] font-bold text-xl mt-4">Relâchez pour installer !</p>
                    <p className="text-white/50 text-sm mt-1">Installation 100% gratuite</p>
                  </motion.div>
                )}

                {gameState === 'hovering' && draggingItem === 'windows' && (
                  <motion.div
                    key="hover-win"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#2a1a1a] to-[#1a0a0a] p-6"
                  >
                    <WindowsIcon className="w-20 h-20 md:w-24 md:h-24" />
                    <p className="text-[#C62828] font-bold text-xl mt-4">Êtes-vous sûr ?</p>
                    <p className="text-white/50 text-sm mt-1">Coût estimé: €800+ (nouveau PC)</p>
                  </motion.div>
                )}

                {/* Installing */}
                {gameState === 'installing' && (
                  <motion.div key="installing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                    <InstallingScreen choice={choice} progress={installProgress} />
                  </motion.div>
                )}

                {/* Booting */}
                {gameState === 'booting' && (
                  <motion.div key="booting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                    <BootingScreen choice={choice} />
                  </motion.div>
                )}

                {/* Success - Linux NIRD Desktop */}
                {gameState === 'success' && (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
                    <LinuxNIRDDesktop />
                  </motion.div>
                )}

                {/* Failure - Windows 11 with Error */}
                {gameState === 'failure' && (
                  <motion.div key="failure" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
                    <Windows11Desktop hasError />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Power LED */}
            <div className={cn(
              "absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-colors",
              gameState === 'success' && 'bg-[#00997d] shadow-[0_0_8px_#00997d]',
              gameState === 'failure' && 'bg-[#C62828] shadow-[0_0_8px_#C62828] animate-pulse',
              (gameState === 'idle' || gameState === 'dragging') && 'bg-orange-500 animate-pulse',
              (gameState === 'installing' || gameState === 'booting' || gameState === 'hovering') && 'bg-yellow-500 animate-pulse'
            )} />
          </motion.div>

          {/* Monitor Stand */}
          <div className="w-20 h-4 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-sm" />
          <div className="w-32 h-2 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full shadow-lg" />

          {/* Status Label - Fixed height to prevent layout shift */}
          <div className="h-8 mt-4 flex items-center justify-center">
            <motion.p
              key={gameState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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

        {/* RIGHT SIDE - Windows USB */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            ref={windowsRef}
            drag={isInteractive}
            dragSnapToOrigin
            dragElastic={0.15}
            whileDrag={{ scale: 1.15, rotate: 8, zIndex: 100 }}
            whileHover={isInteractive ? { scale: 1.08 } : {}}
            onDrag={() => handleDrag('windows')}
            onDragEnd={() => handleDragEnd('windows')}
            className={cn(
              "cursor-grab active:cursor-grabbing select-none",
              !isInteractive && "opacity-50 cursor-not-allowed"
            )}
            style={{ touchAction: 'none' }}
          >
            <div className="relative">
              {/* Warning Badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#C62828] text-white text-[8px] px-2 py-0.5 rounded-full whitespace-nowrap font-bold shadow-lg z-10">
                Coûteux
              </div>

              {/* USB Flash Drive - Horizontal Style (connector pointing left toward PC) */}
              <div className={cn(
                'relative transition-all duration-300 flex items-center',
                draggingItem === 'windows' && isOverPC && 'drop-shadow-[0_0_15px_rgba(198,40,40,0.7)]'
              )}>
                {/* USB Metal Connector (Type-A) - pointing toward PC */}
                <div className="w-6 md:w-7 h-10 md:h-12 bg-gradient-to-r from-[#a0a0a0] to-[#c0c0c0] rounded-l border border-[#808080] relative flex items-center justify-center">
                  <div className="w-4 md:w-5 h-7 md:h-8 bg-[#e8e8e8] rounded-sm border border-[#bbb] flex items-center justify-center">
                    <div className="w-2 h-5 md:h-6 bg-white rounded-sm" />
                  </div>
                </div>

                {/* USB Body */}
                <div className={cn(
                  'w-20 h-14 md:w-24 md:h-16 rounded-r-lg relative overflow-hidden shadow-lg',
                  draggingItem === 'windows' && isOverPC ? 'ring-2 ring-[#ff6b6b]/80' : ''
                )}
                style={{
                  background: 'linear-gradient(135deg, #2a9df4 0%, #0078D4 50%, #004a8c 100%)',
                }}>
                  {/* Shine */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-1/2" />

                  {/* Logo & Label */}
                  <div className="absolute inset-0 flex items-center justify-center gap-1.5 px-1">
                    <div className="bg-white rounded p-0.5 flex-shrink-0">
                      <WindowsIcon className="w-7 h-7 md:w-9 md:h-9" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-[8px] md:text-[9px] leading-tight">WINDOWS</p>
                      <p className="text-white font-bold text-[8px] md:text-[9px] leading-tight">11</p>
                      <p className="text-white/70 text-[6px] md:text-[7px]">€145+</p>
                    </div>
                  </div>

                  {/* LED */}
                  <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#00a2ff]" />
                </div>
              </div>
            </div>

            {/* Drag Instruction - Fixed height to prevent layout shift */}
            <p className={cn(
              "mt-4 text-center text-xs text-gray-400 font-medium h-5 transition-opacity",
              isInteractive ? "opacity-100" : "opacity-0"
            )}>
              Glissez vers le PC →
            </p>
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
            className="mt-8 p-6 bg-gray-900 border-2 border-[#00997d] rounded-2xl text-center"
          >
            <h4 className="text-xl font-bold text-[#00d9a7] mb-2">PC Sauvé avec Linux NIRD !</h4>
            <p className="text-white/80 text-sm mb-5">Système gratuit, libre et durable installé</p>

            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="bg-[#F9A825]/20 rounded-lg p-3">
                <div className="flex items-baseline justify-center">
                  <CountUp to={800} duration={1.5} className="text-2xl font-black text-[#F9A825]" />
                  <span className="text-sm text-[#F9A825]">€</span>
                </div>
                <p className="text-xs text-white/70">Économisés</p>
              </div>
              <div className="bg-[#2E7D32]/20 rounded-lg p-3">
                <div className="flex items-baseline justify-center">
                  <CountUp to={300} duration={1.5} className="text-2xl font-black text-[#4CAF50]" />
                  <span className="text-sm text-[#4CAF50]">kg</span>
                </div>
                <p className="text-xs text-white/70">CO₂ évités</p>
              </div>
              <div className="bg-[#00997d]/20 rounded-lg p-3">
                <p className="text-2xl font-black text-[#00d9a7]">+5 ans</p>
                <p className="text-xs text-white/70">De vie</p>
              </div>
            </div>

            <button onClick={resetGame} className="px-5 py-2.5 bg-[#00997d] text-white rounded-lg text-sm font-bold hover:bg-[#00886e] transition-colors flex items-center gap-2 mx-auto">
              <RotateCcw className="w-4 h-4" />
              Rejouer
            </button>
          </motion.div>
        )}

        {showStats && choice === 'windows' && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-6 bg-gray-900 border-2 border-[#C62828] rounded-2xl text-center"
          >
            <h4 className="text-xl font-bold text-[#ff6b6b] mb-2">Mise à jour impossible</h4>
            <p className="text-white/80 text-sm mb-5">Ce PC ne supporte pas Windows 11 (TPM 2.0 requis)</p>

            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="bg-[#C62828]/20 rounded-lg p-3">
                <p className="text-2xl font-black text-[#ff6b6b]">800€+</p>
                <p className="text-xs text-white/70">Nouveau PC</p>
              </div>
              <div className="bg-orange-500/20 rounded-lg p-3">
                <p className="text-2xl font-black text-orange-400">+1</p>
                <p className="text-xs text-white/70">E-déchet</p>
              </div>
              <div className="bg-[#C62828]/20 rounded-lg p-3">
                <p className="text-2xl font-black text-[#ff6b6b]">3-5 ans</p>
                <p className="text-xs text-white/70">Durée de vie</p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button onClick={switchToLinux} className="px-5 py-2.5 bg-[#00997d] text-white rounded-lg text-sm font-bold hover:bg-[#00886e] transition-colors flex items-center gap-2">
                <TuxIcon className="w-5 h-5" />
                Essayer Linux NIRD
              </button>
              <button onClick={resetGame} className="px-5 py-2.5 bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Rejouer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
