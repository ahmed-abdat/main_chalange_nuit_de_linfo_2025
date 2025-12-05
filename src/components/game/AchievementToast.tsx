'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy, Footprints, BookOpen, Laptop, Terminal, Crown,
  Layers, ShieldCheck, TerminalSquare
} from 'lucide-react';
import { useAchievementStore, BADGES, type BadgeId } from '@/store/achievementStore';
import { achievementReactions, getCharacter } from '@/data/characterDialogues';

const ICON_MAP: Record<string, React.ReactNode> = {
  footprints: <Footprints className="w-6 h-6" />,
  'book-open': <BookOpen className="w-6 h-6" />,
  laptop: <Laptop className="w-6 h-6" />,
  trophy: <Trophy className="w-6 h-6" />,
  terminal: <Terminal className="w-6 h-6" />,
  crown: <Crown className="w-6 h-6" />,
  layers: <Layers className="w-6 h-6" />,
  'shield-check': <ShieldCheck className="w-6 h-6" />,
  'terminal-square': <TerminalSquare className="w-6 h-6" />
};

export default function AchievementToast() {
  const [mounted, setMounted] = useState(false);
  const recentBadge = useAchievementStore((state) => state.recentBadge);
  const clearRecentBadge = useAchievementStore((state) => state.clearRecentBadge);

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (recentBadge) {
      const timer = setTimeout(() => {
        clearRecentBadge();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [recentBadge, clearRecentBadge]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted || !recentBadge) return null;

  const badge = BADGES[recentBadge];
  const reaction = achievementReactions[recentBadge];
  const character = reaction ? getCharacter(reaction.speaker) : null;

  return (
    <AnimatePresence>
      {recentBadge && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[100]"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#F9A825]/30 blur-xl rounded-2xl" />

            {/* Main toast */}
            <div className="relative bg-[#1a1a1d]/95 backdrop-blur-md border-2 border-[#F9A825] rounded-2xl p-4 shadow-2xl min-w-[320px]">
              {/* Badge unlocked header */}
              <div className="flex items-center gap-3 mb-3">
                {/* Icon */}
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F9A825] to-[#ff8c00] flex items-center justify-center text-white shadow-lg"
                >
                  {ICON_MAP[badge.icon] || <Trophy className="w-6 h-6" />}
                </motion.div>

                <div className="flex-1">
                  <p className="text-[#F9A825] text-xs font-bold uppercase tracking-wider">
                    Badge Debloque !
                  </p>
                  <h3 className="text-white font-bold text-lg">{badge.title}</h3>
                </div>

                {/* XP badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="px-3 py-1 bg-[#00997d]/20 rounded-full"
                >
                  <span className="text-[#00997d] font-bold text-sm">+{badge.xp} XP</span>
                </motion.div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-3">{badge.description}</p>

              {/* Character reaction */}
              {character && reaction && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start gap-2 pt-3 border-t border-white/10"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: character.color }}
                  >
                    {character.emoji}
                  </div>
                  <p className="text-sm text-gray-300 italic">
                    &ldquo;{reaction.line}&rdquo;
                  </p>
                </motion.div>
              )}

              {/* Animated particles */}
              <div className="absolute -top-2 -right-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [-20, -40 - i * 10],
                      x: [0, (i - 1) * 15]
                    }}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      duration: 1,
                      ease: 'easeOut'
                    }}
                    className="absolute w-2 h-2 rounded-full bg-[#F9A825]"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to trigger achievements from anywhere
export function useUnlockAchievement() {
  const unlockBadge = useAchievementStore((state) => state.unlockBadge);
  const hasBadge = useAchievementStore((state) => state.hasBadge);

  return {
    unlock: (badgeId: BadgeId) => {
      if (!hasBadge(badgeId)) {
        unlockBadge(badgeId);
      }
    },
    hasBadge
  };
}
