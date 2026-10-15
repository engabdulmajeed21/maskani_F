import { useState } from "react"
import { Icon } from "./Icon"
import { SuccessBanner } from "./SuccessBanner"
import { offers } from "../data/offers"

export function OffersFeed() {
  const [usedCode, setUsedCode] = useState("")

  return (
    <div className="offers-content offers-tab-content">
      {usedCode && (
        <SuccessBanner>تم تفعيل الكود {usedCode} بنجاح</SuccessBanner>
      )}
      <p className="offers-lead">عروض مختارة تجعل تجربتك أجمل وأوفر</p>
      <div className="offers-list">
        {offers.map((offer) => (
          <article className="offer-card" key={offer.code}>
            <div className={`offer-banner ${offer.className}`}>
              <Icon name={offer.icon} />
              <span>عرض حصري</span>
              <i />
            </div>
            <div className="offer-copy">
              <h2>{offer.title}</h2>
              <p>{offer.text}</p>
              <div>
                <code>{offer.code}</code>
                <button onClick={() => setUsedCode(offer.code)}>
                  استخدم الكود
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

