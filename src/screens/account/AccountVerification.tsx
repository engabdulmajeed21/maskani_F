import { useState, type FormEvent } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { Field } from "../../components/Field"
import { PrimaryButton } from "../../components/PrimaryButton"
import { Toast } from "../../components/Toast"
import { UploadZone } from "../../components/UploadZone"
import { SuccessBanner } from "../../components/SuccessBanner"

export function AccountVerification({
  go,
  isPartner = false,
}: {
  go: (screen: number) => void
  isPartner?: boolean
}) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="screen feature-screen">
      <PageHeader
        title={isPartner ? "استكمال بيانات وتوثيق الحساب" : "توثيق الحساب"}
        go={go}
      />
      <main className="feature-content verification-content">
        {submitted && (
          <SuccessBanner>
            {isPartner
              ? "ستتم مراجعة البيانات لتفعيل حسابك، جاري تحويلك..."
              : "تم رفع بياناتك بنجاح، بانتظار مراجعة الإدارة"}
          </SuccessBanner>
        )}
        <div className="verification-intro">
          <span>
            <Icon name="shield" />
          </span>
          <div>
            <h2>{isPartner ? "استكمال بيانات التوثيق" : "وثّق هويتك"}</h2>
            <p>
              {isPartner
                ? "أكمل بياناتك الرسمية لتفعيل حساب المالك والبدء بإدارة عقاراتك."
                : "ارفع مستوى الثقة والأمان في حسابك على مسكني."}
            </p>
          </div>
        </div>
        <form
          className="profile-form"
          onSubmit={(event) => {
            event.preventDefault()
            if (submitted) return
            setSubmitted(true)
            // فقط إذا كان الحساب مالك/شريك ينتقل لشاشة قيد التطوير (39)
            if (isPartner) {
              window.setTimeout(() => {
                go(39)
              }, 1800)
            }
          }}
        >
          <Field
            label={isPartner ? "الاسم الرباعي أو اسم المنشأة" : "الاسم الرباعي"}
            icon="user"
          />
          <Field
            label={
              isPartner ? "رقم الهوية أو السجل التجاري" : "رقم الهوية"
            }
            icon="document"
          />
          {isPartner && <Field label="العنوان / المدينة" icon="pin" />}
          <UploadZone
            label={
              isPartner
                ? "رفع صورة الهوية أو الترخيص التجاري"
                : "رفع صورة الهوية"
            }
          />
          <PrimaryButton type="submit" disabled={submitted}>
            {submitted
              ? "تم الإرسال..."
              : isPartner
                ? "تأكيد البيانات"
                : "إرسال طلب التوثيق"}
          </PrimaryButton>
        </form>
      </main>
    </section>
  )
}



