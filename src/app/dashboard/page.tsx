'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Post {
  id: string
  platform: string
  content: string
  hashtags?: string | null
}

interface PostSet {
  id: string
  sourceUrl: string
  brandName?: string | null
  generatedAt: string
  posts: Post[]
}

const platformColors: Record<string, string> = {
  instagram: '#e1306c',
  linkedin: '#0077b5',
  facebook: '#1877f2',
  twitter: '#010101',
  tiktok: '#010101',
  pinterest: '#e60023',
}

const platformLabels: Record<string, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  twitter: 'X / Twitter',
  tiktok: 'TikTok',
  pinterest: 'Pinterest',
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: copied ? 'var(--amber)' : 'var(--muted)', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function PostCard({ post }: { post: Post }) {
  const fullText = post.hashtags ? `${post.content}\n\n${post.hashtags}` : post.content
  return (
    <div style={{ background: 'var(--carbon)', border: '1px solid var(--border)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: platformColors[post.platform] ?? '#666', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)' }}>
            {platformLabels[post.platform] ?? post.platform}
          </span>
        </div>
        <CopyButton text={fullText} />
      </div>
      <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: 'rgba(240,234,216,0.85)', flex: 1 }}>
        {post.content}
      </p>
      {post.hashtags && (
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.6 }}>
          {post.hashtags}
        </p>
      )}
    </div>
  )
}

function DashboardContent() {
  const router = useRouter()
  const params = useSearchParams()
  const initialUrl = params.get('url') ?? ''

  const [url, setUrl] = useState(initialUrl)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [postSets, setPostSets] = useState<PostSet[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (!d.user) { router.push('/signin'); return }
      setUserEmail(d.user.email)
    })
    fetch('/api/posts').then(r => r.json()).then(d => {
      setPostSets(d.postSets ?? [])
      setLoadingHistory(false)
    })
  }, [router])

  useEffect(() => {
    if (initialUrl) generate(initialUrl)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const generate = async (targetUrl?: string) => {
    const target = targetUrl ?? url
    if (!target.trim()) return
    setGenerating(true)
    setError('')

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: target.trim() }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Generation failed')
      setGenerating(false)
      return
    }

    setPostSets((prev) => [data.postSet, ...prev])
    setGenerating(false)
    setUrl('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generate()
  }

  const signOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' })
    router.push('/')
  }

  return (
    <div style={{ minHeight: '100vh', padding: '0' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--border)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--carbon)', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', textDecoration: 'none' }}>
          Sovereign Social
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--muted)' }}>{userEmail}</span>
          <button onClick={signOut} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', background: 'transparent', border: '1px solid var(--border)', padding: '8px 16px', cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 40px' }}>
        {/* Generator */}
        <div style={{ marginBottom: '72px' }}>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '16px' }}>Generate posts</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 300, lineHeight: 1.05, marginBottom: '32px' }}>
            Drop a URL.<br /><em style={{ fontStyle: 'italic', color: 'rgba(240,234,216,0.4)' }}>Walk away.</em>
          </h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)', padding: '6px 6px 6px 24px', width: 'min(600px, 100%)', backdropFilter: 'blur(10px)' }}>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yourbusiness.com"
              disabled={generating}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-dm-mono)', fontSize: '13px', color: 'var(--cream)', letterSpacing: '0.02em' }}
            />
            <button
              type="submit"
              disabled={generating || !url.trim()}
              style={{
                background: generating || !url.trim() ? 'var(--amber-dim)' : 'var(--amber)',
                color: 'var(--black)', border: 'none', padding: '14px 28px',
                fontFamily: 'var(--font-syne)', fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: generating || !url.trim() ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap', transition: 'background 0.2s',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              {generating ? (
                <>
                  <span style={{ width: '12px', height: '12px', border: '1.5px solid var(--black)', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
                  Generating…
                </>
              ) : 'Generate'}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: '16px', padding: '16px', border: '1px solid rgba(232,69,69,0.3)', background: 'rgba(232,69,69,0.05)' }}>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', color: '#e84545', letterSpacing: '0.05em' }}>{error}</p>
              {error.includes('ANTHROPIC_API_KEY') && (
                <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--muted)', marginTop: '8px', letterSpacing: '0.03em' }}>
                  Add your API key to <code style={{ color: 'var(--amber)' }}>.env.local</code> and restart the server.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Post sets */}
        {loadingHistory ? (
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--muted)' }}>Loading history…</p>
        ) : postSets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 300, color: 'rgba(240,234,216,0.3)', marginBottom: '12px' }}>No posts yet</p>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em' }}>Enter a URL above to generate your first posts.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {postSets.map((set) => (
              <div key={set.id}>
                <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
                    {set.brandName && (
                      <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 600, color: 'var(--cream)' }}>{set.brandName}</h2>
                    )}
                    <a href={set.sourceUrl.startsWith('http') ? set.sourceUrl : `https://${set.sourceUrl}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.05em', textDecoration: 'none' }}>
                      {set.sourceUrl} ↗
                    </a>
                    <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--muted)', marginLeft: 'auto', letterSpacing: '0.05em' }}>
                      {new Date(set.generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                  {set.posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  )
}
