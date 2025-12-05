'use client';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Magnet from '@/components/Magnet';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black bg-gradient-to-r from-[#00997d] to-[#F9A825] bg-clip-text text-transparent">
            Village NIRD
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#crisis" className="text-slate-400 hover:text-[#00997d] transition-colors text-sm font-medium">
            La Crise
          </Link>
          <Link href="#choice" className="text-slate-400 hover:text-[#00997d] transition-colors text-sm font-medium">
            Le Choix
          </Link>
          <Link href="#game" className="text-slate-400 hover:text-[#00997d] transition-colors text-sm font-medium">
            Le Jeu
          </Link>
          <Link href="#pillars" className="text-slate-400 hover:text-[#00997d] transition-colors text-sm font-medium">
            Nos Piliers
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Magnet padding={40} magnetStrength={4}>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://nird.forge.apps.education.fr/linux/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00997d] hover:bg-[#00997d]/80 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-md shadow-[#00997d]/20"
            >
              Obtenir Linux
            </motion.a>
          </Magnet>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <Link href="#crisis" className="text-slate-300 py-2 hover:text-[#00997d] transition-colors">La Crise</Link>
              <Link href="#choice" className="text-slate-300 py-2 hover:text-[#00997d] transition-colors">Le Choix</Link>
              <Link href="#game" className="text-slate-300 py-2 hover:text-[#00997d] transition-colors">Le Jeu</Link>
              <Link href="#pillars" className="text-slate-300 py-2 hover:text-[#00997d] transition-colors">Nos Piliers</Link>
              <a
                href="https://nird.forge.apps.education.fr/linux/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00997d] hover:bg-[#00997d]/80 text-white px-5 py-3 rounded-full text-sm font-medium mt-2 transition-colors text-center"
              >
                Obtenir Linux
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
