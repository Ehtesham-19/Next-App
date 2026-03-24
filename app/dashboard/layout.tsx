import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BluePeak Sports Dashboard",
    template: "%s | BluePeak Sports",
  },
  description: "Practice Makes Men Perfect",
};

export default function DashboardLayout({
  children,
  admin,
  user,
  notification,
  login,
}: Readonly<{
  children: React.ReactNode;
  admin?: React.ReactNode;
  user?: React.ReactNode;
  notification?: React.ReactNode;
  login?: React.ReactNode;
}>) {
  const isLoggedIn = true;
  return isLoggedIn ? (
    <section
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {children}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-red-400 p-5">{admin}</div>
        <div className="bg-blue-400 p-5">{user}</div>
        <div className="bg-green-400 p-5">{notification}</div>
      </div>
    </section>
  ) : (
    login
  );
}
