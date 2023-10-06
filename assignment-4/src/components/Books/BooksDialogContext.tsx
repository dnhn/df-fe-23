'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { IBook } from '@/src/types/book'

export enum DIALOG_TYPE {
  ADD = 'add',
  DELETE = 'delete',
}

interface IDialogValues {
  dialogType?: string | 'add' | 'delete'
  deleteProps?: {
    bookId: string
    bookTitle: string
  }
}

interface IDialogContext extends IDialogValues {
  showAddDialog: () => void
  showDeleteDialog: (book: IBook) => void
  hideDialogs: () => void
}

const BooksDialogContext = createContext<IDialogContext>({
  showAddDialog: () => {},
  showDeleteDialog: () => {},
  hideDialogs: () => {},
})

export const useBooksDialogContext = () => {
  const context = useContext<IDialogContext>(BooksDialogContext)

  if (!context) {
    throw new Error('useDialogContext must be used within DialogProvider')
  }

  return context
}

export const BooksDialogProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<IDialogValues>({})

  const showAddDialog = useCallback(
    () => setState({ dialogType: DIALOG_TYPE.ADD }),
    [setState],
  )

  const showDeleteDialog = useCallback(
    (book: IBook) =>
      setState({
        dialogType: DIALOG_TYPE.DELETE,
        deleteProps: { bookId: book.id, bookTitle: book.title },
      }),
    [setState],
  )

  const hideDialogs = useCallback(() => setState({}), [setState])

  const memo = useMemo(
    () => ({
      dialogType: state.dialogType,
      deleteProps: state.deleteProps,

      showAddDialog,
      showDeleteDialog,
      hideDialogs,
    }),
    [
      state.dialogType,
      state.deleteProps,

      showAddDialog,
      showDeleteDialog,
      hideDialogs,
    ],
  )

  return (
    <BooksDialogContext.Provider value={memo}>
      {children}
    </BooksDialogContext.Provider>
  )
}
