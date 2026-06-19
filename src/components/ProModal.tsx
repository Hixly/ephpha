import { useState } from 'react'

interface ProModalProps {
  onClose: () => void
}

/* ── Shared bits ─────────────────────────────────────────── */

function LogoIcon() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
      <img
        src="/apple-touch-icon.png"
        alt="Ephpha logo"
        width={60}
        height={60}
        style={{ width: '60px', height: '60px', borderRadius: '14px', boxShadow: 'var(--shadow-md)' }}
      />
    </div>
  )
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em',
      color: 'var(--brand-deep)', background: 'rgba(220,38,38,0.07)',
      border: '1px solid rgba(220,38,38,0.14)', borderRadius: '999px',
      padding: '5px 12px', textTransform: 'uppercase',
    }}>
      {children}
    </span>
  )
}

function Red({ children }: { children: React.ReactNode }) {
  return <span style={{ color: 'var(--brand)', fontWeight: 700 }}>{children}</span>
}

/* ── Icons (stroke, consistent with the rest of the app) ──── */

function PenIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
}
function InboxIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
    </svg>
  )
}
function SparkIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  )
}
function LayersIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  )
}
function SpeakerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
    </svg>
  )
}
function ArrowUpIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}

/* ── Tabs ────────────────────────────────────────────────── */

