import { Icon, type IconName } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { BrandMini } from "../../components/BrandMini"
import { LogoMark } from "../../components/LogoMark"

export function About({ go }: { go: (screen: number) => void }) {
  const socialLinks: { icon: IconName; label: string; url: string }[] = [
    { icon: "xSocial", label: "منصة X", url: "https://x.com" },
    { icon: "instagram", label: "Instagram", url: "https://www.instagram.com" },
    {
      icon: "whatsapp",
      label: "WhatsApp",
      url: "https://wa.me/967700000000",
    },
  ]

  return (
    <section className="screen feature-screen">
      <PageHeader title="حول المنصة" go={go} />
      <main className="about-main">
        <LogoMark large />
        <h1>مَسْكَنِي</h1>
        <span className="version-pill">الإصدار 1.0.0</span>
        <p>
          رؤيتنا أن نجعل الوصول إلى المسكن المناسب أكثر سهولة ووضوحاً وثقة، ونبني
          جسراً ذكياً بين الباحثين عن المكان وشركاء النجاح.
        </p>
        <div className="about-divider" />
        <small>تابع مسكني</small>
        <div className="social-links">
          {socialLinks.map((item) => (
            <button
              key={item.label}
              onClick={() =>
                window.open(item.url, "_blank", "noopener,noreferrer")
              }
              aria-label={item.label}
            >
              <Icon name={item.icon} />
            </button>
          ))}
        </div>
      </main>
      <p className="about-copyright">© 2025 مسكني — جميع الحقوق محفوظة</p>
    </section>
  )
}

