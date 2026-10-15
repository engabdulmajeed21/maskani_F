import { useState } from "react"
import { Icon } from "../../components/Icon"
import { BackButton } from "../../components/BackButton"
import { Toast } from "../../components/Toast"
import { ConfirmModal } from "../../components/ConfirmModal"
import { propertyAddress, propertyPrice } from "../../utils/property"
import type { Conversation, Property } from "../../types"

export function ChatDetail({
  go,
  property,
  conversation,
  onDelete,
  onBlock,
  onReport,
  muted,
  onToggleMute,
  onSendMessage,
  onViewOwner,
  onOpenProperty,
}: {
  go: (screen: number) => void
  property?: Property
  conversation?: Conversation
  onDelete: (id?: string) => void
  onBlock: (id?: string) => void
  onReport: (id?: string) => void
  muted: boolean
  onToggleMute: (id?: string) => void
  onSendMessage: (id: string | undefined, message: string) => void
  onViewOwner: () => void
  onOpenProperty: (property: Property) => void
}) {
  const [message, setMessage] = useState("")
  const [notice, setNotice] = useState("")
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [voicePlaying, setVoicePlaying] = useState(false)
  const [localMuted, setLocalMuted] = useState(false)
  const [confirmBlockOpen, setConfirmBlockOpen] = useState(false)
  const [confirmReportOpen, setConfirmReportOpen] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const isMuted = conversation ? muted : localMuted
  const contactName =
    conversation?.name ?? property?.owner.name ?? "أحمد القاسمي"
  const contactInitials =
    conversation?.initials ?? property?.owner.initials ?? "أق"

  const sendMessage = () => {
    if (!message.trim()) return
    const nextMessage = message.trim()
    onSendMessage(conversation?.id, nextMessage)
    setMessage("")
  }

  const matchingMessages = (conversation?.messages ?? []).filter((item) =>
    item.text
      .toLocaleLowerCase("ar")
      .includes(searchQuery.trim().toLocaleLowerCase("ar")),
  )

  const showNotice = (text: string) => {
    setNotice(text)
    window.setTimeout(() => setNotice(""), 2200)
  }

  const handleBlockConfirm = () => {
    setOptionsOpen(false)
    onBlock(conversation?.id)
  }

  const handleReportConfirm = () => {
    onReport(conversation?.id)
    showNotice("تم إرسال البلاغ، سنراجعه في أقرب وقت")
    setOptionsOpen(false)
  }

  const handleDeleteConfirm = () => {
    setOptionsOpen(false)
    onDelete(conversation?.id)
  }

  return (
    <section className="screen chat-detail-screen">
      <header className="chat-detail-header">
        <BackButton onClick={() => go(-1)} />
        <div className="chat-contact">
          <span className="chat-avatar tone-1">
            {contactInitials}
            <i />
          </span>
          <div>
            <strong>
              {contactName}
              <b>✓</b>
            </strong>
            <small>متصل الآن</small>
          </div>
        </div>
        <div className="chat-header-actions">
          <button onClick={() => setOptionsOpen(true)} aria-label="المزيد">
            <Icon name="more" />
          </button>
        </div>
      </header>

      {isSearching && (
        <div className="chat-message-search">
          <label>
            <Icon name="search" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="ابحث في الرسائل..."
              autoFocus
            />
          </label>
          {searchQuery && (
            <small className="chat-search-count">
              {matchingMessages.length} نتيجة
            </small>
          )}
          <button
            onClick={() => {
              setSearchQuery("")
              setIsSearching(false)
            }}
          >
            إلغاء
          </button>
        </div>
      )}

      <main className="messages-thread">
        <div className="chat-date-divider">
          <span>اليوم</span>
        </div>
        <div className="message-row outgoing">
          <div className="message-bubble">
            السلام عليكم، هل يمكن معاينة العقار غداً بعد الساعة الرابعة؟
            <time>
              10:34 ص <b>✓✓</b>
            </time>
          </div>
        </div>
        <div className="message-row incoming">
          <span className="mini-chat-avatar">أق</span>
          <div className="message-bubble">
            نعم بالتأكيد، أرسلت لك موقع العقار والتفاصيل.
            <time>10:36 ص</time>
          </div>
        </div>
        <button
          className="shared-property-card"
          onClick={() => (property ? onOpenProperty(property) : go(14))}
        >
          <span>
            <Icon name="building" />
          </span>
          <div>
            <small>عقار تمت مشاركته</small>
            <strong>{property?.title ?? "شقة عصرية في حي حدة"}</strong>
            <p>
              <Icon name="pin" />
              {property ? propertyAddress(property) : "صنعاء، حي حدة"}
            </p>
          </div>
          <b>{property ? propertyPrice(property) : "85,000,000 ر.ي"}</b>
        </button>
        <div className="message-row incoming voice-row">
          <span className="mini-chat-avatar">أق</span>
          <div className="voice-message">
            <button
              onClick={() => setVoicePlaying((current) => !current)}
              aria-label={
                voicePlaying ? "إيقاف الرسالة الصوتية" : "تشغيل الرسالة الصوتية"
              }
              aria-pressed={voicePlaying}
            >
              {voicePlaying ? "❚❚" : "▶"}
            </button>
            <div className="voice-wave">
              {Array.from({ length: 12 }).map((_, index) => (
                <i key={index} />
              ))}
            </div>
            <span dir="ltr">0:24</span>
          </div>
        </div>
        {(conversation?.messages ?? []).map((sentMessage) => (          <div
            className={`message-row outgoing${
              searchQuery &&
              sentMessage.text
                .toLocaleLowerCase("ar")
                .includes(searchQuery.toLocaleLowerCase("ar"))
                ? " message-search-match"
                : ""
            }`}
            key={sentMessage.id}
          >
            <div className="message-bubble">
              {sentMessage.text}
              <time>
                {sentMessage.sentAt} <b>✓</b>
              </time>
            </div>
          </div>
        ))}
        <div className="typing-indicator">
          <span className="mini-chat-avatar">أق</span>
          <div>
            <i />
            <i />
            <i />
          </div>
          <small>يكتب الآن...</small>
        </div>
      </main>

      <div className="message-composer">
        <label aria-label="إرفاق ملف" title="إرفاق ملف">
          <input
            type="file"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) showNotice(`تم اختيار الملف: ${file.name}`)
              event.target.value = ""
            }}
          />
          <Icon name="paperclip" />
        </label>
        <label
          className="composer-action"
          aria-label="إرسال صورة"
          title="إرسال صورة"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) showNotice(`تم اختيار الصورة: ${file.name}`)
              event.target.value = ""
            }}
          />
          <Icon name="image" />
        </label>
        <div className="composer-input">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && sendMessage()}
            placeholder="اكتب رسالتك..."
          />
          <button
            onClick={() => setMessage((current) => `${current}🙂`)}
            aria-label="رمز تعبيري"
          >
            <Icon name="smile" />
          </button>
        </div>
        <button
          className="composer-send"
          onClick={
            message.trim()
              ? sendMessage
              : () => showNotice("اضغط مطولاً لتسجيل رسالة صوتية")
          }
          aria-label={message.trim() ? "إرسال الرسالة" : "رسالة صوتية"}
        >
          <Icon name={message.trim() ? "send" : "mic"} />
        </button>
      </div>

      {optionsOpen && (
        <div className="chat-options-layer">
          <button
            className="chat-options-scrim"
            onClick={() => setOptionsOpen(false)}
            aria-label="إغلاق خيارات المحادثة"
          />
          <aside className="chat-options-panel">
            <div className="chat-options-heading">
              <div>
                <strong>خيارات المحادثة</strong>
                <small>{contactName}</small>
              </div>
              <button onClick={() => setOptionsOpen(false)} aria-label="إغلاق">
                <Icon name="close" />
              </button>
            </div>
            <div className="chat-options-profile">
              <span className="chat-avatar tone-1">{contactInitials}</span>
              <div>
                <strong>
                  {contactName} <b>✓</b>
                </strong>
                <small>مالك موثّق · متصل الآن</small>
              </div>
            </div>
            <div className="chat-options-list">
              <button onClick={onViewOwner}>
                <Icon name="user" />
                <span>عرض الملف الشخصي</span>
                <Icon name="chevron" />
              </button>
              <button
                onClick={() => {
                  if (conversation) onToggleMute(conversation.id)
                  else setLocalMuted((current) => !current)
                  showNotice(
                    isMuted ? "تم تشغيل الإشعارات" : "تم كتم الإشعارات",
                  )
                }}
              >
                <Icon name={isMuted ? "bellOff" : "bell"} />
                <span>كتم إشعارات المحادثة</span>
                <i
                  className={isMuted ? "option-switch active" : "option-switch"}
                >
                  <b />
                </i>
              </button>
              <button
                onClick={() => {
                  setIsSearching(true)
                  setOptionsOpen(false)
                }}
              >
                <Icon name="search" />
                <span>البحث في المحادثة</span>
                <Icon name="chevron" />
              </button>
            </div>
            <div className="chat-danger-options">
              <button
                onClick={() => setConfirmBlockOpen(true)}
              >
                <Icon name="warning" />
                حظر المستخدم
              </button>
              <button
                onClick={() => setConfirmReportOpen(true)}
              >
                <Icon name="document" />
                إبلاغ عن المحادثة
              </button>
              <button
                onClick={() => setConfirmDeleteOpen(true)}
              >
                <Icon name="trash" />
                مسح المحادثة
              </button>
            </div>
          </aside>
        </div>
      )}

      {notice && (
        <div className="chat-action-toast" role="status">
          {notice}
        </div>
      )}

      {confirmBlockOpen && (
        <ConfirmModal
          title="حظر المستخدم"
          message={`هل أنت متأكد من رغبتك في حظر ${contactName}؟`}
          confirmText="حظر"
          cancelText="إلغاء"
          variant="danger"
          onConfirm={handleBlockConfirm}
          onClose={() => setConfirmBlockOpen(false)}
        />
      )}

      {confirmReportOpen && (
        <ConfirmModal
          title="إبلاغ عن المحادثة"
          message="هل تريد إرسال بلاغ عن هذه المحادثة لمراجعتها من قبل الإدارة؟"
          confirmText="إرسال البلاغ"
          cancelText="إلغاء"
          variant="default"
          onConfirm={handleReportConfirm}
          onClose={() => setConfirmReportOpen(false)}
        />
      )}

      {confirmDeleteOpen && (
        <ConfirmModal
          title="مسح المحادثة"
          message="هل أنت متأكد من مسح هذه المحادثة نهائياً؟ لا يمكن التراجع عن هذه الخطوة."
          confirmText="مسح نهائي"
          cancelText="إلغاء"
          variant="danger"
          onConfirm={handleDeleteConfirm}
          onClose={() => setConfirmDeleteOpen(false)}
        />
      )}
    </section>
  )
}
