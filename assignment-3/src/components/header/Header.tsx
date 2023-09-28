import { ThemeSwitch } from '../theme-switch'

import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.Header}>
      <a href="/" className={styles.Logo}>
        <h1>Bookstore</h1>
      </a>
      <div className={styles.HeaderRight}>
        <ThemeSwitch />
        <a
          href="https://github.com/dnhn/df-fe-23/tree/main/assignment-2"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.User}
        >
          GitHub
        </a>
      </div>
    </header>
  )
}
