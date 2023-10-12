import { NextRequest, NextResponse } from 'next/server'

import { COOKIE_ACCESS_TOKEN, PATHS } from '@/src/lib/constants'

export async function middleware(request: NextRequest) {
  const auth = request.cookies.get(COOKIE_ACCESS_TOKEN)?.value
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    return NextResponse.redirect(
      `${request.nextUrl.origin}${auth ? PATHS.BOOK.ROOT : PATHS.AUTH.LOGIN}`,
    )
  }

  // Auth guard
  if (!auth && pathname !== PATHS.AUTH.LOGIN) {
    return NextResponse.redirect(`${request.nextUrl.origin}${PATHS.AUTH.LOGIN}`)
  }

  // Guest guard
  if (auth && pathname === PATHS.AUTH.LOGIN) {
    return NextResponse.redirect(`${request.nextUrl.origin}${PATHS.BOOK.ROOT}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/auth/:path*', '/book/:path*'],
}
