import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { API_PATHS } from '@/src/lib/api'
import { COOKIE_ACCESS_TOKEN } from '@/src/lib/constants'

export async function POST(request: NextRequest) {
  const data = await request.json()
  const response = await fetch(API_PATHS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  const json = await response.json()

  if (response.ok) {
    cookies().set(COOKIE_ACCESS_TOKEN, json.data.accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    })

    return NextResponse.json(json)
  }

  return NextResponse.json(json, {
    status: json.status,
    statusText: json.message,
  })
}
