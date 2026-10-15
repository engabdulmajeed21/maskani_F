import { useState } from "react"
import { Icon, type IconName } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { Toast } from "../../components/Toast"
import { faqItems } from "../../data/faq"

export function HelpCenter({ go }: { go: (screen: number) => void }) {
  const [openIndex, setOpenIndex] = useState(0)
  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="screen feature-screen">
      <PageHeader title="المساعدة والتواصل" go={go} />
      <main className="feature-content help-content">
        <div className="help-hero">
          <Icon name="help" />
          <h1>كيف يمكننا مساعدتك؟</h1>
          <p>إجابات سريعة عن أكثر الأسئلة شيوعاً.</p>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <article
              className={`faq-item${openIndex === index ? " open" : ""}`}
              key={item.question}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span>{item.question}</span>
                <b>+</b>
              </button>
              {openIndex === index && <p>{item.answer}</p>}
            </article>
          ))}
        </div>
        <div className="contact-heading help-contact-heading">
          <span>
            <Icon name="chat" />
          </span>
          <h1>تحتاج مساعدة إضافية؟</h1>
          <p>فريق مسكني جاهز للتواصل معك.</p>
        </div>
        <button
          className="contact-card whatsapp-card"
          onClick={() => openExternal("https://wa.me/967700000000")}
        >
          <span>
            <Icon name="whatsapp" />
          </span>
          <div>
            <strong>التواصل عبر واتساب</strong>
            <p>متاح يومياً من 9 صباحاً حتى 10 مساءً</p>
          </div>
          <Icon name="chevron" />
        </button>
        <button
          className="contact-card"
          onClick={() => {
            window.location.href = "mailto:support@maskani.app"
          }}
        >
          <span>
            <Icon name="mail" />
          </span>
          <div>
            <strong>التواصل عبر البريد الإلكتروني</strong>
            <p dir="ltr">support@maskani.app</p>
          </div>
          <Icon name="chevron" />
        </button>
        <section className="contact-social">
          <h2>تابعنا على منصات التواصل</h2>
          <div>
            {[
              {
                icon: "xSocial" as IconName,
                label: "X / Twitter",
                url: "https://x.com",
              },
              {
                icon: "instagram" as IconName,
                label: "Instagram",
                url: "https://www.instagram.com",
              },
              {
                icon: "whatsapp" as IconName,
                label: "WhatsApp",
                url: "https://wa.me/967700000000",
              },
            ].map((item) => (
              <button key={item.label} onClick={() => openExternal(item.url)}>
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </section>
  )
}

