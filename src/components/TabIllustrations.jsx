export function CoursesArt() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <rect x="30" y="70" width="60" height="12" rx="2" fill="#1a1a1a" stroke="#2a2a2a" />
      <rect x="34" y="56" width="52" height="12" rx="2" fill="#141414" stroke="#39ff88" strokeOpacity="0.4" />
      <g className="animate-float">
        <rect x="38" y="42" width="44" height="12" rx="2" fill="#111" stroke="#39ff88" />
        <rect x="70" y="38" width="6" height="18" fill="#39ff88" />
      </g>
    </svg>
  )
}

export function PracticeArt() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <rect x="20" y="60" width="80" height="34" rx="6" fill="#111" stroke="#2a2a2a" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={28 + i * 10} y={70} width="6" height="6" rx="1" fill="#232323" />
      ))}
      <circle cx="40" cy="45" r="4" fill="#39ff88" className="animate-float" />
      <circle cx="80" cy="45" r="4" fill="#ffffff" opacity="0.6" className="animate-float" style={{ animationDelay: '0.6s' }} />
    </svg>
  )
}

export function ArenaArt() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="34" stroke="#232323" strokeWidth="2" fill="none" />
      <path d="M42 42l36 36M78 42 42 78" stroke="#39ff88" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="60" r="5" fill="#39ff88" className="animate-fadeSeq" />
    </svg>
  )
}

export function QuizArt() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <path
        d="M60 30a20 20 0 0 0-8 38c2 1.5 3 3 3 6v4h10v-4c0-3 1-4.5 3-6a20 20 0 0 0-8-38z"
        stroke="#e5e5e5"
        strokeWidth="2"
      />
      <rect x="53" y="84" width="14" height="6" rx="2" fill="#e5e5e5" />
      <text x="45" y="24" fontSize="18" fill="#39ff88" className="animate-float">?</text>
    </svg>
  )
}

export function LayersArt() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <path d="M60 30 30 45l30 15 30-15z" stroke="#39ff88" strokeWidth="2" className="animate-fadeSeq" />
      <path d="M30 60l30 15 30-15" stroke="#3a3a3a" strokeWidth="2" className="animate-fadeSeq" style={{ animationDelay: '0.5s' }} />
      <path d="M30 75l30 15 30-15" stroke="#3a3a3a" strokeWidth="2" className="animate-fadeSeq" style={{ animationDelay: '1s' }} />
    </svg>
  )
}

export function TrophyArt() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <path d="M45 34h30v20a15 15 0 0 1-30 0V34z" stroke="#39ff88" strokeWidth="2" />
      <path d="M45 38h-8v6a10 10 0 0 0 8 10M75 38h8v6a10 10 0 0 0-8 10" stroke="#39ff88" strokeWidth="2" />
      <rect x="54" y="70" width="12" height="10" fill="#232323" />
      <rect x="46" y="84" width="28" height="6" rx="2" fill="#232323" />
      <circle cx="40" cy="40" r="2" fill="#39ff88" className="animate-confetti" />
      <circle cx="80" cy="30" r="2" fill="#ffffff" className="animate-confetti" style={{ animationDelay: '0.5s' }} />
      <circle cx="60" cy="25" r="2" fill="#39ff88" className="animate-confetti" style={{ animationDelay: '1s' }} />
    </svg>
  )
}
