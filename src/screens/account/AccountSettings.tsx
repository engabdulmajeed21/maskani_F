import { useState } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { Toast } from "../../components/Toast"
import { SuccessBanner } from "../../components/SuccessBanner"
import { drawerGroups } from "../../data/navigation"

export function AccountSettings({ go }: { go: (screen: number) => void }) {
  const [shareNotice, setShareNotice] = useState(false)

  const shareProfile = async () => {
    const shareData = {
      title: "الملف الشخصي — مسكني",
      text: "الملف الشخصي لمحمد أحمد على منصة مسكني",
    }

    try {
      if (!navigator.share) throw new Error("Web Share is unavailable")
      await navigator.share(shareData)
    } catch {
      try {
        await navigator.clipboard?.writeText(
          `${shareData.title} — ${shareData.text}`,
        )
      } catch {
        // Embedded previews may restrict both sharing and clipboard access.
      }
    }
    setShareNotice(true)
    window.setTimeout(() => setShareNotice(false), 2600)
  }

  return (
    <section className="screen feature-screen">
      <PageHeader title="الملف الشخصي" go={go} />
      <main className="feature-content account-settings-content">
        {shareNotice && (
          <SuccessBanner>تم تجهيز الملف الشخصي للمشاركة</SuccessBanner>
        )}
        <span className="account-section-label">الملف الشخصي</span>
        <div className="account-hero">
          <div className="avatar avatar--large">مح</div>
          <div className="account-hero-copy">
            <strong className="verified-name">
              محمد أحمد
              <span>✓</span>
            </strong>
            <span className="account-role">
              <i />
              مستخدم عادي · حساب نشط
            </span>
            <div className="account-contact-details">
              <span dir="ltr">
                <Icon name="mail" />
                mohammed@email.com
              </span>
              <span dir="ltr">
                <Icon name="phone" />
                +967 700 000 000
              </span>
            </div>
          </div>
          <div className="profile-card-actions">
            <button
              className="profile-share-button"
              onClick={() => void shareProfile()}
            >
              <Icon name="share" />
              مشاركة الملف
            </button>
            <button className="profile-edit-link" onClick={() => go(23)}>
              تعديل البيانات
            </button>
          </div>
        </div>
      </main>
    </section>
  )
}

