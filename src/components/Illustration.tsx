export function Illustration({
  kind,
}: {
  kind: "welcome" | "search" | "key" | "success" | "business"
}) {
  if (kind === "welcome") {
    return (
      <div className="illustration" aria-hidden="true">
        <svg viewBox="0 0 260 210">
          <path className="soft-fill" d="M56 92 130 32l74 60v83H56Z" />
          <path className="line" d="M46 98 130 29l84 69M63 86v90h134V86" />
          <path className="accent-fill" d="M110 111h40v65h-40z" />
          <path
            className="line-thin"
            d="M77 111h22v25H77zM161 111h22v25h-22z"
          />
          <circle className="accent-line" cx="155" cy="139" r="4" />
          <path className="muted-line" d="M31 176h198" />
        </svg>
      </div>
    )
  }

  if (kind === "search") {
    return (
      <div className="illustration" aria-hidden="true">
        <svg viewBox="0 0 260 210">
          <path
            className="soft-fill"
            d="m38 55 57-18 69 23 58-19v125l-58 19-69-23-57 18Z"
          />
          <path
            className="line-thin"
            d="m95 37v125m69-102v125M46 104l41-13 35 13 35-11"
          />
          <path className="muted-line" d="m172 128 42-14" />
          <path
            className="accent-fill"
            d="M154 79c0-18 13-31 30-31s30 13 30 31c0 23-30 51-30 51s-30-28-30-51Z"
          />
          <circle className="cutout" cx="184" cy="78" r="10" />
          <circle className="accent-line" cx="80" cy="133" r="23" />
          <path className="accent-line" d="m63 150-15 15" />
        </svg>
      </div>
    )
  }

  if (kind === "key") {
    return (
      <div className="illustration" aria-hidden="true">
        <svg viewBox="0 0 260 210">
          <path className="soft-fill" d="M47 93 130 28l83 65v84H47Z" />
          <path className="line" d="M38 99 130 27l92 72M55 86v91h150V86" />
          <circle className="accent-line thick" cx="129" cy="110" r="25" />
          <path
            className="accent-line thick"
            d="m111 128-39 39m0 0H57m15 0v-14H58"
          />
          <path className="muted-line" d="M111 177h111" />
        </svg>
      </div>
    )
  }

  if (kind === "success") {
    return (
      <div className="illustration illustration--success" aria-hidden="true">
        <svg viewBox="0 0 260 210">
          <circle className="soft-fill" cx="130" cy="105" r="74" />
          <circle className="accent-fill" cx="130" cy="105" r="49" />
          <path className="check" d="m103 106 18 18 37-42" />
          <path
            className="muted-line"
            d="M67 47 56 36M190 53l14-14M57 153l-15 8M201 148l17 8"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="illustration" aria-hidden="true">
      <svg viewBox="0 0 260 210">
        <rect
          className="soft-fill"
          x="45"
          y="46"
          width="170"
          height="122"
          rx="12"
        />
        <path className="line" d="M45 76h170M78 168V98h45v70M140 108h44v60" />
        <path className="accent-fill" d="M61 57h10v10H61zM80 57h10v10H80z" />
        <path
          className="line-thin"
          d="M89 113h23M89 127h23M151 121h22M151 135h22"
        />
        <circle className="accent-fill" cx="193" cy="153" r="31" />
        <path className="check" d="m178 153 10 10 20-23" />
      </svg>
    </div>
  )
}
