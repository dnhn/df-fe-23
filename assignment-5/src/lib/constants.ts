export const BOOKS_DATA_KEY: string = 'booksStore'
export const BOOKS_PER_PAGE: number = 5

export const PATHS = {
  ROOT: '/',
  BOOK: {
    ROOT: '/book',
    VIEW: (id: string) => `/book/${id}`,
  },
}
