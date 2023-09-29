'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const [count, setCount] = useState(3)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 2) {
        clearInterval(interval)
        router.push('/')
      } else {
        setCount((count) => count - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [count, setCount, router])

  return (
    <section className="relative mx-auto w-[25rem] max-w-full py-16 text-center md:py-32 xl:py-48">
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2 select-none text-[60vw] font-thin leading-none opacity-0 md:opacity-5">
        404
      </div>
      <h2 className="text-6xl font-black text-red-600 md:text-7xl">Oops…</h2>
      <p className="py-6 text-2xl font-medium md:text-3xl">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="font-medium">
        Back to home page {count > 0 ? ` in ${count}` : ''}
      </Link>
    </section>
  )
}
