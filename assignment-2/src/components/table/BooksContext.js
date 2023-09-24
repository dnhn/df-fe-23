import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { INITIAL_BOOKS } from "../../common/data";
import { getLocalStorageItem } from "../../common/utils";
import { BOOKS_DATA_KEY } from "../../common/constants";

const defaultData = {
  list: INITIAL_BOOKS,
};

export const BooksContext = createContext({
  ...defaultData,
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

  const memo = useMemo(
    () => ({
      list: books.list,
    }),
    [
      books.list,
    ]
  );

  return (
    <BooksContext.Provider value={memo}>{children}</BooksContext.Provider>
  );
};
