import Button from "../Button";

export default function TableForm() {
  return (
    <tr className="row add-row">
      <td><input type="text" name="title" form="add-book-form" placeholder="Title" required /></td>
      <td><input type="text" name="author" form="add-book-form" placeholder="Author" required /></td>
      <td><select name="topic" form="add-book-form"></select></td>
      <td className="row__actions">
        <Button variant="info">New book</Button>
        <form id="add-book-form">
          <div className="row__confirm">
            <Button type="submit" variant="primary">Save</Button>
            <Button type="reset">Cancel</Button>
          </div>
        </form>
      </td>
    </tr>
  );
}
