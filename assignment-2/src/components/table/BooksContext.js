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

  toggleForm: () => {},
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

  const toggleForm = useCallback(
    () => setBooks({ ...books, formOpen: !books.formOpen }),
    [books, setBooks],
  );

  const memo = useMemo(
    () => ({
      list: books.list,
      formOpen: books.formOpen,

      toggleForm,
    }),
    [
      books.list,
      books.formOpen,

      toggleForm,
    ]
  );

  return (
    <BooksContext.Provider value={memo}>{children}</BooksContext.Provider>
  );
};
