interface HeaderProps {
  onSettingsClick: () => void
  onHistoryClick: () => void
}

export default function Header({ onSettingsClick, onHistoryClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-stone-900">Ephpha.ai</span>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">beta</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onHistoryClick}
            className="text-stone-500 hover:text-stone-800 px-3 py-1.5 rounded-lg hover:bg-stone-100 text-sm font-medium transition-colors"
          >
            History
          </button>
          <button
            onClick={onSettingsClick}
            className="text-stone-500 hover:text-stone-800 px-3 py-1.5 rounded-lg hover:bg-stone-100 text-sm font-medium transition-colors"
          >
            ⚙️ Pro
          </button>
        </div>
      </div>
    </header>
  )
}
