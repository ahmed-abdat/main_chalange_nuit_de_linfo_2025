'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';
import { useGameStore, CHARACTERS, type DialogueLine } from '@/store/gameStore';
import { StorySection, DecisionPoint } from './StorySection';
import { DialogueBox } from './DialogueBox';
import BlurText from '@/components/BlurText';
import CountUp from '@/components/CountUp';
import { cn } from '@/lib/utils';

// Dynamic imports for components that use window
const RefurbishGame = dynamic(
  () => import('@/components/games').then((mod) => mod.RefurbishGame),
  { ssr: false }
);

// =============================================================================
// ADVENTURE SECTIONS
// =============================================================================

function CrisisSection() {
  const { completeQuest, addXp, setDialogue, selectedCharacter } = useGameStore();
  const character = selectedCharacter ? CHARACTERS[selectedCharacter] : null;

  const crisisDialogue: DialogueLine[] = [
    {
      speaker: 'Narrateur',
      speakerEmoji: '📜',
      text: "Nous sommes en octobre 2025. Microsoft vient d'annoncer la fin du support de Windows 10...",
    },
    {
      speaker: 'Narrateur',
      speakerEmoji: '📜',
      text: '240 millions de PCs dans le monde sont désormais considérés "obsolètes".',
    },
    {
      speaker: character?.name || 'Héros',
      speakerEmoji: character?.emoji || '⚔️',
      text: "C'est une catastrophe! Toutes ces machines vont finir à la poubelle!",
    },
    {
      speaker: 'Panoramix',
      speakerEmoji: '🧙‍♂️',
      text: "Pas si vite, jeune ami. Il existe une solution... La potion magique du logiciel libre!",
    },
  ];

  const stats = [
    { value: 240, suffix: 'M', label: 'PCs menacés', color: '#C62828', icon: '💀' },
    { value: 68, suffix: '%', label: 'Admin française captive', color: '#C62828', icon: '⛓️' },
    { value: 800, prefix: '€', label: 'Tribut par PC', color: '#C62828', icon: '💰' },
  ];

  useEffect(() => {
    // Show dialogue when section mounts
    const timer = setTimeout(() => {
      setDialogue(crisisDialogue);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StorySection
      id="crisis"
      questId="discover_crisis"
      title="La Menace de l'Empire"
      subtitle="Octobre 2025 - L'Empire Big Tech frappe..."
      background="empire"
      parallaxImages={[
        { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', depth: 2, position: { top: '10%', left: '5%' }, size: '150px' },
        { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400', depth: 3, position: { top: '30%', right: '10%' }, size: '120px' },
      ]}
    >
      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="p-6 bg-[#C62828]/10 border-2 border-[#C62828]/30 rounded-2xl text-center"
          >
            <span className="text-4xl block mb-3">{stat.icon}</span>
            <div className="flex items-baseline justify-center gap-1">
              {stat.prefix && <span className="text-xl text-[#C62828]">{stat.prefix}</span>}
              <CountUp
                to={stat.value}
                duration={2}
                className="text-4xl font-black text-[#C62828]"
              />
              {stat.suffix && <span className="text-xl text-[#C62828]">{stat.suffix}</span>}
            </div>
            <p className="text-gray-400 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Empire visual */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center p-8 bg-black/50 rounded-2xl border border-[#C62828]/30"
      >
        <motion.span
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl block mb-4"
        >
          🏛️
        </motion.span>
        <h3 className="text-2xl font-bold text-[#C62828] mb-2">L&apos;Empire Big Tech</h3>
        <p className="text-gray-400">
          Microsoft, Google, Apple... Ils contrôlent tout. Mais un espoir subsiste...
        </p>
      </motion.div>
    </StorySection>
  );
}

function ChoiceSection() {
  const { userChoice, setUserChoice, completeQuest, addItem, updateStats, setDialogue } = useGameStore();
  const [hasChosen, setHasChosen] = useState(false);

  const handleChoice = (choiceId: string) => {
    setUserChoice(choiceId as 'A' | 'B' | 'C');
    setHasChosen(true);

    if (choiceId === 'B') {
      // Linux choice - give rewards
      addItem('usb_linux');
      addItem('potion');
      updateStats({ budget: 750000, pcs: 100 });

      setDialogue([
        {
          speaker: 'Panoramix',
          speakerEmoji: '🧙‍♂️',
          text: 'Excellent choix! Tu as rejoint le village des irréductibles!',
        },
        {
          speaker: 'Panoramix',
          speakerEmoji: '🧙‍♂️',
          text: "Voici une clé USB Linux et une fiole de potion magique. Tu vas en avoir besoin!",
        },
      ]);
    }

    completeQuest('make_choice');
  };

  const choices = [
    {
      id: 'A',
      title: 'Payer l\'Empire',
      description: 'Acheter de nouveaux PCs Windows',
      emoji: '💰',
      color: '#C62828',
      consequence: 'Tu perds €800 par PC et reste captif de l\'Empire...',
      onSelect: () => handleChoice('A'),
    },
    {
      id: 'B',
      title: 'Rejoindre le Village',
      description: 'Adopter Linux et le logiciel libre',
      emoji: '🐧',
      color: '#00997d',
      consequence: 'Tu économises €750,000 et libères ton école!',
      onSelect: () => handleChoice('B'),
    },
    {
      id: 'C',
      title: 'Ne Rien Faire',
      description: 'Attendre et voir...',
      emoji: '😴',
      color: '#455A64',
      consequence: 'Tes PCs deviennent vulnérables aux attaques...',
      onSelect: () => handleChoice('C'),
    },
  ];

  return (
    <StorySection
      id="choice"
      questId="make_choice"
      title="Le Choix du Destin"
      subtitle="Que vas-tu faire pour ton école?"
      background="mystical"
    >
      <DecisionPoint
        question="L'Empire exige son tribut. Que choisis-tu?"
        choices={choices}
        selectedId={hasChosen ? userChoice || undefined : undefined}
      />
    </StorySection>
  );
}

function GameSection() {
  const { completeQuest, addXp, updateStats, addItem, setDialogue } = useGameStore();
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleGameComplete = () => {
    if (!gameCompleted) {
      setGameCompleted(true);
      completeQuest('refurbish_pc');
      addXp(200);
      updateStats({ pcs: 1, budget: 770 });
      addItem('certificate');

      setDialogue([
        {
          speaker: 'Panoramix',
          speakerEmoji: '🧙‍♂️',
          text: 'Bravo! Tu as maîtrisé l\'art du reconditionnement!',
        },
        {
          speaker: 'Panoramix',
          speakerEmoji: '🧙‍♂️',
          text: 'Tu reçois un Certificat de Villageois. Tu fais maintenant partie de la résistance!',
        },
      ]);
    }
  };

  return (
    <StorySection
      id="game"
      questId="refurbish_pc"
      title="Épreuve du Reconditionnement"
      subtitle="Sauve un PC avec la potion magique!"
      background="village"
    >
      <div className="max-w-4xl mx-auto">
        <RefurbishGame onComplete={handleGameComplete} />

        {gameCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 bg-[#00997d]/20 border-2 border-[#00997d] rounded-2xl text-center"
          >
            <span className="text-5xl block mb-4">🏆</span>
            <h3 className="text-2xl font-bold text-[#00997d] mb-2">PC Sauvé!</h3>
            <p className="text-gray-300">
              Tu as donné 5 ans de vie supplémentaire à ce PC avec seulement €30 de SSD et Linux gratuit!
            </p>
          </motion.div>
        )}
      </div>
    </StorySection>
  );
}

function PillarsSection() {
  const { completeQuest } = useGameStore();

  const pillars = [
    {
      icon: '♿',
      title: 'INCLUSIF',
      subtitle: 'Pour tous les élèves',
      color: '#00997d',
      stat: '132 PCs',
      statLabel: 'distribués à 11 écoles',
    },
    {
      icon: '🛡️',
      title: 'RESPONSABLE',
      subtitle: 'Données souveraines',
      color: '#1A237E',
      stat: '100%',
      statLabel: 'données en France',
    },
    {
      icon: '🌱',
      title: 'DURABLE',
      subtitle: '+5 ans de vie',
      color: '#2E7D32',
      stat: '-70%',
      statLabel: 'déchets électroniques',
    },
  ];

  return (
    <StorySection
      id="pillars"
      questId="learn_pillars"
      title="Les 3 Piliers du Village"
      subtitle="Les secrets de la résistance NIRD"
      background="village"
    >
      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 50, rotateY: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="p-8 rounded-2xl text-center"
            style={{
              background: `linear-gradient(135deg, ${pillar.color}20, ${pillar.color}05)`,
              border: `2px solid ${pillar.color}40`,
            }}
          >
            <motion.span
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-5xl block mb-4"
            >
              {pillar.icon}
            </motion.span>
            <h3 className="text-2xl font-bold mb-2" style={{ color: pillar.color }}>
              {pillar.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4">{pillar.subtitle}</p>
            <div className="py-3 border-t border-gray-700">
              <p className="text-3xl font-black" style={{ color: pillar.color }}>
                {pillar.stat}
              </p>
              <p className="text-xs text-gray-400">{pillar.statLabel}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </StorySection>
  );
}

function VictorySection() {
  const { budgetSaved, pcsSaved, xp, level, completeQuest, inventory } = useGameStore();

  return (
    <StorySection
      id="victory"
      questId="join_village"
      title="Victoire!"
      subtitle="Tu as libéré ton école de l'Empire!"
      background="village"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Trophy */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <span className="text-8xl block mb-6">🏆</span>
        </motion.div>

        {/* Final stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-[#00997d]/20 rounded-2xl border border-[#00997d]">
            <p className="text-gray-400 text-sm mb-1">Budget Sauvé</p>
            <p className="text-4xl font-black text-[#00997d]">
              €<CountUp to={budgetSaved} duration={2} className="inline" />
            </p>
          </div>
          <div className="p-6 bg-[#F9A825]/20 rounded-2xl border border-[#F9A825]">
            <p className="text-gray-400 text-sm mb-1">PCs Sauvés</p>
            <p className="text-4xl font-black text-[#F9A825]">
              <CountUp to={pcsSaved} duration={2} className="inline" />
            </p>
          </div>
          <div className="p-6 bg-purple-500/20 rounded-2xl border border-purple-500">
            <p className="text-gray-400 text-sm mb-1">Niveau Atteint</p>
            <p className="text-4xl font-black text-purple-400">Niv. {level}</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://nird.forge.apps.education.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#00997d] text-white font-bold text-lg rounded-xl
                     shadow-[0_0_30px_rgba(0,153,125,0.5)]"
          >
            🏛️ Rejoindre NIRD
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://nird.forge.apps.education.fr/linux/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#F9A825] text-black font-bold text-lg rounded-xl"
          >
            🐧 Télécharger Linux
          </motion.a>
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-xl italic text-gray-400 max-w-2xl mx-auto"
        >
          &ldquo;Ils sont fous ces Romains... et leurs licences Microsoft!&rdquo;
          <cite className="block mt-4 text-[#F9A825] not-italic font-bold">
            — Obélix, fan de Linux
          </cite>
        </motion.blockquote>
      </div>
    </StorySection>
  );
}

// =============================================================================
// MAIN ADVENTURE COMPONENT
// =============================================================================
export function Adventure() {
  const { currentPhase, activeDialogue } = useGameStore();

  if (currentPhase !== 'adventure') return null;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <CrisisSection />
      <ChoiceSection />
      <GameSection />
      <PillarsSection />
      <VictorySection />

      {/* Dialogue overlay */}
      <AnimatePresence>{activeDialogue && <DialogueBox />}</AnimatePresence>
    </main>
  );
}
