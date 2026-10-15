import { useState, type FormEvent } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { PrimaryButton } from "../../components/PrimaryButton"
import { SuccessBanner } from "../../components/SuccessBanner"
import type { SpecialRequest } from "../../types"

export function NewPropertyRequest({
  go,
  onAddRequest,
}: {
  go: (screen: number) => void
  onAddRequest: (request: SpecialRequest) => void
}) {
  const [request, setRequest] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="screen feature-screen">
      <PageHeader title="رفع طلب عقار جديد" go={go} />
      <main className="feature-content custom-request-content">
        {submitted && (
          <SuccessBanner>تم الرفع، عندما يتوفر طلبك سيصلك إشعار</SuccessBanner>
        )}
        <div className="custom-request-intro">
          <span>
            <Icon name="search" />
          </span>
          <h1>ما العقار الذي تبحث عنه؟</h1>
          <p>
            اكتب تفاصيل طلبك بوضوح، مثل نوع العقار والموقع والميزانية والمواصفات
            التي تهمك.
          </p>
        </div>
        <form
          className="custom-request-form"
          onSubmit={(event) => {
            event.preventDefault()
            if (!request.trim()) return
            onAddRequest({
              type: request.trim(),
              date: "اليوم",
              status: "قيد المراجعة",
              tone: "pending",
            })
            setSubmitted(true)
            setRequest("")
          }}
        >
          <label>
            <span>تفاصيل الطلب المخصص</span>
            <textarea
              value={request}
              onChange={(event) => {
                setRequest(event.target.value)
                setSubmitted(false)
              }}
              placeholder="مثال: أبحث عن شقة مفروشة في صنعاء، ثلاث غرف، قريبة من الخدمات وبميزانية مناسبة..."
              maxLength={500}
              required
            />
            <small>{request.length} / 500</small>
          </label>
          <PrimaryButton type="submit">رفع الطلب</PrimaryButton>
        </form>
      </main>
    </section>
  )
}
