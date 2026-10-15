import { useState } from "react"
import { Icon } from "../../components/Icon"
import { PropertyCard } from "../../components/PropertyCard"
import { properties } from "../../data/properties"
import { bottomNav } from "../../data/navigation"
import type { Property } from "../../types"

export function FeaturedScreen({
  go,
  onOpen,
  favoriteIds,
  onToggleFavorite,
  reportedPropertyIds,
  onReportProperty,
}: {
  go: (screen: number) => void
  onOpen: (property: Property) => void
  favoriteIds: Set<string>
  onToggleFavorite: (propertyId: string) => void
  reportedPropertyIds: Set<string>
  onReportProperty: (propertyId: string) => void
}) {
  const [category, setCategory] = useState("الكل")
  const [sort, setSort] = useState("الأحدث")

  const categories = [
    "الكل",
    "المنازل والشقق",
    "المحلات التجارية",
    "الأراضي",
    "الفنادق",
    "الشاليهات",
  ]

  const featured = properties
    .filter((property) => property.featured === true)
    .filter((property) => {
      if (category === "الكل") return true
      if (category === "المنازل والشقق") return property.category === "residential"
      if (category === "المحلات التجارية") return property.category === "commercial"
      if (category === "الأراضي") return property.category === "land"
      if (category === "الفنادق") return property.category === "hotel"
      if (category === "الشاليهات") return property.category === "chalet"
      return true
    })
    .sort((a, b) => {
      if (sort === "السعر: الأقل") return a.price - b.price
      if (sort === "السعر: الأعلى") return b.price - a.price
      return (
        Date.parse(b.featuredAt ?? b.createdAt) -
        Date.parse(a.featuredAt ?? a.createdAt)
      )
    })

  return (
    <section className="screen !bg-[var(--surface-soft)] text-[var(--text)]">
      <header
        className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--surface-raised)] px-4 pb-3 pt-9"
        dir="rtl"
      >
        <button
          className="grid size-10 place-items-center rounded-full border border-[var(--line)] text-[var(--text)]"
          onClick={() => go(-1)}
          aria-label="رجوع"
        >
          <Icon name="arrow" />
        </button>
        <h1 className="!text-lg !font-extrabold !text-[var(--text)]" dir="rtl">
          العروض المميزة
        </h1>
        <span className="grid size-10 place-items-center rounded-full bg-[var(--rating)] text-[var(--dark-text)]">
          <Icon name="star" />
        </span>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-24 pt-4">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
          {categories.map((item) => (
            <button
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${
                category === item
                  ? "bg-[var(--primary-strong)] text-[var(--dark-text)] shadow-sm"
                  : "border border-[var(--line)] bg-[var(--surface-raised)] text-[var(--text)]"
              }`}
              key={item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <label
          className="my-3 flex w-full items-center justify-start gap-1 text-right text-[11px] text-[var(--text-muted)]"
          dir="rtl"
        >
          ترتيب حسب:
          <select
            className="border-0 bg-[var(--transparent)] font-bold text-[var(--text)] outline-none"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="ترتيب العروض"
          >
            <option>الأحدث</option>
            <option>السعر: الأقل</option>
            <option>السعر: الأعلى</option>
          </select>
        </label>

        <div className="grid gap-4">
          {featured.map((property) => (
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

        {!featured.length && (
          <div className="py-16 text-center text-sm text-[var(--text-muted)]">
            لا توجد عروض مميزة في هذا التصنيف حالياً.
          </div>
        )}
      </main>

      <nav
        className="bottom-nav account-bottom-nav"
        aria-label="التنقل الرئيسي"
      >
        {bottomNav.map((item, index) => (
          <button
            key={item.label}
            className={index === 2 ? "active" : ""}
            onClick={() => go(item.target)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </section>
  )
}

