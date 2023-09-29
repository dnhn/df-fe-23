import { SyntheticEvent, useEffect, useRef, useState } from 'react'

import { BOOK_TOPICS } from '@/src/lib/data'
import { trimTrim } from '@/src/lib/utils'
import Button from '@/src/components/button'
import { useBooksContext } from './BooksContext'

import styles from './TableForm.module.css'

interface IFormSubmit {
  title: { value: string }
  author: { value: string }
  topic: { value: string }
}

export default function TableForm() {
  const { addBook, bookList, closeForm, formOpen, toggleForm } =
    useBooksContext()
  const formRef = useRef<HTMLFormElement>(null)
  const inputTitleRef = useRef<HTMLInputElement>(null)
  const [topics, setTopics] = useState<[string, string][]>([])

  // Generate topics
  useEffect(() => {
    setTopics(Object.entries(BOOK_TOPICS))
  }, [])

  // Reset form on open
  useEffect(() => {
    if (formOpen && formRef.current && inputTitleRef.current) {
      formRef.current.reset()
      inputTitleRef.current.focus()
    }
  }, [formOpen])

  // Reset form on submission
  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset()
      closeForm()
    }
  }, [bookList, closeForm])

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    const form = event.target as typeof event.target & IFormSubmit

    addBook({
      id: Date.now().toString(),
      title: trimTrim(form.title.value),
      author: trimTrim(form.author.value),
      topic: form.topic.value,
    })
  }

  const cancelForm = () => {
    if (formRef.current) {
      formRef.current.reset()
    }

    toggleForm()
  }

  return (
    <tr
      className={`${styles.Row} ${formOpen ? `${styles.RowConfirmMode}` : ''}`}
    >
      <td>&nbsp;</td>
      <td className="px-4 py-3">
        <input
          ref={inputTitleRef}
          type="text"
          name="title"
          form="add-book-form"
          aria-label="Title"
          placeholder="Title"
          required
          className="w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      </td>
      <td className="px-4 py-3">
        <input
          type="text"
          name="author"
          form="add-book-form"
          aria-label="Author"
          placeholder="Author"
          required
          className="w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
        />
      </td>
      <td className="px-4 py-3">
        <select
          name="topic"
          form="add-book-form"
          className="w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
        >
          {topics.map((topic, index) => (
            <option key={index} value={topic[0]}>
              {topic[1]}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-3 text-right">
        {formOpen ? (
          <form ref={formRef} id="add-book-form" onSubmit={handleFormSubmit}>
            <div className="flex justify-end gap-2">
              <Button type="submit" variant="primary">
                Save
              </Button>
              <Button onClick={cancelForm}>Cancel</Button>
            </div>
          </form>
        ) : (
          <Button variant="info" onClick={toggleForm}>
            New book
          </Button>
        )}
      </td>
    </tr>
  )
}
