import { Icon } from "./Icon"
import type { IconName } from "./Icon"

export function ToggleRow({
  icon,
  title,
  subtitle,
  active,
  onClick,
}: {
  icon: IconName
  title: string
  subtitle: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button className="toggle-row" onClick={onClick}>
      <span className="toggle-icon">
        <Icon name={icon} />
      </span>
      <span>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </span>
      <i className={active ? "switch active" : "switch"}>
        <b />
      </i>
    </button>
  )
}
