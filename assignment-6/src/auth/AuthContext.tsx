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
import { usePathname, useRouter } from 'next/navigation'

import { getLocalStorageItem, setLocalStorageItem } from '@/src/lib/utils'
import { API_TOKEN_KEY, EVENTS, PATHS } from '@/src/lib/constants'
import * as api from '@/src/lib/api'

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
  const pathname = usePathname()
  const [auth, setAuth] = useState<string | null>(
    getLocalStorageItem(API_TOKEN_KEY),
  )

  const routeCheck = useCallback(() => {
    if (!auth && pathname !== PATHS.AUTH.LOGIN) {
      router.replace(PATHS.AUTH.LOGIN)
    }

    if (auth && pathname === PATHS.AUTH.LOGIN) {
      router.replace(PATHS.BOOK.ROOT)
    }
  }, [auth, pathname, router])

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await api.login({ email, password })

        if (response.data.accessToken) {
          setLocalStorageItem(API_TOKEN_KEY, response.data.accessToken)
          setAuth(response.data.accessToken)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    [setAuth],
  )

  const logout = useCallback(() => {
    setAuth(null)
    localStorage.removeItem(API_TOKEN_KEY)
  }, [setAuth])

  useEffect(() => {
    routeCheck()

    document.addEventListener(EVENTS.LOGOUT, logout)

    return () => document.removeEventListener(EVENTS.LOGOUT, logout)
  }, [logout, routeCheck])

  useEffect(routeCheck, [auth, pathname, routeCheck, router])

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
