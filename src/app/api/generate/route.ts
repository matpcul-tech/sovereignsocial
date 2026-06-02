import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generatePosts } from '@/lib/claude'

async function fetchPageContent(url: string): Promise<string> {
  const normalized = url.startsWith('http') ? url : `https://${url}`
  const res = await fetch(normalized, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SovereignSocialBot/1.0)' },
    signal: AbortSignal.timeout(10000),
  })
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const html = await res.text()

  const $ = cheerio.load(html)
  $('script, style, nav, footer, iframe, noscript').remove()

  const title = $('title').text().trim()
  const description = $('meta[name="description"]').attr('content') ?? ''
  const h1s = $('h1').map((_, el) => $(el).text().trim()).get().join(' | ')
  const h2s = $('h2').map((_, el) => $(el).text().trim()).get().slice(0, 6).join(' | ')
  const bodyText = $('main, article, section, .content, #content, body')
    .text()
    .replace(/\s+/g, ' ')
    .trim()

  return [
    `Title: ${title}`,
    `Description: ${description}`,
    `Headings: ${h1s} ${h2s}`,
    `Content: ${bodyText.slice(0, 3000)}`,
  ].join('\n\n')
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })

  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your-anthropic-api-key-here') {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 })
  }

  let siteContent: string
  try {
    siteContent = await fetchPageContent(url)
  } catch (err) {
    return NextResponse.json(
      { error: `Could not fetch that URL: ${(err as Error).message}` },
      { status: 422 }
    )
  }

  let generated
  try {
    generated = await generatePosts(siteContent, url)
  } catch (err) {
    return NextResponse.json(
      { error: `AI generation failed: ${(err as Error).message}` },
      { status: 500 }
    )
  }

  const postSet = await prisma.postSet.create({
    data: {
      userId: session.userId,
      sourceUrl: url,
      brandName: generated.brandName,
      posts: {
        create: [
          { platform: 'instagram', content: generated.instagram.content, hashtags: generated.instagram.hashtags },
          { platform: 'linkedin', content: generated.linkedin.content },
          { platform: 'twitter', content: generated.twitter.content },
          { platform: 'facebook', content: generated.facebook.content },
          { platform: 'tiktok', content: generated.tiktok.content, hashtags: generated.tiktok.hashtags },
          { platform: 'pinterest', content: generated.pinterest.content, hashtags: generated.pinterest.hashtags },
        ],
      },
    },
    include: { posts: true },
  })

  return NextResponse.json({ postSet })
}
