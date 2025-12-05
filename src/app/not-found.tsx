'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Landmark, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlurText from '@/components/BlurText';
import Particles from '@/components/Particles';
import Waves from '@/components/Waves';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#1a1a1d] flex items-center justify-center overflow-hidden">
      {/* Background Waves */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Waves
          lineColor="#00997d"
          waveSpeedX={0.006}
          waveSpeedY={0.002}
          waveAmpX={20}
          waveAmpY={10}
          xGap={16}
          yGap={32}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-[1] opacity-30">
        <Particles
          particleCount={30}
          particleSpread={25}
          speed={0.02}
          particleColors={['#00997d', '#F9A825']}
          alphaParticles={true}
          particleBaseSize={30}
          disableRotation={true}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00997d]/15 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#F9A825]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none bg-gradient-to-b from-[#00997d] via-[#00997d]/60 to-transparent bg-clip-text text-transparent select-none">
            404
          </span>
        </motion.div>

        {/* Title */}
        <BlurText
          text="Village Introuvable"
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
          delay={80}
          animateBy="words"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-gray-400 text-lg md:text-xl mb-4"
        >
          Cette page s&apos;est perdue dans la foret gauloise.
        </motion.p>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-[#F9A825] font-bold text-xl mb-10"
        >
          &ldquo;Par Toutatis ! Cette route ne mene nulle part.&rdquo;
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#00997d] hover:bg-[#00b894] text-white font-bold rounded-xl px-8 transition-all duration-300 hover:scale-105"
          >
            <Link href="/">
              <Landmark className="w-5 h-5 mr-2" />
              Retour au Village
            </Link>
          </Button>

          <Button
            size="lg"
            className="bg-white/5 border border-white/20 text-white hover:bg-white/10 font-bold rounded-xl px-8 transition-all duration-300 hover:scale-105"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Page precedente
          </Button>
        </motion.div>

        {/* Footer quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-sm text-gray-600 italic"
        >
          &ldquo;Un village d&apos;irreductibles enseignants et eleves resiste encore a l&apos;envahisseur.&rdquo;
        </motion.p>
      </div>
    </div>
  );
}
