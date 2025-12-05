'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Trophy, Clock, Layers, PartyPopper, Play, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_PAIRS, generateCards, shuffleCards, getFactForPair, type MemoryCard } from '@/data/memoryCards';
import { useAchievementStore } from '@/store/achievementStore';
import { LOGO_MAP, NIRDLogo } from './SoftwareLogos';
import {
  EnhancedConfetti,
  ComboCounter,
  useParticles,
  ParticleSystem,
  ScreenShakeProvider,
  useScreenShake,
  GlowPulse
} from './GameVFX';

// =============================================================================
// TYPES
// =============================================================================
interface GameCard extends MemoryCard {
  isFlipped: boolean;
  isMatched: boolean;
}

type GamePhase = 'menu' | 'playing' | 'victory';

// =============================================================================
// CARD COMPONENT
// =============================================================================
function Card({
  card,
  onClick,
  disabled,
  isNew
}: {
  card: GameCard;
  onClick: () => void;
  disabled: boolean;
  isNew?: boolean;
}) {
  const LogoComponent = LOGO_MAP[card.id];
  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <motion.div
      onClick={() => !disabled && !isRevealed && onClick()}
      initial={isNew ? { scale: 0, rotateZ: -10 } : false}
      animate={{ scale: 1, rotateZ: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        "relative cursor-pointer",
        (disabled || isRevealed) && "cursor-default"
      )}
      style={{ perspective: '1000px' }}
      whileHover={!disabled && !isRevealed ? { scale: 1.08, rotateZ: 2 } : {}}
      whileTap={!disabled && !isRevealed ? { scale: 0.95 } : {}}
    >
      <motion.div
        className="relative w-full aspect-square"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 150 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back of card (hidden state) - NIRD themed */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl flex items-center justify-center",
            "bg-gradient-to-br from-[#1a2a25] via-[#0d1f18] to-[#1a2a25]",
            "border-2 border-[#00997d]/40",
            "hover:border-[#00997d] transition-all duration-300",
            "shadow-lg hover:shadow-[#00997d]/20"
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Decorative pattern */}
          <div className="absolute inset-2 border border-[#00997d]/20 rounded-lg" />
          <div className="absolute inset-4 border border-[#00997d]/10 rounded-md" />

          {/* NIRD Logo in center */}
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <NIRDLogo size={36} />
            </motion.div>
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[#00997d]/20 rounded-full blur-md -z-10" />
          </div>

          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-2 h-2 border-l-2 border-t-2 border-[#00997d]/40 rounded-tl" />
          <div className="absolute top-2 right-2 w-2 h-2 border-r-2 border-t-2 border-[#00997d]/40 rounded-tr" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-l-2 border-b-2 border-[#00997d]/40 rounded-bl" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-r-2 border-b-2 border-[#00997d]/40 rounded-br" />
        </div>

        {/* Front of card (revealed state) - With real logos */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-1.5 p-2",
            "border-2 transition-all",
            card.isMatched
              ? "bg-gradient-to-br from-[#00997d]/30 to-[#00d9a7]/20 border-[#00d9a7] shadow-lg shadow-[#00997d]/30"
              : card.type === 'proprietary'
                ? "bg-gradient-to-br from-gray-800 to-gray-900 border-[#C62828]/70"
                : "bg-gradient-to-br from-[#0d1f18] to-[#1a2a25] border-[#00997d]/70"
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Logo */}
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              card.isMatched && "animate-pulse"
            )}
            style={{ backgroundColor: `${card.color}20` }}
          >
            {LogoComponent ? (
              <LogoComponent size={32} />
            ) : (
              <Layers className="w-8 h-8" style={{ color: card.color }} />
            )}
          </div>

          {/* Name */}
          <span className="text-[11px] text-white font-semibold text-center leading-tight">
            {card.name}
          </span>

          {/* Type badge */}
          <span className={cn(
            "text-[9px] px-2 py-0.5 rounded-full font-medium",
            card.type === 'proprietary'
              ? "bg-[#C62828]/30 text-[#ff6b6b] border border-[#C62828]/40"
              : "bg-[#00997d]/30 text-[#00d9a7] border border-[#00997d]/40"
          )}>
            {card.type === 'proprietary' ? 'Proprietaire' : 'Open Source'}
          </span>

          {/* Match celebration */}
          {card.isMatched && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-[#00d9a7] rounded-full flex items-center justify-center shadow-lg"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Card shine effect on hover */}
      {!isRevealed && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(0,217,167,0.1) 45%, rgba(0,217,167,0.2) 50%, rgba(0,217,167,0.1) 55%, transparent 60%)',
            backgroundSize: '200% 100%'
          }}
          animate={{
            backgroundPosition: ['200% 0%', '-200% 0%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      )}
    </motion.div>
  );
}

// =============================================================================
// FACT TOAST
// =============================================================================
function FactToast({ fact, pairId }: { fact: string; pairId: string }) {
  const pair = CARD_PAIRS.find(p => p.pairId === pairId);
  const ProprietaryLogo = pair ? LOGO_MAP[pair.proprietary.id] : null;
  const OpenSourceLogo = pair ? LOGO_MAP[pair.opensource.id] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-md"
    >
      <div className="bg-gradient-to-r from-[#00997d] to-[#00d9a7] p-0.5 rounded-xl shadow-lg shadow-[#00997d]/30">
        <div className="bg-gray-900 p-4 rounded-xl">
          <div className="flex items-start gap-3">
            {/* Logo transition */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#C62828]/20 flex items-center justify-center">
                {ProprietaryLogo && <ProprietaryLogo size={20} />}
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-[#00d9a7]"
              >
                →
              </motion.div>
              <div className="w-8 h-8 rounded-lg bg-[#00997d]/20 flex items-center justify-center">
                {OpenSourceLogo && <OpenSourceLogo size={20} />}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[#00d9a7] font-bold text-sm mb-1">
                {pair?.proprietary.name} → {pair?.opensource.name}
              </p>
              <p className="text-white/80 text-sm">{fact}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function MemoryGame() {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [currentFact, setCurrentFact] = useState<{ fact: string; pairId: string } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPerfect, setIsPerfect] = useState(true);
  const [combo, setCombo] = useState(0);
  const [isNewGame, setIsNewGame] = useState(false);

  const { particles, spawn: spawnParticles } = useParticles();
  const gameRef = useRef<HTMLDivElement>(null);

  const unlockBadge = useAchievementStore(s => s.unlockBadge);
  const totalPairs = CARD_PAIRS.length;

  // Timer
  useEffect(() => {
    if (phase !== 'playing') return;

    const timer = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  // Start game
  const startGame = () => {
    const allCards = generateCards();
    const shuffled = shuffleCards(allCards);
    const gameCards: GameCard[] = shuffled.map(card => ({
      ...card,
      isFlipped: false,
      isMatched: false
    }));

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setMatchedPairs(0);
    setIsPerfect(true);
    setCombo(0);
    setIsNewGame(true);
    setPhase('playing');

    // Reset new game flag after animation
    setTimeout(() => setIsNewGame(false), 1000);
  };

  // Handle card click
  const handleCardClick = useCallback((cardId: string) => {
    if (flippedCards.length >= 2) return;

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isMatched || card.isFlipped) return;

    // Flip the card
    setCards(prev => prev.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    // If two cards are flipped, check for match
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match! Increase combo
        setCombo(c => c + 1);

        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.pairId === firstCard.pairId ? { ...c, isMatched: true, isFlipped: false } : c
          ));
          setMatchedPairs(m => m + 1);

          // Spawn celebration particles
          if (gameRef.current) {
            const rect = gameRef.current.getBoundingClientRect();
            spawnParticles({
              x: rect.width / 2,
              y: rect.height / 2,
              count: 15,
              colors: ['#00997d', '#00d9a7', '#F9A825', '#4CAF50'],
              spread: 80,
              speed: 4,
              type: 'circle'
            });
          }

          // Show fact
          const fact = getFactForPair(firstCard.pairId);
          setCurrentFact({ fact, pairId: firstCard.pairId });
          setTimeout(() => setCurrentFact(null), 3000);

          setFlippedCards([]);
        }, 500);
      } else {
        // No match - reset combo
        setIsPerfect(false);
        setCombo(0);
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [cards, flippedCards, spawnParticles]);

  // Check for victory
  useEffect(() => {
    if (phase === 'playing' && matchedPairs === totalPairs) {
      setPhase('victory');
      setShowConfetti(true);
      unlockBadge('alternatives_master');
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [matchedPairs, totalPairs, phase, unlockBadge]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div ref={gameRef} className="relative w-full max-w-3xl mx-auto p-4">
      <EnhancedConfetti active={showConfetti} />
      <ParticleSystem particles={particles} />

      {/* Combo Counter */}
      <AnimatePresence>
        {combo >= 2 && (
          <ComboCounter combo={combo} className="top-20 left-1/2 -translate-x-1/2" />
        )}
      </AnimatePresence>

      {/* Fact Toast */}
      <AnimatePresence>
        {currentFact && <FactToast {...currentFact} />}
      </AnimatePresence>

      {/* Menu Screen */}
      <AnimatePresence>
        {phase === 'menu' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative w-24 h-24 mx-auto mb-6"
            >
              {/* Animated logo showcase */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00997d]/20 to-[#00d9a7]/10 rounded-2xl" />
              <div className="absolute inset-2 flex items-center justify-center">
                <NIRDLogo size={48} />
              </div>
              {/* Orbiting logos */}
              {[
                { Logo: LOGO_MAP['linux-nird'], angle: 0 },
                { Logo: LOGO_MAP['firefox'], angle: 90 },
                { Logo: LOGO_MAP['libreoffice'], angle: 180 },
                { Logo: LOGO_MAP['signal'], angle: 270 }
              ].map(({ Logo, angle }, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{ rotate: angle }}
                  className="absolute inset-0"
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                    {Logo && <Logo size={14} />}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <h3 className="text-2xl font-bold text-white mb-2">Alternatives Libres</h3>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Trouvez les paires : chaque logiciel proprietaire a son alternative open source !
              Decouvrez les outils du Village.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 max-w-lg mx-auto">
              {CARD_PAIRS.slice(0, 4).map(pair => {
                const PropLogo = LOGO_MAP[pair.proprietary.id];
                const OpenLogo = LOGO_MAP[pair.opensource.id];
                return (
                  <div key={pair.pairId} className="bg-gray-800/80 rounded-lg p-3 text-center border border-gray-700/50 hover:border-[#00997d]/30 transition-colors">
                    <div className="flex justify-center gap-1 mb-1">
                      {PropLogo && <PropLogo size={16} />}
                    </div>
                    <p className="text-[9px] text-[#ff6b6b]">{pair.proprietary.name}</p>
                    <p className="text-[#00d9a7] text-xs my-0.5">↓</p>
                    <div className="flex justify-center gap-1 mb-1">
                      {OpenLogo && <OpenLogo size={16} />}
                    </div>
                    <p className="text-[9px] text-[#00d9a7]">{pair.opensource.name}</p>
                  </div>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-[#00997d] to-[#00d9a7] text-white font-bold rounded-xl text-lg shadow-lg shadow-[#00997d]/30"
            >
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Commencer le Jeu
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Screen */}
      {phase === 'playing' && (
        <div>
          {/* HUD */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3">
              <GlowPulse color="#00997d" active={matchedPairs > 0}>
                <div className="flex items-center gap-1.5 bg-[#00997d]/20 px-3 py-1.5 rounded-full border border-[#00997d]/30">
                  <Layers className="w-4 h-4 text-[#00d9a7]" />
                  <span className="text-[#00d9a7] font-bold text-sm">
                    {matchedPairs}/{totalPairs}
                  </span>
                </div>
              </GlowPulse>
              <div className="flex items-center gap-1.5 bg-[#F9A825]/20 px-3 py-1.5 rounded-full border border-[#F9A825]/30">
                <Trophy className="w-4 h-4 text-[#F9A825]" />
                <span className="text-[#F9A825] font-bold text-sm">{moves}</span>
              </div>
              {combo >= 2 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5 bg-purple-500/20 px-3 py-1.5 rounded-full border border-purple-500/30"
                >
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-bold text-sm">{combo}x</span>
                </motion.div>
              )}
            </div>
            <div className="flex items-center gap-1.5 bg-gray-700/50 px-3 py-1.5 rounded-full border border-gray-600">
              <Clock className="w-4 h-4 text-white/60" />
              <span className="text-white font-mono text-sm">{formatTime(time)}</span>
            </div>
          </div>

          {/* Card Grid - Responsive: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                onClick={() => handleCardClick(card.id)}
                disabled={flippedCards.length >= 2}
                isNew={isNewGame}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg flex items-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Recommencer
            </motion.button>
          </div>
        </div>
      )}

      {/* Victory Screen */}
      <AnimatePresence>
        {phase === 'victory' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-6 bg-[#F9A825]/20 rounded-full flex items-center justify-center"
            >
              <PartyPopper className="w-10 h-10 text-[#F9A825]" />
            </motion.div>
            <h3 className="text-3xl font-bold text-[#00d9a7] mb-2">
              Maitre des Alternatives !
            </h3>
            <p className="text-white/80 mb-6">
              Tu connais maintenant toutes les alternatives libres aux logiciels proprietaires !
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-[#F9A825] text-2xl font-bold">{moves}</p>
                <p className="text-white/50 text-sm">Coups</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-[#00d9a7] text-2xl font-bold">{formatTime(time)}</p>
                <p className="text-white/50 text-sm">Temps</p>
              </div>
              {isPerfect && (
                <div className="bg-gray-800 rounded-xl p-4">
                  <p className="text-purple-400 text-2xl font-bold">Parfait !</p>
                  <p className="text-white/50 text-sm">0 erreur</p>
                </div>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-[#00997d] to-[#00d9a7] text-white font-bold rounded-xl"
            >
              Rejouer
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
