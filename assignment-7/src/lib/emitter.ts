export const on = (
  type: string,
  listener: EventListenerOrEventListenerObject = () => {},
) => document.addEventListener(type, listener)

export const off = (
  type: string,
  listener: EventListenerOrEventListenerObject = () => {},
) => document.removeEventListener(type, listener)

export const emit = (type: string) => document.dispatchEvent(new Event(type))
