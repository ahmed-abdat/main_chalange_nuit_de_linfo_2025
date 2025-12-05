'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles, FlaskConical, ArrowRight, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

// Seeded random for deterministic values (rounded for hydration consistency)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  const value = x - Math.floor(x);
  // Round to 4 decimal places to avoid server/client floating-point mismatch
  return Math.round(value * 10000) / 10000;
}

// Floating code symbols for cauldron effect
const CODE_SYMBOLS = ['<>', '{}', '()', '[]', '//', '/*', '=>', '&&', '||', '==='];

function FloatingSymbol({ symbol, delay, index }: { symbol: string; delay: number; index: number }) {
  // Use deterministic values based on index
  const xOffset1 = seededRandom(index * 7) * 40 - 20;
  const xOffset2 = seededRandom(index * 11) * 60 - 30;
  const repeatDelay = seededRandom(index * 13) * 2;
  const leftPos = seededRandom(index * 17) * 80 + 10;

  return (
    <motion.span
      initial={{ y: 50, opacity: 0 }}
      animate={{
        y: [-50, -100, -150],
        opacity: [0, 1, 0],
        x: [0, xOffset1, xOffset2]
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay
      }}
      className="absolute text-[#00d9a7] font-mono text-sm opacity-60"
      style={{
        left: `${leftPos}%`,
        bottom: '20%'
      }}
    >
      {symbol}
    </motion.span>
  );
}

export default function KnowledgePotionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      data-section="knowledge-potion"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #1a1a1d 0%, #0a1f15 50%, #1a1a1d 100%)'
      }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.1
            }}
            className="absolute w-1 h-1 bg-[#00997d] rounded-full"
            style={{
              left: `${seededRandom(i * 23) * 100}%`,
              top: `${seededRandom(i * 29) * 100}%`
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
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#00997d]/20 text-[#00d9a7] rounded-full text-sm font-medium border border-[#00997d]/30">
            <Sparkles className="w-4 h-4" />
            La Potion du Savoir
          </span>
        </motion.div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Cauldron visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Cauldron */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-48 h-48 relative"
              >
                {/* Cauldron body */}
                <div className="absolute bottom-0 w-full h-36 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-full border-4 border-gray-600" />

                {/* Potion liquid */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute bottom-8 left-4 right-4 h-24 bg-gradient-to-t from-[#00997d] to-[#00d9a7] rounded-b-full opacity-80"
                  style={{
                    boxShadow: '0 0 30px rgba(0, 153, 125, 0.5), inset 0 -10px 20px rgba(0, 0, 0, 0.3)'
                  }}
                />

                {/* Bubbles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -40, -80],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.4,
                      repeat: Infinity
                    }}
                    className="absolute w-3 h-3 bg-[#00d9a7] rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      bottom: '40%'
                    }}
                  />
                ))}

                {/* Floating code symbols */}
                {CODE_SYMBOLS.map((symbol, i) => (
                  <FloatingSymbol key={i} symbol={symbol} delay={i * 0.3} index={i} />
                ))}
              </motion.div>

              {/* Flask icon */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-[#00997d]/20 rounded-full flex items-center justify-center border border-[#00997d]/30"
              >
                <FlaskConical className="w-8 h-8 text-[#00d9a7]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pour chaque outil de l'Empire,{' '}
              <span className="text-[#00d9a7]">une alternative libre</span> existe
            </h2>

            <p className="text-white/70 mb-6 text-lg">
              La potion magique de Panoramix ? La connaissance des logiciels libres !
              Chaque logiciel proprietaire a son equivalent open source, gratuit et respectueux.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { from: 'Windows', to: 'Linux NIRD', color: '#00997d' },
                { from: 'MS Office', to: 'LibreOffice', color: '#18A303' },
                { from: 'Photoshop', to: 'GIMP', color: '#5C5543' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="text-[#C62828] line-through opacity-60">{item.from}</span>
                  <ArrowRight className="w-4 h-4 text-white/40" />
                  <span className="font-medium" style={{ color: item.color }}>{item.to}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 p-4 bg-[#00997d]/10 rounded-xl border border-[#00997d]/20"
            >
              <Layers className="w-6 h-6 text-[#00d9a7] flex-shrink-0" />
              <p className="text-white/80 text-sm">
                <span className="text-[#00d9a7] font-medium">Prochain defi :</span>{' '}
                Teste ta memoire et decouvre toutes les alternatives libres !
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
