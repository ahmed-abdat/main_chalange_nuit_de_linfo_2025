'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy, Footprints, BookOpen, Laptop, Terminal, Crown, X, Award,
  Layers, ShieldCheck, TerminalSquare
} from 'lucide-react';
import { useAchievementStore, BADGES } from '@/store/achievementStore';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  footprints: Footprints,
  'book-open': BookOpen,
  laptop: Laptop,
  trophy: Trophy,
  terminal: Terminal,
  crown: Crown,
  layers: Layers,
  'shield-check': ShieldCheck,
  'terminal-square': TerminalSquare
};

interface BadgesPanelProps {
  className?: string;
}

export default function BadgesPanel({ className }: BadgesPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unlockedBadges = useAchievementStore((state) => state.unlockedBadges);
  const totalXP = useAchievementStore((state) => state.totalXP);

  const allBadges = Object.values(BADGES);
  const unlockedCount = unlockedBadges.length;
  const totalCount = allBadges.length;

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'fixed bottom-4 right-4 z-40 flex items-center gap-2 px-4 py-3 rounded-full',
          'bg-[#1a1a1d]/90 backdrop-blur-md border border-[#F9A825]/30',
          'text-white shadow-lg hover:border-[#F9A825]/60 transition-colors',
          className
        )}
      >
        <Award className="w-5 h-5 text-[#F9A825]" />
        <span className="font-bold text-sm">{unlockedCount}/{totalCount}</span>
        <span className="text-[#00997d] font-bold text-sm">{totalXP} XP</span>
      </motion.button>

      {/* Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:w-[500px] md:max-h-[80vh] overflow-hidden"
            >
              <div className="bg-[#1a1a1d] rounded-2xl border border-white/10 shadow-2xl h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-white">Badges du Village</h2>
                      <p className="text-gray-400 text-sm mt-1">
                        {unlockedCount} sur {totalCount} debloques
                      </p>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* XP Progress */}
                  <div className="mt-4 p-3 bg-white/5 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Experience totale</span>
                      <span className="text-[#F9A825] font-bold">{totalXP} XP</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (totalXP / 1150) * 100)}%` }}
                        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#00997d] to-[#F9A825] rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Badges grid */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {allBadges.map((badge, i) => {
                      const isUnlocked = unlockedBadges.includes(badge.id);
                      const IconComponent = ICON_MAP[badge.icon] || Trophy;

                      return (
                        <motion.div
                          key={badge.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={cn(
                            'relative p-4 rounded-xl border transition-all duration-300',
                            isUnlocked
                              ? 'bg-gradient-to-br from-[#00997d]/20 to-[#F9A825]/10 border-[#00997d]/50'
                              : 'bg-white/5 border-white/10 opacity-60'
                          )}
                        >
                          {/* Lock overlay for locked badges */}
                          {!isUnlocked && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
                              <span className="text-2xl">?</span>
                            </div>
                          )}

                          {/* Badge icon */}
                          <div
                            className={cn(
                              'w-12 h-12 rounded-xl flex items-center justify-center mb-3',
                              isUnlocked
                                ? 'bg-gradient-to-br from-[#F9A825] to-[#ff8c00] text-white'
                                : 'bg-white/10 text-gray-500'
                            )}
                          >
                            <IconComponent className="w-6 h-6" />
                          </div>

                          {/* Badge info */}
                          <h3 className={cn(
                            'font-bold text-sm mb-1',
                            isUnlocked ? 'text-white' : 'text-gray-400'
                          )}>
                            {badge.title}
                          </h3>
                          <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                            {badge.description}
                          </p>

                          {/* XP */}
                          <div className={cn(
                            'text-xs font-bold',
                            isUnlocked ? 'text-[#00997d]' : 'text-gray-600'
                          )}>
                            +{badge.xp} XP
                          </div>

                          {/* Unlocked checkmark */}
                          {isUnlocked && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#00997d] flex items-center justify-center"
                            >
                              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 text-center">
                  <p className="text-xs text-gray-500">
                    Explorez le Village pour debloquer tous les badges !
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
