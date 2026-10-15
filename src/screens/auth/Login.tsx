import type { FormEvent } from "react"
import { BrandMini } from "../../components/BrandMini"
import { Field } from "../../components/Field"
import { PrimaryButton } from "../../components/PrimaryButton"
import type { AuthHeaderProps } from "../../types"

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <>
      <header className="topbar auth-topbar">
        <BrandMini />
      </header>
      <div className="auth-heading">
        <span className="eyebrow">مرحباً بعودتك</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </>
  )
}

export function Login({
  go,
  setAccountType,
}: {
  go: (screen: number) => void
  setAccountType: (type: number) => void
}) {
  const submit = (event: FormEvent) => {
    event.preventDefault()
    setAccountType(0)
    go(6)
  }

  return (
    <section className="screen scrollable">
      <AuthHeader
        title="تسجيل الدخول"
        subtitle="سجّل دخولك لتكمل رحلتك من حيث توقفت."
      />
      <form className="auth-form" onSubmit={submit}>
        <Field label="البريد الإلكتروني أو الهاتف" icon="mail" />
        <Field label="كلمة المرور" icon="lock" password />
        <div className="options-row">
          <label className="check-label">
            <input type="checkbox" defaultChecked />
            <span className="custom-check">✓</span>
            تذكرني
          </label>
          <button type="button" className="link-button" onClick={() => go(7)}>
            هل نسيت كلمة المرور؟
          </button>
        </div>
        <PrimaryButton type="submit">دخول</PrimaryButton>
      </form>
      <p className="auth-switch">
        ليس لديك حساب؟ <button onClick={() => go(5)}>إنشاء حساب</button>
      </p>
    </section>
  )
}
