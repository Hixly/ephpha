interface HeroProps {
  onAnalyze: () => void
  isAnalyzing: boolean
  error: string
  loadingMessage: string
}

export default function Hero({ onAnalyze, isAnalyzing, error, loadingMessage }: HeroProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnalyze()
  }

  return (
    <section className="bg-gradient-to-br from-amber-50 to-stone-100 py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-stone-900 mb-3">Unlock Your Email Opens</h1>
        <p className="text-stone-500 mb-10 text-lg">Paste your subject line and get an instant AI-powered score.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" placeholder="e.g. Quick question about your project..." className="w-full px-5 py-4 rounded-2xl border border-stone-200 text-stone-800 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400" disabled={isAnalyzing} />
          {error && <p className="text-red-500 text-sm text-left pl-1">{error}</p>}
          <button type="submit" disabled={isAnalyzing} className="w-full bg-amber-400 hover:bg-amber-500 text-stone-900 font-semibold py-4 rounded-2xl text-base transition-colors disabled:opacity-60">
            {isAnalyzing ? loadingMessage || 'Analyzing...' : 'Analyze Subject Line'}
          </button>
        </form>
      </div>
    </section>
  )
}
