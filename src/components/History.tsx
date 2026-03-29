interface HistoryProps {
  onClose: () => void
}

export default function History({ onClose }: HistoryProps) {
  const history = JSON.parse(localStorage.getItem('ephpha-history') || '[]')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md relative max-h-[85vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-8 pb-4 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-800">📋 History</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 sm:px-8 pb-8 flex-1">
          {history.length === 0 ? (
            <p className="text-stone-500 text-sm sm:text-base">No analysis history yet.</p>
          ) : (
            <ul className="space-y-3">
              {history.map((item: { subject: string; score: number; date: string }, i: number) => (
                <li key={i} className="p-3 sm:p-4 bg-stone-50 rounded-xl">
                  <p className="font-medium text-stone-800 truncate text-sm sm:text-base">{item.subject}</p>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Score: <span className="font-semibold">{item.score}</span> · {new Date(item.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}
