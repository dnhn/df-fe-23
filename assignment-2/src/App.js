import { Fragment, useEffect } from 'react';

import Header from './components/Header';
import { BooksProvider } from './components/table/BooksContext';
import TableToolbar from "./components/table/TableToolbar";
import Table from "./components/table/Table";
import TablePagination from './components/table/TablePagination';

import './components/Button.css';
import './App.css';

export default function App() {
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
