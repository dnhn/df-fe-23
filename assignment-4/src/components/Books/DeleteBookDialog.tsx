import { useEffect, useRef } from 'react'

import Dialog from '@/src/components/Dialog'
import { useBooksContext } from './BooksContext'
import { DIALOG_TYPE, useBooksDialogContext } from './BooksDialogContext'

export default function DeleteBookDialog() {
  const { deleteBook } = useBooksContext()
  const { dialogType, deleteProps, hideDialogs } = useBooksDialogContext()
  const dialogRef = useRef<HTMLDialogElement>(null)

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

  const handleDelete = () => {
    deleteBook(deleteProps?.bookId ?? '')
    dialogRef?.current?.close()
  }

  const handleShow = () => dialogRef?.current?.showModal()

  const handleHide = () => dialogRef?.current?.close()

  return (
    <Dialog
      ref={dialogRef}
      title="Delete book"
      actions={[
        {
          onClick: handleHide,
          className: 'flex-1',
          label: 'Cancel',
        },
        {
          variant: 'error',
          onClick: handleDelete,
          className: 'flex-1',
          label: 'OK',
        },
      ]}
    >
      <p>
        Do you want to delete the book{' '}
        <span className="font-medium italic">
          {deleteProps?.bookTitle ?? ''}
        </span>
        ?
      </p>
    </Dialog>
  )
}
