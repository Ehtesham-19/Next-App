"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-pink-100 text-sm">
              Join our amazing community today
            </p>
          </div>

          <div className="p-8">
            <SignUp />
          </div>

          <div className="bg-white/5 border-t border-white/10 px-8 py-6 text-center">
            <p className="text-gray-300 text-sm">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="font-semibold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text hover:from-pink-300 hover:to-purple-300 transition-all"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Create an account to get started</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
