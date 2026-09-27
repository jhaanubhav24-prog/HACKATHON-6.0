import { useEffect, useState } from 'react'
import Emoji from './Emoji.jsx'
import PurchaseThanksModal from './PurchaseThanksModal.jsx'

const PURCHASED_KEY = 'strike_purchased_courses_v1'
const SALE_COURSE_ID = 'dsa-genai' // the one course STRIKE40 actually applies to (matches SaleModal's copy)
const SALE_DISCOUNT = 0.4

const COURSES = [
  {
    id: 'thunder-100',
    title: 'Thunder: 100 Days of Code',
    description: 'Web Development + System Design + Security + DevOps',
    duration: '100 Days',
    price: 4999,
    gradient: 'linear-gradient(135deg, #1a1206 0%, #2a1c05 55%, #3a2404 100%)',
    accent: '#ffb020',
  },
  {
    id: 'devops-full',
    title: 'DevOps Full Course',
    description: 'Linux + CI/CD + Docker + Kubernetes + Terraform + Cloud',
    duration: '8 weeks',
    price: 3499,
    gradient: 'linear-gradient(135deg, #12160f 0%, #1c2a12 55%, #26401a 100%)',
    accent: '#39ff88',
  },
  {
    id: SALE_COURSE_ID,
    title: 'DSA + GenAI Combo',
    description: 'Complete tech stack with DSA and AI',
    duration: '4 months · 100+ Hours',
    price: 6999,
    popular: true,
    gradient: 'linear-gradient(135deg, #0f1613 0%, #10241c 55%, #0c3324 100%)',
    accent: '#39ff88',
  },
  {
    id: 'dsa-cpp',
    title: 'Data Structures & Algorithms',
    description: 'Master DSA with C++ from basics to advanced level',
    duration: '100+ Hours',
    price: 2999,
    gradient: 'linear-gradient(135deg, #141414 0%, #1c1c1c 55%, #232323 100%)',
    accent: '#e5e5e5',
  },
  {
    id: 'genai',
    title: 'Generative AI',
    description: 'Build autonomous AI agents from scratch',
    duration: '50+ Hours',
    price: 3999,
    gradient: 'linear-gradient(135deg, #12141a 0%, #171a2a 55%, #1c2140 100%)',
    accent: '#8ab4ff',
  },
]

function readPurchased() {
  try {
    const raw = localStorage.getItem(PURCHASED_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch (e) {
    return new Set()
  }
}

export default function CoursesPage({ onBack, onOpenSale, saleRedeemed, saleExpired }) {
  // Single source of truth for "who's purchased what" lives here and gets
  // handed down to each card, rather than every card reading its own slice
  // of localStorage — one read on mount, one write per purchase.
  const [purchased, setPurchased] = useState(() => new Set())
  // Which course to celebrate in the shared "thanks" popup — null when
  // nothing's showing. One modal instance here covers every card, instead
  // of each card owning its own.
  const [thanksFor, setThanksFor] = useState(null)

  useEffect(() => {
    setPurchased(readPurchased())
  }, [])

  const handlePurchase = (course) => {
    setPurchased((prev) => {
      const next = new Set(prev)
      next.add(course.id)
      try {
        localStorage.setItem(PURCHASED_KEY, JSON.stringify([...next]))
      } catch (e) {
        /* non-fatal: purchase just won't persist across reloads */
      }
      return next
    })
    setThanksFor(course.title)
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 text-center">
      <p className="font-mono text-xs tracking-widest text-strike-green">★ COURSES</p>
      <h2 className="font-display mt-2 text-3xl text-white sm:text-4xl">Pick a fight worth finishing</h2>
      <p className="mx-auto mt-3 max-w-xl text-gray-400">
        Every course here is live and mentor-reviewed. No filler modules — just the stuff people
        are actually working through right now.
      </p>

      <div className="mt-10 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((c) => (
          <CourseCard
            key={c.id}
            course={c}
            purchased={purchased.has(c.id)}
            onPurchase={() => handlePurchase(c)}
            onOpenSale={onOpenSale}
            saleActive={c.id === SALE_COURSE_ID && !saleExpired}
            saleApplied={c.id === SALE_COURSE_ID && saleRedeemed && !saleExpired}
          />
        ))}
      </div>

      <button
        onClick={onBack}
        className="mt-10 rounded-full border border-border bg-[#1a1a1a] px-6 py-2.5 text-sm text-white transition hover:bg-[#222]"
      >
        Back to Home
      </button>

      <PurchaseThanksModal open={thanksFor !== null} onClose={() => setThanksFor(null)} courseName={thanksFor} />
    </section>
  )
}

