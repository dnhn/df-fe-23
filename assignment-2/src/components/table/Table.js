import TableForm from "./TableForm";

import './Table.css';

export default function Table() {
  return (
    <div className="table-wrapper">
      <table className="book-list">
        <thead>
          <tr>
            <th className="title">Title</th>
            <th className="author">Author</th>
            <th className="topic">Topic</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>

        <tbody><tr className="empty"><td colSpan="4">No books</td></tr></tbody>

        <tfoot>
          <TableForm />
        </tfoot>
      </table>
    </div>
  );
}
