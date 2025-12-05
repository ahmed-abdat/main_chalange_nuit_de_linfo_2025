'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { studentScenarios, getScenario, type ScenarioId, type ChoiceType } from '@/data/studentScenarios';
import { useStudentScenarioStore, useProgress } from '@/store/studentScenarioStore';
import { PointsDisplay } from './PointsDisplay';
import { ScenarioCard } from './ScenarioCard';
import { EducationalInfo } from './EducationalInfo';
import { ScenarioSummary } from './ScenarioSummary';
import { cn } from '@/lib/utils';
import CountUp from '@/components/CountUp';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, List, X, Check, Bot, ShieldCheck, Sprout, Users, AlertTriangle, Info } from 'lucide-react';

const TOTAL_SCENARIOS = studentScenarios.length;

export function StudentScenarios() {
  const currentScenarioId = useStudentScenarioStore((state) => state.currentScenarioId);
  const completedScenarios = useStudentScenarioStore((state) => state.completedScenarios);
  const setCurrentScenario = useStudentScenarioStore((state) => state.setCurrentScenario);
  const completeScenario = useStudentScenarioStore((state) => state.completeScenario);
  const totalPoints = useStudentScenarioStore((state) => state.totalPoints);
  const resetProgress = useStudentScenarioStore((state) => state.resetProgress);

  const { completed, total, percentage } = useProgress();
  const [showAllScenarios, setShowAllScenarios] = useState(false);

  // Memoize helper functions to prevent re-renders
  const isScenarioCompleted = useMemo(
    () => (scenarioId: ScenarioId) => Boolean(completedScenarios[String(scenarioId)]),
    [completedScenarios]
  );

  const getScenarioChoice = useMemo(
    () => (scenarioId: ScenarioId) => completedScenarios[String(scenarioId)] || null,
    [completedScenarios]
  );

  const nextScenarioId = useMemo(
    () => {
      for (let i = 1; i <= TOTAL_SCENARIOS; i++) {
        const scenarioId = i as ScenarioId;
        if (!completedScenarios[String(scenarioId)]) {
          return scenarioId;
        }
      }
      return null;
    },
    [completedScenarios]
  );

  const currentScenario = useMemo(
    () => currentScenarioId ? getScenario(currentScenarioId) : null,
    [currentScenarioId]
  );

  const handleChoiceSelect = (choice: ChoiceType) => {
    if (!currentScenario) return;

    let points = { money: 0, protection: 0, environment: 0 };

    if (choice === 'B' && currentScenario.choiceB.points) {
      points = currentScenario.choiceB.points;
    } else if (choice === 'A') {
      // PENALTY for Big Tech choice!
      points = {
        money: -50,
        protection: -30,
        environment: -20
      };
    }

    // Complete the scenario
    completeScenario(currentScenario.id, choice, points);

    // Show toast notification
    if (choice === 'B') {
      const pointsList: string[] = [];
      if (points.money > 0) pointsList.push(`💰 +${points.money}`);
      if (points.protection > 0) pointsList.push(`🛡️ +${points.protection}`);
      if (points.environment > 0) pointsList.push(`🌱 +${points.environment}`);

      toast.success('Excellent choix !', {
        description: `Vous avez gagné ${pointsList.join(' ')} points`,
        duration: 4000,
      });
    } else {
      toast.error('Choix Big Tech', {
        description: 'Aïe ! Vous perdez des points. La facilité a un coût caché...',
        duration: 4000,
      });
    }
  };

  const handleNextScenario = () => {
    if (nextScenarioId) {
      setCurrentScenario(nextScenarioId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScenarioSelect = (scenarioId: ScenarioId) => {
    setCurrentScenario(scenarioId);
    setShowAllScenarios(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isScenarioUnlocked = useMemo(
    () => (scenarioId: ScenarioId): boolean => {
      // First scenario is always unlocked
      if (scenarioId === 1) return true;

      // Check if previous scenario is completed
      const previousId = (scenarioId - 1) as ScenarioId;
      return Boolean(completedScenarios[String(previousId)]);
    },
    [completedScenarios]
  );

  return (
    <div className="pb-20">
      {/* Header with Points */}
      <PointsDisplay sticky className="mb-8" />

      {/* Progress Bar */}
      <div className="bg-white border-y border-gray-100 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Progression</h2>
            <span className="text-sm text-gray-600">
              <CountUp to={completed} /> / {total} scénarios
            </span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-[#00997d] to-[#007d66] rounded-full"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{percentage}% complété</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {currentScenario && (
              <p className="text-sm text-gray-600">
                Scénario {currentScenario.id} sur {total}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAllScenarios(!showAllScenarios)}
            className="flex items-center gap-2 hover:bg-gray-50"
          >
            {showAllScenarios ? (
              <>
                <X className="w-4 h-4" />
                Fermer la liste
              </>
            ) : (
              <>
                <List className="w-4 h-4" />
                Voir tous les scénarios
              </>
            )}
          </Button>
        </div>

        {/* All Scenarios Grid */}
        <AnimatePresence>
          {showAllScenarios && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-1">
                {studentScenarios.map((scenario) => {
                  const unlocked = isScenarioUnlocked(scenario.id);
                  const completed = isScenarioCompleted(scenario.id);
                  const choice = getScenarioChoice(scenario.id);

                  return (
                    <motion.button
                      key={scenario.id}
                      onClick={() => unlocked && handleScenarioSelect(scenario.id)}
                      disabled={!unlocked}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={unlocked ? { scale: 1.02, y: -2 } : {}}
                      className={cn(
                        'relative p-4 rounded-xl border text-left transition-all',
                        unlocked
                          ? 'bg-white border-gray-200 hover:border-[#00997d] hover:shadow-md cursor-pointer'
                          : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed',
                        completed && 'border-[#00997d]/30 bg-[#00997d]/5',
                        scenario.id === currentScenarioId && 'ring-2 ring-[#00997d] border-[#00997d]'
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={cn(
                          "text-xs font-bold px-2 py-0.5 rounded-full",
                          completed ? "bg-[#00997d]/10 text-[#00997d]" : "bg-gray-100 text-gray-500"
                        )}>
                          #{scenario.id}
                        </span>
                        {completed && (
                          <Check className="w-4 h-4 text-[#00997d]" />
                        )}
                        {!unlocked && (
                          <span className="text-xs">🔒</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed" dir="rtl">
                        {scenario.context}
                      </p>
                      {choice && (
                        <div className="mt-2 pt-2 border-t border-gray-100 flex justify-end">
                          <span
                            className={cn(
                              'text-[10px] px-2 py-0.5 rounded font-medium',
                              choice === 'B'
                                ? 'bg-[#00997d]/10 text-[#00997d]'
                                : 'bg-red-50 text-red-600'
                            )}
                          >
                            {choice === 'B' ? 'NIRD ✓' : 'Big Tech'}
                          </span>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Scenario */}
        {currentScenario && (
          <div className="space-y-8">
            <ScenarioCard
              key={currentScenario.id}
              scenario={currentScenario}
              onChoiceSelect={handleChoiceSelect}
            />

            {/* Educational Info OR Reality Check */}
            <AnimatePresence mode="wait">
              {isScenarioCompleted(currentScenario.id) && (
                <motion.div
                  key={currentScenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {getScenarioChoice(currentScenario.id) === 'B' ? (
                    <EducationalInfo
                      info={currentScenario.educationalInfo}
                      scenarioNumber={currentScenario.id}
                    />
                  ) : (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-100 rounded-xl shrink-0">
                          <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-red-900 mb-2">
                              Réalité du choix Big Tech
                            </h3>
                            <p className="text-red-800 leading-relaxed text-lg">
                              {currentScenario.choiceA.realityCheck}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-red-700 bg-red-100/50 p-3 rounded-lg">
                            <Info className="w-4 h-4" />
                            <span>Ce choix ne vous rapporte aucun point NIRD. Essayez de trouver une alternative plus éthique !</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={() => {
                  const prevId = currentScenario.id > 1
                    ? ((currentScenario.id - 1) as ScenarioId)
                    : null;
                  if (prevId) {
                    handleScenarioSelect(prevId);
                  }
                }}
                disabled={currentScenario.id === 1}
                className="flex items-center gap-2 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </Button>

              {nextScenarioId && isScenarioCompleted(currentScenario.id) && (
                <Button
                  onClick={handleNextScenario}
                  className="flex items-center gap-2 bg-[#00997d] hover:bg-[#007d66] text-white px-6 py-6 rounded-xl shadow-lg shadow-[#00997d]/20 hover:shadow-[#00997d]/30 transition-all hover:-translate-y-1"
                >
                  Scénario suivant
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {!nextScenarioId && completed === total && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00997d] to-[#007d66] text-white rounded-xl shadow-lg">
                    <span className="text-2xl">🎉</span>
                    <span className="font-semibold">Tous les scénarios complétés !</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
        {/* Summary Section */}
        <ScenarioSummary
          completedCount={completed}
          totalCount={total}
          totalPoints={totalPoints}
          onReset={() => {
            resetProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );
}

