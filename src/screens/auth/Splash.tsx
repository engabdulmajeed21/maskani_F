import { LogoMark } from "../../components/LogoMark"

export function Splash({ go }: { go: (screen: number) => void }) {
  return (
    <button
      className="splash screen"
      onClick={() => go(1)}
      aria-label="الانتقال إلى شاشة الترحيب"
    >
      <div className="splash-glow" />
      <div className="splash-brand">
        <LogoMark large />
        <h1>مَسْكَنِي</h1>
        <p>مكانك يبدأ من هنا</p>
      </div>
      <span className="splash-hint">
        المس للبدء <i>←</i>
      </span>
    </button>
  )
}
