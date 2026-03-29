interface ScoreCardProps {
  score: number
}

export default function ScoreCard({ score }: ScoreCardProps) {
  const getColor = () => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-amber-500'
    return 'text-red-500'
  }

  const getBg = () => {
    if (score >= 80) return 'bg-green-50 border-green-200'
    if (score >= 60) return 'bg-amber-50 border-amber-200'
    return 'bg-red-50 border-red-200'
  }

  const getLabel = () => {
    if (score >= 80) return '🎉 Excellent subject line!'
    if (score >= 60) return '👍 Pretty good — room to improve'
    return '⚠️ Needs some work'
  }

  return (
    <div className={'border rounded-2xl p-4 sm:p-6 text-center w-full ' + getBg()}>
      <p className="text-sm font-medium text-stone-500 mb-1">Your Score</p>
      <p className={'text-5xl sm:text-6xl font-bold ' + getColor()}>{score}</p>
      <p className="text-stone-400 text-sm mt-1">out of 100</p>
      <p className="mt-3 text-stone-600 font-medium text-sm sm:text-base">{getLabel()}</p>
    </div>
  )
}
