import { useBooksContext } from "./BooksContext";
import { BOOKS_PER_PAGE } from "../../common/constants";

import './TablePagination.css';

export default function TablePagination() {
  const { bookList, page: currentPage, search, setPage } = useBooksContext();
  const filtered = bookList.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / BOOKS_PER_PAGE);

  const handlePrev = () => setPage(currentPage > 0 ? currentPage - 1 : currentPage);
  const handleNext = () => setPage(currentPage + 1 < totalPages ? currentPage + 1 : currentPage);

  return totalPages > 0 && (
    <div className="pagination">
      <button
        type="button"
        className="btn btn--info"
        disabled={currentPage <= 0}
        onClick={() => setPage(0)}
      >
        First
      </button>
      <button
        type="button"
        className="btn btn--info"
        disabled={currentPage <= 0}
        onClick={handlePrev}
      >
        Previous
      </button>
      <div className="pagination__pages">
        {Array.from(Array(totalPages).keys()).map(page =>
          <button
            key={page}
            type="button"
            className={`btn ${page === currentPage ? 'pagination__current btn--primary' : ''} pagination__page`}
            onClick={() => setPage(page)}
          >
            {page + 1}
          </button>
        )}
      </div>
      <button
        type="button"
        className="btn btn--info"
        disabled={currentPage + 1 >= totalPages}
        onClick={handleNext}
      >
        Next
      </button>
      <button
        type="button"
        className="btn btn--info"
        disabled={currentPage + 1 >= totalPages}
        onClick={() => setPage(totalPages - 1)}
      >
        Last
      </button>
    </div>
  );
}
