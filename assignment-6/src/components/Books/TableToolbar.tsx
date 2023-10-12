'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useAuthContext } from '@/src/auth/AuthContext'
import { trimTrim } from '@/src/lib/utils'
import Button from '@/src/components/Button'
import { useBooksContext } from '@/src/contexts/BooksContext'
import { useBooksDialogContext } from '@/src/contexts/BooksDialogContext'

export default function TableToolbar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { auth } = useAuthContext()
  const {
    metadata: { page },
    query,
    setQuery,
  } = useBooksContext()
  const { showAddDialog } = useBooksDialogContext()
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
    setKeyword(searchParams.get('q') || '')
  }, [])

  useEffect(() => {
    const typeTimeout = setTimeout(() => setQuery(trimTrim(keyword)), 300)

    return () => {
      clearTimeout(typeTimeout)
    }
  }, [keyword, setQuery])

  useEffect(() => {
    if (auth) {
      const urlSearchParams = new URLSearchParams()

      if (query.length) {
        urlSearchParams.set('q', query)
      } else {
        urlSearchParams.delete('q')
      }

      if (page > 0) {
        urlSearchParams.set('page', page.toString())
      } else {
        urlSearchParams.delete('page')
      }

      router.replace(`${pathname}?${urlSearchParams}`)
    }
  }, [auth, page, query])

  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={keyword}
          onInput={(event) =>
            setKeyword((event.target as HTMLInputElement).value)
          }
          className="w-full rounded-[.25rem] border-gray-300 pe-12 text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:w-64"
        />
        <button
          type="button"
          className="absolute right-1 top-1/2 -translate-y-1/2 border-0 bg-transparent p-2 text-xs text-black"
          onClick={() => setKeyword('')}
        >
          clear
        </button>
      </div>
      <Button variant="info" onClick={showAddDialog}>
        New book
      </Button>
    </div>
  )
}
