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
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      borderRadius: '8px',
      width: '28px',
      height: '28px',
      flexShrink: 0,
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#dc2626" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/>
      </svg>
    </span>
  )
}

function SpinnerBadge() {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      borderRadius: '8px',
      width: '28px',
      height: '28px',
      flexShrink: 0,
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite', transformOrigin: 'center' }}>
        <circle cx="12" cy="12" r="9" stroke="#dc2626" strokeWidth="3" strokeDasharray="28 14" strokeLinecap="round"/>
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
    ? {
        backgroundColor: '#dc2626',
        color: 'white',
        cursor: 'pointer',
        opacity: 1,
      }
    : {
        backgroundColor: '#dc2626',
        color: 'white',
        cursor: hasText ? 'wait' : 'not-allowed',
        opacity: 0.6,
      }

  return (
    <section className="py-10 sm:py-14 px-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Headline */}
        <div className="text-center mb-7 sm:mb-9 flex flex-col items-center">
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em',
            color: 'var(--brand-deep)', background: 'rgba(220,38,38,0.07)',
            border: '1px solid rgba(220,38,38,0.14)', borderRadius: '999px',
            padding: '5px 12px', marginBottom: '18px', textTransform: 'uppercase',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--brand)"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/></svg>
            Subject Line Scoring
          </span>
          <h1
            className="text-center mb-3"
            style={{
              fontSize: 'clamp(1.9rem, 6vw, 3.15rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: 'var(--ink)',
              maxWidth: '18ch',
            }}
          >
            Subject lines that get <span style={{ color: 'var(--brand)' }}>opened</span>
          </h1>

          {/* Subtitle */}
          <p className="text-center px-2" style={{ color: 'var(--ink-soft)', fontSize: '16px', fontWeight: 400, lineHeight: 1.55, maxWidth: '34ch' }}>
            Ephpha gives your emails the edge they need to stand out in any inbox.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          {/* Label */}
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#1f2937', marginBottom: '4px' }}>
            Your subject line
          </label>

          {/* Textarea with character counter */}
          <div style={{ position: 'relative' }} className="w-full">
            <textarea
              value={subject}
              onChange={e => onSubjectChange(e.target.value.slice(0, MAX_LEN))}
              placeholder="Paste your email subject line here..."
              rows={3}
              disabled={isAnalyzing}
              style={{
                width: '100%',
                padding: '15px 16px 34px 16px',
                borderRadius: 'var(--r-md)',
                border: `1px solid ${error ? '#dc2626' : '#e2ddd9'}`,
                backgroundColor: 'white',
                fontSize: '16px',
                color: 'var(--ink)',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s, box-shadow 0.15s',
                lineHeight: '1.5',
                boxSizing: 'border-box',
                boxShadow: 'var(--shadow-sm)',
              }}
              onFocus={e => {
                if (!error) {
                  e.currentTarget.style.borderColor = '#dc2626'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.14)'
                }
              }}
              onBlur={e => {
                if (!error) {
                  e.currentTarget.style.borderColor = '#e2ddd9'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            />
            <span style={{
              position: 'absolute',
              bottom: '10px',
              right: '14px',
              fontSize: '13px',
              fontWeight: 500,
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
              borderRadius: 'var(--r-md)',
              border: 'none',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              fontFamily: 'inherit',
              boxShadow: hasText && !isAnalyzing ? 'var(--shadow-brand)' : 'none',
              transition: 'opacity 0.15s, transform 0.15s, box-shadow 0.15s',
            }}
            className="min-h-[52px] px-4"
            onMouseEnter={e => { if (hasText && !isAnalyzing) e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {isAnalyzing ? <SpinnerBadge /> : <BoltBadge />}
            {isAnalyzing ? (loadingMessage || 'Analyzing...') : 'Analyze'}
          </button>
        </form>
      </div>
    </section>
  )
}
