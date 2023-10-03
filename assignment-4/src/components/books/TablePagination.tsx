'use client'

import { ChangeEvent } from 'react'

import Button from '@/src/components/button'
import { useBooksContext } from './BooksContext'

export default function TablePagination() {
  const {
    bookList,
    page: currentPage,
    pageSize,
    search,
    setPage,
    setPageSize,
  } = useBooksContext()
  const filtered = bookList.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()),
  )
  const totalPages = Math.ceil(filtered.length / pageSize)
  const currentFirstItem = currentPage * pageSize + 1
  const currentLastItem = currentPage * pageSize + pageSize

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value, 10))
  }
  const handlePrev = () =>
    setPage(currentPage > 0 ? currentPage - 1 : currentPage)
  const handleNext = () =>
    setPage(currentPage + 1 < totalPages ? currentPage + 1 : currentPage)

  return (
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
          className="rounded-l-2xl rounded-r-none text-xl leading-none shadow-none"
          aria-label="Previous page"
          disabled={currentPage <= 0}
          onClick={handlePrev}
        >
          ⬅️
        </Button>
        <Button
          variant="info"
          className="rounded-l-none rounded-r-2xl text-xl leading-none shadow-none"
          aria-label="Next page"
          disabled={currentPage + 1 >= totalPages}
          onClick={handleNext}
        >
          ➡️
        </Button>
      </div>
    </div>
  )
}
