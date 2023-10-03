import '@/src/styles/globals.css'

import { ReactNode } from 'react'
import type { Metadata } from 'next'

import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import { BooksProvider } from '@/src/components/books'

export const metadata: Metadata = {
  title: 'Bookstore',
  description: 'Bookstore',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-200 !transition-none transition-[background-color] duration-500 dark:bg-slate-800 dark:text-gray-50">
        <Header />

        <BooksProvider>
          <main className="overflow-hidden px-4 py-16">
            <div className="container mx-auto">{children}</div>
          </main>
        </BooksProvider>

        <Footer />
      </body>
    </html>
  )
}
