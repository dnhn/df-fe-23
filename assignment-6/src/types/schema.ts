export interface Auth {
  accessToken: string
  email: string
  id: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  data: Auth
}

export interface Topic {
  id: number
  name: string
  code: string
}

export interface Metadata {
  page: number
  pageSize: number
  totalPages: number
  totalRecords: number
}

export interface Book {
  id: number
  name: string
  author: string
  topic: Topic
}

export interface ListResponse<T> {
  data: T[]
  metadata: Metadata
}
