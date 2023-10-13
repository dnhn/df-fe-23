'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'

import { getLocalStorageItem, setLocalStorageItem } from '@/src/lib/utils'
import { ACCESS_TOKEN_KEY, EVENTS, PATHS } from '@/src/lib/constants'
import * as api from '@/src/lib/api'
import * as emitter from '@/src/lib/emitter'

interface IAuthContext {
  auth: string | null
  login: (email: string, password: string) => Promise<undefined | Error>
  logout: () => void
}

const AuthContext = createContext<IAuthContext | null>(null)

export const useAuthContext = () => {
  const context = useContext<IAuthContext | null>(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }

  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [auth, setAuth] = useState<string | null>(
    getLocalStorageItem(ACCESS_TOKEN_KEY),
  )

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await api.loginNext({ email, password })

        if (response.data.accessToken) {
          setLocalStorageItem(ACCESS_TOKEN_KEY, response.data.accessToken)
          setAuth(response.data.accessToken)
          router.replace(PATHS.BOOK.ROOT)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    [router, setAuth],
  )

  const logout = useCallback(async () => {
    try {
      await api.logout()
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      setAuth(null)
      router.replace(PATHS.AUTH.LOGIN)
    } catch (error) {
      return Promise.reject(error)
    }
  }, [router, setAuth])

  useEffect(() => {
    emitter.on(EVENTS.LOGOUT, logout)

    return () => emitter.off(EVENTS.LOGOUT, logout)
  }, [logout])

  const memo = useMemo(
    () => ({
      auth,

      login,
      logout,
    }),
    [auth, login, logout],
  )

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>
}
