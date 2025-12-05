'use client';

import { AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';
import { useGameStore } from '@/store/gameStore';

// Dynamic imports to avoid SSR issues
const IntroScreen = dynamic(
  () => import('@/components/game').then((mod) => mod.IntroScreen),
  { ssr: false }
);
const CharacterSelectScreen = dynamic(
  () => import('@/components/game').then((mod) => mod.CharacterSelectScreen),
  { ssr: false }
);
const GameHUD = dynamic(
  () => import('@/components/game').then((mod) => mod.GameHUD),
  { ssr: false }
);
const Adventure = dynamic(
  () => import('@/components/game').then((mod) => mod.Adventure),
  { ssr: false }
);

export default function RPGPage() {
  const { currentPhase } = useGameStore();

  return (
    <main className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {currentPhase === 'intro' && <IntroScreen key="intro" />}
        {currentPhase === 'character_select' && <CharacterSelectScreen key="select" />}
        {currentPhase === 'adventure' && (
          <>
            <GameHUD key="hud" />
            <Adventure key="adventure" />
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
