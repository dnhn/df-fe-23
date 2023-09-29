'use client'

import Table, {
  BooksProvider,
  TablePagination,
  TableToolbar,
} from '@/src/components/books'

export default function Home() {
  return (
    <BooksProvider>
      <TableToolbar />
      <Table />
      <TablePagination />
    </BooksProvider>
  )
}
