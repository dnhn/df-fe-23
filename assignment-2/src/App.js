import { Fragment } from 'react';

import './App.css';

function App() {
  return (
    <Fragment>
      <header>
        <a href="index.html" className="logo">
          <h1>Bookstore</h1>
        </a>
        <a href="https://github.com/dnhn/df-fe-23/tree/main/assignment-1" target="_blank" rel="noreferrer noopener" className="user">GitHub</a>
      </header>

      <main>
        <div className="table-header">
          <div className="search">
            <input type="text" name="search" id="search" placeholder="Search" />
            <button type="button" className="search__clear">clear</button>
          </div>
          <button type="button" className="add-book btn btn--info">New book</button>
        </div>

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
              <tr className="row add-row">
                <td><input type="text" name="title" form="add-book-form" placeholder="Title" required /></td>
                <td><input type="text" name="author" form="add-book-form" placeholder="Author" required /></td>
                <td><select name="topic" form="add-book-form"></select></td>
                <td className="row__actions">
                  <button type="button" className="row__action btn btn--info">New book</button>
                  <form id="add-book-form">
                    <div className="row__confirm">
                      <button type="submit" className="row__confirm-action btn btn--primary">Save</button>
                      <button type="button" className="row__cancel btn">Cancel</button>
                    </div>
                  </form>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
    </Fragment>
  );
}

export default App;
