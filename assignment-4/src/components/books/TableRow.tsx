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
      <td className="h-14 whitespace-nowrap px-4 py-3 md:h-16">{index + 1}</td>
      <td className="h-14 whitespace-nowrap px-4 py-3 md:h-16">
        <span className="max-md:hidden">{book.title}</span>
        <Link
          href={`/book/${book.id}`}
          className="border-b border-dashed border-b-gray-600 md:hidden"
        >
          {book.title}
        </Link>
      </td>
      <td className="h-14 whitespace-nowrap px-4 py-3 md:h-16">
        {book.author}
      </td>
      <td className="h-14 whitespace-nowrap px-4 py-3 md:h-16">
        {BOOK_TOPICS[book.topic]}
      </td>
      <td className="text-r h-14ight whitespace-nowrap px-4 py-3 md:h-16">
        <div className="flex items-center justify-end gap-2">
          {confirmation ? (
            <>
              <Button size="small" onClick={() => deleteBook(book.id)}>
                Confirm
              </Button>
              <Button
                variant="error"
                size="small"
                onClick={() => setConfirmation(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Link
                href={`/book/${book.id}`}
                className="button button--primary button--small"
              >
                View
              </Link>
              <Button
                size="small"
                variant="warning"
                onClick={() => setConfirmation(true)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
