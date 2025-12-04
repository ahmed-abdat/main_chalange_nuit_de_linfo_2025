'use client';

import { Suspense } from 'react';
import { motion } from 'motion/react';

/**
 * Village NIRD - La Nuit de l'Info 2025
 *
 * Theme: "The Resistant Digital Village"
 * - Asterix vs Big Tech metaphor
 * - Scrollytelling with interactive choice
 * - NIRD 3 pillars: Inclusive, Responsible, Sustainable
 */

// Placeholder Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--nird-parchment)] to-[var(--nird-parchment-dark)]">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Epic intro text */}
          <p className="text-lg md:text-xl text-[var(--nird-dark-blue)] mb-4 font-medium">
            Nous sommes en 2025...
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient-empire">Toutes les écoles françaises</span>
            <br />
            <span className="text-[var(--nird-dark-blue)]">sont occupées par</span>
            <br />
            <span className="text-[var(--nird-roman-red)]">Big Tech...</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--nird-forest-green)] mt-8"
          >
            Toutes ? Non !
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xl md:text-2xl text-[var(--nird-dark-blue)] mt-4 max-w-3xl mx-auto"
          >
            Un village d&apos;irréductibles enseignants et élèves résiste encore à l&apos;envahisseur...
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-12"
        >
          <button className="px-8 py-4 bg-[var(--nird-forest-green)] hover:bg-[var(--nird-forest-light)] text-white font-bold text-lg rounded-lg transition-all transform hover:scale-105 shadow-lg">
            Découvrir le Village NIRD
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg className="w-8 h-8 text-[var(--nird-dark-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Crisis Section - Windows 10 Problem
function CrisisSection() {
  const stats = [
    { value: '240M', label: 'PCs à jeter dans le monde', color: 'var(--nird-roman-red)' },
    { value: '68%', label: 'PCs Windows 10 en France (admin)', color: 'var(--nird-roman-red)' },
    { value: '€300-800', label: 'Coût par nouveau PC', color: 'var(--nird-roman-red)' },
    { value: '€0', label: 'Coût de Linux', color: 'var(--nird-forest-green)' },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[var(--nird-roman-red)] text-white text-sm font-bold rounded-full mb-4">
            ALERTE : 14 OCTOBRE 2025
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--nird-dark-blue)] mb-6">
            La Crise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Microsoft met fin au support GRATUIT de Windows 10.
            Plus de mises à jour de sécurité gratuites.
            Les ordinateurs non protégés deviennent vulnérables aux cyberattaques.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-gray-50"
            >
              <div
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pillars Section - NIRD 3 Pillars
function PillarsSection() {
  const pillars = [
    {
      title: 'Inclusif',
      subtitle: 'La tech pour tous',
      description: 'Les élèves plus âgés reconditionnent des PCs pour les plus jeunes. 132 ordinateurs livrés à 11 écoles.',
      color: 'var(--nird-forest-green)',
      icon: '🤝',
    },
    {
      title: 'Responsable',
      subtitle: 'Contrôlez vos données',
      description: 'Utilisez des alternatives open-source. Gardez les données en France/UE. Souveraineté numérique.',
      color: 'var(--nird-gold)',
      icon: '🛡️',
    },
    {
      title: 'Durable',
      subtitle: 'Matériel qui dure 10+ ans',
      description: 'Linux fonctionne sur les vieux ordinateurs. Un SSD à 30€ transforme un vieux PC en machine rapide.',
      color: 'var(--nird-dark-blue)',
      icon: '🌱',
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-village">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--nird-dark-blue)] mb-4">
            Le Mouvement NIRD
          </h2>
          <p className="text-xl text-gray-600">
            Numérique Inclusif, Responsable, Durable
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">{pillar.icon}</div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: pillar.color }}
              >
                {pillar.title}
              </h3>
              <p className="text-gray-500 text-sm mb-3">{pillar.subtitle}</p>
              <p className="text-gray-600">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section - Join the Village
function JoinSection() {
  return (
    <section className="py-24 px-6 bg-[var(--nird-forest-green)]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Rejoignez le Village
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Vous n&apos;êtes pas seul. Le village vous accueille.
            Ensemble, résistons à l&apos;Empire numérique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://nird.forge.apps.education.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-[var(--nird-forest-green)] font-bold text-lg rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Découvrir NIRD
            </a>
            <a
              href="https://nird.forge.apps.education.fr/linux/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[var(--nird-gold)] text-[var(--nird-dark-blue)] font-bold text-lg rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Installer Linux
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-6 bg-[var(--nird-dark-blue)] text-white/80">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">
          La Nuit de l&apos;Info 2025 - Team Mauritania
        </p>
        <p className="text-xs mt-2 text-white/60">
          Inspiré par le mouvement NIRD - Numérique Inclusif, Responsable, Durable
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="min-h-screen bg-[var(--nird-parchment)]" />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={null}>
        <CrisisSection />
      </Suspense>

      <Suspense fallback={null}>
        <PillarsSection />
      </Suspense>

      <Suspense fallback={null}>
        <JoinSection />
      </Suspense>

      <Footer />
    </main>
  );
}
