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
