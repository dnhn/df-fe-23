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
import { BOOKS_DATA_KEY, BOOKS_PER_PAGE } from '../../common/constants'

interface IBooksValues {
  bookList: IBook[]
  search: string
  page: number
  pageSize: number
  formOpen: boolean
}

interface IBooksContext extends IBooksValues {
  openForm: VoidFunction
  closeForm: VoidFunction
  toggleForm: VoidFunction
  addBook: (book: IBook) => void
  deleteBook: (id: string) => void
  setSearch: (search: string) => void
  setPage: (page: number) => void
  setPageSize: (page: number) => void
}

const initialState = {
  bookList: INITIAL_BOOKS,
  search: '',
  page: 0,
  pageSize: BOOKS_PER_PAGE,
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
  setPageSize: () => {},
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
      setBooks((books) => ({
        ...books,
        bookList: [...storedData.bookList],
        pageSize: storedData.pageSize,
      }))
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
    (search: string) => setBooks({ ...books, search }),
    [books, setBooks],
  )

  const setPage = useCallback(
    (page: number) => setBooks({ ...books, page }),
    [books, setBooks],
  )

  const setPageSize = useCallback(
    (pageSize: number) => setBooks({ ...books, pageSize }),
    [books, setBooks],
  )

  const memo = useMemo(
    () => ({
      bookList: books.bookList,
      search: books.search,
      page: books.page,
      pageSize: books.pageSize,
      formOpen: books.formOpen,

      openForm,
      closeForm,
      toggleForm,
      addBook,
      deleteBook,
      setSearch,
      setPage,
      setPageSize,
    }),
    [
      books.bookList,
      books.search,
      books.page,
      books.pageSize,
      books.formOpen,

      openForm,
      closeForm,
      toggleForm,
      addBook,
      deleteBook,
      setSearch,
      setPage,
      setPageSize,
    ],
  )

  return <BooksContext.Provider value={memo}>{children}</BooksContext.Provider>
}