function CourseCard({ course, purchased, onPurchase, onOpenSale, saleActive, saleApplied }) {
  // "buying" gives the button a brief, honest-feeling pause before flipping
  // to the confirmed state — long enough to register as an action, short
  // enough to never feel like a fake spinner.
  const [buying, setBuying] = useState(false)

  const finalPrice = saleApplied ? Math.round(course.price * (1 - SALE_DISCOUNT)) : course.price

  const handleClick = () => {
    if (purchased || buying) return
    setBuying(true)
    setTimeout(() => {
      setBuying(false)
      onPurchase()
    }, 700)
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-card transition ${
        purchased ? 'border-strike-green/50' : 'border-border hover:border-strike-green/40'
      }`}
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden px-4" style={{ background: course.gradient }}>
        {/* faint code-noise texture behind the title, matching the real cards' busier backgrounds */}
        <p className="pointer-events-none absolute inset-0 select-none overflow-hidden whitespace-pre-wrap break-all p-2 font-mono text-[9px] leading-tight text-white/[0.05]">
          {'getAttribute id className useState useEffect const fn return props state '.repeat(6)}
        </p>
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#ff5f56] px-2.5 py-1 text-[10px] font-semibold text-black">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black/70" /> LIVE
        </span>
        {course.popular && !purchased && (
          <span className="absolute right-3 top-3 rounded-full bg-yellow-400 px-2.5 py-1 text-[10px] font-semibold text-black">
            ★ POPULAR
          </span>
        )}
        {purchased && (
          <span className="animate-flipIn absolute right-3 top-3 flex items-center gap-1 rounded-full bg-strike-green px-2.5 py-1 text-[10px] font-semibold text-black">
            ✓ PURCHASED
          </span>
        )}
        <p
          className="relative font-display text-center text-xl leading-tight sm:text-2xl"
          style={{ color: course.accent }}
        >
          {course.title}
        </p>
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-400">{course.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full border border-border px-2.5 py-1 text-xs text-gray-500">
            {course.duration}
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-gray-500">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
              <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
            </svg>
          </span>
        </div>

        {saleActive && !purchased && (
          <button
            onClick={() => onOpenSale?.()}
            className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-strike-green underline decoration-dashed underline-offset-4 transition hover:text-white"
          >
            {saleApplied ? '✓ STRIKE40 applied' : '⚡ STRIKE40 gets you 40% off this one →'}
          </button>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            {saleApplied ? (
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold text-strike-green">₹{finalPrice.toLocaleString('en-IN')}</span>
                <span className="text-xs text-gray-600 line-through">₹{course.price.toLocaleString('en-IN')}</span>
              </div>
            ) : (
              <span className="text-lg font-semibold text-white">₹{course.price.toLocaleString('en-IN')}</span>
            )}
          </div>

          <button
            onClick={handleClick}
            disabled={purchased || buying}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              purchased
                ? 'cursor-default bg-strike-greendim/30 text-strike-green'
                : buying
                  ? 'cursor-wait bg-strike-greendim/40 text-strike-green'
                  : 'bg-strike-green text-black hover:opacity-90'
            }`}
          >
            {purchased ? (
              <span className="flex items-center gap-1">
                <Emoji codePoint="2705" label="✅" size={13} /> Purchased
              </span>
            ) : buying ? (
              'Processing…'
            ) : (
              'Purchase'
            )}
          </button>
        </div>

        <p
          className={`overflow-hidden text-xs text-gray-600 transition-all duration-300 ${
            purchased ? 'mt-3 max-h-8 opacity-100' : 'mt-0 max-h-0 opacity-0'
          }`}
        >
          You're in — this is a demo purchase, saved locally in this browser only.
        </p>

        <p className="mt-3 text-sm font-medium text-strike-green">Explore Course →</p>
      </div>
    </div>
  )
}
