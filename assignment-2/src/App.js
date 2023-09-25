import { Fragment, useEffect } from 'react';

import Header from './components/Header';
import { BooksProvider } from './components/books/BooksContext';
import TableToolbar from "./components/books/TableToolbar";
import Table from "./components/books/Table";
import TablePagination from './components/books/TablePagination';

import './components/Button.css';
import './App.css';

export default function App() {
  // Enable CSS transitions after first load
  useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove('no-transition');
    }, 200);
  }, []);

  return (
    <Fragment>
      <Header />

      <main>
        <BooksProvider>
          <TableToolbar />
          <Table />
          <TablePagination />
        </BooksProvider>
      </main>
    </Fragment>
  );
}
