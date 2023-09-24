import { useBooksContext } from './BooksContext';

import Button from '../Button';

import './TableToolbar.css';

export default function TableToolbar() {
  const { toggleForm } = useBooksContext();

  return (
    <div className="table-toolbar">
      <div className="search">
        <input type="text" name="search" id="search" placeholder="Search" />
        <button type="button" className="search__clear">clear</button>
      </div>
      <Button variant="info" onClick={toggleForm}>New book</Button>
    </div>
  );
}
