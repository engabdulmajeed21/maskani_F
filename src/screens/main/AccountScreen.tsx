import { useState } from "react"
import { BrandMini } from "../../components/BrandMini"
import { Icon } from "../../components/Icon"
import { bottomNav, drawerGroups } from "../../data/navigation"

export function AccountScreen({ go }: { go: (screen: number) => void }) {
  const [shareNotice, setShareNotice] = useState(false)

  const shareApp = async () => {
    const shareData = {
      title: "مسكني",
      text: "اكتشف أفضل العقارات والفنادق والشاليهات مع مسكني",
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
        // Clipboard access can also be restricted inside embedded previews.
      }
      setShareNotice(true)
      window.setTimeout(() => setShareNotice(false), 2800)
    }
  }

  return (
    <section className="screen account-screen">
      <header className="account-header">
        <div>
          <span>الملف الشخصي</span>
          <h1>حسابي</h1>
        </div>
        <BrandMini />
      </header>
      <main className="account-page-content">
        <button className="account-primary-setting" onClick={() => go(30)}>
          <span>
            <Icon name="user" />
          </span>
          <div>
            <strong>الملف الشخصي</strong>
            <small>بياناتك الشخصية ومعلومات التواصل</small>
          </div>
          <Icon name="chevron" />
        </button>

        <section className="account-menu-group account-settings-group">
          <h2>الإعدادات</h2>
          <div>
            <button className="account-menu-item" onClick={() => go(27)}>
              <span>
                <Icon name="shield" />
              </span>
              <b>إدارة وأمان الحساب</b>
              <small>الحماية والحسابات المرتبطة</small>
              <Icon name="chevron" />
            </button>
            <button className="account-menu-item" onClick={() => go(24)}>
              <span>
                <Icon name="shield" />
              </span>
              <b>توثيق الحساب</b>
              <small>توثيق الهوية</small>
              <Icon name="chevron" />
            </button>
            <button className="account-menu-item" onClick={() => go(28)}>
              <span>
                <Icon name="globe" />
              </span>
              <b>اللغة</b>
              <small>العربية</small>
              <Icon name="chevron" />
            </button>
            <button className="account-menu-item" onClick={() => go(26)}>
              <span>
                <Icon name="userPlus" />
              </span>
              <b>انضم إلينا كشريك/مالك</b>
              <small>حوّل حسابك إلى حساب شريك</small>
              <Icon name="chevron" />
            </button>
          </div>
        </section>

        <div className="account-menu">
          {drawerGroups.map((group) => (
            <section className="account-menu-group" key={group.title}>
              <h2>{group.title}</h2>
              <div>
                {group.items.map((item) => (
                  <button
                    className="account-menu-item"
                    key={item.label}
                    onClick={() => go(item.target)}
                  >
                    <span>
                      <Icon name={item.icon} />
                    </span>
                    <b>{item.label}</b>
                    {item.hint && <small>{item.hint}</small>}
                    <Icon name="chevron" />
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="account-page-actions">
          <button onClick={() => go(4)}>
            <Icon name="logout" />
            تسجيل الخروج
          </button>
          <button className="share-action" onClick={() => void shareApp()}>
            <Icon name="share" />
            مشاركة التطبيق
          </button>
        </div>
      </main>
      <nav
        className="bottom-nav account-bottom-nav"
        aria-label="التنقل الرئيسي"
      >
        {bottomNav.map((item, index) => (
          <button
            key={item.label}
            className={index === 4 ? "active" : ""}
            onClick={() => go(item.target)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      {shareNotice && (
        <div className="account-share-notice" role="status">
          <span>✓</span>
          تم تجهيز معلومات المشاركة
        </div>
      )}
    </section>
  )
}
