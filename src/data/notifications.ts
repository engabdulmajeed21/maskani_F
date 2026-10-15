import type { IconName } from "../types"

export const notificationItems: {
  title: string
  body: string
  time: string
  icon: IconName
  target: "requests" | "property"
}[] = [
  {
    title: "عقار جديد مطابق لبحثك",
    body: "تمت إضافة شقة جديدة في حدة تطابق تفضيلاتك.",
    time: "قبل 5 دقائق",
    icon: "building",
    target: "property",
  },
  {
    title: "رسالة جديدة من مالك",
    body: "أحمد القاسمي رد على استفسارك بخصوص الشقة.",
    time: "قبل ساعة",
    icon: "chat",
    target: "property",
  },
  {
    title: "تحديث على طلبك العقاري",
    body: "تم العثور على خيارات جديدة تطابق طلبك المخصص في عدن.",
    time: "أمس",
    icon: "calendar",
    target: "requests",
  },
  {
    title: "عرض جديد في منطقتك",
    body: "شاليه عائلي في عدن أصبح متاحاً للحجز اليومي.",
    time: "قبل يومين",
    icon: "tag",
    target: "property",
  },
]
