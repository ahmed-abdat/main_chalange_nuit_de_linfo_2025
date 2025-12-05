'use client';

import { useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'motion/react';
import { Compass, GraduationCap, Users, Trophy, Shield, Swords } from 'lucide-react';
import BlurText from '@/components/BlurText';
import Particles from '@/components/Particles';
import ScenarioTeaserCard from './ScenarioTeaserCard';
import { getStudentTeaserScenario, studentScenarios } from '@/data/studentScenarios';
import { getParentTeaserScenario, parentScenarios } from '@/data/parentScenarios';
import { useScenarioStore } from '@/store/scenarioStore';

// Dynamic import for 3D scene (client-side only, no SSR)
const VillageScene = dynamic(() => import('@/components/3d/VillageScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] rounded-2xl bg-gradient-to-br from-[#1a472a] via-[#0f2818] to-[#1a1a1d] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00997d]/20 flex items-center justify-center animate-pulse">
          <Shield className="w-8 h-8 text-[#00997d]" />
        </div>
        <p className="text-gray-400 text-sm">Chargement du Village 3D...</p>
      </div>
    </div>
  ),
});

export default function ScenarioTeaserSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Get stores
  const {
    studentTeaserCompleted,
    parentTeaserCompleted,
    completeStudentTeaser,
    completeParentTeaser,
  } = useScenarioStore();

  // Get teaser scenarios
  const studentTeaser = getStudentTeaserScenario();
  const parentTeaser = getParentTeaserScenario();

  if (!studentTeaser || !parentTeaser) return null;

  // Convert student scenario to card format
  const studentChoices = [
    {
      id: studentTeaser.choiceA.id,
      title: studentTeaser.choiceA.title,
      description: studentTeaser.choiceA.description,
      icon: studentTeaser.choiceA.icon,
      color: studentTeaser.choiceA.color,
      feedback: studentTeaser.choiceA.feedback,
    },
    {
      id: studentTeaser.choiceB.id,
      title: studentTeaser.choiceB.title,
      description: studentTeaser.choiceB.description,
      icon: studentTeaser.choiceB.icon,
      color: studentTeaser.choiceB.color,
      feedback: studentTeaser.choiceB.feedback,
      points: studentTeaser.choiceB.points,
    },
  ];

  // Convert parent scenario to card format
  const parentChoices = parentTeaser.decisions.slice(0, 2).map(d => ({
    id: d.id,
    title: d.label,
    description: d.description,
    icon: d.icon,
    color: d.color,
    feedback: d.feedback,
  }));

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
        <div className="text-center mb-10 sm:mb-12">
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
            text="Scenarios du Quotidien"
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

          {/* Audience indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center gap-6 mt-4"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <GraduationCap className="w-4 h-4 text-[#F9A825]" />
              <span>Etudiants</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users className="w-4 h-4 text-[#00997d]" />
              <span>Parents</span>
            </div>
          </motion.div>
        </div>

        {/* 3D Village Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-10 sm:mb-12 relative"
        >
          {/* Scene container with glow effect */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#00997d]/10">
            {/* Animated border glow */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#00997d] via-[#F9A825] to-[#C62828] opacity-30 blur-sm animate-pulse" />

            {/* 3D Scene */}
            <div className="relative bg-[#0a0a0f] rounded-2xl">
              <VillageScene height="300px" />
            </div>

            {/* Overlay labels */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#00997d]/80 backdrop-blur-sm rounded-full"
              >
                <Shield className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white">VILLAGE NIRD</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#C62828]/80 backdrop-blur-sm rounded-full"
              >
                <Swords className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white">EMPIRE BIG TECH</span>
              </motion.div>
            </div>
          </div>

          {/* Instruction text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center text-xs text-gray-500 mt-3"
          >
            Faites glisser pour explorer la scene 3D
          </motion.p>
        </motion.div>

        {/* Teaser Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Student Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <ScenarioTeaserCard
              type="student"
              title={studentTeaser.title}
              context={studentTeaser.context}
              character={studentTeaser.character}
              choices={studentChoices}
              scenarioCount={studentScenarios.length}
              onComplete={completeStudentTeaser}
              isCompleted={studentTeaserCompleted}
            />
          </motion.div>

          {/* Parent Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <ScenarioTeaserCard
              type="parent"
              title={parentTeaser.title}
              context={parentTeaser.context}
              character={parentTeaser.character}
              choices={parentChoices}
              scenarioCount={parentScenarios.length}
              onComplete={completeParentTeaser}
              isCompleted={parentTeaserCompleted}
            />
          </motion.div>
        </div>

        {/* Completion indicator */}
        {(studentTeaserCompleted || parentTeaserCompleted) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00997d]/10 rounded-xl border border-[#00997d]/20">
              <Trophy className="w-4 h-4 text-[#F9A825]" />
              <span className="text-sm text-gray-400">
                {studentTeaserCompleted && parentTeaserCompleted
                  ? 'Bravo ! Les deux scenarios completes !'
                  : 'Un scenario complete ! Continue pour debloquer le badge.'}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
