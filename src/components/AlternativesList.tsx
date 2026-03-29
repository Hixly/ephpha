import { useState } from 'react'

interface AlternativesListProps {
  alternatives: string[]
  onCopy: (text: string) => void
}

export default function AlternativesList({ alternatives, onCopy }: AlternativesListProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  if (alternatives.length === 0) return null

  const handleCopy = (text: string, i: number) => {
    onCopy(text)
    setCopiedIdx(i)
    setTimeout(() => setCopiedIdx(null), 1800)
  }

  return (
    <div className="space-y-3 w-full">
      <h3 className="flex items-center gap-2 text-sm sm:text-base font-bold text-stone-700 uppercase tracking-wider">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f97316">
          <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/>
        </svg>
        AI-Powered Alternatives
      </h3>
      <ul className="space-y-2 w-full">
        {alternatives.map((alt, i) => (
          <li
            key={i}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 rounded-xl px-3 sm:px-4 py-3 w-full"
            style={{
              background: 'linear-gradient(to right, #fff7f0, #fff9f5)',
              border: '1px solid #fed7aa',
            }}
          >
            {/* Alternative text */}
            <span className="text-stone-800 text-sm font-medium min-w-0 flex-1">
              <span style={{ color: '#f97316', fontWeight: 700 }}>AI: </span>
              {alt}
            </span>

            {/* Copy button — full width on mobile, auto on sm+ */}
            <button
              onClick={() => handleCopy(alt, i)}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                padding: '7px 16px',
                borderRadius: '8px',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
                cursor: 'pointer',
                flexShrink: 0,
                minHeight: '36px',
                ...(copiedIdx === i
                  ? {
                      background: '#dcfce7',
                      color: '#16a34a',
                      border: '1.5px solid #86efac',
                    }
                  : {
                      background: 'white',
                      color: '#f97316',
                      border: '1.5px solid #f97316',
                    }),
              }}
              className="w-full sm:w-auto"
            >
              {copiedIdx === i ? '✓ Copied' : 'Copy'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
