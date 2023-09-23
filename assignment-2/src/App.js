import { Fragment } from 'react';

import Header from './components/Header';

import TableToolbar from "./components/table/TableToolbar";
import Table from "./components/table/Table";

import './components/Button.css';
import './App.css';

function App() {
  return (
    <Fragment>
      <Header />

      <main>
        <TableToolbar />
        <Table />
      </main>
    </Fragment>
  );
}

export default App;
