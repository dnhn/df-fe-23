import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { COOKIE_ACCESS_TOKEN } from '@/src/lib/constants'

export async function GET() {
  try {
    cookies().delete(COOKIE_ACCESS_TOKEN)

    return NextResponse.json({})
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
