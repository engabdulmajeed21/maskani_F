import { Illustration } from "../../components/Illustration"
import { PrimaryButton } from "../../components/PrimaryButton"
import { Pagination } from "../../components/Pagination"

export function Onboarding({
  step,
  go,
}: {
  step: number
  go: (screen: number) => void
}) {
  const content = [
    {
      kind: "welcome" as const,
      eyebrow: "اكتشف مكانك",
      title: "أهلاً بك في مسكني",
      body: "وجهتك الواحدة لاكتشاف العقارات والفنادق والشاليهات التي تشبه أحلامك.",
    },
    {
      kind: "search" as const,
      eyebrow: "أقرب مما تتخيل",
      title: "ابحث بذكاء",
      body: "حدّد وجهتك، ميزانيتك، وما تفضّله لنقترح عليك أفضل الأماكن في ثوانٍ.",
    },
    {
      kind: "key" as const,
      eyebrow: "اختيار آمن",
      title: "تواصل بثقة",
      body: "قارن الخيارات، تعرّف على التفاصيل، وتواصل مباشرة مع المالك بخطوات واضحة وآمنة.",
    },
  ][step]

  return (
    <section className="screen">
      <header className="topbar">
        {step < 2 ? (
          <button className="text-button" onClick={() => go(4)}>
            تخطي
          </button>
        ) : (
          <span />
        )}
        {step > 0 ? (
          <button className="text-button muted" onClick={() => go(step)}>
            السابق
          </button>
        ) : (
          <span />
        )}
      </header>
      <main className="onboarding-main">
        <Illustration kind={content.kind} />
        <div className="copy-block">
          <span className="eyebrow">{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.body}</p>
        </div>
        <Pagination active={step} />
      </main>
      <footer className="screen-footer">
        <PrimaryButton onClick={() => go(step === 2 ? 4 : step + 2)}>
          {step === 2 ? "ابدأ الآن" : "التالي"}
        </PrimaryButton>
        <div className="auth-links">
          <button onClick={() => go(4)}>تسجيل الدخول</button>
          <span />
          <button onClick={() => go(5)}>إنشاء حساب</button>
        </div>
      </footer>
    </section>
  )
}
