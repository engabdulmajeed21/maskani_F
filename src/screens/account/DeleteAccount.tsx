import type { FormEvent } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { Field } from "../../components/Field"

export function DeleteAccount({ go }: { go: (screen: number) => void }) {
  const submit = (event: FormEvent) => {
    event.preventDefault()
    go(4)
  }

  return (
    <section className="screen feature-screen">
      <PageHeader title="حذف الحساب" go={go} />
      <main className="danger-main delete-main">
        <div className="warning-symbol">
          <Icon name="warning" />
        </div>
        <span className="danger-eyebrow">إجراء نهائي</span>
        <h1>هل أنت متأكد من حذف حسابك نهائياً؟</h1>
        <p>
          سيتم حذف بياناتك وحجوزاتك ومفضلاتك، ولا يمكن التراجع عن هذا الإجراء.
        </p>
        <form className="delete-form" onSubmit={submit}>
          <Field label="أدخل كلمة المرور للتأكيد" icon="lock" password />
          <button className="delete-button" type="submit">
            <Icon name="trash" />
            تأكيد الحذف
          </button>
        </form>
      </main>
    </section>
  )
}

