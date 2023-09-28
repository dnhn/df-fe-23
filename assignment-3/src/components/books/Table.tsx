import { useEffect, useState } from 'react'

import { useBooksContext } from './BooksContext'
import { IBook } from '../../@types/book'
import TableRow from './TableRow'
import TableForm from './TableForm'
import { Button } from '../button'

import styles from './Table.module.css'

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
    <section className={styles.Wrapper}>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th className={styles.HeadIndex}>No.</th>
            <th className={styles.HeadTitle}>Title</th>
            <th className={styles.HeadAuthor}>Author</th>
            <th className={styles.HeadTopic}>Topic</th>
            <th className={styles.HeadActions}>Actions</th>
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
            <tr className={styles.RowEmpty}>
              <td colSpan={5}>No books</td>
            </tr>
          )}
          {/* Add more rows when the filtered list contains fewer items than the specified page size */}
          {filtered.length > 0 &&
            filtered.length < pageSize &&
            Array.from(Array(pageSize - filtered.length).keys()).map((key) => (
              <tr key={key} className={styles.RowFiller}>
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
