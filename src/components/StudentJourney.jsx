import { useState } from 'react'

const STAGES = [
  {
    id: 'confused',
    label: 'Before',
    quote: '"Wait... why does this even work?"',
    body: 'Stuck on the same bug for an hour. Copy-pasting fixes from three different tabs, not sure which one actually mattered, or why.',
  },
  {
    id: 'course',
    label: 'Takes a course',
    quote: 'Actually works through it — not skimming it',
    body: 'Gets stuck on purpose, in a place built to get them unstuck. Small tasks, real feedback, one topic at a time.',
  },
  {
    id: 'solver',
    label: 'After',
    quote: '"Oh — I can just try this myself."',
    body: "Sees a new, unfamiliar problem and breaks it down without waiting for someone to hand over the answer.",
  },
]

export default function StudentJourney() {
  const [stage, setStage] = useState(0)
  const current = STAGES[stage]
  const atEnd = stage === STAGES.length - 1

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
      <h2 className="font-display text-3xl text-white sm:text-4xl">One student, two versions</h2>
      <p className="mx-auto mt-4 max-w-2xl text-gray-400">Same person, same brain. Watch what actually changes.</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setStage(i)}
            className={`rounded-full border px-4 py-2 font-mono text-xs transition ${
              i === stage
                ? 'border-strike-green bg-strike-green/10 text-white'
                : 'border-border text-gray-500 hover:text-white'
            }`}
          >
            {i + 1}. {s.label}
          </button>
        ))}
      </div>

      <div
        key={current.id}
        className="animate-flipIn mx-auto mt-8 flex max-w-xl flex-col items-center gap-6 rounded-xl border border-border bg-card p-8 text-left sm:flex-row sm:items-start"
      >
        <StudentMascot stage={current.id} />
        <div>
          <p className="text-lg text-white">{current.quote}</p>
          <p className="mt-2 text-sm text-gray-500">{current.body}</p>
        </div>
      </div>

      <button
        onClick={() => setStage((s) => (s + 1) % STAGES.length)}
        className="mt-6 rounded-full bg-strike-green px-6 py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
      >
        {atEnd ? 'Watch it again from the start ↺' : 'See what happens next →'}
      </button>
    </section>
  )
}

function StudentMascot({ stage }) {
  return (
    <svg width="88" height="88" viewBox="0 0 96 96" fill="none" className="mx-auto shrink-0">
      {stage === 'confused' && (
        <>
          <circle cx="48" cy="40" r="24" fill="#141414" stroke="#39ff88" strokeWidth="2" />
          <circle cx="39" cy="37" r="3" fill="#39ff88" />
          <circle cx="57" cy="37" r="3" fill="#39ff88" />
          <path d="M37 51c4-3 18-3 22 0" stroke="#39ff88" strokeWidth="2.2" strokeLinecap="round" />
          <text x="64" y="18" fontSize="18" fill="#39ff88" className="animate-wiggle">
            ?
          </text>
          <text x="14" y="30" fontSize="13" fill="#39ff88" opacity="0.55" className="animate-float">
            ?
          </text>
        </>
      )}

      {stage === 'course' && (
        <>
          <circle cx="48" cy="40" r="24" fill="#141414" stroke="#39ff88" strokeWidth="2" />
          <circle cx="39" cy="37" r="3" fill="#39ff88" />
          <circle cx="57" cy="37" r="3" fill="#39ff88" />
          <path d="M39 50c3 2 15 2 18 0" stroke="#39ff88" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="28" y="60" width="40" height="11" rx="2" fill="#111" stroke="#39ff88" strokeWidth="1.5" className="animate-float" />
          <rect x="34" y="64" width="10" height="3" rx="1" fill="#39ff88" opacity="0.7" />
          <rect x="48" y="64" width="14" height="3" rx="1" fill="#39ff88" opacity="0.4" />
        </>
      )}

      {stage === 'solver' && (
        <>
          <circle cx="48" cy="40" r="24" fill="#141414" stroke="#39ff88" strokeWidth="2" />
          <path d="M35 36l7 4-7 4" stroke="#39ff88" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M61 36l-7 4 7 4" stroke="#39ff88" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 49c5 6 19 6 24 0" stroke="#39ff88" strokeWidth="2.4" strokeLinecap="round" />
          <g className="animate-float">
            <circle cx="72" cy="16" r="6" stroke="#39ff88" strokeWidth="2" fill="none" />
            <path d="M72 22v3M69 27h6" stroke="#39ff88" strokeWidth="2" strokeLinecap="round" />
          </g>
        </>
      )}

      <path d="M26 66c5-8 13-12 22-12s17 4 22 12" stroke="#2a2a2a" strokeWidth="2" fill="#111" />
    </svg>
  )
}
