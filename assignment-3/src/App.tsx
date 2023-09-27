import { useEffect } from 'react'

import { Header } from './components/header'
import { BooksProvider, Table } from './components/books'

import './components/button/Button.css'
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
          <Table />
        </BooksProvider>
      </main>
    </>
  )
}
