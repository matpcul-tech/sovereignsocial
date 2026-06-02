import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'

const protectedRoutes = ['/dashboard']
const authRoutes = ['/signin', '/signup']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await getSessionFromRequest(request)

  if (protectedRoutes.some((r) => pathname.startsWith(r))) {
    if (!session) {
      const url = request.nextUrl.clone()
      url.pathname = '/signin'
      return NextResponse.redirect(url)
    }
  }

  if (authRoutes.some((r) => pathname.startsWith(r))) {
    if (session) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup'],
}
