import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { notificationItems } from "../../data/notifications"
import { properties } from "../../data/properties"
import type { Property } from "../../types"

export function Notifications({
  go,
  onOpenProperty,
}: {
  go: (screen: number) => void
  onOpenProperty: (property: Property) => void
}) {
  return (
    <section className="screen feature-screen">
      <PageHeader title="الإشعارات" go={go} />
      <main className="feature-content">
        <button className="notification-settings-link" onClick={() => go(31)}>
          <span>
            <Icon name="settings" />
          </span>
          <div>
            <strong>إعدادات الإشعارات</strong>
            <small>تحكّم في أنواع التنبيهات التي تصلك</small>
          </div>
          <Icon name="chevron" />
        </button>

        <div className="notification-list">
          {notificationItems.map((item) => (
            <button
              className="notification-card"
              key={item.title}
              onClick={() =>
                item.target === "requests"
                  ? go(29)
                  : onOpenProperty(properties[0])
              }
            >
              <span className="notification-icon">
                <Icon name={item.icon} />
              </span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
                <small>{item.time}</small>
              </div>
              <i />
            </button>
          ))}
        </div>
      </main>
    </section>
  )
}
