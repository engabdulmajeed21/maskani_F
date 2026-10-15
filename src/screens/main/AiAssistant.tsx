import { useState } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"

export function AiAssistant({ go }: { go: (screen: number) => void }) {
  const [message, setMessage] = useState("")
  const [sentMessage, setSentMessage] = useState("")
  const prompts = [
    "أبحث عن شقة قريبة من عملي",
    "شاليه لعطلة نهاية الأسبوع",
    "فندق مناسب للعائلة",
  ]

  const sendMessage = () => {
    if (!message.trim()) return
    setSentMessage(message)
    setMessage("")
  }

  return (
    <section className="screen ai-screen">
      <PageHeader title="مساعد مسكني الذكي" go={go} />
      <main className="ai-content">
        <div className="ai-identity">
          <span>
            <Icon name="sparkles" />
          </span>
          <div>
            <strong>مساعد مسكني</strong>
            <small>
              <i /> متصل الآن
            </small>
          </div>
        </div>
        <div className="chat-thread">
          <div className="ai-bubble">
            مرحباً! كيف يمكنني مساعدتك في العثور على عقارك المثالي اليوم؟
            <small>الآن</small>
          </div>
          {sentMessage && (
            <>
              <div className="user-bubble">{sentMessage}</div>
              <div className="ai-bubble">
                رائع، سأبحث لك عن أفضل الخيارات المطابقة وأرتبها حسب تفضيلاتك.
              </div>
            </>
          )}
        </div>
        <div className="prompt-chips">
          <p>جرّب أن تسأل عن:</p>
          {prompts.map((prompt) => (
            <button key={prompt} onClick={() => setMessage(prompt)}>
              <Icon name="sparkles" />
              {prompt}
            </button>
          ))}
        </div>
      </main>
      <div className="chat-composer">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && sendMessage()}
          placeholder="تحدث مع المساعد الذكي..."
        />
        <button onClick={sendMessage} aria-label="إرسال">
          <Icon name="send" />
        </button>
      </div>
    </section>
  )
}
