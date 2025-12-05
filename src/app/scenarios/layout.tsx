'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy } from 'lucide-react';
import Link from 'next/link';
import { ReactLenis } from 'lenis/react';
import Particles from '@/components/Particles';
import { SmoothCursor } from '@/components/ui/SmoothCursor';
import { ScrollProgressBar } from '@/components/ui/scroll-effects';
import AchievementToast from '@/components/game/AchievementToast';
import { useAchievementStore } from '@/store/achievementStore';

export default function ScenariosLayout({ children }: { children: ReactNode }) {
  const totalXP = useAchievementStore((s) => s.totalXP);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <div className="min-h-screen bg-[#1a1a1d] text-white">
        {/* Custom cursor */}
        <SmoothCursor />

        {/* Scroll progress */}
        <ScrollProgressBar color="#00997d" glowColor="#F9A825" height={3} />

        {/* Achievement toast */}
        <AchievementToast />

        {/* Background particles */}
        <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
          <Particles
            particleCount={20}
            particleSpread={20}
            speed={0.01}
            particleColors={['#00997d', '#F9A825', '#8B5CF6']}
            alphaParticles={true}
            particleBaseSize={20}
            disableRotation={true}
          />
        </div>

        {/* Gradient orbs */}
        <div className="fixed top-0 left-1/4 w-[400px] h-[400px] bg-[#00997d]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F9A825]/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 bg-[#1a1a1d]/80 backdrop-blur-md border-b border-white/5"
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            {/* Back link */}
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Retour au Village</span>
            </Link>

            {/* XP Counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F9A825]/10 rounded-full border border-[#F9A825]/20">
              <Trophy className="w-4 h-4 text-[#F9A825]" />
              <span className="text-sm font-bold text-[#F9A825]">{totalXP} XP</span>
            </div>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="relative z-10 pt-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-8 px-4 border-t border-white/5 mt-16">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm text-gray-500">
              Village NIRD - La Nuit de l&apos;Info 2025
            </p>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
}
