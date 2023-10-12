import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'
import { COOKIE_ACCESS_TOKEN, PATHS } from '@/src/lib/constants'
import BookDetail from '@/src/components/Books/BookDetail'

interface IViewBook {
  params: { id: number }
}

export default function ViewBook({ params: { id } }: IViewBook) {
  const auth = cookies().get(COOKIE_ACCESS_TOKEN)

  if (!auth) {
    redirect(PATHS.AUTH.LOGIN)
  }

  return (
    <section className="mx-auto w-[60rem] max-w-full">
      <BookDetail id={id} />
    </section>
  )
}
