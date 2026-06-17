interface HeaderProps {
  onSettingsClick: () => void
  onHistoryClick: () => void
  onNewSession: () => void
}

function InfoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
    </svg>
  )
}

function HistoryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.364 2.636"/>
      <path d="M3 3v5h5"/>
      <path d="M12 7v5l3.5 2"/>
    </svg>
  )
}

function NewSessionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  )
}

export default function Header({ onSettingsClick, onHistoryClick, onNewSession }: HeaderProps) {
  return (
    <header style={{ backgroundColor: 'rgba(255,255,255,0.82)', borderBottom: '1px solid var(--line)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      className="sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 py-2 flex items-center justify-between gap-2 overflow-hidden">

        {/* Logo + brand name */}
        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
          <img
            src="/logo-icon.png"
            alt="Ephpha logo"
            width={100}
            height={100}
            className="w-[100px] h-[100px]"
            style={{ objectFit: 'contain', display: 'block', background: 'transparent', mixBlendMode: 'multiply' }}
          />
          <div className="leading-none">
            <span
              style={{
                fontSize: '26px',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                color: 'var(--brand)',
              }}
            >
              Ephpha
            </span>
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--muted)', marginLeft: '1px', letterSpacing: '-0.02em' }}>
              .ai
            </span>
          </div>
        </div>

        {/* Nav right */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* About Ephpha — ghost outline button (desktop) */}
          <button
            onClick={onSettingsClick}
            title="About Ephpha"
            aria-label="About Ephpha"
            className="hidden min-[600px]:flex items-center gap-1.5 font-semibold text-sm rounded-full min-h-[34px] px-3.5 transition-all hover:bg-red-50 active:scale-95"
            style={{ color: '#dc2626', border: '1.5px solid #dc2626', background: 'white', letterSpacing: '0.01em' }}
          >
            <InfoIcon />
            About Ephpha
          </button>
          {/* Mobile: icon-only version */}
          <button
            onClick={onSettingsClick}
            title="About Ephpha"
            aria-label="About Ephpha"
            className="min-[600px]:hidden flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full transition-colors hover:bg-orange-50 active:scale-95"
            style={{ color: '#dc2626' }}
          >
            <InfoIcon />
          </button>
          <button
            onClick={onHistoryClick}
            className="transition-opacity hover:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
            style={{ color: '#a8a29e' }}
            title="History"
          >
            <HistoryIcon />
          </button>
          <button
            onClick={onNewSession}
            className="transition-opacity hover:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
            style={{ color: '#a8a29e' }}
            title="New session"
            aria-label="New session"
          >
            <NewSessionIcon />
          </button>
        </div>

      </div>
    </header>
  )
}
