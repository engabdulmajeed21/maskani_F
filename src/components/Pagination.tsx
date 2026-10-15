export function Pagination({ active }: { active: number }) {
  return (
    <div className="pagination" aria-label={`الخطوة ${active + 1} من 3`}>
      {[0, 1, 2].map((dot) => (
        <span key={dot} className={dot === active ? "active" : ""} />
      ))}
    </div>
  )
}
