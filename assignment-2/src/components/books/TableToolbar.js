import { useEffect, useState } from 'react';

import { useBooksContext } from './BooksContext';
import { trimTrim } from '../../common/utils';
import Button from '../button';

import './TableToolbar.css';

export default function TableToolbar() {
  const { bookList, setSearch, toggleForm } = useBooksContext();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    let typeTimeout = undefined;

    if (bookList.length) {
      typeTimeout = setTimeout(() => setSearch(trimTrim(keyword)), 300);
    }

    return () => {
      clearTimeout(typeTimeout);
    };
  }, [bookList, keyword, setSearch]);

  return (
    <div className="table-toolbar">
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={keyword}
          onInput={event => setKeyword(event.target.value)}
          className="search__input"
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
