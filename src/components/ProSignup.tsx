import { useState } from 'react'

const STORAGE_KEY = 'ephpha-pro-signup'

export default function ProSignup() {
  const alreadySignedUp = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1'
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(alreadySignedUp ? 'success' : 'idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed.includes('@') || !trimmed.includes('.')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }
    setErrorMsg('')
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      if (!res.ok) throw new Error('Server error')
      localStorage.setItem(STORAGE_KEY, '1')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        margin: '24px 16px 0',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: '#fff',
        borderRadius: '16px',
        padding: '20px 24px',
        boxShadow: '0 2px 12px rgba(220,38,38,0.08)',
        border: '1px solid rgba(220,38,38,0.12)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '15px', fontWeight: 600, color: '#1f2937', margin: 0 }}>
          You're on the list! We'll be in touch. 🎉
        </p>
      </div>
    )
  }

  return (
    <div style={{
      margin: '24px 16px 0',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      background: '#fff',
      borderRadius: '16px',
      padding: '20px 24px',
      boxShadow: '0 2px 12px rgba(220,38,38,0.08)',
      border: '1px solid rgba(220,38,38,0.12)',
    }}>
      {/* Sparkle accent */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 0 L9 6.5 L16 8 L9 9.5 L8 16 L7 9.5 L0 8 L7 6.5 Z" fill="#dc2626" opacity="0.8"/>
        </svg>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#dc2626', textTransform: 'uppercase' }}>
          Coming Soon
        </span>
      </div>

      <p style={{ fontWeight: 800, fontSize: '17px', color: '#1f2937', margin: '0 0 4px', lineHeight: 1.3 }}>
        Pro is coming. Get early access.
      </p>
      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 14px', lineHeight: 1.5 }}>
        Be first to know when Ephpha Pro launches — priority access, launch pricing, and no spam. Ever.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrorMsg(''); if (status === 'error') setStatus('idle') }}
          placeholder="Enter your email"
          style={{
            flex: 1,
            minWidth: '180px',
            padding: '10px 14px',
            borderRadius: '999px',
            border: '1.5px solid #e5e7eb',
            fontSize: '14px',
            outline: 'none',
            fontFamily: 'inherit',
            color: '#1f2937',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: '10px 20px',
            borderRadius: '999px',
            border: 'none',
            background: 'linear-gradient(to right, #dc2626, #ea580c)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '14px',
            cursor: status === 'loading' ? 'default' : 'pointer',
            opacity: status === 'loading' ? 0.75 : 1,
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.15s',
          }}
        >
          {status === 'loading' ? 'Saving...' : 'Notify Me'}
        </button>
      </form>

      {errorMsg && (
        <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#dc2626' }}>{errorMsg}</p>
      )}
      {status === 'error' && !errorMsg && (
        <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#dc2626' }}>
          Something went wrong — please try again.
        </p>
      )}
    </div>
  )
}
