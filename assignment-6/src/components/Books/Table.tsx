'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'

import Button from '@/src/components/Button'
import { useBooksContext } from '@/src/contexts/BooksContext'
import { getBooks } from '@/src/lib/api'
import TableRow from './TableRow'

export default function Table() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get('q')
  const {
    metadata: { page, pageSize },
    query,
    setMetadata,
  } = useBooksContext()
  const {
    data: books,
    error,
    isLoading,
    mutate,
  } = useSWR('books', () =>
    getBooks([
      ['query', queryParam ?? query ?? ''],
      ['page', page.toString()],
      ['pageSize', pageSize.toString()],
    ]),
  )

  useEffect(() => {
    if (books) {
      setMetadata(books.metadata)
    }
  }, [books, setMetadata])

  useEffect(() => {
    mutate()
  }, [mutate, page, pageSize, query, queryParam])

  return (
    <section className="w-full overflow-auto rounded-lg shadow-[0_.25rem_.5rem_-.5rem] shadow-black">
      <table className="w-full border-collapse border-spacing-0 bg-white transition-colors ease-linear dark:bg-slate-700">
        <thead className="bg-slate-400 transition-colors ease-linear dark:bg-slate-600">
          <tr>
            <th className="px-4 py-3 text-left max-md:hidden max-md:text-sm xl:w-[4.5rem]">
              No.
            </th>
            <th className="px-4 py-2 text-left max-md:text-sm md:min-w-[16rem] md:py-3">
              Title
            </th>
            <th className="px-4 py-3 text-left max-md:hidden xl:w-80">
              Author
            </th>
            <th className="px-4 py-3 text-left max-md:hidden xl:w-64">Topic</th>
            <th className="px-4 py-2 text-right max-md:text-sm md:py-3 xl:w-52">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoading || error || books?.data.length === 0 ? (
            <tr className="pointer-events-none select-none bg-white dark:bg-slate-700">
              <td
                colSpan={5}
                className={`px-4 py-3 text-center text-2xl font-medium leading-none empty-row--${pageSize}`}
              >
                {(isLoading && 'Loading books…') ||
                  (error && 'Error loading books') ||
                  (books?.data.length === 0 && 'No books')}
              </td>
            </tr>
          ) : (
            books && (
              <>
                {books.data.map((book, index) => (
                  <TableRow
                    key={book.id}
                    book={book}
                    index={
                      index +
                      (books.metadata.page - 1) * books.metadata.pageSize
                    }
                  />
                ))}
                {/* Add more rows when the list contains fewer items than the specified page size */}
                {books.data.length > 0 &&
                  books.data.length < pageSize &&
                  Array.from(
                    Array(books.metadata.pageSize - books.data.length).keys(),
                  ).map((key) => (
                    <tr key={key} className="invisible opacity-0">
                      <td className="h-14 px-4 py-2 md:h-16 md:py-3">
                        <span className="border-b border-dashed border-b-gray-600 dark:border-b-gray-400 max-md:text-sm md:hidden">
                          Name
                        </span>
                        <div className="mt-1 text-xs md:hidden">
                          <div className="font-medium italic">Author</div>
                          <div className="mt-2">Topic</div>
                        </div>
                      </td>
                      <td className="h-14 px-4 py-2 md:h-16 md:py-3">
                        <Button size="small">button</Button>
                      </td>
                    </tr>
                  ))}
              </>
            )
          )}
        </tbody>
      </table>
    </section>
  )
}
