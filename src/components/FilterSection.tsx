import type { ReactNode } from "react"

export function FilterSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-4">
      <h2 className="mb-3 text-xs font-extrabold text-[var(--text)]">
        {title}
      </h2>
      {children}
    </section>
  )
}
