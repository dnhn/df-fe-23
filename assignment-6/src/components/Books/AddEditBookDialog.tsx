import { useEffect, useRef } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { trimTrim } from '@/src/lib/utils'
import Dialog from '@/src/components/Dialog'
import {
  DIALOG_TYPE,
  useBooksDialogContext,
} from '@/src/contexts/BooksDialogContext'
import { createBook, getTopics, updateBook } from '@/src/lib/api'

export default function AddEditBookDialog() {
  const { mutate } = useSWRConfig()
  const { dialogProps, dialogType, hideDialogs } = useBooksDialogContext()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { data: topics, error, isLoading } = useSWR('topics', getTopics)

  const schema = z.object({
    name: z
      .string()
      .min(5, { message: 'Title must be at least 5 characters.' }),
    author: z.string().regex(/^[A-Za-z][A-Za-z\s]*$/, {
      message: 'Name contains letters and spaces only.',
    }),
    topicId: z
      .string()
      .refine(
        (value) =>
          topics?.data.find((topic) => topic.id === parseInt(value, 10)),
        {
          message: 'Topic is required.',
        },
      ),
  })

  type Schema = z.infer<typeof schema>

  const {
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: dialogProps?.book.name ?? '',
      author: dialogProps?.book?.author ?? '',
      topicId: dialogProps?.book?.topic.id.toString() ?? '',
    },
  })

  useEffect(() => {
    const dialog = dialogRef.current

    dialog?.addEventListener('close', hideDialogs)

    return () => dialog?.removeEventListener('close', hideDialogs)
  }, [hideDialogs])

  useEffect(() => {
    if (dialogType === DIALOG_TYPE.ADD || dialogType === DIALOG_TYPE.EDIT) {
      handleShow()
    } else {
      handleHide()
    }
  }, [dialogType])

  const formSubmit: SubmitHandler<Schema> = async (data) => {
    try {
      if (dialogType === DIALOG_TYPE.EDIT && dialogProps) {
        // Dirty to prevent submission of unchanged data
        if (isDirty) {
          await updateBook(dialogProps.book.id, {
            name: trimTrim(data.name),
            author: trimTrim(data.author),
            topicId: parseInt(data.topicId, 10),
          })
          mutate('books')
        }
      } else {
        await createBook({
          name: trimTrim(data.name),
          author: trimTrim(data.author),
          topicId: parseInt(data.topicId, 10),
        })
        mutate('books')
      }

      handleHide()
    } catch (error) {
      setError('root', { message: error.message })
    }
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
        id="add-book-form"
        method="dialog"
        noValidate
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="flex flex-col gap-4">
          {errors.root && (
            <div className="rounded bg-amber-500 p-2 text-sm text-black">
              {errors.root.message}
            </div>
          )}
          <label htmlFor="form-name" className="relative">
            <div className="mb-2 text-sm">Name</div>
            <input
              {...register('name')}
              type="text"
              id="form-name"
              placeholder="Book name"
              disabled={isSubmitting}
              autoCapitalize="words"
              className={`peer w-full rounded-[.25rem] bg-gray-100 text-black focus:bg-white focus:ring-0 ${
                errors.name
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-orange-400 dark:focus:ring-orange-400'
                  : 'border-transparent focus:border-gray-500'
              }`}
            />
            {errors.name && (
              <p className="pointer-events-none absolute left-0 top-[95%] z-[1] select-none rounded bg-orange-600 p-1 text-xs font-medium text-white opacity-0 transition-all peer-focus:top-[calc(100%+.125rem)] peer-focus:opacity-100 dark:bg-amber-100 dark:text-red-600">
                {errors.name.message}
              </p>
            )}
          </label>
          <label htmlFor="form-author" className="relative">
            <div className="mb-2 text-sm">Author</div>
            <input
              {...register('author')}
              type="text"
              id="form-author"
              placeholder="Author name"
              disabled={isSubmitting}
              autoCapitalize="words"
              className={`peer w-full rounded-[.25rem] bg-gray-100 text-black focus:bg-white focus:ring-0 ${
                errors.author
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-orange-400 dark:focus:ring-orange-400'
                  : 'border-transparent focus:border-gray-500'
              }`}
            />
            {errors.author && (
              <p className="pointer-events-none absolute left-0 top-[95%] z-[1] select-none rounded bg-orange-600 p-1 text-xs font-medium text-white opacity-0 transition-all peer-focus:top-[calc(100%+.125rem)] peer-focus:opacity-100 dark:bg-amber-100 dark:text-red-600">
                {errors.author.message}
              </p>
            )}
          </label>
          <label htmlFor="form-topic" className="relative">
            <div className="mb-2 text-sm">Topic</div>
            <select
              {...register('topicId')}
              id="form-topic"
              disabled={isSubmitting}
              className={`peer w-full rounded-[.25rem] bg-gray-100 text-black focus:bg-white focus:ring-0 ${
                errors.topicId
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-orange-400 dark:focus:ring-orange-400'
                  : 'border-transparent focus:border-gray-500'
              }`}
            >
              <option value="">Select a topic</option>
              {!isLoading &&
                !error &&
                topics &&
                topics.data.map((topic, index) => (
                  <option key={index} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
            </select>
            {errors.topicId && (
              <p className="pointer-events-none absolute left-0 top-[95%] z-[1] select-none rounded bg-orange-600 p-1 text-xs font-medium text-white opacity-0 transition-all peer-focus:top-[calc(100%+.125rem)] peer-focus:opacity-100 dark:bg-amber-100 dark:text-red-600">
                {errors.topicId.message}
              </p>
            )}
          </label>
        </div>
      </form>
    </Dialog>
  )
}
