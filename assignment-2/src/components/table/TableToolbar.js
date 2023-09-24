import { useEffect, useState } from 'react';

import { useBooksContext } from './BooksContext';

import Button from '../Button';

import './TableToolbar.css';

export default function TableToolbar() {
  const { list, setSearch, toggleForm } = useBooksContext();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    let typeTimeout = undefined;

    if (list.length) {
      typeTimeout = setTimeout(() => setSearch(keyword), 300);
    }

    return () => {
      clearTimeout(typeTimeout);
    };
  }, [keyword, list, setSearch]);

  return (
    <div className="table-toolbar">
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={keyword}
          onInput={event => setKeyword(event.target.value)}
        />
        <button
          type="button"
          className="search__clear"
          onClick={() => setKeyword('')}
        >
          clear
        </button>
      </div>
      <Button variant="info" onClick={toggleForm}>New book</Button>
    </div>
  );
}
