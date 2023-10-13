'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useBooksContext } from '@/src/contexts/BooksContext'
import TableToolbar from './TableToolbar'
import Table from './Table'
import TablePagination from './TablePagination'

export default function BookStore() {
  const router = useRouter()
  const pathname = usePathname()
  const {
    metadata: { page },
    query,
  } = useBooksContext()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams()

    if (query.length) {
      urlSearchParams.set('q', query)
    } else {
      urlSearchParams.delete('q')
    }

    if (page > 0) {
      urlSearchParams.set('page', page.toString())
    } else {
      urlSearchParams.delete('page')
    }

    router.push(`${pathname}?${urlSearchParams}`)
  }, [page, pathname, query, router])

  return (
    <>
      <TableToolbar />
      <Table />
      <TablePagination />
    </>
  )
}
