import { useState } from 'react'
import { writeEmail } from '../api/write-email'

const FREE_LIMIT = 999

const EMAIL_TYPES = [
  { id: 'Follow-up', label: 'Follow-up' },
  { id: 'Cold Outreach', label: 'Cold Outreach' },
  { id: 'Meeting Request', label: 'Meeting Request' },
  { id: 'Thank You', label: 'Thank You' },
  { id: 'Reminder', label: 'Reminder' },
  { id: 'Custom', label: 'Custom' },
]

const LOADING_MSGS = [
  'Crafting your message...',
  'Finding the perfect words...',
  'Building your email...',
  'Polishing the subject line...',
  'Almost ready...',
]

interface EmailResult {
  subject: string
  score: number
  body: string
}

function getMonthlyCount(): number {
  try {
    const stored = JSON.parse(localStorage.getItem('ephpha-email-usage') || '{}')
    const month = new Date().toISOString().slice(0, 7)
    return stored.month === month ? (stored.count ?? 0) : 0
  } catch {
    return 0
  }
}

function incrementUsage(): void {
  const month = new Date().toISOString().slice(0, 7)
  const count = getMonthlyCount() + 1
  localStorage.setItem('ephpha-email-usage', JSON.stringify({ count, month }))
}

interface EmailWriterProps {
  onUpgradeClick: () => void
  onSaveHistory?: (goal: string, score: number) => void
}

