import { useState } from "react"
import { Icon } from "../../components/Icon"
import { PageHeader } from "../../components/PageHeader"
import { ownerList } from "../../data/owners"
import type { Owner } from "../../types"

export function FollowingList({
  go,
  followedOwnerIds,
  onToggleFollow,
  onOpenOwner,
}: {
  go: (screen: number) => void
  followedOwnerIds: Set<string>
  onToggleFollow: (ownerId: string) => void
  onOpenOwner: (owner: Owner) => void
}) {
  const following = ownerList.filter((owner) => followedOwnerIds.has(owner.id))

  return (
    <section className="screen feature-screen">
      <PageHeader title="قائمة المتابعة" go={go} />
      <main className="feature-content following-content">
        <div className="list-summary">
          <p>الحسابات التي تتابعها</p>
          <span>{following.length} حسابات</span>
        </div>
        <div className="following-list">
          {following.map((owner) => (
            <article className="following-card" key={owner.id}>
              <button
                className="follow-avatar border-0 p-0"
                onClick={() => onOpenOwner(owner)}
                aria-label={`عرض ملف ${owner.name}`}
              >
                {owner.initials}
              </button>
              <button
                className="min-w-0 border-0 bg-[var(--transparent)] p-0 text-right text-[var(--text)]"
                onClick={() => onOpenOwner(owner)}
              >
                <strong>
                  {owner.name}
                  {owner.verified && <span>✓</span>}
                </strong>
                <p>{owner.type}</p>
              </button>
              <button onClick={() => onToggleFollow(owner.id)}>
                إلغاء المتابعة
              </button>
            </article>
          ))}
          {following.length === 0 && (
            <div className="empty-following">
              <Icon name="heart" />
              <p>لا توجد حسابات في قائمة المتابعة حالياً</p>
            </div>
          )}
        </div>
      </main>
    </section>
  )
}

