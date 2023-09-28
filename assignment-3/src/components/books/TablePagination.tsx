import { useBooksContext } from './BooksContext'
import { BOOKS_PER_PAGE } from '../../common/constants'

import './TablePagination.css'

export function TablePagination() {
  const { bookList, page: currentPage, search, setPage } = useBooksContext()
  const filtered = bookList.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()),
  )
  const totalPages = Math.ceil(filtered.length / BOOKS_PER_PAGE)
  const currentFirstItem = currentPage * BOOKS_PER_PAGE + 1
  const currentLastItem = currentPage * BOOKS_PER_PAGE + BOOKS_PER_PAGE

  const handlePrev = () =>
    setPage(currentPage > 0 ? currentPage - 1 : currentPage)
  const handleNext = () =>
    setPage(currentPage + 1 < totalPages ? currentPage + 1 : currentPage)

  return (
    <div className="pagination">
      <span>
        {currentFirstItem}–
        {currentLastItem > filtered.length ? filtered.length : currentLastItem}{' '}
        of {filtered.length}
      </span>
      <div>
        <button
          type="button"
          className="btn btn--info pagination__nav"
          aria-label="Previous page"
          disabled={currentPage <= 0}
          onClick={handlePrev}
        >
          ⬅️
        </button>
        <button
          type="button"
          className="btn btn--info pagination__nav"
          aria-label="Next page"
          disabled={currentPage + 1 >= totalPages}
          onClick={handleNext}
        >
          ➡️
        </button>
      </div>
    </div>
  )
}
