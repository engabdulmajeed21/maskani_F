import { useState, useEffect, useRef } from "react"
import { FlowNavigationSidebar } from "./navigation/FlowNavigationSidebar"
import { ScreenRouter } from "./navigation/ScreenRouter"
import { owners } from "./data/owners"
import { properties } from "./data/properties"
import { specialRequests } from "./data/requests"
import { initialConversations } from "./data/conversations"
import { createDefaultFilters } from "./utils/filters"
import { filterProperties } from "./utils/property"
import type {
  Owner,
  Property,
  PropertyReview,
  Conversation,
  SearchFilterState,
  SearchFilterContext,
  SpecialRequest,
} from "./types"

export default function App() {
  const [screen, setScreen] = useState(() => {
    const stored = window.history.state?.maskaniScreen
    return typeof stored === "number" ? stored : 0
  })
  const [accountType, setAccountType] = useState(0)
  const [selectedProperty, setSelectedProperty] = useState<Property>(
    properties[0],
  )
  const [filters, setFilters] =
    useState<SearchFilterState>(createDefaultFilters)
  const [filterContext, setFilterContext] =
    useState<SearchFilterContext>("all")
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set())
  const [chatItems, setChatItems] =
    useState<Conversation[]>(initialConversations)
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>()
  const [selectedOwner, setSelectedOwner] = useState<Owner>(owners.ahmed)
  const [followedOwnerIds, setFollowedOwnerIds] = useState<Set<string>>(
    () => new Set([owners.ofuq.id]),
  )
  const [blockedOwnerIds, setBlockedOwnerIds] = useState<Set<string>>(
    () => new Set(),
  )
  const [reportedOwnerIds, setReportedOwnerIds] = useState<Set<string>>(
    () => new Set(),
  )
  const [reportedPropertyIds, setReportedPropertyIds] = useState<Set<string>>(
    () => new Set(),
  )
  const [reviews, setReviews] = useState<PropertyReview[]>([])
  const [userSpecialRequests, setUserSpecialRequests] =
    useState<SpecialRequest[]>(specialRequests)

  const simulatedMessageIndex = useRef(0)
  const isPartner = accountType > 0

  const filterSource =
    filterContext === "residential"
      ? properties.filter((property) => property.category === "residential")
      : filterContext === "commercial"
        ? properties.filter((property) => property.category === "commercial")
        : filterContext === "land"
          ? properties.filter((property) => property.category === "land")
          : filterContext === "hotel"
            ? properties.filter((property) => property.category === "hotel")
            : filterContext === "chalet"
              ? properties.filter((property) => property.category === "chalet")
              : properties

  const filteredProperties = filterProperties(filterSource, filters)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("maskani-theme")
    if (storedTheme === "dark" || storedTheme === "light") {
      document.documentElement.dataset.theme = storedTheme
    }
  }, [])

  useEffect(() => {
    if (typeof window.history.state?.maskaniScreen !== "number") {
      window.history.replaceState({ maskaniScreen: screen }, "")
    }

    const handlePopState = (event: PopStateEvent) => {
      setScreen(
        typeof event.state?.maskaniScreen === "number"
          ? event.state.maskaniScreen
          : 0,
      )
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    const simulatedMessages = [
      "هل ما زلت مهتماً بالعقار؟ يمكننا ترتيب موعد مناسب.",
      "تم تحديث تفاصيل العرض، ويمكنك مراجعتها الآن.",
      "مرحباً، يسعدنا الإجابة عن أي استفسار لديك.",
    ]

    const timer = window.setInterval(() => {
      setChatItems((current) => {
        const candidates = current.filter(
          (item) => screen !== 36 || item.id !== selectedConversation?.id,
        )
        if (!candidates.length) return current

        const target =
          candidates[simulatedMessageIndex.current % candidates.length]
        const nextMessage =
          simulatedMessages[
            simulatedMessageIndex.current % simulatedMessages.length
          ]
        simulatedMessageIndex.current += 1

        return current.map((item) =>
          item.id === target.id
            ? {
                ...item,
                message: nextMessage,
                time: "الآن",
                unread: item.unread + 1,
                updatedAt: Date.now(),
              }
            : item,
        )
      })
    }, 20000)

    return () => window.clearInterval(timer)
  }, [screen, selectedConversation?.id])

  const navigate = (nextScreen: number) => {
    if (nextScreen === -1) {
      window.history.back()
      return
    }
    if (nextScreen === screen) return
    window.history.pushState({ maskaniScreen: nextScreen }, "")
    setScreen(nextScreen)
  }

  const openFilters = (context: SearchFilterContext) => {
    setFilterContext(context)
    if (context === "commercial") {
      setFilters({
        ...createDefaultFilters(),
        propertyType: "محلات",
      })
    } else if (context === "land") {
      setFilters({
        ...createDefaultFilters(),
        propertyType: "أرض",
      })
    } else if (context === "hotel") {
      setFilters({
        ...createDefaultFilters(),
        propertyType: "فندق",
      })
    } else if (context === "chalet") {
      setFilters({
        ...createDefaultFilters(),
        propertyType: "شاليه",
      })
    } else if (context === "residential") {
      setFilters((current) => ({
        ...current,
        propertyType: ["شقة", "منازل مستقلة", "فلل"].includes(
          current.propertyType,
        )
          ? current.propertyType
          : "",
      }))
    }
    navigate(16)
  }

  const openProperty = (property: Property) => {
    setSelectedProperty(property)
    navigate(38)
  }

  const openOwner = (owner: Owner) => {
    setSelectedOwner(owner)
    navigate(40)
  }

  const toggleFavorite = (propertyId: string) => {
    setFavoriteIds((current) => {
      const next = new Set(current)
      if (next.has(propertyId)) next.delete(propertyId)
      else next.add(propertyId)
      return next
    })
  }

  const openConversation = (conversation: Conversation) => {
    const openedConversation = { ...conversation, unread: 0 }
    setChatItems((current) =>
      current.map((item) =>
        item.id === conversation.id ? openedConversation : item,
      ),
    )
    setSelectedConversation(openedConversation)
    navigate(36)
  }

  const contactOwner = (owner: Owner) => {
    if (blockedOwnerIds.has(owner.id)) return

    const existingConversation = chatItems.find(
      (conversation) => conversation.ownerId === owner.id,
    )

    if (existingConversation) {
      openConversation(existingConversation)
      return
    }

    const conversation: Conversation = {
      id: `owner-${owner.id}`,
      ownerId: owner.id,
      name: owner.name,
      type: owner.type.includes("فندق") ? "فنادق" : "ملاك",
      initials: owner.initials,
      message: "ابدأ محادثتك الآن",
      time: "الآن",
      unread: 0,
      online: owner.online,
      updatedAt: Date.now(),
      messages: [],
    }

    setChatItems((current) => [conversation, ...current])
    setSelectedConversation(conversation)
    navigate(36)
  }

  const toggleFollowOwner = (ownerId: string) => {
    setFollowedOwnerIds((current) => {
      const next = new Set(current)
      if (next.has(ownerId)) next.delete(ownerId)
      else next.add(ownerId)
      return next
    })
  }

  const blockOwner = (ownerId: string) => {
    const isBlocked = blockedOwnerIds.has(ownerId)
    setBlockedOwnerIds((current) => {
      const next = new Set(current)
      if (next.has(ownerId)) next.delete(ownerId)
      else next.add(ownerId)
      return next
    })

    if (isBlocked) return

    setFollowedOwnerIds((current) => {
      const next = new Set(current)
      next.delete(ownerId)
      return next
    })
    setChatItems((current) =>
      current.filter((conversation) => conversation.ownerId !== ownerId),
    )
    setSelectedConversation((current) =>
      current?.ownerId === ownerId ? undefined : current,
    )
  }

  const reportOwner = (ownerId: string) => {
    setReportedOwnerIds((current) => {
      const next = new Set(current)
      if (next.has(ownerId)) next.delete(ownerId)
      else next.add(ownerId)
      return next
    })
  }

  const reportProperty = (propertyId: string) => {
    setReportedPropertyIds((current) => {
      const next = new Set(current)
      if (next.has(propertyId)) next.delete(propertyId)
      else next.add(propertyId)
      return next
    })
  }

  const addReview = (propertyId: string, rating: number, text: string) => {
    const id = `review-${Date.now()}`
    const review: PropertyReview = {
      id,
      propertyId,
      userId: "current-user",
      userName: "محمد أحمد",
      userInitials: "مح",
      rating,
      text,
      dateLabel: "الآن",
      createdAt: Date.now(),
      isOwn: true,
      isNew: true,
    }

    setReviews((current) => [review, ...current])
    window.setTimeout(() => {
      setReviews((current) =>
        current.map((item) =>
          item.id === id ? { ...item, isNew: false } : item,
        ),
      )
    }, 3500)
  }

  const deleteReview = (reviewId: string) => {
    setReviews((current) => current.filter((review) => review.id !== reviewId))
  }

  const deleteConversation = (id?: string) => {
    if (id) setChatItems((current) => current.filter((item) => item.id !== id))
    setSelectedConversation(undefined)
    navigate(35)
  }

  const pinConversation = (id: string) => {
    setChatItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, pinned: true } : item))
        .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned))),
    )
  }

  const unpinConversation = (id: string) => {
    setChatItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, pinned: false } : item,
      ),
    )
  }

  const updateConversationFromSentMessage = (
    id: string | undefined,
    message: string,
  ) => {
    if (!id) return
    const update = (item: Conversation): Conversation =>
      item.id === id
        ? {
            ...item,
            message: `أنت: ${message}`,
            time: "الآن",
            unread: 0,
            updatedAt: Date.now(),
            messages: [
              ...item.messages,
              {
                id: `message-${Date.now()}`,
                text: message,
                sentAt: "الآن",
              },
            ],
          }
        : item

    setChatItems((current) => current.map(update))
    setSelectedConversation((current) => (current ? update(current) : current))
  }

  const toggleConversationMute = (id?: string) => {
    if (!id) return
    setChatItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, muted: !item.muted } : item,
      ),
    )
    setSelectedConversation((current) =>
      current?.id === id ? { ...current, muted: !current.muted } : current,
    )
  }

  const addSpecialRequest = (request: SpecialRequest) => {
    setUserSpecialRequests((current) => [request, ...current])
  }

  return (
    <div className="app-shell" dir="rtl">
      <FlowNavigationSidebar
        currentScreen={screen}
        onNavigate={navigate}
      />

      <main className="device-stage">
        <div className="device">
          <div className="device-island" />
          <ScreenRouter
            screen={screen}
            navigate={navigate}
            accountType={accountType}
            setAccountType={setAccountType}
            isPartner={isPartner}
            selectedProperty={selectedProperty}
            openProperty={openProperty}
            filters={filters}
            setFilters={setFilters}
            filterContext={filterContext}
            openFilters={openFilters}
            filteredProperties={filteredProperties}
            setFilterContext={setFilterContext}
            favoriteIds={favoriteIds}
            toggleFavorite={toggleFavorite}
            reportedPropertyIds={reportedPropertyIds}
            reportProperty={reportProperty}
            selectedOwner={selectedOwner}
            openOwner={openOwner}
            followedOwnerIds={followedOwnerIds}
            toggleFollowOwner={toggleFollowOwner}
            blockedOwnerIds={blockedOwnerIds}
            blockOwner={blockOwner}
            reportedOwnerIds={reportedOwnerIds}
            reportOwner={reportOwner}
            reviews={reviews}
            addReview={addReview}
            deleteReview={deleteReview}
            chatItems={chatItems}
            setChatItems={setChatItems}
            selectedConversation={selectedConversation}
            openConversation={openConversation}
            contactOwner={contactOwner}
            deleteConversation={deleteConversation}
            pinConversation={pinConversation}
            unpinConversation={unpinConversation}
            toggleConversationMute={toggleConversationMute}
            updateConversationFromSentMessage={updateConversationFromSentMessage}
            userSpecialRequests={userSpecialRequests}
            addSpecialRequest={addSpecialRequest}
          />
        </div>
        <p className="stage-caption">
          واجهة واحدة، تجربة سلسة من الاكتشاف إلى التفعيل
        </p>
      </main>
    </div>
  )
}
