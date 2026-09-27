import { useState } from 'react'

// Real photos are dropped in later by hand — see public/img/README.md.
// inst1.png / inst2.png just need to exist at those paths; nothing else in
// the code changes. Until they're added (or if either fails to load for any
// reason), the card falls back to the original drawn mascot face so there's
// never a broken-image icon on screen.
const MENTORS = [
  {
    name: 'Rohit Negi',
    role: 'Founder & Lead Instructor',
    org: 'Coder Army',
    bio: 'Founder of Coder Army. Has personally mentored thousands of students through DSA and problem-solving from the ground up.',
    img: '/img/inst1.png',
    variant: 'cap',
  },
  {
    name: 'Aditya Tandon',
    role: 'Co-Founder & Senior Instructor',
    org: 'Coder Army',
    bio: 'Co-Founder of Coder Army. Leads system design and full-stack mentorship, focused on turning theory into things students can actually ship.',
    img: '/img/inst2.png',
    variant: 'glasses',
  },
]

export default function Mentors() {
  const [titleHovered, setTitleHovered] = useState(false)

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 text-center">
      <h2
        onMouseEnter={() => setTitleHovered(true)}
        onMouseLeave={() => setTitleHovered(false)}
        onClick={() => setTitleHovered((h) => !h)} // tap-to-reveal, since there's no hover on mobile
        className="relative mx-auto inline-block cursor-pointer"
      >
        {/* Invisible sizer using the longer of the two lines, so the h2's box
            never resizes mid-crossfade — the two real lines below are both
            absolutely positioned on top of it. */}
        <span aria-hidden="true" className="invisible block font-display text-3xl sm:text-4xl">
          Meet With Our Mentors
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center font-display text-3xl text-white transition-all duration-300 ease-out sm:text-4xl ${
            titleHovered ? 'opacity-0 -translate-y-1.5' : 'opacity-100 translate-y-0 mb-4'
          }`}
        >
          Meet With Yours Mentors
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center font-display text-3xl text-strike-green transition-all duration-300 ease-out sm:text-4xl ${
            titleHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
          }`}
        >
          Your Guru Ji
        </span>
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
        Hover over either one — they've earned that title the slow way.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-5">
        {MENTORS.map((m) => (
          <MentorCard key={m.name} mentor={m} />
        ))}
      </div>
    </section>
  )
}

function MentorCard({ mentor }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered((h) => !h)} // tap-to-reveal, since there's no hover on mobile
      className="w-72 cursor-pointer rounded-xl border border-border bg-card p-8 text-center transition hover:border-strike-green/40"
    >
      <div className="relative mx-auto h-20 w-20">
        <MentorAvatar mentor={mentor} excited={hovered} />
        <span
          className={`pointer-events-none absolute -right-2 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-strike-green bg-base text-sm transition-all duration-300 ${
            hovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          🙂
        </span>
      </div>

      <p className="mt-4 font-medium text-white">{mentor.name}</p>
      <p className="mt-1 text-sm text-gray-500">{mentor.role}</p>

      <div
        className={`overflow-hidden text-left transition-all duration-300 ${
          hovered ? 'mt-3 max-h-28 opacity-100' : 'mt-0 max-h-0 opacity-0'
        }`}
      >
        <p className="text-center font-mono text-[11px] tracking-widest text-strike-green">
          {mentor.org.toUpperCase()}
        </p>
        <p className="mt-1.5 text-center text-xs leading-relaxed text-gray-500">{mentor.bio}</p>
      </div>
    </div>
  )
}

// Tries the real photo first; if it 404s (not added yet) or fails for any
// other reason, drops back to the drawn SVG mascot so the card never shows
// a broken-image glyph.
function MentorAvatar({ mentor, excited }) {
  const [imgFailed, setImgFailed] = useState(false)

  if (imgFailed) {
    return <MentorFace variant={mentor.variant} excited={excited} />
  }

  return (
    <img
      src={mentor.img}
      alt={mentor.name}
      onError={() => setImgFailed(true)}
      className={`h-20 w-20 rounded-full border-2 object-cover transition-colors duration-300 ${
        excited ? 'border-strike-green' : 'border-border'
      }`}
    />
  )
}

function MentorFace({ variant, excited }) {
  return (
    <svg viewBox="0 0 72 72" fill="none" className="h-20 w-20">
      <circle cx="36" cy="34" r="26" fill="#141414" stroke="#39ff88" strokeWidth="2" />
      <g className={excited ? 'animate-blink' : ''}>
        <circle cx="27" cy="31" r="3" fill="#39ff88" />
        <circle cx="45" cy="31" r="3" fill="#39ff88" />
      </g>
      <path
        d={excited ? 'M25 42c4 5 18 5 22 0' : 'M27 42c3 3 15 3 18 0'}
        stroke="#39ff88"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {variant === 'cap' && (
        <path d="M12 27a24 24 0 0 1 48 0c-7-4-41-4-48 0z" fill="#141414" stroke="#39ff88" strokeWidth="2" />
      )}
      {variant === 'glasses' && (
        <>
          <rect x="18" y="26" width="15" height="10" rx="3" fill="none" stroke="#39ff88" strokeWidth="2" />
          <rect x="39" y="26" width="15" height="10" rx="3" fill="none" stroke="#39ff88" strokeWidth="2" />
          <path d="M33 30h6" stroke="#39ff88" strokeWidth="2" />
        </>
      )}
    </svg>
  )
}
