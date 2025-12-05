'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, ChevronDown, ChevronUp, Users, Shield, Leaf } from 'lucide-react';
import { type EducationalInfo } from '@/data/studentScenarios';
import { cn } from '@/lib/utils';
import { getPillarById } from '@/data/pillars';

interface EducationalInfoProps {
  info: EducationalInfo;
  scenarioNumber: number;
}

const pillarIcons = {
  inclusive: Users,
  responsible: Shield,
  sustainable: Leaf,
};

const pillarColors = {
  inclusive: '#1976D2',
  responsible: '#7B1FA2',
  sustainable: '#2E7D32',
};

export function EducationalInfo({ info, scenarioNumber }: EducationalInfoProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pillar = info.nirdPillar ? getPillarById(info.nirdPillar) : null;
  const PillarIcon = info.nirdPillar ? pillarIcons[info.nirdPillar] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-6"
    >
      <div className="bg-gradient-to-br from-[#00997d]/5 to-[#00997d]/10 rounded-xl border-2 border-[#00997d]/20 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎓</span>
              <h3 className="text-xl font-bold text-gray-900">{info.title}</h3>
            </div>
            {pillar && PillarIcon && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${pillarColors[info.nirdPillar!]}15`,
                  color: pillarColors[info.nirdPillar!],
                }}
              >
                <PillarIcon className="w-4 h-4" />
                <span>{pillar.title}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Explanation */}
        <p className="text-gray-700 mb-4 leading-relaxed">{info.explanation}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {/* Benefits */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Avantages
                </h4>
                <ul className="space-y-2">
                  {info.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-[#00997d] mt-0.5">✓</span>
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tools/Resources */}
              {info.tools && info.tools.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                    Outils & Ressources
                  </h4>
                  <div className="grid gap-3">
                    {info.tools.map((tool, index) => (
                      <motion.a
                        key={index}
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-[#00997d] hover:shadow-sm transition-all group"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 group-hover:text-[#00997d] transition-colors">
                            {tool.name}
                          </p>
                          <p className="text-sm text-gray-600">{tool.description}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#00997d] transition-colors ml-3" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {/* Fact */}
              <div className="p-4 bg-[#00997d]/10 rounded-lg border border-[#00997d]/20">
                <div className="flex items-start gap-2">
                  <span className="text-xl">💡</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Le saviez-vous ?</p>
                    <p className="text-sm text-gray-700">{info.fact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

