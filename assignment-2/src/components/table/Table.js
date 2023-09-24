import { useEffect, useState } from "react";

import { useBooksContext } from "./BooksContext";

import TableRow from './TableRow';
import TableForm from "./TableForm";

import './Table.css';

export default function Table() {
  const { list, search } = useBooksContext();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(
      list.filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
    );
  }, [list, search]);

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

        <tbody>
          {filtered.length ?
            filtered.map(book => <TableRow key={book.id} book={book} />)
          :
            <tr className="empty"><td colSpan="4">No books</td></tr>
          }
        </tbody>

        <tfoot><TableForm /></tfoot>
      </table>
    </div>
  );
}
