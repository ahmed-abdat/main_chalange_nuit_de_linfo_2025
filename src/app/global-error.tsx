'use client'

import { useEffect } from 'react'

/**
 * Global Error Boundary
 * Catches errors in root layout and provides recovery
 * MUST include <html> and <body> tags
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error('[GlobalError]', error.digest, error.message)
  }, [error])

  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-950 text-white font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center p-6">
          <div className="text-center max-w-md">
            {/* Shield icon with X */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
              <svg
                className="h-10 w-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-white mb-3">
              Erreur Critique
            </h1>

            <p className="text-gray-400 mb-6">
              Une erreur inattendue s&apos;est produite. Le village a besoin de renfort !
            </p>

            {error.digest && (
              <p className="text-xs text-gray-600 mb-6 font-mono">
                ID: {error.digest}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Réessayer
              </button>

              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Link requires router context unavailable in global-error */}
              <a
                href="/"
                className="px-6 py-3 bg-gray-800 text-gray-300 font-medium rounded-xl hover:bg-gray-700 transition-colors"
              >
                Retour au village
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
