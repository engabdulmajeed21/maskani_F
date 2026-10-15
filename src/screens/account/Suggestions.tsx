import { useState, type FormEvent } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { Field } from "../../components/Field"
import { PrimaryButton } from "../../components/PrimaryButton"
import { Toast } from "../../components/Toast"
import { SuccessBanner } from "../../components/SuccessBanner"

export function Suggestions({ go }: { go: (screen: number) => void }) {
  const [suggestion, setSuggestion] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const sendSuggestion = () => {
    if (!suggestion.trim()) return
    setSuggestion("")
    setSubmitted(true)
  }

  return (
    <section className="screen feature-screen">
      <PageHeader title="اقتراحاتك" go={go} />
      <main className="feature-content suggestion-content">
        {submitted && (
          <SuccessBanner>
            تم إرسال اقتراحك بنجاح، شكراً لتواصلك معنا!
          </SuccessBanner>
        )}
        <div className="suggestion-icon">
          <Icon name="chat" />
        </div>
        <h1>ساهم في تطوير مسكني</h1>
        <p>رأيك يصنع فرقاً. شاركنا ما يمكن أن يجعل تجربتك أفضل.</p>
        <label className="suggestion-field">
          <span>اقتراحك</span>
          <textarea
            value={suggestion}
            onChange={(event) => {
              setSuggestion(event.target.value)
              setSubmitted(false)
            }}
            placeholder="شاركنا أفكارك ومقترحاتك..."
            maxLength={500}
          />
          <small>{suggestion.length} / 500</small>
        </label>
      </main>
      <footer className="screen-footer">
        <PrimaryButton onClick={sendSuggestion} disabled={!suggestion.trim()}>
          إرسال الاقتراح
        </PrimaryButton>
      </footer>
    </section>
  )
}

