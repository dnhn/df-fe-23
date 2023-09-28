import { useEffect, useState } from 'react'

import { useBooksContext } from './BooksContext'
import { trimTrim } from '../../common/utils'
import { Button } from '../button'

import styles from './TableToolbar.module.css'

export function TableToolbar() {
  const { bookList, setSearch, toggleForm } = useBooksContext()
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    let typeTimeout

    if (bookList.length) {
      typeTimeout = setTimeout(() => setSearch(trimTrim(keyword)), 300)
    }

    return () => {
      clearTimeout(typeTimeout)
    }
  }, [bookList, keyword, setSearch])

  return (
    <div className={styles.Toolbar}>
      <div className={styles.Search}>
        <input
          type="text"
          placeholder="Search"
          value={keyword}
          onInput={(event) =>
            setKeyword((event.target as HTMLInputElement).value)
          }
          className={styles.SearchInput}
        />
        <button
          type="button"
          className={styles.SearchClear}
          onClick={() => setKeyword('')}
        >
          clear
        </button>
      </div>
      <Button variant="info" onClick={toggleForm}>
        New book
      </Button>
    </div>
  )
}
