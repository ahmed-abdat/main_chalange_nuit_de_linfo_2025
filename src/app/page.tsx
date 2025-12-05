'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Shield, Leaf } from 'lucide-react';
import Link from 'next/link';

// Components
import CountUp from '@/components/CountUp';
import { cn } from '@/lib/utils';

// Data
import { type ChoiceId } from '@/data/choices';

// Store
import { useChoiceStore } from '@/store/choiceStore';

// Games
import { RefurbishGame } from '@/components/games';

/**
 * Village NIRD - Modern Simplified Landing Page
 * La Nuit de l'Info 2025
 */

// =============================================================================
// NAVIGATION
// =============================================================================
function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏛️</span>
          <span className="text-gray-900 font-bold text-lg">Village NIRD</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/student-scenarios"
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-[#00997d] hover:text-[#007d66] transition-colors"
          >
            <span>🎯</span>
            Scénarios
          </Link>
          <Link
            href="/rpg"
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-[#00997d] hover:text-[#007d66] transition-colors"
          >
            <span>⚔️</span>
            RPG
          </Link>
          <a
            href="https://nird.forge.apps.education.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#00997d] text-white text-sm font-medium rounded-full hover:bg-[#007d66] transition-colors"
          >
            Rejoindre NIRD
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

// =============================================================================
// HERO SECTION - Light Theme
// =============================================================================
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden pt-20">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #00997d 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Subtle gradient accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00997d]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F9A825]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Alert Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#C62828]/10 text-[#C62828] text-sm font-medium rounded-full border border-[#C62828]/20">
            <span className="w-1.5 h-1.5 bg-[#C62828] rounded-full animate-pulse" />
            Octobre 2025 — Fin de Windows 10
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 tracking-tight"
        >
          Le Village qui{' '}
          <span className="text-[#00997d]">Résiste</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          <span className="text-[#C62828] font-semibold">240 millions</span> de PCs menacés d&apos;obsolescence.
          Une solution libre et gratuite existe : <span className="text-[#00997d] font-semibold">Linux</span>.
        </motion.p>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[
            { value: '€0', label: 'Coût', color: '#00997d' },
            { value: '+5 ans', label: 'Durée de vie', color: '#d97706' },
            { value: '100%', label: 'Libre', color: '#00997d' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById('choice')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-[#00997d] text-white font-semibold rounded-xl hover:bg-[#007d66] transition-all shadow-lg shadow-[#00997d]/20"
          >
            Faire le choix
          </button>
          <button
            onClick={() => document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all"
          >
            Mini-jeu
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// STATS SECTION - Light Theme
// =============================================================================
function StatsSection() {
  const stats = [
    { value: 240, suffix: 'M', label: 'PCs menacés', color: '#C62828' },
    { value: 68, suffix: '%', label: 'Admin sous Win10', color: '#d97706' },
    { value: 800, prefix: '€', label: 'Coût nouveau PC', color: '#C62828' },
    { value: 0, prefix: '€', label: 'Coût Linux', color: '#00997d' },
  ];

  return (
    <section id="stats" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-[#C62828]/10 text-[#C62828] text-xs font-medium rounded-full mb-4">
            14 Octobre 2025
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            La crise est réelle
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Fin du support Windows 10. Des millions de PCs deviennent vulnérables.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-baseline justify-center gap-0.5 mb-1">
                {stat.prefix && <span className="text-lg" style={{ color: stat.color }}>{stat.prefix}</span>}
                <CountUp to={stat.value} duration={2} className="text-3xl font-bold" style={{ color: stat.color }} />
                {stat.suffix && <span className="text-lg" style={{ color: stat.color }}>{stat.suffix}</span>}
              </div>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// CHOICE SECTION - Light Theme
// =============================================================================
function ChoiceSection() {
  const { userChoice, setUserChoice, calculatorInputs, setCalculatorInputs } = useChoiceStore();
  const [schoolSize, setSchoolSize] = useState(calculatorInputs.schoolSize);

  const handleSchoolSizeChange = (value: number) => {
    setSchoolSize(value);
    setCalculatorInputs({ schoolSize: value });
  };

  const choices = [
    { id: 'A' as ChoiceId, title: "Payer", desc: 'Nouveaux PCs Windows', icon: '💸', color: '#C62828', cost: schoolSize * 800 },
    { id: 'B' as ChoiceId, title: 'Résister', desc: 'Linux gratuit', icon: '🐧', color: '#00997d', cost: schoolSize * 50, recommended: true },
    { id: 'C' as ChoiceId, title: 'Ignorer', desc: 'Risque sécurité', icon: '😴', color: '#64748b', cost: schoolSize * 1200 },
  ];

  return (
    <section id="choice" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Que ferait votre école ?
          </h2>
          <p className="text-gray-600">Calculez vos économies potentielles</p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-sm mx-auto"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Nombre de PCs</span>
            <span className="text-lg font-bold text-gray-900">{schoolSize}</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            value={schoolSize}
            onChange={(e) => handleSchoolSizeChange(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-gray-200 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00997d] [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </motion.div>

        {/* Choice Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {choices.map((choice, i) => (
            <motion.button
              key={choice.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setUserChoice(choice.id)}
              className={cn(
                'relative p-6 rounded-xl text-left transition-all',
                'bg-white border shadow-sm',
                userChoice === choice.id
                  ? 'border-2 shadow-md'
                  : 'border-gray-200 hover:border-gray-300',
                choice.recommended && !userChoice && 'ring-2 ring-[#00997d]/20'
              )}
              style={{ borderColor: userChoice === choice.id ? choice.color : undefined }}
            >
              {choice.recommended && (
                <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-[#00997d] text-white text-[10px] font-medium rounded-full">
                  Recommandé
                </span>
              )}

              <span className="text-3xl block mb-3">{choice.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{choice.title}</h3>
              <p className="text-xs text-gray-500 mb-4">{choice.desc}</p>

              <div className="pt-3 border-t border-gray-100">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Coût 5 ans</p>
                <p className="text-2xl font-bold" style={{ color: choice.color }}>
                  €{choice.cost.toLocaleString()}
                </p>
              </div>

              {userChoice === choice.id && (
                <div
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: choice.color }}
                >
                  ✓
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Savings display */}
        {userChoice === 'B' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center p-4 bg-[#00997d]/10 rounded-xl border border-[#00997d]/20"
          >
            <p className="text-[#00997d] font-semibold">
              Économie de €{((schoolSize * 800) - (schoolSize * 50)).toLocaleString()} sur 5 ans
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// =============================================================================
// GAME SECTION - Light Theme
// =============================================================================
function GameSection() {
  return (
    <section id="game" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 bg-[#00997d]/10 text-[#00997d] text-xs font-medium rounded-full mb-4">
            Interactif
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Sauvez un PC
          </h2>
          <p className="text-gray-600 text-sm">
            Glissez Linux sur le PC pour le sauver
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <RefurbishGame />
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// PILLARS SECTION - Light Theme
// =============================================================================
function PillarsSection() {
  const pillarData = [
    { id: 'inclusive', title: 'Inclusif', icon: Users, color: '#00997d', desc: 'Tech pour tous, PC reconditionnés' },
    { id: 'responsible', title: 'Responsable', icon: Shield, color: '#3B82F6', desc: 'Données souveraines, RGPD' },
    { id: 'sustainable', title: 'Durable', icon: Leaf, color: '#22C55E', desc: 'PCs 10+ ans, moins de déchets' },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Les 3 piliers NIRD
          </h2>
          <p className="text-gray-600">Numérique Inclusif, Responsable, Durable</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {pillarData.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${pillar.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: pillar.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-gray-600">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// CTA SECTION - Light Theme with accent
// =============================================================================
function CTASection() {
  return (
    <section className="py-20 px-6 bg-[#00997d]">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-5xl block mb-6">🐧</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Rejoignez le Village
          </h2>
          <p className="text-white/90 mb-8">
            Des centaines d&apos;écoles ont déjà fait le choix de la liberté numérique.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://nird.forge.apps.education.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-[#00997d] font-semibold rounded-xl hover:bg-gray-100 transition-all"
            >
              Découvrir NIRD
            </a>
            <a
              href="https://nird.forge.apps.education.fr/linux/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white/20 text-white font-medium rounded-xl border border-white/30 hover:bg-white/30 transition-all"
            >
              Télécharger Linux
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// FOOTER - Light Theme
// =============================================================================
function Footer() {
  return (
    <footer className="py-8 px-6 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐧</span>
          <span className="text-sm text-gray-600">Village NIRD — La Nuit de l&apos;Info 2025</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://nird.forge.apps.education.fr/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-900">
            NIRD
          </a>
          <Link href="/student-scenarios" className="text-xs text-gray-500 hover:text-gray-900">
            Scénarios
          </Link>
          <Link href="/rpg" className="text-xs text-gray-500 hover:text-gray-900">
            RPG
          </Link>
          <Link href="/variants" className="text-xs text-gray-500 hover:text-gray-900">
            Variants
          </Link>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// MAIN PAGE - Logical Storytelling Flow
// =============================================================================
// Flow: Hook → Problem → Solution → Action
// 1. Hero: Asterix narrative hook (emotional connection)
// 2. Stats/Crisis: The Windows 10 problem (urgency)
// 3. Choice: Interactive decision (user engagement)
// 4. Pillars: NIRD values - what makes Linux better (education)
// 5. Game: Save a PC experience (fun/memorable)
// 6. CTA: Join the resistance (conversion)
// =============================================================================
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      {/* 1. HOOK - Asterix narrative, emotional connection */}
      <HeroSection />
      {/* 2. PROBLEM - The crisis is real, urgency */}
      <StatsSection />
      {/* 3. DECISION - Interactive choice engagement */}
      <ChoiceSection />
      {/* 4. EDUCATION - The 3 NIRD pillars */}
      <PillarsSection />
      {/* 5. EXPERIENCE - Interactive game (memorable WOW) */}
      <GameSection />
      {/* 6. CONVERSION - Final CTA */}
      <CTASection />
      <Footer />
    </main>
  );
}
