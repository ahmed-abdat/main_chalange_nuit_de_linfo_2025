'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { StudentScenarios } from '@/components/student-scenarios';

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
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🏛️</span>
            <span className="text-gray-900 font-bold text-lg">Village NIRD</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-[#00997d] transition-colors"
          >
            <span>🏠</span>
            Accueil
          </Link>
          <Link
            href="/student-scenarios"
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-[#00997d] font-medium"
          >
            <span>🎯</span>
            Scénarios
          </Link>
          <Link
            href="/rpg"
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-[#00997d] transition-colors"
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
// HERO SECTION
// =============================================================================
function HeroSection() {
  return (
    <section className="relative pt-32 pb-12 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #00997d 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00997d]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#00997d]/10 text-[#00997d] text-sm font-medium rounded-full border border-[#00997d]/20">
            <span className="text-lg">🎓</span>
            Vie Étudiante
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Scénarios <span className="text-[#00997d]">NIRD</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Faites les bons choix pour votre vie numérique.
          Chaque décision compte pour votre budget et la planète.
        </motion.p>
      </div>
    </section>
  );
}

// =============================================================================
// FOOTER
// =============================================================================
function Footer() {
  return (
    <footer className="py-8 px-6 bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐧</span>
          <span className="text-sm text-gray-600">Village NIRD — La Nuit de l&apos;Info 2025</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-900">
            Accueil
          </Link>
          <Link href="/student-scenarios" className="text-xs text-gray-500 hover:text-gray-900">
            Scénarios
          </Link>
          <Link href="/rpg" className="text-xs text-gray-500 hover:text-gray-900">
            RPG
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function StudentScenariosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <StudentScenarios />
      <Footer />
    </main>
  );
}

