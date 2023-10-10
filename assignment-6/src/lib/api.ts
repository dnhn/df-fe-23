import {
  Book,
  ListResponse,
  LoginRequest,
  LoginResponse,
} from '@/src/types/schema'
import { API_TOKEN_KEY } from './constants'
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
    BY_ID: (id: string) => `${API_HOST}/books/${id}`,
  },
  TOPICS: `${API_HOST}/topics`,
}

const headers: HeadersInit = {
  'Content-Type': 'application/json',
}
const accessToken = getLocalStorageItem(API_TOKEN_KEY)
const privateHeaders = {
  ...headers,
  Authorization: accessToken ? `Bearer ${accessToken}` : '',
}

async function apiFetcher<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
): Promise<T> {
  const res: Response = await fetch(input, init)
  const json = await res.json()

  if (res.ok) {
    return Promise.resolve<T>(json)
  }

  return Promise.reject(new Error(json.message))
}

export function login(params: LoginRequest) {
  return apiFetcher<LoginResponse>(API_PATHS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export function getBooks() {
  return apiFetcher<ListResponse<Book>>(API_PATHS.BOOKS.ROOT, {
    headers: privateHeaders,
  })
}
