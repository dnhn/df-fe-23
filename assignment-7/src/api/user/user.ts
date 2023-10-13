/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Swagger API
 * This is a swagger for API.
 * OpenAPI spec version: 1.0
 */
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import useSwr from 'swr'
import type { SWRConfiguration, Key } from 'swr'
import type {
  MeResponse,
  ErrorResponse,
  UserResponse,
  UpdateUserRequest,
  MessageResponse,
  UpdatePasswordRequest,
} from '../model'

/**
 * Retrieve my information
 * @summary Retrieve my information
 */
export const getMe = (
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<MeResponse>> => {
  return axios.get(`/me`, options)
}

export const getGetMeKey = () => [`/me`] as const

export type GetMeQueryResult = NonNullable<Awaited<ReturnType<typeof getMe>>>
export type GetMeQueryError = AxiosError<ErrorResponse>

/**
 * @summary Retrieve my information
 */
export const useGetMe = <TError = AxiosError<ErrorResponse>>(options?: {
  swr?: SWRConfiguration<Awaited<ReturnType<typeof getMe>>, TError> & {
    swrKey?: Key
    enabled?: boolean
  }
  axios?: AxiosRequestConfig
}) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (() => (isEnabled ? getGetMeKey() : null))
  const swrFn = () => getMe(axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  )

  return {
    swrKey,
    ...query,
  }
}

/**
 * Update user
 * @summary Update user
 */
export const updateUser = (
  updateUserRequest: UpdateUserRequest,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<UserResponse>> => {
  return axios.put(`/users`, updateUserRequest, options)
}

/**
 * Update user's password
 * @summary Update user's password
 */
export const updatePassword = (
  updatePasswordRequest: UpdatePasswordRequest,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<MessageResponse>> => {
  return axios.put(`/users/password`, updatePasswordRequest, options)
}
