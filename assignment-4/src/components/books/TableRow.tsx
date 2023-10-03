import { useState } from 'react'
import Link from 'next/link'

import { IBook } from '@/src/types/book'
import { BOOK_TOPICS } from '@/src/lib/data'
import Button from '@/src/components/button'
import { useBooksContext } from './BooksContext'

export default function TableRow({
  book,
  index,
}: {
  book: IBook
  index: number
}) {
  const { deleteBook } = useBooksContext()
  const [confirmation, setConfirmation] = useState<boolean>(false)

  return (
    <tr className="group transition-colors ease-linear even:bg-slate-200 dark:even:bg-slate-600 md:hover:bg-slate-300 dark:md:hover:bg-slate-500">
      <td className="whitespace-nowrap px-4 py-3">{index + 1}</td>
      <td className="whitespace-nowrap px-4 py-3">
        <span className="max-md:hidden">{book.title}</span>
        <Link
          href={`/book/${book.id}`}
          className="border-b border-dashed border-b-gray-600 md:hidden"
        >
          {book.title}
        </Link>
      </td>
      <td className="whitespace-nowrap px-4 py-3">{book.author}</td>
      <td className="whitespace-nowrap px-4 py-3">{BOOK_TOPICS[book.topic]}</td>
      <td className="whitespace-nowrap px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          {confirmation ? (
            <>
              <Button onClick={() => deleteBook(book.id)}>Confirm</Button>
              <Button variant="error" onClick={() => setConfirmation(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Link
                href={`/book/${book.id}`}
                className="button button--primary"
              >
                View
              </Link>
              <Button variant="warning" onClick={() => setConfirmation(true)}>
                Delete
              </Button>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
