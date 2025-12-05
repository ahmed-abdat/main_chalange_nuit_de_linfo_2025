'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ChevronRight, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRandomQuestions, type QuizQuestion } from '@/data/quizQuestions';
import { useAchievementStore } from '@/store/achievementStore';
import { useGameSounds } from '@/hooks/useGameSounds';
import { SparklesText } from '@/components/ui/sparkles-text';
import { BorderBeam } from '@/components/ui/border-beam';

interface ResistanceQuizProps {
  questionCount?: number;
  onComplete?: (score: number, total: number) => void;
}

export default function ResistanceQuiz({ questionCount = 5, onComplete }: ResistanceQuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const unlockBadge = useAchievementStore((state) => state.unlockBadge);
  const { play: playSound } = useGameSounds();

  // Initialize quiz
  useEffect(() => {
    setQuestions(getRandomQuestions(questionCount));
  }, [questionCount]);

  const currentQuestion = questions[currentIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === currentQuestion.correctIndex;
    if (isCorrect) {
      playSound('success');
      setScore((s) => s + 1);
    } else {
      playSound('error');
    }
    setAnswers((prev) => [...prev, isCorrect]);
  };

  const handleNext = useCallback(() => {
    playSound('click');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      playSound('victory');
      setIsComplete(true);
      const finalScore = score + (selectedAnswer === currentQuestion?.correctIndex ? 0 : 0);

      // Check for perfect score
      if (finalScore === questionCount) {
        unlockBadge('quiz_master');
      }

      onComplete?.(finalScore, questionCount);
    }
  }, [currentIndex, questions.length, score, selectedAnswer, currentQuestion, questionCount, unlockBadge, onComplete, playSound]);

  const resetQuiz = () => {
    playSound('click');
    setQuestions(getRandomQuestions(questionCount));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsComplete(false);
    setAnswers([]);
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-[#00997d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Results screen
  if (isComplete) {
    const percentage = Math.round((score / questionCount) * 100);
    const isPerfect = score === questionCount;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-[#1a1a1d] rounded-2xl border border-white/10 p-8 text-center overflow-hidden"
      >
        {isPerfect && (
          <BorderBeam
            size={200}
            duration={5}
            colorFrom="#F9A825"
            colorTo="#00997d"
            borderWidth={2}
          />
        )}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={cn(
            'w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center',
            isPerfect
              ? 'bg-gradient-to-br from-[#F9A825] to-[#ff8c00]'
              : percentage >= 60
                ? 'bg-[#00997d]'
                : 'bg-gray-600'
          )}
        >
          <Trophy className="w-10 h-10 text-white" />
        </motion.div>

        {isPerfect ? (
          <SparklesText
            colors={{ first: '#F9A825', second: '#00997d' }}
            sparklesCount={8}
            className="text-3xl font-black mb-4"
          >
            <span className="text-white">Score Parfait !</span>
          </SparklesText>
        ) : (
          <h3 className="text-3xl font-black text-white mb-4">
            {percentage >= 80 ? 'Excellent !' : percentage >= 60 ? 'Bien joue !' : 'Continue !'}
          </h3>
        )}

        <p className="text-5xl font-black text-[#00997d] mb-2">
          {score}/{questionCount}
        </p>
        <p className="text-gray-400 mb-6">bonnes reponses</p>

        {/* Answer summary */}
        <div className="flex justify-center gap-2 mb-8">
          {answers.map((correct, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                correct ? 'bg-[#00997d]' : 'bg-red-500'
              )}
            >
              {correct ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <X className="w-4 h-4 text-white" />
              )}
            </motion.div>
          ))}
        </div>

        {isPerfect && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 p-4 bg-[#F9A825]/20 rounded-xl border border-[#F9A825]/30"
          >
            <div className="flex items-center justify-center gap-2 text-[#F9A825]">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold">Badge &ldquo;Maitre du Quiz&rdquo; debloque !</span>
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetQuiz}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00997d] text-white font-bold rounded-xl hover:bg-[#00b894] transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Rejouer
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#1a1a1d] rounded-2xl border border-white/10 overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          className="h-full bg-gradient-to-r from-[#00997d] to-[#F9A825]"
        />
      </div>

      <div className="p-6">
        {/* Question counter */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-400">
            Question {currentIndex + 1} sur {questions.length}
          </span>
          <span className="text-sm text-[#00997d] font-bold">
            Score: {score}/{currentIndex + (showResult ? 1 : 0)}
          </span>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === currentQuestion.correctIndex;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleAnswerSelect(i)}
                    disabled={showResult}
                    className={cn(
                      'w-full p-4 rounded-xl text-left transition-all duration-300 border',
                      !showResult && 'hover:bg-white/10 hover:border-[#00997d]/50',
                      !showResult && 'bg-white/5 border-white/10',
                      showCorrect && 'bg-[#00997d]/20 border-[#00997d]',
                      showWrong && 'bg-red-500/20 border-red-500',
                      showResult && !showCorrect && !showWrong && 'opacity-50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm',
                          showCorrect && 'bg-[#00997d] text-white',
                          showWrong && 'bg-red-500 text-white',
                          !showResult && 'bg-white/10 text-gray-400'
                        )}
                      >
                        {showCorrect ? (
                          <Check className="w-4 h-4" />
                        ) : showWrong ? (
                          <X className="w-4 h-4" />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </span>
                      <span className={cn(
                        'font-medium',
                        showCorrect ? 'text-[#00997d]' : showWrong ? 'text-red-400' : 'text-white'
                      )}>
                        {option}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-sm text-gray-300">
                      <span className="text-[#F9A825] font-bold">Explication : </span>
                      {currentQuestion.explanation}
                    </p>
                  </div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="mt-4 w-full py-3 bg-[#00997d] text-white font-bold rounded-xl hover:bg-[#00b894] transition-colors flex items-center justify-center gap-2"
                  >
                    {currentIndex < questions.length - 1 ? (
                      <>
                        Suivant
                        <ChevronRight className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        Voir les resultats
                        <Trophy className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
