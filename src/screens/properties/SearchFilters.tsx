import { useState } from "react"
import { Icon } from "../../components/Icon"
import { CheckGroup } from "../../components/CheckGroup"
import { ChoiceGroup } from "../../components/ChoiceGroup"
import { DualRangeSlider } from "../../components/DualRangeSlider"
import { FilterCounter } from "../../components/FilterCounter"
import { FilterSection } from "../../components/FilterSection"
import { createDefaultFilters } from "../../utils/filters"
import { properties } from "../../data/properties"
import type { SearchFilterState, SearchFilterContext, Property } from "../../types"

export function SearchFilters({
  go,
  filters,
  setFilters,
  onApply,
  context,
}: {
  go: (screen: number) => void
  filters: SearchFilterState
  setFilters: React.Dispatch<React.SetStateAction<SearchFilterState>>
  onApply: () => void
  context: SearchFilterContext
}) {
  const [locationMessage, setLocationMessage] = useState("")
  const update = <K extends keyof SearchFilterState,>(
    key: K,
    value: SearchFilterState[K],
  ) => setFilters((current) => ({ ...current, [key]: value }))
  const resetFilters = () =>
    setFilters({
      ...createDefaultFilters(),
      propertyType:
        context === "commercial"
          ? "محلات"
          : context === "land"
            ? "أرض"
            : context === "hotel"
              ? "فندق"
              : context === "chalet"
                ? "شاليه"
                : "",
    })

  const governorates = [
    ...new Set(properties.map((item) => item.location.governorate)),
  ]
  const districts = [
    ...new Set(
      properties
        .filter(
          (item) =>
            !filters.governorate ||
            item.location.governorate === filters.governorate,
        )
        .map((item) => item.location.district),
    ),
  ]
  const neighborhoods = [
    ...new Set(
      properties
        .filter(
          (item) =>
            (!filters.governorate ||
              item.location.governorate === filters.governorate) &&
            (!filters.district || item.location.district === filters.district),
        )
        .map((item) => item.location.neighborhood)
        .filter((item): item is string => Boolean(item)),
    ),
  ]

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage("خدمة الموقع غير متاحة على هذا الجهاز")
      return
    }
    setLocationMessage("جارٍ تحديد موقعك...")
    navigator.geolocation.getCurrentPosition(
      () => {
        update("nearMe", true)
        setLocationMessage(
          "تم السماح بالموقع، ولا تتوفر إحداثيات للعقارات الحالية للمقارنة الدقيقة",
        )
      },
      () => {
        update("nearMe", false)
        setLocationMessage(
          "تعذر الوصول إلى موقعك. يمكنك اختيار الموقع أو كتابته يدوياً",
        )
      },
      { enableHighAccuracy: false, timeout: 8000 },
    )
  }

  const residential =
    context === "residential" ||
    ["شقة", "منازل مستقلة", "فلل"].includes(filters.propertyType)
  const propertyTypes =
    context === "residential"
      ? ["شقة", "منازل مستقلة", "فلل"]
      : context === "commercial"
        ? ["محلات"]
        : context === "land"
          ? ["أرض"]
          : context === "hotel"
            ? ["فندق"]
            : context === "chalet"
              ? ["شاليه"]
              : ["شقة", "منازل مستقلة", "فلل", "أرض", "محلات", "فندق", "شاليه"]
  const inputClass =
    "h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 text-xs text-[var(--text)] outline-none focus:border-[var(--primary)]"
  const priceRange =
    filters.currency === "ريال يمني"
      ? { max: 100000000, step: 500000, unit: "ر.ي" }
      : filters.currency === "ريال سعودي"
        ? { max: 20000, step: 100, unit: "ر.س" }
        : { max: 20000, step: 100, unit: filters.currency ? "$" : "" }

  return (
    <section className="screen flex h-full min-h-0 flex-col !bg-[var(--surface-soft)] !text-[var(--text)]">
      <header className="grid shrink-0 grid-cols-3 items-center border-b border-[var(--line)] bg-[var(--surface-raised)] px-4 pb-3 pt-9">
        <button
          className="grid size-10 justify-self-start place-items-center rounded-full border border-[var(--line)]"
          onClick={() => go(-1)}
          aria-label="رجوع"
        >
          <Icon name="arrow" />
        </button>
        <h1 className="text-center text-base font-extrabold">
          {context === "residential"
            ? "تصفية المنازل والشقق"
            : context === "commercial"
              ? "تصفية المحلات التجارية"
              : context === "land"
                ? "تصفية الأراضي"
                : context === "hotel"
                  ? "تصفية الفنادق"
                  : context === "chalet"
                    ? "تصفية الشاليهات"
                    : "تصفية البحث"}
        </h1>
        <button
          className="justify-self-end text-xs font-bold text-[var(--primary-text)]"
          onClick={resetFilters}
        >
          إعادة ضبط
        </button>
      </header>

      <main
        className="w-full min-w-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto overscroll-contain px-4 pb-4 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ minHeight: 0 }}
      >
        <FilterSection title="الموقع">
          <div className="grid grid-cols-3 gap-2">
            <select
              className={inputClass}
              value={filters.governorate}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  governorate: event.target.value,
                  district: "",
                  neighborhood: "",
                }))
              }
              aria-label="المحافظة"
            >
              <option value="">المحافظة</option>
              {governorates.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              className={inputClass}
              value={filters.district}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  district: event.target.value,
                  neighborhood: "",
                }))
              }
              aria-label="المديرية"
            >
              <option value="">المديرية</option>
              {districts.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              className={inputClass}
              value={filters.neighborhood}
              onChange={(event) => update("neighborhood", event.target.value)}
              aria-label="الحي"
            >
              <option value="">الحي</option>
              {neighborhoods.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <input
            className={`${inputClass} mt-2`}
            value={filters.manualLocation}
            onChange={(event) => update("manualLocation", event.target.value)}
            placeholder="الإدخال اليدوي الحر — اكتب الحي أو المكان"
          />
          <button
            className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold ${
              filters.nearMe
                ? "border-[var(--primary)] bg-[var(--primary-strong)] text-[var(--dark-text)]"
                : "border-[var(--line)] bg-[var(--primary-soft)] text-[var(--primary-text)]"
            }`}
            onClick={requestLocation}
            type="button"
          >
            <Icon name="pin" />
            {filters.nearMe ? "تم تحديد موقعي" : "بالقرب مني"}
          </button>
          {locationMessage && (
            <p
              className="mt-2 text-[10px] leading-5 text-[var(--text-muted)]"
              role="status"
            >
              {locationMessage}
            </p>
          )}
        </FilterSection>

        <FilterSection title="عملة العرض">
          <ChoiceGroup
            options={["ريال يمني", "ريال سعودي", "دولار أمريكي"]}
            value={filters.currency}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                currency: value,
                minPrice: "",
                maxPrice: "",
              }))
            }
          />
          <p className="mt-2 text-[9px] leading-5 text-[var(--text-muted)]">
            لا يتم تحويل العملات دون توفر سعر صرف موثوق؛ تظهر النتائج بعملتها
            الأصلية.
          </p>
        </FilterSection>

        <FilterSection
          title={`نطاق السعر — ${filters.currency || "العملة الأصلية"}`}
        >
          {filters.currency ? (
            <DualRangeSlider
              minValue={filters.minPrice}
              maxValue={filters.maxPrice}
              min={0}
              max={priceRange.max}
              step={priceRange.step}
              unit={priceRange.unit}
              onChange={(minValue, maxValue) =>
                setFilters((current) => ({
                  ...current,
                  minPrice: minValue,
                  maxPrice: maxValue,
                }))
              }
            />
          ) : (
            <p className="rounded-xl bg-[var(--surface-soft)] p-3 text-[10px] leading-5 text-[var(--text-muted)]">
              اختر عملة العرض أولاً لتحديد نطاق سعر دقيق دون خلط العملات.
            </p>
          )}
        </FilterSection>

        <section>
          <h2 className="mb-2 text-xs font-extrabold">نوع العقار</h2>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
            {propertyTypes.map((type) => (
              <button
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold ${
                  filters.propertyType === type
                    ? "border-[var(--primary)] bg-[var(--primary-strong)] text-[var(--dark-text)]"
                    : "border-[var(--line)] bg-[var(--surface-raised)] text-[var(--text)]"
                }`}
                key={type}
                onClick={() =>
                  update(
                    "propertyType",
                    context === "commercial" ||
                    context === "land" ||
                    context === "hotel" ||
                    context === "chalet"
                      ? type
                      : filters.propertyType === type
                        ? ""
                        : type,
                  )
                }
                aria-pressed={filters.propertyType === type}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {residential && (
          <>
            <FilterSection title="الغرض">
              <ChoiceGroup
                options={["للبيع", "للإيجار"]}
                value={filters.purpose}
                onChange={(value) => update("purpose", value)}
              />
            </FilterSection>
            <FilterSection title="طريقة الدفع">
              <ChoiceGroup
                options={["كاش", "تقسيط"]}
                value={filters.payment}
                onChange={(value) => update("payment", value)}
              />
            </FilterSection>
            <FilterSection title="التأثيث">
              <ChoiceGroup
                options={["مفروش", "غير مفروش"]}
                value={filters.furnishing}
                onChange={(value) => update("furnishing", value)}
              />
            </FilterSection>
            <FilterSection title="المساحات الداخلية — الحد الأدنى">
              <div className="space-y-2">
                <FilterCounter
                  label="غرف النوم"
                  value={filters.bedrooms}
                  onChange={(value) => update("bedrooms", value)}
                />
                <FilterCounter
                  label="الحمامات"
                  value={filters.bathrooms}
                  onChange={(value) => update("bathrooms", value)}
                />
                <FilterCounter
                  label="الصالات"
                  value={filters.halls}
                  onChange={(value) => update("halls", value)}
                />
                <FilterCounter
                  label="المطابخ"
                  value={filters.kitchens}
                  onChange={(value) => update("kitchens", value)}
                />
              </div>
            </FilterSection>
            <FilterSection title="عمر العقار">
              <ChoiceGroup
                options={["جديد", "أقل من 5 سنوات", "بناء قديم"]}
                value={filters.propertyAge}
                onChange={(value) => update("propertyAge", value)}
              />
            </FilterSection>
            <FilterSection title="الخدمات الأساسية">
              <CheckGroup
                options={[
                  "الكهرباء: حكومي / خط عام",
                  "الكهرباء: تجاري / مولدات",
                  "المياه: شبكة حكومية",
                  "المياه: بير ارتوازي",
                  "المياه: متوفر بانتظام",
                  "الصرف الصحي: شبكة حكومية",
                  "الصرف الصحي: بيارة خاصة",
                  "الاتصالات: خط تلفون",
                  "الاتصالات: إنترنت ألياف ضوئية Fiber",
                ]}
                values={filters.infrastructure}
                onChange={(value) => update("infrastructure", value)}
              />
            </FilterSection>
            <FilterSection title="المرافق">
              <CheckGroup
                options={[
                  "موقف سيارات",
                  "إنترنت",
                  "مسبح",
                  "مصعد",
                  "حديقة",
                  "تكييف مركزي",
                ]}
                values={filters.amenities}
                onChange={(value) => update("amenities", value)}
              />
            </FilterSection>
          </>
        )}

        {filters.propertyType === "أرض" && (
          <>
            <FilterSection title="الغرض">
              <ChoiceGroup
                options={["للبيع", "للإيجار", "استثمار"]}
                value={filters.purpose}
                onChange={(value) => update("purpose", value)}
              />
            </FilterSection>
            <FilterSection title="طريقة الدفع">
              <ChoiceGroup
                options={["كاش", "تقسيط"]}
                value={filters.payment}
                onChange={(value) => update("payment", value)}
              />
            </FilterSection>
            <FilterSection title="نوع الأرض">
              <ChoiceGroup
                options={["سكنية", "تجارية", "زراعية", "صناعية"]}
                value={filters.landType}
                onChange={(value) => update("landType", value)}
              />
            </FilterSection>
            <FilterSection title="المساحة م²">
              <DualRangeSlider
                minValue={filters.areaMin}
                maxValue={filters.areaMax}
                min={0}
                max={5000}
                step={50}
                unit="م²"
                onChange={(areaMin, areaMax) =>
                  setFilters((current) => ({
                    ...current,
                    areaMin,
                    areaMax,
                  }))
                }
              />
            </FilterSection>
            <FilterSection title="واجهة الأرض">
              <CheckGroup
                options={["شمالية", "جنوبية", "شرقية", "غربية", "زاوية/شارعين"]}
                values={filters.frontage}
                onChange={(value) => update("frontage", value)}
              />
            </FilterSection>
            <FilterSection title="عرض الشارع الرئيسي">
              <ChoiceGroup
                options={["10م", "12م", "20م+"]}
                value={filters.streetWidth}
                onChange={(value) => update("streetWidth", value)}
              />
            </FilterSection>
            <FilterSection title="توفر الخدمات">
              <CheckGroup
                options={["إسفلت", "كهرباء", "مياه", "صرف صحي"]}
                values={filters.amenities}
                onChange={(value) => update("amenities", value)}
              />
            </FilterSection>
          </>
        )}

        {filters.propertyType === "محلات" && (
          <>
            <FilterSection title="الغرض">
              <ChoiceGroup
                options={["للبيع", "للإيجار"]}
                value={filters.purpose}
                onChange={(value) => update("purpose", value)}
              />
            </FilterSection>
            <FilterSection title="طريقة الدفع">
              <ChoiceGroup
                options={["كاش", "تقسيط"]}
                value={filters.payment}
                onChange={(value) => update("payment", value)}
              />
            </FilterSection>
            <FilterSection title="نوع المحل">
              <ChoiceGroup
                options={[
                  "مكتب تجاري",
                  "معرض",
                  "مطعم/مقهى",
                  "صيدلية",
                  "مستودع",
                  "محل عام",
                ]}
                value={filters.commercialType}
                onChange={(value) => update("commercialType", value)}
              />
            </FilterSection>
            <FilterSection title="موقع المحل">
              <ChoiceGroup
                options={[
                  "داخل مول",
                  "داخل سوق تجاري",
                  "على الشارع العام",
                  "في حي سكني",
                ]}
                value={filters.shopLocation}
                onChange={(value) => update("shopLocation", value)}
              />
            </FilterSection>
            <FilterSection title="المساحة م²">
              <DualRangeSlider
                minValue={filters.areaMin}
                maxValue={filters.areaMax}
                min={0}
                max={5000}
                step={25}
                unit="م²"
                onChange={(areaMin, areaMax) =>
                  setFilters((current) => ({
                    ...current,
                    areaMin,
                    areaMax,
                  }))
                }
              />
            </FilterSection>
            <FilterSection title="حالة التشطيب">
              <ChoiceGroup
                options={["عظم", "تشطيب كامل", "يحتاج ديكور"]}
                value={filters.finishing}
                onChange={(value) => update("finishing", value)}
              />
            </FilterSection>
            <FilterSection title="المميزات والمرافق">
              <CheckGroup
                options={[
                  "واجهة زجاجية",
                  "عداد كهرباء مستقل",
                  "دورة مياه",
                  "مواقف للعملاء",
                  "كاميرات مراقبة",
                ]}
                values={filters.amenities}
                onChange={(value) => update("amenities", value)}
              />
            </FilterSection>
          </>
        )}

        {filters.propertyType === "فندق" && (
          <>
            <FilterSection title="الغرض">
              <p className="rounded-xl bg-[var(--primary-soft)] p-3 text-xs font-bold text-[var(--primary-text)]">
                حجز يومي / إقامات قصيرة
              </p>
            </FilterSection>
            <FilterSection title="التصنيف">
              <ChoiceGroup
                options={["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"]}
                value={
                  filters.starRating ? "⭐".repeat(filters.starRating) : ""
                }
                onChange={(value) => update("starRating", value.length)}
              />
            </FilterSection>
            <FilterSection title="النوع / الفئة">
              <ChoiceGroup
                options={[
                  "غرفة مفردة",
                  "غرفة مزدوجة",
                  "جناح عائلي",
                  "استراحة عامة",
                  "طيرمانة",
                  "صالة مؤتمرات",
                ]}
                value={filters.roomCategory}
                onChange={(value) => update("roomCategory", value)}
              />
            </FilterSection>
            <FilterSection title="عدد السراير في الغرفة">
              <FilterCounter
                label="عدد السراير"
                value={filters.bedCount}
                onChange={(value) => update("bedCount", value)}
              />
            </FilterSection>
            <FilterSection title="نوع السرير">
              <ChoiceGroup
                options={["عائلي مزدوج", "فردي"]}
                value={filters.bedType}
                onChange={(value) => update("bedType", value)}
              />
            </FilterSection>
            <FilterSection title="الخدمات الفندقية">
              <CheckGroup
                options={[
                  "إفطار مجاني",
                  "خدمة الغرف 24 ساعة",
                  "مسبح مشترك",
                  "نادي صحي",
                  "مواقف",
                  "استقبال 24 ساعة",
                  "واي فاي",
                  "مطعم",
                  "قاعة اجتماعات",
                ]}
                values={filters.amenities}
                onChange={(value) => update("amenities", value)}
              />
            </FilterSection>
          </>
        )}

        {filters.propertyType === "شاليه" && (
          <>
            <FilterSection title="الغرض">
              <p className="rounded-xl bg-[var(--primary-soft)] p-3 text-xs font-bold text-[var(--primary-text)]">
                حجز يومي / ترفيهي واستجمام
              </p>
            </FilterSection>
            <FilterSection title="السعة الاستيعابية">
              <FilterCounter
                label="العدد التقريبي للضيوف"
                value={filters.capacity}
                onChange={(value) => update("capacity", value)}
              />
            </FilterSection>
            <FilterSection title="المميزات الترفيهية">
              <CheckGroup
                options={[
                  "مسبح خاص",
                  "مسبح أطفال",
                  "مسطحات خضراء",
                  "جلسات خارجية",
                  "ألعاب إلكترونية",
                  "مكان للشواء",
                  "جاكوزي",
                ]}
                values={filters.amenities}
                onChange={(value) => update("amenities", value)}
              />
            </FilterSection>
            <FilterSection title="الخصوصية">
              <ChoiceGroup
                options={["سور مستقل مرتفع", "إطلالة بانورامية"]}
                value={filters.privacy}
                onChange={(value) => update("privacy", value)}
              />
            </FilterSection>
          </>
        )}
      </main>

      <footer className="relative z-50 shrink-0 border-t border-[var(--line)] bg-[var(--surface-raised)] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          className="min-h-12 w-full rounded-xl bg-[var(--primary-strong)] px-4 font-bold text-[var(--dark-text)] shadow-lg"
          onClick={onApply}
        >
          إظهار النتائج
        </button>
      </footer>
    </section>
  )
}

