import { useState } from "react"
import { Icon } from "./Icon"
import { PropertySpecs } from "./PropertySpecs"
import { InfrastructureSummary } from "./InfrastructureSummary"
import type { Property } from "../types"
import { propertyAddress, propertyPrice } from "../utils/property"

export const reportReasons = [
  "عقار وهمي أو غير موجود",
  "السعر غير صحيح أو مضلل",
  "صور لا تطابق الواقع",
  "المالك لا يرد أو الرقم خاطئ",
  "سبب آخر",
]

export const ownerReportReasons = [
  "حساب وهمي أو منتحل صفة",
  "احتيال أو طلب دفع خارج المنصة",
  "المالك لا يرد أو أرقام غير صحيحة",
  "سلوك غير لائق أو مسيء",
  "سبب آخر",
]

export function ReportReasonModal({
  onClose,
  onConfirm,
  title = "سبب الإبلاغ",
  subtitle = "اختر السبب الأقرب لمساعدتنا في مراجعة العقار.",
  reasons = reportReasons,
}: {
  onClose: () => void
  onConfirm: () => void
  title?: string
  subtitle?: string
  reasons?: string[]
}) {
  const [reason, setReason] = useState("")
  const [otherReason, setOtherReason] = useState("")

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end bg-[var(--overlay)] p-4 backdrop-blur-sm"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-reason-title"
      dir="rtl"
    >
      <div className="mx-auto w-full max-w-md rounded-3xl border border-[var(--line)] bg-[var(--surface-raised)] p-5 text-right shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <strong
              className="block text-sm font-extrabold text-[var(--text)]"
              id="report-reason-title"
            >
              {title}
            </strong>
            <p className="mt-1 text-[10px] leading-5 text-[var(--text-muted)]">
              {subtitle}
            </p>
          </div>
          <button
            className="grid size-9 shrink-0 place-items-center rounded-full border border-[var(--line)] text-[var(--text-muted)]"
            onClick={onClose}
            aria-label="إغلاق نافذة البلاغ"
            type="button"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="grid gap-2">
          {reasons.map((item) => (
            <button
              className={`min-h-11 rounded-xl border px-3 py-2 text-right text-[10px] font-bold transition ${
                reason === item
                  ? "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary-text)]"
                  : "border-[var(--line)] bg-[var(--surface)] text-[var(--text)]"
              }`}
              key={item}
              onClick={() => setReason(item)}
              aria-pressed={reason === item}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {reason === "سبب آخر" && (
          <input
            className="mt-3 h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 text-xs text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
            value={otherReason}
            onChange={(event) => setOtherReason(event.target.value)}
            placeholder="اكتب السبب باختصار (اختياري)"
            maxLength={160}
          />
        )}

        <div className="mt-5 grid gap-2">
          <button
            className="min-h-12 rounded-xl bg-[var(--primary-strong)] px-4 text-xs font-bold text-[var(--dark-text)] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onConfirm}
            disabled={!reason}
            type="button"
          >
            تأكيد إرسال البلاغ
          </button>
          <button
            className="min-h-11 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-xs font-bold text-[var(--text-muted)]"
            onClick={onClose}
            type="button"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  )
}

export function PropertyCard({
  property,
  onOpen,
  favorite,
  onToggleFavorite,
  reported,
  onReport,
}: {
  property: Property
  onOpen: (property: Property) => void
  favorite: boolean
  onToggleFavorite: (propertyId: string) => void
  reported: boolean
  onReport: (propertyId: string) => void
}) {
  const [notice, setNotice] = useState("")
  const [reportModalOpen, setReportModalOpen] = useState(false)

  const isolate =
    (action: () => void) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      action()
    }

  const share = async () => {
    try {
      if (!navigator.share) throw new Error("Share unavailable")
      await navigator.share({
        title: property.title,
        text: `${property.title} — ${propertyAddress(property)}`,
      })
    } catch {
      await navigator.clipboard
        ?.writeText(property.title)
        .catch(() => undefined)
      setNotice("تم نسخ معلومات العقار")
    }
  }

  return (
    <article
      className="relative grid min-h-[360px] cursor-pointer grid-cols-[39%_61%] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] text-right shadow-sm transition hover:shadow-md"
      dir="ltr"
      onClick={() => onOpen(property)}
      onKeyDown={(event) => event.key === "Enter" && onOpen(property)}
      role="button"
      tabIndex={0}
      aria-label={`عرض تفاصيل ${property.title}`}
    >
      <div className="relative min-h-full overflow-hidden bg-[var(--surface-soft)]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={property.image}
          alt={property.alt}
          onError={(event) => {
            event.currentTarget.style.display = "none"
          }}
        />
        {property.featured && (
  <span className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full bg-[var(--rating)] px-2 py-1 text-[8px] font-bold text-[var(--dark-text)] shadow">
    ⭐ مميز
  </span>
)}
        <button
          className={`absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-[var(--surface-raised)] shadow ${
            favorite
              ? "favorite-active text-[var(--danger-text)]"
              : "text-[var(--text-muted)]"
          }`}
          onClick={isolate(() => onToggleFavorite(property.id))}
          aria-label={favorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        >
          <Icon name="heart" />
        </button>
      </div>

      <div className="flex min-w-0 flex-col gap-2 p-3" dir="rtl">
        <div className="flex items-center justify-between gap-1">
          <div className="flex min-w-0 gap-1">
            <span className="rounded-full bg-[var(--primary-soft)] px-2 py-1 text-[8px] font-bold text-[var(--primary-text)]">
              {property.purpose}
            </span>
            {property.category === "hotel" ? (
              <span className="rounded-full bg-[var(--primary-soft)] px-2 py-1 text-[8px] font-bold text-[var(--primary-text)]">
                {"⭐".repeat(property.starRating ?? 0)}
              </span>
            ) : property.category === "chalet" ? (
              <span className="rounded-full bg-[var(--primary-soft)] px-2 py-1 text-[8px] font-bold text-[var(--primary-text)]">
                {property.capacity} ضيوف
              </span>
            ) : property.paymentMethod ? (
              <span className="rounded-full bg-[var(--primary-soft)] px-2 py-1 text-[8px] font-bold text-[var(--primary-text)]">
                {property.paymentMethod}
              </span>
            ) : null}
            <span className="truncate rounded-full bg-[var(--surface-soft)] px-2 py-1 text-[8px] font-bold text-[var(--text-muted)]">
              {property.category === "commercial"
                ? property.finishing
                : property.category === "land"
                  ? property.landType
                  : property.category === "hotel"
                    ? property.roomCategory
                    : property.category === "chalet"
                      ? property.privacy
                      : property.furnishing}
            </span>
          </div>
          <div className="flex gap-1">
            <button
              className="grid size-7 place-items-center rounded-full border border-[var(--line)] text-[var(--text-muted)]"
              onClick={isolate(() => void share())}
              aria-label="مشاركة العقار"
            >
              <Icon name="share" />
            </button>
            <button
              className={`grid size-7 place-items-center rounded-full border text-[var(--danger-text)] ${
                reported
                  ? "border-[var(--danger)] bg-[var(--danger-soft)]"
                  : "border-[var(--line)]"
              }`}
              onClick={isolate(() => {
                if (reported) {
                  onReport(property.id)
                  setNotice("تم إلغاء البلاغ")
                } else {
                  setReportModalOpen(true)
                }
              })}
              aria-label={reported ? "إلغاء البلاغ عن العقار" : "إبلاغ عن العقار"}
            >
              <Icon name="warning" />
            </button>
          </div>
        </div>

        <div className="min-w-0">
          <strong className="block truncate text-[12px] font-extrabold text-[var(--text)]">
            {property.title}
          </strong>
          <p className="mt-1 flex items-center gap-1 truncate text-[9px] text-[var(--text-muted)]">
            <Icon name="pin" />
            {propertyAddress(property)}
          </p>
        </div>

        <b
          className="text-[13px] font-extrabold text-[var(--primary-text)]"
          dir="rtl"
        >
          {propertyPrice(property)}
        </b>

        <PropertySpecs property={property} />
        {property.category !== "residential" ? (
          <div className="border-y border-[var(--line)] py-2">
            <div className="mb-1.5 flex items-center gap-1 text-[9px] font-bold text-[var(--text)]">
              <Icon name="settings" />
              {property.category === "commercial"
                ? "المرافق والإضافات"
                : property.category === "chalet"
                  ? "المميزات الترفيهية"
                  : property.category === "land" ||
                      property.category === "hotel"
                    ? "المرافق والخدمات"
                  : "المرافق والإضافات"}
            </div>
            <div className="flex flex-wrap gap-1">
              {(property.category === "chalet"
                ? property.chaletAmenities ?? []
                : property.amenities
              ).map((amenity) => (
                <span
                  className="max-w-full truncate rounded-full bg-[var(--surface-soft)] px-2 py-1 text-[7px] font-semibold text-[var(--text-muted)]"
                  key={amenity}
                  title={amenity}
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <InfrastructureSummary property={property} />
        )}

        <div className="mt-auto flex items-center gap-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--primary-soft)] text-[9px] font-extrabold text-[var(--primary-text)]">
            {property.owner.initials}
          </span>
          <span className="min-w-0 flex-1">
            <b className="block truncate text-[9px] text-[var(--text)]">
              {property.owner.name}
            </b>
            <small className="flex items-center gap-0.5 text-[8px] text-[var(--text-muted)]">
              <span className="text-[var(--primary-text)]">
                <Icon name="star" />
              </span>
              {property.owner.rating} ({property.owner.reviewCount})
            </small>
          </span>
        </div>
      </div>

      {notice && (
        <span className="absolute bottom-2 left-2 z-10 rounded-lg bg-[var(--overlay)] px-2 py-1 text-[8px] text-[var(--dark-text)]">
          {notice}
        </span>
      )}
      {reportModalOpen && (
        <ReportReasonModal
          onClose={() => setReportModalOpen(false)}
          onConfirm={() => {
            onReport(property.id)
            setReportModalOpen(false)
            setNotice("تم إرسال البلاغ للمراجعة")
          }}
        />
      )}
    </article>
  )
}
