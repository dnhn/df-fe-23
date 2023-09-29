import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { IBook } from '@/src/types/book'
import { INITIAL_BOOKS } from '@/src/lib/data'
import { getLocalStorageItem, setLocalStorageItem } from '@/src/lib/utils'
import { BOOKS_DATA_KEY, BOOKS_PER_PAGE } from '@/src/lib/constants'

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

export const BooksProvider = ({ children }: { children: ReactNode }) => {
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
    () => setBooks((books) => ({ ...books, formOpen: true })),
    [setBooks],
  )

  const closeForm = useCallback(
    () => setBooks((books) => ({ ...books, formOpen: false })),
    [setBooks],
  )

  const toggleForm = useCallback(
    () => setBooks((books) => ({ ...books, formOpen: !books.formOpen })),
    [setBooks],
  )

  const addBook = useCallback(
    (book: IBook) =>
      setBooks((books) => ({ ...books, bookList: [...books.bookList, book] })),
    [setBooks],
  )

  const deleteBook = useCallback(
    (id: string) =>
      setBooks((books) => ({
        ...books,
        bookList: [
          ...books.bookList.filter(
            (book) => book.id.toString() !== id.toString(),
          ),
        ],
      })),
    [setBooks],
  )

  const setSearch = useCallback(
    (search: string) => setBooks((books) => ({ ...books, search })),
    [setBooks],
  )

  const setPage = useCallback(
    (page: number) => setBooks((books) => ({ ...books, page })),
    [setBooks],
  )

  const setPageSize = useCallback(
    (pageSize: number) => setBooks((books) => ({ ...books, pageSize })),
    [setBooks],
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
