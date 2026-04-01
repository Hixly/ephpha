import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Results from './components/Results'
import ProModal from './components/ProModal'
import History from './components/History'
import Footer from './components/Footer'
import EmailWriter from './components/EmailWriter'
import confetti from 'canvas-confetti'
import { Analytics } from '@vercel/analytics/react'

interface AnalysisResult {
  score: number
  issues: string[]
  suggestions: string[]
  alternatives: string[]
}

const loadingMessages = [
  'Consulting the email gods...',
  'Polishing your subject line...',
  'Waking up the AI...',
  'Running the numbers...',
  'Finding the perfect words...',
  'Brewing some magic...',
]

type Tab = 'analyze' | 'write'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('write')
  const [subject, setSubject] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')
  const [loadingMessage, setLoadingMessage] = useState('')
  const [showProModal, setShowProModal] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [toast, setToast] = useState('')
  const [isResetting, setIsResetting] = useState(false)
  const [sessionKey, setSessionKey] = useState(0)
  const [showConfirm, setShowConfirm] = useState(false)

  const analyzeSubject = async () => {
    if (!subject.trim()) {
      setError('Please enter an email subject line')
      return
    }
    setIsAnalyzing(true)
    setError('')
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
    setResult(null)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject }),
      })
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        if (response.status === 401) throw new Error('Invalid API key.')
        if (response.status === 429) throw new Error('Rate limit reached. Please wait a moment and try again.')
        throw new Error(errData.error || 'Something went wrong. Please try again.')
      }
      const data = await response.json()
      const raw = data.choices[0]?.message?.content
      if (!raw) throw new Error('Empty response from AI')
      const parsed = JSON.parse(raw) as AnalysisResult
      if (
        typeof parsed.score !== 'number' ||
        !Array.isArray(parsed.issues) ||
        !Array.isArray(parsed.suggestions) ||
        !Array.isArray(parsed.alternatives)
      ) {
        throw new Error('Unexpected response format from AI')
      }
      const analysisResult: AnalysisResult = {
        score: Math.min(100, Math.max(0, Math.round(parsed.score))),
        issues: parsed.issues.slice(0, 5),
        suggestions: parsed.suggestions.slice(0, 5),
        alternatives: parsed.alternatives.slice(0, 3),
      }
      if (analysisResult.score >= 80) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      }
      const history = JSON.parse(localStorage.getItem('ephpha-history') || '[]')
      const newHistory = [
        { tool: 'analyze', subject, score: analysisResult.score, date: new Date().toISOString() },
        ...history,
      ].slice(0, 10)
      localStorage.setItem('ephpha-history', JSON.stringify(newHistory))
      setResult(analysisResult)
    } catch (err: unknown) {
      console.error('Analysis error:', err)
      if (err instanceof SyntaxError) {
        setError('Received an unexpected response. Please try again.')
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  const doReset = () => {
    setIsResetting(true)
    setTimeout(() => {
      setSubject('')
      setResult(null)
      setError('')
      setSessionKey(k => k + 1)
      setIsResetting(false)
      setToast('Session cleared')
      setTimeout(() => setToast(''), 2200)
    }, 150)
  }

  const handleNewSession = () => {
    if (subject.trim() || result) {
      setShowConfirm(true)
    } else {
      doReset()
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header
        onSettingsClick={() => setShowProModal(true)}
        onHistoryClick={() => setShowHistory(true)}
        onNewSession={handleNewSession}
      />

      {/* Tab bar */}
      <div style={{ borderBottom: '1px solid #f1f0ef' }}>
        <div
          className="max-w-2xl mx-auto px-4"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '12px', paddingBottom: '12px' }}
        >
          {/* Pill tab container */}
          <div style={{ display: 'inline-flex', backgroundColor: '#f3f4f6', borderRadius: '999px', padding: '4px', gap: '2px' }}>
            <button
              onClick={() => setActiveTab('write')}
              style={{
                padding: '8px 20px',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
                background: activeTab === 'write' ? 'white' : 'transparent',
                color: activeTab === 'write' ? '#1f2937' : '#6b7280',
                boxShadow: activeTab === 'write' ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
              }}
            >
              Write
            </button>
            <button
              onClick={() => setActiveTab('analyze')}
              style={{
                padding: '8px 20px',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
                background: activeTab === 'analyze' ? 'white' : 'transparent',
                color: activeTab === 'analyze' ? '#1f2937' : '#6b7280',
                boxShadow: activeTab === 'analyze' ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
              }}
            >
              Analyze
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          paddingTop: '8px',
          opacity: isResetting ? 0 : 1,
          transition: 'opacity 0.15s ease',
        }}
      >
        {activeTab === 'analyze' && (
          <>
            <Hero
              subject={subject}
              onSubjectChange={setSubject}
              onAnalyze={analyzeSubject}
              isAnalyzing={isAnalyzing}
              error={error}
              loadingMessage={loadingMessage}
            />
            {result && <Results result={result} onCopy={text => navigator.clipboard.writeText(text)} />}
          </>
        )}
        {activeTab === 'write' && (
          <EmailWriter
            key={sessionKey}
            onUpgradeClick={() => setShowProModal(true)}
            onSaveHistory={(goal: string, score: number) => {
              const h = JSON.parse(localStorage.getItem('ephpha-history') || '[]')
              localStorage.setItem('ephpha-history', JSON.stringify(
                [{ tool: 'write', goal, score, date: new Date().toISOString() }, ...h].slice(0, 10)
              ))
            }}
          />
        )}
      </div>

      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1f2937',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '999px',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          zIndex: 9999,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}>
          {toast}
        </div>
      )}

      {showConfirm && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998,
          }}
          onClick={() => setShowConfirm(false)}
        >
          <div
            style={{
              background: '#fff', borderRadius: '16px', padding: '28px 24px',
              maxWidth: '320px', width: '90%', boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              textAlign: 'center',
            }}
            onClick={e => e.stopPropagation()}
          >
            <p style={{ fontWeight: 700, fontSize: '16px', color: '#1f2937', marginBottom: '8px' }}>Clear your work?</p>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '22px', lineHeight: '1.5' }}>
              This will reset the form and clear your current session.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  padding: '9px 20px', borderRadius: '999px', border: '1px solid #e5e7eb',
                  background: '#fff', color: '#6b7280', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowConfirm(false); doReset() }}
                style={{
                  padding: '9px 20px', borderRadius: '999px', border: 'none',
                  background: '#dc2626', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {showProModal && <ProModal onClose={() => setShowProModal(false)} />}
      {showHistory && <History onClose={() => setShowHistory(false)} />}
      <Footer />
      <Analytics />
    </div>
  )
}
