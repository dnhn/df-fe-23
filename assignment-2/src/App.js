import { Fragment } from 'react';

import Header from './components/Header';
import { BooksProvider } from './components/table/BooksContext';
import TableToolbar from "./components/table/TableToolbar";
import Table from "./components/table/Table";

import './components/Button.css';
import './App.css';

export default function App() {
  return (
    <Fragment>
      <Header />

      <main>
        <BooksProvider>
          <TableToolbar />
          <Table />
        </BooksProvider>
      </main>
    </Fragment>
  );
}
