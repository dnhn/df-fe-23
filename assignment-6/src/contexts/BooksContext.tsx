'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { Book, Metadata } from '@/src/types/schema'

const BOOKS_PER_PAGE: number = 5

interface IBooksValues {
  bookStore: Book[]
  query: string
  metadata: Metadata
}

interface IBooksContext extends IBooksValues {
  setBookStore: (books: Book[]) => void
  setQuery: (query: string) => void
  setMetadata: (metadata: Metadata) => void
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
}

const initialMetadata = {
  page: 1,
  pageSize: BOOKS_PER_PAGE,
  totalPages: 0,
  totalRecords: 0,
}

const initialState: IBooksValues = {
  bookStore: [],
  query: '',
  metadata: initialMetadata,
}

const BooksContext = createContext<IBooksContext>({
  ...initialState,

  setBookStore: () => {},
  setQuery: () => {},
  setMetadata: () => {},
  setPage: () => {},
  setPageSize: () => {},
})

export const useBooksContext = () => {
  const context = useContext<IBooksContext>(BooksContext)

  if (!context) {
    throw new Error('useBooksContext must be used within BooksProvider')
  }

  return context
}

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [bookStore, setBookStore] = useState<Book[]>([])
  const [query, setQuery] = useState<string>('')
  const [metadata, setMetadata] = useState<Metadata>(initialMetadata)

  const setPageSize = useCallback(
    (pageSize: number) => setMetadata((data) => ({ ...data, pageSize })),
    [setMetadata],
  )

  const setPage = useCallback(
    (page: number) => setMetadata((data) => ({ ...data, page })),
    [setMetadata],
  )

  const memo = useMemo(
    () => ({
      bookStore,
      query,
      metadata,

      setBookStore,
      setQuery,
      setMetadata,
      setPage,
      setPageSize,
    }),
    [
      bookStore,
      query,
      metadata,
      setBookStore,
      setQuery,
      setMetadata,
      setPage,
      setPageSize,
    ],
  )

  return <BooksContext.Provider value={memo}>{children}</BooksContext.Provider>
}
