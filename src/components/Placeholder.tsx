import { Icon } from "./Icon"
import { PrimaryButton } from "./PrimaryButton"
import { PageHeader } from "./PageHeader"

export function Placeholder({
  go,
  isPartner = false,
}: {
  go: (screen: number) => void
  isPartner?: boolean
}) {
  return (
    <section className="screen feature-screen">
      {!isPartner && <PageHeader title="قيد التطوير" go={go} />}
      <main className="placeholder-main">
        <div className="wip-illustration" aria-hidden="true">
          <span className="wip-orbit" />
          <Icon name="settings" />
          <i>•••</i>
        </div>
        <span className="eyebrow">
          {isPartner ? "حساب شريك / مالك" : "نعمل عليها الآن"}
        </span>
        <h1>
          {isPartner ? "واجهات الملاك قيد التطوير" : "هذه الميزة قيد التصميم"}
        </h1>
        <p>
          {isPartner
            ? "تم استلام بياناتك بنجاح وستتم مراجعتها لتفعيل حسابك. لوحة التحكم الخاصة بالملاك قيد التطوير حالياً."
            : "نجهّز لك تجربة أفضل وأكثر سهولة. ستتوفر هذه الميزة قريباً في مسكني."}
        </p>
      </main>
      {!isPartner && (
        <footer className="screen-footer">
          <PrimaryButton onClick={() => go(12)}>العودة للرئيسية</PrimaryButton>
        </footer>
      )}
    </section>
  )
}
