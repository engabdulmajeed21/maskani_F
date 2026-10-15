import { useState, useRef } from "react"
import { Icon } from "../../components/Icon"
import { PropertyCard, ReportReasonModal, ownerReportReasons } from "../../components/PropertyCard"
import { ConfirmModal } from "../../components/ConfirmModal"
import { properties } from "../../data/properties"
import type { Owner, Property, PropertyReview } from "../../types"

export function OwnerProfileScreen({
  owner,
  go,
  reviews,
  followed,
  blocked,
  reported,
  favoriteIds,
  reportedPropertyIds,
  onToggleFollow,
  onContact,
  onOpenProperty,
  onToggleFavorite,
  onReportProperty,
  onBlock,
  onReport,
}: {
  owner: Owner
  go: (screen: number) => void
  reviews: PropertyReview[]
  followed: boolean
  blocked: boolean
  reported: boolean
  favoriteIds: Set<string>
  reportedPropertyIds: Set<string>
  onToggleFollow: (ownerId: string) => void
  onContact: (owner: Owner) => void
  onOpenProperty: (property: Property) => void
  onToggleFavorite: (propertyId: string) => void
  onReportProperty: (propertyId: string) => void
  onBlock: (ownerId: string) => void
  onReport: (ownerId: string) => void
}) {
  const [bioExpanded, setBioExpanded] = useState(false)
  const [notice, setNotice] = useState("")
  const [confirmBlockOpen, setConfirmBlockOpen] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const propertiesSection = useRef<HTMLElement>(null)
  const reviewsSection = useRef<HTMLElement>(null)

  const ownerProperties = properties.filter(
    (property) => property.owner.id === owner.id,
  )
  const ownerPropertyIds = new Set(
    ownerProperties.map((property) => property.id),
  )
  const recentReviews = reviews.filter((review) =>
    ownerPropertyIds.has(review.propertyId),
  )
  const dynamicReviewCount = owner.reviewCount + recentReviews.length
  const dynamicRating = dynamicReviewCount
    ? (owner.rating * owner.reviewCount +
        recentReviews.reduce((total, review) => total + review.rating, 0)) /
      dynamicReviewCount
    : owner.rating

  const shareOwner = async () => {
    const shareData = {
      title: `${owner.name} — مسكني`,
      text: `الملف الشخصي للمالك ${owner.name} على منصة مسكني`,
    }
    try {
      if (!navigator.share) throw new Error("Share unavailable")
      await navigator.share(shareData)
    } catch {
      await navigator.clipboard
        ?.writeText(`${shareData.title} — ${shareData.text}`)
        .catch(() => undefined)
      setNotice("تم نسخ معلومات الملف الشخصي")
    }
  }

  const handleBlockConfirm = () => {
    onBlock(owner.id)
    setNotice("تم الحظر بنجاح")
  }

  const handleReportClick = () => {
    if (reported) {
      onReport(owner.id)
      setNotice("تم إلغاء البلاغ")
    } else {
      setReportModalOpen(true)
    }
  }

  return (
    <section className="screen bg-[var(--surface-soft)] text-[var(--text)]">
      <header className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-[var(--line)] bg-[var(--surface-raised)] px-4 pb-3 pt-9">
        <button
          className="grid size-10 justify-self-start place-items-center rounded-full border border-[var(--line)] text-[var(--text)]"
          onClick={() => go(-1)}
          aria-label="رجوع"
        >
          <Icon name="arrow" />
        </button>
        <span className="text-xs font-extrabold text-[var(--text)]">
          الملف التعريفي
        </span>
        <div className="flex items-center gap-2 justify-self-end">
          <button
            className={`grid size-10 place-items-center rounded-full border text-[var(--danger-text)] transition ${
              reported
                ? "border-[var(--danger)] bg-[var(--danger-soft)]"
                : "border-[var(--line)] text-[var(--text)]"
            }`}
            onClick={handleReportClick}
            aria-label={reported ? "إلغاء البلاغ عن المستخدم" : "إبلاغ عن المستخدم"}
          >
            <Icon name="warning" />
          </button>
          <button
            className="grid size-10 place-items-center rounded-full border border-[var(--line)] text-[var(--text)]"
            onClick={shareOwner}
            aria-label="مشاركة"
          >
            <Icon name="share" />
          </button>
        </div>
      </header>

      {blocked ? (
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          <div className="grid size-16 place-items-center rounded-full bg-[var(--danger-soft)] text-2xl text-[var(--danger-text)]">
            🚫
          </div>
          <strong className="mt-4 text-base font-extrabold text-[var(--text)]">
            تم حظر هذا المستخدم
          </strong>
          <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
            لقد قمت بحظر هذا الحساب. لن تتمكن من رؤية عقاراته أو التواصل معه.
          </p>
          <button
            className="mt-6 rounded-xl bg-[var(--primary)] px-6 py-2.5 text-xs font-bold text-[var(--primary-text)]"
            onClick={() => onBlock(owner.id)}
          >
            إلغاء الحظر
          </button>
        </div>
      ) : (
        <main className="flex-1 space-y-4 overflow-y-auto p-4 pb-12">
          <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-5 text-center">
            <div className="relative mx-auto size-20">
              <span className="grid size-20 place-items-center rounded-full bg-[var(--primary-soft)] text-xl font-extrabold text-[var(--primary-text)]">
                {owner.initials}
              </span>
              <span
                className={`absolute bottom-0 right-0 size-4 rounded-full border-2 border-[var(--surface-raised)] ${
                  owner.online ? "bg-[var(--primary)]" : "bg-[var(--text-dim)]"
                }`}
              />
            </div>
            <h2 className="mt-3 inline-flex items-center justify-center gap-1.5 text-base font-extrabold">
              {owner.name}
              {owner.verified && (
                <span className="grid size-5 place-items-center rounded-full bg-[var(--primary-strong)] text-[10px] text-[var(--dark-text)]">
                  ✓
                </span>
              )}
            </h2>
            <p className="mt-1 flex items-center justify-center gap-1 text-[10px] text-[var(--text-muted)]">
              <span
                className={`size-2 rounded-full ${
                  owner.online ? "bg-[var(--primary)]" : "bg-[var(--text-dim)]"
                }`}
              />
              {owner.online ? "متصل الآن" : `آخر ظهور ${owner.lastSeen}`}
            </p>
            <button
              className="mt-3 inline-flex items-center gap-1 rounded-full bg-[var(--primary-soft)] px-3 py-2 text-xs font-bold text-[var(--primary-text)]"
              onClick={() =>
                reviewsSection.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Icon name="star" />
              {dynamicRating.toFixed(1)} ({dynamicReviewCount} تقييم)
            </button>
            <div className="mt-3 flex flex-wrap justify-center gap-3 text-[10px] text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1">
                <Icon name="pin" />
                {owner.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon name="calendar" />
                عضو منذ {owner.since}
              </span>
            </div>
            <p
              className={`mx-auto mt-4 max-w-sm text-xs leading-7 text-[var(--text-muted)] ${
                bioExpanded ? "" : "line-clamp-2"
              }`}
            >
              {owner.bio}
            </p>
            <button
              className="mt-1 text-[10px] font-bold text-[var(--primary-text)]"
              onClick={() => setBioExpanded((current) => !current)}
            >
              {bioExpanded ? "عرض أقل" : "قراءة المزيد"}
            </button>
          </section>

          <section className="grid grid-cols-3 gap-2">
            <button
              className="min-w-0 rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-3 text-center"
              onClick={() =>
                reviewsSection.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <b className="block text-sm text-[var(--text)]">
                {dynamicRating.toFixed(1)}
              </b>
              <small className="text-[9px] text-[var(--text-muted)]">تقييم</small>
            </button>
            <button
              className="min-w-0 rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-3 text-center"
              onClick={() =>
                propertiesSection.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <b className="block text-sm text-[var(--text)]">
                {ownerProperties.length}
              </b>
              <small className="text-[9px] text-[var(--text-muted)]">
                عقارات
              </small>
            </button>
            <div className="min-w-0 rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-3 text-center">
              <b className="block text-sm text-[var(--text)]">
                {owner.responseRate}%
              </b>
              <small className="text-[9px] text-[var(--text-muted)]">ردود</small>
            </div>
          </section>

          <section className="grid grid-cols-3 gap-2">
            <button
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--primary-strong)] px-3 text-xs font-bold text-[var(--dark-text)] disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => onContact(owner)}
              disabled={blocked}
            >
              <Icon name="chat" />
              تواصل
            </button>
            <button
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface-raised)] px-3 text-xs font-bold text-[var(--text)]"
              onClick={() => {
                window.location.href = `tel:${owner.phone}`
              }}
            >
              <Icon name="phone" />
              اتصال
            </button>
            <button
              className={`min-h-12 rounded-xl border px-3 text-[10px] font-bold ${
                followed
                  ? "border-[var(--line)] bg-[var(--surface-raised)] text-[var(--text)]"
                  : "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary-text)]"
              }`}
              onClick={() => onToggleFollow(owner.id)}
              disabled={blocked}
            >
              {followed ? "إلغاء المتابعة" : "متابعة"}
            </button>
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-3 text-center">
            <span className="text-[10px] text-[var(--text-muted)]">
              {owner.followerCount + (followed ? 1 : 0)} متابع
            </span>
          </section>

          <section ref={propertiesSection} className="scroll-mt-4">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <h2 className="text-sm font-extrabold">عقارات {owner.name}</h2>
                <p className="mt-1 text-[10px] text-[var(--text-muted)]">
                  {ownerProperties.length} عقارات منشورة
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {ownerProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onOpen={onOpenProperty}
                  favorite={favoriteIds.has(property.id)}
                  onToggleFavorite={onToggleFavorite}
                  reported={reportedPropertyIds.has(property.id)}
                  onReport={onReportProperty}
                />
              ))}
              {!ownerProperties.length && (
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-6 text-center text-xs text-[var(--text-muted)]">
                  لا توجد عقارات منشورة حالياً
                </div>
              )}
            </div>
          </section>

          <section
            ref={reviewsSection}
            className="scroll-mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-4"
          >
            <h2 className="text-sm font-extrabold">تقييمات المالك</h2>
            <div className="mt-3 flex items-center gap-3">
              <strong className="text-3xl text-[var(--text)]">
                {dynamicRating.toFixed(1)}
              </strong>
              <div>
                <p className="text-sm text-[var(--primary-text)]">
                  {"★".repeat(Math.round(dynamicRating))}
                </p>
                <small className="text-[10px] text-[var(--text-muted)]">
                  {dynamicReviewCount} تقييم
                </small>
              </div>
            </div>
          </section>

          <section className="grid gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-4">
            <button
              className="min-h-11 rounded-xl border border-[var(--danger)] bg-[var(--danger-soft)] px-4 text-xs font-bold text-[var(--danger-text)] disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => setConfirmBlockOpen(true)}
            >
              حظر المستخدم
            </button>
            <button
              className={`min-h-11 rounded-xl border px-4 text-xs font-bold transition ${
                reported
                  ? "border-[var(--danger)] bg-[var(--danger-soft)] text-[var(--danger-text)]"
                  : "border-[var(--line)] bg-[var(--surface)] text-[var(--danger-text)]"
              }`}
              onClick={handleReportClick}
              aria-label={reported ? "إلغاء البلاغ عن المستخدم" : "إبلاغ عن المستخدم"}
            >
              {reported ? "إلغاء البلاغ" : "إبلاغ عن المستخدم"}
            </button>
          </section>
        </main>
      )}

      {notice && (
        <div className="absolute bottom-5 left-1/2 z-[60] -translate-x-1/2 whitespace-nowrap rounded-xl bg-[var(--overlay)] px-4 py-2 text-[10px] text-[var(--dark-text)] shadow-xl">
          {notice}
        </div>
      )}

      {confirmBlockOpen && (
        <ConfirmModal
          title="حظر المستخدم"
          message={`هل أنت متأكد من رغبتك في حظر ${owner.name}؟ لن تتمكن من رؤية عقاراته أو مراسلته.`}
          confirmText="حظر"
          cancelText="إلغاء"
          variant="danger"
          onConfirm={handleBlockConfirm}
          onClose={() => setConfirmBlockOpen(false)}
        />
      )}

      {reportModalOpen && (
        <ReportReasonModal
          title="سبب الإبلاغ عن المالك"
          subtitle="اختر السبب الأقرب لمساعدتنا في مراجعة هذا الحساب."
          reasons={ownerReportReasons}
          onClose={() => setReportModalOpen(false)}
          onConfirm={() => {
            onReport(owner.id)
            setReportModalOpen(false)
            setNotice("تم إرسال البلاغ للمراجعة")
          }}
        />
      )}
    </section>
  )
}
