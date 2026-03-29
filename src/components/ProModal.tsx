import { useState } from 'react'

interface ProModalProps {
  onClose: () => void
}

function LogoIcon() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
      <img
        src="/logo-icon.png"
        alt="Ephpha logo"
        width={72}
        height={72}
        style={{ objectFit: 'contain', display: 'block' }}
      />
    </div>
  )
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: 'linear-gradient(to right, #dc2626 0%, #f97316 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </span>
  )
}

function AboutTab() {
  return (
    <div style={{ textAlign: 'center' }}>
      <LogoIcon />

      <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px', color: '#1c1917' }}>
        Welcome to <GradientText>Ephpha</GradientText>
      </h2>

      <p style={{ fontSize: '15px', color: '#78716c', marginBottom: '20px' }}>
        Your email's secret weapon for more opens
      </p>

      {/* Feature bullets */}
      <div
        style={{
          background: 'linear-gradient(135deg, #fff1f0 0%, #fff7ed 100%)',
          border: '1.5px solid #fca5a5',
          borderRadius: '14px',
          padding: '16px 20px',
          marginBottom: '20px',
          textAlign: 'left',
        }}
      >
        {[
          { icon: '📬', text: 'Stand out in every inbox' },
          { icon: '🤖', text: 'AI-powered analysis' },
          { icon: '✨', text: '3 AI alternatives per analysis' },
          { icon: '📋', text: 'Save history' },
        ].map(({ icon, text }) => (
          <div
            key={text}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '7px 0',
              fontSize: '14px',
              fontWeight: 600,
              color: '#1c1917',
            }}
          >
            <span style={{ fontSize: '18px' }}>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '14px', color: '#a8a29e', fontStyle: 'italic' }}>
        🚀 Your emails are about to get <strong style={{ color: '#dc2626' }}>WAY</strong> better opens
      </p>
    </div>
  )
}

function OriginTab() {
  return (
    <div style={{ textAlign: 'center' }}>
      <LogoIcon />

      <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '14px', color: '#1c1917' }}>
        The Story Behind <GradientText>Ephpha</GradientText>
      </h2>

      <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Box 1 — The ancient root */}
        <div
          style={{
            background: 'linear-gradient(135deg, #fff1f0 0%, #fff7ed 100%)',
            border: '1.5px solid #fca5a5',
            borderRadius: '14px',
            padding: '16px 18px',
          }}
        >
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The Ancient Root
          </p>
          <p style={{ fontSize: '14px', color: '#1c1917', lineHeight: 1.6, margin: 0 }}>
            The word <strong>Ephphatha</strong> <span style={{ color: '#78716c' }}>(אפתחא in Aramaic)</span> is an ancient command meaning{' '}
            <GradientText><strong>"Be opened."</strong></GradientText>{' '}
            It was spoken to unlock what is closed — to give something the power to finally be heard.
          </p>
        </div>

        {/* Box 2 — Why we shortened it */}
        <div
          style={{
            background: 'linear-gradient(135deg, #fff7ed 0%, #fff1f0 100%)',
            border: '1.5px solid #fdba74',
            borderRadius: '14px',
            padding: '16px 18px',
          }}
        >
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#f97316', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The Modern Name
          </p>
          <p style={{ fontSize: '14px', color: '#1c1917', lineHeight: 1.6, margin: 0 }}>
            We stripped it down to <GradientText><strong>Ephpha</strong></GradientText> — sharper, faster, built for the digital world.
            The full word belongs to ancient texts. The short form belongs to your inbox.{' '}
            Same command. New medium. <GradientText><strong>Get opened.</strong></GradientText>
          </p>
        </div>

        {/* Box 3 — The mission */}
        <div
          style={{
            background: 'linear-gradient(135deg, #fff1f0 0%, #fff7ed 100%)',
            border: '1.5px solid #fca5a5',
            borderRadius: '14px',
            padding: '16px 18px',
          }}
        >
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            What It Means For You
          </p>
          <p style={{ fontSize: '14px', color: '#1c1917', lineHeight: 1.6, margin: 0 }}>
            Every email you send is a door waiting to be opened. Your subject line is the key.{' '}
            <GradientText><strong>Ephpha gives you that key</strong></GradientText> — AI-powered analysis that transforms a subject line people scroll past into one they have to click.
          </p>
        </div>

        <div style={{ textAlign: 'center', paddingTop: '2px' }}>
          <p style={{ fontSize: '13px', color: '#a8a29e', fontStyle: 'italic', margin: 0 }}>
            ✉️ Ancient word. Modern tool. <GradientText><strong>Unstoppable emails.</strong></GradientText>
          </p>
        </div>
      </div>
    </div>
  )
}

