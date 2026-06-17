import { useState } from 'react'

const RECIPIENT_ROLES = ['CEO / Founder', 'Sales & BD', 'Marketing', 'HR / Recruiter', 'Developer', 'Small Business Owner', 'Other']
const INDUSTRIES = ['Tech / SaaS', 'Finance', 'Healthcare', 'Retail / eCommerce', 'Agency / Creative', 'Education', 'Other']
const EMAIL_TYPES = ['Cold Outreach', 'Follow-up', 'Meeting Request', 'Thank You', 'Reminder']

const LOADING_MSGS = ['Checking send patterns…', 'Analyzing inbox behavior…', 'Finding your window…', 'Almost ready…']

interface SendResult {
  bestDays: string
  bestTimeWindow: string
  timezone: string
  whyItWorks: string
  avoid: string
  urgencyTip: string
  confidence: 'High' | 'Medium' | 'Low'
}

const pillBase: React.CSSProperties = {
  border: '1.5px solid #e5e7eb',
  background: 'white',
  color: '#374151',
  borderRadius: '999px',
  padding: '7px 16px',
  fontSize: '13px',
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'all 0.15s',
}

const pillActive: React.CSSProperties = {
  ...pillBase,
  border: '1.5px solid #dc2626',
  background: 'rgba(220,38,38,0.06)',
  color: '#b91c1c',
  fontWeight: 600,
}

function confidenceColor(c: string): string {
  if (c === 'High') return '#16a34a'
  if (c === 'Medium') return '#d97706'
  return '#6b7280'
}

