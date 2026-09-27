import { useState } from 'react'

// Same "reference photo" style you shared (a friendly explorer character) isn't something
// this build can pull from a CDN or generate as a raster image — there's no image-generation
// or asset pipeline wired into this Vite project. Instead these are drawn in the exact same
// hand-coded SVG mascot language the rest of the site already uses (see MascotArt /
// SurpriseMascot in LearningJourney.jsx and MotivationGraph.jsx): a plain circle head, two dot
// eyes, one mouth path. Same character "family," just given a different accessory + expression
// per persona, so it reads as one consistent cast instead of a random mash-up of art styles.

const PERSONAS = [
  {
    id: 'repeater',
    label: 'Copies the steps',
    tag: 'AI takes this',
    tone: 'risk',
    title: 'Follows a tutorial exactly, never asks why it works',
    body: 'Same steps, same order, every single time, on autopilot — no detour, no "wait, why does this line matter?" That is exactly the kind of task a model has already seen a million times over.',
    verdict: 'AI can already do this part of a job.',
  },
  {
    id: 'curious',
    label: 'Asks "why does this work?"',
    tag: "AI can't take this",
    tone: 'safe',
    title: 'Gets stuck, reframes the problem, tries a different angle',
    body: "Doesn't stop at the first working answer — pokes at it, breaks it on purpose, asks a better question next time it's stuck. That loop is the part that doesn't get automated away.",
    verdict: "AI can't replace this — it IS the judgment a job actually needs.",
  },
  {
    id: 'builder',
    label: 'Builds real, messy things',
    tag: "AI can't take this",
    tone: 'safe',
    title: 'Ships a whole project, owns the weird edge cases nobody warned about',
    body: 'A model can write a function you already know you need. It can\'t decide which ten functions are worth writing for a problem nobody defined for you ahead of time.',
    verdict: "AI can't replace this — at best, it can only assist it.",
  },
]

export default function AIJobsSection() {
  const [activeId, setActiveId] = useState(PERSONAS[1].id)
  const persona = PERSONAS.find((p) => p.id === activeId)
  const aiMood = persona.tone === 'risk' ? 'hungry' : 'calm'
  const safe = persona.tone === 'safe'

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 text-center">
      <div className="flex items-center justify-center gap-3">
        <h2 className="font-display text-3xl text-white sm:text-4xl">Will AI take your job?</h2>
        <AIRobotMascot mood={aiMood} />
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-gray-400">
        Depends which one of these you actually are on a normal day. Pick one — honestly, not
        the flattering answer.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeId === p.id
                ? 'border-strike-green bg-strike-green/10 text-white'
                : 'border-border text-gray-400 hover:border-strike-green/40 hover:text-white'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div
        key={persona.id}
        className="animate-flipIn mx-auto mt-8 flex max-w-2xl flex-col items-center gap-5 rounded-xl border border-border bg-card p-6 text-left sm:flex-row sm:items-start sm:p-8"
      >
        <PersonaMascot variant={persona.id} />
        <div>
          <span
            className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${
              safe ? 'border-strike-green/40 text-strike-green' : 'border-[#ff5f56]/40 text-[#ff9a91]'
            }`}
          >
            {persona.tag}
          </span>
          <h3 className="mt-2 text-lg text-white">{persona.title}</h3>
          <p className="mt-2 text-sm text-gray-500">{persona.body}</p>
          <p className={`mt-3 text-sm font-medium ${safe ? 'text-strike-green' : 'text-[#ff9a91]'}`}>
            {persona.verdict}
          </p>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-xl text-sm text-gray-500">
        This is exactly the muscle the courses here are built around — not memorizing steps, but
        building the kind of curiosity that keeps asking "why." That's the one part of any job a
        model can't quietly take over.
      </p>
    </section>
  )
}

function PersonaMascot({ variant }) {
  const stuck = variant === 'repeater'
  const stroke = stuck ? '#5a5a5a' : '#39ff88'

  return (
    <svg width="68" height="68" viewBox="0 0 72 72" fill="none" className={`shrink-0 ${stuck ? '' : 'animate-float'}`}>
      <circle cx="36" cy="30" r="18" fill="#141414" stroke={stroke} strokeWidth="2" />
      <g className={stuck ? '' : 'animate-blink'}>
        <circle cx="29" cy="28" r="2.2" fill={stroke} />
        <circle cx="43" cy="28" r="2.2" fill={stroke} />
      </g>
      {stuck ? (
        <path d="M28 38c2.5-2 15-2 17.5 0" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M27 36c3 3 15 3 18 0" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      )}
      <path d="M20 52c4-6 10-9 16-9s12 3 16 9" stroke="#2a2a2a" strokeWidth="2" fill="#111" />

      {/* accessory: what this persona is "doing" above their head */}
      {variant === 'repeater' && (
        <path
          d="M52 10a7 7 0 1 1 -7 7"
          stroke={stroke}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          className="animate-spin-slow"
          style={{ transformOrigin: '52px 17px' }}
        />
      )}
      {variant === 'curious' && (
        <g className="animate-float">
          <circle cx="55" cy="12" r="5" stroke="#39ff88" strokeWidth="2" fill="none" />
          <path d="M55 17.5v2.5M52.5 22h5" stroke="#39ff88" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {variant === 'builder' && (
        <path
          d="M48 18.7a4 4 0 0 0-5.4 5.4L38 28.7v3h3l4.6-4.6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z"
          fill={stroke}
          className="animate-float"
        />
      )}
    </svg>
  )
}

function AIRobotMascot({ mood }) {
  const glow = mood === 'hungry' ? '#ff5f56' : '#39ff88'
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 64 64"
      fill="none"
      className={mood === 'hungry' ? 'animate-markerPulse' : 'animate-float'}
    >
      <rect x="14" y="18" width="36" height="28" rx="8" fill="#111" stroke={glow} strokeWidth="2" />
      <rect x="28" y="6" width="8" height="12" rx="2" fill="#111" stroke={glow} strokeWidth="2" />
      <circle cx="32" cy="8" r="2.4" fill={glow} />
      <circle cx="24" cy="32" r="3" fill={glow} />
      <circle cx="40" cy="32" r="3" fill={glow} />
      <path d="M24 40h16" stroke={glow} strokeWidth="2" strokeLinecap="round" />
      <rect x="4" y="26" width="6" height="14" rx="3" fill="#141414" stroke="#2a2a2a" />
      <rect x="54" y="26" width="6" height="14" rx="3" fill="#141414" stroke="#2a2a2a" />
    </svg>
  )
}
