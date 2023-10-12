import {
  Book,
  CreateUpdateBookRequest,
  BookResponse,
  ListResponse,
  LoginRequest,
  LoginResponse,
  DeleteBookResponse,
  UserResponse,
  ListTopic,
} from '@/src/types/schema'
import { API_TOKEN_KEY, EVENTS } from './constants'
import { getLocalStorageItem } from './utils'

const API_HOSTNAME = 'https://develop-api.bookstore.dwarvesf.com'
const API_BASE = '/api/v1'
const API_HOST = `${API_HOSTNAME}${API_BASE}`
const API_PATHS = {
  LOGIN: `${API_HOST}/auth/login`,
  USER: {
    ME: `${API_HOST}/me`,
    UPDATE: `${API_HOST}/users`,
    UPDATE_PASSWORD: `${API_HOST}/users/password`,
  },
  BOOKS: {
    ROOT: `${API_HOST}/books`,
    BY_ID: (id: number) => `${API_HOST}/books/${id}`,
  },
  TOPICS: `${API_HOST}/topics`,
}

const headers: HeadersInit = {
  'Content-Type': 'application/json',
}
const privateHeaders = () => ({
  ...headers,
  Authorization: getLocalStorageItem(API_TOKEN_KEY)
    ? `Bearer ${getLocalStorageItem(API_TOKEN_KEY)}`
    : '',
})

async function fetcher<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
): Promise<T> {
  const res: Response = await fetch(input, init)
  const json = await res.json()

  if (res.ok) {
    return Promise.resolve<T>(json)
  }

  if (json.Status === 401 || json.status === 401) {
    if (document !== undefined) {
      document.dispatchEvent(new Event(EVENTS.LOGOUT))
    }
  }

  return Promise.reject(new Error(json.message))
}

export function login(params: LoginRequest) {
  return fetcher<LoginResponse>(API_PATHS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export function getMe() {
  return fetcher<UserResponse>(API_PATHS.USER.ME, {
    headers: privateHeaders(),
  })
}

export function getTopics() {
  return fetcher<ListTopic>(API_PATHS.TOPICS, {
    headers: privateHeaders(),
  })
}

export function createBook(params: CreateUpdateBookRequest) {
  return fetcher<BookResponse>(API_PATHS.BOOKS.ROOT, {
    headers: privateHeaders(),
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export function getBooks(params?: string[][]) {
  const searchParams = new URLSearchParams(params).toString()
  return fetcher<ListResponse<Book>>(
    `${API_PATHS.BOOKS.ROOT}?${searchParams}`,
    {
      headers: privateHeaders(),
    },
  )
}

export function getBook(id: number) {
  return fetcher<BookResponse>(API_PATHS.BOOKS.BY_ID(id), {
    headers: privateHeaders(),
  })
}

export function updateBook(id: number, params: CreateUpdateBookRequest) {
  return fetcher<BookResponse>(API_PATHS.BOOKS.BY_ID(id), {
    headers: privateHeaders(),
    method: 'PUT',
    body: JSON.stringify(params),
  })
}

export function deleteBook(id: number) {
  return fetcher<DeleteBookResponse>(API_PATHS.BOOKS.BY_ID(id), {
    headers: privateHeaders(),
    method: 'DELETE',
  })
}
