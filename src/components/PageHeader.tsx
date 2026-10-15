import { BackButton } from "./BackButton"

export function PageHeader({
  title,
  go,
}: {
  title: string
  go: (screen: number) => void
}) {
  return (
    <header className="page-header">
      <BackButton onClick={() => go(-1)} />
      <h1>{title}</h1>
      <span />
    </header>
  )
}
