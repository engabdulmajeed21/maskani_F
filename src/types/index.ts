export type IconName =
  | "arrow"
  | "mail"
  | "lock"
  | "user"
  | "phone"
  | "eye"
  | "menu"
  | "bell"
  | "bellOff"
  | "moon"
  | "sun"
  | "search"
  | "filter"
  | "home"
  | "heart"
  | "calendar"
  | "chat"
  | "building"
  | "shop"
  | "hotel"
  | "chalet"
  | "land"
  | "sparkles"
  | "chevron"
  | "tag"
  | "userPlus"
  | "settings"
  | "globe"
  | "help"
  | "document"
  | "logout"
  | "trash"
  | "close"
  | "warning"
  | "send"
  | "pause"
  | "shield"
  | "instagram"
  | "facebook"
  | "xSocial"
  | "pin"
  | "whatsapp"
  | "upload"
  | "share"
  | "google"
  | "apple"
  | "video"
  | "mic"
  | "paperclip"
  | "image"
  | "more"
  | "smile"
  | "bolt"
  | "droplet"
  | "wifi"
  | "bed"
  | "bath"
  | "sofa"
  | "kitchen"
  | "star"

export type AuthHeaderProps = {
  title: string
  subtitle: string
}

export type NavigationItem = {
  label: string
  icon: IconName
}

export type DrawerItem = NavigationItem & {
  hint?: string
  target: number
}

export type SearchFilterState = {
  propertyType: string
  governorate: string
  district: string
  neighborhood: string
  manualLocation: string
  nearMe: boolean
  currency: string
  minPrice: string
  maxPrice: string
  purpose: string
  payment: string
  furnishing: string
  bedrooms: number
  bathrooms: number
  halls: number
  kitchens: number
  propertyAge: string
  infrastructure: string[]
  amenities: string[]
  landType: string
  areaMin: string
  areaMax: string
  frontage: string[]
  streetWidth: string
  commercialType: string
  shopLocation: string
  finishing: string
  starRating: number
  roomCategory: string
  bedCount: number
  bedType: string
  capacity: number
  privacy: string
}

export type SearchFilterContext =
  | "all"
  | "residential"
  | "commercial"
  | "land"
  | "hotel"
  | "chalet"

export type InfrastructureKey =
  | "electricity"
  | "water"
  | "sewage"
  | "telecommunications"

export type InfrastructureService = {
  label: string
  value: string
  icon: IconName
  status?: "available" | "unavailable" | "unknown"
}

export type Owner = {
  id: string
  name: string
  initials: string
  rating: number
  reviewCount: number
  since: string
  verified: boolean
  online: boolean
  lastSeen: string
  location: string
  bio: string
  phone: string
  responseRate: number
  followerCount: number
  type: string
}

export type Property = {
  id: string
  title: string
  subtitle: string
  featured?: boolean
  featuredAt?: string
  category: "residential" | "commercial" | "land" | "hotel" | "chalet"
  type:
    | "شقة"
    | "منزل مستقل"
    | "فيلا"
    | "محل تجاري"
    | "أرض"
    | "فندق"
    | "شاليه"
  commercialType?:
    | "مكتب تجاري"
    | "معرض"
    | "مطعم/مقهى"
    | "صيدلية"
    | "مستودع"
    | "محل عام"
  shopLocation?:
    | "داخل مول"
    | "داخل سوق تجاري"
    | "على الشارع العام"
    | "في حي سكني"
  area?: number
  finishing?: "عظم" | "تشطيب كامل" | "يحتاج ديكور"
  landType?: "سكنية" | "تجارية" | "زراعية" | "صناعية"
  frontage?: ("شمالية" | "جنوبية" | "شرقية" | "غربية" | "زاوية/شارعين")[]
  streetWidth?: "10م" | "12م" | "20م+"
  starRating?: 1 | 2 | 3 | 4 | 5
  roomCategory?:
    | "غرفة مفردة"
    | "غرفة مزدوجة"
    | "جناح عائلي"
    | "استراحة عامة"
    | "طيرمانة"
    | "صالة مؤتمرات"
  bedCount?: number
  bedType?: "عائلي مزدوج" | "فردي"
  capacity?: number
  privacy?: "سور مستقل مرتفع" | "إطلالة بانورامية"
  chaletAmenities?: string[]
  image: string
  images: string[]
  alt: string
  price: number
  currency: string
  pricePeriod?: string
  location: {
    governorate: string
    district: string
    neighborhood?: string
  }
  bedrooms: number
  halls: number
  kitchens: number
  bathrooms: number
  purpose: "للبيع" | "للإيجار" | "حجز يومي" | "استثمار"
  paymentMethod?: "كاش" | "تقسيط"
  furnishing: "مفروش" | "غير مفروش"
  owner: Owner
  description: string
  amenities: string[]
  infrastructure: Partial<Record<InfrastructureKey, InfrastructureService>>
  createdAt: string
}

export type PropertyReview = {
  id: string
  propertyId: string
  userId: string
  userName: string
  userInitials: string
  rating: number
  text: string
  dateLabel: string
  createdAt: number
  isOwn: boolean
  isNew?: boolean
}

export type SpecialRequest = {
  type: string
  date: string
  status: string
  tone: string
}

export type ChatMessage = {
  id: string
  text: string
  sentAt: string
}

export type Conversation = {
  id: string
  ownerId: string
  name: string
  type: string
  initials: string
  message: string
  time: string
  unread: number
  online: boolean
  updatedAt: number
  pinned?: boolean
  muted?: boolean
  messages: ChatMessage[]
}
