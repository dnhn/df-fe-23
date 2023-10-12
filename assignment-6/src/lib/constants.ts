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

export const ACCESS_TOKEN_KEY: string = 'access_token'
export const COOKIE_THEME = 'theme_mode'
export const COOKIE_ACCESS_TOKEN = 'access_token'

export const EVENTS = {
  LOGOUT: 'logout',
}
