export function Toast({
  title,
  message,
  onClose,
}: {
  title: string
  message: string
  onClose: () => void
}) {
  return (
    <div className="toast" role="status" aria-live="polite">
      <span>✓</span>
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
      <button onClick={onClose} aria-label="إغلاق">
        ×
      </button>
    </div>
  )
}
