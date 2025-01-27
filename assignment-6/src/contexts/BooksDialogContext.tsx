'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { Book } from '@/src/types/schema'

export enum DIALOG_TYPE {
  ADD = 'add',
  DELETE = 'delete',
  EDIT = 'edit',
}

interface IDialogValues {
  dialogType?: string | 'add' | 'delete' | 'edit'
  dialogProps?: { book: Book }
}

interface IDialogContext extends IDialogValues {
  showAddDialog: () => void
  showEditDialog: (book: Book) => void
  showDeleteDialog: (book: Book) => void
  hideDialogs: () => void
}

const BooksDialogContext = createContext<IDialogContext>({
  showAddDialog: () => {},
  showEditDialog: () => {},
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

  const showEditDialog = useCallback(
    (book: Book) =>
      setState({
        dialogType: DIALOG_TYPE.EDIT,
        dialogProps: { book },
      }),
    [setState],
  )

  const showDeleteDialog = useCallback(
    (book: Book) =>
      setState({
        dialogType: DIALOG_TYPE.DELETE,
        dialogProps: { book },
      }),
    [setState],
  )

  const hideDialogs = useCallback(() => setState({}), [setState])

  const memo = useMemo(
    () => ({
      dialogType: state.dialogType,
      dialogProps: state.dialogProps,

      showAddDialog,
      showEditDialog,
      showDeleteDialog,
      hideDialogs,
    }),
    [
      state.dialogType,
      state.dialogProps,

      showAddDialog,
      showEditDialog,
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
