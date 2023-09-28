import { ChangeEvent } from 'react'

import { useBooksContext } from './BooksContext'
import { Button } from '../button'

import styles from './TablePagination.module.css'

export function TablePagination() {
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
    <div className={styles.Pagination}>
      <label htmlFor="page-size" className={styles.PageSize}>
        <span>Page size:</span>
        <select
          name="page-size"
          id="page-size"
          value={pageSize}
          onChange={handlePageSizeChange}
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
          classes={styles.Nav}
          aria-label="Previous page"
          disabled={currentPage <= 0}
          onClick={handlePrev}
        >
          ⬅️
        </Button>
        <Button
          variant="info"
          classes={styles.Nav}
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
