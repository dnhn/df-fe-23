'use client'

import Table, {
  TablePagination,
  TableToolbar,
  useBooksContext,
} from '@/src/components/books'
import { useEffect } from 'react'

export default function Book({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const { setPageIndex, setSearch } = useBooksContext()
  const pageParam = searchParams['page']
  const searchKeywordParam = searchParams['q'] || ''

  // Get URL parameters and set state
  useEffect(() => {
    if (!Number.isNaN(parseInt(pageParam, 10))) {
      setPageIndex((pageParam as unknown as number) - 1)
      setSearch(searchKeywordParam)
    } else {
      setPageIndex(0)
      setSearch(searchKeywordParam)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <TableToolbar />
      <Table />
      <TablePagination />
    </>
  )
}
