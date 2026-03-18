"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {
  const pathname = usePathname()
  const authRoutes = ['/login', '/logout', '/password']
  const hideOnAuthRoutes = authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (hideOnAuthRoutes) {
    return null
  }

  return (
    <div className='bg-black text-white p-4 flex items-center justify-center'>
      <h1>My App</h1>
      <Link href="/" className='ml-4'>Home</Link>
      <Link href="/about" className='ml-4'>About</Link>
      <Link href="/logout" className='ml-4'>Logout</Link>
    </div>
  )
}

export default Header