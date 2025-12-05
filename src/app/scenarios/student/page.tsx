'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  GraduationCap, Terminal, Cloud, Shield, FileText, Laptop,
  ArrowRight, ArrowLeft, Check, X, Sparkles, Trophy, Star,
  Eye, EyeOff, Wrench, Gamepad2, Zap, Trash2, CreditCard
} from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import BlurText from '@/components/BlurText';
import { MagicCard } from '@/components/ui/magic-card';
import { BorderBeam } from '@/components/ui/border-beam';
import { NumberTicker } from '@/components/ui/number-ticker';
import { SparklesText } from '@/components/ui/sparkles-text';
import { cn } from '@/lib/utils';
import { studentScenarios, type StudentScenario } from '@/data/studentScenarios';
import { useScenarioStore } from '@/store/scenarioStore';
import { useAchievementStore } from '@/store/achievementStore';
import type { LucideIcon } from 'lucide-react';

// Icon mapping
const ICONS: Record<string, LucideIcon> = {
  'laptop': Laptop,
  'terminal': Terminal,
  'cloud': Cloud,
  'shield': Shield,
  'file-text': FileText,
  'eye': Eye,
  'eye-off': EyeOff,
  'wrench': Wrench,
  'gamepad': Gamepad2,
  'zap': Zap,
  'trash-2': Trash2,
  'credit-card': CreditCard,
};

// Trigger confetti
function fireConfetti() {
  const count = 200;
  const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55, colors: ['#00997d', '#F9A825'] });
  fire(0.2, { spread: 60, colors: ['#00997d'] });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#F9A825'] });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#00997d', '#F9A825'] });
}

