import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Results from './components/Results'
import ProModal from './components/ProModal'
import History from './components/History'
import confetti from 'canvas-confetti'

interface AnalysisResult {
  score: number
  issues: string[]
  suggestions: string[]
  alternatives: string[]
}

const funLoadingMessages = [
  "Consulting the email gods...",
  "Polishing your subject line...",
  "Waking up the AI...",
  "Running the numbers...",
  "Finding the perfect words...",
  "Brewing some magic...",
]

export default function App() {
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
    setLoadingMessage(funLoadingMessages[Math.floor(Math.random() * funLoadingMessages.length)])
    setResult(null)

    await new Promise(resolve => setTimeout(resolve, 1500))

    const mockScore = Math.floor(Math.random() * 40) + 50
    const mockResult: AnalysisResult = {
      score: mockScore,
      issues: mockScore < 70 ? ['Subject line is too short', 'Avoid using all caps'] : ['Good length'],
      suggestions: mockScore < 80 ? ['Add a sense of urgency', 'Try including a benefit'] : ['Great subject line!'],
      alternatives: [
        "Quick question about your marketing",
        "Unlock more email opens with this trick",
        "Your emails are about to get better"
      ]
    }

    if (mockScore >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }

    const history = JSON.parse(localStorage.getItem('ephpha-history') || '[]')
    const newHistory = [{ subject, score: mockScore, date: new Date().toISOString() }, ...history].slice(0, 5)
    localStorage.setItem('ephpha-history', JSON.stringify(newHistory))

    setResult(mockResult)
    setIsAnalyzing(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen">
      <Header onSettingsClick={() => setShowProModal(true)} onHistoryClick={() => setShowHistory(true)} />
      <Hero 
        onAnalyze={analyzeSubject} 
        isAnalyzing={isAnalyzing} 
        error={error}
        loadingMessage={loadingMessage}
      />
      {result && <Results result={result} onCopy={copyToClipboard} />}
      {showProModal && <ProModal onClose={() => setShowProModal(false)} />}
      {showHistory && <History onClose={() => setShowHistory(false)} />}
    </div>
  )
}
