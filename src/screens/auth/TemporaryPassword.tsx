import type { FormEvent } from "react"
import { BackButton } from "../../components/BackButton"
import { BrandMini } from "../../components/BrandMini"
import { Field } from "../../components/Field"
import { Icon } from "../../components/Icon"
import { PrimaryButton } from "../../components/PrimaryButton"

export function TemporaryPassword({ go }: { go: (screen: number) => void }) {
  const submit = (event: FormEvent) => {
    event.preventDefault()
    go(9)
  }

  return (
    <section className="screen">
      <header className="topbar recovery-topbar">
        <BackButton onClick={() => go(7)} />
        <BrandMini />
      </header>
      <main className="recovery-main">
        <div className="recovery-symbol">
          <Icon name="mail" />
          <span>✓</span>
        </div>
        <div className="auth-heading">
          <span className="eyebrow">تحقق آمن</span>
          <h1>أدخل كلمة المرور المؤقتة</h1>
          <p>
            أدخل كلمة المرور التي أرسلناها إلى رقم هاتفك أو بريدك الإلكتروني.
          </p>
        </div>
        <form className="auth-form recovery-form" onSubmit={submit}>
          <Field label="كلمة المرور المؤقتة" icon="lock" password />
          <PrimaryButton type="submit">تأكيد</PrimaryButton>
        </form>
      </main>
      <p className="auth-switch">
        لم تصلك الرسالة؟ <button onClick={() => go(7)}>إعادة الإرسال</button>
      </p>
    </section>
  )
}
