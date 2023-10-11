import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSWRConfig } from 'swr'

import { PATHS } from '@/src/lib/constants'
import Dialog from '@/src/components/Dialog'
import {
  DIALOG_TYPE,
  useBooksDialogContext,
} from '@/src/contexts/BooksDialogContext'
import { deleteBook } from '@/src/lib/api'

export default function DeleteBookDialog() {
  const { mutate } = useSWRConfig()
  const router = useRouter()
  const pathname = usePathname()
  const { dialogProps, dialogType, hideDialogs } = useBooksDialogContext()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [error, setError] = useState<string | null>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    const dialog = dialogRef.current

    dialog?.addEventListener('close', hideDialogs)

    return () => dialog?.removeEventListener('close', hideDialogs)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (dialogType === DIALOG_TYPE.DELETE) {
      handleShow()
    } else {
      handleHide()
    }
  }, [dialogType])

  const handleDelete = async () => {
    setError(null)
    setIsSubmitting(true)

    try {
      if (dialogProps) {
        await deleteBook(dialogProps.book.id)
        mutate('books')

        if (pathname === PATHS.BOOK.VIEW(dialogProps.book.id)) {
          router.replace(PATHS.BOOK.ROOT)
        }
      }

      dialogRef?.current?.close()
    } catch (error) {
      setError(error.message)
      setIsSubmitting(false)
    }
  }

  const handleShow = () => dialogRef?.current?.showModal()
  const handleHide = () => dialogRef?.current?.close()

  return (
    <Dialog
      ref={dialogRef}
      title="Delete book"
      actions={[
        {
          disabled: isSubmitting,
          onClick: handleHide,
          className: 'flex-1',
          label: 'Cancel',
        },
        {
          variant: 'error',
          disabled: isSubmitting,
          onClick: handleDelete,
          className: 'flex-1',
          label: isSubmitting ? 'Deleting…' : 'OK',
        },
      ]}
    >
      <p>
        Do you want to delete the book{' '}
        <span className="font-medium italic">
          {dialogProps?.book.name ?? ''}
        </span>
        ?
      </p>

      {error && (
        <div className="mt-4 rounded bg-amber-500 p-2 text-sm text-black">
          {error}
        </div>
      )}
    </Dialog>
  )
}
