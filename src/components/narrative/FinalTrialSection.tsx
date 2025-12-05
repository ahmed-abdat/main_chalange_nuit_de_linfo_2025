'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Terminal, Trophy, Zap, Keyboard, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Seeded random for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

const SAMPLE_COMMANDS = [
  { cmd: 'ls -la', desc: 'Liste les fichiers' },
  { cmd: 'sudo apt update', desc: 'Met a jour le systeme' },
  { cmd: 'chmod +x script.sh', desc: 'Rend executable' }
];

export default function FinalTrialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      data-section="final-trial"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #1a1a1d 0%, #1a1a0a 50%, #1a1a1d 100%)'
      }}
    >
      {/* Golden particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 3 + i * 0.1,
              repeat: Infinity,
              delay: i * 0.15
            }}
            className="absolute w-1 h-1 bg-[#F9A825] rounded-full"
            style={{
              left: `${seededRandom(i * 41) * 100}%`,
              top: `${seededRandom(i * 43) * 100}%`
            }}
          />
        ))}
      </div>

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        {/* Section badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F9A825]/20 text-[#F9A825] rounded-full text-sm font-medium border border-[#F9A825]/30">
            <Trophy className="w-4 h-4" />
            L'Epreuve Finale
          </span>
        </motion.div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Tu as prouve tes connaissances.{' '}
              <span className="text-[#F9A825]">Prouve ta maitrise !</span>
            </h2>

            <p className="text-white/70 mb-6 text-lg">
              Le terminal est l'arme ultime du resistant. Chaque commande maitrisee
              est une victoire contre l'Empire. Montre-moi la vitesse de tes doigts !
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-full bg-[#00997d]/20 flex items-center justify-center">
                  <Keyboard className="w-4 h-4 text-[#00d9a7]" />
                </div>
                <span>Tape les commandes Linux le plus vite possible</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-full bg-[#F9A825]/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#F9A825]" />
                </div>
                <span>Bats Windows Update dans cette course</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Star className="w-4 h-4 text-purple-400" />
                </div>
                <span>Atteins 50 WPM pour le badge "Ninja du Terminal"</span>
              </div>
            </div>
          </motion.div>

          {/* Terminal preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Terminal window */}
              <div className="bg-[#0d1117] rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-gray-400 text-xs ml-2 font-mono">
                    nird@village:~$
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 font-mono text-sm space-y-3">
                  {SAMPLE_COMMANDS.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.2 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#00d9a7]">$</span>
                        <motion.span
                          initial={{ width: 0 }}
                          animate={isInView ? { width: 'auto' } : {}}
                          transition={{ delay: 0.7 + i * 0.2, duration: 0.5 }}
                          className="text-white overflow-hidden whitespace-nowrap"
                        >
                          {item.cmd}
                        </motion.span>
                      </div>
                      <span className="text-gray-400 text-xs ml-4"># {item.desc}</span>
                    </motion.div>
                  ))}

                  {/* Blinking cursor */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#00d9a7]">$</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-2 h-4 bg-[#00d9a7]"
                    />
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-16 h-16 border-2 border-[#F9A825]/20 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-2 -left-2 w-8 h-8 bg-[#00997d]/20 rounded-full flex items-center justify-center"
              >
                <Terminal className="w-4 h-4 text-[#00d9a7]" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
