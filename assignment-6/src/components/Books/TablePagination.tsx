'use client'

import { ChangeEvent, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useAuthContext } from '@/src/auth/AuthContext'
import Button from '@/src/components/Button'
import { useBooksContext } from '@/src/contexts/BooksContext'

export default function TablePagination() {
  const router = useRouter()
  const pathname = usePathname()
  const { auth } = useAuthContext()
  const {
    metadata: { page, pageSize, totalPages, totalRecords },
    query,
    setPage,
    setPageSize,
  } = useBooksContext()
  const currentFirstItem = (page - 1) * pageSize + 1
  let currentLastItem = (page - 1) * pageSize + pageSize
  currentLastItem =
    currentLastItem > totalRecords ? totalRecords : currentLastItem

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, setPage, totalPages])

  useEffect(() => {
    if (auth) {
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

      router.replace(`${pathname}?${urlSearchParams}`)
    }
  }, [auth, page, query])

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value, 10))
  }
  const handlePrev = () => setPage(page > 1 ? page - 1 : page)
  const handleNext = () => setPage(page < totalPages ? page + 1 : page)

  return (
    totalPages > 0 && (
      <div className="mt-8 flex items-center justify-between gap-4 xs:justify-end xs:gap-6">
        <label
          htmlFor="page-size"
          className="flex items-center gap-1 max-xs:text-xs"
        >
          <span>Page size:</span>
          <select
            name="page-size"
            id="page-size"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="w-auto border-0 border-b-2 border-gray-400 bg-transparent pr-8 text-current focus:border-black focus:ring-0 max-xs:text-sm"
          >
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </label>
        {totalPages > 0 && (
          <span className="max-xs:text-xs">
            {currentFirstItem}–{currentLastItem} of {totalRecords}
          </span>
        )}
        <div>
          <Button
            variant="info"
            className="rounded-l-2xl rounded-r-none pl-[.875rem] pr-[.625rem] text-xl leading-none shadow-none"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={handlePrev}
          >
            ⬅️
          </Button>
          <Button
            variant="info"
            className="rounded-l-none rounded-r-2xl pl-[.625rem] pr-[.875rem] text-xl leading-none shadow-none"
            aria-label="Next page"
            disabled={page >= totalPages}
            onClick={handleNext}
          >
            ➡️
          </Button>
        </div>
      </div>
    )
  )
}
