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

  const handleNewSession = () => {
    setSubject('')
    setResult(null)
    setError('')
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

      <div style={{ paddingTop: '8px' }}>
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

      {showProModal && <ProModal onClose={() => setShowProModal(false)} />}
      {showHistory && <History onClose={() => setShowHistory(false)} />}
      <Footer />
      <Analytics />
    </div>
  )
}
