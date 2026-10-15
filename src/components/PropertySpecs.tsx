import { Icon } from "./Icon"
import type { IconName } from "./Icon"
import type { Property } from "../types"

export function PropertySpecs({ property }: { property: Property }) {
  const specs =
    property.category === "commercial"
      ? [
          {
            label: "المساحة",
            value: `${property.area} م²`,
            icon: "land" as IconName,
          },
          {
            label: "نوع المحل",
            value: property.commercialType,
            icon: "shop" as IconName,
          },
          {
            label: "الموقع",
            value: property.shopLocation,
            icon: "pin" as IconName,
          },
          {
            label: "التشطيب",
            value: property.finishing,
            icon: "building" as IconName,
          },
        ]
      : property.category === "land"
        ? [
            {
              label: "المساحة",
              value: `${property.area} م²`,
              icon: "land" as IconName,
            },
            {
              label: "نوع الأرض",
              value: property.landType,
              icon: "land" as IconName,
            },
            {
              label: "الواجهة",
              value: property.frontage?.join("، "),
              icon: "pin" as IconName,
            },
            {
              label: "عرض الشارع",
              value: property.streetWidth,
              icon: "building" as IconName,
            },
          ]
        : property.category === "hotel"
          ? [
              {
                label: "التصنيف",
                value: "⭐".repeat(property.starRating ?? 0),
                icon: "hotel" as IconName,
              },
              {
                label: "نوع الغرفة",
                value: property.roomCategory,
                icon: "bed" as IconName,
              },
              {
                label: "عدد السراير",
                value: property.bedCount,
                icon: "bed" as IconName,
              },
              {
                label: "نوع السرير",
                value: property.bedType,
                icon: "sofa" as IconName,
              },
            ]
          : property.category === "chalet"
            ? [
                {
                  label: "السعة",
                  value: `${property.capacity} ضيوف`,
                  icon: "user" as IconName,
                },
                {
                  label: "الخصوصية",
                  value: property.privacy,
                  icon: "shield" as IconName,
                },
                {
                  label: "المسبح",
                  value: property.chaletAmenities?.includes("مسبح خاص")
                    ? "مسبح خاص"
                    : property.chaletAmenities?.includes("مسبح أطفال")
                      ? "مسبح أطفال"
                      : "بدون مسبح",
                  icon: "droplet" as IconName,
                },
                {
                  label: "المساحة الترفيهية",
                  value: property.chaletAmenities?.includes("مسطحات خضراء")
                    ? "مسطحات خضراء"
                    : property.chaletAmenities?.includes("جلسات خارجية")
                      ? "جلسات خارجية"
                      : property.chaletAmenities?.includes("مكان للشواء")
                        ? "مكان للشواء"
                        : "—",
                  icon: "land" as IconName,
                },
              ]
      : [
          {
            label: "حمامات",
            value: property.bathrooms,
            icon: "bath" as IconName,
          },
          {
            label: "مطابخ",
            value: property.kitchens,
            icon: "kitchen" as IconName,
          },
          { label: "صالات", value: property.halls, icon: "sofa" as IconName },
          { label: "غرف", value: property.bedrooms, icon: "bed" as IconName },
        ]

  return (
    <div className="grid grid-cols-4 divide-x divide-x-reverse divide-[var(--line)] rounded-xl bg-[var(--surface-soft)] py-2">
      {specs.map((spec) => (
        <div
          className="flex min-w-0 flex-col items-center gap-0.5 text-center"
          key={spec.label}
        >
          <Icon name={spec.icon} />
          <b
            className={`w-full px-0.5 text-center text-[var(--text)] ${
              property.category !== "residential"
                ? "line-clamp-2 text-[8px] leading-4"
                : "text-[11px]"
            }`}
          >
            {spec.value}
          </b>
          <span className="truncate text-[8px] text-[var(--text-muted)]">
            {spec.label}
          </span>
        </div>
      ))}
    </div>
  )
}
