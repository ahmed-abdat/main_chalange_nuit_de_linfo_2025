'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal, Play, RotateCcw, Trophy, Clock, Zap, Target, AlertCircle,
  PartyPopper, CheckCircle, Keyboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProgressiveCommands, TYPING_CONFIG, type TypingCommand } from '@/data/typingCommands';
import { useAchievementStore } from '@/store/achievementStore';
import { useGameSounds } from '@/hooks/useGameSounds';
import {
  EnhancedConfetti,
  SpeedLines,
  KeyboardVisualizer,
  ScreenShakeProvider,
  useScreenShake,
  ProgressRing,
  useParticles,
  ParticleSystem
} from './GameVFX';

// =============================================================================
// TYPES
// =============================================================================
type GamePhase = 'menu' | 'countdown' | 'playing' | 'victory';

interface GameStats {
  correctChars: number;
  totalChars: number;
  correctCommands: number;
  totalCommands: number;
  wpm: number;
}


// =============================================================================
// TERMINAL DISPLAY
// =============================================================================
function TerminalDisplay({
  command,
  userInput,
  completed,
  tip
}: {
  command: string;
  userInput: string;
  completed: TypingCommand[];
  tip: string;
}) {
  return (
    <div className="bg-[#0d1117] rounded-lg border border-gray-700 overflow-hidden font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-400 text-xs ml-2">terminal@nird-village ~ </span>
      </div>

      {/* Terminal Content - Responsive heights */}
      <div className="p-3 sm:p-4 min-h-[160px] sm:min-h-[200px] md:min-h-[220px] max-h-[250px] sm:max-h-[300px] md:max-h-[350px] overflow-y-auto">
        {/* Completed commands */}
        {completed.slice(-3).map((cmd, i) => (
          <div key={i} className="mb-2 opacity-60">
            <div className="flex items-center gap-2">
              <span className="text-[#00d9a7]">$</span>
              <span className="text-white">{cmd.command}</span>
              <CheckCircle className="w-3 h-3 text-green-500" />
            </div>
            <div className="text-gray-400 text-xs ml-4"># {cmd.description}</div>
          </div>
        ))}

        {/* Current command */}
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#00d9a7]">$</span>
            <div className="flex-1">
              {command.split('').map((char, i) => {
                const userChar = userInput[i];
                let className = 'text-gray-400'; // Not typed yet

                if (userChar !== undefined) {
                  if (userChar === char) {
                    className = 'text-white'; // Correct
                  } else {
                    className = 'text-red-500 bg-red-500/20'; // Wrong
                  }
                }

                return (
                  <span key={i} className={className}>
                    {char}
                  </span>
                );
              })}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-[#00d9a7] ml-0.5"
              />
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className="mt-4 text-xs text-[#F9A825] flex items-start gap-2">
          <Zap className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>{tip}</span>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// WINDOWS UPDATE MOCKUP
// =============================================================================
function WindowsUpdateBar({ progress }: { progress: number }) {
  return (
    <div className="bg-[#0078D4] rounded-lg p-4 border border-[#0078D4]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
        <div>
          <p className="text-white font-medium text-sm">Mise a jour Windows</p>
          <p className="text-white/60 text-xs">Ne pas eteindre votre ordinateur...</p>
        </div>
      </div>
      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-white/50 text-xs mt-2 text-center">
        {progress < 100 ? `${Math.round(progress)}% - Cela peut prendre un moment...` : 'Encore un peu...'}
      </p>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
// Inner component that uses screen shake
function TypingGameInner() {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(TYPING_CONFIG.gameDuration);
  const [commands, setCommands] = useState<TypingCommand[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [completedCommands, setCompletedCommands] = useState<TypingCommand[]>([]);
  const [stats, setStats] = useState<GameStats>({
    correctChars: 0,
    totalChars: 0,
    correctCommands: 0,
    totalCommands: 0,
    wpm: 0
  });
  const [windowsProgress, setWindowsProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // VFX states
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [lastKeyTime, setLastKeyTime] = useState(0);
  const [currentKey, setCurrentKey] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [streak, setStreak] = useState(0);

  const { particles, spawn: spawnParticles } = useParticles();
  const { shake } = useScreenShake();
  const { play: playSound } = useGameSounds();

  const inputRef = useRef<HTMLInputElement>(null);
  const unlockBadge = useAchievementStore(s => s.unlockBadge);

  const currentCommand = commands[currentIndex];

  // Start game
  const startGame = useCallback(() => {
    playSound('click');
    setPhase('countdown');
    setCountdown(3);
    setTimeLeft(TYPING_CONFIG.gameDuration);
    setCommands(getProgressiveCommands(15));
    setCurrentIndex(0);
    setUserInput('');
    setCompletedCommands([]);
    setStats({ correctChars: 0, totalChars: 0, correctCommands: 0, totalCommands: 0, wpm: 0 });
    setWindowsProgress(0);
  }, [playSound]);

  // Countdown
  useEffect(() => {
    if (phase !== 'countdown') return;

    if (countdown > 0) {
      playSound('countdown');
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setPhase('playing');
      inputRef.current?.focus();
    }
  }, [phase, countdown, playSound]);

  // Game timer
  useEffect(() => {
    if (phase !== 'playing') return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      endGame();
    }
  }, [phase, timeLeft]);

  // Windows progress (slow)
  useEffect(() => {
    if (phase !== 'playing') return;

    const interval = setInterval(() => {
      setWindowsProgress(p => Math.min(p + 0.3, 99));
    }, 500);

    return () => clearInterval(interval);
  }, [phase]);

  // Handle input
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (phase !== 'playing' || !currentCommand) return;

    const value = e.target.value;
    const now = Date.now();

    // Track typing speed
    if (lastKeyTime > 0) {
      const timeDiff = now - lastKeyTime;
      const speed = Math.min(300 / timeDiff, 1); // Normalize to 0-1
      setTypingSpeed(speed);
    }
    setLastKeyTime(now);

    // Track current key for keyboard viz
    if (value.length > userInput.length) {
      setCurrentKey(value[value.length - 1]);
      setTimeout(() => setCurrentKey(''), 100);
    }

    // Check for errors
    const expectedChar = currentCommand.command[value.length - 1];
    const actualChar = value[value.length - 1];

    if (value.length > userInput.length && actualChar !== expectedChar) {
      // Error! Shake and reset streak
      playSound('error');
      setHasError(true);
      setStreak(0);
      shake(5, 100);
      setTimeout(() => setHasError(false), 200);
    } else if (value.length > userInput.length && actualChar === expectedChar) {
      // Correct keystroke
      playSound('type');
      setStreak(s => s + 1);

      // Spawn particle every 10 keystrokes
      if ((streak + 1) % 10 === 0) {
        spawnParticles({
          x: 200,
          y: 150,
          count: 5,
          colors: ['#00d9a7', '#F9A825'],
          spread: 30,
          speed: 2,
          size: 4
        });
      }
    }

    setUserInput(value);

    // Check if command is complete
    if (value === currentCommand.command) {
      // Correct!
      playSound('success');
      setStats(prev => ({
        ...prev,
        correctChars: prev.correctChars + currentCommand.command.length,
        totalChars: prev.totalChars + currentCommand.command.length,
        correctCommands: prev.correctCommands + 1,
        totalCommands: prev.totalCommands + 1
      }));
      setCompletedCommands(prev => [...prev, currentCommand]);
      setUserInput('');
      setStreak(s => s + 5); // Bonus streak for completing command

      // Celebration particles
      spawnParticles({
        x: 200,
        y: 100,
        count: 15,
        colors: ['#00997d', '#00d9a7', '#F9A825'],
        spread: 60,
        speed: 4,
        type: 'star'
      });

      if (currentIndex + 1 < commands.length) {
        setCurrentIndex(i => i + 1);
      } else {
        endGame();
      }
    }
  }, [phase, currentCommand, currentIndex, commands.length, userInput, lastKeyTime, streak, shake, spawnParticles, playSound]);

  // End game
  const endGame = useCallback(() => {
    playSound('victory');
    const elapsed = TYPING_CONFIG.gameDuration - timeLeft;
    const minutes = elapsed / 60;
    const words = stats.correctChars / 5; // Standard: 5 chars = 1 word
    const wpm = minutes > 0 ? Math.round(words / minutes) : 0;

    setStats(prev => ({ ...prev, wpm }));
    setPhase('victory');
    setShowConfetti(true);

    if (wpm >= TYPING_CONFIG.minWpmForBadge) {
      unlockBadge('terminal_ninja');
    }

    setTimeout(() => setShowConfetti(false), 4000);
  }, [timeLeft, stats.correctChars, unlockBadge, playSound]);

  // Keep input focused
  useEffect(() => {
    if (phase === 'playing') {
      inputRef.current?.focus();
    }
  }, [phase]);

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4">
      {/* VFX Layers */}
      <EnhancedConfetti active={showConfetti} />
      <ParticleSystem particles={particles} />
      <SpeedLines active={phase === 'playing' && typingSpeed > 0.5} intensity={typingSpeed} />

      {/* Error flash overlay */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-500/10 pointer-events-none rounded-lg z-10"
          />
        )}
      </AnimatePresence>

      {/* Hidden input for capturing keystrokes */}
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInput}
        className="absolute opacity-0 pointer-events-none"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
      />

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
              className="w-20 h-20 mx-auto mb-6 bg-[#00997d]/20 rounded-full flex items-center justify-center"
            >
              <Terminal className="w-10 h-10 text-[#00d9a7]" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Terminal Magique</h3>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Tapez les commandes Linux le plus vite possible !
              Battez Windows Update dans cette course contre la montre.
            </p>

            <div className="bg-gray-800 rounded-xl p-4 max-w-sm mx-auto mb-6">
              <p className="text-[#00d9a7] font-mono text-sm mb-2">$ sudo apt install liberte</p>
              <p className="text-white/50 text-xs">
                Objectif: {TYPING_CONFIG.minWpmForBadge}+ WPM pour le badge "Ninja du Terminal"
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-[#00997d] to-[#00d9a7] text-white font-bold rounded-xl text-lg shadow-lg shadow-[#00997d]/30"
            >
              <span className="flex items-center gap-2">
                <Keyboard className="w-5 h-5" />
                Commencer le Defi
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Countdown */}
      <AnimatePresence>
        {phase === 'countdown' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <motion.div
              key={countdown}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-8xl font-black text-[#00d9a7]"
            >
              {countdown}
            </motion.div>
            <p className="text-white/60 mt-4">Preparez vos doigts !</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Screen */}
      {phase === 'playing' && currentCommand && (
        <div onClick={() => inputRef.current?.focus()}>
          {/* HUD */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 bg-[#00997d]/20 px-3 py-1.5 rounded-full border border-[#00997d]/30">
                <Target className="w-4 h-4 text-[#00d9a7]" />
                <span className="text-[#00d9a7] font-bold text-sm">
                  {stats.correctCommands}/{commands.length}
                </span>
              </div>
            </div>
            <div className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full border",
              timeLeft <= 10
                ? "bg-red-500/20 border-red-500/30"
                : "bg-gray-700/50 border-gray-600"
            )}>
              <Clock className={cn("w-4 h-4", timeLeft <= 10 ? "text-red-400" : "text-white/60")} />
              <span className={cn(
                "font-mono font-bold",
                timeLeft <= 10 ? "text-red-400" : "text-white"
              )}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Race Display - Responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
            {/* Linux Terminal */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-[#00d9a7]" />
                <span className="text-[#00d9a7] font-bold text-sm">Linux NIRD</span>
                <span className="text-white/50 text-xs">(Vous)</span>
              </div>
              <TerminalDisplay
                command={currentCommand.command}
                userInput={userInput}
                completed={completedCommands}
                tip={currentCommand.nirdTip}
              />
            </div>

            {/* Windows Update */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-[#0078D4]" />
                <span className="text-[#0078D4] font-bold text-sm">Windows Update</span>
                <span className="text-white/50 text-xs">(Adversaire)</span>
              </div>
              <WindowsUpdateBar progress={windowsProgress} />
            </div>
          </div>

          {/* Current command info */}
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <p className="text-white/60 text-sm">
              <span className="text-[#F9A825]">{currentCommand.description}</span>
            </p>
            <p className="text-white/40 text-xs mt-1">
              Difficulte: {currentCommand.difficulty === 'easy' ? 'Facile' : currentCommand.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
            </p>
          </div>

          {/* Keyboard Visualizer and Streak */}
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Keyboard */}
            <div className="flex-1 hidden md:flex justify-center">
              <KeyboardVisualizer currentKey={currentKey} />
            </div>

            {/* Streak Counter */}
            {streak >= 5 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F9A825]/20 to-purple-500/20 rounded-full border border-[#F9A825]/30"
              >
                <Zap className="w-4 h-4 text-[#F9A825]" />
                <span className="text-[#F9A825] font-bold">{streak}</span>
                <span className="text-white/60 text-xs">streak!</span>
              </motion.div>
            )}
          </div>

          {/* Instructions */}
          <p className="text-center text-white/40 text-xs mt-4">
            Cliquez n'importe ou et tapez la commande
          </p>
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
              {stats.wpm >= TYPING_CONFIG.minWpmForBadge ? (
                <PartyPopper className="w-10 h-10 text-[#F9A825]" />
              ) : (
                <Trophy className="w-10 h-10 text-[#F9A825]" />
              )}
            </motion.div>
            <h3 className="text-3xl font-bold text-[#00d9a7] mb-2">
              {stats.wpm >= TYPING_CONFIG.minWpmForBadge ? 'Ninja du Terminal !' : 'Bien joue !'}
            </h3>
            <p className="text-white/80 mb-6">
              Tu as battu Windows Update ! Linux est toujours plus rapide.
            </p>

            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-[#00d9a7] text-3xl font-bold">{stats.wpm}</p>
                <p className="text-white/50 text-sm">WPM</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-[#F9A825] text-3xl font-bold">{stats.correctCommands}</p>
                <p className="text-white/50 text-sm">Commandes</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-purple-400 text-3xl font-bold">
                  {stats.totalChars > 0 ? Math.round((stats.correctChars / stats.totalChars) * 100) : 0}%
                </p>
                <p className="text-white/50 text-sm">Precision</p>
              </div>
            </div>

            {stats.wpm >= TYPING_CONFIG.minWpmForBadge && (
              <div className="bg-[#00997d]/20 rounded-xl p-4 mb-6 max-w-sm mx-auto border border-[#00997d]/30">
                <Zap className="w-6 h-6 text-[#00d9a7] mx-auto mb-2" />
                <p className="text-[#00d9a7] font-bold">Badge Debloque !</p>
                <p className="text-white/60 text-sm">Ninja du Terminal</p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-[#00997d] to-[#00d9a7] text-white font-bold rounded-xl"
            >
              <span className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Rejouer
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Wrapper component with ScreenShakeProvider
export default function TypingGame() {
  return (
    <ScreenShakeProvider>
      <TypingGameInner />
    </ScreenShakeProvider>
  );
}
