'use client';
import { motion } from 'motion/react';
import { Github, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">VN</span>
              </div>
              <span className="font-bold text-xl text-white">
                Village<span className="text-emerald-500">NIRD</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Le Village Numérique Résistant - Promouvoir un Numérique Inclusif, Responsable et Durable dans les écoles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#crisis" className="hover:text-emerald-500 transition-colors">
                  La Crise
                </a>
              </li>
              <li>
                <a href="#choice" className="hover:text-emerald-500 transition-colors">
                  Le Choix
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-emerald-500 transition-colors">
                  Nos Piliers
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Ressources</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://nird.forge.apps.education.fr/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://nird.forge.apps.education.fr/linux/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Village NIRD - La Nuit de l&apos;Info 2025
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Fait avec <Heart size={14} className="text-red-500" /> par Team Mauritania
          </p>
        </div>
      </div>
    </footer>
  );
}
