import { useEffect, useState } from 'react'

const TERMINAL_LINES = [
  '$ strike --check-updates',
  'Connecting to build server...',
  'Found 1 patch: STRIKE_BOOST',
  'Applying patch... done.',
]

const COUPON = 'STRIKE40'

export default function SaleModal({
  open,
  onClose,
  expired,
  hours,
  minutes,
  seconds,
  redeemed,
  markRedeemed,
  isDemo,
  resetDemo,
  seatsClaimed,
  seatsTotal,
}) {
  const [linesShown, setLinesShown] = useState(0)
  const [copied, setCopied] = useState(false)
  const revealed = linesShown >= TERMINAL_LINES.length

  useEffect(() => {
    if (!open) {
      setLinesShown(0)
      setCopied(false)
      return
    }
    if (expired) return // no need to run the terminal animation for an expired offer
    if (linesShown >= TERMINAL_LINES.length) return
    const t = setTimeout(() => setLinesShown((n) => n + 1), 450)
    return () => clearTimeout(t)
  }, [open, linesShown, expired])

  if (!open) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON)
    } catch (e) {
      /* clipboard API unavailable — the code is still visible for the user to type manually */
    }
    setCopied(true)
    markRedeemed()
    setTimeout(() => setCopied(false), 2000)
  }

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 px-4 pt-28 backdrop-blur-sm sm:items-center sm:pt-0"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-panel shadow-glow"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="h-3 w-3 rounded-full bg-[#2a2a2a]" />
            <span className="h-3 w-3 rounded-full bg-[#2a2a2a]" />
            <span className="h-3 w-3 rounded-full bg-[#2a2a2a]" />
            <span className="ml-2 font-mono text-xs">strike-tools</span>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-white">
            ✕
          </button>
        </div>

        <div className="p-6">
          {expired ? (
            <ExpiredView />
          ) : !revealed ? (
            <div className="font-mono text-sm text-strike-green">
              {TERMINAL_LINES.slice(0, linesShown).map((line, i) => (
                <p key={i} className={i === linesShown - 1 ? 'blink-cursor' : ''}>
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-xs tracking-widest text-strike-green">PATCH UNLOCKED</p>
              <h3 className="font-display mt-2 text-2xl text-white">40% off DSA + Gen AI</h3>
              <p className="mt-2 text-sm text-gray-400">
                Applies to the DSA + Gen AI course. Use the code at checkout before it expires.
              </p>

              <div className="mt-5 flex items-center justify-between rounded-lg border border-dashed border-strike-green/50 bg-black/40 px-4 py-3">
                <span className="font-mono text-lg tracking-widest text-white">{COUPON}</span>
                <button
                  onClick={handleCopy}
                  className="rounded-md bg-strike-green px-3 py-1.5 text-xs font-medium text-black transition hover:bg-strike-green/80"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 font-mono text-sm text-gray-400">
                <span>Expires in</span>
                <span className="rounded bg-[#1a1a1a] px-2 py-1 text-white">{pad(hours)}h</span>
                <span className="rounded bg-[#1a1a1a] px-2 py-1 text-white">{pad(minutes)}m</span>
                <span className="rounded bg-[#1a1a1a] px-2 py-1 text-white">{pad(seconds)}s</span>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between font-mono text-[11px] text-gray-500">
                  <span>codes claimed today</span>
                  <span className="text-gray-400">
                    {seatsClaimed}/{seatsTotal}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#1a1a1a]">
                  <div
                    className="h-full rounded-full bg-strike-green transition-all duration-700"
                    style={{ width: `${Math.min(100, (seatsClaimed / seatsTotal) * 100)}%` }}
                  />
                </div>
              </div>

              {redeemed && (
                <p className="mt-3 text-center text-xs text-gray-500">
                  Code copied earlier in this session — still valid until the timer runs out.
                </p>
              )}

              {isDemo && <DemoControls onReset={resetDemo} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  function ExpiredView() {
    return (
      <div className="text-center">
        <p className="text-xs tracking-widest text-gray-500">PATCH EXPIRED</p>
        <h3 className="font-display mt-2 text-xl text-gray-300">This update is no longer available</h3>
        <div className="mt-4 flex items-center justify-center rounded-lg border border-dashed border-border bg-black/30 px-4 py-3">
          <span className="font-mono text-lg tracking-widest text-gray-600 line-through">STRIKE40</span>
        </div>
        <p className="mt-4 text-sm text-gray-500">Keep an eye on the tools icon — new patches roll out often.</p>
        {isDemo && <DemoControls onReset={resetDemo} />}
      </div>
    )
  }
}

// Only rendered when the page was opened with ?demoDuration=<seconds> — lets
// whoever is recording the submission video restart the compressed countdown
// for another take without touching a real visitor's saved 24h timer.
function DemoControls({ onReset }) {
  return (
    <div className="mt-5 flex items-center justify-center gap-2 border-t border-dashed border-border pt-4">
      <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600">demo mode</span>
      <button
        onClick={onReset}
        className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-gray-400 transition hover:border-strike-green/50 hover:text-strike-green"
      >
        restart countdown
      </button>
    </div>
  )
}
