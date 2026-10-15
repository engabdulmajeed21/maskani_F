import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { PropertyCard } from "../../components/PropertyCard"
import { properties } from "../../data/properties"
import type { Property } from "../../types"

export function FavoritesScreen({
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
  const favorites = properties.filter((property) =>
    favoriteIds.has(property.id),
  )

  return (
    <section className="screen feature-screen">
      <PageHeader title="المفضلة" go={go} />
      <main className="results-content">
        <div className="favorites-summary">
          <span>
            <Icon name="heart" />
          </span>
          <div>
            <strong>عقاراتك المحفوظة</strong>
            <p>احتفظنا بخياراتك المفضلة لتعود إليها في أي وقت.</p>
          </div>
          <b>{favorites.length}</b>
        </div>
        <div className="results-heading">
          <div>
            <h2>قائمة المفضلة</h2>
            <p>{favorites.length} عقارات محفوظة</p>
          </div>
        </div>
        <div className="property-list">
          {favorites.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onOpen={onOpen}
              favorite
              onToggleFavorite={onToggleFavorite}
              reported={reportedPropertyIds.has(property.id)}
              onReport={onReportProperty}
            />
          ))}
          {!favorites.length && (
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] p-6 text-center">
              <Icon name="heart" />
              <strong className="mt-3 block text-sm text-[var(--text)]">
                لم تضف أي عقار إلى المفضلة بعد
              </strong>
              <button
                className="mt-4 rounded-xl bg-[var(--primary-strong)] px-4 py-3 text-xs font-bold text-[var(--dark-text)]"
                onClick={() => go(14)}
              >
                استكشف العقارات
              </button>
            </div>
          )}
        </div>
      </main>
    </section>
  )
}
