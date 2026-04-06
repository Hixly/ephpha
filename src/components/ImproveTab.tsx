import { useState } from 'react'

const TONE_OPTIONS = ['More Professional', 'More Conversational', 'More Concise'] as const
type ToneOption = typeof TONE_OPTIONS[number]

const LOADING_MSGS = [
  'Reading your email…',
  'Finding improvements…',
  'Polishing the copy…',
  'Almost done…',
]

interface ImproveResult {
  improvedEmail: string
  clarityScore: number
  toneScore: number
  ctaScore: number
  fixes: string[]
}

function scoreColor(score: number): string {
  if (score >= 8) return '#16a34a'
  if (score >= 5) return '#d97706'
  return '#dc2626'
}

export default function ImproveTab() {
  const [emailBody, setEmailBody] = useState('')
  const [toneTarget, setToneTarget] = useState<ToneOption | null>(null)
  const [isImproving, setIsImproving] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)
  const [result, setResult] = useState<ImproveResult | null>(null)
  const [originalEmail, setOriginalEmail] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const btnDisabled = !emailBody.trim() || isImproving

  const handleImprove = async () => {
    if (!emailBody.trim()) return
    setIsImproving(true)
    setError('')
    setResult(null)
    setOriginalEmail(emailBody)
    setMsgIndex(0)

    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % LOADING_MSGS.length)
    }, 2000)

    try {
      const response = await fetch('/api/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailBody: emailBody.trim(), toneTarget }),
      })
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        if (response.status === 429) throw new Error('Rate limit reached. Please wait a moment and try again.')
        throw new Error(errData.error || 'Something went wrong. Please try again.')
      }
      const data = await response.json() as ImproveResult
      if (!data.improvedEmail || typeof data.clarityScore !== 'number') {
        throw new Error('Unexpected response format from AI')
      }
      setResult({
        improvedEmail: data.improvedEmail,
        clarityScore: Math.min(10, Math.max(1, Math.round(data.clarityScore))),
        toneScore: Math.min(10, Math.max(1, Math.round(data.toneScore))),
        ctaScore: Math.min(10, Math.max(1, Math.round(data.ctaScore))),
        fixes: Array.isArray(data.fixes) ? data.fixes.slice(0, 4) : [],
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      clearInterval(interval)
      setIsImproving(false)
    }
  }

  const handleCopy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result.improvedEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-10 sm:py-14 px-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div
          className="text-center mb-8"
          style={{
            background: 'rgba(255,249,246,0.92)',
            borderRadius: '16px',
            padding: '20px 16px 12px',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        >
          <h1
            className="text-center font-extrabold leading-tight tracking-tight mb-3"
            style={{
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              background: 'linear-gradient(to right, #dc2626 0%, #c2410c 35%, #ea580c 60%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              WebkitTextStroke: '1.5px rgba(0,0,0,0.55)',
            }}
          >
            Improve Your Email
          </h1>
          <p className="text-center px-2" style={{ color: '#6b7280', fontSize: '15px', fontWeight: 400 }}>
            Paste a draft and get an improved version — with scores and specific fixes
          </p>
        </div>

        {/* Textarea */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#1f2937', marginBottom: '8px' }}>
            Paste your draft email
          </label>
          <textarea
            value={emailBody}
            onChange={e => { setEmailBody(e.target.value); if (error) setError('') }}
            placeholder="Paste the email you've already written — body only, no subject line needed..."
            rows={8}
            disabled={isImproving}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              fontSize: '15px',
              color: '#1c1917',
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'inherit',
              lineHeight: '1.55',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = '#f97316'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(251,146,60,0.2)'
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#d1d5db'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
        </div>

        {/* Tone pills */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#1f2937', marginBottom: '10px' }}>
            Tone target <span style={{ fontWeight: 400, color: '#9ca3af' }}>(optional)</span>
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {TONE_OPTIONS.map(tone => (
              <button
                key={tone}
                onClick={() => setToneTarget(toneTarget === tone ? null : tone)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: toneTarget === tone ? '2px solid #f97316' : '1px solid #e5e7eb',
                  backgroundColor: toneTarget === tone ? '#fff7ed' : '#f9fafb',
                  color: toneTarget === tone ? '#c2410c' : '#374151',
                  fontWeight: toneTarget === tone ? 600 : 400,
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* CTA button */}
        <button
          onClick={handleImprove}
          disabled={btnDisabled}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            borderRadius: '12px',
            border: 'none',
            height: '52px',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: btnDisabled ? 'not-allowed' : 'pointer',
            backgroundColor: '#dc2626',
            color: 'white',
            opacity: btnDisabled ? 0.6 : 1,
            transition: 'opacity 0.15s',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {isImproving ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite', transformOrigin: 'center', flexShrink: 0, minWidth: 16 }}>
                <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
                <path d="M12 3a9 9 0 0 1 9 9" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span style={{ whiteSpace: 'nowrap' }}>{LOADING_MSGS[msgIndex]}</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, minWidth: 16 }}>
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span style={{ whiteSpace: 'nowrap' }}>Improve My Email</span>
            </>
          )}
        </button>

        {error && (
          <p style={{ color: '#dc2626', fontSize: '14px', marginTop: '10px', textAlign: 'center' }}>{error}</p>
        )}

        {/* Results */}
        {result && (
          <div style={{ marginTop: '32px' }}>
            {/* Side-by-side columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {/* Left: Your Draft */}
              <div style={{ backgroundColor: '#f9fafb', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '16px' }}>
                <p style={{ fontWeight: 700, fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                  Your Draft
                </p>
                <pre style={{ fontSize: '14px', lineHeight: '1.65', color: '#374151', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', margin: 0 }}>
                  {originalEmail}
                </pre>
              </div>

              {/* Right: Improved */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '2px solid #fed7aa', padding: '16px', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <p style={{ fontWeight: 700, fontSize: '12px', color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                    Improved ✨
                  </p>
                  <button
                    onClick={handleCopy}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e7e5e4',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: copied ? '#16a34a' : '#57534e',
                      fontFamily: 'inherit',
                    }}
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <pre style={{ fontSize: '14px', lineHeight: '1.65', color: '#1c1917', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', margin: 0 }}>
                  {result.improvedEmail}
                </pre>
              </div>
            </div>

            {/* Score badges */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
              {[
                { label: 'Clarity', score: result.clarityScore },
                { label: 'Tone', score: result.toneScore },
                { label: 'Call to Action', score: result.ctaScore },
              ].map(({ label, score }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '12px 20px',
                    borderRadius: '999px',
                    backgroundColor: `${scoreColor(score)}18`,
                    border: `1.5px solid ${scoreColor(score)}40`,
                    minWidth: '90px',
                  }}
                >
                  <span style={{ fontSize: '22px', fontWeight: 800, color: scoreColor(score), lineHeight: 1 }}>
                    {score}<span style={{ fontSize: '13px', fontWeight: 500, color: scoreColor(score) }}>/10</span>
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', marginTop: '4px', textAlign: 'center' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* What we fixed */}
            <div style={{ backgroundColor: '#fff7ed', borderRadius: '16px', border: '1px solid #fed7aa', padding: '20px' }}>
              <p style={{ fontWeight: 700, fontSize: '14px', color: '#c2410c', marginBottom: '12px' }}>
                What we fixed
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {result.fixes.map((fix, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
                    <span style={{ color: '#f97316', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✦</span>
                    {fix}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
