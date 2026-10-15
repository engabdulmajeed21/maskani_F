import { BrandMini } from "../components/BrandMini"

export const flowScreens = [
  "البداية",
  "الترحيب",
  "البحث الذكي",
  "الحجز بثقة",
  "تسجيل الدخول",
  "إنشاء حساب",
  "رمز التحقق",
  "استعادة كلمة المرور",
  "كلمة المرور المؤقتة",
  "كلمة مرور جديدة",
  "ترحيب المستخدم",
  "ترحيب الشركاء",
  "الرئيسية",
  "حسابي",
  "المنازل والشقق",
  "الإشعارات",
  "تصفية البحث",
  "المساعد الذكي",
  "تعطيل الحساب",
  "حذف الحساب",
  "الاقتراحات",
  "حول المنصة",
  "نتائج البحث",
  "تعديل الملف الشخصي",
  "توثيق الحساب",
  "قائمة المتابعة",
  "انضم كشريك",
  "إدارة وأمان الحساب",
  "اللغة",
  "طلباتي",
  "الملف الشخصي",
  "إعدادات الإشعارات",
  "المساعدة والتواصل",
  "الشروط والأحكام",
  "رفع طلب عقار جديد",
  "الرسائل",
  "المحادثة",
  "المفضلة",
  "تفاصيل العقار",
  "قيد التطوير",
  "الملف الشخصي للمالك",
  "المحلات التجارية",
  "الأراضي",
  "الفنادق",
  "الشاليهات",
  "العروض المميزة",
]

interface FlowNavigationSidebarProps {
  currentScreen: number
  onNavigate: (screenIndex: number) => void
}

export function FlowNavigationSidebar({
  currentScreen,
  onNavigate,
}: FlowNavigationSidebarProps) {
  return (
    <aside className="flow-nav">
      <div className="flow-brand">
        <BrandMini />
        <p>تدفق الدخول والتسجيل</p>
      </div>
      <nav aria-label="شاشات التطبيق">
        {flowScreens.map((name, index) => (
          <button
            key={name}
            className={currentScreen === index ? "active" : ""}
            onClick={() => onNavigate(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {name}
          </button>
        ))}
      </nav>
      <div className="flow-meta">
        <span>Maskani mobile</span>
        <span>RTL · {flowScreens.length} screens</span>
      </div>
    </aside>
  )
}
