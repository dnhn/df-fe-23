import { useEffect } from 'react'

import { Header } from './components/header'
import {
  BooksProvider,
  Table,
  TablePagination,
  TableToolbar,
} from './components/books'

import './App.css'

export default function App() {
  // Enable CSS transitions after first load
  useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove('no-transition')
    }, 200)
  }, [])

  return (
    <>
      <Header />

      <main>
        <BooksProvider>
          <TableToolbar />
          <Table />
          <TablePagination />
        </BooksProvider>
      </main>
    </>
  )
}
