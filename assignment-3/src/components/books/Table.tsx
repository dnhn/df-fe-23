import { useEffect, useState } from 'react'

import { useBooksContext } from './BooksContext'
import { IBook } from '../../@types/book'
import { BOOKS_PER_PAGE } from '../../common/constants'
import TableRow from './TableRow'
import TableForm from './TableForm'

import './Table.css'

export function Table() {
  const { bookList, page, search, setPage } = useBooksContext()
  const [filtered, setFiltered] = useState<IBook[]>([])

  useEffect(() => {
    const filteredList = bookList
      .filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
      .slice(page * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE + BOOKS_PER_PAGE)

    setFiltered(filteredList)

    // If the current page is not the first page and the filtered list is empty,
    // navigate back one page.
    if (page > 0 && filteredList.length === 0) {
      setPage(page - 1)
    }
  }, [bookList, page, search]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => setPage(0), [search]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="table-wrapper">
      <table className="book-list">
        <thead>
          <tr>
            <th className="index">No.</th>
            <th className="title">Title</th>
            <th className="author">Author</th>
            <th className="topic">Topic</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length ? (
            filtered.map((book, index) => (
              <TableRow
                key={book.id}
                book={book}
                index={index + page * BOOKS_PER_PAGE}
              />
            ))
          ) : (
            <tr className="row row--empty">
              <td colSpan={5}>No books</td>
            </tr>
          )}
          {/* Add more rows when the filtered list contains fewer items than the specified page size */}
          {filtered.length > 0 &&
            filtered.length < BOOKS_PER_PAGE &&
            Array.from(Array(BOOKS_PER_PAGE - filtered.length).keys()).map(
              (key) => (
                <tr key={key} className="row row--filler">
                  <td colSpan={5}>
                    <button type="button" className="btn">
                      button
                    </button>
                  </td>
                </tr>
              ),
            )}
        </tbody>

        <tfoot>
          <TableForm />
        </tfoot>
      </table>
    </section>
  )
}
