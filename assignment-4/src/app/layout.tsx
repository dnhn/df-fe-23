import '@/src/styles/globals.css'

import { ReactNode } from 'react'
import type { Metadata } from 'next'

import { Header } from '@/src/components/Header'

export const metadata: Metadata = {
  title: 'Bookstore',
  description: 'Bookstore',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-200 !transition-none">
        <Header />

        <main>
          <div className="container mx-auto">{children}</div>
        </main>
      </body>
    </html>
  )
}
