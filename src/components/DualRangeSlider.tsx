export function DualRangeSlider({
  minValue,
  maxValue,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  minValue: string
  maxValue: string
  min: number
  max: number
  step: number
  unit: string
  onChange: (minValue: string, maxValue: string) => void
}) {
  const selectedMin = minValue === "" ? min : Number(minValue)
  const selectedMax = maxValue === "" ? max : Number(maxValue)
  const formatValue = (value: number) =>
    `${value.toLocaleString("ar-SA")} ${unit}`.trim()

  return (
    <div className="w-full min-w-0 space-y-4">
      <label className="block min-w-0">
        <span className="mb-2 flex items-center justify-between gap-2 text-[10px] text-[var(--text-muted)]">
          <b className="text-[var(--text)]">الحد الأدنى</b>
          <span>{formatValue(selectedMin)}</span>
        </span>
        <input
          className="dual-range-input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={selectedMin}
          onChange={(event) =>
            onChange(
              String(Math.min(Number(event.target.value), selectedMax)),
              String(selectedMax),
            )
          }
          dir="ltr"
        />
      </label>
      <label className="block min-w-0">
        <span className="mb-2 flex items-center justify-between gap-2 text-[10px] text-[var(--text-muted)]">
          <b className="text-[var(--text)]">الحد الأعلى</b>
          <span>{formatValue(selectedMax)}</span>
        </span>
        <input
          className="dual-range-input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={selectedMax}
          onChange={(event) =>
            onChange(
              String(selectedMin),
              String(Math.max(Number(event.target.value), selectedMin)),
            )
          }
          dir="ltr"
        />
      </label>
    </div>
  )
}
