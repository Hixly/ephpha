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
    <div className="space-y-3">
      {/* FIX 2: "AI-powered" label in heading */}
      <h3 className="flex items-center gap-2 text-base font-bold text-stone-700 uppercase tracking-wider">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f97316">
          <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/>
        </svg>
        AI-Powered Alternatives
      </h3>
      <ul className="space-y-2">
        {alternatives.map((alt, i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
            style={{
              background: 'linear-gradient(to right, #fff7f0, #fff9f5)',
              border: '1px solid #fed7aa',
            }}
          >
            {/* FIX 2: "AI:" prefix on each alternative */}
            <span className="text-stone-800 text-sm font-medium min-w-0">
              <span style={{ color: '#f97316', fontWeight: 700 }}>AI: </span>
              {alt}
            </span>

            {/* FIX 4: prominent Copy button with orange border */}
            <button
              onClick={() => handleCopy(alt, i)}
              style={{
                flexShrink: 0,
                fontSize: '12px',
                fontWeight: 600,
                padding: '5px 14px',
                borderRadius: '8px',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
                cursor: 'pointer',
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
            >
              {copiedIdx === i ? '✓ Copied' : 'Copy'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
