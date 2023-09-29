'use client'

import Table, { BooksProvider, TableToolbar } from '@/src/components/books'

export default function Home() {
  return (
    <BooksProvider>
      <TableToolbar />
      <Table />
    </BooksProvider>
  )
}
