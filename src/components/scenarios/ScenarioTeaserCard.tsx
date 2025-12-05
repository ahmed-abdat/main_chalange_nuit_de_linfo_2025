'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Laptop, Terminal, Cloud, Shield, CreditCard, FileText,
  GraduationCap, Users, ArrowRight, Check, Sparkles,
  Eye, EyeOff, Wrench, Gamepad2, Zap, Trash2, Scale, RefreshCw, Cpu, Recycle
} from 'lucide-react';
import Link from 'next/link';
import { CometCard } from '@/components/ui/CometCard';
import { MagicCard } from '@/components/ui/magic-card';
import { BorderBeam } from '@/components/ui/border-beam';
import { cn } from '@/lib/utils';

// Icon mapping - use LucideIcon type for proper typing
import type { LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  'laptop': Laptop,
  'terminal': Terminal,
  'cloud': Cloud,
  'shield': Shield,
  'credit-card': CreditCard,
  'file-text': FileText,
  'scale': Scale,
  'recycle': Recycle,
  'trash-2': Trash2,
  'refresh-cw': RefreshCw,
  'cpu': Cpu,
  'eye': Eye,
  'eye-off': EyeOff,
  'wrench': Wrench,
  'gamepad': Gamepad2,
  'zap': Zap,
};

// Character colors
const CHARACTER_COLORS: Record<string, string> = {
  asterix: '#F9A825',
  panoramix: '#00997d',
  obelix: '#2196F3',
  idefix: '#4CAF50',
};

// Character emojis
const CHARACTER_EMOJIS: Record<string, string> = {
  asterix: 'A',
  panoramix: 'P',
  obelix: 'O',
  idefix: 'I',
};

interface Choice {
  id: 'A' | 'B' | string;
  title: string;
  description: string;
  icon: string;
  color: string;
  feedback: string;
  points?: { money: number; protection: number; environment: number };
}

interface ScenarioTeaserCardProps {
  type: 'student' | 'parent';
  title: string;
  context: string;
  character: string;
  choices: Choice[];
  scenarioCount: number;
  onComplete: (choiceId: string, isCorrect: boolean) => void;
  isCompleted?: boolean;
}

export default function ScenarioTeaserCard({
  type,
  title,
  context,
  character,
  choices,
  scenarioCount,
  onComplete,
  isCompleted = false,
}: ScenarioTeaserCardProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const characterColor = CHARACTER_COLORS[character] || '#00997d';
  const characterEmoji = CHARACTER_EMOJIS[character] || 'N';

  const handleChoiceClick = (choice: Choice) => {
    if (selectedChoice || isCompleted) return;

    setSelectedChoice(choice.id);
    setShowFeedback(true);

    // Determine if correct (B choice for student, 'b' ending for parent)
    const isCorrect = choice.id === 'B' || choice.id.endsWith('b');

    // Notify parent after animation
    setTimeout(() => {
      onComplete(choice.id, isCorrect);
    }, 1500);
  };

  const selectedChoiceData = choices.find(c => c.id === selectedChoice);

  return (
    <CometCard rotateDepth={4} translateDepth={6} className="h-full">
      <div className="relative h-full overflow-hidden rounded-2xl bg-[#242428]/90 backdrop-blur-sm border border-white/10">
        {/* Completed state border */}
        {(isCompleted || showFeedback) && (
          <BorderBeam
            size={100}
            duration={4}
            colorFrom={selectedChoiceData?.color === '#00997d' ? '#00997d' : '#C62828'}
            colorTo="#F9A825"
            borderWidth={2}
          />
        )}

        <div className="p-5 sm:p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: characterColor }}
              whileHover={{ scale: 1.1 }}
            >
              {characterEmoji}
            </motion.div>
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-500">
                Scenario {type === 'student' ? 'Etudiant' : 'Parent'}
              </span>
              <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>
          </div>

          {/* Context */}
          <p className="text-gray-400 text-sm mb-5 flex-grow">{context}</p>

          {/* Choices or Feedback */}
          <AnimatePresence mode="wait">
            {!showFeedback ? (
              <motion.div
                key="choices"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {choices.slice(0, 2).map((choice, idx) => {
                  const IconComponent = ICONS[choice.icon] || Laptop;
                  const isCorrectChoice = choice.id === 'B' || choice.id.endsWith('b');

                  return (
                    <motion.button
                      key={choice.id}
                      onClick={() => handleChoiceClick(choice)}
                      disabled={!!selectedChoice || isCompleted}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'w-full p-3 rounded-xl border text-left transition-all duration-300',
                        'flex items-center gap-3',
                        selectedChoice === choice.id
                          ? 'border-2'
                          : 'border-white/10 hover:border-white/20',
                        selectedChoice && selectedChoice !== choice.id && 'opacity-50'
                      )}
                      style={{
                        borderColor: selectedChoice === choice.id ? choice.color : undefined,
                        backgroundColor: selectedChoice === choice.id ? `${choice.color}15` : 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${choice.color}20` }}
                      >
                        <IconComponent className="w-5 h-5" style={{ color: choice.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">{choice.title}</p>
                        <p className="text-xs text-gray-500 truncate">{choice.description}</p>
                      </div>
                      {isCorrectChoice && (
                        <div className="w-2 h-2 rounded-full bg-[#00997d] shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'p-4 rounded-xl border',
                  selectedChoiceData?.color === '#00997d'
                    ? 'bg-[#00997d]/10 border-[#00997d]/30'
                    : 'bg-[#C62828]/10 border-[#C62828]/30'
                )}
              >
                <div className="flex items-start gap-3">
                  {selectedChoiceData?.color === '#00997d' ? (
                    <Check className="w-5 h-5 text-[#00997d] shrink-0 mt-0.5" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-[#F9A825] shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm text-gray-300">{selectedChoiceData?.feedback}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <Link
              href={`/scenarios/${type}`}
              className="flex items-center justify-between text-sm group"
            >
              <span className="text-gray-500">
                {isCompleted ? 'Continue ton parcours' : `Voir ${scenarioCount} scenarios`}
              </span>
              <span className="flex items-center gap-1 text-[#00997d] group-hover:gap-2 transition-all">
                Explorer
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </CometCard>
  );
}
