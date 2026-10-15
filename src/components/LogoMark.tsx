export function LogoMark({ large = false }: { large?: boolean }) {
  return (
    <div className={large ? "logo-mark logo-mark--large" : "logo-mark"}>
      <svg viewBox="0 0 64 64" role="img" aria-label="شعار مسكني">
        <path d="M12 30.5 32 13l20 17.5v20A4.5 4.5 0 0 1 47.5 55h-31a4.5 4.5 0 0 1-4.5-4.5v-20Z" />
        <path d="M24 55V38h16v17" />
        <circle cx="43.5" cy="34.5" r="5.5" />
        <path d="m39.5 38.5-8 8M31.5 46.5h-4v4h-4" />
      </svg>
    </div>
  )
}
