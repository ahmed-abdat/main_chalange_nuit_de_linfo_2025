'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Zap, Shield, CheckCircle } from 'lucide-react';
import type { Situation, Decision } from './types';

type SituationCardProps = {
  situation: Situation;
  index: number;
  selectedDecision: Decision | null;
  onDecisionSelect: (decision: Decision) => void;
  draggedCardId: string | null;
  onDragStart: (decisionId: string) => void;
  onDragEnd: () => void;
  isDragOver: boolean;
  onDragOver: () => void;
  onDragLeave: () => void;
  onDrop: (decisionId: string) => void;
};

export default function SituationCard({
  situation,
  index,
  selectedDecision,
  onDecisionSelect,
  draggedCardId,
  onDragStart,
  onDragEnd,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
}: SituationCardProps) {
  const situationRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent, decisionId: string) => {
    onDragStart(decisionId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', decisionId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDragLeave();
    const decisionId = e.dataTransfer.getData('text/plain');
    onDrop(decisionId);
  };

  return (
    <motion.div
      ref={situationRef}
      id={`situation-${situation.id}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8 relative"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={cn(
            'absolute w-96 h-96 rounded-full blur-3xl',
            index % 2 === 0 ? 'bg-emerald-300 top-0 right-0' : 'bg-blue-300 bottom-0 left-0'
          )}
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className={cn(
            'absolute w-64 h-64 rounded-full blur-2xl',
            index % 2 === 0 ? 'bg-amber-300 bottom-20 left-20' : 'bg-purple-300 top-20 right-20'
          )}
        />
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Situation Number Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {index + 1}
          </div>
          <div className="h-1 flex-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-transparent rounded-full" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          {situation.title}
        </motion.h2>

        {/* Context */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-700 mb-10 leading-relaxed max-w-3xl"
        >
          {situation.context}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Decision Cards */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"
            >
              <Zap className="w-5 h-5 text-emerald-500" />
              Vos options :
            </motion.h3>
            <div className="space-y-4">
              <AnimatePresence>
                {situation.decisions.map((decision, i) => {
                  const isDragging = draggedCardId === decision.id;
                  const isSelected = selectedDecision?.id === decision.id;
                  
                  return (
                    <motion.div
                      key={decision.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'relative p-5 rounded-2xl border-2 cursor-move transition-all duration-300',
                        'shadow-lg hover:shadow-xl',
                        isDragging && 'opacity-50 scale-95',
                        isSelected && 'ring-4 ring-offset-2',
                        decision.type === 'bigTech' && cn(
                          'bg-gradient-to-br from-red-50 to-red-100/50 border-red-300',
                          isSelected && 'ring-red-400'
                        ),
                        decision.type === 'alternative' && cn(
                          'bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-300',
                          isSelected && 'ring-emerald-400'
                        ),
                        decision.type === 'hybrid' && cn(
                          'bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-300',
                          isSelected && 'ring-amber-400'
                        )
                      )}
                      draggable
                      onDragStart={(e: any) => {
                        if (e.dataTransfer) {
                          handleDragStart(e as React.DragEvent, decision.id);
                        }
                      }}
                      onDragEnd={() => onDragEnd()}
                    >
                      {/* Badge */}
                      <div className="absolute -top-2 -right-2">
                        <div
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg',
                            decision.type === 'bigTech' && 'bg-red-500',
                            decision.type === 'alternative' && 'bg-emerald-500',
                            decision.type === 'hybrid' && 'bg-amber-500'
                          )}
                        >
                          {decision.cost}
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="text-4xl flex-shrink-0">{decision.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2 text-lg">
                            {decision.label}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {decision.description}
                          </p>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex-shrink-0"
                          >
                            <CheckCircle className={cn(
                              'w-6 h-6',
                              decision.type === 'bigTech' && 'text-red-500',
                              decision.type === 'alternative' && 'text-emerald-500',
                              decision.type === 'hybrid' && 'text-amber-500'
                            )} />
                          </motion.div>
                        )}
                      </div>

                      {/* Type indicator */}
                      <div className="absolute bottom-2 right-2">
                        <div
                          className={cn(
                            'w-2 h-2 rounded-full',
                            decision.type === 'bigTech' && 'bg-red-500',
                            decision.type === 'alternative' && 'bg-emerald-500',
                            decision.type === 'hybrid' && 'bg-amber-500'
                          )}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Drop Zone */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"
            >
              <Shield className="w-5 h-5 text-blue-500" />
              Votre choix :
            </motion.h3>
            <motion.div
              onDragOver={(e) => {
                e.preventDefault();
                onDragOver();
              }}
              onDragLeave={onDragLeave}
              onDrop={handleDrop}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                borderColor: isDragOver ? '#10b981' : selectedDecision ? '#10b981' : '#d1d5db',
                backgroundColor: isDragOver ? '#ecfdf5' : selectedDecision ? '#ecfdf5' : '#f9fafb',
              }}
              transition={{ duration: 0.2 }}
              className={cn(
                'min-h-[300px] p-8 rounded-2xl border-2 border-dashed transition-all duration-300',
                'flex flex-col items-center justify-center',
                'shadow-lg'
              )}
            >
              <AnimatePresence mode="wait">
                {selectedDecision ? (
                  <motion.div
                    key="selected"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="text-center w-full"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="text-6xl mb-4"
                    >
                      {selectedDecision.icon}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={cn(
                        'inline-block px-6 py-3 rounded-xl text-white font-bold mb-4 text-lg shadow-lg',
                        selectedDecision.type === 'bigTech' && 'bg-gradient-to-r from-red-500 to-red-600',
                        selectedDecision.type === 'alternative' && 'bg-gradient-to-r from-emerald-500 to-emerald-600',
                        selectedDecision.type === 'hybrid' && 'bg-gradient-to-r from-amber-500 to-amber-600'
                      )}
                    >
                      {selectedDecision.label}
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-700 leading-relaxed text-base"
                    >
                      {selectedDecision.feedback}
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="text-6xl mb-4"
                    >
                      📥
                    </motion.div>
                    <p className="font-semibold text-gray-600 mb-2 text-lg">
                      Glissez votre choix ici
                    </p>
                    <p className="text-sm text-gray-400">
                      ou déplacez une carte dans cette zone
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

