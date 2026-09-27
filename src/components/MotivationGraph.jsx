import { useRef, useState } from 'react'
import Emoji from './Emoji.jsx'
import ProcrastinationCard from './ProcrastinationCard.jsx'
import GraphRider, { MotionGuide } from './GraphRider.jsx'
import { smoothPath } from '../lib/smoothPath.js'

// 600x200 grid. Junoon at the start, a slow "dhila-dhila" loosening, then
// the tail turns dashed once focus actually breaks apart.
const DECLINE_POINTS = [
  [0, 140],
  [100, 35],
  [220, 55],
  [340, 90],
  [460, 125],
  [600, 155],
]
const DECLINE_FOCUSED = DECLINE_POINTS.slice(0, 4) // solid, while it's still real effort
const DECLINE_DRIFT = DECLINE_POINTS.slice(3) // dashed, once it turns into drifting

const DECLINE_MARKERS = [
  { x: 0, y: 140, codePoint: '1f525', label: '🔥' },
  { x: 220, y: 55, codePoint: '2753', label: '❓' },
  { x: 460, y: 125, codePoint: '1f300', label: '🌀' },
]

const DECLINE_CAPTIONS = [
  { icon: '1f525', label: '🔥', title: 'It starts with junoon', text: 'The first few sessions feel great. Real excitement, not forced.' },
  {
    icon: '2753',
    label: '❓',
    title: 'Reading, not thinking',
    text: "Maybe the topic was never the real problem. Maybe you were reading through it, not stopping to ask why it actually works.",
  },
  {
    icon: '1f300',
    label: '🌀',
    title: 'Then it drifts',
    text: 'Most people do not quit loudly. They just drift — another tab, another course, "I will restart on Monday."',
  },
]

// Interest gets sparked early and a hard topic gets slowed down and reframed
// instead of left to fade on its own. No comparison to anyone else here —
// just what actually happens.
const STRIKE_POINTS = [
  [0, 150],
  [90, 75],
  [200, 105],
  [320, 55],
  [440, 25],
  [600, 15],
]

// Mood zones for each rider: `at` is progress along the curve (0 = start,
// 1 = end), so the expression change lines up with where the line actually
// is — junoon at the start, the question mark around the same spot the 🤔
// marker sits, tired/drifting once the line has gone dashed.
const DECLINE_MOODS = [
  { at: 0, codePoint: '1f525', label: '🔥', caption: 'Pure junoon' },
  { at: 0.3, codePoint: '1f914', label: '🤔', caption: 'Wait, why though?' },
  { at: 0.6, codePoint: '1f629', label: '😩', caption: 'Getting tired' },
  { at: 0.85, codePoint: '1f300', label: '🌀', caption: 'Drifting off' },
]

// Mirror of the decline moods but climbing instead of drifting — same rider
// mechanic, used on the "what we do about it" recovery line further down.
const RECOVERY_MOODS = [
  { at: 0, codePoint: '1f642', label: '🙂', caption: 'Calm start' },
  { at: 0.35, codePoint: '1f4a1', label: '💡', caption: 'Re-framed' },
  { at: 0.7, codePoint: '1f4aa', label: '💪', caption: 'Pushing through' },
  { at: 0.92, codePoint: '1f680', label: '🚀', caption: 'Locked in' },
]

// Both graphs on this page share a 600x200 grid — one stable object,
// reused, instead of a `{ width: 600, height: 200 }` literal written inline
// at each call site (which would get a new identity every re-render).
const GRAPH_VIEWBOX = { width: 600, height: 200 }

