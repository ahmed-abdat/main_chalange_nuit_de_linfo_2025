'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Shield, DollarSign, Recycle } from 'lucide-react';
import type { UserChoice, Situation } from './types';

type SummaryProps = {
  userChoices: UserChoice[];
  situations: Situation[];
  onRestart: () => void;
};

export default function Summary({ userChoices, situations, onRestart }: SummaryProps) {
  // Scroll to top when summary is displayed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Calculate scores for environment, economic, and protection
  const totalScores = userChoices.reduce(
    (acc, choice) => ({
      environment: acc.environment + choice.decision.scores.environment,
      economic: acc.economic + choice.decision.scores.economic,
      protection: acc.protection + choice.decision.scores.protection,
    }),
    { environment: 0, economic: 0, protection: 0 }
  );

  const averageScores = {
    environment: Math.round(totalScores.environment / userChoices.length),
    economic: Math.round(totalScores.economic / userChoices.length),
    protection: Math.round(totalScores.protection / userChoices.length),
  };

  const overallScore = Math.round(
    (averageScores.environment + averageScores.economic + averageScores.protection) / 3
  );

  let message = '';
  let icon = '🎯';
  let color = 'blue';

  if (overallScore >= 80) {
    message = 'Excellent ! Vous privilégiez des solutions durables, économiques et protectrices. Vous êtes un véritable résistant du Village NIRD !';
    icon = '🐧';
    color = 'emerald';
  } else if (overallScore >= 60) {
    message = 'Bon équilibre ! Vous faites des choix réfléchis, mais il y a encore des opportunités d\'amélioration vers des solutions plus durables et économiques.';
    icon = '⚖️';
    color = 'blue';
  } else {
    message = 'Vous privilégiez la familiarité, mais cela a un coût. Envisagez des alternatives NIRD pour améliorer votre score environnemental, économique et de protection.';
    icon = '💡';
    color = 'amber';
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8 bg-gradient-to-br from-slate-50 via-white to-slate-50"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="text-6xl mb-6 text-center"
          >
            {icon}
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Résumé de vos choix
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={cn(
              'mb-8 p-6 rounded-xl border-2',
              color === 'emerald' && 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200',
              color === 'red' && 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200',
              color === 'blue' && 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200',
              color === 'amber' && 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200'
            )}
          >
            <p className="text-lg text-gray-700 leading-relaxed text-center">{message}</p>
          </motion.div>

          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className="mb-8 text-center"
          >
            <div className={cn(
              'inline-block px-8 py-4 rounded-2xl border-2 shadow-lg',
              color === 'emerald' && 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300',
              color === 'blue' && 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300',
              color === 'amber' && 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300'
            )}>
              <div className="text-sm text-gray-600 mb-1 font-medium">Score Global</div>
              <div className={cn(
                'text-5xl font-bold mb-2',
                color === 'emerald' && 'text-emerald-600',
                color === 'blue' && 'text-blue-600',
                color === 'amber' && 'text-amber-600'
              )}>
                {overallScore}/100
              </div>
            </div>
          </motion.div>

          {/* Three Score Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            {/* Environment Score */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 text-center shadow-lg"
            >
              <Recycle className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-green-600 mb-2">{averageScores.environment}</div>
              <div className="text-sm text-gray-700 font-semibold mb-2">Environnement</div>
              <div className="w-full h-2 bg-green-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${averageScores.environment}%` }}
                  transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Impact écologique</p>
            </motion.div>

            {/* Economic Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 text-center shadow-lg"
            >
              <DollarSign className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-blue-600 mb-2">{averageScores.economic}</div>
              <div className="text-sm text-gray-700 font-semibold mb-2">Économique</div>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${averageScores.economic}%` }}
                  transition={{ delay: 0.9, duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Coût et valeur</p>
            </motion.div>

            {/* Protection Score */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 text-center shadow-lg"
            >
              <Shield className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <div className="text-4xl font-bold text-purple-600 mb-2">{averageScores.protection}</div>
              <div className="text-sm text-gray-700 font-semibold mb-2">Protection</div>
              <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${averageScores.protection}%` }}
                  transition={{ delay: 1.0, duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Sécurité des données</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Vos décisions :</h3>
            {userChoices.map((choice, index) => {
              const situation = situations.find((s) => s.id === choice.situationId);
              return (
                <motion.div
                  key={choice.situationId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-5 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1 text-lg">{situation?.title}</h4>
                      <p className="text-sm text-gray-600 mb-2 font-medium">{choice.decision.label}</p>
                      <p className="text-xs text-gray-500 italic leading-relaxed">{choice.decision.feedback}</p>
                    </div>
                    <div
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-bold text-white',
                        choice.decision.type === 'bigTech' && 'bg-red-500',
                        choice.decision.type === 'alternative' && 'bg-emerald-500',
                        choice.decision.type === 'hybrid' && 'bg-amber-500'
                      )}
                    >
                      {choice.decision.type === 'bigTech' && 'Big Tech'}
                      {choice.decision.type === 'alternative' && 'NIRD'}
                      {choice.decision.type === 'hybrid' && 'Hybride'}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Recommencer
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

