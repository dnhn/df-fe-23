'use client'

import { DIALOG_TYPE, useBooksDialogContext } from './BooksDialogContext'
import AddDialog from './AddBookDialog'
import DeleteDialog from './DeleteBookDialog'

export default function DialogRenderer() {
  const { dialogType } = useBooksDialogContext()

  return (
    <>
      {dialogType === DIALOG_TYPE.ADD && <AddDialog />}
      {dialogType === DIALOG_TYPE.DELETE && <DeleteDialog />}
    </>
  )
}
