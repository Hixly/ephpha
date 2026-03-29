interface AlternativesListProps {
  alternatives: string[]
  onCopy: (text: string) => void
}

export default function AlternativesList({ alternatives, onCopy }: AlternativesListProps) {
  if (alternatives.length === 0) return null

  return (
