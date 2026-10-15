import { useState } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { ToggleRow } from "../../components/ToggleRow"
import { Toast } from "../../components/Toast"

export function NotificationSettings({ go }: { go: (screen: number) => void }) {
  const [promos, setPromos] = useState(true)
  const [messages, setMessages] = useState(true)
  const [updates, setUpdates] = useState(false)

  return (
    <section className="screen feature-screen">
      <PageHeader title="إعدادات الإشعارات" go={go} />
      <main className="feature-content notification-settings-content">
        <div className="notification-settings-intro">
          <span>
            <Icon name="bell" />
          </span>
          <h2>تحكّم في تنبيهاتك</h2>
          <p>اختر الإشعارات التي ترغب في استقبالها من مسكني.</p>
        </div>
        <section className="security-card">
          <ToggleRow
            icon="tag"
            title="إشعارات العروض والخصومات"
            subtitle="أحدث العروض والأكواد الحصرية"
            active={promos}
            onClick={() => setPromos(!promos)}
          />
          <ToggleRow
            icon="chat"
            title="إشعارات الرسائل"
            subtitle="الرسائل والردود الجديدة"
            active={messages}
            onClick={() => setMessages(!messages)}
          />
          <ToggleRow
            icon="settings"
            title="تحديثات الحساب"
            subtitle="الأمان والتوثيق وتغييرات الحساب"
            active={updates}
            onClick={() => setUpdates(!updates)}
          />
        </section>
      </main>
    </section>
  )
}

