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
}: Readonly<{
  children: React.ReactNode;
  admin?: React.ReactNode;
  user?: React.ReactNode;
  notification?: React.ReactNode;
}>) {
  return (
    <section
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {children}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>{admin}</div>
        <div>{user}</div>
        <div>{notification}</div>
      </div>
    </section>
  );
}
