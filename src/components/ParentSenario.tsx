'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { situations } from './parent-senario/situations';
import SituationCard from './parent-senario/SituationCard';
import Summary from './parent-senario/Summary';
import type { Decision, UserChoice } from './parent-senario/types';

// Main Component
export default function ParentSenario() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedDecisions, setSelectedDecisions] = useState<Record<string, Decision>>({});
    const [userChoices, setUserChoices] = useState<UserChoice[]>([]);
    const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const isComplete = userChoices.length === situations.length;

    const scrollToSituation = (index: number) => {
        const element = document.getElementById(`situation-${situations[index].id}`);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    const handleDecisionSelect = (situationId: string, decision: Decision) => {
        setSelectedDecisions((prev) => ({
            ...prev,
            [situationId]: decision,
        }));

        const existingChoiceIndex = userChoices.findIndex((c) => c.situationId === situationId);
        const newChoice: UserChoice = {
            situationId,
            decisionId: decision.id,
            decision,
        };

        if (existingChoiceIndex >= 0) {
            setUserChoices((prev) => {
                const updated = [...prev];
                updated[existingChoiceIndex] = newChoice;
                return updated;
            });
        } else {
            setUserChoices((prev) => [...prev, newChoice]);
        }

        // Smooth scroll to next situation after a short delay
        if (currentStep < situations.length - 1) {
            setTimeout(() => {
                const nextStep = currentStep + 1;
                setCurrentStep(nextStep);
                setTimeout(() => {
                    scrollToSituation(nextStep);
                }, 100);
            }, 800);
        }
    };

    const handleDrop = (situationId: string, decisionId: string) => {
        const situation = situations.find((s) => s.id === situationId);
        const decision = situation?.decisions.find((d) => d.id === decisionId);

        if (decision) {
            handleDecisionSelect(situationId, decision);
        }
        setDraggedCardId(null);
    };

    const handleRestart = () => {
        setCurrentStep(0);
        setSelectedDecisions({});
        setUserChoices([]);
        setIsDragOver(false);
        setDraggedCardId(null);
        setTimeout(() => {
            scrollToSituation(0);
        }, 100);
    };

    if (isComplete) {
        return <Summary userChoices={userChoices} situations={situations} onRestart={handleRestart} />;
    }

    return (
        <div className="relative">
            {/* Progress indicator - fixed at top */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
            >
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">
                            Situation {currentStep + 1} sur {situations.length}
                        </span>
                        <span className="text-sm text-gray-500">
                            {Math.round(((currentStep + 1) / situations.length) * 100)}%
                        </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / situations.length) * 100}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Situations */}
            <div className="pt-20">
                {situations.map((situation, index) => (
                    <SituationCard
                        key={situation.id}
                        situation={situation}
                        index={index}
                        selectedDecision={selectedDecisions[situation.id] || null}
                        onDecisionSelect={(decision) => handleDecisionSelect(situation.id, decision)}
                        draggedCardId={draggedCardId}
                        onDragStart={setDraggedCardId}
                        onDragEnd={() => setDraggedCardId(null)}
                        isDragOver={isDragOver && currentStep === index}
                        onDragOver={() => setIsDragOver(true)}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={(decisionId) => handleDrop(situation.id, decisionId)}
                    />
                ))}
            </div>
        </div>
    );
}
