'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { AlertTriangle, Eye, Megaphone, TimerOff, Shield, Zap } from 'lucide-react';
import CountUp from '@/components/CountUp';
import { cn } from '@/lib/utils';

// Seeded random for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

const THREATS = [
  {
    icon: Eye,
    title: 'Trackers',
    stat: '78%',
    description: 'du web est tracke par Google',
    color: '#9C27B0'
  },
  {
    icon: Megaphone,
    title: 'Publicites',
    stat: '5000+',
    description: 'pubs vues par jour en moyenne',
    color: '#FF5722'
  },
  {
    icon: TimerOff,
    title: 'Obsolescence',
    stat: '50M',
    description: 'tonnes de e-dechets par an',
    color: '#607D8B'
  }
];

export default function ThreatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      data-section="threats"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #1a1a1d 0%, #1a0a0a 50%, #1a1a1d 100%)'
      }}
    >
      {/* Ominous background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C62828]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C62828]/10 rounded-full blur-3xl" />
      </div>

      {/* Animated warning particles */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 2 + i * 0.1,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="absolute w-1 h-1 bg-[#C62828] rounded-full"
            style={{
              left: `${seededRandom(i * 31) * 100}%`,
              top: `${seededRandom(i * 37) * 100}%`
            }}
          />
        ))}
      </div>

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        {/* Section badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#C62828]/20 text-[#ff6b6b] rounded-full text-sm font-medium border border-[#C62828]/30">
            <AlertTriangle className="w-4 h-4" />
            Les Menaces de l'Empire
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            L'Empire ne dort{' '}
            <span className="text-[#C62828]">jamais</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Ses legions numeriques attaquent chaque jour. Trackers, publicites invasives,
            obsolescence programmee... Le Village a besoin de defenseurs !
          </p>
        </motion.div>

        {/* Threat cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {THREATS.map((threat, i) => (
            <motion.div
              key={threat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur-xl"
                style={{ backgroundColor: threat.color }}
              />
              <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 group-hover:border-gray-600 transition-colors">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${threat.color}20` }}
                >
                  <threat.icon className="w-7 h-7" style={{ color: threat.color }} />
                </motion.div>

                <h3 className="text-lg font-bold text-white mb-1">{threat.title}</h3>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-black" style={{ color: threat.color }}>
                    {isInView ? threat.stat : '0'}
                  </span>
                </div>

                <p className="text-white/50 text-sm">{threat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 p-4 bg-[#00997d]/10 rounded-xl border border-[#00997d]/20">
            <Shield className="w-6 h-6 text-[#00d9a7]" />
            <p className="text-white/80">
              <span className="text-[#00d9a7] font-medium">Prochain defi :</span>{' '}
              Il est temps de choisir ton camp !
            </p>
            <Zap className="w-5 h-5 text-[#F9A825]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
