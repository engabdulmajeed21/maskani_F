import { useState } from "react"
import { Icon, type IconName } from "../../components/Icon"
import { Toast } from "../../components/Toast"
import { ReportReasonModal } from "../../components/PropertyCard"
import { PropertySpecs } from "../../components/PropertySpecs"
import { InfrastructureSummary } from "../../components/InfrastructureSummary"
import { PropertyReviewsSection } from "../../components/PropertyReviewsSection"
import { propertyAddress, propertyPrice, infrastructureItems } from "../../utils/property"
import type { Owner, Property, PropertyReview } from "../../types"

export function PropertyDetailsScreen({
  property,
  go,
  favorite,
  onToggleFavorite,
  onChat,
  reviews,
  onAddReview,
  onDeleteReview,
  onOpenOwner,
  reported,
  onReportProperty,
}: {
  property: Property
  go: (screen: number) => void
  favorite: boolean
  onToggleFavorite: (propertyId: string) => void
  onChat: () => void
  reviews: PropertyReview[]
  onAddReview: (propertyId: string, rating: number, text: string) => void
  onDeleteReview: (reviewId: string) => void
  onOpenOwner: (owner: Owner) => void
  reported: boolean
  onReportProperty: (propertyId: string) => void
}) {
  const gallery = property.images.length ? property.images : [property.image]
  const [activeImage, setActiveImage] = useState(0)
  const [notice, setNotice] = useState("")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const services = infrastructureItems(property)

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

  const infoCards =
    property.category === "commercial"
      ? [
          {
            icon: "land" as IconName,
            label: "المساحة",
            value: `${property.area} م²`,
          },
          {
            icon: "shop" as IconName,
            label: "نوع المحل",
            value: property.commercialType,
          },
          {
            icon: "pin" as IconName,
            label: "الموقع",
            value: property.shopLocation,
          },
          {
            icon: "building" as IconName,
            label: "التشطيب",
            value: property.finishing,
          },
        ]
      : property.category === "land"
        ? [
            {
              icon: "land" as IconName,
              label: "المساحة",
              value: `${property.area} م²`,
            },
            {
              icon: "land" as IconName,
              label: "نوع الأرض",
              value: property.landType,
            },
            {
              icon: "pin" as IconName,
              label: "الواجهة",
              value: property.frontage?.join("، "),
            },
            {
              icon: "building" as IconName,
              label: "عرض الشارع",
              value: property.streetWidth,
            },
          ]
        : property.category === "hotel"
          ? [
              {
                icon: "hotel" as IconName,
                label: "التصنيف",
                value: "⭐".repeat(property.starRating ?? 0),
              },
              {
                icon: "bed" as IconName,
                label: "نوع الغرفة",
                value: property.roomCategory,
              },
              {
                icon: "bed" as IconName,
                label: "عدد السراير",
                value: property.bedCount,
              },
              {
                icon: "sofa" as IconName,
                label: "نوع السرير",
                value: property.bedType,
              },
            ]
          : property.category === "chalet"
            ? [
                {
                  icon: "user" as IconName,
                  label: "السعة",
                  value: `${property.capacity} ضيوف`,
                },
                {
                  icon: "shield" as IconName,
                  label: "الخصوصية",
                  value: property.privacy,
                },
                {
                  icon: "droplet" as IconName,
                  label: "المسبح",
                  value: property.chaletAmenities?.includes("مسبح خاص")
                    ? "مسبح خاص"
                    : property.chaletAmenities?.includes("مسبح أطفال")
                      ? "مسبح أطفال"
                      : "بدون مسبح",
                },
                {
                  icon: "land" as IconName,
                  label: "المساحة الترفيهية",
                  value: property.chaletAmenities?.includes("مسطحات خضراء")
                    ? "مسطحات خضراء"
                    : property.chaletAmenities?.includes("جلسات خارجية")
                      ? "جلسات خارجية"
                      : property.chaletAmenities?.includes("مكان للشواء")
                        ? "مكان للشواء"
                        : "—",
                },
              ]
      : [
          {
            icon: "bed" as IconName,
            label: "غرف النوم",
            value: property.bedrooms,
          },
          { icon: "sofa" as IconName, label: "الصالات", value: property.halls },
          {
            icon: "kitchen" as IconName,
            label: "المطابخ",
            value: property.kitchens,
          },
          {
            icon: "bath" as IconName,
            label: "الحمامات",
            value: property.bathrooms,
          },
        ]

  return (
    <section className="screen !bg-[var(--surface-soft)] text-[var(--text)]">
      <main className="min-h-0 flex-1 overflow-y-auto pb-28 [scrollbar-width:none]">
        <div className="relative h-64 overflow-hidden bg-[var(--line)]">
          <button
            className="h-full w-full cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
            aria-label="فتح الصورة بالحجم الكامل"
          >
            <img
              className="h-full w-full object-cover"
              src={gallery[activeImage]}
              alt={`${property.alt} - صورة ${activeImage + 1}`}
            />
          </button>
          <button
            className="absolute right-3 top-9 grid size-10 place-items-center rounded-full bg-[var(--overlay)] text-[var(--dark-text)] backdrop-blur"
            onClick={() => go(-1)}
            aria-label="رجوع"
          >
            <Icon name="arrow" />
          </button>
          <div className="absolute left-3 top-9 flex gap-2">
            <button
              className={`grid size-10 place-items-center rounded-full bg-[var(--overlay)] backdrop-blur ${
                favorite
                  ? "favorite-active text-[var(--danger-text)]"
                  : "text-[var(--dark-text)]"
              }`}
              onClick={() => onToggleFavorite(property.id)}
              aria-label={favorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            >
              <Icon name="heart" />
            </button>
            <button
              className="grid size-10 place-items-center rounded-full bg-[var(--overlay)] text-[var(--dark-text)] backdrop-blur"
              onClick={() => void share()}
              aria-label="مشاركة العقار"
            >
              <Icon name="share" />
            </button>
            <button
              className={`grid size-10 place-items-center rounded-full text-[var(--dark-text)] backdrop-blur ${
                reported ? "bg-[var(--danger)]" : "bg-[var(--overlay)]"
              }`}
              onClick={() => {
                if (reported) {
                  onReportProperty(property.id)
                  setNotice("تم إلغاء البلاغ")
                } else {
                  setReportModalOpen(true)
                }
              }}
              aria-label={reported ? "إلغاء البلاغ عن العقار" : "إبلاغ عن العقار"}
            >
              <Icon name="warning" />
            </button>
          </div>
          <span className="absolute bottom-3 left-3 rounded-full bg-[var(--overlay)] px-3 py-1 text-[10px] font-bold text-[var(--dark-text)] backdrop-blur">
            <span className="inline-flex items-center gap-1" dir="ltr">
              <Icon name="image" />
              {activeImage + 1}/{gallery.length}
            </span>
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto bg-[var(--surface-raised)] px-4 py-3 [scrollbar-width:none]">
          {gallery.map((image, index) => (
            <button
              className={`h-14 w-16 shrink-0 overflow-hidden rounded-xl border-2 ${
                activeImage === index
                  ? "border-[var(--primary)]"
                  : "border-[var(--transparent)]"
              }`}
              key={`${image}-${index}`}
              onClick={() => setActiveImage(index)}
              aria-label={`عرض الصورة ${index + 1}`}
            >
              <img className="h-full w-full object-cover" src={image} alt="" />
            </button>
          ))}
        </div>

        <div className="space-y-3 p-4">
          <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-4 shadow-sm">
            <div className="mb-3 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                  property.purpose === "للبيع"
                    ? "bg-[var(--primary-soft)] text-[var(--primary-text)]"
                    : property.purpose === "للإيجار"
                      ? "bg-[var(--primary-soft)] text-[var(--primary-text)]"
                      : "bg-[var(--primary-soft)] text-[var(--primary-text)]"
                }`}
              >
                {property.purpose}
              </span>
              {property.category === "hotel" ? (
                <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[10px] font-bold text-[var(--primary-text)]">
                  {"⭐".repeat(property.starRating ?? 0)}
                </span>
              ) : property.category === "chalet" ? (
                <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[10px] font-bold text-[var(--primary-text)]">
                  {property.capacity} ضيوف
                </span>
              ) : property.paymentMethod ? (
                <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[10px] font-bold text-[var(--primary-text)]">
                  {property.paymentMethod}
                </span>
              ) : null}
              <span className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-[10px] font-bold text-[var(--text-muted)]">
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
            <h1 className="!text-xl !font-extrabold !text-[var(--text)]">
              {property.title}
            </h1>
            <p className="mt-1 text-xs leading-6 text-[var(--text-muted)]">
              {property.subtitle}
            </p>
            <p className="mt-2 flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
              <Icon name="pin" />
              {propertyAddress(property)}
            </p>
            <b className="mt-4 block text-xl font-extrabold text-[var(--text)]">
              {propertyPrice(property)}
            </b>
          </section>

          <section className="grid grid-cols-4 divide-x divide-x-reverse divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] py-4 shadow-sm">
            {infoCards.map((item) => (
              <div
                className="flex min-w-0 flex-col items-center gap-1 text-center"
                key={item.label}
              >
                <span className="text-[var(--primary-text)]">
                  <Icon name={item.icon} />
                </span>
                <b
                  className={`w-full px-1 text-center text-[var(--text)] ${
                    property.category !== "residential"
                      ? "line-clamp-2 text-[9px] leading-4"
                      : "text-sm"
                  }`}
                >
                  {item.value}
                </b>
                <small className="truncate text-[8px] text-[var(--text-muted)]">
                  {item.label}
                </small>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-[var(--primary-text)]">
                <Icon name="document" />
              </span>
              <h2 className="text-sm font-extrabold text-[var(--text)]">
                وصف العقار
              </h2>
            </div>
            <p className="text-xs leading-7 text-[var(--text-muted)]">
              {property.description}
            </p>
          </section>

          {property.category === "residential" && services.length > 0 && (
            <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[var(--primary-text)]">
                  <Icon name="settings" />
                </span>
                <h2 className="text-sm font-extrabold text-[var(--text)]">
                  خدمات البنية التحتية
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => (
                  <div
                    className="flex min-w-0 items-center gap-2 rounded-xl bg-[var(--surface-soft)] p-3"
                    key={service.label}
                  >
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-lg ${
                        service.status === "unavailable"
                          ? "bg-[var(--line)] text-[var(--text-muted)]"
                          : "bg-[var(--primary-soft)] text-[var(--primary-text)]"
                      }`}
                    >
                      <Icon name={service.icon} />
                    </span>
                    <span className="min-w-0">
                      <b className="block truncate text-[9px] text-[var(--text-muted)]">
                        {service.label}
                      </b>
                      <small className="block break-words text-[10px] font-bold leading-4 text-[var(--text)]">
                        {service.value}
                      </small>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[var(--primary-text)]">
                <Icon name="settings" />
              </span>
              <h2 className="text-sm font-extrabold text-[var(--text)]">
                {property.category === "chalet"
                  ? "المميزات الترفيهية"
                  : "المرافق والخدمات"}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(property.category === "chalet"
                ? property.chaletAmenities ?? []
                : property.amenities
              ).map((amenity) => (
                <span
                  className="rounded-full bg-[var(--surface-soft)] px-3 py-2 text-[10px] font-semibold text-[var(--text)]"
                  key={amenity}
                >
                  {amenity}
                </span>
              ))}
            </div>
          </section>

          <button
            className="flex w-full items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-4 text-right shadow-sm"
            onClick={() => onOpenOwner(property.owner)}
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[var(--primary-soft)] text-xs font-extrabold text-[var(--primary-text)]">
              {property.owner.initials}
            </span>
            <span className="min-w-0 flex-1">
              <b className="block truncate text-sm text-[var(--text)]">
                {property.owner.name}
              </b>
              <small className="mt-0.5 block text-[10px] text-[var(--text-muted)]">
                مالك العقار
              </small>
              <small className="mt-1 flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                <span className="text-[var(--primary-text)]">
                  <Icon name="star" />
                </span>
                {property.owner.rating} ({property.owner.reviewCount} تقييم)
              </small>
            </span>
            <Icon name="chevron" />
          </button>

          <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-[var(--danger-soft)] text-[var(--danger-text)]">
                <Icon name="pin" />
              </span>
              <span>
                <b className="block text-sm text-[var(--text)]">الموقع</b>
                <small className="text-[10px] text-[var(--text-muted)]">
                  {propertyAddress(property)}
                </small>
              </span>
            </div>
            <div
              className="relative grid h-24 place-items-center overflow-hidden rounded-xl bg-[var(--surface-soft)]"
              aria-label="معاينة تقريبية للموقع وليست خريطة تفاعلية"
            >
              <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-[var(--line-strong)]" />
              <span className="absolute inset-y-0 left-1/2 border-l border-dashed border-[var(--line-strong)]" />
              <span className="z-10 grid size-9 place-items-center rounded-full bg-[var(--surface-raised)] text-[var(--danger-text)] shadow">
                <Icon name="pin" />
              </span>
              <small className="absolute bottom-2 text-[8px] text-[var(--text-muted)]">
                معاينة تقريبية للموقع
              </small>
            </div>
          </section>

          <PropertyReviewsSection
            property={property}
            reviews={reviews}
            onAddReview={onAddReview}
            onDeleteReview={onDeleteReview}
          />
        </div>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-[var(--surface-raised)] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary-strong)] px-4 font-bold text-[var(--dark-text)] shadow-lg shadow-[var(--primary-shadow)]"
          onClick={onChat}
        >
          <Icon name="chat" />
          تواصل مع المالك
        </button>
      </div>

      {notice && (
        <div className="absolute bottom-24 left-1/2 z-[60] -translate-x-1/2 whitespace-nowrap rounded-xl bg-[var(--overlay)] px-4 py-2 text-[10px] text-[var(--dark-text)] shadow-xl">
          {notice}
        </div>
      )}
      {lightboxOpen && (
        <div
          className="absolute inset-0 z-[70] flex flex-col justify-between bg-[var(--overlay)] p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="معرض صور العقار"
          dir="rtl"
        >
          <div className="flex items-center justify-between gap-3">
            <button
              className="grid size-11 place-items-center rounded-full bg-[var(--surface-raised)] text-[var(--text)] shadow-lg"
              onClick={() => setLightboxOpen(false)}
              aria-label="إغلاق معرض الصور"
            >
              <Icon name="close" />
            </button>
            <span
              className="rounded-full bg-[var(--surface-raised)] px-3 py-2 text-xs font-bold text-[var(--text)] shadow-lg"
              dir="ltr"
            >
              {activeImage + 1} / {gallery.length}
            </span>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
            <img
              className="max-h-full w-full object-contain"
              src={gallery[activeImage]}
              alt={`${property.alt} - معاينة الصورة ${activeImage + 1}`}
            />
            {gallery.length > 1 && (
              <>
                <button
                  className="absolute right-0 grid size-11 place-items-center rounded-full bg-[var(--surface-raised)] text-[var(--text)] shadow-lg"
                  onClick={() =>
                    setActiveImage(
                      (current) =>
                        (current - 1 + gallery.length) % gallery.length,
                    )
                  }
                  aria-label="الصورة السابقة"
                >
                  <span className="rotate-180">
                    <Icon name="chevron" />
                  </span>
                </button>
                <button
                  className="absolute left-0 grid size-11 place-items-center rounded-full bg-[var(--surface-raised)] text-[var(--text)] shadow-lg"
                  onClick={() =>
                    setActiveImage(
                      (current) => (current + 1) % gallery.length,
                    )
                  }
                  aria-label="الصورة التالية"
                >
                  <Icon name="chevron" />
                </button>
              </>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto rounded-2xl bg-[var(--surface-raised)] p-3 [scrollbar-width:none]">
            {gallery.map((image, index) => (
              <button
                className={`h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 ${
                  activeImage === index
                    ? "border-[var(--primary)]"
                    : "border-[var(--transparent)]"
                }`}
                key={`${image}-lightbox-${index}`}
                onClick={() => setActiveImage(index)}
                aria-label={`عرض الصورة ${index + 1}`}
              >
                <img className="h-full w-full object-cover" src={image} alt="" />
              </button>
            ))}
          </div>
        </div>
      )}
      {reportModalOpen && (
        <ReportReasonModal
          onClose={() => setReportModalOpen(false)}
          onConfirm={() => {
            onReportProperty(property.id)
            setReportModalOpen(false)
            setNotice("تم إرسال البلاغ للمراجعة")
          }}
        />
      )}
    </section>
  )
}

