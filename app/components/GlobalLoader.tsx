'use client'

import { useLoading } from '@/app/context/LoadingContext'

export default function GlobalLoader() {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .loader-spinner {
          animation: spin 2s linear infinite;
        }
        .loader-dot {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className="text-center">
        {/* Animated Spinner */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full opacity-20 blur-lg"></div>
            <div className="absolute inset-0 loader-spinner">
              <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-indigo-600 border-r-blue-500"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-2">Loading</h2>
        <p className="text-gray-200 mb-6">Please wait...</p>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2">
          <div className="loader-dot w-3 h-3 bg-indigo-400 rounded-full" style={{ animationDelay: '0s' }}></div>
          <div className="loader-dot w-3 h-3 bg-blue-400 rounded-full" style={{ animationDelay: '0.2s' }}></div>
          <div className="loader-dot w-3 h-3 bg-indigo-400 rounded-full" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}
