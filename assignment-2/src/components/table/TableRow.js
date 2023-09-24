import { useState } from 'react';
import { BOOK_TOPICS } from '../../common/data';

import Button from '../Button';
import { useBooksContext } from './BooksContext';

export default function TableRow({ book }) {
  const [confirmMode, setConfirmMode] = useState(false);
  const { deleteBook } = useBooksContext();

  return (
    <tr className="row book-row" data-id={book.id}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{BOOK_TOPICS[book.topic]}</td>
      <td className="row__actions">
        {confirmMode ?
          <div className="row__confirm">
            <Button onClick={() => deleteBook(book.id)}>Confirm</Button>
            <Button variant="error" onClick={() => setConfirmMode(false)}>Cancel</Button>
          </div>
        :
          <Button variant="warning" onClick={() => setConfirmMode(true)}>Delete</Button>
        }
      </td>
    </tr>
  );
}
