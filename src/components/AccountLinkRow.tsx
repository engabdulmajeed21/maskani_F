import { Icon } from "./Icon"
import type { IconName } from "./Icon"

export function AccountLinkRow({
  icon,
  name,
  linked,
  onClick,
}: {
  icon: IconName
  name: string
  linked: boolean
  onClick: () => void
}) {
  return (
    <div className="account-link-row">
      <span>
        <Icon name={icon} />
      </span>
      <div>
        <strong>{name}</strong>
        <small>{linked ? "تم ربط الحساب" : "غير مرتبط"}</small>
      </div>
      <button className={linked ? "linked" : ""} onClick={onClick}>
        {linked ? "إلغاء الربط" : "ربط الحساب"}
      </button>
    </div>
  )
}
