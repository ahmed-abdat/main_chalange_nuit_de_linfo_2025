'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useGameStore, type QuestId } from '@/store/gameStore';
import Floating, { FloatingElement } from '@/components/ui/parallax-floating';
import BlurText from '@/components/BlurText';
import { cn } from '@/lib/utils';

interface StorySectionProps {
  id: string;
  questId?: QuestId;
  title: string;
  subtitle?: string;
  children: ReactNode;
  background?: 'dark' | 'empire' | 'village' | 'mystical';
  parallaxImages?: {
    src: string;
    depth: number;
    position: { top?: string; left?: string; right?: string; bottom?: string };
    size?: string;
  }[];
  onEnter?: () => void;
}

export function StorySection({
  id,
  questId,
  title,
  subtitle,
  children,
  background = 'dark',
  parallaxImages = [],
  onEnter,
}: StorySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { completeQuest, quests } = useGameStore();

  const isInView = useInView(ref, { amount: 0.5, once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  // Complete quest when section comes into view
  if (isInView && questId && quests[questId]?.unlocked && !quests[questId]?.completed) {
    completeQuest(questId);
    onEnter?.();
  }

  const bgClasses = {
    dark: 'bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2e] to-[#0a0a1a]',
    empire: 'bg-gradient-to-b from-[#1a0a0a] via-[#2e1a1a] to-[#1a0a0a]',
    village: 'bg-gradient-to-b from-[#0a1a0a] via-[#1a2e1a] to-[#0a1a0a]',
    mystical: 'bg-gradient-to-b from-[#1a0a2e] via-[#2e1a4e] to-[#1a0a2e]',
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity, scale }}
      className={cn(
        'relative min-h-screen py-32 px-6 overflow-hidden',
        bgClasses[background]
      )}
    >
      {/* Parallax floating elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Floating sensitivity={0.5} easingFactor={0.08}>
          {parallaxImages.map((img, i) => (
            <FloatingElement
              key={i}
              depth={img.depth}
              className={cn('opacity-40')}
            >
              <motion.div
                style={{
                  y: i % 2 === 0 ? y1 : y2,
                  ...img.position,
                  width: img.size || '200px',
                  height: img.size || '200px',
                }}
                className="absolute"
              >
                <div
                  className="w-full h-full rounded-full blur-sm"
                  style={{
                    background: `url(${img.src}) center/cover`,
                  }}
                />
              </motion.div>
            </FloatingElement>
          ))}

          {/* Floating decorative elements */}
          <FloatingElement depth={3} className="top-40 right-20">
            <span className="text-3xl opacity-20">⚔️</span>
          </FloatingElement>
          <FloatingElement depth={1.5} className="bottom-40 left-1/4">
            <span className="text-5xl opacity-25">🛡️</span>
          </FloatingElement>
        </Floating>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Quest indicator */}
        {questId && quests[questId] && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-8"
          >
            <span
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold',
                quests[questId].completed
                  ? 'bg-[#00997d]/20 text-[#00997d] border border-[#00997d]'
                  : 'bg-[#F9A825]/20 text-[#F9A825] border border-[#F9A825]'
              )}
            >
              {quests[questId].completed ? '✅' : '🎯'} {quests[questId].title}
              <span className="text-xs opacity-70">+{quests[questId].xpReward} XP</span>
            </span>
          </motion.div>
        )}

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <BlurText
            text={title}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            delay={100}
            animateBy="words"
          />

          {subtitle && (
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>

        {/* Section content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </div>

      {/* Scroll indicator for next section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[#F9A825] text-center"
        >
          <span className="block text-2xl">▼</span>
          <span className="text-xs opacity-70">Scroll</span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// =============================================================================
// DECISION POINT COMPONENT
// =============================================================================
interface DecisionChoice {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  consequence: string;
  onSelect: () => void;
}

interface DecisionPointProps {
  question: string;
  choices: DecisionChoice[];
  selectedId?: string;
}

export function DecisionPoint({ question, choices, selectedId }: DecisionPointProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Question */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12 p-6 bg-[#F9A825]/10 rounded-2xl border-2 border-[#F9A825]/30"
      >
        <span className="text-4xl block mb-4">❓</span>
        <h3 className="text-2xl md:text-3xl font-bold text-white">{question}</h3>
      </motion.div>

      {/* Choices */}
      <div className="grid md:grid-cols-3 gap-6">
        {choices.map((choice, i) => (
          <motion.button
            key={choice.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={choice.onSelect}
            disabled={!!selectedId}
            className={cn(
              'relative p-6 rounded-2xl text-left transition-all duration-300',
              'bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a]',
              'border-4',
              selectedId === choice.id
                ? 'border-[#F9A825] shadow-[0_0_40px_rgba(249,168,37,0.5)]'
                : selectedId
                ? 'border-gray-700 opacity-50'
                : 'border-gray-700 hover:border-gray-500'
            )}
            style={{
              boxShadow: selectedId === choice.id ? `0 0 40px ${choice.color}40` : undefined,
            }}
          >
            {/* Selected indicator */}
            {selectedId === choice.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-3 -right-3 w-8 h-8 bg-[#F9A825] rounded-full
                           flex items-center justify-center text-black font-bold"
              >
                ✓
              </motion.div>
            )}

            <span className="text-4xl block mb-4">{choice.emoji}</span>
            <h4 className="text-xl font-bold text-white mb-2" style={{ color: choice.color }}>
              {choice.title}
            </h4>
            <p className="text-gray-400 text-sm mb-4">{choice.description}</p>

            {selectedId === choice.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-gray-700"
              >
                <p className="text-[#F9A825] text-sm font-bold">
                  → {choice.consequence}
                </p>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
