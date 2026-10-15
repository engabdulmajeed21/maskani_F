import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { RequestsFeed } from "../../components/RequestsFeed"
import { bottomNav } from "../../data/navigation"
import type { SpecialRequest } from "../../types"

export function MyRequests({
  go,
  requests,
}: {
  go: (screen: number) => void
  requests: SpecialRequest[]
}) {
  return (
    <section className="screen feature-screen">
      <PageHeader title="طلباتي" go={go} />
      <main className="feature-content requests-page">
        <RequestsFeed go={go} requests={requests} />
      </main>
      <nav className="bottom-nav account-bottom-nav" aria-label="التنقل الرئيسي">
        {bottomNav.map((item, index) => (
          <button
            key={item.label}
            className={index === 1 ? "active" : ""}
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
