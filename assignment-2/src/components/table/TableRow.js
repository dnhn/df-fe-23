import topics from '../../data/topics';

import Button from '../Button';

export default function TableRow({ book }) {
  return (
    <tr className="row book-row" data-id={book.id}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{topics[book.topic]}</td>
      <td className="row__actions">
        <Button variant="warning">Delete</Button>
        <div className="row__confirm">
          <Button>Confirm</Button>
          <Button variant="error">Cancel</Button>
        </div>
      </td>
    </tr>
  );
}
