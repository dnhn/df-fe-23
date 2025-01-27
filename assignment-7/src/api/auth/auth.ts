/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Swagger API
 * This is a swagger for API.
 * OpenAPI spec version: 1.0
 */
import type {
  LoginResponse,
  LoginRequest,
  MessageResponse,
  SignupRequest,
} from '../model'
import { requester } from '../mutator/requester'

/**
 * Login to portal by email
 * @summary Login to portal
 */
export const login = (loginRequest: LoginRequest) => {
  return requester<LoginResponse>({
    url: `/auth/login`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: loginRequest,
  })
}

/**
 * Signup
 * @summary Signup
 */
export const signup = (signupRequest: SignupRequest) => {
  return requester<MessageResponse>({
    url: `/auth/signup`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: signupRequest,
  })
}
