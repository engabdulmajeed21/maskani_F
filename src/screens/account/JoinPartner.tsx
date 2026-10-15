import { useState, type FormEvent } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { Field } from "../../components/Field"
import { PrimaryButton } from "../../components/PrimaryButton"
import { Toast } from "../../components/Toast"
import { UploadZone } from "../../components/UploadZone"
import { SuccessBanner } from "../../components/SuccessBanner"
import { accountTypes } from "../../data/navigation"

export function JoinPartner({ go }: { go: (screen: number) => void }) {
  const [type, setType] = useState("مالك خاص")
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="screen feature-screen">
      <PageHeader title="انضم إلينا كشريك" go={go} />
      <main className="feature-content partner-content">
        {submitted && (
          <SuccessBanner>
            تم إرسال طلبك بنجاح، سنتواصل معك بعد مراجعة البيانات
          </SuccessBanner>
        )}
        <div className="partner-intro">
          <Icon name="userPlus" />
          <div>
            <h2>كن شريكاً في النجاح</h2>
            <p>وسّع أعمالك ووصل إلى آلاف الباحثين عن المكان المناسب.</p>
          </div>
        </div>
        <form
          className="profile-form"
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
          }}
        >
          <Field label="الاسم الكامل / اسم المنشأة" icon="user" />
          <Field label="رقم الهاتف" icon="phone" />
          <Field label="البريد الإلكتروني" icon="mail" />
          <fieldset className="partner-types">
            <legend>نوع الحساب</legend>
            <div>
              {["مالك خاص", "مكتب عقاري", "فندق", "شاليه"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={type === item ? "active" : ""}
                  onClick={() => setType(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
          <UploadZone label="رفع الهوية / السجل التجاري" />
          <PrimaryButton type="submit">إرسال طلب الانضمام</PrimaryButton>
        </form>
      </main>
    </section>
  )
}

