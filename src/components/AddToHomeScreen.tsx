function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    </svg>
  )
}

function PlusSquareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" /><path d="M12 8v8M8 12h8" />
    </svg>
  )
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <span style={{
        flexShrink: 0, width: '20px', height: '20px', borderRadius: '999px',
        background: 'rgba(220,38,38,0.07)', color: 'var(--brand-deep)',
        fontSize: '11px', fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px',
      }}>{n}</span>
      <span style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.5 }}>{children}</span>
    </div>
  )
}

export default function AddToHomeScreen() {
  return (
    <div style={{
      margin: '16px auto 0',
      maxWidth: '600px',
      background: 'var(--surface)',
      borderRadius: 'var(--r-lg)',
      padding: '20px 24px',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--line)',
    }}>
      {/* App icon + kicker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <img
          src="/apple-touch-icon.png"
          alt="Ephpha app icon"
          width={40}
          height={40}
          style={{ width: '40px', height: '40px', borderRadius: '11px', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}
        />
        <div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em',
            color: 'var(--brand-deep)', background: 'rgba(220,38,38,0.07)',
            border: '1px solid rgba(220,38,38,0.14)', borderRadius: '999px',
            padding: '4px 10px', textTransform: 'uppercase',
          }}>
            Add to Home Screen
          </span>
        </div>
      </div>

      <p style={{ fontWeight: 800, fontSize: '17px', color: 'var(--ink)', margin: '0 0 4px', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
        Get the full app feel
      </p>
      <p style={{ fontSize: '13px', color: 'var(--ink-soft)', margin: '0 0 16px', lineHeight: 1.5 }}>
        Save Ephpha to your phone's home screen and it opens like a native app — full screen, its own icon, one tap away.
      </p>

      {/* Two-platform guide */}
      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: '1fr' }} className="sm:grid-cols-2">
        {/* iPhone */}
        <div style={{ background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: '14px 16px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            iPhone &amp; iPad
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Step n={1}>Open this page in <strong style={{ color: 'var(--ink)' }}>Safari</strong></Step>
            <Step n={2}>
              Tap the <strong style={{ color: 'var(--ink)' }}>Share</strong> button
              <span style={{ display: 'inline-flex', verticalAlign: 'middle', margin: '0 4px', color: 'var(--brand)' }}><ShareIcon /></span>
            </Step>
            <Step n={3}>Choose <strong style={{ color: 'var(--ink)' }}>Add to Home Screen</strong></Step>
          </div>
        </div>

        {/* Android */}
        <div style={{ background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: '14px 16px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Android
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Step n={1}>Open this page in <strong style={{ color: 'var(--ink)' }}>Chrome</strong></Step>
            <Step n={2}>Tap the <strong style={{ color: 'var(--ink)' }}>⋮</strong> menu (top right)</Step>
            <Step n={3}>
              Choose <strong style={{ color: 'var(--ink)' }}>Install app</strong>
              <span style={{ display: 'inline-flex', verticalAlign: 'middle', margin: '0 4px', color: 'var(--brand)' }}><PlusSquareIcon /></span>
            </Step>
          </div>
        </div>
      </div>
    </div>
  )
}
