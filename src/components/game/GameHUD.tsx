'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore, CHARACTERS, QUESTS, ITEMS } from '@/store/gameStore';
import { cn } from '@/lib/utils';
import CountUp from '@/components/CountUp';

export function GameHUD() {
  const {
    gameStarted,
    currentPhase,
    selectedCharacter,
    xp,
    level,
    budgetSaved,
    pcsSaved,
    quests,
    inventory,
    resetGame,
  } = useGameStore();

  const [showInventory, setShowInventory] = useState(false);
  const [showQuests, setShowQuests] = useState(false);

  // Don't show HUD until adventure starts
  if (!gameStarted || currentPhase !== 'adventure' || !selectedCharacter) {
    return null;
  }

  const character = CHARACTERS[selectedCharacter];
  const xpToNextLevel = 500;
  const xpProgress = (xp % xpToNextLevel) / xpToNextLevel;

  const completedQuests = Object.values(quests).filter((q) => q.completed).length;
  const totalQuests = Object.keys(QUESTS).length;

  const inventoryItems = Object.values(inventory).filter((item) => item.quantity > 0);

  return (
    <>
      {/* Top HUD Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Character & Level */}
          <div className="pointer-events-auto bg-[#1a1a2e]/90 backdrop-blur-md rounded-xl p-3 border border-[#F9A825]/30 flex items-center gap-3">
            <span className="text-3xl">{character.emoji}</span>
            <div>
              <p className="font-bold text-white">{character.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#F9A825] font-bold">Niv. {level}</span>
                <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#F9A825] to-[#00997d]"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{xp} XP</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="pointer-events-auto bg-[#1a1a2e]/90 backdrop-blur-md rounded-xl p-3 border border-[#00997d]/30 flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-400">Budget Sauvé</p>
              <p className="text-lg font-bold text-[#00997d]">
                €<CountUp to={budgetSaved} duration={1} className="inline" />
              </p>
            </div>
            <div className="w-px h-8 bg-gray-600" />
            <div className="text-center">
              <p className="text-xs text-gray-400">PCs Sauvés</p>
              <p className="text-lg font-bold text-[#F9A825]">
                <CountUp to={pcsSaved} duration={1} className="inline" />
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pointer-events-auto flex items-center gap-2">
            {/* Quests Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowQuests(!showQuests)}
              className={cn(
                'relative p-3 rounded-xl border transition-colors',
                showQuests
                  ? 'bg-[#F9A825] border-[#F9A825] text-black'
                  : 'bg-[#1a1a2e]/90 border-[#F9A825]/30 text-[#F9A825]'
              )}
            >
              📜
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00997d] rounded-full text-xs font-bold flex items-center justify-center text-white">
                {completedQuests}/{totalQuests}
              </span>
            </motion.button>

            {/* Inventory Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowInventory(!showInventory)}
              className={cn(
                'relative p-3 rounded-xl border transition-colors',
                showInventory
                  ? 'bg-[#00997d] border-[#00997d] text-white'
                  : 'bg-[#1a1a2e]/90 border-[#00997d]/30 text-[#00997d]'
              )}
            >
              🎒
              {inventoryItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F9A825] rounded-full text-xs font-bold flex items-center justify-center text-black">
                  {inventoryItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </motion.button>

            {/* Reset Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetGame}
              className="p-3 rounded-xl bg-[#1a1a2e]/90 border border-red-500/30 text-red-400"
            >
              🔄
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Quest Panel */}
      <AnimatePresence>
        {showQuests && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-24 right-4 z-40 w-80"
          >
            <div className="bg-[#1a1a2e]/95 backdrop-blur-md rounded-xl border-2 border-[#F9A825]/50 p-4">
              <h3 className="font-bold text-[#F9A825] mb-4 flex items-center gap-2">
                <span>📜</span> Journal de Quêtes
              </h3>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {Object.values(quests).map((quest) => (
                  <div
                    key={quest.id}
                    className={cn(
                      'p-3 rounded-lg border transition-all',
                      quest.completed
                        ? 'bg-[#00997d]/20 border-[#00997d]'
                        : quest.unlocked
                        ? 'bg-[#F9A825]/10 border-[#F9A825]/30'
                        : 'bg-gray-800/50 border-gray-700 opacity-50'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">
                        {quest.completed ? '✅' : quest.unlocked ? '🎯' : '🔒'}
                      </span>
                      <div className="flex-1">
                        <p className="font-bold text-white text-sm">{quest.title}</p>
                        <p className="text-xs text-gray-400">{quest.description}</p>
                        <p className="text-xs text-[#F9A825] mt-1">+{quest.xpReward} XP</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inventory Panel */}
      <AnimatePresence>
        {showInventory && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-24 right-4 z-40 w-80"
          >
            <div className="bg-[#1a1a2e]/95 backdrop-blur-md rounded-xl border-2 border-[#00997d]/50 p-4">
              <h3 className="font-bold text-[#00997d] mb-4 flex items-center gap-2">
                <span>🎒</span> Inventaire
              </h3>

              {inventoryItems.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">
                  Ton inventaire est vide
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {inventoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-[#00997d]/10 border border-[#00997d]/30 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.emoji}</span>
                        {item.quantity > 1 && (
                          <span className="text-xs bg-[#F9A825] text-black px-1.5 py-0.5 rounded-full font-bold">
                            x{item.quantity}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white font-bold mt-1">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
