'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useGameToasts, useGameStore } from '@/store/gameStore';

export default function GameToasts() {
  const toasts = useGameToasts();
  const dismissToast = useGameStore((s) => s.dismissToast);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="pointer-events-auto"
          >
            <div
              className="relative flex items-center gap-3 px-4 py-3 bg-[#1a1a1d]/95 backdrop-blur-md rounded-xl border shadow-xl min-w-[250px] max-w-[320px]"
              style={{ borderColor: `${toast.color}40` }}
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ backgroundColor: `${toast.color}20` }}
              >
                {toast.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm truncate">{toast.title}</p>
                <p className="text-gray-400 text-xs truncate">{toast.description}</p>
              </div>

              {/* Close button */}
              <button
                onClick={() => dismissToast(toast.id)}
                className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>

              {/* Progress bar */}
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 4, ease: 'linear' }}
                className="absolute bottom-0 left-0 right-0 h-0.5 origin-left rounded-b-xl"
                style={{ backgroundColor: toast.color }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
