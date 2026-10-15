import { useState, useEffect } from "react"
import { BrandMini } from "../../components/BrandMini"
import { Icon } from "../../components/Icon"
import { PrimaryButton } from "../../components/PrimaryButton"
import { Toast } from "../../components/Toast"

export function Otp({
  go,
  isPartner,
}: {
  go: (screen: number) => void
  isPartner: boolean
}) {
  const [showToast, setShowToast] = useState(false)
  const [digits, setDigits] = useState(["", "", "", ""])
  const [seconds, setSeconds] = useState(42)

  useEffect(() => {
    if (seconds <= 0) return
    const timer = window.setTimeout(
      () => setSeconds((current) => current - 1),
      1000,
    )
    return () => window.clearTimeout(timer)
  }, [seconds])

  const resendCode = () => {
    if (seconds > 0) return
    setDigits(["", "", "", ""])
    setSeconds(42)
    setShowToast(true)
    window.setTimeout(() => setShowToast(false), 3200)
  }

  return (
    <section className="screen">
      <header className="topbar auth-topbar">
        <BrandMini />
      </header>
      <main className="otp-main">
        <div className="otp-symbol">
          <Icon name="mail" />
          <span>✓</span>
        </div>
        <div className="auth-heading centered">
          <span className="eyebrow">تأكيد الهوية</span>
          <h1>رمز التحقق</h1>
          <p>تم إرسال رمز التحقق إلى رقم هاتفك أو بريدك الإلكتروني</p>
          <b>m••••@mail.com</b>
        </div>
        <div className="otp-inputs" dir="ltr">
          {digits.map((digit, index) => (
            <input
              key={index}
              value={digit}
              onChange={(event) => {
                const value = event.target.value.replace(/\D/g, "").slice(-1)
                setDigits((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? value : item,
                  ),
                )
                if (value) {
                  const nextInput =
                    event.currentTarget.parentElement?.querySelectorAll(
                      "input",
                    )[index + 1]
                  nextInput?.focus()
                }
              }}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              aria-label={`الرقم ${index + 1}`}
            />
          ))}
        </div>
        <p className="resend">
          يمكنك إعادة الإرسال خلال{" "}
          <strong dir="ltr">00:{String(seconds).padStart(2, "0")}</strong>
        </p>
        <button
          className="link-button"
          onClick={resendCode}
          disabled={seconds > 0}
        >
          إعادة إرسال الرمز
        </button>
      </main>
      <footer className="screen-footer">
        <PrimaryButton
          onClick={() => go(isPartner ? 11 : 10)}
          disabled={digits.some((digit) => !digit)}
        >
          تحقق وتأكيد
        </PrimaryButton>
      </footer>
      {showToast && (
        <Toast
          title="تم الإرسال بنجاح"
          message="تم إرسال رمز التحقق بنجاح إلى هاتفك"
          onClose={() => setShowToast(false)}
        />
      )}
    </section>
  )
}
