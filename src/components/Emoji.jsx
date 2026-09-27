import { useState } from 'react'

// codePoint: lowercase hex codepoint used by Twemoji's file names, e.g. '1f525' for 🔥
export default function Emoji({ codePoint, label, size = 20 }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span role="img" aria-label={label} style={{ fontSize: size }}>{label}</span>
  }

  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${codePoint}.png`}
      alt={label}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    />
  )
}