export default function WhenToSendTab() {
  const [recipientRole, setRecipientRole] = useState('')
  const [industry, setIndustry] = useState('')
  const [emailType, setEmailType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)
  const [result, setResult] = useState<SendResult | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const allSelected = recipientRole && industry && emailType
  const btnDisabled = !allSelected || isLoading

  const handleSubmit = async () => {
    if (!allSelected) return
    setIsLoading(true)
    setError('')
    setResult(null)
    setMsgIndex(0)

    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % LOADING_MSGS.length)
    }, 2000)

    try {
      const response = await fetch('/api/whentosend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientRole, industry, emailType }),
      })
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        if (response.status === 429) throw new Error('Rate limit reached. Please wait a moment and try again.')
        throw new Error(errData.error || 'Something went wrong. Please try again.')
      }
      const data = await response.json() as SendResult
      if (!data.bestDays || !data.bestTimeWindow) throw new Error('Unexpected response format from AI')
      setResult(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      clearInterval(interval)
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result) return
    const text = [
      `Best days: ${result.bestDays}`,
      `Best time: ${result.bestTimeWindow} (${result.timezone})`,
      `Why it works: ${result.whyItWorks}`,
      `Avoid: ${result.avoid}`,
      result.urgencyTip ? `Tip: ${result.urgencyTip}` : '',
      `Confidence: ${result.confidence}`,
    ].filter(Boolean).join('\n')
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-10 sm:py-14 px-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header — hidden once results are showing */}
        {!result && (
          <div className="text-center mb-8 flex flex-col items-center">
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em',
              color: 'var(--brand-deep)', background: 'rgba(220,38,38,0.07)',
              border: '1px solid rgba(220,38,38,0.14)', borderRadius: '999px',
              padding: '5px 12px', marginBottom: '18px', textTransform: 'uppercase',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Smart Send Timing
            </span>
            <h1
              className="text-center mb-3"
              style={{
                fontSize: 'clamp(1.9rem, 6vw, 3.15rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: 'var(--ink)',
                maxWidth: '15ch',
              }}
            >
              Send it at the right <span style={{ color: 'var(--brand)' }}>moment</span>
            </h1>
            <p className="text-center px-2" style={{ color: 'var(--ink-soft)', fontSize: '16px', fontWeight: 400, lineHeight: 1.55, maxWidth: '40ch' }}>
              Tell Ephpha who you're emailing and get a precise send window — no guesswork.
            </p>
          </div>
        )}

        {result ? (
          /* ── Result card ── */
          <div>
            <div style={{
              background: 'white',
              border: '1.5px solid #e5e7eb',
              borderRadius: '16px',
              padding: '28px',
              textAlign: 'center',
            }}>
              {/* Best window */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🕐</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--brand)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  {result.bestDays}
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--brand)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  {result.bestTimeWindow}
                </div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                  {result.timezone}
                </div>
              </div>

              {/* Why it works */}
              <p style={{
                color: '#374151',
                fontSize: '15px',
                lineHeight: '1.6',
                maxWidth: '480px',
                margin: '0 auto 20px',
              }}>
                {result.whyItWorks}
              </p>

              {/* Best days / Avoid pills */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{
                  background: '#f0fdf4',
                  border: '1.5px solid #86efac',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  minWidth: '140px',
                  flex: '1 1 140px',
                  maxWidth: '220px',
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    ✅ Best days
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#15803d' }}>{result.bestDays}</div>
                </div>
                <div style={{
                  background: '#fff1f2',
                  border: '1.5px solid #fca5a5',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  minWidth: '140px',
                  flex: '1 1 140px',
                  maxWidth: '220px',
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    ❌ Avoid
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#dc2626' }}>{result.avoid}</div>
                </div>
              </div>

              {/* Urgency tip */}
              {result.urgencyTip && (
                <div style={{
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: '#92400e',
                  marginBottom: '20px',
                  textAlign: 'left',
                }}>
                  💡 {result.urgencyTip}
                </div>
              )}

              {/* Confidence */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', color: '#6b7280' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: confidenceColor(result.confidence),
                  display: 'inline-block',
                  flexShrink: 0,
                }} />
                <span>Confidence: <strong style={{ color: confidenceColor(result.confidence) }}>{result.confidence}</strong></span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setResult(null)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '999px',
                  border: '1.5px solid #e5e7eb',
                  background: 'white',
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Try Again
              </button>
              <button
                onClick={handleCopy}
                style={{
                  padding: '10px 24px',
                  borderRadius: '999px',
                  border: 'none',
                  background: copied ? '#16a34a' : '#dc2626',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.15s',
                }}
              >
                {copied ? '✓ Copied!' : 'Copy Recommendation'}
              </button>
            </div>
          </div>
        ) : (
          /* ── Input section ── */
          <>
            {/* Row 1 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#1f2937', marginBottom: '10px' }}>
                Who are you emailing?
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {RECIPIENT_ROLES.map(role => (
                  <button key={role} onClick={() => setRecipientRole(role)} style={recipientRole === role ? pillActive : pillBase}>
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#1f2937', marginBottom: '10px' }}>
                What's their industry?
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {INDUSTRIES.map(ind => (
                  <button key={ind} onClick={() => setIndustry(ind)} style={industry === ind ? pillActive : pillBase}>
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 3 */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#1f2937', marginBottom: '10px' }}>
                What type of email?
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {EMAIL_TYPES.map(type => (
                  <button key={type} onClick={() => setEmailType(type)} style={emailType === type ? pillActive : pillBase}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleSubmit}
              disabled={btnDisabled}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: 'var(--r-md)',
                border: 'none',
                height: '52px',
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                fontFamily: 'inherit',
                cursor: btnDisabled ? 'not-allowed' : 'pointer',
                backgroundColor: '#dc2626',
                color: 'white',
                opacity: btnDisabled ? 0.6 : 1,
                boxShadow: btnDisabled ? 'none' : 'var(--shadow-brand)',
                transition: 'opacity 0.15s, transform 0.15s, box-shadow 0.15s',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!btnDisabled) e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {isLoading ? (
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
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span style={{ whiteSpace: 'nowrap' }}>Find My Send Window</span>
                </>
              )}
            </button>

            {error && (
              <p style={{ color: '#dc2626', fontSize: '14px', marginTop: '10px', textAlign: 'center' }}>{error}</p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
