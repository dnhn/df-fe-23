import '@/src/styles/globals.css'

import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import { AuthProvider } from '@/src/auth/AuthContext'
import { COOKIE_THEME } from '@/src/lib/constants'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'

export const metadata: Metadata = {
  title: 'Bookstore',
  description: 'Bookstore',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // Server side theme detection to prevent flashing
  const themeMode = cookies().get(COOKIE_THEME)

  return (
    <html lang="en" className={(themeMode && themeMode.value) || ''}>
      <body className="bg-slate-200 !transition-none transition-[background-color] duration-500 dark:bg-slate-800 dark:text-gray-50">
        <AuthProvider>
          <Header />

          {children}

          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
