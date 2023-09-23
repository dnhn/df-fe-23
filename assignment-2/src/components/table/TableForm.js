export default function TableForm() {
  return (
    <tr className="row add-row">
      <td><input type="text" name="title" form="add-book-form" placeholder="Title" required /></td>
      <td><input type="text" name="author" form="add-book-form" placeholder="Author" required /></td>
      <td><select name="topic" form="add-book-form"></select></td>
      <td className="row__actions">
        <button type="button" className="row__action btn btn--info">New book</button>
        <form id="add-book-form">
          <div className="row__confirm">
            <button type="submit" className="row__confirm-action btn btn--primary">Save</button>
            <button type="button" className="row__cancel btn">Cancel</button>
          </div>
        </form>
      </td>
    </tr>
  );
}
