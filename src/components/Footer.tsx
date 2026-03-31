function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function SubstackIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
    </svg>
  )
}

function HackerNoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 24V0h4.406v9.66h.11L9.875 0H14.5L8.887 10.423 15 24h-4.844l-4.129-9.668-.221.11V24H0zm24 0h-4.406v-9.66h-.113L14.125 24H9.5l5.613-10.423L9 0h4.844l4.129 9.668.221-.11V0H24v24z"/>
    </svg>
  )
}

function MediumIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #f1f0ef', backgroundColor: 'white' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-5 py-4 flex items-center justify-between">
        <span style={{ fontSize: '13px', color: '#a8a29e', fontWeight: 500 }}>
          Ephpha{' '}
          <span style={{
            background: 'linear-gradient(to right, #dc2626, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 700,
          }}>©</span>{' '}
          2026
        </span>

        <div className="flex items-center gap-4 sm:gap-5">
          <a
            href="https://www.instagram.com/ephpha.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            style={{ color: '#a8a29e' }}
            onMouseOver={e => (e.currentTarget.style.color = '#dc2626')}
            onMouseOut={e => (e.currentTarget.style.color = '#a8a29e')}
            aria-label="Ephpha on Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://x.com/EphphaMail"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            style={{ color: '#a8a29e' }}
            onMouseOver={e => (e.currentTarget.style.color = '#f97316')}
            onMouseOut={e => (e.currentTarget.style.color = '#a8a29e')}
            aria-label="Ephpha on X"
          >
            <XIcon />
          </a>
          <a
            href="https://substack.com/@ephpha/notes"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            style={{ color: '#a8a29e' }}
            onMouseOver={e => (e.currentTarget.style.color = '#f97316')}
            onMouseOut={e => (e.currentTarget.style.color = '#a8a29e')}
            aria-label="Ephpha on Substack"
          >
            <SubstackIcon />
          </a>
          <a
            href="https://hackernoon.com/u/ephpha"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            style={{ color: '#a8a29e' }}
            onMouseOver={e => (e.currentTarget.style.color = '#00ff00')}
            onMouseOut={e => (e.currentTarget.style.color = '#a8a29e')}
            aria-label="Ephpha on HackerNoon"
          >
            <HackerNoonIcon />
          </a>
          <a
            href="https://medium.com/@ephpha.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            style={{ color: '#a8a29e' }}
            onMouseOver={e => (e.currentTarget.style.color = '#00ab6c')}
            onMouseOut={e => (e.currentTarget.style.color = '#a8a29e')}
            aria-label="Ephpha on Medium"
            title="Medium"
          >
            <MediumIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}
