'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const platforms = [
  { name: 'Instagram', color: '#e1306c' },
  { name: 'LinkedIn', color: '#0077b5' },
  { name: 'Facebook', color: '#1877f2' },
  { name: 'TikTok', color: '#010101' },
  { name: 'X', color: '#010101' },
  { name: 'Pinterest', color: '#e60023' },
]

const samplePosts = [
  { platform: 'LinkedIn', text: 'Small details, big impact. Every customer touchpoint is an opportunity to communicate care. We built our process around that belief.', brand: 'Better Coffee Co.', initial: 'B' },
  { platform: 'Instagram', text: "Fresh bakes, made daily. Because some things shouldn't be rushed — and the smell of a good morning is one of them.", brand: 'Maison Boulange', initial: 'M' },
  { platform: 'Facebook', text: 'Great food, good mood. It\'s not a slogan, it\'s the feedback we get every single week from the people who matter most.', brand: 'Grove Kitchen', initial: 'G' },
  { platform: 'X / Twitter', text: 'The single detail that makes our customers come back: we remember them. Every. Single. Time.', brand: 'Studio Marque', initial: 'S' },
]

function UrlForm({ placeholder, btnText }: { placeholder: string; btnText: string }) {
  const [url, setUrl] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    router.push(`/signup?url=${encodeURIComponent(url.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex', alignItems: 'center',
      border: '1px solid var(--border)',
      background: 'rgba(255,255,255,0.03)',
      padding: '6px 6px 6px 24px',
      width: 'min(580px, 90vw)',
      backdropFilter: 'blur(10px)',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    }}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          fontFamily: 'var(--font-dm-mono), monospace', fontSize: '13px',
          color: 'var(--cream)', letterSpacing: '0.02em',
        }}
      />
      <button type="submit" style={{
        background: 'var(--amber)', color: 'var(--black)', border: 'none',
        padding: '14px 28px', fontFamily: 'var(--font-syne), sans-serif',
        fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em',
        textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap',
      }}>
        {btnText}
      </button>
    </form>
  )
}

export default function Home() {
  return (
    <>
      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px',
        background: 'linear-gradient(to bottom, rgba(8,8,8,0.95), transparent)',
        backdropFilter: 'blur(2px)',
      }}>
        <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '15px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)' }}>
          Sovereign Social
        </div>
        <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', alignItems: 'center' }}>
          {[['#how', 'How It Works'], ['#posts', 'Output'], ['#pricing', 'Pricing']].map(([href, label]) => (
            <li key={href}>
              <a href={href} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <Link href="/signin" style={{ fontFamily: 'var(--font-syne)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', textDecoration: 'none', border: '1px solid var(--border)', padding: '8px 16px' }}>
              Sign In
            </Link>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        padding: '120px 40px 80px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(ellipse, rgba(212,160,23,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '28px', opacity: 0, animation: 'fadeUp 0.8s ease 0.2s forwards' }}>
          AI-Powered Social Infrastructure
        </p>

        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(56px, 10vw, 120px)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '12px', opacity: 0, animation: 'fadeUp 0.9s ease 0.35s forwards' }}>
          Drop your URL.<br /><em style={{ fontStyle: 'italic', color: 'var(--amber)' }}>Walk away.</em>
        </h1>

        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(240,234,216,0.5)', marginTop: '24px', marginBottom: '52px', opacity: 0, animation: 'fadeUp 0.9s ease 0.5s forwards' }}>
          Your brand learns once. It posts forever.
        </p>

        <div style={{ opacity: 0, animation: 'fadeUp 0.9s ease 0.65s forwards' }}>
          <UrlForm placeholder="yourbusiness.com" btnText="Activate" />
        </div>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', marginTop: '32px', opacity: 0, animation: 'fadeUp 0.9s ease 0.8s forwards' }}>
          {['Built on Claude', '50+ post templates', '6 platforms', 'No meetings'].map((item, i) => (
            <>
              <span key={item} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>{item}</span>
              {i < 3 && <span key={`dot-${i}`} style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--amber)', opacity: 0.5, display: 'inline-block' }} />}
            </>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0, animation: 'fadeIn 1s ease 1.5s forwards' }}>
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--amber), transparent)', animation: 'scrollPulse 2s ease infinite' }} />
        </div>
      </section>

      {/* STATS BAR */}
      <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--carbon)' }}>
        {[['50+', 'Post templates'], ['6', 'Platforms covered'], ['∞', 'Posts per month'], ['0', 'Hours of your time']].map(([num, label]) => (
          <div key={label} style={{ flex: 1, maxWidth: '240px', padding: '36px 24px', textAlign: 'center', borderRight: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '48px', fontWeight: 300, color: 'var(--amber)', lineHeight: 1, display: 'block' }}>{num}</span>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '8px', display: 'block' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: '120px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '20px' }}>The process</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, lineHeight: 1.05, marginBottom: '60px' }}>
          Three inputs.<br /><em style={{ fontStyle: 'italic', color: 'rgba(240,234,216,0.45)' }}>Infinite output.</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          {[
            { num: '01 — Drop', title: 'Give us your URL', desc: 'Paste your website. We read your voice, your offers, your story. No intake forms. No onboarding calls. One URL is enough.' },
            { num: '02 — Learn', title: 'The AI studies your brand', desc: 'Claude maps your brand voice, extracts key messaging, and builds a content strategy tailored to your business — not a template.' },
            { num: '03 — Post', title: 'Content goes live', desc: 'Instagram. LinkedIn. TikTok. X. Facebook. Pinterest. Scheduled, captioned, hashtagged. Every platform, every week, on autopilot.' },
          ].map((step) => (
            <div key={step.num} style={{ background: 'var(--carbon)', padding: '52px 40px', position: 'relative', overflow: 'hidden', transition: 'background 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--graphite)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--carbon)')}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--amber)', letterSpacing: '0.2em', marginBottom: '28px', display: 'block' }}>{step.num}</span>
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '28px', fontWeight: 600, marginBottom: '16px', lineHeight: 1.2 }}>{step.title}</h3>
              <p style={{ fontSize: '17px', fontWeight: 300, color: 'rgba(240,234,216,0.6)', lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORMS */}
      <div style={{ background: 'var(--carbon)', padding: '80px 40px', textAlign: 'center', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '40px' }}>Publishing to</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {platforms.map((p) => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 22px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--muted)', transition: 'all 0.3s', cursor: 'default' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--amber)'; e.currentTarget.style.color = 'var(--cream)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color, display: 'inline-block' }} />
              {p.name}
            </div>
          ))}
        </div>
      </div>

      {/* SAMPLE POSTS */}
      <section id="posts" style={{ padding: '120px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '20px' }}>Sample output</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, lineHeight: 1.05, marginBottom: '60px' }}>
          What gets written<br /><em style={{ fontStyle: 'italic', color: 'rgba(240,234,216,0.45)' }}>for your brand.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {samplePosts.map((post) => (
            <div key={post.brand} style={{ background: 'var(--carbon)', border: '1px solid var(--border)', padding: '28px', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,160,23,0.06)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '16px' }}>{post.platform}</p>
              <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: 'rgba(240,234,216,0.8)', marginBottom: '20px' }}>{post.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(212,160,23,0.1)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--amber-glow)', border: '1px solid var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--amber)', flexShrink: 0 }}>{post.initial}</div>
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.05em' }}>{post.brand}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '120px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '20px' }}>Investment</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, lineHeight: 1.05, marginBottom: '60px' }}>
          Simple pricing.<br /><em style={{ fontStyle: 'italic', color: 'rgba(240,234,216,0.45)' }}>No surprises.</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          {[
            { tier: 'Starter', price: '49', features: ['3 platforms', '12 posts / month', 'Brand voice setup', 'Content calendar'], cta: 'Get Started', featured: false },
            { tier: 'Studio', price: '129', features: ['All 6 platforms', 'Unlimited posts', 'Custom voice fine-tune', 'Priority publishing', 'Monthly report'], cta: 'Start Free Trial', featured: true },
            { tier: 'Agency', price: '399', features: ['Up to 10 brands', 'White-label output', 'API access', 'Dedicated support'], cta: 'Contact Sales', featured: false },
          ].map((plan) => (
            <div key={plan.tier} style={{ background: plan.featured ? 'var(--graphite)' : 'var(--carbon)', padding: '52px 40px', position: 'relative' }}>
              {plan.featured && (
                <span style={{ position: 'absolute', top: '20px', right: '20px', fontFamily: 'var(--font-dm-mono)', fontSize: '9px', letterSpacing: '0.2em', color: 'var(--amber)', border: '1px solid var(--amber)', padding: '4px 10px' }}>MOST POPULAR</span>
              )}
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '28px' }}>{plan.tier}</p>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '72px', fontWeight: 300, color: 'var(--cream)', lineHeight: 1, marginBottom: '4px' }}>
                <sup style={{ fontSize: '28px', verticalAlign: 'top', marginTop: '14px', display: 'inline-block', color: 'var(--amber)' }}>$</sup>{plan.price}
              </div>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: '36px' }}>per month</p>
              <ul style={{ listStyle: 'none', marginBottom: '40px' }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(240,234,216,0.7)', padding: '10px 0', borderBottom: '1px solid rgba(212,160,23,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: 'var(--amber)', fontFamily: 'var(--font-dm-mono)', fontSize: '12px' }}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" style={{
                display: 'block', width: '100%', padding: '16px', textAlign: 'center',
                background: plan.featured ? 'var(--amber)' : 'transparent',
                border: plan.featured ? '1px solid var(--amber)' : '1px solid var(--border)',
                color: plan.featured ? 'var(--black)' : 'var(--cream)',
                fontFamily: 'var(--font-syne)', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
                transition: 'all 0.3s',
              }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '160px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(212,160,23,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 300, lineHeight: 1, marginBottom: '24px' }}>
          Your brand.<br /><em style={{ fontStyle: 'italic', color: 'var(--amber)' }}>Always posting.</em>
        </h2>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '20px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(240,234,216,0.45)', marginBottom: '52px' }}>
          Drop your URL. We handle the rest.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <UrlForm placeholder="yourbusiness.com" btnText="Activate Now" />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)' }}>Sovereign Social</div>
        <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--muted)' }}>© 2026 Sovereign Social. All rights reserved.</div>
        <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
          Built on Claude by Anthropic
        </div>
      </footer>
    </>
  )
}
