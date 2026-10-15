import { useState, useRef } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { bottomNav } from "../../data/navigation"
import type { Conversation } from "../../types"

export function Chats({
  go,
  conversations,
  onDelete,
  onPin,
  onUnpin,
  onOpen,
}: {
  go: (screen: number) => void
  conversations: Conversation[]
  onDelete: (id: string) => void
  onPin: (id: string) => void
  onUnpin: (id: string) => void
  onOpen: (conversation: Conversation) => void
}) {
  const [category, setCategory] = useState("الكل")
  const [query, setQuery] = useState("")
  const pointerStarts = useRef<Record<string, { x: number; y: number; locked?: "x" | "y" }>>({})
  const longPressTimers = useRef<Record<string, number>>({})
  const swiped = useRef<Record<string, boolean>>({})
  const [dragOffsets, setDragOffsets] = useState<Record<string, number>>({})
  const unreadConversationCount = conversations.filter(
    (conversation) => conversation.unread > 0,
  ).length
  const visibleChats = [...conversations]
    .filter((conversation) => {
      const matchesCategory =
        category === "الكل" ||
        (category === "غير المقروءة"
          ? conversation.unread > 0
          : conversation.type === category)
      return matchesCategory && conversation.name.includes(query.trim())
    })
    .sort(
      (a, b) =>
        Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) ||
        b.updatedAt - a.updatedAt,
    )

  const clearLongPress = (id: string) => {
    const timer = longPressTimers.current[id]
    if (timer) window.clearTimeout(timer)
    delete longPressTimers.current[id]
  }

  return (
    <section className="screen feature-screen chats-screen">
      <PageHeader title="الرسائل" go={go} />
      <main className="chats-content">
        <label className="chats-search">
          <Icon name="search" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث في المحادثات..."
          />
        </label>
        <div className="chat-categories">
          {["الكل", "غير المقروءة", "ملاك", "فنادق"].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
              {item === "غير المقروءة" && (
                <span>{unreadConversationCount}</span>
              )}
            </button>
          ))}
        </div>
        <div className="chats-heading">
          <div>
            <h2>الرسائل</h2>
            <p>{visibleChats.length} محادثات</p>
          </div>
          <button onClick={() => go(25)}>
            <Icon name="send" />
            رسالة جديدة
          </button>
        </div>
        <button className="pinned-bot-card" onClick={() => go(17)}>
          <span>
            <Icon name="sparkles" />
            <i />
          </span>
          <div>
            <strong>مساعد مسكني الذكي</strong>
            <small>متصل الآن</small>
            <p>مرحباً! كيف يمكنني مساعدتك في العثور على عقارك؟</p>
          </div>
          <b>مثبت</b>
        </button>
        <div className="conversations-list">
          {visibleChats.map((conversation, index) => {
            const startsNormalSection =
              !conversation.pinned &&
              (index === 0 || visibleChats[index - 1]?.pinned)
            return (
              <div className="contents" key={conversation.id}>
                {index === 0 && conversation.pinned && (
                  <p className="mb-1 mt-1 text-[10px] font-bold text-[var(--primary-text)]">
                    المحادثات المثبتة
                  </p>
                )}
                {startsNormalSection && (
                  <p className="mb-1 mt-2 text-[10px] font-bold text-[var(--text-muted)]">
                    كل المحادثات
                  </p>
                )}
                <button
                  className={`conversation-card touch-pan-y select-none ${
                    conversation.pinned ? "border-[var(--primary)]" : ""
                  }`}
                  onClick={() => {
                    if (swiped.current[conversation.id]) {
                      delete swiped.current[conversation.id]
                      return
                    }
                    onOpen(conversation)
                  }}
                                    onContextMenu={(event) => event.preventDefault()}
                  style={{
                    transform: dragOffsets[conversation.id]
                      ? `translateX(${dragOffsets[conversation.id]}px)`
                      : undefined,
                    transition: dragOffsets[conversation.id]
                      ? "none"
                      : "transform 180ms ease",
                  }}
                  onPointerDown={(event) => {
                    pointerStarts.current[conversation.id] = {
                      x: event.clientX,
                      y: event.clientY,
                    }
                    if (conversation.pinned) {
                      longPressTimers.current[conversation.id] =
                        window.setTimeout(() => {
                          swiped.current[conversation.id] = true
                          onUnpin(conversation.id)
                        }, 650)
                    }
                  }}
                  onPointerMove={(event) => {
                    const start = pointerStarts.current[conversation.id]
                    if (!start) return

                    const dx = event.clientX - start.x
                    const dy = event.clientY - start.y

                    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
                      clearLongPress(conversation.id)
                    }

                    if (!start.locked) {
                      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
                        start.locked = "y"
                      } else if (
                        Math.abs(dx) > 12 &&
                        Math.abs(dx) > Math.abs(dy)
                      ) {
                        start.locked = "x"
                      }
                    }

                    if (start.locked === "x") {
                      const clamped = Math.max(-100, Math.min(100, dx))
                      setDragOffsets((current) => ({
                        ...current,
                        [conversation.id]: clamped,
                      }))
                    }
                  }}
                  onPointerCancel={() => {
                    clearLongPress(conversation.id)
                    delete pointerStarts.current[conversation.id]
                    setDragOffsets((current) => ({
                      ...current,
                      [conversation.id]: 0,
                    }))
                  }}
                  onPointerUp={(event) => {
                    clearLongPress(conversation.id)
                    const start = pointerStarts.current[conversation.id]
                    delete pointerStarts.current[conversation.id]
                    setDragOffsets((current) => ({
                      ...current,
                      [conversation.id]: 0,
                    }))

                    if (!start || start.locked !== "x") return
                    const distance = event.clientX - start.x

                    if (Math.abs(distance) > 85) {
                      swiped.current[conversation.id] = true
                      window.setTimeout(() => {
                        delete swiped.current[conversation.id]
                      }, 0)
                    }
                    if (distance > 85) onDelete(conversation.id)
                    if (distance < -85) onPin(conversation.id)
                  }}
                >
                  <span className={`chat-avatar tone-${(index % 3) + 1}`}>
                    {conversation.initials}
                    {conversation.online && <i />}
                  </span>
                  <div>
                    <strong>
                      {conversation.name}
                      <b>✓</b>
                    </strong>
                    <small>
                      {conversation.type === "ملاك"
                        ? "مالك موثّق"
                        : "منشأة موثّقة"}
                    </small>
                    <p className={conversation.unread ? "unread" : ""}>
                      {conversation.message}
                    </p>
                  </div>
                  <span className="chat-meta">
                    <time>{conversation.time}</time>
                    {(conversation.pinned || conversation.muted) && (
                      <span className="flex items-center gap-1">
                        {conversation.muted && (
                          <span
                            className="grid size-5 place-items-center rounded-full bg-[var(--surface-soft)] text-[var(--text-muted)]"
                            aria-label="الإشعارات مكتومة"
                            title="الإشعارات مكتومة"
                          >
                            <Icon name="bellOff" />
                          </span>
                        )}
                        {conversation.pinned && (
                          <span
                            className="text-[var(--primary-text)]"
                            aria-label="محادثة مثبتة"
                          >
                            <Icon name="pin" />
                          </span>
                        )}
                      </span>
                    )}
                    {conversation.unread > 0 && <b>{conversation.unread}</b>}
                  </span>
                </button>
              </div>
            )
          })}
          {visibleChats.length === 0 && (
            <div className="empty-chats">
              <Icon name="chat" />
              <strong>لا توجد محادثات</strong>
              <p>جرّب البحث باسم مختلف أو اختر تصنيفاً آخر.</p>
            </div>
          )}
        </div>
      </main>
      <nav
  className="bottom-nav account-bottom-nav"
  aria-label="التنقل الرئيسي"
>
  {bottomNav.map((item, index) => (
    <button
      key={item.label}
      className={index === 3 ? "active relative" : "relative"}
      onClick={() => go(item.target)}
    >
      <Icon name={item.icon} />
      <span>{item.label}</span>
      {index === 3 && unreadConversationCount > 0 && (
        <b className="absolute right-1/2 top-1 grid size-4 translate-x-4 place-items-center rounded-full bg-[var(--danger)] text-[8px] text-[var(--dark-text)]">
          {unreadConversationCount}
        </b>
      )}
    </button>
  ))}
</nav>
    </section>
  )
}