function AboutTab() {
  const features = [
    { icon: <PenIcon />, text: 'AI Email Writer — generate complete emails' },
    { icon: <InboxIcon />, text: 'Subject lines built to stand out in any inbox' },
    { icon: <SparkIcon />, text: 'Instant AI-powered scoring and analysis' },
    { icon: <LayersIcon />, text: 'Three sharper alternatives per analysis' },
    { icon: <ClockIcon />, text: 'Your recent work, saved to history' },
  ]

  return (
    <div style={{ textAlign: 'center' }}>
      <LogoIcon />
      <div style={{ marginBottom: '14px' }}><Kicker>AI Email Toolkit</Kicker></div>

      <h2 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '6px', color: 'var(--ink)' }}>
        Welcome to <Red>Ephpha</Red>
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--ink-soft)', marginBottom: '22px', lineHeight: 1.5 }}>
        Subject line optimizer and AI email writer.
      </p>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 'var(--r-lg)', padding: '8px 18px', marginBottom: '22px',
        textAlign: 'left', boxShadow: 'var(--shadow-sm)',
      }}>
        {features.map(({ icon, text }, i) => (
          <div key={text} style={{
            display: 'flex', alignItems: 'center', gap: '13px', padding: '13px 0',
            borderTop: i === 0 ? 'none' : '1px solid var(--line)',
          }}>
            <span style={{
              width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
              background: 'rgba(220,38,38,0.07)', color: 'var(--brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{icon}</span>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4 }}>{text}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
        Built to turn emails people scroll past into ones they <Red>open</Red>.
      </p>
    </div>
  )
}

function OriginTab() {
  return (
    <div style={{ textAlign: 'center' }}>
      <LogoIcon />
      <h2 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '18px', color: 'var(--ink)' }}>
        The story behind <Red>Ephpha</Red>
      </h2>

      <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: '16px 18px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ marginBottom: '8px' }}><Kicker>The Ancient Root</Kicker></div>
          <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
            The word <strong style={{ color: 'var(--ink)' }}>Ephphatha</strong> <span style={{ color: 'var(--muted)' }}>(אפתחא in Aramaic)</span> is an ancient command meaning{' '}
            <Red>"Be opened."</Red> It was spoken to unlock what is closed — to give something the power to finally be heard.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: '16px 18px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ marginBottom: '8px' }}><Kicker>The Modern Name</Kicker></div>
          <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
            We stripped it down to <Red>Ephpha</Red> — sharper, faster, built for the digital world.
            The full word belongs to ancient texts. The short form belongs to your inbox. Same command, new medium.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: '16px 18px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ marginBottom: '8px' }}><Kicker>What It Means For You</Kicker></div>
          <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
            Every email you send is a door waiting to be opened, and your subject line is the key.{' '}
            <Red>Ephpha gives you that key</Red> — AI-powered analysis that transforms a line people scroll past into one they have to click.
          </p>
        </div>

        <div style={{
          background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)',
          padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px',
        }}>
          <span style={{
            width: '40px', height: '40px', borderRadius: '11px', flexShrink: 0,
            background: 'rgba(220,38,38,0.07)', color: 'var(--brand)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><SpeakerIcon /></span>
          <div>
            <div style={{ marginBottom: '5px' }}><Kicker>How To Say It</Kicker></div>
            <p style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 3px', letterSpacing: '0.03em' }}>
              <Red>EF</Red><span>·fah</span>
            </p>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
              The <strong style={{ color: 'var(--ink-soft)' }}>"ph"</strong> sounds like <strong style={{ color: 'var(--ink-soft)' }}>"f"</strong> — two syllables, stress on the first.
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0', lineHeight: 1.5 }}>
          Ancient word, modern tool. <Red>Get opened.</Red>
        </p>
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
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
        <span style={{
          width: '56px', height: '56px', borderRadius: '16px',
          background: 'linear-gradient(135deg, #ef4444, #b91c1c)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-brand)',
        }}>
          <ArrowUpIcon />
        </span>
      </div>

      <div style={{ marginBottom: '12px' }}><Kicker>Coming Soon</Kicker></div>

      <h2 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '6px', color: 'var(--ink)' }}>
        <Red>Pro</Red> Plan
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-soft)', marginBottom: '22px', lineHeight: 1.5 }}>
        Unlimited analyses, team sharing, advanced analytics, and more.
      </p>

      {submitted ? (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 'var(--r-lg)', padding: '24px 20px', boxShadow: 'var(--shadow-sm)',
        }}>
          <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px' }}>
            You're on the list.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
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
              padding: '13px 16px',
              borderRadius: 'var(--r-md)',
              border: `1px solid ${formError ? 'var(--brand)' : '#e2ddd9'}`,
              fontSize: '16px',
              color: 'var(--ink)',
              fontFamily: 'inherit',
              outline: 'none',
              boxSizing: 'border-box',
              boxShadow: 'var(--shadow-sm)',
              opacity: isLoading ? 0.6 : 1,
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onFocus={e => { if (!formError) { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.14)' } }}
            onBlur={e => { if (!formError) { e.currentTarget.style.borderColor = '#e2ddd9'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' } }}
          />

          {formError && (
            <p style={{ fontSize: '13px', color: 'var(--brand)', margin: 0, textAlign: 'left', paddingLeft: '4px' }}>
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: 'var(--r-md)',
              border: 'none',
              background: '#dc2626',
              color: 'white',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              fontFamily: 'inherit',
              cursor: isLoading || !email.trim() ? 'not-allowed' : 'pointer',
              opacity: isLoading || !email.trim() ? 0.6 : 1,
              boxShadow: isLoading || !email.trim() ? 'none' : 'var(--shadow-brand)',
              transition: 'opacity 0.15s, transform 0.15s, box-shadow 0.15s',
              minHeight: '50px',
            }}
            onMouseEnter={e => { if (!isLoading && email.trim()) e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {isLoading ? 'Submitting...' : 'Join the Waitlist'}
          </button>

          <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
            No spam, ever. We promise.
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
        backgroundColor: 'rgba(26,23,21,0.45)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
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
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90dvh',
          borderRadius: '24px 24px 0 0',
        }}
        className="sm:rounded-3xl"
      >
        {/* ── FIXED: Tab bar ── */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--line)',
            backgroundColor: 'var(--canvas)',
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
                borderBottom: activeTab === tab.id ? '2.5px solid var(--brand)' : '2.5px solid transparent',
                background: 'none',
                cursor: 'pointer',
                color: activeTab === tab.id ? 'var(--brand)' : 'var(--muted)',
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
            borderTop: '1px solid var(--line)',
            backgroundColor: 'white',
          }}
          className="sm:px-6 sm:pb-6"
        >
          <button
            onClick={onClose}
            style={{
              padding: '11px 40px',
              borderRadius: 'var(--r-md)',
              border: '1px solid var(--line)',
              background: 'white',
              color: 'var(--ink-soft)',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'all 0.15s',
              minHeight: '44px',
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = '#d6d0cb'; e.currentTarget.style.background = 'var(--canvas)' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'white' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
