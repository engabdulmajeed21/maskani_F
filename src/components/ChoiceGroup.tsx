export function ChoiceGroup({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          className={`rounded-full border px-3 py-2 text-[10px] font-bold transition ${
            value === option
              ? "border-[var(--primary)] bg-[var(--primary-strong)] text-[var(--dark-text)]"
              : "border-[var(--line)] bg-[var(--surface)] text-[var(--text-muted)]"
          }`}
          key={option}
          onClick={() => onChange(value === option ? "" : option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
