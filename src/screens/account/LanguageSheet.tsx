import { useState } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { PrimaryButton } from "../../components/PrimaryButton"
import { Toast } from "../../components/Toast"

export function LanguageSheet({ go }: { go: (screen: number) => void }) {
  const [language, setLanguage] = useState("العربية")

  return (
    <section className="screen language-screen">
      <PageHeader title="اللغة" go={go} />
      <main className="language-backdrop">
        <div className="language-preview">
          <Icon name="globe" />
          <h2>لغة التطبيق</h2>
          <p>يمكنك تغيير لغة العرض في أي وقت.</p>
        </div>
      </main>
      <div className="language-sheet">
        <i />
        <div className="sheet-heading">
          <div>
            <h2>اختر اللغة</h2>
            <p>Choose your preferred language</p>
          </div>
          <span>
            <Icon name="globe" />
          </span>
        </div>
        {[
          { label: "العربية", meta: "Arabic", code: "ع", available: true },
          {
            label: "English",
            meta: "الإنجليزية — قريباً",
            code: "En",
            available: false,
          },
        ].map((item) => (
          <button
            className={`language-option${
              language === item.label ? " active" : ""
            }`}
            key={item.label}
            onClick={() => setLanguage(item.label)}
            disabled={!item.available}
            aria-label={
              item.available
                ? `اختيار ${item.label}`
                : `${item.label} غير متاحة حالياً`
            }
          >
            <b>{item.code}</b>
            <span>
              <strong>{item.label}</strong>
              <small>{item.meta}</small>
            </span>
            <i>{language === item.label ? "✓" : ""}</i>
          </button>
        ))}
        <PrimaryButton onClick={() => go(-1)}>تطبيق اللغة</PrimaryButton>
      </div>
    </section>
  )
}

