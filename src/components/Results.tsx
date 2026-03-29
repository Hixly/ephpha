import ScoreCard from './ScoreCard'
import IssuesList from './IssuesList'
import SuggestionsList from './SuggestionsList'
import AlternativesList from './AlternativesList'

interface AnalysisResult {
  score: number
  issues: string[]
  suggestions: string[]
  alternatives: string[]
}

interface ResultsProps {
  result: AnalysisResult
  onCopy: (text: string) => void
}

export default function Results({ result, onCopy }: ResultsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-12 overflow-x-hidden">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 w-full">
        <ScoreCard score={result.score} />
        <AlternativesList alternatives={result.alternatives} onCopy={onCopy} />
        <IssuesList issues={result.issues} />
        <SuggestionsList suggestions={result.suggestions} />
      </div>
    </div>
  )
}
