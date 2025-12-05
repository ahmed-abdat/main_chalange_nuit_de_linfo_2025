'use client';

import { motion } from 'motion/react';
import { type Character } from '@/store/gameStore';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onSelect: () => void;
}

export function CharacterCard({ character, isSelected, onSelect }: CharacterCardProps) {
  const statLabels = {
    courage: { label: 'Courage', icon: '🔥' },
    wisdom: { label: 'Sagesse', icon: '📚' },
    strength: { label: 'Force', icon: '💪' },
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className={cn(
        'relative p-6 rounded-2xl text-left transition-all duration-300',
        'bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a]',
        'border-4',
        isSelected
          ? 'border-[#F9A825] shadow-[0_0_40px_rgba(249,168,37,0.5)]'
          : 'border-gray-700 hover:border-gray-500'
      )}
      style={{
        boxShadow: isSelected ? `0 0 40px ${character.color}40` : undefined,
      }}
    >
      {/* Selected badge */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-3 -right-3 w-8 h-8 bg-[#F9A825] rounded-full
                     flex items-center justify-center text-black font-bold"
        >
          ✓
        </motion.div>
      )}

      {/* Character emoji/avatar */}
      <motion.div
        animate={isSelected ? { rotate: [0, -5, 5, 0] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-6xl mb-4 block text-center"
      >
        {character.emoji}
      </motion.div>

      {/* Name & Title */}
      <h3
        className="text-2xl font-bold text-center mb-1"
        style={{ color: character.color }}
      >
        {character.name}
      </h3>
      <p className="text-gray-400 text-sm text-center mb-4">{character.title}</p>

      {/* Description */}
      <p className="text-gray-300 text-sm text-center mb-6 min-h-[60px]">
        {character.description}
      </p>

      {/* Stats */}
      <div className="space-y-2">
        {(Object.keys(character.stats) as Array<keyof typeof character.stats>).map((stat) => (
          <div key={stat} className="flex items-center gap-2">
            <span className="text-sm">{statLabels[stat].icon}</span>
            <span className="text-xs text-gray-400 w-16">{statLabels[stat].label}</span>
            <div className="flex-1 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-2 flex-1 rounded-full transition-colors',
                    i < character.stats[stat]
                      ? 'bg-gradient-to-r from-[#F9A825] to-[#00997d]'
                      : 'bg-gray-700'
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Special ability */}
      <div
        className="mt-4 p-3 rounded-lg text-center text-xs"
        style={{ backgroundColor: `${character.color}20` }}
      >
        <span className="text-[#F9A825] font-bold">⚡ Pouvoir Spécial:</span>
        <p className="text-gray-300 mt-1">{character.specialAbility}</p>
      </div>
    </motion.button>
  );
}
