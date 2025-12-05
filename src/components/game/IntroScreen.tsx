'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from '@/store/gameStore';
import BlurText from '@/components/BlurText';

const introLines = [
  'Nous sommes en 2025...',
  "Toute la France est occupée par l'Empire Big Tech...",
  'Toute? Non!',
  "Un village d'irréductibles enseignants résiste encore à l'envahisseur...",
  'Leur arme secrète? La potion magique du logiciel libre.',
  'Mais le village a besoin d\'un champion...',
  'Es-tu prêt(e) à rejoindre la résistance?',
];

export function IntroScreen() {
  const { currentPhase, startGame } = useGameStore();
  const [currentLine, setCurrentLine] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    if (currentLine < introLines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  if (currentPhase !== 'intro') return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {/* Starfield background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>

      {/* Intro text */}
      <div className="relative z-10 max-w-3xl px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className={`font-serif text-2xl md:text-4xl leading-relaxed ${
                currentLine === 2
                  ? 'text-[#F9A825] font-bold'
                  : currentLine >= 4
                  ? 'text-[#00997d]'
                  : 'text-white'
              }`}
            >
              {introLines[currentLine]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-12">
          {introLines.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i === currentLine
                  ? 'bg-[#F9A825] scale-150'
                  : i < currentLine
                  ? 'bg-[#00997d]'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Start button */}
        <AnimatePresence>
          {currentLine === introLines.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={startGame}
                className="px-12 py-4 bg-gradient-to-r from-[#F9A825] to-[#00997d]
                         text-black font-bold text-xl rounded-xl
                         shadow-[0_0_30px_rgba(249,168,37,0.5)]"
              >
                ⚔️ COMMENCER L&apos;AVENTURE
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      <AnimatePresence>
        {showSkip && currentLine < introLines.length - 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={startGame}
            className="absolute bottom-8 right-8 text-gray-500 hover:text-white transition-colors"
          >
            Passer l&apos;intro →
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
