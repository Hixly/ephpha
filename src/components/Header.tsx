interface HeaderProps {
  onSettingsClick: () => void
  onHistoryClick: () => void
}

function LogoIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="22" width="56" height="36" rx="4" fill="#dc2626"/>
      <path d="M4 28 L32 44 L60 28" stroke="#b91c1c" strokeWidth="2" fill="none"/>
      <path d="M36 6 L24 32 L33 32 L28 54 L44 26 L35 26 Z" fill="white"/>
      <line x1="44" y1="4"  x2="47" y2="10" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="51" y1="8"  x2="48" y2="13" stroke="#f87171" strokeWidth="2"   strokeLinecap="round"/>
      <line x1="54" y1="16" x2="49" y2="17" stroke="#f87171" strokeWidth="2"   strokeLinecap="round"/>
    </svg>
  )
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
      <div className="max-w-4xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo + brand name */}
        <div className="flex items-center gap-3">
          <LogoIcon />
          <span className="font-bold tracking-tight leading-none" style={{ fontSize: '20px' }}>
            <span style={{ color: '#1c1917' }}>Eph</span>
            <span style={{ color: '#f97316' }}>pha</span>
            <span style={{ color: '#a8a29e', fontSize: '0.78em', fontWeight: 500 }}>.ai</span>
          </span>
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