// Single Scenario Card Component
function ScenarioCard({
  scenario,
  index,
  onComplete,
  isCompleted,
}: {
  scenario: StudentScenario;
  index: number;
  onComplete: (choiceId: string, isCorrect: boolean, points: number) => void;
  isCompleted: boolean;
}) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const handleChoiceClick = (choice: typeof scenario.choiceA | typeof scenario.choiceB) => {
    if (selectedChoice || isCompleted) return;

    setSelectedChoice(choice.id);
    setShowFeedback(true);

    const isCorrect = choice.id === 'B';
    const points = choice.points
      ? choice.points.money + choice.points.protection + choice.points.environment
      : 0;

    if (isCorrect) {
      fireConfetti();
    }

    // Show education after delay
    setTimeout(() => {
      setShowEducation(true);
    }, 1500);

    // Complete after showing education
    setTimeout(() => {
      onComplete(choice.id, isCorrect, points);
    }, 3000);
  };

  const selectedChoiceData = selectedChoice === 'A' ? scenario.choiceA : scenario.choiceB;
  const isCorrect = selectedChoice === 'B';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
      className="relative"
    >
      <MagicCard
        gradientColor={isCorrect ? '#00997d' : selectedChoice ? '#C62828' : '#8B5CF6'}
        gradientOpacity={0.15}
        className="p-6 sm:p-8"
      >
        {/* Completed badge */}
        {isCompleted && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-[#00997d]/20 rounded-full">
            <Check className="w-3 h-3 text-[#00997d]" />
            <span className="text-xs text-[#00997d]">Complete</span>
          </div>
        )}

        {/* Scenario number */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center">
            <span className="text-sm font-bold text-[#8B5CF6]">{index + 1}</span>
          </div>
          <h3 className="text-xl font-bold text-white">{scenario.title}</h3>
        </div>

        {/* Context */}
        <p className="text-gray-400 mb-6 leading-relaxed">{scenario.context}</p>

        {/* Choices */}
        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key="choices"
              exit={{ opacity: 0, y: -20 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {[scenario.choiceA, scenario.choiceB].map((choice) => {
                const IconComponent = ICONS[choice.icon] || Laptop;
                const isNIRD = choice.id === 'B';

                return (
                  <motion.button
                    key={choice.id}
                    onClick={() => handleChoiceClick(choice)}
                    disabled={!!selectedChoice || isCompleted}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'relative p-5 rounded-xl border-2 text-left transition-all',
                      'bg-[#242428]/50 backdrop-blur-sm',
                      isNIRD
                        ? 'border-[#00997d]/30 hover:border-[#00997d]'
                        : 'border-[#C62828]/30 hover:border-[#C62828]'
                    )}
                  >
                    {/* NIRD indicator */}
                    {isNIRD && (
                      <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#00997d] text-white text-[10px] font-bold rounded-full">
                        NIRD
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${choice.color}20` }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: choice.color }} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{choice.title}</h4>
                        <p className="text-sm text-gray-500">{choice.description}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Feedback card */}
              <div
                className={cn(
                  'p-5 rounded-xl border-2',
                  isCorrect
                    ? 'bg-[#00997d]/10 border-[#00997d]/30'
                    : 'bg-[#C62828]/10 border-[#C62828]/30'
                )}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Sparkles className="w-6 h-6 text-[#00997d] shrink-0" />
                  ) : (
                    <X className="w-6 h-6 text-[#C62828] shrink-0" />
                  )}
                  <div>
                    <h4 className={cn('font-bold mb-1', isCorrect ? 'text-[#00997d]' : 'text-[#C62828]')}>
                      {isCorrect ? 'Excellent choix !' : 'Pas ideal...'}
                    </h4>
                    <p className="text-gray-400 text-sm">{selectedChoiceData?.feedback}</p>
                  </div>
                </div>

                {/* Points earned */}
                {isCorrect && selectedChoiceData?.points && (
                  <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#00997d]">+{selectedChoiceData.points.money}</p>
                      <p className="text-xs text-gray-500">Economie</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#3B82F6]">+{selectedChoiceData.points.protection}</p>
                      <p className="text-xs text-gray-500">Protection</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#22C55E]">+{selectedChoiceData.points.environment}</p>
                      <p className="text-xs text-gray-500">Environnement</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Educational info */}
              <AnimatePresence>
                {showEducation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="relative p-5 rounded-xl bg-[#F9A825]/5 border border-[#F9A825]/20"
                  >
                    <BorderBeam size={60} duration={4} colorFrom="#F9A825" colorTo="#00997d" />
                    <h4 className="font-bold text-[#F9A825] mb-2">{scenario.educationalInfo.title}</h4>
                    <p className="text-sm text-gray-400 mb-3">{scenario.educationalInfo.explanation}</p>
                    <ul className="space-y-1">
                      {scenario.educationalInfo.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-3 h-3 text-[#00997d]" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs text-[#F9A825] italic">
                      💡 {scenario.educationalInfo.fact}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </MagicCard>
    </motion.div>
  );
}

// Results Component
function ResultsSection({
  completedCount,
  totalPoints,
  perfectScore,
}: {
  completedCount: number;
  totalPoints: number;
  perfectScore: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      className="text-center py-12"
    >
      <MagicCard gradientColor="#F9A825" className="p-8 sm:p-12 max-w-lg mx-auto">
        <BorderBeam size={100} duration={5} colorFrom="#00997d" colorTo="#F9A825" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00997d] to-[#F9A825] flex items-center justify-center"
        >
          <Trophy className="w-10 h-10 text-white" />
        </motion.div>

        <SparklesText
          className="text-2xl sm:text-3xl font-black mb-4"
          colors={{ first: '#00997d', second: '#F9A825' }}
        >
          {perfectScore ? 'Champion Etudiant !' : 'Parcours Complete !'}
        </SparklesText>

        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <p className="text-4xl font-black text-[#00997d]">
              <NumberTicker value={completedCount} />/{studentScenarios.length}
            </p>
            <p className="text-sm text-gray-500">Scenarios</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-[#F9A825]">
              <NumberTicker value={totalPoints} />
            </p>
            <p className="text-sm text-gray-500">Points</p>
          </div>
        </div>

        {perfectScore && (
          <div className="flex items-center justify-center gap-2 mb-6 text-[#F9A825]">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-bold">Badge Debloque: Champion Etudiant</span>
            <Star className="w-5 h-5 fill-current" />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/scenarios/parent"
            className="px-6 py-3 bg-[#00997d] text-white font-semibold rounded-xl hover:bg-[#007d66] transition-colors flex items-center justify-center gap-2"
          >
            Parcours Parent
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
          >
            Retour au Village
          </Link>
        </div>
      </MagicCard>
    </motion.div>
  );
}

// Main Page
export default function StudentScenariosPage() {
  const { studentProgress, completeStudentScenario, getStudentCompletionCount } = useScenarioStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localCompleted, setLocalCompleted] = useState<string[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const completedCount = localCompleted.length;
  const allCompleted = completedCount === studentScenarios.length;
  const perfectScore = localCompleted.every((id) => {
    const progress = studentProgress.find((p) => p.scenarioId === id);
    return progress?.isCorrect;
  });

  const handleComplete = (scenarioId: string, choiceId: string, isCorrect: boolean, points: number) => {
    if (!localCompleted.includes(scenarioId)) {
      setLocalCompleted([...localCompleted, scenarioId]);
      setTotalPoints((prev) => prev + points);
      completeStudentScenario(scenarioId, choiceId, isCorrect, points);

      // Auto advance after delay
      if (currentIndex < studentScenarios.length - 1) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 3500);
      }
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#F9A825]/20 text-[#F9A825] rounded-full mb-4"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm font-medium">Parcours Etudiant</span>
          </motion.div>

          <BlurText
            text="Scenarios du Quotidien"
            className="text-3xl sm:text-4xl font-black text-white mb-3"
            delay={50}
            animateBy="words"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400"
          >
            {completedCount}/{studentScenarios.length} scenarios completes
          </motion.p>

          {/* Progress bar */}
          <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden max-w-xs mx-auto">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / studentScenarios.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-[#00997d] to-[#F9A825]"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Scenarios */}
        {!allCompleted ? (
          <div className="space-y-6">
            {studentScenarios.map((scenario, index) => (
              <div
                key={scenario.id}
                className={cn(
                  index !== currentIndex && !localCompleted.includes(scenario.id) && 'opacity-50 pointer-events-none'
                )}
              >
                <ScenarioCard
                  scenario={scenario}
                  index={index}
                  onComplete={(choiceId, isCorrect, points) =>
                    handleComplete(scenario.id, choiceId, isCorrect, points)
                  }
                  isCompleted={localCompleted.includes(scenario.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <ResultsSection
            completedCount={completedCount}
            totalPoints={totalPoints}
            perfectScore={perfectScore}
          />
        )}
      </div>
    </div>
  );
}
