interface HeaderProps {
  onSettingsClick: () => void
  onHistoryClick: () => void
}

function SparkleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0 L9.2 5.8 L15 7 L9.2 8.2 L8 14 L6.8 8.2 L1 7 L6.8 5.8 Z" fill="#dc2626"/>
    </svg>
  )
}

function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

export default function Header({ onSettingsClick, onHistoryClick }: HeaderProps) {
  return (
    <header style={{ backgroundColor: 'white', borderBottom: '1px solid #f1f0ef' }}
      className="sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-5 py-2 flex items-center justify-between">

        {/* Logo + brand name */}
        <div className="flex items-center gap-3">
          {/*
            mix-blend-mode: multiply  → blends white/grey PNG areas into the white header,
            making the background completely invisible while preserving the red/orange logo colors.
          */}
          <img
            src="/logo-icon.png"
            alt="Ephpha logo"
            width={72}
            height={72}
            style={{
              objectFit: 'contain',
              display: 'block',
              mixBlendMode: 'multiply',
            }}
          />

          {/* "Ephpha" as a single red→orange gradient, ".ai" stays grey */}
          <div className="leading-none">
            <span
              className="font-extrabold tracking-tight"
              style={{
                fontSize: '22px',
                background: 'linear-gradient(to right, #dc2626 0%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ephpha
            </span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#a8a29e',
                marginLeft: '1px',
              }}
            >
              .ai
            </span>
          </div>
        </div>

        {/* Nav right: sparkle tagline + gear */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSettingsClick}
            className="flex items-center gap-1.5 font-medium text-sm transition-opacity hover:opacity-75"
            style={{ color: '#f97316' }}
          >
            <SparkleIcon />
            Unlock your email opens
          </button>
          <button
            onClick={onHistoryClick}
            className="transition-opacity hover:opacity-50"
            style={{ color: '#a8a29e' }}
            title="History"
          >
            <GearIcon />
          </button>
        </div>

      </div>
    </header>
  )
}
