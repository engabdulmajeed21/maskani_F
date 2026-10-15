import type { ReactNode } from "react"

export function SuccessBanner({ children }: { children: ReactNode }) {
  return (
    <div className="success-banner" role="status">
      <span>✓</span>
      <p>{children}</p>
    </div>
  )
}
