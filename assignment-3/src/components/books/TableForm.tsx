import { SyntheticEvent, useEffect, useRef, useState } from 'react'

import { useBooksContext } from './BooksContext'
import { BOOK_TOPICS } from '../../common/data'
import { trimTrim } from '../../common/utils'
import { Button } from '../button'

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
  }, [bookList]) // eslint-disable-line react-hooks/exhaustive-deps

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
    <tr className={`row add-row ${formOpen ? 'row--confirm' : ''}`}>
      <td>&nbsp;</td>
      <td>
        <input
          ref={inputTitleRef}
          type="text"
          name="title"
          form="add-book-form"
          aria-label="Title"
          placeholder="Title"
          required
        />
      </td>
      <td>
        <input
          type="text"
          name="author"
          form="add-book-form"
          aria-label="Author"
          placeholder="Author"
          required
        />
      </td>
      <td>
        <select name="topic" form="add-book-form">
          {topics.map((topic, index) => (
            <option key={index} value={topic[0]}>
              {topic[1]}
            </option>
          ))}
        </select>
      </td>
      <td className="row__actions">
        {formOpen ? (
          <form ref={formRef} id="add-book-form" onSubmit={handleFormSubmit}>
            <div className="row__confirm">
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
