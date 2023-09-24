import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { INITIAL_BOOKS } from "../../common/data";
import { getLocalStorageItem } from "../../common/utils";
import { BOOKS_DATA_KEY } from "../../common/constants";

const defaultData = {
  list: INITIAL_BOOKS,
  formOpen: false,
};

export const BooksContext = createContext({
  ...defaultData,

  openForm: () => {},
  closeForm: () => {},
  toggleForm: () => {},
  addBook: () => {},
});

export const useBooksContext = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooksContext must be use within BooksProvider");
  }

  return context;
};

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(defaultData);

  useEffect(() => {
    const storedData = getLocalStorageItem(BOOKS_DATA_KEY);

    if (storedData) {
      setBooks(storedData);
    }
  }, []);

  const openForm = useCallback(
    () => setBooks({ ...books, formOpen: true }),
    [books, setBooks],
  );

  const closeForm = useCallback(
    () => setBooks({ ...books, formOpen: false }),
    [books, setBooks],
  );

  const toggleForm = useCallback(
    () => setBooks({ ...books, formOpen: !books.formOpen }),
    [books, setBooks],
  );

  const addBook = useCallback(
    book => setBooks({ ...books, list: [...books.list, book] }),
    [books, setBooks],
  );

  const memo = useMemo(
    () => ({
      list: books.list,
      formOpen: books.formOpen,

      openForm,
      closeForm,
      toggleForm,
      addBook,
    }),
    [
      books.list,
      books.formOpen,

      openForm,
      closeForm,
      toggleForm,
      addBook,
    ]
  );

  return (
    <BooksContext.Provider value={memo}>{children}</BooksContext.Provider>
  );
};
