'use client'

import { useState } from 'react'
import Image from 'next/image'

import { useAuthContext } from '@/src/auth/AuthContext'

export default function UserMenu() {
  const { auth, logout, user } = useAuthContext()
  const [show, setShow] = useState(false)

  const handleFocus = () => setShow(true)
  const handleBlur = () => setShow(false)
  const handleLogout = () => {
    setShow(false)
    logout()
  }

  const eventHandlers = {
    onFocus: handleFocus,
    onBlur: handleBlur,
  }

  return (
    auth && (
      <div className="group relative">
        <button {...eventHandlers} className="peer flex items-center gap-2">
          {user && (
            <Image
              src={user.avatar}
              alt={user.fullName}
              width={360}
              height={240}
              className="h-9 w-9 rounded-full border-2 border-gray-400 object-cover"
            />
          )}
          <span className="max-w-[5rem] overflow-hidden text-ellipsis whitespace-nowrap font-medium xs:max-w-[8rem] md:max-w-[12rem]">
            {user ? user.fullName : 'User'}
          </span>
        </button>
        <div
          className={`absolute right-0 z-[1] w-48 overflow-hidden rounded bg-white text-sm shadow-md transition-[opacity,top] group-hover:pointer-events-auto group-hover:top-full group-hover:select-auto group-hover:opacity-100 peer-focus:pointer-events-auto peer-focus:top-full peer-focus:select-auto peer-focus:opacity-100 dark:bg-slate-500 ${
            show
              ? 'pointer-events-auto top-full select-auto opacity-100'
              : 'pointer-events-none top-[80%] select-none opacity-0'
          }`}
        >
          {user && (
            <>
              <div className="px-3 py-2">
                Logged in as{' '}
                <span className="break-words font-bold">{user.email}</span>
              </div>
              <hr />
            </>
          )}
          <button
            type="button"
            onClick={handleLogout}
            {...eventHandlers}
            tabIndex={show ? 0 : -1}
            className="w-full px-3 py-2 text-left font-bold hover:bg-slate-100 dark:hover:bg-slate-400"
          >
            Log out
          </button>
        </div>
      </div>
    )
  )
}