export default function MotivationGraph({ onOpenSale }) {
  const [surpriseOpen, setSurpriseOpen] = useState(false)
  const [activeMarker, setActiveMarker] = useState(null)
  const declinePathRef = useRef(null)
  const recoveryPathRef = useRef(null)

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 text-center">
      <h2 className="font-display text-3xl text-white sm:text-4xl">
        The most normal thing that happens
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-gray-400">
        Starting full of motivation, and not finishing. Not always because the topic was too
        hard — sometimes it's simpler than that.
      </p>

      <div className="relative mt-10 rounded-xl border border-border bg-card p-6">
        <svg viewBox="0 0 600 200" className="h-52 w-full">
          <path d={smoothPath(DECLINE_FOCUSED)} fill="none" stroke="#39ff88" strokeWidth="2.5" strokeLinecap="round" />
          <path
            d={smoothPath(DECLINE_DRIFT)}
            fill="none"
            stroke="#39ff88"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="7 7"
            opacity="0.65"
          />
          {/* geometry-only guide spanning the full curve, for the rider below to walk */}
          <MotionGuide pathRef={declinePathRef} d={smoothPath(DECLINE_POINTS)} />
        </svg>

        <GraphRider pathRef={declinePathRef} viewBox={GRAPH_VIEWBOX} moods={DECLINE_MOODS} duration={8000} />

        {DECLINE_MARKERS.map((m, i) => (
          <div
            key={i}
            onMouseEnter={() => setActiveMarker(i)}
            onMouseLeave={() => setActiveMarker((cur) => (cur === i ? null : cur))}
            onClick={() => setActiveMarker((cur) => (cur === i ? null : i))} // tap-to-reveal on touch devices
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${(m.x / 600) * 100}%`, top: `${(m.y / 200) * 90 + 5}%` }}
          >
            <span
              className={`pointer-events-none absolute -top-9 left-1/2 w-max max-w-[11rem] -translate-x-1/2 whitespace-normal rounded-lg border border-strike-green/40 bg-base px-2.5 py-1 text-center text-[10px] font-medium leading-tight text-strike-green shadow-[0_0_12px_rgba(0,0,0,0.5)] transition-all duration-200 ${
                activeMarker === i ? 'opacity-100' : 'translate-y-1 opacity-0'
              }`}
            >
              {DECLINE_CAPTIONS[i]?.title}
            </span>
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border border-strike-green bg-base transition-transform duration-200 animate-float ${
                activeMarker === i ? 'scale-125' : ''
              }`}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <Emoji codePoint={m.codePoint} label={m.label} size={16} />
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 text-left sm:grid-cols-3">
        {DECLINE_CAPTIONS.map((c, i) => (
          <div key={i} className="rounded-xl border border-border border-l-4 border-l-strike-green bg-card p-5">
            <div className="flex items-center gap-2">
              <Emoji codePoint={c.icon} label={c.label} size={18} />
              <h3 className="text-sm font-semibold text-white">{c.title}</h3>
            </div>
            <p className="mt-2 text-sm text-gray-500">{c.text}</p>
          </div>
        ))}
      </div>

      <ProcrastinationCard />

      <TerminalExplainer />

      <div className="mx-auto mt-16 max-w-3xl">
        <h2 className="font-display text-2xl text-white sm:text-3xl">What we actually do about it</h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Interest gets sparked early, and we do not let it fade quietly. When a topic gets
          genuinely hard, we slow down, reframe it, and get you unstuck before you drift.
        </p>

        <div className="relative mt-8 rounded-xl border border-strike-green/30 bg-card p-6 text-left">
          <svg viewBox="0 0 600 200" className="h-40 w-full">
            <path
              d={smoothPath(STRIKE_POINTS)}
              fill="none"
              stroke="#39ff88"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength="100"
              className="animate-drawLine"
            />
            <MotionGuide pathRef={recoveryPathRef} d={smoothPath(STRIKE_POINTS)} />
          </svg>
          <GraphRider
            pathRef={recoveryPathRef}
            viewBox={GRAPH_VIEWBOX}
            moods={RECOVERY_MOODS}
            duration={7000}
          />
          <p className="mt-4 text-sm text-gray-500">
            The dip at the hard topic is still there — we are not pretending it disappears. What
            changes is what happens right after it: a shorter explanation, a smaller task, and a
            reason to keep going instead of drifting off.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-xl rounded-xl border border-strike-green/30 bg-card p-6">
        <p className="text-white">Curious what happens if something actually catches that spike this time?</p>
        <button
          onClick={onOpenSale}
          className="mt-4 rounded-full bg-strike-green px-6 py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
        >
          Open the toolbox →
        </button>
        <p className="mt-3 text-xs text-gray-600">
          Hint: there is a wrench icon floating on this page too. It is not just decoration.
        </p>
      </div>

      <SurpriseCard open={surpriseOpen} setOpen={setSurpriseOpen} onOpenSale={onOpenSale} />
    </section>
  )
}

function TerminalExplainer() {
  return (
    <div className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-xl border border-border bg-[#0d0d0d] text-left">
      <div className="flex items-center gap-1.5 border-b border-border bg-[#141414] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs text-gray-500">why-students-stop.sh</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-gray-400 sm:text-sm">
        <span className="text-strike-green">$</span> why-students-stop.sh{'\n'}
        {'  '}issue: confusion at a new topic looks like a dead end{'\n'}
        {'  '}root cause: no retry path, no different angle offered{'\n'}
        {'  '}fix: re-serve the topic with a shorter explanation + a smaller task{'\n'}
        {'  '}status: <span className="text-strike-green">resolved</span> — motivation recovers, topic sticks
      </pre>
    </div>
  )
}

function SurpriseCard({ open, setOpen, onOpenSale }) {
  return (
    <div className="mx-auto mt-8 max-w-sm">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="mx-auto flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm text-gray-300 transition hover:border-strike-green/50 hover:text-white"
        >
          <span className="animate-wiggle"><Emoji codePoint="1f381" label="🎁" size={18} /></span>
          I have a surprise for you
        </button>
      ) : (
        <div className="animate-flipIn flex items-start gap-3 rounded-xl border border-strike-green/30 bg-card p-6 text-left">
          <SurpriseMascot />
          <div>
            <p className="text-white">
              Hey — do you know what this is? <Emoji codePoint="1f9e0" label="🧠" size={18} />
            </p>
            <p className="mt-2 text-sm text-gray-500">
              It is exactly what it looks like: a real offer for people who read this far. No
              spin, just a coupon code, a timer, and something worth coming back for.
            </p>
            <button
              onClick={onOpenSale}
              className="mt-4 rounded-full border border-strike-green px-5 py-2 text-xs font-semibold text-strike-green transition hover:bg-strike-green hover:text-black"
            >
              Show me →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function SurpriseMascot() {
  return (
    <svg width="48" height="48" viewBox="0 0 72 72" fill="none" className="shrink-0 animate-float">
      <circle cx="36" cy="30" r="18" fill="#141414" stroke="#39ff88" strokeWidth="2" />
      <g className="animate-blink">
        <circle cx="29" cy="28" r="2.2" fill="#39ff88" />
        <circle cx="43" cy="28" r="2.2" fill="#39ff88" />
      </g>
      <path d="M27 36c3 3 15 3 18 0" stroke="#39ff88" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 52c4-6 10-9 16-9s12 3 16 9" stroke="#2a2a2a" strokeWidth="2" fill="#111" />
    </svg>
  )
}
