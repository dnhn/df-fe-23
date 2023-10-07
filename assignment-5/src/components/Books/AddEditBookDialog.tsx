import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { trimTrim } from '@/src/lib/utils'
import { BOOK_TOPICS } from '@/src/lib/data'
import Dialog from '@/src/components/Dialog'
import { useBooksContext } from './BooksContext'
import { DIALOG_TYPE, useBooksDialogContext } from './BooksDialogContext'

interface IFormValues {
  id: string
  title: string
  author: string
  topic: string
}

export default function AddEditBookDialog() {
  const { addBook, editBook } = useBooksContext()
  const { dialogProps, dialogType, hideDialogs } = useBooksDialogContext()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<IFormValues>({
    defaultValues: {
      id: dialogProps?.book.id ?? '',
      title: dialogProps?.book.title ?? '',
      author: dialogProps?.book?.author ?? '',
      topic: dialogProps?.book?.topic ?? '',
    },
  })

  useEffect(() => {
    const dialog = dialogRef.current

    dialog?.addEventListener('close', hideDialogs)

    return () => dialog?.removeEventListener('close', hideDialogs)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (dialogType === DIALOG_TYPE.ADD || dialogType === DIALOG_TYPE.EDIT) {
      handleShow()
    } else {
      handleHide()
    }
  }, [dialogType])

  const formSubmit: SubmitHandler<IFormValues> = async (data) => {
    if (dialogType === DIALOG_TYPE.EDIT) {
      // Simulate latency
      await new Promise((resolve) => setTimeout(resolve, 1000)) // eslint-disable-line no-promise-executor-return

      await editBook({
        id: data.id,
        title: trimTrim(data.title),
        author: trimTrim(data.author),
        topic: data.topic,
      })
    } else {
      // Simulate latency
      await new Promise((resolve) => setTimeout(resolve, 1000)) // eslint-disable-line no-promise-executor-return

      await addBook({
        id: Date.now().toString(),
        title: trimTrim(data.title),
        author: trimTrim(data.author),
        topic: data.topic,
      })
    }

    handleHide()
  }

  const handleShow = () => dialogRef?.current?.showModal()

  const handleHide = () => dialogRef?.current?.close()

  return (
    <Dialog
      ref={dialogRef}
      title={dialogType === DIALOG_TYPE.EDIT ? 'Edit book' : 'Add new book'}
      actions={[
        {
          type: 'submit',
          variant: 'primary',
          form: 'add-book-form',
          disabled: isSubmitting,
          className: 'flex-1',
          label: isSubmitting
            ? 'Saving…'
            : `${
                dialogType === DIALOG_TYPE.EDIT ? 'Update book' : 'Save book'
              }`,
        },
        {
          type: 'reset',
          form: 'add-book-form',
          disabled: isSubmitting,
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
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="form-title">
            <div className="mb-2 text-sm">Title</div>
            <input
              {...register('title')}
              type="text"
              id="form-title"
              placeholder="Title"
              required
              disabled={isSubmitting}
              autoCapitalize="words"
              className="w-full rounded-[.25rem] border-transparent bg-gray-100 text-black focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </label>
          <label htmlFor="form-author">
            <div className="mb-2 text-sm">Author</div>
            <input
              {...register('author')}
              type="text"
              id="form-author"
              placeholder="Author"
              required
              disabled={isSubmitting}
              autoCapitalize="words"
              className="w-full rounded-[.25rem] border-transparent bg-gray-100 text-black focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </label>
          <label htmlFor="form-topic">
            <div className="mb-2 text-sm">Topic</div>
            <select
              {...register('topic')}
              id="form-topic"
              required
              disabled={isSubmitting}
              className="w-full rounded-[.25rem] border-transparent bg-gray-100 text-black focus:border-gray-500 focus:bg-white focus:ring-0"
            >
              <option value="">Select a topic</option>
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
