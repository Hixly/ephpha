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
