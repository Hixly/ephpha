import { useState } from 'react'
import OpenAI from 'openai'
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

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
  dangerouslyAllowBrowser: true,
})

const loadingMessages = [
  'Consulting the email gods...',
  'Polishing your subject line...',
  'Waking up the AI...',
  'Running the numbers...',
  'Finding the perfect words...',
  'Brewing some magic...',
]

const SYSTEM_PROMPT = `You are an expert email marketing analyst specializing in subject line optimization. Analyze the given email subject line and return ONLY valid JSON with this exact structure:
{
  "score": <integer 0-100>,
  "issues": [<string>, ...],
  "suggestions": [<string>, ...],
  "alternatives": [<string>, <string>, <string>]
}

Scoring guide:
- 80-100: Excellent (compelling, clear, right length, good hooks)
- 60-79: Good (solid but could be improved)
- 40-59: Fair (noticeable problems)
- 0-39: Poor (spam-like, too long/short, confusing)

Rules:
- "issues" = specific problems found (2-4 items, or 1 if very good). Be concrete, not generic.
- "suggestions" = actionable improvements (2-4 items). Start each with a verb.
- "alternatives" = exactly 3 improved subject lines that feel natural and would get opened.
- Keep each string concise (under 100 chars).
- Return ONLY the JSON object, no extra text.`

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
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      setError('OpenAI API key not configured. Add VITE_OPENAI_API_KEY to your environment.')
      return
    }
    setIsAnalyzing(true)
    setError('')
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
    setResult(null)
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Analyze this email subject line: "${subject}"` },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 500,
      })
      const raw = response.choices[0]?.message?.content
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
      if (err instanceof OpenAI.APIError) {
        if (err.status === 401) {
          setError('Invalid API key. Check your VITE_OPENAI_API_KEY.')
        } else if (err.status === 429) {
          setError('Rate limit reached. Please wait a moment and try again.')
        } else if (err.message?.includes('quota') || err.message?.includes('insufficient')) {
          setError('OpenAI quota exceeded. Check your billing at platform.openai.com.')
        } else {
          setError(`OpenAI error: ${err.message}`)
        }
      } else if (err instanceof SyntaxError) {
        setError('Received an unexpected response. Please try again.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Header onSettingsClick={() => setShowProModal(true)} onHistoryClick={() => setShowHistory(true)} />

      {/* Tab bar */}
      <div style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #f1f0ef' }}>
        <div className="max-w-2xl mx-auto px-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', paddingBottom: '12px' }}>
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

          {/* New session button */}
          <button
            title="New session"
            onClick={() => {
              setSubject('')
              setResult(null)
              setError('')
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              background: 'transparent',
              cursor: 'pointer',
              color: '#6b7280',
              transition: 'all 0.15s',
              fontFamily: 'inherit',
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: 1,
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#f3f4f6'
              e.currentTarget.style.color = '#1f2937'
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#6b7280'
            }}
          >
            +
          </button>
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
