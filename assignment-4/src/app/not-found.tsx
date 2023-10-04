import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="relative mx-auto flex h-[50lvh] w-[25rem] max-w-full flex-col justify-center text-center md:h-[60vh]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2 select-none text-[60vw] font-thin leading-none opacity-0 md:opacity-5">
        404
      </div>
      <h2 className="text-6xl font-black text-red-600 md:text-7xl">Oops…</h2>
      <p className="py-6 text-2xl font-medium md:text-3xl">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="font-medium">
        Back to home page
      </Link>
    </section>
  )
}
