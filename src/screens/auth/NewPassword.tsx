import type { FormEvent } from "react"
import { BackButton } from "../../components/BackButton"
import { BrandMini } from "../../components/BrandMini"
import { Field } from "../../components/Field"
import { Icon } from "../../components/Icon"
import { PrimaryButton } from "../../components/PrimaryButton"

export function NewPassword({
  go,
  isPartner,
}: {
  go: (screen: number) => void
  isPartner: boolean
}) {
  const submit = (event: FormEvent) => {
    event.preventDefault()
    go(isPartner ? 11 : 10)
  }

  return (
    <section className="screen">
      <header className="topbar recovery-topbar">
        <BackButton onClick={() => go(8)} />
        <BrandMini />
      </header>
      <main className="recovery-main">
        <div className="recovery-symbol">
          <Icon name="lock" />
          <span>✓</span>
        </div>
        <div className="auth-heading">
          <span className="eyebrow">حماية حسابك</span>
          <h1>إنشاء كلمة مرور جديدة</h1>
          <p>اختر كلمة مرور قوية وجديدة للحفاظ على أمان حسابك.</p>
        </div>
        <form className="auth-form recovery-form" onSubmit={submit}>
          <Field label="كلمة المرور الجديدة" icon="lock" password />
          <Field label="تأكيد كلمة المرور" icon="lock" password />
          <PrimaryButton type="submit">حفظ وتغيير</PrimaryButton>
        </form>
      </main>
    </section>
  )
}
