import { useState, type FormEvent } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { Field } from "../../components/Field"
import { PrimaryButton } from "../../components/PrimaryButton"
import { ToggleRow } from "../../components/ToggleRow"
import { AccountLinkRow } from "../../components/AccountLinkRow"
import { Toast } from "../../components/Toast"
import { SuccessBanner } from "../../components/SuccessBanner"

export function Security({ go }: { go: (screen: number) => void }) {
  const [twoFactor, setTwoFactor] = useState(true)
  const [biometric, setBiometric] = useState(false)
  const [saved, setSaved] = useState(false)
  const [googleLinked, setGoogleLinked] = useState(false)
  const [appleLinked, setAppleLinked] = useState(false)

  return (
    <section className="screen feature-screen">
      <PageHeader title="إدارة وأمان الحساب" go={go} />
      <main className="feature-content security-content">
        {saved && <SuccessBanner>تم تغيير كلمة المرور بنجاح</SuccessBanner>}
        <section className="security-card">
          <h2>الحسابات المرتبطة</h2>
          <AccountLinkRow
            icon="google"
            name="Google"
            linked={googleLinked}
            onClick={() => setGoogleLinked(!googleLinked)}
          />
          <AccountLinkRow
            icon="apple"
            name="Apple"
            linked={appleLinked}
            onClick={() => setAppleLinked(!appleLinked)}
          />
        </section>
        <section className="security-card">
          <h2>خيارات الحماية</h2>
          <ToggleRow
            icon="shield"
            title="التحقق بخطوتين (2FA)"
            subtitle="رمز إضافي عند تسجيل الدخول"
            active={twoFactor}
            onClick={() => setTwoFactor(!twoFactor)}
          />
          <ToggleRow
            icon="user"
            title="تسجيل الدخول بالبصمة"
            subtitle="استخدم بصمة جهازك للدخول"
            active={biometric}
            onClick={() => setBiometric(!biometric)}
          />
        </section>
        <section className="security-card password-card">
          <h2>تغيير كلمة المرور</h2>
          <form
            className="profile-form"
            onSubmit={(event) => {
              event.preventDefault()
              setSaved(true)
            }}
          >
            <Field label="كلمة المرور الحالية" icon="lock" password />
            <Field label="كلمة المرور الجديدة" icon="lock" password />
            <Field label="تأكيد كلمة المرور" icon="lock" password />
            <button
              className="forgot-inline"
              type="button"
              onClick={() => go(7)}
            >
              نسيت كلمة المرور؟
            </button>
            <PrimaryButton type="submit">تأكيد التغيير</PrimaryButton>
          </form>
        </section>
        <section className="account-danger-zone security-danger-zone">
          <div className="settings-section-title">
            <h2>إجراءات الحساب</h2>
            <p>إجراءات حساسة متعلقة بحسابك</p>
          </div>
          <button onClick={() => go(18)}>
            <Icon name="pause" />
            <span>
              <strong>تعطيل الحساب مؤقتاً</strong>
              <small>يمكنك العودة في أي وقت</small>
            </span>
            <Icon name="chevron" />
          </button>
          <button className="delete-account-link" onClick={() => go(19)}>
            <Icon name="trash" />
            <span>
              <strong>حذف الحساب نهائياً</strong>
              <small>لا يمكن التراجع عن هذا الإجراء</small>
            </span>
            <Icon name="chevron" />
          </button>
        </section>
      </main>
    </section>
  )
}

