'use client'

import { ChangeEvent, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Button from '@/src/components/button'
import { useBooksContext } from './BooksContext'

export default function TablePagination() {
  const { bookList, page, pageSize, search, setPage, setPageSize } =
    useBooksContext()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchKeywordParam = searchParams?.get('q')
  const filtered = bookList.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()),
  )
  const totalPages = Math.ceil(filtered.length / pageSize)
  const currentFirstItem = page * pageSize + 1
  const currentLastItem = page * pageSize + pageSize

  useEffect(() => {
    const query = new URLSearchParams()

    // Set search keyword parameter with current URL parameter or state
    if ((searchKeywordParam && searchKeywordParam?.length) || search) {
      query.set('q', searchKeywordParam || search)
    }

    // Check and correct page value from URL parameter
    // Set new page parameter and state
    if (page >= 0) {
      const pageNumber = page + 1 > totalPages ? totalPages : page + 1

      setPage(pageNumber - 1)
      query.set('page', pageNumber.toString())
    } else {
      setPage(0)
    }

    // Push to URL
    if (pathname) {
      router.push(`${pathname}?${query}`, {})
    }
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value, 10))
  }
  const handlePrev = () => setPage(page > 0 ? page - 1 : page)
  const handleNext = () => setPage(page + 1 < totalPages ? page + 1 : page)

  return (
    totalPages > 0 && (
      <div className="mt-8 flex items-center justify-between gap-4 xs:justify-end xs:gap-6">
        <label htmlFor="page-size" className="flex items-center gap-1">
          <span>Page size:</span>
          <select
            name="page-size"
            id="page-size"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="w-auto border-0 border-b-2 border-gray-400 bg-transparent pr-8 text-current focus:border-black focus:ring-0"
          >
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </label>
        {totalPages > 0 && (
          <span>
            {currentFirstItem}–
            {currentLastItem > filtered.length
              ? filtered.length
              : currentLastItem}{' '}
            of {filtered.length}
          </span>
        )}
        <div>
          <Button
            variant="info"
            className="rounded-l-2xl rounded-r-none pl-[.875rem] pr-[.625rem] text-xl leading-none shadow-none"
            aria-label="Previous page"
            disabled={page <= 0}
            onClick={handlePrev}
          >
            ⬅️
          </Button>
          <Button
            variant="info"
            className="rounded-l-none rounded-r-2xl pl-[.625rem] pr-[.875rem] text-xl leading-none shadow-none"
            aria-label="Next page"
            disabled={page + 1 >= totalPages}
            onClick={handleNext}
          >
            ➡️
          </Button>
        </div>
      </div>
    )
  )
}
