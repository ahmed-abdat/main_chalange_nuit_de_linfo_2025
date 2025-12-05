'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useGameStore, CHARACTERS, type CharacterId } from '@/store/gameStore';
import { CharacterCard } from './CharacterCard';
import BlurText from '@/components/BlurText';

export function CharacterSelectScreen() {
  const { currentPhase, selectedCharacter, selectCharacter, startAdventure } = useGameStore();

  if (currentPhase !== 'character_select') return null;

  const characters = Object.values(CHARACTERS);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-b from-[#0a0a1a] via-[#1a0a2e] to-[#0a1a0a] overflow-y-auto py-12"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23F9A825' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="text-6xl mb-6"
          >
            ⚔️
          </motion.div>

          <BlurText
            text="Choisis ton Champion"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            delay={80}
            animateBy="words"
          />

          <p className="text-gray-400 max-w-xl mx-auto">
            Chaque héros possède des compétences uniques pour combattre l&apos;Empire.
            Qui seras-tu dans cette aventure?
          </p>
        </div>

        {/* Character Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {characters.map((character, i) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CharacterCard
                character={character}
                isSelected={selectedCharacter === character.id}
                onSelect={() => selectCharacter(character.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Selected Character Preview & Start Button */}
        <AnimatePresence>
          {selectedCharacter && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="text-center"
            >
              <div className="inline-block bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl p-6 border border-[#F9A825]/30 mb-6">
                <p className="text-[#F9A825] font-bold text-lg mb-2">
                  Tu as choisi: {CHARACTERS[selectedCharacter].name}
                </p>
                <p className="text-gray-400 text-sm">
                  {CHARACTERS[selectedCharacter].specialAbility}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={startAdventure}
                className="block mx-auto px-12 py-4 bg-gradient-to-r from-[#00997d] to-[#2E7D32]
                         text-white font-bold text-xl rounded-xl
                         shadow-[0_0_30px_rgba(0,153,125,0.5)]
                         border-2 border-[#00997d]"
              >
                <span className="flex items-center gap-3">
                  <span>🗡️</span>
                  COMMENCER LA QUÊTE
                  <span>🛡️</span>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint if no selection */}
        {!selectedCharacter && (
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-center text-gray-500"
          >
            ↑ Clique sur un personnage pour le sélectionner ↑
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
