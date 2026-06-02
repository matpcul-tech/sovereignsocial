'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SigninPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Sign in failed')
      setLoading(false)
      return
    }

    router.push('/dashboard')
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
          Welcome back
        </h1>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '36px' }}>
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--muted)', marginTop: '24px', letterSpacing: '0.05em' }}>
          No account?{' '}
          <Link href="/signup" style={{ color: 'var(--amber)', textDecoration: 'none' }}>Create one</Link>
        </p>
      </div>
    </div>
  )
}
