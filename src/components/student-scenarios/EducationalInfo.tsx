'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Lightbulb, ExternalLink, BookOpen, Shield, Leaf } from 'lucide-react';
import { type EducationalInfo } from '@/data/studentScenarios';
import { cn } from '@/lib/utils';

interface EducationalInfoProps {
  info: EducationalInfo;
  scenarioNumber: number;
}

export function EducationalInfo({ info, scenarioNumber }: EducationalInfoProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <div className="bg-white rounded-2xl border border-[#00997d]/20 shadow-lg shadow-[#00997d]/5 overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-[#00997d]/5 to-transparent hover:bg-[#00997d]/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00997d]/10 rounded-lg text-[#00997d]">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-900">Le Saviez-vous ?</h3>
              <p className="text-sm text-gray-500">Info éducative - Scénario #{scenarioNumber}</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 pt-0 space-y-6">
                <div className="h-px w-full bg-gray-100 mb-6" />

                {/* Main Fact */}
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <p className="flex gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>{info.fact}</span>
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Benefits */}
                  <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                    <h4 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      Avantages
                    </h4>
                    <ul className="space-y-2">
                      {info.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-emerald-500 mt-1">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools/Alternatives */}
                  <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Outils Libres
                    </h4>
                    <ul className="space-y-2">
                      {info.tools?.map((tool, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-purple-500 mt-1">→</span>
                          <div>
                            {tool.link ? (
                              <a
                                href={tool.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-purple-700 hover:underline"
                              >
                                {tool.name}
                              </a>
                            ) : (
                              <span className="font-medium text-gray-900">{tool.name}</span>
                            )}
                            <span className="text-gray-500 block text-xs">{tool.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
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
