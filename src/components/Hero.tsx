interface HeroProps {
  subject: string
  onSubjectChange: (value: string) => void
  onAnalyze: () => void
  isAnalyzing: boolean
  error: string
  loadingMessage: string
}

function BoltBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: 'white', borderRadius: '8px', width: '32px', height: '32px', flexShrink: 0,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#dc2626" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/>
      </svg>
    </span>
  )
}

function SpinnerBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: 'white', borderRadius: '8px', width: '32px', height: '32px', flexShrink: 0,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        style={{ animation: 'spin 0.8s linear infinite', transformOrigin: 'center' }}>
        <circle cx="12" cy="12" r="9" stroke="#dc2626" strokeWidth="3"
          strokeDasharray="28 14" strokeLinecap="round"/>
      </svg>
    </span>
  )
}

const MAX_LEN = 60

export default function Hero({ subject, onSubjectChange, onAnalyze, isAnalyzing, error, loadingMessage }: HeroProps) {
  const hasText = subject.trim().length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnalyze()
  }

  const btnStyle: React.CSSProperties = hasText && !isAnalyzing
    ? { background: 'linear-gradient(to right, #dc2626, #f97316)', color: 'white', cursor: 'pointer' }
    : { backgroundColor: '#c4ccd6', color: '#94a3b8', cursor: hasText ? 'wait' : 'not-allowed' }

  return (
    <section className="py-14 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Headline */}
        <h1 className="text-center font-extrabold leading-tight tracking-tight mb-3"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Subject Lines That{' '}
          <span style={{ color: '#991b1b' }}>Get</span>{' '}
          <span style={{ color: '#f97316' }}>Opened</span>
        </h1>

        {/* Subtitle */}
        <p className="text-center mb-8" style={{ color: '#78716c', fontSize: '15px' }}>
          Ephpha gives your emails the edge they need to stand out in any inbox
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Textarea with character counter */}
          {/* FIX 3: border always neutral grey — red only on error state */}
          <div style={{ position: 'relative' }}>
            <textarea
              value={subject}
              onChange={e => onSubjectChange(e.target.value.slice(0, MAX_LEN))}
              placeholder="Paste your email subject line here..."
              rows={3}
              disabled={isAnalyzing}
              style={{
                width: '100%',
                padding: '16px 20px 32px 20px',
                borderRadius: '16px',
                border: `2px solid ${error ? '#dc2626' : '#e7e5e4'}`,
                backgroundColor: 'white',
                fontSize: '15px',
                color: '#1c1917',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s',
                lineHeight: '1.5',
              }}
              onFocus={e => {
                if (!error) e.currentTarget.style.borderColor = '#d1d5db'
              }}
              onBlur={e => {
                if (!error) e.currentTarget.style.borderColor = '#e7e5e4'
              }}
            />
            <span style={{
              position: 'absolute', bottom: '10px', right: '16px',
              fontSize: '13px', fontWeight: 500,
              color: hasText ? '#f97316' : '#a8a29e',
              pointerEvents: 'none',
            }}>
              {subject.length}/{MAX_LEN}
            </span>
          </div>

          {error && (
            <p style={{ color: '#dc2626', fontSize: '14px', paddingLeft: '4px' }}>{error}</p>
          )}

          {/* Analyze button */}
          <button
            type="submit"
            disabled={!hasText || isAnalyzing}
            style={{
              ...btnStyle,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px 20px',
              borderRadius: '16px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 700,
              fontFamily: 'inherit',
              transition: 'opacity 0.15s',
            }}
          >
            {isAnalyzing ? <SpinnerBadge /> : <BoltBadge />}
            {isAnalyzing ? (loadingMessage || 'Analyzing...') : 'Analyze'}
          </button>

        </form>
      </div>
    </section>
  )
}
