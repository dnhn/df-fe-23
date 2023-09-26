import { useEffect, useRef, useState } from "react";

import { useBooksContext } from "./BooksContext";
import { BOOK_TOPICS } from "../../common/data";
import Button from "../button";

export default function TableForm() {
  const { addBook, bookList, closeForm, formOpen, toggleForm } = useBooksContext();
  const formRef = useRef();
  const [topics, setTopics] = useState([]);

  // Generate topics
  useEffect(() => {
    setTopics(Object.entries(BOOK_TOPICS));
  }, []);

  // Reset form on open
  useEffect(() => {
    if (formOpen && formRef.current) {
      formRef.current.reset();
      formRef.current[0].focus();
    }
  }, [formOpen]);

  // Reset form on submission
  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
      closeForm();
    }
  }, [bookList]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    addBook({
      id: Date.now(),
      title: form.title.value,
      author: form.author.value,
      topic: form.topic.value,
    });
  };

  const cancelForm = () => {
    formRef.current.reset();
    toggleForm();
  };

  return (
    <tr className={`row add-row ${formOpen ? 'row--confirm' : ''}`}>
      <td></td>
      <td><input type="text" name="title" form="add-book-form" placeholder="Title" required /></td>
      <td><input type="text" name="author" form="add-book-form" placeholder="Author" required /></td>
      <td>
        <select name="topic" form="add-book-form">
          {topics.map((topic, index) => <option key={index} value={topic[0]}>{topic[1]}</option>)}
        </select>
      </td>
      <td className="row__actions">
        {formOpen ?
          <form ref={formRef} id="add-book-form" onSubmit={handleFormSubmit}>
            <div className="row__confirm">
              <Button type="submit" variant="primary">Save</Button>
              <Button onClick={cancelForm}>Cancel</Button>
            </div>
          </form>
        :
          <Button variant="info" onClick={toggleForm}>New book</Button>
        }
      </td>
    </tr>
  );
}
