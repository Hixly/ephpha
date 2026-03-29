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
        <div
          style={{
            background: 'linear-gradient(135deg, #fff1f0 0%, #fff7ed 100%)',
            border: '1.5px solid #fca5a5',
            borderRadius: '14px',
            padding: '16px 18px',
          }}
        >
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The Ancient Word
          </p>
          <p style={{ fontSize: '14px', color: '#1c1917', lineHeight: 1.6, margin: 0 }}>
            <strong>Ephphatha</strong> <span style={{ color: '#78716c' }}>(אפתחא in Aramaic)</span> is an ancient command that means{' '}
            <GradientText><strong>"Be opened."</strong></GradientText>{' '}
            It is a word spoken to unlock what is closed — to reveal what is hidden — to give something the power to be heard.
          </p>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #fff7ed 0%, #fff1f0 100%)',
            border: '1.5px solid #fdba74',
            borderRadius: '14px',
            padding: '16px 18px',
          }}
        >
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#f97316', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The Modern Connection
          </p>
          <p style={{ fontSize: '14px', color: '#1c1917', lineHeight: 1.6, margin: 0 }}>
            Just as the word commands doors to open,{' '}
            <GradientText><strong>Ephpha commands emails to get opened.</strong></GradientText>{' '}
            Your subject line is the door. We help you unlock it — so your message finally gets the attention it deserves.
          </p>
        </div>

        <div style={{ textAlign: 'center', paddingTop: '4px' }}>
          <p style={{ fontSize: '14px', color: '#78716c', fontStyle: 'italic', margin: 0 }}>
            ✉️ Ancient wisdom. Modern inbox. <GradientText><strong>More opens.</strong></GradientText>
          </p>
        </div>
      </div>
    </div>
  )
}

function ProTab() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
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
            You're on the list!
          </p>
          <p style={{ fontSize: '13px', color: '#15803d', marginTop: '4px', margin: '4px 0 0' }}>
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
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1.5px solid #e7e5e4',
              fontSize: '14px',
              color: '#1c1917',
              fontFamily: 'inherit',
              outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#f97316' }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e7e5e4' }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '13px 20px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(to right, #dc2626, #f97316)',
              color: 'white',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
            onMouseOver={e => { e.currentTarget.style.opacity = '0.9' }}
            onMouseOut={e => { e.currentTarget.style.opacity = '1' }}
          >
            Join the Waitlist
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
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.45)',
        padding: '16px',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.18)',
          overflow: 'hidden',
        }}
      >
        {/* Tab bar */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #f1f0ef',
            backgroundColor: '#fafaf9',
          }}
        >
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '13px 6px',
                fontSize: '12px',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontFamily: 'inherit',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2.5px solid #dc2626' : '2.5px solid transparent',
                background: 'none',
                cursor: 'pointer',
                color: activeTab === tab.id ? '#dc2626' : '#a8a29e',
                transition: 'all 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: '24px 24px 20px' }}>
          {activeTab === 'about'  && <AboutTab />}
          {activeTab === 'origin' && <OriginTab />}
          {activeTab === 'pro'    && <ProTab />}
        </div>

        {/* Close button */}
        <div style={{ padding: '0 24px 20px', textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 32px',
              borderRadius: '10px',
              border: '1.5px solid #e7e5e4',
              background: 'white',
              color: '#78716c',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'all 0.15s',
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
