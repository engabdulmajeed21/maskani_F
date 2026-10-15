import type { NavigationItem, DrawerItem, IconName } from "../types"

export const accountTypes = [
  "مستخدم عادي",
  "مالك شخصي",
  "مالك مكتب",
  "فندق",
  "شاليهات",
]

export const categories: NavigationItem[] = [
  { label: "المنازل والشقق", icon: "building" },
  { label: "المحلات التجارية", icon: "shop" },
  { label: "الفنادق", icon: "hotel" },
  { label: "الشاليهات", icon: "chalet" },
  { label: "الأراضي", icon: "land" },
]

export const bottomNav: (NavigationItem & { target: number })[] = [
  { label: "الرئيسية", icon: "home", target: 12 },
  { label: "طلباتي", icon: "calendar", target: 29 },
  { label: "العروض المميزة", icon: "star", target: 45 },
  { label: "الرسائل", icon: "chat", target: 35 },
  { label: "حسابي", icon: "user", target: 13 },
]

export const drawerGroups: {
  title: string
  items: DrawerItem[]
}[] = [
  {
    title: "روابط سريعة",
    items: [
      { label: "المفضلة", icon: "heart", target: 37 },
      { label: "قائمة المتابعة", icon: "heart", target: 25 },
    ],
  },
  {
    title: "الدعم والمساعدة",
    items: [
      { label: "المساعدة والتواصل", icon: "help", target: 32 },
      { label: "اقتراحات لتطوير المنصة", icon: "chat", target: 20 },
      { label: "حول المنصة", icon: "help", target: 21 },
      { label: "الشروط والأحكام", icon: "document", target: 33 },
    ],
  },
]
