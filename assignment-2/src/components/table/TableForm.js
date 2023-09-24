import { useEffect, useState } from "react";

import { useBooksContext } from "./BooksContext";
import { BOOK_TOPICS } from "../../common/data";

import Button from "../Button";

export default function TableForm() {
  const [topics, setTopics] = useState([]);
  const { formOpen, toggleForm } = useBooksContext();

  useEffect(() => {
    setTopics(Object.entries(BOOK_TOPICS));
  }, []);

  return (
    <tr className={`row add-row ${formOpen ? 'row--confirm' : ''}`}>
      <td><input type="text" name="title" form="add-book-form" placeholder="Title" required /></td>
      <td><input type="text" name="author" form="add-book-form" placeholder="Author" required /></td>
      <td>
        <select name="topic" form="add-book-form">
          {topics.map((topic, index) => <option key={index} value={topic[0]}>{topic[1]}</option>)}
        </select>
      </td>
      <td className="row__actions">
        {formOpen ?
          <form id="add-book-form">
            <div className="row__confirm">
              <Button type="submit" variant="primary">Save</Button>
              <Button type="reset" onClick={toggleForm}>Cancel</Button>
            </div>
          </form>
          :
          <Button variant="info" onClick={toggleForm}>New book</Button>
        }
      </td>
    </tr>
  );
}
