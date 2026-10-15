export function CheckGroup({
  options,
  values,
  onChange,
}: {
  options: string[]
  values: string[]
  onChange: (values: string[]) => void
}) {
  return (
    <div className="flex w-full min-w-0 flex-wrap gap-2">
      {options.map((option) => {
        const checked = values.includes(option)
        return (
          <label
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-semibold transition ${
              checked
                ? "border-[var(--primary)] bg-[var(--primary-strong)] text-[var(--dark-text)]"
                : "border-[var(--line)] bg-[var(--surface)] text-[var(--text)]"
            }`}
            key={option}
          >
            <input
              className="sr-only"
              type="checkbox"
              checked={checked}
              onChange={() =>
                onChange(
                  checked
                    ? values.filter((item) => item !== option)
                    : [...values, option],
                )
              }
            />
            <span
              className={`grid size-4 shrink-0 place-items-center rounded-full border ${
                checked
                  ? "border-[var(--dark-text)] bg-[var(--dark-text)] text-[var(--primary-strong)]"
                  : "border-[var(--line-strong)] bg-[var(--surface-raised)] text-[var(--transparent)]"
              }`}
            >
              ✓
            </span>
            <span className="whitespace-nowrap text-[10px] leading-5">
              {option}
            </span>
          </label>
        )
      })}
    </div>
  )
}
