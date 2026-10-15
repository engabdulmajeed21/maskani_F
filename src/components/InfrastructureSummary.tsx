import { Icon } from "./Icon"
import type { Property } from "../types"
import { infrastructureItems } from "../utils/property"

export function InfrastructureSummary({ property }: { property: Property }) {
  const services = infrastructureItems(property)
  if (!services.length) return null

  return (
    <div className="border-y border-[var(--line)] py-2">
      <div className="mb-1.5 flex items-center gap-1 text-[9px] font-bold text-[var(--text)]">
        <Icon name="settings" />
        خدمات البنية التحتية
      </div>
      <div className="grid grid-cols-2 gap-1">
        {services.slice(0, 4).map((service) => (
          <div
            className="flex min-w-0 items-center gap-1 rounded-lg bg-[var(--surface-soft)] px-1.5 py-1"
            key={service.label}
            title={`${service.label}: ${service.value}`}
          >
            <span
              className={`shrink-0 ${
                service.status === "unavailable"
                  ? "text-[var(--text-dim)]"
                  : "text-[var(--primary-text)]"
              }`}
            >
              <Icon name={service.icon} />
            </span>
            <span className="min-w-0">
              <b className="block truncate text-[7px] text-[var(--text-muted)]">
                {service.label}
              </b>
              <small className="block truncate text-[8px] font-semibold text-[var(--text)]">
                {service.value}
              </small>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