function ProTab() {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    setFormError('')

    try {
      const res = await fetch('https://formspree.io/f/xzdkebwz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setFormError(data?.errors?.[0]?.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setFormError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '12px' }}>🚀</div>

      <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px', color: '#1c1917' }}>
        <GradientText>Pro Plan</GradientText> — Coming Soon
      </h2>

      <p style={{ fontSize: '14px', color: '#78716c', marginBottom: '20px' }}>
        Unlimited analyses, team sharing, advanced analytics, and more.
      </p>

      {submitted ? (
        <div
          style={{
            background: 'linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)',
            border: '1.5px solid #86efac',
            borderRadius: '14px',
            padding: '20px',
          }}
        >
          <p style={{ fontSize: '24px', marginBottom: '6px' }}>🎉</p>
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#16a34a', margin: 0 }}>
            Thanks! You're on the list!
          </p>
          <p style={{ fontSize: '13px', color: '#15803d', margin: '6px 0 0' }}>
            We'll email you the moment Pro launches.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: `1.5px solid ${formError ? '#dc2626' : '#e7e5e4'}`,
              fontSize: '16px',
              color: '#1c1917',
              fontFamily: 'inherit',
              outline: 'none',
              boxSizing: 'border-box',
              opacity: isLoading ? 0.6 : 1,
            }}
            onFocus={e => { if (!formError) e.currentTarget.style.borderColor = '#f97316' }}
            onBlur={e => { if (!formError) e.currentTarget.style.borderColor = '#e7e5e4' }}
          />

          {formError && (
            <p style={{ fontSize: '13px', color: '#dc2626', margin: 0, textAlign: 'left', paddingLeft: '4px' }}>
              ⚠️ {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            style={{
              width: '100%',
              padding: '13px 20px',
              borderRadius: '12px',
              border: 'none',
              background: isLoading
                ? '#c4ccd6'
                : 'linear-gradient(to right, #dc2626, #f97316)',
              color: isLoading ? '#94a3b8' : 'white',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: isLoading ? 'wait' : 'pointer',
              transition: 'opacity 0.15s',
              minHeight: '48px',
            }}
          >
            {isLoading ? 'Submitting...' : 'Join the Waitlist'}
          </button>

          <p style={{ fontSize: '12px', color: '#a8a29e', margin: 0 }}>
            No spam. Ever. We promise. 🤞
          </p>
        </form>
      )}
    </div>
  )
}

const TABS = [
  { id: 'about',  label: 'About Ephpha' },
  { id: 'origin', label: 'Origin & Meaning' },
  { id: 'pro',    label: 'Pro Plan' },
] as const

type TabId = typeof TABS[number]['id']

export default function ProModal({ onClose }: ProModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('about')

  return (
    /* Overlay — aligns to bottom on mobile, center on sm+ */
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex',
        alignItems: 'flex-end',   /* sheet slides up from bottom on mobile */
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.45)',
      }}
      className="sm:items-center sm:p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Modal card — flex column so content scrolls between fixed header & footer */}
      <div
        style={{
          backgroundColor: 'white',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
          /* max-height: leave room for browser chrome on mobile */
          maxHeight: '90dvh',
          /* rounded top corners only on mobile, all corners on sm+ */
          borderRadius: '24px 24px 0 0',
        }}
        className="sm:rounded-3xl"
      >
        {/* ── FIXED: Tab bar ── */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #f1f0ef',
            backgroundColor: '#fafaf9',
            flexShrink: 0,
            borderRadius: '24px 24px 0 0',
          }}
          className="sm:rounded-t-3xl"
        >
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '13px 4px',
                fontSize: '11px',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontFamily: 'inherit',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2.5px solid #dc2626' : '2.5px solid transparent',
                background: 'none',
                cursor: 'pointer',
                color: activeTab === tab.id ? '#dc2626' : '#a8a29e',
                transition: 'all 0.15s',
                minHeight: '48px',
              }}
              className="sm:text-xs sm:px-2"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── SCROLLABLE: Tab content ── */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '20px 20px 4px' }} className="sm:px-6 sm:pt-6">
          {activeTab === 'about'  && <AboutTab />}
          {activeTab === 'origin' && <OriginTab />}
          {activeTab === 'pro'    && <ProTab />}
        </div>

        {/* ── FIXED: Close button always visible at bottom ── */}
        <div
          style={{
            flexShrink: 0,
            padding: '12px 20px 20px',
            textAlign: 'center',
            borderTop: '1px solid #f1f0ef',
            backgroundColor: 'white',
          }}
          className="sm:px-6 sm:pb-6"
        >
          <button
            onClick={onClose}
            style={{
              padding: '11px 40px',
              borderRadius: '12px',
              border: '1.5px solid #e7e5e4',
              background: 'white',
              color: '#78716c',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'all 0.15s',
              minHeight: '44px',
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = '#d1d5db' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = '#e7e5e4' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
