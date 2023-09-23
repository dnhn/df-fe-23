import './TableToolbar.css';

export default function TableToolbar() {
  return (
    <div className="table-toolbar">
      <div className="search">
        <input type="text" name="search" id="search" placeholder="Search" />
        <button type="button" className="search__clear">clear</button>
      </div>
      <button type="button" className="add-book btn btn--info">New book</button>
    </div>
  );
}
