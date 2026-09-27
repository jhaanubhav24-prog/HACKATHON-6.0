import { useEffect, useState } from 'react'

const STORAGE_KEY = 'strike_sale_v2'
const CLAIMS_KEY = 'strike_sale_claims_v1'
const DEFAULT_DURATION_MS = 24 * 60 * 60 * 1000 // 24 hours from first visit, for real visitors
const SEATS_TOTAL = 50 // how many STRIKE40 codes are "released" per day — purely a local, honest-feeling scarcity cue, not a real backend limit (see README)

// A real visitor never sees this — it only fires when the page is opened with
// ?demoDuration=<seconds> in the URL, e.g. ?demoDuration=45. It compresses the
// same countdown/persist/expire logic into a few seconds so the full flow
// (running countdown -> expiry -> "no longer redeemable") can be shown inside
// a short demo recording instead of waiting a real 24 hours.
function getDemoSeconds() {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const raw = params.get('demoDuration')
  const n = Number(raw)
  return raw && n > 0 ? n : null
}

function readTimerState(durationMs, storageKey) {
  try {
    const raw = localStorage.getItem(storageKey)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    /* corrupted or unavailable storage, fall through to a fresh state */
  }
  const fresh = { expiresAt: Date.now() + durationMs, redeemed: false }
  try {
    localStorage.setItem(storageKey, JSON.stringify(fresh))
  } catch (e) {
    /* storage unavailable, offer will still work for this tab session */
  }
  return fresh
}

// Seeds a stable "N of 50 claimed today" number from the calendar date, so it
// reads as a real daily count instead of a random number that changes on
// every reload. It only ever goes up (when *this* browser redeems), it never
// resets mid-session, and it rolls over to a fresh day naturally.
function readClaimsState() {
  const today = new Date().toISOString().slice(0, 10)
  try {
    const raw = localStorage.getItem(CLAIMS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.date === today) return parsed
    }
  } catch (e) {
    /* fall through to a fresh day */
  }
  let seed = 0
  for (const ch of today) seed = (seed * 31 + ch.charCodeAt(0)) % 1000
  const baseline = 18 + (seed % 15) // a believable 18–32 head start for the day
  const fresh = { date: today, count: baseline, claimedByMe: false }
  try {
    localStorage.setItem(CLAIMS_KEY, JSON.stringify(fresh))
  } catch (e) {
    /* non-fatal */
  }
  return fresh
}

export function useSaleTimer() {
  const demoSeconds = getDemoSeconds()
  const isDemo = Boolean(demoSeconds)
  const durationMs = isDemo ? demoSeconds * 1000 : DEFAULT_DURATION_MS
  // Demo runs use their own storage key so a `?demoDuration=` link shared for
  // review can never overwrite a real visitor's actual 24h saved countdown.
  const storageKey = isDemo ? `${STORAGE_KEY}_demo` : STORAGE_KEY

  const [state, setState] = useState(() => readTimerState(durationMs, storageKey))
  const [claims, setClaims] = useState(readClaimsState)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const msLeft = Math.max(0, state.expiresAt - now)
  const expired = msLeft <= 0

  const hours = Math.floor(msLeft / 3_600_000)
  const minutes = Math.floor((msLeft % 3_600_000) / 60_000)
  const seconds = Math.floor((msLeft % 60_000) / 1000)

  const markRedeemed = () => {
    if (!state.redeemed) {
      const next = { ...state, redeemed: true }
      setState(next)
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch (e) {
        /* non-fatal: redemption flag just won't persist across reloads */
      }
    }
    if (!claims.claimedByMe) {
      const nextClaims = { ...claims, count: Math.min(SEATS_TOTAL, claims.count + 1), claimedByMe: true }
      setClaims(nextClaims)
      try {
        localStorage.setItem(CLAIMS_KEY, JSON.stringify(nextClaims))
      } catch (e) {
        /* non-fatal */
      }
    }
  }

  // Only usable in ?demoDuration= mode — lets a re-take start the countdown
  // over instead of waiting for it to expire again.
  const resetDemo = () => {
    if (!isDemo) return
    const fresh = { expiresAt: Date.now() + durationMs, redeemed: false }
    setState(fresh)
    try {
      localStorage.setItem(storageKey, JSON.stringify(fresh))
    } catch (e) {
      /* non-fatal */
    }
  }

  return {
    expired,
    hours,
    minutes,
    seconds,
    redeemed: state.redeemed,
    markRedeemed,
    isDemo,
    resetDemo,
    seatsClaimed: claims.count,
    seatsTotal: SEATS_TOTAL,
  }
}
