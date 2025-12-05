'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Compass, GraduationCap, Users, Sparkles, ChevronLeft, ChevronRight,
  Check, X, Lightbulb, ArrowRight, Trophy, Star, Zap, Settings,
  Laptop, Terminal, Cloud, Shield, CreditCard, FileText,
  Scale, Recycle, Trash2, RefreshCw, Cpu, Eye, EyeOff, Wrench, Gamepad2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import BlurText from '@/components/BlurText';
import Particles from '@/components/Particles';
import { MagicCard } from '@/components/ui/magic-card';
import { BorderBeam } from '@/components/ui/border-beam';
import { cn } from '@/lib/utils';
import { studentScenarios, type StudentScenario } from '@/data/studentScenarios';
import { parentScenarios, type ParentScenario } from '@/data/parentScenarios';
import { adminScenarios, type AdminScenario } from '@/data/adminScenarios';
import { useAchievementStore } from '@/store/achievementStore';
import type { LucideIcon } from 'lucide-react';

// Icon mapping
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

// Character names
const CHARACTER_NAMES: Record<string, string> = {
  asterix: 'Astérix',
  panoramix: 'Panoramix',
  obelix: 'Obélix',
  idefix: 'Idéfix',
};

type TabType = 'student' | 'parent' | 'admin';

interface CompletedDefi {
  id: string;
  choiceId: string;
  isCorrect: boolean;
}

// Fire confetti celebration
function fireConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55, colors: ['#00997d', '#F9A825'] });
  fire(0.2, { spread: 60, colors: ['#00997d', '#00b894'] });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#F9A825', '#FFD54F'] });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#00997d'] });
  fire(0.1, { spread: 120, startVelocity: 45, colors: ['#F9A825'] });
}

