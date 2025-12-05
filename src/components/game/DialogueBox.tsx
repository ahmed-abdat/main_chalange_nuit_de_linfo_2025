'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore, type DialogueLine } from '@/store/gameStore';

interface DialogueBoxProps {
  lines?: DialogueLine[];
  onComplete?: () => void;
}

export function DialogueBox({ lines, onComplete }: DialogueBoxProps) {
  const { activeDialogue, dialogueIndex, advanceDialogue, setDialogue } = useGameStore();
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const dialogue = lines || activeDialogue;
  const currentLine = dialogue?.[dialogueIndex];

  // Typing effect
  useEffect(() => {
    if (!currentLine) return;

    setIsTyping(true);
    setDisplayedText('');

    let index = 0;
    const text = currentLine.text;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentLine]);

  const handleClick = () => {
    if (isTyping) {
      // Skip to end of text
      setDisplayedText(currentLine?.text || '');
      setIsTyping(false);
      return;
    }

    if (!dialogue) return;

    if (dialogueIndex < dialogue.length - 1) {
      advanceDialogue();
    } else {
      setDialogue(null);
      onComplete?.();
    }
  };

  if (!dialogue || !currentLine) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4"
      >
        <div
          className="relative bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a]
                     border-4 border-[#F9A825] rounded-xl p-6
                     shadow-[0_0_30px_rgba(249,168,37,0.3)]"
        >
          {/* Speaker info */}
          <div className="absolute -top-4 left-6 flex items-center gap-2">
            <span className="text-3xl">{currentLine.speakerEmoji}</span>
            <span className="px-4 py-1 bg-[#F9A825] text-black font-bold text-sm rounded-full">
              {currentLine.speaker}
            </span>
          </div>

          {/* Dialogue text */}
          <p className="text-white text-lg leading-relaxed mt-4 min-h-[80px]">
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                |
              </motion.span>
            )}
          </p>

          {/* Choices or continue prompt */}
          {!isTyping && (
            <div className="mt-4">
              {currentLine.choices ? (
                <div className="flex flex-wrap gap-3">
                  {currentLine.choices.map((choice, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={choice.action}
                      className="px-4 py-2 bg-[#00997d] hover:bg-[#00b894] text-white
                               font-bold rounded-lg transition-colors border-2 border-[#00997d]
                               hover:border-white"
                    >
                      {choice.text}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <motion.button
                  onClick={handleClick}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-[#F9A825] font-bold flex items-center gap-2"
                >
                  Continuer
                  <span className="text-xl">▶</span>
                </motion.button>
              )}
            </div>
          )}

          {/* Progress dots */}
          {dialogue.length > 1 && (
            <div className="absolute bottom-2 right-4 flex gap-1">
              {dialogue.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === dialogueIndex ? 'bg-[#F9A825]' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#F9A825] rounded-tl" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#F9A825] rounded-tr" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#F9A825] rounded-bl" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#F9A825] rounded-br" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
