import type { Dispatch, SetStateAction } from "react"
import { Splash } from "../screens/auth/Splash"
import { Onboarding } from "../screens/auth/Onboarding"
import { Login } from "../screens/auth/Login"
import { SignUp } from "../screens/auth/SignUp"
import { Otp } from "../screens/auth/Otp"
import { PasswordRecovery } from "../screens/auth/PasswordRecovery"
import { TemporaryPassword } from "../screens/auth/TemporaryPassword"
import { NewPassword } from "../screens/auth/NewPassword"
import { Welcome } from "../screens/auth/Welcome"
import { Home } from "../screens/main/Home"
import { AccountScreen } from "../screens/main/AccountScreen"
import { Notifications } from "../screens/main/Notifications"
import { AiAssistant } from "../screens/main/AiAssistant"
import { FavoritesScreen } from "../screens/main/FavoritesScreen"
import { MyRequests } from "../screens/main/MyRequests"
import { NewPropertyRequest } from "../screens/main/NewPropertyRequest"
import { SearchFilters } from "../screens/properties/SearchFilters"
import { HomesApartments } from "../screens/properties/HomesApartments"
import { CommercialShops } from "../screens/properties/CommercialShops"
import { LandsScreen } from "../screens/properties/LandsScreen"
import { HotelsScreen } from "../screens/properties/HotelsScreen"
import { ChaletsScreen } from "../screens/properties/ChaletsScreen"
import { SearchResults } from "../screens/properties/SearchResults"
import { PropertyDetailsScreen } from "../screens/properties/PropertyDetailsScreen"
import { FeaturedScreen } from "../screens/properties/FeaturedScreen"
import { Chats } from "../screens/chat/Chats"
import { ChatDetail } from "../screens/chat/ChatDetail"
import { DeactivateAccount } from "../screens/account/DeactivateAccount"
import { DeleteAccount } from "../screens/account/DeleteAccount"
import { Suggestions } from "../screens/account/Suggestions"
import { About } from "../screens/account/About"
import { EditProfile } from "../screens/account/EditProfile"
import { AccountVerification } from "../screens/account/AccountVerification"
import { FollowingList } from "../screens/account/FollowingList"
import { OwnerProfileScreen } from "../screens/account/OwnerProfileScreen"
import { JoinPartner } from "../screens/account/JoinPartner"
import { Security } from "../screens/account/Security"
import { LanguageSheet } from "../screens/account/LanguageSheet"
import { AccountSettings } from "../screens/account/AccountSettings"
import { NotificationSettings } from "../screens/account/NotificationSettings"
import { HelpCenter } from "../screens/account/HelpCenter"
import { Terms } from "../screens/account/Terms"
import { Placeholder } from "../components/Placeholder"
import { properties } from "../data/properties"
import { findOwner } from "../data/owners"
import { createDefaultFilters } from "../utils/filters"
import type {
  Owner,
  Property,
  PropertyReview,
  Conversation,
  SearchFilterState,
  SearchFilterContext,
  SpecialRequest,
} from "../types"

interface ScreenRouterProps {
  screen: number
  navigate: (screen: number) => void
  accountType: number
  setAccountType: Dispatch<SetStateAction<number>>
  isPartner: boolean
  selectedProperty: Property
  openProperty: (property: Property) => void
  filters: SearchFilterState
  setFilters: Dispatch<SetStateAction<SearchFilterState>>
  filterContext: SearchFilterContext
  openFilters: (context: SearchFilterContext) => void
  filteredProperties: Property[]
  setFilterContext: Dispatch<SetStateAction<SearchFilterContext>>
  favoriteIds: Set<string>
  toggleFavorite: (propertyId: string) => void
  reportedPropertyIds: Set<string>
  reportProperty: (propertyId: string) => void
  selectedOwner: Owner
  openOwner: (owner: Owner) => void
  followedOwnerIds: Set<string>
  toggleFollowOwner: (ownerId: string) => void
  blockedOwnerIds: Set<string>
  blockOwner: (ownerId: string) => void
  reportedOwnerIds: Set<string>
  reportOwner: (ownerId: string) => void
  reviews: PropertyReview[]
  addReview: (propertyId: string, rating: number, text: string) => void
  deleteReview: (reviewId: string) => void
  chatItems: Conversation[]
  setChatItems: Dispatch<SetStateAction<Conversation[]>>
  selectedConversation: Conversation | undefined
  openConversation: (conversation: Conversation) => void
  contactOwner: (owner: Owner) => void
  deleteConversation: (id?: string) => void
  pinConversation: (id: string) => void
  unpinConversation: (id: string) => void
  toggleConversationMute: (id?: string) => void
  updateConversationFromSentMessage: (id: string | undefined, message: string) => void
  userSpecialRequests: SpecialRequest[]
  addSpecialRequest: (request: SpecialRequest) => void
}

