'use client'

import { redirect } from 'next/navigation'
import Link from 'next/link'

import { useBooksContext } from '@/src/components/books'
import { BOOK_TOPICS } from '@/src/lib/data'
import Button from '@/src/components/button'
import { useState } from 'react'

export default function ViewBook({
  params: { id },
}: {
  params: { id: string }
}) {
  const { bookList, deleteBook } = useBooksContext()
  const [confirmation, setConfirmation] = useState<boolean>(false)
  const result = bookList.filter((book) => book.id === id)

  if (result.length === 0) {
    redirect('/')
  }

  return (
    <section className="mx-auto w-[60rem] max-w-full">
      <div className="mb-8 font-medium">
        <Link href="/book">Books</Link>
        <span className="px-4">/</span>
        <span className="text-gray-500 dark:text-gray-400">
          {result[0].title}
        </span>
      </div>
      <div className="relative">
        <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-50 md:mr-56 md:text-5xl md:leading-tight">
          {result[0].title}
        </h2>
        <div className="mt-2 text-xl font-medium text-gray-600 dark:text-gray-200 md:mt-4 md:text-3xl">
          by {result[0].author}
        </div>
        <div className="mt-8 inline-block rounded-2xl bg-stone-300 px-3 py-1 text-black">
          {BOOK_TOPICS[result[0].topic]}
        </div>
        <div className="right-0 top-0 text-right max-md:mt-8 md:absolute">
          {confirmation ? (
            <>
              <Button size="large" onClick={() => deleteBook(result[0].id)}>
                Confirm
              </Button>
              <Button
                variant="error"
                size="large"
                onClick={() => setConfirmation(false)}
                className="ml-2"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="warning"
              size="large"
              onClick={() => setConfirmation(true)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
