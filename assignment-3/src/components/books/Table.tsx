import { useEffect, useState } from 'react'

import { useBooksContext } from './BooksContext'
import { IBook } from '../../@types/book'
import TableRow from './TableRow'
import TableForm from './TableForm'
import { Button } from '../button'

import './Table.css'

export function Table() {
  const { bookList, page, pageSize, search, setPage } = useBooksContext()
  const [filtered, setFiltered] = useState<IBook[]>([])

  useEffect(() => {
    const filteredList = bookList
      .filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
      .slice(page * pageSize, page * pageSize + pageSize)

    setFiltered(filteredList)

    // If the current page is not the first page and the filtered list is empty,
    // navigate back one page.
    if (page > 0 && filteredList.length === 0) {
      setPage(page - 1)
    }
  }, [bookList, page, pageSize, search]) // eslint-disable-line react-hooks/exhaustive-deps

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
                index={index + page * pageSize}
              />
            ))
          ) : (
            <tr className="row row--empty">
              <td colSpan={5}>No books</td>
            </tr>
          )}
          {/* Add more rows when the filtered list contains fewer items than the specified page size */}
          {filtered.length > 0 &&
            filtered.length < pageSize &&
            Array.from(Array(pageSize - filtered.length).keys()).map((key) => (
              <tr key={key} className="row row--filler">
                <td colSpan={5}>
                  <Button>button</Button>
                </td>
              </tr>
            ))}
        </tbody>

        <tfoot>
          <TableForm />
        </tfoot>
      </table>
    </section>
  )
}
