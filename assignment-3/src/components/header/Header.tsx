import { ThemeSwitch } from '../theme-switch'

import './Header.css'

export function Header() {
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <h1>Bookstore</h1>
      </a>
      <div className="header__right">
        <ThemeSwitch />
        <a
          href="https://github.com/dnhn/df-fe-23/tree/main/assignment-2"
          target="_blank"
          rel="noreferrer noopener"
          className="header__user"
        >
          GitHub
        </a>
      </div>
    </header>
  )
}
