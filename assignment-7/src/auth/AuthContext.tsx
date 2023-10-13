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
import { EVENTS, KEY_ACCESS_TOKEN, PATHS } from '@/src/lib/constants'
import { Me, getMe } from '@/src/api'
import * as oldApi from '@/src/lib/api'
import * as emitter from '@/src/lib/emitter'

interface IAuthContext {
  auth: string | null
  user?: Me
  login: (email: string, password: string) => Promise<undefined | Error>
  logout: () => void
}

const AuthContext = createContext<IAuthContext | null>(null)

const KEY_USER_INFO = 'userInfo'

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
    getLocalStorageItem(KEY_ACCESS_TOKEN),
  )
  const [user, setUser] = useState<Me>()

  const logout = useCallback(async () => {
    try {
      await oldApi.logout()
      setUser(undefined)
      localStorage.removeItem(KEY_ACCESS_TOKEN)
      setAuth(null)
      router.replace(PATHS.AUTH.LOGIN)
    } catch (error) {
      return Promise.reject(error)
    }
  }, [router, setAuth])

  const getUserInfo = useCallback(async () => {
    try {
      const res = await getMe()
      if (res.data) {
        setUser(res.data)
        setLocalStorageItem(KEY_USER_INFO, res.data)
      }
    } catch {
      logout()
    }
  }, [logout])

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await oldApi.loginNext({ email, password })

        if (response.data?.accessToken) {
          setLocalStorageItem(KEY_ACCESS_TOKEN, response.data.accessToken)
          setAuth(response.data.accessToken)
          getUserInfo()
          router.replace(PATHS.BOOK.ROOT)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    [getUserInfo, router, setAuth],
  )

  useEffect(() => {
    const bootstrapAsync = async () => {
      if (auth) {
        const user = getLocalStorageItem(KEY_USER_INFO)

        if (user) {
          try {
            setUser(user as Me)
          } catch {
            getUserInfo()
          }
        } else {
          getUserInfo()
        }
      }
    }
    bootstrapAsync()

    emitter.on(EVENTS.LOGOUT, logout)

    return () => emitter.off(EVENTS.LOGOUT, logout)
  }, [auth, getUserInfo, logout])

  const memo = useMemo(
    () => ({
      auth,
      user,

      login,
      logout,
    }),
    [auth, user, login, logout],
  )

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>
}
