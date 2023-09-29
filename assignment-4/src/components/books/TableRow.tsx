import { useState } from 'react'

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
    <tr className="transition-colors even:bg-slate-200 hover:bg-slate-300">
      <td className="whitespace-nowrap px-4 py-3">{index + 1}</td>
      <td className="whitespace-nowrap px-4 py-3">{book.title}</td>
      <td className="whitespace-nowrap px-4 py-3">{book.author}</td>
      <td className="whitespace-nowrap px-4 py-3">{BOOK_TOPICS[book.topic]}</td>
      <td className="whitespace-nowrap px-4 py-3 text-right">
        {confirmation ? (
          <div className="flex justify-end gap-2">
            <Button onClick={() => deleteBook(book.id)}>Confirm</Button>
            <Button variant="error" onClick={() => setConfirmation(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="warning" onClick={() => setConfirmation(true)}>
            Delete
          </Button>
        )}
      </td>
    </tr>
  )
}
