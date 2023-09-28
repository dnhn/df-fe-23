import { useState } from 'react'

import { useBooksContext } from './BooksContext'
import { BOOK_TOPICS } from '../../common/data'
import { Button } from '../button'

import styles from './TableRow.module.css'

export default function TableRow({ book, index }) {
  const { deleteBook } = useBooksContext()
  const [confirmation, setConfirmation] = useState<boolean>(false)

  return (
    <tr className={styles.Row}>
      <td>{index + 1}</td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{BOOK_TOPICS[book.topic]}</td>
      <td className={styles.Actions}>
        {confirmation ? (
          <div className={styles.ConfirmActions}>
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
