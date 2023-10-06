import { FormEvent, useEffect, useRef } from 'react'

import { trimTrim } from '@/src/lib/utils'
import { BOOK_TOPICS } from '@/src/lib/data'
import Dialog from '@/src/components/Dialog'
import { useBooksContext } from './BooksContext'
import { DIALOG_TYPE, useBooksDialogContext } from './BooksDialogContext'

interface IFormSubmit {
  title: { value: string }
  author: { value: string }
  topic: { value: string }
}

export default function AddBookDialog() {
  const { addBook } = useBooksContext()
  const { dialogType, hideDialogs } = useBooksDialogContext()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    dialog?.addEventListener('close', hideDialogs)

    return () => dialog?.removeEventListener('close', hideDialogs)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (dialogType === DIALOG_TYPE.ADD) {
      handleShow()
    } else {
      handleHide()
    }
  }, [dialogType])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.target as typeof event.target & IFormSubmit

    addBook({
      id: Date.now().toString(),
      title: trimTrim(form.title.value),
      author: trimTrim(form.author.value),
      topic: form.topic.value,
    })

    formRef?.current?.reset()
    dialogRef?.current?.close()
  }

  const handleShow = () => dialogRef?.current?.showModal()

  const handleHide = () => dialogRef?.current?.close()

  return (
    <Dialog
      ref={dialogRef}
      title="Add new book"
      actions={[
        {
          type: 'submit',
          variant: 'primary',
          form: 'add-book-form',
          className: 'flex-1',
          label: 'Save book',
        },
        {
          type: 'reset',
          form: 'add-book-form',
          className: 'flex-1',
          onClick: handleHide,
          label: 'Cancel',
        },
      ]}
    >
      <form
        ref={formRef}
        id="add-book-form"
        method="dialog"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="form-title">
            <div className="mb-2 text-sm">Title</div>
            <input
              type="text"
              name="title"
              id="form-title"
              placeholder="Title"
              required
              autoCapitalize="words"
              className="w-full rounded-[.25rem] border-transparent bg-gray-100 text-black focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </label>
          <label htmlFor="form-author">
            <div className="mb-2 text-sm">Author</div>
            <input
              type="text"
              name="author"
              id="form-author"
              placeholder="Author"
              required
              autoCapitalize="words"
              className="w-full rounded-[.25rem] border-transparent bg-gray-100 text-black focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </label>
          <label htmlFor="form-topic">
            <div className="mb-2 text-sm">Topic</div>
            <select
              name="topic"
              id="form-topic"
              required
              className="w-full rounded-[.25rem] border-transparent bg-gray-100 text-black focus:border-gray-500 focus:bg-white focus:ring-0"
            >
              {Object.entries(BOOK_TOPICS).map((topic, index) => (
                <option key={index} value={topic[0]}>
                  {topic[1]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>
    </Dialog>
  )
}
