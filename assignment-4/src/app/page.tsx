'use client'

import Table, { BooksProvider } from '@/src/components/books'

export default function Home() {
  return (
    <BooksProvider>
      <Table />
    </BooksProvider>
  )
}
