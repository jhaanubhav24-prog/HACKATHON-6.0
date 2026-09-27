import { useEffect, useState } from 'react'

const MESSAGES = [
  '500+ hand-picked problems',
  'Live mentor-led classes',
  'Real interview-style contests',
  'A limited offer is live right now — check the tools icon',
]

export default function ImpactTicker() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mt-6 flex h-5 items-center justify-center gap-2 text-sm text-gray-400">
      <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-strike-green" />
      <span key={i} className="animate-tickerFade">
        {MESSAGES[i]}
      </span>
    </div>
  )
}
