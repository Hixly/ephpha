interface IssuesListProps {
  issues: string[]
}

export default function IssuesList({ issues }: IssuesListProps) {
  if (issues.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-stone-800">Issues Found</h3>
      <ul className="space-y-2">
        {issues.map((issue, i) => (
          <li key={i} className="flex items-start gap-2 text-stone-600">
            <span className="text-red-400 mt-0.5">x</span>
            <span>{issue}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
