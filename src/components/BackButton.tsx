import { Icon } from "./Icon"

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="round-button" onClick={onClick} aria-label="رجوع">
      <Icon name="arrow" />
    </button>
  )
}
