'use client'

import { useEffect } from 'react'

import Table, {
  TablePagination,
  TableToolbar,
  useBooksContext,
} from '@/src/components/Books'

interface IBookPage {
  searchParams: { [key: string]: string }
}

export default function Book({ searchParams }: IBookPage) {
  const { setPageIndex, setSearch } = useBooksContext()
  const pageParam = searchParams['page']
  const searchKeywordParam = searchParams['q']

  // Get URL parameters and set state
  useEffect(() => {
    setSearch(searchKeywordParam || '')
    setPageIndex(
      Number.isNaN(parseInt(pageParam, 10)) ? 0 : parseInt(pageParam, 10) - 1,
    )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <TableToolbar />
      <Table />
      <TablePagination />
    </>
  )
}
