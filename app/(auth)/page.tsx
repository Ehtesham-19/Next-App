import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AuthHomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-xl text-blue-100 mb-12">
          Explore amazing blogs, share your thoughts, and connect with our
          community
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/sign-in"
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition transform hover:scale-105 shadow-lg text-lg"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-[#6c47ff] text-white font-bold py-3 px-8 rounded-full hover:bg-[#5a3ec9] transition transform hover:scale-105 shadow-lg text-lg border-2 border-white"
          >
            Create Account
          </Link>
        </div>

        <p className="text-blue-100 mt-12 text-sm">
          Experience a community-driven platform for sharing blogs and comments
        </p>
      </div>
    </div>
  );
}
