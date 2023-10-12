'use client'

import useSWR from 'swr'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { Book } from '@/src/types/schema'
import { useBooksDialogContext } from '@/src/components/Books'
import { getBook } from '@/src/lib/api'
import { PATHS } from '@/src/lib/constants'
import Button from '@/src/components/Button'

export default function BookDetail({ id }: { id: number }) {
  const { showDeleteDialog } = useBooksDialogContext()
  const {
    data: book,
    error,
    isLoading,
  } = useSWR('view-book', () => getBook(id))

  if (error) {
    notFound()
  }

  const handleDelete = (book: Book) => {
    showDeleteDialog(book)
  }

  return isLoading ? (
    <div className="h-[20vh]">
      <h2 className="text-3xl">Loading book…</h2>
    </div>
  ) : (
    book && (
      <>
        <title>{`${book.data.name} – ${book.data.author}`}</title>
        <div className="mb-8 font-medium">
          <Link href={PATHS.BOOK.ROOT}>Books</Link>
          <span className="px-4">/</span>
          <span className="text-gray-500 dark:text-gray-400">
            {book.data.name}
          </span>
        </div>

        <div className="relative">
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-50 md:mr-56 md:text-5xl md:leading-tight">
            {book.data.name}
          </h2>
          <div className="mt-2 text-xl font-medium text-gray-600 dark:text-gray-200 md:mt-4 md:text-3xl">
            by {book.data.author}
          </div>
          <div className="mt-8 inline-block rounded-2xl bg-stone-300 px-3 py-1 text-black">
            {book.data.topic.name}
          </div>
          <div className="right-0 top-0 text-right max-md:mt-8 md:absolute">
            <Button
              variant="warning"
              size="large"
              onClick={() => handleDelete(book.data)}
            >
              Delete
            </Button>
          </div>
        </div>
      </>
    )
  )
}
