import { LoginRequest, LoginResponse } from '@/src/api'
import * as emitter from './emitter'
import { EVENTS } from './constants'

const API_HOSTNAME = 'https://develop-api.bookstore.dwarvesf.com'
const API_BASE = '/api/v1'
const API_HOST = `${API_HOSTNAME}${API_BASE}`
export const API_PATHS = {
  LOGIN: `${API_HOST}/auth/login`,
  LOGIN_NEXT: `/api/auth/login`,
  LOGOUT_NEXT: `/api/auth/logout`,
}

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
      emitter.emit(EVENTS.LOGOUT)
    }
  }

  return Promise.reject(new Error(json.message))
}

export function loginNext(params: LoginRequest) {
  return fetcher<LoginResponse>(API_PATHS.LOGIN_NEXT, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export function logout() {
  return fetcher<LoginResponse>(API_PATHS.LOGOUT_NEXT)
}
