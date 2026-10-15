export function FilterCounter({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
      <span className="text-[11px] font-bold text-[var(--text)]">{label}</span>
      <div className="flex items-center gap-3">
        <button
          className="grid size-8 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface-raised)] text-[var(--text)]"
          onClick={() => onChange(Math.max(0, value - 1))}
          type="button"
        >
          −
        </button>
        <strong className="min-w-5 text-center text-sm text-[var(--text)]">
          {value || "أي"}
        </strong>
        <button
          className="grid size-8 place-items-center rounded-full bg-[var(--primary-strong)] text-[var(--dark-text)]"
          onClick={() => onChange(Math.min(20, value + 1))}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  )
}