// Student Defi Card Component
function StudentDefiCard({
  scenario,
  index,
  isActive,
  isCompleted,
  completedData,
  onComplete,
  isLocked,
}: {
  scenario: StudentScenario;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  completedData?: CompletedDefi;
  onComplete: (id: string, choiceId: string, isCorrect: boolean) => void;
  isLocked: boolean;
}) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(completedData?.choiceId || null);
  const [showFeedback, setShowFeedback] = useState(isCompleted);
  const [showEducation, setShowEducation] = useState(false);

  const characterColor = CHARACTER_COLORS[scenario.character] || '#00997d';

  const handleChoiceClick = (choiceId: 'A' | 'B') => {
    if (selectedChoice || isCompleted) return;

    const isCorrect = choiceId === 'B';
    setSelectedChoice(choiceId);
    setShowFeedback(true);

    if (isCorrect) {
      fireConfetti();
    }

    setTimeout(() => {
      onComplete(scenario.id, choiceId, isCorrect);
      setShowEducation(true);
    }, 1200);
  };

  const choiceA = scenario.choiceA;
  const choiceB = scenario.choiceB;
  const selectedChoiceData = selectedChoice === 'A' ? choiceA : selectedChoice === 'B' ? choiceB : null;
  const IconA = ICONS[choiceA.icon] || Laptop;
  const IconB = ICONS[choiceB.icon] || Terminal;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'relative w-full max-w-2xl mx-auto',
        isLocked && 'pointer-events-none'
      )}
    >
      <MagicCard
        gradientSize={300}
        gradientColor="#00997d30"
        gradientOpacity={0.5}
        gradientFrom="#00997d"
        gradientTo="#F9A825"
        className="rounded-2xl"
      >
        <div className="relative p-6 sm:p-8 rounded-2xl bg-[#242428]/90 backdrop-blur-sm border border-white/10">
          {/* Completed border beam */}
          {isCompleted && (
            <BorderBeam
              size={120}
              duration={4}
              colorFrom={completedData?.isCorrect ? '#00997d' : '#C62828'}
              colorTo="#F9A825"
              borderWidth={2}
            />
          )}

          {/* Locked overlay */}
          {isLocked && (
            <div className="absolute inset-0 bg-[#1a1a1d]/80 backdrop-blur-sm rounded-2xl z-20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400">Complete le defi precedent</p>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: characterColor }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {CHARACTER_NAMES[scenario.character]?.charAt(0) || 'N'}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider text-[#F9A825] font-semibold">
                  Defi {index + 1}
                </span>
                {isCompleted && (
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    completedData?.isCorrect
                      ? 'bg-[#00997d]/20 text-[#00997d]'
                      : 'bg-[#C62828]/20 text-[#ff6b6b]'
                  )}>
                    {completedData?.isCorrect ? 'Reussi' : 'A revoir'}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
            </div>
          </div>

          {/* Context */}
          <p className="text-gray-400 mb-6 leading-relaxed">{scenario.context}</p>

          {/* Choices or Feedback */}
          <AnimatePresence mode="wait">
            {!showFeedback ? (
              <motion.div
                key="choices"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {/* Choice A */}
                <motion.button
                  onClick={() => handleChoiceClick('A')}
                  disabled={!!selectedChoice}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'p-4 rounded-xl border text-left transition-all duration-300',
                    'bg-white/5 border-white/10 hover:border-[#C62828]/50 hover:bg-[#C62828]/5'
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#C62828]/20 flex items-center justify-center">
                      <IconA className="w-5 h-5 text-[#C62828]" />
                    </div>
                    <span className="text-xs font-bold text-[#C62828]">A</span>
                  </div>
                  <p className="font-semibold text-white mb-1">{choiceA.title}</p>
                  <p className="text-xs text-gray-500">{choiceA.description}</p>
                </motion.button>

                {/* Choice B */}
                <motion.button
                  onClick={() => handleChoiceClick('B')}
                  disabled={!!selectedChoice}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'p-4 rounded-xl border text-left transition-all duration-300',
                    'bg-white/5 border-white/10 hover:border-[#00997d]/50 hover:bg-[#00997d]/5'
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#00997d]/20 flex items-center justify-center">
                      <IconB className="w-5 h-5 text-[#00997d]" />
                    </div>
                    <span className="text-xs font-bold text-[#00997d]">B</span>
                  </div>
                  <p className="font-semibold text-white mb-1">{choiceB.title}</p>
                  <p className="text-xs text-gray-500">{choiceB.description}</p>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Feedback box */}
                <div className={cn(
                  'p-4 rounded-xl border',
                  selectedChoiceData?.color === '#00997d'
                    ? 'bg-[#00997d]/10 border-[#00997d]/30'
                    : 'bg-[#C62828]/10 border-[#C62828]/30'
                )}>
                  <div className="flex items-start gap-3">
                    {selectedChoiceData?.color === '#00997d' ? (
                      <Check className="w-5 h-5 text-[#00997d] shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-[#C62828] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold text-white mb-1">
                        {selectedChoiceData?.color === '#00997d' ? 'Excellent choix !' : 'Pas tout a fait...'}
                      </p>
                      <p className="text-sm text-gray-300">{selectedChoiceData?.feedback}</p>
                    </div>
                  </div>
                </div>

                {/* Educational info toggle */}
                {showEducation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-xl bg-[#F9A825]/10 border border-[#F9A825]/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-[#F9A825]" />
                        <span className="font-semibold text-white">{scenario.educationalInfo.title}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{scenario.educationalInfo.explanation}</p>
                      <ul className="space-y-1">
                        {scenario.educationalInfo.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                            <Check className="w-3 h-3 text-[#00997d]" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 pt-3 border-t border-[#F9A825]/20">
                        <p className="text-xs text-[#F9A825] italic">
                          {scenario.educationalInfo.fact}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MagicCard>
    </motion.div>
  );
}

// Parent Defi Card Component
function ParentDefiCard({
  scenario,
  index,
  isActive,
  isCompleted,
  completedData,
  onComplete,
  isLocked,
}: {
  scenario: ParentScenario;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  completedData?: CompletedDefi;
  onComplete: (id: string, choiceId: string, isCorrect: boolean) => void;
  isLocked: boolean;
}) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(completedData?.choiceId || null);
  const [showFeedback, setShowFeedback] = useState(isCompleted);

  const characterColor = CHARACTER_COLORS[scenario.character] || '#00997d';

  const handleChoiceClick = (decision: typeof scenario.decisions[0]) => {
    if (selectedChoice || isCompleted) return;

    const isCorrect = decision.type === 'alternative';
    setSelectedChoice(decision.id);
    setShowFeedback(true);

    if (isCorrect) {
      fireConfetti();
    }

    setTimeout(() => {
      onComplete(scenario.id, decision.id, isCorrect);
    }, 1200);
  };

  const selectedDecision = scenario.decisions.find(d => d.id === selectedChoice);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'relative w-full max-w-2xl mx-auto',
        isLocked && 'pointer-events-none'
      )}
    >
      <MagicCard
        gradientSize={300}
        gradientColor="#00997d30"
        gradientOpacity={0.5}
        gradientFrom="#00997d"
        gradientTo="#F9A825"
        className="rounded-2xl"
      >
        <div className="relative p-6 sm:p-8 rounded-2xl bg-[#242428]/90 backdrop-blur-sm border border-white/10">
          {/* Completed border beam */}
          {isCompleted && (
            <BorderBeam
              size={120}
              duration={4}
              colorFrom={completedData?.isCorrect ? '#00997d' : '#C62828'}
              colorTo="#F9A825"
              borderWidth={2}
            />
          )}

          {/* Locked overlay */}
          {isLocked && (
            <div className="absolute inset-0 bg-[#1a1a1d]/80 backdrop-blur-sm rounded-2xl z-20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400">Complete le defi precedent</p>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: characterColor }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {CHARACTER_NAMES[scenario.character]?.charAt(0) || 'N'}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider text-[#00997d] font-semibold">
                  Defi {index + 1}
                </span>
                {isCompleted && (
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    completedData?.isCorrect
                      ? 'bg-[#00997d]/20 text-[#00997d]'
                      : 'bg-[#C62828]/20 text-[#ff6b6b]'
                  )}>
                    {completedData?.isCorrect ? 'Reussi' : 'A revoir'}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
            </div>
          </div>

          {/* Context */}
          <p className="text-gray-400 mb-6 leading-relaxed">{scenario.context}</p>

          {/* Choices or Feedback */}
          <AnimatePresence mode="wait">
            {!showFeedback ? (
              <motion.div
                key="choices"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {scenario.decisions.map((decision) => {
                  const Icon = ICONS[decision.icon] || Laptop;
                  return (
                    <motion.button
                      key={decision.id}
                      onClick={() => handleChoiceClick(decision)}
                      disabled={!!selectedChoice}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      className={cn(
                        'w-full p-4 rounded-xl border text-left transition-all duration-300',
                        'bg-white/5 border-white/10',
                        decision.type === 'alternative' && 'hover:border-[#00997d]/50 hover:bg-[#00997d]/5',
                        decision.type === 'bigTech' && 'hover:border-[#C62828]/50 hover:bg-[#C62828]/5',
                        decision.type === 'hybrid' && 'hover:border-[#F9A825]/50 hover:bg-[#F9A825]/5'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${decision.color}20` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: decision.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-semibold text-white">{decision.label}</p>
                            <span className="text-xs text-gray-500">{decision.cost}</span>
                          </div>
                          <p className="text-xs text-gray-500 truncate">{decision.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={cn(
                  'p-4 rounded-xl border',
                  selectedDecision?.type === 'alternative'
                    ? 'bg-[#00997d]/10 border-[#00997d]/30'
                    : 'bg-[#C62828]/10 border-[#C62828]/30'
                )}>
                  <div className="flex items-start gap-3">
                    {selectedDecision?.type === 'alternative' ? (
                      <Check className="w-5 h-5 text-[#00997d] shrink-0 mt-0.5" />
                    ) : (
                      <Lightbulb className="w-5 h-5 text-[#F9A825] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold text-white mb-1">
                        {selectedDecision?.type === 'alternative' ? 'Excellent choix !' : 'A considerer...'}
                      </p>
                      <p className="text-sm text-gray-300">{selectedDecision?.feedback}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MagicCard>
    </motion.div>
  );
}

// Admin Defi Card Component (similar to StudentDefiCard but uses AdminScenario type)
function AdminDefiCard({
  scenario,
  index,
  isActive,
  isCompleted,
  completedData,
  onComplete,
  isLocked,
}: {
  scenario: AdminScenario;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  completedData?: CompletedDefi;
  onComplete: (id: string, choiceId: string, isCorrect: boolean) => void;
  isLocked: boolean;
}) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(completedData?.choiceId || null);
  const [showFeedback, setShowFeedback] = useState(isCompleted);
  const [showEducation, setShowEducation] = useState(false);

  const characterColor = CHARACTER_COLORS[scenario.character] || '#00997d';

  const handleChoiceClick = (choiceId: 'A' | 'B') => {
    if (selectedChoice || isCompleted) return;

    const isCorrect = choiceId === 'B';
    setSelectedChoice(choiceId);
    setShowFeedback(true);

    if (isCorrect) {
      fireConfetti();
    }

    setTimeout(() => {
      onComplete(scenario.id, choiceId, isCorrect);
      setShowEducation(true);
    }, 1200);
  };

  const choiceA = scenario.choiceA;
  const choiceB = scenario.choiceB;
  const selectedChoiceData = selectedChoice === 'A' ? choiceA : selectedChoice === 'B' ? choiceB : null;
  const IconA = ICONS[choiceA.icon] || Laptop;
  const IconB = ICONS[choiceB.icon] || Terminal;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'relative w-full max-w-2xl mx-auto',
        isLocked && 'pointer-events-none'
      )}
    >
      <MagicCard
        gradientSize={300}
        gradientColor="#895af630"
        gradientOpacity={0.5}
        gradientFrom="#895af6"
        gradientTo="#F9A825"
        className="rounded-2xl"
      >
        <div className="relative p-6 sm:p-8 rounded-2xl bg-[#242428]/90 backdrop-blur-sm border border-white/10">
          {isCompleted && (
            <BorderBeam
              size={120}
              duration={4}
              colorFrom={completedData?.isCorrect ? '#00997d' : '#C62828'}
              colorTo="#F9A825"
              borderWidth={2}
            />
          )}

          {isLocked && (
            <div className="absolute inset-0 bg-[#1a1a1d]/80 backdrop-blur-sm rounded-2xl z-20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400">Complete le defi precedent</p>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: characterColor }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {CHARACTER_NAMES[scenario.character]?.charAt(0) || 'N'}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider text-[#895af6] font-semibold">
                  Defi {index + 1}
                </span>
                {isCompleted && (
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    completedData?.isCorrect
                      ? 'bg-[#00997d]/20 text-[#00997d]'
                      : 'bg-[#C62828]/20 text-[#ff6b6b]'
                  )}>
                    {completedData?.isCorrect ? 'Reussi' : 'A revoir'}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
            </div>
          </div>

          <p className="text-gray-400 mb-6 leading-relaxed">{scenario.context}</p>

          <AnimatePresence mode="wait">
            {!showFeedback ? (
              <motion.div
                key="choices"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                <motion.button
                  onClick={() => handleChoiceClick('A')}
                  disabled={!!selectedChoice}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-xl border text-left transition-all duration-300 bg-white/5 border-white/10 hover:border-[#C62828]/50 hover:bg-[#C62828]/5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#C62828]/20 flex items-center justify-center">
                      <IconA className="w-5 h-5 text-[#C62828]" />
                    </div>
                    <span className="text-xs font-bold text-[#C62828]">A</span>
                  </div>
                  <p className="font-semibold text-white mb-1">{choiceA.title}</p>
                  <p className="text-xs text-gray-500">{choiceA.description}</p>
                </motion.button>

                <motion.button
                  onClick={() => handleChoiceClick('B')}
                  disabled={!!selectedChoice}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-xl border text-left transition-all duration-300 bg-white/5 border-white/10 hover:border-[#00997d]/50 hover:bg-[#00997d]/5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#00997d]/20 flex items-center justify-center">
                      <IconB className="w-5 h-5 text-[#00997d]" />
                    </div>
                    <span className="text-xs font-bold text-[#00997d]">B</span>
                  </div>
                  <p className="font-semibold text-white mb-1">{choiceB.title}</p>
                  <p className="text-xs text-gray-500">{choiceB.description}</p>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className={cn(
                  'p-4 rounded-xl border',
                  selectedChoiceData?.color === '#00997d'
                    ? 'bg-[#00997d]/10 border-[#00997d]/30'
                    : 'bg-[#C62828]/10 border-[#C62828]/30'
                )}>
                  <div className="flex items-start gap-3">
                    {selectedChoiceData?.color === '#00997d' ? (
                      <Check className="w-5 h-5 text-[#00997d] shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-[#C62828] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold text-white mb-1">
                        {selectedChoiceData?.color === '#00997d' ? 'Excellent choix !' : 'Pas tout a fait...'}
                      </p>
                      <p className="text-sm text-gray-300">{selectedChoiceData?.feedback}</p>
                    </div>
                  </div>
                </div>

                {showEducation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-xl bg-[#895af6]/10 border border-[#895af6]/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-[#895af6]" />
                        <span className="font-semibold text-white">{scenario.educationalInfo.title}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{scenario.educationalInfo.explanation}</p>
                      <ul className="space-y-1">
                        {scenario.educationalInfo.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                            <Check className="w-3 h-3 text-[#00997d]" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 pt-3 border-t border-[#895af6]/20">
                        <p className="text-xs text-[#895af6] italic">{scenario.educationalInfo.fact}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MagicCard>
    </motion.div>
  );
}

// Persona data for selector
const PERSONAS = [
  {
    id: 'student' as TabType,
    title: 'Etudiant(e)',
    description: 'Tu es eleve ou etudiant et tu veux apprendre les bons reflexes numeriques',
    icon: GraduationCap,
    color: '#F9A825',
    scenarios: studentScenarios.length,
  },
  {
    id: 'parent' as TabType,
    title: 'Parent',
    description: 'Vous voulez comprendre les choix numeriques pour votre famille',
    icon: Users,
    color: '#00997d',
    scenarios: parentScenarios.length,
  },
  {
    id: 'admin' as TabType,
    title: 'Administrateur',
    description: 'Vous gerez le numerique dans un etablissement scolaire',
    icon: Settings,
    color: '#895af6',
    scenarios: adminScenarios.length,
  },
];

// Main DefisSection Component
export default function DefisSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [showPersonaSelector, setShowPersonaSelector] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('student');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedDefis, setCompletedDefis] = useState<CompletedDefi[]>([]);

  const { unlockBadge } = useAchievementStore();

  // Check for saved persona on mount
  useEffect(() => {
    const savedPersona = localStorage.getItem('nird-persona') as TabType | null;
    if (savedPersona && ['student', 'parent', 'admin'].includes(savedPersona)) {
      setActiveTab(savedPersona);
      setShowPersonaSelector(false);
    }
  }, []);

  const handlePersonaSelect = (persona: TabType) => {
    setActiveTab(persona);
    setShowPersonaSelector(false);
    localStorage.setItem('nird-persona', persona);
  };

  const scenarios = activeTab === 'student'
    ? studentScenarios
    : activeTab === 'parent'
      ? parentScenarios
      : adminScenarios;
  const totalScenarios = scenarios.length;

  // Calculate progress
  const studentCompleted = completedDefis.filter(d => d.id.startsWith('student')).length;
  const parentCompleted = completedDefis.filter(d => d.id.startsWith('parent')).length;
  const adminCompleted = completedDefis.filter(d => d.id.startsWith('admin')).length;
  const studentCorrect = completedDefis.filter(d => d.id.startsWith('student') && d.isCorrect).length;
  const parentCorrect = completedDefis.filter(d => d.id.startsWith('parent') && d.isCorrect).length;
  const adminCorrect = completedDefis.filter(d => d.id.startsWith('admin') && d.isCorrect).length;

  // Check if current scenario is completed
  const currentScenario = scenarios[currentIndex];
  const isCurrentCompleted = completedDefis.some(d => d.id === currentScenario?.id);

  const handleComplete = (id: string, choiceId: string, isCorrect: boolean) => {
    setCompletedDefis(prev => {
      if (prev.some(d => d.id === id)) return prev;
      return [...prev, { id, choiceId, isCorrect }];
    });

    // Check for badge unlocks
    const newStudentCompleted = id.startsWith('student') ? studentCompleted + 1 : studentCompleted;
    const newParentCompleted = id.startsWith('parent') ? parentCompleted + 1 : parentCompleted;
    const newAdminCompleted = id.startsWith('admin') ? adminCompleted + 1 : adminCompleted;

    if (newStudentCompleted >= 1 || newParentCompleted >= 1 || newAdminCompleted >= 1) {
      unlockBadge('scenario_explorer');
    }
    if (newStudentCompleted >= 5) {
      unlockBadge('student_champion');
    }
    if (newParentCompleted >= 3) {
      unlockBadge('family_advisor');
    }

    // Auto-advance after delay
    setTimeout(() => {
      if (currentIndex < totalScenarios - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }, 3000);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < totalScenarios - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Reset index when switching tabs
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  return (
    <section
      data-section="scenario-teasers"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#1a1a1d] overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Particles
          particleCount={25}
          particleSpread={25}
          speed={0.015}
          particleColors={['#00997d', '#F9A825', '#8B5CF6']}
          alphaParticles={true}
          particleBaseSize={25}
          disableRotation={true}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-[#F9A825]/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-[#00997d]/15 rounded-full blur-[120px] translate-y-1/2" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8B5CF6]/20 text-[#A78BFA] text-sm font-medium rounded-full mb-4"
          >
            <Compass className="w-4 h-4" />
            Mettez vos connaissances en pratique
          </motion.span>

          {/* Title */}
          <BlurText
            text="Defis du Quotidien"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
            delay={80}
            animateBy="words"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Testez vos reflexes de resistant(e) face a des situations reelles
          </motion.p>
        </div>

        {/* Persona Selector */}
        <AnimatePresence mode="wait">
          {showPersonaSelector ? (
            <motion.div
              key="persona-selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-gray-400 mb-6"
              >
                Qui etes-vous ?
              </motion.p>
              <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {PERSONAS.map((persona, idx) => {
                  const Icon = persona.icon;
                  return (
                    <motion.button
                      key={persona.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx, duration: 0.4 }}
                      onClick={() => handlePersonaSelect(persona.id)}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-5 rounded-2xl bg-[#242428]/80 backdrop-blur-sm border border-white/10 hover:border-white/20 text-left transition-all group"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${persona.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: persona.color }} />
                      </div>
                      <h3 className="font-bold text-white text-lg mb-1 group-hover:text-[#F9A825] transition-colors">
                        {persona.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">{persona.description}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-semibold px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${persona.color}20`, color: persona.color }}
                        >
                          {persona.scenarios} defis
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#F9A825] group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setShowPersonaSelector(false)}
                className="mt-6 mx-auto block text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Ou explorez tous les defis
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="tab-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Active Persona Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex justify-center items-center gap-4 mb-8"
              >
                {(() => {
                  const currentPersona = PERSONAS.find(p => p.id === activeTab);
                  const Icon = currentPersona?.icon || GraduationCap;
                  return (
                    <div
                      className="flex items-center gap-3 px-4 py-2 rounded-xl border"
                      style={{
                        backgroundColor: `${currentPersona?.color}15`,
                        borderColor: `${currentPersona?.color}30`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: currentPersona?.color }} />
                      <span className="font-semibold text-white">{currentPersona?.title}</span>
                      <span className="text-xs text-gray-500">
                        {totalScenarios} defis
                      </span>
                    </div>
                  );
                })()}
                <button
                  onClick={() => {
                    setShowPersonaSelector(true);
                    localStorage.removeItem('nird-persona');
                  }}
                  className="text-xs text-gray-500 hover:text-[#F9A825] transition-colors underline"
                >
                  Changer
                </button>
              </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-2xl mx-auto mb-6"
        >
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Progression</span>
            <span>
              {activeTab === 'student' ? studentCompleted : activeTab === 'parent' ? parentCompleted : adminCompleted} / {totalScenarios}
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((activeTab === 'student' ? studentCompleted : activeTab === 'parent' ? parentCompleted : adminCompleted) / totalScenarios) * 100}%`
              }}
              transition={{ duration: 0.5 }}
              className={cn(
                'h-full rounded-full',
                activeTab === 'student' ? 'bg-[#F9A825]' : activeTab === 'parent' ? 'bg-[#00997d]' : 'bg-[#895af6]'
              )}
            />
          </div>
        </motion.div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mb-6">
          {scenarios.map((_, idx) => {
            const isCompleted = completedDefis.some(d => d.id === scenarios[idx].id);
            const completedData = completedDefis.find(d => d.id === scenarios[idx].id);
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  idx === currentIndex
                    ? activeTab === 'student' ? 'bg-[#F9A825] scale-125' : 'bg-[#00997d] scale-125'
                    : isCompleted
                      ? completedData?.isCorrect ? 'bg-[#00997d]/50' : 'bg-[#C62828]/50'
                      : 'bg-white/20 hover:bg-white/40'
                )}
              />
            );
          })}
        </div>

        {/* Scenario Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          {/* Navigation arrows */}
          <div className="absolute inset-y-0 left-0 flex items-center -translate-x-4 sm:-translate-x-12 z-10">
            <motion.button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                currentIndex === 0
                  ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center translate-x-4 sm:translate-x-12 z-10">
            <motion.button
              onClick={goToNext}
              disabled={currentIndex === totalScenarios - 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                currentIndex === totalScenarios - 1
                  ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Card display */}
          <AnimatePresence mode="wait">
            {activeTab === 'student' ? (
              <StudentDefiCard
                key={`student-${currentIndex}`}
                scenario={studentScenarios[currentIndex]}
                index={currentIndex}
                isActive={true}
                isCompleted={completedDefis.some(d => d.id === studentScenarios[currentIndex].id)}
                completedData={completedDefis.find(d => d.id === studentScenarios[currentIndex].id)}
                onComplete={handleComplete}
                isLocked={false}
              />
            ) : activeTab === 'parent' ? (
              <ParentDefiCard
                key={`parent-${currentIndex}`}
                scenario={parentScenarios[currentIndex]}
                index={currentIndex}
                isActive={true}
                isCompleted={completedDefis.some(d => d.id === parentScenarios[currentIndex].id)}
                completedData={completedDefis.find(d => d.id === parentScenarios[currentIndex].id)}
                onComplete={handleComplete}
                isLocked={false}
              />
            ) : (
              <AdminDefiCard
                key={`admin-${currentIndex}`}
                scenario={adminScenarios[currentIndex]}
                index={currentIndex}
                isActive={true}
                isCompleted={completedDefis.some(d => d.id === adminScenarios[currentIndex].id)}
                completedData={completedDefis.find(d => d.id === adminScenarios[currentIndex].id)}
                onComplete={handleComplete}
                isLocked={false}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats & Completion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {/* Student progress */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F9A825]/10 rounded-lg border border-[#F9A825]/20">
            <GraduationCap className="w-4 h-4 text-[#F9A825]" />
            <span className="text-xs text-gray-400">
              {studentCorrect}/{studentScenarios.length}
            </span>
            {studentCompleted >= studentScenarios.length && (
              <Trophy className="w-3 h-3 text-[#F9A825]" />
            )}
          </div>

          {/* Parent progress */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00997d]/10 rounded-lg border border-[#00997d]/20">
            <Users className="w-4 h-4 text-[#00997d]" />
            <span className="text-xs text-gray-400">
              {parentCorrect}/{parentScenarios.length}
            </span>
            {parentCompleted >= parentScenarios.length && (
              <Trophy className="w-3 h-3 text-[#00997d]" />
            )}
          </div>

          {/* Admin progress */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#895af6]/10 rounded-lg border border-[#895af6]/20">
            <Settings className="w-4 h-4 text-[#895af6]" />
            <span className="text-xs text-gray-400">
              {adminCorrect}/{adminScenarios.length}
            </span>
            {adminCompleted >= adminScenarios.length && (
              <Trophy className="w-3 h-3 text-[#895af6]" />
            )}
          </div>
        </motion.div>

        {/* Completion celebration */}
        {(studentCompleted >= studentScenarios.length || parentCompleted >= parentScenarios.length || adminCompleted >= adminScenarios.length) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00997d]/20 via-[#895af6]/20 to-[#F9A825]/20 rounded-xl border border-white/10">
              <Sparkles className="w-5 h-5 text-[#F9A825]" />
              <span className="text-white font-semibold text-sm sm:text-base">
                {studentCompleted >= studentScenarios.length && parentCompleted >= parentScenarios.length && adminCompleted >= adminScenarios.length
                  ? 'Tous les defis completes ! Tu es un(e) vrai(e) resistant(e) !'
                  : activeTab === 'student' && studentCompleted >= studentScenarios.length
                    ? 'Etudiants termines ! Essaie Parents ou Admin !'
                    : activeTab === 'parent' && parentCompleted >= parentScenarios.length
                      ? 'Parents termines ! Essaie Etudiants ou Admin !'
                      : 'Admin termines ! Essaie Etudiants ou Parents !'}
              </span>
              <Star className="w-5 h-5 text-[#F9A825]" />
            </div>
          </motion.div>
        )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