export function ScreenRouter({
  screen,
  navigate,
  accountType,
  setAccountType,
  isPartner,
  selectedProperty,
  openProperty,
  filters,
  setFilters,
  filterContext,
  openFilters,
  filteredProperties,
  setFilterContext,
  favoriteIds,
  toggleFavorite,
  reportedPropertyIds,
  reportProperty,
  selectedOwner,
  openOwner,
  followedOwnerIds,
  toggleFollowOwner,
  blockedOwnerIds,
  blockOwner,
  reportedOwnerIds,
  reportOwner,
  reviews,
  addReview,
  deleteReview,
  chatItems,
  setChatItems,
  selectedConversation,
  openConversation,
  contactOwner,
  deleteConversation,
  pinConversation,
  unpinConversation,
  toggleConversationMute,
  updateConversationFromSentMessage,
  userSpecialRequests,
  addSpecialRequest,
}: ScreenRouterProps) {
  if (screen === 0) return <Splash go={navigate} />
  if (screen >= 1 && screen <= 3)
    return <Onboarding step={screen - 1} go={navigate} />
  if (screen === 4)
    return <Login go={navigate} setAccountType={setAccountType} />
  if (screen === 5)
    return (
      <SignUp
        go={navigate}
        accountType={accountType}
        setAccountType={setAccountType}
      />
    )
  if (screen === 6) return <Otp go={navigate} isPartner={isPartner} />
  if (screen === 7) return <PasswordRecovery go={navigate} />
  if (screen === 8) return <TemporaryPassword go={navigate} />
  if (screen === 9) return <NewPassword go={navigate} isPartner={isPartner} />
  if (screen === 10 || screen === 11)
    return <Welcome partner={screen === 11} go={navigate} />
  if (screen === 12)
    return (
      <Home
        go={navigate}
        onOpenFilters={() => openFilters("all")}
        onViewAll={() => {
          setFilterContext("all")
          setFilters(createDefaultFilters())
          navigate(22)
        }}
        onSearch={(query) => {
          setFilterContext("all")
          setFilters({
            ...createDefaultFilters(),
            manualLocation: query.trim(),
          })
          navigate(22)
        }}
      />
    )
  if (screen === 13) return <AccountScreen go={navigate} />
  if (screen === 14)
    return (
      <HomesApartments
        go={navigate}
        onOpenFilters={() => openFilters("residential")}
        onOpen={openProperty}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        reportedPropertyIds={reportedPropertyIds}
        onReportProperty={reportProperty}
      />
    )
  if (screen === 15)
    return <Notifications go={navigate} onOpenProperty={openProperty} />
  if (screen === 16)
    return (
      <SearchFilters
        go={navigate}
        filters={filters}
        setFilters={setFilters}
        onApply={() => navigate(22)}
        context={filterContext}
      />
    )
  if (screen === 17) return <AiAssistant go={navigate} />
  if (screen === 18) return <DeactivateAccount go={navigate} />
  if (screen === 19) return <DeleteAccount go={navigate} />
  if (screen === 20) return <Suggestions go={navigate} />
  if (screen === 21) return <About go={navigate} />
  if (screen === 22)
    return (
      <SearchResults
        go={navigate}
        onOpen={openProperty}
        results={filteredProperties}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        reportedPropertyIds={reportedPropertyIds}
        onReportProperty={reportProperty}
        onReset={() =>
          setFilters({
            ...createDefaultFilters(),
            propertyType:
              filterContext === "commercial"
                ? "محلات"
                : filterContext === "land"
                  ? "أرض"
                  : filterContext === "hotel"
                    ? "فندق"
                    : filterContext === "chalet"
                      ? "شاليه"
                      : "",
          })
        }
      />
    )
  if (screen === 23) return <EditProfile go={navigate} />
  if (screen === 24)
    return <AccountVerification go={navigate} isPartner={isPartner} />
  if (screen === 25)
    return (
      <FollowingList
        go={navigate}
        followedOwnerIds={followedOwnerIds}
        onToggleFollow={toggleFollowOwner}
        onOpenOwner={openOwner}
      />
    )
  if (screen === 26) return <JoinPartner go={navigate} />
  if (screen === 27) return <Security go={navigate} />
  if (screen === 28) return <LanguageSheet go={navigate} />
  if (screen === 29)
    return <MyRequests go={navigate} requests={userSpecialRequests} />
  if (screen === 30) return <AccountSettings go={navigate} />
  if (screen === 31) return <NotificationSettings go={navigate} />
  if (screen === 32) return <HelpCenter go={navigate} />
  if (screen === 33) return <Terms go={navigate} />
  if (screen === 34)
    return <NewPropertyRequest go={navigate} onAddRequest={addSpecialRequest} />
  if (screen === 35)
    return (
      <Chats
        go={navigate}
        conversations={chatItems}
        onDelete={(id) =>
          setChatItems((current) => current.filter((item) => item.id !== id))
        }
        onPin={pinConversation}
        onUnpin={unpinConversation}
        onOpen={openConversation}
      />
    )
  if (screen === 36)
    return (
      <ChatDetail
        go={navigate}
        property={
          selectedConversation
            ? properties.find(
                (property) => property.owner.id === selectedConversation.ownerId,
              )
            : selectedProperty
        }
        conversation={selectedConversation}
        onDelete={deleteConversation}
        onBlock={(id) => {
          const conversation =
            chatItems.find((item) => item.id === id) ?? selectedConversation
          if (conversation) blockOwner(conversation.ownerId)
          navigate(35)
        }}
        onReport={(id) => {
          if (!id) return
          const conversation = chatItems.find((item) => item.id === id)
          if (conversation) reportOwner(conversation.ownerId)
          setChatItems((current) =>
            current.map((item) =>
              item.id === id
                ? { ...item, message: "تم إرسال بلاغ عن هذه المحادثة" }
                : item,
            ),
          )
        }}
        muted={Boolean(selectedConversation?.muted)}
        onToggleMute={toggleConversationMute}
        onSendMessage={updateConversationFromSentMessage}
        onViewOwner={() => {
          const owner =
            findOwner(selectedConversation?.ownerId ?? "") ??
            selectedProperty.owner
          openOwner(owner)
        }}
        onOpenProperty={openProperty}
      />
    )
  if (screen === 37)
    return (
      <FavoritesScreen
        go={navigate}
        onOpen={openProperty}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        reportedPropertyIds={reportedPropertyIds}
        onReportProperty={reportProperty}
      />
    )
  if (screen === 38)
    return (
      <PropertyDetailsScreen
        property={selectedProperty}
        go={navigate}
        favorite={favoriteIds.has(selectedProperty.id)}
        onToggleFavorite={toggleFavorite}
        onChat={() => contactOwner(selectedProperty.owner)}
        reviews={reviews}
        onAddReview={addReview}
        onDeleteReview={deleteReview}
        onOpenOwner={openOwner}
        reported={reportedPropertyIds.has(selectedProperty.id)}
        onReportProperty={reportProperty}
      />
    )
  if (screen === 39) return <Placeholder go={navigate} isPartner={isPartner} />
  if (screen === 40)
    return (
      <OwnerProfileScreen
        owner={selectedOwner}
        go={navigate}
        reviews={reviews}
        followed={followedOwnerIds.has(selectedOwner.id)}
        blocked={blockedOwnerIds.has(selectedOwner.id)}
        reported={reportedOwnerIds.has(selectedOwner.id)}
        favoriteIds={favoriteIds}
        reportedPropertyIds={reportedPropertyIds}
        onToggleFollow={toggleFollowOwner}
        onContact={contactOwner}
        onOpenProperty={openProperty}
        onToggleFavorite={toggleFavorite}
        onReportProperty={reportProperty}
        onBlock={blockOwner}
        onReport={reportOwner}
      />
    )
  if (screen === 41)
    return (
      <CommercialShops
        go={navigate}
        onOpenFilters={() => openFilters("commercial")}
        onOpen={openProperty}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        reportedPropertyIds={reportedPropertyIds}
        onReportProperty={reportProperty}
      />
    )
  if (screen === 42)
    return (
      <LandsScreen
        go={navigate}
        onOpenFilters={() => openFilters("land")}
        onOpen={openProperty}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        reportedPropertyIds={reportedPropertyIds}
        onReportProperty={reportProperty}
      />
    )
  if (screen === 43)
    return (
      <HotelsScreen
        go={navigate}
        onOpenFilters={() => openFilters("hotel")}
        onOpen={openProperty}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        reportedPropertyIds={reportedPropertyIds}
        onReportProperty={reportProperty}
      />
    )
  if (screen === 44)
    return (
      <ChaletsScreen
        go={navigate}
        onOpenFilters={() => openFilters("chalet")}
        onOpen={openProperty}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        reportedPropertyIds={reportedPropertyIds}
        onReportProperty={reportProperty}
      />
    )
  if (screen === 45)
    return (
      <FeaturedScreen
        go={navigate}
        onOpen={openProperty}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        reportedPropertyIds={reportedPropertyIds}
        onReportProperty={reportProperty}
      />
    )
  return <Placeholder go={navigate} />
}
