import { useState, useEffect } from "react"
import { BrandMini } from "../../components/BrandMini"
import { Icon } from "../../components/Icon"
import { categories, bottomNav } from "../../data/navigation"

export function Home({
  go,
  onSearch,
  onOpenFilters,
  onViewAll,
}: {
  go: (screen: number) => void
  onSearch: (query: string) => void
  onOpenFilters: () => void
  onViewAll: () => void
}) {
  const [query, setQuery] = useState("")
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = window.localStorage.getItem("maskani-theme")
    if (storedTheme) return storedTheme === "dark"
    return (
      document.documentElement.dataset.theme === "dark" ||
      (!document.documentElement.dataset.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
  })

  useEffect(() => {
    const theme = darkMode ? "dark" : "light"
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem("maskani-theme", theme)
  }, [darkMode])

  return (
    <section className="screen home-screen">
      <header className="home-header">
        <div className="home-actions">
          <button
            className="notification-button"
            onClick={() => go(15)}
            aria-label="الإشعارات"
          >
            <Icon name="bell" />
            <span />
          </button>
          <button
            className="mode-toggle"
            onClick={() => setDarkMode((current) => !current)}
            aria-label={darkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
            aria-pressed={darkMode}
          >
            <Icon name={darkMode ? "sun" : "moon"} />
          </button>
        </div>
        <BrandMini />
      </header>

      <main className="home-content">
        <div className="home-greeting">
          <p>أهلاً بك، محمد</p>
          <h1>أين تريد أن تسكن اليوم؟</h1>
        </div>

        <form
          className="search-row"
          onSubmit={(event) => {
            event.preventDefault()
            onSearch(query)
          }}
        >
          <label className="home-search">
            <Icon name="search" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث عن عقارك أو وجهتك..."
              aria-label="البحث عن عقار أو وجهة"
            />
          </label>
          <button
            className="filter-button"
            type="button"
            onClick={onOpenFilters}
            aria-label="خيارات التصفية"
          >
            <Icon name="filter" />
          </button>
        </form>

        <div className="section-heading">
          <h2>تصفح حسب الفئة</h2>
          <button onClick={onViewAll}>عرض الكل</button>
        </div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <button
              key={category.label}
              className="category-card"
              onClick={() =>
                go(
                  index === 0
                    ? 14
                    : index === 1
                      ? 41
                      : index === 2
                        ? 43
                        : index === 3
                          ? 44
                        : index === 4
                          ? 42
                          : 39,
                )
              }
            >
              <span>
                <Icon name={category.icon} />
              </span>
              <b>{category.label}</b>
            </button>
          ))}
        </div>
      </main>

      <div className="home-bottom">
        <button className="ai-fab" onClick={() => go(17)}>
          <Icon name="sparkles" />
          ابحث بالذكاء الاصطناعي
        </button>
        <nav className="bottom-nav" aria-label="التنقل الرئيسي">
  {bottomNav.map((item, index) => (
    <button
      key={item.label}
      className={index === 0 ? "active" : ""}
      onClick={() => go(item.target)}
    >
      <Icon name={item.icon} />
      <span>{item.label}</span>
    </button>
  ))}
</nav>
      </div>
    </section>
  )
}
