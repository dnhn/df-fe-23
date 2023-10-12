import Image from 'next/image'

import LoginForm from '@/src/components/LoginForm'

export default function Login() {
  return (
    <section className="relative flex h-[75lvh] items-center justify-center overflow-hidden xs:h-[85vh]">
      <Image
        src="/freddie-marriage-w8JiSVyjy-8-unsplash.jpeg"
        alt="Bookstore"
        priority
        fill
        className="object-cover"
      />
      <div className="absolute left-0 top-0 h-full w-full transition-colors dark:bg-black/30" />
      <LoginForm />
    </section>
  )
}
