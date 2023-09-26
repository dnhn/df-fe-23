export function getLocalStorageItem(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
}

export function setLocalStorageItem(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function trimTrim(text) {
  return text.replace(/\s+/g, ' ').trim();
}
