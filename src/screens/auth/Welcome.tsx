import { BrandMini } from "../../components/BrandMini"
import { Illustration } from "../../components/Illustration"
import { PrimaryButton } from "../../components/PrimaryButton"

export function Welcome({
  partner,
  go,
}: {
  partner: boolean
  go: (screen: number) => void
}) {
  return (
    <section className="screen welcome-screen">
      <header className="topbar auth-topbar">
        <BrandMini />
      </header>
      <main className="welcome-main">
        <Illustration kind={partner ? "business" : "success"} />
        <div className="copy-block">
          <span className="success-pill">تم التفعيل بنجاح</span>
          <h1>{partner ? "أهلاً بك شريك النجاح!" : "تم تفعيل حسابك بنجاح!"}</h1>
          <p>
            {partner
              ? "ابدأ الآن بإضافة عقارك الأول، إدارة حجوزاتك، ومضاعفة أرباحك بكل سهولة."
              : "أنت جاهز الآن لاستكشاف أفضل العقارات والفنادق والشاليهات، وتواصل مباشرة مع المالك."}
          </p>
        </div>
      </main>
      <footer className="screen-footer">
        <PrimaryButton onClick={() => go(partner ? 24 : 12)}>
          {partner ? "وثق حسابك" : "ابدأ التصفح الآن"}
        </PrimaryButton>
        <p className="safe-note">
          <span>✓</span> تجربة آمنة وموثوقة مع مسكني
        </p>
      </footer>
    </section>
  )
}
