import type { ReactNode } from "react"

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
}: {
  children: ReactNode
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
}) {
  return (
    <button
      className="primary-button"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <span className="button-arrow" aria-hidden="true">
        ←
      </span>
    </button>
  )
}
