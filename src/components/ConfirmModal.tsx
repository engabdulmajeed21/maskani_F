export function ConfirmModal({
  title,
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  variant = "default",
  onConfirm,
  onClose,
}: {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "danger"
  onConfirm: () => void
  onClose: () => void
}) {
  return (
    <div
      className="absolute inset-0 z-[80] flex items-center justify-center bg-[var(--overlay)] p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      dir="rtl"
    >
      <div className="w-full max-w-sm rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-5 text-right shadow-2xl">
        <strong
          className="block text-sm font-extrabold text-[var(--text)]"
          id="confirm-modal-title"
        >
          {title}
        </strong>
        <p className="mt-2 text-xs leading-6 text-[var(--muted)]">{message}</p>
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-xs font-bold text-[var(--muted)] transition-colors hover:bg-[var(--surface-sunken)] hover:text-[var(--text)]"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-opacity hover:opacity-90 ${
              variant === "danger"
                ? "bg-[var(--danger)] text-white"
                : "bg-[var(--primary)] text-[var(--primary-text)]"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
