export const SPECIAL_CHARS = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/

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

export const KEY_ACCESS_TOKEN = 'access_token'
export const COOKIE_THEME = 'theme_mode'
export const COOKIE_ACCESS_TOKEN = 'access_token'

export const EVENTS = {
  LOGOUT: 'logout',
}
