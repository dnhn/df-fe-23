'use client'

import Table, { TablePagination, TableToolbar } from '@/src/components/books'

export default function Book() {
  return (
    <>
      <TableToolbar />
      <Table />
      <TablePagination />
    </>
  )
}
