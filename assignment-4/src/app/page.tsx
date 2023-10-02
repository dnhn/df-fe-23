import Table, { TablePagination, TableToolbar } from '@/src/components/books'

export default function Home() {
  return (
    <>
      <TableToolbar />
      <Table />
      <TablePagination />
    </>
  )
}
