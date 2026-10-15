import { useState, type FormEvent } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { Field } from "../../components/Field"
import { PrimaryButton } from "../../components/PrimaryButton"
import { Toast } from "../../components/Toast"
import { SuccessBanner } from "../../components/SuccessBanner"

export function EditProfile({ go }: { go: (screen: number) => void }) {
  const [saved, setSaved] = useState(false)
  const [avatarName, setAvatarName] = useState("")

  return (
    <section className="screen feature-screen">
      <PageHeader title="تعديل الملف الشخصي" go={go} />
      <main className="feature-content profile-form-content">
        {saved && (
          <SuccessBanner>تم حفظ بيانات ملفك الشخصي بنجاح</SuccessBanner>
        )}
        <div className="edit-avatar">
          <div className="avatar avatar--large">مح</div>
          <div>
            <strong>صورتك الشخصية</strong>
            <p>اختر صورة واضحة وحديثة</p>
            <label className="edit-avatar-upload">
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setAvatarName(event.target.files?.[0]?.name ?? "")
                }
              />
              <Icon name="upload" />
              {avatarName || "تغيير الصورة الشخصية"}
            </label>
          </div>
        </div>
        <form
          className="profile-form"
          onSubmit={(event) => {
            event.preventDefault()
            setSaved(true)
          }}
        >
          <Field label="الاسم الكامل" icon="user" />
          <Field label="رقم الهاتف" icon="phone" />
          <Field label="البريد الإلكتروني" icon="mail" />
          <label className="field">
            <span>المدينة</span>
            <span className="field-control">
              <Icon name="pin" />
              <input type="text" placeholder="صنعاء" />
            </span>
          </label>
          <PrimaryButton type="submit">حفظ التغييرات</PrimaryButton>
        </form>
      </main>
    </section>
  )
}

