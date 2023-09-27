import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { IBook } from '../../@types/book'
import { INITIAL_BOOKS } from '../../common/data'
import { getLocalStorageItem, setLocalStorageItem } from '../../common/utils'
import { BOOKS_DATA_KEY } from '../../common/constants'

interface IBooksValues {
  bookList: IBook[]
  search: string
  page: number
  formOpen: boolean
}

interface IBooksContext extends IBooksValues {
  openForm: VoidFunction
  closeForm: VoidFunction
  toggleForm: VoidFunction
  addBook: (book: IBook) => void
  deleteBook: (id: string) => void
  setSearch: (keyword: string) => void
  setPage: (page: number) => void
}

const initialState = {
  bookList: INITIAL_BOOKS,
  search: '',
  page: 0,
  formOpen: false,
}

const BooksContext = createContext<IBooksContext>({
  ...initialState,

  openForm: () => {},
  closeForm: () => {},
  toggleForm: () => {},
  addBook: () => {},
  deleteBook: () => {},
  setSearch: () => {},
  setPage: () => {},
})

export const useBooksContext = () => {
  const context = useContext<IBooksContext>(BooksContext)

  if (!context) {
    throw new Error('useBooksContext must be use within BooksProvider')
  }

  return context
}

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState<IBooksValues>(initialState)

  useEffect(() => {
    const storedData = getLocalStorageItem(BOOKS_DATA_KEY)

    if (storedData) {
      setBooks((books) => ({ ...books, bookList: [...storedData.bookList] }))
    }
  }, [])

  useEffect(() => {
    setLocalStorageItem(BOOKS_DATA_KEY, books)
  }, [books])

  const openForm = useCallback(
    () => setBooks({ ...books, formOpen: true }),
    [books, setBooks],
  )

  const closeForm = useCallback(
    () => setBooks({ ...books, formOpen: false }),
    [books, setBooks],
  )

  const toggleForm = useCallback(
    () => setBooks({ ...books, formOpen: !books.formOpen }),
    [books, setBooks],
  )

  const addBook = useCallback(
    (book: IBook) =>
      setBooks({ ...books, bookList: [...books.bookList, book] }),
    [books, setBooks],
  )

  const deleteBook = useCallback(
    (id: string) =>
      setBooks({
        ...books,
        bookList: [
          ...books.bookList.filter(
            (book) => book.id.toString() !== id.toString(),
          ),
        ],
      }),
    [books, setBooks],
  )

  const setSearch = useCallback(
    (keyword: string) => setBooks({ ...books, search: keyword }),
    [books, setBooks],
  )

  const setPage = useCallback(
    (page: number) => setBooks({ ...books, page }),
    [books, setBooks],
  )

  const memo = useMemo(
    () => ({
      bookList: books.bookList,
      search: books.search,
      page: books.page,
      formOpen: books.formOpen,

      openForm,
      closeForm,
      toggleForm,
      addBook,
      deleteBook,
      setSearch,
      setPage,
    }),
    [
      books.bookList,
      books.search,
      books.page,
      books.formOpen,

      openForm,
      closeForm,
      toggleForm,
      addBook,
      deleteBook,
      setSearch,
      setPage,
    ],
  )

  return <BooksContext.Provider value={memo}>{children}</BooksContext.Provider>
}
