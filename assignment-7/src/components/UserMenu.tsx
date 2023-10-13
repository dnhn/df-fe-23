'use client'

import Image from 'next/image'

import { useAuthContext } from '@/src/auth/AuthContext'

export default function UserMenu() {
  const { auth, logout, user } = useAuthContext()

  return (
    auth && (
      <div className="group relative">
        <button className="flex items-center gap-2">
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
        <div className="pointer-events-none absolute right-0 top-[80%] z-[1] w-48 select-none overflow-hidden rounded bg-white text-sm opacity-0 shadow-md transition-[opacity,top] group-hover:pointer-events-auto group-hover:top-full group-hover:select-auto group-hover:opacity-100 dark:bg-slate-500">
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
            onClick={logout}
            className="w-full px-3 py-2 text-left font-bold hover:bg-slate-100 dark:hover:bg-slate-400"
          >
            Log out
          </button>
        </div>
      </div>
    )
  )
}
