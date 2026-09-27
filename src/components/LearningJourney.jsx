import { useRef, useState } from 'react'
import Highlight from './Highlight.jsx'
import GraphRider, { MotionGuide } from './GraphRider.jsx'
import { smoothPath } from '../lib/smoothPath.js'

// Two hand-authored lines on a 400x160 grid:
// "otherCourse" spikes and crashes to zero — no structure to bring the learner back up.
// "ourCourse" dips when a new topic first appears (confusion), recovers after a break/revise,
// dips again, then climbs — ending at the point where the learner actually buys in.
// otherCourse stays jagged on purpose: that spiky, structure-less shape IS the point being made.
// ourCourse is run through smoothPath so it reads as deliberate, not accidental.
const OTHER_COURSE = '0,100 55,40 110,130 165,55 220,140 275,95 330,145 400,145'
const OUR_COURSE = [
  [0, 90],
  [55, 120],
  [110, 58],
  [165, 88],
  [220, 48],
  [275, 72],
  [330, 35],
  [400, 15],
]

const MARKERS = [
  { x: 55, y: 120, label: 'New topic, first time — confusing', icon: '?' },
  { x: 220, y: 48, label: 'Comes back, revises, clicks', icon: '↺' },
  { x: 400, y: 15, label: 'Decides to actually buy in', icon: '✓', pulse: true },
]

// Rider moods line up with MARKERS above: calm start, confused at the first
// dip, the revise-loop, then the same "buy in" beat the ✓ marker lands on —
// that last zone is the one worth noticing from a sales angle, since it's
// the moment the CTA underneath leans on.
const JOURNEY_MOODS = [
  { at: 0, codePoint: '1f642', label: '🙂', caption: 'All good' },
  { at: 0.15, codePoint: '1f635', label: '😵', caption: 'Confused' },
  { at: 0.5, codePoint: '1f504', label: '🔄', caption: 'Revising' },
  { at: 0.85, codePoint: '2705', label: '✅', caption: 'Bought in' },
]

// Stable reference — see the matching note in MotivationGraph.jsx.
const GRAPH_VIEWBOX = { width: 400, height: 160 }

export default function LearningJourney({ onOpenSale }) {
  const pathRef = useRef(null)
  const [activeMarker, setActiveMarker] = useState(null)

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 text-center">
      <h2 className="font-display text-3xl text-white sm:text-4xl">This is what learning actually looks like</h2>
      <p className="mx-auto mt-4 max-w-2xl text-gray-400">
        Most course graphs only go up. Ours doesn't pretend to, because that's not how anyone
        actually learns something hard.
      </p>

      <div className="relative mt-10 rounded-xl border border-border bg-card p-6">
        <svg viewBox="0 0 400 160" className="h-52 w-full" preserveAspectRatio="none">
          <polyline points={OTHER_COURSE} fill="none" stroke="#3a3a3a" strokeWidth="2" strokeDasharray="6 5" />
          <path
            d={smoothPath(OUR_COURSE)}
            fill="none"
            stroke="#39ff88"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength="100"
            className="animate-drawLine"
          />
          <MotionGuide pathRef={pathRef} d={smoothPath(OUR_COURSE)} />
        </svg>

        <GraphRider pathRef={pathRef} viewBox={GRAPH_VIEWBOX} moods={JOURNEY_MOODS} duration={7500} />

        {MARKERS.map((m, i) => (
          <div
            key={m.label}
            onMouseEnter={() => setActiveMarker(i)}
            onMouseLeave={() => setActiveMarker((cur) => (cur === i ? null : cur))}
            onClick={() => setActiveMarker((cur) => (cur === i ? null : i))} // tap-to-reveal on touch devices
            className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center"
            style={{ left: `${(m.x / 400) * 100}%`, top: `${(m.y / 160) * 90 + 5}%` }}
          >
            <span
              className={`pointer-events-none absolute -top-9 left-1/2 w-max max-w-[11rem] -translate-x-1/2 whitespace-normal rounded-lg border border-strike-green/40 bg-base px-2.5 py-1 text-center text-[10px] font-medium leading-tight text-strike-green shadow-[0_0_12px_rgba(0,0,0,0.5)] transition-all duration-200 ${
                activeMarker === i ? 'opacity-100' : 'translate-y-1 opacity-0'
              }`}
            >
              {m.label}
            </span>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border border-strike-green bg-base text-xs text-strike-green transition-transform duration-200 ${
                m.pulse ? 'animate-markerPulse' : ''
              } ${activeMarker === i ? 'scale-125' : ''}`}
            >
              {m.icon}
            </span>
          </div>
        ))}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <span className="h-0.5 w-5 bg-strike-green" /> Our course
          </span>
          <span className="flex items-center gap-2">
            <span className="h-0.5 w-5 border-t-2 border-dashed border-[#3a3a3a]" /> A typical course
          </span>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-500">
        Every new topic feels hard the first time — <Highlight>you don't yet know why it works, so the graph dips</Highlight>.
        That's normal. <Highlight>Take a break, come back, revise it, and it climbs again.</Highlight> Most other
        courses spike once and quietly flatline at zero, because there's nothing built in to bring
        a learner back up.{' '}
        <Highlight>That back-and-forth is exactly what this platform is designed around.</Highlight>
      </p>

      {onOpenSale && (
        <button
          onClick={onOpenSale}
          className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-strike-green/40 bg-card px-5 py-2.5 text-sm text-strike-green transition hover:bg-strike-green hover:text-black"
        >
          ✅ That's the buy-in moment — see what's on offer right now →
        </button>
      )}

      <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-start sm:text-left">
        <MascotArt />
        <div>
          <p className="text-white">We're not going to say this makes everything 100% easy.</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Nobody can honestly promise that — no course covers every single thing you'll ever run
            into. What we promise instead is <Highlight>the approach</Highlight>: how to break a new
            problem down and actually work through it. So when something you've never seen shows up
            later, you're not stuck waiting for someone to explain it — you already know how to go
            figure it out. We're not trying to build rote learners here. <Highlight>We're building thinkers.</Highlight>
          </p>
        </div>
      </div>
    </section>
  )
}

function MascotArt() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="mx-auto shrink-0 animate-float">
      <circle cx="36" cy="30" r="18" fill="#141414" stroke="#39ff88" strokeWidth="2" />
      <g className="animate-blink">
        <circle cx="29" cy="28" r="2.2" fill="#39ff88" />
        <circle cx="43" cy="28" r="2.2" fill="#39ff88" />
      </g>
      <path d="M27 36c3 3 15 3 18 0" stroke="#39ff88" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 52c4-6 10-9 16-9s12 3 16 9" stroke="#2a2a2a" strokeWidth="2" fill="#111" />
      <path d="M50 20l8-6" stroke="#39ff88" strokeWidth="2" strokeLinecap="round" className="animate-float" />
    </svg>
  )
}
