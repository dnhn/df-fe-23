import { ReactNode } from 'react'

import { BooksProvider } from '@/src/components/books'

export default function BookLayout({ children }: { children: ReactNode }) {
  return <BooksProvider>{children}</BooksProvider>
}
