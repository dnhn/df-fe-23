import { ReactNode } from 'react'
import { Metadata } from 'next'

import {
  BooksProvider,
  BooksDialogProvider,
  DialogRenderer,
} from '@/src/components/Books'

export const metadata: Metadata = {
  title: 'Book List',
  description: 'Book List',
}

export default function BookLayout({ children }: { children: ReactNode }) {
  return (
    <BooksProvider>
      <BooksDialogProvider>
        {children}
        <DialogRenderer />
      </BooksDialogProvider>
    </BooksProvider>
  )
}
