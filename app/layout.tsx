import type { Metadata } from 'next'
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton,SignOutButton } from '@clerk/nextjs'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Providers } from './providers'
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: ' Blog & Comments',
  description: 'Explore amazing blogs and share your thoughts with our community',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <Providers>
            <Header/>
            <header className="flex justify-end items-center p-4 gap-4 h-16 bg-blue-300" >
              <Show when="signed-out">
                <SignInButton mode='modal' />
                <SignUpButton mode="modal">
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>

              </Show>
              <Show when="signed-in">
                <UserButton />
                <SignOutButton></SignOutButton>
              </Show>
            </header>
          
            {children}
            <Footer />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}