import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const postSets = await prisma.postSet.findMany({
    where: { userId: session.userId },
    include: { posts: true },
    orderBy: { generatedAt: 'desc' },
  })

  return NextResponse.json({ postSets })
}

export async function DELETE() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}
