import { useState } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { PropertyCard } from "../../components/PropertyCard"
import type { Property } from "../../types"

export function SearchResults({
  go,
  onOpen,
  results,
  favoriteIds,
  onToggleFavorite,
  reportedPropertyIds,
  onReportProperty,
  onReset,
}: {
  go: (screen: number) => void
  onOpen: (property: Property) => void
  results: Property[]
  favoriteIds: Set<string>
  onToggleFavorite: (propertyId: string) => void
  reportedPropertyIds: Set<string>
  onReportProperty: (propertyId: string) => void
  onReset: () => void
}) {
  const [saved, setSaved] = useState(false)

  return (
    <section className="screen feature-screen">
      <PageHeader title="نتائج البحث" go={go} />
      <main className="results-content">
        <button
          className={saved ? "save-search saved" : "save-search"}
          onClick={() => setSaved(!saved)}
        >
          <span>
            <Icon name="bell" />
          </span>
          <div>
            <strong>{saved ? "تم حفظ البحث" : "حفظ البحث"}</strong>
            <p>سنخبرك عند إضافة عقارات جديدة مطابقة</p>
          </div>
          <b>{saved ? "✓" : "+"}</b>
        </button>

        <div className="results-heading">
          <div>
            <h2>العقارات المتاحة</h2>
            <p>
              {results.length
                ? `وجدنا ${results.length} عقارات تناسب بحثك`
                : "لا توجد نتائج مطابقة"}
            </p>
          </div>
          <button onClick={() => go(16)}>
            <Icon name="filter" />
            تعديل
          </button>
        </div>

        {results.length ? (
          <div className="property-list">
            {results.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onOpen={onOpen}
                favorite={favoriteIds.has(property.id)}
                onToggleFavorite={onToggleFavorite}
                reported={reportedPropertyIds.has(property.id)}
                onReport={onReportProperty}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-6 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary-text)]">
              <Icon name="search" />
            </span>
            <h2 className="mt-4 text-sm font-extrabold text-[var(--text)]">
              عذراً، لم نجد عقارات مطابقة لبحثك
            </h2>
            <p className="mt-2 text-xs leading-6 text-[var(--text-muted)]">
              جرّب تعديل الخيارات أو أرسل طلباً مخصصاً وسنساعدك في العثور على
              العقار.
            </p>
            <div className="mt-5 grid gap-2">
              <button
                className="min-h-11 rounded-xl bg-[var(--primary-strong)] px-4 text-xs font-bold text-[var(--dark-text)]"
                onClick={onReset}
              >
                إعادة ضبط الفلاتر
              </button>
              <button
                className="min-h-11 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-xs font-bold text-[var(--text)]"
                onClick={() => go(34)}
              >
                <span aria-hidden="true">📝</span> طلب عقار مخصص
              </button>
              <button
                className="min-h-11 rounded-xl border border-[var(--primary)] bg-[var(--primary-soft)] px-4 text-xs font-bold text-[var(--primary-text)]"
                onClick={() => go(17)}
              >
                <span aria-hidden="true">✨</span> ابحث بالذكاء الاصطناعي
              </button>
            </div>
          </div>
        )}
      </main>
    </section>
  )
}

