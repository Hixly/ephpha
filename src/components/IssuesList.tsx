interface IssuesListProps {
  issues: string[]
}

export default function IssuesList({ issues }: IssuesListProps) {
  if (issues.length === 0) return null

  return (
