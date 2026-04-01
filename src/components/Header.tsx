interface HeaderProps {
  onSettingsClick: () => void
  onHistoryClick: () => void
  onNewSession: () => void
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0 L9.2 5.8 L15 7 L9.2 8.2 L8 14 L6.8 8.2 L1 7 L6.8 5.8 Z" fill="white"/>
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
    <header style={{ backgroundColor: 'white', borderBottom: '1px solid #f1f0ef' }}
      className="sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 py-2 flex items-center justify-between">

        {/* Logo + brand name */}
        <div className="flex items-center gap-2">
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
              className="font-extrabold tracking-tight"
              style={{
                fontSize: '26px',
                background: 'linear-gradient(to right, #dc2626 0%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ephpha
            </span>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#1c1917', marginLeft: '1px' }}>
              .ai
            </span>
          </div>
        </div>

        {/* Nav right */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onSettingsClick}
            title="Unlock your email opens"
            aria-label="Unlock your email opens"
            className="hidden sm:flex items-center gap-1.5 font-bold text-sm text-white bg-gradient-to-r from-red-700 to-amber-500 rounded-full min-h-[40px] px-4 transition-all hover:scale-105 hover:brightness-110 active:scale-95"
          >
            <SparkleIcon />
            Unlock your email opens
          </button>
          {/* Mobile: show just the sparkle icon */}
          <button
            onClick={onSettingsClick}
            title="Unlock your email opens"
            aria-label="Unlock your email opens"
            className="sm:hidden flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full bg-gradient-to-r from-red-700 to-amber-500 transition-all hover:brightness-110 active:scale-95"
          >
            <SparkleIcon />
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
