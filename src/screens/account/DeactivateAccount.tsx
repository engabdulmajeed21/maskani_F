import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"

export function DeactivateAccount({ go }: { go: (screen: number) => void }) {
  return (
    <section className="screen feature-screen">
      <PageHeader title="تعطيل الحساب" go={go} />
      <main className="danger-main">
        <div className="warning-symbol warning-symbol--soft">
          <Icon name="pause" />
        </div>
        <span className="eyebrow">توقف مؤقت</span>
        <h1>هل ترغب في إيقاف حسابك مؤقتاً؟</h1>
        <p>ستتمكن من العودة متى شئت، وستظل بياناتك وحجوزاتك محفوظة بأمان.</p>
        <div className="info-note">
          <Icon name="shield" />
          لن يظهر ملفك أو نشاطك للآخرين خلال فترة التعطيل.
        </div>
      </main>
      <footer className="screen-footer danger-actions">
        <button className="danger-primary" onClick={() => go(4)}>
          تعطيل الحساب
        </button>
        <button className="quiet-action" onClick={() => go(12)}>
          إلغاء والعودة
        </button>
      </footer>
    </section>
  )
}

