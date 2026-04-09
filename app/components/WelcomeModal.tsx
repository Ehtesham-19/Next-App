"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { X, CheckCircle, Sparkles } from "lucide-react";

export function WelcomeModal() {
  const { user, isLoaded } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (isLoaded && user && !hasShown) {
      const welcomed = sessionStorage.getItem("welcomed");
      if (!welcomed) {
        setTimeout(() => {
          setShowModal(true);
          sessionStorage.setItem("welcomed", "true");
        }, 500);
        setHasShown(true);
      }
    }
  }, [user, isLoaded, hasShown]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowModal(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 opacity-100 animate-in fade-in zoom-in">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-8 pt-12 pb-8 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-2xl opacity-30" />
          </div>

          <div className="relative z-10">
            <Sparkles className="w-12 h-12 text-white mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-white mb-2">Welcome! 🎉</h2>
            <p className="text-purple-100 text-sm">
              You've successfully joined our community
            </p>
          </div>
        </div>

        <div className="px-8 py-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Hello, {user?.firstName || user?.username || "Friend"}! 👋
            </h3>
            <p className="text-gray-600 text-sm">
              Thank you for signing up. Get ready to explore amazing blogs and
              connect with our community.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: "📝", text: "Read and write amazing blogs" },
              { icon: "💬", text: "Share your thoughts in comments" },
              { icon: "🌟", text: "Connect with like-minded people" },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 text-sm font-medium">
                    {feature.icon} {feature.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Let's Get Started! 🚀
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center pt-4 border-t border-gray-200">
            This message appears only once per session
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}
