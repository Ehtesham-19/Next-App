'use client'

import React from 'react'

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-2xl p-8 text-center">
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-200 rounded-full blur-lg opacity-75"></div>
              <div className="relative bg-red-100 rounded-full p-6">
                <svg
                  className="w-16 h-16 text-red-500 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4v2m0 4v2M8.228 4.228L6.464 2.464m5.304 0l1.764 1.764m5.304 0l1.764-1.764m-18.368 5.304L2.464 6.464m0 5.304l-1.764 1.764m0 5.304l1.764 1.764m5.304 0L4.228 19.772m10.608 0l-1.764 1.764"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Oops!</h1>
          <p className="text-gray-600 mb-2 text-lg">Something went wrong</p>
          <p className="text-gray-500 mb-8 text-sm">
            {error?.message || 'An unexpected error occurred while loading the blogs.'}
          </p>

          {/* Error Details */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
            <p className="text-xs text-red-600 font-mono break-words">
              {error?.stack?.split('\n')[0] || 'Please try again later'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              Go Back
            </button>
          </div>

          {/* Support Link */}
          <p className="text-gray-500 text-xs mt-6">
            Need help?{' '}
            <a href="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Return to home
            </a>
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full opacity-50"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full opacity-75"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  )
}
