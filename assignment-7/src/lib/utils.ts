export function getLocalStorageItem(key: string) {
  try {
    return JSON.parse(window.localStorage.getItem(key) as string)
  } catch (error) {
    return null
  }
}

export const setLocalStorageItem = (key: string, data: unknown) =>
  window.localStorage.setItem(key, JSON.stringify(data))

export const trimTrim = (text: string) => text.replace(/\s+/g, ' ').trim()

export const isSSR = () => typeof window === 'undefined'
