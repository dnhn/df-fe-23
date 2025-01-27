// https://github.com/dwarvesf/nextjs-boilerplate/blob/6bb3625fd20866065ff69b6d5b5c9b802930aaa4/src/api/mutator/requester.ts

import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { getLocalStorageItem, isSSR } from '@/src/lib/utils'
import * as emitter from '@/src/lib/emitter'
import { EVENTS, KEY_ACCESS_TOKEN } from '@/src/lib/constants'

// eslint-disable-next-line prefer-destructuring
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const AXIOS_INSTANCE = Axios.create({ baseURL: BASE_URL })

// Interceptors
const handleResponseSuccess = (response: AxiosResponse) => response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleResponseFail = async (error: any) => {
  // 401 error code -> unauthorized
  if (error.response?.status === 401) {
    emitter.emit(EVENTS.LOGOUT)
  }
  return Promise.reject(error)
}

export const requester = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  // Add token to request header
  const accessToken = isSSR() ? '' : getLocalStorageItem(KEY_ACCESS_TOKEN)
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    }
  }
  // Add interceptors
  AXIOS_INSTANCE.interceptors.response.use(
    handleResponseSuccess,
    handleResponseFail,
  )

  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by requester')
  }

  return promise
}

export default requester
