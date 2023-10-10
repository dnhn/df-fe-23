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

export interface User {
  avatar: string
  email: string
  fullName: string
  id: number
}

export interface UserResponse {
  data: User
}

export interface Topic {
  id: number
  name: string
  code: string
}

export interface ListTopic {
  data: Topic[]
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

export interface CreateUpdateBookRequest {
  author: string
  name: string
  topicId: number
}

export interface BookResponse {
  data: Book
}

export interface DeleteBookResponse {
  data: {
    message: string
  }
}
