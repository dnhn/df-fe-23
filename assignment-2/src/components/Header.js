import './Header.css';

export default function Header() {
  return (
    <header>
      <a href="/" className="logo">
        <h1>Bookstore</h1>
      </a>
      <a href="https://github.com/dnhn/df-fe-23/tree/main/assignment-2" target="_blank" rel="noreferrer noopener" className="user">GitHub</a>
    </header>
  );
}
