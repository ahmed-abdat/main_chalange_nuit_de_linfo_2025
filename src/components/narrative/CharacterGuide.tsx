'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  characters,
  sectionDialogues,
  getCharacter,
  type CharacterId,
  type SectionDialogue
} from '@/data/characterDialogues';

interface CharacterGuideProps {
  currentSection: string;
  onDialogueComplete?: () => void;
}

export default function CharacterGuide({ currentSection, onDialogueComplete }: CharacterGuideProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState<SectionDialogue | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasSeenSection, setHasSeenSection] = useState<Set<string>>(new Set());

  // Find dialogue for current section
  useEffect(() => {
    const dialogue = sectionDialogues.find(d => d.section === currentSection);

    if (dialogue && !hasSeenSection.has(currentSection)) {
      // Delay before showing dialogue
      const timer = setTimeout(() => {
        setCurrentDialogue(dialogue);
        setCurrentLineIndex(0);
        setDisplayedText('');
        setIsVisible(true);
        setHasSeenSection(prev => new Set(prev).add(currentSection));
      }, dialogue.delay || 500);

      return () => clearTimeout(timer);
    }
  }, [currentSection, hasSeenSection]);

  // Typewriter effect
  useEffect(() => {
    if (!currentDialogue || !isVisible || isMinimized) return;

    const fullText = currentDialogue.lines[currentLineIndex];
    if (!fullText) return;

    if (displayedText.length < fullText.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [currentDialogue, currentLineIndex, displayedText, isVisible, isMinimized]);

  // Handle next line or close
  const handleNext = useCallback(() => {
    if (!currentDialogue) return;

    if (isTyping) {
      // Skip to full text
      setDisplayedText(currentDialogue.lines[currentLineIndex]);
      setIsTyping(false);
    } else if (currentLineIndex < currentDialogue.lines.length - 1) {
      // Next line
      setCurrentLineIndex(prev => prev + 1);
      setDisplayedText('');
    } else {
      // Close dialogue
      setIsVisible(false);
      onDialogueComplete?.();
    }
  }, [currentDialogue, currentLineIndex, isTyping, onDialogueComplete]);

  const handleClose = () => {
    setIsVisible(false);
    onDialogueComplete?.();
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
  };

  if (!currentDialogue) return null;

  const character = getCharacter(currentDialogue.speaker);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Minimized state - just avatar */}
          {isMinimized ? (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={handleExpand}
              className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: character.color }}
            >
              <span className="text-white font-bold text-base sm:text-lg">{character.emoji}</span>
            </motion.button>
          ) : (
            /* Full dialogue box */
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-auto z-50 max-w-[calc(100vw-1rem)] sm:max-w-sm"
            >
              <div
                className="bg-gray-900/95 backdrop-blur-md rounded-2xl border-2 shadow-2xl overflow-hidden"
                style={{ borderColor: character.color }}
              >
                {/* Header with character info */}
                <div
                  className="px-4 py-2 flex items-center justify-between"
                  style={{ backgroundColor: `${character.color}20` }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: character.color }}
                    >
                      {character.emoji}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{character.name}</p>
                      <p className="text-white/60 text-xs">{character.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleMinimize}
                      className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
                    >
                      <span className="text-xs">_</span>
                    </button>
                    <button
                      onClick={handleClose}
                      className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Dialogue content */}
                <div
                  className="px-4 py-3 min-h-[80px] cursor-pointer"
                  onClick={handleNext}
                >
                  <p className="text-white text-sm leading-relaxed">
                    {displayedText}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </p>
                </div>

                {/* Footer with progress and next button */}
                <div className="px-4 py-2 flex items-center justify-between border-t border-white/10">
                  {/* Progress dots */}
                  <div className="flex gap-1">
                    {currentDialogue.lines.map((_, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "w-2 h-2 rounded-full transition-colors",
                          idx === currentLineIndex
                            ? "bg-white"
                            : idx < currentLineIndex
                              ? "bg-white/50"
                              : "bg-white/20"
                        )}
                      />
                    ))}
                  </div>

                  {/* Next/Skip button */}
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
                  >
                    {isTyping ? (
                      'Passer'
                    ) : currentLineIndex < currentDialogue.lines.length - 1 ? (
                      <>Suivant <ChevronRight className="w-3 h-3" /></>
                    ) : (
                      'Fermer'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

// Hook to track current section based on scroll
export function useCurrentSection(sectionRefs: Record<string, React.RefObject<HTMLElement>>) {
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.entries(sectionRefs).forEach(([sectionId, ref]) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              setCurrentSection(sectionId);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionRefs]);

  return currentSection;
}

// Trigger dialogue for a specific section (can be called programmatically)
export function triggerDialogue(sectionId: string) {
  // This would be handled by the parent component through state
  // Just a placeholder for the interface
  console.log(`Triggering dialogue for section: ${sectionId}`);
}
