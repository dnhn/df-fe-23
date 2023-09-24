import { useEffect, useState } from "react";

import { useBooksContext } from "./BooksContext";

import TableRow from './TableRow';
import TableForm from "./TableForm";

import './Table.css';

export default function Table() {
  const { bookList, search } = useBooksContext();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(
      bookList.filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
    );
  }, [bookList, search]);

  return (
    <div className="table-wrapper">
      <table className="book-list">
        <thead>
          <tr>
            <th className="index">No.</th>
            <th className="title">Title</th>
            <th className="author">Author</th>
            <th className="topic">Topic</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length ?
            filtered.map((book, index) => <TableRow key={book.id} book={book} index={index} />)
          :
            <tr className="empty"><td colSpan="5">No books</td></tr>
          }
        </tbody>

        <tfoot><TableForm /></tfoot>
      </table>
    </div>
  );
}
