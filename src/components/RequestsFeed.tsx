import { useState } from "react"
import { Icon } from "./Icon"
import type { SpecialRequest } from "../types"

export function RequestsFeed({
  go,
  requests,
}: {
  go: (screen: number) => void
  requests: SpecialRequest[]
}) {
  const [statusMessage, setStatusMessage] = useState("")

  return (
    <div className="requests-content">
      {statusMessage && (
        <div
          className="mb-3 rounded-xl border border-[var(--line)] bg-[var(--primary-soft)] p-3 text-xs font-bold leading-6 text-[var(--text)]"
          role="status"
        >
          {statusMessage}
        </div>
      )}
      <button className="new-request-button" onClick={() => go(34)}>
        <span>+</span>
        <div>
          <strong>رفع طلب عقار جديد</strong>
          <p>أخبرنا بما تبحث عنه وسنساعدك في إيجاده</p>
        </div>
        <Icon name="chevron" />
      </button>
      <div className="list-summary">
        <p>الطلبات السابقة</p>
        <span>{requests.length} طلبات</span>
      </div>
      <div className="request-list">
        {requests.map((request, index) => (
          <button
            className="request-card"
            key={`${request.type}-${request.date}-${index}`}
            onClick={() =>
              setStatusMessage(
                request.tone === "pending"
                  ? "طلبك قيد المراجعة ولا توجد نتائج بعد"
                  : "تم العثور على نتيجة لطلبك، وسنتواصل معك لإكمال التفاصيل",
              )
            }
          >
            <span className="request-icon">
              <Icon name="search" />
            </span>
            <div>
              <strong>{request.type}</strong>
              <p>
                <Icon name="calendar" />
                {request.date}
              </p>
            </div>
            <small className={request.tone}>{request.status}</small>
          </button>
        ))}
      </div>
    </div>
  )
}
