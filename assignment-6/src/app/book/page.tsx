import Table, { TablePagination, TableToolbar } from '@/src/components/Books'

export default function Book() {
  return (
    <>
      <TableToolbar />
      <Table />
      <TablePagination />
    </>
  )
}