export default function EmailWriter({ onUpgradeClick, onSaveHistory }: EmailWriterProps) {
  const [goal, setGoal] = useState('')
  const [emailType, setEmailType] = useState('Cold Outreach')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<EmailResult | null>(null)
  const [error, setError] = useState('')
  const [loadingMsg, setLoadingMsg] = useState('')
  const [copied, setCopied] = useState<'subject' | 'body' | 'all' | null>(null)

  const remaining = Math.max(0, FREE_LIMIT - getMonthlyCount())
  const hasText = goal.trim().length > 0
  const btnDisabled = !hasText || isGenerating

  const handleGenerate = async () => {
    if (!goal.trim()) {
      setError('Please describe what you want your email to achieve')
      return
    }
    // Free limit check disabled — unlimited emails enabled
    setIsGenerating(true)
    setError('')
    setResult(null)
    setLoadingMsg(LOADING_MSGS[Math.floor(Math.random() * LOADING_MSGS.length)])
    try {
      const data = await writeEmail(goal, emailType)
      incrementUsage()
      setResult({ subject: data.subject, score: data.score, body: data.body })
      onSaveHistory?.(goal, data.score)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async (text: string, type: 'subject' | 'body' | 'all') => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const scoreColor = result
    ? result.score >= 80 ? '#16a34a' : result.score >= 60 ? '#d97706' : '#dc2626'
    : '#dc2626'

  return (
    <section className="py-10 sm:py-14 px-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
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
            Emails That Get Replies
          </h1>
          <p className="text-center px-2" style={{ color: '#6b7280', fontSize: '15px', fontWeight: 400 }}>
            Tell Ephpha your goal and get a polished, professional email in seconds
          </p>
        </div>

        {/* Goal textarea */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#1f2937', marginBottom: '8px' }}>
            What do you want your email to achieve?
          </label>
          <textarea
            value={goal}
            onChange={e => { setGoal(e.target.value); if (error) setError('') }}
            placeholder="e.g. Follow up with a potential client after our demo call and nudge them to schedule a second conversation..."
            rows={4}
            disabled={isGenerating}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: `1px solid ${error ? '#dc2626' : '#d1d5db'}`,
              backgroundColor: 'white',
              fontSize: '15px',
              color: '#1c1917',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              lineHeight: '1.55',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onFocus={e => {
              if (!error) {
                e.currentTarget.style.borderColor = '#f97316'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(251,146,60,0.2)'
              }
            }}
            onBlur={e => {
              if (!error) {
                e.currentTarget.style.borderColor = '#d1d5db'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          />
          {error && <p style={{ color: '#dc2626', fontSize: '14px', marginTop: '6px', paddingLeft: '4px' }}>{error}</p>}
        </div>

        {/* Email type */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#1f2937', marginBottom: '10px' }}>
            Email type
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {EMAIL_TYPES.map(t => (
              <label
                key={t.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 6px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: emailType === t.id ? '2px solid #f97316' : '1px solid #e5e7eb',
                  backgroundColor: emailType === t.id ? '#fff7ed' : '#f3f4f6',
                  fontWeight: emailType === t.id ? 600 : 400,
                  fontSize: '13px',
                  color: emailType === t.id ? '#c2410c' : '#374151',
                  transition: 'all 0.15s',
                  userSelect: 'none',
                  textAlign: 'center',
                }}
              >
                <input
                  type="radio"
                  name="emailType"
                  value={t.id}
                  checked={emailType === t.id}
                  onChange={() => setEmailType(t.id)}
                  style={{ display: 'none' }}
                />
                {t.label}
              </label>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={btnDisabled}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            borderRadius: '12px',
            border: 'none',
            minHeight: '52px',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: btnDisabled ? 'not-allowed' : 'pointer',
            backgroundColor: '#dc2626',
            color: 'white',
            opacity: btnDisabled ? 0.6 : 1,
            transition: 'opacity 0.15s',
          }}
        >
          {isGenerating ? (
            <>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '8px', width: '28px', height: '28px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite', transformOrigin: 'center' }}>
                  <circle cx="12" cy="12" r="9" stroke="#dc2626" strokeWidth="3" strokeDasharray="28 14" strokeLinecap="round" />
                </svg>
              </span>
              {loadingMsg || 'Generating...'}
            </>
          ) : (
            <>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '8px', width: '28px', height: '28px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </span>
              Generate Email
            </>
          )}
        </button>

        {/* Result card */}
        {result && (
          <div style={{ marginTop: '28px', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '24px' }}>
            {/* Subject */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '12px', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Subject Line
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 800, fontSize: '12px', color: scoreColor, backgroundColor: `${scoreColor}18`, borderRadius: '99px', padding: '3px 10px' }}>
                    {result.score}/100
                  </span>
                  <button
                    onClick={() => handleCopy(result.subject, 'subject')}
                    style={{ padding: '4px 12px', borderRadius: '8px', border: '1px solid #e7e5e4', background: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: copied === 'subject' ? '#16a34a' : '#57534e', fontFamily: 'inherit' }}
                  >
                    {copied === 'subject' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#1c1917', backgroundColor: '#fafaf9', borderRadius: '10px', padding: '12px 14px', border: '1px solid #f1f0ef', margin: 0 }}>
                {result.subject}
              </p>
            </div>

            <div style={{ borderTop: '1px solid #f1f0ef', marginBottom: '20px' }} />

            {/* Body */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '12px', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Email Body
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleCopy(result.body, 'body')}
                    style={{ padding: '4px 12px', borderRadius: '8px', border: '1px solid #e7e5e4', background: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: copied === 'body' ? '#16a34a' : '#57534e', fontFamily: 'inherit' }}
                  >
                    {copied === 'body' ? '✓ Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={() => handleCopy(`Subject: ${result.subject}\n\n${result.body}`, 'all')}
                    style={{ padding: '4px 14px', borderRadius: '8px', border: 'none', background: 'linear-gradient(to right, #dc2626, #f97316)', cursor: 'pointer', fontSize: '12px', fontWeight: 700, color: 'white', fontFamily: 'inherit' }}
                  >
                    {copied === 'all' ? '✓ Copied!' : 'Copy All'}
                  </button>
                </div>
              </div>
              <pre style={{ fontSize: '14px', lineHeight: '1.65', color: '#1c1917', backgroundColor: '#fafaf9', borderRadius: '10px', padding: '14px 16px', border: '1px solid #f1f0ef', margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit' }}>
                {result.body}
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
