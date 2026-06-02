'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SignupForm() {
  const router = useRouter()
  const params = useSearchParams()
  const redirectUrl = params.get('url') ?? ''

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Signup failed')
      setLoading(false)
      return
    }

    if (redirectUrl) {
      router.push(`/dashboard?url=${encodeURIComponent(redirectUrl)}`)
    } else {
      router.push('/dashboard')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border)',
    color: 'var(--cream)',
    fontFamily: 'var(--font-dm-mono), monospace',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '15px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', textDecoration: 'none', display: 'block', marginBottom: '48px' }}>
          Sovereign Social
        </Link>

        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '40px', fontWeight: 300, lineHeight: 1.1, marginBottom: '8px' }}>
          Create account
        </h1>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '36px' }}>
          {redirectUrl ? `We'll generate posts for ${redirectUrl} right away.` : 'Start generating posts in seconds.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            style={inputStyle}
          />

          {error && (
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#e84545', letterSpacing: '0.05em' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px', padding: '16px',
              background: loading ? 'var(--amber-dim)' : 'var(--amber)',
              border: 'none', color: 'var(--black)',
              fontFamily: 'var(--font-syne)', fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--muted)', marginTop: '24px', letterSpacing: '0.05em' }}>
          Already have an account?{' '}
          <Link href="/signin" style={{ color: 'var(--amber)', textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  )
}
