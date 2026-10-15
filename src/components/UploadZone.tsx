import { useState } from "react"
import { Icon } from "./Icon"

export function UploadZone({ label }: { label: string }) {
  const [fileMessage, setFileMessage] = useState("")

  return (
    <label className="upload-zone">
      <input
        type="file"
        accept="image/*,.pdf"
        required
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (!file) {
            setFileMessage("")
            return
          }
          if (file.size > 5 * 1024 * 1024) {
            event.target.value = ""
            setFileMessage("حجم الملف أكبر من 5MB")
            return
          }
          setFileMessage(`تم اختيار: ${file.name}`)
        }}
      />
      <span>
        <Icon name="upload" />
      </span>
      <strong>{label}</strong>
      <p>اسحب الملف هنا أو اضغط للاختيار</p>
      <small>{fileMessage || "PNG، JPG أو PDF — بحد أقصى 5MB"}</small>
    </label>
  )
}
