'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { RotateCcw, CheckCircle, AlertTriangle, Leaf, Euro, Zap, Trash2, XCircle, DollarSign } from 'lucide-react';
import CountUp from '@/components/CountUp';
import { cn } from '@/lib/utils';

type GameState = 'idle' | 'dragging' | 'hovering' | 'installing' | 'booting' | 'success' | 'failure';
type ChoiceType = 'linux' | 'windows' | null;
type DraggingItem = 'linux' | 'windows' | null;

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
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setInstallProgress(100);
        setTimeout(() => {
          setGameState('booting');
          setTimeout(() => {
            setGameState(itemType === 'linux' ? 'success' : 'failure');
            setShowStats(true);
          }, 1500);
        }, 400);
      }
      setInstallProgress(Math.min(progress, 100));
    }, 250);
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
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        clearInterval(interval);
        setInstallProgress(100);
        setTimeout(() => {
          setGameState('booting');
          setTimeout(() => {
            setGameState('success');
            setShowStats(true);
          }, 1500);
        }, 400);
      }
      setInstallProgress(Math.min(progress, 100));
    }, 250);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      {/* Game Area */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">

        {/* PC Monitor */}
        <div className="flex flex-col items-center">
          <motion.div
            ref={pcRef}
            className={cn(
              'relative w-72 h-48 md:w-80 md:h-52 rounded-xl border-4 transition-all duration-300',
              (gameState === 'idle' || gameState === 'dragging') && 'border-gray-600 bg-gray-800',
              gameState === 'hovering' && draggingItem === 'linux' && 'border-[#00997d] ring-4 ring-[#00997d]/40',
              gameState === 'hovering' && draggingItem === 'windows' && 'border-[#C62828] ring-4 ring-[#C62828]/40',
              (gameState === 'installing' || gameState === 'booting') && choice === 'linux' && 'border-[#00997d]',
              (gameState === 'installing' || gameState === 'booting') && choice === 'windows' && 'border-[#0078D4]',
              gameState === 'success' && 'border-[#00997d]',
              gameState === 'failure' && 'border-[#C62828]'
            )}
          >
            {/* Screen */}
            <div className="absolute inset-2 rounded-lg overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                {/* Windows 10 EOL Screen */}
                {(gameState === 'idle' || gameState === 'dragging') && (
                  <motion.div
                    key="win10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center bg-[#0078D4] p-4"
                  >
                    <div className="text-5xl mb-2">:(</div>
                    <p className="text-white text-sm text-center font-medium">Windows 10</p>
                    <p className="text-white/60 text-xs mt-1">Fin de support: Oct 2025</p>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="mt-3 px-2 py-1 bg-red-500/20 rounded text-red-300 text-xs"
                    >
                      ⚠️ Non sécurisé
                    </motion.div>
                  </motion.div>
                )}

                {/* Hover - Linux */}
                {gameState === 'hovering' && draggingItem === 'linux' && (
                  <motion.div
                    key="hover-linux"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center bg-[#0a2a1a] p-4"
                  >
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="text-5xl">🐧</motion.div>
                    <p className="text-[#00997d] font-bold mt-2">Relâchez !</p>
                    <p className="text-white/50 text-xs">Installation gratuite</p>
                  </motion.div>
                )}

                {/* Hover - Windows */}
                {gameState === 'hovering' && draggingItem === 'windows' && (
                  <motion.div
                    key="hover-win"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center bg-[#2a1a1a] p-4"
                  >
                    <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="text-5xl">⚠️</motion.div>
                    <p className="text-[#C62828] font-bold mt-2">Êtes-vous sûr ?</p>
                    <p className="text-white/50 text-xs">Coût: €800+</p>
                  </motion.div>
                )}

                {/* Installing */}
                {gameState === 'installing' && (
                  <motion.div
                    key="installing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn("h-full flex flex-col items-center justify-center p-4", choice === 'linux' ? 'bg-black' : 'bg-[#0078D4]')}
                  >
                    <p className={cn("text-sm mb-3", choice === 'linux' ? 'text-[#00997d]' : 'text-white')}>
                      {choice === 'linux' ? '🐧 Linux NIRD' : '⊞ Windows 11'}
                    </p>
                    <div className="w-full max-w-[80%] h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className={cn("h-full", choice === 'linux' ? 'bg-[#00997d]' : 'bg-white')}
                        initial={{ width: 0 }}
                        animate={{ width: `${installProgress}%` }}
                      />
                    </div>
                    <p className={cn("text-lg font-bold mt-2", choice === 'linux' ? 'text-[#00997d]' : 'text-white')}>
                      {Math.round(installProgress)}%
                    </p>
                  </motion.div>
                )}

                {/* Booting */}
                {gameState === 'booting' && (
                  <motion.div
                    key="booting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center bg-black"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className={cn("w-10 h-10 border-3 rounded-full border-t-transparent", choice === 'linux' ? 'border-[#00997d]' : 'border-[#0078D4]')}
                    />
                    <p className={cn("text-sm mt-3", choice === 'linux' ? 'text-[#00997d]' : 'text-[#0078D4]')}>
                      Démarrage...
                    </p>
                  </motion.div>
                )}

                {/* Success - Linux Desktop */}
                {gameState === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full bg-gradient-to-b from-[#2E7D32] to-[#1B5E20] p-3 relative"
                  >
                    <div className="flex gap-2">
                      {['📁', '🌐', '📝'].map((icon, i) => (
                        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }} className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-sm">
                          {icon}
                        </motion.div>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-7 bg-[#1a1a1d] flex items-center px-2 gap-2">
                      <span className="text-xs">🐧</span>
                      <span className="text-[10px] text-white">Linux NIRD</span>
                    </div>
                  </motion.div>
                )}

                {/* Failure - Windows with problem */}
                {gameState === 'failure' && (
                  <motion.div
                    key="failure"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full bg-[#1a1a2e] p-3 relative"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="bg-white rounded-lg p-3 shadow-lg text-center">
                        <span className="text-xl">⚠️</span>
                        <p className="text-xs font-bold text-gray-800">PC incompatible</p>
                        <p className="text-[10px] text-gray-500">Nouveau PC: €800</p>
                      </div>
                    </motion.div>
                    <div className="absolute bottom-0 left-0 right-0 h-7 bg-[#1a1a1d] flex items-center px-2 gap-2">
                      <span className="text-xs">⊞</span>
                      <span className="text-[10px] text-white">Windows 11</span>
                      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="ml-auto text-xs text-red-500">⚠️</motion.span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Stand */}
          <div className="w-16 h-3 bg-gray-700 rounded-b" />
          <div className="w-24 h-2 bg-gray-600 rounded-full" />
        </div>

        {/* Draggable Items */}
        {(gameState === 'idle' || gameState === 'dragging' || gameState === 'hovering') && (
          <div className="flex gap-6">
            {/* Linux USB */}
            <motion.div
              ref={linuxRef}
              drag
              dragSnapToOrigin
              dragElastic={0.1}
              whileDrag={{ scale: 1.1, rotate: -5, zIndex: 50 }}
              whileHover={{ scale: 1.05 }}
              onDrag={() => handleDrag('linux')}
              onDragEnd={() => handleDragEnd('linux')}
              className="cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'none' }}
            >
              <div className="relative">
                <div className={cn(
                  'w-20 h-28 rounded-lg border-2 flex flex-col items-center justify-center transition-all',
                  'bg-gradient-to-b from-[#00997d] to-[#006653]',
                  draggingItem === 'linux' && isOverPC ? 'border-white ring-2 ring-[#00997d]' : 'border-[#00997d]/50'
                )}>
                  <div className="absolute -top-2 w-8 h-3 bg-gray-400 rounded-t-sm" />
                  <span className="text-3xl">🐧</span>
                  <span className="text-[10px] text-white font-bold mt-1">LINUX</span>
                  <span className="text-[8px] text-white/70">GRATUIT</span>
                </div>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#00997d] text-white text-[8px] px-2 py-0.5 rounded-full whitespace-nowrap">
                  ✓ Recommandé
                </div>
              </div>
              <p className="text-center text-xs text-[#00997d] mt-2 font-medium">Glissez-moi</p>
            </motion.div>

            {/* Windows DVD */}
            <motion.div
              ref={windowsRef}
              drag
              dragSnapToOrigin
              dragElastic={0.1}
              whileDrag={{ scale: 1.1, rotate: 5, zIndex: 50 }}
              whileHover={{ scale: 1.05 }}
              onDrag={() => handleDrag('windows')}
              onDragEnd={() => handleDragEnd('windows')}
              className="cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'none' }}
            >
              <div className="relative">
                <div className={cn(
                  'w-20 h-28 rounded-lg border-2 flex flex-col items-center justify-center transition-all',
                  'bg-gradient-to-b from-[#0078D4] to-[#005a9e]',
                  draggingItem === 'windows' && isOverPC ? 'border-red-500 ring-2 ring-red-500' : 'border-[#0078D4]/50'
                )}>
                  <div className="absolute top-2 w-3 h-3 rounded-full bg-black/20" />
                  <span className="text-3xl mt-2">⊞</span>
                  <span className="text-[10px] text-white font-bold mt-1">WIN 11</span>
                  <span className="text-[8px] text-white/70">€145+</span>
                </div>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#C62828] text-white text-[8px] px-2 py-0.5 rounded-full whitespace-nowrap">
                  ⚠️ Coûteux
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-2 font-medium">Glissez-moi</p>
            </motion.div>
          </div>
        )}
      </div>

      {/* Results */}
      <AnimatePresence>
        {showStats && choice === 'linux' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 p-4 bg-[#00997d]/10 border border-[#00997d]/30 rounded-xl text-center"
          >
            <h4 className="text-lg font-bold text-white mb-3">PC Sauvé !</h4>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <p className="text-2xl font-bold text-[#F9A825]">€600</p>
                <p className="text-xs text-gray-400">Économisés</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2E7D32]">300kg</p>
                <p className="text-xs text-gray-400">CO2 évités</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#00997d]">+5 ans</p>
                <p className="text-xs text-gray-400">De vie</p>
              </div>
            </div>
            <button onClick={resetGame} className="px-4 py-2 bg-[#00997d] text-white rounded-lg text-sm font-medium hover:bg-[#00997d]/80 transition-colors">
              <RotateCcw className="w-4 h-4 inline mr-2" />Rejouer
            </button>
          </motion.div>
        )}

        {showStats && choice === 'windows' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 p-4 bg-[#C62828]/10 border border-[#C62828]/30 rounded-xl text-center"
          >
            <h4 className="text-lg font-bold text-white mb-3">Mise à jour coûteuse</h4>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <p className="text-2xl font-bold text-[#C62828]">€800+</p>
                <p className="text-xs text-gray-400">Dépensés</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-500">+1</p>
                <p className="text-xs text-gray-400">E-waste</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#C62828]">3-5 ans</p>
                <p className="text-xs text-gray-400">Max</p>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={switchToLinux} className="px-4 py-2 bg-[#00997d] text-white rounded-lg text-sm font-medium hover:bg-[#00997d]/80 transition-colors">
                Passer à Linux
              </button>
              <button onClick={resetGame} className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600 transition-colors">
                Rejouer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
