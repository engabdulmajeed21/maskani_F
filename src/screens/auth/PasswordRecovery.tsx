import { useState, type FormEvent } from "react"
import { BackButton } from "../../components/BackButton"
import { BrandMini } from "../../components/BrandMini"
import { Field } from "../../components/Field"
import { Icon } from "../../components/Icon"
import { PrimaryButton } from "../../components/PrimaryButton"
import { Toast } from "../../components/Toast"

export function PasswordRecovery({ go }: { go: (screen: number) => void }) {
  const [showToast, setShowToast] = useState(false)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (showToast) return
    setShowToast(true)
    window.setTimeout(() => go(8), 1500)
  }

  return (
    <section className="screen">
      <header className="topbar recovery-topbar">
        <BackButton onClick={() => go(4)} />
        <BrandMini />
      </header>
      <main className="recovery-main">
        <div className="recovery-symbol">
          <Icon name="lock" />
          <span>?</span>
        </div>
        <div className="auth-heading">
          <span className="eyebrow">استعادة الحساب</span>
          <h1>إعادة تعيين كلمة المرور</h1>
          <p>أدخل بريدك الإلكتروني أو رقم هاتفك لإرسال تعليمات الاستعادة</p>
        </div>
        <form className="auth-form recovery-form" onSubmit={submit}>
          <Field label="البريد الإلكتروني أو الهاتف" icon="mail" />
          <PrimaryButton type="submit">إرسال تعليمات الاستعادة</PrimaryButton>
        </form>
      </main>
      <p className="auth-switch">
        تذكرت كلمة المرور؟ <button onClick={() => go(4)}>تسجيل الدخول</button>
      </p>
      {showToast && (
        <Toast
          title="تم إرسال كلمة المرور"
          message="تم إرسال كلمة مرور مؤقتة لرقم الهاتف أو البريد"
          onClose={() => setShowToast(false)}
        />
      )}
    </section>
  )
}
