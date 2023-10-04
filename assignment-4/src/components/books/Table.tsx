'use client'

import { useEffect, useState } from 'react'

import { IBook } from '@/src/types/book'
import Button from '@/src/components/button'
import { useBooksContext } from './BooksContext'
import TableRow from './TableRow'
import TableForm from './TableForm'

export default function Table() {
  const { bookList, page, pageSize, search, setPage } = useBooksContext()
  const [filtered, setFiltered] = useState<IBook[]>([])

  useEffect(() => {
    const filteredList = bookList
      .filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
      .slice(page * pageSize, page * pageSize + pageSize)

    setFiltered(filteredList)

    // If the current page is not the first page and the filtered list is empty, navigate back one page.
    if (page > 0 && filteredList.length === 0) {
      setPage(page - 1)
    } else {
      setPage(page)
    }
  }, [bookList, page, pageSize, search, setPage])

  return (
    <section className="w-full overflow-auto rounded-lg shadow-[0_.25rem_.5rem_-.5rem] shadow-black">
      <table className="w-full border-collapse border-spacing-0 bg-white transition-colors ease-linear dark:bg-slate-700">
        <thead className="bg-slate-400 transition-colors ease-linear dark:bg-slate-600">
          <tr>
            <th className="px-4 py-3 text-left xl:w-[4.5rem]">No.</th>
            <th className="min-w-[16rem] px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left xl:w-80">Author</th>
            <th className="px-4 py-3 text-left xl:w-64">Topic</th>
            <th className="px-4 py-3 text-right xl:w-48">Actions</th>
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
            <tr className="pointer-events-none select-none bg-white dark:bg-slate-700">
              <td
                colSpan={5}
                className={`px-4 py-3 text-center text-2xl font-medium leading-none empty-row--${pageSize}`}
              >
                No books
              </td>
            </tr>
          )}
          {/* Add more rows when the filtered list contains fewer items than the specified page size */}
          {filtered.length > 0 &&
            filtered.length < pageSize &&
            Array.from(Array(pageSize - filtered.length).keys()).map((key) => (
              <tr key={key} className="invisible opacity-0">
                <td colSpan={5} className="px-4 py-3">
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
