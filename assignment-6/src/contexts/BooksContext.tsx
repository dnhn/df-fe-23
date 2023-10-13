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

import { Metadata } from '@/src/types/schema'
import { useAuthContext } from '@/src/auth/AuthContext'

const BOOKS_PER_PAGE = 5

interface IBooksValues {
  query: string
  metadata: Metadata
}

interface IBooksContext extends IBooksValues {
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
  query: '',
  metadata: initialMetadata,
}

const BooksContext = createContext<IBooksContext>({
  ...initialState,

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
  const { auth } = useAuthContext()
  const [query, setQuery] = useState('')
  const [metadata, setMetadata] = useState<Metadata>(initialMetadata)

  const setPageSize = useCallback(
    (pageSize: number) => setMetadata((data) => ({ ...data, pageSize })),
    [setMetadata],
  )

  const setPage = useCallback(
    (page: number) => setMetadata((data) => ({ ...data, page })),
    [setMetadata],
  )

  useEffect(() => {
    setPageSize(BOOKS_PER_PAGE)
    setPage(1)
  }, [auth, setPage, setPageSize])

  const memo = useMemo(
    () => ({
      query,
      metadata,

      setQuery,
      setMetadata,
      setPage,
      setPageSize,
    }),
    [query, metadata, setQuery, setMetadata, setPage, setPageSize],
  )

  return <BooksContext.Provider value={memo}>{children}</BooksContext.Provider>
}
