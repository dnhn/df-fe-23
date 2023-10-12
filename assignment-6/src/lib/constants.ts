export const SPECIAL_CHARS: RegExp = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/

export const PATHS = {
  ROOT: '/',
  AUTH: {
    LOGIN: '/auth/login',
  },
  BOOK: {
    ROOT: '/book',
    VIEW: (id: number) => `/book/${id}`,
  },
}

export const API_TOKEN_KEY: string = 'apiToken'

export const EVENTS = {
  LOGOUT: 'logout',
}
