'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Volume2, VolumeX, Vibrate, X, Trophy, Star } from 'lucide-react';
import { useGameStore, useGameSettings, useMiniGameStats } from '@/store/gameStore';
import { cn } from '@/lib/utils';

// Compact toggle for game sections
export function GameSettingsToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const settings = useGameSettings();
  const toggleSound = useGameStore((s) => s.toggleSound);
  const toggleHaptic = useGameStore((s) => s.toggleHaptic);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
        aria-label="Game settings"
      >
        <Settings className="w-4 h-4 text-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-full mt-2 z-50 w-48 bg-[#1a1a1d] rounded-xl border border-white/10 shadow-xl overflow-hidden"
            >
              <div className="p-2 space-y-1">
                {/* Sound toggle */}
                <button
                  onClick={toggleSound}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    settings.soundEnabled ? "bg-[#00997d]/20 text-[#00d9a7]" : "bg-white/5 text-gray-400"
                  )}
                >
                  {settings.soundEnabled ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                  <span className="text-sm">Son</span>
                  <span className={cn(
                    "ml-auto text-xs px-1.5 py-0.5 rounded",
                    settings.soundEnabled ? "bg-[#00997d] text-white" : "bg-gray-600 text-gray-300"
                  )}>
                    {settings.soundEnabled ? 'ON' : 'OFF'}
                  </span>
                </button>

                {/* Haptic toggle */}
                <button
                  onClick={toggleHaptic}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    settings.hapticEnabled ? "bg-[#00997d]/20 text-[#00d9a7]" : "bg-white/5 text-gray-400"
                  )}
                >
                  <Vibrate className="w-4 h-4" />
                  <span className="text-sm">Vibration</span>
                  <span className={cn(
                    "ml-auto text-xs px-1.5 py-0.5 rounded",
                    settings.hapticEnabled ? "bg-[#00997d] text-white" : "bg-gray-600 text-gray-300"
                  )}>
                    {settings.hapticEnabled ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// XP and Level Display
export function PlayerStats({ compact = false }: { compact?: boolean }) {
  const xp = useGameStore((s) => s.xp);
  const level = useGameStore((s) => s.level);
  const getLevelTitle = useGameStore((s) => s.getLevelTitle);

  const xpForNextLevel = level * 500;
  const xpProgress = ((xp % 500) / 500) * 100;

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F9A825]/10 rounded-full border border-[#F9A825]/20">
        <Star className="w-4 h-4 text-[#F9A825]" />
        <span className="text-[#F9A825] font-bold text-sm">Niv. {level}</span>
        <span className="text-gray-500 text-xs">({xp} XP)</span>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1d]/80 rounded-xl border border-white/10 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#F9A825]/20 flex items-center justify-center">
            <Star className="w-4 h-4 text-[#F9A825]" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Niveau {level}</p>
            <p className="text-gray-400 text-xs">{getLevelTitle()}</p>
          </div>
        </div>
        <span className="text-[#F9A825] font-bold">{xp} XP</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${xpProgress}%` }}
          className="h-full bg-gradient-to-r from-[#F9A825] to-[#ff8c00] rounded-full"
        />
      </div>
      <p className="text-gray-500 text-xs mt-1 text-right">
        {xp % 500} / 500 XP pour niveau {level + 1}
      </p>
    </div>
  );
}

// Mini Game Stats Display
export function MiniGameStatsDisplay() {
  const stats = useMiniGameStats();
  const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

  return (
    <div className="bg-[#1a1a1d]/80 rounded-xl border border-white/10 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-5 h-5 text-[#F9A825]" />
        <h4 className="text-white font-bold">Statistiques</h4>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <p className="text-[#00d9a7] font-bold text-lg">{stats.gamesPlayed}</p>
          <p className="text-gray-400 text-xs">Parties</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <p className="text-[#F9A825] font-bold text-lg">{winRate}%</p>
          <p className="text-gray-400 text-xs">Victoires</p>
        </div>
      </div>

      {/* Best scores */}
      {Object.entries(stats.bestScores).some(([, v]) => v > 0) && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-gray-400 text-xs mb-2">Meilleurs scores:</p>
          <div className="flex flex-wrap gap-2">
            {stats.bestScores.memory > 0 && (
              <span className="px-2 py-1 bg-[#00997d]/20 text-[#00d9a7] text-xs rounded">
                Memory: {stats.bestScores.memory}
              </span>
            )}
            {stats.bestScores.typing > 0 && (
              <span className="px-2 py-1 bg-[#00997d]/20 text-[#00d9a7] text-xs rounded">
                Typing: {stats.bestScores.typing} WPM
              </span>
            )}
            {stats.bestScores.quiz > 0 && (
              <span className="px-2 py-1 bg-[#00997d]/20 text-[#00d9a7] text-xs rounded">
                Quiz: {stats.bestScores.quiz}/5
              </span>
            )}
            {stats.bestScores.tower > 0 && (
              <span className="px-2 py-1 bg-[#00997d]/20 text-[#00d9a7] text-xs rounded">
                Tower: Vague {stats.bestScores.tower}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
