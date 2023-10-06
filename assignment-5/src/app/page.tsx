import { redirect } from 'next/navigation'

import { PATH } from '@/src/lib/constants'

export default function Home() {
  redirect(PATH.BOOK.ROOT)
}
