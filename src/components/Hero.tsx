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
        background: 'linear-gradient(to right, #dc2626, #f97316)',
        color: 'white',
        cursor: 'pointer',
        opacity: 1,
      }
    : {
        background: 'linear-gradient(to right, #dc2626, #f97316)',
        color: 'white',
        cursor: hasText ? 'wait' : 'not-allowed',
        opacity: 0.5,
      }

  return (
    <section className="py-10 sm:py-14 px-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Headline */}
        <h1
          className="text-center font-extrabold leading-tight tracking-tight mb-3"
          style={{
            fontSize: 'clamp(1.75rem, 6vw, 3rem)',
            background: 'linear-gradient(to right, #dc2626 0%, #c2410c 35%, #ea580c 60%, #f97316 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Subject Lines That Get Opened
        </h1>

        {/* Subtitle */}
        <p className="text-center mb-6 sm:mb-8 px-2" style={{ color: '#6b7280', fontSize: '15px', fontWeight: 400 }}>
          Ephpha gives your emails the edge they need to stand out in any inbox
        </p>

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
                padding: '14px 16px 32px 16px',
                borderRadius: '12px',
                border: `1px solid ${error ? '#dc2626' : '#e5e7eb'}`,
                backgroundColor: 'white',
                fontSize: '16px',
                color: '#1c1917',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.15s, box-shadow 0.15s',
                lineHeight: '1.5',
                boxSizing: 'border-box',
              }}
              onFocus={e => {
                if (!error) {
                  e.currentTarget.style.borderColor = '#f97316'
                  e.currentTarget.style.boxShadow = '0 0 0 2px #fed7aa'
                }
              }}
              onBlur={e => {
                if (!error) {
                  e.currentTarget.style.borderColor = '#e5e7eb'
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
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 700,
              fontFamily: 'inherit',
              transition: 'opacity 0.15s',
            }}
            className="min-h-[52px] px-4"
          >
            {isAnalyzing ? <SpinnerBadge /> : <BoltBadge />}
            {isAnalyzing ? (loadingMessage || 'Analyzing...') : 'Analyze'}
          </button>
        </form>
      </div>
    </section>
  )
}
