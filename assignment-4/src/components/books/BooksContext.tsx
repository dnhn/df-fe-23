'use client'

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
  formOpen: boolean
  search: string
  pageIndex: number
  pageSize: number
}

interface IBooksContext extends IBooksValues {
  openForm: VoidFunction
  closeForm: VoidFunction
  toggleForm: VoidFunction
  addBook: (book: IBook) => void
  deleteBook: (id: string) => void
  setSearch: (search: string) => void
  setPageIndex: (pageIndex: number) => void
  setPageSize: (page: number) => void
}

const initialState = {
  bookList: INITIAL_BOOKS,
  formOpen: false,
  search: '',
  pageIndex: 0,
  pageSize: BOOKS_PER_PAGE,
}

const BooksContext = createContext<IBooksContext>({
  ...initialState,

  openForm: () => {},
  closeForm: () => {},
  toggleForm: () => {},
  addBook: () => {},
  deleteBook: () => {},
  setSearch: () => {},
  setPageIndex: () => {},
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
  const [bookList, setBookList] = useState<IBook[]>(INITIAL_BOOKS)
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(BOOKS_PER_PAGE)

  useEffect(() => {
    const storedData = getLocalStorageItem(BOOKS_DATA_KEY)

    if (storedData) {
      setBookList(storedData.bookList || INITIAL_BOOKS)
      setPageSize(storedData.pageSize || BOOKS_PER_PAGE)
    }
  }, [])

  useEffect(() => {
    setLocalStorageItem(BOOKS_DATA_KEY, { bookList, pageSize })
  }, [bookList, pageSize])

  const openForm = useCallback(() => setFormOpen(true), [setFormOpen])

  const closeForm = useCallback(() => setFormOpen(false), [setFormOpen])

  const toggleForm = useCallback(
    () => setFormOpen((state) => !state),
    [setFormOpen],
  )

  const addBook = useCallback(
    (book: IBook) => setBookList((books) => [book, ...books]),
    [setBookList],
  )

  const deleteBook = useCallback(
    (id: string) =>
      setBookList((books) => books.filter((book) => book.id !== id)),
    [setBookList],
  )

  const memo = useMemo(
    () => ({
      bookList,
      formOpen,
      search,
      pageIndex,
      pageSize,

      openForm,
      closeForm,
      toggleForm,
      addBook,
      deleteBook,
      setSearch,
      setPageIndex,
      setPageSize,
    }),
    [
      bookList,
      formOpen,
      search,
      pageIndex,
      pageSize,

      openForm,
      closeForm,
      toggleForm,
      addBook,
      deleteBook,
      setSearch,
      setPageIndex,
      setPageSize,
    ],
  )

  return <BooksContext.Provider value={memo}>{children}</BooksContext.Provider>
}
