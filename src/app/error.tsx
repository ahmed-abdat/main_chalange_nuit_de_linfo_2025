'use client'

import { useEffect } from 'react'
import { motion } from 'motion/react'

/**
 * App-level Error Boundary
 * Catches errors in route segments and nested children
 * Styled with Village NIRD brand
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error reporting service
    console.error('[Error]', error.digest, error.message)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Broken shield icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mx-auto mb-8 relative"
        >
          <div className="h-24 w-24 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30">
            <svg
              className="h-12 w-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          {/* Glowing effect */}
          <div className="absolute inset-0 h-24 w-24 mx-auto rounded-2xl bg-red-500/20 blur-xl -z-10" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Oups ! Quelque chose a mal tourné
        </h1>

        <p className="text-gray-400 mb-2 text-lg">
          Le village a rencontré un obstacle inattendu.
        </p>

        <p className="text-gray-500 mb-8">
          Pas de panique, nos druides travaillent sur une potion magique !
        </p>

        {error.digest && (
          <div className="mb-8 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <p className="text-xs text-gray-500 font-mono">
              Référence: {error.digest}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={reset}
            className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Réessayer
            </span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/"
            className="px-8 py-4 bg-gray-800 text-gray-300 font-medium rounded-xl hover:bg-gray-700 transition-colors border border-gray-700"
          >
            Retour à l&apos;accueil
          </motion.a>
        </div>

        {/* Fun Asterix reference */}
        <p className="mt-12 text-sm text-gray-600 italic">
          &quot;Ils sont fous ces bugs !&quot; - Obélix
        </p>
      </motion.div>
    </div>
  )
}
