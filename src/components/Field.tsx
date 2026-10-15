import { useState } from "react"
import { Icon } from "./Icon"
import type { IconName } from "./Icon"

export function Field({
  label,
  icon,
  password = false,
  required = true,
}: {
  label: string
  icon: IconName
  password?: boolean
  required?: boolean
}) {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <label className="field">
      <span>{label}</span>
      <span className="field-control">
        <Icon name={icon} />
        <input
          type={password && !passwordVisible ? "password" : "text"}
          placeholder={label}
          required={required}
        />
        {password && (
          <button
            className="field-password-toggle"
            type="button"
            onClick={() => setPasswordVisible((current) => !current)}
            aria-label={
              passwordVisible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
            }
            aria-pressed={passwordVisible}
          >
            <Icon name="eye" />
          </button>
        )}
      </span>
    </label>
  )
}
