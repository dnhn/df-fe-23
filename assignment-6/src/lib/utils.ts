import { ACCESS_TOKEN_KEY, COOKIE_ACCESS_TOKEN } from './constants'

export function getLocalStorageItem(key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) as string)
  } catch (error) {
    return null
  }
}

export const setLocalStorageItem = (key: string, data: unknown) =>
  localStorage.setItem(key, JSON.stringify(data))

export const trimTrim = (text: string) => text.replace(/\s+/g, ' ').trim()

export function getCookie(name: string) {
  const cookies = document.cookie.split('; ')
  const found = cookies.find((ck) => ck.startsWith(`${name}=`))

  return found ? found.split('=')[1] : null
}

export const isAuth = () =>
  getCookie(COOKIE_ACCESS_TOKEN) || getLocalStorageItem(ACCESS_TOKEN_KEY)
