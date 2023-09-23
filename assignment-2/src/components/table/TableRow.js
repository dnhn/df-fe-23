import topics from '../../data/topics';

export default function TableRow({ book }) {
  return (
    <tr class="row book-row" data-id={book.id}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{topics[book.topic]}</td>
      <td class="row__actions">
        <button type="button" class="row__action btn btn--warning">Delete</button>
        <div class="row__confirm">
          <button type="button" class="row__confirm-action btn">Confirm</button>
          <button type="button" class="row__cancel btn btn--error">Cancel</button>
        </div>
      </td>
    </tr>
  );
}
